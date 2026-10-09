import { Head, Link, router } from '@inertiajs/react';
import {
    Archive,
    ArrowLeft,
    Box,
    CheckCircle2,
    Eye,
    Image as ImageIcon,
    Info,
    Layers,
    Package,
    Pencil,
    ShoppingBag,
    Tag,
    Trash2,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import HTMLRender from '@/components/HTMLRender';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ActiveBadge, formatPrice } from '@/pages/admin/catalog/shared';
import { detail } from '@/routes';

type ProductImage = {
    id: number;
    image_url: string | null;
    alt_text: string;
    sort_order: number;
    is_primary: boolean;
};

type ProductVariant = {
    id: number;
    sku: string;
    variant_name: string | null;
    color_name: string | null;
    color_hex: string | null;
    size: string | null;
    package_type: string | null;
    regular_price: number | string | null;
    sale_price: number | string | null;
    stock: number;
    reserved_stock: number;
    image_url: string | null;
    is_active: boolean;
    order_items_count?: number;
};

type OrderItem = {
    id: number;
    order_id: number;
    quantity: number;
    subtotal: string | number;
    created_at: string | null;
};

type StockLog = {
    id: number;
    variant: string;
    type: string;
    quantity: number;
    stock_before: number;
    stock_after: number;
    created_at: string | null;
};

type Product = {
    id: number;
    category_id: number | string;
    collection_id: number | string;
    name: string;
    slug: string;
    sku: string;
    brand_name: string;
    product_line: string | null;
    style_name: string | null;
    short_description: string;
    description: string;
    regular_price: number | string;
    sale_price: number | string;
    weight: number | string;
    length: number | string;
    width: number | string;
    height: number | string;
    status: string;
    is_featured: boolean;
    is_new_arrival: boolean;
    is_best_seller: boolean;
    category: string | null;
    collection: string | null;
    images: ProductImage[];
    variants: ProductVariant[];
    orders: OrderItem[];
    stock_logs: StockLog[];
};

type Props = { product: Product };

const STATUS_STYLES: Record<
    string,
    { label: string; dot: string; badge: string }
> = {
    published: {
        label: 'Published',
        dot: 'bg-emerald-400',
        badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    },
    draft: {
        label: 'Draft',
        dot: 'bg-amber-400',
        badge: 'border-amber-200 bg-amber-50 text-amber-700',
    },
    archived: {
        label: 'Archived',
        dot: 'bg-zinc-400',
        badge: 'border-zinc-200 bg-zinc-100 text-zinc-600',
    },
};

