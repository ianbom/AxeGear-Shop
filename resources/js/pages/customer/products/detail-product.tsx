import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowUpRight,
    ChevronDown,
    ChevronUp,
    Headphones,
    Heart,
    MessageCircle,
    Minus,
    Package,
    PackageCheck,
    Plus,
    Search,
    ShieldCheck,
    Truck,
    X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';

import { addProductVariantToCart as addProductVariantToCartRoute } from '@/actions/App/Http/Controllers/Customer/CartController';
import {
    destroyProduct as removeWishlistProduct,
    store as addWishlistItem,
} from '@/actions/App/Http/Controllers/Customer/WishlistController';
import HTMLRender from '@/components/HTMLRender';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import ShopLayout from '@/layouts/shop-layout';
import { cart, contact, detail, list } from '@/routes';

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
    product_line: string | null;
    style_name: string | null;
    short_description: string | null;
    description: string | null;
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

        return [];
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
    const [mainImage, setMainImage] = useState<string | null>(
        gallery[0]?.url ?? null,
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

                    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-x-12 lg:gap-y-6 xl:grid-cols-[940px_1fr]">
                        <FadeInOnScroll className="lg:col-start-1 lg:row-start-1">
                            <ProductGallery
                                gallery={gallery}
                                mainImage={mainImage}
                                productTitle={product.title}
                                onSelectImage={setMainImage}
                            />
                        </FadeInOnScroll>

                        <FadeInOnScroll
                            className="lg:col-start-2 lg:row-span-2 lg:row-start-1"
                            delay={80}
                        >
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
                                        onSelectVariant={selectVariant}
                                    />
                                )}

                                {/* {sizes.length > 0 && (
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
                                )} */}

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

                                <div className="hidden lg:block">
                                    <ProductShoppingInformation />
                                </div>
                            </section>
                        </FadeInOnScroll>

                        <ProductSpecs
                            product={product}
                            productDescription={productDescription}
                        />
                        <div className="lg:hidden">
                            <ProductShoppingInformation />
                        </div>
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
    mainImage: string | null;
    productTitle: string;
    onSelectImage: (image: string) => void;
}) {
    const thumbnailRef = useRef<HTMLDivElement>(null);
    const activeIndex = gallery.findIndex((image) => image.url === mainImage);

    useEffect(() => {
        const container = thumbnailRef.current;
        const activeThumbnail = container?.querySelector<HTMLButtonElement>(
            '[aria-pressed="true"]',
        );

        if (!container || !activeThumbnail) {
            return;
        }

        container.scrollTo({
            left:
                activeThumbnail.offsetLeft -
                (container.clientWidth - activeThumbnail.offsetWidth) / 2,
            top:
                activeThumbnail.offsetTop -
                (container.clientHeight - activeThumbnail.offsetHeight) / 2,
            behavior: 'smooth',
        });
    }, [gallery, mainImage]);

    return (
        <section className="grid min-w-0 gap-4 md:grid-cols-[110px_1fr]">
            <div className="order-2 flex min-w-0 items-center gap-3 md:order-1 md:flex-col">
                {gallery.length > 0 && (
                    <button
                        type="button"
                        onClick={() =>
                            onSelectImage(gallery[activeIndex - 1].url)
                        }
                        disabled={activeIndex <= 0}
                        className="flex h-11 w-11 shrink-0 items-center justify-center transition-colors hover:text-[#F58220] disabled:cursor-not-allowed disabled:text-[#CFCFCF]"
                        aria-label="Previous product image"
                    >
                        <ChevronUp
                            className="-rotate-90 md:rotate-0"
                            size={22}
                            strokeWidth={1.8}
                        />
                    </button>
                )}
                <div
                    ref={thumbnailRef}
                    className="relative flex min-w-0 flex-1 gap-3 overflow-x-auto pb-1 md:max-h-[540px] md:w-full md:flex-none md:flex-col md:items-center md:overflow-x-hidden md:overflow-y-auto md:pb-0"
                >
                    {gallery.map((image, index) => (
                        <button
                            key={`${image.url}-${index}`}
                            type="button"
                            onClick={() => onSelectImage(image.url)}
                            aria-label={`View ${image.alt || productTitle}, image ${index + 1}`}
                            aria-pressed={mainImage === image.url}
                            className={`h-[84px] w-[100px] shrink-0 border bg-white p-2 transition-colors md:h-[90px] md:w-full md:max-w-[104px] ${
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
                </div>
                {gallery.length > 0 && (
                    <button
                        type="button"
                        onClick={() =>
                            onSelectImage(gallery[activeIndex + 1].url)
                        }
                        disabled={
                            activeIndex < 0 || activeIndex >= gallery.length - 1
                        }
                        className="flex h-11 w-11 shrink-0 items-center justify-center transition-colors hover:text-[#F58220] disabled:cursor-not-allowed disabled:text-[#CFCFCF]"
                        aria-label="Next product image"
                    >
                        <ChevronDown
                            className="-rotate-90 md:rotate-0"
                            size={22}
                            strokeWidth={1.8}
                        />
                    </button>
                )}
            </div>

            <div className="group relative order-1 flex min-h-[420px] items-center justify-center border border-[#D8D8D8] bg-white p-5 md:order-2 lg:min-h-[560px] xl:min-h-[640px]">
                {mainImage ? (
                    <img
                        src={mainImage}
                        alt={productTitle}
                        className="h-full max-h-[620px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                        decoding="async"
                    />
                ) : (
                    <p className="text-sm font-bold text-[#707070]">
                        No product image available.
                    </p>
                )}
                {mainImage && (
             <>
             </>
                )}
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
            {(product.collection ?? product.category) && (
                <p className="mb-3 text-xs font-black tracking-[0.08em] text-[#F58220] uppercase">
                    {product.collection ?? product.category}
                </p>
            )}
            <h1 className="max-w-[720px] text-[30px] leading-[0.98] font-black tracking-normal text-[#1A1A1A] uppercase md:text-[38px]">
                {product.title}
            </h1>
            {product.short_description && (
                <p className="mt-3 max-w-[620px] text-sm leading-6 font-medium text-[#707070]">
                    {product.short_description}
                </p>
            )}
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
    onSelectVariant,
}: {
    variants: Variant[];
    colorVariants: Variant[];
    selectedColor: string;
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
                    const variantImage = variant.image_url;

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
                                {variantImage && (
                                    <img
                                        src={variantImage}
                                        alt={variant.color_name ?? ''}
                                        className="h-full w-full object-contain"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                )}
                            </span>
                            {(variant.color_name ?? variant.color_hex) && (
                                <span className="mt-2 block truncate text-[11px] font-black uppercase">
                                    {variant.color_name ?? variant.color_hex}
                                </span>
                            )}
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

function ProductShoppingInformation() {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const benefits = [
        { title: 'Secure Shopping', icon: ShieldCheck },
        { title: 'Careful Packaging', icon: PackageCheck },
        { title: 'Customer Support', icon: Headphones },
    ];
    const shippingInformation = [
        {
            title: 'Shipping Information',
            body: 'Shipping options and delivery costs are calculated during checkout.',
            icon: Truck,
        },
        {
            title: 'Order Processing',
            body: 'Orders are prepared for shipment after payment confirmation.',
            icon: Package,
        },
    ];
    const sections = [
        {
            title: 'Product Care Guide',
            content: [
                'Clean the product gently using appropriate cleaning materials.',
                'Avoid prolonged exposure to excessive moisture and direct heat.',
                'Store in a clean, dry environment when not in use.',
            ],
        },
        {
            title: 'Shipping & Delivery',
            content: [
                'Shipping options are displayed during checkout.',
                'Delivery costs depend on the destination and selected shipping service.',
                'Order details can be reviewed before completing checkout.',
            ],
        },
        {
            title: 'Returns & Exchanges',
            content:
                'For questions about returns, exchanges, or order issues, please contact our customer support team.',
        },
    ];

    return (
        <section aria-label="Shopping information" className="mt-5 space-y-4">
            <ul className="grid grid-cols-3 divide-x divide-[#E5E5E5] py-3">
                {benefits.map(({ title, icon: Icon }) => (
                    <li
                        key={title}
                        className="flex min-w-0 flex-col items-center gap-2 px-2 text-center"
                    >
                        <Icon
                            aria-hidden="true"
                            className="h-5 w-5 text-[#F58220]"
                            strokeWidth={1.7}
                        />
                        <span className="text-xs leading-4 font-semibold">
                            {title}
                        </span>
                    </li>
                ))}
            </ul>

            <section
                aria-label="Shipping and order information"
                className="divide-y divide-[#E5E5E5] rounded-lg border border-[#E5E5E5] bg-white"
            >
                {shippingInformation.map(({ title, body, icon: Icon }) => (
                    <div key={title} className="flex items-start gap-3 p-4">
                        <Icon
                            aria-hidden="true"
                            className="mt-0.5 h-5 w-5 shrink-0 text-[#F58220]"
                            strokeWidth={1.7}
                        />
                        <div className="min-w-0">
                            <h3 className="text-sm font-semibold">{title}</h3>
                            <p className="mt-1 text-xs leading-5 text-[#707070]">
                                {body}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            <section
                aria-label="Product information"
                className="border-t border-[#E5E5E5]"
            >
                {sections.map((item) => {
                    const isOpen = openSection === item.title;

                    return (
                        <Collapsible
                            key={item.title}
                            open={isOpen}
                            onOpenChange={(nextOpen) =>
                                setOpenSection(nextOpen ? item.title : null)
                            }
                            className="border-b border-[#E5E5E5]"
                        >
                            <h3>
                                <CollapsibleTrigger className="flex min-h-12 w-full items-center justify-between gap-3 py-4 text-left text-sm font-semibold transition-colors hover:text-[#707070] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]">
                                    {item.title}
                                    {isOpen ? (
                                        <Minus
                                            aria-hidden="true"
                                            className="h-4 w-4 shrink-0"
                                        />
                                    ) : (
                                        <Plus
                                            aria-hidden="true"
                                            className="h-4 w-4 shrink-0"
                                        />
                                    )}
                                </CollapsibleTrigger>
                            </h3>
                            <CollapsibleContent className="overflow-hidden duration-200 motion-safe:data-[state=closed]:animate-collapsible-up motion-safe:data-[state=open]:animate-collapsible-down">
                                <div className="pb-4 text-xs leading-5 text-[#707070]">
                                    {Array.isArray(item.content) ? (
                                        <ul className="list-disc space-y-2 pl-4">
                                            {item.content.map((text) => (
                                                <li key={text}>{text}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>{item.content}</p>
                                    )}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    );
                })}
            </section>

            <section
                aria-label="Customer support"
                className="rounded-lg border border-[#E5E5E5] bg-white p-4"
            >
                <div className="flex items-start gap-3">
                    <MessageCircle
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#F58220]"
                        strokeWidth={1.7}
                    />
                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold">Need Help?</h3>
                        <p className="mt-1 text-xs leading-5 text-[#707070]">
                            Have questions about this product? Our team is here
                            to help.
                        </p>
                        <Link
                            href={contact.url()}
                            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md border border-[#E5E5E5] bg-[#FAFAFA] px-3 text-xs font-semibold transition-colors hover:border-[#F58220] hover:bg-[#FFF7F0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
                        >
                            Chat With Us
                            <ArrowUpRight
                                aria-hidden="true"
                                className="h-4 w-4"
                            />
                        </Link>
                    </div>
                </div>
            </section>
        </section>
    );
}

function ProductSpecs({
    product,
    productDescription,
}: {
    product: ProductDetail;
    productDescription: string | null;
}) {
    const description = productDescription?.trim();
    const metadata = [
        ['Product Line', product.product_line],
        ['Style Name', product.style_name],
    ].filter(([, value]) => value?.trim());

    if (!description && metadata.length === 0) {
        return null;
    }

    return (
        <FadeInOnScroll className="lg:col-start-1 lg:row-start-2" delay={40}>
            <section className="border-t border-[#E5E5E5] py-6 sm:py-8">
                <h2 className="text-lg font-black uppercase sm:text-xl">
                    Product Description
                </h2>
                {description && (
                    <HTMLRender
                        html={description}
                        className="mt-4 text-sm leading-7 font-medium break-words text-[#2E2E2E] sm:text-base [&_a]:text-[#F58220] [&_h1]:text-xl [&_h2]:text-lg [&_ol]:mt-3 [&_p+p]:mt-3 [&_strong]:font-black [&_strong]:text-[#1A1A1A] [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5"
                    />
                )}
                {metadata.length > 0 && (
                    <dl className="mt-6 grid gap-4 border-t border-[#E5E5E5] pt-5 sm:grid-cols-2 sm:gap-6">
                        {metadata.map(([label, value]) => (
                            <div key={label}>
                                <dt className="text-xs font-bold tracking-wide text-[#707070] uppercase">
                                    {label}
                                </dt>
                                <dd className="mt-1 text-sm font-bold break-words text-[#1A1A1A] sm:text-base">
                                    {value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}
            </section>
        </FadeInOnScroll>
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
                {products.slice(0, 6).map((product) => (
                    <Link
                        key={product.id}
                        href={detail.url({ query: { product: product.slug } })}
                        className="group border border-[#D8D8D8] bg-white p-4 transition-colors hover:border-[#1A1A1A]"
                    >
                        <div className="aspect-[1.7] bg-[#F8F8F8] p-2">
                            {product.image && (
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                            )}
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
