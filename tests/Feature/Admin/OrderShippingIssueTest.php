<?php

use App\Enums\ShippingStatus;
use App\Models\AdminActivityLog;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Voucher;
use App\Services\Admin\ShipmentManagementService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    config(['inertia.ssr.enabled' => false]);
    Http::preventStrayRequests();
});

function shippingIssueOrder(): Order
{
    $customer = User::factory()->create();
    $order = Order::query()->create([
        'user_id' => $customer->id, 'order_number' => 'ORD-ISSUE-'.Str::uuid(),
        'customer_name' => $customer->name, 'customer_email' => $customer->email,
        'customer_phone' => '081234567890', 'subtotal' => 100000, 'grand_total' => 110000,
        'shipping_cost' => 10000, 'payment_status' => 'paid', 'order_status' => 'shipped',
        'shipping_status' => 'in_transit', 'paid_at' => now(), 'stock_finalized_at' => now(),
    ]);
    $order->shipment()->create([
        'shipping_provider' => 'biteship', 'shipping_status' => 'in_transit',
        'courier_company' => 'jne', 'courier_type' => 'reg', 'shipping_cost' => 10000,
        'biteship_order_id' => 'booking-'.Str::uuid(), 'shipped_at' => now(),
    ]);

    return $order;
}

it('describes courier exceptions without inventing a final failure', function (string $provider, string $internal, bool $terminal) {
    $order = shippingIssueOrder();
    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => $provider]);
    $shipment = $order->shipment->fresh();
    $issue = ShippingStatus::issueDetails($shipment->shipping_status, $shipment->raw_order_response);
    expect($shipment->shipping_status)->toBe($internal)
        ->and($issue['status'])->toBe($provider)->and($issue['is_terminal'])->toBe($terminal)
        ->and($issue['label'])->not->toBe('')->and($issue['description'])->not->toBe('');
})->with([
    ['on_hold', 'problem', false], ['return_in_transit', 'problem', false],
    ['returned', 'returned', true], ['lost', 'lost', true], ['disposed', 'problem', true],
    ['damaged', 'problem', false], ['rejected', 'failed', false], ['failed', 'failed', false],
    ['unknown_courier_event', 'problem', false],
]);

it('allows a held shipment to resume and a rejected shipment to return', function () {
    $order = shippingIssueOrder();
    $service = app(ShipmentManagementService::class);
    foreach (['on_hold', 'in_transit', 'rejected', 'return_in_transit', 'returned'] as $status) {
        $service->applyBiteshipPayload($order->shipment, ['status' => $status, 'updated_at' => now()->addMinutes($order->shipment->trackings()->count())->toISOString()]);
    }
    expect($order->shipment->fresh()->shipping_status)->toBe('returned');
    expect($order->shipment->trackings()->count())->toBe(5);
});

it('separates customer copy from operational details without changing status classification', function (string $provider, string $internal, string $description, bool $terminal) {
    $payload = ['status' => $provider, 'message' => 'Keterangan operasional lengkap dari kurir.'];
    $admin = ShippingStatus::issueDetails($internal, $payload);
    $customer = ShippingStatus::issueDetails($internal, $payload, forCustomer: true);

    expect($customer['description'])->toBe($description)
        ->and($admin['description'])->not->toBe($description)
        ->and($admin['description'])->not->toContain('Hubungi toko')
        ->and($customer['status'])->toBe($admin['status'])->toBe($provider)
        ->and($customer['reason'])->toBe($admin['reason'])->toBe($payload['message'])
        ->and($customer['is_terminal'])->toBe($admin['is_terminal'])->toBe($terminal);

    if ($provider === 'disposed') {
        expect($customer['label'])->toBe('Paket tidak dapat dikirimkan')
            ->and($admin['label'])->toBe('Paket dihancurkan oleh kurir');
    } else {
        expect($customer['label'])->toBe($admin['label']);
    }
})->with([
    ['lost', 'lost', 'Kurir melaporkan paket Anda hilang.', true],
    ['damaged', 'problem', 'Kurir melaporkan paket Anda mengalami kerusakan.', false],
    ['on_hold', 'problem', 'Pengiriman paket Anda sedang tertunda.', false],
    ['return_in_transit', 'problem', 'Paket Anda sedang dikembalikan ke toko.', false],
    ['returned', 'returned', 'Kurir melaporkan paket Anda telah kembali ke toko.', true],
    ['disposed', 'problem', 'Paket Anda tidak dapat dikirimkan.', true],
    ['rejected', 'failed', 'Kurir melaporkan pengiriman paket Anda ditolak.', false],
    ['failed', 'failed', 'Pengiriman paket Anda mengalami kegagalan.', false],
    ['cancelled', 'cancelled', 'Pengiriman paket Anda dibatalkan.', false],
    ['canceled', 'cancelled', 'Pengiriman paket Anda dibatalkan.', false],
    ['problem', 'problem', 'Pengiriman paket Anda mengalami kendala.', false],
    ['unknown_courier_event', 'problem', 'Status pengiriman paket Anda perlu diperiksa.', false],
]);

