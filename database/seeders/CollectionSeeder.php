<?php

namespace Database\Seeders;

use App\Models\Collection;
use Illuminate\Database\Seeder;

class CollectionSeeder extends Seeder
{
    public function run(): void
    {
        foreach (self::collections() as $collection) {
            $record = Collection::query()->withTrashed()->updateOrCreate(
                ['slug' => $collection['slug']],
                $collection,
            );

            if ($record->trashed()) {
                $record->restore();
            }
        }
    }

    public static function collections(): array
    {
        $banner = 'https://orcapowergear.com/_next/image?url=%2Fasset%2Fbanner%2Fwebbanner-orca.webp&w=3840&q=75';

        return collect([
            ['name' => 'Enduro', 'slug' => 'enduro', 'description' => 'Gear for enduro, trail, and motorsport activities.'],
            ['name' => 'MTB', 'slug' => 'mtb', 'description' => 'Gear for mountain biking and cycling activities.'],
            ['name' => 'Running', 'slug' => 'running', 'description' => 'Gear for running, jogging, and active training.'],
            ['name' => 'Adventure', 'slug' => 'adventure', 'description' => 'Versatile gear for travel and outdoor adventures.'],
            ['name' => 'New Product', 'slug' => 'new-product', 'description' => 'The latest products added to the AxeGear catalog.'],
        ])->map(fn (array $collection, int $index): array => $collection + [
            'banner_desktop_url' => $banner,
            'banner_mobile_url' => $banner,
            'sort_order' => ($index + 1) * 10,
            'is_featured' => true,
            'is_active' => true,
        ])->all();
    }
}
