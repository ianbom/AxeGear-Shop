<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const NULLABLE_BY_TABLE = [
        'banners' => [
            'image_desktop_url' => false,
            'image_mobile_url' => true,
            'button_url' => true,
        ],
        'blog_articles' => ['image_url' => false],
        'categories' => ['image_url' => true],
        'collections' => ['banner_desktop_url' => true, 'banner_mobile_url' => true],
        'gallery_images' => ['image_url' => false],
        'new_product_gallery_images' => ['image_url' => false],
        'new_product_pages' => [
            'shop_now_url' => false,
            'hero_image_url' => false,
            'story_image_url' => false,
        ],
        'shipments' => ['label_url' => true],
        'users' => ['avatar_url' => true],
    ];

    public function up(): void
    {
        $this->changeUrlColumns(asText: true);
    }

    public function down(): void
    {
        $longUrlPattern = str_repeat('_', 256).'%';
        foreach (self::NULLABLE_BY_TABLE as $table => $columns) {
            if (DB::table($table)->whereAny(array_keys($columns), 'like', $longUrlPattern)->exists()) {
                throw new RuntimeException("Cannot roll back URL columns while {$table} contains URLs longer than 255 characters.");
            }
        }

        $this->changeUrlColumns(asText: false);
    }

    private function changeUrlColumns(bool $asText): void
    {
        foreach (self::NULLABLE_BY_TABLE as $table => $columns) {
            Schema::table($table, function (Blueprint $blueprint) use ($columns, $asText): void {
                foreach ($columns as $column => $nullable) {
                    $definition = $asText ? $blueprint->text($column) : $blueprint->string($column, 255);
                    $definition->nullable($nullable)->change();
                }
            });
        }
    }
};
