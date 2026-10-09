import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { shippingEstimate } from '@/routes/admin/products';

type Dimensions = Record<
    'weight' | 'length' | 'width' | 'height',
    string | number
>;
type Rate = {
    id: string;
    courier_company: string;
    courier_service_name: string | null;
    courier_type: string;
    duration: string | null;
    price: number;
};

export default function ProductShippingEstimate({
    weight,
    length,
    width,
    height,
}: Dimensions) {
    const signature = JSON.stringify([weight, length, width, height]);
    const valid = [weight, length, width, height].every(
        (value) =>
            Number.isFinite(Number(value)) &&
            Number(value) > 0 &&
            Number(value) <= 1000000000,
    );
    const [retry, setRetry] = useState(0);
    const [result, setResult] = useState<{
        signature: string;
        status: 'loading' | 'success' | 'error';
        rates: Rate[];
        error: string;
    } | null>(null);

    useEffect(() => {
        if (!valid) {
            return;
        }

        const controller = new AbortController();
        const timer = setTimeout(async () => {
            setResult({ signature, status: 'loading', rates: [], error: '' });
            const [weight, length, width, height] =
                JSON.parse(signature).map(Number);
            const token = document.cookie
                .split('; ')
                .find((cookie) => cookie.startsWith('XSRF-TOKEN='))
                ?.slice('XSRF-TOKEN='.length);

            try {
                const response = await fetch(shippingEstimate.url(), {
                    method: 'POST',
                    credentials: 'same-origin',
                    signal: controller.signal,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        ...(token
                            ? { 'X-XSRF-TOKEN': decodeURIComponent(token) }
                            : {}),
                    },
                    body: JSON.stringify({ weight, length, width, height }),
                });
                const payload = await response.json().catch(() => ({}));

                if (controller.signal.aborted) {
                    return;
                }

                if (!response.ok) {
                    const message =
                        response.status === 429
                            ? 'Terlalu banyak permintaan. Tunggu satu menit, lalu coba lagi.'
                            : response.status === 419 || response.status === 401
                              ? 'Sesi berakhir. Muat ulang halaman untuk menghitung ongkir.'
                              : response.status === 403
                                ? 'Akses estimasi ongkir hanya untuk admin aktif.'
                                : (Object.values(
                                      payload.errors ?? {},
                                  ).flat()[0] ??
                                  payload.message ??
                                  'Gagal mengambil estimasi ongkir. Silakan coba lagi.');

                    throw new Error(String(message));
                }

                if (!Array.isArray(payload.rates)) {
                    throw new Error(
                        'Respons estimasi ongkir tidak valid. Silakan coba lagi.',
                    );
                }

                setResult({
                    signature,
                    status: 'success',
                    rates: payload.rates,
                    error: '',
                });
            } catch (error) {
                if (!controller.signal.aborted) {
                    setResult({
                        signature,
                        status: 'error',
                        rates: [],
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Tidak dapat mengambil ongkir. Periksa koneksi, lalu coba lagi.',
                    });
                }
            }
        }, 800);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [signature, valid, retry]);

    const current = valid && result?.signature === signature ? result : null;

    return (
        <div className="mt-4 min-w-0 space-y-3 border-t border-zinc-100 pt-4">
            <div>
                <h3 className="text-sm font-semibold text-zinc-900">
                    Estimasi ongkir 1 KM
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    Simulasi 1 produk, 1 KM garis lurus ke utara dari toko.
                    Jarak jalan dan ongkir checkout dapat berbeda. Menggunakan
                    dimensi produk utama, tanpa asuransi.
                </p>
            </div>
            <div
                role="status"
                aria-live="polite"
                aria-busy={valid && (!current || current.status === 'loading')}
            >
                {!valid ? (
                    <p className="text-sm text-zinc-500">
                        Isi berat, panjang, lebar, dan tinggi dengan angka lebih
                        dari 0 untuk melihat estimasi otomatis.
                    </p>
                ) : !current || current.status === 'loading' ? (
                    <p className="text-sm text-zinc-500">
                        Menghitung estimasi ongkir…
                    </p>
                ) : current.status === 'error' ? (
                    <div className="space-y-2">
                        <p className="text-sm text-red-600">{current.error}</p>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setResult(null);
                                setRetry((value) => value + 1);
                            }}
                        >
                            Coba lagi
                        </Button>
                    </div>
                ) : current.rates.length === 0 ? (
                    <p className="text-sm text-zinc-500">
                        Tidak ada layanan kurir untuk lokasi simulasi ini.
                    </p>
                ) : (
                    <ul className="grid gap-2 sm:grid-cols-2">
                        {current.rates.map((rate) => (
                            <li
                                key={rate.id}
                                className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-md border border-zinc-200 p-3 text-sm"
                            >
                                <div className="min-w-0 break-words">
                                    <p className="font-medium text-zinc-900">
                                        {rate.courier_company.toUpperCase()} ·{' '}
                                        {rate.courier_service_name ||
                                            rate.courier_type}
                                    </p>
                                    {rate.duration && (
                                        <p className="text-xs text-zinc-500">
                                            {rate.duration}
                                        </p>
                                    )}
                                </div>
                                <p className="shrink-0 font-semibold text-zinc-900">
                                    {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        maximumFractionDigits: 0,
                                    }).format(rate.price)}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
