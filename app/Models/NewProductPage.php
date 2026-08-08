<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'name',
    'hero_eyebrow',
    'hero_title',
    'product_name',
    'hero_description',
    'price_label',
    'shop_now_text',
    'shop_now_url',
    'specifications_text',
    'hero_image_url',
    'benefits_heading',
    'story_eyebrow',
    'story_title',
    'story_body',
    'story_image_url',
    'gallery_heading',
    'technology_heading',
    'technology_image_url',
    'final_eyebrow',
    'final_title',
    'final_tagline',
    'final_price_label',
    'final_cta_text',
    'final_cta_url',
    'final_image_url',
    'is_active',
])]
class NewProductPage extends Model
{
    public function benefits(): HasMany
    {
        return $this->hasMany(NewProductBenefit::class)->orderBy('sort_order');
    }

    public function galleryImages(): HasMany
    {
        return $this->hasMany(NewProductGalleryImage::class)->orderBy('sort_order');
    }

    public function technologies(): HasMany
    {
        return $this->hasMany(NewProductTechnology::class)->orderBy('sort_order');
    }

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
