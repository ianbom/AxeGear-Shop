<?php

namespace Database\Seeders;

use App\Models\Collection;
use Illuminate\Database\Seeder;

class CollectionSeeder extends Seeder
{
    public function run(): void
    {
        // Data collection dikurasi dari https://zaskiamecca.com/collections.json dan katalog produk.
        $collections = [
        [
            'name' => 'Bunga Pertiwi',
            'slug' => 'bunga-pertiwi',
            'description' => 'Scarf Bunga Pertiwi edisi pahlawan perempuan Indonesia dari ZM Zaskia Mecca.',
            'banner_desktop_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/9028d5d5ac48461ea36182c1b41855d2_tplv-aphluv4xwc-origin-jpeg.jpg?v=1777517636',
            'banner_mobile_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/9028d5d5ac48461ea36182c1b41855d2_tplv-aphluv4xwc-origin-jpeg.jpg?v=1777517636',
            'is_featured' => true,
            'is_active' => true,
        ],
        [
            'name' => 'Primadona Series',
            'slug' => 'primadona-series',
            'description' => 'Koleksi Raya Primadona Series ZM Zaskia Mecca.',
            'banner_desktop_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/sg-11134201-825zr-ml31rmqs52io5f.webp?v=1771996057',
            'banner_mobile_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/sg-11134201-825zr-ml31rmqs52io5f.webp?v=1771996057',
            'is_featured' => true,
            'is_active' => true,
        ],
        [
            'name' => 'Jejak Teduh',
            'slug' => 'jejak-teduh',
            'description' => 'Koleksi Jejak Teduh terinspirasi budaya Nusantara.',
            'banner_desktop_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/sg-11134201-8262w-ml3ns60k2vie4a.webp?v=1771996087',
            'banner_mobile_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/sg-11134201-8262w-ml3ns60k2vie4a.webp?v=1771996087',
            'is_featured' => true,
            'is_active' => true,
        ],
        [
            'name' => 'Monogram Series',
            'slug' => 'monogram-series',
            'description' => 'Koleksi hijab premium motif monogram ZM Zaskia Mecca.',
            'banner_desktop_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/150315b1e1da4470875aa4f30e3b92bf_tplv-aphluv4xwc-origin-jpeg.webp?v=1774415520',
            'banner_mobile_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/150315b1e1da4470875aa4f30e3b92bf_tplv-aphluv4xwc-origin-jpeg.webp?v=1774415520',
            'is_featured' => true,
            'is_active' => true,
        ],
        [
            'name' => 'Daily Wear',
            'slug' => 'daily-wear',
            'description' => 'Produk daily ZM Zaskia Mecca untuk gaya harian.',
            'banner_desktop_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/a80a91f2c2984cec9533ecea991a3aa6_tplv-o3syd03w52-origin-jpeg.webp?v=1774414928',
            'banner_mobile_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/a80a91f2c2984cec9533ecea991a3aa6_tplv-o3syd03w52-origin-jpeg.webp?v=1774414928',
            'is_featured' => false,
            'is_active' => true,
        ]
        ];
        foreach ($collections as $collection) { Collection::query()->updateOrCreate(['slug' => $collection['slug']], $collection); }
    }
}
