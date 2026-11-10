<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;

uses(RefreshDatabase::class);

it('matches the ecommerce database specification', function () {
    foreach ([
        'product_collections',
        'voucher_products',
        'voucher_categories',
        'product_reviews',
    ] as $table) {
        expect(Schema::hasTable($table))->toBeTrue($table.' table is missing');
    }

    expect(Schema::hasColumns('products', [
        'brand_name',
        'product_line',
        'style_name',
        'regular_price',
    ]))->toBeTrue();

    expect(Schema::hasColumns('product_variants', [
        'variant_name',
        'package_type',
        'regular_price',
        'stock',
        'reserved_stock',
    ]))->toBeTrue();

    expect(Schema::hasColumns('banners', ['title', 'is_active']))->toBeTrue()
        ->and(Schema::hasColumn('banners', 'starts_at'))->toBeFalse()
        ->and(Schema::hasColumn('banners', 'ends_at'))->toBeFalse()
        ->and(Schema::hasColumn('products', 'meta_title'))->toBeFalse()
        ->and(Schema::hasColumn('products', 'meta_description'))->toBeFalse()
        ->and(Schema::hasColumn('products', 'stock_status'))->toBeFalse()
        ->and(Schema::hasColumn('products', 'barcode'))->toBeFalse()
        ->and(Schema::hasColumn('product_variants', 'barcode'))->toBeFalse()
        ->and(Schema::hasColumn('product_variants', 'reserved_stock'))->toBeTrue();

    expect(Schema::hasColumns('orders', [
        'insurance_cost',
        'source_channel',
        'stock_reserved_at',
        'stock_released_at',
        'stock_finalized_at',
    ]))->toBeTrue();
});

it('preserves configured payment expiry when defaults are seeded again', function () {
    \Illuminate\Support\Facades\DB::table('site_settings')->insert([
        'key' => 'payment_expiry_duration', 'value' => '30', 'type' => 'integer',
    ]);
    $this->seed(\Database\Seeders\SiteSettingSeeder::class);
    expect(\Illuminate\Support\Facades\DB::table('site_settings')->where('key', 'payment_expiry_duration')->value('value'))->toBe('30');
});

it('stores DOKU payment identities without legacy gateway columns', function () {
    expect(Schema::hasColumns('payments', [
        'provider_reference', 'create_request_id', 'checkout_url', 'expires_at', 'last_synced_at',
    ]))->toBeTrue();

    foreach (['midtrans_order_id', 'midtrans_transaction_id', 'midtrans_snap_token', 'midtrans_redirect_url', 'fraud_status'] as $column) {
        expect(Schema::hasColumn('payments', $column))->toBeFalse();
    }

    expect(Schema::hasColumn('payment_logs', 'notification_request_id'))->toBeTrue();
    $indexes = collect(Schema::getIndexes('payments'));
    foreach ([['order_id'], ['provider_reference'], ['create_request_id']] as $columns) {
        expect($indexes->contains(fn (array $index) => $index['unique'] && $index['columns'] === $columns))->toBeTrue();
    }
    expect(collect(Schema::getIndexes('payment_logs'))->contains(
        fn (array $index) => $index['unique'] && $index['columns'] === ['provider', 'notification_request_id'],
    ))->toBeTrue();
});
