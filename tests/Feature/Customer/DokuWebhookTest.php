<?php

use App\Models\Notification;
use App\Models\Order;
use App\Models\Payment;
use App\Models\PaymentLog;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\StockLog;
use App\Models\User;
use App\Models\Voucher;
use App\Services\Admin\OrderManagementService;
use App\Services\Admin\ShipmentManagementService;
use App\Services\Notifications\NotificationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

beforeEach(function () {
    config(['services.doku.client_id' => 'test-client', 'services.doku.secret_key' => 'test-secret']);
    Http::preventStrayRequests();
});

function createDokuPayment(array $reservedStocks = [2, 2]): Payment
{
    $user = User::factory()->create();
    $order = Order::query()->create([
        'user_id' => $user->id, 'order_number' => 'ORD-'.Str::uuid(),
        'customer_name' => $user->name, 'customer_email' => $user->email,
        'customer_phone' => '0800000000', 'subtotal' => 102000, 'grand_total' => 102000,
        'payment_status' => 'pending', 'order_status' => 'pending_payment', 'stock_reserved_at' => now(),
    ]);
    $product = Product::query()->create(['name' => 'QRIS fixture', 'slug' => 'qris-'.Str::uuid(), 'regular_price' => 25500]);
    foreach ($reservedStocks as $index => $reserved) {
        $variant = $product->variants()->create(['sku' => $order->order_number.'-'.$index, 'stock' => 10, 'reserved_stock' => $reserved]);
        $order->items()->create(['product_id' => $product->id, 'product_variant_id' => $variant->id, 'product_name' => $product->name, 'price' => 25500, 'quantity' => 2, 'subtotal' => 51000]);
    }

    return $order->payment()->create([
        'payment_provider' => 'doku', 'payment_method' => 'qris', 'provider_reference' => $order->order_number,
        'create_request_id' => (string) Str::uuid(), 'transaction_status' => 'pending', 'gross_amount' => 102000,
        'expires_at' => now()->addMinutes(30), 'checkout_url' => 'https://sandbox.doku.com/checkout-link-v2/fixture',
    ]);
}

function dokuPayload(Payment $payment, array $overrides = []): array
{
    // Documentation-shaped synthetic notification, not a sandbox capture.
    return array_replace_recursive([
        'order' => ['invoice_number' => $payment->provider_reference, 'amount' => 102000, 'currency' => 'IDR'],
        'service' => ['id' => 'QRIS'], 'channel' => ['id' => 'QRIS_DOKU'],
        'transaction' => ['status' => 'SUCCESS'],
    ], $overrides);
}

function dokuHeaders(string $body, string $id = 'notification-1', string $target = '/api/payments/doku/notification'): array
{
    $timestamp = '2026-11-04T00:00:00Z';
    $canonical = "Client-Id:test-client\nRequest-Id:{$id}\nRequest-Timestamp:{$timestamp}\nRequest-Target:{$target}\nDigest:".base64_encode(hash('sha256', $body, true));

    return ['CONTENT_TYPE' => 'application/json', 'HTTP_CLIENT_ID' => 'test-client', 'HTTP_REQUEST_ID' => $id, 'HTTP_REQUEST_TIMESTAMP' => $timestamp, 'HTTP_SIGNATURE' => 'HMACSHA256='.base64_encode(hash_hmac('sha256', $canonical, 'test-secret', true))];
}

function sendDokuNotification($test, Payment $payment, array $overrides = [], string $id = 'notification-1')
{
    $body = json_encode(dokuPayload($payment, $overrides), JSON_THROW_ON_ERROR);

    return $test->call('POST', '/api/payments/doku/notification', [], [], [], dokuHeaders($body, $id), $body);
}

it('applies DOKU success once across duplicate bodies and request ids', function () {
    $payment = createDokuPayment();
    sendDokuNotification($this, $payment, ['extra' => ['token' => 'never-store']])->assertOk();
    $payment->order->update(['order_status' => 'shipped']);
    sendDokuNotification($this, $payment, ['extra' => ['token' => 'never-store']])->assertOk();
    sendDokuNotification($this, $payment, ['extra' => ['token' => 'never-store']], 'notification-2')->assertOk();

    expect($payment->fresh()->transaction_status)->toBe('success')
        ->and($payment->fresh()->paid_at)->not->toBeNull()
        ->and($payment->order->fresh()->payment_status)->toBe('paid')
        ->and($payment->order->fresh()->order_status)->toBe('shipped')
        ->and(ProductVariant::query()->pluck('stock')->all())->toBe([8, 8])
        ->and(StockLog::query()->count())->toBe(2)
        ->and(Notification::query()->count())->toBe(1)
        ->and(json_encode(PaymentLog::all()->toArray()))->not->toContain('never-store');
    Http::assertNothingSent();
});

