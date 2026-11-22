<?php

use App\Models\Order;
use App\Models\Payment;
use App\Services\Integrations\DokuService;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

beforeEach(function () {
    config(['services.doku.client_id' => 'test-client', 'services.doku.secret_key' => 'test-secret', 'services.doku.is_production' => false]);
    Http::preventStrayRequests();
});

dataset('va channels', [
    ['va_bca', 'VIRTUAL_ACCOUNT_BCA'],
    ['va_mandiri', 'VIRTUAL_ACCOUNT_BANK_MANDIRI'],
    ['va_bni', 'VIRTUAL_ACCOUNT_BNI'],
    ['va_bri', 'VIRTUAL_ACCOUNT_BRI'],
    ['va_bsi', 'VIRTUAL_ACCOUNT_BANK_SYARIAH_MANDIRI'],
    ['va_permata', 'VIRTUAL_ACCOUNT_BANK_PERMATA'],
    ['va_cimb', 'VIRTUAL_ACCOUNT_BANK_CIMB'],
    ['va_danamon', 'VIRTUAL_ACCOUNT_BANK_DANAMON'],
    ['va_btn', 'VIRTUAL_ACCOUNT_BTN'],
    ['va_bnc', 'VIRTUAL_ACCOUNT_BNC'],
]);

it('accepts the staging checkout URL returned by the sandbox API only in sandbox', function () {
    $url = 'https://staging.doku.com/checkout-link-v2/fixture';
    Http::fake(['*' => Http::response(['response' => [
        'order' => ['invoice_number' => 'INV-STAGING', 'amount' => '125000'],
        'payment' => ['url' => $url, 'expired_date' => now()->addMinutes(30)->setTimezone('Asia/Jakarta')->format('YmdHis')],
    ]])]);
    $service = app(DokuService::class);
    expect($service->createCheckout(new Order(['order_number' => 'INV-STAGING', 'grand_total' => 125000]), 'request-staging', 30, 'qris')['checkout_url'])->toBe($url);
    config(['services.doku.is_production' => true]);
    expect($service->checkoutUrlIsValid($url))->toBeFalse();
});

it('rejects untrusted checkout hosts and URLs', function (string $url) {
    expect(app(DokuService::class)->checkoutUrlIsValid($url))->toBeFalse();
})->with([
    'https://staging.doku.com.evil.example/pay',
    'https://evil.example/pay',
    'http://staging.doku.com/pay',
    'https://user:password@staging.doku.com/pay',
    'https://staging.doku.com:8443/pay',
    'https://api-sandbox.doku.com/pay',
]);

it('rejects every VA method before contacting DOKU', function (string $method, string $channel) {
    expect(fn () => app(DokuService::class)->createCheckout(new Order(['order_number' => 'INV-VA', 'grand_total' => 125000]), 'request-va', 30, $method))->toThrow(ValidationException::class);
    Http::assertNothingSent();
})->with('va channels');

it('uses the configured environment for QRIS checkout and status lookup', function (bool $production, string $apiHost, string $checkoutHost) {
    config(['services.doku.is_production' => $production]);
    $url = 'https://'.$checkoutHost.'/checkout-link-v2/test';
    Http::fake([
        $apiHost.'/checkout/v1/payment' => Http::response(['response' => [
            'order' => ['invoice_number' => 'INV-MODE', 'amount' => 125000],
            'payment' => ['url' => $url, 'expired_date' => now()->addMinutes(30)->setTimezone('Asia/Jakarta')->format('YmdHis')],
        ]]),
        $apiHost.'/orders/v1/status/INV-MODE' => Http::response(['order' => ['invoice_number' => 'INV-MODE', 'amount' => 125000], 'transaction' => ['status' => 'SUCCESS']]),
    ]);
    $service = app(DokuService::class);
    expect($service->createCheckout(new Order(['order_number' => 'INV-MODE', 'grand_total' => 125000]), 'request-mode', 30, 'qris')['checkout_url'])->toBe($url);
    expect($service->findTransactionStatus('INV-MODE')['transaction']['status'])->toBe('SUCCESS')
        ->and($service->checkoutUrlIsValid('https://'.($production ? 'sandbox.doku.com' : 'jokul.doku.com').'/pay'))->toBeFalse();
    Http::assertSentCount(2);
    Http::assertSent(fn ($request) => $request->url() === 'https://'.$apiHost.'/checkout/v1/payment'
        && $request['payment']['payment_method_types'] === ['QRIS']
        && $request->header('Client-Id') === ['test-client']);
})->with([[false, 'api-sandbox.doku.com', 'sandbox.doku.com'], [true, 'api.doku.com', 'jokul.doku.com']]);

