<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
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
        $product = $this->route('product');
        $productId = $product?->id;
        $imageIdRule = Rule::exists('product_images', 'id');
        $variantIdRule = Rule::exists('product_variants', 'id');

        if ($productId) {
            $imageIdRule->where('product_id', $productId);
            $variantIdRule->where('product_id', $productId);
        }

        return [
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'collection_ids' => ['nullable', 'array'],
            'collection_ids.*' => ['nullable', 'integer', 'exists:collections,id'],
            'name' => ['required', 'string', 'max:200'],
            'slug' => ['required', 'string', 'max:220', Rule::unique('products', 'slug')->ignore($product)],
            'sku' => ['nullable', 'string', 'max:100', Rule::unique('products', 'sku')->ignore($product)],
            'brand_name' => ['nullable', 'string', 'max:150'],
            'product_line' => ['nullable', 'string', 'max:150'],
            'style_name' => ['nullable', 'string', 'max:180'],
            'regular_price' => ['required', 'numeric', 'min:0'],
            'sale_price' => ['nullable', 'numeric', 'min:0', 'lte:regular_price'],
            'short_description' => ['nullable', 'string', 'max:1000'],
            'description' => ['nullable', 'string'],
            'weight' => ['required', 'integer', 'min:0'],
            'length' => ['nullable', 'integer', 'min:0'],
            'width' => ['nullable', 'integer', 'min:0'],
            'height' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
            'is_featured' => ['sometimes', 'boolean'],
            'is_new_arrival' => ['sometimes', 'boolean'],
            'is_best_seller' => ['sometimes', 'boolean'],
            'images' => ['nullable', 'array'],
            'images.*.id' => ['nullable', 'integer', $imageIdRule],
            'images.*.image_url' => ['nullable', 'string', 'max:255', 'not_regex:/^blob:/i'],
            'images.*.image' => ['nullable', 'file', 'image', 'max:4096'],
            'images.*.alt_text' => ['nullable', 'string', 'max:255'],
            'images.*.sort_order' => ['nullable', 'integer', 'min:0'],
            'images.*.is_primary' => ['sometimes', 'boolean'],
            'variants' => ['nullable', 'array'],
            'variants.*.id' => ['nullable', 'integer', $variantIdRule],
            'variants.*.sku' => ['nullable', 'string', 'max:100'],
            'variants.*.color_name' => ['nullable', 'string', 'max:100'],
            'variants.*.color_hex' => ['nullable'],
            'variants.*.variant_name' => ['nullable', 'string', 'max:180'],
            'variants.*.size' => ['nullable', 'string', 'max:100'],
            'variants.*.package_type' => ['nullable', 'string', 'max:150'],
            'variants.*.regular_price' => ['nullable', 'numeric', 'min:0'],
            'variants.*.sale_price' => ['nullable', 'numeric', 'min:0'],
            'variants.*.stock' => ['nullable', 'integer', 'min:0'],
            'variants.*.reserved_stock' => ['nullable', 'integer', 'min:0'],
            'variants.*.weight' => ['nullable', 'integer', 'min:0'],
            'variants.*.length' => ['nullable', 'integer', 'min:0'],
            'variants.*.width' => ['nullable', 'integer', 'min:0'],
            'variants.*.height' => ['nullable', 'integer', 'min:0'],
            'variants.*.image_url' => ['nullable', 'string', 'max:255', 'not_regex:/^blob:/i'],
            'variants.*.image' => ['nullable', 'file', 'image', 'max:4096'],
            'variants.*.is_active' => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi.',
            'string' => ':attribute harus berupa teks.',
            'numeric' => ':attribute harus berupa angka.',
            'integer' => ':attribute harus berupa bilangan bulat.',
            'min' => ':attribute minimal :min.',
            'max' => ':attribute maksimal :max karakter.',
            'array' => ':attribute harus berupa daftar yang valid.',
            'boolean' => ':attribute harus berupa pilihan aktif atau tidak aktif.',
            'exists' => ':attribute tidak tersedia atau tidak sesuai dengan produk ini. Pilih ulang data.',
            'unique' => ':attribute sudah digunakan. Gunakan nilai yang berbeda.',
            'in' => ':attribute tidak valid. Pilih salah satu pilihan yang tersedia.',
            'file' => ':attribute harus berupa file yang dapat diunggah.',
            'uploaded' => ':attribute gagal diunggah. Coba lagi dengan file gambar maksimal 4 MB.',
            'image' => ':attribute harus berupa file gambar, misalnya JPG, PNG, atau WEBP.',
            'not_regex' => ':attribute belum tersimpan. Unggah ulang file gambar.',
            'sale_price.lte' => 'Harga diskon tidak boleh melebihi harga normal.',
            'images.*.image.max' => 'Gambar produk maksimal 4 MB. Pilih file yang lebih kecil.',
            'variants.*.image.max' => 'Gambar varian maksimal 4 MB. Pilih file yang lebih kecil.',
        ];
    }

    public function attributes(): array
    {
        $attributes = [
            'category_id' => 'Kategori', 'collection_ids' => 'Koleksi', 'collection_ids.*' => 'Koleksi',
            'name' => 'Nama produk', 'slug' => 'URL slug', 'sku' => 'SKU produk', 'brand_name' => 'Merek',
            'product_line' => 'Lini produk', 'style_name' => 'Nama model', 'short_description' => 'Deskripsi singkat',
            'description' => 'Deskripsi', 'regular_price' => 'Harga normal', 'sale_price' => 'Harga diskon',
            'weight' => 'Berat', 'length' => 'Panjang', 'width' => 'Lebar', 'height' => 'Tinggi', 'status' => 'Status produk',
            'is_featured' => 'Produk unggulan', 'is_new_arrival' => 'Produk baru', 'is_best_seller' => 'Produk terlaris',
            'images' => 'Gambar produk', 'images.*.id' => 'Gambar produk', 'images.*.image_url' => 'Alamat gambar produk',
            'images.*.image' => 'Gambar produk', 'images.*.alt_text' => 'Keterangan gambar', 'images.*.sort_order' => 'Urutan gambar',
            'images.*.is_primary' => 'Gambar utama', 'variants' => 'Varian produk',
        ];
        foreach (['id' => 'Data', 'sku' => 'SKU', 'variant_name' => 'Nama', 'color_name' => 'Nama warna', 'color_hex' => 'Kode warna', 'size' => 'Ukuran', 'package_type' => 'Jenis kemasan', 'regular_price' => 'Harga normal', 'sale_price' => 'Harga diskon', 'stock' => 'Stok', 'reserved_stock' => 'Stok yang dicadangkan', 'weight' => 'Berat', 'length' => 'Panjang', 'width' => 'Lebar', 'height' => 'Tinggi', 'image_url' => 'Alamat gambar', 'image' => 'Gambar', 'is_active' => 'Status aktif'] as $field => $label) {
            $attributes["variants.*.{$field}"] = "{$label} varian :position";
        }

        return $attributes;
    }

    public function after(): array
    {
        return [
            function ($validator): void {
                if ($this->input('status') !== 'published') {
                    return;
                }

                if ((int) $this->input('weight', 0) < 1) {
                    $validator->errors()->add('weight', 'Produk yang dipublikasikan harus memiliki berat minimal 1 gram.');
                }

                $images = collect($this->input('images', []))
                    ->filter(fn (array $image, int $index): bool => $this->hasStoredImageUrl($image['image_url'] ?? null) || $this->hasFile("images.{$index}.image"));

                if ($images->isEmpty()) {
                    $validator->errors()->add('images', 'Tambahkan minimal satu gambar produk sebelum dipublikasikan.');
                }

                if ($images->isNotEmpty() && ! $images->contains(fn (array $image): bool => (bool) ($image['is_primary'] ?? false))) {
                    $validator->errors()->add('images', 'Pilih satu gambar utama sebelum produk dipublikasikan.');
                }

                $variants = collect($this->input('variants', []))
                    ->filter(fn (array $variant): bool => filled($variant['sku'] ?? null));

                $variants->each(function (array $variant, int $index) use ($validator): void {
                    if ((int) ($variant['reserved_stock'] ?? 0) > (int) ($variant['stock'] ?? 0)) {
                        $validator->errors()->add("variants.{$index}.reserved_stock", 'Stok yang dicadangkan tidak boleh melebihi stok total.');
                    }
                });

                if (! $variants->contains(fn (array $variant): bool => (bool) ($variant['is_active'] ?? false) && (int) ($variant['stock'] ?? 0) > 0)) {
                    $validator->errors()->add('variants', 'Aktifkan minimal satu varian dengan stok lebih dari 0 sebelum produk dipublikasikan.');
                }
            },
        ];
    }

    private function hasStoredImageUrl(?string $imageUrl): bool
    {
        return filled($imageUrl) && ! Str::startsWith($imageUrl, 'blob:');
    }
}
