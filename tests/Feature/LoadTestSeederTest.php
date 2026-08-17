<?php

use Database\Seeders\LoadTestSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

uses(RefreshDatabase::class);

it('appends a consistent small load-test dataset', function () {
    $seeder = app(LoadTestSeeder::class);
    $seeder->seed(3, 5, 2);

    expect(DB::table('products')->where('sku', 'like', 'LT-%')->count())->toBe(3)
        ->and(DB::table('product_variants')->where('sku', 'like', 'LT-%')->count())->toBeGreaterThanOrEqual(3)
        ->and(DB::table('product_images')->where('image_url', 'like', 'https://placehold.co/%')->count())->toBeGreaterThanOrEqual(3)
        ->and(DB::table('orders')->where('order_number', 'like', 'LT-%')->count())->toBe(5)
        ->and(DB::table('order_items')->count())->toBeGreaterThanOrEqual(5)
        ->and(DB::table('payments')->where('midtrans_order_id', 'like', 'LT-%')->count())->toBe(5)
        ->and(DB::table('order_addresses')->count())->toBe(5)
        ->and(DB::table('product_variants')->whereColumn('reserved_stock', '>', 'stock')->count())->toBe(0)
        ->and(DB::table('orders')->whereColumn('grand_total', '<=', '0')->count())->toBe(0)
        ->and(DB::table('payments')->whereColumn('gross_amount', '<=', '0')->count())->toBe(0);
});

it('appends another run without replacing the first run', function () {
    $seeder = app(LoadTestSeeder::class);
    $seeder->seed(2, 2, 2);
    $firstProducts = DB::table('products')->where('sku', 'like', 'LT-%')->count();
    $firstOrders = DB::table('orders')->where('order_number', 'like', 'LT-%')->count();

    $seeder->seed(2, 2, 2);

    expect(DB::table('products')->where('sku', 'like', 'LT-%')->count())->toBe($firstProducts + 2)
        ->and(DB::table('orders')->where('order_number', 'like', 'LT-%')->count())->toBe($firstOrders + 2);
});
