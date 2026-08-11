<?php

namespace App\Services\Customer;

use App\Models\NewProductPage;

class NewProductPageService
{
    public function data(): array
    {
        $page = NewProductPage::query()
            ->where('is_active', true)
            ->with(['galleryImages' => fn ($query) => $query->where('is_active', true)->orderBy('sort_order')])
            ->latest('updated_at')
            ->firstOrFail();

        return [
            'page' => [
                'hero_eyebrow' => $page->hero_eyebrow,
                'hero_title' => $page->hero_title,
                'product_name' => $page->product_name,
                'hero_description' => $page->hero_description,
                'price_label' => $page->price_label,
                'shop_now_text' => $page->shop_now_text,
                'shop_now_url' => $page->shop_now_url,
                'specifications_text' => $page->specifications_text,
                'hero_image_url' => $page->hero_image_url,
                'story_eyebrow' => $page->story_eyebrow,
                'story_title' => $page->story_title,
                'story_body' => $page->story_body,
                'story_image_url' => $page->story_image_url,
                'gallery_heading' => $page->gallery_heading,
            ],
            'gallery' => $page->galleryImages->map(fn ($item): array => [
                'src' => $item->image_url,
                'alt' => $item->alt_text,
            ])->values()->all(),
        ];
    }
}
