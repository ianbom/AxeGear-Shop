import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Quote, Share2, UserRound } from 'lucide-react';
import { useState } from 'react';
import ShopLayout from '@/layouts/shop-layout';

type Article = {
    id: number;
    slug: string;
    title: string;
    category: string;
    author_name: string;
    published_at: string | null;
    reading_minutes: number;
    image_url: string;
    excerpt: string;
    intro: string;
    sections: Array<{ heading: string; paragraphs: string[] }>;
    quote: string | null;
    tips: string[];
    conclusion: string | null;
};
type Props = { article: Article; relatedArticles: Article[] };

export default function BlogShow({ article, relatedArticles }: Props) {
    const [copied, setCopied] = useState(false);
    const shareArticle = async () => {
        const shareData = { title: article.title, text: article.excerpt, url: window.location.href };
        const nativeShare = Reflect.get(navigator, 'share') as ((data: ShareData) => Promise<void>) | undefined;

        if (nativeShare) {
            await nativeShare.call(navigator, shareData).catch(() => undefined);

            return;
        }

        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
    };

    return <ShopLayout><Head title={`${article.title} | AxeGear Journal`}><meta name="description" content={article.excerpt} /></Head><article className="bg-white text-[#171717]">
        <header className="mx-auto max-w-[1180px] px-6 pt-10 pb-8 sm:px-10 lg:pt-14"><nav className="flex flex-wrap items-center gap-2 text-[13px] text-[#777777]"><Link href="/">Home</Link><span>/</span><Link href="/blog">Blog</Link><span>/</span><span className="text-[#F58220]">{article.category}</span></nav><div className="mt-9 max-w-[960px]"><p className="text-[13px] font-bold tracking-[0.05em] text-[#F58220] uppercase">{article.category}</p><h1 className="mt-3 text-[40px] leading-[1.04] font-black tracking-[-0.035em] sm:text-[56px] lg:text-[68px]">{article.title}</h1><p className="mt-6 max-w-[780px] text-[18px] leading-[1.6] text-[#555555]">{article.excerpt}</p><div className="mt-7 flex flex-wrap items-center gap-5 text-[13px] text-[#666666]"><span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#F58220]" />{article.published_at ?? 'Draft'}</span><span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#F58220]" />{article.reading_minutes} min read</span><span className="inline-flex items-center gap-2"><UserRound className="h-4 w-4 text-[#F58220]" />{article.author_name}</span><button type="button" onClick={shareArticle} className="inline-flex items-center gap-2 font-semibold text-[#171717]"><Share2 className="h-4 w-4 text-[#F58220]" />{copied ? 'Link Copied' : 'Share Article'}</button></div></div></header>
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10"><img src={article.image_url} alt={article.title} className="aspect-[1.9/1] w-full object-cover" /></div>
        <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,780px)_220px] lg:gap-20 lg:py-16"><div className="text-[18px] leading-[1.85] text-[#3F3F3F]"><p>{article.intro}</p>{article.sections.map((section) => <section key={section.heading} className="mt-12"><h2 className="text-[30px] leading-tight font-black text-[#171717]">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5">{paragraph}</p>)}</section>)}{article.quote && <blockquote className="my-12 border-y border-[#D8D8D8] py-8 text-[26px] leading-[1.35] font-black text-[#171717]"><Quote className="mb-4 h-8 w-8 text-[#F58220]" />“{article.quote}”</blockquote>}{article.tips.length > 0 && <section className="mt-12"><h2 className="text-[30px] font-black text-[#171717]">Before Your Next Session</h2><ul className="mt-6 grid gap-4">{article.tips.map((tip) => <li key={tip} className="flex gap-4"><Check className="mt-1 h-5 w-5 shrink-0 text-[#F58220]" />{tip}</li>)}</ul></section>}{article.conclusion && <section className="mt-12"><h2 className="text-[30px] font-black text-[#171717]">Final Takeaway</h2><p className="mt-5">{article.conclusion}</p></section>}</div><aside className="hidden lg:block"><p className="sticky top-24 border-l-2 border-[#F58220] pl-4 text-[12px] font-bold tracking-[0.06em] uppercase">AxeGear Journal</p></aside></div>
        <section className="border-t border-[#D8D8D8] bg-[#F7F7F7] px-6 py-12 sm:px-10 lg:py-16"><div className="mx-auto max-w-[1180px]"><div className="flex items-end justify-between gap-5"><div><p className="text-[12px] font-bold text-[#F58220] uppercase">Continue Reading</p><h2 className="mt-2 text-[32px] font-black">Related Articles</h2></div><Link href="/blog" className="hidden items-center gap-2 text-[13px] font-semibold sm:inline-flex">View All Stories <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-7 grid gap-6 md:grid-cols-3">{relatedArticles.map((related) => <article key={related.id} className="bg-white"><Link href={`/blog/${related.slug}`}><img src={related.image_url} alt={related.title} className="aspect-[1.55/1] w-full object-cover" /></Link><div className="p-5"><p className="text-[11px] font-bold text-[#F58220] uppercase">{related.category}</p><h3 className="mt-2 text-[17px] leading-[1.3] font-semibold"><Link href={`/blog/${related.slug}`}>{related.title}</Link></h3><Link href={`/blog/${related.slug}`} className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold">Read Article <ArrowRight className="h-4 w-4 text-[#F58220]" /></Link></div></article>)}</div><Link href="/blog" className="mt-10 inline-flex items-center gap-3 text-[13px] font-bold uppercase"><ArrowLeft className="h-4 w-4 text-[#F58220]" /> Back to Blog</Link></div></section>
    </article></ShopLayout>;
}
