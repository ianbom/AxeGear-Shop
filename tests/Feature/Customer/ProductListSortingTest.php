<?php

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('sorts the catalog with stable ties and discounted prices', function (array $query, array $expected) {
    $products = collect([
        ['name' => 'Bravo', 'regular_price' => 300000, 'sale_price' => 50000, 'created_at' => '2024-01-01'],
        ['name' => 'Alpha', 'regular_price' => 100000, 'created_at' => '2025-01-01'],
        ['name' => 'Charlie', 'regular_price' => 200000, 'created_at' => '2026-01-01'],
        ['name' => 'Alpha', 'regular_price' => 100000, 'created_at' => '2025-01-01'],
    ])->map(fn (array $attributes, int $index) => Product::query()->forceCreate([
        ...$attributes,
        'slug' => "sorting-product-{$index}",
        'status' => 'published',
        'is_featured' => $index === 0,
        'is_new_arrival' => $index === 0,
    ]));

    $this->get(route('list', $query))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('customer/products/list-product')
            ->has('options.sorts', 8)
            ->where('filters.sort', $query['sort'] ?? 'latest')
            ->where('filters.order', $query['order'] ?? 'desc')
            ->where('products.data', fn ($data) => collect($data)->pluck('id')->all() === collect($expected)->map(fn ($index) => $products[$index]->id)->all()));
})->with([
    'default newest first' => [[], [2, 3, 1, 0]],
    'name ascending' => [['sort' => 'name', 'order' => 'asc'], [1, 3, 0, 2]],
    'name descending' => [['sort' => 'name', 'order' => 'desc'], [2, 0, 3, 1]],
    'price ascending' => [['sort' => 'price', 'order' => 'asc'], [0, 1, 3, 2]],
    'price descending' => [['sort' => 'price', 'order' => 'desc'], [2, 3, 1, 0]],
    'newest first' => [['sort' => 'latest', 'order' => 'desc'], [2, 3, 1, 0]],
    'oldest first' => [['sort' => 'latest', 'order' => 'asc'], [0, 1, 3, 2]],
]);

it('falls back to newest first for invalid sorting parameters', function () {
    $this->get(route('list', ['sort' => 'invalid', 'order' => 'invalid']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('filters.sort', 'latest')
            ->where('filters.order', 'desc'));
});

it('sorts filtered products before pagination and preserves query parameters', function () {
    foreach (range(1, 10) as $index) {
        Product::query()->create([
            'name' => sprintf('Matching %02d', $index),
            'slug' => "matching-{$index}",
            'regular_price' => $index * 10000,
            'status' => 'published',
        ]);
    }
    Product::query()->create([
        'name' => 'Excluded',
        'slug' => 'excluded',
        'regular_price' => 999999,
        'status' => 'published',
    ]);

    $this->get(route('list', [
        'search' => 'Matching', 'sort' => 'price', 'order' => 'desc', 'per_page' => 8, 'page' => 2,
    ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('filters.search', 'Matching')
            ->where('products.current_page', 2)
            ->where('products.total', 10)
            ->has('products.data', 2)
            ->where('products.data.0.title', 'Matching 02')
            ->where('products.data.1.title', 'Matching 01')
            ->where('products.first_page_url', fn ($url) => str_contains($url, 'sort=price') && str_contains($url, 'order=desc') && str_contains($url, 'search=Matching')));
});
