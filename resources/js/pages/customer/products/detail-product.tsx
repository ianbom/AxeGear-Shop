import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Bell,
    ChevronDown,
    ChevronUp,
    Gem,
    Heart,
    Home,
    MessageCircle,
    Minus,
    Plus,
    Search,
    Store,
    X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType, FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';

import { addProductVariantToCart as addProductVariantToCartRoute } from '@/actions/App/Http/Controllers/Customer/CartController';
import {
    destroyProduct as removeWishlistProduct,
    store as addWishlistItem,
} from '@/actions/App/Http/Controllers/Customer/WishlistController';
import HTMLRender from '@/components/HTMLRender';
import ShopLayout from '@/layouts/shop-layout';
import { cart, detail, list } from '@/routes';

type Variant = {
    id: number;
    sku: string | null;
    color_name: string | null;
    color_hex: string | null;
    size: string | null;
    additional_price?: number | null;
    regular_price?: number | null;
    sale_price?: number | null;
    package_type?: string | null;
    stock: number;
    reserved_stock: number;
    available_stock: number;
    cart_quantity: number;
    image_url: string | null;
};

type ProductCard = {
    id: number;
    slug: string;
    title: string;
    sku: string | null;
    price: number;
    sale_price: number | null;
    image: string | null;
    badge: string | null;
    category: string | null;
    category_slug: string | null;
    collection: string | null;
    collection_slug: string | null;
    colors: Array<{
        name: string | null;
        hex: string;
    }>;
    sizes: string[];
    available_stock: number;
};

type ProductDetail = ProductCard & {
    short_description: string | null;
    description: string | null;
    material: string | null;
    care_instruction: string | null;
    weight: number | null;
    dimensions: {
        length: number | null;
        width: number | null;
        height: number | null;
    };
    images: Array<{
        url: string;
        alt: string;
    }>;
    variants: Variant[];
    is_wishlisted: boolean;
};

type Props = {
    product: ProductDetail;
    relatedProducts: ProductCard[];
    recentProducts: ProductCard[];
};

type IconType = ComponentType<{
    className?: string;
    size?: number;
    strokeWidth?: number;
}>;

const fallbackImages = [
    'https://www.100percent.com/cdn/shop/files/59057-00001-P_1.jpg?v=1764788225&width=1100',
    'https://www.100percent.com/cdn/shop/files/SP26_SPEEDCRAFT_SL_60008-00025_3Q.jpg?v=1772487312&width=500',
    'https://www.100percent.com/cdn/shop/files/2000x2000-eComm_20PDP-Casual_Staple_20Tee_0010_Layer_2015.jpg?v=1764633157&width=1200',
    'https://www.100percent.com/cdn/shop/files/2000x2000-eComm_20PDP-Casual_Region_20Tee_0001_Layer_2030.jpg?v=1764633177&width=1200',
    'https://www.100percent.com/cdn/shop/files/FA25_LS_OS_TEE_REGION__2020142-10002_F-002.jpg?v=1764633155&width=1100',
];

const formatPrice = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);

const uniqueValues = (values: Array<string | null>) =>
    Array.from(new Set(values.filter(Boolean))) as string[];

export default function DetailProduct({
    product,
    relatedProducts,
    recentProducts,
}: Props) {
    return (
        <DetailProductContent
            key={product.id}
            product={product}
            relatedProducts={relatedProducts}
            recentProducts={recentProducts}
        />
    );
}

