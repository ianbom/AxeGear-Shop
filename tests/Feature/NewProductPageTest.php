<?php

use App\Models\NewProductPage;
use App\Models\User;
use Database\Seeders\NewProductPageSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('renders active new product content in configured order', function () {
    $this->seed(NewProductPageSeeder::class);

    $page = NewProductPage::query()->firstOrFail();
    $page->benefits()->create([
        'icon' => 'shield',
        'title' => 'Hidden Benefit',
        'description' => 'Not shown.',
        'sort_order' => 0,
        'is_active' => false,
    ]);

    $this->get(route('new-product'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $inertia) => $inertia
            ->component('new-product/index')
            ->where('page.product_name', 'AxeGear Velox Pro')
            ->has('benefits', 5)
            ->where('benefits.0.title', 'Ultra-Lightweight Construction')
            ->has('gallery', 7)
            ->has('technology', 4)
        );
});

it('allows an active admin to update all new product sections', function () {
    $this->seed(NewProductPageSeeder::class);
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);

    $payload = newProductPayload();

    $this->actingAs($admin)
        ->put(route('admin.new-product.update'), $payload)
        ->assertRedirect();

    $page = NewProductPage::query()->firstOrFail();

    expect($page->hero_title)->toBe('A New Standard')
        ->and($page->shop_now_url)->toBe('/products/new')
        ->and($page->benefits)->toHaveCount(1)
        ->and($page->benefits->first()->title)->toBe('Lightweight')
        ->and($page->galleryImages)->toHaveCount(1)
        ->and($page->technologies)->toHaveCount(1);
});

it('stores uploaded page and gallery images while preserving image fields', function () {
    Storage::fake('public');
    $this->seed(NewProductPageSeeder::class);
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);

    $payload = newProductPayload();
    $payload['hero_image'] = UploadedFile::fake()->image('hero.jpg');
    $payload['story_image'] = UploadedFile::fake()->image('story.jpg');
    $payload['technology_image'] = UploadedFile::fake()->image('technology.jpg');
    $payload['final_image'] = UploadedFile::fake()->image('final.jpg');
    $payload['gallery_images'][0]['image'] = UploadedFile::fake()->image('gallery.jpg');

    $this->actingAs($admin)
        ->put(route('admin.new-product.update'), $payload)
        ->assertRedirect();

    $page = NewProductPage::query()->firstOrFail();

    expect($page->hero_image_url)->toStartWith('/storage/images/new-products/')
        ->and($page->story_image_url)->toStartWith('/storage/images/new-products/')
        ->and($page->technology_image_url)->toStartWith('/storage/images/new-products/')
        ->and($page->final_image_url)->toStartWith('/storage/images/new-products/')
        ->and($page->galleryImages->first()->image_url)->toStartWith('/storage/images/new-products/');

    Storage::disk('public')->assertExists(str_replace('/storage/', '', $page->hero_image_url));
    Storage::disk('public')->assertExists(str_replace('/storage/', '', $page->galleryImages->first()->image_url));
});

it('rejects non-image uploads', function () {
    $this->seed(NewProductPageSeeder::class);
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);
    $payload = newProductPayload();
    $payload['hero_image'] = UploadedFile::fake()->create('not-an-image.txt', 10, 'text/plain');

    $this->actingAs($admin)
        ->put(route('admin.new-product.update'), $payload)
        ->assertSessionHasErrors('hero_image');
});

function newProductPayload(): array
{
    return [
        'name' => 'AxeGear Velox Pro',
        'hero_eyebrow' => 'New Arrival',
        'hero_title' => 'A New Standard',
        'product_name' => 'Velox Pro',
        'hero_description' => 'Updated product description.',
        'price_label' => '$199.00 USD',
        'shop_now_text' => 'Shop Now',
        'shop_now_url' => '/products/new',
        'specifications_text' => 'View Specifications',
        'hero_image_url' => 'https://images.unsplash.com/hero.jpg',
        'benefits_heading' => 'Why It Stands Out',
        'story_eyebrow' => 'Behind the Launch',
        'story_title' => 'Built for More',
        'story_body' => 'First paragraph.\n\nSecond paragraph.',
        'story_image_url' => 'https://images.unsplash.com/story.jpg',
        'gallery_heading' => 'Closer Look',
        'technology_heading' => 'Performance Technology',
        'technology_image_url' => 'https://images.unsplash.com/technology.jpg',
        'final_eyebrow' => null,
        'final_title' => null,
        'final_tagline' => null,
        'final_price_label' => null,
        'final_cta_text' => null,
        'final_cta_url' => null,
        'final_image_url' => null,
        'is_active' => true,
        'benefits' => [[
            'icon' => 'feather',
            'title' => 'Lightweight',
            'description' => 'Comfortable all day.',
            'sort_order' => 1,
            'is_active' => true,
        ]],
        'gallery_images' => [[
            'image_url' => 'https://images.unsplash.com/gallery.jpg',
            'alt_text' => 'Product detail',
            'sort_order' => 1,
            'is_active' => true,
        ]],
        'technologies' => [[
            'icon' => 'sun',
            'title' => 'Polarized Lens',
            'description' => 'Sharper vision.',
            'sort_order' => 1,
            'is_active' => true,
        ]],
    ];
}
