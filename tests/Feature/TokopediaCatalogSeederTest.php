<?php

use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use Database\Seeders\TokopediaCatalogSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('imports a normalized Tokopedia catalog idempotently', function () {
    $path = tempnam(sys_get_temp_dir(), 'tokopedia-catalog-');
    file_put_contents($path, json_encode([
        'schema_version' => '1.0',
        'source' => ['marketplace' => 'tokopedia', 'store_url' => 'https://www.tokopedia.com/axegear-racing/product', 'scraped_at' => now()->toIso8601String(), 'product_count' => 1],
        'categories' => [['name' => 'Bags & Hydropack', 'slug' => 'bags-hydropack', 'description' => null, 'image_url' => null, 'sort_order' => 10, 'is_active' => true]],
        'collections' => [['name' => 'MTB', 'slug' => 'mtb', 'description' => null, 'banner_desktop_url' => null, 'banner_mobile_url' => null, 'sort_order' => 20, 'is_featured' => true, 'is_active' => true, 'starts_at' => null, 'ends_at' => null]],
        'products' => [['category_slug' => 'bags-hydropack', 'name' => 'AxeGear Hydropack', 'slug' => 'axegear-hydropack', 'sku' => 'TOKO-HYDRO', 'brand_name' => 'AxeGear', 'product_line' => null, 'style_name' => null, 'regular_price' => 300000, 'sale_price' => 250000, 'short_description' => 'Hydropack', 'description' => 'Hydropack MTB', 'weight' => 500, 'length' => null, 'width' => null, 'height' => null, 'status' => 'published', 'is_featured' => false, 'is_new_arrival' => false, 'is_best_seller' => false]],
        'product_images' => [['product_slug' => 'axegear-hydropack', 'image_url' => 'https://images.tokopedia.net/hydropack.jpg', 'alt_text' => 'Hydropack', 'sort_order' => 1, 'is_primary' => true]],
        'product_variants' => [['product_slug' => 'axegear-hydropack', 'sku' => 'TOKOV-HYDRO-BLUE', 'variant_name' => 'Blue', 'color_name' => 'Blue', 'color_hex' => null, 'size' => null, 'package_type' => null, 'regular_price' => 300000, 'sale_price' => 250000, 'stock' => 5, 'reserved_stock' => 0, 'weight' => 500, 'length' => null, 'width' => null, 'height' => null, 'image_url' => null, 'is_active' => true]],
        'product_collections' => [['product_slug' => 'axegear-hydropack', 'collection_slug' => 'mtb', 'sort_order' => 1]],
        'warnings' => [],
    ], JSON_THROW_ON_ERROR));
    config()->set('tokopedia.catalog_json', $path);

    try {
        $this->seed(TokopediaCatalogSeeder::class);
        $this->seed(TokopediaCatalogSeeder::class);
    } finally {
        unlink($path);
    }

    expect(Category::query()->count())->toBe(1)
        ->and(Collection::query()->count())->toBe(1)
        ->and(Product::query()->count())->toBe(1)
        ->and(ProductImage::query()->count())->toBe(1)
        ->and(ProductVariant::query()->count())->toBe(1)
        ->and(Product::query()->firstOrFail()->collections->pluck('slug')->all())->toBe(['mtb']);
});