function DetailProductContent({
    product,
    relatedProducts,
    recentProducts,
}: Props) {
    const variants = useMemo(
        () =>
            [...product.variants].sort((left, right) => {
                const leftAvailable = left.available_stock > 0 ? 1 : 0;
                const rightAvailable = right.available_stock > 0 ? 1 : 0;

                if (leftAvailable !== rightAvailable) {
                    return rightAvailable - leftAvailable;
                }

                return left.id - right.id;
            }),
        [product.variants],
    );
    const gallery = useMemo(() => {
        const images = product.images.length > 0 ? product.images : [];

        if (images.length > 0) {
            return images;
        }

        return [
            {
                url: product.image ?? fallbackImages[0],
                alt: product.title,
            },
        ];
    }, [product]);
    const colorVariants = useMemo(
        () =>
            variants
                .filter((variant) => variant.color_name || variant.color_hex)
                .filter(
                    (variant, index, variants) =>
                        variants.findIndex(
                            (candidate) =>
                                candidate.color_name === variant.color_name &&
                                candidate.color_hex === variant.color_hex,
                        ) === index,
                ),
        [variants],
    );
    const initialVariant = useMemo(
        () =>
            variants.find((variant) => variant.available_stock > 0) ??
            variants[0],
        [variants],
    );
    const [mainImage, setMainImage] = useState(
        gallery[0]?.url ?? fallbackImages[0],
    );
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
        initialVariant?.id ?? null,
    );
    const [quantity, setQuantity] = useState(1);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(product.is_wishlisted);
    const [isWishlistProcessing, setIsWishlistProcessing] = useState(false);
    const cartForm = useForm<{
        quantity: number;
        product_variant_id?: number;
    }>({
        quantity: 1,
    });

    const selectedVariant = useMemo(
        () =>
            variants.find((variant) => variant.id === selectedVariantId) ??
            initialVariant,
        [initialVariant, selectedVariantId, variants],
    );
    const selectedColor = selectedVariant?.color_name ?? '';
    const selectedSize = selectedVariant?.size ?? '';
    const sizes = useMemo(
        () =>
            uniqueValues(
                variants
                    .filter(
                        (variant) =>
                            selectedColor === '' ||
                            variant.color_name === selectedColor,
                    )
                    .map((variant) => variant.size),
            ),
        [selectedColor, variants],
    );

    const variantPrice =
        selectedVariant?.sale_price ??
        selectedVariant?.regular_price ??
        (product.sale_price ?? product.price) +
            (selectedVariant?.additional_price ?? 0);
    const basePrice =
        selectedVariant?.regular_price ??
        product.price + (selectedVariant?.additional_price ?? 0);
    const selectedAvailableStock =
        selectedVariant?.available_stock ?? product.available_stock;
    const selectedCartQuantity = selectedVariant?.cart_quantity ?? 0;
    const remainingStock = Math.max(
        0,
        selectedAvailableStock - selectedCartQuantity,
    );
    const maxQuantity = Math.max(1, selectedAvailableStock);
    const effectiveQuantity = Math.min(quantity, maxQuantity);
    const cartStockExceeded =
        selectedVariant !== undefined &&
        selectedCartQuantity + effectiveQuantity > selectedAvailableStock;
    const isAvailable =
        product.available_stock > 0 && selectedAvailableStock > 0;
    const productDescription = product.description || product.short_description;
    const railProducts =
        relatedProducts.length > 0 ? relatedProducts : recentProducts;

    const decreaseQuantity = () => {
        const nextQuantity = Math.max(1, effectiveQuantity - 1);

        setQuantity(nextQuantity);
        cartForm.setData('quantity', nextQuantity);
    };
    const increaseQuantity = () => {
        const nextQuantity = Math.min(maxQuantity, effectiveQuantity + 1);

        setQuantity(nextQuantity);
        cartForm.setData('quantity', nextQuantity);
    };
    const selectVariant = (variantId: number | null) => {
        setSelectedVariantId(variantId);
        setQuantity(1);
        cartForm.setData('quantity', 1);

        const nextVariant = variants.find(
            (variant) => variant.id === variantId,
        );

        if (nextVariant?.image_url) {
            setMainImage(nextVariant.image_url);
        }
    };

    const addProductVariantToCart = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedVariant || !isAvailable || cartForm.processing) {
            return;
        }

        if (cartStockExceeded) {
            toast.error('Cart quantity exceeds available stock.');

            return;
        }

        cartForm.setData('quantity', effectiveQuantity);
        cartForm.submit(addProductVariantToCartRoute(selectedVariant.id), {
            preserveScroll: true,
        });
    };

    const buyItNow = () => {
        if (!selectedVariant || !isAvailable || cartForm.processing) {
            return;
        }

        if (selectedCartQuantity > 0) {
            router.visit(cart.url());

            return;
        }

        if (cartStockExceeded) {
            toast.error('Cart quantity exceeds available stock.');

            return;
        }

        cartForm.setData('quantity', effectiveQuantity);
        cartForm.submit(addProductVariantToCartRoute(selectedVariant.id), {
            preserveScroll: true,
            onSuccess: () => router.visit(cart.url()),
        });
    };

    const toggleWishlist = () => {
        if (isWishlistProcessing) {
            return;
        }

        setIsWishlistProcessing(true);

        const options = {
            preserveScroll: true,
            onSuccess: () => setIsWishlisted((current) => !current),
            onFinish: () => setIsWishlistProcessing(false),
        };

        if (isWishlisted) {
            router.delete(removeWishlistProduct.url(product.id), options);

            return;
        }

        router.post(addWishlistItem.url(product.id), {}, options);
    };

    return (
        <ShopLayout>
            <Head title={`${product.title} - AxeGear`} />

            <main className="bg-white text-[#1A1A1A]">
                <div className="mx-auto max-w-[1760px] px-4 py-5 md:px-8 md:py-6">
                    <Breadcrumb product={product} />

                    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12 xl:grid-cols-[940px_1fr]">
                        <div className="space-y-6">
                            <FadeInOnScroll>
                                <ProductGallery
                                    gallery={gallery}
                                    mainImage={mainImage}
                                    productTitle={product.title}
                                    onSelectImage={setMainImage}
                                />
                            </FadeInOnScroll>

                            <FadeInOnScroll delay={40}>
                                <ProductSpecs
                                    product={product}
                                    selectedVariant={selectedVariant}
                                    productDescription={productDescription}
                                />
                            </FadeInOnScroll>
                        </div>

                        <FadeInOnScroll delay={80}>
                            <section className="pt-1 lg:pt-6">
                                <ProductHeader
                                    product={product}
                                    price={variantPrice}
                                    basePrice={basePrice}
                                    isWishlisted={isWishlisted}
                                    isWishlistProcessing={isWishlistProcessing}
                                    onToggleWishlist={toggleWishlist}
                                />

                                {colorVariants.length > 0 && (
                                    <StylePicker
                                        variants={variants}
                                        colorVariants={colorVariants}
                                        selectedColor={selectedColor}
                                        productImage={product.image}
                                        galleryImage={gallery[0]?.url}
                                        onSelectVariant={selectVariant}
                                    />
                                )}

                                {sizes.length > 0 && (
                                    <SizePicker
                                        sizes={sizes}
                                        variants={variants}
                                        selectedColor={selectedColor}
                                        selectedSize={selectedSize}
                                        onSelectVariant={selectVariant}
                                        onOpenSizeGuide={() =>
                                            setIsSizeGuideOpen(true)
                                        }
                                    />
                                )}

                                <form
                                    onSubmit={addProductVariantToCart}
                                    className="mt-5 border-y border-[#CFCFCF] py-4"
                                >
                                    <div className="grid gap-3 sm:grid-cols-[92px_160px_1fr] sm:items-center">
                                        <label className="text-sm font-black">
                                            Quantity
                                        </label>
                                        <QuantityControl
                                            quantity={effectiveQuantity}
                                            onDecrease={decreaseQuantity}
                                            onIncrease={increaseQuantity}
                                            disableDecrease={quantity <= 1}
                                            disableIncrease={
                                                effectiveQuantity >=
                                                    maxQuantity || !isAvailable
                                            }
                                        />
                                        <button
                                            type="submit"
                                            disabled={
                                                !isAvailable ||
                                                !selectedVariant ||
                                                cartForm.processing
                                            }
                                            className="h-12 bg-[#F58220] px-8 text-sm font-black tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#E67312] disabled:bg-[#CFCFCF] disabled:text-[#707070]"
                                        >
                                            {cartForm.processing
                                                ? 'Adding...'
                                                : 'Add to Cart'}
                                        </button>
                                    </div>
                                    {cartForm.errors.product_variant_id && (
                                        <p className="mt-3 text-sm font-bold text-[#C81E1E]">
                                            {cartForm.errors.product_variant_id}
                                        </p>
                                    )}
                                    {selectedCartQuantity > 0 && (
                                        <p
                                            className={`mt-3 text-sm font-bold ${
                                                cartStockExceeded
                                                    ? 'text-[#C81E1E]'
                                                    : 'text-[#707070]'
                                            }`}
                                        >
                                            {cartStockExceeded
                                                ? 'Cart quantity exceeds available stock.'
                                                : `In cart: ${selectedCartQuantity}. Remaining stock: ${remainingStock}.`}
                                        </p>
                                    )}
                                </form>

                                <button
                                    type="button"
                                    onClick={buyItNow}
                                    disabled={
                                        !isAvailable ||
                                        !selectedVariant ||
                                        cartForm.processing
                                    }
                                    className="sr-only"
                                >
                                    Buy it now
                                </button>

                                <ServiceStrip isAvailable={isAvailable} />
                            </section>
                        </FadeInOnScroll>
                    </div>

                    <OtherStyles products={railProducts} />
                </div>
            </main>

            {isSizeGuideOpen && (
                <SizeGuideModal onClose={() => setIsSizeGuideOpen(false)} />
            )}
        </ShopLayout>
    );
}

