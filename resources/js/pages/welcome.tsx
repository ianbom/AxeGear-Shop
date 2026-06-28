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

type CategoryCard = {
    name: string;
    slug: string;
    image_url: string | null;
};

type Props = {
    heroBanners: BannerCard[];
    ctaBanner: BannerCard;
    collectionBanners: BannerCard[];
    categories: CategoryCard[];
    hajjSeries: ProductCard[];
    wePresent: ProductCard[];
    recentAdditions: ProductCard[];
    mostLoved: ProductCard[];
};

const fallbackImage = 'https://orcapowergear.com/_next/image?url=%2Fasset%2Fbanner%2Fwebbanner-orca.webp&w=3840&q=75';

const fallbackCategories: CategoryCard[] = [
    { name: 'Performance Sunglasses', slug: 'sunglasses', image_url: fallbackImage },
    { name: 'Moto & MTB Goggles', slug: 'goggles', image_url: fallbackImage },
    { name: 'Performance Gloves', slug: 'gloves', image_url: fallbackImage },
];

export default function Welcome({ heroBanners, collectionBanners, categories }: Props) {
    const heroSlides = useMemo(
        () => heroBanners.filter(Boolean).map((banner) => banner!.image_desktop_url),
        [heroBanners],
    );
    const performanceImage = collectionBanners.find(Boolean)?.image_desktop_url ?? fallbackImage;
    const tiles = categories.length > 0 ? categories.slice(0, 3) : fallbackCategories;
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
                <section className="relative h-[110svh] overflow-hidden border-b-2 border-[#1A1A1A] bg-black">
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
                                className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border-2 border-white text-2xl font-semibold text-white transition-colors hover:bg-white hover:text-black"
                            >
                                «
                            </button>
                            <button
                                type="button"
                                aria-label="Next slide"
                                onClick={() => goToSlide(activeSlide + 1)}
                                className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border-2 border-white text-2xl font-semibold text-white transition-colors hover:bg-white hover:text-black"
                            >
                                »
                            </button>
                        </>
                    )}
                </section>

                <section className="h-[110svh] overflow-hidden border-b-2 border-[#1A1A1A] bg-white">
                    <img
                        src={performanceImage}
                        alt="AxeGear performance campaign"
                        className="h-full w-full object-cover object-center"
                    />
                </section>

                <section className="border-b-2 border-[#1A1A1A] bg-white">
                    <div className="grid grid-cols-1 gap-0 lg:grid-cols-3 lg:gap-[10px]">
                        {tiles.map((tile) => (
                            <Link
                                key={tile.slug}
                                href={list.url({ query: { category: tile.slug } })}
                                aria-label={tile.name}
                                className="group relative block h-[85svh] overflow-hidden bg-black lg:h-[110svh]"
                            >
                                <img
                                    src={tile.image_url ?? fallbackImage}
                                    alt={tile.name}
                                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute right-6 top-5 z-10 text-right text-[28px] italic font-semibold leading-none tracking-[-0.02em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] lg:right-7 lg:top-6 lg:text-[32px]">
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