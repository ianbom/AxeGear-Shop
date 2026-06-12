<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Sunglasses',
                'slug' => 'sunglasses',
                'description' => 'Performance sunglasses for riding, racing, running, and outdoor training.',
                'image_url' => 'https://www.100percent.com/cdn/shop/files/59057-00001-P_1.jpg?v=1764788225&width=1100',
                'sort_order' => 10,
                'is_active' => true,
            ],
            [
                'name' => 'Goggles',
                'slug' => 'goggles',
                'description' => 'Motocross and trail goggles with clear lens visibility and secure straps.',
                'image_url' => 'https://www.100percent.com/cdn/shop/files/SP26_SPEEDCRAFT_SL_60008-00025_3Q.jpg?v=1772487312&width=500',
                'sort_order' => 20,
                'is_active' => true,
            ],
            [
                'name' => 'Apparel & Accessories',
                'slug' => 'apparel-accessories',
                'description' => 'Casual apparel, arm sleeves, and technical accessories for daily use.',
                'image_url' => 'https://www.100percent.com/cdn/shop/files/2000x2000-eComm_20PDP-Casual_Staple_20Tee_0010_Layer_2015.jpg?v=1764633157&width=1200',
                'sort_order' => 30,
                'is_active' => true,
            ],
            [
                'name' => 'Replacement Lenses',
                'slug' => 'replacement-lenses',
                'description' => 'Replacement shields and lens kits for changing light and terrain conditions.',
                'image_url' => 'https://www.100percent.com/cdn/shop/files/FA25_LS_OS_TEE_REGION__2020142-10002_F-002.jpg?v=1764633155&width=1100',
                'sort_order' => 40,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            $record = Category::query()->withTrashed()->updateOrCreate(
                ['slug' => $category['slug']],
                $category,
            );

            if ($record->trashed()) {
                $record->restore();
            }
        }
    }
}