function Breadcrumb({ product }: { product: ProductDetail }) {
    return (
        <nav className="mb-6 flex flex-wrap items-center gap-3 text-sm font-medium text-[#1A1A1A]">
            <Link href={list.url()} className="hover:text-[#F58220]">
                Shop
            </Link>
            <span className="text-[#707070]">/</span>
            {product.category && (
                <>
                    <Link
                        href={list.url({
                            query: { category: product.category_slug },
                        })}
                        className="hover:text-[#F58220]"
                    >
                        {product.category}
                    </Link>
                    <span className="text-[#707070]">/</span>
                </>
            )}
            <span>{product.collection ?? product.title}</span>
        </nav>
    );
}

function ProductGallery({
    gallery,
    mainImage,
    productTitle,
    onSelectImage,
}: {
    gallery: Array<{ url: string; alt: string }>;
    mainImage: string;
    productTitle: string;
    onSelectImage: (image: string) => void;
}) {
    const galleryItems = gallery.slice(0, 6);

    return (
        <section className="grid gap-4 md:grid-cols-[110px_1fr]">
            <div className="order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:flex-col md:items-center md:overflow-visible md:pb-0">
                <button
                    type="button"
                    className="hidden h-8 w-8 items-center justify-center md:flex"
                    aria-label="Previous thumbnails"
                >
                    <ChevronUp size={22} strokeWidth={1.8} />
                </button>
                {galleryItems.map((image, index) => (
                    <button
                        key={`${image.url}-${index}`}
                        type="button"
                        onClick={() => onSelectImage(image.url)}
                        className={`h-[84px] w-[100px] shrink-0 border bg-white p-2 transition-colors md:h-[90px] md:w-[104px] ${
                            mainImage === image.url
                                ? 'border-[#F58220]'
                                : 'border-[#D8D8D8] hover:border-[#1A1A1A]'
                        }`}
                    >
                        <img
                            src={image.url}
                            alt={image.alt}
                            className="h-full w-full object-contain"
                            loading="lazy"
                            decoding="async"
                        />
                    </button>
                ))}
                <button
                    type="button"
                    className="hidden h-8 w-8 items-center justify-center md:flex"
                    aria-label="Next thumbnails"
                >
                    <ChevronDown size={22} strokeWidth={1.8} />
                </button>
            </div>

            <div className="group relative order-1 flex min-h-[420px] items-center justify-center border border-[#D8D8D8] bg-white p-5 md:order-2 lg:min-h-[560px] xl:min-h-[640px]">
                <img
                    src={mainImage}
                    alt={productTitle}
                    className="h-full max-h-[620px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    decoding="async"
                />
                <button
                    type="button"
                    className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#D8D8D8] bg-white text-[#1A1A1A] transition-colors hover:border-[#F58220] hover:text-[#F58220]"
                    aria-label="Zoom product image"
                >
                    <Search size={24} strokeWidth={1.8} />
                </button>
            </div>
        </section>
    );
}

