<?php

use App\Actions\Payments\ApplyMidtransPaymentStatusAction;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\User;
use App\Services\Admin\OrderManagementService;
use App\Services\Admin\ShipmentManagementService;
use App\Services\Customer\MidtransWebhookService;
use App\Services\Integrations\BiteshipService;
use App\Services\Integrations\MidtransService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;
use Mockery\MockInterface;

uses(RefreshDatabase::class);

beforeEach(function () {
    config(['inertia.ssr.enabled' => false]);
});

function createFulfillmentOrder(string $orderStatus = 'paid', string $paymentStatus = 'paid', string $shippingStatus = 'not_created'): Order
{
    $customer = User::factory()->create();
    $order = Order::query()->create([
        'user_id' => $customer->id,
        'order_number' => 'ORD-FLOW-'.Str::uuid(),
        'customer_name' => $customer->name,
        'customer_email' => $customer->email,
        'customer_phone' => '081234567890',
        'subtotal' => 100000,
        'shipping_cost' => 16000,
        'grand_total' => 116000,
        'payment_status' => $paymentStatus,
        'order_status' => $orderStatus,
        'shipping_status' => $shippingStatus,
    ]);
    $order->shipment()->create([
        'shipping_provider' => 'biteship',
        'courier_company' => 'jne',
        'courier_type' => 'reg',
        'shipping_cost' => 16000,
        'shipping_status' => $shippingStatus,
        'biteship_order_id' => $shippingStatus === 'not_created' ? null : 'biteship-'.Str::uuid(),
    ]);

    return $order;
}

function fulfillmentAdmin(): User
{
    return User::factory()->create(['role' => 'admin', 'is_active' => true]);
}

it('exposes server validated next order actions', function () {
    $order = createFulfillmentOrder();

    $this->actingAs(fulfillmentAdmin())
        ->get(route('admin.orders.show', $order))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->where('order.allowedStatuses', ['processing']));
});

it('shows historical stock movements only for the order and matching variants', function () {
    $order = createFulfillmentOrder();
    $otherOrder = createFulfillmentOrder();
    $product = Product::query()->create(['name' => 'Stock history product', 'slug' => 'stock-history-'.Str::uuid(), 'regular_price' => 50000]);
    $variants = collect();

    foreach (range(0, 2) as $index) {
        $variant = $product->variants()->create(['sku' => 'STOCK-'.Str::uuid(), 'stock' => 99]);
        $variants->push($variant);
        $order->items()->create(['product_id' => $product->id, 'product_variant_id' => $variant->id, 'product_name' => $product->name, 'price' => 50000, 'quantity' => 2, 'subtotal' => 100000]);
    }

    $order->items()->create(['product_name' => 'Unavailable variant', 'price' => 50000, 'quantity' => 1, 'subtotal' => 50000]);
    $order->items()->create(['product_id' => $product->id, 'product_variant_id' => $variants[0]->id, 'product_name' => $product->name, 'price' => 50000, 'quantity' => 1, 'subtotal' => 50000]);
    $logData = ['type' => 'order', 'quantity' => -2, 'stock_before' => 12, 'stock_after' => 10, 'reference_type' => 'order', 'reference_id' => $order->id];
    $latest = $variants[0]->stockLogs()->create([...$logData, 'quantity' => -10, 'stock_before' => 10, 'stock_after' => 0]);
    $latest->forceFill(['created_at' => '2026-10-09 04:00:00'])->save();
    $earliest = $variants[0]->stockLogs()->create($logData);
    $earliest->forceFill(['created_at' => '2026-10-09 03:00:00'])->save();
    $secondVariant = $variants[1]->stockLogs()->create([...$logData, 'stock_before' => 7, 'stock_after' => 5]);
    $variants[0]->stockLogs()->create([...$logData, 'reference_id' => $otherOrder->id]);
    $variants[0]->stockLogs()->create([...$logData, 'reference_type' => 'manual_adjustment']);
    $variants[0]->stockLogs()->create([...$logData, 'reference_type' => 'product']);

    $this->actingAs(fulfillmentAdmin())->get(route('admin.orders.show', $order))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('order.items', 5)
            ->has('order.items.0.stock_movements', 2)
            ->where('order.items.0.stock_movements.0.id', $earliest->id)
            ->where('order.items.0.stock_movements.0.quantity', -2)
            ->where('order.items.0.stock_movements.0.stock_before', 12)
            ->where('order.items.0.stock_movements.0.stock_after', 10)
            ->where('order.items.0.stock_movements.0.created_at', '2026-10-09T03:00:00.000000Z')
            ->where('order.items.0.stock_movements.1.id', $latest->id)
            ->where('order.items.0.stock_movements.1.stock_before', 10)
            ->where('order.items.0.stock_movements.1.stock_after', 0)
            ->has('order.items.1.stock_movements', 1)
            ->where('order.items.1.stock_movements.0.id', $secondVariant->id)
            ->where('order.items.1.stock_movements.0.stock_before', 7)
            ->where('order.items.1.stock_movements.0.stock_after', 5)
            ->where('order.items.2.stock_movements', [])
            ->where('order.items.3.stock_movements', [])
            ->has('order.items.4.stock_movements', 2)
            ->where('order.items.4.stock_movements.0.id', $earliest->id)
            ->where('order.items.4.stock_movements.1.id', $latest->id));

    expect($variants[0]->fresh()->stock)->toBe(99);
});

