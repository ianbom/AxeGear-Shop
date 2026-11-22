import { Head, Link, router, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import {
    destroy,
    edit,
    index,
} from '@/actions/App/Http/Controllers/Admin/EmailNotificationController';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Paginated } from '@/pages/admin/catalog/shared';
import {
    PageHeader,
    Pagination,
    TableShell,
} from '@/pages/admin/catalog/shared';
import { RecipientForm } from './form';

type Recipient = {
    id: number;
    email: string;
    is_active: boolean;
};

export default function EmailNotificationsIndex({
    recipients,
    filters,
}: {
    recipients: Paginated<Recipient>;
    filters: { search: string };
}) {
    const form = useForm({ search: filters.search });
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [showCreate, setShowCreate] = useState(false);

    function search(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.get(index.url(), { preserveState: true, replace: true });
    }

    function remove(recipient: Recipient) {
        if (
            !window.confirm(
                `Hapus ${recipient.email} dari penerima notifikasi pembelian?`,
            )
        ) {
            return;
        }

        setDeletingId(recipient.id);
        router.delete(destroy(recipient.id), {
            preserveScroll: true,
            onFinish: () => setDeletingId(null),
        });
    }

    return (
        <>
            <Head title="Email Notifikasi Pembelian" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader
                    eyebrow="Sistem"
                    title="Email Notifikasi Pembelian"
                    description="Penerima aktif mendapat email ketika pembayaran pesanan berhasil dikonfirmasi."
                    action={
                        <Dialog open={showCreate} onOpenChange={setShowCreate}>
                            <DialogTrigger asChild>
                                <Button
                                    type="button"
                                    className="bg-foreground text-background hover:bg-foreground/90"
                                >
                                    Tambah penerima
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah penerima email
                                    </DialogTitle>
                                    <DialogDescription>
                                        Email ini akan menerima ringkasan
                                        pesanan yang sudah dibayar.
                                    </DialogDescription>
                                </DialogHeader>
                                <RecipientForm
                                    onSuccess={() => setShowCreate(false)}
                                    onCancel={() => setShowCreate(false)}
                                />
                            </DialogContent>
                        </Dialog>
                    }
                />
                <TableShell
                    title="Penerima email"
                    description="Kelola alamat email dan status penerima notifikasi pembelian."
                >
                    <form
                        onSubmit={search}
                        className="mb-6 flex flex-wrap items-end gap-3"
                    >
                        <div className="grid w-full max-w-sm gap-2">
                            <Label htmlFor="search">Cari email</Label>
                            <Input
                                id="search"
                                type="search"
                                value={form.data.search}
                                onChange={(event) =>
                                    form.setData('search', event.target.value)
                                }
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="outline"
                            disabled={form.processing}
                        >
                            Cari
                        </Button>
                        {filters.search && (
                            <Button asChild variant="ghost">
                                <Link href={index()}>Reset pencarian</Link>
                            </Button>
                        )}
                    </form>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <caption className="sr-only">
                                Daftar penerima notifikasi pembelian
                            </caption>
                            <thead className="border-b">
                                <tr>
                                    <th scope="col" className="p-3">
                                        Email
                                    </th>
                                    <th scope="col" className="p-3">
                                        Status
                                    </th>
                                    <th scope="col" className="p-3 text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recipients.data.map((recipient) => (
                                    <tr key={recipient.id} className="border-b">
                                        <td className="p-3 break-all">
                                            {recipient.email}
                                        </td>
                                        <td className="p-3 whitespace-nowrap">
                                            {recipient.is_active
                                                ? 'Aktif'
                                                : 'Tidak aktif'}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={edit(
                                                            recipient.id,
                                                        )}
                                                        aria-label={`Edit ${recipient.email}`}
                                                    >
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    disabled={
                                                        deletingId !== null
                                                    }
                                                    onClick={() =>
                                                        remove(recipient)
                                                    }
                                                    aria-label={`Hapus ${recipient.email}`}
                                                >
                                                    {deletingId === recipient.id
                                                        ? 'Menghapus…'
                                                        : 'Hapus'}
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {recipients.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="p-6 text-center"
                                        >
                                            {filters.search
                                                ? 'Tidak ada email yang cocok dengan pencarian.'
                                                : 'Belum ada penerima. Tambahkan email untuk menerima notifikasi pembelian.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Pagination paginator={recipients} />
                </TableShell>
            </div>
        </>
    );
}
