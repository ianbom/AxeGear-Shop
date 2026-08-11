import { Head } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

import ShopLayout from '@/layouts/shop-layout';

type Page = {
    hero_eyebrow: string;
    hero_title: string;
    product_name: string;
    hero_description: string;
    price_label: string;
    shop_now_text: string;
    shop_now_url: string;
    specifications_text: string;
    hero_image_url: string;
    story_eyebrow: string;
    story_title: string;
    story_body: string;
    story_image_url: string;
    gallery_heading: string;
};

type GalleryImage = { src: string; alt: string | null };
type Props = { page: Page; gallery: GalleryImage[] };

export default function NewProductPage({ page, gallery }: Props) {
    return (
        <ShopLayout>
            <Head title={page.product_name}>
                <meta name="description" content={page.hero_description} />
            </Head>

            <main className="bg-white text-[#111111]">
                <HeroSection page={page} />
                <StorySection page={page} />
                <GallerySection heading={page.gallery_heading} gallery={gallery} />
            </main>
        </ShopLayout>
    );
}

function HeroSection({ page }: { page: Page }) {
    return (
        <section className="overflow-hidden border-b border-[#E8E8E8] bg-[radial-gradient(circle_at_67%_55%,#fff4e8_0%,#ffffff_38%,#f7f7f7_100%)]">
            <div className="mx-auto grid min-h-[620px] max-w-[1600px] items-center gap-8 px-6 py-14 md:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:px-14 lg:py-20">
                <div className="relative z-10 max-w-[520px]">
                    <SectionLabel>{page.hero_eyebrow}</SectionLabel>
                    <h1 className="mt-6 text-[54px] leading-[0.84] font-black tracking-[-0.045em] uppercase sm:text-[70px] xl:text-[86px]">
                        <Lines value={page.hero_title} />
                    </h1>
                    <h2 className="mt-7 text-[25px] leading-none font-black tracking-[0.02em] uppercase">{page.product_name}</h2>
                    <p className="mt-5 max-w-[390px] text-[16px] leading-7 text-[#333333]">{page.hero_description}</p>
                    <div className="mt-7 flex items-center gap-5">
                        <span className="text-[24px] font-black">{page.price_label}</span>
                        <span className="bg-[#F15A24] px-2.5 py-1 text-[11px] font-black text-white uppercase">New</span>
                    </div>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <a href={page.shop_now_url} className="inline-flex h-14 items-center justify-center gap-5 bg-[#F15A24] px-9 text-[13px] font-black text-white uppercase hover:bg-[#D94813]">
                            {page.shop_now_text} <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href="#closer-look" className="inline-flex h-14 items-center justify-center border border-[#111111] bg-white px-9 text-[13px] font-black uppercase hover:bg-[#111111] hover:text-white">
                            {page.specifications_text}
                        </a>
                    </div>
                </div>
                <div className="relative min-h-[360px] lg:min-h-[500px]">
                    <div className="absolute inset-x-[8%] bottom-[8%] h-[28%] rounded-[50%] bg-[#F15A24]/10 blur-3xl" />
                    <img src={page.hero_image_url} alt={page.product_name} className="absolute inset-0 h-full w-full object-cover object-center mix-blend-multiply" />
                </div>
            </div>
        </section>
    );
}

function StorySection({ page }: { page: Page }) {
    return (
        <section className="grid border-b border-[#E8E8E8] lg:grid-cols-[0.82fr_1.18fr]">
            <div className="flex items-center px-6 py-12 md:px-10 lg:px-14 lg:py-20">
                <div className="mx-auto max-w-[520px] lg:mx-0">
                    <SectionLabel>{page.story_eyebrow}</SectionLabel>
                    <h2 className="mt-6 text-[48px] leading-[0.88] font-black tracking-[-0.035em] uppercase md:text-[64px]"><Lines value={page.story_title} /></h2>
                    {page.story_body.split(/\n\s*\n/).map((paragraph, index) => <p key={index} className="mt-5 text-[16px] leading-7 text-[#333333]">{paragraph}</p>)}
                </div>
            </div>
            <img src={page.story_image_url} alt={page.story_title} className="h-full min-h-[480px] w-full object-cover" loading="lazy" />
        </section>
    );
}

function GallerySection({ heading, gallery }: { heading: string; gallery: GalleryImage[] }) {
    return (
        <section id="closer-look" className="scroll-mt-24 border-b border-[#E8E8E8] px-5 py-12 md:px-10 lg:px-14">
            <div className="mx-auto max-w-[1500px]">
                <CenteredHeading>{heading}</CenteredHeading>
                <div className="mt-8 grid auto-rows-[210px] grid-cols-2 gap-3 lg:auto-rows-[275px] lg:grid-cols-6">
                    {gallery.map((image, index) => (
                        <div key={`${image.src}-${index}`} className={`overflow-hidden bg-[#F1F1F1] ${index < 3 ? 'col-span-2' : index === 3 || index === 6 ? 'col-span-2 lg:col-span-1' : 'col-span-1'}`}>
                            <img src={image.src} alt={image.alt ?? ''} className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]" loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Lines({ value }: { value: string }) {
    const lines = value.split('\n');

    return <>{lines.map((line, index) => <span key={`${line}-${index}`}>{line}{index < lines.length - 1 ? <br /> : null}</span>)}</>;
}

function SectionLabel({ children }: { children: ReactNode }) {
    return <div className="inline-flex items-center gap-4 text-[12px] font-black tracking-[0.04em] text-[#F15A24] uppercase"><span className="h-[2px] w-7 bg-[#F15A24]" />{children}</div>;
}

function CenteredHeading({ children }: { children: ReactNode }) {
    return <div className="flex items-center justify-center gap-4 text-center text-[14px] font-black uppercase"><span className="h-[2px] w-7 bg-[#F15A24]" /><h2>{children}</h2></div>;
}
