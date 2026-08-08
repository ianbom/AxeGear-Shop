<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['new_product_page_id', 'image_url', 'alt_text', 'sort_order', 'is_active'])]
class NewProductGalleryImage extends Model
{
    public function page(): BelongsTo
    {
        return $this->belongsTo(NewProductPage::class, 'new_product_page_id');
    }

    protected function casts(): array
    {
        return ['is_active' => 'boolean', 'sort_order' => 'integer'];
    }
}
