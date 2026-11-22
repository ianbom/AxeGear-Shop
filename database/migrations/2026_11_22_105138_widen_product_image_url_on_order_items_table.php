<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->text('product_image_url')->nullable()->change();
        });
    }

    public function down(): void
    {
        if (DB::table('order_items')->whereLike('product_image_url', str_repeat('_', 256).'%')->exists()) {
            throw new RuntimeException('Cannot shorten product_image_url while orders contain image URLs longer than 255 characters.');
        }

        Schema::table('order_items', function (Blueprint $table) {
            $table->string('product_image_url', 255)->nullable()->change();
        });
    }
};
