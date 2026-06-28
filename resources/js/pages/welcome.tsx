import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import ShopLayout from '@/layouts/shop-layout';
import { list } from '@/routes';

type ProductCard = {
    id: number;
    slug: string;
    name: string;
    price: number;
    sale_price: number | null;
    label: string | null;
    image: string | null;
    category: string | null;
    collection: string | null;
    colors: Array<{ name: string | null; hex: string }>;
};

type BannerCard = {
    id: number;
    title: string;
    subtitle: string | null;
    image_desktop_url: string;
    image_mobile_url: string | null;
    button_text: string | null;
    button_url: string | null;
} | null;

type CollectionCard = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    banner_desktop_url: string | null;
    banner_mobile_url: string | null;
    image_url: string | null;
    sort_order: number;
    is_featured: boolean;
    is_active: boolean;
    starts_at: string | null;
    ends_at: string | null;
    created_at: string | null;
    updated_at: string | null;
};

type Props = {
    heroBanners: BannerCard[];
    ctaBanner: BannerCard;
    collectionBanners: BannerCard[];
    collections?: CollectionCard[];
    hajjSeries: ProductCard[];
    wePresent: ProductCard[];
    recentAdditions: ProductCard[];
    mostLoved: ProductCard[];
};

const fallbackImage = 'https://orcapowergear.com/_next/image?url=%2Fasset%2Fbanner%2Fwebbanner-orca.webp&w=3840&q=75';

function SectionSeparator({ accent = 'red', label }: { accent?: 'red' | 'blue'; label?: string }) {
    const accentLine = accent === 'red' ? 'bg-[#ff1a00]' : 'bg-[#1d9cff]';
    const accentText = accent === 'red' ? 'text-[#ff1a00]' : 'text-[#69bcff]';

    return (
        <div className="border-y-2 border-[#101010] bg-[#050505] px-4 py-3 sm:px-6 lg:px-10">
            <div className="flex items-center gap-3 text-white">
                <div className={`h-px flex-1 ${accentLine}`} />
                {label ? (
                    <span
                        className={`shrink-0 text-[11px] font-semibold uppercase tracking-[0.45em] ${accentText}`}
                    >
                        {label}
                    </span>
                ) : (
                    <div className={`h-[22px] w-[2px] ${accentLine}`} />
                )}
                <div className={`h-px flex-1 ${accentLine}`} />
            </div>
            <div className="mt-2 flex items-center justify-center gap-3">
                <div className={`h-[2px] w-12 ${accentLine}`} />
                <div className="h-[10px] w-[2px] bg-white/70" />
                <div className={`h-[2px] w-12 ${accentLine}`} />
            </div>
        </div>
    );
}

export default function Welcome({ heroBanners = [], collectionBanners = [], collections = [] }: Props) {
    const heroSlides = useMemo(
        () => heroBanners.filter(Boolean).map((banner) => banner!.image_desktop_url),
        [heroBanners],
    );
    const performanceImage = collectionBanners.find(Boolean)?.image_desktop_url ?? fallbackImage;
    const tiles = collections.slice(0, 3);
    const slides = heroSlides.length > 0 ? heroSlides : [fallbackImage];
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) {
            return;
        }

        const timer = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % slides.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index: number) => {
        setActiveSlide((index + slides.length) % slides.length);
    };

    return (
        <ShopLayout>
            <Head title="AxeGear" />

            <main className="bg-white text-[#1A1A1A]">
                <section className="relative h-[100svh] overflow-hidden border-b-2 border-[#101010] bg-black sm:h-[105svh] lg:h-[110svh]">
                    <div
                        className="flex h-full transition-transform duration-700 ease-out"
                        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div key={`${slide}-${index}`} className="relative h-full min-w-full">
                                <img
                                    src={slide}
                                    alt={`AxeGear hero slide ${index + 1}`}
                                    className="h-full w-full object-cover object-center"
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    decoding="async"
                                />
                            </div>
                        ))}
                    </div>

                    {slides.length > 1 && (
                        <>
                            <button
                                type="button"
                                aria-label="Previous slide"
                                onClick={() => goToSlide(activeSlide - 1)}
                                className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-[8px] border border-white/70 bg-black/55 text-xl font-semibold text-white transition-colors hover:bg-white hover:text-black sm:left-5"
                            >
                                «
                            </button>
                            <button
                                type="button"
                                aria-label="Next slide"
                                onClick={() => goToSlide(activeSlide + 1)}
                                className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-[8px] border border-white/70 bg-black/55 text-xl font-semibold text-white transition-colors hover:bg-white hover:text-black sm:right-5"
                            >
                                »
                            </button>
                        </>
                    )}
                </section>

                <SectionSeparator accent="red" label="RACE READY PERFORMANCE" />

                <section className="h-[100svh] overflow-hidden border-b-2 border-[#101010] bg-[#8fd6ff] sm:h-[105svh] lg:h-[110svh]">
                    <img
                        src={performanceImage}
                        alt="AxeGear performance campaign"
                        className="h-full w-full object-cover object-center"
                    />
                </section>

                <SectionSeparator accent="blue" label="SHOP BY CATEGORY" />

                <section className="border-b-2 border-[#1A1A1A] bg-white px-5 py-6 sm:px-8 lg:px-12 xl:px-16">
                    <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10 xl:gap-14">
                        {tiles.length > 0 && tiles.map((tile) => (
                            <Link
                                key={tile.slug}
                                href={list.url({ query: { collection: tile.slug } })}
                                aria-label={tile.name}
                                className="group relative block h-[78svh] overflow-hidden bg-white lg:h-[100svh]"
                            >
                                <img
                                    src={tile.banner_mobile_url ?? fallbackImage}
                                    alt={tile.name}
                                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute right-6 top-5 z-10 text-right text-[28px] italic font-semibold leading-none tracking-[-0.02em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] lg:right-7 lg:top-6 lg:text-[20px]">
                                    {tile.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </ShopLayout>
    );
}

Welcome.layout = (page: ReactNode) => page;