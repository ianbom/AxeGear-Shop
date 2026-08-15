<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class TokopediaCatalogSeeder extends Seeder
{
    public function run(): void
    {
        $payload = $this->readPayload();

        DB::transaction(function () use ($payload): void {
            $categories = $this->syncCategories($payload['categories'] ?? []);
            $collections = $this->syncCollections($payload['collections'] ?? []);
            $products = $this->syncProducts($payload, $categories);

            $this->syncImages($payload['product_images'] ?? [], $products);
            $this->syncVariants($payload['product_variants'] ?? [], $products);
            $this->syncProductCollections($payload['product_collections'] ?? [], $products, $collections);
        });
    }

    /** @return array<string, mixed> */
    private function readPayload(): array
    {
        $path = (string) config('tokopedia.catalog_json');
        if (! is_file($path)) {
            throw new RuntimeException("Tokopedia catalog JSON tidak ditemukan: {$path}");
        }

        $payload = json_decode((string) file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
        if (! is_array($payload) || ($payload['schema_version'] ?? null) !== '1.0') {
            throw new RuntimeException('Format Tokopedia catalog JSON tidak didukung.');
        }

        return $payload;
    }

    /** @param array<int, array<string, mixed>> $rows */
    private function syncCategories(array $rows): array
    {
        $ids = [];
        foreach ($rows as $row) {
            $record = Category::query()->withTrashed()->updateOrCreate(
                ['slug' => $row['slug']],
                Arr::only($row, ['name', 'description', 'image_url', 'sort_order', 'is_active']),
            );
            if ($record->trashed()) {
                $record->restore();
            }
            $ids[$record->slug] = $record->id;
        }

        foreach ($rows as $row) {
            $parentSlug = $row['parent_slug'] ?? null;
            $parentId = $parentSlug ? ($ids[$parentSlug] ?? null) : null;
            if ($parentSlug && ! $parentId) {
                throw new RuntimeException("Parent category slug [{$parentSlug}] tidak ditemukan.");
            }
            Category::query()->whereKey($ids[$row['slug']])->update(['parent_id' => $parentId]);
        }

        return $ids;
    }

    /** @param array<int, array<string, mixed>> $rows */
    private function syncCollections(array $rows): array
    {
        $ids = [];
        foreach ($rows as $row) {
            $record = Collection::query()->withTrashed()->updateOrCreate(
                ['slug' => $row['slug']],
                Arr::only($row, ['name', 'description', 'banner_desktop_url', 'banner_mobile_url', 'sort_order', 'is_featured', 'is_active', 'starts_at', 'ends_at']),
            );
            if ($record->trashed()) {
                $record->restore();
            }
            $ids[$record->slug] = $record->id;
        }

        return $ids;
    }

    /** @param array<string, mixed> $payload */
    private function syncProducts(array $payload, array $categories): array
    {
        $ids = [];
        foreach ($payload['products'] ?? [] as $row) {
            $categoryId = $categories[$row['category_slug']] ?? null;
            if (! $categoryId) {
                throw new RuntimeException("Category slug [{$row['category_slug']}] tidak ditemukan.");
            }

            $product = Product::query()->withTrashed()->updateOrCreate(
                ['slug' => $row['slug']],
                Arr::only($row, [
                    'name', 'sku', 'brand_name', 'product_line', 'style_name', 'regular_price', 'sale_price',
                    'short_description', 'description', 'weight', 'length', 'width', 'height', 'status',
                    'is_featured', 'is_new_arrival', 'is_best_seller',
                ]) + ['category_id' => $categoryId],
            );
            if ($product->trashed()) {
                $product->restore();
            }
            $ids[$product->slug] = $product->id;
        }

        return $ids;
    }

    /** @param array<int, array<string, mixed>> $rows */
    private function syncImages(array $rows, array $products): void
    {
        $grouped = [];
        foreach ($rows as $row) {
            $productId = $products[$row['product_slug']] ?? null;
            if (! $productId) {
                throw new RuntimeException("Product slug [{$row['product_slug']}] untuk image tidak ditemukan.");
            }
            $grouped[$productId][] = $row;
            $image = ProductImage::query()->withTrashed()->updateOrCreate(
                ['product_id' => $productId, 'image_url' => $row['image_url']],
                Arr::only($row, ['alt_text', 'sort_order', 'is_primary']),
            );
            if ($image->trashed()) {
                $image->restore();
            }
        }

        foreach ($products as $productId) {
            $urls = array_column($grouped[$productId] ?? [], 'image_url');
            $query = ProductImage::query()->where('product_id', $productId);
            $urls ? $query->whereNotIn('image_url', $urls)->delete() : $query->delete();
        }
    }

    /** @param array<int, array<string, mixed>> $rows */
    private function syncVariants(array $rows, array $products): void
    {
        $grouped = [];
        foreach ($rows as $row) {
            $productId = $products[$row['product_slug']] ?? null;
            if (! $productId) {
                throw new RuntimeException("Product slug [{$row['product_slug']}] untuk variant tidak ditemukan.");
            }
            $grouped[$productId][] = $row;
            $variant = ProductVariant::query()->withTrashed()->updateOrCreate(
                ['sku' => $row['sku']],
                Arr::only($row, [
                    'variant_name', 'color_name', 'color_hex', 'size', 'package_type', 'regular_price', 'sale_price',
                    'stock', 'reserved_stock', 'weight', 'length', 'width', 'height', 'image_url', 'is_active',
                ]) + ['product_id' => $productId],
            );
            if ($variant->trashed()) {
                $variant->restore();
            }
        }

        foreach ($products as $productId) {
            $skus = array_column($grouped[$productId] ?? [], 'sku');
            $query = ProductVariant::query()->where('product_id', $productId);
            $skus ? $query->whereNotIn('sku', $skus)->delete() : $query->delete();
        }
    }

    /** @param array<int, array<string, mixed>> $rows */
    private function syncProductCollections(array $rows, array $products, array $collections): void
    {
        $grouped = [];
        foreach ($rows as $row) {
            $productId = $products[$row['product_slug']] ?? null;
            $collectionId = $collections[$row['collection_slug']] ?? null;
            if (! $productId || ! $collectionId) {
                throw new RuntimeException('Relasi product collection mengandung slug yang tidak ditemukan.');
            }
            $grouped[$productId][$collectionId] = ['sort_order' => $row['sort_order'] ?? 0];
        }

        foreach ($products as $productId) {
            Product::query()->whereKey($productId)->firstOrFail()->collections()->sync($grouped[$productId] ?? []);
        }
    }
}
