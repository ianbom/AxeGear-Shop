<?php

use App\Actions\Payments\SyncMidtransPaymentAction;
use App\Actions\Stock\FinalizeReservedStockAction;
use App\Models\Notification;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\StockLog;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

beforeEach(function () {
    config(['services.midtrans.server_key' => 'midtrans-webhook-test-key']);
    Http::preventStrayRequests();
});

function createMidtransWebhookPayment(array $reservedStocks = [2, 2]): Payment
{
    $customer = User::factory()->create();
    $order = Order::query()->create([
        'user_id' => $customer->id,
        'order_number' => 'ORD-WEBHOOK-'.Str::uuid(),
        'customer_name' => $customer->name,
        'customer_email' => $customer->email,
        'customer_phone' => '0800000000',
        'subtotal' => 102000,
        'grand_total' => 102000,
        'payment_status' => 'pending',
        'order_status' => 'pending_payment',
        'stock_reserved_at' => now(),
    ]);
    $product = Product::query()->create([
        'name' => 'Webhook test product',
        'slug' => 'webhook-'.Str::uuid(),
        'regular_price' => 25500,
    ]);

    foreach ($reservedStocks as $index => $reservedStock) {
        $variant = $product->variants()->create([
            'sku' => $order->order_number.'-'.$index,
            'stock' => 10,
            'reserved_stock' => $reservedStock,
        ]);
        $order->items()->create([
            'product_id' => $product->id,
            'product_variant_id' => $variant->id,
            'product_name' => $product->name,
            'price' => 25500,
            'quantity' => 2,
            'subtotal' => 51000,
        ]);
    }

    return $order->payment()->create([
        'payment_provider' => 'midtrans',
        'midtrans_order_id' => $order->order_number,
        'transaction_status' => 'pending',
        'gross_amount' => 102000,
    ]);
}

function midtransWebhookPayload(Payment $payment, array $overrides = []): array
{
    $payload = array_replace([
        'order_id' => $payment->midtrans_order_id,
        'transaction_id' => 'test-transaction',
        'transaction_status' => 'settlement',
        'status_code' => '200',
        'gross_amount' => '102000.00',
        'fraud_status' => 'accept',
        'payment_type' => 'bank_transfer',
    ], $overrides);
    $payload['signature_key'] = hash('sha512', $payload['order_id'].$payload['status_code'].$payload['gross_amount'].config('services.midtrans.server_key'));

    return $payload;
}

it('acknowledges successful payments and their duplicates without repeating stock or notifications', function (string $transactionStatus) {
    $payment = createMidtransWebhookPayment();
    $payload = midtransWebhookPayload($payment, ['transaction_status' => $transactionStatus]);

    $this->postJson(route('payments.midtrans.notification'), $payload)->assertOk()->assertExactJson(['ok' => true]);
    $shipment = $payment->order->shipment()->create([
        'shipping_provider' => 'biteship',
        'courier_company' => 'jne',
        'courier_type' => 'reg',
        'shipping_cost' => 0,
        'shipping_status' => 'in_transit',
        'biteship_tracking_id' => 'tracking-midtrans-test',
        'waybill_id' => 'waybill-midtrans-test',
        'raw_order_response' => ['courier' => ['link' => 'https://example.com/tracking/original']],
    ]);
    $shipmentSnapshot = $shipment->fresh()->getAttributes();
    $this->postJson(route('payments.midtrans.notification'), $payload)->assertOk();

    expect($shipment->fresh()->getAttributes())->toBe($shipmentSnapshot);

    expect($payment->fresh()->order->payment_status)->toBe('paid')
        ->and($payment->fresh()->transaction_status)->toBe($transactionStatus)
        ->and($payment->fresh()->paid_at)->not->toBeNull()
        ->and($payment->fresh()->order->stock_finalized_at)->not->toBeNull()
        ->and(ProductVariant::query()->orderBy('id')->pluck('stock')->all())->toBe([8, 8])
        ->and(ProductVariant::query()->pluck('reserved_stock')->all())->toBe([0, 0])
        ->and(StockLog::query()->count())->toBe(2)
        ->and(Notification::query()->count())->toBe(1)
        ->and($payment->logs()->count())->toBe(1);
})->with(['settlement', 'capture']);

