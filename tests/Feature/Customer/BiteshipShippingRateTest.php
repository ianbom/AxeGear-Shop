<?php

use App\Models\Cart;
use App\Models\CustomerAddress;
use App\Models\Order;
use App\Models\Product;
use App\Models\SiteSetting;
use App\Models\User;
use App\Models\Voucher;
use App\Services\Customer\CheckoutService;
use App\Services\Integrations\BiteshipService;
use App\Services\Settings\SiteSettingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

it('discards invalid shipping prices while preserving explicit free shipping', function () {
    $prices = [[], ['price' => null], ['price' => 'invalid'], ['price' => -1], ['price' => 0], ['shipping_fee' => 16000]];
    Http::fake(['api.biteship.com/v1/rates/couriers' => Http::response([
        'pricing' => array_map(fn ($price) => ['courier_company' => 'jne', 'courier_type' => 'reg', ...$price], $prices),
    ])]);
    $rates = app(BiteshipService::class)->shippingRates(['postal_code' => '40123', 'latitude' => -6.8, 'longitude' => 107.6], [['name' => 'Test', 'weight' => 100, 'quantity' => 1, 'value' => 100000]]);

    expect(array_column($rates, 'price'))->toBe([0.0, 16000.0]);
});

it('preserves the cart and reservations when Snap creation is uncertain', function (string $outcome) {
    $snapResponse = match ($outcome) {
        'timeout' => fn () => throw new ConnectionException('Snap timeout'),
        'server_error' => Http::response(['error' => 'Unavailable'], 503),
        'malformed_rejection' => Http::response([], 400),
        'duplicate_order' => Http::response(['error_messages' => ['order_id has already been taken']], 406),
        'missing_redirect' => Http::response(['token' => 'test-token']),
        'invalid_redirect' => Http::response(['token' => 'test-token', 'redirect_url' => 'not-a-url']),
        default => Http::response([]),
    };
    [$customer, $address] = createCheckoutShippingCart([1], snapResponse: $snapResponse);
    $voucher = Voucher::query()->create(['code' => 'REVIEW10', 'name' => 'Review test', 'discount_type' => 'percentage', 'discount_value' => 10, 'is_active' => true]);
    $this->actingAs($customer)->postJson(route('checkout.voucher.apply'), ['voucher_code' => 'REVIEW10'])->assertOk();
    $rate = $this->actingAs($customer)->postJson(route('checkout.shipping-rates'), ['customer_address_id' => $address->id])->assertOk()->json('rates.0');
    $this->postJson(route('checkout.shipping-rate'), ['shipping_rate_id' => $rate['id']])->assertOk();
    $payload = ['customer_address_id' => $address->id, 'shipping_rate_id' => $rate['id'], 'idempotency_key' => (string) Str::uuid(), 'no_return_refund_agreed' => true];

    $this->postJson(route('checkout.place-order'), $payload)->assertUnprocessable()->assertJsonValidationErrors('payment');
    $order = Order::query()->sole();
    expect($order->payment_status)->toBe('manual_review')
        ->and($order->payment->transaction_status)->toBe('manual_review')
        ->and($order->stock_released_at)->toBeNull()
        ->and($voucher->fresh()->used_count)->toBe(1)
        ->and($order->items->first()->variant->reserved_stock)->toBe(1)
        ->and(Cart::query()->sole()->items()->count())->toBe(1);
    $this->postJson(route('checkout.place-order'), $payload)->assertUnprocessable();
    expect(Order::query()->count())->toBe(1);
})->with(['timeout', 'empty_response', 'server_error', 'malformed_rejection', 'duplicate_order', 'missing_redirect', 'invalid_redirect']);

