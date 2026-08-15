<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BlogArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin' && (bool) $this->user()?->is_active;
    }

    public function rules(): array
    {
        $article = $this->route('blogArticle');

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('blog_articles', 'slug')->ignore($article)],
            'category' => ['required', 'string', 'max:120'],
            'author_name' => ['required', 'string', 'max:180'],
            'excerpt' => ['required', 'string', 'max:2000'],
            'intro' => ['required', 'string'],
            'sections' => ['required', 'array', 'min:1'],
            'sections.*.heading' => ['required', 'string', 'max:255'],
            'sections.*.paragraphs' => ['required', 'array', 'min:1'],
            'sections.*.paragraphs.*' => ['required', 'string'],
            'quote' => ['nullable', 'string', 'max:2000'],
            'tips' => ['nullable', 'array'],
            'tips.*' => ['required', 'string', 'max:1000'],
            'conclusion' => ['nullable', 'string'],
            'image' => [$article ? 'nullable' : 'required', 'file', 'image', 'max:4096'],
            'reading_minutes' => ['required', 'integer', 'min:1', 'max:999'],
            'published_at' => ['nullable', 'date', 'required_if:is_published,1'],
            'is_published' => ['sometimes', 'boolean'],
        ];
    }
}
