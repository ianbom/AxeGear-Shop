const orderSteps: Record<string, number> = {
    pending_payment: 0,
    paid: 1,
    processing: 2,
    ready_to_ship: 3,
    shipment_created: 3,
    shipped: 4,
    delivered: 5,
    completed: 6,
};

const shippingSteps: Record<string, number> = {
    confirmed: 3,
    allocated: 3,
    picked: 4,
    in_transit: 4,
    delivered: 5,
};

const orderIssues: Record<string, string> = {
    cancelled: 'Pesanan dibatalkan.',
    payment_failed:
        'Pembayaran gagal. Periksa pembayaran sebelum memproses pesanan.',
    payment_expired: 'Batas waktu pembayaran telah habis.',
    shipment_failed:
        'Pengiriman gagal. Periksa hasil booking dan status kurir.',
    shipment_problem:
        'Pengiriman bermasalah. Periksa tracking dan konfirmasi kepada kurir.',
    lost: 'Paket dilaporkan hilang. Tindak lanjuti dengan kurir.',
    returned: 'Paket dikembalikan. Periksa alasan pengembalian.',
    refunded: 'Pembayaran telah dikembalikan.',
};

const paymentIssues: Record<string, string> = {
    failed: orderIssues.payment_failed,
    expired: orderIssues.payment_expired,
    cancelled: 'Pembayaran dibatalkan.',
    manual_review:
        'Pembayaran memerlukan pemeriksaan sebelum pesanan diproses.',
    refunded: orderIssues.refunded,
    partially_refunded:
        'Pembayaran dikembalikan sebagian. Periksa detail pembayaran.',
};

const shippingIssues: Record<string, string> = {
    failed: orderIssues.shipment_failed,
    problem: orderIssues.shipment_problem,
    lost: orderIssues.lost,
    returned: orderIssues.returned,
    cancelled:
        'Booking pengiriman dibatalkan, bukan pembatalan pesanan. Periksa pengiriman.',
};

export function getOrderWorkflow(order: {
    order_status: string;
    payment_status: string;
    shipping_status: string;
    paid_at?: string | null;
    shipment?: {
        shipping_status?: string | null;
        shipped_at?: string | null;
        delivered_at?: string | null;
    } | null;
    status_history?: { status: string | null }[];
    trackings?: { status: string }[];
}) {
    const shippingStatus =
        order.shipment?.shipping_status ?? order.shipping_status;

    return {
        currentStep: Math.max(
            orderSteps[order.order_status] ?? 0,
            order.paid_at || order.payment_status === 'paid' ? 1 : 0,
            shippingSteps[shippingStatus] ?? 0,
            order.shipment?.shipped_at ? 4 : 0,
            order.shipment?.delivered_at ? 5 : 0,
            ...(order.status_history ?? []).map(({ status }) =>
                Math.min(orderSteps[status ?? ''] ?? 0, 5),
            ),
            ...(order.trackings ?? []).map(
                ({ status }) => shippingSteps[status] ?? 0,
            ),
        ),
        completed: order.order_status === 'completed',
        issue:
            orderIssues[order.order_status] ??
            paymentIssues[order.payment_status] ??
            shippingIssues[shippingStatus] ??
            null,
    };
}
