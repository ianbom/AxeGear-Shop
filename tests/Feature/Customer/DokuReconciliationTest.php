<?php

use App\Actions\Payments\SyncDokuPaymentAction;
use App\Actions\Payments\SyncExpiredDokuPaymentsAction;
use App\Models\Notification;
use App\Models\Order;
use App\Models\Payment;
use App\Models\PaymentLog;
use App\Models\Product;
use App\Models\User;
use App\Services\Admin\OrderManagementService;
use App\Services\Admin\PaymentLogManagementService;
use App\Services\Admin\PaymentManagementService;
use App\Services\Customer\OrderService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

uses(RefreshDatabase::class);

beforeEach(function () {
    config(['services.doku.client_id' => 'test-client', 'services.doku.secret_key' => 'test-secret', 'services.doku.is_production' => false]);
    Http::preventStrayRequests();
});

function reconciliationPayment(): Payment
{
    $user = User::factory()->create();
    $order = Order::query()->create([
        'user_id' => $user->id, 'order_number' => 'ORD-'.Str::uuid(), 'customer_name' => $user->name,
        'customer_email' => $user->email, 'customer_phone' => '0800000000', 'subtotal' => 100000,
        'grand_total' => 100000, 'payment_status' => 'pending', 'order_status' => 'pending_payment', 'shipping_status' => 'not_created', 'stock_reserved_at' => now(),
    ]);
    $product = Product::query()->create(['name' => 'Sync fixture', 'slug' => 'sync-'.Str::uuid(), 'regular_price' => 50000]);
    $variant = $product->variants()->create(['sku' => $order->order_number, 'stock' => 10, 'reserved_stock' => 2]);
    $order->items()->create(['product_id' => $product->id, 'product_variant_id' => $variant->id, 'product_name' => $product->name, 'price' => 50000, 'quantity' => 2, 'subtotal' => 100000]);

    return $order->payment()->create([
        'payment_provider' => 'doku', 'payment_method' => 'qris', 'provider_reference' => $order->order_number,
        'create_request_id' => (string) Str::uuid(), 'gross_amount' => 100000, 'transaction_status' => 'pending',
        'expires_at' => now()->subMinute(), 'checkout_url' => 'https://sandbox.doku.com/pay',
    ]);
}

function reconciliationPayload(Payment $payment, string $status = 'SUCCESS'): array
{
    // Documentation-shaped status response; not a sandbox capture.
    return ['order' => ['invoice_number' => $payment->provider_reference, 'amount' => 100000], 'transaction' => ['status' => $status]];
}

it('reconciles success once and preserves paid status against later observations', function () {
    $payment = reconciliationPayment();
    Http::fake(['api-sandbox.doku.com/*' => Http::sequence()->push(reconciliationPayload($payment))->push(reconciliationPayload($payment))->push(reconciliationPayload($payment, 'FAILED'))]);
    $sync = app(SyncDokuPaymentAction::class);
    $sync->execute($payment);
    $sync->execute($payment);
    $sync->execute($payment);
    expect($payment->fresh()->transaction_status)->toBe('success')->and($payment->fresh()->last_synced_at)->not->toBeNull()
        ->and($payment->order->fresh()->payment_status)->toBe('paid')->and(Notification::count())->toBe(1)
        ->and($payment->order->items->first()->variant->fresh()->stock)->toBe(8);
});

it('reconciles a QRIS decimal JSON amount without rounding or duplicate stock changes', function () {
    $payment = reconciliationPayment();
    $body = str_replace('"amount":100000', '"amount":100000.00', json_encode(reconciliationPayload($payment), JSON_THROW_ON_ERROR));
    Http::fake(['api-sandbox.doku.com/*' => Http::response($body, 200, ['Content-Type' => 'application/json'])]);
    $sync = app(SyncDokuPaymentAction::class);
    $sync->execute($payment);
    $sync->execute($payment);

    expect($payment->fresh()->transaction_status)->toBe('success')
        ->and($payment->order->fresh()->payment_status)->toBe('paid')
        ->and($payment->order->items->first()->variant->fresh()->stock)->toBe(8)
        ->and(Notification::count())->toBe(1)
        ->and((float) $payment->fresh()->raw_response['status_lookup']['order']['amount'])->toBe(100000.0);
});

