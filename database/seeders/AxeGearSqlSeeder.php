<?php

namespace Database\Seeders;

use Generator;
use Illuminate\Database\QueryException;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use RuntimeException;

/** ponytail: Supports phpMyAdmin INSERT literals only; extend parsing when the dump format changes. */
class AxeGearSqlSeeder extends Seeder
{
    private const TABLES = [
        'categories', 'collections', 'products', 'product_variants', 'product_images', 'product_collections',
        'gallery_categories', 'gallery_images', 'gallery_category_image',
        'new_product_pages', 'new_product_gallery_images', 'banners', 'blog_articles', 'site_settings',
    ];

    private const REFERENCES = [
        'categories' => ['parent_id' => 'categories'],
        'products' => ['category_id' => 'categories'],
        'product_variants' => ['product_id' => 'products'],
        'product_images' => ['product_id' => 'products'],
        'product_collections' => ['product_id' => 'products', 'collection_id' => 'collections'],
        'gallery_category_image' => ['gallery_image_id' => 'gallery_images', 'gallery_category_id' => 'gallery_categories'],
        'new_product_gallery_images' => ['new_product_page_id' => 'new_product_pages'],
    ];

    public function run(): void
    {
        $path = $this->dumpPath();
        if (! is_file($path) || ! is_readable($path)) {
            throw new RuntimeException('File dump SQL AxeGear tidak ditemukan atau tidak dapat dibaca.');
        }

        $sql = file_get_contents($path);
        if ($sql === false) {
            throw new RuntimeException('Gagal membaca file dump SQL AxeGear.');
        }

        $data = $this->parse($sql);
        $this->validateReferences($data);

        try {
            DB::transaction(function () use ($data): void {
                foreach (['categories', 'products', 'product_variants'] as $table) {
                    DB::table($table)->lockForUpdate()->get(['id']);
                }
                $this->guardExternalReferences();

                foreach (array_reverse(self::TABLES) as $table) {
                    DB::table($table)->delete();
                }

                foreach ($data as $table => $rows) {
                    foreach ($rows as $row) {
                        $values = $row;
                        if ($table === 'categories') {
                            $values['parent_id'] = null;
                        }
                        DB::table($table)->insert($values);
                    }
                }

                foreach ($data['categories'] as $row) {
                    if (($row['parent_id'] ?? null) !== null) {
                        DB::table('categories')->where('id', $row['id'])->update(['parent_id' => $row['parent_id']]);
                    }
                }
            });
        } catch (QueryException $exception) {
            throw new RuntimeException('Impor SQL gagal; seluruh perubahan dibatalkan. SQLSTATE: '.$exception->getCode());
        }

        foreach ($data as $table => $rows) {
            $this->command?->info($table.': '.count($rows).' record');
        }
    }

    protected function dumpPath(): string
    {
        return database_path('u654274011_axegear.sql');
    }

    /** @return array<string, list<array<string, string|null>>> */
    private function parse(string $sql): array
    {
        $data = array_fill_keys(self::TABLES, []);
        $seen = [];
        $schema = [];
        foreach (self::TABLES as $table) {
            if (! Schema::hasTable($table)) {
                throw new RuntimeException("Tabel tujuan {$table} tidak ditemukan. Jalankan migrations terlebih dahulu.");
            }
            $schema[$table] = Schema::getColumnListing($table);
        }

        foreach ($this->statements($sql) as $statement) {
            if (! preg_match('/\A(CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?|INSERT(?:\s+IGNORE)?\s+INTO|REPLACE\s+INTO)\s*[`"]?([a-z_][a-z_0-9]*)[`"]?/i', $statement, $header)) {
                continue;
            }

            $table = $header[2];
            if (! array_key_exists($table, $data)) {
                continue;
            }
            $seen[$table] = true;
            if (str_starts_with(strtoupper($header[1]), 'CREATE')) {
                continue;
            }

            if (! preg_match('/\AINSERT\s+INTO\s+`[^`]+`\s*\((.*?)\)\s+VALUES\s+(.+)\z/is', $statement, $insert)
                || ! preg_match('/\A\s*`[a-z_]+`(?:\s*,\s*`[a-z_]+`)*\s*\z/i', $insert[1])) {
                throw new RuntimeException("Format INSERT tabel {$table} tidak didukung.");
            }

            preg_match_all('/`([^`]+)`/', $insert[1], $matches);
            $columns = $matches[1];
            if (count(array_unique($columns)) !== count($columns) || array_diff($columns, $schema[$table]) !== []) {
                throw new RuntimeException("Kolom INSERT tabel {$table} tidak sesuai schema.");
            }

            $offset = 0;
            do {
                $this->consume($insert[2], $offset, '(', $table);
                $row = [];
                foreach ($columns as $index => $column) {
                    if ($index > 0) {
                        $this->consume($insert[2], $offset, ',', $table);
                    }
                    $row[$column] = $this->literal($insert[2], $offset, $table);
                }
                $this->consume($insert[2], $offset, ')', $table);
                $data[$table][] = $row;
                $offset += strspn($insert[2], " \t\r\n\f\v", $offset);
                if ($offset === strlen($insert[2])) {
                    break;
                }
                $this->consume($insert[2], $offset, ',', $table);
            } while (true);
        }

        if (array_diff(self::TABLES, array_keys($seen)) !== []) {
            throw new RuntimeException('Dump SQL tidak lengkap: seluruh 14 tabel harus tersedia.');
        }

        return $data;
    }