it('settles a pending QRIS payment from a signed decimal JSON notification exactly once', function () {
    $payment = createDokuPayment();
    $payment->update(['failure_reason' => 'Previous amount validation rejected']);
    $body = str_replace('"amount":102000', '"amount":102000.00', json_encode(dokuPayload($payment), JSON_THROW_ON_ERROR));
    expect(json_decode($body, true)['order']['amount'])->toBe(102000.0);

    foreach (['decimal-notification', 'decimal-notification', 'decimal-retry'] as $id) {
        $this->call('POST', '/api/payments/doku/notification', [], [], [], dokuHeaders($body, $id), $body)->assertOk();
    }

    expect($payment->fresh()->transaction_status)->toBe('success')
        ->and($payment->fresh()->failure_reason)->toBeNull()
        ->and($payment->fresh()->paid_at)->not->toBeNull()
        ->and($payment->order->fresh()->payment_status)->toBe('paid')
        ->and($payment->order->fresh()->order_status)->toBe('paid')
        ->and(ProductVariant::query()->pluck('stock')->all())->toBe([8, 8])
        ->and(ProductVariant::query()->pluck('reserved_stock')->all())->toBe([0, 0])
        ->and(StockLog::count())->toBe(2)
        ->and(Notification::count())->toBe(1)
        ->and(PaymentLog::where('event_type', 'payment_notification')->count())->toBe(2)
        ->and((float) $payment->fresh()->raw_response['notification']['order']['amount'])->toBe(102000.0);
    Http::assertNothingSent();
});

it('rejects unauthenticated raw bodies before mutation', function (string $tamper) {
    $payment = createDokuPayment();
    $body = json_encode(dokuPayload($payment));
    $headers = dokuHeaders($body);
    match ($tamper) {
        'body' => $body .= ' ',
        'client' => $headers['HTTP_CLIENT_ID'] = 'other',
        'signature' => $headers['HTTP_SIGNATURE'] = 'bad',
        'missing' => $headers['HTTP_REQUEST_ID'] = '',
        'target' => $headers = dokuHeaders($body, target: '/checkout/v1/payment'),
    };
    $this->call('POST', '/api/payments/doku/notification', [], [], [], $headers, $body)->assertForbidden();
    expect($payment->fresh()->transaction_status)->toBe('pending')->and(PaymentLog::count())->toBe(0)->and(StockLog::count())->toBe(0);
})->with(['body', 'client', 'signature', 'missing', 'target']);

it('rejects signed malformed JSON', function () {
    $body = '{"order":';
    $this->call('POST', '/api/payments/doku/notification', [], [], [], dokuHeaders($body), $body)->assertStatus(422);
    expect(PaymentLog::count())->toBe(0);
});

it('rejects mismatched DOKU payment facts without changing reservations', function (array $overrides) {
    $payment = createDokuPayment();
    sendDokuNotification($this, $payment, $overrides)->assertStatus(422);
    expect($payment->fresh()->paid_at)->toBeNull()->and($payment->order->fresh()->payment_status)->toBe('pending')
        ->and(ProductVariant::query()->pluck('reserved_stock')->all())->toBe([2, 2]);
    sendDokuNotification($this, $payment, $overrides)->assertStatus(422);
    expect(PaymentLog::where('event_type', 'notification_rejected')->count())->toBe(1)
        ->and(PaymentLog::whereNotNull('notification_request_id')->count())->toBe(0);
    sendDokuNotification($this, $payment)->assertOk();
    expect($payment->fresh()->transaction_status)->toBe('success');
    Http::assertNothingSent();
})->with([
    [['order' => ['amount' => '102000.01']]],
    [['order' => ['amount' => 102000.01]]],
    [['order' => ['amount' => 102001.0]]],
    [['order' => ['currency' => 'USD']]],
    [['service' => ['id' => 'VIRTUAL_ACCOUNT']]],
    [['channel' => ['id' => 'BCA']]],
    [['transaction' => ['status' => []]]],
]);

it('rejects an unknown invoice without applying success', function () {
    $payment = createDokuPayment();
    sendDokuNotification($this, $payment, ['order' => ['invoice_number' => 'unknown']])->assertNotFound();
    expect($payment->fresh()->paid_at)->toBeNull()->and(StockLog::count())->toBe(0);
});

