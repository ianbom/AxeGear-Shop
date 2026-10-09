<?php

namespace App\Services\Admin;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Enums\ShippingStatus;
use App\Mail\ShipmentCreatedMail;
use App\Models\Order;
use App\Models\Shipment;
use App\Services\Integrations\BiteshipService;
use App\Services\Notifications\NotificationService;
use App\Services\Settings\SiteSettingService;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ShipmentManagementService
{
    use ResolvesAdminPagination;
    use StoresUploadedFiles;

    public function __construct(
        private readonly NotificationService $notifications,
        private readonly BiteshipService $biteship,
        private readonly SiteSettingService $settings,
    ) {}

    public function indexData(Request $request): array
    {
        $filters = [
            'search' => $request->string('search')->toString(),
            'courier_company' => $request->string('courier_company')->toString(),
            'courier_type' => $request->string('courier_type')->toString(),
            'shipping_status' => $request->string('shipping_status')->toString(),
            'date_from' => $request->string('date_from')->toString(),
            'date_to' => $request->string('date_to')->toString(),
        ];

        return [
            'shipments' => Shipment::query()
                ->with('order:id,order_number,customer_name')
                ->when($filters['search'] !== '', fn ($query) => $query->where(fn ($query) => $query
                    ->where('waybill_id', 'like', "%{$filters['search']}%")
                    ->orWhereHas('order', fn ($query) => $query->where('order_number', 'like', "%{$filters['search']}%"))))
                ->when($filters['courier_company'] !== '', fn ($query) => $query->where('courier_company', $filters['courier_company']))
                ->when($filters['courier_type'] !== '', fn ($query) => $query->where('courier_type', $filters['courier_type']))
                ->when($filters['shipping_status'] !== '', fn ($query) => $query->where('shipping_status', $filters['shipping_status']))
                ->when($filters['date_from'] !== '', fn ($query) => $query->whereDate('created_at', '>=', $filters['date_from']))
                ->when($filters['date_to'] !== '', fn ($query) => $query->whereDate('created_at', '<=', $filters['date_to']))
                ->latest()
                ->paginate($this->perPage($request))
                ->withQueryString()
                ->through(fn (Shipment $shipment): array => $this->row($shipment)),
            'filters' => $filters,
            'shippingStatuses' => ShippingStatus::values(),
            'stats' => [
                'total' => Shipment::query()->count(),
                'delivered' => Shipment::query()->where('shipping_status', ShippingStatus::Delivered->value)->count(),
                'pending' => Shipment::query()->whereIn('shipping_status', [ShippingStatus::NotCreated->value, ShippingStatus::Creating->value, ShippingStatus::Confirmed->value, ShippingStatus::Allocated->value])->count(),
                'in_transit' => Shipment::query()->whereIn('shipping_status', [ShippingStatus::Picked->value, ShippingStatus::InTransit->value])->count(),
                'issues' => Shipment::query()->whereIn('shipping_status', ShippingStatus::issueValues())->count(),
                'tracked' => Shipment::query()->whereNotNull('waybill_id')->count(),
            ],
        ];
    }

    public function detailData(Shipment $shipment): array
    {
        $shipment->load([
            'order.address',
            'order.items',
            'trackings' => fn ($query) => $query->latest('happened_at')->latest('id'),
        ]);

        return [
            'shipment' => [
                ...$this->row($shipment),
                'shipping_provider' => $shipment->shipping_provider,
                'biteship_order_id' => $shipment->biteship_order_id,
                'biteship_tracking_id' => $shipment->biteship_tracking_id,
                'delivery_type' => $shipment->delivery_type,
                'insurance_cost' => $shipment->insurance_cost,
                'raw_rate_response' => $shipment->raw_rate_response,
                'raw_order_response' => $shipment->raw_order_response,
                'failed_reason' => $shipment->failed_reason,
                'last_synced_at' => $shipment->last_synced_at?->toDateTimeString(),
                'can_create_shipment' => $this->canCreateShipment($shipment->order, $shipment),
                'booking_uncertain' => (bool) data_get($shipment->raw_order_response, 'booking_uncertain', false),
                'order' => $shipment->order,
                'address' => $shipment->order?->address,
                'trackings' => $shipment->trackings->map(fn ($tracking): array => [
                    'id' => $tracking->id,
                    'status' => $tracking->status,
                    'description' => $tracking->description,
                    'location' => $tracking->location,
                    'happened_at' => $tracking->happened_at?->toDateTimeString(),
                    'raw_payload' => $tracking->raw_payload,
                    'actor' => data_get($tracking->raw_payload, 'actor_name'),
                ]),
            ],
            'shippingStatuses' => $this->allowedStatuses($shipment),
        ];
    }

    public function canCreateShipment(Order $order, ?Shipment $shipment): bool
    {
        return $order->payment_status === PaymentStatus::Paid->value
            && in_array($order->order_status, [OrderStatus::ReadyToShip->value, OrderStatus::ShipmentFailed->value, OrderStatus::ShipmentProblem->value], true)
            && (! $shipment || (! $shipment->biteship_order_id && ! data_get($shipment->raw_order_response, 'booking_uncertain', false) && in_array($shipment->shipping_status, ShippingStatus::retryableValues(), true)));
    }

    public function allowedStatuses(Shipment $shipment): array
    {
        $order = $shipment->order;

        if (! $order || $order->payment_status !== PaymentStatus::Paid->value || ! $shipment->biteship_order_id
            || in_array($order->order_status, [OrderStatus::Completed->value, OrderStatus::Cancelled->value, OrderStatus::Refunded->value], true)) {
            return [];
        }

        return $this->nextShippingStatuses($shipment);
    }

    private function nextShippingStatuses(Shipment $shipment): array
    {
        $statuses = ShippingStatus::transitions($shipment->shipping_status);

        if ($shipment->shipped_at || $shipment->trackings()->whereIn('status', ['picked', 'in_transit'])->exists()) {
            $statuses = array_diff($statuses, ['confirmed', 'allocated', 'cancelled']);
        }

        if ($shipment->trackings()->where('status', 'in_transit')->exists()) {
            $statuses = array_diff($statuses, ['picked']);
        }

        return array_values($statuses);
    }

    public function createFromOrder(Request $request, Order $order): Shipment
    {
        $payload = $request->validated();
        $labelUrl = ($payload['source'] ?? null) !== 'order_detail' && $request->hasFile('label_photo')
            ? $this->storePublicFile($request->file('label_photo'), 'shipment-labels')
            : null;

        $prepared = DB::transaction(function () use ($order, $payload): array {
            $order = Order::query()->with(['address', 'items'])->whereKey($order->id)->lockForUpdate()->firstOrFail();

            if ($order->payment_status !== PaymentStatus::Paid->value) {
                throw ValidationException::withMessages(['shipment' => 'Shipment hanya bisa dibuat untuk order paid.']);
            }

            if (! in_array($order->order_status, [OrderStatus::ReadyToShip->value, OrderStatus::ShipmentFailed->value, OrderStatus::ShipmentProblem->value], true)) {
                throw ValidationException::withMessages(['shipment' => 'Tandai pesanan siap dikirim sebelum membuat pengiriman.']);
            }

            $shipment = Shipment::query()->where('order_id', $order->id)->lockForUpdate()->first();

            if (($payload['source'] ?? null) === 'order_detail') {
                if (! $shipment || blank($shipment->courier_company) || blank($shipment->courier_type)) {
                    throw ValidationException::withMessages(['shipment' => 'Pilihan kurir customer tidak tersedia atau tidak lengkap. Periksa data pengiriman pesanan.']);
                }

                $payload = [
                    'courier_company' => $shipment->courier_company,
                    'courier_type' => $shipment->courier_type,
                    'courier_service_name' => $shipment->courier_service_name,
                    'estimated_delivery' => $shipment->estimated_delivery,
                ];
            }

            $shipment ??= $order->shipment()->create([
                'shipping_provider' => 'biteship',
                'courier_company' => Str::lower($payload['courier_company']),
                'courier_type' => Str::lower($payload['courier_type']),
                'courier_service_name' => $payload['courier_service_name'] ?? null,
                'shipping_cost' => $order->shipping_cost,
                'shipping_status' => ShippingStatus::NotCreated->value,
            ]);

            if (! $this->canCreateShipment($order, $shipment)) {
                throw ValidationException::withMessages(['shipment' => "Shipment sedang {$shipment->shipping_status}."]);
            }

            $payload = $this->shipmentPayload($payload, $shipment);
            $biteshipPayload = $this->biteshipOrderPayload($order, $payload);
            $this->validateBiteshipPayload($biteshipPayload);

            $shipment->update(['shipping_status' => ShippingStatus::Creating->value, 'creating_at' => now(), 'failed_reason' => null]);
            $order->update(['shipping_status' => ShippingStatus::Creating->value]);

            return [$order, $shipment, $payload, $biteshipPayload];
        });

        [$order, $shipment, $payload, $biteshipPayload] = $prepared;

        try {
            $biteshipOrder = $this->biteship->createOrder($biteshipPayload);

            if (blank(Arr::get($biteshipOrder, 'id'))) {
                throw new \UnexpectedValueException('Respons booking tidak memiliki ID Biteship. Periksa dashboard Biteship sebelum mencoba kembali.');
            }
        } catch (\Throwable $exception) {
            DB::transaction(function () use ($order, $shipment, $exception): void {
                $order = Order::query()->whereKey($order->id)->lockForUpdate()->firstOrFail();
                $shipment = Shipment::query()->whereKey($shipment->id)->lockForUpdate()->firstOrFail();
                $shipment->update([
                    'shipping_status' => ShippingStatus::Failed->value,
                    'failed_reason' => $exception->getMessage(),
                    'last_synced_at' => now(),
                    'raw_order_response' => ['booking_uncertain' => ! ($exception instanceof ValidationException)],
                ]);
                $this->synchronizeOrder($order, $shipment->shipping_status);
            });

            throw $exception;
        }

        $shipment = DB::transaction(function () use ($order, $shipment, $payload, $labelUrl, $biteshipOrder): Shipment {
            $order = Order::query()->whereKey($order->id)->lockForUpdate()->firstOrFail();
            $shipment = Shipment::query()->whereKey($shipment->id)->lockForUpdate()->firstOrFail();
            $identifiers = $this->biteship->orderIdentifiers($biteshipOrder);
            $status = $this->normalizeShippingStatus($identifiers['shipping_status'] ?: 'confirmed');

            if ($status !== $shipment->shipping_status && ! in_array($status, $this->nextShippingStatuses($shipment), true)) {
                $status = $shipment->shipping_status;
            }

            $shipment->fill([
                'shipping_provider' => 'biteship',
                'biteship_order_id' => $identifiers['biteship_order_id'],
                'biteship_tracking_id' => $identifiers['biteship_tracking_id'],
                'waybill_id' => $identifiers['waybill_id'] ?: ($payload['waybill_id'] ?? null),
                'label_url' => $labelUrl ?: Arr::get($biteshipOrder, 'courier.link') ?: $shipment->label_url,
                'courier_company' => $payload['courier_company'],
                'courier_type' => $payload['courier_type'],
                'courier_service_name' => $payload['courier_service_name'] ?? null,
                'delivery_type' => 'now',
                'shipping_cost' => $order->shipping_cost,
                'insurance_cost' => 0,
                'estimated_delivery' => $payload['estimated_delivery'] ?? null,
                'shipping_status' => $status,
                'shipped_at' => in_array($status, ['picked', 'in_transit', 'delivered'], true) ? ($shipment->shipped_at ?? now()) : $shipment->shipped_at,
                'delivered_at' => $status === 'delivered' ? ($shipment->delivered_at ?? now()) : $shipment->delivered_at,
                'raw_rate_response' => $shipment->raw_rate_response ?: ['source' => 'admin_biteship_create', 'shipping_cost' => $order->shipping_cost],
                'raw_order_response' => $biteshipOrder,
                'last_synced_at' => now(),
            ]);
            $shipment->save();

            $shipment->trackings()->create([
                'status' => $shipment->shipping_status,
                'description' => 'Shipment created from Biteship order API.',
                'location' => $order->address?->city,
                'happened_at' => now(),
                'raw_payload' => $biteshipOrder,
            ]);

            $this->synchronizeOrder($order, $shipment->shipping_status);

            $this->notifications->forOrder($order, 'Shipment created', "Shipment untuk order {$order->order_number} sudah dibuat.", 'shipping');

            return $shipment;
        });

        $this->sendShipmentCreatedEmail($shipment);

        return $shipment;
    }

    public function updateStatus(Shipment $shipment, Request $request): void
    {
        DB::transaction(function () use ($request, $shipment): void {
            $order = Order::query()->whereKey($shipment->order_id)->lockForUpdate()->firstOrFail();
            $shipment = Shipment::query()->whereKey($shipment->id)->lockForUpdate()->firstOrFail();
            $shipment->setRelation('order', $order);
            $status = $request->string('shipping_status')->toString();

            if (! in_array($status, $this->allowedStatuses($shipment), true)) {
                throw ValidationException::withMessages(['shipping_status' => 'Perubahan status pengiriman tidak diizinkan.']);
            }

            $payload = ['shipping_status' => $status];

            if (in_array($status, [ShippingStatus::Picked->value, ShippingStatus::InTransit->value], true) && ! $shipment->shipped_at) {
                $payload['shipped_at'] = now();
            }

            if ($status === ShippingStatus::Delivered->value && ! $shipment->delivered_at) {
                $payload['delivered_at'] = now();
            }

            if ($status === ShippingStatus::Cancelled->value && ! $shipment->cancelled_at) {
                $payload['cancelled_at'] = now();
            }

            $shipment->update($payload);
            $shipment->trackings()->create([
                'status' => $status,
                'description' => $request->input('description') ?: "Shipment marked as {$status}.",
                'location' => $request->input('location'),
                'happened_at' => now(),
                'raw_payload' => ['source' => 'admin_manual_status', 'actor_id' => $request->user()->id, 'actor_name' => $request->user()->name],
            ]);

            $this->synchronizeOrder($order, $status);

            if ($shipment->order) {
                $this->notifications->forOrder($shipment->order, 'Shipment status updated', "Shipment order {$shipment->order->order_number} sekarang {$status}.", 'shipping');
            }
        });
    }

    public function refreshTracking(Shipment $shipment): void
    {
        if (filled($shipment->biteship_order_id)) {
            $payload = $this->biteship->retrieveOrder($shipment->biteship_order_id);
            $this->applyBiteshipPayload($shipment, $payload, 'admin_biteship_refresh');

            return;
        }

        throw ValidationException::withMessages(['shipment' => 'Booking Biteship belum tersedia untuk disinkronkan.']);
    }

    public function applyBiteshipPayload(Shipment $shipment, array $payload, string $source = 'biteship'): void
    {
        DB::transaction(function () use ($shipment, $payload, $source): void {
            $order = Order::query()->whereKey($shipment->order_id)->lockForUpdate()->firstOrFail();
            $shipment = Shipment::query()->whereKey($shipment->id)->lockForUpdate()->firstOrFail();
            $shipment->setRelation('order', $order);
            $payloadHash = hash('sha256', json_encode($payload, JSON_THROW_ON_ERROR));
            $shipment->update(['last_synced_at' => now()]);

            if ($shipment->trackings()->where('payload_hash', $payloadHash)->exists()) {
                Log::info('duplicate_biteship_tracking_ignored', ['shipment_id' => $shipment->id]);

                return;
            }

            $providerHappenedAt = $this->providerHappenedAt($payload);

            if ($providerHappenedAt && $shipment->trackings()->whereNotNull('provider_happened_at')->where('provider_happened_at', '>', $providerHappenedAt)->exists()) {
                Log::info('stale_biteship_event_ignored', ['shipment_id' => $shipment->id, 'provider_happened_at' => $providerHappenedAt->toDateTimeString()]);

                return;
            }

            $identifiers = $this->biteship->orderIdentifiers($payload);
            $status = $this->normalizeShippingStatus(
                Arr::get($payload, 'status')
                ?? Arr::get($payload, 'courier.status')
                ?? Arr::get($payload, 'tracking.status')
                ?? $shipment->shipping_status
            );

            if ($status !== $shipment->shipping_status && ! in_array($status, $this->nextShippingStatuses($shipment), true)) {
                Log::info('regressive_biteship_status_ignored', ['shipment_id' => $shipment->id, 'current' => $shipment->shipping_status, 'attempted' => $status]);

                return;
            }

            $shipment->update([
                'biteship_order_id' => $identifiers['biteship_order_id'] ?: $shipment->biteship_order_id,
                'biteship_tracking_id' => $identifiers['biteship_tracking_id'] ?: $shipment->biteship_tracking_id,
                'waybill_id' => $identifiers['waybill_id'] ?: $shipment->waybill_id,
                'shipping_status' => $status,
                'raw_order_response' => $payload,
                'shipped_at' => in_array($status, [ShippingStatus::Picked->value, ShippingStatus::InTransit->value], true) && ! $shipment->shipped_at ? now() : $shipment->shipped_at,
                'delivered_at' => $status === ShippingStatus::Delivered->value ? ($shipment->delivered_at ?? now()) : $shipment->delivered_at,
                'cancelled_at' => $status === ShippingStatus::Cancelled->value ? ($shipment->cancelled_at ?? now()) : $shipment->cancelled_at,
                'last_synced_at' => now(),
            ]);

            $shipment->trackings()->create([
                'status' => $status,
                'description' => Arr::get($payload, 'message') ?? Arr::get($payload, 'description') ?? "Biteship status {$status}.",
                'location' => Arr::get($payload, 'location') ?? Arr::get($payload, 'courier.routing_code'),
                'happened_at' => now(),
                'provider_happened_at' => $providerHappenedAt,
                'payload_hash' => $payloadHash,
                'raw_payload' => ['source' => $source, ...$payload],
            ]);

            $this->synchronizeOrder($order, $status);
        });
    }

    private function synchronizeOrder(Order $order, string $status): void
    {
        $payload = ['shipping_status' => $status];

        if ($order->payment_status === PaymentStatus::Paid->value && ! in_array($order->order_status, [OrderStatus::Completed->value, OrderStatus::Cancelled->value, OrderStatus::Refunded->value], true)) {
            $payload['order_status'] = match ($status) {
                'picked', 'in_transit' => OrderStatus::Shipped->value,
                'delivered' => OrderStatus::Delivered->value,
                'cancelled', 'problem' => OrderStatus::ShipmentProblem->value,
                'failed' => OrderStatus::ShipmentFailed->value,
                'lost' => OrderStatus::Lost->value,
                'returned' => OrderStatus::Returned->value,
                'confirmed', 'allocated' => in_array($order->order_status, [OrderStatus::ShipmentFailed->value, OrderStatus::ShipmentProblem->value], true) ? OrderStatus::ReadyToShip->value : $order->order_status,
                default => $order->order_status,
            };
        }

        $order->update($payload);
    }

    private function biteshipOrderPayload(Order $order, array $payload): array
    {
        $originPostalCode = $this->setting('store_postal_code', config('services.biteship.origin_postal_code'));
        $originAreaId = $this->validBiteshipAreaId($this->setting('origin_biteship_area_id', config('services.biteship.origin_area_id')));
        $destinationAreaId = $this->validBiteshipAreaId($order->address?->biteship_area_id);
        $destinationNote = trim((string) $order->address?->note);
        $destinationSubdistrict = trim((string) $order->address?->subdistrict);

        return array_filter([
            'shipper_contact_name' => $this->setting('shipper_name', config('services.biteship.shipper_name')) ?: $this->settings->get('store_name'),
            'shipper_contact_phone' => $this->setting('shipper_phone', config('services.biteship.shipper_phone')) ?: $this->settings->get('store_phone'),
            'shipper_contact_email' => $this->setting('store_email', config('services.biteship.shipper_email')),
            'shipper_organization' => $this->settings->get('store_name') ?: config('app.name'),
            'origin_contact_name' => $this->setting('shipper_name', config('services.biteship.origin_contact_name')) ?: $this->settings->get('store_name'),
            'origin_contact_phone' => $this->setting('shipper_phone', config('services.biteship.origin_contact_phone')) ?: $this->settings->get('store_phone'),
            'origin_contact_email' => $this->setting('store_email', config('services.biteship.origin_contact_email')),
            'origin_address' => $this->setting('origin_address', config('services.biteship.origin_address')) ?: $this->settings->get('store_address'),
            'origin_note' => $this->setting('origin_note', config('services.biteship.origin_note')),
            'origin_postal_code' => $originPostalCode ? (int) $originPostalCode : null,
            'origin_area_id' => $originAreaId,
            'origin_latitude' => $this->coordinate($this->setting('store_latitude')),
            'origin_longitude' => $this->coordinate($this->setting('store_longitude')),
            'destination_contact_name' => $order->address?->recipient_name ?: $order->customer_name,
            'destination_contact_phone' => $order->address?->recipient_phone ?: $order->customer_phone,
            'destination_contact_email' => $order->customer_email,
            'destination_address' => $order->address?->full_address.($destinationNote !== '' ? " ({$destinationNote})" : '').($destinationSubdistrict !== '' ? ", {$destinationSubdistrict}" : ''),
            'destination_note' => $destinationNote,
            'destination_postal_code' => $order->address?->postal_code ? (int) $order->address->postal_code : null,
            'destination_area_id' => $destinationAreaId,
            'destination_latitude' => $this->coordinate($order->address?->latitude),
            'destination_longitude' => $this->coordinate($order->address?->longitude),
            'courier_company' => $payload['courier_company'],
            'courier_type' => $payload['courier_type'],
            'courier_insurance' => 0,
            'delivery_type' => 'now',
            'order_note' => $order->notes,
            'reference_id' => $order->order_number,
            'metadata' => ['order_id' => $order->id, 'order_number' => $order->order_number],
            'items' => $order->items->map(fn ($item): array => array_filter([
                'name' => mb_substr($item->product_name, 0, 100),
                'description' => $item->variant_sku ?: $item->product_sku,
                'category' => 'fashion',
                'sku' => $item->variant_sku ?: $item->product_sku,
                'value' => (int) round((float) $item->price),
                'quantity' => $item->quantity,
                'weight' => max(1, (int) $item->weight),
                'height' => $item->height,
                'length' => $item->length,
                'width' => $item->width,
            ], fn ($value): bool => filled($value) || $value === 0))->values()->all(),
        ], fn ($value): bool => filled($value) || $value === 0 || is_array($value));
    }

    private function setting(string $key, ?string $fallback = null): ?string
    {
        return $this->settings->get($key) ?: $fallback;
    }

    private function coordinate(mixed $value): ?float
    {
        return is_numeric($value) ? (float) $value : null;
    }

    private function validBiteshipAreaId(?string $areaId): ?string
    {
        $areaId = trim((string) $areaId);

        return Str::startsWith($areaId, 'IDNP') ? $areaId : null;
    }

    private function shipmentPayload(array $payload, Shipment $shipment): array
    {
        return [
            ...$payload,
            'courier_company' => Str::lower($payload['courier_company'] ?: $shipment->courier_company),
            'courier_type' => Str::lower($payload['courier_type'] ?: $shipment->courier_type),
            'courier_service_name' => ($payload['courier_service_name'] ?? null) ?: $shipment->courier_service_name,
            'estimated_delivery' => ($payload['estimated_delivery'] ?? null) ?: $shipment->estimated_delivery,
        ];
    }

    private function validateBiteshipPayload(array $payload): void
    {
        $missing = collect([
            'origin_contact_name',
            'origin_contact_phone',
            'origin_address',
            'destination_contact_name',
            'destination_contact_phone',
            'destination_address',
            'courier_company',
            'courier_type',
            'delivery_type',
            'items',
        ])->filter(fn (string $key): bool => blank(Arr::get($payload, $key)))->values();

        if ($missing->isNotEmpty()) {
            throw ValidationException::withMessages([
                'shipment' => 'Data Biteship belum lengkap: '.$missing->implode(', '),
            ]);
        }

        if (blank(Arr::get($payload, 'origin_postal_code')) && blank(Arr::get($payload, 'origin_area_id'))) {
            throw ValidationException::withMessages(['shipment' => 'Origin postal code atau Biteship area ID wajib diisi.']);
        }

        if (blank(Arr::get($payload, 'destination_postal_code')) && blank(Arr::get($payload, 'destination_area_id'))) {
            throw ValidationException::withMessages(['shipment' => 'Destination postal code atau Biteship area ID wajib diisi.']);
        }
    }

    private function normalizeShippingStatus(?string $status): string
    {
        return match (strtolower((string) $status)) {
            'confirmed' => 'confirmed',
            'allocated', 'courier_assigned', 'picking_up' => 'allocated',
            'picked', 'picked_up' => 'picked',
            'in_transit', 'dropping_off', 'on_process', 'on_delivery', 'shipped' => 'in_transit',
            'delivered' => 'delivered',
            'cancelled', 'canceled' => 'cancelled',
            'failed', 'rejected' => 'failed',
            'lost' => 'lost',
            'returned' => 'returned',
            default => 'problem',
        };
    }

    private function sendShipmentCreatedEmail(Shipment $shipment): void
    {
        $shipment->loadMissing(['order.user', 'order.address', 'order.items']);

        $order = $shipment->order;
        $email = $order?->customer_email ?: $order?->user?->email;

        if (! filled($email)) {
            return;
        }

        try {
            Mail::to($email, $order?->customer_name)->send(new ShipmentCreatedMail($shipment));
        } catch (\Throwable $exception) {
            Log::warning('shipment_created_mail_failed', [
                'shipment_id' => $shipment->id,
                'order_id' => $order?->id,
                'email' => $email,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    private function providerHappenedAt(array $payload): ?CarbonImmutable
    {
        $value = Arr::get($payload, 'updated_at')
            ?? Arr::get($payload, 'created_at')
            ?? Arr::get($payload, 'event_time')
            ?? Arr::get($payload, 'timestamp')
            ?? Arr::get($payload, 'courier.updated_at')
            ?? Arr::get($payload, 'tracking.updated_at');

        if (! is_string($value) || blank($value)) {
            return null;
        }

        try {
            return CarbonImmutable::parse($value);
        } catch (\Throwable) {
            return null;
        }
    }

    private function row(Shipment $shipment): array
    {
        return [
            'id' => $shipment->id,
            'order_id' => $shipment->order_id,
            'order_number' => $shipment->order?->order_number,
            'customer' => $shipment->order?->customer_name,
            'waybill_id' => $shipment->waybill_id,
            'label_url' => $shipment->label_url,
            'courier_company' => $shipment->courier_company,
            'courier_type' => $shipment->courier_type,
            'courier_service_name' => $shipment->courier_service_name,
            'shipping_cost' => $shipment->shipping_cost,
            'shipping_status' => $shipment->shipping_status,
            'estimated_delivery' => $shipment->estimated_delivery,
            'shipped_at' => $shipment->shipped_at?->toDateTimeString(),
            'delivered_at' => $shipment->delivered_at?->toDateTimeString(),
            'created_at' => $shipment->created_at?->toFormattedDateString(),
        ];
    }
}
