<?php

namespace App\Services\Admin;

use App\Actions\Payments\SyncDokuPaymentAction;
use App\Models\Payment;
use App\Services\Integrations\DokuService;
use Illuminate\Http\Request;

class PaymentManagementService
{
    use ResolvesAdminPagination;

    public function __construct(private readonly SyncDokuPaymentAction $syncPayment, private readonly DokuService $doku) {}

    public function indexData(Request $request): array
    {
        $filters = [
            'search' => $request->string('search')->toString(),
            'transaction_status' => $request->string('transaction_status')->toString(),
            'payment_method' => $request->string('payment_method')->toString(),
            'date_from' => $request->string('date_from')->toString(),
            'date_to' => $request->string('date_to')->toString(),
            'amount_min' => $request->string('amount_min')->toString(),
            'amount_max' => $request->string('amount_max')->toString(),
        ];

        return [
            'payments' => Payment::query()
                ->with('order:id,order_number,customer_name,customer_email')
                ->when($filters['search'] !== '', fn ($query) => $query->where(fn ($query) => $query
                    ->where('provider_reference', 'like', "%{$filters['search']}%")
                    ->orWhereHas('order', fn ($orderQuery) => $orderQuery->where('order_number', 'like', "%{$filters['search']}%"))))
                ->when($filters['transaction_status'] !== '', fn ($query) => $query->where('transaction_status', $filters['transaction_status']))
                ->when($filters['payment_method'] !== '', fn ($query) => $query->where('payment_method', $filters['payment_method']))
                ->when($filters['date_from'] !== '', fn ($query) => $query->whereDate('created_at', '>=', $filters['date_from']))
                ->when($filters['date_to'] !== '', fn ($query) => $query->whereDate('created_at', '<=', $filters['date_to']))
                ->when($filters['amount_min'] !== '', fn ($query) => $query->where('gross_amount', '>=', $filters['amount_min']))
                ->when($filters['amount_max'] !== '', fn ($query) => $query->where('gross_amount', '<=', $filters['amount_max']))
                ->latest()->paginate($this->perPage($request))->withQueryString()
                ->through(fn (Payment $payment): array => $this->row($payment)),
            'filters' => $filters,
            'statuses' => ['pending', 'success', 'expired', 'failed'],
            'stats' => [
                'total' => Payment::query()->count(),
                'success' => Payment::query()->where('transaction_status', 'success')->count(),
                'pending' => Payment::query()->where('transaction_status', 'pending')->count(),
                'failed' => Payment::query()->whereIn('transaction_status', ['expired', 'failed'])->count(),
            ],
        ];
    }

    public function detailData(Payment $payment): array
    {
        $payment->load(['order:id,order_number,customer_name,customer_email,payment_status,order_status,paid_at', 'logs' => fn ($query) => $query->latest()]);

        return ['payment' => [
            ...$this->row($payment),
            'payment_provider' => $payment->payment_provider,
            'create_request_id' => $payment->create_request_id,
            'currency' => $payment->currency,
            'failure_reason' => $payment->failure_reason,
            'last_synced_at' => $payment->last_synced_at?->toISOString(),
            'order' => $payment->order?->only(['id', 'order_number', 'customer_name', 'customer_email', 'payment_status', 'order_status', 'paid_at']),
            'logs' => $payment->logs->map(fn ($log): array => [
                'id' => $log->id, 'event_type' => $log->event_type,
                'notification_request_id' => $log->notification_request_id,
                'transaction_status' => $log->transaction_status,
                'processed_at' => $log->processed_at?->toDateTimeString(),
                'payload' => $this->doku->auditPayload($log->payload ?? []),
            ]),
        ]];
    }

    public function sync(Payment $payment): void
    {
        $this->syncPayment->execute($payment);
    }

    public function row(Payment $payment): array
    {
        return [
            'id' => $payment->id, 'order_id' => $payment->order_id,
            'order_number' => $payment->order?->order_number, 'customer' => $payment->order?->customer_name,
            'provider_reference' => $payment->provider_reference, 'payment_method' => $payment->payment_method,
            'payment_method_label' => DokuService::PAYMENT_METHODS[$payment->payment_method]['label'] ?? $payment->payment_method,
            'gross_amount' => $payment->gross_amount, 'transaction_status' => $payment->transaction_status,
            'paid_at' => $payment->paid_at?->toDateTimeString(), 'expired_at' => $payment->expired_at?->toDateTimeString(),
            'expires_at' => $payment->expires_at?->toISOString(), 'created_at' => $payment->created_at?->toFormattedDateString(),
        ];
    }
}
