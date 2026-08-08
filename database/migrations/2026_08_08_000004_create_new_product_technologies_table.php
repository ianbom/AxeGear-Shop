<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('new_product_technologies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('new_product_page_id')->constrained()->cascadeOnDelete();
            $table->string('icon', 100);
            $table->string('title', 180);
            $table->text('description');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['new_product_page_id', 'is_active', 'sort_order'], 'new_product_technologies_page_active_sort_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('new_product_technologies');
    }
};