it('rejects unlisted methods before contacting DOKU', function () {
    expect(fn () => app(DokuService::class)->createCheckout(new Order(['order_number' => 'INV-1', 'grand_total' => 125000]), 'request-1', 30, 'credit_card'))->toThrow(ValidationException::class);
    Http::assertNothingSent();
});

it('signs exact checkout bytes and restricts the hosted page to QRIS', function () {
    $this->travelTo(CarbonImmutable::parse('2026-11-04T00:00:00Z'));
    Http::fake(['api-sandbox.doku.com/*' => Http::response(['response' => [
        'order' => ['invoice_number' => 'INV-1', 'amount' => 125000],
        'payment' => ['url' => 'https://sandbox.doku.com/checkout-link-v2/documentation-fixture', 'expired_date' => '20261104073000'],
    ]])]);
    $result = app(DokuService::class)->createCheckout(new Order(['order_number' => 'INV-1', 'grand_total' => 125000, 'customer_name' => 'Test', 'customer_email' => 'test@example.test']), 'request-1', 30, 'qris');
    expect($result['checkout_url'])->toBe('https://sandbox.doku.com/checkout-link-v2/documentation-fixture')
        ->and($result['expires_at']->utc()->format('Y-m-d H:i:s'))->toBe('2026-11-04 00:30:00');
    Http::assertSent(function ($request) {
        $canonical = "Client-Id:test-client\nRequest-Id:request-1\nRequest-Timestamp:2026-11-04T00:00:00Z\nRequest-Target:/checkout/v1/payment\nDigest:".base64_encode(hash('sha256', $request->body(), true));

        return $request['payment']['payment_method_types'] === ['QRIS']
            && $request['payment']['payment_due_date'] === 30
            && $request['order']['auto_redirect'] === true
            && $request['order']['amount'] === 125000
            && $request->header('Signature')[0] === 'HMACSHA256='.base64_encode(hash_hmac('sha256', $canonical, 'test-secret', true));
    });
});

it('authenticates notification raw bytes with an independent known answer', function () {
    // Documentation-shaped synthetic payload; known answer generated with Node crypto.
    $body = '{"order":{"invoice_number":"INV-1","amount":125000},"service":{"id":"QRIS"},"transaction":{"status":"SUCCESS"}}';
    $headers = ['Client-Id' => 'test-client', 'Request-Id' => 'request-1', 'Request-Timestamp' => '2026-11-04T00:00:00Z'];
    $headers['Signature'] = 'HMACSHA256=0ZRIITz83P31r26qvYkznOlEeh9lFig0ZUYu6UyW/N4=';
    $client = app(DokuService::class);
    expect($client->validateNotificationSignature($body, $headers, '/api/payments/doku/notification'))->toBeTrue()
        ->and($client->validateNotificationSignature($body.' ', $headers, '/api/payments/doku/notification'))->toBeFalse()
        ->and($client->validateNotificationSignature($body, $headers, '/checkout/v1/payment'))->toBeFalse()
        ->and($client->validateNotificationSignature($body, [...$headers, 'Client-Id' => 'other'], '/api/payments/doku/notification'))->toBeFalse();
});

it('compares only exact positive whole IDR amounts', function ($amount, $matches) {
    expect(app(DokuService::class)->amountMatches(new Payment(['gross_amount' => '125000.00']), $amount))->toBe($matches);
})->with([[125000, true], [125000.0, true], ['125000.00', true], ['125000.01', false], [125000.01, false], [125001.0, false], [0.0, false], [-125000.0, false], [INF, false], [NAN, false], [1000000000000.0, false], ['1.25e5', false], [true, false], [null, false], [125001, false], [0, false]]);

it('preserves finite decimal amounts in the safe DOKU audit payload', function () {
    $service = app(DokuService::class);
    expect($service->auditPayload(['order' => ['amount' => 125000.0], 'secret' => 'never-store']))
        ->toBe(['order' => ['amount' => 125000.0]])
        ->and($service->auditPayload(['order' => ['amount' => INF]]))->toBe([]);
});

it('enforces the twelve digit limit on whole decimal IDR amounts', function (string $grossAmount, float $amount, bool $matches) {
    expect(app(DokuService::class)->amountMatches(new Payment(['gross_amount' => $grossAmount]), $amount))->toBe($matches);
})->with([['1.00', 1.0, true], ['999999999999.00', 999999999999.0, true], ['1000000000000.00', 1000000000000.0, false]]);

it('rejects invalid checkout amounts or durations before HTTP', function ($amount, $minutes) {
    app(DokuService::class)->createCheckout(new Order(['order_number' => 'INV-1', 'grand_total' => $amount]), 'request-1', $minutes, 'qris');
})->with([['0', 30], ['1.5', 30], ['1000000000000', 30], ['1', 0], ['1', 10081]])->throws(ValidationException::class);

