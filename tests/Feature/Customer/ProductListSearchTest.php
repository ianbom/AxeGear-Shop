<?php

use App\Models\Collection;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('searches all products even when a collection is present in the query', function () {
    $collection = Collection::query()->create([
        'name' => 'Enduro',
        'slug' => 'enduro',
        'is_active' => true,
    ]);

    $collectionProduct = Product::query()->create([
        'name' => 'Enduro Helmet',
        'slug' => 'enduro-helmet',
        'regular_price' => 100000,
        'status' => 'published',
    ]);
    $collectionProduct->collections()->attach($collection);

    Product::query()->create([
        'name' => 'Trail Running Glasses',
        'slug' => 'trail-running-glasses',
        'regular_price' => 200000,
        'status' => 'published',
    ]);

    $this->get(route('list', [
        'collection' => $collection->slug,
        'search' => 'Trail Running',
    ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('customer/products/list-product')
            ->where('filters.collection', '')
            ->where('collectionBanner.title', 'All Products')
            ->has('products.data', 1)
            ->where('products.data.0.title', 'Trail Running Glasses'));
});
