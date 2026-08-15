<?php

use App\Models\BlogArticle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('renders a published blog article and related articles from the database', function () {
    $article = BlogArticle::factory()->create([
        'slug' => 'database-backed-article',
        'title' => 'Database Backed Article',
        'category' => 'Technology',
    ]);
    $related = BlogArticle::factory()->create(['category' => 'Technology', 'published_at' => now()->subDay()]);
    BlogArticle::factory()->create(['category' => 'Lifestyle', 'published_at' => now()->subDays(2)]);

    $this->get(route('blog.show', $article->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('blog/show')
            ->where('article.id', $article->id)
            ->where('article.title', 'Database Backed Article')
            ->where('relatedArticles.0.id', $related->id)
            ->has('article.sections')
            ->has('article.tips'));
});

it('does not expose draft blog articles', function () {
    $article = BlogArticle::factory()->create(['is_published' => false]);

    $this->get(route('blog.show', $article->slug))->assertNotFound();
});
