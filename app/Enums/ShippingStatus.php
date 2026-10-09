<?php

namespace App\Enums;

enum ShippingStatus: string
{
    case NotCreated = 'not_created';
    case Creating = 'creating';
    case Confirmed = 'confirmed';
    case Allocated = 'allocated';
    case Picked = 'picked';
    case InTransit = 'in_transit';
    case Delivered = 'delivered';
    case Cancelled = 'cancelled';
    case Failed = 'failed';
    case Problem = 'problem';
    case Lost = 'lost';
    case Returned = 'returned';

    public static function issueDetails(string $status, ?array $payload = null, bool $forCustomer = false): ?array
    {
        if (self::tryFrom($status) && ! in_array($status, self::issueValues(), true)) {
            return null;
        }

        $providerStatus = data_get($payload, 'status') ?? data_get($payload, 'courier.status') ?? data_get($payload, 'tracking.status');
        $providerStatus = is_string($providerStatus) && trim($providerStatus) !== '' ? strtolower(trim($providerStatus)) : $status;
        $detailStatus = in_array($status, ['lost', 'returned', 'cancelled'], true) ? $status : $providerStatus;
        if (in_array($providerStatus, ['confirmed', 'allocated', 'courier_assigned', 'picking_up', 'picked', 'picked_up', 'in_transit', 'dropping_off', 'on_process', 'on_delivery', 'shipped', 'delivered'], true)) {
            $detailStatus = $status;
        }
        [$label, $description] = match ($detailStatus) {
            'on_hold' => ['Pengiriman tertunda', 'Paket sedang ditahan oleh kurir. Periksa alasan penahanan di dashboard Biteship dan koordinasikan kelanjutan pengiriman. Status ini belum memastikan pengiriman gagal.'],
            'return_in_transit' => ['Paket sedang kembali ke toko', 'Paket sedang dikembalikan oleh kurir dan belum dipastikan diterima toko. Pantau tracking Biteship dan konfirmasikan penerimaan paket oleh toko sebelum menentukan tindak lanjut.'],
            'returned' => ['Paket dikembalikan ke toko', 'Kurir melaporkan paket telah kembali ke pengirim, bukan diterima customer. Verifikasi penerimaan paket dan kondisi barang. Pengiriman ini tidak sampai ke customer; gunakan tindakan gagal dikirim jika tersedia.'],
            'lost' => ['Paket dilaporkan hilang', 'Kurir melaporkan paket hilang sehingga pengiriman tidak dapat diselesaikan. Verifikasi laporan kehilangan di dashboard Biteship dan koordinasikan dengan kurir. Tandai pesanan gagal dikirim setelah kehilangan dipastikan jika tindakan tersedia; tindakan ini tidak mengubah pembayaran atau melakukan refund.'],
            'disposed' => ['Paket dihancurkan oleh kurir', 'Kurir melaporkan paket telah dihancurkan dan tidak dapat diteruskan ke penerima. Verifikasi laporan dan alasan pemusnahan di dashboard Biteship. Tandai pesanan gagal dikirim setelah kondisi dipastikan jika tindakan tersedia; pembayaran dan riwayat shipment tetap dipertahankan.'],
            'damaged' => ['Paket dilaporkan rusak', 'Ada laporan kerusakan paket. Periksa keterangan kurir dan konfirmasikan kondisi barang serta kemungkinan pengiriman dilanjutkan. Status rusak saja belum memastikan paket tidak dapat sampai ke customer.'],
            'rejected' => ['Pengiriman ditolak', 'Kurir melaporkan penolakan pengiriman. Periksa alasan penolakan dan pihak yang menolak di dashboard Biteship. Konfirmasikan apakah kurir akan mencoba mengirim kembali atau mengembalikan paket.'],
            'failed' => ['Pengiriman gagal', 'Booking atau proses pengiriman gagal. Periksa keterangan kegagalan dan hasil booking di dashboard Biteship sebelum menentukan tindak lanjut atau mencoba booking kembali agar tidak terjadi pengiriman ganda.'],
            'cancelled', 'canceled' => ['Pengiriman dibatalkan', 'Pengiriman oleh kurir dibatalkan. Periksa alasan pembatalan dan kondisi paket di dashboard Biteship. Ini tidak otomatis membatalkan pesanan, pembayaran, atau melakukan refund.'],
            'problem' => ['Pengiriman bermasalah', 'Ada kendala pengiriman yang perlu diperiksa bersama kurir. Periksa status asli, keterangan, dan riwayat tracking di dashboard Biteship untuk menentukan tindak lanjut.'],
            default => ['Status pengiriman perlu diperiksa', 'Ada pembaruan dari kurir yang belum dikenali sistem. Periksa status asli dan riwayat tracking di dashboard Biteship; konfirmasikan kondisi paket dengan kurir sebelum mengubah status pesanan.'],
        };

        if ($forCustomer) {
            $description = match ($detailStatus) {
                'lost' => 'Kurir melaporkan paket Anda hilang.',
                'damaged' => 'Kurir melaporkan paket Anda mengalami kerusakan.',
                'on_hold' => 'Pengiriman paket Anda sedang tertunda.',
                'return_in_transit' => 'Paket Anda sedang dikembalikan ke toko.',
                'returned' => 'Kurir melaporkan paket Anda telah kembali ke toko.',
                'disposed' => 'Paket Anda tidak dapat dikirimkan.',
                'rejected' => 'Kurir melaporkan pengiriman paket Anda ditolak.',
                'failed' => 'Pengiriman paket Anda mengalami kegagalan.',
                'cancelled', 'canceled' => 'Pengiriman paket Anda dibatalkan.',
                'problem' => 'Pengiriman paket Anda mengalami kendala.',
                default => 'Status pengiriman paket Anda perlu diperiksa.',
            };
            if ($detailStatus === 'disposed') {
                $label = 'Paket tidak dapat dikirimkan';
            }
        }

        $reason = data_get($payload, 'message') ?? data_get($payload, 'description');

        return [
            'status' => $providerStatus,
            'label' => $label,
            'description' => $description,
            'reason' => is_string($reason) ? mb_substr(trim($reason), 0, 1000) : null,
            'is_terminal' => in_array($status, ['lost', 'returned'], true) || ($status === 'problem' && $providerStatus === 'disposed'),
        ];
    }

