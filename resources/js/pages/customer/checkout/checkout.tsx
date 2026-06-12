import { Head, Link } from '@inertiajs/react';
import { Box, Check, Lock, ShieldCheck, Ticket, Truck } from 'lucide-react';
import type { Icon, LatLngBoundsExpression, Map as LeafletMap } from 'leaflet';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CheckoutProvider, useCheckout } from '@/contexts/checkout-context';
import type {
    CheckoutAddress,
    CheckoutItem,
    CheckoutStoreLocation,
    CheckoutSummary,
    ShippingRate,
    Voucher,
} from '@/contexts/checkout-context';
import ShopLayout from '@/layouts/shop-layout';

type Props = {
    addresses: CheckoutAddress[];
    appliedVoucher: Voucher;
    cartItems: CheckoutItem[];
    defaultAddressId: number | null;
    selectedShippingRate: ShippingRate | null;
    storeLocation: CheckoutStoreLocation;
    summary: CheckoutSummary;
};

type ReactLeafletModules = {
    MapContainer: typeof import('react-leaflet').MapContainer;
    Marker: typeof import('react-leaflet').Marker;
    Polyline: typeof import('react-leaflet').Polyline;
    Popup: typeof import('react-leaflet').Popup;
    TileLayer: typeof import('react-leaflet').TileLayer;
    useMap: typeof import('react-leaflet').useMap;
};

type Coordinates = [number, number];

const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
        .format(price)
        .replace('Rp', 'Rp ');

const formatWeight = (grams: number) => {
    if (grams >= 1000) {
        return `${new Intl.NumberFormat('id-ID', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
        }).format(grams / 1000)} kg`;
    }

    return `${new Intl.NumberFormat('id-ID', {
        maximumFractionDigits: 0,
    }).format(grams)} gram`;
};

const formatDistance = (meters: number) =>
    meters >= 1000
        ? `${new Intl.NumberFormat('id-ID', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 0,
          }).format(meters / 1000)} km`
        : `${new Intl.NumberFormat('id-ID', {
              maximumFractionDigits: 0,
          }).format(meters)} m`;

const checkoutStockAlertKey = 'checkout.stock_alert';

const stockIssueMessage = (item: CheckoutItem) => {
    if (item.available_stock <= 0) {
        return 'Produk sudah habis. Tidak bisa checkout.';
    }

    if (item.available_stock < item.quantity) {
        return `Stok tidak mencukupi. Tersedia ${item.available_stock}, di keranjang ${item.quantity}.`;
    }

    return 'Produk tidak tersedia. Tidak bisa checkout.';
};

const validCoordinates = (latitude: number, longitude: number): boolean =>
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180;

const coordinatesFrom = (
    location: Pick<
        CheckoutAddress | CheckoutStoreLocation,
        'latitude' | 'longitude'
    >,
): Coordinates | null => {
    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);

    return validCoordinates(latitude, longitude) ? [latitude, longitude] : null;
};

const distanceMeters = (from: Coordinates, to: Coordinates) => {
    const earthRadiusMeters = 6371000;
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
    const latitudeDelta = toRadians(to[0] - from[0]);
    const longitudeDelta = toRadians(to[1] - from[1]);
    const fromLatitude = toRadians(from[0]);
    const toLatitude = toRadians(to[0]);
    const haversine =
        Math.sin(latitudeDelta / 2) ** 2 +
        Math.cos(fromLatitude) *
            Math.cos(toLatitude) *
            Math.sin(longitudeDelta / 2) ** 2;

    return Math.round(
        earthRadiusMeters *
            2 *
            Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)),
    );
};

const googleMapsDirectionsUrl = (from: Coordinates, to: Coordinates) => {
    const origin = `${from[0]},${from[1]}`;
    const destination = `${to[0]},${to[1]}`;
    const params = new URLSearchParams({
        api: '1',
        origin,
        destination,
        travelmode: 'driving',
    });

    return `https://www.google.com/maps/dir/?${params.toString()}`;
};

export default function Checkout(props: Props) {
    return (
        <CheckoutProvider {...props}>
            <CheckoutScreen />
        </CheckoutProvider>
    );
}