it('preserves shipment data when another successful payment notification arrives', function (string $transactionStatus) {
    $payment = createMidtransWebhookPayment();
    $payload = midtransWebhookPayload($payment, ['transaction_status' => $transactionStatus]);
    $this->postJson(route('payments.midtrans.notification'), $payload)->assertOk();
    $payment->order->update(['order_status' => 'shipped', 'shipping_status' => 'in_transit']);
    $shipment = $payment->order->shipment()->create([
        'shipping_provider' => 'biteship',
        'courier_company' => 'jne',
        'courier_type' => 'reg',
        'shipping_cost' => 0,
        'shipping_status' => 'in_transit',
        'raw_order_response' => ['courier' => ['link' => 'https://example.com/tracking/original']],
    ]);
    $snapshot = $shipment->fresh()->getAttributes();

    $this->postJson(route('payments.midtrans.notification'), [
        ...$payload, 'transaction_id' => 'another-transaction',
    ])->assertOk();

    expect($shipment->fresh()->getAttributes())->toBe($snapshot)
        ->and($payment->order->fresh()->order_status)->toBe('shipped')
        ->and(ProductVariant::query()->orderBy('id')->pluck('stock')->all())->toBe([8, 8])
        ->and(StockLog::query()->count())->toBe(2)
        ->and(Notification::query()->count())->toBe(1);
})->with(['settlement', 'capture']);

it('acknowledges an inventory conflict after rolling back all stock changes and saving manual review', function () {
    $payment = createMidtransWebhookPayment([2, 0]);
    $payload = midtransWebhookPayload($payment);

    $this->postJson(route('payments.midtrans.notification'), $payload)->assertOk();
    $this->postJson(route('payments.midtrans.notification'), $payload)->assertOk();

    expect($payment->fresh()->order->payment_status)->toBe('manual_review')
        ->and($payment->fresh()->order->order_status)->toBe('pending_payment')
        ->and($payment->fresh()->transaction_status)->toBe('manual_review')
        ->and($payment->fresh()->failure_reason)->toBe('Stock invariant failed.')
        ->and($payment->fresh()->paid_at)->toBeNull()
        ->and($payment->fresh()->order->stock_finalized_at)->toBeNull()
        ->and(ProductVariant::query()->orderBy('id')->pluck('stock')->all())->toBe([10, 10])
        ->and(ProductVariant::query()->orderBy('id')->pluck('reserved_stock')->all())->toBe([2, 0])
        ->and(StockLog::query()->count())->toBe(0)
        ->and(Notification::query()->count())->toBe(0)
        ->and($payment->logs()->count())->toBe(1)
        ->and($payment->logs()->first()->transaction_status)->toBe('settlement')
        ->and($payment->fresh()->raw_response)->toEqual($payload);
});

it('allows status synchronization to resolve inventory review and clear its failure reason', function () {
    $payment = createMidtransWebhookPayment([2, 0]);
    $payload = midtransWebhookPayload($payment);
    $this->postJson(route('payments.midtrans.notification'), $payload)->assertOk();
    ProductVariant::query()->orderBy('id')->skip(1)->first()->update(['reserved_stock' => 2]);
    Http::fake(['*/v2/*/status' => Http::response($payload)]);

    app(SyncMidtransPaymentAction::class)->execute($payment->fresh());

    expect($payment->fresh()->order->payment_status)->toBe('paid')
        ->and($payment->fresh()->transaction_status)->toBe('settlement')
        ->and($payment->fresh()->failure_reason)->toBeNull()
        ->and(ProductVariant::query()->orderBy('id')->pluck('stock')->all())->toBe([8, 8])
        ->and(StockLog::query()->count())->toBe(2)
        ->and(Notification::query()->count())->toBe(1);
    Http::assertSentCount(1);
});

