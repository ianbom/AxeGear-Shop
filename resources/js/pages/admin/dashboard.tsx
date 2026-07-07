import { Head, Link, router } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowRight,
    Banknote,
    Box,
    CalendarDays,
    PackageCheck,
    Shirt,
    ShoppingBag,
    Truck,
} from 'lucide-react';
import { useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Button } from '@/components/ui/button';

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    maximumFractionDigits: 0,
    style: 'currency',
});

type SummaryItem = {
    label: string;
    value: number;
    format: 'currency' | 'number';
};

type ChartPoint = { date: string; revenue: number; orders?: number };

type RecentOrder = {
    id?: number;
    user_id?: number | null;
    order_number: string;
    customer_name: string;
    grand_total: number;
    payment_status: string;
    order_status: string;
    shipping_status: string;
    created_at?: string;
};

type LowStockVariant = {
    id?: number;
    product_id?: number | null;
    product_name: string | null;
    sku?: string;
    color_name?: string | null;
    size?: string | null;
    available_stock: number;
};

type AttentionOrder = {
    id: number;
    user_id?: number | null;
    order_number: string;
    customer_name: string;
    payment_status: string;
    order_status: string;
    shipping_status: string;
    action: string;
};

type SummaryMetric = { label: string; value: number };
type DashboardFilters = {
    range: string;
    date_from: string;
    date_to: string;
};

function summaryHref(label: string) {
    const normalized = label.toLowerCase();

    if (normalized.includes('payment')) {
        return '/admin/payments';
    }

    if (normalized.includes('shipment') || normalized.includes('delivery')) {
        return '/admin/shipments';
    }

    return '/admin/orders';
}

type Props = {
    filters: DashboardFilters;
    summary: SummaryItem[];
    salesChart: ChartPoint[];
    attentionOrders: AttentionOrder[];
    recentOrders: RecentOrder[];
    lowStockVariants: LowStockVariant[];
    paymentSummary: SummaryMetric[];
    shippingSummary: SummaryMetric[];
};

type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

function formatCurrency(value: number) {
    return currencyFormatter.format(value).replace('IDR', 'Rp').trim();
}

function formatSummaryValue(item: SummaryItem) {
    return item.format === 'currency'
        ? formatCurrency(item.value)
        : new Intl.NumberFormat('id-ID').format(item.value);
}

function dashboardStats(summary: SummaryItem[]) {
    return summary.slice(0, 4).map((item, index) => ({
        href:
            [
                '/admin/reports/sales',
                '/admin/orders',
                '/admin/orders',
                '/admin/stock',
            ][index] ?? '/admin/dashboard',
        icon: [Banknote, ShoppingBag, Truck, Box][index] ?? PackageCheck,
        label: item.label,
        note:
            [
                '+12% from yesterday',
                '5 waiting to be processed',
                'Paid orders need shipment',
                'Need restock soon',
            ][index] ?? 'Needs review today',
        value: formatSummaryValue(item),
    }));
}

function badgeTone(value: string | null | undefined): BadgeTone {
    const normalized = (value ?? '').toLowerCase();

    if (
        ['paid', 'delivered', 'completed', 'shipped', 'in transit'].some(
            (status) => normalized.includes(status),
        )
    ) {
        return 'success';
    }

    if (
        ['pending', 'processing', 'waiting', 'need shipment'].some((status) =>
            normalized.includes(status),
        )
    ) {
        return 'warning';
    }

    if (
        ['failed', 'cancelled', 'expired', 'issue', 'return', 'critical'].some(
            (status) => normalized.includes(status),
        )
    ) {
        return 'danger';
    }

    if (normalized === '-') {
        return 'neutral';
    }

    return 'info';
}

