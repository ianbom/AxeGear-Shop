<?php

use App\Models\SiteSetting;
use App\Models\User;
use App\Services\Admin\SettingManagementService;
use App\Services\Settings\SiteSettingService;
use Database\Seeders\SiteSettingSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;

uses(RefreshDatabase::class);

it('seeds the AxeGear settings without duplicate identities', function () {
    $this->seed(SiteSettingSeeder::class);

    $values = SiteSetting::query()->pluck('value', 'key')->all();
    $expected = [
        'store_name' => 'AxeGear',
        'store_email' => 'indonesiaaxegear@gmail.com',
        'store_phone' => '6285780645938',
        'store_address' => 'Bavva (Samping Erafone atau seberang Solaria), Jl Ciater Raya, Ciater, Serpong, Tangerang Selatan 15310',
        'origin_province' => 'Banten',
        'origin_city' => 'Tangerang Selatan',
        'origin_district' => 'Serpong',
        'store_postal_code' => '15310',
        'store_latitude' => '-6.314540',
        'store_longitude' => '106.699569',
        'contact_maps_url' => 'https://maps.app.goo.gl/hJaZggaoj14kGQqq5',
        'shipping_couriers' => 'jnt,jne',
    ];

    foreach ($expected as $key => $value) {
        expect($values[$key])->toBe($value);
    }

    expect(array_keys($values))->not->toContain('shipper_name', 'shipper_phone', 'whatsapp_number', 'contact_phone', 'origin_address', 'contact_address');
});

it('resolves legacy identities with canonical values taking precedence', function (string $alias, string $canonical) {
    SiteSetting::query()->create(['key' => $alias, 'value' => 'Legacy', 'type' => 'string']);
    $settings = app(SiteSettingService::class);

    expect($settings->get($canonical))->toBe('Legacy')
        ->and($settings->get($alias))->toBe('Legacy');

    SiteSetting::query()->create(['key' => $canonical, 'value' => 'Canonical', 'type' => 'string']);

    expect($settings->get($alias))->toBe('Canonical');

    SiteSetting::query()->where('key', $canonical)->update(['value' => null]);

    expect($settings->get($alias))->toBeNull();
})->with([
    ['shipper_name', 'store_name'],
    ['shipper_phone', 'store_phone'],
    ['whatsapp_number', 'store_phone'],
    ['contact_phone', 'store_phone'],
    ['origin_address', 'store_address'],
    ['contact_address', 'store_address'],
]);

it('shows each identity once and prefills legacy data', function () {
    SiteSetting::query()->create(['key' => 'shipper_phone', 'value' => '6285780645938', 'type' => 'string']);
    $request = Request::create('/admin/settings');
    $route = new Route('GET', '/admin/settings', fn () => null);
    $route->bind($request);
    $request->setRouteResolver(fn () => $route);
    $data = app(SettingManagementService::class)->indexData($request);
    $keys = collect($data['sections'])->flatMap(fn (array $section) => $section['fields'])->pluck('key')->all();

    expect($keys)->toContain('store_name', 'store_phone', 'store_address', 'contact_maps_url')
        ->not->toContain('shipper_name', 'shipper_phone', 'whatsapp_number', 'contact_phone', 'origin_address', 'contact_address')
        ->and($data['values']['store_phone'])->toBe('6285780645938');
});

it('accepts legacy submissions but saves only canonical identities', function () {
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);

    $this->actingAs($admin)->put(route('admin.settings.update'), [
        'shipper_name' => 'AxeGear',
        'shipper_phone' => '6285780645938',
        'origin_address' => 'Bavva',
    ])->assertSessionHasNoErrors()->assertRedirect();

    expect(SiteSetting::query()->pluck('value', 'key')->all())->toBe([
        'store_name' => 'AxeGear',
        'store_phone' => '6285780645938',
        'store_address' => 'Bavva',
    ]);

    $this->put(route('admin.settings.update'), [
        'store_phone' => '628111111111',
        'whatsapp_number' => '628222222222',
    ])->assertSessionHasNoErrors()->assertRedirect();

    expect(app(SiteSettingService::class)->get('shipper_phone'))->toBe('628111111111')
        ->and(app(SiteSettingService::class)->get('store_name'))->toBe('AxeGear');

    $this->put(route('admin.settings.update'), ['store_phone' => null, 'shipper_phone' => '628333333333'])
        ->assertSessionHasNoErrors()->assertRedirect();

    expect(app(SiteSettingService::class)->get('shipper_phone'))->toBeNull();

    $this->put(route('admin.settings.update'), ['shipper_phone' => str_repeat('1', 31)])
        ->assertSessionHasErrors('store_phone');

    expect(app(SiteSettingService::class)->get('store_phone'))->toBeNull();
});
