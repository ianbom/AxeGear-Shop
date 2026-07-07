import { Link, router } from '@inertiajs/react';
import { Heart } from 'lucide-react';
import type { MouseEvent } from 'react';
import { destroy as removeWishlistItem } from '@/actions/App/Http/Controllers/Customer/WishlistController';
import ProfileLayout from '@/layouts/profile-layout';
import { detail, list } from '@/routes';

type WishlistItem = {
    id: number;
    slug: string;
    title: string;
    category: string | null;
    price: number;
    sale_price: number | null;
    image: string | null;
    badge: string | null;
    colors: Array<{
        name: string;
        hex: string;
    }>;
    available_stock: number;
    is_available: boolean;
};

type WishlistSummary = {
    item_count: number;
};

type Props = {
    wishlistItems: WishlistItem[];
    summary: WishlistSummary;
};

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

export default function MyWishlist({ wishlistItems, summary }: Props) {
    const visibleWishlistItems = wishlistItems.filter(
        (item) => item.is_available,
    );

    return (
        <ProfileLayout
            title="Wishlist Saya"
            pageTitle="Wishlist Saya"
            subtitle="Simpan item favoritmu sebelum kehabisan."
            activePath="wishlist"
            breadcrumbs={[
                { label: 'Beranda', href: '/' },
                { label: 'Akun Saya', href: '/my-profile' },
                { label: 'Wishlist Saya' },
            ]}
        >
            <div className="min-w-0">
                <div className="mb-6 flex items-end justify-between border-b border-hairline-strong pb-4">
                    <div>
                        <p className="mb-1 text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                            Item Tersimpan
                        </p>
                        <h2 className="text-[17px] font-semibold tracking-wide text-ink uppercase">
                            Koleksi Wishlist
                        </h2>
                    </div>

                    <div className="text-right text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                        {summary.item_count} produk tersimpan
                    </div>
                </div>

                {visibleWishlistItems.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-5 md:gap-y-10 xl:grid-cols-4">
                        {visibleWishlistItems.map((item, index) => (
                            <WishlistTile
                                key={item.id}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[360px] flex-col items-center justify-center border border-hairline-strong bg-white px-6 text-center">
                        <p className="text-sm font-semibold text-ink uppercase">
                            Wishlist masih kosong
                        </p>
                        <p className="mt-2 max-w-sm text-[12px] leading-6 text-muted-foreground">
                            Simpan produk favorit dari katalog agar mudah
                            ditemukan kembali.
                        </p>
                        <Link
                            href={list.url()}
                            className="mt-5 inline-flex h-10 items-center justify-center bg-primary px-5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-[#E67312]"
                        >
                            Lihat Produk
                        </Link>
                    </div>
                )}
            </div>
        </ProfileLayout>
    );
}

function WishlistTile({ item, index }: { item: WishlistItem; index: number }) {
    const productHref = detail.url({ query: { product: item.slug } });

    const removeItem = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        router.delete(removeWishlistItem.url(item.id), {
            preserveScroll: true,
        });
    };

    return (
        <Link href={productHref} className="group flex h-full flex-col">
            <div className="relative aspect-square overflow-hidden border border-hairline bg-white p-5 sm:p-6">
                <img
                    src={item.image ?? fallbackImages[index % fallbackImages.length]}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {item.badge && (
                    <div className="absolute top-0 left-0 z-10 flex min-h-24 w-9 items-center justify-center bg-primary px-1 py-2 text-[10px] font-semibold tracking-[0.08em] text-white uppercase [writing-mode:vertical-rl] [text-orientation:mixed] [transform:rotate(180deg)] sm:w-10 sm:text-[11px]">
                        {item.badge}
                    </div>
                )}

                <button
                    type="button"
                    aria-label="Hapus dari wishlist"
                    onClick={removeItem}
                    className="absolute top-3 right-3 z-10 grid size-9 place-items-center border border-hairline-strong bg-white text-ink transition hover:border-ink hover:text-primary"
                >
                    <Heart size={18} fill="currentColor" strokeWidth={1.8} />
                </button>
            </div>

            {item.colors.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.colors.map((color) => (
                        <span
                            key={color.hex}
                            className="size-4 border border-hairline-strong"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        />
                    ))}
                </div>
            )}

            <p className="mt-2 text-[9px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                {item.category}
            </p>
            <h3 className="mt-1 text-[11px] leading-[1.4] font-semibold text-ink uppercase transition-colors group-hover:text-primary">
                {item.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-body">
                <span>{formatPrice(item.sale_price ?? item.price)}</span>
                {item.sale_price !== null && (
                    <span className="text-muted-foreground line-through">
                        {formatPrice(item.price)}
                    </span>
                )}
            </div>
        </Link>
    );
}