it('audits request id conflicts without applying a different event', function () {
    $payment = createDokuPayment();
    sendDokuNotification($this, $payment, ['transaction' => ['status' => 'PENDING']])->assertOk();
    sendDokuNotification($this, $payment)->assertStatus(409);
    expect($payment->fresh()->paid_at)->toBeNull()->and(PaymentLog::where('event_type', 'notification_conflict')->count())->toBe(1);
});

it('retains reservations for failed attempts unknown status and unproven expiry', function (string $status) {
    $payment = createDokuPayment();
    $payment->update(['expires_at' => now()->subDay()]);
    sendDokuNotification($this, $payment, ['transaction' => ['status' => $status]])->assertOk();
    expect($payment->fresh()->transaction_status)->toBe('pending')
        ->and($payment->order->fresh()->payment_status)->toBe('pending')
        ->and($payment->order->fresh()->stock_released_at)->toBeNull()
        ->and(ProductVariant::query()->pluck('reserved_stock')->all())->toBe([2, 2]);
})->with(['FAILED', 'NOT_FOUND', 'REFUNDED']);

it('expires QRIS and releases stock and voucher reservations exactly once', function (string $service, string $channel) {
    $payment = createDokuPayment();
    $voucher = Voucher::query()->create(['code' => 'EXPIRE10', 'name' => 'Expiry voucher', 'discount_type' => 'percentage', 'discount_value' => 10, 'used_count' => 1]);
    $payment->order->update(['voucher_id' => $voucher->id]);
    $overrides = ['service' => ['id' => $service], 'channel' => ['id' => $channel], 'transaction' => ['status' => 'EXPIRED']];
    sendDokuNotification($this, $payment, $overrides)->assertOk();
    $expiredAt = $payment->fresh()->expired_at;
    sendDokuNotification($this, $payment, $overrides)->assertOk();
    sendDokuNotification($this, $payment, $overrides, 'expired-again')->assertOk();

    expect($payment->fresh()->transaction_status)->toBe('expired')
        ->and($payment->fresh()->expired_at)->toEqual($expiredAt)
        ->and($payment->fresh()->expired_at)->not->toBeNull()
        ->and($payment->order->fresh()->payment_status)->toBe('expired')
        ->and($payment->order->fresh()->order_status)->toBe('payment_expired')
        ->and($payment->order->fresh()->expired_at)->not->toBeNull()
        ->and(ProductVariant::query()->pluck('reserved_stock')->all())->toBe([0, 0])
        ->and(ProductVariant::query()->pluck('stock')->all())->toBe([10, 10])
        ->and($voucher->fresh()->used_count)->toBe(0);
    Http::assertNothingSent();
})->with([['QRIS', 'QRIS_DOKU'], ['SCAN_CODE', 'QRIS']]);

it('verifies sparse expiry notifications through the authenticated status API', function (string $providerStatus) {
    $payment = createDokuPayment();
    Http::fake(['api-sandbox.doku.com/*' => Http::response(dokuPayload($payment, ['transaction' => ['status' => $providerStatus], 'service' => ['id' => 'SCAN_CODE'], 'channel' => ['id' => 'QRIS']]))]);
    $body = json_encode(['order' => ['invoice_number' => $payment->provider_reference, 'status' => 'ORDER_EXPIRED']], JSON_THROW_ON_ERROR);
    foreach ([1, 2] as $_) {
        $this->call('POST', '/api/payments/doku/notification', [], [], [], dokuHeaders($body), $body)->assertOk();
    }
    expect($payment->fresh()->transaction_status)->toBe($providerStatus === 'SUCCESS' ? 'success' : 'expired')
        ->and($payment->order->fresh()->payment_status)->toBe($providerStatus === 'SUCCESS' ? 'paid' : 'expired');
    Http::assertSentCount(1);
})->with(['EXPIRED', 'SUCCESS']);

it('retains reservations when sparse expiry lookup is still pending', function () {
    $payment = createDokuPayment();
    Http::fake(['api-sandbox.doku.com/*' => Http::response(dokuPayload($payment, ['transaction' => ['status' => 'PENDING']]))]);
    $body = json_encode(['order' => ['invoice_number' => $payment->provider_reference, 'status' => 'ORDER_EXPIRED']], JSON_THROW_ON_ERROR);
    $this->call('POST', '/api/payments/doku/notification', [], [], [], dokuHeaders($body), $body)->assertOk();
    expect($payment->fresh()->transaction_status)->toBe('pending')
        ->and(ProductVariant::query()->pluck('reserved_stock')->all())->toBe([2, 2]);
});

