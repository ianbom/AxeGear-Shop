<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_articles', function (Blueprint $table): void {
            $table->id();
            $table->string('title', 255);
            $table->string('slug', 255)->unique();
            $table->string('category', 120);
            $table->string('author_name', 180)->default('AxeGear Editorial');
            $table->text('excerpt');
            $table->longText('intro');
            $table->json('sections');
            $table->text('quote')->nullable();
            $table->json('tips')->nullable();
            $table->longText('conclusion')->nullable();
            $table->string('image_url');
            $table->unsignedSmallInteger('reading_minutes')->default(1);
            $table->date('published_at')->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamps();

            $table->index(['is_published', 'published_at']);
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_articles');
    }
};
