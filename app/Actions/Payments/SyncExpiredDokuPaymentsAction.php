<?php

namespace App\Actions\Payments;

use App\Models\Payment;
use Illuminate\Support\Facades\Log;
use Throwable;

class SyncExpiredDokuPaymentsAction
{
    public function __construct(private readonly SyncDokuPaymentAction $syncPayment) {}

    public function execute(): array
    {
        $stats = ['checked' => 0, 'synced' => 0, 'failed' => 0];
        Payment::query()
            ->where('payment_provider', 'doku')
            ->whereNull('paid_at')
            ->where('transaction_status', 'pending')
            ->where(fn ($query) => $query->where('expires_at', '<=', now())->orWhereNotNull('failure_reason'))
            ->whereHas('order', fn ($query) => $query->where('payment_status', 'pending'))
            ->chunkById(50, function ($payments) use (&$stats): void {
                foreach ($payments as $payment) {
                    $stats['checked']++;
                    try {
                        if ($this->syncPayment->syncIfDue($payment, 'scheduled_expiry_sync')) {
                            $stats['synced']++;
                        }
                    } catch (Throwable) {
                        $stats['failed']++;
                        Log::warning('doku_status_sync_failed', ['payment_id' => $payment->id]);
                    }
                }
            });

        return $stats;
    }
}
