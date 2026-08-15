<?php

use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

it('allows an active admin to manage gallery images and categories', function () {
    Storage::fake('public');
    $admin = User::factory()->create(['role' => 'admin', 'is_active' => true]);
    $sunglasses = GalleryCategory::query()->create(['name' => 'Sunglasses', 'slug' => 'sunglasses', 'sort_order' => 1, 'is_active' => true]);
    $lifestyle = GalleryCategory::query()->create(['name' => 'Lifestyle', 'slug' => 'lifestyle', 'sort_order' => 2, 'is_active' => true]);

    $this->actingAs($admin)->post(route('admin.gallery.store'), galleryPayload([$sunglasses->id]))->assertRedirect(route('admin.gallery.index'));

    $image = GalleryImage::query()->firstOrFail();
    expect($image->alt_text)->toBe('Trail rider on rocky terrain')->and($image->categories()->pluck('id')->all())->toBe([$sunglasses->id]);
    Storage::disk('public')->assertExists(Str::after($image->image_url, '/storage/'));

    $this->actingAs($admin)->put(route('admin.gallery.update', $image), [...galleryPayload([$lifestyle->id], false), 'alt_text' => 'Updated trail rider image'])->assertRedirect(route('admin.gallery.index'));
    expect($image->refresh()->alt_text)->toBe('Updated trail rider image')->and($image->categories()->pluck('id')->all())->toBe([$lifestyle->id]);

    $this->actingAs($admin)->delete(route('admin.gallery.destroy', $image))->assertRedirect(route('admin.gallery.index'));
    $this->assertDatabaseMissing('gallery_images', ['id' => $image->id]);
});

/** @return array<string, mixed> */
function galleryPayload(array $categoryIds, bool $withImage = true): array
{
    return [
        'image' => $withImage ? UploadedFile::fake()->image('trail.jpg', 1200, 800) : null,
        'alt_text' => 'Trail rider on rocky terrain',
        'category_ids' => $categoryIds,
        'sort_order' => 1,
        'is_active' => true,
    ];
}
