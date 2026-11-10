<?php

namespace App\Services\Integrations;

use App\Models\Order;
use App\Models\Payment;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use RuntimeException;

class DokuService
{
    public const PAYMENT_METHODS = [
        'qris' => ['label' => 'QRIS', 'channel' => 'QRIS'],
    ];

    public function assertConfigured(): void
    {
        foreach (['client_id', 'secret_key'] as $key) {
            $value = config('services.doku.'.$key);
            if (! is_string($value) || trim($value) === '' || preg_match('/[\r\n]/', $value)) {
                throw ValidationException::withMessages(['payment' => 'Konfigurasi DOKU belum lengkap. Hubungi admin.']);
            }
        }
    }

    public function createCheckout(Order $order, string $requestId, int $expiryMinutes, string $paymentMethod): array
    {
        $this->assertConfigured();
        $method = self::PAYMENT_METHODS[$paymentMethod] ?? null;
        if ($method === null) {
            throw ValidationException::withMessages(['payment_method' => 'Pembayaran hanya tersedia melalui QRIS.']);
        }
        $amount = $this->wholeAmount($order->grand_total);
        if ($amount === null || $expiryMinutes < 1 || $expiryMinutes > 10080 || ! preg_match('/^[A-Za-z0-9_-]{1,64}$/D', $order->order_number) || ! preg_match('/^[A-Za-z0-9_-]{1,100}$/D', $requestId)) {
            throw ValidationException::withMessages(['payment' => 'Nominal, invoice, atau durasi pembayaran tidak valid.']);
        }

        $phone = preg_replace('/[\s()-]+/u', '', trim($order->customer_phone ?? ''));
        $phone = preg_replace('/^\+/', '', $phone);
        $phone = preg_replace('/^0/', '62', $phone);
        if ($phone !== '' && ! preg_match('/^[1-9][0-9]{7,15}$/D', $phone)) {
            throw ValidationException::withMessages(['payment' => 'Nomor telepon penerima tidak valid untuk pembayaran. Periksa alamat pengiriman.']);
        }

        $body = json_encode([
            'order' => [
                'amount' => (int) $amount,
                'invoice_number' => $order->order_number,
                'currency' => 'IDR',
                'callback_url' => route('payments.doku.finish'),
                'callback_url_result' => route('payments.doku.finish'),
                'auto_redirect' => true,
            ],
            'payment' => ['payment_due_date' => $expiryMinutes, 'payment_method_types' => [$method['channel']]],
            'customer' => array_filter(['name' => $order->customer_name, 'email' => $order->customer_email, 'phone' => $phone], fn ($value) => is_string($value) && $value !== ''),
        ], JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);
        $target = '/checkout/v1/payment';
        $response = Http::baseUrl($this->baseUrl())->connectTimeout(5)->timeout(20)->acceptJson()
            ->withOptions(['allow_redirects' => false])
            ->withHeaders($this->headers($requestId, $target, $body))
            ->withBody($body, 'application/json')->post($target);

        if (! $response->successful()) {
            $inactive = $response->status() === 400 && $response->json('message') === ['PAYMENT CHANNEL IS INACTIVE'];
            Log::warning('DOKU checkout rejected', [
                'invoice_number' => $order->order_number,
                'request_id' => $requestId,
                'http_status' => $response->status(),
                'reason' => $inactive ? 'payment_channel_inactive' : 'checkout_unconfirmed',
            ]);
            if ($inactive) {
                throw ValidationException::withMessages(['payment' => $method['label'].' DOKU belum aktif untuk Client ID ini. Periksa aktivasi metode pembayaran dan pengaturan Checkout di dashboard DOKU atau hubungi admin.']);
            }
            $errors = $response->json('error_messages');
            // ponytail: only documented validation rejections prove no checkout was created; broaden after provider confirmation.
            if ($response->status() === 400 && is_array($errors) && $errors !== [] && collect($errors)->every(fn ($error) => is_string($error) && preg_match('/^order\.(?:amount|invoice_number) (?:must greater than 0|must be filled)$/D', $error))) {
                throw ValidationException::withMessages(['payment' => 'DOKU menolak data checkout. Hubungi admin.']);
            }
            throw new RuntimeException('Hasil pembuatan checkout DOKU belum dapat dipastikan (HTTP '.$response->status().').', $response->status());
        }

        $payload = $response->json();
        $invoice = data_get($payload, 'response.order.invoice_number');
        $url = data_get($payload, 'response.payment.url');
        $expiry = data_get($payload, 'response.payment.expired_date');
        if ($invoice !== $order->order_number || ! $this->checkoutUrlIsValid($url) || ! is_string($expiry) || ! preg_match('/^\d{14}$/D', $expiry)) {
            throw new RuntimeException('Respons checkout DOKU tidak lengkap atau tidak valid.');
        }
        $responseAmount = data_get($payload, 'response.order.amount');
        if ($responseAmount !== null && $this->wholeAmount($responseAmount) !== $amount) {
            throw new RuntimeException('Nominal response DOKU tidak sesuai.');
        }
        try {
            $expiresAt = CarbonImmutable::createFromFormat('!YmdHis', $expiry, 'Asia/Jakarta');
            if (! $expiresAt || $expiresAt->format('YmdHis') !== $expiry || $expiresAt->isPast()) {
                throw new RuntimeException('Deadline checkout DOKU tidak valid.');
            }
        } catch (\Throwable $exception) {
            throw new RuntimeException('Deadline checkout DOKU tidak valid.', previous: $exception);
        }

        return ['checkout_url' => $url, 'expires_at' => $expiresAt->setTimezone(config('app.timezone', 'UTC')), 'raw_response' => $payload];
    }