it('accepts the sandbox captured expiry shape without service or channel', function () {
    $payment = createDokuPayment();
    $transactionLevel = DB::transactionLevel();
    Http::fake(function () use ($payment, $transactionLevel) {
        expect(DB::transactionLevel())->toBe($transactionLevel);

        return Http::response(dokuPayload($payment, ['transaction' => ['status' => 'EXPIRED'], 'service' => ['id' => 'SCAN_CODE'], 'channel' => ['id' => 'QRIS']]));
    });
    $body = json_encode([
        'order' => ['invoice_number' => $payment->provider_reference, 'amount' => 102000, 'currency' => 'IDR', 'status' => 'EXPIRED'],
        'transaction' => ['status' => 'EXPIRED', 'date' => '2026-11-10T10:57:39Z'],
    ], JSON_THROW_ON_ERROR);
    $this->call('POST', '/api/payments/doku/notification', [], [], [], dokuHeaders($body), $body)->assertOk();
    expect($payment->fresh()->transaction_status)->toBe('expired')
        ->and($payment->order->fresh()->payment_status)->toBe('expired');
    Http::assertSentCount(1);
});

it('rejects supplied mismatches in sparse expiry even with a valid lookup', function (array $facts) {
    $payment = createDokuPayment();
    Http::fake(['api-sandbox.doku.com/*' => Http::response(dokuPayload($payment, ['transaction' => ['status' => 'EXPIRED']]))]);
    $body = json_encode(array_replace_recursive(['order' => ['invoice_number' => $payment->provider_reference, 'status' => 'ORDER_EXPIRED']], $facts), JSON_THROW_ON_ERROR);
    $this->call('POST', '/api/payments/doku/notification', [], [], [], dokuHeaders($body), $body)->assertUnprocessable();
    expect($payment->fresh()->transaction_status)->toBe('pending')
        ->and(ProductVariant::query()->pluck('reserved_stock')->all())->toBe([2, 2])
        ->and(PaymentLog::where('event_type', 'payment_notification')->count())->toBe(0);
})->with([
    [['order' => ['amount' => 1]]], [['order' => ['currency' => 'USD']]],
    [['service' => ['id' => 'VIRTUAL_ACCOUNT']]], [['channel' => ['id' => 'VIRTUAL_ACCOUNT_BCA']]],
]);

it('records late success after expiry without fulfilling released stock', function () {
    $payment = createDokuPayment();
    sendDokuNotification($this, $payment, ['transaction' => ['status' => 'EXPIRED']])->assertOk();
    sendDokuNotification($this, $payment, [], 'late-success')->assertOk();
    expect($payment->fresh()->transaction_status)->toBe('success')
        ->and($payment->order->fresh()->payment_status)->toBe('paid')
        ->and($payment->order->fresh()->order_status)->toBe('payment_expired')
        ->and($payment->fresh()->failure_reason)->not->toBeNull()
        ->and(app(ShipmentManagementService::class)->canCreateShipment($payment->order->fresh(), null))->toBeFalse()
        ->and(ProductVariant::query()->pluck('stock')->all())->toBe([10, 10]);
});

it('prioritizes transaction success over an expired checkout order', function () {
    $payment = createDokuPayment();
    sendDokuNotification($this, $payment, ['order' => ['status' => 'ORDER_EXPIRED']])->assertOk();
    expect($payment->fresh()->transaction_status)->toBe('success')
        ->and($payment->order->fresh()->stock_released_at)->toBeNull();
});

it('requests a retry when sparse expiry cannot be verified', function (bool $connectionFailure) {
    $payment = createDokuPayment();
    Http::fake(['api-sandbox.doku.com/*' => $connectionFailure ? Http::failedConnection() : Http::response([], 503)]);
    $body = json_encode(['order' => ['invoice_number' => $payment->provider_reference, 'status' => 'ORDER_EXPIRED']], JSON_THROW_ON_ERROR);
    $this->call('POST', '/api/payments/doku/notification', [], [], [], dokuHeaders($body), $body)->assertStatus(503);
    expect($payment->fresh()->transaction_status)->toBe('pending')
        ->and($payment->order->fresh()->stock_released_at)->toBeNull()
        ->and(PaymentLog::where('event_type', 'payment_notification')->count())->toBe(0);
})->with([false, true]);

