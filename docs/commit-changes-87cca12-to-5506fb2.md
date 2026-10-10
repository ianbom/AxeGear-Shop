# Analisis perubahan kode AxeGear

## 1. Batas analisis dan sumber bukti

Laporan disusun pada 10 Oktober 2026. Baseline: `87cca12a7423b9bff6f887375690cbc3f5c57db5`. Endpoint: `5506fb2e75699e8efeb93f2755e539b44bbd7069`. Perubahan dalam commit baseline **tidak termasuk**; rentang `87cca12..5506fb2` mencakup empat commit setelahnya.

Sumber utama: metadata Git, diff endpoint, diff setiap commit, source historis melalui `git show`, manifest/bundle build, serta tests. `prd.md`, `db.md`, dan `design.md` dibaca sebagai konteks kontrak/desain, bukan pengganti implementasi. Ketiganya tidak berubah dalam rentang ini. HEAD saat analisis sama dengan endpoint; working tree bersih sebelum laporan dibuat.

Laporan tidak mengubah aplikasi, database, konfigurasi aktif, atau riwayat Git. Teks percakapan tidak dijadikan bukti bahwa perubahan masuk commit. Pengujian yang tersedia dibedakan dari hasil yang benar-benar dijalankan. Dampak implementasi bukan klaim keberhasilan produksi; risiko dicatat tanpa diperbaiki dalam pekerjaan dokumentasi ini.

## 2. Ringkasan eksekutif

Perubahan memperkuat checkout, pembayaran, stok, dan fulfillment. Voucher tidak lagi menghapus ongkir valid. Konflik stok ketika pembayaran diterima disimpan sebagai `manual_review` secara atomic. Admin mendapat tindakan order/shipment yang divalidasi server. Booking Biteship memakai kurir customer, menolak booking ganda, serta memblokir retry jika hasil booking belum pasti.

Alamat pengiriman menyertakan note lalu subdistrict; `courier.link` pertama dipertahankan saat webhook/refresh. Berat per unit dan dimensi konsisten antara quotation dan booking. Kendala kurir dibedakan antara temporary, perjalanan retur, dan terminal; tidak otomatis membatalkan pembayaran/refund.

Frontend mencakup cart responsif, workflow order admin, pagination bersama, perbaikan halaman produk admin, validasi form, estimator ongkir, kontak berbasis settings, seluruh foto gallery, shopping information, sorting katalog, dan toolbar mobile.

**Temuan penting:** build tersimpan terakhir berasal dari `3c26c92`, sedangkan source frontend berubah lagi pada dua commit berikutnya. Bundle detail produk masih membatasi enam foto dan belum memuat shopping information baru. Deploy tanpa rebuild berisiko memakai UI lama.

## 3. Arsitektur dan statistik

### 3.1 Konteks

Laravel 13/PHP 8.3, Inertia 3, React 19, TypeScript, Tailwind CSS, Vite, Wayfinder, dan Lucide sudah ada pada baseline. Backend memisahkan controller, FormRequest, service, dan action; frontend berupa halaman Inertia dan komponen bersama. Tidak ada dependency baru dalam rentang.

Alur relevan: katalog/varian → cart → alamat/ongkir/voucher → checkout/reservasi → Midtrans/finalisasi stok → proses/packing admin → booking Biteship → tracking → delivered → completed. Payment status, order status, dan shipment status berbeda; pemisahan ini diperketat.

### 3.2 Diff endpoint dengan deteksi rename Git

| Ukuran | Nilai |
| --- | ---: |
| Commit setelah baseline | 4 |
| Entri file berubah | 258 |
| Baris ditambahkan | 43.324 |
| Baris dihapus | 2.293 |
| Added (`A`) | 53 |
| Modified (`M`) | 60 |
| Deleted (`D`) | 23 |
| Rename (`R`) | 122 |

| Kelompok | Entri | Tambahan baris | Penghapusan baris |
| --- | ---: | ---: | ---: |
| Source/tests/config/seeder/gambar/dokumen kecil | 87 | 8.180 | 1.410 |
| Transkrip sesi Codex | 1 | 34.265 | 0 |
| `public/build` | 170 | 879 | 883 |

Kelompok 87 terdiri atas 27 file `app/`, 29 `resources/`, 25 tests, dan enam file lain. Binary tidak mempunyai angka baris. Sebagian besar tambahan baris adalah transkrip, bukan logika aplikasi. Rename merupakan heuristik Git terhadap bundle bernama hash, bukan bukti 122 rename manual.

Tanpa deteksi rename (`--no-renames`), path lama/baru dihitung terpisah: **380 path**, +43.595/-2.564 baris. Union path dari empat diff commit juga 380. Tidak ditemukan path yang hanya muncul di commit perantara lalu hilang di luar inventaris endpoint tanpa rename. Perbedaan statistik berasal dari representasi rename, bukan fitur tambahan.

## 4. Kronologi commit

Timestamp author Git berikut memakai zona `+07:00`. Statistik per commit tidak dijumlahkan sebagai diff endpoint karena file bisa berubah berulang kali.

| Commit | Tanggal | Pesan | Statistik |
| --- | --- | --- | --- |
| `d8229d7e10fa5259b9093d6357c99fa7c3ed61d8` | 9 Oktober 2026, 00:45:02 | perbaikan cart dan checkout | 5 file; +189/-53 |
| `3c26c924d1d0e1e3e162056ea272468095a12a1e` | 9 Oktober 2026, 20:47:17 | perbaikan voucher, cart, midtrans | 217 file; +37.416/-1.776 |
| `c889c1bbab1f56dea68a2365101d7b34a54365f7` | 10 Oktober 2026, 00:56:41 | perbaikan fungsi order midtrans | 26 file; +3.397/-436 |
| `5506fb2e75699e8efeb93f2755e539b44bbd7069` | 10 Oktober 2026, 03:33:06 | perbaikan webhook biteship dan ongkir sempet salah kirim | 31 file; +2.385/-91 |

### 4.1 `d8229d7`

- Voucher mempertahankan rate/binding ongkir; remove voucher membersihkan checkout kedaluwarsa.
- Cart memakai track fleksibel/container query, identitas produk vertikal, truncation, tombol hapus dalam flow. Ringkasan menghilangkan baris estimasi ongkir/diskon.
- Copy checkout tidak menyebut provider pada teks bantuan.
- Menambah test voucher/ongkir dan screenshot referensi `cartt.png`.

### 4.2 `3c26c92`

- Guard pembayaran, inventory manual review, transaction finalisasi stok, lock order pada webhook/sync, logging terbatas.
- Aturan transisi shipment dan tindakan order dari server; perlindungan duplicate/uncertain booking; sinkronisasi fulfillment.
- Canonical settings, seeder identitas AxeGear, contoh environment, dan konfigurasi testing.
- Helper workflow/pagination, daftar admin, layout daftar/detail produk, detail order/shipment; item Halaman sidebar dihapus.
- Deskripsi produk dipindah dalam grid agar mobile setelah informasi pembelian; dimensi masih tampil saat commit ini.
- Tests fulfillment/Midtrans/settings/workflow/pagination dan penyesuaian test email shipment.
- Transkrip sesi, build assets, dan manifest ditambahkan/diganti. Hanya commit ini memperbarui build tersimpan.

### 4.3 `c889c1b`

- Booking detail order memakai `source: order_detail` dan kurir tersimpan customer; redirect ke detail order.
- Stock movements historis, timestamp ISO detail admin, dan formatting WIB.
- Contact controller/settings dan form WhatsApp tanpa endpoint pesan baru.
- Pesan validasi produk Indonesia, field SKU duplikat spesifik, dialog/fokus form.
- Detail produk tanpa berat/dimensi customer, seluruh gallery, deskripsi rapi, shopping information/bantuan.
- Sorting eksplisit/default newest, reset infinite-scroll; tests kontak/validasi/sorting/gallery/deskripsi/shopping.
- Build tidak diperbarui.

### 4.4 `5506fb2`

- Detail kendala kurir admin/customer, terminal protection, tindakan gagal kirim dengan reason/audit tanpa perubahan payment/stok.
- Link tracking lama dipertahankan; webhook mempertahankan metadata nested courier.
- Alamat note/subdistrict, unit weight, dimensi quotation/cart hash.
- Estimator produk admin: validasi, throttle, simulasi 1 KM, debounce/abort.
- WhatsApp support order, progres issue, toolbar/grid katalog mobile.
- Tests shipping issues/estimate/tracking/support/mobile dan perluasan regression tests. Build tetap tidak diperbarui.

## 5. Perubahan backend dan proses bisnis

### 5.1 Voucher dan quotation checkout

File utama: `app/Services/Customer/CheckoutService.php`.

Sebelum, apply/remove voucher menghapus `checkout.shipping_rates`, `checkout.shipping_rate_id`, dan `checkout.selected_rate_binding`; customer harus memilih ulang ongkir meskipun alamat/cart tetap valid. Sesudah, voucher hanya mengubah voucher/discount; shipping rate/binding dipertahankan. `removeVoucher()` terlebih dahulu membersihkan checkout kedaluwarsa. Pemeriksaan ownership alamat, binding, expiry, cart hash, dan refresh harga provider tidak dihapus.

`cartItems()` menambahkan `length`, `width`, `height` dari produk. Mapper Biteship mengirim dimensi dan memfilter nilai kosong tanpa membuang nilai 0. `cartHash()` memasukkan weight dan seluruh dimensi, sehingga perubahan atribut fisik setelah rate dipilih membatalkan binding lama.

Berat cart adalah berat produk × quantity. Quotation sudah menggunakan berat per unit; booking yang sebelumnya mengirim berat agregat kini membagi snapshot weight dengan quantity, membulatkan ke atas, minimal 1 gram. Quantity tetap terpisah. Ini menghindari perkalian berat dua kali untuk quantity >1; dimensi juga ikut rate/booking dari data yang relevan.

### 5.2 Midtrans, status payment, dan finalisasi stok

