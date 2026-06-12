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
use RuntimeException;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function (): void {
            $categories = Category::query()->pluck('id', 'slug');
            $collections = Collection::query()->pluck('id', 'slug');
            $products = $this->products();
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
                        'stock_status' => 'in_stock',
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

    private function products(): array
    {
        return [
            [
                'name' => 'AXEVIEW PRO',
                'slug' => 'axeview-pro',
                'sku' => 'AXG-SUN-001',
                'category_slug' => 'sunglasses',
                'collection_slugs' => ['new-arrivals', 'sport-performance', 'sale'],
                'product_line' => 'AXEVIEW',
                'style_name' => 'Matte Black Mirror Orange Lens',
                'short_description' => 'Performance shield sunglasses with matte black frame and orange mirror lens.',
                'description' => 'AXEVIEW PRO is built for fast rides, hot tracks, and open-road training. The wrap shield profile gives wide coverage while the lightweight frame keeps the fit stable for long sessions.',
                'regular_price' => 1490000,
                'sale_price' => 1190000,
                'weight' => 250,
                'length' => 18,
                'width' => 9,
                'height' => 8,
                'is_featured' => true,
                'is_new_arrival' => true,
                'is_best_seller' => true,
                'images' => [
                    'https://www.100percent.com/cdn/shop/files/59057-00001-P_1.jpg?v=1764788225&width=1100',
                ],
                'variants' => [
                    ['code' => 'MBK-ORG', 'name' => 'Matte Black / Mirror Orange', 'color_name' => 'Matte Black', 'color_hex' => '#111111', 'size' => 'One Size', 'package_type' => 'Sunglasses', 'stock' => 42],
                ],
            ],
            [
                'name' => 'RACEVISION MX',
                'slug' => 'racevision-mx',
                'sku' => 'AXG-GOG-002',
                'category_slug' => 'goggles',
                'collection_slugs' => ['sport-performance'],
                'product_line' => 'RACEVISION',
                'style_name' => 'Navy Gold Strap Clear Lens',
                'short_description' => 'Motocross goggles with navy frame, gold strap, and clear all-terrain lens.',
                'description' => 'RACEVISION MX protects sight lines on dirt, gravel, and wet trail days. The secure strap and wide eyeport help riders keep focus through changing terrain.',
                'regular_price' => 890000,
                'sale_price' => null,
                'weight' => 320,
                'length' => 20,
                'width' => 10,
                'height' => 10,
                'is_featured' => true,
                'is_new_arrival' => false,
                'is_best_seller' => true,
                'images' => [
                    'https://www.100percent.com/cdn/shop/files/SP26_SPEEDCRAFT_SL_60008-00025_3Q.jpg?v=1772487312&width=500',
                ],
                'variants' => [
                    ['code' => 'NVY-CLR', 'name' => 'Navy / Clear Lens', 'color_name' => 'Navy', 'color_hex' => '#17233F', 'size' => 'One Size', 'package_type' => 'Goggle', 'stock' => 36],
                ],
            ],
            [
                'name' => 'STAPLE TEE',
                'slug' => 'staple-tee',
                'sku' => 'AXG-APP-003',
                'category_slug' => 'apparel-accessories',
                'collection_slugs' => ['explore-essentials'],
                'product_line' => 'STAPLE',
                'style_name' => 'Casual Black Tee',
                'short_description' => 'Everyday AxeGear casual tee for training days, travel, and pit lane downtime.',
                'description' => 'STAPLE TEE keeps the AxeGear identity clean and simple. Soft cotton construction and a relaxed fit make it easy to wear before or after high-output activity.',
                'regular_price' => 390000,
                'sale_price' => null,
                'weight' => 280,
                'length' => 28,
                'width' => 22,
                'height' => 4,
                'is_featured' => false,
                'is_new_arrival' => true,
                'is_best_seller' => false,
                'images' => [
                    'https://www.100percent.com/cdn/shop/files/2000x2000-eComm_20PDP-Casual_Staple_20Tee_0010_Layer_2015.jpg?v=1764633157&width=1200',
                ],
                'variants' => [
                    ['code' => 'BLK-M', 'name' => 'Black / M', 'color_name' => 'Black', 'color_hex' => '#111111', 'size' => 'M', 'package_type' => 'T-Shirt', 'stock' => 28],
                    ['code' => 'BLK-L', 'name' => 'Black / L', 'color_name' => 'Black', 'color_hex' => '#111111', 'size' => 'L', 'package_type' => 'T-Shirt', 'stock' => 31],
                ],
            ],
            [
                'name' => 'REGION TEE',
                'slug' => 'region-tee',
                'sku' => 'AXG-APP-004',
                'category_slug' => 'apparel-accessories',
                'collection_slugs' => ['explore-essentials', 'sale'],
                'product_line' => 'REGION',
                'style_name' => 'Casual White Tee',
                'short_description' => 'Clean graphic tee with lightweight everyday comfort.',
                'description' => 'REGION TEE is made for off-track days without losing the performance catalog look. It pairs easily with riding gear, travel packs, and daily basics.',
                'regular_price' => 450000,
                'sale_price' => 350000,
                'weight' => 280,
                'length' => 28,
                'width' => 22,
                'height' => 4,
                'is_featured' => false,
                'is_new_arrival' => false,
                'is_best_seller' => false,
                'images' => [
                    'https://www.100percent.com/cdn/shop/files/2000x2000-eComm_20PDP-Casual_Region_20Tee_0001_Layer_2030.jpg?v=1764633177&width=1200',
                ],
                'variants' => [
                    ['code' => 'WHT-M', 'name' => 'White / M', 'color_name' => 'White', 'color_hex' => '#F7F7F7', 'size' => 'M', 'package_type' => 'T-Shirt', 'stock' => 22],
                    ['code' => 'WHT-L', 'name' => 'White / L', 'color_name' => 'White', 'color_hex' => '#F7F7F7', 'size' => 'L', 'package_type' => 'T-Shirt', 'stock' => 19],
                ],
            ],
            [
                'name' => 'RACE LENS PRO',
                'slug' => 'race-lens-pro',
                'sku' => 'AXG-LEN-005',
                'category_slug' => 'replacement-lenses',
                'collection_slugs' => ['new-arrivals', 'sport-performance'],
                'product_line' => 'RACE LENS',
                'style_name' => 'Clear Tear-Off Compatible Lens',
                'short_description' => 'Replacement clear shield for race days and changing visibility.',
                'description' => 'RACE LENS PRO keeps your eyewear race-ready with a clean replacement shield. The clear finish is built for low-light riding, dusty trails, and backup kit preparation.',
                'regular_price' => 290000,
                'sale_price' => null,
                'weight' => 120,
                'length' => 18,
                'width' => 8,
                'height' => 3,
                'is_featured' => true,
                'is_new_arrival' => true,
                'is_best_seller' => false,
                'images' => [
                    'https://www.100percent.com/cdn/shop/files/FA25_LS_OS_TEE_REGION__2020142-10002_F-002.jpg?v=1764633155&width=1100',
                ],
                'variants' => [
                    ['code' => 'CLR-OS', 'name' => 'Clear / One Size', 'color_name' => 'Clear', 'color_hex' => '#F8F8F8', 'size' => 'One Size', 'package_type' => 'Lens Kit', 'stock' => 47],
                ],
            ],
        ];
    }
}
