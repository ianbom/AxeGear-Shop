import { Head, Link, useForm } from '@inertiajs/react';
import { ImageIcon, Save, Upload, X } from 'lucide-react';
import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PageHeader } from '@/pages/admin/catalog/shared';

type Product = {
    id: number;
    name: string;
    slug: string;
    sku: string | null;
    regular_price: string;
    sale_price: string | null;
    image_url: string | null;
};
type Variant = {
    id: number;
    product_id: number;
    product: string | null;
    sku: string;
    variant_name: string | null;
    color_name: string | null;
    color_hex: string | null;
    size: string | null;
    package_type: string | null;
    regular_price: string | null;
    sale_price: string | null;
    stock: number;
    reserved_stock: number;
    weight: number | null;
    length: number | null;
    width: number | null;
    height: number | null;
    image_url: string | null;
    is_active: boolean;
};

type Props = {
    mode: 'create' | 'edit';
    variant: Variant | null;
    products: Product[];
    selectedProductId: number | null;
};

const formatPrice = (price: string | null) =>
    price === null
        ? '—'
        : new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
          }).format(Number(price));

export default function ProductVariantForm({
    mode,
    variant,
    products,
    selectedProductId,
}: Props) {
    const isEdit = mode === 'edit' && variant !== null;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(
        variant?.image_url ?? null,
    );

    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'PUT' : 'POST',
        product_id: variant?.product_id ?? selectedProductId ?? '',
        sku: variant?.sku ?? '',
        variant_name: variant?.variant_name ?? 'Default Title',
        color_name: variant?.color_name ?? '',
        color_hex: variant?.color_hex ?? '',
        size: variant?.size ?? '',
        package_type: variant?.package_type ?? '',
        regular_price: variant?.regular_price ?? '',
        sale_price: variant?.sale_price ?? '',
        stock: variant?.stock ?? 0,
        reserved_stock: variant?.reserved_stock ?? 0,
        weight: variant?.weight ?? '',
        length: variant?.length ?? '',
        width: variant?.width ?? '',
        height: variant?.height ?? '',
        image: null as File | null,
        is_active: variant?.is_active ?? true,
    });
    const selectedProduct =
        products.find(
            (product) => String(product.id) === String(data.product_id),
        ) ?? null;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setData('image', file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const clearImage = () => {
        setData('image', null);
        setPreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = isEdit
            ? `/admin/product-variants/${variant.id}`
            : '/admin/product-variants';
        post(url, { forceFormData: true });
    };

    return (
        <>
            <Head title={isEdit ? 'Edit Variant' : 'Create Variant'} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    eyebrow="Catalog Management"
                    title={isEdit ? 'Edit Variant' : 'Create Variant'}
                    description="SKU varian unik, stok tidak negatif, dan reserved stock tidak boleh lebih besar dari stok."
                />
                <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                    <Card className="min-w-0">
                        <CardHeader>
                            <CardTitle>Variant Information</CardTitle>
                            <CardDescription>
                                Perubahan stok melalui form ini tetap dicatat ke
                                stock logs.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="flex flex-col gap-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="product_id">Product</Label>
                                    <Select
                                        value={
                                            data.product_id === ''
                                                ? undefined
                                                : String(data.product_id)
                                        }
                                        onValueChange={(value) =>
                                            setData('product_id', value)
                                        }
                                    >
                                        <SelectTrigger
                                            id="product_id"
                                            className="w-full min-w-0"
                                            aria-invalid={Boolean(
                                                errors.product_id,
                                            )}
                                        >
                                            <SelectValue placeholder="Select product" />
                                        </SelectTrigger>
                                        <SelectContent className="w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]">
                                            {products.map((product) => (
                                                <SelectItem
                                                    key={product.id}
                                                    value={String(product.id)}
                                                    className="min-w-0"
                                                >
                                                    <span className="block max-w-full truncate">
                                                        {product.name}
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.product_id} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input
                                        id="sku"
                                        value={data.sku}
                                        placeholder="e.g. AXG-HYD-END-BLK-2L"
                                        onChange={(event) =>
                                            setData('sku', event.target.value)
                                        }
                                    />
                                    <InputError message={errors.sku} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="variant_name">
                                        Variant Name
                                    </Label>
                                    <Input
                                        id="variant_name"
                                        value={data.variant_name}
                                        placeholder="Black / 2L"
                                        onChange={(event) =>
                                            setData('variant_name', event.target.value)
                                        }
                                    />
                                    <InputError message={errors.variant_name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="color_name">
                                        Color Name
                                    </Label>
                                    <Input
                                        id="color_name"
                                        value={data.color_name}
                                        placeholder="e.g. Black, Olive, Sand"
                                        onChange={(event) =>
                                            setData(
                                                'color_name',
                                                event.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="color_hex">Color Hex</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            id="color_hex"
                                            type="color"
                                            value={data.color_hex || '#000000'}
                                            onChange={(event) =>
                                                setData(
                                                    'color_hex',
                                                    event.target.value,
                                                )
                                            }
                                            className="h-9 w-14 p-1"
                                        />
                                        <Input
                                            value={data.color_hex || '#000000'}
                                            placeholder="#000000"
                                            readOnly
                                            className="font-mono text-xs"
                                        />
                                    </div>
                                    <InputError message={errors.color_hex} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="size">Size</Label>
                                    <Input
                                        id="size"
                                        value={data.size}
                                        placeholder="e.g. 2L, 5L, 10L"
                                        onChange={(event) =>
                                            setData('size', event.target.value)
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="package_type">
                                        Package Type
                                    </Label>
                                    <Input
                                        id="package_type"
                                        value={data.package_type}
                                        placeholder="Hydropack, Sling Bag, Waist Bag"
                                        onChange={(event) =>
                                            setData('package_type', event.target.value)
                                        }
                                    />
                                    <InputError message={errors.package_type} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="regular_price">
                                        Regular Price
                                    </Label>
                                    <Input
                                        id="regular_price"
                                        type="number"
                                        min="0"
                                        value={data.regular_price}
                                        placeholder="0"
                                        onChange={(event) =>
                                            setData(
                                                'regular_price',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={errors.regular_price} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="sale_price">
                                        Sale Price
                                    </Label>
                                    <Input
                                        id="sale_price"
                                        type="number"
                                        min="0"
                                        value={data.sale_price}
                                        placeholder="Leave empty for no sale"
                                        onChange={(event) =>
                                            setData('sale_price', event.target.value)
                                        }
                                    />
                                    <InputError message={errors.sale_price} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        min="0"
                                        value={data.stock}
                                        placeholder="0"
                                        onChange={(event) =>
                                            setData(
                                                'stock',
                                                Number(event.target.value),
                                            )
                                        }
                                    />
                                    <InputError message={errors.stock} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="reserved_stock">
                                        Reserved Stock
                                    </Label>
                                    <Input
                                        id="reserved_stock"
                                        type="number"
                                        min="0"
                                        value={data.reserved_stock}
                                        placeholder="0"
                                        onChange={(event) =>
                                            setData(
                                                'reserved_stock',
                                                Number(event.target.value),
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.reserved_stock}
                                    />
                                </div>
                                {(['weight', 'length', 'width', 'height'] as const).map((field) => (
                                    <div key={field} className="grid gap-2">
                                        <Label htmlFor={field}>
                                            {field === 'weight'
                                                ? 'Weight (g)'
                                                : `${field[0].toUpperCase()}${field.slice(1)} (cm)`}
                                        </Label>
                                        <Input
                                            id={field}
                                            type="number"
                                            min="0"
                                            value={data[field]}
                                            placeholder="0"
                                            onChange={(event) =>
                                                setData(field, event.target.value)
                                            }
                                        />
                                        <InputError message={errors[field]} />
                                    </div>
                                ))}
                            </div>

                            {/* Image Upload */}
                            <div className="grid gap-2 md:col-span-2">
                                <Label>Variant Image</Label>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                                    {/* Preview */}
                                    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                                        {preview ? (
                                            <>
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={clearImage}
                                                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </>
                                        ) : (
                                            <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
                                        )}
                                    </div>

                                    {/* Drop zone */}
                                    <div
                                        className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition hover:border-primary/60 hover:bg-muted/50"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        <Upload className="h-6 w-6 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                            Klik untuk upload atau drag &amp;
                                            drop gambar
                                        </p>
                                        <p className="text-xs text-muted-foreground/60">
                                            JPG, PNG, WEBP — maks. 2 MB
                                        </p>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                <InputError message={errors.image} />
                            </div>

                            <label className="flex items-start gap-3 rounded-lg border p-4 text-sm">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(event) =>
                                        setData(
                                            'is_active',
                                            event.target.checked,
                                        )
                                    }
                                    className="mt-1"
                                />
                                <span>
                                    <span className="block font-medium">
                                        Active variant
                                    </span>
                                    <span className="text-muted-foreground">
                                        Varian aktif bisa tampil dan dibeli
                                        customer jika stok tersedia.
                                    </span>
                                </span>
                            </label>

                                <div className="flex justify-end gap-3 border-t pt-5">
                                    <Button asChild type="button" variant="outline">
                                        <Link href="/admin/product-variants">
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        <Save />
                                        Save Variant
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {selectedProduct && (
                        <Card className="min-w-0 overflow-hidden xl:sticky xl:top-6">
                            <CardHeader>
                                <CardTitle>Product Summary</CardTitle>
                                <CardDescription>
                                    Product yang menerima variant ini.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-5">
                                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border bg-muted">
                                    {selectedProduct.image_url ? (
                                        <img
                                            src={selectedProduct.image_url}
                                            alt={selectedProduct.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <ImageIcon className="h-12 w-12 text-muted-foreground/40" />
                                    )}
                                </div>
                                <div className="grid min-w-0 gap-4 text-sm">
                                    <SummaryItem
                                        label="Name"
                                        value={selectedProduct.name}
                                    />
                                    <SummaryItem
                                        label="Slug"
                                        value={selectedProduct.slug}
                                        mono
                                    />
                                    <SummaryItem
                                        label="SKU"
                                        value={selectedProduct.sku ?? '—'}
                                        mono
                                    />
                                    <SummaryItem
                                        label="Price"
                                        value={formatPrice(
                                            selectedProduct.regular_price,
                                        )}
                                    />
                                    <SummaryItem
                                        label="Sale Price"
                                        value={formatPrice(
                                            selectedProduct.sale_price,
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}

function SummaryItem({
    label,
    value,
    mono = false,
}: {
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div className="min-w-0 border-b pb-3 last:border-0 last:pb-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
            </p>
            <p
                className={`mt-1 break-words font-medium text-foreground ${mono ? 'font-mono text-xs' : ''}`}
            >
                {value}
            </p>
        </div>
    );
}
