<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Carbon\CarbonInterface;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class LoadTestSeeder extends Seeder
{
    private const BATCH_SIZE = 500;

    public function run(): void
    {
        $this->seed(
            (int) env('LOAD_TEST_PRODUCTS', 10_000),
            (int) env('LOAD_TEST_ORDERS', 100_000),
            (int) env('LOAD_TEST_BATCH_SIZE', self::BATCH_SIZE),
        );
    }

    public function seed(int $productCount, int $orderCount, int $batchSize = self::BATCH_SIZE): void
    {
        if ($productCount < 1 || $orderCount < 1 || $batchSize < 1) {
            throw new \InvalidArgumentException('Product count, order count, and batch size must be positive.');
        }

        DB::connection()->disableQueryLog();

        $runId = Str::lower(Str::random(10));
        $now = now();
        [$categoryId, $collectionId] = $this->taxonomy($now);
        $userIds = $this->customers($runId, max(100, (int) ceil($orderCount / 20)), $batchSize, $now);
        $variantIds = $this->products($runId, $productCount, $batchSize, $categoryId, $collectionId, $now);
        $this->orders($runId, $orderCount, $batchSize, $userIds, $variantIds, $now);

        $this->command?->info("Load test seed {$runId}: {$productCount} products, {$orderCount} orders.");
    }

    private function taxonomy(CarbonInterface $now): array
    {
        $categoryId = DB::table('categories')->where('slug', 'load-test')->value('id');

        if (! $categoryId) {
            $categoryId = DB::table('categories')->insertGetId([
                'name' => 'Load Test', 'slug' => 'load-test', 'description' => 'Synthetic catalog category.',
                'sort_order' => 9999, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now,
            ]);
        }

        $collectionId = DB::table('collections')->where('slug', 'load-test')->value('id');

        if (! $collectionId) {
            $collectionId = DB::table('collections')->insertGetId([
                'name' => 'Load Test', 'slug' => 'load-test', 'description' => 'Synthetic catalog collection.',
                'sort_order' => 9999, 'is_featured' => false, 'is_active' => true,
                'created_at' => $now, 'updated_at' => $now,
            ]);
        }

        return [$categoryId, $collectionId];
    }

    private function customers(string $runId, int $count, int $batchSize, CarbonInterface $now): array
    {
        $rows = [];
        $password = Hash::make('password');

        for ($index = 1; $index <= $count; $index++) {
            $rows[] = [
                'name' => "Load Test Customer {$runId}-{$index}", 'email' => "load-test-{$runId}-{$index}@example.test",
                'phone' => '08'.str_pad((string) $index, 10, '0', STR_PAD_LEFT), 'role' => 'customer',
                'is_active' => true, 'email_verified_at' => $now, 'password' => $password,
                'created_at' => $now, 'updated_at' => $now,
            ];
        }

        foreach (array_chunk($rows, $batchSize) as $batch) {
            DB::table('users')->insert($batch);
        }

        return DB::table('users')->where('email', 'like', "load-test-{$runId}-%@example.test")->pluck('id')->all();
    }

    private function products(string $runId, int $count, int $batchSize, int $categoryId, int $collectionId, CarbonInterface $now): array
    {
        for ($start = 1; $start <= $count; $start += $batchSize) {
            $end = min($count, $start + $batchSize - 1);
            $products = [];

            for ($index = $start; $index <= $end; $index++) {
                $price = random_int(75_000, 850_000);
                $salePrice = $index % 4 === 0 ? $price - random_int(5_000, (int) floor($price * 0.2)) : null;
                $products[] = [
                    'category_id' => $categoryId, 'name' => "Load Test Product {$runId}-{$index}",
                    'slug' => "load-test-{$runId}-{$index}", 'sku' => "LT-{$runId}-P-{$index}",
                    'brand_name' => 'AxeGear', 'product_line' => 'Load Test', 'style_name' => "Series {$index}",
                    'regular_price' => $price, 'sale_price' => $salePrice, 'short_description' => 'Synthetic load-test product.',
                    'description' => 'Synthetic product for database and storefront load testing.',
                    'status' => 'published', 'weight' => random_int(150, 2000), 'length' => random_int(10, 60),
                    'width' => random_int(10, 50), 'height' => random_int(5, 40), 'is_featured' => $index % 20 === 0,
                    'is_new_arrival' => $index % 10 === 0, 'is_best_seller' => $index % 15 === 0,
                    'created_at' => $now, 'updated_at' => $now,
                ];
            }

            DB::transaction(function () use ($products, $runId, $start, $collectionId, $now): void {
                DB::table('products')->insert($products);
                $productIds = DB::table('products')->whereIn('slug', array_column($products, 'slug'))->pluck('id', 'slug');
                $images = [];
                $variants = [];
                $collections = [];

                foreach ($products as $offset => $product) {
                    $index = $start + $offset;
                    $productId = $productIds["load-test-{$runId}-{$index}"];
                    $imageUrl = "https://placehold.co/800x800/webp?text=Load+Test+{$index}";
                    $collections[] = ['product_id' => $productId, 'collection_id' => $collectionId, 'sort_order' => 1, 'created_at' => $now, 'updated_at' => $now];

                    foreach (range(0, ($index % 3) + 1) as $imageIndex) {
                        $images[] = ['product_id' => $productId, 'image_url' => $imageUrl."-{$imageIndex}", 'alt_text' => $product['name'], 'sort_order' => $imageIndex, 'is_primary' => $imageIndex === 0, 'created_at' => $now, 'updated_at' => $now];
                    }

                    foreach (range(1, ($index % 4) + 1) as $variantIndex) {
                        $stock = random_int(20, 250);
                        $variants[] = [
                            'product_id' => $productId, 'sku' => "LT-{$runId}-V-{$index}-{$variantIndex}", 'variant_name' => "Variant {$variantIndex}",
                            'color_name' => ['Black', 'Olive', 'Sand', 'Blue'][$variantIndex - 1], 'color_hex' => ['#111111', '#708238', '#C2B280', '#2563EB'][$variantIndex - 1],
                            'size' => ['S', 'M', 'L', 'XL'][$variantIndex - 1], 'package_type' => 'Load Test',
                            'regular_price' => $product['regular_price'], 'sale_price' => $product['sale_price'], 'stock' => $stock,
                            'reserved_stock' => 0, 'weight' => $product['weight'], 'length' => $product['length'], 'width' => $product['width'], 'height' => $product['height'],
                            'image_url' => $imageUrl, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now,
                        ];
                    }
                }

                DB::table('product_collections')->insert($collections);
                DB::table('product_images')->insert($images);
                DB::table('product_variants')->insert($variants);
            });
        }

        return DB::table('product_variants')->where('sku', 'like', "LT-{$runId}-V-%")->pluck('id')->all();
    }

    private function orders(string $runId, int $count, int $batchSize, array $userIds, array $variantIds, CarbonInterface $now): void
    {
        $variants = DB::table('product_variants')->join('products', 'products.id', '=', 'product_variants.product_id')
            ->whereIn('product_variants.id', $variantIds)
            ->select('product_variants.*', 'products.name as product_name', 'products.sku as product_sku')->get()->keyBy('id');

        for ($start = 1; $start <= $count; $start += $batchSize) {
            $end = min($count, $start + $batchSize - 1);
            DB::transaction(function () use ($runId, $start, $end, $userIds, $variants, $now): void {
                $orders = [];
                $itemsByOrder = [];

                for ($index = $start; $index <= $end; $index++) {
                    $state = $this->state($index);
                    $chosen = $variants->random(random_int(1, min(5, $variants->count())));
                    $subtotal = 0;
                    $items = [];

                    foreach ($chosen as $variant) {
                        $quantity = random_int(1, 3);
                        $price = (float) ($variant->sale_price ?? $variant->regular_price);
                        $itemSubtotal = $price * $quantity;
                        $subtotal += $itemSubtotal;
                        $items[] = compact('variant', 'quantity', 'price', 'itemSubtotal');
                    }

                    $discount = $index % 5 === 0 ? round($subtotal * 0.1, 2) : 0;
                    $shipping = random_int(15_000, 80_000);
                    $insurance = $index % 3 === 0 ? 2_000 : 0;
                    $serviceFee = 1_000;
                    $createdAt = $now->subMinutes(random_int(1, 525_600));
                    $orderNumber = "LT-{$runId}-O-{$index}";
                    $orders[] = [
                        'user_id' => $userIds[array_rand($userIds)], 'order_number' => $orderNumber, 'checkout_idempotency_key' => "lt-{$runId}-{$index}",
                        'customer_name' => "Load Test Customer {$index}", 'customer_email' => "order-{$runId}-{$index}@example.test", 'customer_phone' => '08'.str_pad((string) $index, 10, '0', STR_PAD_LEFT),
                        'subtotal' => $subtotal, 'discount_amount' => $discount, 'shipping_cost' => $shipping, 'insurance_cost' => $insurance, 'service_fee' => $serviceFee,
                        'grand_total' => $subtotal - $discount + $shipping + $insurance + $serviceFee, 'payment_status' => $state['payment_status'],
                        'order_status' => $state['order_status'], 'shipping_status' => $state['shipping_status'], 'source_channel' => 'website',
                        'no_return_refund_agreed' => true, 'no_return_refund_agreed_at' => $createdAt, 'paid_at' => $state['paid'] ? $createdAt->addMinutes(5) : null,
                        'cancelled_at' => $state['cancelled'] ? $createdAt->addMinutes(30) : null, 'expired_at' => $state['expired'] ? $createdAt->addDay() : null,
                        'completed_at' => $state['completed'] ? $createdAt->addDays(7) : null, 'stock_reserved_at' => $createdAt,
                        'stock_released_at' => $state['cancelled'] || $state['expired'] ? $createdAt->addMinutes(30) : null,
                        'stock_finalized_at' => $state['paid'] ? $createdAt->addMinutes(5) : null, 'created_at' => $createdAt, 'updated_at' => $createdAt,
                    ];
                    $itemsByOrder[$orderNumber] = $items;
                }

                DB::table('orders')->insert($orders);
                $saved = DB::table('orders')->whereIn('order_number', array_column($orders, 'order_number'))->get()->keyBy('order_number');
                $this->transactionRelations($runId, $orders, $saved, $itemsByOrder, $now);
            });
        }
    }

    private function transactionRelations(string $runId, array $orders, $saved, array $itemsByOrder, CarbonInterface $now): void
    {
        $addresses = [];
        $items = [];
        $payments = [];
        $logs = [];
        $shipments = [];
        $trackings = [];
        $notifications = [];

        foreach ($orders as $index => $order) {
            $record = $saved[$order['order_number']];
            $orderId = $record->id;
            $orderIndex = (int) Str::afterLast($order['order_number'], '-');
            $createdAt = Carbon::parse($order['created_at']);
            $addresses[] = ['order_id' => $orderId, 'recipient_name' => $order['customer_name'], 'recipient_phone' => $order['customer_phone'], 'province' => 'DKI Jakarta', 'city' => 'Jakarta Selatan', 'district' => 'Kebayoran Baru', 'subdistrict' => 'Senayan', 'postal_code' => '12190', 'biteship_area_id' => 'IDJKT', 'full_address' => 'Jl. Load Test No. '.($index + 1), 'created_at' => $createdAt, 'updated_at' => $createdAt];
            foreach ($itemsByOrder[$order['order_number']] as $item) {
                $variant = $item['variant'];
                $items[] = ['order_id' => $orderId, 'product_id' => $variant->product_id, 'product_variant_id' => $variant->id, 'product_name' => $variant->product_name, 'product_sku' => $variant->product_sku, 'variant_sku' => $variant->sku, 'variant_name' => $variant->variant_name, 'color_name' => $variant->color_name, 'size' => $variant->size, 'package_type' => $variant->package_type, 'price' => $item['price'], 'quantity' => $item['quantity'], 'subtotal' => $item['itemSubtotal'], 'weight' => $variant->weight, 'length' => $variant->length, 'width' => $variant->width, 'height' => $variant->height, 'product_image_url' => $variant->image_url, 'created_at' => $createdAt, 'updated_at' => $createdAt];
            }
            $transactionStatus = $this->midtransStatus($order['payment_status']);
            $payment = ['order_id' => $orderId, 'payment_provider' => 'midtrans', 'payment_method' => 'bank_transfer', 'midtrans_order_id' => "LT-{$runId}-M-{$orderIndex}", 'midtrans_transaction_id' => "LT-{$runId}-T-{$orderIndex}", 'midtrans_snap_token' => "lt-{$runId}-snap-{$orderIndex}", 'midtrans_redirect_url' => 'https://example.test/payments/load-test', 'transaction_status' => $transactionStatus, 'fraud_status' => $order['payment_status'] === 'paid' ? 'accept' : null, 'gross_amount' => $order['grand_total'], 'currency' => 'IDR', 'paid_at' => $order['paid_at'], 'expired_at' => $order['expired_at'], 'expires_at' => $createdAt->addDay(), 'last_synced_at' => $createdAt->addMinutes(10), 'failure_reason' => in_array($order['payment_status'], ['failed', 'cancelled', 'expired'], true) ? $order['payment_status'] : null, 'raw_response' => json_encode(['source' => 'load_test', 'order_id' => $order['order_number'], 'transaction_status' => $transactionStatus]), 'created_at' => $createdAt, 'updated_at' => $createdAt];
            $payments[] = $payment;
            $logs[] = ['order_id' => $orderId, 'provider' => 'midtrans', 'event_type' => 'payment_notification', 'transaction_status' => $transactionStatus, 'payload_hash' => hash('sha256', "{$runId}-payment-{$orderIndex}"), 'payload' => $payment['raw_response'], 'processed_at' => $createdAt->addMinutes(10), 'created_at' => $createdAt, 'updated_at' => $createdAt];
            $notifications[] = ['user_id' => $order['user_id'], 'title' => 'Order update', 'message' => "Order {$order['order_number']} is {$order['order_status']}.", 'type' => 'order', 'is_read' => true, 'created_at' => $createdAt, 'updated_at' => $createdAt];
            if ($order['payment_status'] === 'paid') {
                $shipments[] = ['order_id' => $orderId, 'shipping_provider' => 'biteship', 'biteship_order_id' => "LT-{$runId}-B-{$orderIndex}", 'biteship_tracking_id' => "LT-{$runId}-BT-{$orderIndex}", 'waybill_id' => "LTWB{$runId}{$orderIndex}", 'courier_company' => 'jne', 'courier_type' => 'reg', 'courier_service_name' => 'REG', 'delivery_type' => 'now', 'shipping_cost' => $order['shipping_cost'], 'insurance_cost' => $order['insurance_cost'], 'estimated_delivery' => '1-3 days', 'shipping_status' => $order['shipping_status'], 'shipped_at' => in_array($order['shipping_status'], ['picked', 'in_transit', 'delivered'], true) ? $createdAt->addDay() : null, 'delivered_at' => $order['shipping_status'] === 'delivered' ? $createdAt->addDays(3) : null, 'last_synced_at' => $createdAt->addHour(), 'raw_rate_response' => json_encode(['source' => 'load_test']), 'raw_order_response' => json_encode(['source' => 'load_test']), 'created_at' => $createdAt, 'updated_at' => $createdAt];
            }
        }
        $this->insertBatches('order_addresses', $addresses);
        $this->insertBatches('order_items', $items);
        $this->insertBatches('payments', $payments);
        $this->insertBatches('payment_logs', $logs);
        $this->insertBatches('notifications', $notifications);
        if ($shipments !== []) {
            $this->insertBatches('shipments', $shipments);
            $shipmentIds = DB::table('shipments')->whereIn('order_id', array_column($shipments, 'order_id'))->pluck('id', 'order_id');
            foreach ($shipments as $shipment) {
                $trackings[] = ['shipment_id' => $shipmentIds[$shipment['order_id']], 'status' => $shipment['shipping_status'], 'description' => 'Synthetic load-test tracking event.', 'location' => 'Jakarta Selatan', 'happened_at' => $shipment['created_at'], 'provider_happened_at' => $shipment['created_at'], 'payload_hash' => hash('sha256', "{$runId}-shipment-{$shipment['order_id']}"), 'raw_payload' => json_encode(['source' => 'load_test']), 'created_at' => $shipment['created_at'], 'updated_at' => $shipment['updated_at']];
            }

            $this->insertBatches('shipment_trackings', $trackings);
        }
    }

    private function insertBatches(string $table, array $rows): void
    {
        foreach (array_chunk($rows, 100) as $batch) {
            DB::table($table)->insert($batch);
        }
    }

    private function state(int $index): array
    {
        return match ($index % 10) {
            0 => ['payment_status' => 'failed', 'order_status' => 'payment_failed', 'shipping_status' => 'not_created', 'paid' => false, 'cancelled' => false, 'expired' => false, 'completed' => false],
            1 => ['payment_status' => 'expired', 'order_status' => 'payment_expired', 'shipping_status' => 'not_created', 'paid' => false, 'cancelled' => false, 'expired' => true, 'completed' => false],
            2 => ['payment_status' => 'cancelled', 'order_status' => 'cancelled', 'shipping_status' => 'cancelled', 'paid' => false, 'cancelled' => true, 'expired' => false, 'completed' => false],
            3 => ['payment_status' => 'pending', 'order_status' => 'pending_payment', 'shipping_status' => 'not_created', 'paid' => false, 'cancelled' => false, 'expired' => false, 'completed' => false],
            4 => ['payment_status' => 'paid', 'order_status' => 'ready_to_ship', 'shipping_status' => 'confirmed', 'paid' => true, 'cancelled' => false, 'expired' => false, 'completed' => false],
            5 => ['payment_status' => 'paid', 'order_status' => 'shipped', 'shipping_status' => 'in_transit', 'paid' => true, 'cancelled' => false, 'expired' => false, 'completed' => false],
            6 => ['payment_status' => 'paid', 'order_status' => 'delivered', 'shipping_status' => 'delivered', 'paid' => true, 'cancelled' => false, 'expired' => false, 'completed' => false],
            default => ['payment_status' => 'paid', 'order_status' => 'completed', 'shipping_status' => 'delivered', 'paid' => true, 'cancelled' => false, 'expired' => false, 'completed' => true],
        };
    }

    private function midtransStatus(string $paymentStatus): string
    {
        return match ($paymentStatus) {
            'paid' => 'settlement', 'failed' => 'failure', 'expired' => 'expire', 'cancelled' => 'cancel', default => 'pending'
        };
    }
}