File: `app/Actions/Payments/ApplyMidtransPaymentStatusAction.php`, `app/Actions/Payments/SyncMidtransPaymentAction.php`, `app/Actions/Stock/FinalizeReservedStockAction.php`, `app/Services/Customer/MidtransWebhookService.php`, `app/Http/Controllers/Customer/MidtransWebhookController.php`.

Guard baru `canApply()`:

| Payment status order | Event yang boleh diterapkan |
| --- | --- |
| Tidak ada order/state atau `refunded` | Tidak ada |
| `partially_refunded` | `refund`, `partial_refund` |
| `paid` | `settlement`, `refund`, `partial_refund`, atau `capture` + fraud `accept` |
| State lainnya | Diteruskan ke pemetaan status existing |

Webhook/sync memanggil guard sebelum mengganti metadata payment; event lama tidak menimpa transaction status/raw response yang lebih final. Action memakai guard yang sama. Log event bisa dicatat sebelum guard, sehingga state tidak berubah tetapi event tetap tercatat.

Pada order sudah paid, `markPaid()` hanya melengkapi `payment.paid_at` bila kosong lalu berhenti. Stok/notifikasi tidak diproses ulang. Pada pembayaran baru, hanya `pending_payment` menjadi `paid`; fulfillment yang sudah berjalan dipertahankan. `failure_reason` dibersihkan setelah sukses.

Finalisasi stok mempunyai transaction sendiri, lock order/varian, dan invariant stock/reserved stock. Konflik pada item mana pun me-rollback perubahan stok/log item sebelumnya. Action pembayaran menangkap `DomainException`, menyimpan order `manual_review`/`pending_payment`, payment `manual_review` plus `failure_reason`, lalu tidak melempar ulang exception domain tersebut.

Konflik inventory yang ditangani dapat mendapat HTTP 200 sambil menunggu review, bukan rollback seluruh pencatatan payment dan memicu retry terus. **Bukan semua error menjadi 200:** field wajib hilang, signature invalid, payment tidak ditemukan, serta exception tak terduga tetap mengikuti error existing. Signature/amount/hash validation sudah ada; dipertahankan dan diuji lebih luas. Amount mismatch dicatat tanpa paid dan dapat diakui jalur controller.

Webhook dan sync menambahkan lock pada relasi order selain payment. Controller tidak lagi log seluruh request; hanya metadata string order ID/status serta keberhasilan `http_status=200`. Payload lengkap tetap ada pada payment logs/raw response sesuai jalur existing: ini pengurangan exposure log aplikasi, bukan penghapusan seluruh data sensitif.

`MidtransService` tidak berubah. Perubahan pada state processing, locking, stok, dan acknowledgement; bukan SDK/endpoint provider baru.

### 5.3 Fulfillment order dan audit admin

File: `app/Services/Admin/OrderManagementService.php`, admin `OrderController`, `OrderStatusRequest`.

Transisi normal pada order paid: `paid` → `processing`, `processing` → `ready_to_ship`, `delivered` → `completed` bila shipping status order/shipment sama-sama delivered. Order non-paid tidak memperoleh tindakan fulfillment. Target cancellation dihapus dari endpoint ini; tidak ada flow refund/cancellation baru.

`allowedStatuses()` menjadi keputusan server. Update memakai transaction, lock order/shipment, dan revalidasi target. `completed_at` pertama dipertahankan. Pembatasan bukan hanya tombol frontend.

Admin dapat menandai `shipment_failed` untuk terminal issue terkonfirmasi (`lost`, `returned`, `problem` dengan provider `disposed`), bila lifecycle memenuhi syarat dan snapshot shipping order/shipment konsisten. Reason wajib, trim nonempty, maksimal 1.000 karakter. Tracking audit memakai source `admin_order_failure`, actor ID/reason/waktu dan notifikasi customer. Tidak refund, mengubah nominal payment, atau mengembalikan stok otomatis.

Detail admin menambah `allowedStatuses`, `shipping_issue`, `created_at`, `status_history` dari `AdminActivityLog` referensi `admin.orders.status`, actor/reason; `items[].stock_movements` dari `StockLog` milik order dan varian terkait (quantity/before/after/waktu), bukan stok terkini. Timestamp detail order, payment logs, tracking, movement menjadi ISO; format list order tetap. Controller menyediakan `can_create_shipment` dan `booking_uncertain` memakai aturan server dan kelengkapan kurir.

### 5.4 Booking Biteship dan refresh

File: `app/Services/Admin/ShipmentManagementService.php`, admin `ShipmentController`, `CreateShipmentRequest`, `ShipmentStatusRequest`, `app/Services/Integrations/BiteshipService.php`.

Booking membutuhkan paid dan ready-to-ship/state masalah yang diizinkan. Shipment tidak boleh punya provider ID, uncertain booking, atau status nonretryable; issue terminal tidak dibooking ulang. `canCreateShipment()` dipakai data UI dan dicek kembali pada transaction.

Input opsional baru `source=order_detail`: company/type/service/estimated delivery dibaca dari shipment tersimpan customer, menolak pilihan tidak lengkap. Input kurir tambahan tidak menggantinya; label upload jalur ini tidak dipakai. Tanpa source, flow halaman shipment tetap. Courier fields `required_unless:source,order_detail`; source lain ditolak.

Order ikut `shipping_status=creating` saat booking mulai. Provider call di luar transaction persiapan; hasil disimpan transaction berikutnya. Respons tanpa ID dianggap tidak pasti. Failure mengunci kembali order/shipment, menyimpan failed reason, sync time, dan `booking_uncertain` untuk exception selain `ValidationException`, kemudian sinkronisasi order.

POST create order memakai `retry(1, 0, throw: false)`; server error dilempar, non-success lain menjadi validation error. Hasil server/transport mungkin telah membuat booking; UI memblokir retry uncertain agar tidak ganda. Sukses memvalidasi status provider terhadap transisi, mengisi shipped/delivered timestamp bila sesuai, mempertahankan tracking pembuatan/notifikasi/email. Key service name/estimasi opsional diakses aman.

Refresh tanpa provider ID kini validation error, bukan menambah tracking seolah berhasil. Dengan ID, retrieve diproses melalui jalur payload tracking yang sama. Controller memberi feedback error transport; validation mengikuti Laravel. Booking `order_detail` redirect ke detail order; flow shipment lama tetap ke detail shipment.

### 5.5 State machine dan shipping issues

`app/Enums/ShippingStatus.php` menambah `transitions()` dan `issueDetails()`, bukan migration/nilai enum DB baru.

Normalisasi membedakan confirmed; allocated/courier_assigned/picking_up; picked/picked_up; in-transit/dropping_off/on_process/on_delivery/shipped. On-hold, return-in-transit, disposed, damaged, dan unknown menjadi problem dengan detail provider; rejected menjadi failed; lost/returned tersendiri.

Transisi bergerak maju. Sesudah pickup atau riwayat in-transit, tidak kembali ke booking/pickup lama. Problem bisa pulih tetapi dibatasi sejarah. Riwayat `return_in_transit` mencegah regresi arah retur menjadi pengiriman normal. Failed dapat menerima event retur/lost/disposed tertentu.

`shipping_issue` berisi status/label/description/reason (maksimal 1.000 karakter)/is_terminal. Temporary hold, damaged, rejected, unknown tidak otomatis berarti gagal final. Terminal: lost, returned, disposed pada problem. Copy customer lebih ringkas; arahan operasional Biteship untuk admin.

Manual shipment update mensyaratkan provider booking, paid/nonterminal yang relevan, transisi legal, description wajib maksimal 500 karakter. Actor ID/nama masuk tracking; delivered/cancelled timestamp pertama tetap.

Payload processing mempertahankan hash deduplication dan timestamp stale filter existing, menambah perlindungan terminal/regresi, serta memperbarui `last_synced_at` bahkan duplicate/stale yang diabaikan. Source tracking berasal dari argumen internal; key source provider dibuang sebelum digabung, mencegah pemalsuan marker keputusan admin.

`synchronizeOrder()` membedakan logistik/uang: cancelled shipment menjadi masalah pengiriman, bukan cancelled order paid; picked/in-transit menjadi shipped, delivered menjadi delivered, failed/lost/returned menjadi state terkait. Completed/cancelled/refunded tidak diturunkan. Keputusan gagal kirim manual dengan audit marker dipertahankan meskipun provider mengubah shipping status berikutnya.

### 5.6 Alamat snapshot dan courier link

Destination: snapshot `full_address` order, lalu ` (note)` jika terisi, lalu `, subdistrict` jika terisi. Note/subdistrict di-trim; `destination_note` juga dikirim terpisah. Fallback `address_note` lama diganti field `note`. Bukan alamat customer terbaru yang berubah setelah checkout.

`BiteshipWebhookController` mempertahankan nested `courier.link`/`courier.status`. Service sebelumnya mengganti seluruh raw response sehingga link hilang/berganti. Sekarang payload terbaru tetap menjadi raw response, tetapi courier link tersimpan yang filled disalin kembali; first link diterima bila belum ada. Metadata lain/raw payload event tetap diperbarui.

Perbaikan berlaku webhook/refresh Biteship. **Midtrans tidak menulis shipment raw response**; test memastikan payment ulang tidak mengubah shipment. Tidak ada backfill untuk link historis yang sudah hilang.

### 5.7 Canonical site settings

File: `SiteSettingService`, `SettingManagementService`, `SettingRequest`, `SiteSettingSeeder`.

| Alias lama | Canonical |
| --- | --- |
| `shipper_name` | `store_name` |
| `whatsapp_number`, `contact_phone`, `shipper_phone` | `store_phone` |
| `origin_address`, `contact_address` | `store_address` |

Canonical menang jika key ada, termasuk explicit null; alias tidak menghidupkan nilai lama. Jika canonical belum ada, alias pertama sesuai urutan mapping digunakan. Alias dibuang dari hasil canonicalization. `get()` tetap bisa mengembalikan default saat hasil null.

Request canonicalize sebelum validasi; dashboard menampilkan identity sekali, prefill legacy, menyimpan canonical input. Maps URL masuk kelompok toko. Identitas shipper/WhatsApp memakai store settings; shipping tetap mengatur koordinat/wilayah/postal/kurir. Record legacy tidak dihapus/dimigrasikan otomatis.

