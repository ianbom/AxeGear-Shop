<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductVariantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin' && (bool) $this->user()?->is_active;
    }

    /**
     * @return array<string, list<mixed>>
     */
    public function rules(): array
    {
        $variant = $this->route('productVariant');
        $dimensionRules = [Rule::requiredIf($this->boolean('is_active')), 'nullable', 'integer', 'min:'.($this->boolean('is_active') ? 1 : 0)];

        return [
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'sku' => ['required', 'string', 'max:100', Rule::unique('product_variants', 'sku')->ignore($variant)],
            'variant_name' => ['nullable', 'string', 'max:180'],
            'color_name' => ['nullable', 'string', 'max:100'],
            'color_hex' => ['nullable', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
            'size' => ['nullable', 'string', 'max:100'],
            'package_type' => ['nullable', 'string', 'max:150'],
            'regular_price' => ['nullable', 'numeric', 'min:0'],
            'sale_price' => ['nullable', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'reserved_stock' => ['required', 'integer', 'min:0', 'lte:stock'],
            'weight' => $dimensionRules,
            'length' => $dimensionRules,
            'width' => $dimensionRules,
            'height' => $dimensionRules,
            'image' => ['nullable', 'file', 'image', 'max:2048'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'weight.required' => 'Berat varian aktif wajib diisi.',
            'length.required' => 'Panjang varian aktif wajib diisi.',
            'width.required' => 'Lebar varian aktif wajib diisi.',
            'height.required' => 'Tinggi varian aktif wajib diisi.',
            'weight.min' => 'Berat varian minimal :min gram.',
            'length.min' => 'Panjang varian minimal :min cm.',
            'width.min' => 'Lebar varian minimal :min cm.',
            'height.min' => 'Tinggi varian minimal :min cm.',
        ];
    }
}
