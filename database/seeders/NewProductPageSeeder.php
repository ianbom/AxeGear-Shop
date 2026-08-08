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
                'specifications_text' => 'View Specifications',
                'hero_image_url' => 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=88&w=1900',
                'benefits_heading' => 'Why It Stands Out',
                'story_eyebrow' => 'The Story Behind the Launch',
                'story_title' => "Built for\nthe Next Ride",
                'story_body' => "We created the Velox Pro to push the boundaries of performance eyewear. Every detail—from the ultra-light frame to the high-contrast lens—was engineered to enhance your vision, focus, and confidence.\n\nMade for riders who chase every second, in every condition. Whether sprinting on the road, charging down the trail, or hitting your next PR, Velox Pro keeps you ahead of the pack.",
                'story_image_url' => 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=88&w=1500',
                'gallery_heading' => 'Closer Look',
                'technology_heading' => 'Performance Technology',
                'technology_image_url' => 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=88&w=1500',
                'final_eyebrow' => 'New Arrival',
                'final_title' => 'AxeGear Velox Pro',
                'final_tagline' => 'Precision. Protection. Performance.',
                'final_price_label' => '$149.00 USD',
                'final_cta_text' => 'Shop Now',
                'final_cta_url' => '/list',
                'final_image_url' => 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=88&w=1500',
                'is_active' => true,
            ],
        );

        $page->benefits()->delete();
        $page->benefits()->createMany([
            ['icon' => 'feather', 'title' => 'Ultra-Lightweight Construction', 'description' => 'Featherlight materials reduce fatigue for all-day comfort.', 'sort_order' => 1, 'is_active' => true],
            ['icon' => 'shield', 'title' => 'High-Impact Lens Protection', 'description' => 'Durable protection built for demanding conditions.', 'sort_order' => 2, 'is_active' => true],
            ['icon' => 'eye', 'title' => 'Wide Field of Vision', 'description' => 'Panoramic clarity so you see more of what matters.', 'sort_order' => 3, 'is_active' => true],
            ['icon' => 'lock', 'title' => 'Secure Performance Fit', 'description' => 'Non-slip grip keeps the frame locked in place.', 'sort_order' => 4, 'is_active' => true],
            ['icon' => 'wind', 'title' => 'Ventilated Comfort Design', 'description' => 'Advanced airflow helps reduce fog and heat.', 'sort_order' => 5, 'is_active' => true],
        ]);

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

        $page->technologies()->delete();
        $page->technologies()->createMany([
            ['icon' => 'sun', 'title' => 'HD Polarized Lens', 'description' => 'Reduces glare and enhances contrast for sharper vision.', 'sort_order' => 1, 'is_active' => true],
            ['icon' => 'badge-check', 'title' => 'UV400 Protection', 'description' => 'Blocks UVA and UVB rays to protect your eyes.', 'sort_order' => 2, 'is_active' => true],
            ['icon' => 'diamond', 'title' => 'Scratch-Resistant Coating', 'description' => 'Durable coating keeps lenses clear and sharp.', 'sort_order' => 3, 'is_active' => true],
            ['icon' => 'crosshair', 'title' => 'Impact-Resistant', 'description' => 'Built to withstand demanding road and trail conditions.', 'sort_order' => 4, 'is_active' => true],
        ]);
    }
}
