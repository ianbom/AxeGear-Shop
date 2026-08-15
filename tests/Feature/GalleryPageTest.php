<?php

use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('renders only active gallery categories and images from the database', function () {
    $activeCategory = GalleryCategory::query()->create(['name' => 'Sunglasses', 'slug' => 'sunglasses', 'sort_order' => 1, 'is_active' => true]);
    $inactiveCategory = GalleryCategory::query()->create(['name' => 'Archive', 'slug' => 'archive', 'sort_order' => 2, 'is_active' => false]);
    $activeImage = GalleryImage::factory()->create(['sort_order' => 1, 'is_active' => true]);
    $activeImage->categories()->sync([$activeCategory->id, $inactiveCategory->id]);
    GalleryImage::factory()->create(['sort_order' => 2, 'is_active' => false])->categories()->sync([$activeCategory->id]);

    $this->get(route('gallery'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('gallery/index')
            ->has('categories', 1)
            ->has('images', 1)
            ->where('images.0.id', $activeImage->id)
            ->where('images.0.categories.0.name', 'Sunglasses'));
});
