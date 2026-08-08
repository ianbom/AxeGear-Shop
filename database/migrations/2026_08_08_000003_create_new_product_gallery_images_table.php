<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('new_product_gallery_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('new_product_page_id')->constrained()->cascadeOnDelete();
            $table->string('image_url');
            $table->string('alt_text')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['new_product_page_id', 'is_active', 'sort_order'], 'new_product_gallery_page_active_sort_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('new_product_gallery_images');
    }
};
