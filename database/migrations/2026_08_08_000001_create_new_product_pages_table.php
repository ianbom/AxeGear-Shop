<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('new_product_pages', function (Blueprint $table) {
            $table->id();
            $table->string('name', 180);
            $table->string('hero_eyebrow', 100)->default('New Arrival');
            $table->string('hero_title', 255);
            $table->string('product_name', 180);
            $table->text('hero_description');
            $table->string('price_label', 100);
            $table->string('shop_now_text', 100)->default('Shop Now');
            $table->string('shop_now_url');
            $table->string('specifications_text', 100)->default('View Specifications');
            $table->string('hero_image_url');
            $table->string('story_eyebrow', 180);
            $table->string('story_title', 255);
            $table->longText('story_body');
            $table->string('story_image_url');
            $table->string('gallery_heading', 180);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('new_product_pages');
    }
};