function ProductHeader({
    product,
    price,
    basePrice,
    isWishlisted,
    isWishlistProcessing,
    onToggleWishlist,
}: {
    product: ProductDetail;
    price: number;
    basePrice: number;
    isWishlisted: boolean;
    isWishlistProcessing: boolean;
    onToggleWishlist: () => void;
}) {
    const hasSale = product.sale_price !== null || price < basePrice;

    return (
        <header className="relative pr-14">
            <p className="mb-3 text-xs font-black tracking-[0.08em] text-[#F58220] uppercase">
                {product.collection ?? product.category ?? 'AxeGear Series'}
            </p>
            <h1 className="max-w-[720px] text-[30px] leading-[0.98] font-black tracking-normal text-[#1A1A1A] uppercase md:text-[38px]">
                {product.title}
            </h1>
            <button
                type="button"
                onClick={onToggleWishlist}
                disabled={isWishlistProcessing}
                className="absolute top-8 right-0 flex h-11 w-11 items-center justify-center text-[#1A1A1A] transition-colors hover:text-[#F58220] disabled:opacity-45"
                aria-label={
                    isWishlisted
                        ? 'Remove product from wishlist'
                        : 'Add product to wishlist'
                }
            >
                <Heart
                    size={29}
                    fill={isWishlisted ? 'currentColor' : 'none'}
                    strokeWidth={1.7}
                />
            </button>

            <div className="mt-5 flex flex-wrap items-end gap-3">
                <span className="text-[28px] leading-none font-black tabular-nums">
                    {formatPrice(price)}
                </span>
                {hasSale && (
                    <span className="text-base font-bold text-[#9A9A9A] tabular-nums line-through">
                        {formatPrice(basePrice)}
                    </span>
                )}
            </div>
        </header>
    );
}

