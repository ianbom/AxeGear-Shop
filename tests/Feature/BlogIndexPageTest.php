<?php

use App\Models\BlogArticle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('lists only published articles and applies backend filters', function () {
    $matching = BlogArticle::factory()->create([
        'title' => 'Trail Lens Guide',
        'category' => 'Product Guides',
        'published_at' => '2026-06-22',
    ]);
    BlogArticle::factory()->create(['title' => 'Other Story', 'category' => 'Lifestyle']);
    BlogArticle::factory()->create(['title' => 'Hidden Trail Lens', 'category' => 'Product Guides', 'is_published' => false]);

    $this->get(route('blog', ['search' => 'Trail', 'category' => 'Product Guides', 'sort' => 'latest']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('blog/index')
            ->has('articles.data', 1)
            ->where('articles.data.0.id', $matching->id)
            ->where('filters.category', 'Product Guides')
            ->where('filters.sort', 'latest'));
});
