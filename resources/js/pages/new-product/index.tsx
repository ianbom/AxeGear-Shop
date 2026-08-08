import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    BadgeCheck,
    Crosshair,
    Diamond,
    Eye,
    Feather,
    LockKeyhole,
    Shield,
    Sun,
    Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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
    benefits_heading: string;
    story_eyebrow: string;
    story_title: string;
    story_body: string;
    story_image_url: string;
    gallery_heading: string;
    technology_heading: string;
    technology_image_url: string;
    final_eyebrow: string | null;
    final_title: string | null;
    final_tagline: string | null;
    final_price_label: string | null;
    final_cta_text: string | null;
    final_cta_url: string | null;
    final_image_url: string | null;
};

type Feature = { icon: string; title: string; body: string };
type GalleryImage = { src: string; alt: string | null };
type Props = { page: Page; benefits: Feature[]; gallery: GalleryImage[]; technology: Feature[] };

const iconMap: Record<string, LucideIcon> = {
    feather: Feather,
    shield: Shield,
    eye: Eye,
    lock: LockKeyhole,
    wind: Wind,
    sun: Sun,
    'badge-check': BadgeCheck,
    diamond: Diamond,
    crosshair: Crosshair,
};

export default function NewProductPage({ page, benefits, gallery, technology }: Props) {
    return (
        <ShopLayout>
            <Head title={page.product_name}>
                <meta name="description" content={page.hero_description} />
            </Head>

            <main className="bg-white text-[#111111]">
                <HeroSection page={page} />
                <BenefitsSection heading={page.benefits_heading} benefits={benefits} />
                <StorySection page={page} />
                <GallerySection heading={page.gallery_heading} gallery={gallery} />
                <TechnologySection page={page} technology={technology} />
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
                        <a href="#specifications" className="inline-flex h-14 items-center justify-center border border-[#111111] bg-white px-9 text-[13px] font-black uppercase hover:bg-[#111111] hover:text-white">
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

function BenefitsSection({ heading, benefits }: { heading: string; benefits: Feature[] }) {
    return (
        <section className="border-b border-[#E8E8E8] px-6 py-11 md:px-10 lg:px-14">
            <div className="mx-auto max-w-[1500px]">
                <CenteredHeading>{heading}</CenteredHeading>
                <div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
                    {benefits.map(({ icon, title, body }, index) => {
                        const Icon = iconMap[icon] ?? BadgeCheck;

                        return <article key={`${title}-${index}`} className={`px-5 text-center ${index > 0 ? 'lg:border-l lg:border-[#DADADA]' : ''}`}>
                            <Icon className="mx-auto h-11 w-11 text-[#F15A24]" strokeWidth={1.5} />
                            <h3 className="mx-auto mt-5 max-w-[190px] text-[13px] leading-5 font-black uppercase">{title}</h3>
                            <p className="mx-auto mt-4 max-w-[210px] text-[13px] leading-6 text-[#444444]">{body}</p>
                        </article>;
                    })}
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
            <img src={page.story_image_url} alt={page.story_title} className="min-h-[480px] h-full w-full object-cover" loading="lazy" />
        </section>
    );
}

function GallerySection({ heading, gallery }: { heading: string; gallery: GalleryImage[] }) {
    return (
        <section className="border-b border-[#E8E8E8] px-5 py-12 md:px-10 lg:px-14">
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

function TechnologySection({ page, technology }: { page: Page; technology: Feature[] }) {
    return (
        <section id="specifications" className="scroll-mt-24 px-6 py-12 md:px-10 lg:px-14 lg:py-16">
            <div className="mx-auto max-w-[1500px]">
                <CenteredHeading>{page.technology_heading}</CenteredHeading>
                <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.22fr_0.78fr]">
                    <img src={page.technology_image_url} alt={page.technology_heading} className="aspect-[2.1] w-full object-cover mix-blend-multiply" loading="lazy" />
                    <div className="divide-y divide-[#DADADA] border-y border-[#DADADA]">
                        {technology.map(({ icon, title, body }, index) => {
                            const Icon = iconMap[icon] ?? BadgeCheck;

                            return <article key={`${title}-${index}`} className="flex gap-5 py-6">
                                <Icon className="h-9 w-9 shrink-0" strokeWidth={1.5} />
                                <div><h3 className="text-[14px] font-black uppercase">{title}</h3><p className="mt-2 text-[14px] leading-6 text-[#444444]">{body}</p></div>
                            </article>;
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FinalCta({ page }: { page: Page }) {
    return (
        <section className="overflow-hidden bg-[#090909] text-white">
            <div className="mx-auto grid min-h-[250px] max-w-[1600px] items-center gap-8 px-6 py-10 md:px-10 lg:grid-cols-[0.78fr_1.22fr] lg:px-14">
                <div>
                    {page.final_eyebrow ? <SectionLabel light>{page.final_eyebrow}</SectionLabel> : null}
                    <h2 className="mt-4 text-[30px] font-black tracking-[0.04em] uppercase md:text-[40px]">{page.final_title}</h2>
                    {page.final_tagline ? <p className="mt-2 text-sm text-white/70">{page.final_tagline}</p> : null}
                    <div className="mt-6 flex flex-wrap items-center gap-7">
                        {page.final_price_label ? <span className="text-[25px] font-black">{page.final_price_label}</span> : null}
                        {page.final_cta_text && page.final_cta_url ? <a href={page.final_cta_url} className="inline-flex h-13 items-center gap-5 bg-[#F15A24] px-9 text-[13px] font-black uppercase hover:bg-[#D94813]">{page.final_cta_text} <ArrowRight className="h-4 w-4" /></a> : null}
                    </div>
                </div>
                {page.final_image_url ? <img src={page.final_image_url} alt={page.final_title ?? ''} className="h-[230px] w-full object-cover object-center mix-blend-screen" loading="lazy" /> : null}
            </div>
        </section>
    );
}

function Lines({ value }: { value: string }) {
    return <>{value.split('\n').map((line, index) => <span key={`${line}-${index}`}>{line}{index < value.split('\n').length - 1 ? <br /> : null}</span>)}</>;
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
    return <div className={`inline-flex items-center gap-4 text-[12px] font-black tracking-[0.04em] uppercase ${light ? 'text-[#F15A24]' : 'text-[#F15A24]'}`}><span className="h-[2px] w-7 bg-[#F15A24]" />{children}</div>;
}

function CenteredHeading({ children }: { children: ReactNode }) {
    return <div className="flex items-center justify-center gap-4 text-center text-[14px] font-black uppercase"><span className="h-[2px] w-7 bg-[#F15A24]" /><h2>{children}</h2></div>;
}
