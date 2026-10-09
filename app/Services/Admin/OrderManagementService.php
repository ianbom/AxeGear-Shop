<?php

namespace App\Services\Admin;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Enums\ShippingStatus;
use App\Models\AdminActivityLog;
use App\Models\Order;
use App\Models\StockLog;
use App\Services\Notifications\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderManagementService
{
    use ResolvesAdminPagination;

    public function __construct(private readonly NotificationService $notifications) {}

    public function indexData(Request $request): array
    {
        $filters = [
            'search' => $request->string('search')->toString(),
            'payment_status' => $request->string('payment_status')->toString(),
            'order_status' => $request->string('order_status')->toString(),
            'shipping_status' => $request->string('shipping_status')->toString(),
            'courier' => $request->string('courier')->toString(),
            'voucher_code' => $request->string('voucher_code')->toString(),
            'date_from' => $request->string('date_from')->toString(),
            'date_to' => $request->string('date_to')->toString(),
            'sort' => $request->string('sort')->toString(),
            'direction' => $request->string('direction')->toString(),
        ];
        $sort = in_array($filters['sort'], ['date', 'customer'], true) ? $filters['sort'] : 'date';
        $direction = $filters['direction'] === 'asc' ? 'asc' : 'desc';
        $filters['sort'] = $sort;
        $filters['direction'] = $direction;

        return [
            'orders' => Order::query()
                ->with('shipment:id,order_id,courier_company,courier_type,waybill_id')
                ->when($filters['search'] !== '', fn ($query) => $query->where(fn ($query) => $query
                    ->where('order_number', 'like', "%{$filters['search']}%")
                    ->orWhere('customer_name', 'like', "%{$filters['search']}%")
                    ->orWhere('customer_email', 'like', "%{$filters['search']}%")
                    ->orWhere('customer_phone', 'like', "%{$filters['search']}%")))
                ->when($filters['payment_status'] !== '', fn ($query) => $query->where('payment_status', $filters['payment_status']))
                ->when($filters['order_status'] !== '', fn ($query) => $query->where('order_status', $filters['order_status']))
                ->when($filters['shipping_status'] !== '', fn ($query) => $query->where('shipping_status', $filters['shipping_status']))
                ->when($filters['voucher_code'] !== '', fn ($query) => $query->where('voucher_code', $filters['voucher_code']))
                ->when($filters['date_from'] !== '', fn ($query) => $query->whereDate('created_at', '>=', $filters['date_from']))
                ->when($filters['date_to'] !== '', fn ($query) => $query->whereDate('created_at', '<=', $filters['date_to']))
                ->when($filters['courier'] !== '', fn ($query) => $query->whereHas('shipment', fn ($query) => $query->where('courier_company', $filters['courier'])))
                ->when($sort === 'date', fn ($query) => $query->orderBy('created_at', $direction))
                ->when($sort === 'customer', fn ($query) => $query->orderBy('customer_name', $direction))
                ->orderByDesc('id')
                ->paginate($this->perPage($request))
                ->withQueryString()
                ->through(fn (Order $order): array => $this->row($order)),
            'filters' => $filters,
            'options' => $this->options(),
            'stats' => [
                'total' => Order::query()->count(),
                'new_orders' => Order::query()->where('order_status', 'pending_payment')->count(),
                'processing' => Order::query()->where('order_status', 'processing')->count(),
                'shipped' => Order::query()->where('shipping_status', ShippingStatus::InTransit->value)->count(),
                'completed' => Order::query()->where('order_status', OrderStatus::Completed->value)->count(),
                'cancelled' => Order::query()->where('order_status', OrderStatus::Cancelled->value)->count(),
            ],
        ];
    }

    public function detailData(Order $order): array
    {
        $order->load([
            'items.variant:id,sku,color_name,size',
            'address',
            'payment.logs' => fn ($query) => $query->latest(),
            'shipment.trackings' => fn ($query) => $query->latest('happened_at'),
        ]);

        return [
            'order' => $this->detail($order),
            'options' => $this->options(),
        ];
    }

    public function allowedStatuses(Order $order): array
    {
        if ($order->payment_status !== PaymentStatus::Paid->value) {
            return [];
        }

        $order->loadMissing('shipment');

        return match ($order->order_status) {
            OrderStatus::Paid->value => [OrderStatus::Processing->value],
            OrderStatus::Processing->value => [OrderStatus::ReadyToShip->value],
            OrderStatus::Delivered->value => $order->shipment?->shipping_status === ShippingStatus::Delivered->value
                && $order->shipping_status === ShippingStatus::Delivered->value ? [OrderStatus::Completed->value] : [],
            default => [],
        };
    }

    public function updateStatus(Order $order, string $target): void
    {
        DB::transaction(function () use ($order, $target): void {
            $order = Order::query()->with('shipment')->whereKey($order->id)->lockForUpdate()->firstOrFail();

            if (! in_array($target, $this->allowedStatuses($order), true)) {
                throw ValidationException::withMessages(['status' => 'Perubahan status tidak sesuai flow order atau pembayaran dan pengiriman belum terkonfirmasi.']);
            }

            $payload = ['order_status' => $target];

            if ($target === OrderStatus::Completed->value) {
                $payload['completed_at'] = $order->completed_at ?? now();
            }

            $order->update($payload);
            $this->notifications->forOrder($order, 'Order status updated', "Order {$order->order_number} sekarang berstatus {$target}.", 'order');
        });
    }

    public function updateNotes(Order $order, ?string $notes): void
    {
        $order->update(['notes' => $notes]);
    }

    public function options(): array
    {
        return [
            'paymentStatuses' => PaymentStatus::values(),
            'orderStatuses' => OrderStatus::values(),
            'shippingStatuses' => ShippingStatus::values(),
        ];
    }

    public function row(Order $order): array
    {
        return [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'customer_name' => $order->customer_name,
            'customer_email' => $order->customer_email,
            'customer_phone' => $order->customer_phone,
            'grand_total' => $order->grand_total,
            'payment_status' => $order->payment_status,
            'order_status' => $order->order_status,
            'shipping_status' => $order->shipping_status,
            'courier' => $order->shipment?->courier_company,
            'waybill_id' => $order->shipment?->waybill_id,
            'created_at' => $order->created_at?->toFormattedDateString(),
        ];
    }

    private function detail(Order $order): array
    {
        $stockMovements = StockLog::query()
            ->where('reference_type', 'order')
            ->where('reference_id', $order->id)
            ->whereIn('product_variant_id', $order->items->pluck('product_variant_id')->filter()->unique())
            ->oldest('created_at')
            ->orderBy('id')
            ->get(['id', 'product_variant_id', 'quantity', 'stock_before', 'stock_after', 'created_at'])
            ->groupBy('product_variant_id');

        return [
            ...$this->row($order),
            'created_at' => $order->created_at?->toISOString(),
            'allowedStatuses' => $this->allowedStatuses($order),
            'status_history' => AdminActivityLog::query()
                ->with('user:id,name')
                ->where('reference_type', 'admin.orders.status')
                ->where('reference_id', $order->id)
                ->latest('id')
                ->get()
                ->map(fn (AdminActivityLog $log): array => [
                    'id' => $log->id,
                    'status' => $log->new_values['status'] ?? null,
                    'actor' => $log->user?->name ?? 'Admin',
                    'created_at' => $log->created_at?->toISOString(),
                ])->values(),
            'subtotal' => $order->subtotal,
            'discount_amount' => $order->discount_amount,
            'shipping_cost' => $order->shipping_cost,
            'service_fee' => $order->service_fee,
            'voucher_code' => $order->voucher_code,
            'notes' => $order->notes,
            'paid_at' => $order->paid_at?->toISOString(),
            'cancelled_at' => $order->cancelled_at?->toISOString(),
            'expired_at' => $order->expired_at?->toISOString(),
            'completed_at' => $order->completed_at?->toISOString(),
            'no_return_refund_agreed' => $order->no_return_refund_agreed,
            'no_return_refund_agreed_at' => $order->no_return_refund_agreed_at?->toISOString(),
            'items' => $order->items->map(fn ($item): array => [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'product_variant_id' => $item->product_variant_id,
                'product_name' => $item->product_name,
                'product_sku' => $item->product_sku,
                'variant_sku' => $item->variant_sku,
                'color_name' => $item->color_name,
                'size' => $item->size,
                'price' => $item->price,
                'quantity' => $item->quantity,
                'subtotal' => $item->subtotal,
                'weight' => $item->weight,
                'product_image_url' => $item->product_image_url,
                'stock_movements' => $stockMovements->get($item->product_variant_id, collect())->map(fn (StockLog $log): array => [
                    'id' => $log->id,
                    'quantity' => $log->quantity,
                    'stock_before' => $log->stock_before,
                    'stock_after' => $log->stock_after,
                    'created_at' => $log->created_at?->toISOString(),
                ])->values()->all(),
            ])->values(),
            'address' => $order->address,
            'payment' => $order->payment,
            'payment_logs' => $order->payment?->logs?->map(fn ($log): array => [
                'id' => $log->id,
                'event_type' => $log->event_type,
                'transaction_status' => $log->transaction_status,
                'processed_at' => $log->processed_at?->toISOString(),
                'created_at' => $log->created_at?->toISOString(),
            ])->values() ?? [],
            'shipment' => $order->shipment,
            'trackings' => $order->shipment?->trackings?->map(fn ($tracking): array => [
                'id' => $tracking->id,
                'status' => $tracking->status,
                'description' => $tracking->description,
                'location' => $tracking->location,
                'happened_at' => $tracking->happened_at?->toISOString(),
            ])->values() ?? [],
        ];
    }
}
