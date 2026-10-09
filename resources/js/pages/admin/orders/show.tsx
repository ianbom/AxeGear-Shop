import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Box,
    CalendarDays,
    Check,
    Mail,
    MapPin,
    TriangleAlert,
    UserRound,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
    index as ordersIndex,
    updateStatus,
} from '@/actions/App/Http/Controllers/Admin/OrderController';
import { Button } from '@/components/ui/button';
import { getOrderWorkflow } from '@/lib/order-workflow';
import {
    show as paymentShow,
    sync as syncPayment,
} from '@/routes/admin/payments';
import { show as shipmentShow } from '@/routes/admin/shipments';

interface OrderItem {
    id: number;
    product_id: number | null;
    product_name: string;
    product_sku: string | null;
    variant_sku: string | null;
    color_name: string | null;
    size: string | null;
    price: string | number;
    quantity: number;
    subtotal: string | number;
    product_image_url: string | null;
}

interface Address {
    recipient_name?: string | null;
    recipient_phone?: string | null;
    province?: string | null;
    city?: string | null;
    district?: string | null;
    subdistrict?: string | null;
    postal_code?: string | null;
    full_address?: string | null;
    note?: string | null;
}

interface Payment {
    id: number;
    payment_provider?: string | null;
    payment_method?: string | null;
    midtrans_order_id?: string | null;
    midtrans_transaction_id?: string | null;
    transaction_status?: string | null;
    fraud_status?: string | null;
    gross_amount?: string | number | null;
    paid_at?: string | null;
    expired_at?: string | null;
    raw_response?: unknown;
}

interface Shipment {
    id?: number;
    biteship_order_id?: string | null;
    courier_company?: string | null;
    courier_type?: string | null;
    courier_service_name?: string | null;
    waybill_id?: string | null;
    shipping_status?: string | null;
    shipping_cost?: string | number | null;
    estimated_delivery?: string | null;
    shipped_at?: string | null;
    delivered_at?: string | null;
}

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    subtotal: string | number;
    discount_amount: string | number;
    shipping_cost: string | number;
    service_fee: string | number;
    grand_total: string | number;
    voucher_code: string | null;
    payment_status: string;
    order_status: string;
    allowedStatuses: string[];
    status_history: {
        id: number;
        status: string | null;
        actor: string;
        created_at: string | null;
    }[];
    shipping_status: string;
    created_at: string | null;
    paid_at: string | null;
    cancelled_at?: string | null;
    expired_at?: string | null;
    completed_at: string | null;
    notes: string | null;
    no_return_refund_agreed: boolean;
    no_return_refund_agreed_at: string | null;
    items: OrderItem[];
    address: Address | null;
    payment: Payment | null;
    payment_logs: {
        id: number;
        event_type: string | null;
        transaction_status: string | null;
        processed_at: string | null;
        created_at?: string | null;
    }[];
    shipment: Shipment | null;
    trackings: {
        id: number;
        status: string;
        description: string | null;
        location: string | null;
        happened_at: string | null;
    }[];
}

interface Props {
    order: Order;
}

type Tab =
    | 'overview'
    | 'products'
    | 'customer'
    | 'payment'
    | 'shipping'
    | 'activity';

const tabs: { value: Tab; label: string }[] = [
    { value: 'overview', label: 'Overview' },
    { value: 'products', label: 'Products' },
    { value: 'customer', label: 'Customer' },
    { value: 'payment', label: 'Payment' },
    { value: 'shipping', label: 'Shipping' },
    { value: 'activity', label: 'Activity' },
];

const actionLabels: Record<string, string> = {
    processing: 'Mulai proses pesanan',
    ready_to_ship: 'Selesai packing: siap dikirim',
    completed: 'Selesaikan pesanan',
};

const money = (value: string | number | null | undefined) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(Number(value ?? 0));

const date = (value: string | null | undefined) => {
    if (!value) {
        return '—';
    }

    const timestamp = new Date(value);

    if (Number.isNaN(timestamp.getTime())) {
        return '—';
    }

    return `${new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        timeZone: 'Asia/Jakarta',
    }).format(timestamp)} WIB`;
};

