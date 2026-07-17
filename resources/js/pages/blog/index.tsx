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

const unsplash = (id: string, width = 1200) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&q=88&w=${width}`;

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

type Article = {
    title: string;
    category:
        | Exclude<Category, 'All Stories'>
        | 'Gear Care'
        | 'Performance'
        | 'Behind the Design';
    date: string;
    minutes: number;
    image: string;
    wide?: boolean;
};

const articles: Article[] = [
    {
        title: 'Choosing the Right Lens for Every Riding Condition',
        category: 'Product Guides',
        date: 'June 22, 2026',
        minutes: 5,
        image: unsplash('photo-1511499767150-a48a237f0083', 900),
    },
    {
        title: 'How to Care for Your Performance Goggles',
        category: 'Gear Care',
        date: 'June 20, 2026',
        minutes: 4,
        image: unsplash('photo-1572635196237-14b3f281503f', 900),
    },
    {
        title: 'From Track to Trail: The Evolution of AxeGear Eyewear',
        category: 'Technology',
        date: 'June 18, 2026',
        minutes: 6,
        image: unsplash('photo-1577803645773-f96470509666', 900),
    },
    {
        title: 'Meet the Riders Behind AxeGear',
        category: 'Athlete Stories',
        date: 'June 16, 2026',
        minutes: 7,
        image: unsplash('photo-1552674605-db6ffd4facb5', 1200),
        wide: true,
    },
    {
        title: 'Five Essential Pieces of Gear for Your Next Ride',
        category: 'Riding Tips',
        date: 'June 15, 2026',
        minutes: 4,
        image: unsplash('photo-1599058917212-d750089bc07e', 900),
    },
    {
        title: 'Why Lens Clarity Matters at High Speed',
        category: 'Performance',
        date: 'June 14, 2026',
        minutes: 6,
        image: unsplash('photo-1530137073520-4ea6e2f10a48', 900),
    },
    {
        title: 'Preparing Your Gear for Wet Weather Riding',
        category: 'Riding Tips',
        date: 'June 12, 2026',
        minutes: 4,
        image: unsplash('photo-1558980664-10e7170b5df9', 900),
    },
    {
        title: 'Inside the Design Process of AxeGear Performance Apparel',
        category: 'Behind the Design',
        date: 'June 10, 2026',
        minutes: 6,
        image: unsplash('photo-1521572163474-6864f9cf17ab', 900),
    },
    {
        title: 'AxeGear Community Ride: Highlights and Stories',
        category: 'Events',
        date: 'June 8, 2026',
        minutes: 5,
        image: unsplash('photo-1529422643029-d4585747aaf2', 900),
    },
    {
        title: 'How Athletes Build a Race-Day Mindset',
        category: 'Athlete Stories',
        date: 'June 6, 2026',
        minutes: 5,
        image: unsplash('photo-1511994298241-608e28f14fde', 900),
    },
    {
        title: 'The Materials Behind Lightweight Protection',
        category: 'Technology',
        date: 'June 4, 2026',
        minutes: 6,
        image: unsplash('photo-1558981806-ec527fa84c39', 900),
    },
    {
        title: 'Finding Your Ideal Trail Setup',
        category: 'Lifestyle',
        date: 'June 2, 2026',
        minutes: 4,
        image: unsplash('photo-1544191696-102dbdaeeaa0', 900),
    },
];

const popularStories = [
    [
        'The Complete Performance Lens Guide',
        'Product Guides',
        'photo-1577803645773-f96470509666',
    ],
    [
        'How to Find the Right Goggle Fit',
        'Gear Care',
        'photo-1511499767150-a48a237f0083',
    ],
    [
        'What Makes a Jersey Race Ready',
        'Behind the Design',
        'photo-1521572163474-6864f9cf17ab',
    ],
    [
        'Essential Gear Maintenance Tips',
        'Gear Care',
        'photo-1599058917212-d750089bc07e',
    ],
];

const pageSize = 9;

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

            <div className="bg-white text-[#111111]">
                <section className="relative min-h-[230px] overflow-hidden sm:min-h-[270px]">
                    <img
                        src={unsplash('photo-1541625602330-2277a4c46182', 1800)}
                        alt="AxeGear cyclist riding through mountain terrain"
                        className="absolute inset-0 h-full w-full object-cover object-[65%_45%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/0" />
                    <div className="relative mx-auto flex min-h-[230px] max-w-[1640px] items-center px-7 py-9 sm:min-h-[270px] sm:px-11 lg:px-[76px]">
                        <div className="max-w-[390px]">
                            <p className="flex items-center gap-3 text-[9px] font-bold tracking-[0.04em] uppercase">
                                <span className="h-px w-6 bg-[#F58220]" />
                                AxeGear Journal
                            </p>
                            <h1 className="mt-3 text-[38px] leading-[0.93] font-black tracking-[-0.035em] uppercase sm:text-[50px]">
                                Stories Built
                                <br />
                                for Performance
                            </h1>
                            <p className="mt-3 max-w-[330px] text-[12px] leading-[1.35]">
                                Discover athlete stories, gear guides, product
                                technology, riding tips, and the latest news
                                from the world of AxeGear.
                            </p>
                            <a
                                href="#articles"
                                className="mt-5 inline-flex items-center gap-3 text-[11px] font-bold text-[#F58220]"
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
                    <nav
                        aria-label="Blog categories"
                        className="scrollbar-hide flex overflow-x-auto border-b border-[#AFAFAF]"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                aria-pressed={activeCategory === category}
                                onClick={() => changeCategory(category)}
                                className={`relative min-w-max rounded-none px-4 py-3 text-[9px] font-bold uppercase sm:flex-1 ${activeCategory === category ? 'text-[#F58220]' : 'text-[#111111] hover:text-[#F58220]'}`}
                            >
                                {category}
                                {activeCategory === category && (
                                    <span className="absolute right-0 bottom-[-1px] left-0 h-px bg-[#F58220]" />
                                )}
                            </button>
                        ))}
                    </nav>

                    <section className="pt-3">
                        <p className="text-[11px] font-black uppercase">
                            Featured Story
                        </p>
                        <div className="mt-1 grid gap-5 md:grid-cols-[55%_1fr] md:items-center">
                            <img
                                src={unsplash(
                                    'photo-1558981403-c5f9899a28bc',
                                    1200,
                                )}
                                alt="Motocross athlete racing through dirt"
                                className="aspect-[2.05/1] h-full w-full object-cover"
                            />
                            <article className="px-1 py-2 md:px-0">
                                <p className="text-[9px] font-bold text-[#F58220] uppercase">
                                    Athlete Stories
                                </p>
                                <h2 className="mt-2 max-w-[500px] text-[28px] leading-[1.05] font-black tracking-[-0.03em] sm:text-[36px]">
                                    Built for the Ride: Inside the Mindset of a
                                    Performance Athlete
                                </h2>
                                <p className="mt-3 max-w-[470px] text-[11px] leading-[1.45] text-[#343434]">
                                    Discover how preparation, vision, and
                                    reliable equipment help athletes stay
                                    focused through every turn, jump, and finish
                                    line.
                                </p>
                                <p className="mt-4 text-[8px] text-[#555555]">
                                    June 24, 2026{' '}
                                    <span className="px-2">•</span> 6 min read{' '}
                                    <span className="px-2">•</span> AxeGear
                                    Editorial
                                </p>
                                <Link
                                    href="/blog"
                                    className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold text-[#F58220]"
                                >
                                    Read Article{' '}
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </article>
                        </div>
                    </section>

                    <section className="pt-4">
                        <h2 className="text-[11px] font-black uppercase">
                            Latest Articles
                        </h2>
                        <p className="mt-1 text-[9px]">
                            Explore the latest stories, guides, and updates from
                            AxeGear.
                        </p>
                        {visibleArticles.length > 0 ? (
                            <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
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
                    </section>

                    <section className="py-4">
                        <div className="flex items-end justify-between gap-4">
                            <h2 className="text-[11px] font-black uppercase">
                                Popular Stories
                            </h2>
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-[8px]"
                            >
                                View All Popular Stories{' '}
                                <ArrowRight className="h-3 w-3 text-[#F58220]" />
                            </Link>
                        </div>
                        <div className="scrollbar-hide mt-2 grid auto-cols-[255px] grid-flow-col gap-4 overflow-x-auto md:auto-cols-auto md:grid-flow-row md:grid-cols-4">
                            {popularStories.map(
                                ([title, category, image], index) => (
                                    <article
                                        key={title}
                                        className="grid grid-cols-[38px_72px_1fr] items-start gap-2"
                                    >
                                        <span className="text-[38px] leading-none font-black tracking-[-0.06em]">
                                            0{index + 1}
                                        </span>
                                        <img
                                            src={unsplash(image, 360)}
                                            alt={title}
                                            className="aspect-square w-full object-cover"
                                        />
                                        <div>
                                            <h3 className="text-[9px] leading-[1.15] font-semibold">
                                                {title}
                                            </h3>
                                            <p className="mt-2 text-[7px] font-bold text-[#F58220] uppercase">
                                                {category}
                                            </p>
                                            <p className="mt-1 text-[7px]">
                                                {index < 2 ? 6 : 4} min read
                                            </p>
                                        </div>
                                    </article>
                                ),
                            )}
                        </div>
                    </section>
                </main>

                <section className="relative min-h-[125px] overflow-hidden bg-[#0D0D0D] text-white">
                    <img
                        src={unsplash('photo-1558981403-c5f9899a28bc', 1500)}
                        alt="Motocross rider demonstrating AxeGear performance technology"
                        className="absolute inset-y-0 right-0 h-full w-[58%] object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/10" />
                    <div className="relative mx-auto max-w-[1640px] px-7 py-5 sm:px-11 lg:px-[60px]">
                        <div className="max-w-[470px] border-l-2 border-[#F58220] pl-3">
                            <p className="text-[9px] font-bold tracking-[0.05em] uppercase">
                                Performance Technology
                            </p>
                            <h2 className="mt-1 text-[27px] leading-none font-black tracking-[-0.02em] uppercase">
                                See More. React Faster.
                            </h2>
                            <p className="mt-2 max-w-[400px] text-[9px] leading-[1.35] text-white/85">
                                Explore the engineering behind AxeGear lenses,
                                frames, and performance equipment.
                            </p>
                            <Link
                                href="/about"
                                className="mt-3 inline-flex items-center gap-2 text-[9px] font-bold text-[#F58220]"
                            >
                                Discover the Technology{' '}
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1640px] px-5 py-3 sm:px-11 lg:px-[52px]">
                    <div className="grid gap-3 sm:grid-cols-3">
                        <label className="flex h-9 items-center border border-[#D4D4D4] px-3">
                            <span className="sr-only">Search articles</span>
                            <input
                                value={query}
                                onChange={(event) => {
                                    setQuery(event.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search articles, guides, and stories"
                                className="min-w-0 flex-1 bg-transparent text-[9px] outline-none"
                            />
                            <Search className="h-3.5 w-3.5" />
                        </label>
                        <div className="relative">
                            <select
                                value={activeCategory}
                                onChange={(event) =>
                                    changeCategory(
                                        event.target.value as Category,
                                    )
                                }
                                className="h-9 w-full appearance-none border border-[#D4D4D4] bg-white px-3 text-[9px] outline-none"
                            >
                                {categories.map((category) => (
                                    <option key={category}>{category}</option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2" />
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
                                className="h-9 w-full appearance-none border border-[#D4D4D4] bg-white px-3 text-[9px] outline-none"
                            >
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-center gap-1 text-[9px]">
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setPage((value) => Math.max(1, value - 1))
                            }
                            className="inline-flex items-center gap-1 rounded-none px-3 py-1.5 disabled:opacity-35"
                        >
                            <ChevronLeft className="h-3 w-3" /> Previous
                        </button>
                        {Array.from(
                            { length: pageCount },
                            (_, index) => index + 1,
                        ).map((number) => (
                            <button
                                key={number}
                                type="button"
                                onClick={() => setPage(number)}
                                className={`h-6 min-w-7 rounded-none px-2 ${number === currentPage ? 'bg-[#F58220] text-white' : ''}`}
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
                            className="inline-flex items-center gap-1 rounded-none px-3 py-1.5 disabled:opacity-35"
                        >
                            Next <ChevronRight className="h-3 w-3" />
                        </button>
                    </div>
                </section>

                <section className="bg-[#101010] px-7 py-5 text-white sm:px-11 lg:px-[95px]">
                    <div className="mx-auto grid max-w-[1450px] items-center gap-5 sm:grid-cols-[1fr_1fr]">
                        <div>
                            <h2 className="text-[28px] leading-none font-black tracking-[-0.025em] uppercase">
                                Stay Ahead of the Ride
                            </h2>
                            <p className="mt-2 max-w-[430px] text-[9px] leading-[1.35] text-white/80">
                                Get the latest AxeGear stories, product
                                releases, performance guides, and community
                                updates delivered to your inbox.
                            </p>
                        </div>
                        <form
                            onSubmit={(event) => event.preventDefault()}
                            className="flex h-9"
                        >
                            <label htmlFor="blog-email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="blog-email"
                                type="email"
                                placeholder="Enter your email address"
                                className="min-w-0 flex-1 bg-white px-4 text-[9px] text-black outline-none"
                            />
                            <button
                                type="submit"
                                className="inline-flex min-w-[130px] items-center justify-center gap-3 rounded-none bg-[#F58220] px-4 text-[9px] font-bold uppercase"
                            >
                                Subscribe <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </ShopLayout>
    );
}

function ArticleCard({ article }: { article: Article }) {
    return (
        <article
            className={`border border-[#DEDEDE] bg-white ${article.wide ? 'md:col-span-2' : ''}`}
        >
            <img
                src={article.image}
                alt={article.title}
                className="aspect-[2.05/1] w-full object-cover"
            />
            <div className="px-3 py-2">
                <p className="text-[8px] font-bold text-[#F58220] uppercase">
                    {article.category}
                </p>
                <h3 className="mt-1 max-w-[330px] text-[13px] leading-[1.15] font-semibold">
                    {article.title}
                </h3>
                <p className="mt-2 text-[7px] text-[#555555]">
                    {article.date} <span className="px-1">•</span>{' '}
                    {article.minutes} min read <span className="px-1">•</span>{' '}
                    AxeGear Editorial
                </p>
                <Link
                    href="/blog"
                    className="mt-2 inline-flex items-center gap-2 text-[8px] font-semibold"
                >
                    Read More <ArrowRight className="h-3 w-3 text-[#F58220]" />
                </Link>
            </div>
        </article>
    );
}
