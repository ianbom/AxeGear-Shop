import { Head, Link, useForm } from '@inertiajs/react';
import { ImageIcon, Save, Upload } from 'lucide-react';
import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/pages/admin/marketing/shared';

type GalleryImage = { id: number; image_url: string; alt_text: string | null; category_ids: number[]; sort_order: number; is_active: boolean };
type Category = { id: number; name: string };
type Props = { mode: 'create' | 'edit'; image: GalleryImage | null; categories: Category[] };

export default function GalleryForm({ mode, image, categories }: Props) {
    const isEdit = mode === 'edit' && image !== null;
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(image?.image_url ?? null);
    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'PUT' : 'POST',
        image: null as File | null,
        alt_text: image?.alt_text ?? '',
        category_ids: image?.category_ids ?? [],
        sort_order: String(image?.sort_order ?? 0),
        is_active: image?.is_active ?? true,
    });
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(isEdit ? `/admin/gallery/${image.id}` : '/admin/gallery', { forceFormData: true });
    };
    const toggleCategory = (categoryId: number) => setData('category_ids', data.category_ids.includes(categoryId) ? data.category_ids.filter((id) => id !== categoryId) : [...data.category_ids, categoryId]);

    return <><Head title={isEdit ? 'Edit Gallery Image' : 'Add Gallery Image'} /><div className="flex flex-1 flex-col gap-6 p-4 md:p-6"><PageHeader eyebrow="Content Management" title={isEdit ? 'Edit Gallery Image' : 'Add Gallery Image'} description="Upload gambar dan pilih satu atau lebih kategori gallery." />
        <Card className="max-w-4xl"><CardHeader><CardTitle>Gallery Image</CardTitle><CardDescription>Gambar baru wajib diupload. Gambar lama tetap digunakan bila edit tanpa upload baru.</CardDescription></CardHeader><CardContent><form onSubmit={submit} className="grid gap-5">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;

                    setData('image', file);
                    setPreview(
                        file
                            ? URL.createObjectURL(file)
                            : (image?.image_url ?? null),
                    );
                }}
            />
            <button type="button" onClick={() => inputRef.current?.click()} className="flex min-h-60 w-full items-center justify-center overflow-hidden rounded-md border border-dashed bg-muted/20 p-4 text-sm text-muted-foreground">{preview ? <img src={preview} alt="Gallery preview" className="max-h-80 w-full object-contain" /> : <span className="flex flex-col items-center gap-2"><ImageIcon /><span>Click to upload image</span><Upload className="h-4 w-4" /></span>}</button><InputError message={errors.image} />
            <div className="grid gap-4 md:grid-cols-2"><div className="grid gap-2"><Label>Alt Text</Label><Input value={data.alt_text} onChange={(event) => setData('alt_text', event.target.value)} /><InputError message={errors.alt_text} /></div><div className="grid gap-2"><Label>Sort Order</Label><Input type="number" min="0" value={data.sort_order} onChange={(event) => setData('sort_order', event.target.value)} /><InputError message={errors.sort_order} /></div></div>
            <div className="grid gap-3"><Label>Categories</Label><div className="grid gap-3 sm:grid-cols-2">{categories.map((category) => <label key={category.id} className="flex items-center gap-3 rounded-md border p-3 text-sm"><input type="checkbox" checked={data.category_ids.includes(category.id)} onChange={() => toggleCategory(category.id)} />{category.name}</label>)}</div><InputError message={errors.category_ids} /></div>
            <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={data.is_active} onChange={(event) => setData('is_active', event.target.checked)} /> Show on public gallery</label>
            <div className="flex justify-end gap-3"><Button asChild variant="outline"><Link href="/admin/gallery">Cancel</Link></Button><Button type="submit" disabled={processing}><Save /> Save Image</Button></div>
        </form></CardContent></Card>
    </div></>;
}