Seeder berganti dari Auréa Syar'i/Surabaya ke AxeGear, email/nomor toko, alamat Ciater/Serpong/Tangerang Selatan, Banten, postal 15310, koordinat `-6.314540`/`106.699569`, maps URL, kurir `jnt,jne`; tidak membuat alias identitas lagi. Perubahan seed bukan bukti database aktif sudah diubah.

### 5.8 Kontak dan dukungan

GET `/contact` mempertahankan nama route `contact`, beralih dari `Route::inertia` menjadi `ContactController`. Props `contactSettings` hanya memuat daftar key publik, canonicalized, null eksplisit bila tidak ada setting.

Customer `OrderController::show()` menambahkan `supportPhone` dari `store_phone`. `OrderService` menyediakan `shipping_issue` versi customer. Otorisasi order tidak diganti; test memastikan order customer lain tidak terbuka. Tidak ada endpoint pesan, tabel kontak, atau integrasi WhatsApp API baru.

### 5.9 Sorting katalog

`ProductBrowsingService` mengganti default featured menjadi latest. Option kini pasangan value/order: newest/oldest, nama A–Z/Z–A, harga low/high; featured/best seller tetap. Tie-breaker ID mengikuti arah sort, menjaga hasil ketika primary value sama. Harga mengikuti effective/sale price query existing. Filtering/sorting sebelum pagination, query string dipertahankan; parameter invalid kembali newest-first.

### 5.10 Validasi produk dan estimator ongkir

`ProductRequest` menambah messages/attributes Indonesia untuk produk/gambar/varian; pesan publikasi menjelaskan berat minimum, gambar/primary, varian aktif berstok. Error primary image hanya ditambahkan bila koleksi gambar tidak kosong, menghindari pesan berulang saat belum ada gambar. Ownership/rules existing tidak dihapus.

`ProductManagementService` memberi error `variants.<index>.sku` untuk setiap duplicate/taken SKU dan ringkasan `variants`, bukan hanya pesan umum. SKU varian sendiri pada edit tetap boleh. Pesan reserved stock menjadi Indonesia.

Endpoint baru `POST /admin/products/shipping-estimate` (`admin.products.shipping-estimate`) menerima weight/length/width/height required numeric >0 maksimal 1.000.000.000. Admin aktif saja, `throttle:30,1`, mengecualikan middleware `admin.activity` supaya request simulasi otomatis tidak mengotori audit log.

`BiteshipService::productShippingEstimate()` memakai koordinat toko dan tujuan 1 KM garis lurus ke utara: offset latitude berdasarkan radius bumi 6.371.000 meter, longitude sama. Koordinat/kurir/API key/provider error divalidasi. Payload satu produk belum tersimpan, quantity 1, value 0, dimensi input; rate diurutkan harga. Controller mengembalikan `{ rates: [...] }`; connection failure HTTP 503 dengan pesan aman. Ini bukan ongkir final/jaminan jarak jalan. Extraction `requestRates()` berbagi mapper; checkout tetap memakai postal code/tujuan customer.

## 6. Perubahan frontend

### 6.1 Cart dan checkout

`customer/cart/my-cart.tsx` menjadi dua kolom pada xl, summary maksimum 380 px. Container query 720 px menggantikan ketergantungan lebar viewport untuk header/baris tabel. Track produk/harga/subtotal fleksibel, quantity 128 px, delete 40 px. Layar sempit memakai label per nilai; delete tidak lagi absolute overlay.

Identitas item vertikal: gambar/nama/varian-SKU, gambar terkendali, nama truncate/title (fallback tanpa link juga dipotong 23 karakter). Angka panjang dapat wrap; price/subtotal rata tengah pada tabel. Total summary dapat wrap/font lebih kecil mobile. Baris estimasi shipping/discount dihapus dari cart, bukan dari perhitungan checkout. Suggested products menjadi kartu vertikal. Screenshot `cartt.png` adalah referensi, bukan visual QA baru.

`checkout/checkout.tsx` hanya copy bantuan/pembayaran/pengiriman pada diff endpoint: tidak lagi menyebut provider secara eksplisit. Handler checkout/payment frontend tidak diubah pada file ini.

### 6.2 Detail produk: urutan, deskripsi, galeri

`customer/products/detail-product.tsx` memisahkan gallery/informasi pembelian/deskripsi dalam grid desktop. Desktop deskripsi di bawah gallery; shopping information di kanan setelah cart. Mobile: gallery → informasi/varian/quantity/Add to Cart → Product Description → Shopping Information.

Type/tampilan Weight/Length/Width/Height dihapus dari customer UI; backend/shipping tetap membutuhkan data. Product Line/Style Name tampil bila terisi. Deskripsi diberi border/hierarchy font/spacing/word wrap. Section tidak dibuat jika description dan metadata kosong, bukan placeholder kosong.

Gallery tidak memakai `slice(0,6)` lagi. Semua thumbnail ditampilkan dalam container horizontal mobile/vertikal desktop. Previous/next memilih active index, disabled di batas; thumbnail aria-pressed/alt/lazy. Effect menggulir active thumbnail agar terlihat. Test backend memastikan seluruh foto produk/varian aktif tersedia tanpa duplicate; mapper gallery backend tidak diubah dalam rentang (diff browsing service adalah sort/import), sehingga jangan menganggap semua logic photo baru diperkenalkan.

### 6.3 Shopping information

Komponen lokal `ProductShoppingInformation` menggantikan service strip lama yang tidak aktif:

- Tiga benefit: Secure Shopping, Careful Packaging, Customer Support; outline icons orange.
- Panel Shipping Information/Order Processing: rate pada checkout, persiapan setelah konfirmasi payment.
- Accordion Product Care Guide, Shipping & Delivery, Returns & Exchanges. Awalnya collapsed; satu terbuka; Collapsible existing, header button, plus/minus, transisi ringan.
- Need Help/Chat With Us menuju generated contact route, bukan nomor hardcoded.

Konten statis tanpa shipping API, fake requests, atau jaminan return period. Dua placement dibatasi visibility desktop/mobile; mobile setelah description. Tidak mengubah cart/dependency/theme global.

### 6.4 Katalog mobile dan sorting

`customer/products/list-product.tsx` menambahkan `sorts[].order`, select gabungan sort:order, mengirim kedua parameter sekaligus. Default latest desc sama dengan backend. Visit me-reset products agar infinite-scroll hasil lama tidak tercampur.

Mobile search full row, Filter/Sort berdampingan dengan ikon. Native select masih area interaksi, focus/label/aria tersedia. Grid dan skeleton dua kolom hingga md, lalu tiga/empat pada layar lebih besar. Padding image/badge/text/price dikompakkan; banner tetap. Bukan sorting client-only atas satu halaman.

### 6.5 Detail order customer

`customer/order/detail-order.tsx` memperluas label/tone, badge shipping, panel Kendala pengiriman, serta arahan support. Progress mempertimbangkan paid/shipped timestamp dan tracking, bukan hanya order status yang bermasalah; issue membatasi progres agar tidak terkesan berhasil selesai.

`getBiteshipTrackingUrl()` trim/parse courier link, hanya HTTP/HTTPS. Lacak Pesanan memakai link ini tanpa guard shipped yang menonaktifkan. Perubahan helper terhadap baseline adalah validasi URL; preservasi backend mencegah target hilang ketika status berganti.

Dukungan yang sebelumnya `/notifications` sekarang WhatsApp dari supportPhone: separator dibuang, local 0 menjadi 62, digit internasional divalidasi. Missing/invalid menampilkan target unavailable dan pesan nomor belum tersedia, bukan nomor buatan.

**Riwayat Pengiriman:** judul section tersebut tidak ada pada baseline/endpoint. Tidak dicatat sebagai penghapusan antar-commit. Trackings backend tetap untuk progres/admin; customer tracking memakai courier link. Percakapan/perubahan lokal yang tidak masuk snapshot Git tidak dihitung.

### 6.6 Workflow/detail order admin

`resources/js/lib/order-workflow.ts` menambah type ShippingIssue dan helper getOrderWorkflow. Progres memakai order/payment/shipment timestamp/history/tracking; issue dipisahkan; completed hanya tanpa issue. Helper tampilan, bukan validasi bisnis.

`admin/orders/show.tsx` mengganti dropdown/transisi lokal dengan tindakan dari server allowedStatuses. Labels proses/packing/completed/gagal kirim jelas. Gagal kirim membuka reason dialog; booking membuka konfirmasi booking nyata dengan alamat/kurir/biaya. Busy guard dan error inline mencegah duplicate action/kehilangan konteks.

Booking memakai Wayfinder/source order_detail, tracking refresh hanya dengan provider ID; uncertain dijelaskan. Link/sync payment dan shipment memakai generated routes. Activity menggabungkan history; stock movements per item; ISO ditampilkan Asia/Jakarta/WIB dengan invalid-date fallback. Tab Activity/link View All Activity dihapus; audit bukan dihapus, tampil dalam halaman terkait.

### 6.7 Detail shipment admin

`admin/shipments/show.tsx` memakai legal status options server; status awal kosong, description wajib, reset sesudah sukses. Actor manual ditampilkan. Booking hanya jika can_create_shipment; uncertain/failure reason/last sync tersedia; refresh disabled tanpa provider ID.

Dokumen lokal menjadi **AxeGear Packing Document**, jelas bukan label resmi kurir. Aksi provider menjadi Buka label / tautan kurir; menghindari HTML lokal dianggap resi resmi. Order/booking/refresh/status memakai Wayfinder, tidak ada endpoint print baru.

### 6.8 Produk admin

`admin/products/index.tsx`: desktop table-fixed/colgroup proporsional, typography/padding lg lebih kecil, long cells truncate/title, harga/state tertata, horizontal overflow tetap di layar kecil; actions punya aria label; pagination bersama.

