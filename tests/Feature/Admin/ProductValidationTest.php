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
    return ['name' => 'Validation product', 'slug' => 'validation-product', 'regular_price' => 100000, 'weight' => 500, 'length' => 10, 'width' => 10, 'height' => 10, 'status' => 'draft'];
}

function validationVariantPayload(array $attributes): array
{
    return ['weight' => 500, 'length' => 10, 'width' => 10, 'height' => 10, ...$attributes];
}

it('explains invalid product and variant fields in Indonesian for create and edit', function (bool $edit) {
    $payload = [...validationProductPayload(), 'name' => '', 'sale_price' => 200000, 'variants' => array_map('validationVariantPayload', [['sku' => 'VALIDATION-A', 'stock' => -1], ['sku' => 'VALIDATION-B', 'stock' => 'wrong']])];
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
    $payload = [...validationProductPayload(), 'variants' => array_map('validationVariantPayload', [['sku' => ''], ['sku' => 'DUPLICATE'], ['sku' => 'DUPLICATE']])];
    $response = $edit ? $this->put(route('admin.products.update', $product), $payload) : $this->post(route('admin.products.store'), $payload);
    $response->assertSessionHasErrors(['variants', 'variants.1.sku', 'variants.2.sku'])->assertSessionDoesntHaveErrors(['variants.0.sku']);
    expect(session('errors')->get('variants.1.sku')[0])->toContain('Gunakan SKU yang berbeda');
    expect(Product::query()->count())->toBe($edit ? 1 : 0);
})->with([false, true]);

it('requires product and variant shipping fields for create and edit', function (bool $edit) {
    $product = $edit ? Product::query()->create(validationProductPayload()) : null;
    $payload = [...validationProductPayload(), 'weight' => '', 'length' => null, 'width' => null, 'height' => null, 'variants' => [['sku' => 'REQUIRED-DIMENSIONS', 'is_active' => true]]];
    $response = $edit ? $this->put(route('admin.products.update', $product), $payload) : $this->post(route('admin.products.store'), $payload);

    $response->assertSessionHasErrors(['weight', 'length', 'width', 'height', 'variants.0.weight', 'variants.0.length', 'variants.0.width', 'variants.0.height']);
    expect(Product::query()->count())->toBe($edit ? 1 : 0);
})->with([false, true]);

it('compares each variant sale price with its own regular price', function (bool $edit) {
    $product = $edit ? Product::query()->create(validationProductPayload()) : null;
    $dimensions = ['weight' => 500, 'length' => 10, 'width' => 10, 'height' => 10];
    $payload = [...validationProductPayload(), ...$dimensions, 'variants' => [
        [...$dimensions, 'sku' => 'LOWER-SALE', 'regular_price' => 100000, 'sale_price' => 90000],
        [...$dimensions, 'sku' => 'HIGHER-SALE', 'regular_price' => 50000, 'sale_price' => 60000],
        [...$dimensions, 'sku' => 'EQUAL-SALE', 'regular_price' => 100000, 'sale_price' => 100000],
        [...$dimensions, 'sku' => 'OPTIONAL-SALE', 'regular_price' => 100000, 'sale_price' => ''],
        [...$dimensions, 'sku' => 'MISSING-REGULAR', 'regular_price' => '', 'sale_price' => 50000],
    ]];
    $response = $edit ? $this->put(route('admin.products.update', $product), $payload) : $this->post(route('admin.products.store'), $payload);

    $response->assertSessionHasErrors(['variants.1.sale_price', 'variants.4.regular_price'])
        ->assertSessionDoesntHaveErrors(['variants.0.sale_price', 'variants.2.sale_price', 'variants.3.sale_price']);
    expect(Product::query()->count())->toBe($edit ? 1 : 0);
})->with([false, true]);

it('points to the SKU already owned by another product', function (bool $edit) {
    $other = Product::query()->create([...validationProductPayload(), 'slug' => 'other-product']);
    $other->variants()->create(['sku' => 'TAKEN-SKU', 'stock' => 5]);
    $product = $edit ? Product::query()->create(validationProductPayload()) : null;
    $payload = [...validationProductPayload(), 'variants' => array_map('validationVariantPayload', [['sku' => ''], ['sku' => 'AVAILABLE-SKU'], ['sku' => 'TAKEN-SKU']])];
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
    $this->put(route('admin.products.update', $product), [...validationProductPayload(), 'variants' => [validationVariantPayload(['id' => $variant->id, 'sku' => 'OWN-SKU', 'stock' => 5])]])->assertSessionHasNoErrors();
    expect($variant->fresh()->sku)->toBe('OWN-SKU');
});

it('saves valid variant prices and shipping fields without changing their values', function (bool $edit, ?int $salePrice) {
    $product = $edit ? Product::query()->create(validationProductPayload()) : null;
    $payload = [...validationProductPayload(), 'variants' => [validationVariantPayload(['sku' => 'VALID-SALE', 'regular_price' => 100000, 'sale_price' => $salePrice])]];
    $response = $edit ? $this->put(route('admin.products.update', $product), $payload) : $this->post(route('admin.products.store'), $payload);

    $response->assertSessionHasNoErrors();
    $variant = Product::query()->firstOrFail()->variants()->firstOrFail();
    expect($variant->weight)->toBe(500)
        ->and($variant->length)->toBe(10)
        ->and($variant->width)->toBe(10)
        ->and($variant->height)->toBe(10)
        ->and($variant->sale_price === null ? null : (int) $variant->sale_price)->toBe($salePrice);
})->with([false, true])->with([null, 90000, 100000]);
