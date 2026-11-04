<?php

use App\Models\User;
use Database\Seeders\AxeGearSqlSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

uses(RefreshDatabase::class);

const AXE_GEAR_SQL_COUNTS = [
    'banners' => 4,
    'blog_articles' => 1,
    'categories' => 4,
    'collections' => 5,
    'gallery_categories' => 8,
    'gallery_category_image' => 3,
    'gallery_images' => 1,
    'new_product_gallery_images' => 7,
    'new_product_pages' => 1,
    'products' => 66,
    'product_collections' => 28,
    'product_images' => 346,
    'product_variants' => 95,
    'site_settings' => 24,
];

beforeEach(function () {
    $this->sqlPath = tempnam(sys_get_temp_dir(), 'axegear-sql-test-');
});

afterEach(function () {
    if (is_file($this->sqlPath)) {
        unlink($this->sqlPath);
    }
});

function axeGearSqlFixtureSeeder(string $path, string $inserts): AxeGearSqlSeeder
{
    $headers = array_map(fn (string $table): string => "CREATE TABLE `{$table}` (`id` bigint);", array_keys(AXE_GEAR_SQL_COUNTS));
    file_put_contents($path, implode("\n", $headers)."\n".$inserts);

    return new class($path) extends AxeGearSqlSeeder
    {
        public function __construct(private readonly string $path) {}

        protected function dumpPath(): string
        {
            return $this->path;
        }
    };
}

it('imports all fourteen tables from the actual dump without importing private or transactional tables', function () {
    $user = User::factory()->create();
    $this->seed(AxeGearSqlSeeder::class);

    foreach (AXE_GEAR_SQL_COUNTS as $table => $count) {
        $this->assertDatabaseCount($table, $count);
    }

    $this->assertDatabaseCount('users', 1);
    $this->assertDatabaseHas('users', ['id' => $user->id, 'email' => $user->email]);
    foreach (['orders', 'order_items', 'payments', 'payment_logs', 'customer_addresses', 'stock_logs', 'pages'] as $table) {
        $this->assertDatabaseCount($table, 0);
    }
    expect(DB::select('PRAGMA foreign_key_check'))->toBe([]);
});

