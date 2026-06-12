<?php

namespace Database\Seeders;

use App\Models\Collection;
use Illuminate\Database\Seeder;

class CollectionSeeder extends Seeder
{
    public function run(): void
    {
        $collections = [
            [
                'name' => 'New Arrivals',
                'slug' => 'new-arrivals',
                'description' => 'Fresh AxeGear product drops for sport, riding, and outdoor performance.',
                'banner_desktop_url' => 'https://www.100percent.com/cdn/shop/files/59057-00001-P_1.jpg?v=1764788225&width=1100',
                'banner_mobile_url' => 'https://www.100percent.com/cdn/shop/files/59057-00001-P_1.jpg?v=1764788225&width=1100',
                'sort_order' => 10,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Sport Performance',
                'slug' => 'sport-performance',
                'description' => 'Performance eyewear, goggles, gloves, and essentials for high-output activity.',
                'banner_desktop_url' => 'https://www.100percent.com/cdn/shop/files/SP26_SPEEDCRAFT_SL_60008-00025_3Q.jpg?v=1772487312&width=500',
                'banner_mobile_url' => 'https://www.100percent.com/cdn/shop/files/SP26_SPEEDCRAFT_SL_60008-00025_3Q.jpg?v=1772487312&width=500',
                'sort_order' => 20,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Sale',
                'slug' => 'sale',
                'description' => 'Limited offers on selected AxeGear equipment and accessories.',
                'banner_desktop_url' => 'https://www.100percent.com/cdn/shop/files/2000x2000-eComm_20PDP-Casual_Region_20Tee_0001_Layer_2030.jpg?v=1764633177&width=1200',
                'banner_mobile_url' => 'https://www.100percent.com/cdn/shop/files/2000x2000-eComm_20PDP-Casual_Region_20Tee_0001_Layer_2030.jpg?v=1764633177&width=1200',
                'sort_order' => 30,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Explore Essentials',
                'slug' => 'explore-essentials',
                'description' => 'Everyday apparel and compact accessories for travel, training, and trail days.',
                'banner_desktop_url' => 'https://www.100percent.com/cdn/shop/files/FA25_LS_OS_TEE_REGION__2020142-10002_F-002.jpg?v=1764633155&width=1100',
                'banner_mobile_url' => 'https://www.100percent.com/cdn/shop/files/FA25_LS_OS_TEE_REGION__2020142-10002_F-002.jpg?v=1764633155&width=1100',
                'sort_order' => 40,
                'is_featured' => false,
                'is_active' => true,
            ],
        ];

        foreach ($collections as $collection) {
            $record = Collection::query()->withTrashed()->updateOrCreate(
                ['slug' => $collection['slug']],
                $collection,
            );

            if ($record->trashed()) {
                $record->restore();
            }
        }
    }
}