`admin/products/show.tsx`: header/actions, kartu statistik, gallery/thumb horizontal, informasi/deskripsi, tabel varian/data terkait dalam dua kolom xl fleksibel. min-w-0, overflow lokal, image bounds, word wrap mencegah konten saling berbenturan. Fokus hierarchy/layout, bukan struktur data backend baru.

### 6.9 Form produk dan estimator

`admin/products/form.tsx`: field labels/error summary Indonesia, invalid markers, aria-invalid/describedby, fokus/scroll ke field error paling spesifik. Image error ke upload; varian error disorot/indeks diurutkan. Dialog varian existing bisa otomatis dibuka pada varian invalid, focus field/restoration saat close. Draft/form/file tidak dibuang akibat validasi. Submit store/update memakai generated routes.

Komponen baru `admin/products/shipping-estimate.tsx`: menerima dimensi form sebelum save; validasi lokal; debounce 800 ms, AbortController, input signature agar respons lama tidak tampil untuk input baru. Fetch generated POST, same-origin credentials, XSRF token, JSON; loading/success/empty/error/retry/live region. Copy: satu produk, 1 KM garis lurus ke utara, dimensi produk utama, tanpa asuransi; jarak jalan/rate checkout dapat berbeda. Komponen ditanam dalam form walaupun path berada dalam pages.

### 6.10 Pagination dan shell admin

`resources/js/lib/pagination.ts`: previous/next dari English label, pagination.previous/next, entities/guillemets/arrows. PaginationLabel menampilkan Chevron plus sr-only; angka/ellipsis text, tidak dangerouslySetInnerHTML. `admin/catalog/shared.tsx` menghapus cleanPageLabel dan memakai shared label.

Migrasi daftar: admin-users, categories, collections, customer-addresses, customers, notifications, orders, payments, product-variants, products, shipments, stock. Product-variants juga line-wrap harga tanpa mengubah perhitungan. Per-page 10/50/100 tetap.

Sidebar menghapus item Halaman `/admin/pages`, bukan route/controller halaman. Shell overflow-x-hidden menjadi overflow-x-clip, JSX dirapikan; bukan theme redesign.

### 6.11 Contact

`contact/index.tsx` memakai props settings: identitas, jam kerja, maps, sosial. HTTP/HTTPS links/email/nomor WhatsApp divalidasi. Embed maps memakai koordinat valid atau address; map link memakai setting valid atau search fallback; sosial hanya URL usable.

Form nama/pesan maksimal 1.000 karakter, errors untuk missing/invalid, navigasi WhatsApp dengan pesan encode. Tidak menyimpan pesan DB, kirim email server, atau mock API. Missing settings ditangani explicit fallback. Hero memakai gambar eksternal yang ada di halaman; tidak mengubah aset katalog.

## 7. Kontrak/configuration dan compatibility

| Area | Perubahan |
| --- | --- |
| GET contact | Props contactSettings/controller; route name tetap |
| POST admin shipping estimate | Endpoint/dimensi input/rates JSON/throttle/admin aktif baru |
| POST create shipment | Optional source order_detail; conditional courier required; server eligibility |
| POST order status | Cancellation dihapus; shipment_failed dan reason kondisional |
| POST shipment status | Request values failed/lost/returned; description required; legal transitions |
| Detail order admin | Actions/issue/history/stock movements/booking flags, ISO timestamps |
| Detail shipment admin | Flags/failure/sync/actor/legal status options |
| Detail order customer | supportPhone dan shipping_issue |
| Catalog options | order tambahan, latest default, id tie-breaker |
| Checkout/provider items | Dimensi/hash, booking weight per unit |
| Settings | Canonical identity dan alias compatibility |

`.env.example` mengganti APP_NAME Laravel menjadi AxeGear, MAIL_FROM_ADDRESS menjadi email toko; tidak mengubah .env aktif/credential.

`phpunit.xml` force SQLite/:memory:/DB_URL kosong; forced config/routes cache paths khusus testing. Mengurangi risiko .env/cache runtime mengarahkan tests ke DB lain; tetap verifikasi isi cache testing sebelum database tests.

Tidak ada perubahan migrations/models/routes/api.php/composer/package manifests/lockfiles. Tidak ada schema/dependency baru atau payment/webhook endpoint baru. Generated Wayfinder source tidak diubah manual/tercatat diff; frontend mengadopsi functions routes existing/baru.

`product-link.md`: lima raw image URLs menjadi Markdown links, menambah local paste-image reference. Dokumen referensi, bukan image loader produk. Path paste image tidak ditambahkan dalam rentang; referensi relatif perlu diperiksa.

## 8. Pengujian yang berubah

25 file: 22 baru, tiga modified; 14 PHP feature tests dan 11 Node scripts. Feature tests DB terkait mengaktifkan RefreshDatabase lokal; global tests/Pest.php masih tidak mengaktifkan untuk semua suite.

### 8.1 PHP feature tests

| File | Status dan skenario |
| --- | --- |
| `tests/Feature/Admin/OrderFulfillmentWorkflowTest.php` | Baru; server actions, paid/packing/delivered/completed, audit/stock history/ISO, legal manual override, duplicate/uncertain booking, courier snapshot, auth/redirect/refresh, note/subdistrict, payment metadata tidak mundur |
| `tests/Feature/Admin/OrderShippingIssueTest.php` | Baru; temporary/terminal, copy admin/customer, recovery/retur, reason/audit/notifikasi tanpa money-stock changes, lifecycle/auth/terminal/stale, provider source tidak memalsukan audit |
| `tests/Feature/Admin/ProductShippingEstimateTest.php` | Baru; unsaved product/1 KM/sorted rates, dimensi/coordinates/admin/login/empty/provider/API key/connection/throttle, checkout destination tetap |
| `tests/Feature/Admin/ProductValidationTest.php` | Baru; create/edit localized fields, SKU indices/duplicates/taken/own SKU, image/publication rules |
| `tests/Feature/Admin/ShipmentCreatedMailTest.php` | Modified; ready-to-ship fixture dan canonical/legacy shipper; email customer tetap |
| `tests/Feature/Admin/SiteSettingsTest.php` | Baru; seed tanpa duplicate identity, canonical precedence, legacy prefill/submission disimpan canonical |
| `tests/Feature/ContactPageTest.php` | Baru; DB public contacts/live changes/legacy precedence/missing null |
| `tests/Feature/Customer/BiteshipShippingRateTest.php` | Modified; postal tetap, quote-book unit weight/dimensions, perubahan atribut/rate menolak binding lama |
| `tests/Feature/Customer/CheckoutVoucherShippingTest.php` | Baru; voucher apply/remove menjaga rate, tanpa selected rate, expired clearing |
| `tests/Feature/Customer/MidtransWebhookTest.php` | Baru; settlement/capture/duplicate/stock-notify once, shipment unchanged, atomic inventory/manual review/recovery, signature/fields/amount/lookup/unexpected error/safe logging |
| `tests/Feature/Customer/OrderSupportPhoneTest.php` | Baru; canonical/legacy/missing phone dan ownership |
| `tests/Feature/Customer/ProductDetailCartStateTest.php` | Modified; cart quantities existing, semua product/active-variant photos tanpa duplicate |
| `tests/Feature/Customer/ProductListSortingTest.php` | Baru; enam arah/stable ties/sale price/fallback/filter-before-pagination/query string |
| `tests/Feature/Customer/ShipmentTrackingLinkTest.php` | Baru; link asli empty/replacement/webhook/refresh/completed; first link bila kosong |

### 8.2 Node scripts

| File | Fokus |
| --- | --- |
| `tests/contact-page.test.mjs` | Contacts, form, WhatsApp encoding/validation, maps fallback/safe links |
| `tests/order-shipping-issue.test.mjs` | Workflow issue/UI tindakan dan descriptions |
| `tests/order-tracking.test.mjs` | HTTP/HTTPS tracking, CTA, WhatsApp target/normalization |
| `tests/order-workflow.test.mjs` | Progress lifecycle/issue/historical evidence |
| `tests/pagination.test.mjs` | Parsing previous/next/labels |
| `tests/product-description.test.mjs` | Metadata tanpa dimensi, section order |
| `tests/product-gallery.test.mjs` | All thumbnails, handlers, boundaries/selection |
| `tests/product-list-mobile.test.mjs` | Source toolbar/filter/sort/grid mobile |
| `tests/product-shipping-estimate.test.mjs` | Source request/CSRF/debounce/abort/validation/states |
| `tests/product-shopping-information.test.mjs` | Content/placement/accordion/contact CTA |
| `tests/product-validation.test.mjs` | Modal/errors/focus/variants/draft-file/navigation/images |

Sebagian membaca source/mengeksekusi komponen atau helper melalui transpilation/VM; **bukan browser QA** untuk CSS/ukuran/focus trap/network/layout shift. Kehadiran tests bukan bukti semuanya pernah lulus saat commit dibuat.

## 9. Artifacts

`public/build`: 170 entri, 122 renamed assets, 24 added, 23 deleted, satu manifest modified. Entry app/CSS, UI/icons/library/layout chunks, pages customer/admin/auth, import/dynamicImport manifest diperbarui. Hash/reference churn tidak selalu berarti fitur baru; 38 rename similarity 100%, sisanya 72–99%. Semua old/new paths ada lampiran tanpa menyalin minified code.

`cartt.png`: screenshot cart desktop, 1.122.379 byte; referensi UI, bukan runtime/visual QA baru.

`codex-session-01a11536-86f5-70a3-bb2f-1faed94b9b70.md`: ditambahkan 3c26c92, 34.265 baris/2.108.940 byte. Transkrip development, bukan source runtime/spesifikasi formal/bukti semua command sukses. Tidak disalin. Perlu audit sebelum publikasi karena dapat membawa konteks internal/path lokal/payload/sensitive data; laporan tidak mengklaim full secret scan.

## 10. Perubahan perantara

