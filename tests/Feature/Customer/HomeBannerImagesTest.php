<?php

use App\Models\Banner;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('passes desktop and mobile images for home banners', function () {
    Banner::query()->create([
        'title' => 'Hero Banner',
        'image_desktop_url' => '/storage/banners/hero-desktop.jpg',
        'image_mobile_url' => '/storage/banners/hero-mobile.jpg',
        'placement' => 'homepage',
        'sort_order' => 1,
        'is_active' => true,
    ]);
    Banner::query()->create([
        'title' => 'Performance Banner',
        'image_desktop_url' => '/storage/banners/performance-desktop.jpg',
        'image_mobile_url' => '/storage/banners/performance-mobile.jpg',
        'placement' => 'collection',
        'sort_order' => 1,
        'is_active' => true,
    ]);

    $this->get(route('home'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome')
            ->where('heroBanners.0.image_desktop_url', '/storage/banners/hero-desktop.jpg')
            ->where('heroBanners.0.image_mobile_url', '/storage/banners/hero-mobile.jpg')
            ->where('collectionBanners.0.image_desktop_url', '/storage/banners/performance-desktop.jpg')
            ->where('collectionBanners.0.image_mobile_url', '/storage/banners/performance-mobile.jpg'));
});