it('releases reservations only for a confirmed Snap rejection', function () {
    [$customer, $address] = createCheckoutShippingCart([1], snapResponse: Http::response(['error_messages' => ['transaction_details.gross_amount is invalid']], 400));
    $rate = $this->actingAs($customer)->postJson(route('checkout.shipping-rates'), ['customer_address_id' => $address->id])->assertOk()->json('rates.0');
    $this->postJson(route('checkout.shipping-rate'), ['shipping_rate_id' => $rate['id']])->assertOk();
    $this->postJson(route('checkout.place-order'), ['customer_address_id' => $address->id, 'shipping_rate_id' => $rate['id'], 'idempotency_key' => (string) Str::uuid(), 'no_return_refund_agreed' => true])->assertUnprocessable();

    $order = Order::query()->sole();
    expect($order->payment_status)->toBe('failed')
        ->and($order->stock_released_at)->not->toBeNull()
        ->and($order->items->first()->variant->reserved_stock)->toBe(0)
        ->and(Cart::query()->sole()->items()->count())->toBe(1);
});

it('uses one rounded IDR total in checkout and the Snap item details', function () {
    [$customer, $address, $products] = createCheckoutShippingCart([1]);
    $products[0]->update(['regular_price' => 100001]);
    Cart::query()->sole()->items()->update(['price_snapshot' => 100001]);
    Voucher::query()->create(['code' => 'ROUND10', 'name' => 'Round test', 'discount_type' => 'percentage', 'discount_value' => 10, 'is_active' => true]);
    $this->actingAs($customer)->postJson(route('checkout.voucher.apply'), ['voucher_code' => 'ROUND10'])->assertOk()->assertJsonPath('summary.total', 90001);
    $rate = $this->actingAs($customer)->postJson(route('checkout.shipping-rates'), ['customer_address_id' => $address->id])->assertOk()->json('rates.0');
    $this->postJson(route('checkout.shipping-rate'), ['shipping_rate_id' => $rate['id']])->assertOk();
    $this->postJson(route('checkout.place-order'), ['customer_address_id' => $address->id, 'shipping_rate_id' => $rate['id'], 'idempotency_key' => (string) Str::uuid(), 'no_return_refund_agreed' => true])->assertSuccessful();

    $order = Order::query()->sole();
    expect($order->grand_total)->toBe('110001.00')->and($order->payment->gross_amount)->toBe('110001.00');
    Http::assertSent(function (Request $request): bool {
        return str_contains($request->url(), '/snap/v1/transactions')
            && $request['transaction_details']['gross_amount'] === 110001
            && collect($request['item_details'])->sum(fn ($item) => $item['price'] * $item['quantity']) === 110001;
    });
});

beforeEach(function () {
    config(['services.biteship.api_key' => 'test-key', 'services.midtrans.server_key' => 'test-key']);
    Mail::fake();
    Http::preventStrayRequests();

    foreach ([
        'store_name' => 'Test Store',
        'store_phone' => '081234567890',
        'store_address' => 'Jl. Store No. 1',
        'store_postal_code' => '60111',
        'store_latitude' => '-7.2575',
        'store_longitude' => '112.7521',
    ] as $key => $value) {
        SiteSetting::query()->create(['key' => $key, 'value' => $value]);
    }

});