function StylePicker({
    variants,
    colorVariants,
    selectedColor,
    productImage,
    galleryImage,
    onSelectVariant,
}: {
    variants: Variant[];
    colorVariants: Variant[];
    selectedColor: string;
    productImage: string | null;
    galleryImage: string | undefined;
    onSelectVariant: (variantId: number | null) => void;
}) {
    return (
        <section className="mt-6">
            <h2 className="mb-3 text-sm font-black uppercase">Other styles</h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {colorVariants.slice(0, 8).map((variant) => {
                    const colorAvailable = variants.some(
                        (candidate) =>
                            candidate.color_name ===
                                (variant.color_name ?? '') &&
                            candidate.available_stock > 0,
                    );
                    const isSelected =
                        selectedColor === (variant.color_name ?? '');
                    const variantImage =
                        variant.image_url ??
                        productImage ??
                        galleryImage ??
                        fallbackImages[0];

                    return (
                        <button
                            key={`${variant.color_name}-${variant.color_hex}`}
                            type="button"
                            disabled={!colorAvailable}
                            onClick={() => {
                                const nextVariant = variants.find(
                                    (candidate) =>
                                        candidate.color_name ===
                                            variant.color_name &&
                                        candidate.available_stock > 0,
                                );

                                onSelectVariant(nextVariant?.id ?? variant.id);
                            }}
                            className={`border bg-white p-2 text-left transition-colors ${
                                isSelected
                                    ? 'border-[#F58220]'
                                    : 'border-[#D8D8D8] hover:border-[#1A1A1A]'
                            } ${!colorAvailable ? 'cursor-not-allowed opacity-45' : ''}`}
                        >
                            <span className="block aspect-[1.7] bg-[#F8F8F8] p-1">
                                <img
                                    src={variantImage}
                                    alt={variant.color_name ?? 'Product style'}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </span>
                            <span className="mt-2 block truncate text-[11px] font-black uppercase">
                                {variant.color_name ??
                                    variant.color_hex ??
                                    'Style'}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

function SizePicker({
    sizes,
    variants,
    selectedColor,
    selectedSize,
    onSelectVariant,
    onOpenSizeGuide,
}: {
    sizes: string[];
    variants: Variant[];
    selectedColor: string;
    selectedSize: string;
    onSelectVariant: (variantId: number | null) => void;
    onOpenSizeGuide: () => void;
}) {
    return (
        <section className="mt-5">
            <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-sm font-black uppercase">Size</h2>
                <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    className="text-xs font-black text-[#F58220] uppercase hover:underline"
                >
                    Size Guide
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                    const sizeVariant =
                        variants.find(
                            (variant) =>
                                variant.size === size &&
                                variant.color_name === selectedColor,
                        ) ?? variants.find((variant) => variant.size === size);
                    const sizeAvailable =
                        (sizeVariant?.available_stock ?? 0) > 0;

                    return (
                        <button
                            key={size}
                            type="button"
                            disabled={!sizeAvailable}
                            onClick={() => {
                                if (!sizeAvailable) {
                                    return;
                                }

                                onSelectVariant(sizeVariant?.id ?? null);
                            }}
                            className={`min-h-10 min-w-14 border px-4 text-sm font-black transition-colors ${
                                !sizeAvailable
                                    ? 'cursor-not-allowed border-[#D8D8D8] text-[#9A9A9A] line-through'
                                    : selectedSize === size
                                      ? 'border-[#F58220] text-[#F58220]'
                                      : 'border-[#CFCFCF] hover:border-[#1A1A1A]'
                            }`}
                        >
                            {size}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

function QuantityControl({
    quantity,
    onDecrease,
    onIncrease,
    disableDecrease,
    disableIncrease,
}: {
    quantity: number;
    onDecrease: () => void;
    onIncrease: () => void;
    disableDecrease: boolean;
    disableIncrease: boolean;
}) {
    return (
        <div className="inline-grid h-12 w-[150px] grid-cols-3 border border-[#CFCFCF] bg-white text-base font-black">
            <button
                type="button"
                onClick={onDecrease}
                disabled={disableDecrease}
                className="flex items-center justify-center text-[#9A9A9A] transition-colors hover:bg-[#F8F8F8] hover:text-[#1A1A1A] disabled:opacity-35"
                aria-label="Decrease quantity"
            >
                <Minus size={18} strokeWidth={2} />
            </button>
            <span className="flex items-center justify-center tabular-nums">
                {quantity}
            </span>
            <button
                type="button"
                onClick={onIncrease}
                disabled={disableIncrease}
                className="flex items-center justify-center transition-colors hover:bg-[#FFF3E8] hover:text-[#F58220] disabled:opacity-35"
                aria-label="Increase quantity"
            >
                <Plus size={20} strokeWidth={2.4} />
            </button>
        </div>
    );
}

function ServiceStrip({ isAvailable }: { isAvailable: boolean }) {
    const items: Array<{ title: string; body: string; icon: IconType }> = [
        {
            title: isAvailable ? 'In Stock' : 'Out of Stock',
            body: isAvailable
                ? 'Ships within 24 hours'
                : 'Choose another style',
            icon: Home,
        },
        { title: 'Pick Up In Store', body: 'Check availability', icon: Store },
        { title: 'Notify Me', body: 'When back in stock', icon: Bell },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 border-b border-[#CFCFCF] py-4 sm:grid-cols-3">
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <div key={item.title} className="flex items-start gap-3">
                        <Icon className="mt-0.5 h-7 w-7" strokeWidth={1.7} />
                        <div>
                            <p className="text-sm font-black">{item.title}</p>
                            <p className="mt-1 text-sm font-medium text-[#2E2E2E]">
                                {item.body}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function ProductSpecs({
    product,
    productDescription,
}: {
    product: ProductDetail;
    productDescription: string | null;
}) {
    return (
        <section className="py-6">
            <div>
                <h2 className="text-base font-black uppercase">Product Description</h2>
                <HTMLRender
                    html={productDescription}
                    className="mt-4 text-sm leading-6 font-medium text-[#2E2E2E] [&_a]:text-[#F58220] [&_h1]:text-lg [&_h2]:text-base [&_strong]:font-black [&_strong]:text-[#1A1A1A] [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5"
                    emptyFallback={
                        <p>
                            The {product.title} is engineered for speed and
                            clarity. Ultra-light, locked-in, and ready for long
                            sessions.
                        </p>
                    }
                />
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm font-medium text-[#2E2E2E]">
                    <li>
                        <span className="font-black text-[#1A1A1A]">
                            Included:
                        </span>{' '}
                        Hard Case, Microfiber Bag, Replacement Lens, Extra
                        Nosepad
                    </li>
                    {product.material && (
                        <li>
                            <span className="font-black text-[#1A1A1A]">
                                Material:
                            </span>{' '}
                            {product.material}
                        </li>
                    )}
                    {product.care_instruction && (
                        <li>
                            <span className="font-black text-[#1A1A1A]">
                                Care:
                            </span>{' '}
                            {product.care_instruction}
                        </li>
                    )}
                    {product.weight !== null && (
                        <li>
                            <span className="font-black text-[#1A1A1A]">
                                Weight:
                            </span>{' '}
                            {product.weight} gram
                        </li>
                    )}
                </ul>
            </div>
        </section>
    );
}

function OtherStyles({ products }: { products: ProductCard[] }) {
    if (products.length === 0) {
        return null;
    }

    return (
        <FadeInOnScroll className="mt-6">
            <h2 className="mb-2 text-2xl font-black tracking-normal uppercase">
                Other Recommendations
            </h2>
            <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
                {products.slice(0, 6).map((product, index) => (
                    <Link
                        key={product.id}
                        href={detail.url({ query: { product: product.slug } })}
                        className="group border border-[#D8D8D8] bg-white p-4 transition-colors hover:border-[#1A1A1A]"
                    >
                        <div className="aspect-[1.7] bg-[#F8F8F8] p-2">
                            <img
                                src={
                                    product.image ??
                                    fallbackImages[
                                        index % fallbackImages.length
                                    ]
                                }
                                alt={product.title}
                                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div className="mt-4 flex items-end justify-between gap-3">
                            <h3 className="line-clamp-2 text-sm leading-tight font-black uppercase">
                                {product.title}
                            </h3>
                            <span className="shrink-0 text-sm font-black tabular-nums">
                                {formatPrice(
                                    product.sale_price ?? product.price,
                                )}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </FadeInOnScroll>
    );
}


function SizeGuideModal({ onClose }: { onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
            role="dialog"
            aria-modal="true"
            aria-label="Size guide"
            onClick={onClose}
        >
            <div
                className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden bg-white shadow-[0_24px_60px_rgba(26,26,26,0.22)]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-[#CFCFCF] px-5 py-4">
                    <div>
                        <p className="text-sm font-black tracking-[0.08em] uppercase">
                            Size Guide
                        </p>
                        <p className="mt-1 text-sm font-medium text-[#707070]">
                            Use this guide before selecting a size.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center border border-[#CFCFCF] hover:border-[#F58220] hover:text-[#F58220]"
                        aria-label="Close size guide"
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className="max-h-[calc(90vh-80px)] overflow-auto bg-[#F8F8F8] p-4">
                    <img
                        src="/size-guide.webp"
                        alt="Size guide"
                        className="mx-auto h-auto w-full max-w-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
}

function FadeInOnScroll({
    children,
    className = '',
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.16 },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
