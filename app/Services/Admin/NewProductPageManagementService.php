<?php

namespace App\Services\Admin;

use App\Models\NewProductPage;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class NewProductPageManagementService
{
    use StoresUploadedFiles;

    public function page(): NewProductPage
    {
        return NewProductPage::query()
            ->with(['benefits' => fn ($query) => $query->orderBy('sort_order'), 'galleryImages' => fn ($query) => $query->orderBy('sort_order'), 'technologies' => fn ($query) => $query->orderBy('sort_order')])
            ->latest('updated_at')
            ->firstOrFail();
    }

    public function update(NewProductPage $page, array $data): void
    {
        DB::transaction(function () use ($page, $data): void {
            $pageData = collect($data)->except([
                'benefits',
                'gallery_images',
                'technologies',
                'hero_image',
                'story_image',
                'technology_image',
                'final_image',
            ])->all();

            foreach ([
                'hero_image' => 'hero_image_url',
                'story_image' => 'story_image_url',
                'technology_image' => 'technology_image_url',
                'final_image' => 'final_image_url',
            ] as $fileKey => $urlKey) {
                if (! isset($data[$fileKey])) {
                    continue;
                }

                $this->deletePublicFile($page->{$urlKey});
                $pageData[$urlKey] = $this->storePublicFile($data[$fileKey], 'images/new-products');
            }

            $gallery = collect($data['gallery_images'] ?? [])
                ->map(function (array $image): array {
                    if (isset($image['image'])) {
                        $this->deletePublicFile($image['image_url'] ?? null);
                        $image['image_url'] = $this->storePublicFile($image['image'], 'images/new-products');
                    }

                    return Arr::except($image, ['image']);
                })
                ->all();

            $currentGalleryUrls = $page->galleryImages->pluck('image_url');
            $newGalleryUrls = collect($gallery)->pluck('image_url');

            $page->update($pageData);
            $page->benefits()->delete();
            $page->benefits()->createMany($data['benefits'] ?? []);
            $page->galleryImages()->delete();
            $page->galleryImages()->createMany($gallery);
            $page->technologies()->delete();
            $page->technologies()->createMany($data['technologies'] ?? []);

            $currentGalleryUrls
                ->diff($newGalleryUrls)
                ->each(fn (string $url) => $this->deletePublicFile($url));
        });
    }

    public function formData(NewProductPage $page): array
    {
        return [
            'page' => $page->only([
                'id', 'name', 'hero_eyebrow', 'hero_title', 'product_name', 'hero_description', 'price_label', 'shop_now_text', 'shop_now_url', 'specifications_text', 'hero_image_url', 'benefits_heading', 'story_eyebrow', 'story_title', 'story_body', 'story_image_url', 'gallery_heading', 'technology_heading', 'technology_image_url', 'final_eyebrow', 'final_title', 'final_tagline', 'final_price_label', 'final_cta_text', 'final_cta_url', 'final_image_url', 'is_active',
            ]),
            'benefits' => $page->benefits->map(fn ($item) => $item->only(['icon', 'title', 'description', 'sort_order', 'is_active']))->values()->all(),
            'galleryImages' => $page->galleryImages->map(fn ($item) => $item->only(['image_url', 'alt_text', 'sort_order', 'is_active']))->values()->all(),
            'technologies' => $page->technologies->map(fn ($item) => $item->only(['icon', 'title', 'description', 'sort_order', 'is_active']))->values()->all(),
            'icons' => ['badge-check', 'crosshair', 'diamond', 'eye', 'feather', 'lock', 'shield', 'sun', 'wind'],
        ];
    }
}