it('returns no stock movements when physical stock has not changed', function (string $status, string $paymentStatus) {
    $order = createFulfillmentOrder($status, $paymentStatus);
    $order->items()->create(['product_name' => 'No stock movement', 'price' => 50000, 'quantity' => 1, 'subtotal' => 50000]);

    $this->actingAs(fulfillmentAdmin())->get(route('admin.orders.show', $order))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->where('order.items.0.stock_movements', []));
})->with([
    'awaiting payment' => ['pending_payment', 'pending'],
    'cancelled before payment' => ['cancelled', 'pending'],
    'legacy paid order without logs' => ['paid', 'paid'],
]);

it('preserves precise UTC timestamps in the order detail without changing the list date', function () {
    $this->travelTo(now()->setDate(2026, 10, 9)->setTime(3, 24, 15));
    $order = createFulfillmentOrder();
    $order->update(['paid_at' => now(), 'no_return_refund_agreed_at' => now()]);
    $payment = Payment::query()->create([
        'order_id' => $order->id,
        'payment_provider' => 'midtrans',
        'midtrans_order_id' => $order->order_number,
        'transaction_status' => 'settlement',
        'gross_amount' => 116000,
    ]);
    $payment->logs()->create([
        'order_id' => $order->id,
        'provider' => 'midtrans',
        'event_type' => 'settlement',
        'processed_at' => now(),
        'payload' => ['transaction_status' => 'settlement'],
    ]);
    $order->shipment->trackings()->create(['status' => 'confirmed', 'happened_at' => now()]);

    $this->actingAs(fulfillmentAdmin())->post(route('admin.orders.status', $order), ['status' => 'processing'])->assertSessionHasNoErrors();
    $this->get(route('admin.orders.show', $order))->assertInertia(fn (Assert $page) => $page
        ->where('order.created_at', '2026-10-09T03:24:15.000000Z')
        ->where('order.paid_at', '2026-10-09T03:24:15.000000Z')
        ->where('order.no_return_refund_agreed_at', '2026-10-09T03:24:15.000000Z')
        ->where('order.status_history.0.created_at', '2026-10-09T03:24:15.000000Z')
        ->where('order.payment_logs.0.created_at', '2026-10-09T03:24:15.000000Z')
        ->where('order.payment_logs.0.processed_at', '2026-10-09T03:24:15.000000Z')
        ->where('order.trackings.0.happened_at', '2026-10-09T03:24:15.000000Z')
        ->where('order.cancelled_at', null));

    expect(app(OrderManagementService::class)->row($order->fresh())['created_at'])->toBe('Oct 9, 2026')
        ->and($order->fresh()->created_at->format('Y-m-d H:i:s'))->toBe('2026-10-09 03:24:15');
});

it('requires paid and delivered shipment before completing an order', function (string $paymentStatus, string $shippingStatus) {
    $order = createFulfillmentOrder('delivered', $paymentStatus, $shippingStatus);

    $this->actingAs(fulfillmentAdmin())
        ->postJson(route('admin.orders.status', $order), ['status' => 'completed'])
        ->assertJsonValidationErrors('status');

    expect($order->fresh()->order_status)->toBe('delivered');
})->with([
    'unpaid' => ['pending', 'delivered'],
    'not delivered' => ['paid', 'in_transit'],
]);

