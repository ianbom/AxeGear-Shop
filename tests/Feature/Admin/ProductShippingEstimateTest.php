<?php

use App\Models\SiteSetting;
use App\Models\User;
use App\Services\Integrations\BiteshipService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

uses(RefreshDatabase::class);

beforeEach(function () {
    config(['services.biteship.api_key' => 'test-key']);
    foreach (['store_latitude' => '-6.314540', 'store_longitude' => '106.699569', 'shipping_couriers' => 'jne,jnt'] as $key => $value) {
        SiteSetting::query()->updateOrCreate(['key' => $key], ['value' => $value]);
    }
    Http::preventStrayRequests();
    $this->actingAs(User::factory()->create(['role' => 'admin', 'is_active' => true]));
});

function shippingEstimateInput(): array
{
    return ['weight' => 500, 'length' => 20, 'width' => 15, 'height' => 10];
}

it('estimates one unsaved product using a destination one kilometre north and sorts rates', function () {
    Http::fake(['api.biteship.com/v1/rates/couriers' => Http::response(['pricing' => [
        ['courier_company' => 'jne', 'courier_type' => 'reg', 'courier_service_name' => 'REG', 'price' => 12000],
        ['courier_company' => 'jnt', 'courier_type' => 'ez', 'courier_service_name' => 'EZ', 'price' => 9000],
    ]])]);
    $this->postJson(route('admin.products.shipping-estimate'), shippingEstimateInput())
        ->assertOk()->assertJsonCount(2, 'rates')->assertJsonPath('rates.0.price', 9000);
    Http::assertSent(function ($request) {
        $distance = deg2rad($request['destination_latitude'] - $request['origin_latitude']) * 6371000;

        return abs($distance - 1000) < 0.01
            && $request['origin_longitude'] === $request['destination_longitude']
            && ! isset($request['destination_postal_code'])
            && $request['couriers'] === 'jne,jnt'
            && $request['items'] === [['name' => 'Simulasi produk', 'value' => 0, 'quantity' => 1, ...shippingEstimateInput()]];
    });
    Http::assertSentCount(1);
    $this->assertDatabaseCount('products', 0);
    $this->assertDatabaseCount('admin_activity_logs', 0);
});

it('rejects incomplete or invalid dimensions without contacting Biteship', function () {
    $this->postJson(route('admin.products.shipping-estimate'), ['weight' => 0, 'length' => -1, 'width' => 'wrong'])
        ->assertUnprocessable()->assertJsonValidationErrors(['weight', 'length', 'width', 'height']);
    Http::assertNothingSent();
});

it('rejects customers and inactive admins', function (string $role, bool $active) {
    $this->actingAs(User::factory()->create(['role' => $role, 'is_active' => $active]))
        ->postJson(route('admin.products.shipping-estimate'), shippingEstimateInput())->assertForbidden();
    Http::assertNothingSent();
})->with([['customer', true], ['admin', false]]);

it('explains missing store coordinates without contacting Biteship', function () {
    SiteSetting::query()->where('key', 'store_latitude')->delete();
    $this->postJson(route('admin.products.shipping-estimate'), shippingEstimateInput())
        ->assertUnprocessable()->assertJsonValidationErrors('shipping');
    Http::assertNothingSent();
});

it('returns an empty list when no services cover the simulated destination', function () {
    Http::fake(['api.biteship.com/*' => Http::response(['pricing' => []])]);
    $this->postJson(route('admin.products.shipping-estimate'), shippingEstimateInput())
        ->assertOk()->assertJsonPath('rates', []);
});

it('handles provider rejection without exposing provider details', function () {
    Http::fake(['api.biteship.com/*' => Http::response(['error' => 'provider-secret'], 400)]);
    $this->postJson(route('admin.products.shipping-estimate'), shippingEstimateInput())
        ->assertUnprocessable()->assertJsonValidationErrors('shipping')->assertDontSee('provider-secret');
});

it('handles provider connection failures', function () {
    Http::fake(fn () => throw new ConnectionException('provider-secret'));
    $this->postJson(route('admin.products.shipping-estimate'), shippingEstimateInput())
        ->assertStatus(503)->assertDontSee('provider-secret');
});

it('preserves the checkout postal codes and selected destination', function () {
    SiteSetting::query()->updateOrCreate(['key' => 'store_postal_code'], ['value' => '15310']);
    Http::fake(['api.biteship.com/*' => Http::response(['pricing' => []])]);
    app(BiteshipService::class)->shippingRates(['postal_code' => '15418', 'latitude' => -6.32, 'longitude' => 106.71], []);
    Http::assertSent(fn ($request) => $request['origin_postal_code'] === '15310'
        && $request['destination_postal_code'] === '15418'
        && $request['destination_latitude'] === -6.32
        && $request['destination_longitude'] === 106.71);
});

it('requires login to estimate rates', function () {
    auth()->logout();
    $this->postJson(route('admin.products.shipping-estimate'), shippingEstimateInput())->assertUnauthorized();
    Http::assertNothingSent();
});

it('explains a missing API key', function () {
    config(['services.biteship.api_key' => ' ']);
    $this->postJson(route('admin.products.shipping-estimate'), shippingEstimateInput())
        ->assertUnprocessable()->assertJsonValidationErrors('shipping');
    Http::assertNothingSent();
});

it('limits automatic estimates to thirty requests per minute', function () {
    $this->mock(BiteshipService::class)->shouldReceive('productShippingEstimate')->times(30)->andReturn([]);
    for ($index = 0; $index < 30; $index++) {
        $this->postJson(route('admin.products.shipping-estimate'), shippingEstimateInput())->assertOk();
    }
    $this->postJson(route('admin.products.shipping-estimate'), shippingEstimateInput())->assertTooManyRequests();
    Http::assertNothingSent();
});
