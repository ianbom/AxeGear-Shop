<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class GalleryImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin' && (bool) $this->user()?->is_active;
    }

    public function rules(): array
    {
        $image = $this->route('galleryImage');

        return [
            'image' => [$image ? 'nullable' : 'required', 'file', 'image', 'max:4096'],
            'alt_text' => ['required', 'string', 'max:255'],
            'category_ids' => ['required', 'array', 'min:1'],
            'category_ids.*' => ['integer', 'exists:gallery_categories,id'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
