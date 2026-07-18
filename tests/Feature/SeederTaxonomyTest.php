<?php

use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use Database\Seeders\AxeGearSeeder;
use Database\Seeders\CategorySeeder;
use Database\Seeders\CollectionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('seeds only the supported product taxonomy', function () {
    $this->seed([
        CategorySeeder::class,
        CollectionSeeder::class,
        AxeGearSeeder::class,
    ]);

    expect(Category::query()->orderBy('sort_order')->get(['name', 'slug'])->toArray())->toBe([
        ['name' => 'Bags & Hydropack', 'slug' => 'bags-hydropack'],
        ['name' => 'Accessories', 'slug' => 'accessories'],
        ['name' => 'Care & Utility', 'slug' => 'care-utility'],
        ['name' => 'Bundles', 'slug' => 'bundles'],
    ])->and(Collection::query()->orderBy('sort_order')->get(['name', 'slug'])->toArray())->toBe([
        ['name' => 'Enduro', 'slug' => 'enduro'],
        ['name' => 'MTB', 'slug' => 'mtb'],
        ['name' => 'Running', 'slug' => 'running'],
        ['name' => 'Adventure', 'slug' => 'adventure'],
        ['name' => 'New Product', 'slug' => 'new-product'],
    ])->and(Category::query()->where('is_active', false)->exists())->toBeFalse()
        ->and(Collection::query()->where('is_active', false)->exists())->toBeFalse()
        ->and(Collection::query()->where('is_featured', false)->exists())->toBeFalse()
        ->and(Product::query()->whereNull('category_id')->exists())->toBeFalse();

    expect(Product::query()->whereDoesntHave('collections')->exists())->toBeFalse();
});
