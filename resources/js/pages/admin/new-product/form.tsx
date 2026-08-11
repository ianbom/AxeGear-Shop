import { Head, useForm } from '@inertiajs/react';
import { ImageIcon, Plus, Save, Trash2, Upload, X } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader, textInputClass } from '@/pages/admin/marketing/shared';

type PageData = {
    id: number;
    name: string;
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
    is_active: boolean;
};

type PersistedGalleryImage = {
    image_url: string;
    alt_text: string | null;
    sort_order: number;
    is_active: boolean;
};

type GalleryImage = PersistedGalleryImage & { image: File | null };
type FormData = Omit<PageData, 'id'> & { hero_image: File | null; story_image: File | null; gallery_images: GalleryImage[] };
type Props = { page: PageData; galleryImages: PersistedGalleryImage[] };

const emptyImage = (sortOrder: number): GalleryImage => ({
    image_url: '',
    image: null,
    alt_text: '',
    sort_order: sortOrder,
    is_active: true,
});

export default function NewProductForm({ page, galleryImages }: Props) {
    const pageFields = Object.fromEntries(Object.entries(page).filter(([key]) => key !== 'id')) as Omit<PageData, 'id'>;
    const { data, setData, put, processing, errors } = useForm<FormData>({
        ...pageFields,
        hero_image: null,
        story_image: null,
        gallery_images: galleryImages.map((image) => ({ ...image, image: null })),
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put('/admin/new-product', { preserveScroll: true, forceFormData: true });
    };

    const updateImage = (index: number, values: Partial<GalleryImage>) => {
        setData('gallery_images', data.gallery_images.map((image, imageIndex) => imageIndex === index ? { ...image, ...values } : image));
    };

    return (
        <>
            <Head title="New Product Page" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader eyebrow="Content Management" title="New Product Page" description="Kelola Hero, Story, dan Closer Look. Upload gambar langsung dari perangkat admin." />

                <form onSubmit={submit} className="grid max-w-6xl gap-6">
                    <Section title="Hero" description="Konten utama, produk, harga, CTA, dan gambar hero.">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Internal Name" value={data.name} onChange={(value) => setData('name', value)} error={errors.name} />
                            <Field label="Eyebrow" value={data.hero_eyebrow} onChange={(value) => setData('hero_eyebrow', value)} error={errors.hero_eyebrow} />
                            <TextArea label="Hero Title" value={data.hero_title} onChange={(value) => setData('hero_title', value)} error={errors.hero_title} />
                            <Field label="Product Name" value={data.product_name} onChange={(value) => setData('product_name', value)} error={errors.product_name} />
                            <TextArea label="Description" value={data.hero_description} onChange={(value) => setData('hero_description', value)} error={errors.hero_description} />
                            <Field label="Price" value={data.price_label} onChange={(value) => setData('price_label', value)} error={errors.price_label} />
                            <Field label="Shop Button Text" value={data.shop_now_text} onChange={(value) => setData('shop_now_text', value)} error={errors.shop_now_text} />
                            <Field label="Shop Button URL" value={data.shop_now_url} onChange={(value) => setData('shop_now_url', value)} error={errors.shop_now_url} />
                            <Field label="Secondary Button Text" value={data.specifications_text} onChange={(value) => setData('specifications_text', value)} error={errors.specifications_text} />
                            <ImageUpload label="Hero Image" currentUrl={data.hero_image_url} onFile={(file) => setData('hero_image', file)} error={errors.hero_image} />
                        </div>
                    </Section>

                    <Section title="Story" description="Cerita peluncuran dan gambar pendukung.">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Eyebrow" value={data.story_eyebrow} onChange={(value) => setData('story_eyebrow', value)} error={errors.story_eyebrow} />
                            <TextArea label="Title" value={data.story_title} onChange={(value) => setData('story_title', value)} error={errors.story_title} />
                            <div className="md:col-span-2"><TextArea label="Body" rows={8} value={data.story_body} onChange={(value) => setData('story_body', value)} error={errors.story_body} /></div>
                            <div className="md:col-span-2"><ImageUpload label="Story Image" currentUrl={data.story_image_url} onFile={(file) => setData('story_image', file)} error={errors.story_image} /></div>
                        </div>
                    </Section>

                    <Section title="Closer Look" description="Tambah, hapus, aktifkan, dan urutkan gambar galeri.">
                        <Field label="Section Heading" value={data.gallery_heading} onChange={(value) => setData('gallery_heading', value)} error={errors.gallery_heading} />
                        <div className="grid gap-4">
                            {data.gallery_images.map((image, index) => (
                                <div key={index} className="grid gap-3 rounded-lg border p-4 md:grid-cols-[1.2fr_1fr_110px_auto]">
                                    <ImageUpload label="Image" currentUrl={image.image_url} onFile={(file) => updateImage(index, { image: file })} error={nestedError(errors, `gallery_images.${index}.image`)} compact />
                                    <Field label="Alt Text" value={image.alt_text ?? ''} onChange={(value) => updateImage(index, { alt_text: value })} error={nestedError(errors, `gallery_images.${index}.alt_text`)} />
                                    <NumberField label="Order" value={image.sort_order} onChange={(value) => updateImage(index, { sort_order: value })} />
                                    <RowActions active={image.is_active} onActive={(value) => updateImage(index, { is_active: value })} onRemove={() => setData('gallery_images', data.gallery_images.filter((_, imageIndex) => imageIndex !== index))} />
                                </div>
                            ))}
                        </div>
                        <Button type="button" variant="outline" onClick={() => setData('gallery_images', [...data.gallery_images, emptyImage(data.gallery_images.length)])}><Plus className="size-4" /> Add Image</Button>
                    </Section>

                    <Section title="Publishing" description="Atur apakah halaman tampil untuk customer.">
                        <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={data.is_active} onChange={(event) => setData('is_active', event.target.checked)} /> Page active</label>
                    </Section>

                    <div className="sticky bottom-4 flex justify-end"><Button type="submit" size="lg" disabled={processing}><Save className="size-4" /> {processing ? 'Saving...' : 'Save Page'}</Button></div>
                </form>
            </div>
        </>
    );
}

function ImageUpload({ label, currentUrl, onFile, error, compact = false }: { label: string; currentUrl: string; onFile: (file: File | null) => void; error?: string; compact?: boolean }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const display = preview ?? currentUrl;

    const clear = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setPreview(null);
        onFile(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <div className={compact ? 'grid gap-3' : 'flex flex-col gap-3 sm:flex-row sm:items-start'}>
                <div className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted ${compact ? 'h-28 w-full' : 'h-32 w-56'}`}>
                    {display ? (
                        <>
                            <img src={display} alt={label} className="h-full w-full object-cover" />
                            {preview ? (
                                <button type="button" onClick={clear} className="absolute top-1 right-1 flex size-7 items-center justify-center rounded-full bg-black/65 text-white">
                                    <X className="size-4" />
                                </button>
                            ) : null}
                        </>
                    ) : <ImageIcon className="size-10 text-muted-foreground/40" />}
                </div>
                <button type="button" onClick={() => inputRef.current?.click()} className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-sm text-muted-foreground hover:border-primary/60 hover:bg-muted/50">
                    <Upload className="size-5" /> Pilih gambar
                    <span className="text-xs">JPG, PNG, WEBP · Maks. 4 MB</span>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;

                            if (preview) {
                                URL.revokeObjectURL(preview);
                            }

                            onFile(file);
                            setPreview(file ? URL.createObjectURL(file) : null);
                        }}
                    />
                </button>
            </div>
            <p className="text-xs text-muted-foreground">Biarkan kosong untuk mempertahankan gambar saat ini.</p>
            <InputError message={error} />
        </div>
    );
}

function Section({ title, description, children }: { title: string; description: string; children: ReactNode }) {
    return <Card><CardHeader><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent className="grid gap-5">{children}</CardContent></Card>;
}

function Field({ label, value, onChange, error }: { label: string; value: string; onChange: (value: string) => void; error?: string }) {
    return <div className="grid gap-2"><Label>{label}</Label><Input value={value} onChange={(event) => onChange(event.target.value)} /><InputError message={error} /></div>;
}

function TextArea({ label, value, onChange, error, rows = 4 }: { label: string; value: string; onChange: (value: string) => void; error?: string; rows?: number }) {
    return <div className="grid gap-2"><Label>{label}</Label><textarea rows={rows} className={textInputClass()} value={value} onChange={(event) => onChange(event.target.value)} /><InputError message={error} /></div>;
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
    return <div className="grid gap-2"><Label>{label}</Label><Input type="number" min={0} value={value} onChange={(event) => onChange(Number(event.target.value))} /></div>;
}

function RowActions({ active, onActive, onRemove }: { active: boolean; onActive: (value: boolean) => void; onRemove: () => void }) {
    return <div className="flex items-end gap-3 pb-1"><label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={active} onChange={(event) => onActive(event.target.checked)} /> Active</label><Button type="button" size="icon" variant="destructive" onClick={onRemove}><Trash2 className="size-4" /></Button></div>;
}

function nestedError(errors: Record<string, string>, key: string): string | undefined {
    return errors[key];
}
