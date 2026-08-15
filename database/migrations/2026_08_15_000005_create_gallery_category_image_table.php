<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gallery_category_image', function (Blueprint $table): void {
            $table->foreignId('gallery_image_id')->constrained()->cascadeOnDelete();
            $table->foreignId('gallery_category_id')->constrained()->cascadeOnDelete();
            $table->primary(['gallery_image_id', 'gallery_category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gallery_category_image');
    }
};
