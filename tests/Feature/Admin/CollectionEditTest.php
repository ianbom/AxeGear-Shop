<?php

use App\Models\Collection;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('loads products relation when editing a collection', function () {
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);

    $collection = Collection::query()->create([
        'name' => 'Test Collection',
        'slug' => 'test-collection',
        'is_featured' => false,
        'is_active' => true,
    ]);

    $product1 = Product::query()->create(['name' => 'P1', 'slug' => 'p1', 'sku' => 'P1', 'regular_price' => 100, 'weight' => 10, 'status' => 'draft']);
    $product2 = Product::query()->create(['name' => 'P2', 'slug' => 'p2', 'sku' => 'P2', 'regular_price' => 100, 'weight' => 10, 'status' => 'draft']);
    $product3 = Product::query()->create(['name' => 'P3', 'slug' => 'p3', 'sku' => 'P3', 'regular_price' => 100, 'weight' => 10, 'status' => 'draft']);

    $collection->products()->sync([$product1->id, $product2->id]);

    $this->actingAs($admin)
        ->get(route('admin.collections.edit', $collection))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/collections/form')
            ->has('collection.products', 2)
        );
});