function createCheckoutShippingCart(array $quantities = [4], bool $withDimensions = true, int $nextRatePrice = 20000, mixed $snapResponse = null, ?Closure $onRateRefresh = null): array
{
    $rate = [
        'courier_company' => 'jne',
        'courier_type' => 'reg',
        'courier_service_name' => 'Reguler',
        'duration' => '2 - 3 days',
        'price' => 20000,
    ];
    $rateRequests = 0;
    Http::fake([
        'api.biteship.com/v1/rates/couriers' => function () use (&$rateRequests, $rate, $nextRatePrice, $onRateRefresh) {
            $rateRequests++;
            if ($rateRequests > 1 && $onRateRefresh) {
                $onRateRefresh();
            }

            return Http::response(['pricing' => [[...$rate, 'price' => $rateRequests > 1 ? $nextRatePrice : $rate['price']]]]);
        },
        '*/snap/v1/transactions' => $snapResponse ?? Http::response(['token' => 'test-token', 'redirect_url' => 'https://example.test/payment']),
        'api.biteship.com/v1/orders' => Http::response(['id' => 'test-booking', 'status' => 'confirmed']),
    ]);
    $customer = User::factory()->create();
    $address = CustomerAddress::query()->create([
        'user_id' => $customer->id,
        'recipient_name' => $customer->name,
        'recipient_phone' => '081234567890',
        'province' => 'Jawa Barat',
        'city' => 'Bandung',
        'district' => 'Coblong',
        'postal_code' => '40123',
        'latitude' => '-6.8841',
        'longitude' => '107.6137',
        'full_address' => 'Jl. Customer No. 1',
    ]);
    $cart = Cart::query()->create(['user_id' => $customer->id]);
    $products = [];

    foreach ($quantities as $index => $quantity) {
        $product = Product::query()->create([
            'name' => 'Shipping product '.$index,
            'slug' => 'shipping-'.Str::uuid(),
            'regular_price' => 100000,
            'weight' => 9999,
            'length' => 99,
            'width' => 99,
            'height' => 99,
            'status' => 'published',
        ]);
        $variant = $product->variants()->create([
            'sku' => 'SHIP-'.Str::uuid(), 'stock' => 10, 'reserved_stock' => 0, 'is_active' => true,
            'weight' => 100 + $index * 150,
            'length' => $withDimensions ? 10 : null,
            'width' => $withDimensions ? 5 : null,
            'height' => $withDimensions ? 8 : null,
        ]);
        $cart->items()->create([
            'product_id' => $product->id,
            'product_variant_id' => $variant->id,
            'quantity' => $quantity,
            'price_snapshot' => 100000,
        ]);
        $products[] = $product;
    }

    return [$customer, $address, $products];
}

test('shipping rates use store and destination postal codes', function () {
    config(['services.biteship.api_key' => 'test-key']);
    $settings = new class extends SiteSettingService
    {
        public function get(string $key, ?string $default = null): ?string
        {
            return match ($key) {
                'store_postal_code' => '60111',
                'store_latitude' => '-7.2575',
                'store_longitude' => '112.7521',
                default => $default,
            };
        }

        public function first(array $keys, ?string $default = null): ?string
        {
            return $default;
        }
    };

    Http::fake([
        'api.biteship.com/v1/rates/couriers' => Http::response([
            'pricing' => [
                [
                    'company' => 'jne',
                    'courier_name' => 'JNE',
                    'courier_code' => 'jne',
                    'courier_service_name' => 'Reguler',
                    'courier_service_code' => 'reg',
                    'description' => 'Layanan reguler',
                    'duration' => '2 - 3 days',
                    'shipping_fee' => 16000,
                    'type' => 'reg',
                ],
            ],
        ]),
    ]);

    $rates = (new BiteshipService($settings))->shippingRates([
        'postal_code' => '40123',
        'latitude' => '-6.8841',
        'longitude' => '107.6137',
    ], [
        [
            'name' => 'Khimar',
            'description' => 'SKU-1',
            'value' => 150000,
            'quantity' => 1,
            'weight' => 500,
        ],
    ]);

    Http::assertSent(fn ($request): bool => $request->url() === 'https://api.biteship.com/v1/rates/couriers'
        && $request['origin_postal_code'] === '60111'
        && $request['destination_postal_code'] === '40123'
        && $request['origin_latitude'] === -7.2575
        && $request['destination_latitude'] === -6.8841
        && ! isset($request['origin_area_id'], $request['destination_area_id']));

    expect($rates)->toHaveCount(1)
        ->and($rates[0]['courier_company'])->toBe('jne')
        ->and($rates[0]['courier_type'])->toBe('reg')
        ->and($rates[0]['courier_service_name'])->toBe('Reguler')
        ->and($rates[0]['price'])->toBe(16000.0);
});

