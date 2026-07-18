import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Check,
    Clock3,
    Quote,
    Share2,
    UserRound,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import ShopLayout from '@/layouts/shop-layout';
import { articles } from '@/pages/blog/articles';

export default function BlogShow() {
    const { url } = usePage();
    const [copied, setCopied] = useState(false);
    const slug = url.split('?')[0].split('/').filter(Boolean).at(-1) ?? '';
    const article = articles.find((item) => item.slug === slug);
    const relatedArticles = useMemo(() => {
        if (!article) {
            return [];
        }

        return [...articles]
            .filter((item) => item.slug !== article.slug)
            .sort((left, right) => {
                const leftMatch = left.category === article.category ? 1 : 0;
                const rightMatch = right.category === article.category ? 1 : 0;

                return rightMatch - leftMatch;
            })
            .slice(0, 3);
    }, [article]);

    const shareArticle = async () => {
        if (!article) {
            return;
        }

        const shareData = {
            title: article.title,
            text: article.excerpt,
            url: window.location.href,
        };

        const nativeShare = Reflect.get(navigator, 'share') as
            | ((data: ShareData) => Promise<void>)
            | undefined;

        if (nativeShare) {
            await nativeShare.call(navigator, shareData).catch(() => undefined);

            return;
        }

        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
    };

    if (!article) {
        return (
            <ShopLayout>
                <Head title="Article Not Found" />
                <main className="mx-auto flex min-h-[62vh] max-w-[900px] flex-col items-center justify-center px-6 py-20 text-center">
                    <p className="text-[13px] font-bold text-[#F58220] uppercase">
                        AxeGear Journal
                    </p>
                    <h1 className="mt-3 text-[42px] leading-none font-black uppercase">
                        Article Not Found
                    </h1>
                    <p className="mt-5 max-w-[560px] text-[16px] leading-[1.6] text-[#555555]">
                        The story may have moved or the address may be
                        incorrect. Return to the journal to continue reading.
                    </p>
                    <Link
                        href="/blog"
                        className="mt-8 inline-flex h-12 items-center gap-3 bg-[#F58220] px-7 text-[13px] font-bold text-white uppercase"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Blog
                    </Link>
                </main>
            </ShopLayout>
        );
    }

    return (
        <ShopLayout>
            <Head title={`${article.title} | AxeGear Journal`}>
                <meta name="description" content={article.excerpt} />
            </Head>

            <article className="bg-white text-[#171717]">
                <header className="mx-auto max-w-[1180px] px-6 pt-10 pb-8 sm:px-10 lg:pt-14">
                    <nav className="flex flex-wrap items-center gap-2 text-[13px] text-[#777777]">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/blog">Blog</Link>
                        <span>/</span>
                        <span className="text-[#F58220]">
                            {article.category}
                        </span>
                    </nav>

                    <div className="mt-9 max-w-[960px]">
                        <p className="text-[13px] font-bold tracking-[0.05em] text-[#F58220] uppercase">
                            {article.category}
                        </p>
                        <h1 className="mt-3 text-[40px] leading-[1.04] font-black tracking-[-0.035em] sm:text-[56px] lg:text-[68px]">
                            {article.title}
                        </h1>
                        <p className="mt-6 max-w-[850px] text-[18px] leading-[1.6] text-[#4A4A4A] sm:text-[20px]">
                            {article.excerpt}
                        </p>
                        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#D9D9D9] pt-5 text-[13px] text-[#555555]">
                            <span className="inline-flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-[#F58220]" />
                                {article.date}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Clock3 className="h-4 w-4 text-[#F58220]" />
                                {article.minutes} min read
                            </span>
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="aspect-[2/1] w-full object-cover sm:aspect-[2.25/1]"
                    />
                </div>

                <div className="mx-auto grid max-w-[1120px] gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[90px_1fr] lg:py-16">
                    <aside className="lg:sticky lg:top-28 lg:h-fit">
                        <p className="text-[11px] font-bold tracking-[0.05em] text-[#777777] uppercase">
                            Share
                        </p>
                        <button
                            type="button"
                            onClick={shareArticle}
                            className="mt-3 inline-flex h-12 w-12 items-center justify-center rounded-none border border-[#D5D5D5] hover:border-[#F58220] hover:text-[#F58220]"
                            aria-label="Share article"
                        >
                            {copied ? (
                                <Check className="h-5 w-5" />
                            ) : (
                                <Share2 className="h-5 w-5" />
                            )}
                        </button>
                        {copied && (
                            <p className="mt-2 text-[10px] text-[#16803C]">
                                Link copied
                            </p>
                        )}
                    </aside>

                    <div className="max-w-[820px] min-w-0">
                        <p className="text-[19px] leading-[1.8] text-[#333333] first-letter:float-left first-letter:mr-3 first-letter:text-[66px] first-letter:leading-[0.8] first-letter:font-black first-letter:text-[#F58220]">
                            {article.intro}
                        </p>

                        {article.sections.map((section, index) => (
                            <section key={section.heading} className="mt-12">
                                <div className="flex items-center gap-4">
                                    <span className="text-[13px] font-black text-[#F58220]">
                                        0{index + 1}
                                    </span>
                                    <span className="h-px flex-1 bg-[#D8D8D8]" />
                                </div>
                                <h2 className="mt-4 text-[30px] leading-[1.2] font-black tracking-[-0.02em]">
                                    {section.heading}
                                </h2>
                                {section.paragraphs.map((paragraph) => (
                                    <p
                                        key={paragraph}
                                        className="mt-5 text-[17px] leading-[1.85] text-[#3F3F3F]"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </section>
                        ))}

                        <blockquote className="relative mt-12 border-l-4 border-[#F58220] bg-[#111111] px-7 py-8 text-white sm:px-10">
                            <Quote className="absolute top-5 right-6 h-10 w-10 text-[#F58220]/40" />
                            <p className="relative max-w-[650px] text-[22px] leading-[1.5] font-semibold text-white">
                                “{article.quote}”
                            </p>
                        </blockquote>

                        <section className="mt-12 border border-[#D8D8D8] bg-[#FAFAFA] p-7 sm:p-9">
                            <p className="text-[12px] font-bold tracking-[0.05em] text-[#F58220] uppercase">
                                Practical Checklist
                            </p>
                            <h2 className="mt-2 text-[27px] font-black">
                                Before Your Next Session
                            </h2>
                            <ul className="mt-6 grid gap-4">
                                {article.tips.map((tip) => (
                                    <li
                                        key={tip}
                                        className="flex gap-4 text-[16px] leading-[1.6] text-[#3F3F3F]"
                                    >
                                        <Check className="mt-1 h-5 w-5 shrink-0 text-[#F58220]" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-[30px] font-black">
                                Final Takeaway
                            </h2>
                            <p className="mt-5 text-[18px] leading-[1.85] text-[#3F3F3F]">
                                {article.conclusion}
                            </p>
                        </section>

                    </div>
                </div>

                <section className="border-t border-[#D8D8D8] bg-[#F7F7F7] px-6 py-12 sm:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1180px]">
                        <div className="flex items-end justify-between gap-5">
                            <div>
                                <p className="text-[12px] font-bold text-[#F58220] uppercase">
                                    Continue Reading
                                </p>
                                <h2 className="mt-2 text-[32px] font-black">
                                    Related Articles
                                </h2>
                            </div>
                            <Link
                                href="/blog"
                                className="hidden items-center gap-2 text-[13px] font-semibold sm:inline-flex"
                            >
                                View All Stories{' '}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="mt-7 grid gap-6 md:grid-cols-3">
                            {relatedArticles.map((related) => (
                                <article
                                    key={related.slug}
                                    className="bg-white"
                                >
                                    <Link href={`/blog/${related.slug}`}>
                                        <img
                                            src={related.image}
                                            alt={related.title}
                                            className="aspect-[1.55/1] w-full object-cover"
                                        />
                                    </Link>
                                    <div className="p-5">
                                        <p className="text-[11px] font-bold text-[#F58220] uppercase">
                                            {related.category}
                                        </p>
                                        <h3 className="mt-2 text-[17px] leading-[1.3] font-semibold">
                                            <Link
                                                href={`/blog/${related.slug}`}
                                            >
                                                {related.title}
                                            </Link>
                                        </h3>
                                        <Link
                                            href={`/blog/${related.slug}`}
                                            className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold"
                                        >
                                            Read Article{' '}
                                            <ArrowRight className="h-4 w-4 text-[#F58220]" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <Link
                            href="/blog"
                            className="mt-10 inline-flex items-center gap-3 text-[13px] font-bold uppercase"
                        >
                            <ArrowLeft className="h-4 w-4 text-[#F58220]" />{' '}
                            Back to Blog
                        </Link>
                    </div>
                </section>
            </article>
        </ShopLayout>
    );
}