it('never releases QRIS reservations from local expiry or nonfinal provider status', function (string $status) {
    $payment = reconciliationPayment();
    Http::fake(['api-sandbox.doku.com/*' => Http::response(reconciliationPayload($payment, $status))]);
    app(SyncDokuPaymentAction::class)->execute($payment);
    expect($payment->order->fresh()->stock_released_at)->toBeNull()->and($payment->fresh()->paid_at)->toBeNull()
        ->and($payment->order->items->first()->variant->fresh()->reserved_stock)->toBe(2)
        ->and($payment->fresh()->transaction_status)->toBe('pending');
})->with(['PENDING', 'FAILED', 'UNKNOWN']);

it('reconciles transaction and order expiry from hosted QRIS status responses', function (bool $orderExpiry) {
    $payment = reconciliationPayment();
    $payload = reconciliationPayload($payment, $orderExpiry ? 'PENDING' : 'EXPIRED');
    $payload['service']['id'] = $orderExpiry ? '' : 'SCAN_CODE';
    $payload['channel']['id'] = $orderExpiry ? '' : 'QRIS';
    if ($orderExpiry) {
        $payload['order']['status'] = 'ORDER_EXPIRED';
    }
    Http::fake(['api-sandbox.doku.com/*' => Http::response($payload)]);
    app(SyncDokuPaymentAction::class)->execute($payment);
    app(SyncDokuPaymentAction::class)->execute($payment);
    expect($payment->fresh()->transaction_status)->toBe('expired')
        ->and($payment->order->fresh()->order_status)->toBe('payment_expired')
        ->and($payment->order->items->first()->variant->fresh()->reserved_stock)->toBe(0)
        ->and($payment->order->items->first()->variant->fresh()->stock)->toBe(10);
})->with([false, true]);

it('records lookup failures for review and retries them in the next batch', function (string $failure) {
    $payment = reconciliationPayment();
    Http::fake(['api-sandbox.doku.com/*' => match ($failure) {
        'timeout' => Http::failedConnection(),
        'not-found' => Http::response([], 404),
        'server' => Http::response([], 500),
        'malformed' => Http::response(['order' => []]),
    }]);
    expect(fn () => app(SyncDokuPaymentAction::class)->execute($payment))->toThrow(Exception::class);
    expect($payment->fresh()->transaction_status)->toBe('pending')->and($payment->fresh()->failure_reason)->not->toBeEmpty()
        ->and($payment->fresh()->last_synced_at)->not->toBeNull()->and($payment->order->fresh()->stock_released_at)->toBeNull()
        ->and(PaymentLog::where('event_type', 'sync_error')->count())->toBe(1);
    Http::fake(['api-sandbox.doku.com/*' => Http::response(reconciliationPayload($payment))]);
    // A fresh HTTP factory avoids previously registered fake callbacks taking precedence.
    Http::swap(new Factory);
    Http::preventStrayRequests();
    Http::fake(['api-sandbox.doku.com/*' => Http::response(reconciliationPayload($payment))]);
    $this->travel(61)->seconds();
    expect(app(SyncExpiredDokuPaymentsAction::class)->execute())->toBe(['checked' => 1, 'synced' => 1, 'failed' => 0]);
    expect($payment->fresh()->transaction_status)->toBe('success');
})->with(['timeout', 'not-found', 'server', 'malformed']);

it('rejects mismatched reconciliation facts with a safe audit record', function (array $facts) {
    $payment = reconciliationPayment();
    $payload = array_replace_recursive(reconciliationPayload($payment), $facts, ['secret' => 'never-expose']);
    Http::fake(['api-sandbox.doku.com/*' => Http::response($payload)]);
    expect(fn () => app(SyncDokuPaymentAction::class)->execute($payment))->toThrow(ValidationException::class);
    expect($payment->fresh()->paid_at)->toBeNull()->and($payment->fresh()->transaction_status)->toBe('pending')
        ->and(json_encode(PaymentLog::all()->toArray()))->not->toContain('never-expose');
})->with([
    [['order' => ['invoice_number' => 'wrong']]], [['order' => ['amount' => 1]]],
    [['order' => ['currency' => 'USD']]], [['service' => ['id' => 'VIRTUAL_ACCOUNT']]],
]);

it('blocks direct customer cancellation without contacting DOKU or releasing stock', function (string $status) {
    $payment = reconciliationPayment();
    $payment->update(['transaction_status' => $status]);
    $payment->order->update(['payment_status' => $status]);
    $this->actingAs($payment->order->user)->postJson(route('order.cancel', $payment->order))->assertUnprocessable();
    expect($payment->order->fresh()->stock_released_at)->toBeNull()->and($payment->order->fresh()->cancelled_at)->toBeNull();
    Http::assertNothingSent();
})->with(['pending']);