it('does not regress a paid order when an older pending event arrives', function () {
    $payment = createMidtransWebhookPayment();
    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment))->assertOk();
    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment, ['transaction_status' => 'pending', 'status_code' => '201']))->assertOk();

    expect($payment->fresh()->order->payment_status)->toBe('paid')
        ->and($payment->fresh()->transaction_status)->toBe('settlement')
        ->and(StockLog::query()->count())->toBe(2)
        ->and(Notification::query()->count())->toBe(1);
});

it('rejects an invalid signature without changing the payment', function () {
    $payment = createMidtransWebhookPayment();
    $payload = midtransWebhookPayload($payment);
    $payload['signature_key'] = str_repeat('0', 128);

    $this->postJson(route('payments.midtrans.notification'), $payload)->assertForbidden();

    expect($payment->fresh()->transaction_status)->toBe('pending')
        ->and($payment->logs()->count())->toBe(0)
        ->and(StockLog::query()->count())->toBe(0);
});

it('rejects a missing required field', function (string $field) {
    $payment = createMidtransWebhookPayment();
    $payload = midtransWebhookPayload($payment);
    unset($payload[$field]);

    $this->postJson(route('payments.midtrans.notification'), $payload)->assertUnprocessable();

    expect($payment->fresh()->transaction_status)->toBe('pending')
        ->and($payment->logs()->count())->toBe(0);
})->with(['order_id', 'status_code', 'gross_amount', 'signature_key', 'transaction_status']);

it('records an amount mismatch without marking the order paid', function () {
    $payment = createMidtransWebhookPayment();

    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment, ['gross_amount' => '102001.00']))->assertOk();

    expect($payment->fresh()->order->payment_status)->toBe('pending')
        ->and($payment->logs()->first()->event_type)->toBe('rejected_amount_mismatch')
        ->and(StockLog::query()->count())->toBe(0);
});

it('does not acknowledge a payment that cannot be found', function () {
    $payment = createMidtransWebhookPayment();

    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment, ['order_id' => 'ORD-UNKNOWN']))->assertNotFound();

    expect($payment->logs()->count())->toBe(0);
});

it('keeps unexpected processing failures retryable and rolls back payment changes', function (Throwable $failure) {
    $payment = createMidtransWebhookPayment();
    $this->mock(FinalizeReservedStockAction::class)->shouldReceive('execute')->once()->andThrow($failure);

    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment))->assertInternalServerError();

    expect($payment->fresh()->transaction_status)->toBe('pending')
        ->and($payment->fresh()->order->payment_status)->toBe('pending')
        ->and($payment->logs()->count())->toBe(0)
        ->and(StockLog::query()->count())->toBe(0);
})->with([
    'unexpected error' => fn () => new RuntimeException('Unexpected stock storage failure.'),
    'database error' => fn () => new QueryException('sqlite', 'update product_variants set stock = ?', [8], new PDOException('Simulated database failure.')),
]);

it('logs only safe webhook metadata and the acknowledgement outcome', function () {
    $payment = createMidtransWebhookPayment();
    $payload = midtransWebhookPayload($payment, [
        'va_numbers' => [['va_number' => 'test-va', 'bank' => 'bca']],
        'customer_details' => ['full_name' => 'Test Customer', 'email' => 'test@example.test', 'phone' => '0800000000'],
    ]);
    Log::spy();

    $this->postJson(route('payments.midtrans.notification'), $payload)->assertOk();

    $context = ['order_id' => $payment->midtrans_order_id, 'transaction_status' => 'settlement'];
    Log::shouldHaveReceived('info')->with('Midtrans Webhook received', $context)->once();
    Log::shouldHaveReceived('info')->with('Midtrans Webhook processed', [...$context, 'http_status' => 200])->once();
});