    public function findTransactionStatus(string $providerReference): ?array
    {
        $this->assertConfigured();
        $target = '/orders/v1/status/'.rawurlencode($providerReference);
        $response = Http::baseUrl($this->baseUrl())->connectTimeout(5)->timeout(20)->acceptJson()
            ->withOptions(['allow_redirects' => false])
            ->withHeaders($this->headers((string) Str::uuid(), $target))->get($target);
        // ponytail: no documented QRIS not-found code is established; every error remains retriable, never terminal.
        if (! $response->successful() || ! is_array($response->json()) || ! is_array($response->json('order'))) {
            throw new RuntimeException('Status DOKU belum dapat dipastikan (HTTP '.$response->status().').');
        }

        return $response->json();
    }

    public function validateNotificationSignature(string $rawBody, array $headers, string $requestTarget): bool
    {
        $headers = array_change_key_case($headers, CASE_LOWER);
        $values = [];
        foreach (['client-id', 'request-id', 'request-timestamp', 'signature'] as $name) {
            $value = $headers[$name] ?? null;
            $value = is_array($value) && count($value) === 1 ? $value[0] : $value;
            if (! is_string($value) || $value === '' || preg_match('/[\r\n]/', $value)) {
                return false;
            }
            $values[$name] = $value;
        }
        $clientId = config('services.doku.client_id');
        $secret = config('services.doku.secret_key');
        if (! is_string($clientId) || $clientId === '' || ! is_string($secret) || $secret === '' || ! hash_equals($clientId, $values['client-id']) || strlen($values['request-id']) > 128 || ! preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/D', $values['request-timestamp'])) {
            return false;
        }

        return hash_equals($this->signature($clientId, $values['request-id'], $values['request-timestamp'], $requestTarget, $rawBody), $values['signature']);
    }

    public function amountMatches(Payment $payment, mixed $amount): bool
    {
        $actual = $this->wholeAmount($amount);

        return $actual !== null && $actual === $this->wholeAmount($payment->gross_amount);
    }