it('quotes and books matching unit weights and dimensions from the order snapshot', function (array $quantities, bool $withDimensions) {
    [$customer, $address, $products] = createCheckoutShippingCart($quantities, $withDimensions);
    $rate = $this->actingAs($customer)->postJson(route('checkout.shipping-rates'), ['customer_address_id' => $address->id])
        ->assertOk()->json('rates.0');
    $this->postJson(route('checkout.shipping-rate'), ['shipping_rate_id' => $rate['id']])->assertOk();
    $result = $this->postJson(route('checkout.place-order'), [
        'customer_address_id' => $address->id,
        'shipping_rate_id' => $rate['id'],
        'idempotency_key' => (string) Str::uuid(),
        'no_return_refund_agreed' => true,
    ])->assertOk()->json();
    $order = Order::query()->findOrFail($result['order_id']);

    foreach ($products as $index => $product) {
        expect($order->items()->where('product_id', $product->id)->firstOrFail()->weight)->toBe((100 + $index * 150) * $quantities[$index]);
        $product->update(['weight' => 8888, 'length' => 88, 'width' => 88, 'height' => 88]);
        $product->variants()->update(['weight' => 7777, 'length' => 77, 'width' => 77, 'height' => 77]);
    }

    $order->update(['order_status' => 'ready_to_ship', 'payment_status' => 'paid']);
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);
    $this->actingAs($admin)->post(route('admin.orders.shipments.store', $order), ['source' => 'order_detail'])->assertSessionHasNoErrors();

    $quoteRequests = Http::recorded(fn (Request $request): bool => $request->url() === 'https://api.biteship.com/v1/rates/couriers');
    $bookingRequest = Http::recorded(fn (Request $request): bool => $request->url() === 'https://api.biteship.com/v1/orders')->sole()[0];
    expect($quoteRequests)->toHaveCount(2);

    foreach ($quoteRequests as [$quoteRequest]) {
        $fields = ['name', 'value', 'quantity', 'weight', 'length', 'width', 'height'];
        $quoteItems = collect($quoteRequest['items'])->map(fn (array $item): array => Arr::only($item, $fields))->keyBy('name')->all();
        $bookingItems = collect($bookingRequest['items'])->map(fn (array $item): array => Arr::only($item, $fields))->keyBy('name')->all();
        expect($bookingItems)->toEqual($quoteItems);

        foreach ($quantities as $index => $quantity) {
            $item = $quoteItems['Shipping product '.$index];
            expect($item['quantity'])->toBe($quantity)->and($item['weight'])->toBe(100 + $index * 150);

            if ($withDimensions) {
                expect(Arr::only($item, ['length', 'width', 'height']))->toBe(['length' => 10, 'width' => 5, 'height' => 8]);
            } else {
                expect($item)->not->toHaveKeys(['length', 'width', 'height']);
            }
        }
    }

    expect($bookingRequest['courier_company'])->toBe('jne')->and($bookingRequest['courier_type'])->toBe('reg');
    expect($order->fresh()->shipping_cost)->toBe('20000.00')
        ->and($order->fresh()->grand_total)->toBe(number_format(array_sum($quantities) * 100000 + 20000, 2, '.', ''));
})->with([
    'single item' => [[1], true],
    'reported quantity four' => [[4], true],
    'multiple products' => [[4, 2], true],
]);

it('rejects a selected rate when variant shipping attributes change', function (array $changes) {
    [$customer, $address, $products] = createCheckoutShippingCart();
    $rate = $this->actingAs($customer)->postJson(route('checkout.shipping-rates'), ['customer_address_id' => $address->id])
        ->assertOk()->json('rates.0');
    $this->postJson(route('checkout.shipping-rate'), ['shipping_rate_id' => $rate['id']])->assertOk();
    $products[0]->variants()->firstOrFail()->update($changes);

    $this->postJson(route('checkout.place-order'), [
        'customer_address_id' => $address->id,
        'shipping_rate_id' => $rate['id'],
        'idempotency_key' => (string) Str::uuid(),
        'no_return_refund_agreed' => true,
    ])->assertUnprocessable()->assertJsonValidationErrors('shipping_rate_id')
        ->assertJsonPath('errors.shipping_rate_id.0', 'Keranjang berubah. Pilih ulang ongkir.');

    expect(Order::query()->count())->toBe(0);
    Http::assertSentCount(1);
})->with([
    'weight' => [['weight' => 101]],
    'length' => [['length' => 11]],
    'width' => [['width' => 6]],
    'height' => [['height' => 9]],
]);

