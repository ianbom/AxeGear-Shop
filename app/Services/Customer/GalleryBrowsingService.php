<?php

namespace App\Services\Customer;

use App\Models\GalleryCategory;
use App\Models\GalleryImage;

class GalleryBrowsingService
{
    public function data(): array
    {
        return [
            'categories' => GalleryCategory::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name', 'slug'])
                ->values(),
            'images' => GalleryImage::query()
                ->where('is_active', true)
                ->with(['categories' => fn ($query) => $query->where('is_active', true)->orderBy('sort_order')])
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(fn (GalleryImage $image): array => [
                    'id' => $image->id,
                    'image_url' => $image->image_url,
                    'alt_text' => $image->alt_text,
                    'categories' => $image->categories->map(fn (GalleryCategory $category): array => [
                        'id' => $category->id,
                        'name' => $category->name,
                        'slug' => $category->slug,
                    ])->values(),
                ])->values(),
        ];
    }
}