it('keeps cancellation owner scoped', function () {
    $payment = reconciliationPayment();
    $this->actingAs(User::factory()->create())->postJson(route('order.cancel', $payment->order))->assertNotFound();
    Http::assertNothingSent();
});

it('projects only resumable customer URLs and redacts admin payment payloads', function () {
    $payment = reconciliationPayment();
    $payment->update(['expires_at' => now()->addMinutes(30), 'raw_response' => ['token' => 'never-expose']]);
    $log = $payment->logs()->create(['order_id' => $payment->order_id, 'provider' => 'doku', 'event_type' => 'test', 'payload' => ['token' => 'never-expose', ...reconciliationPayload($payment)]]);
    $request = Request::create('/my-order');
    $request->setUserResolver(fn () => $payment->order->user);
    $customer = app(OrderService::class)->detailData($request, $payment->order);
    expect($customer['order']['payment']['checkout_url'])->toBe($payment->checkout_url);
    $payment->update(['expires_at' => now()->subMinute()]);
    expect(app(OrderService::class)->detailData($request, $payment->order)['order']['payment']['checkout_url'])->toBeNull();
    $admin = app(PaymentManagementService::class)->detailData($payment);
    $order = app(OrderManagementService::class)->detailData($payment->order()->firstOrFail());
    $logs = app(PaymentLogManagementService::class)->detailData($log);
    expect(json_encode([$customer, $admin, $order, $logs]))->not->toContain('never-expose');
    expect(app(PaymentManagementService::class)->indexData($request)['stats']['pending'])->toBe(1);
});

it('ignores forged finish status for an existing payment', function () {
    $payment = reconciliationPayment();
    $this->actingAs($payment->order->user)->get(route('payments.doku.finish', ['invoice_number' => $payment->provider_reference, 'transaction_status' => 'SUCCESS']))->assertRedirect(route('my-order'));
    expect($payment->fresh()->paid_at)->toBeNull()->and($payment->order->fresh()->payment_status)->toBe('pending');
});

it('shares the automatic lookup cooldown between customer detail and scheduler', function () {
    $payment = reconciliationPayment();
    Http::fake(['api-sandbox.doku.com/*' => Http::response(reconciliationPayload($payment, 'PENDING'))]);
    $request = Request::create('/my-order/'.$payment->order_id);
    $request->setUserResolver(fn () => $payment->order->user);
    $service = app(OrderService::class);
    expect($service->detailData($request, $payment->order)['order']['payment_status'])->toBe('pending');
    $service->detailData($request, $payment->order);
    expect(app(SyncExpiredDokuPaymentsAction::class)->execute()['synced'])->toBe(0);
    Http::assertSentCount(1);
    $this->travel(61)->seconds();
    expect(app(SyncExpiredDokuPaymentsAction::class)->execute()['synced'])->toBe(1);
    Http::assertSentCount(2);
});

it('keeps customer detail usable on provider failure and throttles retries', function () {
    $payment = reconciliationPayment();
    Http::fake(['api-sandbox.doku.com/*' => Http::failedConnection()]);
    $request = Request::create('/my-order/'.$payment->order_id);
    $request->setUserResolver(fn () => $payment->order->user);
    $service = app(OrderService::class);
    expect($service->detailData($request, $payment->order)['order']['payment_status'])->toBe('pending');
    $service->detailData($request, $payment->order);
    expect(PaymentLog::where('event_type', 'sync_error')->count())->toBe(1)
        ->and($payment->order->fresh()->stock_released_at)->toBeNull();
});

it('does not query DOKU for another customers order', function () {
    $payment = reconciliationPayment();
    $this->actingAs(User::factory()->create())->get('/my-order/'.$payment->order_id)->assertNotFound();
    Http::assertNothingSent();
});

it('rejects VA status responses for a QRIS payment', function (string $channel) {
    $payment = reconciliationPayment();
    $payload = [...reconciliationPayload($payment), 'service' => ['id' => 'VIRTUAL_ACCOUNT'], 'channel' => ['id' => $channel]];
    Http::fake(['api-sandbox.doku.com/*' => Http::response($payload)]);
    expect(fn () => app(SyncDokuPaymentAction::class)->execute($payment))->toThrow(ValidationException::class);
    expect($payment->order->fresh()->payment_status)->toBe('pending')
        ->and($payment->order->items->first()->variant->fresh()->reserved_stock)->toBe(2);
})->with(['VIRTUAL_ACCOUNT_BCA', 'VIRTUAL_ACCOUNT_BTN', 'VIRTUAL_ACCOUNT_BNC']);