it('exposes informative issue data on both detail pages', function () {
    $order = shippingIssueOrder();
    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => 'on_hold', 'message' => 'Kurir sedang memeriksa kendala operasional.']);
    $this->actingAs($order->user)->get(route('order.detail', $order))
        ->assertInertia(fn (Assert $page) => $page->where('order.shipping_issue.status', 'on_hold')
            ->where('order.shipping_issue.is_terminal', false)
            ->where('order.shipping_issue.description', 'Pengiriman paket Anda sedang tertunda.'));
    $this->actingAs(User::factory()->create(['role' => 'admin', 'is_active' => true]))->get(route('admin.orders.show', $order))
        ->assertInertia(fn (Assert $page) => $page->where('order.shipping_issue.status', 'on_hold')
            ->where('order.shipping_issue.description', fn (string $description): bool => str_contains($description, 'dashboard Biteship'))
            ->where('order.shipping_issue.reason', 'Kurir sedang memeriksa kendala operasional.')
            ->where('order.allowedStatuses', []));
});

it('requires a reason to mark confirmed delivery failures', function () {
    $order = shippingIssueOrder();
    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => 'lost']);
    $this->actingAs(User::factory()->create(['role' => 'admin', 'is_active' => true]))
        ->post(route('admin.orders.status', $order), ['status' => 'shipment_failed', 'reason' => '   '])
        ->assertSessionHasErrors('reason');
    expect($order->fresh()->order_status)->toBe('lost');
});

it('audits and notifies confirmed failures without financial or inventory changes', function (string $status) {
    $order = shippingIssueOrder();
    $product = Product::query()->create(['name' => 'Issue product', 'slug' => 'issue-'.Str::uuid(), 'regular_price' => 100000]);
    $variant = $product->variants()->create(['sku' => 'ISSUE-'.Str::uuid(), 'stock' => 8, 'reserved_stock' => 2]);
    $order->items()->create(['product_id' => $product->id, 'product_variant_id' => $variant->id, 'product_name' => 'Issue product', 'quantity' => 1, 'price' => 100000, 'subtotal' => 100000]);
    $voucher = Voucher::query()->create(['code' => 'ISSUE-'.Str::uuid(), 'name' => 'Issue voucher', 'discount_type' => 'fixed', 'discount_value' => 10000, 'used_count' => 1, 'is_active' => true]);
    $order->update(['voucher_id' => $voucher->id, 'voucher_code' => $voucher->code]);
    $payment = $order->payment()->create(['payment_provider' => 'midtrans', 'payment_method' => 'bank_transfer', 'transaction_status' => 'settlement', 'gross_amount' => 110000, 'paid_at' => now()]);
    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => $status]);
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);
    $reason = 'Kurir telah memastikan paket tidak dapat diterima customer.';
    $this->actingAs($admin)->post(route('admin.orders.status', $order), ['status' => 'shipment_failed', 'reason' => $reason])->assertSessionHasNoErrors();
    expect($order->fresh()->order_status)->toBe('shipment_failed')->and($order->fresh()->payment_status)->toBe('paid')
        ->and($variant->fresh()->stock)->toBe(8)->and($variant->fresh()->reserved_stock)->toBe(2)
        ->and($voucher->fresh()->used_count)->toBe(1)->and($order->fresh()->stock_released_at)->toBeNull()
        ->and($order->fresh()->voucher_released_at)->toBeNull()->and($payment->fresh()->transaction_status)->toBe('settlement');
    $this->assertDatabaseHas('admin_activity_logs', ['user_id' => $admin->id, 'reference_type' => 'admin.orders.status', 'reference_id' => $order->id]);
    expect(AdminActivityLog::query()->where('reference_type', 'admin.orders.status')->latest('id')->first()->new_values['reason'])->toBe($reason);
    $this->assertDatabaseHas('notifications', ['user_id' => $order->user_id, 'title' => 'Pesanan gagal dikirim']);
    expect($order->shipment->fresh()->raw_order_response['status'])->toBe($status);
    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => $status, 'message' => 'Provider repeats final status']);
    expect($order->fresh()->order_status)->toBe('shipment_failed');
    $this->post(route('admin.orders.status', $order), ['status' => 'shipment_failed', 'reason' => $reason])->assertSessionHasErrors('status');
})->with(['lost', 'returned', 'disposed']);

it('rejects closing nonterminal and unknown shipping problems', function (string $status) {
    $order = shippingIssueOrder();
    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => $status]);
    $this->actingAs(User::factory()->create(['role' => 'admin', 'is_active' => true]))
        ->post(route('admin.orders.status', $order), ['status' => 'shipment_failed', 'reason' => 'Attempted closure'])
        ->assertSessionHasErrors('status');
})->with(['on_hold', 'return_in_transit', 'damaged', 'rejected', 'unknown_courier_event', 'in_transit']);

it('rejects inactive admins and customers', function (string $role, bool $active) {
    $order = shippingIssueOrder();
    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => 'lost']);
    $this->actingAs(User::factory()->create(['role' => $role, 'is_active' => $active]))
        ->postJson(route('admin.orders.status', $order), ['status' => 'shipment_failed', 'reason' => 'Attempted closure'])->assertForbidden();
})->with([['admin', false], ['customer', true]]);

