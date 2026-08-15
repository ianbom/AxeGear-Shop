<?php

namespace Database\Factories;

use App\Models\BlogArticle;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends Factory<BlogArticle> */
class BlogArticleFactory extends Factory
{
    protected $model = BlogArticle::class;

    public function definition(): array
    {
        $title = fake()->sentence(6);

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->numberBetween(1, 9999),
            'category' => 'Riding Tips',
            'author_name' => 'AxeGear Editorial',
            'excerpt' => fake()->sentence(18),
            'intro' => fake()->paragraph(),
            'sections' => [['heading' => 'Build a Repeatable Setup', 'paragraphs' => [fake()->paragraph()]]],
            'quote' => fake()->sentence(10),
            'tips' => [fake()->sentence(8), fake()->sentence(8)],
            'conclusion' => fake()->paragraph(),
            'image_url' => 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=88&w=1400',
            'reading_minutes' => fake()->numberBetween(3, 8),
            'published_at' => now()->toDateString(),
            'is_published' => true,
        ];
    }
}
