import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import ShopLayout from '@/layouts/shop-layout';

const tabs = ['All', 'Sunglasses', 'Goggles', 'Gloves', 'Apparel', 'Accessories', 'Athletes', 'Lifestyle', 'Detail Shots'] as const;

type GalleryTab = (typeof tabs)[number];
type GalleryImage = { src: string; alt: string; categories: GalleryTab[] };

const mosaicImages: GalleryImage[] = [
    { src: '/img/gallery/mosaic-cyclist.jpg', alt: 'Road cyclist wearing AxeGear performance eyewear', categories: ['All', 'Sunglasses', 'Athletes', 'Lifestyle'] },
    { src: '/img/gallery/mosaic-moto.jpg', alt: 'Trail rider wearing AxeGear moto goggles', categories: ['All', 'Goggles', 'Athletes', 'Lifestyle'] },
    { src: '/img/gallery/mosaic-goggles.jpg', alt: 'AxeGear orange lens performance goggles', categories: ['All', 'Goggles', 'Accessories', 'Detail Shots'] },
    { src: '/img/gallery/mosaic-gloves.jpg', alt: 'AxeGear gloves and riding accessories', categories: ['All', 'Gloves', 'Accessories', 'Detail Shots'] },
    { src: '/img/gallery/mosaic-athlete.jpg', alt: 'Athlete wearing black AxeGear apparel', categories: ['All', 'Apparel', 'Athletes', 'Lifestyle'] },
    { src: '/img/gallery/mosaic-trail.jpg', alt: 'AxeGear rider on a dusty trail', categories: ['All', 'Athletes', 'Lifestyle'] },
    { src: '/img/gallery/mosaic-glasses.jpg', alt: 'Black AxeGear performance sunglasses', categories: ['All', 'Sunglasses', 'Accessories', 'Detail Shots'] },
    { src: '/img/gallery/mosaic-goggles-black.jpg', alt: 'Black AxeGear moto goggles', categories: ['All', 'Goggles', 'Accessories', 'Detail Shots'] },
];

const spotlightItems = [
    ['Performance Sunglasses', 'Lightweight, durable, and built for every condition.', 'spotlight-sunglasses.jpg'],
    ['Moto / MTB Goggles', 'Maximum vision. Ultimate protection. No compromises.', 'spotlight-goggles.jpg'],
    ['Performance Gloves', 'Grip. Control. Comfort. Engineered for performance.', 'spotlight-gloves.jpg'],
    ['Riding Apparel', 'Technical gear that moves with you and keeps you ahead.', 'spotlight-apparel.jpg'],
].map(([title, description, image]) => ({ title, description, image: `/img/gallery/${image}` }));

const trackImages = Array.from({ length: 6 }, (_, index) => ({ src: `/img/gallery/track-${index + 1}.jpg`, alt: `AxeGear athlete in action ${index + 1}` }));
const detailItems = [
    ['Hydrophobic Lens Coating', 'Repels water. Enhances clarity.'],
    ['TR90 Frame Technology', 'Lightweight. Flexible. Tough.'],
    ['Breathable Performance Fabric', 'Stay cool. Stay focused.'],
    ['Reinforced Stitching', 'Engineered for performance.'],
    ['Secure Fit System', 'Lock in. Ride hard.'],
    ['Triple-Layer Face Foam', 'All-day comfort. Zero distractions.'],
].map(([title, description], index) => ({ title, description, image: `/img/gallery/detail-${index + 1}.jpg` }));
const actionImages = Array.from({ length: 6 }, (_, index) => ({ src: `/img/gallery/action-${index + 1}.jpg`, alt: `AxeGear community action shot ${index + 1}` }));

function fillMosaic(images: GalleryImage[]): GalleryImage[] {
    const source = images.length === 0 ? mosaicImages : images;
    return Array.from({ length: 8 }, (_, index) => source[index % source.length]);
}

