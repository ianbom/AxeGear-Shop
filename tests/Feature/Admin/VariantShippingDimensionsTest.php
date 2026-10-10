<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    Storage::fake('public');
    $this->actingAs(User::factory()->create(['role' => 'admin', 'is_active' => true]));
    $this->productData = ['name' => 'Shipping dimensions', 'slug' => 'shipping-dimensions', 'regular_price' => 100000, 'status' => 'draft', 'weight' => 999, 'length' => 99, 'width' => 99, 'height' => 99];
    $this->product = Product::query()->create($this->productData);
    $this->variantData = ['sku' => 'VARIANT-DIMENSIONS', 'stock' => 5, 'reserved_stock' => 0, 'weight' => 350, 'length' => 20, 'width' => 15, 'height' => 12, 'is_active' => true];
});

it('requires positive shipping dimensions for active variants through either form', function (string $form, string $field, mixed $value, bool $edit) {
    $variant = $edit ? $this->product->variants()->create($this->variantData) : null;
    $data = [...$this->variantData, $field => $value];
    if ($form === 'product') {
        $payload = [...$this->productData, 'variants' => [[...$data, ...($edit ? ['id' => $variant->id] : [])]]];
        $response = $this->putJson(route('admin.products.update', $this->product), $payload);
    } else {
        $payload = ['product_id' => $this->product->id, ...$data];
        $response = $edit
            ? $this->putJson(route('admin.product-variants.update', $variant), $payload)
            : $this->postJson(route('admin.product-variants.store'), $payload);
    }

    $response->assertUnprocessable()->assertJsonValidationErrors($form === 'product' ? "variants.0.{$field}" : $field);
    expect($this->product->variants()->count())->toBe($edit ? 1 : 0);
    if ($edit) {
        expect($variant->fresh()->getAttribute($field))->toBe($this->variantData[$field]);
    }
})->with(['product', 'variant'])->with(['weight', 'length', 'width', 'height'])->with([null, 0, -1, 'invalid'])->with([false, true]);

it('allows incomplete dimensions for inactive variants through either form', function (string $form) {
    $data = [...$this->variantData, 'is_active' => false, 'weight' => null, 'length' => null, 'width' => null, 'height' => null];
    $response = $form === 'product'
        ? $this->put(route('admin.products.update', $this->product), [...$this->productData, 'variants' => [$data]])
        : $this->post(route('admin.product-variants.store'), ['product_id' => $this->product->id, ...$data]);
    $response->assertSessionHasNoErrors();
    $variant = $this->product->variants()->sole();
    expect($variant->is_active)->toBeFalse()->and($variant->weight)->toBeNull()->and($variant->length)->toBeNull()->and($variant->width)->toBeNull()->and($variant->height)->toBeNull();
})->with(['product', 'variant']);

it('stores complete active variant dimensions unchanged through either form', function (string $form) {
    $response = $form === 'product'
        ? $this->put(route('admin.products.update', $this->product), [...$this->productData, 'variants' => [$this->variantData]])
        : $this->post(route('admin.product-variants.store'), ['product_id' => $this->product->id, ...$this->variantData]);
    $response->assertSessionHasNoErrors();
    $variant = $this->product->variants()->sole();
    expect($variant->weight)->toBe(350)->and($variant->length)->toBe(20)->and($variant->width)->toBe(15)->and($variant->height)->toBe(12);
})->with(['product', 'variant']);
