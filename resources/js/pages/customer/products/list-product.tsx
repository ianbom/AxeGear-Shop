import { Head, InfiniteScroll, Link, router, usePage } from '@inertiajs/react';
import { ChevronDown, Heart, Search } from 'lucide-react';
import type { FormEvent, MouseEvent, ReactNode } from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    { value: 'all', label: 'Semua Produk' },
    { value: 'featured', label: 'Produk Unggulan' },
    { value: 'new_arrival', label: 'Koleksi Baru' },
    { value: 'best_seller', label: 'Terlaris' },
    { value: 'discount', label: 'Diskon' },
];

const availabilityOptions = [
    { value: 'all', label: 'Semua' },
    { value: 'in_stock', label: 'Tersedia' },
    { value: 'out_of_stock', label: 'Habis' },
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
    }).format(value);

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

export default function ListProduct({ products, filters, options }: Props) {
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
        }, 400);

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

    const activeSummary = [
        filters.category,
        filters.collection,
        filters.type !== 'all' ? filters.type : '',
        filters.availability !== 'all' ? filters.availability : '',
        filters.price !== 'all' ? filters.price : '',
        filters.color,
        filters.size,
        filters.search,
    ].filter(Boolean).length;
    const selectedCollection = options.collections.find(
        (collection) => collection.slug === filters.collection,
    );
    const pageTitle = selectedCollection?.name ?? 'Semua Produk';
    const pageDescription =
        selectedCollection?.description?.trim() ||
        'Temukan pilihan modest wear terbaru dengan filter cepat, tampilan bersih, dan katalog yang lebih lapang.';

    return (
        <ShopLayout>
            <Head title={`${pageTitle} - Aurea Syari`} />

            <main className="mx-auto w-full max-w-[1560px] px-4 py-8 md:px-10 md:py-12">
                <button
                    type="button"
                    aria-label="Tutup filter"
                    onClick={closeFilter}
                    className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 ease-out ${
                        isFilterOpen
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    }`}
                />
                <aside
                    className={`fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-md transform-gpu flex-col overflow-y-auto border-l border-border bg-white px-5 pt-5 pb-6 shadow-[-24px_0_80px_rgba(0,0,0,0.14)] transition-transform duration-200 ease-out will-change-transform [contain:layout_paint] md:px-7 ${
                        isFilterOpen
                            ? 'translate-x-0'
                            : 'pointer-events-none translate-x-full'
                    }`}
                >
                    <div className="mb-6 flex items-center justify-between border-b border-border pb-5">
                        <div>
                            <p className="text-[12px] font-semibold tracking-[0.22em] text-foreground uppercase">
                                Filter & Urutkan
                            </p>
                            <p className="mt-1 text-[11px] text-secondary-foreground">
                                Search, filter, lalu urutkan produk.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={closeFilter}
                            className="border border-border px-4 py-2 text-[10px] font-semibold tracking-wider uppercase transition-colors hover:border-foreground"
                        >
                            Tutup
                        </button>
                    </div>
                    <form
                        onSubmit={submitSearch}
                        className="group relative mb-7"
                    >
                        <Search
                            className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground transition-colors group-hover:text-foreground"
                            size={14}
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
                            placeholder="Cari produk"
                            className="w-full border-0 border-b border-border bg-transparent py-3 pr-4 pl-7 text-[11px] tracking-wide transition-all placeholder:text-muted-foreground/70 focus:border-foreground focus:ring-0 focus:outline-none"
                        />
                    </form>

                    <div className="mb-8 border-b border-border/70 pb-5 text-secondary-foreground">
                        <div className="mb-4 flex items-end justify-between border-b border-foreground pb-3">
                            <div>
                                <p className="text-[11px] font-semibold tracking-[0.24em] text-foreground uppercase">
                                    Urutkan
                                </p>
                                <p className="mt-1 text-[10px] tracking-wide text-muted-foreground">
                                    Atur urutan katalog.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-[11px]">
                            <label className="grid gap-1.5">
                                <span className="font-semibold tracking-wider text-foreground uppercase">
                                    Urut
                                </span>
                                <select
                                    value={form.sort}
                                    onChange={(event) =>
                                        setFilter('sort', event.target.value)
                                    }
                                    className="w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-[11px] font-medium tracking-wide text-secondary-foreground transition outline-none focus:border-foreground focus:ring-0"
                                >
                                    {options.sorts.map((sort) => (
                                        <option
                                            key={sort.value}
                                            value={sort.value}
                                        >
                                            {sort.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="grid gap-1.5">
                                <span className="font-semibold tracking-wider text-foreground uppercase">
                                    Arah
                                </span>
                                <select
                                    value={form.order}
                                    onChange={(event) =>
                                        setFilter('order', event.target.value)
                                    }
                                    className="w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-[11px] font-medium tracking-wide text-secondary-foreground transition outline-none focus:border-foreground focus:ring-0"
                                >
                                    <option value="desc">Desc</option>
                                    <option value="asc">Asc</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="text-secondary-foreground">
                        <div className="mb-4 flex items-end justify-between border-b border-foreground pb-3">
                            <div>
                                <p className="text-[11px] font-semibold tracking-[0.24em] text-foreground uppercase">
                                    Saring
                                </p>
                                <p className="mt-1 text-[10px] tracking-wide text-muted-foreground">
                                    {activeSummary > 0
                                        ? `${activeSummary} filter aktif`
                                        : 'Pilih detail produk'}
                                </p>
                            </div>
                            {activeSummary > 0 && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="text-[10px] font-semibold tracking-wider text-primary uppercase underline-offset-4 transition hover:text-primary/75 hover:underline"
                                >
                                    Atur Ulang
                                </button>
                            )}
                        </div>

                        <div className="divide-y divide-border/70">
                            <FilterSection title="Kategori" defaultOpen>
                                <div className="space-y-3.5 text-[11px] tracking-wide">
                                    <FilterRadio
                                        label="Semua Kategori"
                                        active={form.category === ''}
                                        onClick={() =>
                                            setFilter('category', '')
                                        }
                                    />
                                    {options.categories.map((category) => (
                                        <FilterRadio
                                            key={category.id ?? category.slug}
                                            label={
                                                category.name ??
                                                'Kategori tanpa nama'
                                            }
                                            active={
                                                form.category === category.slug
                                            }
                                            onClick={() =>
                                                setFilter(
                                                    'category',
                                                    category.slug ?? '',
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            </FilterSection>

                            <FilterSection title="Koleksi">
                                <div className="space-y-3.5 text-[11px] tracking-wide">
                                    <FilterRadio
                                        label="Semua Koleksi"
                                        active={form.collection === ''}
                                        onClick={() =>
                                            setFilter('collection', '')
                                        }
                                    />
                                    {options.collections.map((collection) => (
                                        <FilterRadio
                                            key={
                                                collection.id ?? collection.slug
                                            }
                                            label={
                                                collection.name ??
                                                'Koleksi tanpa nama'
                                            }
                                            active={
                                                form.collection ===
                                                collection.slug
                                            }
                                            onClick={() =>
                                                setFilter(
                                                    'collection',
                                                    collection.slug ?? '',
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            </FilterSection>

                            <FilterSection title="Tipe Produk">
                                <div className="space-y-3.5 text-[11px] tracking-wide">
                                    {typeOptions.map((type) => (
                                        <FilterRadio
                                            key={type.value}
                                            label={type.label}
                                            active={form.type === type.value}
                                            onClick={() =>
                                                setFilter('type', type.value)
                                            }
                                        />
                                    ))}
                                </div>
                            </FilterSection>

                            <FilterSection title="Ketersediaan">
                                <div className="space-y-3.5 text-[11px] tracking-wide">
                                    {availabilityOptions.map((availability) => (
                                        <FilterRadio
                                            key={availability.value}
                                            label={availability.label}
                                            active={
                                                form.availability ===
                                                availability.value
                                            }
                                            onClick={() =>
                                                setFilter(
                                                    'availability',
                                                    availability.value,
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            </FilterSection>

                            <FilterSection title="Harga">
                                <div className="space-y-3.5 text-[11px] tracking-wide">
                                    <FilterRadio
                                        label="Semua Harga"
                                        active={form.price === 'all'}
                                        onClick={() =>
                                            setFilter('price', 'all')
                                        }
                                    />
                                    {options.priceRanges.map((price) => (
                                        <FilterRadio
                                            key={price.value}
                                            label={price.label}
                                            active={form.price === price.value}
                                            onClick={() =>
                                                setFilter('price', price.value)
                                            }
                                        />
                                    ))}
                                </div>
                            </FilterSection>

                            <FilterSection title="Warna" defaultOpen>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFilter('color', '')}
                                        className={`h-6 w-6 rounded-full border bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 ${
                                            form.color === ''
                                                ? 'border-primary ring-4 ring-primary/15'
                                                : 'border-gray-300 hover:border-foreground'
                                        }`}
                                        aria-label="Semua warna"
                                    />
                                    {options.colors.map((color) => (
                                        <button
                                            key={
                                                color.hex ??
                                                color.name ??
                                                'color'
                                            }
                                            type="button"
                                            onClick={() =>
                                                setFilter(
                                                    'color',
                                                    color.hex ?? '',
                                                )
                                            }
                                            className={`h-6 w-6 rounded-full border shadow-sm transition duration-300 hover:-translate-y-0.5 ${
                                                form.color === color.hex
                                                    ? 'border-primary ring-4 ring-primary/20'
                                                    : 'border-white/80 hover:border-foreground'
                                            }`}
                                            style={{
                                                backgroundColor: color.hex,
                                            }}
                                            aria-label={
                                                color.name ??
                                                color.hex ??
                                                'Color'
                                            }
                                        />
                                    ))}
                                </div>
                            </FilterSection>

                            <FilterSection title="Ukuran" defaultOpen>
                                <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-muted-foreground">
                                    <button
                                        type="button"
                                        onClick={() => setFilter('size', '')}
                                        className={`flex h-8 min-w-10 items-center justify-center border px-3 transition-all duration-300 ${
                                            form.size === ''
                                                ? 'border-foreground bg-foreground text-background'
                                                : 'border-input bg-transparent hover:border-foreground hover:text-foreground'
                                        }`}
                                    >
                                        Semua
                                    </button>
                                    {options.sizes.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() =>
                                                setFilter('size', size)
                                            }
                                            className={`flex h-8 min-w-10 items-center justify-center border px-3 transition-all duration-300 ${
                                                form.size === size
                                                    ? 'border-foreground bg-foreground text-background'
                                                    : 'border-input bg-transparent hover:border-foreground hover:text-foreground'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </FilterSection>
                        </div>
                    </div>
                    <div className="sticky bottom-0 -mx-5 mt-auto grid grid-cols-2 gap-3 border-t border-border bg-white px-5 pt-4 md:-mx-7 md:px-7">
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="border border-border py-3 text-[11px] font-semibold tracking-wider uppercase transition-colors hover:border-foreground"
                        >
                            Atur Ulang
                        </button>
                        <button
                            type="button"
                            onClick={closeFilter}
                            className="bg-primary py-3 text-[11px] font-semibold tracking-wider text-primary-foreground uppercase transition-colors hover:bg-[#9A6B45]"
                        >
                            Lihat Produk
                        </button>
                    </div>
                </aside>

                <div className="w-full">
                    <section className="mb-8 border-b border-border pb-7 md:mb-10 md:pb-9">
                        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="mb-2 text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                                    Collection
                                </p>
                                <h1 className="text-4xl leading-none font-light tracking-tight text-[#171717] md:text-6xl">
                                    {pageTitle}
                                </h1>
                                <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
                                    {pageDescription}
                                </p>
                            </div>
                            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                                <button
                                    type="button"
                                    onClick={openFilter}
                                    className="group inline-flex min-w-48 items-center justify-between border border-[#B98B63] px-5 py-3 text-left transition-colors hover:bg-[#B98B63] hover:text-white"
                                >
                                    <span>
                                        <span className="block text-[11px] font-semibold tracking-[0.22em] uppercase">
                                            Filter & Sort
                                        </span>
                                    </span>
                                    <ChevronDown
                                        size={14}
                                        className="transition-transform group-hover:translate-y-0.5"
                                    />
                                </button>
                            </div>
                        </div>
                    </section>

                    {products.data.length > 0 ? (
                        <ProductGrid
                            products={products.data}
                            isAuthenticated={isAuthenticated}
                        />
                    ) : (
                        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-md px-6 text-center">
                            <p className="text-sm font-semibold text-foreground">
                                Produk tidak ditemukan
                            </p>
                            <p className="mt-2 max-w-sm text-[12px] leading-6 text-secondary-foreground">
                                Coba kata kunci lain, pilih filter berbeda, atau
                                atur ulang tampilan koleksi.
                            </p>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-5 rounded-full bg-primary px-5 py-2 text-[11px] font-semibold tracking-wider text-primary-foreground transition hover:bg-primary/90"
                            >
                                Atur Ulang Filter
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </ShopLayout>
    );
}

function FadeInOnScroll({
    children,
    delay = 0,
}: {
    children: ReactNode;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.16 },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`h-full transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
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
                    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:gap-x-5 md:gap-y-12 lg:grid-cols-4 xl:grid-cols-4">
                        {products.map((product, index) => (
                            <ProductTile
                                key={product.id}
                                product={product}
                                index={index}
                                isAuthenticated={isAuthenticated}
                            />
                        ))}
                    </div>
                    {loading && (
                        <div className="mt-10 flex justify-center">
                            <span className="rounded-full border border-border px-5 py-2 text-[11px] font-semibold tracking-wider text-secondary-foreground uppercase">
                                Memuat produk...
                            </span>
                        </div>
                    )}
                </>
            )}
        </InfiniteScroll>
    );
});

const ProductTile = memo(function ProductTile({
    product,
    index,
    isAuthenticated,
}: {
    product: ProductCard;
    index: number;
    isAuthenticated: boolean;
}) {
    const [isWishlisted, setIsWishlisted] = useState(product.is_wishlisted);
    const [isWishlistProcessing, setIsWishlistProcessing] = useState(false);
    const isSoldOut = product.available_stock <= 0;

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
        <FadeInOnScroll delay={(index % 15) * 45}>
            <Link
                href={detail.url({ query: { product: product.slug } })}
                className="group flex h-full cursor-pointer flex-col"
            >
                <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-[#f7f7f7]">
                    <img
                        src={
                            product.image ??
                            fallbackImages[index % fallbackImages.length]
                        }
                        alt={product.title}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full object-cover transition-all duration-700 ease-in-out ${
                            isSoldOut
                                ? 'opacity-45 grayscale'
                                : product.hover_image
                                  ? 'group-hover:opacity-0'
                                  : 'group-hover:scale-[1.03]'
                        }`}
                    />
                    {product.hover_image && !isSoldOut && (
                        <img
                            src={product.hover_image}
                            alt={product.title}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:opacity-100"
                        />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />

                    {isSoldOut ? (
                        <div className="absolute top-2 left-2 bg-[#d83f3f] px-2 py-1 text-[8px] font-semibold tracking-widest text-white uppercase shadow-sm">
                            Habis
                        </div>
                    ) : product.badge ? (
                        <div className="absolute top-2 left-2 bg-[#d83f3f] px-2 py-1 text-[8px] font-medium tracking-widest text-white uppercase shadow-sm">
                            {product.badge}
                        </div>
                    ) : null}
                    <button
                        type="button"
                        aria-label={
                            isWishlisted
                                ? 'Hapus produk dari wishlist'
                                : 'Tambah produk ke wishlist'
                        }
                        onClick={toggleWishlist}
                        disabled={isWishlistProcessing}
                        className="absolute top-2 right-2 text-white drop-shadow-md transition-colors hover:text-white/80 disabled:cursor-default"
                    >
                        <Heart
                            size={18}
                            fill={isWishlisted ? 'currentColor' : 'none'}
                            strokeWidth={1.5}
                        />
                    </button>
                </div>

                <div
                    className={`mb-2 flex min-h-3 items-center justify-between gap-3 ${
                        isSoldOut ? 'opacity-55' : ''
                    }`}
                >
                    {product.colors.length > 0 ? (
                        <div className="flex space-x-1.5">
                            {product.colors.slice(0, 5).map((color) => (
                                <div
                                    key={color.hex}
                                    className="h-[10px] w-[10px] rounded-full border border-[#e7e2de]"
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name ?? color.hex}
                                />
                            ))}
                        </div>
                    ) : (
                        <span />
                    )}
                    {product.collection && (
                        <span className="truncate text-[9px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                            {product.collection}
                        </span>
                    )}
                </div>

                <h3
                    className={`mb-2 line-clamp-2 min-h-[2.75em] text-[12px] leading-snug font-medium text-[#272727] transition-colors group-hover:text-[#a55353] ${
                        isSoldOut ? 'opacity-55' : ''
                    }`}
                >
                    {product.title}
                </h3>

                <div
                    className={`mt-auto flex flex-wrap items-center gap-2 text-[12px] font-medium text-[#3d3d3d] ${
                        isSoldOut ? 'opacity-55' : ''
                    }`}
                >
                    <span>
                        {formatPrice(product.sale_price ?? product.price)}
                    </span>
                    {product.sale_price !== null && (
                        <span className="text-[#8b827c] line-through">
                            {formatPrice(product.price)}
                        </span>
                    )}
                </div>

                {/* <span className="mt-4 w-full border border-[#151515] py-2.5 text-center text-[10px] font-semibold tracking-[0.16em] text-[#151515] uppercase transition-all duration-300 group-hover:bg-[#151515] group-hover:text-white active:scale-[0.98]">
                    {product.available_stock > 0
                        ? 'Choose options'
                        : 'Sold out'}
                </span> */}
            </Link>
        </FadeInOnScroll>
    );
});

