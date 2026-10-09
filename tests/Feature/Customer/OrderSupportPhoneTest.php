<?php

use App\Models\Order;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

function supportOrderFor(User $customer): Order
{
    return Order::query()->create([
        'user_id' => $customer->id,
        'order_number' => 'ORD-SUPPORT-'.Str::uuid(),
        'customer_name' => $customer->name,
        'customer_email' => $customer->email,
        'customer_phone' => '081234567890',
        'subtotal' => 100000,
        'grand_total' => 100000,
        'payment_status' => 'paid',
        'order_status' => 'shipped',
        'shipping_status' => 'in_transit',
    ]);
}

it('provides the configured support phone on order details', function (array $settings, ?string $expected) {
    config(['inertia.ssr.enabled' => false]);
    $customer = User::factory()->create();
    $order = supportOrderFor($customer);
    foreach ($settings as $key => $value) {
        SiteSetting::query()->create(['key' => $key, 'value' => $value, 'type' => 'string']);
    }

    $this->actingAs($customer)->get(route('order.detail', $order))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('customer/order/detail-order')
            ->where('order.id', $order->id)
            ->where('supportPhone', $expected));
})->with([
    'canonical' => [['store_phone' => '628111111111'], '628111111111'],
    'legacy alias' => [['whatsapp_number' => '081222222222'], '081222222222'],
    'canonical wins' => [['store_phone' => '628111111111', 'whatsapp_number' => '081222222222'], '628111111111'],
    'explicit null wins' => [['store_phone' => null, 'whatsapp_number' => '081222222222'], null],
    'missing' => [[], null],
]);

it('does not expose another customers order through the support phone change', function () {
    $order = supportOrderFor(User::factory()->create());
    $this->actingAs(User::factory()->create())->get(route('order.detail', $order))->assertNotFound();
});
