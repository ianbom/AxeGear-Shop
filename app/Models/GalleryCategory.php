<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['name', 'slug', 'sort_order', 'is_active'])]
class GalleryCategory extends Model
{
    public function images(): BelongsToMany
    {
        return $this->belongsToMany(GalleryImage::class, 'gallery_category_image');
    }

    protected function casts(): array
    {
        return ['sort_order' => 'integer', 'is_active' => 'boolean'];
    }
}
