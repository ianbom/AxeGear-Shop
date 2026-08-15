<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'title', 'slug', 'category', 'author_name', 'excerpt', 'intro',
    'sections', 'quote', 'tips', 'conclusion', 'image_url',
    'reading_minutes', 'published_at', 'is_published',
])]
class BlogArticle extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'sections' => 'array',
            'tips' => 'array',
            'reading_minutes' => 'integer',
            'published_at' => 'date:Y-m-d',
            'is_published' => 'boolean',
        ];
    }
}
