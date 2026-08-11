<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

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
            'story_eyebrow' => ['required', 'string', 'max:180'],
            'story_title' => ['required', 'string', 'max:255'],
            'story_body' => ['required', 'string', 'max:10000'],
            'story_image_url' => ['required', 'string', 'max:2048'],
            'story_image' => ['nullable', 'file', 'image', 'max:4096'],
            'gallery_heading' => ['required', 'string', 'max:180'],
            'is_active' => ['sometimes', 'boolean'],
            'gallery_images' => ['nullable', 'array'],
            'gallery_images.*.image_url' => ['nullable', 'string', 'max:2048'],
            'gallery_images.*.image' => ['nullable', 'file', 'image', 'max:4096'],
            'gallery_images.*.alt_text' => ['nullable', 'string', 'max:255'],
            'gallery_images.*.sort_order' => ['required', 'integer', 'min:0'],
            'gallery_images.*.is_active' => ['sometimes', 'boolean'],
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
}