it('rejects cancellation through the fulfillment status endpoint', function () {
    $order = createFulfillmentOrder('pending_payment', 'pending');

    $this->actingAs(fulfillmentAdmin())
        ->postJson(route('admin.orders.status', $order), ['status' => 'cancelled'])
        ->assertJsonValidationErrors('status');

    expect($order->fresh()->order_status)->toBe('pending_payment')
        ->and($order->fresh()->payment_status)->toBe('pending');
});

it('requires packing completion before booking a shipment', function () {
    $order = createFulfillmentOrder();

    $this->actingAs(fulfillmentAdmin())
        ->postJson(route('admin.orders.shipments.store', $order), [
            'courier_company' => 'jne',
            'courier_type' => 'reg',
            'courier_service_name' => 'JNE Reguler',
            'estimated_delivery' => '2 days',
        ])
        ->assertJsonValidationErrors('shipment')
        ->assertJsonPath('errors.shipment.0', 'Tandai pesanan siap dikirim sebelum membuat pengiriman.');
});

it('rejects manual shipment updates for unpaid orders', function () {
    $order = createFulfillmentOrder('pending_payment', 'pending', 'confirmed');

    $this->actingAs(fulfillmentAdmin())
        ->postJson(route('admin.shipments.status', $order->shipment), [
            'shipping_status' => 'picked',
            'description' => 'Confirmed pickup by courier.',
        ])
        ->assertJsonValidationErrors('shipping_status');

    expect($order->shipment->fresh()->shipping_status)->toBe('confirmed');
});

it('requires a reason for manual shipment overrides', function () {
    $order = createFulfillmentOrder('shipped', 'paid', 'picked');

    $this->actingAs(fulfillmentAdmin())
        ->postJson(route('admin.shipments.status', $order->shipment), ['shipping_status' => 'in_transit'])
        ->assertJsonValidationErrors('description');
});

it('rejects regressive manual shipment transitions', function () {
    $order = createFulfillmentOrder('delivered', 'paid', 'delivered');

    $this->actingAs(fulfillmentAdmin())
        ->postJson(route('admin.shipments.status', $order->shipment), [
            'shipping_status' => 'picked',
            'description' => 'Attempted correction.',
        ])
        ->assertJsonValidationErrors('shipping_status');

    expect($order->shipment->fresh()->shipping_status)->toBe('delivered');
});

it('audits valid manual shipment overrides and synchronizes the order', function () {
    $admin = fulfillmentAdmin();
    $order = createFulfillmentOrder('shipped', 'paid', 'picked');

    $this->actingAs($admin)
        ->post(route('admin.shipments.status', $order->shipment), [
            'shipping_status' => 'in_transit',
            'description' => 'Courier confirmed transport by phone.',
        ])
        ->assertSessionHasNoErrors();

    expect($order->fresh()->shipping_status)->toBe('in_transit')
        ->and($order->shipment->trackings()->latest('id')->first()->raw_payload['actor_id'] ?? null)->toBe($admin->id);
});

it('does not regress fulfillment on repeated successful payment notifications', function (string $status) {
    $order = createFulfillmentOrder($status);
    $payment = Payment::query()->create([
        'order_id' => $order->id,
        'payment_provider' => 'midtrans',
        'midtrans_order_id' => $order->order_number,
        'transaction_status' => 'settlement',
        'gross_amount' => 116000,
    ]);

    app(ApplyMidtransPaymentStatusAction::class)->execute($payment, 'settlement');

    expect($order->fresh()->order_status)->toBe($status);
})->with(['processing', 'completed', 'shipment_problem']);

it('preserves completed order on repeated delivery notifications', function () {
    $order = createFulfillmentOrder('completed', 'paid', 'delivered');

    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => 'delivered']);

    expect($order->fresh()->order_status)->toBe('completed');
});

it('treats a cancelled shipment as an issue instead of cancelling a paid order', function () {
    $order = createFulfillmentOrder('ready_to_ship', 'paid', 'confirmed');

    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => 'cancelled']);

    expect($order->fresh()->order_status)->toBe('shipment_problem')
        ->and($order->fresh()->payment_status)->toBe('paid')
        ->and($order->fresh()->shipping_status)->toBe('cancelled');
});

it('ignores regressive courier status notifications', function () {
    $order = createFulfillmentOrder('shipped', 'paid', 'in_transit');

    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => 'confirmed']);

    expect($order->shipment->fresh()->shipping_status)->toBe('in_transit');
});