it('never downgrades money evidence after success', function (string $status) {
    $payment = createDokuPayment();
    sendDokuNotification($this, $payment)->assertOk();
    sendDokuNotification($this, $payment, ['transaction' => ['status' => $status]], 'late-event')->assertOk();
    expect($payment->fresh()->transaction_status)->toBe('success')->and($payment->order->fresh()->payment_status)->toBe('paid')->and(Notification::count())->toBe(1);
})->with(['PENDING', 'FAILED', 'EXPIRED']);

it('preserves paid status when a later signed notification contains mismatched amounts', function () {
    $payment = createDokuPayment();
    sendDokuNotification($this, $payment)->assertOk();
    sendDokuNotification($this, $payment, ['order' => ['amount' => '1']], 'invalid-late-event')->assertStatus(422);

    expect($payment->fresh()->transaction_status)->toBe('success')
        ->and($payment->order->fresh()->payment_status)->toBe('paid')
        ->and(PaymentLog::where('event_type', 'notification_rejected')->count())->toBe(1)
        ->and(ProductVariant::query()->pluck('stock')->all())->toBe([8, 8])
        ->and(Notification::count())->toBe(1);
});

it('preserves received money when stock cannot be finalized', function (bool $released) {
    $payment = createDokuPayment($released ? [0, 0] : [2, 0]);
    if ($released) {
        $payment->update(['transaction_status' => 'failed']);
        $payment->order->update(['stock_released_at' => now(), 'payment_status' => 'failed', 'order_status' => 'payment_failed']);
    }
    sendDokuNotification($this, $payment)->assertOk();
    sendDokuNotification($this, $payment, [], 'repeated-success')->assertOk();
    expect($payment->fresh()->paid_at)->not->toBeNull()
        ->and($payment->order->fresh()->paid_at)->not->toBeNull()
        ->and($payment->order->fresh()->payment_status)->toBe('paid')
        ->and($payment->fresh()->transaction_status)->toBe('success')
        ->and($payment->order->fresh()->order_status)->toBe($released ? 'payment_failed' : 'paid')
        ->and($payment->fresh()->failure_reason)->not->toBeNull()
        ->and(app(OrderManagementService::class)->allowedStatuses($payment->order->fresh()))->toBe([])
        ->and(app(ShipmentManagementService::class)->canCreateShipment($payment->order->fresh(), null))->toBeFalse()
        ->and(ProductVariant::query()->pluck('stock')->all())->toBe([10, 10])
        ->and(StockLog::count())->toBe(0);
})->with([false, true]);

it('rolls back the dedupe record and all effects when processing fails so retry works', function () {
    $payment = createDokuPayment();
    $this->mock(NotificationService::class)->shouldReceive('forOrder')->once()->andThrow(new RuntimeException('temporary storage failure'));
    sendDokuNotification($this, $payment)->assertStatus(500);
    expect($payment->fresh()->paid_at)->toBeNull()->and(PaymentLog::count())->toBe(0)
        ->and(ProductVariant::query()->pluck('stock')->all())->toBe([10, 10])->and(StockLog::count())->toBe(0);
    app()->forgetInstance(NotificationService::class);
    sendDokuNotification($this, $payment)->assertOk();
    expect($payment->fresh()->transaction_status)->toBe('success')->and(PaymentLog::count())->toBe(1)->and(Notification::count())->toBe(1);
});

it('rejects VA notifications without changing the QRIS payment or stock', function (string $channel) {
    $payment = createDokuPayment();
    $overrides = ['service' => ['id' => 'VIRTUAL_ACCOUNT'], 'channel' => ['id' => $channel]];
    sendDokuNotification($this, $payment, $overrides)->assertUnprocessable();
    sendDokuNotification($this, $payment, $overrides)->assertUnprocessable();
    expect($payment->fresh()->transaction_status)->toBe('pending')
        ->and($payment->fresh()->paid_at)->toBeNull()
        ->and(ProductVariant::query()->pluck('reserved_stock')->all())->toBe([2, 2])
        ->and(PaymentLog::where('event_type', 'notification_rejected')->count())->toBe(1);
    sendDokuNotification($this, $payment)->assertOk();
    expect($payment->order->fresh()->payment_status)->toBe('paid');
})->with(['VIRTUAL_ACCOUNT_BCA', 'VIRTUAL_ACCOUNT_BTN', 'VIRTUAL_ACCOUNT_BNC']);