function FilterSection({
    title,
    children,
    defaultOpen = false,
}: {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="py-5">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="group flex w-full cursor-pointer items-center justify-between text-[11px] font-semibold tracking-wide transition-colors outline-none hover:text-foreground"
            >
                <span>{title}</span>
                <div
                    className={`transform transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                >
                    <ChevronDown
                        size={14}
                        className="text-muted-foreground transition-colors group-hover:text-foreground"
                    />
                </div>
            </button>
            <div
                className={`grid transition-[grid-template-rows,opacity,padding] duration-500 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${
                    isOpen
                        ? 'grid-rows-[1fr] pt-4 opacity-100'
                        : 'pointer-events-none grid-rows-[0fr] pt-0 opacity-0'
                }`}
            >
                <div className="overflow-hidden">{children}</div>
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
            className="group flex w-full items-center justify-between gap-3 text-left outline-none"
        >
            <span className="flex items-center gap-3">
                <span
                    className={`flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        active
                            ? 'border-primary ring-4 ring-primary/10'
                            : 'border-input group-hover:border-primary/50'
                    }`}
                >
                    <span
                        className={`h-[6px] w-[6px] rounded-full bg-primary transition-all duration-300 ${
                            active
                                ? 'scale-100 opacity-100'
                                : 'scale-0 opacity-0'
                        }`}
                    />
                </span>
                <span
                    className={`text-[11px] tracking-wide transition-colors duration-300 ${
                        active
                            ? 'font-medium text-foreground'
                            : 'text-secondary-foreground group-hover:text-foreground'
                    }`}
                >
                    {label}
                </span>
            </span>
        </button>
    );
}