    /** @return Generator<int, string> */
    private function statements(string $sql): Generator
    {
        $sql = preg_replace('/\A\xEF\xBB\xBF/', '', $sql);
        $buffer = '';
        $quote = null;
        $length = strlen($sql);
        for ($offset = 0; $offset < $length; $offset++) {
            $character = $sql[$offset];
            $next = $sql[$offset + 1] ?? '';
            if ($quote !== null) {
                $buffer .= $character;
                if ($character === '\\' && $next !== '') {
                    $buffer .= $next;
                    $offset++;
                } elseif ($character === $quote) {
                    if ($next === $quote) {
                        $buffer .= $next;
                        $offset++;
                    } else {
                        $quote = null;
                    }
                }

                continue;
            }

            if ($character === '#' || ($character === '-' && $next === '-' && ctype_space($sql[$offset + 2] ?? ''))) {
                $offset = strpos($sql, "\n", $offset) ?: $length;
                $buffer .= ' ';

                continue;
            }
            if ($character === '/' && $next === '*') {
                $end = strpos($sql, '*/', $offset + 2);
                if ($end === false) {
                    throw new RuntimeException('Komentar dump SQL tidak lengkap.');
                }
                $offset = $end + 1;
                $buffer .= ' ';

                continue;
            }
            if (in_array($character, ["'", '"', '`'], true)) {
                $quote = $character;
            }
            if ($character === ';') {
                if (trim($buffer) !== '') {
                    yield trim($buffer);
                }
                $buffer = '';
            } else {
                $buffer .= $character;
            }
        }

        if ($quote !== null || trim($buffer) !== '') {
            throw new RuntimeException('Statement dump SQL tidak lengkap.');
        }
    }

    private function consume(string $sql, int &$offset, string $symbol, string $table): void
    {
        $offset += strspn($sql, " \t\r\n\f\v", $offset);
        if (($sql[$offset] ?? '') !== $symbol) {
            throw new RuntimeException("Tuple INSERT tabel {$table} tidak valid.");
        }
        $offset++;
    }

    private function literal(string $sql, int &$offset, string $table): ?string
    {
        $offset += strspn($sql, " \t\r\n\f\v", $offset);
        if (($sql[$offset] ?? '') !== "'") {
            if (! preg_match('/\G(?:NULL|[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)(?=\s*[,)]|\z)/i', $sql, $match, 0, $offset)) {
                throw new RuntimeException("Literal INSERT tabel {$table} tidak didukung.");
            }
            $offset += strlen($match[0]);
            if (strtoupper($match[0]) === 'NULL') {
                return null;
            }
            if (! is_finite((float) $match[0])) {
                throw new RuntimeException("Angka INSERT tabel {$table} tidak valid.");
            }

            return $match[0];
        }

        $offset++;
        $value = '';
        $length = strlen($sql);
        while ($offset < $length) {
            $character = $sql[$offset++];
            if ($character === "'") {
                if (($sql[$offset] ?? '') !== "'") {
                    return $value;
                }
                $offset++;
            } elseif ($character === '\\') {
                if ($offset === $length) {
                    break;
                }
                $escaped = $sql[$offset++];
                $character = match ($escaped) {
                    '0' => "\0", 'b' => "\x08", 'n' => "\n", 'r' => "\r", 't' => "\t", 'Z' => "\x1a",
                    '%', '_' => '\\'.$escaped,
                    default => $escaped,
                };
            }
            $value .= $character;
        }

        throw new RuntimeException("String INSERT tabel {$table} tidak lengkap.");
    }

    private function validateReferences(array $data): void
    {
        $ids = [];
        foreach ($data as $table => $rows) {
            $ids[$table] = [];
            if ($table === 'gallery_category_image') {
                continue;
            }
            foreach ($rows as $row) {
                $id = $row['id'] ?? null;
                if (! is_string($id) || ! ctype_digit($id) || (int) $id < 1 || isset($ids[$table][$id])) {
                    throw new RuntimeException("ID INSERT tabel {$table} tidak valid atau duplikat.");
                }
                $ids[$table][$id] = true;
            }
        }

        foreach (self::REFERENCES as $table => $references) {
            foreach ($data[$table] as $row) {
                foreach ($references as $column => $parent) {
                    $reference = $row[$column] ?? null;
                    if ($reference === null && in_array($column, ['parent_id', 'category_id'], true)) {
                        continue;
                    }
                    if ($reference === null || ! isset($ids[$parent][$reference])) {
                        throw new RuntimeException("Relasi {$table}.{$column} tidak ditemukan dalam dump SQL.");
                    }
                }
            }
        }
    }

    private function guardExternalReferences(): void
    {
        $external = [
            'cart_items' => ['product_id', 'product_variant_id'],
            'order_items' => ['product_id', 'product_variant_id'],
            'product_reviews' => ['product_id'],
            'stock_logs' => ['product_variant_id'],
            'wishlists' => ['product_id'],
            'voucher_products' => ['product_id'],
            'voucher_categories' => ['category_id'],
        ];

        foreach ($external as $table => $columns) {
            foreach ($columns as $column) {
                if (DB::table($table)->whereNotNull($column)->exists()) {
                    throw new RuntimeException("Impor dihentikan: {$table}.{$column} masih merujuk katalog. Gunakan database kosong tanpa transaksi terkait.");
                }
            }
        }
    }
}
