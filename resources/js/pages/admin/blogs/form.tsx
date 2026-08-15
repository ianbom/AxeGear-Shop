import { Head, Link, useForm } from '@inertiajs/react';
import { ImageIcon, Plus, Save, Trash2, Upload } from 'lucide-react';
import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader, textInputClass } from '@/pages/admin/marketing/shared';

type Section = { heading: string; paragraphs: string[] };
type BlogArticle = {
    id: number;
    title: string;
    slug: string;
    category: string;
    author_name: string;
    excerpt: string;
    intro: string;
    sections: Section[];
    quote: string | null;
    tips: string[];
    conclusion: string | null;
    image_url: string;
    reading_minutes: number;
    published_at: string | null;
    is_published: boolean;
};
type Props = { mode: 'create' | 'edit'; article: BlogArticle | null };

const emptySection = (): Section => ({ heading: '', paragraphs: [''] });

export default function BlogForm({ mode, article }: Props) {
    const isEdit = mode === 'edit' && article !== null;
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(article?.image_url ?? null);
    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'PUT' : 'POST',
        title: article?.title ?? '',
        slug: article?.slug ?? '',
        category: article?.category ?? '',
        author_name: article?.author_name ?? 'AxeGear Editorial',
        excerpt: article?.excerpt ?? '',
        intro: article?.intro ?? '',
        sections: article?.sections.length ? article.sections : [emptySection()],
        quote: article?.quote ?? '',
        tips: article?.tips.length ? article.tips : [''],
        conclusion: article?.conclusion ?? '',
        image: null as File | null,
        reading_minutes: String(article?.reading_minutes ?? 5),
        published_at: article?.published_at ?? '',
        is_published: article?.is_published ?? false,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(isEdit ? `/admin/blogs/${article.id}` : '/admin/blogs', { forceFormData: true });
    };
    const updateSection = (index: number, value: Partial<Section>) => setData('sections', data.sections.map((section, itemIndex) => itemIndex === index ? { ...section, ...value } : section));
    const updateParagraph = (sectionIndex: number, paragraphIndex: number, value: string) => updateSection(sectionIndex, { paragraphs: data.sections[sectionIndex].paragraphs.map((paragraph, itemIndex) => itemIndex === paragraphIndex ? value : paragraph) });
    const nestedError = (key: string) => (errors as Record<string, string | undefined>)[key];

    return (
        <>
            <Head title={isEdit ? 'Edit Blog Article' : 'Create Blog Article'} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader eyebrow="Content Management" title={isEdit ? 'Edit Blog Article' : 'Create Blog Article'} description="Artikel published tampil di AxeGear Journal. Draft tetap tersimpan di admin." />
                <form onSubmit={submit} className="grid max-w-5xl gap-6">
                    <Card><CardHeader><CardTitle>Article Information</CardTitle><CardDescription>Data yang tampil pada card dan header artikel.</CardDescription></CardHeader><CardContent className="grid gap-5 md:grid-cols-2">
                        <Field label="Title" value={data.title} onChange={(value) => setData('title', value)} error={errors.title} />
                        <Field label="Slug" value={data.slug} onChange={(value) => setData('slug', value)} error={errors.slug} />
                        <Field label="Category" value={data.category} onChange={(value) => setData('category', value)} error={errors.category} />
                        <Field label="Author" value={data.author_name} onChange={(value) => setData('author_name', value)} error={errors.author_name} />
                        <Field label="Reading Minutes" type="number" value={data.reading_minutes} onChange={(value) => setData('reading_minutes', value)} error={errors.reading_minutes} />
                        <Field label="Published Date" type="date" value={data.published_at} onChange={(value) => setData('published_at', value)} error={errors.published_at} />
                        <TextArea label="Excerpt" value={data.excerpt} onChange={(value) => setData('excerpt', value)} error={errors.excerpt} className="md:col-span-2" />
                        <TextArea label="Introduction" value={data.intro} onChange={(value) => setData('intro', value)} error={errors.intro} className="md:col-span-2" />
                    </CardContent></Card>

                    <Card><CardHeader><CardTitle>Cover Image</CardTitle><CardDescription>Upload gambar utama artikel, maksimum 4 MB.</CardDescription></CardHeader><CardContent>
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
                                        : (article?.image_url ?? null),
                                );
                            }}
                        />
                        <button type="button" onClick={() => inputRef.current?.click()} className="flex min-h-52 w-full items-center justify-center overflow-hidden rounded-md border border-dashed bg-muted/20 p-4 text-sm text-muted-foreground">
                            {preview ? <img src={preview} alt="Article preview" className="max-h-64 w-full object-contain" /> : <span className="flex flex-col items-center gap-2"><ImageIcon /><span>Click to upload cover image</span><Upload className="h-4 w-4" /></span>}
                        </button>
                        <InputError message={errors.image} className="mt-2" />
                    </CardContent></Card>

                    <Card><CardHeader><CardTitle>Article Sections</CardTitle><CardDescription>Atur heading dan paragraf yang tampil di detail artikel.</CardDescription></CardHeader><CardContent className="grid gap-5">
                        {data.sections.map((section, sectionIndex) => <div key={sectionIndex} className="rounded-md border p-4"><div className="flex justify-end"><Button type="button" size="sm" variant="ghost" disabled={data.sections.length === 1} onClick={() => setData('sections', data.sections.filter((_, index) => index !== sectionIndex))}><Trash2 /> Remove Section</Button></div>
                            <Field label="Heading" value={section.heading} onChange={(value) => updateSection(sectionIndex, { heading: value })} error={nestedError(`sections.${sectionIndex}.heading`)} />
                            <div className="mt-4 grid gap-3">{section.paragraphs.map((paragraph, paragraphIndex) => <div key={paragraphIndex} className="flex gap-2"><textarea value={paragraph} onChange={(event) => updateParagraph(sectionIndex, paragraphIndex, event.target.value)} className={`${textInputClass()} min-h-24 flex-1`} placeholder="Paragraph" /><Button type="button" variant="outline" size="icon" disabled={section.paragraphs.length === 1} onClick={() => updateSection(sectionIndex, { paragraphs: section.paragraphs.filter((_, index) => index !== paragraphIndex) })}><Trash2 /></Button></div>)}</div>
                            <Button type="button" variant="outline" className="mt-3" onClick={() => updateSection(sectionIndex, { paragraphs: [...section.paragraphs, ''] })}><Plus /> Add Paragraph</Button>
                        </div>)}
                        <Button type="button" variant="outline" onClick={() => setData('sections', [...data.sections, emptySection()])}><Plus /> Add Section</Button>
                    </CardContent></Card>

                    <Card><CardHeader><CardTitle>Supporting Content</CardTitle></CardHeader><CardContent className="grid gap-5">
                        <TextArea label="Quote" value={data.quote} onChange={(value) => setData('quote', value)} error={errors.quote} />
                        <TextArea label="Conclusion" value={data.conclusion} onChange={(value) => setData('conclusion', value)} error={errors.conclusion} />
                        <div className="grid gap-2"><Label>Tips</Label>{data.tips.map((tip, index) => <div key={index} className="flex gap-2"><Input value={tip} onChange={(event) => setData('tips', data.tips.map((value, itemIndex) => itemIndex === index ? event.target.value : value))} /><Button type="button" variant="outline" size="icon" disabled={data.tips.length === 1} onClick={() => setData('tips', data.tips.filter((_, itemIndex) => itemIndex !== index))}><Trash2 /></Button></div>)}<Button type="button" variant="outline" onClick={() => setData('tips', [...data.tips, ''])}><Plus /> Add Tip</Button></div>
                    </CardContent></Card>

                    <Card><CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6"><label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={data.is_published} onChange={(event) => setData('is_published', event.target.checked)} /> Publish article</label><div className="flex gap-3"><Button asChild variant="outline"><Link href="/admin/blogs">Cancel</Link></Button><Button type="submit" disabled={processing}><Save /> Save Article</Button></div></CardContent></Card>
                </form>
            </div>
        </>
    );
}

function Field({ label, value, onChange, error, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; error?: string; type?: string }) {
    return <div className="grid gap-2"><Label>{label}</Label><Input type={type} value={value} onChange={(event) => onChange(event.target.value)} /><InputError message={error} /></div>;
}

function TextArea({ label, value, onChange, error, className = '' }: { label: string; value: string; onChange: (value: string) => void; error?: string; className?: string }) {
    return <div className={`grid gap-2 ${className}`}><Label>{label}</Label><textarea value={value} onChange={(event) => onChange(event.target.value)} className={`${textInputClass()} min-h-28`} /><InputError message={error} /></div>;
}