it('advances fulfillment through the admin actions and records the actor', function () {
    $admin = fulfillmentAdmin();
    $order = createFulfillmentOrder();

    foreach (['processing', 'ready_to_ship'] as $status) {
        $this->actingAs($admin)->post(route('admin.orders.status', $order), ['status' => $status])->assertSessionHasNoErrors();
        expect($order->fresh()->order_status)->toBe($status);
    }

    $this->get(route('admin.orders.show', $order))
        ->assertInertia(fn (Assert $page) => $page->where('order.status_history.0.actor', $admin->name)->where('order.status_history.0.status', 'ready_to_ship'));
});

it('completes a paid delivered order', function () {
    $order = createFulfillmentOrder('delivered', 'paid', 'delivered');

    $this->actingAs(fulfillmentAdmin())->post(route('admin.orders.status', $order), ['status' => 'completed'])->assertSessionHasNoErrors();

    expect($order->fresh()->order_status)->toBe('completed')->and($order->fresh()->completed_at)->not->toBeNull();
});

it('blocks duplicate bookings with an existing provider order', function () {
    $order = createFulfillmentOrder('shipment_failed', 'paid', 'failed');

    $this->actingAs(fulfillmentAdmin())->postJson(route('admin.orders.shipments.store', $order), [
        'courier_company' => 'jne',
        'courier_type' => 'reg',
    ])->assertJsonValidationErrors('shipment')->assertJsonPath('errors.shipment.0', 'Shipment sedang failed.');
});

it('exposes only legal manual transitions and guarded booking', function () {
    $order = createFulfillmentOrder('shipped', 'paid', 'in_transit');

    $this->actingAs(fulfillmentAdmin())->get(route('admin.shipments.show', $order->shipment))
        ->assertInertia(fn (Assert $page) => $page
            ->where('shippingStatuses', ['delivered', 'failed', 'problem', 'lost', 'returned'])
            ->where('shipment.can_create_shipment', false));
});

it('normalizes forward courier events without skipping logistics stages', function (string $providerStatus, string $expected) {
    $order = createFulfillmentOrder('ready_to_ship', 'paid', 'confirmed');

    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => $providerStatus]);

    expect($order->shipment->fresh()->shipping_status)->toBe($expected)
        ->and($order->fresh()->shipping_status)->toBe($expected);
})->with([
    ['allocated', 'allocated'],
    ['picking_up', 'allocated'],
    ['picked', 'picked'],
    ['picked_up', 'picked'],
    ['in_transit', 'in_transit'],
]);

it('preserves the first delivered timestamp', function () {
    $order = createFulfillmentOrder('completed', 'paid', 'delivered');
    $deliveredAt = now()->subDay()->startOfSecond();
    $order->shipment->update(['delivered_at' => $deliveredAt]);

    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => 'delivered']);

    expect($order->shipment->fresh()->delivered_at->equalTo($deliveredAt))->toBeTrue();
});

it('prevents problem recovery from returning to pre-pickup stages', function () {
    $order = createFulfillmentOrder('shipment_problem', 'paid', 'problem');
    $order->shipment->update(['shipped_at' => now()->subHour()]);

    app(ShipmentManagementService::class)->applyBiteshipPayload($order->shipment, ['status' => 'confirmed']);

    expect($order->shipment->fresh()->shipping_status)->toBe('problem');
});

it('does not downgrade a full refund', function (string $incoming) {
    $order = createFulfillmentOrder('refunded', 'refunded');
    $payment = Payment::query()->create([
        'order_id' => $order->id,
        'payment_provider' => 'midtrans',
        'midtrans_order_id' => $order->order_number,
        'transaction_status' => 'refund',
        'gross_amount' => 116000,
    ]);

    app(ApplyMidtransPaymentStatusAction::class)->execute($payment, $incoming);

    expect($order->fresh()->payment_status)->toBe('refunded')->and($order->fresh()->order_status)->toBe('refunded');
})->with(['partial_refund', 'settlement', 'pending']);

it('does not automatically retry an uncertain Biteship booking', function () {
    config(['services.biteship.api_key' => 'test-key']);
    Http::fakeSequence()->push(['error' => 'Unknown booking result'], 500)->push(['id' => 'duplicate'], 200);

    expect(fn () => app(BiteshipService::class)->createOrder([]))->toThrow(RequestException::class);
    Http::assertSentCount(1);
});