export default function AdminDashboard({
    filters,
    summary,
    salesChart,
    attentionOrders,
    recentOrders,
    lowStockVariants,
    paymentSummary,
    shippingSummary,
}: Props) {
    return (
        <>
            <Head title="Dasbor Admin" />

            <main className="flex min-h-[100dvh] flex-1 flex-col bg-canvas p-4 text-ink md:p-6">
                <div className="flex w-full min-w-0 flex-col gap-6 lg:gap-8">
                    <DashboardHeader filters={filters} />
                    <StatCards stats={dashboardStats(summary)} />
                    <StatusSummary
                        paymentSummary={paymentSummary}
                        shippingSummary={shippingSummary}
                    />

                    <div className="grid grid-cols-1 gap-6 border-t border-hairline-strong pt-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)] lg:gap-10 lg:pt-8">
                        <div className="flex min-w-0 flex-col gap-6 lg:gap-10">
                            <SalesTrendCard data={salesChart} />
                            <RecentOrdersTable
                                orders={recentOrders.slice(0, 5)}
                            />
                        </div>

                        <aside className="flex min-w-0 flex-col gap-6 border-t border-hairline-strong pt-6 lg:gap-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                            <OrdersNeedAttention orders={attentionOrders} />
                            <LowStockProductsCard
                                products={lowStockVariants.slice(0, 4)}
                            />
                        </aside>
                    </div>
                </div>
            </main>
        </>
    );
}

function DashboardHeader({ filters }: { filters: DashboardFilters }) {
    const [range, setRange] = useState(filters.range || '30d');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    const applyRange = (nextRange: string) => {
        setRange(nextRange);

        if (nextRange !== 'custom') {
            router.get(
                '/admin/dashboard',
                { range: nextRange },
                { preserveState: true, replace: true },
            );
        }
    };

    const applyCustomRange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(
            '/admin/dashboard',
            {
                range: 'custom',
                date_from: dateFrom,
                date_to: dateTo,
            },
            { preserveState: true, replace: true },
        );
    };

    const ranges = [
        { label: 'Today', value: 'today' },
        { label: '7D', value: '7d' },
        { label: '30D', value: '30d' },
        { label: 'Month', value: 'month' },
        { label: 'Custom', value: 'custom' },
    ];

    return (
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                    <Shirt className="size-4" strokeWidth={1.7} />
                    AxeGear Admin
                </p>
                <h1 className="text-[34px] leading-none font-semibold tracking-[-0.02em] text-ink uppercase sm:text-[42px]">
                    Dasbor
                </h1>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Pantau aktivitas toko hari ini dan tindakan penting.
                </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end lg:w-auto lg:justify-end">
                <form
                    onSubmit={applyCustomRange}
                    className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-end sm:justify-end"
                >
                    <div className="grid grid-cols-5 rounded-[6px] border border-hairline-strong bg-white p-1 sm:flex">
                        {ranges.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => applyRange(item.value)}
                                className={[
                                    'h-8 rounded-[4px] px-2 text-xs font-semibold transition-colors sm:px-3',
                                    range === item.value
                                        ? 'bg-[#1A1A1A] text-white'
                                        : 'text-muted-foreground hover:bg-surface-soft hover:text-ink',
                                ].join(' ')}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {range === 'custom' && (
                        <div className="grid grid-cols-1 gap-2 sm:flex sm:items-end">
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(event) =>
                                    setDateFrom(event.target.value)
                                }
                                className="h-9 w-full cursor-pointer rounded-[6px] border border-hairline-strong bg-white px-3 text-sm text-body shadow-none outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 sm:min-w-[150px]"
                            />
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(event) =>
                                    setDateTo(event.target.value)
                                }
                                className="h-9 w-full cursor-pointer rounded-[6px] border border-hairline-strong bg-white px-3 text-sm text-body shadow-none outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 sm:min-w-[150px]"
                            />
                            <Button
                                type="submit"
                                variant="outline"
                                className="h-9 w-full rounded-[6px] border-hairline-strong bg-white px-4 text-body shadow-none hover:bg-surface-soft hover:text-ink active:scale-[0.98] sm:w-auto"
                            >
                                <CalendarDays
                                    className="size-4"
                                    strokeWidth={1.7}
                                />
                                Apply
                            </Button>
                        </div>
                    )}
                </form>
                <Button
                    asChild
                    className="h-10 w-full rounded-[6px] bg-primary px-5 text-[12px] font-semibold tracking-[0.08em] text-white uppercase shadow-none hover:bg-[#E67312] active:scale-[0.98] sm:w-auto"
                >
                    <Link href="/admin/orders">
                        View Orders
                        <ArrowRight className="size-4" strokeWidth={1.7} />
                    </Link>
                </Button>
            </div>
        </header>
    );
}

