<?php

use App\Models\Cart;
use App\Models\CustomerAddress;
use App\Models\Order;
use App\Models\Product;
use App\Models\SiteSetting;
use App\Models\User;
use App\Services\Integrations\BiteshipService;
use App\Services\Settings\SiteSettingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

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

function createCheckoutShippingCart(array $quantities = [4], bool $withDimensions = true, int $nextRatePrice = 20000): array
{
    $rate = [
        'courier_company' => 'jne',
        'courier_type' => 'reg',
        'courier_service_name' => 'Reguler',
        'duration' => '2 - 3 days',
        'price' => 20000,
    ];
    Http::fake([
        'api.biteship.com/v1/rates/couriers' => Http::sequence()
            ->push(['pricing' => [$rate]])
            ->push(['pricing' => [[...$rate, 'price' => $nextRatePrice]]]),
        '*/snap/v1/transactions' => Http::response(['token' => 'test-token', 'redirect_url' => 'https://example.test/payment']),
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
            'weight' => 100 + $index * 150,
            'length' => $withDimensions ? 10 : null,
            'width' => $withDimensions ? 5 : null,
            'height' => $withDimensions ? 8 : null,
            'status' => 'published',
        ]);
        $variant = $product->variants()->create(['sku' => 'SHIP-'.Str::uuid(), 'stock' => 10, 'reserved_stock' => 0, 'is_active' => true]);
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
        expect($order->items()->where('product_id', $product->id)->firstOrFail()->weight)->toBe($product->weight * $quantities[$index]);
        $product->update(['weight' => 9999, 'length' => 99, 'width' => 99, 'height' => 99]);
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
    'no dimensions' => [[4], false],
]);

it('rejects a selected rate when physical product attributes change', function (array $changes) {
    [$customer, $address, $products] = createCheckoutShippingCart();
    $rate = $this->actingAs($customer)->postJson(route('checkout.shipping-rates'), ['customer_address_id' => $address->id])
        ->assertOk()->json('rates.0');
    $this->postJson(route('checkout.shipping-rate'), ['shipping_rate_id' => $rate['id']])->assertOk();
    $products[0]->update($changes);

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
