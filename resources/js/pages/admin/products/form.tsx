import { Head, Link, useForm } from '@inertiajs/react';
import Highlight from '@tiptap/extension-highlight';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold,
    Code2,
    CornerDownLeft,
    Eraser,
    Heading1,
    Heading2,
    Highlighter,
    Image as ImageIcon,
    Italic,
    List,
    ListOrdered,
    Pencil,
    Plus,
    Quote,
    Redo2,
    Strikethrough,
    Trash2,
    Undo2,
    X,
    GripVertical,
    AlertTriangle,
    Layers,
    Tag,
    DollarSign,
    Package,
    Star,
    Sparkles,
    TrendingUp,
    LayoutGrid,
} from 'lucide-react';
import { useState, useEffect, useMemo, useRef, useId } from 'react';
import type { FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { store, update } from '@/routes/admin/products';
import ProductShippingEstimate from './shipping-estimate';

type Option = { id: number; name: string };
const productFieldLabels: Record<string, string> = {
    name: 'Nama produk',
    slug: 'URL slug',
    sku: 'SKU',
    category_id: 'Kategori',
    collection_ids: 'Koleksi',
    brand_name: 'Merek',
    product_line: 'Lini produk',
    style_name: 'Nama model',
    short_description: 'Deskripsi singkat',
    description: 'Deskripsi',
    regular_price: 'Harga normal',
    sale_price: 'Harga diskon',
    stock: 'Stok',
    reserved_stock: 'Stok yang dicadangkan',
    weight: 'Berat',
    length: 'Panjang',
    width: 'Lebar',
    height: 'Tinggi',
    status: 'Status produk',
    images: 'Gambar produk',
    image: 'Gambar',
    image_url: 'Alamat gambar',
    alt_text: 'Keterangan gambar',
    sort_order: 'Urutan gambar',
    is_primary: 'Gambar utama',
    variants: 'Varian produk',
    variant_name: 'Nama varian',
    color_name: 'Nama warna',
    color_hex: 'Kode warna',
    size: 'Ukuran',
    package_type: 'Jenis kemasan',
    is_active: 'Status aktif',
    is_featured: 'Produk unggulan',
    is_new_arrival: 'Produk baru',
    is_best_seller: 'Produk terlaris',
    id: 'Data tersimpan',
};

function productErrorLabel(key: string, variants: ProductVariantRow[]): string {
    const [group, position, field] = key.split('.');

    if (group === 'variants' && /^\d+$/.test(position ?? '')) {
        const index = Number(position);
        const identity = variants[index]?.sku || variants[index]?.variant_name;

        return (
            'Varian ' +
            (index + 1) +
            (identity ? ' (' + identity + ')' : '') +
            (field ? ' — ' + (productFieldLabels[field] ?? 'Data varian') : '')
        );
    }

    if (group === 'images' && /^\d+$/.test(position ?? '')) {
        return (
            'Gambar ' +
            (Number(position) + 1) +
            (field ? ' — ' + (productFieldLabels[field] ?? 'Data gambar') : '')
        );
    }

    return productFieldLabels[group] ?? 'Data produk';
}

function variantIndexesWithErrors(
    errors: Record<string, string | undefined>,
): number[] {
    return [
        ...new Set(
            Object.keys(errors)
                .filter((key) => errors[key])
                .flatMap((key) => {
                    const match = /^variants\.(\d+)(?:\.|$)/.exec(key);

                    return match ? [Number(match[1])] : [];
                }),
        ),
    ].sort((first, second) => first - second);
}

function focusProductField(key: string, root: ParentNode = document): void {
    const target = Array.from(
        root.querySelectorAll<HTMLElement>('[data-error-field]'),
    )
        .filter(
            (element) =>
                key === element.dataset.errorField ||
                key.replace(/\.image_url$/, '.image') ===
                    element.dataset.errorField ||
                key.startsWith(element.dataset.errorField + '.'),
        )
        .sort(
            (first, second) =>
                (second.dataset.errorField?.length ?? 0) -
                (first.dataset.errorField?.length ?? 0),
        )[0];

    if (!target) {
        return;
    }

    const control = target.querySelector<HTMLElement>(
        'input:not([type="hidden"]), textarea, select, [contenteditable="true"], button',
    );
    (control ?? target).focus({ preventScroll: true });

    if (control && document.activeElement !== control) {
        target.focus({ preventScroll: true });
    }

    target.scrollIntoView({ block: 'center', behavior: 'smooth' });
}
type ProductImagePayload = {
    id?: number;
    image_url: string | null;
    alt_text: string;
    sort_order: number;
    is_primary: boolean;
};
type ProductImageRow = ProductImagePayload & {
    image: File | null;
};
type ProductVariantPayload = {
    id?: number;
    sku: string;
    variant_name: string;
    color_name: string;
    color_hex: string;
    size: string;
    package_type: string;
    regular_price: string | number;
    sale_price: string | number;
    stock: string | number;
    reserved_stock: string | number;
    weight: string | number;
    length: string | number;
    width: string | number;
    height: string | number;
    image_url: string;
    is_active: boolean;
};
type ProductVariantRow = ProductVariantPayload & {
    image: File | null;
};
type ProductFormData = {
    category_id: string | number;
    collection_ids: Array<string | number>;
    name: string;
    slug: string;
    sku: string;
    brand_name: string;
    product_line: string;
    style_name: string;
    short_description: string;
    description: string;
    regular_price: string | number;
    sale_price: string | number;
    weight: string | number;
    length: string | number;
    width: string | number;
    height: string | number;
    status: string;
    is_featured: boolean;
    is_new_arrival: boolean;
    is_best_seller: boolean;
    images: ProductImageRow[];
    variants: ProductVariantRow[];
};
type Product = Omit<ProductFormData, 'images' | 'variants'> & {
    id: number;
    images: ProductImagePayload[];
    variants: ProductVariantPayload[];
};

type Props = {
    mode: 'create' | 'edit';
    product: Product | null;
    options: {
        categories: Option[];
        collections: Option[];
        statuses: string[];
    };
};

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

const blankImage = (): ProductImageRow => ({
    image: null,
    image_url: null,
    alt_text: '',
    sort_order: 0,
    is_primary: false,
});

const blankVariant = (): ProductVariantRow => ({
    sku: '',
    variant_name: 'Default Title',
    color_name: '',
    color_hex: '',
    size: '',
    package_type: '',
    regular_price: '',
    sale_price: '',
    stock: 0,
    reserved_stock: 0,
    weight: '',
    length: '',
    width: '',
    height: '',
    image_url: '',
    image: null,
    is_active: true,
});

function variantValidationErrors(variant: ProductVariantRow) {
    const errors: Partial<Record<keyof ProductVariantRow, string>> = {};

    for (const field of ['weight', 'length', 'width', 'height'] as const) {
        const value = String(variant[field] ?? '').trim();

        if (!value) {
            errors[field] = productFieldLabels[field] + ' varian wajib diisi.';
        } else if (!Number.isInteger(Number(value)) || Number(value) < 0) {
            errors[field] =
                productFieldLabels[field] +
                ' varian harus berupa bilangan bulat minimal 0.';
        }
    }

    for (const field of ['regular_price', 'sale_price'] as const) {
        const value = String(variant[field] ?? '').trim();

        if (value && (!Number.isFinite(Number(value)) || Number(value) < 0)) {
            errors[field] =
                productFieldLabels[field] + ' harus berupa angka minimal 0.';
        }
    }

    if (String(variant.sale_price ?? '').trim()) {
        if (!String(variant.regular_price ?? '').trim()) {
            errors.regular_price =
                'Harga normal wajib diisi jika harga diskon diisi.';
        } else if (
            !errors.regular_price &&
            !errors.sale_price &&
            Number(variant.sale_price) > Number(variant.regular_price)
        ) {
            errors.sale_price =
                'Harga diskon tidak boleh melebihi harga normal.';
        }
    }

    return errors;
}

function SectionCard({
    title,
    description,
    children,
    icon,
    field,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    field?: string;
}) {
    return (
        <div
            data-error-field={field}
            tabIndex={field ? -1 : undefined}
            className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
        >
            <div className="flex items-start gap-3 border-b border-zinc-100 px-6 py-4">
                {icon && (
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50">
                        {icon}
                    </div>
                )}
                <div>
                    <h2 className="text-sm font-semibold text-zinc-900">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-0.5 text-xs text-zinc-500">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

function FieldRow({
    children,
    cols = 1,
    className = '',
}: {
    children: React.ReactNode;
    cols?: 1 | 2 | 3 | 4;
    className?: string;
}) {
    const gridClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-4',
    }[cols];

    return (
        <div className={`grid ${gridClass} gap-4 ${className}`}>{children}</div>
    );
}

function FieldGroup({
    label,
    hint,
    required,
    error,
    field,
    children,
    charCount,
    maxChar,
}: {
    label: string;
    hint?: string;
    required?: boolean;
    error?: string;
    field?: string;
    children: React.ReactNode;
    charCount?: number;
    maxChar?: number;
}) {
    const groupRef = useRef<HTMLDivElement>(null);
    const errorId = useId();
    useEffect(() => {
        const control = groupRef.current?.querySelector<HTMLElement>(
            'input:not([type="hidden"]), textarea, select, [contenteditable="true"], button',
        );

        if (!control) {
            return;
        }

        control.id ||= errorId + '-input';
        const label = groupRef.current?.querySelector('label');

        if (label) {
            label.htmlFor = control.id;
        }

        control.setAttribute('aria-invalid', String(Boolean(error)));
        const descriptions = new Set(
            (control.getAttribute('aria-describedby') ?? '')
                .split(' ')
                .filter(Boolean),
        );

        if (error) {
            descriptions.add(errorId);
        } else {
            descriptions.delete(errorId);
        }

        if (descriptions.size) {
            control.setAttribute(
                'aria-describedby',
                [...descriptions].join(' '),
            );
        } else {
            control.removeAttribute('aria-describedby');
        }
    }, [error, errorId, children]);

    return (
        <div
            ref={groupRef}
            data-error-field={field}
            tabIndex={-1}
            className={
                'space-y-1.5 ' +
                (error
                    ? 'rounded-md ring-1 ring-red-500 ring-offset-4 [&_input]:border-red-500 [&_select]:border-red-500 [&_textarea]:border-red-500'
                    : '')
            }
        >
            <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-zinc-700">
                    {label}
                    {required && <span className="ml-0.5 text-red-500">*</span>}
                </Label>
                {maxChar !== undefined && (
                    <span
                        className={`text-[11px] tabular-nums ${(charCount ?? 0) > maxChar * 0.9 ? 'text-amber-500' : 'text-zinc-400'}`}
                    >
                        {charCount ?? 0}/{maxChar}
                    </span>
                )}
            </div>
            {children}
            {error && (
                <p
                    id={errorId}
                    role="alert"
                    className="flex items-center gap-1 text-[11px] text-red-600"
                >
                    <AlertTriangle className="h-3 w-3" />
                    {error}
                </p>
            )}
            {hint && !error && (
                <p className="text-[11px] text-zinc-400">{hint}</p>
            )}
        </div>
    );
}

function editorButtonClass(active = false, disabled = false) {
    return [
        'inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-xs font-semibold transition-colors',
        active
            ? 'border-[#B98B63] bg-[#F8F0E5] text-[#9A6B45]'
            : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900',
        disabled ? 'cursor-not-allowed opacity-50' : '',
    ].join(' ');
}

function ToolbarButton({
    active = false,
    children,
    disabled,
    label,
    onClick,
}: {
    active?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            disabled={disabled}
            onClick={onClick}
            className={editorButtonClass(active, disabled)}
        >
            {children}
        </button>
    );
}

function RichTextEditor({
    error,
    onChange,
    value,
}: {
    error?: string;
    onChange: (value: string) => void;
    value: string;
}) {
    const extensions = useMemo(
        () => [
            StarterKit.configure({
                heading: {
                    levels: [1, 2],
                },
            }),
            Highlight.configure({
                multicolor: true,
            }),
        ],
        [],
    );

    const editor = useEditor({
        extensions,
        content: value,
        editorProps: {
            attributes: {
                class: [
                    'min-h-[180px] px-4 py-3 text-sm leading-6 text-zinc-800 outline-none',
                    '[&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-zinc-950',
                    '[&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900',
                    '[&_p]:mb-2 [&_p:last-child]:mb-0',
                    '[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5',
                    '[&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5',
                    '[&_blockquote]:border-l-4 [&_blockquote]:border-zinc-300 [&_blockquote]:pl-4 [&_blockquote]:text-zinc-600',
                    '[&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-zinc-950 [&_pre]:p-3 [&_pre]:text-xs [&_pre]:text-zinc-50',
                    '[&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs',
                ].join(' '),
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.isEmpty ? '' : editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor || editor.getHTML() === value) {
            return;
        }

        editor.commands.setContent(value, { emitUpdate: false });
    }, [editor, value]);

    const disabled = !editor;
    const buttonGroups = [
        [
            {
                label: 'Bold',
                active: editor?.isActive('bold') ?? false,
                icon: <Bold className="h-4 w-4" />,
                run: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: 'Italic',
                active: editor?.isActive('italic') ?? false,
                icon: <Italic className="h-4 w-4" />,
                run: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: 'Strikethrough',
                active: editor?.isActive('strike') ?? false,
                icon: <Strikethrough className="h-4 w-4" />,
                run: () => editor?.chain().focus().toggleStrike().run(),
            },
            {
                label: 'Highlight',
                active: editor?.isActive('highlight') ?? false,
                icon: <Highlighter className="h-4 w-4" />,
                run: () =>
                    editor
                        ?.chain()
                        .focus()
                        .toggleHighlight({ color: '#fef08a' })
                        .run(),
            },
        ],
        [
            {
                label: 'Paragraph',
                active: editor?.isActive('paragraph') ?? false,
                icon: <span className="px-0.5">P</span>,
                run: () => editor?.chain().focus().setParagraph().run(),
            },
            {
                label: 'Heading 1',
                active: editor?.isActive('heading', { level: 1 }) ?? false,
                icon: <Heading1 className="h-4 w-4" />,
                run: () =>
                    editor?.chain().focus().toggleHeading({ level: 1 }).run(),
            },
            {
                label: 'Heading 2',
                active: editor?.isActive('heading', { level: 2 }) ?? false,
                icon: <Heading2 className="h-4 w-4" />,
                run: () =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run(),
            },
        ],
        [
            {
                label: 'Bullet points',
                active: editor?.isActive('bulletList') ?? false,
                icon: <List className="h-4 w-4" />,
                run: () => editor?.chain().focus().toggleBulletList().run(),
            },
            {
                label: 'Numbered points',
                active: editor?.isActive('orderedList') ?? false,
                icon: <ListOrdered className="h-4 w-4" />,
                run: () => editor?.chain().focus().toggleOrderedList().run(),
            },
            {
                label: 'Quote',
                active: editor?.isActive('blockquote') ?? false,
                icon: <Quote className="h-4 w-4" />,
                run: () => editor?.chain().focus().toggleBlockquote().run(),
            },
            {
                label: 'Code block',
                active: editor?.isActive('codeBlock') ?? false,
                icon: <Code2 className="h-4 w-4" />,
                run: () => editor?.chain().focus().toggleCodeBlock().run(),
            },
        ],
        [
            {
                label: 'Enter line break',
                active: false,
                icon: <CornerDownLeft className="h-4 w-4" />,
                run: () => editor?.chain().focus().setHardBreak().run(),
            },
            {
                label: 'Undo',
                active: false,
                icon: <Undo2 className="h-4 w-4" />,
                run: () => editor?.chain().focus().undo().run(),
            },
            {
                label: 'Redo',
                active: false,
                icon: <Redo2 className="h-4 w-4" />,
                run: () => editor?.chain().focus().redo().run(),
            },
            {
                label: 'Clear formatting',
                active: false,
                icon: <Eraser className="h-4 w-4" />,
                run: () =>
                    editor?.chain().focus().unsetAllMarks().clearNodes().run(),
            },
        ],
    ];

    return (
        <div
            className={`overflow-hidden rounded-lg border bg-white shadow-sm transition-colors ${error ? 'border-red-300' : 'border-zinc-200 focus-within:border-[#151515]'}`}
        >
            <div className="flex flex-wrap gap-1 border-b border-zinc-100 bg-zinc-50 p-2">
                {buttonGroups.map((group, groupIndex) => (
                    <div
                        key={groupIndex}
                        className="flex flex-wrap gap-1 border-r border-zinc-200 pr-1 last:border-r-0 last:pr-0"
                    >
                        {group.map((button) => (
                            <ToolbarButton
                                key={button.label}
                                label={button.label}
                                active={button.active}
                                disabled={disabled}
                                onClick={button.run}
                            >
                                {button.icon}
                            </ToolbarButton>
                        ))}
                    </div>
                ))}
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}

export default function ProductForm({ mode, product, options }: Props) {
    const isEdit = mode === 'edit' && product !== null;
    const { data, setData, post, processing, errors, transform } =
        useForm<ProductFormData>({
            category_id: product?.category_id ?? '',
            collection_ids: product?.collection_ids ?? [],
            name: product?.name ?? '',
            slug: product?.slug ?? '',
            sku: product?.sku ?? '',
            brand_name: product?.brand_name ?? 'Axegear',
            product_line: product?.product_line ?? '',
            style_name: product?.style_name ?? '',
            short_description: product?.short_description ?? '',
            description: product?.description ?? '',
            regular_price: product?.regular_price ?? '',
            sale_price: product?.sale_price ?? '',
            weight: product?.weight ?? '',
            length: product?.length ?? '',
            width: product?.width ?? '',
            height: product?.height ?? '',
            status: product?.status ?? 'draft',
            is_featured: product?.is_featured ?? false,
            is_new_arrival: product?.is_new_arrival ?? false,
            is_best_seller: product?.is_best_seller ?? false,
            images: product?.images?.length
                ? product.images.map((image) => ({ ...image, image: null }))
                : [blankImage()],
            variants: product?.variants?.length
                ? product.variants.map((variant) => ({
                      ...variant,
                      image: null,
                  }))
                : [],
        });

    const fieldError = (key: string) =>
        (errors as Record<string, string | undefined>)[key];

    // Local blob previews — never sent to server, never stored in image_url
    const [previews, setPreviews] = useState<(string | null)[]>(() =>
        (product?.images ?? [{ image_url: null }]).map(
            (img) => img.image_url ?? null,
        ),
    );
    const [variantModalOpen, setVariantModalOpen] = useState(false);
    const [requestedField, setRequestedField] = useState<string | null>(null);
    const variantModalRef = useRef<HTMLDivElement>(null);
    const returnFocusRef = useRef<HTMLElement | null>(null);
    const invalidVariantIndexes = variantIndexesWithErrors(
        errors as Record<string, string>,
    );
    const errorEntries = Object.entries(
        errors as Record<string, string>,
    ).filter(([, message]) => Boolean(message));
    const [editingVariantIndex, setEditingVariantIndex] = useState<
        number | null
    >(null);
    const [variantDraft, setVariantDraft] =
        useState<ProductVariantRow>(blankVariant());
    const [variantSaveAttempted, setVariantSaveAttempted] = useState(false);
    const variantDraftErrors = variantValidationErrors(variantDraft);
    const [variantDraftPreview, setVariantDraftPreview] = useState<
        string | null
    >(null);
    const [variantPreviews, setVariantPreviews] = useState<(string | null)[]>(
        () =>
            (product?.variants ?? []).map(
                (variant) => variant.image_url || null,
            ),
    );

    // Revoke old blob URLs on unmount to avoid memory leaks
    useEffect(() => {
        return () => {
            previews.forEach((url) => {
                if (url && url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
            variantPreviews.forEach((url) => {
                if (url && url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const updateImage = (
        index: number,
        field: keyof ProductImageRow,
        value: ProductImageRow[keyof ProductImageRow],
    ) => {
        const next = [...data.images];
        next[index] = { ...next[index], [field]: value };
        setData('images', next);
    };

    const updateVariant = (
        index: number,
        field: keyof ProductVariantRow,
        value: string | number | boolean,
    ) => {
        const next = [...data.variants];
        next[index] = { ...next[index], [field]: value };
        setData('variants', next);
    };

    const openVariantModal = (
        index: number | null = null,
        field: string | null = null,
    ) => {
        if (!variantModalOpen) {
            returnFocusRef.current =
                document.activeElement as HTMLElement | null;
        }

        setRequestedField(field);
        setEditingVariantIndex(index);
        const draft =
            index === null ? blankVariant() : { ...data.variants[index] };
        setVariantDraft(draft);
        setVariantSaveAttempted(false);
        setVariantDraftPreview(
            index === null ? null : (variantPreviews[index] ?? null),
        );
        setVariantModalOpen(true);
    };

    const closeVariantModal = () => {
        const isSavedPreview = variantPreviews.some(
            (preview) => preview === variantDraftPreview,
        );

        if (variantDraftPreview?.startsWith('blob:') && !isSavedPreview) {
            URL.revokeObjectURL(variantDraftPreview);
        }

        setVariantModalOpen(false);
        setRequestedField(null);
        setEditingVariantIndex(null);
        setVariantDraft(blankVariant());
        setVariantDraftPreview(null);
    };

    const saveVariantDraft = (close = true) => {
        const invalidField = Object.keys(variantDraftErrors)[0];

        if (close && invalidField) {
            setVariantSaveAttempted(true);
            setRequestedField(variantField(invalidField));

            return;
        }

        const draft = { ...variantDraft };

        if (editingVariantIndex === null) {
            setData('variants', [...data.variants, draft]);
            setVariantPreviews([...variantPreviews, variantDraftPreview]);
        } else {
            const next = [...data.variants];
            next[editingVariantIndex] = draft;
            setData('variants', next);
            const previousPreview = variantPreviews[editingVariantIndex];

            if (
                previousPreview?.startsWith('blob:') &&
                previousPreview !== variantDraftPreview
            ) {
                URL.revokeObjectURL(previousPreview);
            }

            const nextPreviews = [...variantPreviews];
            nextPreviews[editingVariantIndex] = variantDraftPreview;
            setVariantPreviews(nextPreviews);
        }

        if (!close) {
            return;
        }

        setVariantModalOpen(false);
        setRequestedField(null);
        setEditingVariantIndex(null);
        setVariantDraft(blankVariant());
        setVariantDraftPreview(null);
    };

    const setPrimaryImage = (index: number) => {
        setData(
            'images',
            data.images.map((image, imageIndex) => ({
                ...image,
                is_primary: imageIndex === index,
            })),
        );
    };

    const variantError = (field: keyof ProductVariantRow) => {
        if (
            variantDraftErrors[field] &&
            (variantSaveAttempted ||
                field === 'regular_price' ||
                field === 'sale_price' ||
                String(variantDraft[field] ?? '').trim())
        ) {
            return variantDraftErrors[field];
        }

        return editingVariantIndex === null ||
            variantDraft[field] !== data.variants[editingVariantIndex]?.[field]
            ? undefined
            : fieldError('variants.' + editingVariantIndex + '.' + field);
    };
    const variantField = (field: string) =>
        'variants.' + (editingVariantIndex ?? 'new') + '.' + field;
    const focusValidationError = (key: string) => {
        if (key === 'variants' || key.startsWith('variants.')) {
            const match = /^variants\.(\d+)/.exec(key);
            const candidate = match
                ? Number(match[1])
                : (invalidVariantIndexes[0] ?? 0);
            openVariantModal(
                data.variants[candidate]
                    ? candidate
                    : data.variants.length
                      ? 0
                      : null,
                key,
            );

            return;
        }

        setRequestedField(key);
        focusProductField(key);
    };
    const onValidationError = (validationErrors: Record<string, string>) => {
        const firstVariantIndex = variantIndexesWithErrors(
            validationErrors,
        ).find((index) => data.variants[index]);
        const keys = Object.keys(validationErrors);
        const key =
            firstVariantIndex !== undefined
                ? keys.find((field) =>
                      field.startsWith('variants.' + firstVariantIndex + '.'),
                  )
                : keys.find(
                      (field) =>
                          field === 'variants' || field.startsWith('variants.'),
                  );
        const target = key ?? keys[0];

        if (target === 'variants') {
            openVariantModal(data.variants.length ? 0 : null, target);
        } else if (target) {
            focusValidationError(target);
        }
    };
    useEffect(() => {
        if (!requestedField) {
            return;
        }

        const frame = requestAnimationFrame(() => {
            focusProductField(
                requestedField,
                variantModalOpen
                    ? (variantModalRef.current ?? document)
                    : document,
            );
        });

        return () => cancelAnimationFrame(frame);
    }, [requestedField, variantModalOpen, editingVariantIndex, errors]);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEdit) {
            transform((data) => ({ ...data, _method: 'put' }));
            post(update.url(product.id), {
                forceFormData: true,
                onError: onValidationError,
            });

            return;
        }

        transform((data) => data);
        post(store.url(), { forceFormData: true, onError: onValidationError });
    };

    const variantsCount = data.variants.filter((v) => v.sku).length;
    // Preview: use blob URL if new file selected, else fall back to stored image_url
    const getPreview = (index: number): string | null =>
        previews[index] ?? data.images[index]?.image_url ?? null;
    const getVariantPreview = (index: number): string | null =>
        variantPreviews[index] ?? data.variants[index]?.image_url ?? null;
    const primaryIndex = data.images.findIndex((i) => i.is_primary);
    const primaryPreview = getPreview(primaryIndex >= 0 ? primaryIndex : 0);

    const statusColors: Record<string, string> = {
        draft: 'bg-zinc-100 text-zinc-600',
        published: 'bg-emerald-100 text-emerald-700',
        archived: 'bg-rose-100 text-rose-700',
    };

    return (
        <>
            <Head title={isEdit ? 'Edit Product' : 'Create Product'} />

            <div className="min-h-screen bg-zinc-50/50">
                {/* Page Header */}
                <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white">
                    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                        <div className="flex h-14 items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Link
                                    href={
                                        isEdit
                                            ? `/admin/products/${product?.id}`
                                            : '/admin/products'
                                    }
                                    className="text-zinc-400 transition-colors hover:text-zinc-700"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                        />
                                    </svg>
                                </Link>
                                <div className="h-5 w-px bg-zinc-200" />
                                <div>
                                    <h1 className="text-sm font-semibold text-zinc-900">
                                        {isEdit
                                            ? `Edit: ${product?.name ?? 'Product'}`
                                            : 'Create Product'}
                                    </h1>
                                    <p className="hidden text-[11px] text-zinc-400 sm:block">
                                        {isEdit
                                            ? 'Update product details, images, and variants'
                                            : 'Fill in details to create a new product'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge
                                    className={`border-0 text-[11px] font-medium capitalize ${statusColors[data.status] ?? 'bg-zinc-100 text-zinc-600'}`}
                                >
                                    {data.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit}>
                    {errorEntries.length > 0 && (
                        <div
                            role="alert"
                            className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800"
                        >
                            <p className="font-semibold">
                                Produk belum tersimpan. Perbaiki bagian berikut.
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5">
                                {errorEntries.map(([key, message]) => (
                                    <li key={key}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                focusValidationError(key)
                                            }
                                            className="text-left underline underline-offset-2"
                                        >
                                            {productErrorLabel(
                                                key,
                                                data.variants,
                                            )}
                                            : {message}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_320px]">
                            {/* ── Main Column ── */}
                            <div className="flex flex-col gap-5">
                                {/* 1. Basic Information */}
                                <SectionCard
                                    title="Basic Information"
                                    description="Essential details about your product"
                                    icon={
                                        <Tag className="h-4 w-4 text-zinc-500" />
                                    }
                                >
                                    <div className="space-y-4">
                                        <FieldRow cols={2}>
                                            <FieldGroup
                                                field="name"
                                                label="Product Name"
                                                required
                                                error={errors.name}
                                            >
                                                <Input
                                                    value={data.name}
                                                    onChange={(e) => {
                                                        setData(
                                                            'name',
                                                            e.target.value,
                                                        );

                                                        if (!isEdit) {
                                                            setData(
                                                                'slug',
                                                                slugify(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                    placeholder="e.g. Axegear Hydropack Enduro 2L"
                                                    className="h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
                                                />
                                            </FieldGroup>
                                            <FieldGroup
                                                field="sku"
                                                label="SKU"
                                                required
                                                error={errors.sku}
                                                hint="Unique product identifier"
                                            >
                                                <Input
                                                    value={data.sku}
                                                    onChange={(e) =>
                                                        setData(
                                                            'sku',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="e.g. AXG-HYD-END-001"
                                                    className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                                />
                                            </FieldGroup>
                                        </FieldRow>

                                        <FieldGroup
                                            field="slug"
                                            label="URL Slug"
                                            required
                                            error={errors.slug}
                                            hint="Used in the product URL — lowercase letters, numbers, hyphens only"
                                        >
                                            <div className="flex gap-2">
                                                <Input
                                                    value={data.slug}
                                                    onChange={(e) =>
                                                        setData(
                                                            'slug',
                                                            slugify(
                                                                e.target.value,
                                                            ),
                                                        )
                                                    }
                                                    placeholder="e.g. axegear-hydropack-enduro-2l"
                                                    className="h-9 flex-1 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-9 shrink-0 border-zinc-200 px-3 text-xs"
                                                    onClick={() =>
                                                        setData(
                                                            'slug',
                                                            slugify(data.name),
                                                        )
                                                    }
                                                >
                                                    Generate
                                                </Button>
                                            </div>
                                        </FieldGroup>

                                        <FieldRow cols={2}>
                                            <FieldGroup
                                                field="category_id"
                                                label="Category"
                                                error={errors.category_id}
                                            >
                                                <select
                                                    value={data.category_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            'category_id',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm focus:border-[#151515] focus:ring-1 focus:ring-[#151515] focus:outline-none"
                                                >
                                                    <option value="">
                                                        No category
                                                    </option>
                                                    {options.categories.map(
                                                        (c) => (
                                                            <option
                                                                key={c.id}
                                                                value={c.id}
                                                            >
                                                                {c.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </FieldGroup>
                                            <FieldGroup
                                                field="collection_ids"
                                                label="Collections"
                                                error={errorEntries
                                                    .filter(
                                                        ([key]) =>
                                                            key ===
                                                                'collection_ids' ||
                                                            key.startsWith(
                                                                'collection_ids.',
                                                            ),
                                                    )
                                                    .map(
                                                        ([, message]) =>
                                                            message,
                                                    )
                                                    .join(' ')}
                                            >
                                                <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto rounded-md border border-zinc-200 bg-white p-3">
                                                    {options.collections
                                                        .length === 0 ? (
                                                        <span className="col-span-2 text-sm text-zinc-400">
                                                            No collections
                                                            available
                                                        </span>
                                                    ) : (
                                                        options.collections.map(
                                                            (c) => {
                                                                const isChecked =
                                                                    data.collection_ids.includes(
                                                                        c.id,
                                                                    );

                                                                return (
                                                                    <label
                                                                        key={
                                                                            c.id
                                                                        }
                                                                        className="flex cursor-pointer items-center gap-2 rounded-md border border-zinc-100 p-2 hover:bg-zinc-50"
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={
                                                                                isChecked
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) => {
                                                                                if (
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                ) {
                                                                                    setData(
                                                                                        'collection_ids',
                                                                                        [
                                                                                            ...data.collection_ids,
                                                                                            c.id,
                                                                                        ],
                                                                                    );
                                                                                } else {
                                                                                    setData(
                                                                                        'collection_ids',
                                                                                        data.collection_ids.filter(
                                                                                            (
                                                                                                id,
                                                                                            ) =>
                                                                                                id !==
                                                                                                c.id,
                                                                                        ),
                                                                                    );
                                                                                }
                                                                            }}
                                                                            className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-[#151515]"
                                                                        />
                                                                        <span className="text-sm text-zinc-700">
                                                                            {
                                                                                c.name
                                                                            }
                                                                        </span>
                                                                    </label>
                                                                );
                                                            },
                                                        )
                                                    )}
                                                </div>
                                            </FieldGroup>
                                        </FieldRow>

                                        <FieldRow cols={3}>
                                            <FieldGroup
                                                field="brand_name"
                                                label="Brand"
                                                error={errors.brand_name}
                                            >
                                                <Input
                                                    value={data.brand_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            'brand_name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Axegear"
                                                    className="h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
                                                />
                                            </FieldGroup>
                                            <FieldGroup
                                                field="product_line"
                                                label="Product Line"
                                                error={errors.product_line}
                                            >
                                                <Input
                                                    value={data.product_line}
                                                    onChange={(e) =>
                                                        setData(
                                                            'product_line',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Hydropack"
                                                    className="h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
                                                />
                                            </FieldGroup>
                                            <FieldGroup
                                                field="style_name"
                                                label="Style Name"
                                                error={errors.style_name}
                                            >
                                                <Input
                                                    value={data.style_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            'style_name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Trail Enduro"
                                                    className="h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
                                                />
                                            </FieldGroup>
                                        </FieldRow>

                                        <FieldGroup
                                            field="short_description"
                                            label="Short Description"
                                            required
                                            error={errors.short_description}
                                            charCount={
                                                data.short_description?.length
                                            }
                                            maxChar={160}
                                        >
                                            <Input
                                                value={data.short_description}
                                                onChange={(e) =>
                                                    setData(
                                                        'short_description',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Lightweight hydropack for trail rides and daily adventures"
                                                className="h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
                                            />
                                        </FieldGroup>

                                        <FieldGroup
                                            field="description"
                                            label="Description"
                                            required
                                            error={errors.description}
                                        >
                                            <RichTextEditor
                                                value={data.description}
                                                onChange={(value) =>
                                                    setData(
                                                        'description',
                                                        value,
                                                    )
                                                }
                                                error={errors.description}
                                            />
                                        </FieldGroup>
                                    </div>
                                </SectionCard>

                                {/* 2. Pricing */}
                                <SectionCard
                                    title="Pricing"
                                    description="Set regular and sale prices (IDR)"
                                    icon={
                                        <DollarSign className="h-4 w-4 text-zinc-500" />
                                    }
                                >
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div className="space-y-4">
                                            <FieldGroup
                                                field="regular_price"
                                                label="Regular Price (IDR)"
                                                required
                                                error={errors.regular_price}
                                            >
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={data.regular_price}
                                                    onChange={(e) =>
                                                        setData(
                                                            'regular_price',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="0"
                                                    className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                                />
                                            </FieldGroup>
                                            <FieldGroup
                                                field="sale_price"
                                                label="Sale Price (IDR)"
                                                error={errors.sale_price}
                                                hint="Must be lower than or equal to regular price"
                                            >
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={data.sale_price}
                                                    onChange={(e) =>
                                                        setData(
                                                            'sale_price',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Leave empty for no discount"
                                                    className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                                />
                                            </FieldGroup>
                                        </div>

                                        {/* Pricing Summary */}
                                        <div className="flex flex-col justify-between rounded-lg border border-zinc-100 bg-zinc-50 p-4">
                                            <p className="mb-3 text-[11px] font-medium tracking-wider text-zinc-500 uppercase">
                                                Price Summary
                                            </p>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-zinc-500">
                                                        Regular
                                                    </span>
                                                    <span className="font-mono text-zinc-900">
                                                        IDR{' '}
                                                        {Number(
                                                            data.regular_price ||
                                                                0,
                                                        ).toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-zinc-500">
                                                        Sale
                                                    </span>
                                                    <span className="font-mono text-zinc-900">
                                                        IDR{' '}
                                                        {Number(
                                                            data.sale_price ||
                                                                0,
                                                        ).toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="mt-2 border-t border-dashed border-zinc-200 pt-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-semibold text-zinc-900">
                                                            Final
                                                        </span>
                                                        <span className="font-mono text-base font-bold text-[#151515]">
                                                            IDR{' '}
                                                            {Number(
                                                                data.sale_price ||
                                                                    data.regular_price ||
                                                                    0,
                                                            ).toLocaleString(
                                                                'id-ID',
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                {data.sale_price &&
                                                    Number(data.sale_price) <
                                                        Number(
                                                            data.regular_price,
                                                        ) && (
                                                        <div className="mt-1 flex items-center gap-1.5">
                                                            <Badge className="border-0 bg-emerald-100 text-[10px] font-medium text-emerald-700">
                                                                {Math.round(
                                                                    (1 -
                                                                        Number(
                                                                            data.sale_price,
                                                                        ) /
                                                                            Number(
                                                                                data.regular_price,
                                                                            )) *
                                                                        100,
                                                                )}
                                                                % OFF
                                                            </Badge>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </SectionCard>

                                {/* 4. Shipping & Dimensions */}
                                <SectionCard
                                    title="Shipping & Dimensions"
                                    description="Used for shipping cost calculations"
                                    icon={
                                        <Package className="h-4 w-4 text-zinc-500" />
                                    }
                                >
                                    <FieldRow cols={4}>
                                        <FieldGroup
                                            field="weight"
                                            label="Weight (g)"
                                            required
                                            error={errors.weight}
                                        >
                                            <Input
                                                type="number"
                                                min="0"
                                                value={data.weight}
                                                required
                                                onChange={(e) =>
                                                    setData(
                                                        'weight',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="0"
                                                className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                            />
                                        </FieldGroup>
                                        <FieldGroup
                                            field="length"
                                            label="Length (cm)"
                                            required
                                            error={errors.length}
                                        >
                                            <Input
                                                type="number"
                                                min="0"
                                                value={data.length}
                                                required
                                                onChange={(e) =>
                                                    setData(
                                                        'length',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="0"
                                                className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                            />
                                        </FieldGroup>
                                        <FieldGroup
                                            field="width"
                                            label="Width (cm)"
                                            required
                                            error={errors.width}
                                        >
                                            <Input
                                                type="number"
                                                min="0"
                                                value={data.width}
                                                required
                                                onChange={(e) =>
                                                    setData(
                                                        'width',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="0"
                                                className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                            />
                                        </FieldGroup>
                                        <FieldGroup
                                            field="height"
                                            label="Height (cm)"
                                            required
                                            error={errors.height}
                                        >
                                            <Input
                                                type="number"
                                                min="0"
                                                value={data.height}
                                                required
                                                onChange={(e) =>
                                                    setData(
                                                        'height',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="0"
                                                className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                            />
                                        </FieldGroup>
                                    </FieldRow>
                                    <ProductShippingEstimate
                                        weight={data.weight}
                                        length={data.length}
                                        width={data.width}
                                        height={data.height}
                                    />
                                </SectionCard>

                                {/* 5. Product Images */}
                                <SectionCard
                                    field="images"
                                    title="Product Images"
                                    description="Upload high-quality product photos (recommended: 800×1067px)"
                                    icon={
                                        <ImageIcon className="h-4 w-4 text-zinc-500" />
                                    }
                                >
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                        {data.images.map((image, index) => (
                                            <div
                                                data-error-field={
                                                    'images.' + index
                                                }
                                                tabIndex={-1}
                                                data-invalid={errorEntries.some(
                                                    ([key]) =>
                                                        key.startsWith(
                                                            'images.' +
                                                                index +
                                                                '.',
                                                        ),
                                                )}
                                                key={index}
                                                className={`group relative overflow-hidden rounded-lg border-2 transition-all data-[invalid=true]:border-red-500 ${
                                                    image.is_primary
                                                        ? 'border-[#151515] ring-2 ring-[#151515]/20'
                                                        : 'border-zinc-200 hover:border-zinc-300'
                                                }`}
                                            >
                                                {/* Image area */}
                                                <div className="relative flex aspect-[3/4] items-center justify-center bg-zinc-50">
                                                    {getPreview(index) ? (
                                                        <img
                                                            src={
                                                                getPreview(
                                                                    index,
                                                                )!
                                                            }
                                                            className="h-full w-full object-cover"
                                                            alt={image.alt_text}
                                                        />
                                                    ) : (
                                                        <div className="flex flex-col items-center gap-1 text-zinc-300">
                                                            <ImageIcon className="h-7 w-7" />
                                                            <span className="text-[10px]">
                                                                Click to upload
                                                            </span>
                                                        </div>
                                                    )}
                                                    <input
                                                        data-error-field={
                                                            'images.' +
                                                            index +
                                                            '.image'
                                                        }
                                                        aria-invalid={Boolean(
                                                            fieldError(
                                                                'images.' +
                                                                    index +
                                                                    '.image',
                                                            ) ||
                                                            fieldError(
                                                                'images.' +
                                                                    index +
                                                                    '.image_url',
                                                            ),
                                                        )}
                                                        aria-describedby={
                                                            fieldError(
                                                                'images.' +
                                                                    index +
                                                                    '.image',
                                                            )
                                                                ? 'image-' +
                                                                  index +
                                                                  '-image-error'
                                                                : fieldError(
                                                                        'images.' +
                                                                            index +
                                                                            '.image_url',
                                                                    )
                                                                  ? 'image-' +
                                                                    index +
                                                                    '-image_url-error'
                                                                  : undefined
                                                        }
                                                        type="file"
                                                        accept="image/*"
                                                        className="absolute inset-0 cursor-pointer opacity-0"
                                                        onChange={(e) => {
                                                            const file =
                                                                e.target
                                                                    .files?.[0] ??
                                                                null;
                                                            // Store File object for upload — do NOT touch image_url
                                                            updateImage(
                                                                index,
                                                                'image',
                                                                file,
                                                            );
                                                            // Preview via blob URL (local only, never sent to server)
                                                            const next = [
                                                                ...previews,
                                                            ];

                                                            if (
                                                                next[index] &&
                                                                next[
                                                                    index
                                                                ]!.startsWith(
                                                                    'blob:',
                                                                )
                                                            ) {
                                                                URL.revokeObjectURL(
                                                                    next[
                                                                        index
                                                                    ]!,
                                                                );
                                                            }

                                                            next[index] = file
                                                                ? URL.createObjectURL(
                                                                      file,
                                                                  )
                                                                : null;
                                                            setPreviews(next);
                                                        }}
                                                    />
                                                    {/* Remove button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (
                                                                previews[
                                                                    index
                                                                ]?.startsWith(
                                                                    'blob:',
                                                                )
                                                            ) {
                                                                URL.revokeObjectURL(
                                                                    previews[
                                                                        index
                                                                    ]!,
                                                                );
                                                            }

                                                            setData(
                                                                'images',
                                                                data.images.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index,
                                                                ),
                                                            );
                                                            setPreviews(
                                                                previews.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index,
                                                                ),
                                                            );
                                                        }}
                                                        className="absolute top-1.5 right-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-500 opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:border-red-200 hover:text-red-500"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                    {/* Primary badge */}
                                                    {image.is_primary && (
                                                        <div className="absolute bottom-1.5 left-1.5 z-10 rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase">
                                                            Primary
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Controls */}
                                                <div className="space-y-1 border-t border-zinc-100 bg-white px-2 py-1.5">
                                                    <input
                                                        data-error-field={
                                                            'images.' +
                                                            index +
                                                            '.alt_text'
                                                        }
                                                        aria-invalid={Boolean(
                                                            fieldError(
                                                                'images.' +
                                                                    index +
                                                                    '.alt_text',
                                                            ),
                                                        )}
                                                        aria-describedby={
                                                            fieldError(
                                                                'images.' +
                                                                    index +
                                                                    '.alt_text',
                                                            )
                                                                ? 'image-' +
                                                                  index +
                                                                  '-alt_text-error'
                                                                : undefined
                                                        }
                                                        type="text"
                                                        value={image.alt_text}
                                                        onChange={(e) =>
                                                            updateImage(
                                                                index,
                                                                'alt_text',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Alt text"
                                                        className="w-full rounded border border-zinc-100 bg-zinc-50 px-1.5 py-0.5 text-[10px] text-zinc-700 placeholder:text-zinc-300 focus:border-zinc-300 focus:ring-0"
                                                    />
                                                    <div className="flex items-center justify-between">
                                                        <label className="flex cursor-pointer items-center gap-1">
                                                            <input
                                                                data-error-field={
                                                                    'images.' +
                                                                    index +
                                                                    '.is_primary'
                                                                }
                                                                aria-invalid={Boolean(
                                                                    fieldError(
                                                                        'images.' +
                                                                            index +
                                                                            '.is_primary',
                                                                    ),
                                                                )}
                                                                aria-describedby={
                                                                    fieldError(
                                                                        'images.' +
                                                                            index +
                                                                            '.is_primary',
                                                                    )
                                                                        ? 'image-' +
                                                                          index +
                                                                          '-is_primary-error'
                                                                        : undefined
                                                                }
                                                                type="radio"
                                                                checked={
                                                                    image.is_primary
                                                                }
                                                                onChange={() =>
                                                                    setPrimaryImage(
                                                                        index,
                                                                    )
                                                                }
                                                                className="h-3 w-3 accent-[#151515]"
                                                            />
                                                            <span className="text-[10px] text-zinc-500">
                                                                Primary
                                                            </span>
                                                        </label>
                                                        <div className="flex items-center gap-0.5">
                                                            <span className="text-[10px] text-zinc-400">
                                                                Order:
                                                            </span>
                                                            <input
                                                                data-error-field={
                                                                    'images.' +
                                                                    index +
                                                                    '.sort_order'
                                                                }
                                                                aria-invalid={Boolean(
                                                                    fieldError(
                                                                        'images.' +
                                                                            index +
                                                                            '.sort_order',
                                                                    ),
                                                                )}
                                                                aria-describedby={
                                                                    fieldError(
                                                                        'images.' +
                                                                            index +
                                                                            '.sort_order',
                                                                    )
                                                                        ? 'image-' +
                                                                          index +
                                                                          '-sort_order-error'
                                                                        : undefined
                                                                }
                                                                type="number"
                                                                value={
                                                                    image.sort_order
                                                                }
                                                                onChange={(e) =>
                                                                    updateImage(
                                                                        index,
                                                                        'sort_order',
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        ),
                                                                    )
                                                                }
                                                                className="w-8 rounded border border-zinc-100 bg-zinc-50 py-0 text-center text-[10px] focus:border-zinc-300 focus:ring-0"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {errorEntries
                                                    .filter(([key]) =>
                                                        key.startsWith(
                                                            'images.' +
                                                                index +
                                                                '.',
                                                        ),
                                                    )
                                                    .map(([key, message]) => (
                                                        <p
                                                            key={key}
                                                            id={
                                                                'image-' +
                                                                index +
                                                                '-' +
                                                                key
                                                                    .split('.')
                                                                    .at(-1) +
                                                                '-error'
                                                            }
                                                            role="alert"
                                                            className="px-2 py-1 text-xs text-red-600"
                                                        >
                                                            {productErrorLabel(
                                                                key,
                                                                data.variants,
                                                            )}
                                                            : {message}
                                                        </p>
                                                    ))}
                                            </div>
                                        ))}

                                        {/* Add image button */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData('images', [
                                                    ...data.images,
                                                    blankImage(),
                                                ]);
                                                setPreviews([
                                                    ...previews,
                                                    null,
                                                ]);
                                            }}
                                            className="flex aspect-[3/4] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50 text-zinc-400 transition-all hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-600"
                                        >
                                            <Plus className="h-6 w-6" />
                                            <span className="text-[11px] font-medium">
                                                Add Image
                                            </span>
                                        </button>
                                    </div>
                                    {fieldError('images') && (
                                        <p className="mt-3 flex items-center gap-1 text-[11px] text-red-500">
                                            <AlertTriangle className="h-3 w-3" />
                                            {fieldError('images')}
                                        </p>
                                    )}
                                </SectionCard>

                                {/* 6. Product Variants */}
                                <SectionCard
                                    field="variants"
                                    title="Product Variants"
                                    description="Add size/color combinations with individual stock and pricing"
                                    icon={
                                        <Layers className="h-4 w-4 text-zinc-500" />
                                    }
                                >
                                    <div className="overflow-hidden rounded-lg border border-zinc-200">
                                        <div className="overflow-x-auto">
                                            <table className="w-full min-w-[760px] text-xs">
                                                <thead>
                                                    <tr className="border-b border-zinc-200 bg-zinc-50">
                                                        <th className="w-8 px-3 py-2.5 text-left text-[11px] font-medium text-zinc-500"></th>
                                                        <th className="px-3 py-2.5 text-left text-[11px] font-medium text-zinc-500">
                                                            Variant SKU
                                                        </th>
                                                        <th className="px-3 py-2.5 text-left text-[11px] font-medium text-zinc-500">
                                                            Color Name
                                                        </th>
                                                        <th className="w-20 px-3 py-2.5 text-left text-[11px] font-medium text-zinc-500">
                                                            Size
                                                        </th>
                                                        <th className="w-16 px-3 py-2.5 text-center text-[11px] font-medium text-zinc-500">
                                                            Image
                                                        </th>
                                                        <th className="w-24 px-3 py-2.5 text-right text-[11px] font-medium text-zinc-500">
                                                            Price
                                                        </th>
                                                        <th className="w-20 px-3 py-2.5 text-right text-[11px] font-medium text-zinc-500">
                                                            Stock
                                                        </th>
                                                        <th className="w-20 px-3 py-2.5 text-right text-[11px] font-medium text-zinc-500">
                                                            Reserved
                                                        </th>
                                                        <th className="w-16 px-3 py-2.5 text-center text-[11px] font-medium text-zinc-500">
                                                            Active
                                                        </th>
                                                        <th className="w-20 px-3 py-2.5 text-center text-[11px] font-medium text-zinc-500">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-zinc-100 bg-white">
                                                    {data.variants.map(
                                                        (variant, index) => (
                                                            <tr
                                                                aria-invalid={invalidVariantIndexes.includes(
                                                                    index,
                                                                )}
                                                                key={index}
                                                                className="group transition-colors hover:bg-zinc-50/60 aria-[invalid=true]:bg-red-50"
                                                            >
                                                                <td className="px-3 py-2 text-center">
                                                                    <GripVertical className="h-3.5 w-3.5 cursor-grab text-zinc-300" />
                                                                </td>
                                                                <td className="px-3 py-2 font-mono text-xs text-zinc-700">
                                                                    {variant.sku || (
                                                                        <span className="text-zinc-300">
                                                                            —
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <span
                                                                            className="h-3.5 w-3.5 rounded-full border border-zinc-200"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    variant.color_hex ||
                                                                                    '#ffffff',
                                                                            }}
                                                                        />
                                                                        <span className="text-zinc-700">
                                                                            {variant.color_name ||
                                                                                '—'}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    <span className="rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700">
                                                                        {variant.size ||
                                                                            '—'}
                                                                    </span>
                                                                </td>
                                                                <td className="px-3 py-2 text-center">
                                                                    {getVariantPreview(
                                                                        index,
                                                                    ) ? (
                                                                        <img
                                                                            src={
                                                                                getVariantPreview(
                                                                                    index,
                                                                                )!
                                                                            }
                                                                            alt={
                                                                                variant.sku
                                                                            }
                                                                            className="mx-auto h-8 w-8 rounded border border-zinc-200 object-cover"
                                                                        />
                                                                    ) : (
                                                                        <ImageIcon className="mx-auto h-4 w-4 text-zinc-300" />
                                                                    )}
                                                                </td>
                                                                <td className="px-3 py-2 text-right font-mono text-zinc-700">
                                                                    {Number(
                                                                        variant.sale_price ||
                                                                            variant.regular_price ||
                                                                            0,
                                                                    ).toLocaleString(
                                                                        'id-ID',
                                                                    )}
                                                                </td>
                                                                <td className="px-3 py-2 text-right font-mono text-zinc-700">
                                                                    {
                                                                        variant.stock
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2 text-right font-mono text-zinc-500">
                                                                    {
                                                                        variant.reserved_stock
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2 text-center">
                                                                    <Switch
                                                                        checked={
                                                                            variant.is_active
                                                                        }
                                                                        onCheckedChange={(
                                                                            v,
                                                                        ) =>
                                                                            updateVariant(
                                                                                index,
                                                                                'is_active',
                                                                                v,
                                                                            )
                                                                        }
                                                                        className="scale-[0.8] data-[state=checked]:bg-primary"
                                                                    />
                                                                </td>
                                                                <td className="px-3 py-2 text-center">
                                                                    <div className="flex justify-center gap-1">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                openVariantModal(
                                                                                    index,
                                                                                )
                                                                            }
                                                                            className="flex h-6 w-6 items-center justify-center rounded text-zinc-300 transition-all hover:bg-zinc-100 hover:text-zinc-700"
                                                                        >
                                                                            <Pencil className="h-3.5 w-3.5" />
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                const preview =
                                                                                    variantPreviews[
                                                                                        index
                                                                                    ];

                                                                                if (
                                                                                    preview?.startsWith(
                                                                                        'blob:',
                                                                                    )
                                                                                ) {
                                                                                    URL.revokeObjectURL(
                                                                                        preview,
                                                                                    );
                                                                                }

                                                                                setData(
                                                                                    'variants',
                                                                                    data.variants.filter(
                                                                                        (
                                                                                            _,
                                                                                            i,
                                                                                        ) =>
                                                                                            i !==
                                                                                            index,
                                                                                    ),
                                                                                );
                                                                                setVariantPreviews(
                                                                                    variantPreviews.filter(
                                                                                        (
                                                                                            _,
                                                                                            i,
                                                                                        ) =>
                                                                                            i !==
                                                                                            index,
                                                                                    ),
                                                                                );
                                                                            }}
                                                                            className="flex h-6 w-6 items-center justify-center rounded text-zinc-300 transition-all hover:bg-red-50 hover:text-red-500"
                                                                        >
                                                                            <Trash2 className="h-3.5 w-3.5" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )}
                                                    {data.variants.length ===
                                                        0 && (
                                                        <tr>
                                                            <td
                                                                colSpan={10}
                                                                className="px-3 py-8 text-center text-xs text-zinc-400"
                                                            >
                                                                No variants yet.
                                                                Click Add
                                                                Variant to
                                                                create one.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-3 py-2.5">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    openVariantModal()
                                                }
                                                className="h-7 gap-1.5 border-zinc-200 bg-white text-xs text-zinc-700"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                Add Variant
                                            </Button>
                                            <span className="text-[11px] text-zinc-400">
                                                {variantsCount} variant
                                                {variantsCount !== 1
                                                    ? 's'
                                                    : ''}{' '}
                                                with SKU
                                            </span>
                                        </div>
                                    </div>
                                    {fieldError('variants') && (
                                        <p className="mt-2 flex items-center gap-1 text-[11px] text-red-500">
                                            <AlertTriangle className="h-3 w-3" />
                                            {fieldError('variants')}
                                        </p>
                                    )}
                                </SectionCard>

                                {/* Form Actions (bottom) */}
                                <div className="flex items-center justify-between pt-2 pb-8">
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="h-10 border-zinc-200 px-5 text-zinc-600 hover:bg-zinc-50"
                                    >
                                        <Link
                                            href={
                                                isEdit
                                                    ? `/admin/products/${product?.id}`
                                                    : '/admin/products'
                                            }
                                        >
                                            Cancel
                                        </Link>
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        {/* <Button
                                            type="button"
                                            variant="outline"
                                            className="h-10 px-5 border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                                            onClick={() => {
                                                setData('status', 'draft');
                                                submit({ preventDefault: () => {} } as any);
                                            }}
                                            disabled={processing}
                                        >
                                            Save as Draft
                                        </Button> */}
                                        <Button
                                            type="submit"
                                            className="h-10 bg-primary px-6 font-medium text-white shadow-sm hover:bg-primary/90"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <span className="flex items-center gap-2">
                                                    <svg
                                                        className="h-3.5 w-3.5 animate-spin"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        />
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v8H4z"
                                                        />
                                                    </svg>
                                                    Saving...
                                                </span>
                                            ) : isEdit ? (
                                                'Save Changes'
                                            ) : (
                                                'Save Product'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* ── Sidebar ── */}
                            <div className="flex flex-col gap-4 xl:sticky xl:top-[57px]">
                                {/* Publishing */}
                                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                                    <div className="border-b border-zinc-100 px-5 py-4">
                                        <h3 className="text-sm font-semibold text-zinc-900">
                                            Publishing
                                        </h3>
                                        <p className="mt-0.5 text-[11px] text-zinc-500">
                                            Control product visibility
                                        </p>
                                    </div>
                                    <div className="space-y-4 p-5">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-medium text-zinc-700">
                                                Status{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <select
                                                data-error-field="status"
                                                aria-invalid={Boolean(
                                                    errors.status,
                                                )}
                                                aria-describedby={
                                                    errors.status
                                                        ? 'product-status-error'
                                                        : undefined
                                                }
                                                value={data.status}
                                                onChange={(e) =>
                                                    setData(
                                                        'status',
                                                        e.target.value,
                                                    )
                                                }
                                                className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm focus:border-[#151515] focus:ring-1 focus:ring-[#151515] focus:outline-none"
                                            >
                                                {options.statuses.map((s) => (
                                                    <option key={s} value={s}>
                                                        {s
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            s.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.status && (
                                                <p
                                                    id="product-status-error"
                                                    role="alert"
                                                    className="text-xs text-red-600"
                                                >
                                                    {errors.status}
                                                </p>
                                            )}
                                            {errors.status && (
                                                <p className="text-[11px] text-red-500">
                                                    {errors.status}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1.5 rounded-lg border border-zinc-100 bg-zinc-50 p-3 text-[11px] text-zinc-500">
                                            <p>
                                                <span className="font-semibold text-zinc-700">
                                                    Draft
                                                </span>{' '}
                                                — Not visible to customers
                                            </p>
                                            <p>
                                                <span className="font-semibold text-zinc-700">
                                                    Published
                                                </span>{' '}
                                                — Live and visible in store
                                            </p>
                                            <p>
                                                <span className="font-semibold text-zinc-700">
                                                    Archived
                                                </span>{' '}
                                                — Hidden and unavailable
                                            </p>
                                        </div>

                                        <div className="space-y-3 border-t border-zinc-100 pt-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Star
                                                        className={`h-4 w-4 ${data.is_featured ? 'text-amber-500' : 'text-zinc-300'}`}
                                                    />
                                                    <Label
                                                        htmlFor="is_featured"
                                                        className="cursor-pointer text-xs text-zinc-700"
                                                    >
                                                        Featured
                                                    </Label>
                                                </div>
                                                <Switch
                                                    data-error-field="is_featured"
                                                    aria-invalid={Boolean(
                                                        fieldError(
                                                            'is_featured',
                                                        ),
                                                    )}
                                                    id="is_featured"
                                                    checked={data.is_featured}
                                                    onCheckedChange={(v) =>
                                                        setData(
                                                            'is_featured',
                                                            v,
                                                        )
                                                    }
                                                    className="scale-90 data-[state=checked]:bg-primary"
                                                />
                                                {fieldError('is_featured') && (
                                                    <p
                                                        role="alert"
                                                        className="text-xs text-red-600"
                                                    >
                                                        {fieldError(
                                                            'is_featured',
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Sparkles
                                                        className={`h-4 w-4 ${data.is_new_arrival ? 'text-emerald-500' : 'text-zinc-300'}`}
                                                    />
                                                    <Label
                                                        htmlFor="is_new_arrival"
                                                        className="cursor-pointer text-xs text-zinc-700"
                                                    >
                                                        New Arrival
                                                    </Label>
                                                </div>
                                                <Switch
                                                    data-error-field="is_new_arrival"
                                                    aria-invalid={Boolean(
                                                        fieldError(
                                                            'is_new_arrival',
                                                        ),
                                                    )}
                                                    id="is_new_arrival"
                                                    checked={
                                                        data.is_new_arrival
                                                    }
                                                    onCheckedChange={(v) =>
                                                        setData(
                                                            'is_new_arrival',
                                                            v,
                                                        )
                                                    }
                                                    className="scale-90 data-[state=checked]:bg-primary"
                                                />
                                                {fieldError(
                                                    'is_new_arrival',
                                                ) && (
                                                    <p
                                                        role="alert"
                                                        className="text-xs text-red-600"
                                                    >
                                                        {fieldError(
                                                            'is_new_arrival',
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp
                                                        className={`h-4 w-4 ${data.is_best_seller ? 'text-rose-500' : 'text-zinc-300'}`}
                                                    />
                                                    <Label
                                                        htmlFor="is_best_seller"
                                                        className="cursor-pointer text-xs text-zinc-700"
                                                    >
                                                        Best Seller
                                                    </Label>
                                                </div>
                                                <Switch
                                                    data-error-field="is_best_seller"
                                                    aria-invalid={Boolean(
                                                        fieldError(
                                                            'is_best_seller',
                                                        ),
                                                    )}
                                                    id="is_best_seller"
                                                    checked={
                                                        data.is_best_seller
                                                    }
                                                    onCheckedChange={(v) =>
                                                        setData(
                                                            'is_best_seller',
                                                            v,
                                                        )
                                                    }
                                                    className="scale-90 data-[state=checked]:bg-primary"
                                                />
                                                {fieldError(
                                                    'is_best_seller',
                                                ) && (
                                                    <p
                                                        role="alert"
                                                        className="text-xs text-red-600"
                                                    >
                                                        {fieldError(
                                                            'is_best_seller',
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Preview */}
                                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                                    <div className="border-b border-zinc-100 px-5 py-4">
                                        <h3 className="text-sm font-semibold text-zinc-900">
                                            Preview
                                        </h3>
                                        <p className="mt-0.5 text-[11px] text-zinc-500">
                                            How it appears in the store
                                        </p>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex gap-3">
                                            <div className="flex h-20 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
                                                {primaryPreview ? (
                                                    <img
                                                        src={primaryPreview}
                                                        className="h-full w-full object-cover"
                                                        alt="Preview"
                                                    />
                                                ) : (
                                                    <ImageIcon className="h-5 w-5 text-zinc-300" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="mb-0.5 line-clamp-2 text-sm leading-tight font-semibold text-zinc-900">
                                                    {data.name || (
                                                        <span className="text-zinc-300">
                                                            Product Name
                                                        </span>
                                                    )}
                                                </h4>
                                                <p className="mb-1.5 text-[11px] text-zinc-400">
                                                    {options.categories.find(
                                                        (c) =>
                                                            c.id.toString() ===
                                                            data.category_id.toString(),
                                                    )?.name || 'No Category'}
                                                </p>
                                                <div>
                                                    {data.sale_price ? (
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-xs text-zinc-400 line-through">
                                                                IDR{' '}
                                                                {Number(
                                                                    data.regular_price ||
                                                                        0,
                                                                ).toLocaleString(
                                                                    'id-ID',
                                                                )}
                                                            </span>
                                                            <span className="text-sm font-bold text-[#151515]">
                                                                IDR{' '}
                                                                {Number(
                                                                    data.sale_price,
                                                                ).toLocaleString(
                                                                    'id-ID',
                                                                )}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm font-bold text-zinc-900">
                                                            IDR{' '}
                                                            {Number(
                                                                data.regular_price ||
                                                                    0,
                                                            ).toLocaleString(
                                                                'id-ID',
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-1.5 flex flex-wrap gap-1">
                                                    {data.is_featured && (
                                                        <Badge className="border-0 bg-amber-100 px-1.5 py-0 text-[9px] text-amber-700">
                                                            Featured
                                                        </Badge>
                                                    )}
                                                    {data.is_new_arrival && (
                                                        <Badge className="border-0 bg-emerald-100 px-1.5 py-0 text-[9px] text-emerald-700">
                                                            New
                                                        </Badge>
                                                    )}
                                                    {data.is_best_seller && (
                                                        <Badge className="border-0 bg-rose-100 px-1.5 py-0 text-[9px] text-rose-700">
                                                            Best Seller
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Summary */}
                                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                                    <div className="border-b border-zinc-100 px-5 py-4">
                                        <h3 className="text-sm font-semibold text-zinc-900">
                                            Summary
                                        </h3>
                                    </div>
                                    <div className="space-y-0 p-5">
                                        {[
                                            {
                                                icon: (
                                                    <LayoutGrid className="h-3.5 w-3.5" />
                                                ),
                                                label: 'Category',
                                                value:
                                                    options.categories.find(
                                                        (c) =>
                                                            c.id.toString() ===
                                                            data.category_id.toString(),
                                                    )?.name || '—',
                                            },
                                            {
                                                icon: (
                                                    <Layers className="h-3.5 w-3.5" />
                                                ),
                                                label: 'Collections',
                                                value:
                                                    data.collection_ids
                                                        ?.length > 0
                                                        ? options.collections
                                                              .filter((c) =>
                                                                  data.collection_ids.includes(
                                                                      c.id,
                                                                  ),
                                                              )
                                                              .map(
                                                                  (c) => c.name,
                                                              )
                                                              .join(', ')
                                                        : '—',
                                            },
                                            {
                                                icon: (
                                                    <Tag className="h-3.5 w-3.5" />
                                                ),
                                                label: 'SKU',
                                                value: data.sku || '—',
                                            },
                                            {
                                                icon: (
                                                    <DollarSign className="h-3.5 w-3.5" />
                                                ),
                                                label: 'Regular Price',
                                                value: data.regular_price
                                                    ? `IDR ${Number(data.regular_price).toLocaleString('id-ID')}`
                                                    : '—',
                                            },
                                            {
                                                icon: (
                                                    <Package className="h-3.5 w-3.5" />
                                                ),
                                                label: 'Variants',
                                                value: `${variantsCount} with SKU`,
                                            },
                                            {
                                                icon: (
                                                    <ImageIcon className="h-3.5 w-3.5" />
                                                ),
                                                label: 'Images',
                                                value: `${data.images.filter((i) => i.image || i.image_url).length} uploaded`,
                                            },
                                        ].map(({ icon, label, value }) => (
                                            <div
                                                key={label}
                                                className="flex items-center justify-between border-b border-zinc-50 py-2 last:border-0"
                                            >
                                                <span className="flex items-center gap-2 text-[11px] text-zinc-400">
                                                    {icon}
                                                    {label}
                                                </span>
                                                <span className="max-w-[120px] truncate text-right text-[11px] font-medium text-zinc-700">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Save actions (sidebar) */}
                                <div className="flex flex-col gap-2">
                                    {/* <Button
                                        type="submit"
                                        form="product-form"
                                        className="w-full h-10 bg-primary hover:bg-primary/90 text-white font-medium shadow-sm"
                                        disabled={processing}
                                        onClick={() => submit({ preventDefault: () => {} } as any)}
                                    >
                                        {isEdit ? 'Save Changes' : 'Publish Product'}
                                    </Button> */}
                                    {/* <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full h-10 border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                                        onClick={() => {
                                            setData('status', 'draft');
                                            submit({ preventDefault: () => {} } as any);
                                        }}
                                        disabled={processing}
                                    >
                                        Save as Draft
                                    </Button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Dialog
                open={variantModalOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        closeVariantModal();
                    }
                }}
            >
                <DialogContent
                    ref={variantModalRef}
                    onOpenAutoFocus={(event) => {
                        if (requestedField) {
                            event.preventDefault();
                        }
                    }}
                    onCloseAutoFocus={(event) => {
                        event.preventDefault();
                        returnFocusRef.current?.focus();
                    }}
                    className="flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-6xl flex-col gap-0 overflow-hidden rounded-xl border border-zinc-200 bg-white p-0 shadow-2xl sm:max-w-6xl [&>button]:hidden"
                >
                    <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-6 py-4">
                        <div>
                            <DialogTitle className="text-sm font-semibold text-zinc-900">
                                {editingVariantIndex === null
                                    ? 'Add Variant'
                                    : 'Edit Variant — Varian ' +
                                      (editingVariantIndex + 1)}
                            </DialogTitle>
                            <DialogDescription className="mt-0.5 text-xs text-zinc-500">
                                Input size, color, stock, price, and image file.
                            </DialogDescription>
                        </div>
                        <button
                            type="button"
                            onClick={closeVariantModal}
                            aria-label="Tutup modal varian"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto">
                        {(fieldError('variants') ||
                            invalidVariantIndexes.includes(
                                editingVariantIndex ?? -1,
                            )) && (
                            <div
                                data-error-field="variants"
                                tabIndex={-1}
                                className="shrink-0 border-b border-red-200 bg-red-50 px-6 py-3 text-sm text-red-800"
                            >
                                {fieldError('variants') && (
                                    <p>{fieldError('variants')}</p>
                                )}
                                <ul className="mt-1 list-disc pl-5">
                                    {errorEntries
                                        .filter(([key]) =>
                                            key.startsWith(
                                                'variants.' +
                                                    editingVariantIndex +
                                                    '.',
                                            ),
                                        )
                                        .map(([key, message]) => (
                                            <li key={key}>
                                                <button
                                                    type="button"
                                                    className="text-left underline"
                                                    onClick={() =>
                                                        focusProductField(
                                                            key,
                                                            variantModalRef.current ??
                                                                document,
                                                        )
                                                    }
                                                >
                                                    {productErrorLabel(
                                                        key,
                                                        data.variants,
                                                    )}
                                                    : {message}
                                                </button>
                                            </li>
                                        ))}
                                </ul>
                                {invalidVariantIndexes.length > 1 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {invalidVariantIndexes
                                            .filter(
                                                (index) => data.variants[index],
                                            )
                                            .map((index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    disabled={
                                                        index ===
                                                        editingVariantIndex
                                                    }
                                                    className="rounded border border-red-300 px-2 py-1 disabled:bg-red-100"
                                                    onClick={() => {
                                                        saveVariantDraft(false);
                                                        openVariantModal(
                                                            index,
                                                            errorEntries.find(
                                                                ([key]) =>
                                                                    key.startsWith(
                                                                        'variants.' +
                                                                            index +
                                                                            '.',
                                                                    ),
                                                            )?.[0] ?? null,
                                                        );
                                                    }}
                                                >
                                                    Varian {index + 1}
                                                </button>
                                            ))}
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="grid grid-cols-1 gap-4 px-6 py-5 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-x-6">
                            <FieldRow className="lg:col-start-2">
                                <FieldGroup
                                    field={variantField('sku')}
                                    error={variantError('sku')}
                                    label="Variant SKU"
                                    required
                                >
                                    <Input
                                        value={variantDraft.sku}
                                        onChange={(e) =>
                                            setVariantDraft({
                                                ...variantDraft,
                                                sku: e.target.value,
                                            })
                                        }
                                        placeholder="e.g. AXG-HYD-END-BLK-2L"
                                        className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                    />
                                </FieldGroup>
                            </FieldRow>

                            <FieldRow cols={3} className="lg:col-start-2">
                                <FieldGroup
                                    field={variantField('variant_name')}
                                    error={variantError('variant_name')}
                                    label="Variant Name"
                                >
                                    <Input
                                        value={variantDraft.variant_name}
                                        onChange={(e) =>
                                            setVariantDraft({
                                                ...variantDraft,
                                                variant_name: e.target.value,
                                            })
                                        }
                                        placeholder="Black / 2L"
                                        className="h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    field={variantField('size')}
                                    error={variantError('size')}
                                    label="Size"
                                >
                                    <Input
                                        value={variantDraft.size}
                                        onChange={(e) =>
                                            setVariantDraft({
                                                ...variantDraft,
                                                size: e.target.value,
                                            })
                                        }
                                        placeholder="e.g. 2L, 5L, 10L"
                                        className="h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    field={variantField('package_type')}
                                    error={variantError('package_type')}
                                    label="Package Type"
                                >
                                    <Input
                                        value={variantDraft.package_type}
                                        onChange={(e) =>
                                            setVariantDraft({
                                                ...variantDraft,
                                                package_type: e.target.value,
                                            })
                                        }
                                        placeholder="Hydropack, Sling Bag, Waist Bag"
                                        className="h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
                                    />
                                </FieldGroup>
                            </FieldRow>

                            <FieldRow cols={2} className="lg:col-start-2">
                                <FieldGroup
                                    field={variantField('color_name')}
                                    error={variantError('color_name')}
                                    label="Color Name"
                                >
                                    <Input
                                        value={variantDraft.color_name}
                                        onChange={(e) =>
                                            setVariantDraft({
                                                ...variantDraft,
                                                color_name: e.target.value,
                                            })
                                        }
                                        placeholder="e.g. Black, Olive, Sand"
                                        className="h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    field={variantField('color_hex')}
                                    error={variantError('color_hex')}
                                    label="Color Hex"
                                >
                                    <div className="flex h-9 items-center gap-2 rounded-md border border-zinc-200 bg-white px-2 shadow-sm focus-within:border-[#151515] focus-within:ring-1 focus-within:ring-[#151515]">
                                        <input
                                            type="color"
                                            value={
                                                variantDraft.color_hex ||
                                                '#000000'
                                            }
                                            onChange={(e) =>
                                                setVariantDraft({
                                                    ...variantDraft,
                                                    color_hex: e.target.value,
                                                })
                                            }
                                            className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
                                        />
                                        <input
                                            type="text"
                                            value={
                                                variantDraft.color_hex ||
                                                '#000000'
                                            }
                                            onChange={(e) =>
                                                setVariantDraft({
                                                    ...variantDraft,
                                                    color_hex: e.target.value,
                                                })
                                            }
                                            className="h-full flex-1 border-0 bg-transparent p-0 font-mono text-sm text-zinc-700 focus:ring-0"
                                        />
                                    </div>
                                </FieldGroup>
                            </FieldRow>

                            <FieldRow cols={4} className="lg:col-start-2">
                                <FieldGroup
                                    field={variantField('regular_price')}
                                    error={variantError('regular_price')}
                                    label="Regular Price"
                                    required={
                                        String(
                                            variantDraft.sale_price ?? '',
                                        ).trim() !== ''
                                    }
                                >
                                    <Input
                                        type="number"
                                        min="0"
                                        value={variantDraft.regular_price}
                                        onChange={(e) =>
                                            setVariantDraft({
                                                ...variantDraft,
                                                regular_price: e.target.value,
                                            })
                                        }
                                        className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    field={variantField('sale_price')}
                                    error={variantError('sale_price')}
                                    label="Sale Price"
                                >
                                    <Input
                                        type="number"
                                        min="0"
                                        value={variantDraft.sale_price}
                                        onChange={(e) =>
                                            setVariantDraft({
                                                ...variantDraft,
                                                sale_price: e.target.value,
                                            })
                                        }
                                        className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    field={variantField('stock')}
                                    error={variantError('stock')}
                                    label="Stock"
                                >
                                    <Input
                                        type="number"
                                        min="0"
                                        value={variantDraft.stock}
                                        onChange={(e) =>
                                            setVariantDraft({
                                                ...variantDraft,
                                                stock: e.target.value,
                                            })
                                        }
                                        className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    field={variantField('reserved_stock')}
                                    error={variantError('reserved_stock')}
                                    label="Reserved"
                                >
                                    <Input
                                        type="number"
                                        min="0"
                                        value={variantDraft.reserved_stock}
                                        onChange={(e) =>
                                            setVariantDraft({
                                                ...variantDraft,
                                                reserved_stock: e.target.value,
                                            })
                                        }
                                        className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                    />
                                </FieldGroup>
                            </FieldRow>

                            <FieldRow cols={4} className="lg:col-start-2">
                                {(
                                    [
                                        'weight',
                                        'length',
                                        'width',
                                        'height',
                                    ] as const
                                ).map((field) => (
                                    <FieldGroup
                                        field={variantField(field)}
                                        error={variantError(field)}
                                        required
                                        key={field}
                                        label={
                                            field === 'weight'
                                                ? 'Weight (g)'
                                                : `${field[0].toUpperCase()}${field.slice(1)} (cm)`
                                        }
                                    >
                                        <Input
                                            type="number"
                                            min="0"
                                            value={variantDraft[field]}
                                            required
                                            onChange={(e) =>
                                                setVariantDraft({
                                                    ...variantDraft,
                                                    [field]: e.target.value,
                                                })
                                            }
                                            className="h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
                                        />
                                    </FieldGroup>
                                ))}
                            </FieldRow>

                            <div className="order-first rounded-xl border border-zinc-200 bg-zinc-50/70 p-5 lg:col-start-1 lg:row-span-6 lg:row-start-1 lg:self-start">
                                <FieldGroup
                                    field={variantField('image')}
                                    error={
                                        variantError('image') ||
                                        variantError('image_url')
                                    }
                                    label="Variant Image"
                                    hint="Stored in Laravel public storage. JPG, PNG, WEBP up to 4MB."
                                >
                                    <label
                                        htmlFor="variant-image-input"
                                        className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border border-dashed border-zinc-300 bg-white p-5 text-center transition-colors hover:border-primary hover:bg-primary/5"
                                    >
                                        {variantDraftPreview ? (
                                            <img
                                                src={variantDraftPreview}
                                                alt="Variant preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <>
                                                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
                                                    <ImageIcon className="h-7 w-7 text-zinc-500" />
                                                </span>
                                                <span className="text-sm font-medium text-zinc-700">
                                                    Drag & drop an image here
                                                </span>
                                                <span className="text-xs text-zinc-400">
                                                    or click to browse
                                                </span>
                                            </>
                                        )}
                                    </label>
                                    <div className="space-y-2">
                                        <Input
                                            id="variant-image-input"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0] ?? null;
                                                const isSavedPreview =
                                                    variantPreviews.some(
                                                        (preview) =>
                                                            preview ===
                                                            variantDraftPreview,
                                                    );

                                                if (
                                                    variantDraftPreview?.startsWith(
                                                        'blob:',
                                                    ) &&
                                                    !isSavedPreview
                                                ) {
                                                    URL.revokeObjectURL(
                                                        variantDraftPreview,
                                                    );
                                                }

                                                setVariantDraft({
                                                    ...variantDraft,
                                                    image: file,
                                                });
                                                setVariantDraftPreview(
                                                    file
                                                        ? URL.createObjectURL(
                                                              file,
                                                          )
                                                        : variantDraft.image_url ||
                                                              null,
                                                );
                                            }}
                                            className="h-10 border-zinc-200 bg-white text-sm file:mr-3 file:rounded file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-xs file:text-zinc-700 hover:file:bg-zinc-200"
                                        />
                                        {variantDraft.image_url && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const isSavedPreview =
                                                        variantPreviews.some(
                                                            (preview) =>
                                                                preview ===
                                                                variantDraftPreview,
                                                        );

                                                    if (
                                                        variantDraftPreview?.startsWith(
                                                            'blob:',
                                                        ) &&
                                                        !isSavedPreview
                                                    ) {
                                                        URL.revokeObjectURL(
                                                            variantDraftPreview,
                                                        );
                                                    }

                                                    setVariantDraft({
                                                        ...variantDraft,
                                                        image: null,
                                                        image_url: '',
                                                    });
                                                    setVariantDraftPreview(
                                                        null,
                                                    );
                                                }}
                                                className="text-xs font-medium text-red-500 hover:text-red-600"
                                            >
                                                Remove current image
                                            </button>
                                        )}
                                    </div>
                                </FieldGroup>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 lg:col-start-2">
                                <Label className="cursor-pointer text-xs font-medium text-zinc-700">
                                    Active Variant
                                </Label>
                                <Switch
                                    data-error-field={variantField('is_active')}
                                    aria-invalid={Boolean(
                                        variantError('is_active'),
                                    )}
                                    aria-describedby={
                                        variantError('is_active')
                                            ? 'variant-active-error'
                                            : undefined
                                    }
                                    checked={variantDraft.is_active}
                                    onCheckedChange={(value) =>
                                        setVariantDraft({
                                            ...variantDraft,
                                            is_active: value,
                                        })
                                    }
                                    className="scale-90 data-[state=checked]:bg-primary"
                                />
                                {variantError('is_active') && (
                                    <p
                                        id="variant-active-error"
                                        role="alert"
                                        className="text-xs text-red-600"
                                    >
                                        {variantError('is_active')}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center justify-end gap-2 border-t border-zinc-100 bg-zinc-50 px-6 py-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeVariantModal}
                            className="h-9 border-zinc-200 px-4 text-xs text-zinc-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={() => saveVariantDraft()}
                            className="h-9 bg-primary px-5 text-xs font-medium text-white hover:bg-primary/90"
                        >
                            {editingVariantIndex === null
                                ? 'Add Variant'
                                : 'Save Changes'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
