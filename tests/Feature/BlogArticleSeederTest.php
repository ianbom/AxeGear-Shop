<?php

use App\Models\BlogArticle;
use Database\Seeders\BlogArticleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('seeds the existing blog article collection', function () {
    $this->seed(BlogArticleSeeder::class);

    expect(BlogArticle::query()->count())->toBe(12)
        ->and(BlogArticle::query()->where('slug', 'choosing-the-right-lens-for-every-riding-condition')->exists())->toBeTrue();
});
