<?php

namespace App\Actions\Payments;

use App\Actions\Stock\FinalizeReservedStockAction;
use App\Actions\Stock\ReleaseStockReservationAction;
use App\Actions\Vouchers\ReleaseVoucherReservationAction;
use App\Models\Payment;
use App\Services\Notifications\NotificationService;
use DomainException;
use Illuminate\Support\Facades\Log;

class ApplyDokuPaymentStatusAction
{
    public function __construct(
        private readonly FinalizeReservedStockAction $finalizeStock,
        private readonly NotificationService $notifications,
        private readonly ReleaseStockReservationAction $releaseStock,
        private readonly ReleaseVoucherReservationAction $releaseVoucher,
    ) {}

    // Caller holds order then payment locks and has authenticated/validated the provider facts.
    public function execute(Payment $payment, string $status): void
    {
        if (! $this->canApply($payment, $status)) {
            return;
        }
        $order = $payment->order;
        if ($status === 'SUCCESS') {
            $failureReason = null;
            $payment->update(['paid_at' => $payment->paid_at ?? now()]);
            $order->update(['paid_at' => $order->paid_at ?? $payment->paid_at]);
            try {
                $this->finalizeStock->execute($order, $payment->provider_reference);
            } catch (DomainException $exception) {
                $failureReason = $exception->getMessage();
                Log::error('doku_paid_stock_finalization_failed', ['payment_id' => $payment->id, 'order_id' => $order->id]);
            }
            $payment->update(['transaction_status' => 'success', 'failure_reason' => $failureReason]);
            $order->update([
                'payment_status' => 'paid',
                'order_status' => $order->order_status === 'pending_payment' ? 'paid' : $order->order_status,
            ]);
            $this->notifications->forOrder($order, 'Pembayaran berhasil', "Pembayaran order {$order->order_number} berhasil diterima.", 'payment');

            return;
        }
        if ($status === 'PENDING') {
            return;
        }
        if ($status === 'EXPIRED') {
            $payment->update(['transaction_status' => 'expired', 'expired_at' => now(), 'failure_reason' => null]);
            $order->update(['payment_status' => 'expired', 'order_status' => 'payment_expired', 'expired_at' => now()]);
            $this->releaseStock->execute($order);
            $this->releaseVoucher->execute($order);

            return;
        }
        $payment->update(['failure_reason' => 'Status DOKU belum membuktikan invoice berakhir. Sinkronisasi akan dicoba kembali.']);
    }

    public function canApply(Payment $payment, string $status): bool
    {
        if ($payment->paid_at || in_array($payment->order->payment_status, ['paid', 'refunded', 'partially_refunded'], true)) {
            return false;
        }

        return $status === 'SUCCESS'
            || ($status === 'PENDING'
                ? $payment->transaction_status === 'pending' && $payment->order->payment_status === 'pending'
                : ! in_array($payment->order->payment_status, ['failed', 'expired', 'cancelled'], true));
    }
}