const label = (value: string | null | undefined) =>
    value ? value.replaceAll('_', ' ') : '—';

export default function OrderShow({ order }: Props) {
    const [tab, setTab] = useState<Tab>('overview');
    const [processing, setProcessing] = useState(false);
    const [statusError, setStatusError] = useState('');
    const availableStatuses = order.allowedStatuses;

    const activities = useMemo(
        () =>
            [
                ...order.status_history.map((item) => ({
                    id: `order-${item.id}`,
                    title: `${label(item.status)} - ${item.actor}`,
                    time: item.created_at,
                })),
                ...order.trackings.map((item) => ({
                    id: `shipping-${item.id}`,
                    title: item.description ?? `Shipping ${label(item.status)}`,
                    time: item.happened_at,
                })),
                ...order.payment_logs.map((item) => ({
                    id: `payment-${item.id}`,
                    title: item.event_type
                        ? label(item.event_type)
                        : `Payment ${label(item.transaction_status)}`,
                    time: item.processed_at ?? item.created_at ?? null,
                })),
                {
                    id: 'created',
                    title: 'Order created',
                    time: order.created_at,
                },
            ].sort((a, b) =>
                String(b.time ?? '').localeCompare(String(a.time ?? '')),
            ),
        [order],
    );

    return (
        <>
            <Head title={`Order Detail - ${order.order_number}`} />
            <main className="flex-1 bg-[#fafafa] px-4 py-5 text-[#171717] sm:px-6 lg:px-7">
                <div className="mx-auto flex max-w-[1440px] flex-col gap-5">
                    <PageHeader
                        order={order}
                        availableStatuses={availableStatuses}
                        processing={processing}
                        onStatusChange={(nextStatus) => {
                            setProcessing(true);
                            setStatusError('');
                            router.post(
                                updateStatus.url(order.id),
                                { status: nextStatus },
                                {
                                    preserveScroll: true,
                                    onError: (errors) =>
                                        setStatusError(
                                            errors.status ??
                                                'Perubahan status gagal.',
                                        ),
                                    onFinish: () => setProcessing(false),
                                },
                            );
                        }}
                    />
                    {statusError && (
                        <p role="alert" className="text-sm text-destructive">
                            {statusError}
                        </p>
                    )}
                    <OrderBanner order={order} />
                    <OrderWorkflow order={order} />

                    <nav
                        className="flex overflow-x-auto border-b border-[#dedede]"
                        aria-label="Order detail sections"
                    >
                        {tabs.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => setTab(item.value)}
                                className={`relative min-w-28 px-5 py-3 text-sm transition-colors ${
                                    tab === item.value
                                        ? 'font-semibold text-[#111]'
                                        : 'text-[#4f4f4f] hover:text-[#111]'
                                }`}
                            >
                                {item.label}
                                {tab === item.value && (
                                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#f0440b]" />
                                )}
                            </button>
                        ))}
                    </nav>

                    {tab === 'overview' && (
                        <Overview order={order} activities={activities} />
                    )}
                    {tab === 'products' && <Products order={order} />}
                    {tab === 'customer' && <Customer order={order} />}
                    {tab === 'payment' && <PaymentTab order={order} />}
                    {tab === 'shipping' && <ShippingTab order={order} />}
                    {tab === 'activity' && (
                        <ActivityList activities={activities} expanded />
                    )}
                </div>
            </main>
        </>
    );
}