it('rejects invalid order lifecycles and inconsistent shipment snapshots', function (string $status, string $payment, string $shipping) {
    $order = shippingIssueOrder();
    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => 'lost']);
    $order->refresh()->update(['order_status' => $status, 'payment_status' => $payment, 'shipping_status' => $shipping]);
    $this->actingAs(User::factory()->create(['role' => 'admin', 'is_active' => true]))
        ->post(route('admin.orders.status', $order), ['status' => 'shipment_failed', 'reason' => 'Attempted closure'])->assertSessionHasErrors('status');
})->with([['completed', 'paid', 'lost'], ['cancelled', 'paid', 'lost'], ['refunded', 'paid', 'lost'], ['lost', 'pending', 'lost'], ['lost', 'paid', 'in_transit']]);

it('preserves nested courier statuses through the authenticated webhook', function () {
    $order = shippingIssueOrder();
    config(['services.biteship.webhook_secret' => 'issue-secret']);
    $this->postJson(route('shipments.biteship.webhook'), [
        'order_id' => $order->shipment->biteship_order_id,
        'courier' => ['status' => 'on_hold'],
    ], ['X-Biteship-Webhook-Secret' => 'issue-secret'])->assertOk();
    expect($order->shipment->fresh()->shipping_status)->toBe('problem');
    expect(ShippingStatus::issueDetails('problem', $order->shipment->fresh()->raw_order_response)['status'])->toBe('on_hold');
});

it('preserves terminal exceptions against manual and provider regressions', function (string $status) {
    $order = shippingIssueOrder();
    $service = app(ShipmentManagementService::class);
    $service->applyBiteshipPayload($order->shipment, ['status' => $status]);
    $internal = $order->shipment->fresh()->shipping_status;
    $service->applyBiteshipPayload($order->shipment, ['status' => 'in_transit']);
    expect($order->shipment->fresh()->shipping_status)->toBe($internal);
    expect($service->allowedStatuses($order->shipment->fresh()))->toBe([]);
    $this->actingAs(User::factory()->create(['role' => 'admin', 'is_active' => true]))
        ->post(route('admin.shipments.status', $order->shipment), ['shipping_status' => 'in_transit', 'description' => 'Attempted regression'])->assertSessionHasErrors('shipping_status');
})->with(['lost', 'returned', 'disposed']);

it('ignores duplicate and stale exception events without blocking a newer recovery', function () {
    $order = shippingIssueOrder();
    $service = app(ShipmentManagementService::class);
    $held = ['status' => 'on_hold', 'updated_at' => now()->toISOString()];
    $service->applyBiteshipPayload($order->shipment, $held);
    $service->applyBiteshipPayload($order->shipment, $held);
    $service->applyBiteshipPayload($order->shipment, ['status' => 'delivered', 'updated_at' => now()->subMinute()->toISOString()]);
    expect($order->shipment->fresh()->shipping_status)->toBe('problem')->and($order->shipment->trackings()->count())->toBe(1);
    $service->applyBiteshipPayload($order->shipment, ['status' => 'in_transit', 'updated_at' => now()->addMinute()->toISOString()]);
    expect($order->shipment->fresh()->shipping_status)->toBe('in_transit')->and($order->fresh()->order_status)->toBe('shipped');
});

it('preserves return direction through holds and damage reports', function () {
    $order = shippingIssueOrder();
    $service = app(ShipmentManagementService::class);
    foreach (['return_in_transit', 'on_hold', 'in_transit', 'damaged', 'returned'] as $status) {
        $service->applyBiteshipPayload($order->shipment, ['status' => $status]);
        if ($status === 'in_transit') {
            expect($order->shipment->fresh()->raw_order_response['status'])->toBe('on_hold');
            expect($service->allowedStatuses($order->shipment->fresh()))->not->toContain('in_transit');
        }
        if ($status === 'damaged') {
            expect(ShippingStatus::issueDetails('problem', $order->shipment->fresh()->raw_order_response)['status'])->toBe('damaged');
        }
    }
    expect($order->shipment->fresh()->shipping_status)->toBe('returned');
});

it('does not introduce new failed or paid cancellation actions', function (string $target) {
    $order = shippingIssueOrder();
    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => 'lost']);
    $this->actingAs(User::factory()->create(['role' => 'admin', 'is_active' => true]))
        ->post(route('admin.orders.status', $order), ['status' => $target, 'reason' => 'Attempted closure'])->assertSessionHasErrors('status');
    expect($order->fresh()->order_status)->toBe('lost')->and($order->fresh()->payment_status)->toBe('paid');
})->with(['failed', 'cancelled']);

it('does not let provider metadata forge an admin failure decision', function () {
    $order = shippingIssueOrder();
    $order->update(['order_status' => 'shipment_failed']);
    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => 'lost', 'source' => 'admin_order_failure']);
    expect($order->fresh()->order_status)->toBe('lost');
    expect($order->shipment->trackings()->latest('id')->first()->raw_payload['source'])->toBe('biteship');
});