export default function Gallery() {
    const [activeTab, setActiveTab] = useState<GalleryTab>('All');
    const visibleMosaic = useMemo(
        () => fillMosaic(activeTab === 'All' ? mosaicImages : mosaicImages.filter((image) => image.categories.includes(activeTab))),
        [activeTab],
    );

    return (
        <ShopLayout>
            <Head title="AxeGear Gallery">
                <meta name="description" content="Explore the visual world of AxeGear through performance-driven product imagery, athlete moments, gear details, and lifestyle captures." />
            </Head>

            <div className="bg-white text-[#1A1A1A]">
                <section className="grid min-h-[250px] border-b border-[#D9D9D9] lg:grid-cols-[42.8%_57.2%]">
                    <div className="flex flex-col justify-center px-7 py-12 sm:px-11 lg:px-[43px] lg:py-10">
                        <p className="text-[10px] leading-none font-bold tracking-[0.03em] text-[#F58220] uppercase">Visual Showcase</p>
                        <h1 className="mt-4 text-[44px] leading-[0.92] font-black tracking-[-0.045em] text-[#090909] sm:text-[52px] lg:text-[48px]">AxeGear Gallery</h1>
                        <p className="mt-5 max-w-[315px] text-[13px] leading-[1.55] text-[#343434]">Explore the visual world of AxeGear through performance-driven product imagery, athlete moments, gear details, and lifestyle captures.</p>
                        <Link href="/list" className="mt-6 inline-flex w-fit items-center gap-3 border-b border-[#F58220] pb-1 text-[11px] font-bold text-[#1A1A1A]">View Latest Collection <ArrowRight className="h-4 w-4 text-[#F58220]" strokeWidth={1.8} /></Link>
                    </div>
                    <img src="/img/gallery/hero.jpg" alt="AxeGear cyclists wearing performance helmets and eyewear" className="h-[285px] w-full object-cover sm:h-[340px] lg:h-full lg:min-h-[250px]" />
                </section>

                <section aria-label="Gallery categories" className="border-b border-[#D9D9D9]">
                    <div className="scrollbar-hide flex overflow-x-auto px-5 sm:px-7">
                        <div className="mx-auto flex min-w-max items-center gap-7 sm:gap-10 lg:gap-[52px]">
                            {tabs.map((tab) => (
                                <button key={tab} type="button" aria-pressed={activeTab === tab} onClick={() => setActiveTab(tab)} className={`relative rounded-none px-0 py-[17px] text-[10px] leading-none font-semibold whitespace-nowrap ${activeTab === tab ? 'text-[#F58220]' : 'text-[#171717] hover:text-[#F58220]'}`}>
                                    {tab}
                                    {activeTab === tab && <span className="absolute right-[-12px] bottom-0 left-[-12px] h-px bg-[#F58220]" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-4 py-3 sm:px-7 sm:py-4">
                    <div className="grid auto-rows-[132px] grid-cols-2 gap-1 sm:auto-rows-[148px] sm:grid-cols-4">
                        {visibleMosaic.map((image, index) => (
                            <div key={`${activeTab}-${index}-${image.src}`} className={`overflow-hidden bg-[#F1F1F1] ${index === 0 ? 'row-span-2' : index === 2 || index === 3 || index === 7 ? 'col-span-2' : ''}`}>
                                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                            </div>
                        ))}
                    </div>
                </section>

                <img src="/img/gallery/speed-banner.jpg" alt="Built for Speed. Designed for Clarity. Premium materials and athlete-tested design." className="h-auto w-full" />

                <section className="px-4 pt-3 pb-4 sm:px-7">
                    <h2 className="text-center text-[21px] leading-none font-black tracking-[-0.04em] text-[#111111]">Product Spotlight</h2>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {spotlightItems.map((item) => (
                            <article key={item.title} className="border border-[#DEDEDE] bg-white">
                                <img src={item.image} alt={item.title} className="aspect-[1.83/1] w-full object-cover" />
                                <div className="px-7 py-3 sm:px-5">
                                    <h3 className="text-[12px] leading-tight font-bold text-[#171717]">{item.title}</h3>
                                    <p className="mt-1 min-h-8 text-[9px] leading-[1.35] text-[#202020]">{item.description}</p>
                                    <Link href="/list" className="mt-2 inline-flex items-center gap-3 text-[9px] font-bold text-[#171717]">View Collection <ArrowRight className="h-3 w-3 text-[#F58220]" strokeWidth={1.8} /></Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <ImageStrip title="On the Track. On the Trail. On the Move." images={trackImages} />

                <section className="px-4 pb-4 sm:px-7">
                    <h2 className="text-center text-[17px] leading-none font-black tracking-[-0.035em] text-[#111111]">Details Matter</h2>
                    <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
                        {detailItems.map((item) => (
                            <article key={item.title} className="text-center">
                                <img src={item.image} alt={item.title} className="aspect-[1.62/1] w-full object-cover" />
                                <h3 className="mt-1.5 text-[8px] leading-tight font-bold text-[#151515]">{item.title}</h3>
                                <p className="mt-0.5 text-[7px] leading-tight text-[#333333]">{item.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <ImageStrip title="#AxeGear In Action" images={actionImages} />

                <section className="grid items-center gap-5 border-t border-[#E4E4E4] bg-[#FAFAFA] px-7 py-4 sm:grid-cols-[30%_1fr_auto] sm:gap-7 lg:px-[68px]">
                    <img src="/img/gallery/cta-product.jpg" alt="AxeGear performance eyewear collection" className="mx-auto max-h-[76px] w-full object-contain sm:mx-0" />
                    <div className="text-center sm:text-left">
                        <h2 className="text-[23px] leading-none font-black tracking-[-0.04em] text-[#111111]">Ready to Gear Up?</h2>
                        <p className="mt-2 max-w-[335px] text-[10px] leading-[1.45] text-[#333333]">Discover performance eyewear and gear built for riders, racers, and athletes who demand more.</p>
                    </div>
                    <div className="flex flex-col items-center gap-3 sm:items-start">
                        <Link href="/list" className="inline-flex min-w-[134px] items-center justify-center gap-3 bg-[#F58220] px-5 py-3 text-[10px] font-bold text-white">Shop Collection <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} /></Link>
                        <Link href="/list" className="inline-flex items-center gap-3 text-[9px] font-bold text-[#171717]">Explore New Arrivals <ArrowRight className="h-3 w-3 text-[#F58220]" strokeWidth={1.8} /></Link>
                    </div>
                </section>
            </div>
        </ShopLayout>
    );
}

function ImageStrip({ title, images }: { title: string; images: Array<{ src: string; alt: string }> }) {
    return (
        <section className="px-4 pb-4 sm:px-7">
            <h2 className="text-center text-[17px] leading-none font-black tracking-[-0.035em] text-[#111111]">{title}</h2>
            <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6">
                {images.map((image) => <img key={image.src} src={image.src} alt={image.alt} className="aspect-[1.56/1] w-full object-cover" />)}
            </div>
        </section>
    );
}
