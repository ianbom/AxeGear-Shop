import { Head, Link, useForm } from '@inertiajs/react';
import { Edit, Eye, Plus, Search, Trash2 } from 'lucide-react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ActiveBadge,
    PageHeader,
    Pagination,
    TableShell,
    Thumbnail,
} from '@/pages/admin/marketing/shared';
import type { Paginated } from '@/pages/admin/marketing/shared';

type BlogArticle = {
    id: number;
    title: string;
    slug: string;
    category: string;
    author_name: string;
    image_url: string;
    published_at: string | null;
    reading_minutes: number;
    is_published: boolean;
    updated_at: string | null;
};

type Props = {
    articles: Paginated<BlogArticle>;
    categories: string[];
    filters: Record<string, string>;
};

export default function BlogIndex({ articles, categories, filters }: Props) {
    const { data, setData, get, processing } = useForm({
        search: filters.search ?? '',
        category: filters.category ?? '',
        status: filters.status ?? '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        get('/admin/blogs', { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Blog Articles" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    eyebrow="Content Management"
                    title="Blog Articles"
                    description="Kelola artikel, kategori, gambar, dan status publikasi AxeGear Journal."
                    action={
                        <Button asChild>
                            <Link href="/admin/blogs/create">
                                <Plus /> Create Article
                            </Link>
                        </Button>
                    }
                />

                <TableShell title="Articles" description={`${articles.total} artikel tercatat`}>
                    <form onSubmit={submit} className="mb-5 grid gap-3 md:grid-cols-[1fr_220px_180px_auto]">
                        <Input
                            value={data.search}
                            onChange={(event) => setData('search', event.target.value)}
                            placeholder="Search title or slug"
                        />
                        <select
                            value={data.category}
                            onChange={(event) => setData('category', event.target.value)}
                            className="rounded-md border border-input bg-transparent px-3 text-sm"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => <option key={category}>{category}</option>)}
                        </select>
                        <select
                            value={data.status}
                            onChange={(event) => setData('status', event.target.value)}
                            className="rounded-md border border-input bg-transparent px-3 text-sm"
                        >
                            <option value="">All Statuses</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                        <Button type="submit" disabled={processing}><Search /> Filter</Button>
                    </form>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="border-b text-left text-muted-foreground">
                                <th className="pr-4 pb-3 font-medium">Article</th>
                                <th className="pr-4 pb-3 font-medium">Category</th>
                                <th className="pr-4 pb-3 font-medium">Published</th>
                                <th className="pr-4 pb-3 font-medium">Status</th>
                                <th className="pb-3 text-right font-medium">Action</th>
                            </tr></thead>
                            <tbody className="divide-y">
                                {articles.data.map((article) => (
                                    <tr key={article.id} className="hover:bg-muted/40">
                                        <td className="py-3 pr-4">
                                            <div className="flex items-center gap-3">
                                                <Thumbnail src={article.image_url} alt={article.title} />
                                                <div><div className="font-medium">{article.title}</div><div className="text-xs text-muted-foreground">/{article.slug}</div></div>
                                            </div>
                                        </td>
                                        <td className="py-3 pr-4">{article.category}</td>
                                        <td className="py-3 pr-4">{article.published_at ?? '-'}</td>
                                        <td className="py-3 pr-4"><ActiveBadge active={article.is_published} /></td>
                                        <td className="py-3"><div className="flex justify-end gap-2">
                                            {article.is_published && <Button asChild size="sm" variant="outline"><Link href={`/blog/${article.slug}`}><Eye /> Preview</Link></Button>}
                                            <Button asChild size="sm" variant="outline"><Link href={`/admin/blogs/${article.id}/edit`}><Edit /> Edit</Link></Button>
                                            <Button asChild size="sm" variant="outline"><Link href={`/admin/blogs/${article.id}`} method="delete" as="button"><Trash2 /> Delete</Link></Button>
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination paginator={articles} />
                </TableShell>
            </div>
        </>
    );
}
