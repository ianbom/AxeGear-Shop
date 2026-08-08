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
    is_active: boolean;
};

type FeatureItem = {
    icon: string;
    title: string;
    description: string;
    sort_order: number;
    is_active: boolean;
};

type PersistedGalleryImage = {
    image_url: string;
    alt_text: string | null;
    sort_order: number;
    is_active: boolean;
};

type GalleryImage = PersistedGalleryImage & { image: File | null };

type FormData = Omit<PageData, 'id'> & {
    hero_image: File | null;
    story_image: File | null;
    technology_image: File | null;
    final_image: File | null;
    benefits: FeatureItem[];
    gallery_images: GalleryImage[];
    technologies: FeatureItem[];
};

type Props = {
    page: PageData;
    benefits: FeatureItem[];
    galleryImages: PersistedGalleryImage[];
    technologies: FeatureItem[];
    icons: string[];
};

const emptyFeature = (sortOrder: number): FeatureItem => ({
    icon: 'badge-check',
    title: '',
    description: '',
    sort_order: sortOrder,
    is_active: true,
});

const emptyImage = (sortOrder: number): GalleryImage => ({
    image_url: '',
    image: null,
    alt_text: '',
    sort_order: sortOrder,
    is_active: true,
});

export default function NewProductForm({ page, benefits, galleryImages, technologies, icons }: Props) {
    const pageFields = Object.fromEntries(Object.entries(page).filter(([key]) => key !== 'id')) as Omit<PageData, 'id'>;
    const { data, setData, put, processing, errors } = useForm<FormData>({
        ...pageFields,
        hero_image: null,
        story_image: null,
        technology_image: null,
        final_image: null,
        benefits,
        gallery_images: galleryImages.map((image) => ({ ...image, image: null })),
        technologies,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put('/admin/new-product', { preserveScroll: true, forceFormData: true });
    };

    const updateFeature = (key: 'benefits' | 'technologies', index: number, values: Partial<FeatureItem>) => {
        setData(key, data[key].map((item, itemIndex) => (itemIndex === index ? { ...item, ...values } : item)));
    };

    const updateImage = (index: number, values: Partial<GalleryImage>) => {
        setData('gallery_images', data.gallery_images.map((item, itemIndex) => (itemIndex === index ? { ...item, ...values } : item)));
    };

    return (
        <>
            <Head title="New Product Page" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    eyebrow="Content Management"
                    title="New Product Page"
                    description="Kelola seluruh konten halaman produk baru. Upload gambar langsung dari perangkat admin."
                />

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
                            <Field label="Specifications Text" value={data.specifications_text} onChange={(value) => setData('specifications_text', value)} error={errors.specifications_text} />
                            <ImageUpload label="Hero Image" currentUrl={data.hero_image_url} onFile={(file) => setData('hero_image', file)} error={errors.hero_image} />
                        </div>
                    </Section>

                    <DynamicFeatures
                        title="Why It Stands Out"
                        heading={data.benefits_heading}
                        onHeading={(value) => setData('benefits_heading', value)}
                        headingError={errors.benefits_heading}
                        items={data.benefits}
                        icons={icons}
                        errorKey="benefits"
                        errors={errors}
                        onChange={(index, values) => updateFeature('benefits', index, values)}
                        onAdd={() => setData('benefits', [...data.benefits, emptyFeature(data.benefits.length)])}
                        onRemove={(index) => setData('benefits', data.benefits.filter((_, itemIndex) => itemIndex !== index))}
                    />

                    <Section title="Story" description="Cerita peluncuran dan gambar pendukung.">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Eyebrow" value={data.story_eyebrow} onChange={(value) => setData('story_eyebrow', value)} error={errors.story_eyebrow} />
                            <TextArea label="Title" value={data.story_title} onChange={(value) => setData('story_title', value)} error={errors.story_title} />
                            <div className="md:col-span-2">
                                <TextArea label="Body" rows={8} value={data.story_body} onChange={(value) => setData('story_body', value)} error={errors.story_body} />
                            </div>
                            <div className="md:col-span-2">
                                <ImageUpload label="Story Image" currentUrl={data.story_image_url} onFile={(file) => setData('story_image', file)} error={errors.story_image} />
                            </div>
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
                                    <RowActions active={image.is_active} onActive={(value) => updateImage(index, { is_active: value })} onRemove={() => setData('gallery_images', data.gallery_images.filter((_, itemIndex) => itemIndex !== index))} />
                                </div>
                            ))}
                        </div>
                        <Button type="button" variant="outline" onClick={() => setData('gallery_images', [...data.gallery_images, emptyImage(data.gallery_images.length)])}>
                            <Plus className="size-4" /> Add Image
                        </Button>
                    </Section>

                    <DynamicFeatures
                        title="Performance Technology"
                        heading={data.technology_heading}
                        onHeading={(value) => setData('technology_heading', value)}
                        headingError={errors.technology_heading}
                        imageUrl={data.technology_image_url}
                        onImageFile={(file) => setData('technology_image', file)}
                        imageError={errors.technology_image}
                        items={data.technologies}
                        icons={icons}
                        errorKey="technologies"
                        errors={errors}
                        onChange={(index, values) => updateFeature('technologies', index, values)}
                        onAdd={() => setData('technologies', [...data.technologies, emptyFeature(data.technologies.length)])}
                        onRemove={(index) => setData('technologies', data.technologies.filter((_, itemIndex) => itemIndex !== index))}
                    />

                    <Section title="Final CTA" description="Opsional. Kosongkan title untuk menyembunyikan section ini.">
                        <div className="grid gap-4 md:grid-cols-2">
                            <NullableField label="Eyebrow" value={data.final_eyebrow} onChange={(value) => setData('final_eyebrow', value)} error={errors.final_eyebrow} />
                            <NullableField label="Title" value={data.final_title} onChange={(value) => setData('final_title', value)} error={errors.final_title} />
                            <NullableField label="Tagline" value={data.final_tagline} onChange={(value) => setData('final_tagline', value)} error={errors.final_tagline} />
                            <NullableField label="Price" value={data.final_price_label} onChange={(value) => setData('final_price_label', value)} error={errors.final_price_label} />
                            <NullableField label="CTA Text" value={data.final_cta_text} onChange={(value) => setData('final_cta_text', value)} error={errors.final_cta_text} />
                            <NullableField label="CTA URL" value={data.final_cta_url} onChange={(value) => setData('final_cta_url', value)} error={errors.final_cta_url} />
                            <div className="md:col-span-2">
                                <ImageUpload label="Image" currentUrl={data.final_image_url ?? ''} onFile={(file) => setData('final_image', file)} error={errors.final_image} />
                            </div>
                        </div>
                        <label className="flex items-center gap-2 text-sm font-medium">
                            <input type="checkbox" checked={data.is_active} onChange={(event) => setData('is_active', event.target.checked)} /> Page active
                        </label>
                    </Section>

                    <div className="sticky bottom-4 flex justify-end">
                        <Button type="submit" size="lg" disabled={processing}>
                            <Save className="size-4" /> {processing ? 'Saving...' : 'Save Page'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

function DynamicFeatures({ title, heading, onHeading, headingError, imageUrl, onImageFile, imageError, items, icons, errorKey, errors, onChange, onAdd, onRemove }: {
    title: string;
    heading: string;
    onHeading: (value: string) => void;
    headingError?: string;
    imageUrl?: string;
    onImageFile?: (file: File | null) => void;
    imageError?: string;
    items: FeatureItem[];
    icons: string[];
    errorKey: 'benefits' | 'technologies';
    errors: Record<string, string>;
    onChange: (index: number, values: Partial<FeatureItem>) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
}) {
    return (
        <Section title={title} description="Kelola item beserta icon, urutan, dan status tampil.">
            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Section Heading" value={heading} onChange={onHeading} error={headingError} />
                {imageUrl !== undefined && onImageFile ? <ImageUpload label="Section Image" currentUrl={imageUrl} onFile={onImageFile} error={imageError} /> : null}
            </div>
            <div className="grid gap-4">
                {items.map((item, index) => (
                    <div key={index} className="grid gap-3 rounded-lg border p-4 md:grid-cols-[160px_1fr_1.4fr_100px_auto]">
                        <div className="grid gap-2">
                            <Label>Icon</Label>
                            <select className={textInputClass()} value={item.icon} onChange={(event) => onChange(index, { icon: event.target.value })}>
                                {icons.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                            </select>
                            <InputError message={nestedError(errors, `${errorKey}.${index}.icon`)} />
                        </div>
                        <Field label="Title" value={item.title} onChange={(value) => onChange(index, { title: value })} error={nestedError(errors, `${errorKey}.${index}.title`)} />
                        <TextArea label="Description" value={item.description} onChange={(value) => onChange(index, { description: value })} error={nestedError(errors, `${errorKey}.${index}.description`)} />
                        <NumberField label="Order" value={item.sort_order} onChange={(value) => onChange(index, { sort_order: value })} />
                        <RowActions active={item.is_active} onActive={(value) => onChange(index, { is_active: value })} onRemove={() => onRemove(index)} />
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" onClick={onAdd}><Plus className="size-4" /> Add Item</Button>
        </Section>
    );
}

function ImageUpload({ label, currentUrl, onFile, error, compact = false }: {
    label: string;
    currentUrl: string;
    onFile: (file: File | null) => void;
    error?: string;
    compact?: boolean;
}) {
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
                    ) : (
                        <ImageIcon className="size-10 text-muted-foreground/40" />
                    )}
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

function NullableField({ label, value, onChange, error }: { label: string; value: string | null; onChange: (value: string | null) => void; error?: string }) {
    return <Field label={label} value={value ?? ''} onChange={(nextValue) => onChange(nextValue || null)} error={error} />;
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
