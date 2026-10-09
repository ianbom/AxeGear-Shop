<?php

use App\Models\SiteSetting;
use Database\Seeders\SiteSettingSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    config(['inertia.ssr.enabled' => false]);
    Http::preventStrayRequests();
});

it('shows the seeded public contact settings and current database changes', function () {
    $this->seed(SiteSettingSeeder::class);
    SiteSetting::query()->create(['key' => 'midtrans_server_key', 'value' => 'private-key', 'type' => 'string']);

    $this->get(route('contact'))->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('contact/index')
        ->has('contactSettings', 10)
        ->where('contactSettings.store_name', 'AxeGear')
        ->where('contactSettings.store_phone', '6285780645938')
        ->where('contactSettings.store_email', 'indonesiaaxegear@gmail.com')
        ->where('contactSettings.store_address', SiteSetting::query()->where('key', 'store_address')->value('value'))
        ->where('contactSettings.business_hours', SiteSetting::query()->where('key', 'business_hours')->value('value'))
        ->where('contactSettings.store_latitude', '-6.314540')
        ->where('contactSettings.store_longitude', '106.699569')
        ->where('contactSettings.contact_maps_url', SiteSetting::query()->where('key', 'contact_maps_url')->value('value'))
        ->where('contactSettings.instagram_url', SiteSetting::query()->where('key', 'instagram_url')->value('value'))
        ->where('contactSettings.tiktok_url', SiteSetting::query()->where('key', 'tiktok_url')->value('value'))
        ->missing('contactSettings.midtrans_server_key')
        ->missing('contactSettings.payment_expiry_duration'));

    SiteSetting::query()->where('key', 'store_email')->update(['value' => 'updated@example.com']);
    $this->get(route('contact'))->assertInertia(fn (Assert $page) => $page->where('contactSettings.store_email', 'updated@example.com'));
});

it('uses legacy contact identities without overriding explicit canonical values', function () {
    foreach (['shipper_name' => 'Legacy store', 'whatsapp_number' => '6281234567890', 'contact_address' => 'Legacy address'] as $key => $value) {
        SiteSetting::query()->create(['key' => $key, 'value' => $value, 'type' => 'string']);
    }

    $this->get(route('contact'))->assertInertia(fn (Assert $page) => $page
        ->where('contactSettings.store_name', 'Legacy store')
        ->where('contactSettings.store_phone', '6281234567890')
        ->where('contactSettings.store_address', 'Legacy address')
        ->missing('contactSettings.whatsapp_number'));

    SiteSetting::query()->create(['key' => 'store_phone', 'value' => null, 'type' => 'string']);
    SiteSetting::query()->create(['key' => 'store_address', 'value' => 'Current address', 'type' => 'string']);
    $this->get(route('contact'))->assertInertia(fn (Assert $page) => $page
        ->where('contactSettings.store_phone', null)
        ->where('contactSettings.store_address', 'Current address'));
});

it('renders contact with explicit empty values when settings are missing', function () {
    $this->get(route('contact'))->assertOk()->assertInertia(fn (Assert $page) => $page
        ->has('contactSettings', 10)
        ->where('contactSettings.store_phone', null)
        ->where('contactSettings.store_email', null)
        ->where('contactSettings.store_address', null)
        ->where('contactSettings.business_hours', null)
        ->where('contactSettings.contact_maps_url', null)
        ->where('contactSettings.instagram_url', null));
});
