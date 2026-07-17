<?php

use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('updates product collection ids correctly', function () {
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);

    $product = Product::query()->create([
        'name' => 'Original Name',
        'slug' => 'original-slug',
        'sku' => 'ORIG-001',
        'regular_price' => 100000,
        'weight' => 500,
        'status' => 'draft',
    ]);

    $collection1 = Collection::query()->create([
        'name' => 'Col 1',
        'slug' => 'col-1',
        'is_featured' => false,
        'is_active' => true,
    ]);

    $collection2 = Collection::query()->create([
        'name' => 'Col 2',
        'slug' => 'col-2',
        'is_featured' => false,
        'is_active' => true,
    ]);

    $collection3 = Collection::query()->create([
        'name' => 'Col 3',
        'slug' => 'col-3',
        'is_featured' => false,
        'is_active' => true,
    ]);

    $product->collections()->sync([$collection1->id]);

    $payload = [
        'name' => 'Updated Name',
        'slug' => 'updated-slug',
        'sku' => 'UPD-001',
        'regular_price' => 100000,
        'weight' => 500,
        'status' => 'draft',
        'collection_ids' => [$collection2->id, $collection3->id],
    ];

    $this->actingAs($admin)
        ->put(route('admin.products.update', $product), $payload)
        ->assertRedirect();

    $this->assertDatabaseMissing('product_collections', [
        'product_id' => $product->id,
        'collection_id' => $collection1->id,
    ]);

    $this->assertDatabaseHas('product_collections', [
        'product_id' => $product->id,
        'collection_id' => $collection2->id,
    ]);

    $this->assertDatabaseHas('product_collections', [
        'product_id' => $product->id,
        'collection_id' => $collection3->id,
    ]);
});