- 3c26c92 memindahkan deskripsi produk dalam grid mobile, dimensi masih tampil; c889c1b menghapus dimensi customer dan menambah shopping information.
- Workflow/status initial pada 3c26c92, stock-history/detail booking c889c1b, issue/gagal kirim 5506fb2.
- phpunit.xml berubah pada 3c26c92 dan c889c1b; kondisi akhir force memory/cache testing.
- Dimensi customer dihapus dari UI, justru dipakai lebih lengkap pada shipping/hash/estimator akhir.
- Build 3c26c92 adalah snapshot perantara, bukan source endpoint lengkap.
- Riwayat Pengiriman dalam percakapan tidak terbukti sebagai section yang dihapus antar-endpoint. Audit/tracking backend tetap.
- Union tanpa rename tidak menemukan path sementara di luar inventaris endpoint. Tidak ditemukan file non-build berubah lalu kembali identik baseline; tidak berarti tidak pernah ada edit lokal sebelum commit.

## 11. Risiko dan tindak lanjut

### 11.1 Build tidak sinkron — terkonfirmasi

Manifest terakhir berubah 3c26c92. Endpoint detail-product menunjuk `assets/detail-product-B4YLDmg3.js`, masih berisi `.slice(0,6)`, tanpa Secure Shopping/Product Care Guide. Entry `resources/js/pages/admin/products/shipping-estimate.tsx` tidak ada di manifest tersimpan. Urutan commit dan bundle membuktikan assets belum mencakup frontend akhir.

Deploy memakai tracked build tanpa rebuild berisiko UI/gallery/routes lama. Tindak lanjut: build source akhir di pipeline/deploy, verifikasi manifest/browser. Laporan tidak build agar tracked artifacts tidak berubah.

### 11.2 Manual review dan uncertain booking

Payment manual_review membutuhkan pemeriksaan inventory/payment dan sync terkontrol; HTTP 200 bukan berarti fulfillment selesai. Uncertain booking sengaja tidak retry otomatis; tidak ada endpoint rekonsiliasi baru untuk menautkan booking yang berhasil tetapi respons hilang. Perlu prosedur pengecekan provider sebelum tindak lanjut.

### 11.3 Tracking link

First-link policy juga mengabaikan replacement provider yang mungkin sah. Backend mempertahankan filled link; frontend menolak invalid URL. Tidak ada backfill historical lost-link. Rotasi link perlu mekanisme eksplisit jika kelak diperlukan.

### 11.4 Verifikasi/data hygiene

Tests tidak membuktikan production DB/concurrency/live provider. Full PHP/lint/types/build/browser tidak dijalankan. Seeder/example tidak otomatis memperbarui production settings; legacy records tidak dimigrasikan. Transkrip mendominasi statistik dan perlu privacy audit; paste-image reference perlu diperiksa. Tidak mengklaim visual pixel-perfect atau seluruh proses bisnis produksi bebas masalah.

## 12. Verifikasi yang dilakukan

1. Baseline ancestor endpoint; empat commits/diff historis diperiksa.
2. HEAD endpoint, clean initial tree; inventories rename-aware dan union no-renames dihitung.
3. Source/diff backend/frontend/tests/config/seeder/docs/artifacts diperiksa; screenshot dan manifest/bundle drift diperiksa.
4. Node.js **v22.15.1**, initial `node tests/<file>.mjs`: 8 pass/3 loader errors `ERR_UNKNOWN_FILE_EXTENSION` saat import .ts, bukan assertion gagal.
5. Seluruh 11 scripts diulang memakai `node --experimental-strip-types tests/<file>.mjs`: **11/11 pass**, nol gagal. Tests tidak diedit.
6. Lampiran dicocokkan dengan Git: 258 entri/380 explicit paths, +43.324/-2.293 baris. Pekerjaan ini hanya membuat laporan. Pada pemeriksaan akhir, perubahan aplikasi/tests lain muncul di working tree; perubahan tersebut tidak disentuh dan tidak dimasukkan sebagai perubahan historis rentang.

Tidak menjalankan migration/seeder/PHP tests/live API/build/formatter aplikasi/browser. Hasil Node berasal dari working tree saat eksekusi, bukan catatan historis saat commit. Karena perubahan lain muncul selama analisis, hasil ini tidak diklaim sebagai eksekusi snapshot endpoint yang terisolasi. Isi laporan dan inventaris tetap berdasarkan objek Git endpoint, bukan diff lokal yang belum di-commit.

### Reproduksi

```powershell
git merge-base --is-ancestor 87cca12a7423b9bff6f887375690cbc3f5c57db5 5506fb2e75699e8efeb93f2755e539b44bbd7069
git log --reverse --format="%H|%aI|%s" 87cca12..5506fb2
git diff --name-status 87cca12 5506fb2
git diff --numstat 87cca12 5506fb2
git diff --no-renames --name-only 87cca12 5506fb2
git show 5506fb2:path/ke/file
$nodeChecks = git diff --name-only 87cca12 5506fb2 -- tests | Where-Object { $_ -like '*.mjs' }
foreach ($testFile in $nodeChecks) {
    node --experimental-strip-types $testFile
    if ($LASTEXITCODE -ne 0) { throw "Pemeriksaan gagal: $testFile" }
}
```

Tests membaca working tree; pastikan sama endpoint untuk reproduksi. Jangan menjalankan database tests tanpa memverifikasi SQLite :memory: dan cache testing.

## 13. Lampiran seluruh file

Inventaris dihasilkan dari Git. A added, M modified, D deleted, Rnnn rename/similarity. Commit column mencatat commits dalam rentang yang menyentuh old/new path; bukan berarti semua fungsi file dibuat di rentang. Angka baris adalah diff endpoint; binary tidak mempunyai angka. Detail perilaku pada bagian 5–9.

### 13.1 Backend, routes, settings, dan konfigurasi (31 entri)

| Status | Path | + Baris | - Baris | Commit |
| --- | --- | ---: | ---: | --- |
| M | `.env.example` | 2 | 2 | 3c26c92 |
| M | `app/Actions/Payments/ApplyMidtransPaymentStatusAction.php` | 30 | 12 | 3c26c92 |
| M | `app/Actions/Payments/SyncMidtransPaymentAction.php` | 6 | 1 | 3c26c92 |
| M | `app/Actions/Stock/FinalizeReservedStockAction.php` | 40 | 37 | 3c26c92 |
| M | `app/Enums/ShippingStatus.php` | 70 | 0 | 3c26c92, 5506fb2 |
| M | `app/Http/Controllers/Admin/OrderController.php` | 12 | 3 | c889c1b, 5506fb2 |
| M | `app/Http/Controllers/Admin/ProductController.php` | 13 | 0 | 5506fb2 |
| M | `app/Http/Controllers/Admin/ShipmentController.php` | 12 | 2 | c889c1b |
| A | `app/Http/Controllers/ContactController.php` | 22 | 0 | c889c1b |
| M | `app/Http/Controllers/Customer/BiteshipWebhookController.php` | 2 | 0 | 5506fb2 |
| M | `app/Http/Controllers/Customer/MidtransWebhookController.php` | 3 | 1 | 3c26c92 |
| M | `app/Http/Controllers/Customer/OrderController.php` | 6 | 2 | 5506fb2 |
| M | `app/Http/Requests/Admin/CreateShipmentRequest.php` | 3 | 2 | c889c1b |
| M | `app/Http/Requests/Admin/OrderStatusRequest.php` | 12 | 1 | 3c26c92, 5506fb2 |
| M | `app/Http/Requests/Admin/ProductRequest.php` | 50 | 9 | c889c1b |
| A | `app/Http/Requests/Admin/ProductShippingEstimateRequest.php` | 33 | 0 | 5506fb2 |
| M | `app/Http/Requests/Admin/SettingRequest.php` | 6 | 6 | 3c26c92 |
| M | `app/Http/Requests/Admin/ShipmentStatusRequest.php` | 2 | 2 | 3c26c92 |
| M | `app/Services/Admin/OrderManagementService.php` | 91 | 30 | 3c26c92, c889c1b, 5506fb2 |
| M | `app/Services/Admin/ProductManagementService.php` | 14 | 7 | c889c1b |
| M | `app/Services/Admin/SettingManagementService.php` | 6 | 7 | 3c26c92 |
| M | `app/Services/Admin/ShipmentManagementService.php` | 195 | 85 | 3c26c92, c889c1b, 5506fb2 |
| M | `app/Services/Customer/CheckoutService.php` | 13 | 4 | d8229d7, 5506fb2 |
| M | `app/Services/Customer/MidtransWebhookService.php` | 5 | 0 | 3c26c92 |
| M | `app/Services/Customer/OrderService.php` | 2 | 0 | 5506fb2 |
| M | `app/Services/Customer/ProductBrowsingService.php` | 12 | 7 | c889c1b |
| M | `app/Services/Integrations/BiteshipService.php` | 54 | 8 | 3c26c92, 5506fb2 |
| M | `app/Services/Settings/SiteSettingService.php` | 27 | 1 | 3c26c92 |
| M | `database/seeders/SiteSettingSeeder.php` | 12 | 18 | 3c26c92 |
| M | `phpunit.xml` | 5 | 3 | 3c26c92, c889c1b |
| M | `routes/web.php` | 3 | 2 | c889c1b, 5506fb2 |

### 13.2 Frontend (29 entri)

