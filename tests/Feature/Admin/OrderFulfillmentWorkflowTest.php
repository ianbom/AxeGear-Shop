<?php

use App\Actions\Payments\ApplyMidtransPaymentStatusAction;
use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use App\Services\Admin\OrderManagementService;
use App\Services\Admin\ShipmentManagementService;
use App\Services\Customer\MidtransWebhookService;
use App\Services\Integrations\BiteshipService;
use App\Services\Integrations\MidtransService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;
use Mockery\MockInterface;

uses(RefreshDatabase::class);

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
