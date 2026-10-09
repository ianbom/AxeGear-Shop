<?php

use App\Models\Order;
use App\Models\Shipment;
use App\Models\User;
use App\Services\Admin\ShipmentManagementService;
use App\Services\Integrations\BiteshipService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

function shipmentWithTrackingLink(): Shipment
{
    $customer = User::factory()->create();
    $order = Order::query()->create([
        'user_id' => $customer->id,
        'order_number' => 'ORD-TRACK-'.Str::uuid(),
        'customer_name' => $customer->name,
        'customer_email' => $customer->email,
        'customer_phone' => '081234567890',
        'subtotal' => 100000,
        'shipping_cost' => 16000,
        'grand_total' => 116000,
        'payment_status' => 'paid',
        'order_status' => 'ready_to_ship',
        'shipping_status' => 'confirmed',
    ]);

    return $order->shipment()->create([
        'shipping_provider' => 'biteship',
        'courier_company' => 'jne',
        'courier_type' => 'reg',
        'shipping_cost' => 16000,
        'biteship_order_id' => 'booking-'.Str::uuid(),
        'shipping_status' => 'confirmed',
        'raw_order_response' => ['courier' => ['link' => 'https://example.com/tracking/original']],
    ]);
}

it('preserves the tracking link through shipment updates without a usable link', function (array $courier) {
    $shipment = shipmentWithTrackingLink();
    $service = app(ShipmentManagementService::class);

    foreach (['picked', 'in_transit', 'delivered'] as $status) {
        $payload = ['status' => $status, 'courier' => $courier];
        $service->applyBiteshipPayload($shipment, $payload);
        $shipment->refresh();

        expect($shipment->shipping_status)->toBe($status)
            ->and(data_get($shipment->raw_order_response, 'courier.link'))->toBe('https://example.com/tracking/original')
            ->and($shipment->trackings()->latest('id')->first()->raw_payload)->toBe(['source' => 'biteship', ...$payload]);
    }

    $service->applyBiteshipPayload($shipment, $payload);
    expect($shipment->trackings()->count())->toBe(3);
})->with([
    'missing' => [[]],
    'null' => [['link' => null]],
    'empty' => [['link' => '']],
    'whitespace' => [['link' => '   ']],
]);

it('keeps the original tracking link while updating shipment metadata', function (string $source) {
    $shipment = shipmentWithTrackingLink();
    $service = app(ShipmentManagementService::class);

    foreach (['picked', 'in_transit', 'delivered'] as $status) {
        $payload = [
            'id' => $shipment->biteship_order_id,
            'status' => $status,
            'courier' => [
                'link' => "https://example.com/tracking/{$status}",
                'tracking_id' => "tracking-{$status}",
                'waybill_id' => "waybill-{$status}",
                'routing_code' => "routing-{$status}",
            ],
        ];
        $service->applyBiteshipPayload($shipment, $payload, $source);
        $shipment->refresh();

        expect(data_get($shipment->raw_order_response, 'courier.link'))->toBe('https://example.com/tracking/original')
            ->and($shipment->shipping_status)->toBe($status)
            ->and($shipment->biteship_tracking_id)->toBe("tracking-{$status}")
            ->and($shipment->waybill_id)->toBe("waybill-{$status}")
            ->and(data_get($shipment->raw_order_response, 'courier.routing_code'))->toBe("routing-{$status}")
            ->and($shipment->shipped_at)->not->toBeNull()
            ->and($shipment->trackings()->latest('id')->first()->raw_payload)->toBe(['source' => $source, ...$payload]);
    }

    expect($shipment->delivered_at)->not->toBeNull()
        ->and($shipment->order->fresh()->order_status)->toBe('delivered');
})->with(['biteship', 'biteship_webhook', 'admin_biteship_refresh']);

it('accepts the first tracking link when none is stored', function (?string $initialLink) {
    $shipment = shipmentWithTrackingLink();
    $shipment->update(['raw_order_response' => ['courier' => ['link' => $initialLink]]]);
    app(ShipmentManagementService::class)->applyBiteshipPayload($shipment, [
        'status' => 'picked', 'courier' => ['link' => 'https://example.com/tracking/first'],
    ]);

    expect(data_get($shipment->fresh()->raw_order_response, 'courier.link'))->toBe('https://example.com/tracking/first');
})->with([null, '', '   ']);

it('keeps the original link when refreshing tracking from Biteship', function () {
    $shipment = shipmentWithTrackingLink();
    $this->partialMock(BiteshipService::class)->shouldReceive('retrieveOrder')
        ->once()->with($shipment->biteship_order_id)
        ->andReturn(['status' => 'picked', 'courier' => ['link' => 'https://example.com/tracking/refreshed']]);

    app(ShipmentManagementService::class)->refreshTracking($shipment);

    expect($shipment->fresh()->shipping_status)->toBe('picked')
        ->and(data_get($shipment->fresh()->raw_order_response, 'courier.link'))->toBe('https://example.com/tracking/original');
});

it('keeps the tracking link and terminal order status after completion', function () {
    $shipment = shipmentWithTrackingLink();
    $shipment->order->update(['order_status' => 'completed', 'shipping_status' => 'delivered', 'completed_at' => now()]);
    $shipment->update(['shipping_status' => 'delivered', 'delivered_at' => now()]);
    app(ShipmentManagementService::class)->applyBiteshipPayload($shipment, [
        'status' => 'delivered', 'courier' => ['link' => 'https://example.com/tracking/replacement'],
    ]);

    expect(data_get($shipment->fresh()->raw_order_response, 'courier.link'))->toBe('https://example.com/tracking/original')
        ->and($shipment->order->fresh()->order_status)->toBe('completed');
});

it('does not replace the original link with an authenticated webhook link', function () {
    config(['services.biteship.webhook_secret' => 'tracking-test-secret']);
    $shipment = shipmentWithTrackingLink();

    $this->withHeader('X-Biteship-Webhook-Secret', 'tracking-test-secret')
        ->postJson(route('shipments.biteship.webhook'), [
            'order_id' => $shipment->biteship_order_id,
            'status' => 'picked',
            'courier' => ['link' => 'https://example.com/tracking/webhook'],
        ])
        ->assertOk();

    expect($shipment->fresh()->shipping_status)->toBe('picked')
        ->and(data_get($shipment->fresh()->raw_order_response, 'courier.link'))->toBe('https://example.com/tracking/original');
});

it('accepts the first tracking link from an authenticated webhook', function () {
    config(['services.biteship.webhook_secret' => 'tracking-test-secret']);
    $shipment = shipmentWithTrackingLink();
    $shipment->update(['raw_order_response' => null]);

    $this->withHeader('X-Biteship-Webhook-Secret', 'tracking-test-secret')
        ->postJson(route('shipments.biteship.webhook'), [
            'order_id' => $shipment->biteship_order_id,
            'status' => 'picked',
            'courier' => ['link' => 'https://example.com/tracking/first'],
        ])
        ->assertOk();

    expect(data_get($shipment->fresh()->raw_order_response, 'courier.link'))->toBe('https://example.com/tracking/first');
});
