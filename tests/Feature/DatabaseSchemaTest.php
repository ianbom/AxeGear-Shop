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
