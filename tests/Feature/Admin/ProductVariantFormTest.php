<?php

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('provides product summary data to the product variant form', function () {
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);
    $product = Product::query()->create([
        'name' => 'Axegear Hydropack Enduro 2L',
        'slug' => 'axegear-hydropack-enduro-2l',
        'sku' => 'AXG-HYD-END-001',
        'regular_price' => 349000,
        'sale_price' => 299000,
        'status' => 'published',
    ]);
    ProductImage::query()->create([
        'product_id' => $product->id,
        'image_url' => '/storage/products/hydropack.jpg',
        'alt_text' => $product->name,
        'sort_order' => 0,
        'is_primary' => true,
    ]);

    $this->actingAs($admin)
        ->get(route('admin.product-variants.create', ['product_id' => $product->id]))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/product-variants/form')
            ->where('selectedProductId', $product->id)
            ->has('products', 1)
            ->where('products.0.id', $product->id)
            ->where('products.0.name', $product->name)
            ->where('products.0.slug', $product->slug)
            ->where('products.0.sku', $product->sku)
            ->where('products.0.regular_price', '349000.00')
            ->where('products.0.sale_price', '299000.00')
            ->where('products.0.image_url', '/storage/products/hydropack.jpg'));
});
