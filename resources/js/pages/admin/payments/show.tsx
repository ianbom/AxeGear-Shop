import { Head, Link, router } from '@inertiajs/react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    formatPrice,
    JsonBlock,
    PageHeader,
    StatusBadge,
} from '@/pages/admin/sales/shared';
import { show as showOrder } from '@/routes/admin/orders';
import { sync } from '@/routes/admin/payments';

type Payment = {
    id: number;
    order_id: number;
    order_number: string | null;
    customer: string | null;
    payment_provider: string;
    payment_method: string | null;
    payment_method_label: string | null;
    provider_reference: string;
    create_request_id: string;
    expires_at: string | null;
    last_synced_at: string | null;
    gross_amount: string;
    currency: string;
    transaction_status: string | null;
    paid_at: string | null;
    expired_at: string | null;
    failure_reason: string | null;
    logs: {
        id: number;
        event_type: string | null;
        transaction_status: string | null;
        processed_at: string | null;
        payload: unknown;
    }[];
};

type Props = { payment: Payment };

export default function PaymentShow({ payment }: Props) {
    return (
        <>
            <Head
                title={`Payment ${payment.provider_reference ?? payment.id}`}
            />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    eyebrow="Sales Management"
                    title={
                        payment.provider_reference ?? `Payment #${payment.id}`
                    }
                    description="Detail pembayaran DOKU, referensi invoice, status rekonsiliasi, dan audit pembayaran."
                    action={
                        <Button
                            type="button"
                            onClick={() =>
                                router.post(
                                    sync.url(payment.id),
                                    {},
                                    { preserveScroll: true },
                                )
                            }
                        >
                            <RefreshCw /> Sync Status
                        </Button>
                    }
                />
                <div className="grid gap-4 md:grid-cols-4">
                    <Metric
                        label="Amount"
                        value={formatPrice(payment.gross_amount)}
                    />
                    <Metric
                        label="Status"
                        value={
                            <StatusBadge status={payment.transaction_status} />
                        }
                    />
                    <Metric
                        label="Last Sync"
                        value={payment.last_synced_at ?? '-'}
                    />
                    <Metric
                        label="Method"
                        value={
                            payment.payment_method_label ??
                            payment.payment_method ??
                            '-'
                        }
                    />
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Summary</CardTitle>
                            <CardDescription>
                                {payment.payment_provider}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3 text-sm">
                            <Row
                                label="Order"
                                value={
                                    <Link
                                        className="text-primary underline"
                                        href={showOrder.url(payment.order_id)}
                                    >
                                        {payment.order_number ?? '-'}
                                    </Link>
                                }
                            />
                            <Row
                                label="Customer"
                                value={payment.customer ?? '-'}
                            />
                            <Row
                                label="Create Request ID"
                                value={payment.create_request_id}
                            />
                            {payment.failure_reason && (
                                <Row
                                    label="Perlu Pemeriksaan"
                                    value={payment.failure_reason}
                                />
                            )}
                            <Row
                                label="Paid At"
                                value={payment.paid_at ?? '-'}
                            />
                            <Row
                                label="Expired At"
                                value={payment.expired_at ?? '-'}
                            />
                            <Row
                                label="Payment Deadline"
                                value={payment.expires_at ?? '-'}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Rekonsiliasi DOKU</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                            Deadline lokal dan percobaan gagal bukan bukti
                            invoice berakhir. Status belum pasti ditahan untuk
                            pemeriksaan; sinkronisasi tidak membatalkan
                            pembayaran atau melepas reservasi.
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Logs</CardTitle>
                        <CardDescription>
                            {payment.logs.length} event tersimpan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        {payment.logs.map((log) => (
                            <div key={log.id} className="rounded-lg border p-4">
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="font-medium">
                                        {log.event_type ?? '-'}
                                    </span>
                                    <StatusBadge
                                        status={log.transaction_status}
                                    />
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {log.processed_at ?? '-'}
                                </p>
                                <JsonBlock value={log.payload} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <Card>
            <CardHeader>
                <CardDescription>{label}</CardDescription>
                <CardTitle className="text-2xl">{value}</CardTitle>
            </CardHeader>
        </Card>
    );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}
