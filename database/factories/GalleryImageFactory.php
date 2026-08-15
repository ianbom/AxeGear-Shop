<?php

namespace Database\Factories;

use App\Models\GalleryImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<GalleryImage> */
class GalleryImageFactory extends Factory
{
    protected $model = GalleryImage::class;

    public function definition(): array
    {
        return [
            'image_url' => 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&q=85&w=1200',
            'alt_text' => fake()->sentence(8),
            'sort_order' => fake()->numberBetween(0, 30),
            'is_active' => true,
        ];
    }
}
