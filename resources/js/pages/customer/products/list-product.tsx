import { Head, InfiniteScroll, Link, router, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Grid3X3,
    Heart,
    List as ListIcon,
    Search,
} from 'lucide-react';
import type { FormEvent, MouseEvent, ReactNode } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
    destroyProduct as removeWishlistProduct,
    store as addWishlistItem,
} from '@/actions/App/Http/Controllers/Customer/WishlistController';
import ShopLayout from '@/layouts/shop-layout';
import { detail, list, login } from '@/routes';

type FilterState = {
    search: string;
    category: string;
    collection: string;
    type: string;
    availability: string;
    price: string;
    color: string;
    size: string;
    sort: string;
    order: string;
    per_page: string;
};

type ProductCard = {
    id: number;
    slug: string;
    title: string;
    sku: string | null;
    price: number;
    sale_price: number | null;
    image: string | null;
    hover_image: string | null;
    badge: string | null;
    category: string | null;
    collection: string | null;
    colors: Array<{
        name: string | null;
        hex: string;
    }>;
    sizes: string[];
    available_stock: number;
    is_wishlisted: boolean;
};

type PaginatedProducts = {
    data: ProductCard[];
    current_page: number;
    from: number | null;
    last_page: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    per_page: number;
    to: number | null;
    total: number;
};

type FilterOption = {
    id?: number;
    name?: string | null;
    description?: string | null;
    slug?: string;
    value?: string;
    label?: string;
    hex?: string;
};

type Props = {
    products: PaginatedProducts;
    filters: Omit<FilterState, 'per_page'> & {
        per_page: number;
    };
    collectionBanner: {
        title: string;
        banner_desktop_url: string | null;
        banner_mobile_url: string | null;
        is_default: boolean;
    };
    options: {
        categories: FilterOption[];
        collections: FilterOption[];
        colors: FilterOption[];
        sizes: string[];
        priceRanges: Array<{ value: string; label: string }>;
        sorts: Array<{ value: string; label: string }>;
    };
};

type SharedProps = {
    auth: {
        user: unknown | null;
    };
};

const defaultFilters: FilterState = {
    search: '',
    category: '',
    collection: '',
    type: 'all',
    availability: 'all',
    price: 'all',
    color: '',
    size: '',
    sort: 'featured',
    order: 'desc',
    per_page: '12',
};

const typeOptions = [
    { value: 'all', label: 'All' },
    { value: 'featured', label: 'Featured' },
    { value: 'new_arrival', label: 'New' },
    { value: 'best_seller', label: 'Best Seller' },
    { value: 'discount', label: 'Sale' },
];

const availabilityOptions = [
    { value: 'all', label: 'All' },
    { value: 'in_stock', label: 'In Stock' },
    { value: 'out_of_stock', label: 'Out of Stock' },
];

const fallbackImages = [
    '/img/abdul-raheem-kannath-aNWfK46QWto-unsplash.webp',
    '/img/ainur-iman-qcNmigFPTQM-unsplash.webp',
    '/img/atiyeh-fathi-CvdzGjVX9DA-unsplash.webp',
    '/img/hasan-almasi-_X2UAmIcpko-unsplash.webp',
    '/img/ike-ellyana-2F70bGqQVa4-unsplash.webp',
];

const formatPrice = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    })
        .format(value)
        .replace('IDR', 'Rp')
        .trim();

const cleanQuery = (filters: FilterState) =>
    Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => {
            if (value === '') {
                return false;
            }

            if (key === 'per_page') {
                return value !== defaultFilters.per_page;
            }

            return value !== defaultFilters[key as keyof FilterState];
        }),
    );

