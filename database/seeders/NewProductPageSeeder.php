<?php

namespace Database\Seeders;

use App\Models\NewProductPage;
use Illuminate\Database\Seeder;

class NewProductPageSeeder extends Seeder
{
    public function run(): void
    {
        $page = NewProductPage::query()->updateOrCreate(
            ['name' => 'AxeGear Velox Pro'],
            [
                'hero_eyebrow' => 'New Arrival',
                'hero_title' => "Introducing\nThe New\nStandard",
                'product_name' => 'AxeGear Velox Pro',
                'hero_description' => 'Built for riders who demand lightweight comfort, sharper visibility, and elite performance on every ride.',
                'price_label' => '$149.00 USD',
                'shop_now_text' => 'Shop Now',
                'shop_now_url' => '/list',
                'specifications_text' => 'Closer Look',
                'hero_image_url' => 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=88&w=1900',
                'story_eyebrow' => 'The Story Behind the Launch',
                'story_title' => "Built for\nthe Next Ride",
                'story_body' => "We created the Velox Pro to push the boundaries of performance eyewear. Every detail—from the ultra-light frame to the high-contrast lens—was engineered to enhance your vision, focus, and confidence.\n\nMade for riders who chase every second, in every condition. Whether sprinting on the road, charging down the trail, or hitting your next PR, Velox Pro keeps you ahead of the pack.",
                'story_image_url' => 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=88&w=1500',
                'gallery_heading' => 'Closer Look',
                'is_active' => true,
            ],
        );

        $gallery = [
            ['photo-1511499767150-a48a237f0083', 'Performance sunglasses front view'],
            ['photo-1572635196237-14b3f281503f', 'Performance sunglasses side profile'],
            ['photo-1541625602330-2277a4c46182', 'Cyclist wearing performance eyewear'],
            ['photo-1707985034123-dbbed1830205', 'Sunglasses frame detail'],
            ['photo-1508296695146-257a814070b4', 'Eyewear temple detail'],
            ['photo-1511499767150-a48a237f0083', 'Protective lens detail'],
            ['photo-1577803645773-f96470509666', 'Sunglasses and travel case'],
        ];

        $page->galleryImages()->delete();
        $page->galleryImages()->createMany(array_map(
            fn (array $image, int $index): array => [
                'image_url' => "https://images.unsplash.com/{$image[0]}?auto=format&fit=crop&q=88&w=1100",
                'alt_text' => $image[1],
                'sort_order' => $index + 1,
                'is_active' => true,
            ],
            $gallery,
            array_keys($gallery),
        ));
    }
}
