import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import {
    index,
    store,
    update,
} from '@/actions/App/Http/Controllers/Admin/EmailNotificationController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader, TableShell } from '@/pages/admin/catalog/shared';

type Recipient = { id: number; email: string; is_active: boolean };

export function RecipientForm({
    recipient,
    onSuccess,
    onCancel,
}: {
    recipient?: Recipient;
    onSuccess?: () => void;
    onCancel?: () => void;
}) {
    const form = useForm({
        email: recipient?.email ?? '',
        is_active: recipient?.is_active ?? true,
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.submit(recipient ? update(recipient.id) : store(), {
            preserveScroll: true,
            onSuccess,
        });
    }

    return (
        <form onSubmit={submit} className="space-y-5">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={form.data.email}
                    onChange={(event) =>
                        form.setData('email', event.target.value)
                    }
                    aria-invalid={Boolean(form.errors.email)}
                    aria-describedby={
                        form.errors.email ? 'email-error' : undefined
                    }
                />
                <InputError id="email-error" message={form.errors.email} />
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <Checkbox
                        id="is_active"
                        checked={form.data.is_active}
                        onCheckedChange={(checked) =>
                            form.setData('is_active', checked === true)
                        }
                        aria-invalid={Boolean(form.errors.is_active)}
                        aria-describedby="active-description"
                    />
                    <Label htmlFor="is_active">Aktif menerima notifikasi</Label>
                </div>
                <p
                    id="active-description"
                    className="text-sm text-muted-foreground"
                >
                    Nonaktifkan untuk menghentikan notifikasi tanpa menghapus
                    alamat email.
                </p>
                <InputError message={form.errors.is_active} />
            </div>
            <div className="flex flex-wrap justify-end gap-3 border-t pt-5">
                {onCancel ? (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Batal
                    </Button>
                ) : (
                    <Button asChild variant="outline">
                        <Link href={index()}>Batal</Link>
                    </Button>
                )}
                <Button
                    type="submit"
                    disabled={form.processing}
                    className="bg-foreground text-background hover:bg-foreground/90"
                >
                    {form.processing ? 'Menyimpan…' : 'Simpan penerima'}
                </Button>
            </div>
        </form>
    );
}

export default function EmailNotificationForm({
    recipient,
}: {
    recipient: Recipient;
}) {
    return (
        <>
            <Head title="Edit penerima email" />
            <div className="space-y-6 p-4 md:p-6">
                <PageHeader
                    eyebrow="Email Notifikasi Pembelian"
                    title="Edit penerima email"
                    description="Email ini akan menerima ringkasan pesanan yang sudah dibayar."
                />
                <div className="max-w-xl">
                    <TableShell
                        title="Data penerima"
                        description="Penerima tidak harus memiliki akun admin."
                    >
                        <RecipientForm recipient={recipient} />
                    </TableShell>
                </div>
            </div>
        </>
    );
}