function prepareOrderDetailBooking(): Order
{
    Mail::fake();
    Http::preventStrayRequests();
    config([
        'services.biteship.api_key' => 'test-key',
        'services.biteship.origin_contact_name' => 'Store',
        'services.biteship.origin_contact_phone' => '08000000000',
        'services.biteship.origin_address' => 'Jl. Store No. 1',
        'services.biteship.origin_postal_code' => '60111',
    ]);

    $order = createFulfillmentOrder('ready_to_ship');
    $order->update(['discount_amount' => 20000, 'service_fee' => 1000, 'grand_total' => 97000, 'voucher_code' => 'SAVE20']);
    $order->shipment->update(['courier_service_name' => 'Reguler', 'estimated_delivery' => '2-3 hari']);
    $order->address()->create([
        'recipient_name' => $order->customer_name,
        'recipient_phone' => $order->customer_phone,
        'province' => 'Jawa Barat',
        'city' => 'Bandung',
        'district' => 'Coblong',
        'postal_code' => '40135',
        'full_address' => 'Jl. Dago No. 10',
    ]);
    $order->items()->create(['product_name' => 'Booking test', 'price' => 50000, 'quantity' => 2, 'subtotal' => 100000, 'weight' => 500]);

    return $order;
}

it('books from order detail using the saved customer courier without changing payment totals', function (array $extra) {
    $order = prepareOrderDetailBooking();
    Http::fake(['api.biteship.com/v1/orders' => Http::response(['id' => 'biteship-detail', 'status' => 'confirmed'])]);
    $admin = fulfillmentAdmin();

    $this->actingAs($admin)->get(route('admin.orders.show', $order))
        ->assertInertia(fn (Assert $page) => $page->where('order.can_create_shipment', true)->where('order.booking_uncertain', false));

    $this->from(route('admin.orders.show', $order))->post(route('admin.orders.shipments.store', $order), ['source' => 'order_detail', ...$extra])
        ->assertSessionHasNoErrors()->assertRedirect(route('admin.orders.show', $order));

    Http::assertSent(fn (Request $request): bool => $request->method() === 'POST'
        && $request['courier_company'] === 'jne'
        && $request['courier_type'] === 'reg'
        && $request['items'][0]['quantity'] === 2);
    Http::assertSentCount(1);
    $order->refresh();
    expect($order->shipping_cost)->toBe('16000.00')
        ->and($order->discount_amount)->toBe('20000.00')
        ->and($order->service_fee)->toBe('1000.00')
        ->and($order->grand_total)->toBe('97000.00')
        ->and($order->voucher_code)->toBe('SAVE20')
        ->and($order->order_status)->toBe('ready_to_ship')
        ->and($order->shipping_status)->toBe('confirmed')
        ->and($order->shipment->courier_company)->toBe('jne')
        ->and($order->shipment->courier_service_name)->toBe('Reguler')
        ->and($order->shipment->estimated_delivery)->toBe('2-3 hari');

    $this->post(route('admin.orders.shipments.store', $order), ['source' => 'order_detail'])->assertSessionHasErrors('shipment');
    Http::assertSentCount(1);
})->with([
    'no courier form' => [[]],
    'tampered courier and totals' => [['courier_company' => 'sicepat', 'courier_type' => 'best', 'courier_service_name' => 'Wrong courier', 'estimated_delivery' => 'Wrong estimate', 'shipping_cost' => 0, 'grand_total' => 0]],
]);

it('rejects ineligible bookings from order detail without contacting Biteship', function (string $orderStatus, string $paymentStatus, string $shippingStatus, ?string $providerId, bool $uncertain) {
    $order = prepareOrderDetailBooking();
    $order->update(['order_status' => $orderStatus, 'payment_status' => $paymentStatus, 'shipping_status' => $shippingStatus]);
    $order->shipment->update(['shipping_status' => $shippingStatus, 'biteship_order_id' => $providerId, 'raw_order_response' => ['booking_uncertain' => $uncertain]]);
    Http::fake();

    $this->actingAs(fulfillmentAdmin())->post(route('admin.orders.shipments.store', $order), ['source' => 'order_detail'])
        ->assertSessionHasErrors('shipment');
    Http::assertNothingSent();
})->with([
    'packing incomplete' => ['processing', 'paid', 'not_created', null, false],
    'unpaid' => ['ready_to_ship', 'pending', 'not_created', null, false],
    'completed' => ['completed', 'paid', 'not_created', null, false],
    'booking running' => ['ready_to_ship', 'paid', 'creating', null, false],
    'already booked' => ['ready_to_ship', 'paid', 'confirmed', 'existing', false],
    'uncertain result' => ['shipment_failed', 'paid', 'failed', null, true],
]);