    public function paymentStatus(Payment $payment, array $payload, bool $requireService = true): string
    {
        $status = data_get($payload, 'transaction.status');
        $service = data_get($payload, 'service.id');
        $channel = data_get($payload, 'channel.id');
        $method = self::PAYMENT_METHODS[$payment->payment_method] ?? null;
        $expectedService = 'QRIS';
        $expectedChannel = 'QRIS_DOKU';
        if ($payment->payment_provider !== 'doku'
            || $method === null
            || data_get($payload, 'order.invoice_number') !== $payment->provider_reference
            || ! $this->amountMatches($payment, data_get($payload, 'order.amount'))
            || (data_get($payload, 'order.currency') !== null && data_get($payload, 'order.currency') !== 'IDR')
            || (($requireService || $service !== null) && $service !== $expectedService)
            || (($requireService || $channel !== null) && $channel !== $expectedChannel)
            || ! is_string($status) || $status === '' || strlen($status) > 50) {
            throw ValidationException::withMessages(['payment' => 'Data status DOKU tidak sesuai pembayaran.']);
        }

        return $status;
    }

    public function auditPayload(array $payload): array
    {
        $safe = [];
        foreach (['order.invoice_number', 'order.amount', 'order.currency', 'service.id', 'channel.id', 'transaction.status', 'transaction.date'] as $key) {
            $value = data_get($payload, $key);
            if (is_string($value) || is_int($value) || (is_float($value) && is_finite($value))) {
                data_set($safe, $key, $value);
            }
        }

        return $safe;
    }

    public function resumableCheckoutUrl(Payment $payment): ?string
    {
        return $payment->payment_provider === 'doku'
            && $payment->transaction_status === 'pending'
            && $payment->paid_at === null
            && $payment->order->payment_status === 'pending'
            && $payment->order->order_status === 'pending_payment'
            && $payment->order->stock_released_at === null
            && $payment->expires_at?->isFuture()
            && $this->checkoutUrlIsValid($payment->checkout_url)
                ? $payment->checkout_url : null;
    }

    public function checkoutUrlIsValid(mixed $url): bool
    {
        if (! is_string($url) || ! filter_var($url, FILTER_VALIDATE_URL)) {
            return false;
        }
        $parts = parse_url($url);

        return ($parts['scheme'] ?? null) === 'https'
            && in_array($parts['host'] ?? null, config('services.doku.is_production') ? ['jokul.doku.com'] : ['sandbox.doku.com', 'staging.doku.com'], true)
            && ! isset($parts['user'], $parts['pass']) && ! isset($parts['user']) && ! isset($parts['port']);
    }

    private function wholeAmount(mixed $amount): ?string
    {
        if (is_float($amount) && is_finite($amount) && floor($amount) === $amount) {
            $amount = sprintf('%.0f', $amount);
        }
        if ((! is_int($amount) && ! is_string($amount)) || ! preg_match('/^\d{1,12}(?:\.0+)?$/D', (string) $amount)) {
            return null;
        }
        $integer = ltrim(explode('.', (string) $amount)[0], '0');

        return $integer !== '' ? $integer : null;
    }

    private function headers(string $requestId, string $target, ?string $body = null): array
    {
        $clientId = config('services.doku.client_id');
        $timestamp = now()->utc()->format('Y-m-d\TH:i:s\Z');

        return ['Client-Id' => $clientId, 'Request-Id' => $requestId, 'Request-Timestamp' => $timestamp, 'Signature' => $this->signature($clientId, $requestId, $timestamp, $target, $body)];
    }

    private function signature(string $clientId, string $requestId, string $timestamp, string $target, ?string $body): string
    {
        $canonical = "Client-Id:{$clientId}\nRequest-Id:{$requestId}\nRequest-Timestamp:{$timestamp}\nRequest-Target:{$target}";
        if ($body !== null) {
            $canonical .= "\nDigest:".base64_encode(hash('sha256', $body, true));
        }

        return 'HMACSHA256='.base64_encode(hash_hmac('sha256', $canonical, config('services.doku.secret_key'), true));
    }

    private function baseUrl(): string
    {
        return config('services.doku.is_production') ? 'https://api.doku.com' : 'https://api-sandbox.doku.com';
    }
}
