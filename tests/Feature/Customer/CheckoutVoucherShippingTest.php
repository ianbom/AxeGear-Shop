<?php

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use App\Models\Voucher;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

function createCheckoutVoucherCartItem(User $user): void
{
    $name = 'Checkout Voucher Product '.Str::random(8);
    $product = Product::query()->create([
        'name' => $name,
        'slug' => Str::slug($name).'-'.Str::lower(Str::random(6)),
        'regular_price' => 100000,
        'weight' => 500,
        'status' => 'published',
    ]);
    $variant = ProductVariant::query()->create([
        'product_id' => $product->id,
        'sku' => 'CHECKOUT-VOUCHER-'.Str::upper(Str::random(8)),
        'color_name' => 'Black',
        'size' => 'M',
        'stock' => 10,
        'reserved_stock' => 0,
        'is_active' => true,
    ]);
    $cart = Cart::query()->create(['user_id' => $user->id]);

    CartItem::query()->create([
        'cart_id' => $cart->id,
        'product_id' => $product->id,
        'product_variant_id' => $variant->id,
        'quantity' => 1,
        'price_snapshot' => 100000,
    ]);
}

function selectedCheckoutVoucherShippingSession(): array
{
    $rate = [
        'id' => 'test-shipping-rate',
        'courier_company' => 'jne',
        'courier_type' => 'reg',
        'courier_service_name' => 'REG',
        'description' => 'Reguler',
        'duration' => '2 days',
        'price' => 16000,
        'raw' => [],
    ];

    return [
        'checkout.shipping_rates' => [$rate],
        'checkout.shipping_rate_id' => $rate['id'],
        'checkout.customer_address_id' => 1,
        'checkout.cart_hash' => 'test-cart-hash',
        'checkout.rates_expires_at' => now()->addHour()->toIso8601String(),
        'checkout.session_expires_at' => now()->addHour()->toIso8601String(),
        'checkout.selected_rate_binding' => [
            'shipping_rate_id' => $rate['id'],
            'customer_address_id' => 1,
            'cart_hash' => 'test-cart-hash',
        ],
    ];
}

function createCheckoutVoucher(): Voucher
{
    return Voucher::query()->create([
        'code' => 'SAVE10',
        'name' => 'Save 10 Percent',
        'discount_type' => 'percentage',
        'discount_value' => 10,
        'is_active' => true,
    ]);
}

it('preserves selected shipping when applying and removing a voucher', function () {
    $user = User::factory()->create();
    createCheckoutVoucherCartItem($user);
    createCheckoutVoucher();

    $this->actingAs($user)
        ->withSession(selectedCheckoutVoucherShippingSession())
        ->postJson(route('checkout.voucher.apply'), ['voucher_code' => 'SAVE10'])
        ->assertSuccessful()
        ->assertJsonPath('summary.shipping', 16000)
        ->assertJsonPath('summary.discount', 10000)
        ->assertJsonPath('summary.total', 106000)
        ->assertSessionHas('checkout.shipping_rate_id', 'test-shipping-rate')
        ->assertSessionHas('checkout.selected_rate_binding.shipping_rate_id', 'test-shipping-rate');

    $this->deleteJson(route('checkout.voucher.remove'))
        ->assertSuccessful()
        ->assertJsonPath('summary.shipping', 16000)
        ->assertJsonPath('summary.discount', 0)
        ->assertJsonPath('summary.total', 116000)
        ->assertSessionHas('checkout.shipping_rate_id', 'test-shipping-rate')
        ->assertSessionHas('checkout.selected_rate_binding.shipping_rate_id', 'test-shipping-rate');
});

it('applies a voucher with no selected shipping rate', function () {
    $user = User::factory()->create();
    createCheckoutVoucherCartItem($user);
    createCheckoutVoucher();

    $this->actingAs($user)
        ->postJson(route('checkout.voucher.apply'), ['voucher_code' => 'SAVE10'])
        ->assertSuccessful()
        ->assertJsonPath('summary.shipping', 0)
        ->assertJsonPath('summary.discount', 10000)
        ->assertJsonPath('summary.total', 90000);
});

it('clears expired shipping when removing a voucher', function () {
    $user = User::factory()->create();
    createCheckoutVoucherCartItem($user);
    $shippingSession = selectedCheckoutVoucherShippingSession();
    $shippingSession['checkout.session_expires_at'] = now()->subMinute()->toIso8601String();
    $shippingSession['checkout.voucher_code'] = 'SAVE10';

    $this->actingAs($user)
        ->withSession($shippingSession)
        ->deleteJson(route('checkout.voucher.remove'))
        ->assertSuccessful()
        ->assertJsonPath('summary.shipping', 0)
        ->assertJsonPath('summary.discount', 0)
        ->assertSessionMissing('checkout.shipping_rate_id')
        ->assertSessionMissing('checkout.selected_rate_binding');
});
