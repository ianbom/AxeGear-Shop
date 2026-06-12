<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;
use RuntimeException;

class ProductVariantSeeder extends Seeder
{
    public function run(): void
    {
        $variants = [];
        
        // Prioritas 1: Baca dari CSV Shopee
        $csvPath = public_path('shopee-co-id-2026-05-12.csv');
        if (file_exists($csvPath)) {
            $file = fopen($csvPath, 'r');
            $headers = fgetcsv($file);
            $rowIndex = 0;
            
            while (($row = fgetcsv($file)) !== false) {
                $rowIndex++;
                $data = array_combine($headers, $row);
                
                $name = trim($data['Nama'] ?? '');
                if (empty($name)) continue;
                
                $slug = $this->slugify($name);
                
                $variants[] = [
                    'product_slug' => $slug,
                    'sku' => 'SHP-' . str_pad($rowIndex, 3, '0', STR_PAD_LEFT) . '-ALL',
                    'color_name' => 'Default Color',
                    'color_hex' => '#000000',
                    'size' => 'All Size',
                    'regular_price' => 0.0,
                    'stock' => rand(20, 100), // Stock tidak boleh 0
                    'reserved_stock' => 0,
                    'image_url' => $data['image'] ?? '',
                    'is_active' => true,
                ];
            }
            fclose($file);
        }
        
        // Prioritas 2: Baca dari JSON
        if (empty($variants) && file_exists(public_path('variants_shopee.json'))) {
            $variants = json_decode(file_get_contents(public_path('variants_shopee.json')), true);
            foreach ($variants as &$v) {
                $v['color_hex'] = substr($v['color_hex'], 0, 7);
                if (empty($v['stock']) || $v['stock'] == 0) {
                    $v['stock'] = rand(20, 100);
                }
            }
        }
        
        // Prioritas 3: Fallback ke Excel
        if (empty($variants)) {
            $filePath = public_path('anemi-seeder.xlsx');
            if (file_exists($filePath) && class_exists('\PhpOffice\PhpSpreadsheet\Reader\Xlsx')) {
            $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
            $spreadsheet = $reader->load($filePath);
            
            // Map product import_key to slug
            $productMap = [];
            $prodSheet = $spreadsheet->getSheetByName('Products');
            if ($prodSheet) {
                $highestRow = $prodSheet->getHighestRow();
                for ($row = 2; $row <= $highestRow; $row++) {
                    $key = $prodSheet->getCell("A{$row}")->getValue();
                    $slug = $prodSheet->getCell("C{$row}")->getValue();
                    if ($key && $slug) {
                        $productMap[$key] = $slug;
                    }
                }
            }

            $sheet = $spreadsheet->getSheetByName('ProductVariants');
            if ($sheet) {
                $highestRow = $sheet->getHighestRow();
                for ($row = 2; $row <= $highestRow; $row++) {
                    $importKey = $sheet->getCell("A{$row}")->getValue();
                    if (!$importKey || !isset($productMap[$importKey])) continue;

                    $variants[] = [
                        'product_slug' => $productMap[$importKey],
                        'sku' => (string) $sheet->getCell("B{$row}")->getValue(),
                        'color_name' => $sheet->getCell("C{$row}")->getValue() ?? 'Default',
                        'color_hex' => substr($sheet->getCell("D{$row}")->getValue() ?? '#000000', 0, 7),
                        'size' => $sheet->getCell("E{$row}")->getValue() ?? 'All Size',
                        'regular_price' => (float) ($sheet->getCell("F{$row}")->getValue() ?: 0),
                        'stock' => (int) ($sheet->getCell("G{$row}")->getValue() ?: rand(10, 100)),
                        'reserved_stock' => 0,
                        'image_url' => $sheet->getCell("H{$row}")->getValue() ?? '',
                        'is_active' => strtolower($sheet->getCell("I{$row}")->getValue() ?? 'active') === 'active',
                    ];
                }
            }
        } elseif (file_exists(public_path('variants.json'))) {
            $variants = json_decode(file_get_contents(public_path('variants.json')), true);
            foreach ($variants as &$v) {
                $v['color_hex'] = substr($v['color_hex'], 0, 7);
                if (empty($v['stock']) || $v['stock'] == 0) {
                    $v['stock'] = rand(20, 100);
                }
            }
        }
        }

        if (empty($variants)) {
            throw new RuntimeException("Gagal membaca ProductVariants dari CSV, JSON, atau Excel");
        }
        $productIds = Product::query()->whereIn('slug', collect($variants)->pluck('product_slug')->unique()->all())->pluck('id', 'slug');
        $keptVariantSkus = [];
        foreach ($variants as $variant) {
            $productId = $productIds->get($variant['product_slug']);
            if (! $productId) { throw new RuntimeException("Product slug [{$variant['product_slug']}] tidak ditemukan."); }
            $record = ProductVariant::query()->withTrashed()->updateOrCreate(['sku' => $variant['sku']], [
                'product_id' => $productId, 'color_name' => $variant['color_name'], 'color_hex' => $variant['color_hex'], 'size' => $variant['size'],
                'regular_price' => $variant['regular_price'], 'stock' => $variant['stock'], 'reserved_stock' => $variant['reserved_stock'],
                'image_url' => $variant['image_url'], 'is_active' => $variant['is_active'],
            ]);
            if ($record->trashed()) { $record->restore(); }
            $keptVariantSkus[] = $record->sku;
        }
        ProductVariant::query()->whereIn('product_id', $productIds->values())->whereNotIn('sku', $keptVariantSkus)->delete();
    }

    private function slugify($text)
    {
        $text = strtolower($text);
        $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
        $text = preg_replace('/[\s-]+/', '-', $text);
        return trim($text, '-');
    }
}
