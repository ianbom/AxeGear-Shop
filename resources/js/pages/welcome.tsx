import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Clock, RotateCcw, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import ShopLayout from '@/layouts/shop-layout';
import { detail, list } from '@/routes';

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
    colors: Array<{
        name: string | null;
        hex: string;
    }>;
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

const fallbackImages = [
    '/img/abdul-raheem-kannath-aNWfK46QWto-unsplash.webp',
    '/img/ainur-iman-qcNmigFPTQM-unsplash.webp',
    '/img/atiyeh-fathi-CvdzGjVX9DA-unsplash.webp',
    '/img/hasan-almasi-_X2UAmIcpko-unsplash.webp',
    '/img/ike-ellyana-2F70bGqQVa4-unsplash.webp',
    '/img/khaled-ghareeb-n84s3jgzhKk-unsplash.webp',
    '/img/m-ghufanil-muta-ali-vAyDuvcjXcs-unsplash.webp',
    '/img/mina-rad-2O2cXJemDmo-unsplash.webp',
    '/img/monody-le-7YrRbgOPibw-unsplash.webp',
    '/img/omar-elsharawy-gFHBofW3ncQ-unsplash.webp',
];

const formatPrice = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);

const productImage = (product: ProductCard | undefined, index: number) =>
    product?.image ?? fallbackImages[index % fallbackImages.length];
const bannerImage = (banner: BannerCard | undefined, fallback: string) =>
    banner?.image_desktop_url ?? fallback;