it('does not treat malformed checkout responses as definitive rejection', function ($payment) {
    Http::fake(['*' => Http::response(['response' => ['order' => ['invoice_number' => 'INV-1'], 'payment' => $payment]])]);
    app(DokuService::class)->createCheckout(new Order(['order_number' => 'INV-1', 'grand_total' => 125000]), 'request-1', 30, 'qris');
})->with([
    [['url' => 'https://evil.example/checkout', 'expired_date' => '20261104073000']],
    [['url' => 'http://sandbox.doku.com/checkout', 'expired_date' => '20261104073000']],
    [['url' => 'https://sandbox.doku.com/checkout', 'expired_date' => '20260230073000']],
])->throws(RuntimeException::class);

it('signs GET without digest and preserves ambiguous not found errors', function () {
    $this->travelTo(CarbonImmutable::parse('2026-11-04T00:00:00Z'));
    Http::fake(['*' => Http::sequence()->push(['order' => ['invoice_number' => 'INV-1', 'amount' => 125000], 'transaction' => ['status' => 'SUCCESS']])->push(['message' => 'not found'], 404)]);
    expect(app(DokuService::class)->findTransactionStatus('INV-1')['transaction']['status'])->toBe('SUCCESS');
    Http::assertSent(function ($request) {
        $canonical = 'Client-Id:test-client'."\nRequest-Id:".$request->header('Request-Id')[0]."\nRequest-Timestamp:2026-11-04T00:00:00Z\nRequest-Target:/orders/v1/status/INV-1";

        return $request->method() === 'GET' && $request->header('Signature')[0] === 'HMACSHA256='.base64_encode(hash_hmac('sha256', $canonical, 'test-secret', true));
    });
    expect(fn () => app(DokuService::class)->findTransactionStatus('INV-1'))->toThrow(RuntimeException::class);
});

it('releases only for a documented definitive checkout validation rejection', function () {
    Http::fake(['*' => Http::sequence()->push(['error_messages' => ['order.amount must greater than 0']], 400)->push(['error_messages' => ['duplicate invoice_number']], 400)]);
    expect(fn () => app(DokuService::class)->createCheckout(new Order(['order_number' => 'INV-1', 'grand_total' => 125000]), 'request-1', 30, 'qris'))->toThrow(ValidationException::class);
    expect(fn () => app(DokuService::class)->createCheckout(new Order(['order_number' => 'INV-1', 'grand_total' => 125000]), 'request-1', 30, 'qris'))->toThrow(RuntimeException::class);
});

it('explains inactive QRIS channels and records only safe checkout diagnostics', function () {
    Log::spy();
    Http::fake(['*' => Http::response([
        'message' => ['PAYMENT CHANNEL IS INACTIVE'],
        'secret_key' => 'never-store-this',
    ], 400)]);

    try {
        app(DokuService::class)->createCheckout(new Order(['order_number' => 'INV-1', 'grand_total' => 125000]), 'request-1', 30, 'qris');
        $this->fail('An inactive channel must reject checkout.');
    } catch (ValidationException $exception) {
        expect($exception->errors()['payment'][0])->toContain('QRIS DOKU belum aktif');
    }

    Log::shouldHaveReceived('warning')->once()->with('DOKU checkout rejected', [
        'invoice_number' => 'INV-1',
        'request_id' => 'request-1',
        'http_status' => 400,
        'reason' => 'payment_channel_inactive',
    ]);
});

it('normalizes customer phone numbers before signing checkout', function (string $phone, string $expected) {
    Http::fake(['*' => Http::response(['response' => [
        'order' => ['invoice_number' => 'INV-1'],
        'payment' => ['url' => 'https://sandbox.doku.com/checkout-link-v2/test', 'expired_date' => now()->addMinutes(30)->setTimezone('Asia/Jakarta')->format('YmdHis')],
    ]])]);

    app(DokuService::class)->createCheckout(new Order(['order_number' => 'INV-1', 'grand_total' => 125000, 'customer_phone' => $phone]), 'request-1', 30, 'qris');

    Http::assertSent(fn ($request) => $request['customer']['phone'] === $expected);
})->with([
    ['0812321233', '62812321233'],
    ['+62 812-321-233', '62812321233'],
    ['62812321233', '62812321233'],
    ['+65 8123 4567', '6581234567'],
]);

it('rejects invalid phone numbers before contacting DOKU', function (string $phone) {
    expect(fn () => app(DokuService::class)->createCheckout(new Order([
        'order_number' => 'INV-1', 'grand_total' => 125000, 'customer_phone' => $phone,
    ]), 'request-1', 30, 'qris'))->toThrow(ValidationException::class);
    Http::assertNothingSent();
})->with(['not-a-phone', '0812', '++62812321233', '628123456789012345']);
