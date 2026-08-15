<?php

use App\Models\BlogArticle;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

it('allows an active admin to create update and delete a blog article', function () {
    Storage::fake('public');
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);

    $this->actingAs($admin)->post(route('admin.blogs.store'), articlePayload())->assertRedirect(route('admin.blogs.index'));

    $article = BlogArticle::query()->where('slug', 'trail-setup-guide')->firstOrFail();
    expect($article->sections)->toHaveCount(1)->and($article->tips)->toHaveCount(2)->and($article->is_published)->toBeTrue();
    Storage::disk('public')->assertExists(Str::after($article->image_url, '/storage/'));

    $this->actingAs($admin)->put(route('admin.blogs.update', $article), [
        ...articlePayload(false),
        'title' => 'Updated Trail Setup Guide',
        'image' => null,
    ])->assertRedirect(route('admin.blogs.index'));

    expect($article->refresh()->title)->toBe('Updated Trail Setup Guide');
    $this->actingAs($admin)->delete(route('admin.blogs.destroy', $article))->assertRedirect(route('admin.blogs.index'));
    $this->assertDatabaseMissing('blog_articles', ['id' => $article->id]);
});

/** @return array<string, mixed> */
function articlePayload(bool $withImage = true): array
{
    return [
        'title' => 'Trail Setup Guide',
        'slug' => 'trail-setup-guide',
        'category' => 'Riding Tips',
        'author_name' => 'AxeGear Editorial',
        'excerpt' => 'A concise trail setup guide.',
        'intro' => 'Prepare every ride with a repeatable process.',
        'sections' => [['heading' => 'Preparation', 'paragraphs' => ['Check every essential component.']]],
        'quote' => 'Preparation builds confidence.',
        'tips' => ['Check tire pressure.', 'Pack essential tools.'],
        'conclusion' => 'Keep the setup simple and dependable.',
        'image' => $withImage ? UploadedFile::fake()->image('cover.jpg', 1200, 800) : null,
        'reading_minutes' => 5,
        'published_at' => '2026-06-22',
        'is_published' => true,
    ];
}