it('preserves ids, hierarchy, dimensions, stock, timestamps, soft deletes and pivot relations', function () {
    $seeder = axeGearSqlFixtureSeeder($this->sqlPath, <<<'SQL'
INSERT INTO `categories` (`id`, `parent_id`, `name`, `slug`) VALUES
(12, 11, 'Child', 'child'), (11, NULL, 'Parent', 'parent');
INSERT INTO `collections` (`id`, `name`, `slug`) VALUES (21, 'Collection', 'collection');
INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `sku`, `regular_price`, `sale_price`, `weight`, `length`, `width`, `height`, `created_at`, `updated_at`, `deleted_at`) VALUES
(31, 12, 'Product', 'product', 'PRODUCT-31', 199999.99, NULL, 101, 11, 12, 13, '2026-10-01 01:02:03', '2026-10-02 04:05:06', '2026-10-03 07:08:09');
INSERT INTO `product_variants` (`id`, `product_id`, `sku`, `stock`, `reserved_stock`, `weight`, `length`, `width`, `height`) VALUES
(41, 31, 'VARIANT-41', 50, 3, 202, 21, 22, 23);
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`) VALUES (51, 31, 'https://example.test/image.webp', 1);
INSERT INTO `product_collections` (`id`, `product_id`, `collection_id`, `sort_order`) VALUES (61, 31, 21, 7);
INSERT INTO `gallery_categories` (`id`, `name`, `slug`) VALUES (71, 'Gallery', 'gallery');
INSERT INTO `gallery_images` (`id`, `image_url`, `alt_text`) VALUES (81, 'https://example.test/gallery.webp', 'Gallery');
INSERT INTO `gallery_category_image` (`gallery_image_id`, `gallery_category_id`) VALUES (81, 71);
INSERT INTO `new_product_pages` (`id`, `name`, `hero_title`, `product_name`, `hero_description`, `price_label`, `shop_now_url`, `hero_image_url`, `story_eyebrow`, `story_title`, `story_body`, `story_image_url`, `gallery_heading`) VALUES
(91, 'Launch', 'Hero', 'Product', 'Description', 'Price', '/products', 'https://example.test/hero.webp', 'Story', 'Title', 'Body', 'https://example.test/story.webp', 'Gallery');
INSERT INTO `new_product_gallery_images` (`id`, `new_product_page_id`, `image_url`) VALUES (101, 91, 'https://example.test/launch.webp');
SQL);

    $seeder->run();

    $this->assertDatabaseHas('categories', ['id' => 12, 'parent_id' => 11]);
    $this->assertDatabaseHas('products', ['id' => 31, 'category_id' => 12, 'regular_price' => 199999.99, 'sale_price' => null, 'weight' => 101, 'created_at' => '2026-10-01 01:02:03', 'updated_at' => '2026-10-02 04:05:06', 'deleted_at' => '2026-10-03 07:08:09']);
    $this->assertDatabaseHas('product_variants', ['id' => 41, 'product_id' => 31, 'stock' => 50, 'reserved_stock' => 3, 'weight' => 202, 'length' => 21, 'width' => 22, 'height' => 23, 'is_active' => 1]);
    $this->assertDatabaseHas('product_images', ['id' => 51, 'product_id' => 31, 'is_primary' => 1]);
    $this->assertDatabaseHas('product_collections', ['id' => 61, 'product_id' => 31, 'collection_id' => 21, 'sort_order' => 7]);
    $this->assertDatabaseHas('gallery_category_image', ['gallery_image_id' => 81, 'gallery_category_id' => 71]);
    $this->assertDatabaseHas('new_product_gallery_images', ['id' => 101, 'new_product_page_id' => 91]);
    expect(DB::select('PRAGMA foreign_key_check'))->toBe([]);
});

it('decodes mysql literals and ignores sql outside the whitelist including sql inside quoted content', function () {
    $seeder = axeGearSqlFixtureSeeder($this->sqlPath, <<<'SQL'
-- INSERT INTO `banners` (`id`, `title`) VALUES (999, 'comment');
/* INSERT INTO `banners` (`id`, `title`) VALUES (998, 'comment'); */
INSERT INTO `banners` (`id`, `title`, `subtitle`, `image_desktop_url`) VALUES
(1, 'Quoted \'name\' and ''apostrophe'', ;', 'First\nsecond\r\tline', 'https://example.test/one.webp');
INSERT INTO `banners` (`id`, `title`, `subtitle`, `image_desktop_url`) VALUES (2, 'Second', NULL, 'https://example.test/two.webp');
INSERT INTO `site_settings` (`id`, `key`, `value`, `type`) VALUES
(1, 'json_fixture', '{"text":"quoted \\"word\\"","path":"C:\\\\catalog"}', 'json'),
(2, 'html_fixture', '<p>First, ; -- # /* text */</p>
INSERT INTO `banners` (`id`, `title`) VALUES (997, ''not executable'');', 'text'),
(3, 'escape_fixture', 'Backslash \\; escaped \% \_; quote \"; zero \0; backspace \b; control \Z', 'text');
INSERT INTO `users` (`id`, `unsupported`) VALUES (999, 'ignored');
DROP TABLE `users`;
SET FOREIGN_KEY_CHECKS=0;
SQL);

    $seeder->run();

    $this->assertDatabaseCount('banners', 2);
    $this->assertDatabaseHas('banners', ['id' => 1, 'title' => "Quoted 'name' and 'apostrophe', ;", 'subtitle' => "First\nsecond\r\tline"]);
    $this->assertDatabaseHas('banners', ['id' => 2, 'subtitle' => null]);
    expect(json_decode(DB::table('site_settings')->where('key', 'json_fixture')->value('value'), true, flags: JSON_THROW_ON_ERROR))
        ->toBe(['text' => 'quoted "word"', 'path' => 'C:\\catalog']);
    expect(DB::table('site_settings')->where('key', 'html_fixture')->value('value'))->toContain("\nINSERT INTO", "'not executable'");
    expect(DB::table('site_settings')->where('key', 'escape_fixture')->value('value'))
        ->toBe("Backslash \\; escaped \\% \\_; quote \"; zero \0; backspace \x08; control \x1a");
    $this->assertDatabaseCount('users', 0);
    expect((int) DB::selectOne('PRAGMA foreign_keys')->foreign_keys)->toBe(1);
});

it('replaces existing rows and is repeatable without duplicates or leftovers', function () {
    DB::table('banners')->insert(['id' => 700, 'title' => 'Old', 'image_desktop_url' => 'https://example.test/old.webp']);
    DB::table('site_settings')->insert(['id' => 700, 'key' => 'old_fixture', 'value' => 'old', 'type' => 'text']);
    $this->seed(AxeGearSqlSeeder::class);
    $first = [];
    foreach (array_keys(AXE_GEAR_SQL_COUNTS) as $table) {
        $first[$table] = DB::table($table)->get()->toArray();
    }

    $this->seed(AxeGearSqlSeeder::class);

    foreach ($first as $table => $rows) {
        expect(DB::table($table)->get()->toArray())->toEqual($rows);
    }
    $this->assertDatabaseMissing('banners', ['id' => 700]);
    $this->assertDatabaseMissing('site_settings', ['key' => 'old_fixture']);
});

it('refuses replacement when external data references the catalog', function (string $table) {
    $this->seed(AxeGearSqlSeeder::class);
    $user = User::factory()->create();
    $product = DB::table('products')->first();
    $variant = DB::table('product_variants')->where('product_id', $product->id)->first();

    if ($table === 'cart_items') {
        $cartId = DB::table('carts')->insertGetId(['user_id' => $user->id]);
        DB::table($table)->insert(['cart_id' => $cartId, 'product_id' => $product->id, 'product_variant_id' => $variant->id, 'price_snapshot' => 100]);
    } elseif ($table === 'order_items') {
        $orderId = DB::table('orders')->insertGetId(['user_id' => $user->id, 'order_number' => 'SQL-GUARD', 'customer_name' => 'Test', 'customer_email' => $user->email, 'customer_phone' => '0800000000', 'subtotal' => 100, 'grand_total' => 100]);
        DB::table($table)->insert(['order_id' => $orderId, 'product_id' => $product->id, 'product_variant_id' => $variant->id, 'product_name' => 'Test', 'price' => 100, 'quantity' => 1, 'subtotal' => 100]);
    } elseif ($table === 'stock_logs') {
        DB::table($table)->insert(['product_variant_id' => $variant->id, 'type' => 'test', 'quantity' => 1, 'stock_before' => 1, 'stock_after' => 0]);
    } elseif ($table === 'product_reviews') {
        DB::table($table)->insert(['user_id' => $user->id, 'product_id' => $product->id, 'rating' => 5]);
    } elseif ($table === 'wishlists') {
        DB::table($table)->insert(['user_id' => $user->id, 'product_id' => $product->id]);
    } else {
        $voucherId = DB::table('vouchers')->insertGetId(['code' => 'SQL-GUARD', 'name' => 'Guard', 'discount_type' => 'fixed', 'discount_value' => 1]);
        DB::table($table)->insert(['voucher_id' => $voucherId, $table === 'voucher_products' ? 'product_id' : 'category_id' => $table === 'voucher_products' ? $product->id : DB::table('categories')->value('id')]);
    }

    expect(fn () => (new AxeGearSqlSeeder)->run())->toThrow(RuntimeException::class, $table);

    foreach (AXE_GEAR_SQL_COUNTS as $target => $count) {
        $this->assertDatabaseCount($target, $count);
    }
    $this->assertDatabaseCount($table, 1);
    $this->assertDatabaseHas('products', ['id' => $product->id, 'name' => $product->name]);
})->with(['cart_items', 'order_items', 'product_reviews', 'stock_logs', 'wishlists', 'voucher_products', 'voucher_categories']);

it('rejects invalid selected data before deleting existing rows', function (string $sql) {
    DB::table('banners')->insert(['id' => 700, 'title' => 'Preserved', 'image_desktop_url' => 'https://example.test/old.webp']);
    $seeder = axeGearSqlFixtureSeeder($this->sqlPath, $sql);

    expect(fn () => $seeder->run())->toThrow(RuntimeException::class);

    $this->assertDatabaseHas('banners', ['id' => 700, 'title' => 'Preserved']);
    $this->assertDatabaseCount('banners', 1);
})->with([
    'unknown column' => 'INSERT INTO `banners` (`id`, `unknown_column`) VALUES (1, NULL);',
    'invalid foreign key' => "INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `sku`, `regular_price`) VALUES (1, 999, 'Test', 'test', 'TEST', 100);",
    'duplicate id' => "INSERT INTO `banners` (`id`, `title`) VALUES (1, 'First'), (1, 'Second');",
    'mismatched values' => 'INSERT INTO `banners` (`id`, `title`) VALUES (1);',
    'expression' => "INSERT INTO `banners` (`id`, `title`) VALUES (1, CONCAT('a', 'b'));",
    'incomplete statement' => "INSERT INTO `banners` (`id`, `title`) VALUES (1, 'Test')",
    'unterminated string' => "INSERT INTO `banners` (`id`, `title`) VALUES (1, 'Test);",
    'unsupported insert' => "INSERT INTO `banners` SET id=1, title='Test';",
    'unquoted table' => "INSERT INTO banners (`id`, `title`) VALUES (1, 'Test');",
    'insert ignore' => "INSERT IGNORE INTO `banners` (`id`, `title`) VALUES (1, 'Test');",
    'replace into' => "REPLACE INTO `banners` (`id`, `title`) VALUES (1, 'Test');",
]);

it('rejects missing or incomplete dump files without replacing existing data', function (bool $missing) {
    DB::table('banners')->insert(['id' => 700, 'title' => 'Preserved', 'image_desktop_url' => 'https://example.test/old.webp']);
    $seeder = axeGearSqlFixtureSeeder($this->sqlPath, '');
    if ($missing) {
        unlink($this->sqlPath);
    } else {
        file_put_contents($this->sqlPath, 'CREATE TABLE `banners` (`id` bigint);');
    }

    expect(fn () => $seeder->run())->toThrow(RuntimeException::class);
    $this->assertDatabaseHas('banners', ['id' => 700, 'title' => 'Preserved']);
})->with([true, false]);

it('rolls back all replacements if an insert fails after deletion', function () {
    DB::table('banners')->insert(['id' => 700, 'title' => 'Preserved', 'image_desktop_url' => 'https://example.test/old.webp']);
    DB::table('site_settings')->insert(['id' => 700, 'key' => 'old_fixture', 'value' => 'Preserved', 'type' => 'text']);
    $seeder = axeGearSqlFixtureSeeder($this->sqlPath, <<<'SQL'
INSERT INTO `banners` (`id`, `title`, `image_desktop_url`) VALUES (1, 'Replacement', 'https://example.test/new.webp');
INSERT INTO `site_settings` (`id`, `key`, `value`, `type`) VALUES (1, 'duplicate', 'First', 'text'), (2, 'duplicate', 'Second', 'text');
SQL);

    expect(fn () => $seeder->run())->toThrow(RuntimeException::class, 'seluruh perubahan dibatalkan');

    $this->assertDatabaseHas('banners', ['id' => 700, 'title' => 'Preserved']);
    $this->assertDatabaseCount('banners', 1);
    $this->assertDatabaseHas('site_settings', ['id' => 700, 'key' => 'old_fixture', 'value' => 'Preserved']);
    $this->assertDatabaseCount('site_settings', 1);
});
