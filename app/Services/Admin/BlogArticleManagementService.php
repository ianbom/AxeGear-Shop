<?php

namespace App\Services\Admin;

use App\Models\BlogArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogArticleManagementService
{
    use ResolvesAdminPagination;
    use StoresUploadedFiles;

    public function indexData(Request $request): array
    {
        $filters = [
            'search' => $request->string('search')->toString(),
            'category' => $request->string('category')->toString(),
            'status' => $request->string('status')->toString(),
        ];

        return [
            'articles' => BlogArticle::query()
                ->when($filters['search'] !== '', fn ($query) => $query->where(fn ($query) => $query
                    ->where('title', 'like', "%{$filters['search']}%")
                    ->orWhere('slug', 'like', "%{$filters['search']}%")))
                ->when($filters['category'] !== '', fn ($query) => $query->where('category', $filters['category']))
                ->when($filters['status'] !== '', fn ($query) => $query->where('is_published', $filters['status'] === 'published'))
                ->orderByDesc('published_at')
                ->latest('id')
                ->paginate($this->perPage($request))
                ->withQueryString()
                ->through(fn (BlogArticle $article): array => $this->row($article)),
            'categories' => BlogArticle::query()->distinct()->orderBy('category')->pluck('category')->values(),
            'filters' => $filters,
        ];
    }

    public function create(Request $request): BlogArticle
    {
        $data = $this->payload($request);
        $data['image_url'] = $this->storePublicFile($request->file('image'), 'images/blogs');

        return BlogArticle::query()->create($data);
    }

    public function update(BlogArticle $article, Request $request): void
    {
        $data = $this->payload($request);

        if ($request->hasFile('image')) {
            $oldImage = $article->image_url;
            $data['image_url'] = $this->storePublicFile($request->file('image'), 'images/blogs');
            $article->update($data);
            $this->deletePublicFile($oldImage);

            return;
        }

        $article->update($data);
    }

    public function delete(BlogArticle $article): void
    {
        $image = $article->image_url;
        $article->delete();
        $this->deletePublicFile($image);
    }

    public function row(BlogArticle $article): array
    {
        return [
            'id' => $article->id,
            'title' => $article->title,
            'slug' => $article->slug,
            'category' => $article->category,
            'author_name' => $article->author_name,
            'excerpt' => $article->excerpt,
            'intro' => $article->intro,
            'sections' => $article->sections ?? [],
            'quote' => $article->quote,
            'tips' => $article->tips ?? [],
            'conclusion' => $article->conclusion,
            'image_url' => $article->image_url,
            'reading_minutes' => $article->reading_minutes,
            'published_at' => $article->published_at?->format('Y-m-d'),
            'is_published' => $article->is_published,
            'updated_at' => $article->updated_at?->toDateTimeString(),
        ];
    }

    private function payload(Request $request): array
    {
        $data = $request->validated();
        unset($data['image']);
        $data['slug'] = Str::slug($data['slug']);
        $data['is_published'] = $request->boolean('is_published');
        $data['tips'] = array_values(array_filter($data['tips'] ?? [], fn ($tip) => filled($tip)));
        $data['sections'] = array_values($data['sections']);

        return $data;
    }
}