it('rejects missing customer courier selections from order detail', function (string $missing) {
    $order = prepareOrderDetailBooking();
    if ($missing === 'shipment') {
        $order->shipment()->delete();
    } else {
        $order->shipment->update([$missing => '']);
    }
    Http::fake();
    $this->actingAs(fulfillmentAdmin())->get(route('admin.orders.show', $order))
        ->assertInertia(fn (Assert $page) => $page->where('order.can_create_shipment', false));

    $this->post(route('admin.orders.shipments.store', $order), ['source' => 'order_detail', 'courier_company' => 'jne', 'courier_type' => 'reg'])
        ->assertSessionHasErrors('shipment');
    Http::assertNothingSent();
})->with(['shipment', 'courier_company', 'courier_type']);

it('blocks retries after an uncertain booking from order detail', function () {
    $order = prepareOrderDetailBooking();
    Http::fake(['api.biteship.com/v1/orders' => Http::response(['error' => 'Unknown booking result'], 500)]);
    $this->actingAs(fulfillmentAdmin())->from(route('admin.orders.show', $order))
        ->post(route('admin.orders.shipments.store', $order), ['source' => 'order_detail'])->assertSessionHasErrors('shipment');
    $this->get(route('admin.orders.show', $order))->assertInertia(fn (Assert $page) => $page
        ->where('order.can_create_shipment', false)->where('order.booking_uncertain', true));
    $this->post(route('admin.orders.shipments.store', $order), ['source' => 'order_detail'])->assertSessionHasErrors('shipment');
    Http::assertSentCount(1);
});

it('refreshes tracking from order detail and stays on the order', function () {
    $order = prepareOrderDetailBooking();
    $order->shipment->update(['biteship_order_id' => 'biteship-detail', 'shipping_status' => 'confirmed']);
    Http::fake(['api.biteship.com/v1/orders/biteship-detail' => Http::response(['id' => 'biteship-detail', 'status' => 'picked'])]);

    $this->actingAs(fulfillmentAdmin())->from(route('admin.orders.show', $order))
        ->post(route('admin.shipments.refresh-tracking', $order->shipment))->assertSessionHasNoErrors()->assertRedirect(route('admin.orders.show', $order));
    expect($order->fresh()->order_status)->toBe('shipped')->and($order->fresh()->shipping_status)->toBe('picked');
    Http::assertSentCount(1);
});

it('requires an active admin for booking from order detail', function (bool $active) {
    $order = prepareOrderDetailBooking();
    $user = $active ? $order->user : fulfillmentAdmin();
    if (! $active) {
        $user->forceFill(['is_active' => false])->save();
    }
    Http::fake();
    $this->actingAs($user)->postJson(route('admin.orders.shipments.store', $order), ['source' => 'order_detail'])->assertForbidden();
    Http::assertNothingSent();
})->with([true, false]);

it('preserves the shipment page booking redirect when the order detail source is absent', function () {
    $order = prepareOrderDetailBooking();
    Http::fake(['api.biteship.com/v1/orders' => Http::response(['id' => 'biteship-legacy', 'status' => 'confirmed'])]);

    $this->actingAs(fulfillmentAdmin())->post(route('admin.orders.shipments.store', $order), ['courier_company' => 'jne', 'courier_type' => 'reg'])
        ->assertSessionHasNoErrors()->assertRedirect(route('admin.shipments.show', $order->shipment));
    Http::assertSentCount(1);
});

it('rejects invalid booking sources from order detail', function () {
    $order = prepareOrderDetailBooking();
    Http::fake();
    $this->actingAs(fulfillmentAdmin())->post(route('admin.orders.shipments.store', $order), ['source' => 'external', 'courier_company' => 'jne', 'courier_type' => 'reg'])
        ->assertSessionHasErrors('source');
    Http::assertNothingSent();
});

