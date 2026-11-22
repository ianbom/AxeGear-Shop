<x-mail::message>
# Pembayaran pesanan diterima

Pesanan **{{ $order->order_number }}** sudah dibayar melalui QRIS DOKU.

**Pembeli:** {{ $order->customer_name }} ({{ $order->customer_email }})

**Waktu pembayaran:** {{ $order->paid_at?->timezone('Asia/Jakarta')->format('d M Y H:i') }} WIB

**Total pembayaran:** Rp{{ number_format((float) $order->grand_total, 0, ',', '.') }}

@if ($order->payment?->failure_reason)
<x-mail::panel>
Pembayaran sudah diterima, tetapi pesanan memerlukan pemeriksaan admin karena finalisasi stok belum berhasil. Periksa detail pesanan sebelum memproses pengiriman.
</x-mail::panel>
@endif

<x-mail::table>
| Produk | Varian | Jumlah | Subtotal |
| :--- | :--- | ---: | ---: |
@foreach ($order->items as $item)
| {{ $item->product_name }} | {{ collect([$item->color_name, $item->size])->filter()->implode(' / ') }} | {{ $item->quantity }} | Rp{{ number_format((float) $item->subtotal, 0, ',', '.') }} |
@endforeach
</x-mail::table>

<x-mail::button :url="route('admin.orders.show', $order)">
Lihat pesanan di admin
</x-mail::button>

{{ config('app.name') }}
</x-mail::message>
