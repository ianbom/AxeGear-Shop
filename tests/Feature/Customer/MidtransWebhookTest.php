<?php

use App\Actions\Payments\SyncExpiredMidtransPaymentsAction;
use App\Actions\Payments\SyncMidtransPaymentAction;
use App\Actions\Stock\FinalizeReservedStockAction;
use App\Models\Notification;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\StockLog;
use App\Models\User;
use App\Models\Voucher;
use App\Services\Admin\PaymentManagementService;
use App\Services\Customer\MidtransWebhookService;
use App\Services\Integrations\MidtransService;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

uses(RefreshDatabase::class);

it('makes uncertain payments visible to admin inspection', function () {
    $payment = createMidtransWebhookPayment();
    $payment->order->update(['payment_status' => 'manual_review']);
    $payment->update(['transaction_status' => 'manual_review', 'failure_reason' => 'Snap uncertain']);
    $service = app(PaymentManagementService::class);
    $data = $service->indexData(Request::create('/admin/payments'));

    expect($data['statuses'])->toContain('manual_review')
        ->and($data['stats']['manual_review'])->toBe(1)
        ->and($service->detailData($payment)['payment']['failure_reason'])->toBe('Snap uncertain');
});

it('preserves existing incoming refund handling after a terminal failure', function (string $status, string $expected) {
    $payment = createMidtransWebhookPayment();
    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment, ['transaction_status' => 'expire']))->assertOk();
    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment, ['transaction_status' => $status]))->assertOk();

    expect($payment->fresh()->order->payment_status)->toBe($expected);
})->with(['refund' => ['refund', 'refunded'], 'partial refund' => ['partial_refund', 'partially_refunded']]);

it('reports a cancellation timeout without releasing reservations', function () {
    $payment = createMidtransWebhookPayment();
    Http::fake(['*/status' => fn () => throw new ConnectionException('Status lookup timeout')]);
    $this->actingAs($payment->order->user)->postJson(route('order.cancel', $payment->order))->assertUnprocessable()->assertJsonValidationErrors('payment');

    expect($payment->fresh()->order->payment_status)->toBe('pending')
        ->and($payment->fresh()->order->stock_released_at)->toBeNull()
        ->and($payment->logs()->count())->toBe(0);
});

it('balances rounded Snap item details without adding a business fee', function (float $price, int $adjustment) {
    $payment = createMidtransWebhookPayment();
    $payment->order->items()->update(['price' => $price, 'subtotal' => $price * 2]);
    $payment->order->update(['subtotal' => $price * 4, 'grand_total' => 102002]);
    Http::fake(['*/snap/v1/transactions' => Http::response(['token' => 'round-token', 'redirect_url' => 'https://example.test/payment'])]);
    app(MidtransService::class)->createSnapTransaction($payment->order);

    Http::assertSent(function (Illuminate\Http\Client\Request $request) use ($adjustment): bool {
        $items = collect($request['item_details']);

        return $request['transaction_details']['gross_amount'] === 102002
            && $items->sum(fn ($item) => $item['price'] * $item['quantity']) === 102002
            && $items->firstWhere('id', 'rounding')['price'] === $adjustment;
    });
    expect($payment->order->fresh()->service_fee)->toBe('0.00');
})->with(['rounded up items' => [25500.6, -2], 'rounded down items' => [25500.4, 2]]);

it('accepts provider failure status codes during synchronization', function () {
    $payment = createMidtransWebhookPayment();
    Http::fake(['*/status' => Http::response(midtransWebhookPayload($payment, ['transaction_status' => 'expire', 'status_code' => '202']))]);
    app(SyncMidtransPaymentAction::class)->execute($payment);

    expect($payment->fresh()->order->payment_status)->toBe('expired')
        ->and($payment->fresh()->order->stock_released_at)->not->toBeNull();
});

it('does not overwrite a settlement arriving during cancellation', function () {
    $payment = createMidtransWebhookPayment();
    Http::fake([
        '*/status' => Http::response(midtransWebhookPayload($payment, ['transaction_status' => 'pending'])),
        '*/v2/*/cancel' => function () use ($payment) {
            app(MidtransWebhookService::class)->handle(midtransWebhookPayload($payment));

            return Http::response(midtransWebhookPayload($payment, ['transaction_status' => 'cancel']));
        },
    ]);
    $this->actingAs($payment->order->user)->postJson(route('order.cancel', $payment->order))->assertUnprocessable();

    expect($payment->fresh()->transaction_status)->toBe('settlement')
        ->and($payment->fresh()->order->payment_status)->toBe('paid')
        ->and($payment->fresh()->order->stock_released_at)->toBeNull()
        ->and($payment->logs()->where('event_type', 'customer_cancel')->count())->toBe(0);
});

