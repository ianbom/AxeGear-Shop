<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductMarketplaceLink;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use RuntimeException;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function (): void {
            $categories = Category::query()->pluck('id', 'slug');
            $collections = Collection::query()->pluck('id', 'slug');
            $products = self::products();
            $seededSkus = [];

            foreach ($products as $index => $product) {
                $categoryId = $categories->get($product['category_slug']);

                if (! $categoryId) {
                    throw new RuntimeException("Category slug [{$product['category_slug']}] tidak ditemukan.");
                }

                $record = Product::query()->withTrashed()->updateOrCreate(
                    ['slug' => $product['slug']],
                    [
                        'category_id' => $categoryId,
                        'name' => $product['name'],
                        'sku' => $product['sku'],
                        'brand_name' => 'AxeGear',
                        'product_line' => $product['product_line'],
                        'style_name' => $product['style_name'],
                        'regular_price' => $product['regular_price'],
                        'sale_price' => $product['sale_price'],
                        'short_description' => $product['short_description'],
                        'description' => $product['description'],
                        'stock_status' => $product['stock_status'],
                        'weight' => $product['weight'],
                        'length' => $product['length'],
                        'width' => $product['width'],
                        'height' => $product['height'],
                        'status' => 'published',
                        'is_featured' => $product['is_featured'],
                        'is_new_arrival' => $product['is_new_arrival'],
                        'is_best_seller' => $product['is_best_seller'],
                        'meta_title' => $product['name'].' | AxeGear',
                        'meta_description' => $product['short_description'],
                    ],
                );

                if ($record->trashed()) {
                    $record->restore();
                }

                $collectionIds = collect($product['collection_slugs'])
                    ->map(function (string $slug) use ($collections): int {
                        $collectionId = $collections->get($slug);

                        if (! $collectionId) {
                            throw new RuntimeException("Collection slug [{$slug}] tidak ditemukan.");
                        }

                        return $collectionId;
                    })
                    ->mapWithKeys(fn (int $collectionId, int $sortIndex): array => [
                        $collectionId => ['sort_order' => $sortIndex + 1],
                    ])
                    ->all();

                $record->collections()->sync($collectionIds);
                $this->syncImages($record, $product['images']);
                $this->syncVariants($record, $product);
                $this->syncMarketplaceLink($record, $product);

                $seededSkus[] = $product['sku'];
            }

            Product::query()
                ->where('sku', 'like', 'AXG-%')
                ->whereNotIn('sku', $seededSkus)
                ->delete();
        });
    }

    private function syncImages(Product $product, array $images): void
    {
        $keptIds = [];

        foreach ($images as $sortOrder => $imageUrl) {
            $record = ProductImage::query()->withTrashed()->updateOrCreate(
                ['product_id' => $product->id, 'sort_order' => $sortOrder],
                [
                    'image_url' => $imageUrl,
                    'alt_text' => $product->name.' product image '.($sortOrder + 1),
                    'is_primary' => $sortOrder === 0,
                ],
            );

            if ($record->trashed()) {
                $record->restore();
            }

            $keptIds[] = $record->id;
        }

        ProductImage::query()
            ->where('product_id', $product->id)
            ->whereNotIn('id', $keptIds)
            ->delete();
    }

    private function syncVariants(Product $product, array $productData): void
    {
        $keptSkus = [];

        foreach ($productData['variants'] as $variant) {
            $sku = $productData['sku'].'-'.$variant['code'];
            $record = ProductVariant::query()->withTrashed()->updateOrCreate(
                ['sku' => $sku],
                [
                    'product_id' => $product->id,
                    'barcode' => null,
                    'variant_name' => $variant['name'],
                    'color_name' => $variant['color_name'],
                    'color_hex' => $variant['color_hex'],
                    'size' => $variant['size'],
                    'package_type' => $variant['package_type'],
                    'regular_price' => $productData['regular_price'],
                    'sale_price' => $productData['sale_price'],
                    'stock' => $variant['stock'],
                    'reserved_stock' => 0,
                    'desty_available_stock' => $variant['stock'],
                    'desty_on_hand_stock' => $variant['stock'],
                    'desty_reserved_stock' => 0,
                    'stock_source' => 'manual',
                    'allow_manual_stock_edit' => true,
                    'weight' => $productData['weight'],
                    'length' => $productData['length'],
                    'width' => $productData['width'],
                    'height' => $productData['height'],
                    'image_url' => $productData['images'][0],
                    'is_active' => true,
                ],
            );

            if ($record->trashed()) {
                $record->restore();
            }

            $keptSkus[] = $sku;
        }

        ProductVariant::query()
            ->where('product_id', $product->id)
            ->whereNotIn('sku', $keptSkus)
            ->delete();
    }

    private function syncMarketplaceLink(Product $product, array $productData): void
    {
        ProductMarketplaceLink::query()->updateOrCreate(
            [
                'product_id' => $product->id,
                'marketplace_name' => '100Percent Reference',
            ],
            [
                'external_product_id' => $productData['slug'],
                'external_sku' => $productData['sku'],
                'product_url' => $productData['images'][0],
                'price_snapshot' => $productData['sale_price'] ?? $productData['regular_price'],
                'stock_snapshot' => collect($productData['variants'])->sum('stock'),
                'last_synced_at' => now(),
                'is_active' => true,
            ],
        );
    }

    public static function products(): array
    {
        $path = base_path('scraping_produk_100percent.md');

        if (! file_exists($path)) {
            throw new RuntimeException("File scraping_produk_100percent.md tidak ditemukan di [{$path}].");
        }

        $content = file_get_contents($path);

        if ($content === false) {
            throw new RuntimeException("Gagal membaca file [{$path}].");
        }

        preg_match_all('/^##\s+\d+\.\s+(.+?)\R+(?<body>.*?)(?=\R+---\R+|\z)/ms', $content, $matches, PREG_SET_ORDER);

        return collect($matches)
            ->map(fn (array $match, int $index): array => self::mapScrapedProduct($match[1], $match['body'], $index))
            ->values()
            ->all();
    }

    private static function mapScrapedProduct(string $name, string $body, int $index): array
    {
        $categoryName = self::field($body, 'Kategori');
        $categorySlug = match ($categoryName) {
            'Moto/MTB Goggles' => 'goggles',
            'Active Performance Sunglasses' => 'sunglasses',
            'T-Shirts' => 'apparel-accessories',
            default => 'sunglasses',
        };

        $priceStr = self::field($body, 'Harga sale') ?: self::field($body, 'Harga sekarang') ?: self::field($body, 'Harga');
        $priceStr = str_replace('From ', '', $priceStr);
        $regularPriceStr = self::field($body, 'Harga regular/compare at') ?: self::field($body, 'Harga sebelum diskon');
        $regularPriceStr = $regularPriceStr ?: $priceStr;

        $sku = self::field($body, 'SKU') ?: self::field($body, 'SKU utama yang terlihat') ?: 'AXG-' . strtoupper(Str::slug(substr($name, 0, 15))) . '-' . str_pad((string)($index + 1), 3, '0', STR_PAD_LEFT);
        $lensColor = self::field($body, 'Lens Color') ?: 'Default Lens';
        $lightTransmission = self::field($body, 'Light Transmission') ?: 'N/A';
        $lightFilter = self::field($body, 'Light Filter') ?: 'N/A';
        $description = self::field($body, 'Deskripsi') ?: "Premium 100% $categoryName. ".trim("Eyewear dengan {$lensColor}, transmisi cahaya {$lightTransmission}, filter {$lightFilter}.");
        $variantName = self::field($body, 'Variant') ?: 'Default Title';
        $isOutOfStock = str_contains($body, '**Status pada halaman:** Out of Stock') || str_contains($body, '**Status:** Sold Out');
        $images = self::images($body);
        $productLine = self::productLine($name);
        $salePrice = self::toRupiah($priceStr);
        $beforeDiscount = self::toRupiah($regularPriceStr);

        if ($priceStr === '' || $images === []) {
            throw new RuntimeException("Data scraping produk [{$name}] tidak lengkap.");
        }

        $collectionSlugs = [];
        if ($categorySlug === 'sunglasses') {
            $collectionSlugs[] = 'sport-performance';
        } elseif ($categorySlug === 'goggles') {
            $collectionSlugs[] = 'explore-essentials';
        } elseif ($categorySlug === 'apparel-accessories') {
            $collectionSlugs[] = 'explore-essentials';
        }
        
        if ($salePrice < $beforeDiscount) {
            $collectionSlugs[] = 'sale';
        }
        if ($index < 10) {
            $collectionSlugs[] = 'new-arrivals';
        }

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'sku' => $sku,
            'category_slug' => $categorySlug,
            'collection_slugs' => array_unique($collectionSlugs),
            'product_line' => $productLine,
            'style_name' => trim(Str::after(self::asciiName($name), $productLine)),
            'regular_price' => $beforeDiscount,
            'sale_price' => $salePrice < $beforeDiscount ? $salePrice : null,
            'short_description' => Str::limit($description, 150),
            'description' => $description,
            'stock_status' => $isOutOfStock ? 'out_of_stock' : 'in_stock',
            'weight' => $categorySlug === 'apparel-accessories' ? 200 : 250,
            'length' => $categorySlug === 'apparel-accessories' ? 25 : 18,
            'width' => $categorySlug === 'apparel-accessories' ? 20 : 9,
            'height' => $categorySlug === 'apparel-accessories' ? 5 : 8,
            'is_featured' => $index % 5 === 0,
            'is_new_arrival' => $index < 10,
            'is_best_seller' => $index % 3 === 0,
            'images' => $images,
            'variants' => [
                [
                    'code' => 'DEFAULT',
                    'name' => $variantName,
                    'color_name' => $lensColor,
                    'color_hex' => self::lensHex($lensColor),
                    'size' => $categorySlug === 'apparel-accessories' ? 'M' : 'One Size',
                    'package_type' => $categorySlug === 'apparel-accessories' ? 'Apparel' : ($categorySlug === 'goggles' ? 'Goggles' : 'Sunglasses'),
                    'stock' => $isOutOfStock ? 0 : 24,
                ],
            ],
        ];
    }

    private static function field(string $body, string $field): string
    {
        preg_match('/^- \*\*'.preg_quote($field, '/').':\*\*\s*(.+)$/m', $body, $match);

        return trim($match[1] ?? '');
    }

    private static function images(string $body): array
    {
        preg_match_all('/^\s*(?:-\s*URL:\s*|\d+\.\s+)(https?:\/\/\S+(?:\.jpg|\.png|\.gif|\.webp)[^\s\)]*)/m', $body, $matches);
        $images = array_values(array_unique($matches[1] ?? []));
        
        if (empty($images)) {
            preg_match_all('/!\[.*?\]\((https?:\/\/\S+)\)/m', $body, $matches);
            $images = array_values(array_unique($matches[1] ?? []));
        }

        return $images;
    }

    private static function productLine(string $name): string
    {
        $cleanName = self::asciiName($name);

        if (str_starts_with($cleanName, 'SPEEDCRAFT XS')) {
            return 'SPEEDCRAFT XS';
        }

        if (str_starts_with($cleanName, 'SPEEDCRAFT SL')) {
            return 'SPEEDCRAFT SL';
        }

        return Str::before($cleanName, ' ');
    }

    private static function asciiName(string $name): string
    {
        return preg_replace('/[^\x20-\x7E]/', '', $name) ?? $name;
    }

    private static function toRupiah(string $usd): int
    {
        $cents = (int) round(((float) str_replace(['$', ','], '', $usd)) * 100);

        return (int) round($cents * 16000 / 100);
    }

    private static function lensHex(string $lensColor): string
    {
        return match (true) {
            str_contains($lensColor, 'Gold') => '#C7A24B',
            str_contains($lensColor, 'Purple') => '#6B3FA0',
            str_contains($lensColor, 'Blue') => '#1E5AA8',
            str_contains($lensColor, 'Lavender') => '#B497C9',
            str_contains($lensColor, 'Smoke') => '#4A4A4A',
            default => '#111111',
        };
    }
}