it('rejects invalid variant dimensions before requesting rates without falling back to product dimensions', function (string $field, ?int $value) {
    [$customer, $address, $products] = createCheckoutShippingCart();
    $variant = $products[0]->variants()->sole();
    $variant->update([$field => $value]);

    $this->actingAs($customer)->postJson(route('checkout.shipping-rates'), ['customer_address_id' => $address->id])
        ->assertUnprocessable()->assertJsonValidationErrors('shipping');

    expect(Order::query()->count())->toBe(0)->and($variant->fresh()->reserved_stock)->toBe(0);
    Http::assertNothingSent();
})->with(['weight', 'length', 'width', 'height'])->with([null, 0, -1]);

it('rejects invalid variant dimensions after selecting a rate without creating an order', function (string $field, ?int $value) {
    [$customer, $address, $products] = createCheckoutShippingCart();
    $rate = $this->actingAs($customer)->postJson(route('checkout.shipping-rates'), ['customer_address_id' => $address->id])->assertOk()->json('rates.0');
    $this->postJson(route('checkout.shipping-rate'), ['shipping_rate_id' => $rate['id']])->assertOk();
    $variant = $products[0]->variants()->sole();
    $variant->update([$field => $value]);

    $this->postJson(route('checkout.place-order'), [
        'customer_address_id' => $address->id, 'shipping_rate_id' => $rate['id'],
        'idempotency_key' => (string) Str::uuid(), 'no_return_refund_agreed' => true,
    ])->assertUnprocessable()->assertJsonValidationErrors('shipping');

    expect(Order::query()->count())->toBe(0)->and($variant->fresh()->reserved_stock)->toBe(0);
    Http::assertSentCount(1);
})->with(['weight', 'length', 'width', 'height'])->with([null, 0, -1]);

it('does not invalidate a shipping quote when only product dimensions change', function () {
    [$customer, $address, $products] = createCheckoutShippingCart();
    $rate = $this->actingAs($customer)->postJson(route('checkout.shipping-rates'), ['customer_address_id' => $address->id])->assertOk()->json('rates.0');
    $this->postJson(route('checkout.shipping-rate'), ['shipping_rate_id' => $rate['id']])->assertOk();
    $products[0]->update(['weight' => 1, 'length' => 1, 'width' => 1, 'height' => 1]);

    $this->postJson(route('checkout.place-order'), [
        'customer_address_id' => $address->id, 'shipping_rate_id' => $rate['id'],
        'idempotency_key' => (string) Str::uuid(), 'no_return_refund_agreed' => true,
    ])->assertOk();

    $item = Order::query()->sole()->items()->sole();
    expect($item->weight)->toBe(400)->and($item->length)->toBe(10)->and($item->width)->toBe(5)->and($item->height)->toBe(8);
});