it('reports tracking connection errors on order detail without changing its status', function () {
    $order = prepareOrderDetailBooking();
    $order->shipment->update(['biteship_order_id' => 'biteship-detail', 'shipping_status' => 'confirmed']);
    Http::fake(fn () => throw new ConnectionException('Tracking connection failed'));

    $this->actingAs(fulfillmentAdmin())->from(route('admin.orders.show', $order))
        ->post(route('admin.shipments.refresh-tracking', $order->shipment))->assertSessionHasErrors('shipment')->assertRedirect(route('admin.orders.show', $order));
    expect($order->fresh()->order_status)->toBe('ready_to_ship')->and($order->shipment->fresh()->shipping_status)->toBe('confirmed');
});

it('includes the address snapshot note and subdistrict in the Biteship destination address', function (?string $note, ?string $subdistrict, string $expectedAddress, ?string $expectedNote) {
    $order = createFulfillmentOrder('ready_to_ship');
    $order->shipment->update(['biteship_order_id' => null]);
    $order->update(['notes' => 'Order instructions']);
    $order->address()->create([
        'recipient_name' => $order->customer_name,
        'recipient_phone' => $order->customer_phone,
        'province' => 'Jawa Barat',
        'city' => 'Bandung',
        'district' => 'Coblong',
        'subdistrict' => $subdistrict,
        'postal_code' => '40135',
        'full_address' => 'Jl. Dago No. 10',
        'note' => $note,
    ]);
    $order->items()->create([
        'product_name' => 'Packing test',
        'price' => 100000,
        'quantity' => 1,
        'subtotal' => 100000,
        'weight' => 500,
    ]);
    config([
        'services.biteship.api_key' => 'test-key',
        'services.biteship.origin_contact_name' => 'Store',
        'services.biteship.origin_contact_phone' => '08000000000',
        'services.biteship.origin_address' => 'Jl. Store No. 1',
        'services.biteship.origin_postal_code' => '60111',
        'services.biteship.origin_note' => 'Origin instructions',
    ]);
    Http::preventStrayRequests();
    Http::fake(['api.biteship.com/v1/orders' => Http::response(['id' => 'biteship-note-test', 'status' => 'confirmed'])]);

    $this->actingAs(fulfillmentAdmin())->post(route('admin.orders.shipments.store', $order), [
        'courier_company' => 'jne',
        'courier_type' => 'reg',
    ])->assertSessionHasNoErrors();

    Http::assertSent(fn (Request $request): bool => $request->method() === 'POST'
        && $request->url() === 'https://api.biteship.com/v1/orders'
        && $request['destination_address'] === $expectedAddress
        && ($request->data()['destination_note'] ?? null) === $expectedNote
        && $request['origin_note'] === 'Origin instructions'
        && $request['order_note'] === 'Order instructions');
    Http::assertSentCount(1);
    expect($order->address->fresh()->full_address)->toBe('Jl. Dago No. 10')
        ->and($order->address->fresh()->note)->toBe($note)
        ->and($order->address->fresh()->subdistrict)->toBe($subdistrict);
})->with([
    'note and subdistrict' => ['Rumah pagar hitam', 'Dago', 'Jl. Dago No. 10 (Rumah pagar hitam), Dago', 'Rumah pagar hitam'],
    'trimmed note and subdistrict' => ['  Rumah pagar hitam  ', '  Dago  ', 'Jl. Dago No. 10 (Rumah pagar hitam), Dago', 'Rumah pagar hitam'],
    'null note' => [null, 'Dago', 'Jl. Dago No. 10, Dago', null],
    'empty note' => ['', 'Dago', 'Jl. Dago No. 10, Dago', null],
    'whitespace note' => ['   ', 'Dago', 'Jl. Dago No. 10, Dago', null],
    'null subdistrict' => ['Rumah pagar hitam', null, 'Jl. Dago No. 10 (Rumah pagar hitam)', 'Rumah pagar hitam'],
    'empty subdistrict' => ['Rumah pagar hitam', '', 'Jl. Dago No. 10 (Rumah pagar hitam)', 'Rumah pagar hitam'],
    'whitespace subdistrict' => ['Rumah pagar hitam', '   ', 'Jl. Dago No. 10 (Rumah pagar hitam)', 'Rumah pagar hitam'],
    'both null' => [null, null, 'Jl. Dago No. 10', null],
    'both whitespace' => ['   ', '   ', 'Jl. Dago No. 10', null],
]);

