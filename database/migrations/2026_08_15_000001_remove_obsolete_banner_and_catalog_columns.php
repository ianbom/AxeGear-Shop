<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('banners', function (Blueprint $table): void {
            $table->dropColumn(['starts_at', 'ends_at']);
        });

        Schema::table('products', function (Blueprint $table): void {
            $table->dropIndex(['stock_status']);
            $table->dropColumn(['meta_title', 'meta_description', 'stock_status']);
        });

        if (Schema::hasColumn('products', 'barcode')) {
            Schema::table('products', function (Blueprint $table): void {
                $table->dropColumn('barcode');
            });
        }

        Schema::table('product_variants', function (Blueprint $table): void {
            $table->dropColumn('barcode');
        });
    }

    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table): void {
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
        });

        Schema::table('products', function (Blueprint $table): void {
            $table->string('stock_status', 50)->default('in_stock');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->index('stock_status');
        });

        Schema::table('product_variants', function (Blueprint $table): void {
            $table->string('barcode', 100)->nullable();
        });
    }
};
