import { Head, Link, useForm } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ActiveBadge, PageHeader, Pagination, TableShell, Thumbnail } from '@/pages/admin/marketing/shared';
import type { Paginated } from '@/pages/admin/marketing/shared';

type GalleryImage = {
    id: number;
    image_url: string;
    alt_text: string | null;
    categories: string[];
    sort_order: number;
    is_active: boolean;
};
type Category = { id: number; name: string };
type Props = { images: Paginated<GalleryImage>; categories: Category[]; filters: Record<string, string> };

export default function GalleryIndex({ images, categories, filters }: Props) {
    const { data, setData, get, processing } = useForm({
        search: filters.search ?? '',
        category: filters.category ?? '',
        is_active: filters.is_active ?? '',
    });
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        get('/admin/gallery', { preserveState: true, replace: true });
    };

    return <><Head title="Gallery" /><div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <PageHeader eyebrow="Content Management" title="Gallery" description="Kelola gambar, kategori, urutan, dan visibilitas gallery customer." action={<Button asChild><Link href="/admin/gallery/create"><Plus /> Add Image</Link></Button>} />
        <TableShell title="Gallery Images" description={`${images.total} gambar tercatat`}>
            <form onSubmit={submit} className="mb-5 grid gap-3 md:grid-cols-[1fr_220px_180px_auto]">
                <Input value={data.search} onChange={(event) => setData('search', event.target.value)} placeholder="Search alt text" />
                <select value={data.category} onChange={(event) => setData('category', event.target.value)} className="rounded-md border border-input bg-transparent px-3 text-sm"><option value="">All Categories</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
                <select value={data.is_active} onChange={(event) => setData('is_active', event.target.value)} className="rounded-md border border-input bg-transparent px-3 text-sm"><option value="">All Statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></select>
                <Button type="submit" disabled={processing}><Search /> Filter</Button>
            </form>
            <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="pr-4 pb-3 font-medium">Image</th><th className="pr-4 pb-3 font-medium">Categories</th><th className="pr-4 pb-3 font-medium">Order</th><th className="pr-4 pb-3 font-medium">Status</th><th className="pb-3 text-right font-medium">Action</th></tr></thead><tbody className="divide-y">
                {images.data.map((image) => <tr key={image.id} className="hover:bg-muted/40"><td className="py-3 pr-4"><div className="flex items-center gap-3"><Thumbnail src={image.image_url} alt={image.alt_text ?? ''} /><span className="max-w-72 truncate">{image.alt_text ?? '-'}</span></div></td><td className="py-3 pr-4">{image.categories.join(', ')}</td><td className="py-3 pr-4">{image.sort_order}</td><td className="py-3 pr-4"><ActiveBadge active={image.is_active} /></td><td className="py-3"><div className="flex justify-end gap-2"><Button asChild size="sm" variant="outline"><Link href={`/admin/gallery/${image.id}/edit`}><Edit /> Edit</Link></Button><Button asChild size="sm" variant="outline"><Link href={`/admin/gallery/${image.id}`} method="delete" as="button"><Trash2 /> Delete</Link></Button></div></td></tr>)}
            </tbody></table></div>
            <Pagination paginator={images} />
        </TableShell>
    </div></>;
}
