<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use RuntimeException;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [];
        
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
                $price = (float) preg_replace('/[^\d]/', '', $data['Harga'] ?? '0');
                
                $products[] = [
                    'name' => $name,
                    'slug' => $slug,
                    'sku' => 'SHP-' . str_pad($rowIndex, 3, '0', STR_PAD_LEFT),
                    'category_slug' => 'baju-setelan',
                    'collection_slug' => 'shopee-collection',
                    'brand' => 'Anemi Official',
                    'short_description' => $name . ' koleksi terbaru yang modis dan nyaman dipakai.',
                    'description' => $name . ' hadir dengan desain kekinian yang cocok untuk berbagai aktivitas Anda. Dibuat dengan material berkualitas.',
                    'material' => 'Bahan berkualitas',
                    'care_instruction' => 'Cuci lembut, pisahkan warna, hindari pemutih, jemur teduh, setrika suhu rendah bila diperlukan.',
                    'base_price' => $price ?: 100000,
                    'sale_price' => null,
                    'weight' => 500,
                    'length' => 30,
                    'width' => 25,
                    'height' => 5,
                    'status' => 'published',
                    'is_featured' => true,
                    'is_new_arrival' => true,
                    'is_best_seller' => false,
                    'meta_title' => $name . ' | Anemi Official',
                    'meta_description' => 'Beli ' . $name . ' berkualitas dengan harga terbaik di Anemi Official.',
                ];
            }
            fclose($file);
        }
        
        // Prioritas 2: Baca dari JSON (hasil ekstraksi Python)
        if (empty($products) && file_exists(public_path('products_shopee.json'))) {
            $products = json_decode(file_get_contents(public_path('products_shopee.json')), true);
        }
        
        // Prioritas 3: Fallback ke Excel
        if (empty($products)) {
            $filePath = public_path('anemi-seeder.xlsx');
            if (file_exists($filePath) && class_exists('\PhpOffice\PhpSpreadsheet\Reader\Xlsx')) {
                $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
                $spreadsheet = $reader->load($filePath);
                $sheet = $spreadsheet->getSheetByName('Products');
                if ($sheet) {
                    $highestRow = $sheet->getHighestRow();
                    for ($row = 2; $row <= $highestRow; $row++) {
                        $slug = $sheet->getCell("C{$row}")->getValue();
                        if (!$slug) continue;
                        
                        $products[] = [
                            'name' => $sheet->getCell("B{$row}")->getValue(),
                            'slug' => $slug,
                            'sku' => $sheet->getCell("D{$row}")->getValue(),
                            'category_slug' => $sheet->getCell("E{$row}")->getValue(),
                            'collection_slug' => $sheet->getCell("G{$row}")->getValue(),
                            'brand' => $sheet->getCell("H{$row}")->getValue() ?? 'Anemi Official',
                            'short_description' => $sheet->getCell("I{$row}")->getValue() ?? '',
                            'description' => $sheet->getCell("J{$row}")->getValue() ?? '',
                            'material' => 'Material sesuai deskripsi',
                            'care_instruction' => 'Cuci lembut, pisahkan warna, hindari pemutih, jemur teduh, setrika suhu rendah bila diperlukan.',
                            'base_price' => (float) $sheet->getCell("K{$row}")->getValue(),
                            'sale_price' => $sheet->getCell("L{$row}")->getValue() ? (float) $sheet->getCell("L{$row}")->getValue() : null,
                            'weight' => (int) ($sheet->getCell("N{$row}")->getValue() ?: 850),
                            'length' => (int) ($sheet->getCell("O{$row}")->getValue() ?: 36),
                            'width' => (int) ($sheet->getCell("P{$row}")->getValue() ?: 28),
                            'height' => (int) ($sheet->getCell("Q{$row}")->getValue() ?: 7),
                            'status' => strtolower($sheet->getCell("R{$row}")->getValue() ?? 'published'),
                            'is_featured' => (bool) $sheet->getCell("S{$row}")->getValue(),
                            'is_new_arrival' => (bool) $sheet->getCell("T{$row}")->getValue(),
                            'is_best_seller' => false,
                            'meta_title' => $sheet->getCell("U{$row}")->getValue() ?? '',
                            'meta_description' => $sheet->getCell("V{$row}")->getValue() ?? '',
                        ];
                    }
                }
            } elseif (file_exists(public_path('products.json'))) {
                $products = json_decode(file_get_contents(public_path('products.json')), true);
            }
        }

        if (empty($products)) {
            throw new RuntimeException("Gagal membaca data produk dari CSV, JSON, atau Excel");
        }

        $currentSlugs = collect($products)->pluck('slug');

        foreach ($products as $product) {
            $record = Product::query()->withTrashed()->updateOrCreate(['slug' => $product['slug']], [
                'category_id' => random_int(1, 4), 'collection_id' => random_int(1, 5), 'name' => $product['name'], 'sku' => $product['sku'],
                'short_description' => $product['short_description'], 'description' => $product['description'], 'material' => $product['material'],
                'care_instruction' => $product['care_instruction'], 'base_price' => $product['base_price'], 'sale_price' => $product['sale_price'],
                'weight' => $product['weight'], 'length' => $product['length'], 'width' => $product['width'], 'height' => $product['height'],
                'status' => $product['status'], 'is_featured' => $product['is_featured'], 'is_new_arrival' => $product['is_new_arrival'],
                'is_best_seller' => $product['is_best_seller'], 'meta_title' => $product['meta_title'], 'meta_description' => $product['meta_description'],
            ]);
            if ($record->trashed()) { $record->restore(); }
        }
        Product::query()->where('sku', 'like', 'SHP-%')->whereNotIn('slug', $currentSlugs)->delete();
    }

    private function slugify($text)
    {
        $text = strtolower($text);
        $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
        $text = preg_replace('/[\s-]+/', '-', $text);
        return trim($text, '-');
    }
}