it('reconciles only uncertain Snap manual review records without generating tokens', function () {
    $payment = createMidtransWebhookPayment();
    $payment->order->update(['payment_status' => 'manual_review']);
    $payment->update(['transaction_status' => 'manual_review', 'raw_response' => ['snap_creation_uncertain' => true], 'failure_reason' => 'Snap uncertain']);
    $inventoryReview = createMidtransWebhookPayment();
    $inventoryReview->order->update(['payment_status' => 'manual_review']);
    $inventoryReview->update(['transaction_status' => 'manual_review', 'failure_reason' => 'Stock invariant failed.']);
    Http::fake(['*/status' => Http::response(midtransWebhookPayload($payment))]);

    $stats = app(SyncExpiredMidtransPaymentsAction::class)->execute();
    expect($stats)->toBe(['checked' => 1, 'synced' => 1, 'failed' => 0])
        ->and($payment->fresh()->order->payment_status)->toBe('paid')
        ->and($payment->fresh()->failure_reason)->toBeNull()
        ->and($inventoryReview->fresh()->transaction_status)->toBe('manual_review');
    Http::assertSentCount(1);
});

it('keeps a late settlement inventory conflict in review when a stale pending event follows', function () {
    $payment = createMidtransWebhookPayment();
    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment, ['transaction_status' => 'expire']))->assertOk();
    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment))->assertOk();
    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment, ['transaction_status' => 'pending']))->assertOk();

    expect($payment->fresh()->order->payment_status)->toBe('manual_review')
        ->and($payment->fresh()->transaction_status)->toBe('manual_review');
});

it('checks the provider before cancelling a payment with empty local metadata', function () {
    $payment = createMidtransWebhookPayment();
    Http::fake(['*/status' => Http::response(midtransWebhookPayload($payment))]);

    $this->actingAs($payment->order->user)->postJson(route('order.cancel', $payment->order))
        ->assertUnprocessable();
    Http::assertSentCount(1);
    expect($payment->fresh()->order->payment_status)->toBe('paid')
        ->and($payment->fresh()->order->stock_released_at)->toBeNull();
});

it('cancels an unused Snap session before releasing local reservations', function (int $lookupStatus) {
    $payment = createMidtransWebhookPayment();
    $voucher = Voucher::query()->create(['code' => 'CANCEL10', 'name' => 'Cancellation test', 'discount_type' => 'percentage', 'discount_value' => 10, 'is_active' => true, 'used_count' => 1]);
    $payment->order->update(['voucher_id' => $voucher->id, 'voucher_code' => $voucher->code]);
    $payment->update(['midtrans_snap_token' => 'unused-snap', 'midtrans_redirect_url' => 'https://example.test/snap']);
    Http::fake([
        '*/status' => Http::response(['status_code' => '404', 'status_message' => "Transaction doesn't exist."], $lookupStatus),
        '*/snap/v1/transactions/unused-snap/cancel' => Http::response(['canceled_at' => now()->toISOString()]),
    ]);

    $this->actingAs($payment->order->user)->post(route('order.cancel', $payment->order))->assertSessionHasNoErrors();
    Http::assertSentCount(2);
    expect($payment->fresh()->order->payment_status)->toBe('cancelled')
        ->and($payment->fresh()->midtrans_snap_token)->toBeNull()
        ->and(ProductVariant::query()->pluck('reserved_stock')->all())->toBe([0, 0])
        ->and(ProductVariant::query()->pluck('stock')->all())->toBe([10, 10])
        ->and($voucher->fresh()->used_count)->toBe(0)
        ->and($payment->logs()->where('event_type', 'customer_cancel')->count())->toBe(1);

    $this->postJson(route('order.cancel', $payment->order))->assertUnprocessable();
    Http::assertSentCount(2);
    expect($voucher->fresh()->used_count)->toBe(0)
        ->and($payment->logs()->where('event_type', 'customer_cancel')->count())->toBe(1);
})->with([200, 404]);

