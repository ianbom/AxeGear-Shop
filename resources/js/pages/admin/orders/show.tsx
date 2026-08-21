import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Box,
    CalendarDays,
    Check,
    ChevronDown,
    FileDown,
    Mail,
    MapPin,
    Save,
    UserRound,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
    index as ordersIndex,
    updateStatus,
} from '@/actions/App/Http/Controllers/Admin/OrderController';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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
    courier_company?: string | null;
    courier_type?: string | null;
    courier_service_name?: string | null;
    waybill_id?: string | null;
    shipping_status?: string | null;
    shipping_cost?: string | number | null;
    estimated_delivery?: string | null;
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

const statusTransitions: Record<string, string[]> = {
    paid: ['processing'],
    processing: ['ready_to_ship'],
    delivered: ['completed'],
    pending_payment: ['cancelled'],
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

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(value));
};

const label = (value: string | null | undefined) =>
    value ? value.replaceAll('_', ' ') : '—';

export default function OrderShow({ order }: Props) {
    const [tab, setTab] = useState<Tab>('overview');
    const [status, setStatus] = useState('');
    const [processing, setProcessing] = useState(false);
    const availableStatuses = statusTransitions[order.order_status] ?? [];

    const activities = useMemo(
        () =>
            [
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

    const saveStatus = () => {
        if (!status) {
            return;
        }

        setProcessing(true);
        router.post(
            updateStatus.url(order.id),
            { status },
            {
                preserveScroll: true,
                onSuccess: () => setStatus(''),
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <>
            <Head title={`Order Detail - ${order.order_number}`} />
            <main className="min-h-full bg-[#fafafa] px-4 py-5 text-[#171717] sm:px-6 lg:px-7">
                <div className="mx-auto flex max-w-[1440px] flex-col gap-5">
                    <PageHeader
                        availableStatuses={availableStatuses}
                        processing={processing}
                        onStatusChange={(nextStatus) => {
                            setProcessing(true);
                            router.post(
                                updateStatus.url(order.id),
                                { status: nextStatus },
                                {
                                    preserveScroll: true,
                                    onFinish: () => setProcessing(false),
                                },
                            );
                        }}
                    />
                    <OrderBanner order={order} />

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
                        <Overview
                            order={order}
                            status={status}
                            setStatus={setStatus}
                            saveStatus={saveStatus}
                            processing={processing}
                            availableStatuses={availableStatuses}
                            activities={activities}
                        />
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
    availableStatuses,
    processing,
    onStatusChange,
}: {
    availableStatuses: string[];
    processing: boolean;
    onStatusChange: (status: string) => void;
}) {
    const headerStatuses = ['cancelled', 'ready_to_ship', 'completed'];

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
                <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-[#d8d8d8] bg-white px-5 text-sm font-medium shadow-sm transition hover:bg-[#f5f5f5]"
                >
                    <FileDown className="size-4" /> Export
                </button>
                <div className="relative">
                    <select
                        aria-label="Update order status"
                        value=""
                        disabled={processing}
                        onChange={(event) => {
                            if (event.target.value) {
                                onStatusChange(event.target.value);
                            }
                        }}
                        className="h-10 cursor-pointer appearance-none rounded-md bg-[#f0440b] py-0 pr-10 pl-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d93a08] focus:ring-2 focus:ring-[#f0440b]/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <option value="" className="bg-white text-[#171717]">
                            Update Order
                        </option>
                        {headerStatuses.map((value) => (
                            <option
                                key={value}
                                value={value}
                                disabled={!availableStatuses.includes(value)}
                                className="bg-white text-[#171717] disabled:text-[#999]"
                            >
                                {label(value)}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-3 right-3 size-4 text-white" />
                </div>
            </div>
        </header>
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
    status,
    setStatus,
    saveStatus,
    processing,
    availableStatuses,
    activities,
}: {
    order: Order;
    status: string;
    setStatus: (value: string) => void;
    saveStatus: () => void;
    processing: boolean;
    availableStatuses: string[];
    activities: Activity[];
}) {
    return (
        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.95fr)]">
            <div className="grid gap-4">
                <Panel>
                    <div className="grid lg:grid-cols-[1fr_1.15fr]">
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
                        <div id="update-status" className="scroll-mt-5 p-5">
                            <PanelTitle>Update Status</PanelTitle>
                            <div className="mt-5 grid gap-3">
                                <StatusField
                                    label="Payment Status"
                                    value={order.payment_status}
                                />
                                <div>
                                    <label className="mb-1.5 block text-sm">
                                        Order Status
                                    </label>
                                    {availableStatuses.length ? (
                                        <Select
                                            value={status}
                                            onValueChange={setStatus}
                                        >
                                            <SelectTrigger className="h-10 border-[#d8d8d8] bg-white">
                                                <SelectValue placeholder="Select next status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableStatuses.map(
                                                    (value) => (
                                                        <SelectItem
                                                            key={value}
                                                            value={value}
                                                        >
                                                            {label(value)}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <p className="rounded-md border border-[#dedede] bg-[#fafafa] px-3 py-2.5 text-sm text-[#666]">
                                            No status change available.
                                        </p>
                                    )}
                                </div>
                                <StatusField
                                    label="Shipping Status"
                                    value={order.shipping_status}
                                />
                                {availableStatuses.length > 0 && (
                                    <Button
                                        type="button"
                                        onClick={saveStatus}
                                        disabled={processing || !status}
                                        className="mt-1 w-fit bg-[#f0440b] px-6 text-white hover:bg-[#d93a08]"
                                    >
                                        <Save className="size-4" /> Save Changes
                                    </Button>
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
            <button
                type="button"
                className="mt-4 h-9 rounded-md border border-[#d8d8d8] bg-white px-5 text-xs font-medium hover:bg-[#f5f5f5]"
            >
                View Full Address
            </button>
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

    return (
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <Panel className="p-5">
                <PanelTitle>Payment Information</PanelTitle>
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
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <Panel className="p-5">
                <PanelTitle>Shipping Information</PanelTitle>
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
                    className="grid grid-cols-[20px_minmax(0,1fr)_auto] gap-3 text-sm"
                >
                    <div className="flex flex-col items-center">
                        <span className="mt-0.5 flex size-4 items-center justify-center rounded-full bg-[#24953a] text-white">
                            <Check className="size-2.5" />
                        </span>
                        {index < activities.length - 1 && (
                            <span className="h-7 w-px border-l border-dashed border-[#bdbdbd]" />
                        )}
                    </div>
                    <p className="pb-4">{item.title}</p>
                    <time className="pb-4 text-xs text-[#777]">
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
            {!expanded && (
                <button
                    type="button"
                    className="mt-1 h-9 rounded-md border border-[#d8d8d8] bg-white px-8 text-xs font-medium hover:bg-[#f5f5f5]"
                >
                    View All Activity
                </button>
            )}
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
