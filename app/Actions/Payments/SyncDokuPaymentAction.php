<?php

namespace App\Actions\Payments;

use App\Models\Payment;
use App\Services\Integrations\DokuService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Throwable;

class SyncDokuPaymentAction
{
    public function __construct(
        private readonly DokuService $doku,
        private readonly ApplyDokuPaymentStatusAction $applyStatus,
    ) {}

    public function syncIfDue(Payment $payment, string $eventType = 'customer_expiry_sync'): bool
    {
        return Cache::lock('doku-status-sync:'.$payment->id, 30)->get(function () use ($payment, $eventType): bool {
            $payment = $payment->fresh('order');
            if ($payment->payment_provider !== 'doku' || $payment->payment_method !== 'qris'
                || $payment->paid_at !== null || $payment->transaction_status !== 'pending'
                || $payment->order->payment_status !== 'pending'
                || (! $payment->expires_at?->isPast() && $payment->failure_reason === null)
                || $payment->last_synced_at?->gt(now()->subMinute())) {
                return false;
            }
            $this->execute($payment, $eventType);

            return true;
        }) === true;
    }

    public function execute(Payment $payment, string $eventType = 'admin_sync'): void
    {
        try {
            $payload = $this->doku->findTransactionStatus($payment->provider_reference);
            if ($payload === null) {
                throw ValidationException::withMessages(['payment' => 'Status DOKU belum tersedia.']);
            }
        } catch (Throwable $exception) {
            DB::transaction(function () use ($payment): void {
                $order = $payment->order()->lockForUpdate()->firstOrFail();
                $payment = Payment::query()->whereKey($payment->id)->lockForUpdate()->firstOrFail();
                $payment->setRelation('order', $order);
                $this->recordFailure($payment);
            });

            throw ValidationException::withMessages(['payment' => 'Status DOKU belum dapat dipastikan. Coba sinkronisasi kembali.']);
        }

        $this->applyPayload($payment, $payload, $eventType);
    }

    public function applyPayload(Payment $payment, array $payload, string $eventType = 'admin_sync'): void
    {
        $rejected = DB::transaction(function () use ($payment, $payload, $eventType): bool {
            $order = $payment->order()->lockForUpdate()->firstOrFail();
            $payment = Payment::query()->whereKey($payment->id)->lockForUpdate()->firstOrFail();
            $payment->setRelation('order', $order);
            try {
                $status = $this->doku->paymentStatus($payment, $payload, requireService: false);
            } catch (ValidationException) {
                $this->recordFailure($payment);

                return true;
            }
            $safePayload = $this->doku->auditPayload($payload);
            $payment->logs()->create([
                'order_id' => $order->id, 'provider' => 'doku', 'event_type' => $eventType,
                'transaction_status' => $status, 'payload' => $safePayload, 'processed_at' => now(),
            ]);
            $payment->update([
                'last_synced_at' => now(),
                'raw_response' => [...($payment->raw_response ?? []), 'status_lookup' => $safePayload],
            ]);
            $this->applyStatus->execute($payment, $status);

            return false;
        });
        if ($rejected) {
            throw ValidationException::withMessages(['payment' => 'Data status DOKU tidak sesuai pembayaran. Periksa referensi dan nominal.']);
        }
    }

    // Caller holds order then payment locks. Unknown lookup results never release reservations.
    private function recordFailure(Payment $payment): void
    {
        $payment->logs()->create([
            'order_id' => $payment->order_id, 'provider' => 'doku', 'event_type' => 'sync_error',
            'payload' => ['message' => 'Status DOKU belum dapat dipastikan.'], 'processed_at' => now(),
        ]);
        $payment->update(['last_synced_at' => now()]);
        if ($payment->paid_at === null) {
            $payment->update(['failure_reason' => 'Status DOKU belum dapat dipastikan. Sinkronisasi akan dicoba kembali.']);
        }
    }
}
