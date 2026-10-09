<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    Storage::fake('public');
    $this->actingAs(User::factory()->create(['role' => 'admin', 'is_active' => true]));
});

function validationProductPayload(): array
{
    return ['name' => 'Validation product', 'slug' => 'validation-product', 'regular_price' => 100000, 'weight' => 500, 'status' => 'draft'];
}

it('explains invalid product and variant fields in Indonesian for create and edit', function (bool $edit) {
    $payload = [...validationProductPayload(), 'name' => '', 'sale_price' => 200000, 'variants' => [['sku' => 'VALIDATION-A', 'stock' => -1], ['sku' => 'VALIDATION-B', 'stock' => 'wrong']]];
    $product = $edit ? Product::query()->create(validationProductPayload()) : null;
    $response = $edit ? $this->put(route('admin.products.update', $product), $payload) : $this->post(route('admin.products.store'), $payload);
    $response->assertSessionHasErrors([
        'name' => 'Nama produk wajib diisi.',
        'sale_price' => 'Harga diskon tidak boleh melebihi harga normal.',
        'variants.0.stock' => 'Stok varian 1 minimal 0.',
        'variants.1.stock' => 'Stok varian 2 harus berupa bilangan bulat.',
    ]);
    expect(Product::query()->count())->toBe($edit ? 1 : 0);
})->with([false, true]);

it('identifies every duplicate SKU without losing the original variant index', function (bool $edit) {
    $product = $edit ? Product::query()->create(validationProductPayload()) : null;
    $payload = [...validationProductPayload(), 'variants' => [['sku' => ''], ['sku' => 'DUPLICATE'], ['sku' => 'DUPLICATE']]];
    $response = $edit ? $this->put(route('admin.products.update', $product), $payload) : $this->post(route('admin.products.store'), $payload);
    $response->assertSessionHasErrors(['variants', 'variants.1.sku', 'variants.2.sku'])->assertSessionDoesntHaveErrors(['variants.0.sku']);
    expect(session('errors')->get('variants.1.sku')[0])->toContain('Gunakan SKU yang berbeda');
    expect(Product::query()->count())->toBe($edit ? 1 : 0);
})->with([false, true]);

it('points to the SKU already owned by another product', function (bool $edit) {
    $other = Product::query()->create([...validationProductPayload(), 'slug' => 'other-product']);
    $other->variants()->create(['sku' => 'TAKEN-SKU', 'stock' => 5]);
    $product = $edit ? Product::query()->create(validationProductPayload()) : null;
    $payload = [...validationProductPayload(), 'variants' => [['sku' => ''], ['sku' => 'AVAILABLE-SKU'], ['sku' => 'TAKEN-SKU']]];
    $response = $edit ? $this->put(route('admin.products.update', $product), $payload) : $this->post(route('admin.products.store'), $payload);
    $response->assertSessionHasErrors(['variants', 'variants.2.sku'])->assertSessionDoesntHaveErrors(['variants.1.sku']);
    expect(session('errors')->get('variants.2.sku')[0])->toContain('produk lain');
})->with([false, true]);

it('explains image upload errors and publication requirements', function () {
    $this->post(route('admin.products.store'), [...validationProductPayload(), 'images' => [['image' => UploadedFile::fake()->create('document.pdf', 10, 'application/pdf')]], 'variants' => [['sku' => 'IMAGE-SKU', 'image' => UploadedFile::fake()->image('large.jpg')->size(4097)]]])
        ->assertSessionHasErrors(['images.0.image', 'variants.0.image' => 'Gambar varian maksimal 4 MB. Pilih file yang lebih kecil.']);

    $this->post(route('admin.products.store'), [...validationProductPayload(), 'status' => 'published', 'weight' => 0, 'variants' => [['sku' => ''], ['sku' => 'RESERVED', 'stock' => 1, 'reserved_stock' => 2]]])
        ->assertSessionHasErrors([
            'weight' => 'Produk yang dipublikasikan harus memiliki berat minimal 1 gram.',
            'images' => 'Tambahkan minimal satu gambar produk sebelum dipublikasikan.',
            'variants.1.reserved_stock' => 'Stok yang dicadangkan tidak boleh melebihi stok total.',
        ]);
});

it('allows an edited product to retain its own variant SKU', function () {
    $product = Product::query()->create(validationProductPayload());
    $variant = $product->variants()->create(['sku' => 'OWN-SKU', 'stock' => 5]);
    $this->put(route('admin.products.update', $product), [...validationProductPayload(), 'variants' => [['id' => $variant->id, 'sku' => 'OWN-SKU', 'stock' => 5]]])->assertSessionHasNoErrors();
    expect($variant->fresh()->sku)->toBe('OWN-SKU');
});