| Status | Path | + Baris | - Baris | Commit |
| --- | --- | ---: | ---: | --- |
| M | `resources/js/components/app-sidebar.tsx` | 0 | 5 | 3c26c92 |
| M | `resources/js/layouts/app/app-sidebar-layout.tsx` | 4 | 1 | 3c26c92 |
| A | `resources/js/lib/order-workflow.ts` | 104 | 0 | 3c26c92, 5506fb2 |
| A | `resources/js/lib/pagination.ts` | 15 | 0 | 3c26c92 |
| M | `resources/js/pages/admin/admin-users/index.tsx` | 7 | 9 | 3c26c92 |
| M | `resources/js/pages/admin/catalog/shared.tsx` | 3 | 7 | 3c26c92 |
| M | `resources/js/pages/admin/categories/index.tsx` | 3 | 19 | 3c26c92 |
| M | `resources/js/pages/admin/collections/index.tsx` | 3 | 19 | 3c26c92 |
| M | `resources/js/pages/admin/customer-addresses/index.tsx` | 2 | 18 | 3c26c92 |
| M | `resources/js/pages/admin/customers/index.tsx` | 2 | 18 | 3c26c92 |
| M | `resources/js/pages/admin/notifications/index.tsx` | 2 | 18 | 3c26c92 |
| M | `resources/js/pages/admin/orders/index.tsx` | 3 | 19 | 3c26c92 |
| M | `resources/js/pages/admin/orders/show.tsx` | 873 | 198 | 3c26c92, c889c1b, 5506fb2 |
| M | `resources/js/pages/admin/pagination.tsx` | 21 | 0 | 3c26c92 |
| M | `resources/js/pages/admin/payments/index.tsx` | 3 | 19 | 3c26c92 |
| M | `resources/js/pages/admin/product-variants/index.tsx` | 8 | 20 | 3c26c92 |
| M | `resources/js/pages/admin/products/form.tsx` | 895 | 107 | c889c1b, 5506fb2 |
| M | `resources/js/pages/admin/products/index.tsx` | 87 | 63 | 3c26c92 |
| A | `resources/js/pages/admin/products/shipping-estimate.tsx` | 205 | 0 | 5506fb2 |
| M | `resources/js/pages/admin/products/show.tsx` | 151 | 128 | 3c26c92 |
| M | `resources/js/pages/admin/shipments/index.tsx` | 3 | 19 | 3c26c92 |
| M | `resources/js/pages/admin/shipments/show.tsx` | 202 | 116 | 3c26c92 |
| M | `resources/js/pages/admin/stock/index.tsx` | 3 | 19 | 3c26c92 |
| M | `resources/js/pages/contact/index.tsx` | 225 | 92 | c889c1b |
| M | `resources/js/pages/customer/cart/my-cart.tsx` | 49 | 46 | d8229d7 |
| M | `resources/js/pages/customer/checkout/checkout.tsx` | 4 | 5 | d8229d7 |
| M | `resources/js/pages/customer/order/detail-order.tsx` | 129 | 11 | 5506fb2 |
| M | `resources/js/pages/customer/products/detail-product.tsx` | 303 | 138 | 3c26c92, c889c1b |
| M | `resources/js/pages/customer/products/list-product.tsx` | 73 | 29 | c889c1b, 5506fb2 |

### 13.3 Tests (25 entri)

| Status | Path | + Baris | - Baris | Commit |
| --- | --- | ---: | ---: | --- |
| A | `tests/Feature/Admin/OrderFulfillmentWorkflowTest.php` | 713 | 0 | 3c26c92, c889c1b, 5506fb2 |
| A | `tests/Feature/Admin/OrderShippingIssueTest.php` | 235 | 0 | 5506fb2 |
| A | `tests/Feature/Admin/ProductShippingEstimateTest.php` | 114 | 0 | 5506fb2 |
| A | `tests/Feature/Admin/ProductValidationTest.php` | 70 | 0 | c889c1b |
| M | `tests/Feature/Admin/ShipmentCreatedMailTest.php` | 16 | 8 | 3c26c92 |
| A | `tests/Feature/Admin/SiteSettingsTest.php` | 109 | 0 | 3c26c92 |
| A | `tests/Feature/ContactPageTest.php` | 67 | 0 | c889c1b |
| M | `tests/Feature/Customer/BiteshipShippingRateTest.php` | 196 | 2 | 5506fb2 |
| A | `tests/Feature/Customer/CheckoutVoucherShippingTest.php` | 135 | 0 | d8229d7 |
| A | `tests/Feature/Customer/MidtransWebhookTest.php` | 263 | 0 | 3c26c92, 5506fb2 |
| A | `tests/Feature/Customer/OrderSupportPhoneTest.php` | 53 | 0 | 5506fb2 |
| M | `tests/Feature/Customer/ProductDetailCartStateTest.php` | 35 | 0 | c889c1b |
| A | `tests/Feature/Customer/ProductListSortingTest.php` | 77 | 0 | c889c1b |
| A | `tests/Feature/Customer/ShipmentTrackingLinkTest.php` | 159 | 0 | 5506fb2 |
| A | `tests/contact-page.test.mjs` | 217 | 0 | c889c1b |
| A | `tests/order-shipping-issue.test.mjs` | 241 | 0 | 5506fb2 |
| A | `tests/order-tracking.test.mjs` | 202 | 0 | 5506fb2 |
| A | `tests/order-workflow.test.mjs` | 154 | 0 | 3c26c92 |
| A | `tests/pagination.test.mjs` | 32 | 0 | 3c26c92 |
| A | `tests/product-description.test.mjs` | 72 | 0 | c889c1b |
| A | `tests/product-gallery.test.mjs` | 97 | 0 | c889c1b |
| A | `tests/product-list-mobile.test.mjs` | 82 | 0 | 5506fb2 |
| A | `tests/product-shipping-estimate.test.mjs` | 182 | 0 | 5506fb2 |
| A | `tests/product-shopping-information.test.mjs` | 152 | 0 | c889c1b |
| A | `tests/product-validation.test.mjs` | 357 | 0 | c889c1b, 5506fb2 |

### 13.4 Dokumen dan binary (3 entri)

| Status | Path | + Baris | - Baris | Commit |
| --- | --- | ---: | ---: | --- |
| A | `cartt.png` | binary | binary | d8229d7 |
| A | `codex-session-01a11536-86f5-70a3-bb2f-1faed94b9b70.md` | 34265 | 0 | 3c26c92 |
| M | `product-link.md` | 5 | 5 | 3c26c92 |

### 13.5 Generated build artifacts (170 entri)