function StatCards({ stats }: { stats: ReturnType<typeof dashboardStats> }) {
    return (
        <section className="grid grid-cols-1 divide-y divide-hairline-strong overflow-hidden rounded-[8px] border border-hairline-strong bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="block px-4 py-4 transition-colors hover:bg-primary-soft sm:px-5 sm:py-5"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex size-9 items-center justify-center rounded-[6px] border border-hairline-strong bg-surface-soft text-muted-foreground">
                                <Icon className="size-5" strokeWidth={1.7} />
                            </div>
                            <span className="rounded-full border border-hairline-strong bg-surface-soft px-3 py-1 text-[11px] font-medium text-muted-foreground">
                                Today
                            </span>
                        </div>
                        <p className="mt-4 text-sm font-semibold text-body sm:mt-5">
                            {stat.label}
                        </p>
                        <p className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                            {stat.value}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {stat.note}
                        </p>
                    </Link>
                );
            })}
        </section>
    );
}

function StatusSummary({
    paymentSummary,
    shippingSummary,
}: {
    paymentSummary: SummaryMetric[];
    shippingSummary: SummaryMetric[];
}) {
    return (
        <section className="grid grid-cols-1 gap-4 border-b border-hairline-strong pb-6 lg:grid-cols-2 lg:gap-8">
            <MiniSummaryCard
                icon={Banknote}
                items={paymentSummary}
                title="Payment Summary"
            />
            <MiniSummaryCard
                icon={Truck}
                items={shippingSummary}
                title="Shipping Summary"
            />
        </section>
    );
}

function MiniSummaryCard({
    icon: Icon,
    items,
    title,
}: {
    icon: typeof Banknote;
    items: SummaryMetric[];
    title: string;
}) {
    return (
        <article className="rounded-[8px] border border-hairline-strong p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-[6px] border border-hairline-strong bg-surface-soft text-muted-foreground">
                    <Icon className="size-4" strokeWidth={1.7} />
                </div>
                <h2 className="text-sm font-semibold text-ink">{title}</h2>
            </div>
            <div className="grid grid-cols-2 gap-y-3 border-t border-hairline-strong pt-3 sm:grid-cols-4 sm:divide-x sm:divide-hairline-strong">
                {items.map((item) => (
                    <Link
                        key={item.label}
                        href={summaryHref(item.label)}
                        className="block px-2 transition-colors first:pl-0 hover:bg-primary-soft sm:px-4 sm:last:pr-0"
                    >
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="mt-1 text-xl font-bold tracking-tight text-ink">
                            {item.value}
                        </p>
                    </Link>
                ))}
            </div>
        </article>
    );
}

