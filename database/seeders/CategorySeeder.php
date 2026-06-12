<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Data kategori dikurasi dari katalog https://zaskiamecca.com/.
        $categories = [
        [
            'name' => 'Hijab & Scarf',
            'slug' => 'hijab-scarf',
            'description' => 'Koleksi scarf dan hijab segi empat ZM Zaskia Mecca dari Voal Alaska Premium.',
            'image_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/26fd858db89a4f018c0536c484e68ea6_tplv-aphluv4xwc-origin-jpeg.jpg?v=1777517735',
            'is_active' => true,
        ],
        [
            'name' => 'Women\'s Tunics',
            'slug' => 'womens-tunics',
            'description' => 'Tunik wanita ZM Zaskia Mecca untuk tampilan modest, feminin, dan nyaman.',
            'image_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/sg-11134201-825zr-ml31rmqs52io5f.webp?v=1771996057',
            'is_active' => true,
        ],
        [
            'name' => 'Men\'s Shirts',
            'slug' => 'mens-shirts',
            'description' => 'Kemeja pria ZM Zaskia Mecca dengan desain rapi untuk momen harian hingga raya.',
            'image_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/f38eec2ded12437ebbe163d5390917b8_tplv-aphluv4xwc-origin-jpeg.webp?v=1774415487',
            'is_active' => true,
        ],
        [
            'name' => 'Outerwear',
            'slug' => 'outerwear',
            'description' => 'Outerwear dan vest daily ZM Zaskia Mecca untuk layering kasual.',
            'image_url' => 'https://cdn.shopify.com/s/files/1/0083/3241/0942/files/a80a91f2c2984cec9533ecea991a3aa6_tplv-o3syd03w52-origin-jpeg.webp?v=1774414928',
            'is_active' => true,
        ]
        ];
        foreach ($categories as $category) { Category::query()->updateOrCreate(['slug' => $category['slug']], $category); }
    }
}
