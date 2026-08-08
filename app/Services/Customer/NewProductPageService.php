<?php

namespace App\Services\Customer;

use App\Models\NewProductPage;

class NewProductPageService
{
    public function data(): array
    {
        $page = NewProductPage::query()
            ->where('is_active', true)
            ->with([
                'benefits' => fn ($query) => $query->where('is_active', true)->orderBy('sort_order'),
                'galleryImages' => fn ($query) => $query->where('is_active', true)->orderBy('sort_order'),
                'technologies' => fn ($query) => $query->where('is_active', true)->orderBy('sort_order'),
            ])
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
                'benefits_heading' => $page->benefits_heading,
                'story_eyebrow' => $page->story_eyebrow,
                'story_title' => $page->story_title,
                'story_body' => $page->story_body,
                'story_image_url' => $page->story_image_url,
                'gallery_heading' => $page->gallery_heading,
                'technology_heading' => $page->technology_heading,
                'technology_image_url' => $page->technology_image_url,
                'final_eyebrow' => $page->final_eyebrow,
                'final_title' => $page->final_title,
                'final_tagline' => $page->final_tagline,
                'final_price_label' => $page->final_price_label,
                'final_cta_text' => $page->final_cta_text,
                'final_cta_url' => $page->final_cta_url,
                'final_image_url' => $page->final_image_url,
            ],
            'benefits' => $page->benefits->map(fn ($item): array => [
                'icon' => $item->icon,
                'title' => $item->title,
                'body' => $item->description,
            ])->values()->all(),
            'gallery' => $page->galleryImages->map(fn ($item): array => [
                'src' => $item->image_url,
                'alt' => $item->alt_text,
            ])->values()->all(),
            'technology' => $page->technologies->map(fn ($item): array => [
                'icon' => $item->icon,
                'title' => $item->title,
                'body' => $item->description,
            ])->values()->all(),
        ];
    }
}