export default function Home({
    heroBanners,
    ctaBanner,
    collectionBanners,
    categories,
    wePresent,
    mostLoved,
}: Props) {
    return (
        <ShopLayout>
            <Head title="Brand Fashion Muslim No.1 - Anemi" />

            <FadeInOnScroll>
                <HeroSlider heroBanners={heroBanners} />
            </FadeInOnScroll>

            {/* Feature Strip */}
            <div className="flex w-full flex-col items-center justify-center border-b border-[#e7e2de] bg-white px-4 py-5 text-[10px] font-medium tracking-[0.08em] text-[#272727] uppercase md:flex-row md:px-10 md:text-xs">
                <div className="mb-2 flex w-full items-center justify-center gap-4 md:mb-0 md:w-auto md:gap-10">
                    <div className="flex items-center gap-2">
                        <Clock size={16} strokeWidth={1.5} />
                        <span>Koleksi Lengkap</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Star size={16} strokeWidth={1.5} />
                        <span>Harga Terjangkau</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <RotateCcw size={16} strokeWidth={1.5} />
                        <span>Nyaman & Stylish</span>
                    </div>
                </div>
            </div>

            {/* Category Section */}
            <section className="mx-auto max-w-[1500px] px-4 py-10 md:px-10 md:py-14">
                <FadeInOnScroll>
                    <div className="mb-8 text-center md:mb-10">
                        <h2 className="text-2xl tracking-normal text-[#171717] uppercase md:text-3xl">
                            Category
                        </h2>
                    </div>
                </FadeInOnScroll>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                    {categories?.map((category, index) => (
                        <FadeInOnScroll key={index} delay={index * 100}>
                            <Link
                                href={`/list?category=${encodeURIComponent(category.slug)}`}
                                className="group relative flex aspect-[3/4] w-full items-end justify-center overflow-hidden bg-[#f7f7f7]"
                            >
                                <img
                                    src={
                                        category.image_url ??
                                        fallbackImages[
                                            index % fallbackImages.length
                                        ]
                                    }
                                    alt={category.name}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent transition-colors duration-500 group-hover:from-black/55" />
                                <span className="relative z-10 mb-5 text-center text-sm font-medium tracking-[0.18em] text-white uppercase drop-shadow-md md:text-base">
                                    {category.name}
                                </span>
                            </Link>
                        </FadeInOnScroll>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-[1500px] px-4 py-12 md:px-10 md:py-16">
                <SectionTitle
                    title="Kami Hadirkan Untukmu..."
                    subtitle="Lebih Banyak Cinta. Tambahan Spesial, Eksklusif Untukmu"
                />

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-5">
                    {wePresent.map((item, index) => (
                        <ProductTile
                            key={item.id}
                            product={item}
                            index={index}
                            button
                        />
                    ))}
                </div>
            </section>

            <NewCollectionsSection collectionBanners={collectionBanners} />

            <section className="mx-auto max-w-[1500px] px-4 py-12 md:px-10 md:py-20">
                <SectionTitle
                    title="Most Loved Essentials"
                    subtitle="Classics And Verified By Many, To Be Your Next Favorites"
                />

                <div className="relative">
                    <div className="hide-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-4">
                        {mostLoved.map((item, index) => (
                            <ProductTile
                                key={item.id}
                                product={item}
                                index={index}
                                button
                                wide
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CtaSection ctaBanner={ctaBanner} />

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    .hide-scrollbar::-webkit-scrollbar { display: none; }
                    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `,
                }}
            />
        </ShopLayout>
    );
}

function CtaSection({ ctaBanner }: { ctaBanner: BannerCard }) {
    return (
        <FadeInOnScroll>
            <section className="mx-auto mt-6 mb-12 max-w-[1500px] px-4 md:mt-10 md:mb-20 md:px-10">
                <div className="group relative min-h-[280px] overflow-hidden md:min-h-[500px]">
                    <img
                        src={bannerImage(
                            ctaBanner,
                            '/img/sarah-khan-R7p66Oj8ZOQ-unsplash.webp',
                        )}
                        alt={ctaBanner?.title ?? 'Anemi collection banner'}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

                    <div className="relative z-10 flex min-h-[280px] items-end justify-start px-6 py-10 text-left md:min-h-[500px] md:px-10 md:py-16">
                        <div className="max-w-[560px]">
                            <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] text-white/80 uppercase md:text-xs">
                                {ctaBanner?.subtitle ?? 'New Collection'}
                            </p>
                            <h2 className="text-3xl leading-tight font-light tracking-[0.08em] text-white uppercase md:text-5xl">
                                {ctaBanner?.title ?? 'Discover Your Style'}
                            </h2>
                            <Link
                                href={ctaBanner?.button_url ?? list.url()}
                                className="mt-7 inline-flex border border-white px-8 py-3 text-[10px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-sm transition-colors hover:bg-white hover:text-black md:text-[11px]"
                            >
                                {ctaBanner?.button_text ?? 'Discover'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </FadeInOnScroll>
    );
}

function NewCollectionsSection({
    collectionBanners,
}: {
    collectionBanners: BannerCard[];
}) {
    const [mainBanner, secondaryBanner] = collectionBanners;

    return (
        <FadeInOnScroll>
            <section className="bg-[#f7f7f7] px-5 py-8 md:px-10 md:py-12">
                <div className="relative mx-auto flex max-w-[1188px] flex-col gap-8 overflow-hidden lg:min-h-[768px]">
                    <img
                        src={bannerImage(
                            mainBanner,
                            '/img/shedrack-salami-DRjeesi2kFM-unsplash.webp',
                        )}
                        alt={
                            mainBanner?.title ??
                            'Model wearing red fashion collection'
                        }
                        className="order-3 h-[520px] w-full object-cover md:h-[680px] lg:absolute lg:top-0 lg:left-0 lg:order-none lg:h-[752px] lg:w-[430px]"
                    />

                    <h2 className="order-1 text-[42px] leading-[0.88] font-light tracking-[-0.045em] text-[#111111] uppercase md:text-[58px] lg:absolute lg:top-0 lg:left-[455px]">
                        NEW
                        <br />
                        COLLECTIONS
                    </h2>

                    <Link
                        href={list.url()}
                        className="order-2 flex w-fit items-center gap-3 text-sm font-semibold text-[#111111] lg:absolute lg:top-5 lg:right-[22px]"
                    >
                        <span>See more</span>
                        <span className="relative block h-px w-[43px] bg-[#111111] after:absolute after:top-1/2 after:right-0 after:h-2 after:w-2 after:-translate-y-1/2 after:rotate-45 after:border-t after:border-r after:border-[#111111] after:content-['']" />
                    </Link>

                    <div className="order-4 max-w-[255px] text-[15px] leading-[1.55] text-[#333333] lg:absolute lg:top-[156px] lg:left-[816px]">
                        <p>{mainBanner?.subtitle ?? ''}</p>
                        <p className="mt-3">{secondaryBanner?.subtitle ?? ''}</p>
                    </div>

                    <img
                        src={bannerImage(
                            secondaryBanner,
                            '/img/sajimon-sahadevan-AWC94dVpTPc-unsplash.webp',
                        )}
                        alt={
                            secondaryBanner?.title ??
                            'Model wearing black fashion collection'
                        }
                        className="order-5 h-[377px] w-[249px] object-cover lg:absolute lg:top-[376px] lg:left-[456px] lg:order-none"
                    />
                </div>
            </section>
        </FadeInOnScroll>
    );
}

function HeroSlider({ heroBanners }: { heroBanners: BannerCard[] }) {
    const slides =
        heroBanners && heroBanners.length > 0
            ? heroBanners.map((banner) => ({
                  desktop: bannerImage(
                      banner,
                      '/img/omar-elsharawy-gFHBofW3ncQ-unsplash.webp',
                  ),
                  mobile:
                      banner?.image_mobile_url ??
                      bannerImage(
                          banner,
                          '/img/omar-elsharawy-gFHBofW3ncQ-unsplash.webp',
                      ),
              }))
            : [
                  {
                      desktop: '/img/omar-elsharawy-gFHBofW3ncQ-unsplash.webp',
                      mobile: '/img/omar-elsharawy-gFHBofW3ncQ-unsplash.webp',
                  },
                  {
                      desktop:
                          '/img/abdul-raheem-kannath-aNWfK46QWto-unsplash.webp',
                      mobile: '/img/abdul-raheem-kannath-aNWfK46QWto-unsplash.webp',
                  },
                  {
                      desktop: '/img/ainur-iman-qcNmigFPTQM-unsplash.webp',
                      mobile: '/img/ainur-iman-qcNmigFPTQM-unsplash.webp',
                  },
              ];

    const sliderRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index: number) => {
        const slider = sliderRef.current;
        const slideIndex = (index + slides.length) % slides.length;

        if (!slider) {
            return;
        }

        slider.scrollTo({
            behavior: 'smooth',
            left: slider.clientWidth * slideIndex,
        });
        setCurrentIndex(slideIndex);
    };

    const updateCurrentSlide = () => {
        const slider = sliderRef.current;

        if (!slider) {
            return;
        }

        setCurrentIndex(
            Math.min(
                slides.length - 1,
                Math.round(slider.scrollLeft / slider.clientWidth),
            ),
        );
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % slides.length;
            goToSlide(nextIndex);
        }, 5000);

        return () => clearInterval(timer);
    }, [currentIndex, slides.length]);

    return (
        <section className="relative h-[calc(100svh-4rem)] w-full overflow-hidden bg-[#f7f7f7] md:h-[82vh]">
            <div
                ref={sliderRef}
                onScroll={updateCurrentSlide}
                className="hide-scrollbar flex h-full snap-x snap-mandatory overflow-x-hidden scroll-smooth"
            >
                {slides.map((slide, index) => (
                    <Link
                        key={index}
                        href={list.url()}
                        className="relative h-full min-w-full snap-start"
                    >
                        <picture className="block h-full w-full">
                            <source
                                media="(max-width: 767px)"
                                srcSet={slide.mobile}
                            />
                            <img
                                src={slide.desktop}
                                alt={`Hero Banner ${index + 1}`}
                                draggable={false}
                                className="h-full w-full object-cover"
                            />
                        </picture>
                        <div className="absolute inset-0 bg-black/5" />
                    </Link>
                ))}
            </div>

            <div className="absolute right-0 bottom-24 left-0 z-20 flex justify-center gap-3 md:bottom-8">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`h-0.5 transition-all duration-300 ${
                            index === currentIndex
                                ? 'w-10 bg-white'
                                : 'w-6 bg-white/45'
                        }`}
                        aria-hidden="true"
                    />
                ))}
            </div>

            <div className="absolute right-4 bottom-20 left-4 z-30 flex items-center justify-between md:bottom-6 md:right-8 md:left-8">
                <button
                    type="button"
                    onClick={() => goToSlide(currentIndex - 1)}
                    className="flex h-7 w-7 items-center justify-center border border-white/25 bg-black/5 text-white/60 backdrop-blur-[2px] transition-colors hover:border-white/55 hover:bg-white/10 hover:text-white md:h-8 md:w-8"
                    aria-label="Previous hero banner"
                >
                    <ChevronLeft size={16} strokeWidth={1.4} />
                </button>
                <button
                    type="button"
                    onClick={() => goToSlide(currentIndex + 1)}
                    className="flex h-7 w-7 items-center justify-center border border-white/25 bg-black/5 text-white/60 backdrop-blur-[2px] transition-colors hover:border-white/55 hover:bg-white/10 hover:text-white md:h-8 md:w-8"
                    aria-label="Next hero banner"
                >
                    <ChevronRight size={16} strokeWidth={1.4} />
                </button>
            </div>
        </section>
    );
}

function FadeInOnScroll({
    children,
    className = '',
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
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
            className={`${className} transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
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

function SectionTitle({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) {
    return (
        <div className="mb-8 text-center md:mb-10">
            <h2 className="mb-2 text-2xl tracking-normal text-[#171717] uppercase md:text-3xl">
                {title}
            </h2>
            <p className="mx-auto max-w-xl text-[10px] tracking-[0.12em] text-[#6f6f6f] uppercase md:text-xs">
                {subtitle}
            </p>
        </div>
    );
}

function ProductTile({
    product,
    index,
    button = false,
    centered = false,
    wide = false,
}: {
    product: ProductCard;
    index: number;
    button?: boolean;
    centered?: boolean;
    wide?: boolean;
}) {
    return (
        <FadeInOnScroll
            className={`${centered ? 'min-w-[45%] sm:min-w-[30%]' : ''} ${
                wide ? 'min-w-[65%] sm:min-w-[45%]' : ''
            } snap-start md:min-w-0`}
            delay={index * 60}
        >
            <Link
                href={detail.url({ query: { product: product.slug } })}
                className={`group flex cursor-pointer flex-col ${centered ? 'text-center' : ''}`}
            >
                <div className="relative mb-3 aspect-[3/4] overflow-hidden bg-[#f7f7f7]">
                    {product.label && (
                        <span
                            className={`absolute top-2 left-2 z-10 px-2 py-1 text-[8px] font-bold tracking-widest uppercase ${
                                product.label.includes('%')
                                    ? 'bg-[#d83f3f] text-white'
                                    : 'bg-white/90 text-[#151515]'
                            }`}
                        >
                            {product.label}
                        </span>
                    )}
                    <img
                        src={productImage(product, index)}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className={centered ? 'px-1 text-center' : 'px-1'}>
                    <h3 className="mb-1 line-clamp-2 min-h-[2.75em] text-[10px] leading-snug font-medium text-[#272727] md:text-xs">
                        {product.name}
                    </h3>
                    <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[10px] font-medium text-[#3d3d3d] md:mb-3 md:text-xs">
                        <span>
                            {formatPrice(product.sale_price ?? product.price)}
                        </span>
                        {product.sale_price !== null && (
                            <span className="text-[#8b827c] line-through">
                                {formatPrice(product.price)}
                            </span>
                        )}
                    </div>
                    {button ? (
                        <span className="block w-full bg-[#B98B63] py-2.5 text-center text-[9px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-[#9A6B45] md:text-[10px]">
                            Choose options
                        </span>
                    ) : (
                        <span className="border-b border-[#B98B63] pb-0.5 text-[9px] font-semibold tracking-[0.14em] text-[#B98B63] uppercase transition-colors hover:border-[#9A6B45] hover:text-[#9A6B45] md:text-[10px]">
                            Choose options
                        </span>
                    )}
                </div>
            </Link>
        </FadeInOnScroll>
    );
}
