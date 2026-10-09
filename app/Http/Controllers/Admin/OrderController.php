<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\OrderNoteRequest;
use App\Http\Requests\Admin\OrderStatusRequest;
use App\Models\Order;
use App\Services\Admin\OrderManagementService;
use App\Services\Admin\ShipmentManagementService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request, OrderManagementService $orders): Response
    {
        return inertia('admin/orders/index', $orders->indexData($request));
    }

    public function show(Order $order, OrderManagementService $orders, ShipmentManagementService $shipments): Response
    {
        $data = $orders->detailData($order);
        $shipment = $order->shipment;
        $data['order']['can_create_shipment'] = $shipment !== null
            && filled($shipment->courier_company)
            && filled($shipment->courier_type)
            && $shipments->canCreateShipment($order, $shipment);
        $data['order']['booking_uncertain'] = (bool) data_get($shipment?->raw_order_response, 'booking_uncertain', false);

        return inertia('admin/orders/show', $data);
    }

    public function updateStatus(OrderStatusRequest $request, Order $order, OrderManagementService $orders): RedirectResponse
    {
        $orders->updateStatus($order, $request->string('status')->toString());

        return back()->with('success', 'Order status berhasil diperbarui.');
    }

    public function updateNotes(OrderNoteRequest $request, Order $order, OrderManagementService $orders): RedirectResponse
    {
        $validated = $request->validated();

        $orders->updateNotes($order, $validated['notes'] ?? null);

        return back()->with('success', 'Internal note berhasil disimpan.');
    }
}