| Status | Path | + Baris | - Baris | Commit |
| --- | --- | ---: | ---: | --- |
| R097 | `public/build/assets/CartController-Bq1IDy7R.js` → `public/build/assets/CartController-BnFanuIi.js` | 1 | 1 | 3c26c92 |
| R096 | `public/build/assets/OrderController-C8FgXqWo.js` → `public/build/assets/OrderController-BdzcQ3G5.js` | 1 | 1 | 3c26c92 |
| R097 | `public/build/assets/ProfileController-C5GQ0GG1.js` → `public/build/assets/ProfileController-PZmgzUSR.js` | 1 | 1 | 3c26c92 |
| R093 | `public/build/assets/SecurityController-DlLWXfQm.js` → `public/build/assets/SecurityController-CnxvwwJl.js` | 1 | 1 | 3c26c92 |
| R097 | `public/build/assets/WishlistController-BNMxl-Ln.js` → `public/build/assets/WishlistController-C1egh8Ce.js` | 1 | 1 | 3c26c92 |
| R098 | `public/build/assets/about-rYj-u-Rm.js` → `public/build/assets/about-DIcNLPcv.js` | 1 | 1 | 3c26c92 |
| R096 | `public/build/assets/adjustment-CsZW0eEy.js` → `public/build/assets/adjustment-BH0bW8lK.js` | 1 | 1 | 3c26c92 |
| R095 | `public/build/assets/admin-users-DDi-cz3q.js` → `public/build/assets/admin-users-DmUJRI1r.js` | 1 | 1 | 3c26c92 |
| A | `public/build/assets/app-BbEr6vPV.css` | 1 | 0 | 3c26c92 |
| D | `public/build/assets/app-U5-JBmFY.css` | 0 | 1 | 3c26c92 |
| R084 | `public/build/assets/app--FryCRWw.js` → `public/build/assets/app-teBmEQ78.js` | 3 | 3 | 3c26c92 |
| R091 | `public/build/assets/appearance-DtZk0Q1a.js` → `public/build/assets/appearance-DjLmzi-w.js` | 1 | 1 | 3c26c92 |
| R097 | `public/build/assets/audit-logs-D7Yw4f4N.js` → `public/build/assets/audit-logs-BxGL9EB9.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/badge-B4CqK8eB.js` → `public/build/assets/badge-CNEzsEEw.js` | 0 | 0 | 3c26c92 |
| R094 | `public/build/assets/banners-Rl--j4PK.js` → `public/build/assets/banners-DNq5v_AH.js` | 1 | 1 | 3c26c92 |
| R095 | `public/build/assets/biteship-webhook-logs-CeTdiS4G.js` → `public/build/assets/biteship-webhook-logs-wk6TaZZu.js` | 1 | 1 | 3c26c92 |
| R098 | `public/build/assets/blog-DaXUqLQl.js` → `public/build/assets/blog-OSbSktkX.js` | 1 | 1 | 3c26c92 |
| R094 | `public/build/assets/blogs-BtnhtniC.js` → `public/build/assets/blogs-BX-fYS23.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/card-I1Qi8fQI.js` → `public/build/assets/card-DC-ua9w4.js` | 0 | 0 | 3c26c92 |
| D | `public/build/assets/categories-DHTxfbnh.js` | 0 | 1 | 3c26c92 |
| A | `public/build/assets/categories-QXqx_wvB.js` | 1 | 0 | 3c26c92 |
| D | `public/build/assets/checkout-Bpcf_jQe.js` | 0 | 2 | 3c26c92 |
| A | `public/build/assets/checkout-d4v9-KkZ.js` | 2 | 0 | 3c26c92 |
| D | `public/build/assets/collections-BfgM4Dbb.js` | 0 | 1 | 3c26c92 |
| A | `public/build/assets/collections-CW7XYLfh.js` | 1 | 0 | 3c26c92 |
| R082 | `public/build/assets/confirm-cxc7_f4z.js` → `public/build/assets/confirm-DOA3LfW1.js` | 1 | 1 | 3c26c92 |
| R081 | `public/build/assets/confirm-password-CnZHlOao.js` → `public/build/assets/confirm-password-DQcNpy1S.js` | 1 | 1 | 3c26c92 |
| R097 | `public/build/assets/contact-D3jsuVKK.js` → `public/build/assets/contact-C46m7fpI.js` | 1 | 1 | 3c26c92 |
| D | `public/build/assets/customer-addresses-V_7BCBmF.js` | 0 | 1 | 3c26c92 |
| A | `public/build/assets/customer-addresses-pTLLHRIN.js` | 1 | 0 | 3c26c92 |
| D | `public/build/assets/customers-BiG_mq4C.js` | 0 | 1 | 3c26c92 |
| A | `public/build/assets/customers-DPqcxbsO.js` | 1 | 0 | 3c26c92 |
| R099 | `public/build/assets/dashboard-DZn5k3i-.js` → `public/build/assets/dashboard-D-uuIkTg.js` | 1 | 1 | 3c26c92 |
| R097 | `public/build/assets/dashboard-yZ2lz7iG.js` → `public/build/assets/dashboard-Dq_dzROF.js` | 1 | 1 | 3c26c92 |
| R098 | `public/build/assets/detail-order-4htp1rZW.js` → `public/build/assets/detail-order-CsQTxgjn.js` | 1 | 1 | 3c26c92 |
| R098 | `public/build/assets/detail-product-hgsAPXfu.js` → `public/build/assets/detail-product-B4YLDmg3.js` | 1 | 1 | 3c26c92 |
| R098 | `public/build/assets/dialog-UQ3tSPM_.js` → `public/build/assets/dialog-Dh9Xd6SU.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/dist-DiuNxDTW.js` → `public/build/assets/dist-BIXyC_S_.js` | 0 | 0 | 3c26c92 |
| R087 | `public/build/assets/forgot-password-Cw16wpAM.js` → `public/build/assets/forgot-password-B5-Y6W-6.js` | 1 | 1 | 3c26c92 |
| R096 | `public/build/assets/form-ByHHbVsC.js` → `public/build/assets/form-6oPtXbc1.js` | 1 | 1 | 3c26c92 |
| R096 | `public/build/assets/form-DbAY6r-V.js` → `public/build/assets/form-BTxoqx2U.js` | 1 | 1 | 3c26c92 |
| R094 | `public/build/assets/form-BW7J1-hu.js` → `public/build/assets/form-BgD9LJ46.js` | 1 | 1 | 3c26c92 |
| R096 | `public/build/assets/form-BIcbaJzC.js` → `public/build/assets/form-BqRsL0_-.js` | 1 | 1 | 3c26c92 |
| R096 | `public/build/assets/form-wd45QOyK.js` → `public/build/assets/form-C7ekMRL4.js` | 1 | 1 | 3c26c92 |
| A | `public/build/assets/form-CSmLHMaJ2.js` | 1 | 0 | 3c26c92 |
| R095 | `public/build/assets/form-DLqhbAWA2.js` → `public/build/assets/form-C__GmReb.js` | 1 | 1 | 3c26c92 |
| R099 | `public/build/assets/form-DMqiARkW2.js` → `public/build/assets/form-CqtZ0N1V2.js` | 1 | 1 | 3c26c92 |
| R095 | `public/build/assets/form-CngdZSKT.js` → `public/build/assets/form-D7AF2I3G.js` | 1 | 1 | 3c26c92 |
| D | `public/build/assets/form-DAyt3la3.js` | 0 | 1 | 3c26c92 |
| R094 | `public/build/assets/form-D5lYJYKU.js` → `public/build/assets/form-DPuhTws3.js` | 1 | 1 | 3c26c92 |
| R096 | `public/build/assets/form-BQqtowLk.js` → `public/build/assets/form-DTbM5P5l.js` | 1 | 1 | 3c26c92 |
| R095 | `public/build/assets/form-BSauZO8Z.js` → `public/build/assets/form-DbHDXTBB.js` | 1 | 1 | 3c26c92 |
| R095 | `public/build/assets/form-C-ig-Rip.js` → `public/build/assets/form-DzI3XNtM.js` | 1 | 1 | 3c26c92 |
| R098 | `public/build/assets/gallery-DIDzRAV6.js` → `public/build/assets/gallery-D_cEE2Ee.js` | 1 | 1 | 3c26c92 |
| R093 | `public/build/assets/gallery-dpEFPKQ6.js` → `public/build/assets/gallery-X6W9n5Te.js` | 1 | 1 | 3c26c92 |
| D | `public/build/assets/info-BD1IplB9.js` | 0 | 1 | 3c26c92 |
| R100 | `public/build/assets/input-error-BNTVjSsa.js` → `public/build/assets/input-error-BgiFyWBr.js` | 0 | 0 | 3c26c92 |
| R093 | `public/build/assets/label-C44ZW4qy.js` → `public/build/assets/label-BhkwT3cf.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/leaflet-src-D4vjCzAM.js` → `public/build/assets/leaflet-src-ueQd6cnR.js` | 0 | 0 | 3c26c92 |
| R098 | `public/build/assets/lib-CSeRu9ad.js` → `public/build/assets/lib-DoxUgxkw.js` | 1 | 1 | 3c26c92 |
| R096 | `public/build/assets/list-notification-Bv6gK-cF.js` → `public/build/assets/list-notification-9WRr2G0U.js` | 1 | 1 | 3c26c92 |
| R098 | `public/build/assets/list-product-BlfVdkoU.js` → `public/build/assets/list-product-PrsAcl7K.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/loader-circle-BkD9DrgV.js` → `public/build/assets/loader-circle-BrALDrv6.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/lock-CDTt-EPR.js` → `public/build/assets/lock-cRNyqhPT.js` | 0 | 0 | 3c26c92 |
| R097 | `public/build/assets/login-e_WC3B0t.js` → `public/build/assets/login-yLmAo6ro.js` | 1 | 1 | 3c26c92 |
| A | `public/build/assets/logs-CXFbYnfH.js` | 1 | 0 | 3c26c92 |
| D | `public/build/assets/logs-IqxTwT2K.js` | 0 | 1 | 3c26c92 |
| R100 | `public/build/assets/mail-Cxl3RCoL.js` → `public/build/assets/mail-DCO1lxbt.js` | 0 | 0 | 3c26c92 |
| R097 | `public/build/assets/manage-address-CHsLuD74.js` → `public/build/assets/manage-address-BqHwuPSm.js` | 2 | 2 | 3c26c92 |
| R100 | `public/build/assets/map-pin-CKYcN5RD.js` → `public/build/assets/map-pin-BZ8eLfgS.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/message-circle-Bm8G7_yg.js` → `public/build/assets/message-circle-CNuin-wp.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/minus-ClVKb5mE.js` → `public/build/assets/minus-lMrH8XF4.js` | 0 | 0 | 3c26c92 |
| D | `public/build/assets/my-cart-734a8RwT.js` | 0 | 1 | 3c26c92 |
| A | `public/build/assets/my-cart-DAE8GF6-.js` | 1 | 0 | 3c26c92 |
| R097 | `public/build/assets/my-order-DSt8iwtw.js` → `public/build/assets/my-order-D0Jl-F93.js` | 1 | 1 | 3c26c92 |
| A | `public/build/assets/my-profile-BnK-2MYi.js` | 1 | 0 | 3c26c92 |
| D | `public/build/assets/my-profile-ziqXgCTu.js` | 0 | 1 | 3c26c92 |
| R096 | `public/build/assets/my-wishlist-8ukQDuE-.js` → `public/build/assets/my-wishlist-D8aztZ1b.js` | 1 | 1 | 3c26c92 |
| R099 | `public/build/assets/new-product-CJmazxry.js` → `public/build/assets/new-product-FS04ydcW.js` | 1 | 1 | 3c26c92 |
| R096 | `public/build/assets/no-return-policy-Pd5SLDoK.js` → `public/build/assets/no-return-policy-Bctk6UR8.js` | 1 | 1 | 3c26c92 |
| A | `public/build/assets/notifications-SG62a0Ze.js` | 1 | 0 | 3c26c92 |
| D | `public/build/assets/notifications-q3iV-nSL.js` | 0 | 1 | 3c26c92 |
| A | `public/build/assets/orders-B0GbZIR_.js` | 1 | 0 | 3c26c92 |
| D | `public/build/assets/orders-DVpzKgSV.js` | 0 | 1 | 3c26c92 |
| A | `public/build/assets/orders-eboA25Xl.js` | 1 | 0 | 3c26c92 |
| R100 | `public/build/assets/package-check-CBEwUNLQ.js` → `public/build/assets/package-check-CGbsTFZG.js` | 0 | 0 | 3c26c92 |
| R094 | `public/build/assets/pages-toICL_ac.js` → `public/build/assets/pages-DJP4_fqZ.js` | 1 | 1 | 3c26c92 |
| A | `public/build/assets/pagination-DnMy-okO.js` | 1 | 0 | 3c26c92 |
| D | `public/build/assets/pagination-Qdkh1d9k.js` | 0 | 1 | 3c26c92 |
| R095 | `public/build/assets/password-DRfuwdJG.js` → `public/build/assets/password-BDgDevSy.js` | 1 | 1 | 3c26c92 |
| R095 | `public/build/assets/password-input-CYdK3Nla.js` → `public/build/assets/password-input-Dq3SOREf.js` | 1 | 1 | 3c26c92 |
| R094 | `public/build/assets/payment-logs-B8FLXJtQ.js` → `public/build/assets/payment-logs-DCjU9b5-.js` | 1 | 1 | 3c26c92 |
| A | `public/build/assets/payments-CRtvW7FB.js` | 1 | 0 | 3c26c92 |
| A | `public/build/assets/payments-Caanu7lk.js` | 1 | 0 | 3c26c92 |
| D | `public/build/assets/payments-IG-17-gR.js` | 0 | 1 | 3c26c92 |
| R100 | `public/build/assets/pencil-BZOzUmad.js` → `public/build/assets/pencil-Cr94VSKw.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/plus-BXmLLPNt.js` → `public/build/assets/plus-Bgh1CWnc.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/power-BvsPBJmY.js` → `public/build/assets/power-BkUug2nh.js` | 0 | 0 | 3c26c92 |
| R097 | `public/build/assets/privacy-policy-BTks-pOX.js` → `public/build/assets/privacy-policy-D_QCfVuk.js` | 1 | 1 | 3c26c92 |
| D | `public/build/assets/product-variants-BjH0_GtR.js` | 0 | 1 | 3c26c92 |
| A | `public/build/assets/product-variants-CtzXOKcc.js` | 1 | 0 | 3c26c92 |
| A | `public/build/assets/products-Bkfew8X2.js` | 1 | 0 | 3c26c92 |
| D | `public/build/assets/products-qSBXs3aB.js` | 0 | 1 | 3c26c92 |
| R093 | `public/build/assets/profile-B6SMf8dY.js` → `public/build/assets/profile-CEXUeLnd.js` | 1 | 1 | 3c26c92 |
| R095 | `public/build/assets/profile-layout-Ch0O9pFE.js` → `public/build/assets/profile-layout-CJh6CuYP.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/quote-DGgd3xoT.js` → `public/build/assets/quote-BNVYRwXc.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/refresh-cw-DtGmJJD8.js` → `public/build/assets/refresh-cw-DuxRN0Jh.js` | 0 | 0 | 3c26c92 |
| R094 | `public/build/assets/register-BFtzB7ht.js` → `public/build/assets/register-hKkwxgwM.js` | 1 | 1 | 3c26c92 |
| R097 | `public/build/assets/reports-D3edPoix.js` → `public/build/assets/reports-DOzR9fs6.js` | 1 | 1 | 3c26c92 |
| R091 | `public/build/assets/reset-password-DRGu29_U.js` → `public/build/assets/reset-password-BwhHMANv.js` | 1 | 1 | 3c26c92 |
| R097 | `public/build/assets/resource-form-Dk_VmDPd.js` → `public/build/assets/resource-form-Bx1l3grw.js` | 1 | 1 | 3c26c92 |
| R098 | `public/build/assets/resource-index-D5y12usn.js` → `public/build/assets/resource-index-CybHSHJ8.js` | 1 | 1 | 3c26c92 |
| R098 | `public/build/assets/resource-show-oWtmgj7u.js` → `public/build/assets/resource-show-BkwRIY54.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/rotate-ccw-BZNJ4Nn3.js` → `public/build/assets/rotate-ccw-D9oHrMC2.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/save-CdBpbluD.js` → `public/build/assets/save-DDWVI0jP.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/search-BwrIKJUU.js` → `public/build/assets/search-ZAQ35Rhv.js` | 0 | 0 | 3c26c92 |
| R096 | `public/build/assets/security-CrihRBRm.js` → `public/build/assets/security-dWoSLTlk.js` | 1 | 1 | 3c26c92 |
| D | `public/build/assets/select-BEEo7lUf.js` | 0 | 1 | 3c26c92 |
| R100 | `public/build/assets/send-DDiZ47xL.js` → `public/build/assets/send-Cm5I8edX.js` | 0 | 0 | 3c26c92 |
| R095 | `public/build/assets/settings-B9GCtZET.js` → `public/build/assets/settings-KNHu6rg3.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/share-2-Cauiggmv.js` → `public/build/assets/share-2-DjATskOT.js` | 0 | 0 | 3c26c92 |
| R091 | `public/build/assets/shared-BgrovJpa.js` → `public/build/assets/shared-BWsEYQjl.js` | 1 | 1 | 3c26c92 |
| R095 | `public/build/assets/shared-B8l0pN9-.js` → `public/build/assets/shared-DaIxxlwR.js` | 1 | 1 | 3c26c92 |
| R091 | `public/build/assets/shared-DLZ9me8P.js` → `public/build/assets/shared-IxzDxM_f.js` | 1 | 1 | 3c26c92 |
| D | `public/build/assets/shipments-C7i2GIVN.js` | 0 | 1 | 3c26c92 |
| A | `public/build/assets/shipments-rUjtQP6_.js` | 1 | 0 | 3c26c92 |
| A | `public/build/assets/shipments-yfWwXKMn.js` | 1 | 0 | 3c26c92 |
| R097 | `public/build/assets/shipping-policy-TFIcCr9H.js` → `public/build/assets/shipping-policy-Deq7EAyL.js` | 1 | 1 | 3c26c92 |
| R099 | `public/build/assets/shop-layout-DOEQNfQC.js` → `public/build/assets/shop-layout-BodGLqwD.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/shopping-cart-Bh6D2v-H.js` → `public/build/assets/shopping-cart-DJ9rIOuC.js` | 0 | 0 | 3c26c92 |
| D | `public/build/assets/show-2hMXRzFe.js` | 0 | 1 | 3c26c92 |
| R090 | `public/build/assets/show-tSEyKX9r.js` → `public/build/assets/show-B5YzLknI.js` | 1 | 1 | 3c26c92 |
| R093 | `public/build/assets/show-LFpeZ6EO.js` → `public/build/assets/show-BIMDIb9-.js` | 1 | 1 | 3c26c92 |
| R097 | `public/build/assets/show-B_Si00kW.js` → `public/build/assets/show-Bp_eUYib.js` | 1 | 1 | 3c26c92 |
| A | `public/build/assets/show-C_Y-Sgge.js` | 1 | 0 | 3c26c92 |
| D | `public/build/assets/show-D-amdPzA.js` | 0 | 1 | 3c26c92 |
| D | `public/build/assets/show-DAqmUfwP.js` | 0 | 106 | 3c26c92 |
| R095 | `public/build/assets/show-BtSbOr0p.js` → `public/build/assets/show-DGekKlXq.js` | 1 | 1 | 3c26c92 |
| A | `public/build/assets/show-DS8kShaB.js` | 1 | 0 | 3c26c92 |
| R092 | `public/build/assets/show-CK96TvvQ.js` → `public/build/assets/show-DUcodppb.js` | 1 | 1 | 3c26c92 |
| R093 | `public/build/assets/show-CWuBdkGB.js` → `public/build/assets/show-ID6h0C0P.js` | 1 | 1 | 3c26c92 |
| A | `public/build/assets/show-WMnZysvy.js` | 106 | 0 | 3c26c92 |
| R100 | `public/build/assets/sliders-horizontal-BCxTnLDM.js` → `public/build/assets/sliders-horizontal-DK8mo_x0.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/slug-BVqCWxmP.js` → `public/build/assets/slug-CQPoLqU3.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/sparkles-CVEqi_Od.js` → `public/build/assets/sparkles-DLNKsuQv.js` | 0 | 0 | 3c26c92 |
| R072 | `public/build/assets/spinner-CF04sGFh.js` → `public/build/assets/spinner-B9xCeGLb.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/square-pen-C7PcKzWh.js` → `public/build/assets/square-pen-BJeBLo5w.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/star-DuOe28vE.js` → `public/build/assets/star-ChJftSyS.js` | 0 | 0 | 3c26c92 |
| D | `public/build/assets/stock-BiamxQ_p.js` | 0 | 1 | 3c26c92 |
| A | `public/build/assets/stock-C7OJr1ih.js` | 1 | 0 | 3c26c92 |
| R100 | `public/build/assets/tag-Di6Aogbg.js` → `public/build/assets/tag-B-VpGwsX.js` | 0 | 0 | 3c26c92 |
| R097 | `public/build/assets/term-condition-BD_PlSd-.js` → `public/build/assets/term-condition-BiYozruI.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/text-link-hfYR9aWv.js` → `public/build/assets/text-link-C28MeyEg.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/trash-2-BIWh3pkr.js` → `public/build/assets/trash-2-CYRG8mhz.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/trending-down-BNL440i-.js` → `public/build/assets/trending-down-GdGVGbgT.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/trending-up-DXZx7iR2.js` → `public/build/assets/trending-up-CNj771iY.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/triangle-alert-CymyJXny.js` → `public/build/assets/triangle-alert-CCKrNsMK.js` | 0 | 0 | 3c26c92 |
| R093 | `public/build/assets/two-factor-challenge-BCSE0deS.js` → `public/build/assets/two-factor-challenge-C5xuuURp.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/upload-WbmA1zR2.js` → `public/build/assets/upload-CGD7BbC5.js` | 0 | 0 | 3c26c92 |
| R099 | `public/build/assets/use-two-factor-auth-ZiJQR0v-.js` → `public/build/assets/use-two-factor-auth-DPYJv-VG.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/user-check-A_78_x-P.js` → `public/build/assets/user-check-DYkbVctU.js` | 0 | 0 | 3c26c92 |
| R100 | `public/build/assets/user-round-PNO4MNYN.js` → `public/build/assets/user-round-CdT8euY7.js` | 0 | 0 | 3c26c92 |
| R095 | `public/build/assets/verification-D0NW5KP4.js` → `public/build/assets/verification-hZ5aYcU3.js` | 1 | 1 | 3c26c92 |
| R092 | `public/build/assets/verify-email-D9AfSH6O.js` → `public/build/assets/verify-email-CYRSMV3W.js` | 1 | 1 | 3c26c92 |
| R094 | `public/build/assets/vouchers-DpThR_y3.js` → `public/build/assets/vouchers-C6v29k9j.js` | 1 | 1 | 3c26c92 |
| R100 | `public/build/assets/wayfinder-OywH38PV.js` → `public/build/assets/wayfinder-CYS5mbhQ.js` | 0 | 0 | 3c26c92 |
| R097 | `public/build/assets/welcome-BNJoGNCz.js` → `public/build/assets/welcome-pwJY9hCX.js` | 1 | 1 | 3c26c92 |
| R096 | `public/build/assets/wishlists-BdqmYaXc.js` → `public/build/assets/wishlists-CMkhcNGR.js` | 1 | 1 | 3c26c92 |
| R093 | `public/build/assets/with-selector-CdoCgsfV.js` → `public/build/assets/with-selector-D_-J-x-G.js` | 1 | 1 | 3c26c92 |
| M | `public/build/manifest.json` | 662 | 667 | 3c26c92 |

### 13.6 Pemeriksaan kelengkapan

- Total baris inventaris: **258**.
- Setiap rename memuat path lama dan baru secara eksplisit: **380 path** seluruhnya.
- Tidak ada kategori file di luar lima kelompok lampiran.
- Laporan ini dibuat setelah endpoint, bukan perubahan historis yang dihitung.
