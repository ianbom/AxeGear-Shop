<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class NewProductPageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin' && (bool) $this->user()?->is_active;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:180'],
            'hero_eyebrow' => ['required', 'string', 'max:100'],
            'hero_title' => ['required', 'string', 'max:255'],
            'product_name' => ['required', 'string', 'max:180'],
            'hero_description' => ['required', 'string', 'max:2000'],
            'price_label' => ['required', 'string', 'max:100'],
            'shop_now_text' => ['required', 'string', 'max:100'],
            'shop_now_url' => ['required', 'string', 'max:255'],
            'specifications_text' => ['required', 'string', 'max:100'],
            'hero_image_url' => ['required', 'string', 'max:2048'],
            'hero_image' => ['nullable', 'file', 'image', 'max:4096'],
            'benefits_heading' => ['required', 'string', 'max:180'],
            'story_eyebrow' => ['required', 'string', 'max:180'],
            'story_title' => ['required', 'string', 'max:255'],
            'story_body' => ['required', 'string', 'max:10000'],
            'story_image_url' => ['required', 'string', 'max:2048'],
            'story_image' => ['nullable', 'file', 'image', 'max:4096'],
            'gallery_heading' => ['required', 'string', 'max:180'],
            'technology_heading' => ['required', 'string', 'max:180'],
            'technology_image_url' => ['required', 'string', 'max:2048'],
            'technology_image' => ['nullable', 'file', 'image', 'max:4096'],
            'final_eyebrow' => ['nullable', 'string', 'max:100'],
            'final_title' => ['nullable', 'string', 'max:180'],
            'final_tagline' => ['nullable', 'string', 'max:255'],
            'final_price_label' => ['nullable', 'string', 'max:100'],
            'final_cta_text' => ['nullable', 'string', 'max:100'],
            'final_cta_url' => ['nullable', 'string', 'max:255'],
            'final_image_url' => ['nullable', 'string', 'max:2048'],
            'final_image' => ['nullable', 'file', 'image', 'max:4096'],
            'is_active' => ['sometimes', 'boolean'],
            'benefits' => ['nullable', 'array'],
            'benefits.*.icon' => ['required', Rule::in($this->icons())],
            'benefits.*.title' => ['required', 'string', 'max:180'],
            'benefits.*.description' => ['required', 'string', 'max:1000'],
            'benefits.*.sort_order' => ['required', 'integer', 'min:0'],
            'benefits.*.is_active' => ['sometimes', 'boolean'],
            'gallery_images' => ['nullable', 'array'],
            'gallery_images.*.image_url' => ['nullable', 'string', 'max:2048'],
            'gallery_images.*.image' => ['nullable', 'file', 'image', 'max:4096'],
            'gallery_images.*.alt_text' => ['nullable', 'string', 'max:255'],
            'gallery_images.*.sort_order' => ['required', 'integer', 'min:0'],
            'gallery_images.*.is_active' => ['sometimes', 'boolean'],
            'technologies' => ['nullable', 'array'],
            'technologies.*.icon' => ['required', Rule::in($this->icons())],
            'technologies.*.title' => ['required', 'string', 'max:180'],
            'technologies.*.description' => ['required', 'string', 'max:1000'],
            'technologies.*.sort_order' => ['required', 'integer', 'min:0'],
            'technologies.*.is_active' => ['sometimes', 'boolean'],
        ];
    }

    public function after(): array
    {
        return [function ($validator): void {
            foreach ($this->input('gallery_images', []) as $index => $image) {
                if (blank($image['image_url'] ?? null) && ! $this->hasFile("gallery_images.{$index}.image")) {
                    $validator->errors()->add("gallery_images.{$index}.image", 'Gambar wajib diupload.');
                }
            }
        }];
    }

    public function icons(): array
    {
        return ['badge-check', 'crosshair', 'diamond', 'eye', 'feather', 'lock', 'shield', 'sun', 'wind'];
    }
}