const STOCK_LOG_TYPES: Record<string, string> = {
    adjustment: 'border-blue-200 bg-blue-50 text-blue-700',
    sale: 'border-red-200 bg-red-50 text-red-700',
    restock: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    cancel: 'border-amber-200 bg-amber-50 text-amber-700',
};
export default function ProductShow({ product }: Props) {
    const [activeImage, setActiveImage] = useState<ProductImage | null>(
        product.images.find((img) => img.is_primary) ??
            product.images[0] ??
            null,
    );

    const totalStock = product.variants.reduce(
        (sum, v) => sum + Number(v.stock),
        0,
    );
    const totalReserved = product.variants.reduce(
        (sum, v) => sum + Number(v.reserved_stock),
        0,
    );
    const activeVariants = product.variants.filter((v) => v.is_active).length;
    const status = STATUS_STYLES[product.status] ?? STATUS_STYLES['draft'];

    const doAction = (url: string, method: 'post' | 'delete' = 'post') =>
        router[method](url, {}, { preserveScroll: true });

    return (
        <>
            <Head title={product.name} />
            <div className="flex min-w-0 flex-1 flex-col gap-5 p-4 md:gap-6 md:p-6">
                <header className="space-y-4 border-b pb-5">
                    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">
                                Product Management
                            </p>
                            <h1 className="text-2xl font-semibold tracking-tight break-words">
                                {product.name}
                            </h1>
                            <p className="text-sm break-words text-muted-foreground">
                                SKU: {product.sku || '-'} ·{' '}
                                {product.category ?? 'No Category'} ·{' '}
                                {product.collection ?? 'No Collection'}
                            </p>
                        </div>
                        <Badge
                            variant="outline"
                            className={`shrink-0 gap-1.5 ${status.badge}`}
                        >
                            <span
                                className={`size-1.5 rounded-full ${status.dot}`}
                            />
                            {status.label}
                        </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button asChild variant="outline" size="sm">
                            <Link href="/admin/products">
                                <ArrowLeft className="size-3.5" /> Back
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href={`/admin/products/${product.id}/edit`}>
                                <Pencil className="size-3.5" /> Edit
                            </Link>
                        </Button>
                        {product.status !== 'published' && (
                            <Button
                                size="sm"
                                onClick={() =>
                                    doAction(
                                        `/admin/products/${product.id}/publish`,
                                    )
                                }
                            >
                                <CheckCircle2 className="size-3.5" /> Publish
                            </Button>
                        )}
                        {product.status !== 'archived' && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    doAction(
                                        `/admin/products/${product.id}/archive`,
                                    )
                                }
                            >
                                <Archive className="size-3.5" /> Archive
                            </Button>
                        )}
                        <Button asChild variant="outline" size="sm">
                            <Link
                                href={detail.url({
                                    query: { product: product.slug },
                                })}
                            >
                                <Eye className="size-3.5" /> Lihat
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => {
                                if (confirm('Delete ' + product.name + '?')) {
                                    doAction(
                                        `/admin/products/${product.id}`,
                                        'delete',
                                    );
                                }
                            }}
                        >
                            <Trash2 className="size-3.5" /> Delete
                        </Button>
                    </div>
                </header>
                {/* Metric Cards */}
                <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                    <MetricCard
                        icon={<Tag className="size-5 text-violet-600" />}
                        iconBg="bg-violet-50"
                        label="Regular Price"
                        value={formatPrice(product.regular_price)}
                        sub={
                            product.sale_price
                                ? `Sale: ${formatPrice(product.sale_price)}`
                                : 'No sale price'
                        }
                    />
                    <MetricCard
                        icon={<Box className="size-5 text-blue-600" />}
                        iconBg="bg-blue-50"
                        label="Total Stock"
                        value={totalStock.toString()}
                        sub={`${totalReserved} reserved`}
                    />
                    <MetricCard
                        icon={<Layers className="size-5 text-amber-600" />}
                        iconBg="bg-amber-50"
                        label="Variants"
                        value={product.variants.length.toString()}
                        sub={`${activeVariants} active`}
                    />
                    <MetricCard
                        icon={
                            <TrendingUp className="size-5 text-emerald-600" />
                        }
                        iconBg="bg-emerald-50"
                        label="Order Items"
                        value={product.orders.length.toString()}
                        sub="recent orders"
                    />
                </div>

                <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-6">
                    {/* LEFT COLUMN */}
                    <div className="flex min-w-0 flex-col gap-5 xl:gap-6">
                        {/* Image Gallery */}
                        <Card className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <ImageIcon className="size-4 text-muted-foreground" />
                                    Product Images
                                </CardTitle>
                                <CardDescription>
                                    {product.images.length} image(s)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="relative flex aspect-square max-h-[420px] w-full items-center justify-center overflow-hidden bg-muted/40 p-4">
                                    {activeImage?.image_url ? (
                                        <img
                                            src={activeImage.image_url}
                                            alt={
                                                activeImage.alt_text ||
                                                product.name
                                            }
                                            className="size-full object-contain"
                                        />
                                    ) : (
                                        <div className="flex size-full items-center justify-center">
                                            <ImageIcon className="size-16 text-muted-foreground opacity-20" />
                                        </div>
                                    )}
                                    {activeImage?.is_primary && (
                                        <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
                                            Primary
                                        </span>
                                    )}
                                </div>
                                {product.images.length > 0 && (
                                    <div className="flex gap-2 overflow-x-auto overscroll-x-contain border-t p-4">
                                        {product.images.map((img) => (
                                            <button
                                                key={img.id}
                                                type="button"
                                                aria-label={
                                                    img.alt_text ||
                                                    `Product image ${img.sort_order + 1}`
                                                }
                                                aria-pressed={
                                                    activeImage?.id === img.id
                                                }
                                                onClick={() =>
                                                    setActiveImage(img)
                                                }
                                                className={[
                                                    'relative size-16 shrink-0 overflow-hidden rounded-lg border-2 bg-muted/40 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
                                                    activeImage?.id === img.id
                                                        ? 'border-zinc-800 shadow-sm'
                                                        : 'border-transparent hover:border-zinc-300',
                                                ].join(' ')}
                                            >
                                                {img.image_url ? (
                                                    <img
                                                        src={img.image_url}
                                                        alt={img.alt_text}
                                                        className="size-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="flex size-full items-center justify-center bg-zinc-100 text-[10px] text-zinc-400">
                                                        N/A
                                                    </div>
                                                )}
                                                {img.is_primary && (
                                                    <span className="absolute right-0 bottom-0 left-0 bg-black/50 py-0.5 text-center text-[8px] leading-tight text-white">
                                                        Main
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {product.images.length === 0 && (
                                    <div className="flex flex-col items-center gap-2 py-10 text-sm text-muted-foreground">
                                        <ImageIcon className="size-8 opacity-30" />
                                        No images uploaded
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        {/* Product Info */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Info className="size-4 text-muted-foreground" />
                                    Product Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-1 text-sm">
                                <InfoRow
                                    label="Category"
                                    value={product.category ?? '-'}
                                />
                                <InfoRow
                                    label="Collection"
                                    value={product.collection ?? '-'}
                                />
                                <InfoRow
                                    label="SKU"
                                    value={product.sku || '-'}
                                    mono
                                />
                                <InfoRow
                                    label="Slug"
                                    value={product.slug || '-'}
                                    mono
                                />
                                <InfoRow
                                    label="Status"
                                    value={
                                        <Badge
                                            variant="outline"
                                            className={`gap-1 ${status.badge}`}
                                        >
                                            <span
                                                className={`size-1.5 rounded-full ${status.dot}`}
                                            />
                                            {status.label}
                                        </Badge>
                                    }
                                />
                                <InfoRow
                                    label="Weight"
                                    value={
                                        product.weight
                                            ? `${product.weight} g`
                                            : '-'
                                    }
                                />
                                <InfoRow
                                    label="Dimensions"
                                    value={
                                        product.length &&
                                        product.width &&
                                        product.height
                                            ? `${product.length} × ${product.width} × ${product.height} cm`
                                            : '-'
                                    }
                                />
                                <div className="flex flex-wrap gap-2 pt-4">
                                    <FlagPill
                                        active={product.is_featured}
                                        label="Featured"
                                    />
                                    <FlagPill
                                        active={product.is_new_arrival}
                                        label="New Arrival"
                                    />
                                    <FlagPill
                                        active={product.is_best_seller}
                                        label="Best Seller"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {(product.short_description || product.description) && (
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">
                                        Description
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="min-w-0 space-y-4 text-sm leading-6 break-words text-muted-foreground">
                                    {product.short_description && (
                                        <p>{product.short_description}</p>
                                    )}
                                    {product.description && (
                                        <HTMLRender
                                            html={product.description}
                                            className="text-sm leading-6 break-words text-muted-foreground [&_img]:h-auto [&_img]:max-w-full [&_pre]:overflow-x-auto"
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    {/* RIGHT COLUMN */}
                    <div className="flex min-w-0 flex-col gap-5 xl:gap-6">
                        {/* Variants Table */}
                        <Card className="min-w-0 overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <CardTitle className="flex items-center gap-2 text-base">
                                            <Package className="size-4 text-muted-foreground" />
                                            Variants
                                        </CardTitle>
                                        <CardDescription className="mt-0.5">
                                            {product.variants.length} variant(s)
                                        </CardDescription>
                                    </div>
                                    <Button asChild size="sm" variant="outline">
                                        <Link
                                            href={`/admin/products/${product.id}/variants`}
                                        >
                                            <Layers className="size-3.5" />{' '}
                                            Manage
                                        </Link>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                {product.variants.length > 0 ? (
                                    <div className="overflow-x-auto overscroll-x-contain">
                                        <table className="w-full min-w-[680px] text-sm tabular-nums">
                                            <thead>
                                                <tr className="border-b bg-muted/50 text-xs whitespace-nowrap text-muted-foreground">
                                                    <th className="px-4 py-2.5 text-left font-medium">
                                                        Variant
                                                    </th>
                                                    <th className="px-4 py-2.5 text-left font-medium">
                                                        SKU
                                                    </th>
                                                    <th className="px-4 py-2.5 text-right font-medium">
                                                        +Price
                                                    </th>
                                                    <th className="px-4 py-2.5 text-right font-medium">
                                                        Stock
                                                    </th>
                                                    <th className="px-4 py-2.5 text-right font-medium">
                                                        Reserved
                                                    </th>
                                                    <th className="px-4 py-2.5 text-center font-medium">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {product.variants.map(
                                                    (variant) => (
                                                        <tr
                                                            key={variant.id}
                                                            className="transition-colors hover:bg-zinc-50/50"
                                                        >
                                                            <td className="px-4 py-3">
                                                                <div className="flex min-w-[160px] items-center gap-3">
                                                                    {variant.image_url ? (
                                                                        <img
                                                                            src={
                                                                                variant.image_url
                                                                            }
                                                                            alt={
                                                                                variant.color_name ??
                                                                                'variant'
                                                                            }
                                                                            className="size-10 shrink-0 rounded-md border object-contain"
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            className="size-10 shrink-0 rounded-md border"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    variant.color_hex ??
                                                                                    '#e5e7eb',
                                                                            }}
                                                                        />
                                                                    )}
                                                                    <div className="min-w-0">
                                                                        <div className="font-medium break-words">
                                                                            {variant.variant_name ??
                                                                                variant.color_name ??
                                                                                '-'}
                                                                        </div>
                                                                        <div className="text-xs text-muted-foreground">
                                                                            {[
                                                                                variant.package_type,
                                                                                variant.size,
                                                                            ]
                                                                                .filter(
                                                                                    Boolean,
                                                                                )
                                                                                .join(
                                                                                    ' / ',
                                                                                ) ||
                                                                                '-'}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="max-w-[200px] px-4 py-3 font-mono text-xs break-all text-muted-foreground">
                                                                {variant.sku}
                                                            </td>
                                                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                                                {Number(
                                                                    variant.sale_price ??
                                                                        variant.regular_price,
                                                                ) > 0 ? (
                                                                    formatPrice(
                                                                        variant.sale_price ??
                                                                            variant.regular_price ??
                                                                            0,
                                                                    )
                                                                ) : (
                                                                    <span className="text-muted-foreground">
                                                                        &mdash;
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3 text-right">
                                                                <span
                                                                    className={[
                                                                        'font-semibold',
                                                                        Number(
                                                                            variant.stock,
                                                                        ) === 0
                                                                            ? 'text-red-600'
                                                                            : Number(
                                                                                    variant.stock,
                                                                                ) <=
                                                                                5
                                                                              ? 'text-amber-600'
                                                                              : 'text-emerald-600',
                                                                    ].join(' ')}
                                                                >
                                                                    {
                                                                        variant.stock
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 text-right text-muted-foreground">
                                                                {
                                                                    variant.reserved_stock
                                                                }
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                <ActiveBadge
                                                                    active={
                                                                        variant.is_active
                                                                    }
                                                                />
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
                                        <Package className="size-8 opacity-30" />
                                        No variants found.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        {/* Stock Logs */}
                        <Card className="min-w-0 overflow-hidden">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <TrendingUp className="size-4 text-muted-foreground" />
                                    Recent Stock Logs
                                </CardTitle>
                                <CardDescription>
                                    Last 10 stock movements across all variants
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                {product.stock_logs.length > 0 ? (
                                    <div className="overflow-x-auto overscroll-x-contain">
                                        <table className="w-full min-w-[680px] text-sm tabular-nums">
                                            <thead>
                                                <tr className="border-b bg-muted/50 text-xs whitespace-nowrap text-muted-foreground">
                                                    <th className="px-4 py-2.5 text-left font-medium">
                                                        Variant SKU
                                                    </th>
                                                    <th className="px-4 py-2.5 text-center font-medium">
                                                        Type
                                                    </th>
                                                    <th className="px-4 py-2.5 text-right font-medium">
                                                        Qty
                                                    </th>
                                                    <th className="px-4 py-2.5 text-right font-medium">
                                                        Before
                                                    </th>
                                                    <th className="px-4 py-2.5 text-right font-medium">
                                                        After
                                                    </th>
                                                    <th className="px-4 py-2.5 text-right font-medium">
                                                        Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {product.stock_logs.map(
                                                    (log) => (
                                                        <tr
                                                            key={log.id}
                                                            className="transition-colors hover:bg-zinc-50/50"
                                                        >
                                                            <td className="max-w-[200px] px-4 py-2.5 font-mono text-xs break-all">
                                                                {log.variant}
                                                            </td>
                                                            <td className="px-4 py-2.5 text-center">
                                                                <Badge
                                                                    variant="outline"
                                                                    className={`text-[10px] ${STOCK_LOG_TYPES[log.type] ?? 'border-zinc-200 bg-zinc-50 text-zinc-600'}`}
                                                                >
                                                                    {log.type}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-4 py-2.5 text-right font-medium">
                                                                <span
                                                                    className={
                                                                        log.quantity >=
                                                                        0
                                                                            ? 'text-emerald-600'
                                                                            : 'text-red-600'
                                                                    }
                                                                >
                                                                    {log.quantity >=
                                                                    0
                                                                        ? '+'
                                                                        : ''}
                                                                    {
                                                                        log.quantity
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-2.5 text-right text-muted-foreground">
                                                                {
                                                                    log.stock_before
                                                                }
                                                            </td>
                                                            <td className="px-4 py-2.5 text-right font-medium">
                                                                {
                                                                    log.stock_after
                                                                }
                                                            </td>
                                                            <td className="px-4 py-2.5 text-right text-xs text-muted-foreground">
                                                                {log.created_at ??
                                                                    '-'}
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
                                        <TrendingUp className="size-8 opacity-30" />
                                        No stock logs yet.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        {/* Recent Orders */}
                        <Card className="min-w-0 overflow-hidden">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <ShoppingBag className="size-4 text-muted-foreground" />
                                    Recent Orders
                                </CardTitle>
                                <CardDescription>
                                    Last 10 order items containing this product
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                {product.orders.length > 0 ? (
                                    <div className="overflow-x-auto overscroll-x-contain">
                                        <table className="w-full min-w-[680px] text-sm tabular-nums">
                                            <thead>
                                                <tr className="border-b bg-muted/50 text-xs whitespace-nowrap text-muted-foreground">
                                                    <th className="px-4 py-2.5 text-left font-medium">
                                                        Order ID
                                                    </th>
                                                    <th className="px-4 py-2.5 text-right font-medium">
                                                        Qty
                                                    </th>
                                                    <th className="px-4 py-2.5 text-right font-medium">
                                                        Subtotal
                                                    </th>
                                                    <th className="px-4 py-2.5 text-right font-medium">
                                                        Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {product.orders.map((order) => (
                                                    <tr
                                                        key={order.id}
                                                        className="transition-colors hover:bg-zinc-50/50"
                                                    >
                                                        <td className="px-4 py-2.5">
                                                            <Link
                                                                href={`/admin/orders/${order.order_id}`}
                                                                className="font-medium text-primary underline-offset-4 hover:underline"
                                                            >
                                                                #
                                                                {order.order_id}
                                                            </Link>
                                                        </td>
                                                        <td className="px-4 py-2.5 text-right">
                                                            {order.quantity}
                                                        </td>
                                                        <td className="px-4 py-2.5 text-right font-medium">
                                                            {formatPrice(
                                                                order.subtotal,
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2.5 text-right text-xs text-muted-foreground">
                                                            {order.created_at ??
                                                                '-'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
                                        <ShoppingBag className="size-8 opacity-30" />
                                        No orders yet.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
function MetricCard({
    icon,
    iconBg,
    label,
    value,
    sub,
}: {
    icon: React.ReactNode;
    iconBg: string;
    label: string;
    value: string;
    sub?: string;
}) {
    return (
        <div className="rounded-xl border bg-card p-4 shadow-xs">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="mt-1.5 text-xl font-semibold tracking-tight break-words tabular-nums sm:text-2xl">
                        {value}
                    </p>
                    {sub && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            {sub}
                        </p>
                    )}
                </div>
                <div className={`shrink-0 rounded-lg p-2 ${iconBg}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

function InfoRow({
    label,
    value,
    mono = false,
}: {
    label: string;
    value: React.ReactNode;
    mono?: boolean;
}) {
    return (
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-4 border-b border-border/60 py-2.5">
            <span className="break-words text-muted-foreground">{label}</span>
            <span
                className={`min-w-0 text-right ${mono ? 'font-mono text-xs break-all' : 'font-medium break-words'}`}
            >
                {value}
            </span>
        </div>
    );
}

function FlagPill({ active, label }: { active: boolean; label: string }) {
    return (
        <span
            className={[
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                active
                    ? 'border-violet-200 bg-violet-50 text-violet-700'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-400',
            ].join(' ')}
        >
            {label}
        </span>
    );
}
