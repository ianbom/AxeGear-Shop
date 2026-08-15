<?php

use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use Database\Seeders\GallerySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('seeds the gallery categories and existing images', function () {
    $this->seed(GallerySeeder::class);

    expect(GalleryCategory::query()->count())->toBe(8)
        ->and(GalleryImage::query()->count())->toBe(16)
        ->and(GalleryImage::query()->firstOrFail()->categories)->not->toBeEmpty();
});
