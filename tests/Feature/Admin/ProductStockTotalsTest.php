<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('shows physical and reserved stock totals across all product variants', function (array $variants, int $stock, int $reservedStock) {
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);
    $product = Product::query()->create([
        'name' => 'Stock totals product',
        'slug' => 'stock-totals-product',
        'regular_price' => 100000,
        'status' => 'draft',
    ]);

    foreach ($variants as $index => $variant) {
        $product->variants()->create(['sku' => 'STOCK-TOTALS-'.$index, ...$variant]);
    }

    $this->actingAs($admin)
        ->get(route('admin.products.index'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/products/index')
            ->has('products.data', 1)
            ->where('products.data.0.id', $product->id)
            ->where('products.data.0.total_stock', $stock)
            ->where('products.data.0.total_reserved_stock', $reservedStock));
})->with([
    'active and inactive variants' => [[
        ['stock' => 10, 'reserved_stock' => 2, 'is_active' => true],
        ['stock' => 5, 'reserved_stock' => 1, 'is_active' => false],
    ], 15, 3],
    'no reservations' => [[['stock' => 8, 'reserved_stock' => 0]], 8, 0],
    'no variants' => [[], 0, 0],
]);
