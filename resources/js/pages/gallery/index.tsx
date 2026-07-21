import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import ShopLayout from '@/layouts/shop-layout';

const unsplash = (id: string, width = 1200) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&q=85&w=${width}`;

const tabs = [
    'All',
    'Sunglasses',
    'Goggles',
    'Gloves',
    'Apparel',
    'Accessories',
    'Athletes',
    'Lifestyle',
    'Detail Shots',
] as const;

type GalleryTab = (typeof tabs)[number];
type GalleryImage = {
    src: string;
    alt: string;
    categories: GalleryTab[];
};

const mosaicImages: GalleryImage[] = [
    {
        src: unsplash('photo-1544191696-102dbdaeeaa0'),
        alt: 'Mountain biker descending a forest trail',
        categories: ['All', 'Sunglasses', 'Athletes', 'Lifestyle'],
    },
    {
        src: unsplash('photo-1558981403-c5f9899a28bc'),
        alt: 'Enduro rider accelerating across a dirt trail',
        categories: ['All', 'Goggles', 'Athletes', 'Lifestyle'],
    },
    {
        src: unsplash('photo-1558980664-10e7170b5df9'),
        alt: 'Motorcycle rider exploring a rugged mountain route',
        categories: ['All', 'Goggles', 'Athletes', 'Lifestyle'],
    },
    {
        src: unsplash('photo-1529422643029-d4585747aaf2'),
        alt: 'Trail cyclist crossing open mountain terrain',
        categories: ['All', 'Sunglasses', 'Athletes', 'Lifestyle'],
    },
    {
        src: unsplash('photo-1471506480208-91b3a4cc78be'),
        alt: 'Mountain bike prepared for a technical trail',
        categories: ['All', 'Accessories', 'Lifestyle', 'Detail Shots'],
    },
    {
        src: unsplash('photo-1502744688674-c619d1586c9e'),
        alt: 'Cyclist riding along a steep rocky trail',
        categories: ['All', 'Gloves', 'Athletes', 'Lifestyle'],
    },
    {
        src: unsplash('photo-1558981806-ec527fa84c39'),
        alt: 'Enduro motorcycle crossing an outdoor trail',
        categories: ['All', 'Goggles', 'Gloves', 'Athletes'],
    },
    {
        src: unsplash('photo-1541625602330-2277a4c46182'),
        alt: 'Cyclist training through mountainous trail scenery',
        categories: ['All', 'Sunglasses', 'Athletes', 'Lifestyle'],
    },
    {
        src: unsplash('photo-1511994298241-608e28f14fde'),
        alt: 'Trail athlete running across a mountain ridge',
        categories: ['All', 'Apparel', 'Athletes', 'Lifestyle'],
    },
    {
        src: unsplash('photo-1486218119243-13883505764c'),
        alt: 'Trail runner moving through sunset terrain',
        categories: ['All', 'Apparel', 'Athletes', 'Lifestyle'],
    },
    {
        src: unsplash('photo-1511499767150-a48a237f0083'),
        alt: 'Performance sunglasses ready for a trail ride',
        categories: ['All', 'Sunglasses', 'Accessories', 'Detail Shots'],
    },
    {
        src: unsplash('photo-1572635196237-14b3f281503f'),
        alt: 'Protective trail goggles photographed in detail',
        categories: ['All', 'Goggles', 'Accessories', 'Detail Shots'],
    },
    {
        src: unsplash('photo-1599058917212-d750089bc07e'),
        alt: 'Protective gloves and equipment for trail riding',
        categories: ['All', 'Gloves', 'Accessories', 'Detail Shots'],
    },
    {
        src: unsplash('photo-1521572163474-6864f9cf17ab'),
        alt: 'Technical apparel for mountain trail sessions',
        categories: ['All', 'Apparel', 'Athletes', 'Detail Shots'],
    },
    {
        src: unsplash('photo-1552674605-db6ffd4facb5'),
        alt: 'Trail athletes training together outdoors',
        categories: ['All', 'Athletes', 'Lifestyle'],
    },
    {
        src: unsplash('photo-1707985034123-dbbed1830205'),
        alt: 'Performance eyewear detail for dusty trail conditions',
        categories: ['All', 'Sunglasses', 'Accessories', 'Detail Shots'],
    },
];

function fillMosaic(images: GalleryImage[]): GalleryImage[] {
    const source = images.length === 0 ? mosaicImages : images;

    return Array.from(
        { length: 16 },
        (_, index) => source[index % source.length],
    );
}

export default function Gallery() {
    const [activeTab, setActiveTab] = useState<GalleryTab>('All');
    const visibleMosaic = useMemo(
        () =>
            fillMosaic(
                activeTab === 'All'
                    ? mosaicImages
                    : mosaicImages.filter((image) =>
                          image.categories.includes(activeTab),
                      ),
            ),
        [activeTab],
    );

    return (
        <ShopLayout>
            <Head title="AxeGear Gallery">
                <meta
                    name="description"
                    content="Explore the visual world of AxeGear through performance-driven product imagery, athlete moments, gear details, and lifestyle captures."
                />
            </Head>

            <div className="bg-white text-[14px] text-[#1A1A1A]">
                <section className="relative h-[320px] overflow-hidden sm:h-[340px]">
                    <img
                        src={unsplash('photo-1502744688674-c619d1586c9e', 1800)}
                        alt="Mountain cyclist riding across a rocky trail"
                        className="absolute inset-0 h-full w-full object-cover object-[65%_45%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/0" />
                    <div className="relative mx-auto flex h-full max-w-[1640px] items-center px-7 py-9 sm:px-11 lg:px-[76px]">
                        <div className="max-w-[390px]">
                            <p className="flex items-center gap-3 text-[13px] font-bold tracking-[0.04em] uppercase">
                                <span className="h-px w-6 bg-[#F58220]" />
                                Visual Showcase
                            </p>
                            <h1 className="mt-3 text-[38px] leading-[0.93] font-black tracking-[-0.035em] uppercase sm:text-[50px]">
                                AxeGear Gallery
                            </h1>
                            <p className="mt-4 max-w-[420px] text-[16px] leading-[1.5]">
                                Explore the visual world of AxeGear through
                                performance-driven product imagery, athlete
                                moments, gear details, and lifestyle captures.
                            </p>
                            <Link
                                href="/list"
                                className="mt-5 inline-flex items-center gap-3 text-[14px] font-bold text-[#F58220]"
                            >
                                View Latest Collection{' '}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section
                    aria-label="Gallery categories"
                    className="border-b border-[#D9D9D9]"
                >
                    <div className="scrollbar-hide flex overflow-x-auto px-5 sm:px-7">
                        <div className="mx-auto flex min-w-max items-center gap-7 sm:gap-10 md:gap-[52px]">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    aria-pressed={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative rounded-none px-0 py-5 text-[13px] leading-none font-semibold whitespace-nowrap ${
                                        activeTab === tab
                                            ? 'text-[#F58220]'
                                            : 'text-[#171717] hover:text-[#F58220]'
                                    }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <span className="absolute right-[-12px] bottom-0 left-[-12px] h-px bg-[#F58220]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-4 py-10 sm:px-7 sm:py-14">
                    <div className="grid grid-flow-dense auto-rows-[165px] grid-cols-2 gap-2 sm:auto-rows-[190px] sm:grid-cols-4 sm:gap-3">
                        {visibleMosaic.map((image, index) => (
                            <div
                                key={`${activeTab}-${index}-${image.src}`}
                                className={`overflow-hidden bg-[#F1F1F1] ${
                                    index === 0 || index === 8
                                        ? 'row-span-2'
                                        : index === 2 ||
                                            index === 3 ||
                                            index === 7 ||
                                            index === 10 ||
                                            index === 13 ||
                                            index === 15
                                          ? 'col-span-2'
                                          : ''
                                }`}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </ShopLayout>
    );
}