function SalesTrendCard({ data }: { data: ChartPoint[] }) {
    return (
        <section className="rounded-[8px] border border-hairline-strong p-4 sm:p-5">
            <SectionHeader
                subtitle="Revenue and orders from the last 7 days"
                title="Sales Trend"
            />

            <div className="mt-5 h-[240px] border-y border-hairline-strong bg-surface-soft py-4 sm:h-[310px] sm:py-5">
                <ResponsiveContainer height="100%" width="100%">
                    <BarChart
                        data={data}
                        margin={{ left: 6, right: 8, top: 12 }}
                    >
                        <CartesianGrid
                            stroke="#e5e5e5"
                            strokeDasharray="3 3"
                            vertical={false}
                        />
                        <XAxis
                            axisLine={false}
                            dataKey="date"
                            tick={{ fill: '#707070', fontSize: 11 }}
                            tickLine={false}
                        />
                        <YAxis
                            axisLine={false}
                            tick={{ fill: '#707070', fontSize: 11 }}
                            tickFormatter={(value) =>
                                `Rp ${Number(value) / 1000000}m`
                            }
                            tickLine={false}
                            width={58}
                        />
                        <Tooltip
                            contentStyle={{
                                background: '#ffffff',
                                border: '1px solid #cfcfcf',
                                borderRadius: 8,
                                boxShadow: '0 10px 20px -16px rgba(0,0,0,0.3)',
                                color: '#1A1A1A',
                            }}
                            formatter={(value) => [
                                formatCurrency(Number(value)),
                                'Revenue',
                            ]}
                            labelStyle={{ color: '#707070' }}
                        />
                        <Bar
                            dataKey="revenue"
                            fill="#F58220"
                            radius={[12, 12, 4, 4]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}

function OrdersNeedAttention({ orders }: { orders: AttentionOrder[] }) {
    return (
        <section className="rounded-[8px] border border-hairline-strong p-4 sm:p-5">
            <SectionHeader
                icon={AlertTriangle}
                subtitle="Admin actions with highest priority"
                title="Orders Need Attention"
            />

            <div className="mt-5 divide-y divide-hairline-strong border-y border-hairline-strong">
                {orders.map((order) => (
                    <article
                        key={order.id}
                        className="-mx-3 px-3 py-4 transition-colors hover:bg-primary-soft"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <Link
                                    href={`/admin/orders/${order.id}`}
                                    className="text-sm font-semibold text-ink transition-colors hover:text-[#1A1A1A]"
                                >
                                    {order.order_number}
                                </Link>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Customer:{' '}
                                    {order.user_id ? (
                                        <Link
                                            href={`/admin/customers/${order.user_id}`}
                                            className="transition-colors hover:text-[#1A1A1A]"
                                        >
                                            {order.customer_name}
                                        </Link>
                                    ) : (
                                        order.customer_name
                                    )}
                                </p>
                            </div>
                            <StatusBadge label={order.payment_status} />
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                            <StatusBadge label={order.shipping_status} />
                            <Button
                                asChild
                                variant="outline"
                                className="h-8 rounded-[6px] border-hairline-strong bg-white px-3 text-xs text-body shadow-none hover:bg-surface-soft active:scale-[0.98]"
                            >
                                <Link href={`/admin/orders/${order.id}`}>
                                    {order.action}
                                </Link>
                            </Button>
                        </div>
                    </article>
                ))}
                {orders.length === 0 && (
                    <p className="py-5 text-sm text-muted-foreground">
                        No orders need action right now.
                    </p>
                )}
            </div>
        </section>
    );
}

function RecentOrdersTable({ orders }: { orders: RecentOrder[] }) {
    return (
        <section className="rounded-[8px] border border-hairline-strong p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <SectionHeader
                    subtitle="Latest activity from checkout"
                    title="Recent Orders"
                />
                <Button
                    asChild
                    variant="outline"
                    className="h-9 w-full rounded-[6px] border-hairline-strong bg-white px-4 text-body shadow-none hover:bg-surface-soft sm:w-auto"
                >
                    <Link href="/admin/orders">Open Orders</Link>
                </Button>
            </div>

            <div className="mt-5 overflow-x-auto rounded-[8px] border-y border-hairline-strong">
                <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="border-b border-hairline-strong bg-surface-soft text-xs tracking-wider text-muted-foreground uppercase">
                        <tr>
                            {[
                                'Order',
                                'Customer',
                                'Payment',
                                'Order Status',
                                'Shipping',
                                'Total',
                                'Date',
                            ].map((heading) => (
                                <th
                                    key={heading}
                                    className="py-4 pr-5 font-semibold first:pl-4"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-hairline-strong">
                        {orders.map((order, index) => (
                            <tr
                                key={`${order.order_number}-${index}`}
                                className="transition-colors hover:bg-primary-soft"
                            >
                                <td className="py-4 pr-5 pl-4 font-semibold text-ink">
                                    {order.id ? (
                                        <Link
                                            href={`/admin/orders/${order.id}`}
                                            className="transition-colors hover:text-[#1A1A1A]"
                                        >
                                            {order.order_number}
                                        </Link>
                                    ) : (
                                        order.order_number
                                    )}
                                </td>
                                <td className="py-4 pr-5 text-body">
                                    {order.user_id ? (
                                        <Link
                                            href={`/admin/customers/${order.user_id}`}
                                            className="transition-colors hover:text-[#1A1A1A]"
                                        >
                                            {order.customer_name}
                                        </Link>
                                    ) : (
                                        order.customer_name
                                    )}
                                </td>
                                <td className="py-4 pr-5">
                                    <StatusBadge label={order.payment_status} />
                                </td>
                                <td className="py-4 pr-5">
                                    <StatusBadge label={order.order_status} />
                                </td>
                                <td className="py-4 pr-5">
                                    <StatusBadge
                                        label={order.shipping_status}
                                    />
                                </td>
                                <td className="py-4 pr-5 font-semibold text-ink">
                                    {formatCurrency(order.grand_total)}
                                </td>
                                <td className="py-4 text-muted-foreground">
                                    {order.created_at ?? 'Today'}
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td
                                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                                    colSpan={7}
                                >
                                    No recent orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function LowStockProductsCard({ products }: { products: LowStockVariant[] }) {
    return (
        <section className="rounded-[8px] border border-hairline-strong p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <SectionHeader
                    icon={Box}
                    subtitle="Products that need restock soon"
                    title="Low Stock Products"
                />
                <Button
                    asChild
                    variant="outline"
                    className="h-9 w-full rounded-[6px] border-hairline-strong bg-white px-4 text-body shadow-none hover:bg-surface-soft sm:w-auto"
                >
                    <Link href="/admin/stock">Manage Stock</Link>
                </Button>
            </div>

            <div className="mt-5 divide-y divide-hairline-strong border-y border-hairline-strong">
                {products.map((product, index) => {
                    const status = stockStatus(product.available_stock);

                    return (
                        <article
                            key={`${product.product_name}-${index}`}
                            className="-mx-3 flex flex-col gap-3 px-3 py-4 transition-colors hover:bg-primary-soft sm:flex-row sm:items-center sm:gap-4"
                        >
                            <div className="flex size-10 items-center justify-center rounded-[6px] border border-hairline-strong bg-surface-soft text-muted-foreground">
                                <PackageCheck
                                    className="size-5"
                                    strokeWidth={1.7}
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                {product.product_id ? (
                                    <Link
                                        href={`/admin/products/${product.product_id}`}
                                        className="block truncate text-sm font-semibold text-ink transition-colors hover:text-[#1A1A1A]"
                                    >
                                        {product.product_name ??
                                            'Unnamed Product'}
                                    </Link>
                                ) : (
                                    <p className="truncate text-sm font-semibold text-ink">
                                        {product.product_name ??
                                            'Unnamed Product'}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {[
                                        product.color_name,
                                        product.size && `Size ${product.size}`,
                                    ]
                                        .filter(Boolean)
                                        .join(' · ') || 'Standard variant'}
                                </p>
                            </div>
                            <div className="w-full text-left sm:w-auto sm:text-right">
                                {product.id ? (
                                    <Link
                                        href={`/admin/product-variants/${product.id}/stock-adjustment`}
                                        className="text-sm font-semibold text-ink transition-colors hover:text-[#1A1A1A]"
                                    >
                                        Stock: {product.available_stock}
                                    </Link>
                                ) : (
                                    <p className="text-sm font-semibold text-ink">
                                        Stock: {product.available_stock}
                                    </p>
                                )}
                                <div className="mt-1">
                                    <StatusBadge label={status} />
                                </div>
                            </div>
                        </article>
                    );
                })}
                {products.length === 0 && (
                    <p className="py-5 text-sm text-muted-foreground">
                        No low stock products right now.
                    </p>
                )}
            </div>
        </section>
    );
}

function SectionHeader({
    icon: Icon,
    subtitle,
    title,
}: {
    icon?: typeof AlertTriangle;
    subtitle: string;
    title: string;
}) {
    return (
        <div>
            <div className="flex items-center gap-2">
                {Icon && (
                    <Icon className="size-4 text-[#1A1A1A]" strokeWidth={1.7} />
                )}
                <h2 className="text-lg font-semibold tracking-tight text-ink">
                    {title}
                </h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
    );
}

function StatusBadge({ label }: { label: string }) {
    const tone = badgeTone(label);
    const toneClasses: Record<BadgeTone, string> = {
        danger: 'border-red-100 bg-red-50 text-red-600',
        info: 'border-blue-200 bg-blue-50 text-blue-700',
        neutral: 'border-hairline-strong bg-surface-soft text-muted-foreground',
        success: 'border-emerald-100 bg-emerald-50 text-emerald-700',
        warning: 'border-amber-200 bg-amber-50 text-amber-700',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
        >
            {label}
        </span>
    );
}

function stockStatus(stock: number) {
    if (stock === 0) {
        return 'Out of Stock';
    }

    if (stock <= 1) {
        return 'Critical';
    }

    return 'Low Stock';
}