it('synchronizes booking failures and blocks uncertain retries', function (int $httpStatus, bool $uncertain) {
    $order = createFulfillmentOrder('ready_to_ship');
    $order->address()->create([
        'recipient_name' => $order->customer_name,
        'recipient_phone' => $order->customer_phone,
        'province' => 'Jawa Barat',
        'city' => 'Bandung',
        'district' => 'Coblong',
        'subdistrict' => 'Dago',
        'postal_code' => '40135',
        'full_address' => 'Jl. Dago No. 10',
    ]);
    $order->items()->create([
        'product_name' => 'Packing test',
        'price' => 100000,
        'quantity' => 1,
        'subtotal' => 100000,
        'weight' => 500,
    ]);
    config([
        'services.biteship.api_key' => 'test-key',
        'services.biteship.origin_contact_name' => 'Store',
        'services.biteship.origin_contact_phone' => '08000000000',
        'services.biteship.origin_address' => 'Jl. Store No. 1',
        'services.biteship.origin_postal_code' => '60111',
    ]);
    Http::fake(['api.biteship.com/v1/orders' => Http::response(['error' => 'Booking response'], $httpStatus)]);

    $this->actingAs(fulfillmentAdmin())->post(route('admin.orders.shipments.store', $order), [
        'courier_company' => 'jne',
        'courier_type' => 'reg',
    ])->assertSessionHasErrors('shipment');

    Http::assertSentCount(1);
    $shipment = $order->shipment->fresh();
    expect($shipment->shipping_status)->toBe('failed')
        ->and($order->fresh()->shipping_status)->toBe('failed')
        ->and($order->fresh()->order_status)->toBe('shipment_failed')
        ->and($shipment->raw_order_response['booking_uncertain'])->toBe($uncertain)
        ->and(app(ShipmentManagementService::class)->canCreateShipment($order->fresh(), $shipment))->toBe(! $uncertain);
})->with([
    'rejected' => [422, false],
    'server error' => [500, true],
    'missing provider ID' => [200, true],
]);

it('refreshes the sync timestamp without duplicating a courier event', function () {
    $order = createFulfillmentOrder('shipped', 'paid', 'picked');
    $service = app(ShipmentManagementService::class);
    $service->applyBiteshipPayload($order->shipment, ['status' => 'picked']);
    $order->shipment->update(['last_synced_at' => now()->subDay()]);

    $service->applyBiteshipPayload($order->shipment, ['status' => 'picked']);

    expect($order->shipment->fresh()->last_synced_at->isToday())->toBeTrue()
        ->and($order->shipment->trackings()->count())->toBe(1);
});

it('blocks rebooking after an uncertain response', function () {
    $order = createFulfillmentOrder('shipment_failed', 'paid', 'failed');
    $order->shipment->update(['biteship_order_id' => null, 'raw_order_response' => ['booking_uncertain' => true]]);

    expect(app(ShipmentManagementService::class)->canCreateShipment($order, $order->shipment))->toBeFalse();
});

it('requires a provider booking before refreshing tracking', function () {
    $order = createFulfillmentOrder('ready_to_ship');

    $this->actingAs(fulfillmentAdmin())->postJson(route('admin.shipments.refresh-tracking', $order->shipment))->assertJsonValidationErrors('shipment');
    expect($order->shipment->trackings()->count())->toBe(0);
});

it('preserves the payment record when a stale gateway event arrives', function (string $paymentStatus, string $storedStatus, string $incoming) {
    $order = createFulfillmentOrder('processing', $paymentStatus);
    $payment = Payment::query()->create([
        'order_id' => $order->id,
        'payment_provider' => 'midtrans',
        'midtrans_order_id' => $order->order_number,
        'transaction_status' => $storedStatus,
        'gross_amount' => 116000,
    ]);
    $this->mock(MidtransService::class, function (MockInterface $mock) {
        $mock->shouldReceive('validateNotificationSignature')->once()->andReturnTrue();
        $mock->shouldReceive('amountMatches')->once()->andReturnTrue();
    });

    app(MidtransWebhookService::class)->handle([
        'order_id' => $order->order_number,
        'transaction_status' => $incoming,
        'status_code' => '200',
        'gross_amount' => '116000.00',
        'signature_key' => 'test-signature',
    ]);

    expect($payment->fresh()->transaction_status)->toBe($storedStatus)
        ->and($order->fresh()->payment_status)->toBe($paymentStatus)
        ->and($payment->logs()->count())->toBe(1);
})->with([
    ['paid', 'settlement', 'pending'],
    ['refunded', 'refund', 'partial_refund'],
]);