it('does not treat provider errors or malformed responses as permission to cancel', function (array $payload, int $status) {
    $payment = createMidtransWebhookPayment();
    $payment->update(['midtrans_snap_token' => 'unused-snap']);
    Http::fake(['*/status' => Http::response($payload, $status)]);

    $this->actingAs($payment->order->user)->postJson(route('order.cancel', $payment->order))->assertUnprocessable();
    Http::assertSentCount(1);
    expect($payment->fresh()->order->payment_status)->toBe('pending')
        ->and($payment->fresh()->order->stock_released_at)->toBeNull()
        ->and(ProductVariant::query()->pluck('reserved_stock')->all())->toBe([2, 2])
        ->and($payment->logs()->count())->toBe(0);
})->with([
    'unauthorized' => [['status_code' => '404'], 401],
    'forbidden' => [['status_code' => '404'], 403],
    'server error' => [['status_code' => '404'], 500],
    'empty success' => [[], 200],
    'missing transaction status' => [['status_code' => '200'], 200],
    'unverified not found' => [[], 404],
]);

it('retains reservations if the unused Snap session cannot be safely cancelled', function (array $response, int $status, int $lookupStatus) {
    $payment = createMidtransWebhookPayment();
    $payment->update(['midtrans_snap_token' => 'unused-snap']);
    Http::fake([
        '*/status' => Http::response(['status_code' => '404'], $lookupStatus),
        '*/snap/v1/transactions/unused-snap/cancel' => Http::response($response, $status),
    ]);

    $this->actingAs($payment->order->user)->postJson(route('order.cancel', $payment->order))->assertUnprocessable();
    expect($payment->fresh()->order->payment_status)->toBe('pending')
        ->and($payment->fresh()->order->stock_released_at)->toBeNull()
        ->and(ProductVariant::query()->pluck('reserved_stock')->all())->toBe([2, 2]);
})->with(['in progress' => [['error_messages' => ['transaction in progress']], 400], 'incomplete success' => [[], 200], 'server error' => [[], 503]])->with([200, 404]);

it('preserves terminal failures when a stale pending notification arrives', function (string $terminal) {
    $payment = createMidtransWebhookPayment();
    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment, ['transaction_status' => $terminal]))->assertOk();
    $snapshot = $payment->fresh()->order->getAttributes();
    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment, ['transaction_status' => 'pending']))->assertOk();

    expect($payment->fresh()->order->getAttributes())->toBe($snapshot)
        ->and($payment->fresh()->transaction_status)->toBe($terminal);
})->with(['expire', 'cancel', 'failure']);

it('does not finalize another orders reservation after a late settlement', function () {
    $payment = createMidtransWebhookPayment();
    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment, ['transaction_status' => 'expire']))->assertOk();
    ProductVariant::query()->update(['reserved_stock' => 2]);
    $this->postJson(route('payments.midtrans.notification'), midtransWebhookPayload($payment))->assertOk();

    expect($payment->fresh()->order->payment_status)->toBe('manual_review')
        ->and($payment->fresh()->transaction_status)->toBe('manual_review')
        ->and(ProductVariant::query()->pluck('reserved_stock')->all())->toBe([2, 2])
        ->and(ProductVariant::query()->pluck('stock')->all())->toBe([10, 10])
        ->and(StockLog::query()->count())->toBe(0);
});

it('retains rejected synchronization logs without financial changes', function (array $override, string $event) {
    $payment = createMidtransWebhookPayment();
    $snapshot = $payment->fresh()->getAttributes();
    Http::fake(['*/status' => Http::response(midtransWebhookPayload($payment, $override))]);

    expect(fn () => app(SyncMidtransPaymentAction::class)->execute($payment))
        ->toThrow(ValidationException::class);
    expect($payment->fresh()->getAttributes())->toBe($snapshot)
        ->and($payment->logs()->where('event_type', $event)->count())->toBe(1);
})->with([
    'reference' => [['order_id' => 'wrong-order'], 'rejected_reference_mismatch'],
    'amount' => [['gross_amount' => '1.00'], 'rejected_amount_mismatch'],
]);

it('matches the historical integer IDR amount without accepting fractional provider amounts', function () {
    $payment = createMidtransWebhookPayment();
    $payment->update(['gross_amount' => 90000.90]);
    $midtrans = app(MidtransService::class);

    expect($midtrans->amountMatches('90001.00', $payment))->toBeTrue()
        ->and($midtrans->amountMatches('90000.90', $payment))->toBeFalse()
        ->and($midtrans->amountMatches('90001.001', $payment))->toBeFalse()
        ->and($midtrans->amountMatches('not-money', $payment))->toBeFalse();
});

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
