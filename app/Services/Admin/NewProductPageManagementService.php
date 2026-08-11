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
            ->with(['galleryImages' => fn ($query) => $query->orderBy('sort_order')])
            ->latest('updated_at')
            ->firstOrFail();
    }

    public function update(NewProductPage $page, array $data): void
    {
        DB::transaction(function () use ($page, $data): void {
            $pageData = collect($data)->except([
                'gallery_images',
                'hero_image',
                'story_image',
            ])->all();

            foreach ([
                'hero_image' => 'hero_image_url',
                'story_image' => 'story_image_url',
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
            $page->galleryImages()->delete();
            $page->galleryImages()->createMany($gallery);

            $currentGalleryUrls
                ->diff($newGalleryUrls)
                ->each(fn (string $url) => $this->deletePublicFile($url));
        });
    }

    public function formData(NewProductPage $page): array
    {
        return [
            'page' => $page->only([
                'id', 'name', 'hero_eyebrow', 'hero_title', 'product_name', 'hero_description', 'price_label', 'shop_now_text', 'shop_now_url', 'specifications_text', 'hero_image_url', 'story_eyebrow', 'story_title', 'story_body', 'story_image_url', 'gallery_heading', 'is_active',
            ]),
            'galleryImages' => $page->galleryImages->map(fn ($item) => $item->only(['image_url', 'alt_text', 'sort_order', 'is_active']))->values()->all(),
        ];
    }
}
