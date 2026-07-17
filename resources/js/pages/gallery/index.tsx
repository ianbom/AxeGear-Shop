import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ShopLayout from '@/layouts/shop-layout';

const TABS = ['All', 'Sunglasses', 'Goggles', 'Gloves', 'Apparel', 'Accessories', 'Athletes', 'Lifestyle', 'Detail Shots'];

export default function Gallery() {
    const [activeTab, setActiveTab] = useState('All');

    return (
        <ShopLayout
            title="AxeGear Gallery"
            description="Explore the visual world of AxeGear through performance-driven product imagery, athlete moments, gear details, and lifestyle captures."
        >
            {/* 1. HERO SECTION */}
            <section className="flex flex-col border-b-2 border-ink bg-white lg:flex-row">
                <div className="flex w-full flex-col justify-center border-b-2 border-ink px-5 py-16 lg:w-1/2 lg:border-r-2 lg:border-b-0 lg:px-12 lg:py-24 xl:px-20">
                    <span className="mb-4 text-[13px] font-bold tracking-widest text-primary uppercase">
                        Visual Showcase
                    </span>
                    <h1 className="mb-6 font-sans text-5xl font-black text-ink uppercase tracking-tight lg:text-7xl">
                        AxeGear Gallery
                    </h1>
                    <p className="mb-8 max-w-[420px] text-base leading-relaxed text-ink/80 lg:text-lg">
                        Explore the visual world of AxeGear through
                        performance-driven product imagery, athlete moments,
                        gear details, and lifestyle captures.
                    </p>
                    <Link
                        href="/list"
                        className="group inline-flex w-fit items-center gap-2 border-b-2 border-ink pb-1 font-bold text-ink transition-colors hover:border-primary hover:text-primary"
                    >
                        View Latest Collection
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
                <div className="w-full lg:w-1/2">
                    <img
                        src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=1200"
                        alt="AxeGear Athletes"
                        className="h-full min-h-[400px] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 lg:min-h-[600px]"
                    />
                </div>
            </section>

            {/* 2. GALLERY TABS & MASONRY */}
            <section className="bg-white">
                {/* Tabs */}
                <div className="scrollbar-hide flex overflow-x-auto border-b-2 border-ink px-5 lg:justify-center">
                    <div className="flex w-max min-w-full justify-start space-x-6 lg:justify-center lg:space-x-10 xl:space-x-14">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={elative py-6 text-[13px] font-bold tracking-wider uppercase whitespace-nowrap transition-colors  + (activeTab === tab ? 'text-primary' : 'text-ink hover:text-primary')}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <span className="absolute bottom-[-2px] left-0 h-[2px] w-full bg-primary" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry Grid Placeholder */}
                <div className="p-5 lg:p-10 xl:p-16 border-b-2 border-ink">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {/* Col 1 */}
                        <div className="flex flex-col gap-5">
                            <img
                                src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=800"
                                alt="Gallery item"
                                className="w-full object-cover grayscale transition duration-500 hover:grayscale-0 h-[600px]"
                            />
                        </div>
                        {/* Col 2 */}
                        <div className="flex flex-col gap-5">
                            <img
                                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800"
                                alt="Gallery item"
                                className="w-full object-cover grayscale transition duration-500 hover:grayscale-0 h-[290px]"
                            />
                            <div className="grid grid-cols-2 gap-5 h-[290px]">
                                <img
                                    src="https://images.unsplash.com/photo-1521193089946-7c980277bdbe?auto=format&fit=crop&q=80&w=800"
                                    alt="Gallery item"
                                    className="w-full object-cover grayscale transition duration-500 hover:grayscale-0 h-full"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1582283921893-68d71249767f?auto=format&fit=crop&q=80&w=800"
                                    alt="Gallery item"
                                    className="w-full object-cover grayscale transition duration-500 hover:grayscale-0 h-full"
                                />
                            </div>
                        </div>
                        {/* Col 3 */}
                        <div className="flex flex-col gap-5">
                            <img
                                src="https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=800"
                                alt="Gallery item"
                                className="w-full object-cover grayscale transition duration-500 hover:grayscale-0 h-[400px]"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1533282960533-51328aa26626?auto=format&fit=crop&q=80&w=800"
                                alt="Gallery item"
                                className="w-full object-cover grayscale transition duration-500 hover:grayscale-0 h-[180px]"
                            />
                        </div>
                        {/* Col 4 */}
                        <div className="flex flex-col gap-5">
                            <img
                                src="https://images.unsplash.com/photo-1517409249780-e885d56411ab?auto=format&fit=crop&q=80&w=800"
                                alt="Gallery item"
                                className="w-full object-cover grayscale transition duration-500 hover:grayscale-0 h-[290px]"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1473043831969-906d203920c8?auto=format&fit=crop&q=80&w=800"
                                alt="Gallery item"
                                className="w-full object-cover grayscale transition duration-500 hover:grayscale-0 h-[290px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. HERO PARALLAX / FULL WIDTH */}
            <section className="relative flex h-[350px] w-full items-center justify-start lg:h-[450px]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1536762303534-77bfd0f367eb?auto=format&fit=crop&q=80&w=2000"
                        alt="Built for Speed"
                        className="h-full w-full object-cover object-top grayscale"
                    />
                    <div className="absolute inset-0 bg-ink/70" />
                </div>
                <div className="relative z-10 px-5 lg:px-12 xl:px-20 max-w-[800px]">
                    <h2 className="mb-4 font-sans text-4xl font-black text-white uppercase tracking-tight lg:text-5xl xl:text-6xl">
                        Built for Speed.<br />Designed for Clarity.
                    </h2>
                    <p className="max-w-[480px] text-base font-medium text-white/90 lg:text-lg">
                        Premium materials. Athlete-tested design.<br/>
                        Performance engineered for every edge.
                    </p>
                </div>
            </section>

            {/* 4. PRODUCT SPOTLIGHT */}
            <section className="border-y-2 border-ink bg-white">
                <div className="border-b-2 border-ink py-10 text-center">
                    <h2 className="text-2xl font-black text-ink uppercase tracking-tight lg:text-4xl">
                        Product Spotlight
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            title: 'Performance Sunglasses',
                            desc: 'Lightweight, durable, and built for every condition.',
                            img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
                        },
                        {
                            title: 'Moto / MTB Goggles',
                            desc: 'Maximum vision. Ultimate protection. No compromises.',
                            img: 'https://images.unsplash.com/photo-1582283921893-68d71249767f?auto=format&fit=crop&q=80&w=600',
                        },
                        {
                            title: 'Performance Gloves',
                            desc: 'Grip. Control. Comfort. Engineered for performance.',
                            img: 'https://images.unsplash.com/photo-1473043831969-906d203920c8?auto=format&fit=crop&q=80&w=600',
                        },
                        {
                            title: 'Riding Apparel',
                            desc: 'Technical gear that moves with you and keeps you ahead.',
                            img: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=600',
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="group flex flex-col border-b-2 border-ink md:border-r-2 md:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:border-r-2 lg:[&:nth-child(2n)]:border-r-2 lg:[&:last-child]:border-r-0"
                        >
                            <div className="h-[250px] w-full overflow-hidden border-b-2 border-ink lg:h-[300px]">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="mb-2 text-lg font-bold text-ink uppercase tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="mb-6 text-sm text-ink/70">
                                    {item.desc}
                                </p>
                                <div className="mt-auto">
                                    <Link
                                        href="/list"
                                        className="inline-flex items-center gap-2 text-[12px] font-bold text-ink transition-colors hover:text-primary uppercase tracking-widest"
                                    >
                                        View Collection
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. ON THE TRACK */}
            <section className="bg-white pb-16 pt-10">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-black text-ink uppercase tracking-tight lg:text-3xl">
                        On the Track. On the Trail. On the Move.
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 px-5">
                    {[
                        'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1533282960533-51328aa26626?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1521193089946-7c980277bdbe?auto=format&fit=crop&q=80&w=400',
                    ].map((img, idx) => (
                        <div key={idx} className="aspect-[4/3] w-full overflow-hidden">
                            <img
                                src={img}
                                alt="Action shot"
                                className="h-full w-full object-cover grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. DETAILS MATTER */}
            <section className="bg-white pb-16 pt-10">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-black text-ink uppercase tracking-tight lg:text-3xl">
                        Details Matter
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-5 gap-6">
                    {[
                        {
                            title: 'Hydrophobic Lens Coating',
                            desc: 'Repels water. Enhances clarity.',
                            img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400',
                        },
                        {
                            title: 'TR90 Frame Technology',
                            desc: 'Lightweight. Flexible. Tough.',
                            img: 'https://images.unsplash.com/photo-1582283921893-68d71249767f?auto=format&fit=crop&q=80&w=400',
                        },
                        {
                            title: 'Breathable Performance Fabric',
                            desc: 'Stay cool. Stay focused.',
                            img: 'https://images.unsplash.com/photo-1473043831969-906d203920c8?auto=format&fit=crop&q=80&w=400',
                        },
                        {
                            title: 'Reinforced Stitching',
                            desc: 'Engineered for performance.',
                            img: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=400',
                        },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col text-center">
                            <div className="mb-4 aspect-[2/1] w-full overflow-hidden">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="h-full w-full object-cover grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0"
                                />
                            </div>
                            <h3 className="mb-1 text-[13px] font-bold text-ink uppercase tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-xs text-ink/70">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
                {/* 2 more detail matter to center them below the 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 px-5 gap-6 max-w-[800px] mx-auto mt-6">
                     {[
                        {
                            title: 'Secure Fit System',
                            desc: 'Lock in. Ride hard.',
                            img: 'https://images.unsplash.com/photo-1521193089946-7c980277bdbe?auto=format&fit=crop&q=80&w=400',
                        },
                        {
                            title: 'Triple-Layer Face Foam',
                            desc: 'All-day comfort. Zero distractions.',
                            img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400',
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col text-center">
                            <div className="mb-4 aspect-[2/1] w-full overflow-hidden">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="h-full w-full object-cover grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0"
                                />
                            </div>
                            <h3 className="mb-1 text-[13px] font-bold text-ink uppercase tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-xs text-ink/70">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. #AxeGear In Action */}
            <section className="bg-white pb-16 pt-10">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-black text-ink uppercase tracking-tight lg:text-3xl">
                        #AxeGear In Action
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 px-5">
                    {[
                        'https://images.unsplash.com/photo-1533282960533-51328aa26626?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1521193089946-7c980277bdbe?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400',
                    ].map((img, idx) => (
                        <div key={idx} className="aspect-[4/3] w-full overflow-hidden">
                            <img
                                src={img}
                                alt="Action shot"
                                className="h-full w-full object-cover grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* 8. READY TO GEAR UP CTA */}
            <section className="flex flex-col items-center justify-between border-t-2 border-ink bg-white px-5 py-8 lg:flex-row lg:px-20">
                <div className="mb-8 w-full max-w-[250px] lg:mb-0 lg:w-1/4 xl:max-w-[300px]">
                    <img
                        src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400"
                        alt="AxeGear product"
                        className="w-full grayscale mix-blend-multiply"
                    />
                </div>
                <div className="mb-8 w-full text-center lg:mb-0 lg:w-2/4 lg:text-left lg:px-10">
                    <h2 className="mb-2 text-2xl font-black text-ink uppercase tracking-tight lg:text-3xl">
                        Ready to Gear Up?
                    </h2>
                    <p className="text-sm text-ink/80 lg:text-[15px]">
                        Discover performance eyewear and gear built<br/>
                        for riders, racers, and athletes who demand more.
                    </p>
                </div>
                <div className="flex w-full flex-col items-center gap-4 lg:w-1/4 lg:items-end">
                    <Link
                        href="/list"
                        className="flex w-full items-center justify-center gap-2 bg-primary px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#E67312] lg:w-auto uppercase tracking-wider"
                    >
                        Shop Collection
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                        href="/list"
                        className="group flex items-center gap-2 text-xs font-bold text-ink transition-colors hover:text-primary uppercase tracking-widest"
                    >
                        Explore New Arrivals
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>
        </ShopLayout>
    );
}


