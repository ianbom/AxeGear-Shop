<?php

namespace App\Actions\Payments;

use App\Actions\Stock\FinalizeReservedStockAction;
use App\Actions\Stock\ReleaseStockReservationAction;
use App\Actions\Vouchers\ReleaseVoucherReservationAction;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Payment;
use App\Services\Notifications\NotificationService;
use DomainException;

class ApplyMidtransPaymentStatusAction
{
    public function __construct(
        private readonly FinalizeReservedStockAction $finalizeStock,
        private readonly ReleaseStockReservationAction $releaseStock,
        private readonly ReleaseVoucherReservationAction $releaseVoucher,
        private readonly NotificationService $notifications,
    ) {}

    public function execute(Payment $payment, string $transactionStatus, ?string $fraudStatus = null): void
    {
        if (! $this->canApply($payment, $transactionStatus, $fraudStatus)) {
            return;
        }

        match ($transactionStatus) {
            'settlement' => $this->markPaid($payment),
            'capture' => match ($fraudStatus) {
                'accept' => $this->markPaid($payment),
                'challenge' => $this->markManualReview($payment),
                'deny' => $this->markFailed($payment, PaymentStatus::Failed, OrderStatus::Cancelled),
                default => $this->markManualReview($payment),
            },
            'pending', 'authorize' => $this->markPending($payment),
            'expire' => $this->markFailed($payment, PaymentStatus::Expired, OrderStatus::PaymentExpired),
            'cancel' => $this->markFailed($payment, PaymentStatus::Cancelled, OrderStatus::Cancelled),
            'deny', 'failure' => $this->markFailed($payment, PaymentStatus::Failed, OrderStatus::PaymentFailed),
            'refund' => $this->markRefunded($payment, PaymentStatus::Refunded, OrderStatus::Refunded),
            'partial_refund' => $this->markRefunded($payment, PaymentStatus::PartiallyRefunded, null),
            default => null,
        };
    }

    public function canApply(Payment $payment, string $transactionStatus, ?string $fraudStatus = null): bool
    {
        $payment->loadMissing('order');
        $status = $payment->order?->payment_status;

        if (! $status || $status === PaymentStatus::Refunded->value) {
            return false;
        }

        if ($status === PaymentStatus::PartiallyRefunded->value) {
            return in_array($transactionStatus, ['refund', 'partial_refund'], true);
        }

        if (in_array($status, PaymentStatus::terminalFailureValues(), true)) {
            return in_array($transactionStatus, ['settlement', 'refund', 'partial_refund'], true)
                || ($transactionStatus === 'capture' && $fraudStatus === 'accept');
        }

        if ($status === PaymentStatus::ManualReview->value && $payment->order->stock_released_at
            && in_array($transactionStatus, ['pending', 'authorize'], true)) {
            return false;
        }

        return $status !== PaymentStatus::Paid->value
            || in_array($transactionStatus, ['settlement', 'refund', 'partial_refund'], true)
            || ($transactionStatus === 'capture' && $fraudStatus === 'accept');
    }

    private function markPaid(Payment $payment): void
    {
        $order = $payment->order;

        if ($order->payment_status === PaymentStatus::Paid->value) {
            $payment->update(['paid_at' => $payment->paid_at ?? $order->paid_at ?? now()]);

            return;
        }

        if ($order->payment_status !== PaymentStatus::Paid->value) {
            try {
                $this->finalizeStock->execute($order, $payment->midtrans_order_id);
            } catch (DomainException $exception) {
                $order->update(['payment_status' => PaymentStatus::ManualReview->value, 'order_status' => OrderStatus::PendingPayment->value]);
                $payment->update(['transaction_status' => 'manual_review', 'failure_reason' => $exception->getMessage()]);

                return;
            }
        }

        $order->update([
            'payment_status' => PaymentStatus::Paid->value,
            'order_status' => $order->order_status === OrderStatus::PendingPayment->value ? OrderStatus::Paid->value : $order->order_status,
            'paid_at' => $order->paid_at ?? now(),
        ]);
        $payment->update(['paid_at' => $payment->paid_at ?? now(), 'failure_reason' => null]);
        $this->notifications->forOrder($order, 'Payment received', "Payment untuk order {$order->order_number} berhasil diterima.", 'payment');
    }

    private function markManualReview(Payment $payment): void
    {
        if ($payment->order->payment_status === PaymentStatus::Paid->value) {
            return;
        }

        $payment->order->update(['payment_status' => PaymentStatus::ManualReview->value, 'order_status' => OrderStatus::PendingPayment->value]);
    }

    private function markPending(Payment $payment): void
    {
        if ($payment->order->payment_status !== PaymentStatus::Paid->value) {
            $payment->order->update(['payment_status' => PaymentStatus::Pending->value, 'order_status' => OrderStatus::PendingPayment->value]);
        }
    }

    private function markFailed(Payment $payment, PaymentStatus $paymentStatus, OrderStatus $orderStatus): void
    {
        $order = $payment->order;

        if ($order->payment_status === PaymentStatus::Paid->value) {
            return;
        }

        $this->releaseStock->execute($order);
        $this->releaseVoucher->execute($order);
        $order->update([
            'payment_status' => $paymentStatus->value,
            'order_status' => $orderStatus->value,
            'expired_at' => $paymentStatus === PaymentStatus::Expired ? now() : $order->expired_at,
            'cancelled_at' => $paymentStatus !== PaymentStatus::Expired ? now() : $order->cancelled_at,
        ]);
        $this->notifications->forOrder($order, 'Payment updated', "Payment untuk order {$order->order_number} berstatus {$paymentStatus->value}.", 'payment');
    }

    private function markRefunded(Payment $payment, PaymentStatus $paymentStatus, ?OrderStatus $orderStatus): void
    {
        $payload = ['payment_status' => $paymentStatus->value];

        if ($orderStatus) {
            $payload['order_status'] = $orderStatus->value;
        }

        $payment->order->update($payload);
    }
}
