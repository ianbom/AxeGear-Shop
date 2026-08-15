<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['image_url', 'alt_text', 'sort_order', 'is_active'])]
class GalleryImage extends Model
{
    use HasFactory;

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(GalleryCategory::class, 'gallery_category_image');
    }

    protected function casts(): array
    {
        return ['sort_order' => 'integer', 'is_active' => 'boolean'];
    }
}
