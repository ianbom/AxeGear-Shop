<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;
use RuntimeException;

class ProductImageSeeder extends Seeder
{
    public function run(): void
    {
        $imagesByProduct = [];
        
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
                $imagesByProduct[$slug] = [];
                
                $imgCols = ['image'];
                $sortOrder = 0;
                
                foreach ($imgCols as $col) {
                    $imgUrl = trim($data[$col] ?? '');
                    if (!empty($imgUrl)) {
                        $imagesByProduct[$slug][] = [
                            'image_url' => $imgUrl,
                            'alt_text' => $name . ' foto ' . ($sortOrder + 1),
                            'sort_order' => $sortOrder,
                            'is_primary' => $sortOrder === 0,
                        ];
                        $sortOrder++;
                    }
                }
            }
            fclose($file);
        }
        
        // Prioritas 2: Baca dari JSON
        if (empty($imagesByProduct) && file_exists(public_path('images_shopee.json'))) {
            $imagesByProduct = json_decode(file_get_contents(public_path('images_shopee.json')), true);
        }
        
        // Prioritas 3: Fallback ke Excel
        if (empty($imagesByProduct)) {
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

            $sheet = $spreadsheet->getSheetByName('ProductImages');
            if ($sheet) {
                $highestRow = $sheet->getHighestRow();
                for ($row = 2; $row <= $highestRow; $row++) {
                    $importKey = $sheet->getCell("A{$row}")->getValue();
                    if (!$importKey || !isset($productMap[$importKey])) continue;

                    $slug = $productMap[$importKey];
                    if (!isset($imagesByProduct[$slug])) {
                        $imagesByProduct[$slug] = [];
                    }

                    $imagesByProduct[$slug][] = [
                        'image_url' => $sheet->getCell("B{$row}")->getValue(),
                        'alt_text' => $sheet->getCell("C{$row}")->getValue() ?? '',
                        'sort_order' => (int) ($sheet->getCell("D{$row}")->getValue() ?: 0),
                        'is_primary' => (bool) $sheet->getCell("E{$row}")->getValue(),
                    ];
                }
            }
        } elseif (file_exists(public_path('images.json'))) {
            $imagesByProduct = json_decode(file_get_contents(public_path('images.json')), true);
        }
        }

        if (empty($imagesByProduct)) {
            throw new RuntimeException("Gagal membaca ProductImages dari CSV, JSON, atau Excel");
        }
        $products = Product::query()->whereIn('slug', array_keys($imagesByProduct))->get()->keyBy('slug');
        foreach ($imagesByProduct as $productSlug => $images) {
            $product = $products->get($productSlug);
            if (! $product) { throw new RuntimeException("Product slug [{$productSlug}] tidak ditemukan."); }
            $keptIds = [];
            foreach ($images as $image) {
                $record = ProductImage::query()->withTrashed()->updateOrCreate(['product_id' => $product->id, 'sort_order' => $image['sort_order']], ['image_url' => $image['image_url'], 'alt_text' => $image['alt_text'], 'is_primary' => $image['is_primary']]);
                if ($record->trashed()) { $record->restore(); }
                $keptIds[] = $record->id;
            }
            ProductImage::query()->where('product_id', $product->id)->whereNotIn('id', $keptIds)->delete();
        }
    }

    private function slugify($text)
    {
        $text = strtolower($text);
        $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
        $text = preg_replace('/[\s-]+/', '-', $text);
        return trim($text, '-');
    }
}
