<?php

namespace App\Services\Admin;

use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use Illuminate\Http\Request;

class GalleryImageManagementService
{
    use ResolvesAdminPagination;
    use StoresUploadedFiles;

    public function indexData(Request $request): array
    {
        $filters = [
            'search' => $request->string('search')->toString(),
            'category' => $request->string('category')->toString(),
            'is_active' => $request->string('is_active')->toString(),
        ];

        return [
            'images' => GalleryImage::query()
                ->with(['categories' => fn ($query) => $query->orderBy('sort_order')])
                ->when($filters['search'] !== '', fn ($query) => $query->where('alt_text', 'like', "%{$filters['search']}%"))
                ->when($filters['category'] !== '', fn ($query) => $query->whereHas('categories', fn ($query) => $query->where('gallery_categories.id', $filters['category'])))
                ->when($filters['is_active'] !== '', fn ($query) => $query->where('is_active', $filters['is_active'] === 'active'))
                ->orderBy('sort_order')
                ->orderBy('id')
                ->paginate($this->perPage($request))
                ->withQueryString()
                ->through(fn (GalleryImage $image): array => $this->row($image)),
            'categories' => $this->categories(),
            'filters' => $filters,
        ];
    }

    public function create(Request $request): GalleryImage
    {
        $data = $this->payload($request);
        $data['image_url'] = $this->storePublicFile($request->file('image'), 'images/gallery');
        $image = GalleryImage::query()->create($data);
        $image->categories()->sync($request->validated('category_ids'));

        return $image;
    }

    public function update(GalleryImage $image, Request $request): void
    {
        $data = $this->payload($request);

        if ($request->hasFile('image')) {
            $oldUrl = $image->image_url;
            $data['image_url'] = $this->storePublicFile($request->file('image'), 'images/gallery');
            $image->update($data);
            $this->deletePublicFile($oldUrl);
        } else {
            $image->update($data);
        }

        $image->categories()->sync($request->validated('category_ids'));
    }

    public function delete(GalleryImage $image): void
    {
        $url = $image->image_url;
        $image->delete();
        $this->deletePublicFile($url);
    }

    public function row(GalleryImage $image): array
    {
        return [
            'id' => $image->id,
            'image_url' => $image->image_url,
            'alt_text' => $image->alt_text,
            'category_ids' => $image->categories->pluck('id')->values(),
            'categories' => $image->categories->pluck('name')->values(),
            'sort_order' => $image->sort_order,
            'is_active' => $image->is_active,
        ];
    }

    public function categories()
    {
        return GalleryCategory::query()->where('is_active', true)->orderBy('sort_order')->orderBy('name')->get(['id', 'name']);
    }

    private function payload(Request $request): array
    {
        $data = $request->validated();
        unset($data['image'], $data['category_ids']);
        $data['is_active'] = $request->boolean('is_active');

        return $data;
    }
}