it('uses distinct sizes for two variants of the same product', function () {
    [$customer, $address, $products] = createCheckoutShippingCart([4]);
    $variant = $products[0]->variants()->create([
        'sku' => 'SECOND-VARIANT', 'stock' => 10, 'is_active' => true,
        'weight' => 350, 'length' => 20, 'width' => 15, 'height' => 12,
    ]);
    Cart::query()->sole()->items()->create([
        'product_id' => $products[0]->id, 'product_variant_id' => $variant->id,
        'quantity' => 2, 'price_snapshot' => 100000,
    ]);
    expect(collect(app(CheckoutService::class)->pageData($customer)['cartItems'])->sum('weight'))->toBe(1100);
    $rate = $this->actingAs($customer)->postJson(route('checkout.shipping-rates'), ['customer_address_id' => $address->id])->assertOk()->json('rates.0');
    $this->postJson(route('checkout.shipping-rate'), ['shipping_rate_id' => $rate['id']])->assertOk();
    $this->postJson(route('checkout.place-order'), [
        'customer_address_id' => $address->id, 'shipping_rate_id' => $rate['id'],
        'idempotency_key' => (string) Str::uuid(), 'no_return_refund_agreed' => true,
    ])->assertOk();

    $item = Order::query()->sole()->items()->where('product_variant_id', $variant->id)->sole();
    expect($item->weight)->toBe(700)->and($item->length)->toBe(20)->and($item->width)->toBe(15)->and($item->height)->toBe(12);
    Http::assertSent(fn (Request $request): bool => str_contains($request->url(), '/rates/couriers')
        && collect($request['items'])->firstWhere('description', 'SECOND-VARIANT')['weight'] === 350);

    $order = Order::query()->sole();
    $order->update(['order_status' => 'ready_to_ship', 'payment_status' => 'paid']);
    $this->actingAs(User::factory()->create(['role' => 'admin', 'is_active' => true]))
        ->post(route('admin.orders.shipments.store', $order), ['source' => 'order_detail'])->assertSessionHasNoErrors();
    $booking = Http::recorded(fn (Request $request): bool => str_ends_with($request->url(), '/v1/orders'))->sole()[0];
    $items = collect($booking['items'])->keyBy('sku');
    expect($items['SECOND-VARIANT']['weight'])->toBe(350)->and($items['SECOND-VARIANT']['quantity'])->toBe(2)
        ->and(Arr::only($items['SECOND-VARIANT'], ['length', 'width', 'height']))->toEqual(['length' => 20, 'width' => 15, 'height' => 12])
        ->and($items[$products[0]->variants()->oldest('id')->firstOrFail()->sku]['weight'])->toBe(100);
});

it('rechecks locked variant dimensions after refreshing the provider quote', function (?int $weight) {
    $variant = null;
    [$customer, $address, $products] = createCheckoutShippingCart(onRateRefresh: function () use (&$variant, $weight) {
        $variant->update(['weight' => $weight]);
    });
    $variant = $products[0]->variants()->sole();
    $rate = $this->actingAs($customer)->postJson(route('checkout.shipping-rates'), ['customer_address_id' => $address->id])->assertOk()->json('rates.0');
    $this->postJson(route('checkout.shipping-rate'), ['shipping_rate_id' => $rate['id']])->assertOk();

    $this->postJson(route('checkout.place-order'), [
        'customer_address_id' => $address->id, 'shipping_rate_id' => $rate['id'],
        'idempotency_key' => (string) Str::uuid(), 'no_return_refund_agreed' => true,
    ])->assertUnprocessable()->assertJsonValidationErrors($weight ? 'shipping_rate_id' : 'shipping');

    expect(Order::query()->count())->toBe(0)->and($variant->fresh()->reserved_stock)->toBe(0);
    Http::assertSentCount(2);
})->with([101, null]);

it('rejects a selected rate when Biteship changes the price before payment', function () {
    [$customer, $address] = createCheckoutShippingCart(nextRatePrice: 40000);
    $rate = $this->actingAs($customer)->postJson(route('checkout.shipping-rates'), ['customer_address_id' => $address->id])
        ->assertOk()->json('rates.0');
    $this->postJson(route('checkout.shipping-rate'), ['shipping_rate_id' => $rate['id']])->assertOk();

    $this->postJson(route('checkout.place-order'), [
        'customer_address_id' => $address->id,
        'shipping_rate_id' => $rate['id'],
        'idempotency_key' => (string) Str::uuid(),
        'no_return_refund_agreed' => true,
    ])->assertUnprocessable()->assertJsonValidationErrors('shipping_rate_id')
        ->assertJsonPath('errors.shipping_rate_id.0', 'Ongkir berubah. Pilih ulang ongkir.');

    expect(Order::query()->count())->toBe(0);
    Http::assertSentCount(2);
});