function PageHeader({
    order,
    availableStatuses,
    processing,
    onStatusChange,
}: {
    order: Order;
    availableStatuses: string[];
    processing: boolean;
    onStatusChange: (status: string) => void;
}) {
    const nextStatus = availableStatuses[0];

    return (
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#484848] uppercase">
                    <Link
                        href={ordersIndex.url()}
                        className="inline-flex items-center gap-1 hover:text-[#f0440b]"
                    >
                        <ArrowLeft className="size-3" /> Sales Management
                    </Link>
                    <span>/</span>
                    <span>Orders</span>
                    <span>/</span>
                    <span className="font-semibold text-[#171717]">
                        Order Detail
                    </span>
                </div>
                <h1 className="mt-3 text-2xl font-bold tracking-tight">
                    Order Detail
                </h1>
                <p className="mt-1 text-sm text-[#555]">
                    Review complete customer order, payment, fulfillment,
                    shipping and transaction information.
                </p>
            </div>
            <div className="flex flex-wrap gap-3">
                <Link
                    href={ordersIndex.url()}
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-[#d8d8d8] bg-white px-5 text-sm font-medium shadow-sm transition hover:bg-[#f5f5f5]"
                >
                    <ArrowLeft className="size-4" /> Back to Orders
                </Link>
                {nextStatus && (
                    <Button
                        type="button"
                        disabled={processing}
                        onClick={() => onStatusChange(nextStatus)}
                        className="h-auto min-h-10 bg-[#d93a08] whitespace-normal text-white hover:bg-[#b83007]"
                    >
                        {processing
                            ? 'Menyimpan...'
                            : (actionLabels[nextStatus] ?? label(nextStatus))}
                    </Button>
                )}
                {!nextStatus &&
                    order.payment &&
                    ['pending', 'manual_review'].includes(
                        order.payment_status,
                    ) && (
                        <Button asChild>
                            <Link href={paymentShow.url(order.payment.id)}>
                                Periksa pembayaran
                            </Link>
                        </Button>
                    )}
                {!nextStatus &&
                    order.payment_status === 'paid' &&
                    order.shipment?.id &&
                    !['completed', 'cancelled', 'refunded'].includes(
                        order.order_status,
                    ) && (
                        <Button asChild>
                            <Link href={shipmentShow.url(order.shipment.id)}>
                                {order.order_status === 'ready_to_ship' &&
                                !order.shipment.biteship_order_id
                                    ? 'Booking kurir'
                                    : 'Pantau / tangani pengiriman'}
                            </Link>
                        </Button>
                    )}
            </div>
        </header>
    );
}

function OrderWorkflow({ order }: { order: Order }) {
    const steps = [
        { title: 'Dipesan', description: 'Pesanan dibuat pelanggan' },
        { title: 'Dibayar', description: 'Pembayaran terkonfirmasi' },
        { title: 'Diproses', description: 'Pengecekan dan packing' },
        {
            title: 'Siap Dikirim',
            description: 'Packing selesai, booking kurir',
        },
        { title: 'Dikirim', description: 'Barang dibawa kurir' },
        {
            title: 'Diterima Pelanggan',
            description: 'Kurir mengonfirmasi penerimaan',
        },
        { title: 'Selesai', description: 'Pesanan ditutup oleh admin' },
    ];
    const { currentStep, completed, issue } = getOrderWorkflow(order);

    return (
        <section
            aria-labelledby="order-workflow-title"
            className="@container min-w-0 rounded-xl border border-[#dedede] bg-white p-4 sm:p-5"
        >
            <h2 id="order-workflow-title" className="text-base font-bold">
                Alur Pesanan
            </h2>
            <p role="status" className="mt-1 text-sm text-[#555]">
                {issue
                    ? 'Alur memerlukan pemeriksaan; progres terakhir ditampilkan di bawah.'
                    : completed
                      ? 'Seluruh tahap pesanan selesai.'
                      : `Tahap saat ini: ${steps[currentStep].title}.`}
            </p>
            {issue && (
                <p className="mt-3 flex items-start gap-2 rounded-md border border-[#f58220] bg-[#fff7ed] p-3 text-sm text-[#1a1a1a]">
                    <TriangleAlert
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0"
                    />
                    {issue}
                </p>
            )}
            <ol
                aria-label="Workflow pesanan"
                className="mt-5 grid grid-cols-1 @min-[900px]:grid-cols-7"
            >
                {steps.map((step, index) => {
                    const isCurrent = index === currentStep && !completed;
                    const isDone = index < currentStep || completed;

                    return (
                        <li
                            key={step.title}
                            aria-current={isCurrent ? 'step' : undefined}
                            className="relative flex min-w-0 items-start gap-3 pb-6 last:pb-0 @min-[900px]:flex-col @min-[900px]:items-center @min-[900px]:px-2 @min-[900px]:pb-0 @min-[900px]:text-center"
                        >
                            {index < steps.length - 1 && (
                                <span
                                    aria-hidden="true"
                                    className={`absolute top-9 bottom-0 left-[17px] w-px @min-[900px]:top-[17px] @min-[900px]:bottom-auto @min-[900px]:left-[calc(50%+18px)] @min-[900px]:h-px @min-[900px]:w-[calc(100%-36px)] ${index < currentStep ? 'bg-[#1a1a1a]' : 'bg-[#dedede]'}`}
                                />
                            )}
                            <span
                                aria-hidden="true"
                                className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${isDone ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white' : isCurrent ? 'border-[#f58220] bg-[#f58220] text-[#1a1a1a]' : 'border-[#dedede] bg-white text-[#555]'}`}
                            >
                                {isDone ? (
                                    <Check className="size-4" />
                                ) : isCurrent && issue ? (
                                    <TriangleAlert className="size-4" />
                                ) : (
                                    index + 1
                                )}
                            </span>
                            <div className="min-w-0">
                                <h3 className="text-sm font-semibold text-[#1a1a1a]">
                                    {step.title}
                                </h3>
                                <p className="mt-1 text-xs leading-5 text-[#555]">
                                    {step.description}
                                </p>
                                <p className="mt-1 text-xs font-medium text-[#555]">
                                    {isDone
                                        ? 'Selesai'
                                        : isCurrent
                                          ? issue
                                              ? 'Perlu diperiksa'
                                              : 'Saat ini'
                                          : 'Belum'}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}

function OrderBanner({ order }: { order: Order }) {
    return (
        <section className="grid overflow-hidden rounded-xl border border-[#dedede] bg-white shadow-[0_3px_14px_rgba(0,0,0,0.06)] lg:grid-cols-[1.7fr_repeat(3,0.72fr)_1.05fr]">
            <div className="border-b border-[#e4e4e4] px-6 py-5 lg:border-r lg:border-b-0">
                <h2 className="font-mono text-xl font-bold">
                    Order #{order.order_number}
                </h2>
                <div className="mt-3 grid gap-2 text-sm text-[#4a4a4a]">
                    <p className="flex items-center gap-3">
                        <CalendarDays className="size-4" /> Placed on{' '}
                        {date(order.created_at)}
                    </p>
                    <p className="flex items-center gap-3">
                        <UserRound className="size-4" /> Customer:{' '}
                        {order.customer_name}
                    </p>
                    <p className="flex items-center gap-3">
                        <Mail className="size-4" /> Email:{' '}
                        {order.customer_email}
                    </p>
                </div>
            </div>
            <BannerStatus title="Payment" value={order.payment_status} />
            <BannerStatus title="Order Status" value={order.order_status} />
            <BannerStatus title="Shipping" value={order.shipping_status} />
            <div className="flex flex-col justify-center px-7 py-5">
                <p className="text-sm font-semibold">Total</p>
                <p className="mt-2 font-mono text-2xl font-bold">
                    {money(order.grand_total)}
                </p>
            </div>
        </section>
    );
}

function BannerStatus({ title, value }: { title: string; value: string }) {
    return (
        <div className="flex flex-col items-center justify-center border-b border-[#e4e4e4] px-4 py-5 lg:border-r lg:border-b-0">
            <p className="text-xs font-medium">{title}</p>
            <StatusBadge value={value} />
        </div>
    );
}

function StatusBadge({ value }: { value: string }) {
    const positive = [
        'paid',
        'completed',
        'delivered',
        'settlement',
        'capture',
    ].includes(value);
    const negative = ['failed', 'cancelled', 'expired', 'deny'].includes(value);

    return (
        <span
            className={`mt-3 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium capitalize ${
                positive
                    ? 'border-[#c8ebce] bg-[#edfaef] text-[#167329]'
                    : negative
                      ? 'border-red-200 bg-red-50 text-red-700'
                      : 'border-amber-200 bg-amber-50 text-amber-700'
            }`}
        >
            <span
                className={`size-2 rounded-full ${positive ? 'bg-[#2ba33d]' : negative ? 'bg-red-500' : 'bg-amber-500'}`}
            />
            {label(value)}
        </span>
    );
}

interface Activity {
    id: string;
    title: string;
    time: string | null;
}

function Overview({
    order,
    activities,
}: {
    order: Order;
    activities: Activity[];
}) {
    return (
        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.95fr)]">
            <div className="grid gap-4">
                <Panel>
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                        <div className="border-b border-[#e1e1e1] p-5 lg:border-r lg:border-b-0">
                            <PanelTitle>Order Information</PanelTitle>
                            <dl className="mt-5 grid gap-3">
                                <Detail label="Order Number">
                                    <span className="font-mono">
                                        {order.order_number}
                                    </span>
                                </Detail>
                                <Detail label="Order Date">
                                    {date(order.created_at)}
                                </Detail>
                                <Detail label="Payment Status">
                                    <InlineStatus
                                        value={order.payment_status}
                                    />
                                </Detail>
                                <Detail label="Order Status">
                                    <InlineStatus value={order.order_status} />
                                </Detail>
                                <Detail label="Shipping Status">
                                    <InlineStatus
                                        value={order.shipping_status}
                                    />
                                </Detail>
                                <Detail label="Paid At">
                                    {date(order.paid_at)}
                                </Detail>
                                <Detail label="Completed At">
                                    {date(order.completed_at)}
                                </Detail>
                            </dl>
                        </div>
                        <div className="p-5">
                            <PanelTitle>Panduan Pemenuhan Pesanan</PanelTitle>
                            <div className="mt-5 grid gap-3">
                                <StatusField
                                    label="Payment Status"
                                    value={order.payment_status}
                                />
                                <p className="text-sm text-[#555]">
                                    Periksa pembayaran, produk, alamat, dan
                                    catatan pelanggan. Mulai proses melalui
                                    tombol di atas; tandai siap dikirim setelah
                                    packing selesai.
                                </p>
                                <p className="text-sm text-[#555]">
                                    Pembayaran mengikuti Midtrans, pengiriman
                                    mengikuti Biteship. Pesanan hanya dapat
                                    diselesaikan setelah pembayaran lunas dan
                                    barang terkirim.
                                </p>
                                <StatusField
                                    label="Shipping Status"
                                    value={order.shipping_status}
                                />
                                {order.shipment?.id && (
                                    <Link
                                        href={shipmentShow.url(
                                            order.shipment.id,
                                        )}
                                        className="text-sm font-medium text-[#d93a08] underline"
                                    >
                                        Buka pengiriman dan booking kurir
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </Panel>

                <Panel className="p-5">
                    <PanelTitle>Customer Notes</PanelTitle>
                    <p className="mt-3 text-sm text-[#4a4a4a]">
                        {order.notes || 'Customer did not leave a note.'}
                    </p>
                    <div className="my-4 border-t border-[#e2e2e2]" />
                    <PanelTitle>Return & Refund Agreement</PanelTitle>
                    <p className="mt-3 text-sm">
                        {order.no_return_refund_agreed
                            ? 'No Return & Refund'
                            : 'Agreement not recorded'}
                    </p>
                </Panel>

                <ActivityList activities={activities.slice(0, 5)} />
            </div>

            <aside className="grid gap-4">
                <Summary order={order} />
                <AddressCard order={order} />
            </aside>
        </div>
    );
}

function StatusField({
    label: title,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <span className="mb-1.5 block text-sm">{title}</span>
            <div className="rounded-md border border-[#dedede] bg-[#fafafa] px-3 py-2.5 text-sm text-[#555] capitalize">
                {label(value)}
            </div>
        </div>
    );
}

function Summary({ order }: { order: Order }) {
    return (
        <Panel className="p-5">
            <PanelTitle>Order Summary</PanelTitle>
            <div className="mt-5 grid gap-3 text-sm">
                <SummaryRow label="Subtotal" value={money(order.subtotal)} />
                <SummaryRow
                    label="Discount"
                    value={`- ${money(order.discount_amount)}`}
                    danger
                />
                <SummaryRow
                    label="Shipping Cost"
                    value={money(order.shipping_cost)}
                />
                <SummaryRow
                    label="Service Fee"
                    value={money(order.service_fee)}
                />
                <div className="border-t border-[#dedede] pt-3">
                    <SummaryRow
                        label="Total"
                        value={money(order.grand_total)}
                        strong
                    />
                </div>
                <SummaryRow label="Voucher" value={order.voucher_code ?? '—'} />
            </div>
        </Panel>
    );
}

function AddressCard({ order }: { order: Order }) {
    const address = order.address;

    return (
        <Panel className="p-5">
            <PanelTitle>Customer & Shipping Address</PanelTitle>
            <div className="mt-5 flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0" />
                <div className="text-sm leading-6">
                    <p className="mb-3 text-xs text-[#555]">Shipping Address</p>
                    <p className="font-medium">
                        {address?.recipient_name ?? order.customer_name}
                    </p>
                    <p>{address?.full_address ?? 'Address unavailable'}</p>
                    <p>
                        {[
                            address?.city,
                            address?.province,
                            address?.postal_code,
                        ]
                            .filter(Boolean)
                            .join(', ')}
                    </p>
                    <p>{order.customer_phone}</p>
                </div>
            </div>
        </Panel>
    );
}

function Products({ order }: { order: Order }) {
    return (
        <Panel>
            <div className="border-b border-[#e1e1e1] p-5">
                <PanelTitle>Products Purchased</PanelTitle>
                <p className="mt-1 text-sm text-[#666]">
                    {order.items.length} product lines in this order.
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                    <thead className="border-b bg-[#fafafa] text-left text-xs text-[#555]">
                        <tr>
                            <th className="px-5 py-3">Product</th>
                            <th className="px-5 py-3">Variant</th>
                            <th className="px-5 py-3 text-right">Price</th>
                            <th className="px-5 py-3 text-center">Qty</th>
                            <th className="px-5 py-3 text-right">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e8e8e8]">
                        {order.items.map((item) => (
                            <tr key={item.id}>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        {item.product_image_url ? (
                                            <img
                                                src={item.product_image_url}
                                                alt={item.product_name}
                                                className="size-12 rounded-md border object-cover"
                                            />
                                        ) : (
                                            <div className="flex size-12 items-center justify-center rounded-md border bg-[#f5f5f5]">
                                                <Box className="size-5 text-[#888]" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold">
                                                {item.product_name}
                                            </p>
                                            <p className="font-mono text-xs text-[#666]">
                                                {item.product_sku ?? '—'}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-[#555]">
                                    {[
                                        item.variant_sku,
                                        item.color_name,
                                        item.size,
                                    ]
                                        .filter(Boolean)
                                        .join(' · ') || '—'}
                                </td>
                                <td className="px-5 py-4 text-right font-mono">
                                    {money(item.price)}
                                </td>
                                <td className="px-5 py-4 text-center font-mono">
                                    {item.quantity}
                                </td>
                                <td className="px-5 py-4 text-right font-mono font-semibold">
                                    {money(item.subtotal)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Panel>
    );
}

function Customer({ order }: { order: Order }) {
    return (
        <div className="grid gap-5 lg:grid-cols-2">
            <Panel className="p-5">
                <PanelTitle>Customer Information</PanelTitle>
                <div className="mt-5 grid gap-4">
                    <Detail label="Name">{order.customer_name}</Detail>
                    <Detail label="Email">{order.customer_email}</Detail>
                    <Detail label="Phone">{order.customer_phone}</Detail>
                </div>
            </Panel>
            <AddressCard order={order} />
        </div>
    );
}

function PaymentTab({ order }: { order: Order }) {
    const payment = order.payment;
    const [syncing, setSyncing] = useState(false);
    const [syncError, setSyncError] = useState('');

    return (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <Panel className="p-5">
                <PanelTitle>Payment Information</PanelTitle>
                {payment && (
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <Link
                            href={paymentShow.url(payment.id)}
                            className="text-sm font-medium underline"
                        >
                            Detail pembayaran
                        </Link>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={syncing}
                            onClick={() => {
                                setSyncing(true);
                                setSyncError('');
                                router.post(
                                    syncPayment.url(payment.id),
                                    {},
                                    {
                                        preserveScroll: true,
                                        onError: (errors) =>
                                            setSyncError(
                                                Object.values(errors).join(' '),
                                            ),
                                        onFinish: () => setSyncing(false),
                                    },
                                );
                            }}
                        >
                            {syncing
                                ? 'Menyinkronkan...'
                                : 'Sinkronkan Midtrans'}
                        </Button>
                        <p className="w-full text-sm text-[#555]">
                            Pembatalan dan refund diproses melalui Midtrans,
                            lalu sinkronkan status di sini.
                        </p>
                        {syncError && (
                            <p
                                role="alert"
                                className="text-sm text-destructive"
                            >
                                {syncError}
                            </p>
                        )}
                    </div>
                )}
                {payment ? (
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <Detail label="Provider">
                            {payment.payment_provider ?? '—'}
                        </Detail>
                        <Detail label="Method">
                            {payment.payment_method ?? '—'}
                        </Detail>
                        <Detail label="Transaction Status">
                            <InlineStatus
                                value={payment.transaction_status ?? 'unknown'}
                            />
                        </Detail>
                        <Detail label="Fraud Status">
                            {payment.fraud_status ?? '—'}
                        </Detail>
                        <Detail label="Gross Amount">
                            {money(payment.gross_amount)}
                        </Detail>
                        <Detail label="Paid At">{date(payment.paid_at)}</Detail>
                        <Detail label="Midtrans Order ID">
                            {payment.midtrans_order_id ?? '—'}
                        </Detail>
                        <Detail label="Transaction ID">
                            {payment.midtrans_transaction_id ?? '—'}
                        </Detail>
                    </div>
                ) : (
                    <Empty text="Payment record unavailable." />
                )}
            </Panel>
            <Panel className="p-5">
                <PanelTitle>Payment Activity</PanelTitle>
                <div className="mt-5">
                    <ActivityList
                        activities={order.payment_logs.map((item) => ({
                            id: String(item.id),
                            title: label(item.event_type),
                            time: item.processed_at ?? item.created_at ?? null,
                        }))}
                        embedded
                    />
                </div>
            </Panel>
        </div>
    );
}

function ShippingTab({ order }: { order: Order }) {
    const shipment = order.shipment;

    return (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <Panel className="p-5">
                <PanelTitle>Shipping Information</PanelTitle>
                {shipment?.id && (
                    <Link
                        href={shipmentShow.url(shipment.id)}
                        className="mt-4 inline-flex text-sm font-medium text-[#d93a08] underline"
                    >
                        Kelola pengiriman, booking kurir, dan label
                    </Link>
                )}
                {shipment ? (
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <Detail label="Courier">
                            {[shipment.courier_company, shipment.courier_type]
                                .filter(Boolean)
                                .join(' ') || '—'}
                        </Detail>
                        <Detail label="Service">
                            {shipment.courier_service_name ?? '—'}
                        </Detail>
                        <Detail label="Waybill ID">
                            {shipment.waybill_id ?? '—'}
                        </Detail>
                        <Detail label="Status">
                            <InlineStatus
                                value={
                                    shipment.shipping_status ??
                                    order.shipping_status
                                }
                            />
                        </Detail>
                        <Detail label="Shipping Cost">
                            {money(shipment.shipping_cost)}
                        </Detail>
                        <Detail label="Estimated Delivery">
                            {shipment.estimated_delivery ?? '—'}
                        </Detail>
                    </div>
                ) : (
                    <Empty text="Shipment has not been created." />
                )}
            </Panel>
            <Panel className="p-5">
                <PanelTitle>Tracking History</PanelTitle>
                <div className="mt-5">
                    <ActivityList
                        activities={order.trackings.map((item) => ({
                            id: String(item.id),
                            title:
                                item.description ??
                                `Shipping ${label(item.status)}`,
                            time: item.happened_at,
                        }))}
                        embedded
                    />
                </div>
            </Panel>
        </div>
    );
}

function ActivityList({
    activities,
    expanded = false,
    embedded = false,
}: {
    activities: Activity[];
    expanded?: boolean;
    embedded?: boolean;
}) {
    const content = activities.length ? (
        <div className="grid gap-0">
            {activities.map((item, index) => (
                <div
                    key={item.id}
                    className="grid grid-cols-[20px_minmax(0,1fr)] gap-x-3 text-sm sm:grid-cols-[20px_minmax(0,1fr)_auto]"
                >
                    <div className="row-span-2 flex flex-col items-center sm:row-span-1">
                        <span className="mt-0.5 flex size-4 items-center justify-center rounded-full bg-[#24953a] text-white">
                            <Check className="size-2.5" />
                        </span>
                        {index < activities.length - 1 && (
                            <span className="h-7 w-px border-l border-dashed border-[#bdbdbd]" />
                        )}
                    </div>
                    <p className="min-w-0 pb-1 break-words sm:pb-4">
                        {item.title}
                    </p>
                    <time className="col-start-2 pb-4 text-xs text-[#555] sm:col-start-auto">
                        {date(item.time)}
                    </time>
                </div>
            ))}
        </div>
    ) : (
        <Empty text="No activity recorded." />
    );

    if (embedded) {
        return content;
    }

    return (
        <Panel className="p-5">
            <PanelTitle>Order Activity {expanded ? '' : '(Latest)'}</PanelTitle>
            <div className="mt-5">{content}</div>
        </Panel>
    );
}

function Panel({
    children,
    className = '',
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`overflow-hidden rounded-xl border border-[#dedede] bg-white shadow-[0_3px_14px_rgba(0,0,0,0.055)] ${className}`}
        >
            {children}
        </section>
    );
}

function PanelTitle({ children }: { children: ReactNode }) {
    return <h2 className="text-base font-bold">{children}</h2>;
}

function Detail({
    label: title,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="grid grid-cols-[140px_minmax(0,1fr)] gap-4 text-sm">
            <dt className="text-[#454545]">{title}</dt>
            <dd className="min-w-0 font-medium break-words">{children}</dd>
        </div>
    );
}

function InlineStatus({ value }: { value: string }) {
    return (
        <span className="inline-flex items-center gap-2 capitalize">
            <span className="size-2 rounded-full bg-[#2ba33d]" />
            {label(value)}
        </span>
    );
}

function SummaryRow({
    label: title,
    value,
    danger = false,
    strong = false,
}: {
    label: string;
    value: string;
    danger?: boolean;
    strong?: boolean;
}) {
    return (
        <div
            className={`flex items-center justify-between gap-4 ${strong ? 'text-base font-bold' : ''}`}
        >
            <span>{title}</span>
            <span
                className={`${danger ? 'text-red-600' : ''} ${strong ? 'font-mono text-lg' : ''}`}
            >
                {value}
            </span>
        </div>
    );
}

function Empty({ text }: { text: string }) {
    return (
        <div className="mt-5 flex min-h-40 items-center justify-center rounded-lg border border-dashed border-[#ccc] bg-[#fafafa] text-sm text-[#666]">
            {text}
        </div>
    );
}
