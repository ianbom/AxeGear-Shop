<?php

namespace App\Services\Customer;

use App\Actions\Payments\ApplyDokuPaymentStatusAction;
use App\Models\Order;
use App\Models\Payment;
use App\Models\PaymentLog;
use App\Services\Integrations\DokuService;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use JsonException;

class DokuWebhookService
{
    public function __construct(
        private readonly DokuService $doku,
        private readonly ApplyDokuPaymentStatusAction $applyStatus,
    ) {}

    public function handle(string $rawBody, array $headers, string $requestTarget): void
    {
        abort_unless($this->doku->validateNotificationSignature($rawBody, $headers, $requestTarget), 403);
        try {
            $payload = json_decode($rawBody, true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            throw ValidationException::withMessages(['payment' => 'JSON notifikasi DOKU tidak valid.']);
        }
        if (! is_array($payload) || ! is_string(data_get($payload, 'order.invoice_number'))) {
            throw ValidationException::withMessages(['payment' => 'Invoice notifikasi DOKU tidak valid.']);
        }
        $headers = array_change_key_case($headers, CASE_LOWER);
        $requestId = $headers['request-id'];
        $requestId = is_array($requestId) ? $requestId[0] : $requestId;
        $hash = hash('sha256', $rawBody);
        $conflict = DB::transaction(function () use ($payload, $requestId, $hash): bool|string {
            $candidate = Payment::query()->where('payment_provider', 'doku')->where('provider_reference', $payload['order']['invoice_number'])->firstOrFail();
            $order = Order::query()->whereKey($candidate->order_id)->lockForUpdate()->firstOrFail();
            $payment = Payment::query()->whereKey($candidate->id)->lockForUpdate()->firstOrFail();
            $payment->setRelation('order', $order);
            $existing = PaymentLog::query()->where('provider', 'doku')->where('notification_request_id', $requestId)->first();
            if ($existing) {
                if (hash_equals($existing->payload_hash, $hash)) {
                    return false;
                }
                $payment->logs()->firstOrCreate([
                    'provider' => 'doku', 'event_type' => 'notification_conflict', 'payload_hash' => $hash,
                ], ['order_id' => $order->id, 'payload' => ['conflicting_request_id' => $requestId], 'processed_at' => now()]);

                return true;
            }
            try {
                $status = $this->doku->paymentStatus($payment, $payload);
            } catch (ValidationException) {
                $payment->logs()->firstOrCreate([
                    'provider' => 'doku', 'event_type' => 'notification_rejected', 'payload_hash' => $hash,
                ], ['order_id' => $order->id, 'payload' => $this->doku->auditPayload($payload), 'processed_at' => now()]);

                return 'rejected';
            }
            $safePayload = $this->doku->auditPayload($payload);
            $payment->logs()->create([
                'order_id' => $order->id, 'provider' => 'doku', 'notification_request_id' => $requestId,
                'event_type' => 'payment_notification', 'transaction_status' => $status,
                'payload_hash' => $hash, 'payload' => $safePayload, 'processed_at' => now(),
            ]);
            $payment->update(['raw_response' => [...($payment->raw_response ?? []), 'notification' => $safePayload]]);
            $this->applyStatus->execute($payment, $status);

            return false;
        });
        if ($conflict === 'rejected') {
            throw ValidationException::withMessages(['payment' => 'Data status DOKU tidak sesuai pembayaran.']);
        }
        abort_if($conflict, 409, 'Request-Id DOKU sudah digunakan untuk payload berbeda.');
    }
}
