import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Search } from 'lucide-react';
import type { FormEvent } from 'react';
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
};
type Paginator = {
    data: Article[];
    from: number | null;
    total: number;
    current_page: number;
    last_page: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
};
type Props = {
    articles: Paginator;
    categories: string[];
    filters: { search: string; category: string; sort: 'latest' | 'oldest' };
};

const heroImage = 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=88&w=1800';

export default function Blog({ articles, categories, filters }: Props) {
    const { data, setData, get, processing } = useForm({
        search: filters.search,
        category: filters.category,
        sort: filters.sort,
    });
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        get('/blog', { preserveState: true, replace: true });
    };

    return (
        <ShopLayout>
            <Head title="AxeGear Journal"><meta name="description" content="AxeGear athlete stories, performance technology, product guides, and riding tips." /></Head>
            <div className="bg-white text-[14px] text-[#111111]">
                <section className="relative h-[320px] overflow-hidden sm:h-[340px]">
                    <img src={heroImage} alt="AxeGear cyclist riding through mountain terrain" className="absolute inset-0 h-full w-full object-cover object-[65%_45%]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/0" />
                    <div className="relative mx-auto flex h-full max-w-[1640px] items-center px-7 py-9 sm:px-11 lg:px-[76px]"><div className="max-w-[390px]">
                        <p className="flex items-center gap-3 text-[13px] font-bold tracking-[0.04em] uppercase"><span className="h-px w-6 bg-[#F58220]" />AxeGear Journal</p>
                        <h1 className="mt-3 text-[38px] leading-[0.93] font-black tracking-[-0.035em] uppercase sm:text-[50px]">Stories Built<br />for Performance</h1>
                        <p className="mt-4 max-w-[420px] text-[16px] leading-[1.5]">Discover athlete stories, gear guides, product technology, riding tips, and the latest news from the world of AxeGear.</p>
                        <a href="#articles" className="mt-5 inline-flex items-center gap-3 text-[14px] font-bold text-[#F58220]">Explore Latest Stories <ArrowRight className="h-4 w-4" /></a>
                    </div></div>
                </section>
                <main id="articles" className="mx-auto max-w-[1640px] px-5 py-4 sm:px-11 lg:px-[60px]">
                    <section className="py-8">
                        <form onSubmit={submit} className="grid gap-4 md:grid-cols-[1fr_220px_180px_auto]">
                            <label className="flex h-12 items-center border border-[#D4D4D4] px-4"><span className="sr-only">Search articles</span><Search className="mr-3 h-5 w-5 text-[#777777]" /><input value={data.search} onChange={(event) => setData('search', event.target.value)} placeholder="Search articles, guides, and stories" className="w-full bg-transparent outline-none" /></label>
                            <select value={data.category} onChange={(event) => setData('category', event.target.value)} className="h-12 border border-[#D4D4D4] bg-white px-4 outline-none"><option>All Stories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select>
                            <select value={data.sort} onChange={(event) => setData('sort', event.target.value as 'latest' | 'oldest')} className="h-12 border border-[#D4D4D4] bg-white px-4 outline-none"><option value="latest">Latest First</option><option value="oldest">Oldest First</option></select>
                            <button type="submit" disabled={processing} className="h-12 bg-[#F58220] px-6 font-bold text-white uppercase disabled:opacity-50">Apply</button>
                        </form>
                        <div className="mt-8 flex items-end justify-between"><div><p className="text-[12px] font-bold tracking-[0.05em] text-[#F58220] uppercase">AxeGear Journal</p><h2 className="mt-2 text-[30px] font-black sm:text-[38px]">Latest Articles</h2></div><p className="text-[13px] text-[#666666]">{articles.total} stories</p></div>
                        {articles.data.length > 0 ? <div className="mt-7 grid gap-6 md:grid-cols-2">{articles.data.map((article) => <ArticleCard key={article.id} article={article} />)}</div> : <div className="mt-7 border border-[#DEDEDE] px-6 py-16 text-center"><h3 className="text-lg font-black uppercase">No stories found</h3><p className="mt-2 text-sm text-[#666666]">Try another keyword or category.</p></div>}
                        {articles.last_page > 1 && <nav className="mt-8 flex items-center justify-center gap-2 text-[14px]" aria-label="Blog pagination">{articles.links.map((link, index) => link.url ? <Link key={index} href={link.url} preserveState className={`inline-flex h-10 min-w-10 items-center justify-center border px-3 ${link.active ? 'border-[#F58220] bg-[#F58220] text-white' : 'border-[#D4D4D4]'}`}><span dangerouslySetInnerHTML={{ __html: link.label }} /></Link> : <span key={index} className="inline-flex h-10 min-w-10 items-center justify-center px-3 text-[#999999]"><span dangerouslySetInnerHTML={{ __html: link.label }} /></span>)}</nav>}
                    </section>
                </main>
            </div>
        </ShopLayout>
    );
}

function ArticleCard({ article }: { article: Article }) {
    return <article className="border border-[#DEDEDE] bg-white"><Link href={`/blog/${article.slug}`} aria-label={`Read ${article.title}`}><img src={article.image_url} alt={article.title} className="aspect-[1.9/1] w-full object-cover" /></Link><div className="p-5 sm:p-6"><p className="text-[12px] font-bold tracking-[0.03em] text-[#F58220] uppercase">{article.category}</p><h3 className="mt-2 text-[20px] leading-[1.25] font-semibold"><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3><p className="mt-4 text-[12px] text-[#555555]">{article.published_at ?? 'Draft'} <span className="px-1">•</span>{article.reading_minutes} min read <span className="px-1">•</span>{article.author_name}</p><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#555555]">{article.excerpt}</p><Link href={`/blog/${article.slug}`} className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold">Read More <ArrowRight className="h-4 w-4 text-[#F58220]" /></Link></div></article>;
}