function CheckoutScreen() {
    const {
        addresses,
        appliedVoucher,
        applyVoucher,
        cartItems,
        errors,
        loadShippingRates,
        placeOrder,
        placingOrder,
        removeVoucher,
        selectAddress,
        selectShippingRate,
        selectedAddressId,
        selectedShippingRate,
        shippingRates,
        shippingRatesLoading,
        storeLocation,
        summary,
    } = useCheckout();
    const [voucherCode, setVoucherCode] = useState(appliedVoucher?.code ?? '');
    const [notes, setNotes] = useState('');
    const [agreed, setAgreed] = useState(false);
    const totalWeight = cartItems.reduce(
        (total, item) => total + item.weight,
        0,
    );
    const selectedAddress =
        addresses.find((address) => address.id === selectedAddressId) ?? null;
    const storeCoordinates = coordinatesFrom(storeLocation);
    const destinationCoordinates = selectedAddress
        ? coordinatesFrom(selectedAddress)
        : null;
    const routeDistance =
        storeCoordinates && destinationCoordinates
            ? distanceMeters(storeCoordinates, destinationCoordinates)
            : null;
    const unavailableItems = cartItems.filter((item) => !item.is_available);
    const hasUnavailableItems = unavailableItems.length > 0;

    useEffect(() => {
        if (selectedAddressId && shippingRates.length === 0) {
            void loadShippingRates(selectedAddressId, {
                preserveSelectedRate: true,
            });
        }
    }, [loadShippingRates, selectedAddressId, shippingRates.length]);

    useEffect(() => {
        const message = window.sessionStorage.getItem(checkoutStockAlertKey);

        if (!message) {
            return;
        }

        window.sessionStorage.removeItem(checkoutStockAlertKey);
        toast.error(message);
    }, []);

    const submitOrder = async () => {
        if (hasUnavailableItems) {
            window.sessionStorage.setItem(
                checkoutStockAlertKey,
                'Produk sudah habis atau stok tidak mencukupi. Perbarui keranjang sebelum membayar.',
            );
            window.location.reload();

            return;
        }

        const redirectUrl = await placeOrder(notes, agreed);

        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    };

    return (
        <ShopLayout>
            <Head title="Checkout - Aurea Syari" />

            <main className="mx-auto min-h-screen max-w-[1200px] px-4 py-8 md:px-8 md:py-12">
                <div className="mb-8 flex items-center space-x-2 text-[10px] font-medium tracking-wide text-[#6f6f6f] md:text-xs">
                    <Link
                        href="/"
                        className="transition-colors hover:text-black"
                    >
                        Beranda
                    </Link>
                    <span>/</span>
                    <Link
                        href="/my-cart"
                        className="transition-colors hover:text-black"
                    >
                        Keranjang
                    </Link>
                    <span>/</span>
                    <span className="text-[#272727]">Checkout</span>
                </div>

                <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                        <h1 className="mb-2 font-serif text-3xl text-[#151515] italic md:text-4xl">
                            Checkout
                        </h1>
                        <p className="text-xs text-[#6f6f6f] md:text-sm">
                            Pilih alamat tersimpan, ongkir Biteship, voucher,
                            lalu bayar via Midtrans.
                        </p>
                    </div>
                    <div className="flex max-w-[380px] items-center">
                        {['Keranjang', 'Checkout', 'Pembayaran'].map(
                            (label, index) => (
                                <div key={label} className="flex items-center">
                                    <div
                                        className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${index < 2 ? 'bg-[#B98B63] text-white' : 'bg-white text-[#e7e2de] ring-1 ring-[#e7e2de]'}`}
                                    >
                                        {index === 0 ? (
                                            <Check size={14} />
                                        ) : (
                                            index + 1
                                        )}
                                    </div>
                                    <span className="mx-2 hidden text-[11px] text-[#6f6f6f] sm:inline">
                                        {label}
                                    </span>
                                    {index < 2 && (
                                        <div className="mx-2 h-px w-10 bg-[#e7e2de]" />
                                    )}
                                </div>
                            ),
                        )}
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="rounded-2xl border border-[#e7e2de] bg-white p-10 text-center">
                        <p className="mb-4 font-serif text-2xl text-[#151515]">
                            Keranjang kosong
                        </p>
                        <Link
                            href="/list"
                            className="text-sm font-semibold text-[#151515] underline"
                        >
                            Belanja dulu
                        </Link>
                    </div>
                ) : (
                    <div className="relative flex flex-col gap-8 lg:flex-row lg:gap-10">
                        <div className="flex-1 space-y-8 md:space-y-10">
                            <section className="border-b border-[#E5D8D2] pb-8">
                                <div className="mb-5 flex items-center justify-between gap-4">
                                    <div>
                                        <h2 className="font-serif text-xl text-[#272727]">
                                            Alamat Pengiriman
                                        </h2>
                                    </div>
                                    <Link
                                        href="/address?redirect_to=/checkout"
                                        className="text-[12px] font-bold text-[#151515] underline"
                                    >
                                        Kelola alamat
                                    </Link>
                                </div>
                                <div className="grid gap-3 md:grid-cols-2">
                                    {addresses.map((address) => (
                                        <button
                                            key={address.id}
                                            type="button"
                                            onClick={() =>
                                                void selectAddress(address.id)
                                            }
                                            className={`rounded-xl border p-4 text-left transition-all ${selectedAddressId === address.id ? 'border-[#9A6B45] bg-[#F8F0E5] ring-1 ring-[#9A6B45]' : 'border-[#e7e2de] hover:border-[#6f6f6f]'}`}
                                        >
                                            <div className="mb-2 flex items-start justify-between gap-3">
                                                <p className="text-[13px] font-bold text-[#272727]">
                                                    {address.label ?? 'Alamat'}
                                                </p>
                                                {address.is_default && (
                                                    <span className="rounded bg-[#E8D6C1] px-2 py-1 text-[10px] font-bold text-[#151515]">
                                                        Utama
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[12px] font-semibold text-[#6f6f6f]">
                                                {address.recipient_name}
                                            </p>
                                            <p className="mt-1 text-[11px] text-[#6f6f6f]">
                                                {address.recipient_phone}
                                            </p>
                                            <p className="mt-2 text-[12px] leading-relaxed text-[#6f6f6f]">
                                                {address.full_address}
                                            </p>
                                            {(!address.postal_code ||
                                                !address.latitude ||
                                                !address.longitude) && (
                                                <p className="mt-2 text-[11px] font-semibold text-[#B24B4B]">
                                                    Lengkapi kode pos dan
                                                    koordinat di buku alamat.
                                                </p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section className="border-b border-[#E5D8D2] pb-8">
                                <div className="mb-5 flex items-center gap-2">
                                    <Truck
                                        size={18}
                                        className="text-[#272727]"
                                        strokeWidth={1.5}
                                    />
                                    <h2 className="font-serif text-xl text-[#272727]">
                                        Ongkir
                                    </h2>
                                </div>
                                {errors.shipping && (
                                    <p className="mb-3 text-[12px] font-semibold text-[#B24B4B]">
                                        {errors.shipping}
                                    </p>
                                )}
                                {errors.customer_address_id && (
                                    <p className="mb-3 text-[12px] font-semibold text-[#B24B4B]">
                                        {errors.customer_address_id}
                                    </p>
                                )}
                                {shippingRatesLoading ? (
                                    <div className="rounded-xl border border-dashed border-[#e7e2de] p-6 text-[12px] text-[#6f6f6f]">
                                        Memuat harga ongkir...
                                    </div>
                                ) : shippingRates.length === 0 ? (
                                    <div className="rounded-xl border border-dashed border-[#e7e2de] p-6 text-[12px] text-[#6f6f6f]">
                                        Pilih alamat dengan kode pos dan
                                        koordinat untuk melihat harga ongkir.
                                    </div>
                                ) : (
                                    <div className="grid gap-3 md:grid-cols-2">
                                        {shippingRates.map((rate) => (
                                            <button
                                                key={rate.id}
                                                type="button"
                                                onClick={() =>
                                                    void selectShippingRate(
                                                        rate,
                                                    )
                                                }
                                                className={`rounded-xl border p-4 text-left transition-all ${selectedShippingRate?.id === rate.id ? 'border-[#9A6B45] bg-[#F8F0E5] ring-1 ring-[#9A6B45]' : 'border-[#e7e2de] hover:border-[#6f6f6f]'}`}
                                            >
                                                <p className="text-[13px] font-bold text-[#151515]">
                                                    {rate.courier_company.toUpperCase()}{' '}
                                                    {/* {rate.courier_type} */}
                                                </p>
                                                <p className="mt-1 text-[11px] text-[#6f6f6f]">
                                                    {rate.courier_service_name ??
                                                        rate.description ??
                                                        'Layanan pengiriman'}{' '}
                                                    · {rate.duration ?? '-'}
                                                </p>
                                                <p className="mt-3 text-[15px] font-bold text-[#272727]">
                                                    {formatPrice(rate.price)}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </section>

                            <section className="border-b border-[#E5D8D2] pb-8">
                                <div className="mb-5 flex items-center gap-2">
                                    <Ticket
                                        size={18}
                                        className="text-[#272727]"
                                        strokeWidth={1.5}
                                    />
                                    <h2 className="font-serif text-xl text-[#272727]">
                                        Voucher
                                    </h2>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        value={voucherCode}
                                        onChange={(event) =>
                                            setVoucherCode(event.target.value)
                                        }
                                        placeholder="Masukkan kode voucher"
                                        className="flex-1 rounded-md border border-[#e7e2de] bg-[#ffffff] px-4 py-2.5 text-[12px] focus:border-[#6f6f6f] focus:ring-1 focus:ring-[#6f6f6f] focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            void applyVoucher(voucherCode)
                                        }
                                        className="rounded-md bg-[#B98B63] px-5 py-2.5 text-[12px] font-bold text-white transition-colors hover:bg-[#9A6B45]"
                                    >
                                        Pakai
                                    </button>
                                    {appliedVoucher && (
                                        <button
                                            type="button"
                                            onClick={() => void removeVoucher()}
                                            className="rounded-md border border-[#e7e2de] px-4 py-2.5 text-[12px] font-bold text-[#6f6f6f]"
                                        >
                                            Hapus
                                        </button>
                                    )}
                                </div>
                                {appliedVoucher && (
                                    <p className="mt-2 text-[12px] font-semibold text-emerald-700">
                                        {appliedVoucher.name}: -
                                        {formatPrice(appliedVoucher.discount)}
                                    </p>
                                )}
                                {errors.voucher_code && (
                                    <p className="mt-2 text-[12px] font-semibold text-[#B24B4B]">
                                        {errors.voucher_code}
                                    </p>
                                )}
                            </section>

                            <section className="border-b border-[#E5D8D2] pb-8">
                                <h2 className="mb-4 font-serif text-xl text-[#272727]">
                                    Catatan Order
                                </h2>
                                <textarea
                                    value={notes}
                                    onChange={(event) =>
                                        setNotes(event.target.value)
                                    }
                                    maxLength={2000}
                                    placeholder="Opsional"
                                    className="h-24 w-full resize-none rounded-md border border-[#e7e2de] bg-white px-4 py-3 text-[13px] focus:border-[#9A6B45] focus:ring-1 focus:ring-[#9A6B45] focus:outline-none"
                                />
                                <label className="mt-4 flex items-start gap-2 text-[12px] text-[#6f6f6f]">
                                    <input
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={(event) =>
                                            setAgreed(event.target.checked)
                                        }
                                        className="mt-0.5 h-4 w-4 rounded border-[#e7e2de] text-[#151515]"
                                    />
                                    <span>
                                        Saya menyetujui kebijakan tanpa
                                        retur/refund, Syarat & Ketentuan, dan
                                        Kebijakan Privasi.
                                    </span>
                                </label>
                                {errors.no_return_refund_agreed && (
                                    <p className="mt-2 text-[12px] font-semibold text-[#B24B4B]">
                                        {errors.no_return_refund_agreed}
                                    </p>
                                )}
                                {errors.checkout && (
                                    <p className="mt-2 text-[12px] font-semibold text-[#B24B4B]">
                                        {errors.checkout}
                                    </p>
                                )}
                            </section>
                        </div>

                        <div className="h-px w-full bg-[#E5D8D2] lg:hidden" />

                        <div className="hidden self-stretch lg:block lg:w-px lg:bg-[#E5D8D2]" />

                        <aside className="w-full flex-shrink-0 lg:w-[380px]">
                            <div className="sticky top-24 lg:top-32">
                                <h2 className="mb-6 font-serif text-xl tracking-tight text-[#272727] md:text-2xl">
                                    Ringkasan Pesanan
                                </h2>
                                <div className="mb-6 max-h-[300px] space-y-4 overflow-y-auto pr-2">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-3"
                                        >
                                            <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md bg-[#E8D6C1]">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                )}
                                                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-bl bg-white/90 text-[10px] font-bold">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="line-clamp-2 text-[12px] font-bold text-[#272727]">
                                                    {item.title}
                                                </p>
                                                <p className="mt-1 text-[10px] text-[#6f6f6f]">
                                                    {[item.color, item.size]
                                                        .filter(Boolean)
                                                        .join(' / ') || '-'}
                                                </p>
                                                <p className="mt-1 text-[10px] font-medium text-[#6f6f6f]">
                                                    Berat:{' '}
                                                    {formatWeight(item.weight)}
                                                </p>
                                                {!item.is_available && (
                                                    <p className="mt-1 text-[10px] font-bold text-[#B24B4B]">
                                                        {stockIssueMessage(
                                                            item,
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                            <p className="text-right text-[12px] font-semibold text-[#272727]">
                                                {formatPrice(item.subtotal)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <SummaryRow
                                    label="Subtotal"
                                    value={summary.subtotal}
                                />
                                <div className="mb-3 flex items-center justify-between text-[12px] text-[#6f6f6f]">
                                    <span>Total Berat</span>
                                    <span className="font-semibold">
                                        {formatWeight(totalWeight)}
                                    </span>
                                </div>
                                <SummaryRow
                                    label="Ongkir"
                                    value={summary.shipping}
                                />
                                <SummaryRow
                                    label="Biaya Layanan"
                                    value={summary.service_fee}
                                />
                                <SummaryRow
                                    label="Diskon"
                                    value={-summary.discount}
                                    danger
                                />
                                {hasUnavailableItems && (
                                    <div className="mt-4 rounded-xl border border-[#E7C9C9] bg-[#FFF6F6] px-4 py-3 text-[12px] font-semibold text-[#B24B4B]">
                                        Ada item yang stoknya tidak tersedia.
                                        Perbarui keranjang sebelum checkout.
                                    </div>
                                )}
                                <div className="mt-4 border-t border-[#e7e2de] pt-4">
                                    <div className="flex items-end justify-between">
                                        <span className="text-[13px] font-semibold text-[#272727]">
                                            Total Pembayaran
                                        </span>
                                        <span className="font-serif text-2xl text-[#272727]">
                                            {formatPrice(summary.total)}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => void submitOrder()}
                                    disabled={
                                        placingOrder ||
                                        !selectedShippingRate ||
                                        !agreed
                                    }
                                    className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#B98B63] py-4 text-[13px] font-bold tracking-wider text-white transition-all hover:bg-[#9A6B45] hover:shadow-lg hover:shadow-[#B98B63]/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Lock size={16} className="mr-2" />
                                    {placingOrder
                                        ? 'Membuat Pembayaran...'
                                        : 'Bayar dengan Midtrans'}
                                </button>
                                <div className="mt-8 space-y-4 border-t border-[#e7e2de]/60 pt-6">
                                    <CheckoutRouteMap
                                        destinationAddress={selectedAddress}
                                        destinationCoordinates={
                                            destinationCoordinates
                                        }
                                        distance={routeDistance}
                                        storeCoordinates={storeCoordinates}
                                    />
                                    <div className="flex items-start space-x-3 text-[11px] text-[#6f6f6f]">
                                        <ShieldCheck
                                            size={16}
                                            className="mt-0.5 flex-shrink-0 text-[#e7e2de]"
                                            strokeWidth={1.5}
                                        />
                                        <p>Pembayaran aman didukung Midtrans</p>
                                    </div>
                                    <div className="flex items-start space-x-3 text-[11px] text-[#6f6f6f]">
                                        <Box
                                            size={16}
                                            className="mt-0.5 flex-shrink-0 text-[#e7e2de]"
                                            strokeWidth={1.5}
                                        />
                                        <p>Ongkir dihitung oleh Biteship</p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                )}
            </main>
        </ShopLayout>
    );
}

function CheckoutRouteMap({
    destinationAddress,
    destinationCoordinates,
    distance,
    storeCoordinates,
}: {
    destinationAddress: CheckoutAddress | null;
    destinationCoordinates: Coordinates | null;
    distance: number | null;
    storeCoordinates: Coordinates | null;
}) {
    const [leafletModules, setLeafletModules] =
        useState<ReactLeafletModules | null>(null);
    const [markerIcon, setMarkerIcon] = useState<Icon | null>(null);
    const canShowRoute = Boolean(
        storeCoordinates && destinationCoordinates && distance !== null,
    );
    const googleMapsUrl =
        storeCoordinates && destinationCoordinates
            ? googleMapsDirectionsUrl(storeCoordinates, destinationCoordinates)
            : null;

    useEffect(() => {
        let isMounted = true;

        Promise.all([
            import('leaflet'),
            import('leaflet/dist/leaflet.css'),
            import('react-leaflet'),
        ]).then(([leaflet, , reactLeaflet]) => {
            if (!isMounted) {
                return;
            }

            setMarkerIcon(
                leaflet.icon({
                    iconUrl:
                        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                    iconRetinaUrl:
                        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                    shadowUrl:
                        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                }),
            );
            setLeafletModules({
                MapContainer: reactLeaflet.MapContainer,
                Marker: reactLeaflet.Marker,
                Polyline: reactLeaflet.Polyline,
                Popup: reactLeaflet.Popup,
                TileLayer: reactLeaflet.TileLayer,
                useMap: reactLeaflet.useMap,
            });
        });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="rounded-xl border border-[#e7e2de] bg-[#ffffff] p-3">
            <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                    <p className="text-[12px] font-bold text-[#272727]">
                        Rute Pengiriman
                    </p>
                </div>
                {distance !== null && (
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#151515] ring-1 ring-[#e7e2de]">
                        {formatDistance(distance)}
                    </span>
                )}
            </div>

            {canShowRoute && leafletModules && markerIcon ? (
                <RouteMap
                    destinationAddress={destinationAddress}
                    destinationCoordinates={
                        destinationCoordinates as Coordinates
                    }
                    markerIcon={markerIcon}
                    modules={leafletModules}
                    storeCoordinates={storeCoordinates as Coordinates}
                />
            ) : (
                <div className="flex h-[220px] items-center justify-center rounded-lg border border-dashed border-[#e7e2de] bg-white text-center text-[11px] font-medium text-[#6f6f6f]">
                    {!storeCoordinates
                        ? 'Koordinat toko belum dikonfigurasi.'
                        : !destinationCoordinates
                          ? 'Pilih alamat dengan koordinat untuk melihat rute.'
                          : 'Memuat peta...'}
                </div>
            )}

            {canShowRoute && (
                <div className="mt-3 space-y-3">
                    {googleMapsUrl && (
                        <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center rounded-md bg-[#B98B63] px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-[#9A6B45]"
                        >
                            Buka rute di Google Maps
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}

function RouteMap({
    destinationAddress,
    destinationCoordinates,
    markerIcon,
    modules,
    storeCoordinates,
}: {
    destinationAddress: CheckoutAddress | null;
    destinationCoordinates: Coordinates;
    markerIcon: Icon;
    modules: ReactLeafletModules;
    storeCoordinates: Coordinates;
}) {
    const { MapContainer, Marker, Polyline, Popup, TileLayer } = modules;
    const bounds: LatLngBoundsExpression = [
        storeCoordinates,
        destinationCoordinates,
    ];

    return (
        <div className="overflow-hidden rounded-lg border border-[#e7e2de] bg-white">
            <MapContainer
                bounds={bounds}
                className="h-[220px] w-full"
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RouteMapUpdater bounds={bounds} modules={modules} />
                <Polyline
                    pathOptions={{ color: '#151515', weight: 4 }}
                    positions={[storeCoordinates, destinationCoordinates]}
                />
                <Marker icon={markerIcon} position={storeCoordinates}>
                    <Popup>Lokasi toko</Popup>
                </Marker>
                <Marker icon={markerIcon} position={destinationCoordinates}>
                    <Popup>
                        {destinationAddress?.label ?? 'Alamat pengiriman'}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

function RouteMapUpdater({
    bounds,
    modules,
}: {
    bounds: LatLngBoundsExpression;
    modules: ReactLeafletModules;
}) {
    const map = modules.useMap() as LeafletMap;

    useEffect(() => {
        map.invalidateSize();
        map.fitBounds(bounds, { padding: [28, 28], maxZoom: 15 });
    }, [bounds, map]);

    return null;
}

function SummaryRow({
    label,
    value,
    danger = false,
}: {
    label: string;
    value: number;
    danger?: boolean;
}) {
    return (
        <div
            className={`mb-3 flex items-center justify-between text-[12px] ${danger ? 'text-[#C05D5D]' : 'text-[#6f6f6f]'}`}
        >
            <span>{label}</span>
            <span className="font-semibold">
                {value < 0 ? '-' : ''}
                {formatPrice(Math.abs(value))}
            </span>
        </div>
    );
}
