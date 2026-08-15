<?php

namespace App\Services\Customer;

use App\Models\BlogArticle;
use Illuminate\Http\Request;

class BlogBrowsingService
{
    public function indexData(Request $request): array
    {
        $search = trim($request->string('search')->toString());
        $category = trim($request->string('category')->toString());
        $sort = $request->string('sort')->toString() === 'oldest' ? 'oldest' : 'latest';

        $query = BlogArticle::query()
            ->where('is_published', true)
            ->when($search !== '', fn ($query) => $query->where(fn ($query) => $query
                ->where('title', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%")
                ->orWhere('excerpt', 'like', "%{$search}%")))
            ->when($category !== '' && $category !== 'All Stories', fn ($query) => $query->where('category', $category));

        $query->orderBy('published_at', $sort === 'latest' ? 'desc' : 'asc')->orderBy('id', $sort === 'latest' ? 'desc' : 'asc');

        return [
            'articles' => $query->paginate(8)->withQueryString()->through(fn (BlogArticle $article): array => $this->card($article)),
            'categories' => BlogArticle::query()->where('is_published', true)->distinct()->orderBy('category')->pluck('category')->values(),
            'filters' => ['search' => $search, 'category' => $category ?: 'All Stories', 'sort' => $sort],
        ];
    }

    public function showData(string $slug): array
    {
        $article = BlogArticle::query()->where('slug', $slug)->where('is_published', true)->firstOrFail();

        return [
            'article' => $this->detail($article),
            'relatedArticles' => BlogArticle::query()
                ->where('is_published', true)
                ->whereKeyNot($article->id)
                ->orderByRaw('category = ? desc', [$article->category])
                ->orderByDesc('published_at')
                ->limit(3)
                ->get()
                ->map(fn (BlogArticle $related): array => $this->card($related))
                ->values(),
        ];
    }

    /** @return array<string, mixed> */
    private function card(BlogArticle $article): array
    {
        return [
            'id' => $article->id,
            'slug' => $article->slug,
            'title' => $article->title,
            'category' => $article->category,
            'author_name' => $article->author_name,
            'published_at' => $article->published_at?->format('F j, Y'),
            'reading_minutes' => $article->reading_minutes,
            'image_url' => $article->image_url,
            'excerpt' => $article->excerpt,
        ];
    }

    /** @return array<string, mixed> */
    private function detail(BlogArticle $article): array
    {
        return [
            ...$this->card($article),
            'intro' => $article->intro,
            'sections' => $article->sections ?? [],
            'quote' => $article->quote,
            'tips' => $article->tips ?? [],
            'conclusion' => $article->conclusion,
        ];
    }
}
