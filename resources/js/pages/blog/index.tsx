import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Search,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import ShopLayout from '@/layouts/shop-layout';
import { articles, unsplash } from '@/pages/blog/articles';
import type { Article } from '@/pages/blog/articles';

const categories = [
    'All Stories',
    'Product Guides',
    'Athlete Stories',
    'Technology',
    'Riding Tips',
    'Events',
    'Lifestyle',
    'News',
] as const;
type Category = (typeof categories)[number];

const pageSize = 8;

export default function Blog() {
    const [activeCategory, setActiveCategory] =
        useState<Category>('All Stories');
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState<'latest' | 'oldest'>('latest');
    const [page, setPage] = useState(1);

    const filteredArticles = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        const filtered = articles.filter((article) => {
            const categoryMatch =
                activeCategory === 'All Stories' ||
                article.category === activeCategory;
            const queryMatch =
                normalizedQuery === '' ||
                `${article.title} ${article.category}`
                    .toLowerCase()
                    .includes(normalizedQuery);

            return categoryMatch && queryMatch;
        });

        return sort === 'latest' ? filtered : [...filtered].reverse();
    }, [activeCategory, query, sort]);

    const pageCount = Math.max(
        1,
        Math.ceil(filteredArticles.length / pageSize),
    );
    const currentPage = Math.min(page, pageCount);
    const visibleArticles = filteredArticles.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    const changeCategory = (category: Category) => {
        setActiveCategory(category);
        setPage(1);
    };

    return (
        <ShopLayout>
            <Head title="AxeGear Journal">
                <meta
                    name="description"
                    content="AxeGear athlete stories, performance technology, product guides, and riding tips."
                />
            </Head>

            <div className="bg-white text-[14px] text-[#111111]">
                <section className="relative min-h-[230px] overflow-hidden sm:min-h-[270px]">
                    <img
                        src={unsplash('photo-1541625602330-2277a4c46182', 1800)}
                        alt="AxeGear cyclist riding through mountain terrain"
                        className="absolute inset-0 h-full w-full object-cover object-[65%_45%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/0" />
                    <div className="relative mx-auto flex min-h-[230px] max-w-[1640px] items-center px-7 py-9 sm:min-h-[270px] sm:px-11 lg:px-[76px]">
                        <div className="max-w-[390px]">
                            <p className="flex items-center gap-3 text-[13px] font-bold tracking-[0.04em] uppercase">
                                <span className="h-px w-6 bg-[#F58220]" />
                                AxeGear Journal
                            </p>
                            <h1 className="mt-3 text-[38px] leading-[0.93] font-black tracking-[-0.035em] uppercase sm:text-[50px]">
                                Stories Built
                                <br />
                                for Performance
                            </h1>
                            <p className="mt-4 max-w-[420px] text-[16px] leading-[1.5]">
                                Discover athlete stories, gear guides, product
                                technology, riding tips, and the latest news
                                from the world of AxeGear.
                            </p>
                            <a
                                href="#articles"
                                className="mt-5 inline-flex items-center gap-3 text-[14px] font-bold text-[#F58220]"
                            >
                                Explore Latest Stories{' '}
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>

                <main
                    id="articles"
                    className="mx-auto max-w-[1640px] px-5 py-4 sm:px-11 lg:px-[60px]"
                >
                    <section className="py-8">
                        <div className="grid gap-4 md:grid-cols-[1fr_220px_180px]">
                            <label className="flex h-12 items-center border border-[#D4D4D4] px-4">
                                <span className="sr-only">Search articles</span>
                                <input
                                    value={query}
                                    onChange={(event) => {
                                        setQuery(event.target.value);
                                        setPage(1);
                                    }}
                                    placeholder="Search articles, guides, and stories"
                                    className="min-w-0 flex-1 bg-transparent text-[14px] outline-none"
                                />
                                <Search className="h-5 w-5" />
                            </label>
                            <div className="relative">
                                <select
                                    value={activeCategory}
                                    onChange={(event) =>
                                        changeCategory(
                                            event.target.value as Category,
                                        )
                                    }
                                    className="h-12 w-full appearance-none border border-[#D4D4D4] bg-white px-4 text-[14px] outline-none"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2" />
                            </div>
                            <div className="relative">
                                <select
                                    value={sort}
                                    onChange={(event) => {
                                        setSort(
                                            event.target.value as
                                                | 'latest'
                                                | 'oldest',
                                        );
                                        setPage(1);
                                    }}
                                    className="h-12 w-full appearance-none border border-[#D4D4D4] bg-white px-4 text-[14px] outline-none"
                                >
                                    <option value="latest">Latest</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2" />
                            </div>
                        </div>

                        <div className="mt-9">
                            <h2 className="text-[24px] font-black uppercase">
                                Latest Articles
                            </h2>
                            <p className="mt-2 text-[15px] text-[#555555]">
                                Explore the latest stories, guides, and updates
                                from AxeGear.
                            </p>
                        </div>
                        {visibleArticles.length > 0 ? (
                            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                {visibleArticles.map((article) => (
                                    <ArticleCard
                                        key={article.title}
                                        article={article}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="my-8 border border-[#DADADA] px-6 py-14 text-center">
                                <h3 className="text-lg font-black uppercase">
                                    No stories found
                                </h3>
                                <p className="mt-2 text-sm text-[#666666]">
                                    Try another keyword or category.
                                </p>
                            </div>
                        )}

                        {filteredArticles.length > 0 && pageCount > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-2 text-[14px]">
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setPage((value) =>
                                            Math.max(1, value - 1),
                                        )
                                    }
                                    className="inline-flex h-10 items-center gap-2 rounded-none px-4 disabled:opacity-35"
                                >
                                    <ChevronLeft className="h-4 w-4" /> Previous
                                </button>
                                {Array.from(
                                    { length: pageCount },
                                    (_, index) => index + 1,
                                ).map((number) => (
                                    <button
                                        key={number}
                                        type="button"
                                        onClick={() => setPage(number)}
                                        className={`h-10 min-w-10 rounded-none px-3 ${number === currentPage ? 'bg-[#F58220] text-white' : 'border border-[#D4D4D4]'}`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    disabled={currentPage === pageCount}
                                    onClick={() =>
                                        setPage((value) =>
                                            Math.min(pageCount, value + 1),
                                        )
                                    }
                                    className="inline-flex h-10 items-center gap-2 rounded-none px-4 disabled:opacity-35"
                                >
                                    Next <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </ShopLayout>
    );
}

function ArticleCard({ article }: { article: Article }) {
    const href = `/blog/${article.slug}`;

    return (
        <article className="border border-[#DEDEDE] bg-white">
            <Link href={href} aria-label={`Read ${article.title}`}>
                <img
                    src={article.image}
                    alt={article.title}
                    className="aspect-[1.9/1] w-full object-cover"
                />
            </Link>
            <div className="p-5 sm:p-6">
                <p className="text-[12px] font-bold tracking-[0.03em] text-[#F58220] uppercase">
                    {article.category}
                </p>
                <h3 className="mt-2 text-[20px] leading-[1.25] font-semibold">
                    <Link href={href}>{article.title}</Link>
                </h3>
                <p className="mt-4 text-[12px] text-[#555555]">
                    {article.date} <span className="px-1">•</span>{' '}
                    {article.minutes} min read <span className="px-1">•</span>{' '}
                    AxeGear Editorial
                </p>
                <Link
                    href={href}
                    className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold"
                >
                    Read More <ArrowRight className="h-4 w-4 text-[#F58220]" />
                </Link>
            </div>
        </article>
    );
}