export default function ListProduct({
    products,
    filters,
    options,
    collectionBanner,
}: Props) {
    const { auth } = usePage<SharedProps>().props;
    const isAuthenticated = Boolean(auth.user);
    const initialFilters = useMemo<FilterState>(
        () => ({
            ...filters,
            per_page: String(filters.per_page ?? defaultFilters.per_page),
        }),
        [filters],
    );
    const [form, setForm] = useState<FilterState>(initialFilters);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const openFilter = useCallback(() => setIsFilterOpen(true), []);
    const closeFilter = useCallback(() => setIsFilterOpen(false), []);

    useEffect(() => {
        if (form.search === (filters.search ?? '')) {
            return;
        }

        const timeout = window.setTimeout(() => {
            router.get(list.url(), cleanQuery(form), {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            });
        }, 350);

        return () => window.clearTimeout(timeout);
    }, [filters.search, form]);

    const visit = (nextFilters: FilterState) => {
        setForm(nextFilters);
        router.get(list.url(), cleanQuery(nextFilters), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    const setFilter = (key: keyof FilterState, value: string) => {
        visit({
            ...form,
            [key]: value,
        });
    };

    const resetFilters = () => {
        visit(defaultFilters);
    };

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        visit(form);
    };

    const selectedCollection = options.collections.find(
        (collection) => collection.slug === filters.collection,
    );
    const pageTitle = selectedCollection?.name ?? 'All Products';

    return (
        <ShopLayout>
            <Head title={`${pageTitle} - AxeGear`} />

            <section className="pb-9">
                <button
                    type="button"
                    aria-label="Close filter overlay"
                    onClick={closeFilter}
                    className={`fixed inset-0 z-[70] bg-black/50 transition-opacity lg:hidden ${
                        isFilterOpen
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    }`}
                />
                <aside
                    aria-label="Mobile filters"
                    className={`fixed top-0 bottom-0 left-0 z-[80] flex w-[min(88vw,360px)] flex-col overflow-hidden border-r border-ink bg-canvas p-5 transition-transform lg:hidden ${
                        isFilterOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="mb-5 flex items-center justify-between border-b border-hairline-strong pb-4">
                        <h2 className="text-[22px] font-extrabold text-ink">
                            Filter:
                        </h2>
                        <button
                            type="button"
                            onClick={closeFilter}
                            className="h-10 border border-hairline-strong px-4 text-[12px] font-extrabold uppercase hover:border-ink"
                        >
                            Close
                        </button>
                    </div>
                    <FilterPanel
                        form={form}
                        options={options}
                        setFilter={setFilter}
                        resetFilters={resetFilters}
                        submitSearch={submitSearch}
                        setSearch={(value) =>
                            setForm((current) => ({
                                ...current,
                                search: value,
                            }))
                        }
                        compact
                    />
                    <div className="grid grid-cols-2 gap-3 border-t border-hairline pt-4">
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="h-12 border border-hairline-strong text-[12px] font-extrabold uppercase hover:border-ink"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={closeFilter}
                            className="h-12 bg-ink text-[12px] font-extrabold text-white uppercase hover:bg-primary"
                        >
                            Apply
                        </button>
                    </div>
                </aside>

                <section className="mb-8 w-full overflow-hidden bg-[#F2F2F2]">
                    <div className="relative aspect-[16/6] min-h-[180px] w-full sm:min-h-[220px] lg:aspect-[16/4.8] lg:min-h-[260px]">
                        <picture>
                            <source
                                media="(max-width: 767px)"
                                srcSet={
                                    collectionBanner.banner_mobile_url ??
                                    collectionBanner.banner_desktop_url ??
                                    fallbackImages[1]
                                }
                            />
                            <img
                                src={
                                    collectionBanner.banner_desktop_url ??
                                    collectionBanner.banner_mobile_url ??
                                    fallbackImages[0]
                                }
                                alt={collectionBanner.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </picture>
                        <div className="absolute inset-0 bg-black/15" />
                        {!collectionBanner.is_default && (
                            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                                <h1 className="text-[32px] leading-none font-extrabold tracking-[-0.03em] text-white sm:text-[40px] lg:text-[52px]">
                                    {collectionBanner.title}
                                </h1>
                            </div>
                        )}
                    </div>
                </section>

                <div className="mx-auto mb-8 grid max-w-[1728px] gap-5 px-6 sm:px-8 md:grid-cols-[280px_minmax(0,1fr)] md:items-start lg:grid-cols-[300px_minmax(0,1fr)] lg:px-9">
                    <nav
                        aria-label="Breadcrumb"
                        className="flex items-center gap-3 text-[17px] text-ink"
                    >
                        <Link
                            href="/"
                            className="font-normal hover:text-primary"
                        >
                            Shop
                        </Link>
                        <span className="text-muted-foreground">/</span>
                        <span className="font-extrabold">{pageTitle}</span>
                    </nav>

                    <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end">
                        <button
                            type="button"
                            onClick={openFilter}
                            className="h-11 border border-ink px-5 text-[13px] font-extrabold uppercase hover:bg-ink hover:text-white lg:hidden"
                        >
                            Filter
                        </button>
                        <form
                            onSubmit={submitSearch}
                            className="relative w-full sm:w-72 lg:w-80"
                        >
                            <Search
                                className="absolute top-1/2 left-3 -translate-y-1/2 text-ink"
                                size={18}
                            />
                            <input
                                type="search"
                                value={form.search}
                                onChange={(event) =>
                                    setForm((current) => ({
                                        ...current,
                                        search: event.target.value,
                                    }))
                                }
                                placeholder="Search products"
                                className="h-11 w-full border border-hairline-strong bg-canvas pr-4 pl-10 text-[14px] text-ink placeholder:text-muted-foreground focus:border-ink focus:ring-0 focus:outline-none"
                            />
                        </form>
                        <label className="flex items-center gap-3 text-[17px] text-ink">
                            <span>Sort by:</span>
                            <select
                                value={form.sort}
                                onChange={(event) =>
                                    setFilter('sort', event.target.value)
                                }
                                className="border-0 bg-transparent py-0 pr-8 pl-0 text-[17px] font-medium text-ink focus:ring-0"
                            >
                                {options.sorts.map((sort) => (
                                    <option key={sort.value} value={sort.value}>
                                        {sort.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                <div className="mx-auto grid max-w-[1728px] gap-9 px-6 sm:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-9">
                    <aside className="hidden lg:block" aria-label="Filters">
                        <h2 className="mb-7 text-[25px] leading-none font-extrabold text-ink">
                            Filter:
                        </h2>
                        <FilterPanel
                            form={form}
                            options={options}
                            setFilter={setFilter}
                            resetFilters={resetFilters}
                            submitSearch={submitSearch}
                            setSearch={(value) =>
                                setForm((current) => ({
                                    ...current,
                                    search: value,
                                }))
                            }
                        />
                    </aside>

                    <div className="min-w-0">
                        {products.data.length > 0 ? (
                            <ProductGrid
                                products={products.data}
                                isAuthenticated={isAuthenticated}
                            />
                        ) : (
                            <div className="flex min-h-[460px] flex-col items-center justify-center border border-hairline bg-surface-soft px-6 text-center">
                                <p className="text-[18px] font-extrabold tracking-[0.02em] text-ink uppercase">
                                    No products found
                                </p>
                                <p className="mt-3 max-w-sm text-[14px] leading-6 text-body">
                                    Try a different keyword or clear active
                                    filters to reload the catalog.
                                </p>
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="mt-6 h-12 bg-ink px-7 text-[13px] font-extrabold text-white uppercase hover:bg-primary"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </ShopLayout>
    );
}

function FilterPanel({
    form,
    options,
    setFilter,
    submitSearch,
    setSearch,
    compact = false,
}: {
    form: FilterState;
    options: Props['options'];
    setFilter: (key: keyof FilterState, value: string) => void;
    resetFilters: () => void;
    submitSearch: (event: FormEvent<HTMLFormElement>) => void;
    setSearch: (value: string) => void;
    compact?: boolean;
}) {
    return (
        <div className={compact ? 'min-h-0 flex-1 overflow-y-auto' : ''}>
            {compact && (
                <form onSubmit={submitSearch} className="relative mb-5">
                    <Search
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-ink"
                        size={18}
                    />
                    <input
                        type="search"
                        value={form.search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search products"
                        className="h-12 w-full border border-hairline-strong bg-canvas pr-4 pl-10 text-[14px] focus:border-ink focus:ring-0 focus:outline-none"
                    />
                </form>
            )}

            <FilterSection title="Category">
                <FilterRadio
                    label="All Categories"
                    active={form.category === ''}
                    onClick={() => setFilter('category', '')}
                />
                {options.categories.map((category) => (
                    <FilterRadio
                        key={category.id ?? category.slug}
                        label={category.name ?? 'Untitled'}
                        active={form.category === category.slug}
                        onClick={() =>
                            setFilter('category', category.slug ?? '')
                        }
                    />
                ))}
            </FilterSection>

            <FilterSection title="Style">
                <FilterRadio
                    label="All Collections"
                    active={form.collection === ''}
                    onClick={() => setFilter('collection', '')}
                />
                {options.collections.map((collection) => (
                    <FilterRadio
                        key={collection.id ?? collection.slug}
                        label={collection.name ?? 'Untitled'}
                        active={form.collection === collection.slug}
                        onClick={() =>
                            setFilter('collection', collection.slug ?? '')
                        }
                    />
                ))}
            </FilterSection>

            <FilterSection title="Type">
                {typeOptions.map((type) => (
                    <FilterRadio
                        key={type.value}
                        label={type.label}
                        active={form.type === type.value}
                        onClick={() => setFilter('type', type.value)}
                    />
                ))}
            </FilterSection>

            <FilterSection title="Sport">
                {options.priceRanges.map((price) => (
                    <FilterRadio
                        key={price.value}
                        label={price.label}
                        active={form.price === price.value}
                        onClick={() => setFilter('price', price.value)}
                    />
                ))}
            </FilterSection>

            <FilterSection title="Colors">
                <div className="flex flex-wrap gap-2.5 py-1">
                    <button
                        type="button"
                        onClick={() => setFilter('color', '')}
                        aria-label="All colors"
                        className={`size-7 border bg-white ${
                            form.color === ''
                                ? 'border-primary ring-2 ring-primary'
                                : 'border-ink'
                        }`}
                    />
                    {options.colors.map((color, index) => (
                        <button
                            key={`${color.hex ?? color.name ?? 'color'}-${index}`}
                            type="button"
                            onClick={() => setFilter('color', color.hex ?? '')}
                            aria-label={color.name ?? color.hex ?? 'Color'}
                            className={`size-7 border ${
                                form.color === color.hex
                                    ? 'border-primary ring-2 ring-primary'
                                    : 'border-hairline-strong'
                            }`}
                            style={{ backgroundColor: color.hex }}
                        />
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Size">
                <div className="flex flex-wrap gap-2 py-1 text-[12px] font-extrabold uppercase">
                    <button
                        type="button"
                        onClick={() => setFilter('size', '')}
                        className={`h-9 min-w-11 border px-3 ${
                            form.size === ''
                                ? 'border-ink bg-ink text-white'
                                : 'border-hairline-strong hover:border-ink'
                        }`}
                    >
                        All
                    </button>
                    {options.sizes.map((size) => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => setFilter('size', size)}
                            className={`h-9 min-w-11 border px-3 ${
                                form.size === size
                                    ? 'border-ink bg-ink text-white'
                                    : 'border-hairline-strong hover:border-ink'
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Availability">
                {availabilityOptions.map((availability) => (
                    <FilterRadio
                        key={availability.value}
                        label={availability.label}
                        active={form.availability === availability.value}
                        onClick={() =>
                            setFilter('availability', availability.value)
                        }
                    />
                ))}
            </FilterSection>

            <FilterSection title="Lens Type">
                <FilterRadio
                    label="All Lens Types"
                    active={form.price === 'all'}
                    onClick={() => setFilter('price', 'all')}
                />
                <FilterRadio
                    label="Sale Pricing"
                    active={form.type === 'discount'}
                    onClick={() => setFilter('type', 'discount')}
                />
            </FilterSection>
        </div>
    );
}

function FilterSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-hairline-strong py-[18px] first:pt-0">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between text-[17px] font-extrabold text-ink hover:text-primary"
            >
                <span>{title}</span>
                <ChevronDown
                    size={25}
                    strokeWidth={2.4}
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`grid transition-[grid-template-rows,opacity,padding] duration-200 ${
                    isOpen
                        ? 'grid-rows-[1fr] pt-4 opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="grid gap-2 overflow-hidden">{children}</div>
            </div>
        </div>
    );
}

function FilterRadio({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex min-h-8 items-center gap-3 text-left text-[14px] text-body hover:text-ink"
        >
            <span
                className={`size-3 border ${
                    active
                        ? 'border-primary bg-primary'
                        : 'border-hairline-strong'
                }`}
            />
            <span className={active ? 'font-extrabold text-ink' : ''}>
                {label}
            </span>
        </button>
    );
}

const ProductGrid = memo(function ProductGrid({
    products,
    isAuthenticated,
}: {
    products: ProductCard[];
    isAuthenticated: boolean;
}) {
    return (
        <InfiniteScroll data="products" buffer={400}>
            {({ loading }) => (
                <>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
                        {products.map((product, index) => (
                            <ProductTile
                                key={product.id}
                                product={product}
                                index={index}
                                isAuthenticated={isAuthenticated}
                            />
                        ))}
                    </div>
                    {loading && <ProductGridSkeleton />}
                </>
            )}
        </InfiniteScroll>
    );
});

function ProductGridSkeleton() {
    return (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border border-hairline p-4">
                    <div className="aspect-square animate-pulse bg-surface-muted" />
                    <div className="mt-4 h-4 w-4/5 animate-pulse bg-surface-muted" />
                    <div className="mt-2 h-4 w-1/2 animate-pulse bg-surface-muted" />
                </div>
            ))}
        </div>
    );
}

const ProductTile = memo(function ProductTile({
    product,
    index,
    isAuthenticated,
}: {
    product: ProductCard;
    index: number;
    isAuthenticated: boolean;
}) {
    const [isWishlistProcessing, setIsWishlistProcessing] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(product.is_wishlisted);
    const isSoldOut = product.available_stock <= 0;
    const productHref = detail.url({ query: { product: product.slug } });
    const subtitle = product.collection ?? product.category ?? product.sku;
    const visibleColors = product.colors.slice(0, 4);

    const toggleWishlist = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (isWishlistProcessing) {
            return;
        }

        if (!isAuthenticated) {
            router.visit(login.url());

            return;
        }

        setIsWishlistProcessing(true);
        const previous = isWishlisted;
        setIsWishlisted(!previous);

        try {
            const response = await fetch(
                previous
                    ? removeWishlistProduct.url(product.id)
                    : addWishlistItem.url(product.id),
                {
                    method: previous ? 'DELETE' : 'POST',
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN':
                            document.querySelector<HTMLMetaElement>(
                                'meta[name="csrf-token"]',
                            )?.content ?? '',
                    },
                },
            );

            if (!response.ok) {
                setIsWishlisted(previous);
            }
        } catch {
            setIsWishlisted(previous);
        } finally {
            setIsWishlistProcessing(false);
        }
    };

    return (
        <article className="group relative border border-hairline bg-canvas transition-colors hover:border-hairline-strong">
            <Link href={productHref} className="block">
                <div className="relative aspect-square overflow-hidden bg-white p-5 sm:p-6">
                    <img
                        src={
                            product.image ??
                            fallbackImages[index % fallbackImages.length]
                        }
                        alt={product.title}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full object-contain transition duration-300 group-hover:scale-[1.035] ${
                            isSoldOut ? 'opacity-45 grayscale' : ''
                        }`}
                    />
                    {!isSoldOut && product.badge && (
                        <span className="absolute top-4 left-0 z-10 flex min-h-26 w-9 items-center justify-center bg-primary px-1 py-2 text-[11px] font-extrabold tracking-[0.08em] text-white uppercase [writing-mode:vertical-rl] [text-orientation:mixed] [transform:rotate(180deg)] sm:w-10 sm:text-[12px]">
                            {product.badge === 'DISCOUNT'
                                ? 'SALE'
                                : product.badge}
                        </span>
                    )}
                    {isSoldOut && (
                        <span className="absolute top-4 left-0 z-10 flex min-h-26 w-9 items-center justify-center bg-ink px-1 py-2 text-[10px] font-extrabold tracking-[0.08em] text-white uppercase [writing-mode:vertical-rl] [text-orientation:mixed] [transform:rotate(180deg)] sm:w-10 sm:text-[11px]">
                            Sold Out
                        </span>
                    )}
                </div>
            </Link>

            <button
                type="button"
                aria-label={
                    isWishlisted
                        ? 'Remove product from wishlist'
                        : 'Add product to wishlist'
                }
                onClick={toggleWishlist}
                disabled={isWishlistProcessing}
                className={`absolute top-3 right-3 z-10 hidden size-10 items-center justify-center border border-hairline bg-white text-ink shadow-subtle group-hover:flex hover:border-ink hover:text-primary ${
                    isWishlisted ? 'border-primary text-primary' : 'text-ink'
                }`}
            >
                <Heart
                    aria-hidden="true"
                    className={`size-5 ${isWishlisted ? 'fill-current' : ''}`}
                    strokeWidth={2.2}
                />
            </button>

            <Link href={productHref} className="block px-4 pt-1 pb-4 sm:px-5">
                <h3 className="line-clamp-1 text-[16px] leading-5 font-extrabold text-ink uppercase">
                    {product.title}
                </h3>
                <p className="mt-1 line-clamp-1 text-[15px] leading-5 text-body">
                    {subtitle ?? 'Performance Gear'}
                </p>
                <div className="mt-1 flex min-h-5 flex-wrap items-center gap-1.5">
                    {visibleColors.length > 0 ? (
                        visibleColors.map((color, colorIndex) => (
                            <span
                                key={`${color.hex}-${color.name ?? colorIndex}`}
                                aria-label={color.name ?? color.hex}
                                className="size-4 border border-hairline-strong"
                                style={{ backgroundColor: color.hex }}
                            />
                        ))
                    ) : (
                        <span className="line-clamp-1 text-[15px] leading-5 text-body">
                            {product.sku || 'AxeGear Edition'}
                        </span>
                    )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-[18px] leading-none font-extrabold">
                    {product.sale_price !== null && (
                        <span className="text-ink line-through decoration-1">
                            {formatPrice(product.price)}
                        </span>
                    )}
                    <span
                        className={
                            product.sale_price !== null
                                ? 'text-primary'
                                : 'text-ink'
                        }
                    >
                        {formatPrice(product.sale_price ?? product.price)}
                    </span>
                </div>
            </Link>
        </article>
    );
});