    public static function activeValues(): array
    {
        return [self::Creating->value, self::Confirmed->value, self::Allocated->value, self::Picked->value, self::InTransit->value, self::Delivered->value];
    }

    public static function retryableValues(): array
    {
        return [self::NotCreated->value, self::Failed->value, self::Problem->value];
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function issueValues(): array
    {
        return [self::Failed->value, self::Cancelled->value, self::Problem->value, self::Lost->value, self::Returned->value];
    }

    public static function transitions(string $status): array
    {
        return match ($status) {
            self::NotCreated->value => [self::Creating->value],
            self::Creating->value => [self::Confirmed->value, self::Allocated->value, self::Picked->value, self::InTransit->value, self::Delivered->value, self::Cancelled->value, self::Failed->value, self::Problem->value],
            self::Confirmed->value => [self::Allocated->value, self::Picked->value, self::InTransit->value, self::Delivered->value, self::Cancelled->value, self::Failed->value, self::Problem->value],
            self::Allocated->value => [self::Picked->value, self::InTransit->value, self::Delivered->value, self::Cancelled->value, self::Failed->value, self::Problem->value],
            self::Picked->value => [self::InTransit->value, self::Delivered->value, self::Failed->value, self::Problem->value, self::Lost->value, self::Returned->value],
            self::InTransit->value => [self::Delivered->value, self::Failed->value, self::Problem->value, self::Lost->value, self::Returned->value],
            self::Problem->value => [self::Confirmed->value, self::Allocated->value, self::Picked->value, self::InTransit->value, self::Delivered->value, self::Cancelled->value, self::Failed->value, self::Lost->value, self::Returned->value],
            default => [],
        };
    }
}
