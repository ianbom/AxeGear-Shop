<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        foreach (self::categories() as $category) {
            $record = Category::query()->withTrashed()->updateOrCreate(
                ['slug' => $category['slug']],
                $category,
            );

            if ($record->trashed()) {
                $record->restore();
            }
        }
    }

    public static function categories(): array
    {
        return [
            [
                'name' => 'Bags & Hydropack',
                'slug' => 'bags-hydropack',
                'description' => 'Bags, hydropacks, running belts, and compact carry solutions.',
                'image_url' => 'https://down-id.img.susercontent.com/file/id-11134207-7r98w-loeyxusgxjru44',
                'sort_order' => 10,
                'is_active' => true,
            ],
            [
                'name' => 'Accessories',
                'slug' => 'accessories',
                'description' => 'Technical accessories and practical gear for every activity.',
                'image_url' => 'https://down-id.img.susercontent.com/file/id-11134207-7rbk2-m8okjffi65tu16',
                'sort_order' => 20,
                'is_active' => true,
            ],
            [
                'name' => 'Care & Utility',
                'slug' => 'care-utility',
                'description' => 'Cleaning, maintenance, and utility products for everyday use.',
                'image_url' => 'https://down-id.img.susercontent.com/file/sg-11134201-81zuc-mmvm1ymm58g4ee',
                'sort_order' => 30,
                'is_active' => true,
            ],
            [
                'name' => 'Bundles',
                'slug' => 'bundles',
                'description' => 'Value packs and bundled gear combinations from AxeGear.',
                'image_url' => 'https://down-id.img.susercontent.com/file/id-11134207-7r98p-low92wfi0sybc4',
                'sort_order' => 40,
                'is_active' => true,
            ],
        ];
    }
}
