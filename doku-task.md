# Migrasi Midtrans ke DOKU QRIS dan Virtual Account — Implementation Plan

> **Panduan pelaksana:** Kerjakan task berurutan. Gunakan `superpowers:executing-plans` atau `superpowers:subagent-driven-development` bila workflow tersebut dipilih pengguna. Checklist menandai pekerjaan implementasi yang **belum dikerjakan**. Dokumen ini tidak mengizinkan implementasi, commit, atau reset database secara otomatis.

**Goal:** Mengganti Midtrans dengan DOKU Checkout. Pelanggan wajib memilih QRIS atau bank Virtual Account di checkout toko sebelum membuat pesanan. Instruksi pembayaran dibuka di DOKU pada tab yang sama.

> Revisi 9 November 2026: aturan QRIS-only pada rencana awal digantikan oleh bagian 13. Diagnosis QRIS sandbox pada bagian 12 menjadi catatan historis; provisioning QRIS tidak menghalangi pengujian VA.

> Revisi 10 November 2026: bagian 14 mencatat alternatif VA BTN/BNC melalui generator SNAP hosted Checkout. Temuan penolakan bank lain pada bagian 13 tetap menjadi catatan pengujian sebelumnya.

**Architecture:** Backend membuat hosted DOKU Checkout, kemudian browser membuka URL pembayaran pada tab yang sama. Pertahankan transaksi lokal, idempotency checkout, reservasi stok/voucher, webhook terautentikasi, dan rekonsiliasi; ganti integrasi provider tanpa kerangka multi-provider.

**Tech Stack:** Laravel 13, PHP 8.3, Laravel HTTP client, Pest 4, Inertia 3, React 19, TypeScript, Wayfinder. Tidak menambah dependency.

**Spec:** Keputusan pengguna dan rancangan mandiri tercantum pada bagian Context, Global Constraints, serta alur target di bawah. Referensi API resmi berada di bagian terakhir. Tanggal penyusunan: 4 November 2026.

## Context

Pembayaran saat ini terikat Midtrans pada checkout, schema, webhook, pembatalan, rekonsiliasi terjadwal, halaman pesanan, admin, dan fixtures. Mengganti label tombol checkout saja tidak cukup.

Migrasi dilakukan pada **development, belum produksi**. Migration awal boleh disesuaikan dan database development boleh direset saat implementasi. Tidak diperlukan kompatibilitas transaksi Midtrans lama atau dukungan dua provider sekaligus.

**Scope pekerjaan saat dokumen dibuat:** hanya menulis rencana ini. Kode aplikasi, konfigurasi, dan database belum dimigrasikan; test aplikasi maupun transaksi sandbox belum dijalankan.

## Global Constraints

- Gunakan **DOKU Checkout hosted page**, bukan integrasi langsung DOKU SNAP QRIS. Istilah “Snap DOKU” pada kebutuhan UX berarti halaman pembayaran DOKU; tidak berarti API SNAP atau popup Midtrans.
- Pembayaran membuka halaman DOKU pada **tab yang sama**, bukan popup, iframe, atau tab baru.
- Dukung **QRIS dan VA**. Frontend mengirim kode pilihan dari daftar backend; backend memaksakan tepat satu channel DOKU sesuai metode/bank tersimpan.
- Batas pembayaran memakai `SiteSetting.payment_expiry_duration` dalam menit; jangan membuat durasi tetap baru.
- Pembatalan dinonaktifkan sementara selama QRIS aktif/pending atau hasil provider belum pasti, termasuk request langsung dan jalur admin yang melepas stok.
- Credentials hanya backend. Jangan memasukkan secret pada props Inertia, frontend, payment logs, atau dokumen.
- Browser return, penutupan halaman, deadline lokal lewat, dan timeout bukan bukti sukses/gagal.
- Pertahankan ownership, harga terbaru, ongkir Biteship, rounding IDR, idempotency, stok, voucher, dan notifikasi bisnis existing.
- Jangan hand-edit `resources/js/actions`, `resources/js/routes`, atau `resources/js/wayfinder`. Ubah routes/controllers lalu regenerasi melalui plugin Vite Wayfinder.
- Tidak perlu tabel QRIS, penyimpanan gambar QR, SDK baru, provider factory, atau compatibility layer Midtrans.
- `migrate:fresh` hanya untuk database development disposable yang telah dipastikan targetnya. Jangan dijalankan pada produksi atau database bersama.
- Implementasi, transaksi eksternal, perubahan dashboard, commit, dan push memerlukan scope/izin tersendiri; bukan bagian penulisan dokumen ini.

## Review Focus

1. Create timeout setelah provider menerima request: satu invoice/reservasi, tidak membuat pembayaran kedua.
2. Notifikasi duplikat/bersamaan/terbalik: efek stok/voucher/notifikasi sekali; paid tidak turun menjadi pending/failed.
3. Attempt `FAILED` atau checkout expired tanpa kepastian terminal QRIS: jangan melepas stok ketika QR masih dapat dibayar.
4. Setting expiry berubah, zona waktu berbeda, atau durasi ditolak provider: gunakan snapshot transaksi, bukan clamp diam-diam.
5. Pembatalan langsung/admin ketika QRIS aktif: aturan server sama dengan UI, termasuk race dengan webhook.

---

## 1. Alur pembayaran target

1. Customer memilih alamat, ongkir, QRIS atau VA beserta banknya, memasukkan voucher opsional, menyetujui kebijakan, lalu menekan tombol bayar sesuai pilihannya.
2. Backend memvalidasi checkout, membuat order/payment, dan mereservasi stok/voucher dalam transaksi lokal.
3. Sesudah commit, backend membuat DOKU Checkout memakai invoice dan request ID yang sudah tersimpan.
4. Response checkout aplikasi tetap berisi `order_id`, `payment_id`, dan `redirect_url`. Frontend memakai `window.location.href`.
5. Hosted page DOKU langsung menampilkan instruksi metode/bank terpilih karena request hanya mengizinkan satu channel. QRIS tetap dapat dipilih di sandbox, dengan error aktivasi bila channel belum tersedia.
6. Webhook valid atau status API terverifikasi menentukan pembayaran sukses. Callback browser hanya navigasi kembali ke website.
7. Pesanan pending memakai URL pembayaran yang sama untuk melanjutkan pembayaran; tidak membuat invoice baru.
8. Pending/uncertain tidak dapat dibatalkan. Setelah terminal terverifikasi, tampilkan status akhirnya. Integrasi cancel API DOKU di luar scope.

## 2. Task 1 — Konfirmasi kontrak DOKU dan fixture sandbox

**Hasil:** kontrak provider dan contoh payload yang dapat diuji sebelum mengaktifkan perubahan status terminal.

### Kontrak terverifikasi dari dokumentasi

| Aspek | Kontrak |
|---|---|
| Create sandbox | `POST https://api-sandbox.doku.com/checkout/v1/payment` |
| Create production kelak | `POST https://api.doku.com/checkout/v1/payment` |
| Metode | `payment.payment_method_types: [channel_terpilih]`, mapping pada bagian 13 |
| Durasi | `payment.payment_due_date`, satuan menit |
| Nominal | `order.amount`, integer IDR positif, maksimal 12 digit |
| Invoice | `order.invoice_number`, unik, maksimal 64 karakter untuk alur ini |
| URL pembayaran | `response.payment.url` |
| Expiry response | `response.payment.expired_date`, `yyyyMMddHHmmss`, UTC+7 |
| Status lookup umum | `GET /orders/v1/status/{invoice-or-request-id}` |
| Browser return | Callback/auto redirect; bukan bukti paid |

- [ ] Pastikan akun sandbox, QRIS aktif, credentials backend, dan endpoint HTTPS development yang dapat diakses server DOKU.
- [ ] Tetapkan request minimum termasuk customer yang diwajibkan, `order.auto_redirect`, dan callback yang sesuai. Set `auto_redirect=true` untuk alur kembali otomatis setelah hasil pembayaran.
- [ ] Konfirmasi response invoice cocok dengan invoice lokal. Jangan mengasumsikan seluruh response mempunyai `transaction.id`; contoh QRIS tidak selalu memilikinya.
- [ ] Buktikan batas durasi Checkout/QRIS. Docs menyebut default 60 menit dan max length 6, bukan rentang durasi numerik. Aplikasi saat ini memakai default **1440 menit**, validasi **1–10080**. Pertahankan jika didukung; jika tidak, selaraskan validasi/UI/default dan tolak konfigurasi unsupported secara jelas, bukan clamp.
- [ ] Buktikan identifier lookup dan bentuk status sebelum channel dipilih, setelah QR terbit, sukses, dan expired. Bedakan `order.status` dari `transaction.status`.
- [ ] Buktikan hubungan expiry Checkout dengan QRIS. `ORDER_EXPIRED` tidak otomatis dianggap terminal QRIS. Aktifkan expired notification pada dashboard bila diperlukan.
- [ ] Konfirmasi header notifikasi, bentuk payload QRIS merchant, acknowledgement 2xx, retry, dan delivery ID yang stabil/unik.
- [ ] Konfirmasi perilaku duplicate invoice/Request-Id serta pemulihan create timeout. Jangan menganggap Request-Id menjamin retry idempotent atau dapat mengembalikan URL checkout lama.
- [ ] Simpan contoh tersanitasi sebagai fixture test; jangan menyimpan secret, token aktif, atau data customer nyata.

**Gate:** jika final expiry, dukungan lookup, atau recovery ambiguous create belum terbukti, jangan mengaktifkan release otomatis berdasarkan asumsi. Catat sebagai blocker acceptance sandbox, bukan detail yang dianggap selesai.

## 3. Task 2 — Schema development, models, dan seeders

**Files:**
- Modify: `database/migrations/2026_04_30_000014_create_payments_table.php`
- Modify: `database/migrations/2026_04_30_000015_create_payment_logs_table.php`
- Modify: `database/migrations/2026_05_06_000001_add_critical_flow_constraints.php`
- Review/modify sesuai kebutuhan: `database/migrations/2026_05_06_000003_add_high_priority_checkout_payment_columns.php`
- Modify: `app/Models/Payment.php`, `app/Models/PaymentLog.php`, `database/seeders/LoadTestSeeder.php`
- Test: `tests/Feature/DatabaseSchemaTest.php`, `tests/Feature/LoadTestSeederTest.php`, `tests/Feature/AxeGearSqlSeederTest.php`

### Rancangan minimal `payments`

| Field | Rencana |
|---|---|
| `payment_provider` | Default/nilai `doku` |
| `payment_method` | `qris` atau kode `va_*` pada bagian 13; kolom existing cukup |
| `provider_reference` | Menggantikan `midtrans_order_id`; string 64, non-null, unique; invoice order |
| `create_request_id` | String 100, non-null, unique; disimpan sebelum HTTP create |
| `checkout_url` | Menggantikan `midtrans_redirect_url`; text nullable |
| `transaction_status` | Status internal: `pending`, `success`, `expired`, `failed`, `manual_review` |
| Field yang dihapus | `midtrans_transaction_id`, `midtrans_snap_token`, `fraud_status` |
| Field dipertahankan | `order_id`, `gross_amount`, `currency`, `paid_at`, `expired_at`, `expires_at`, `raw_response`, `failure_reason`, `last_synced_at`, timestamps |

Status provider mentah tetap ada pada payload/log. `orders.payment_status` dan `orders.order_status` tetap domain terpisah; `transaction_status=success` dipetakan ke pembayaran order `paid`, bukan mengganti seluruh domain dengan nama DOKU.

Tidak menambah kolom token/transaction ID pengganti bila tidak ada konsumen nyata. `token_id` response cukup di payload internal jika tidak dibutuhkan alur redirect/status; jangan mengeksposnya ke customer.

- [ ] Tulis test schema: invoice/request ID unik, satu payment per order, casts dates/amount/raw benar, kolom Midtrans tidak ada.
- [ ] Ubah schema/fillable/casts sesuai tabel di atas. Pertahankan FK dan precision amount existing.
- [ ] Pertahankan unique `orders(user_id, checkout_idempotency_key)`, timestamps reservasi stok/voucher, serta indeks expiry/status/sync.
- [ ] Ganti default `payment_logs.provider` menjadi `doku`. Tambahkan nullable `notification_request_id` string 100, unique gabungan `(provider, notification_request_id)` untuk notifikasi terautentikasi; log sync/admin memakai null. Validasi kontrak Request-Id pada Task 1 sebelum mengandalkan dedupe ini.
- [ ] Pertahankan `payload_hash` untuk audit/dedupe konten. Saat ini migration menambah index biasa, bukan unique; selaraskan pasangan `up/down` bagian payment yang disentuh karena `down` existing memakai `dropUnique`.
- [ ] Hapus indeks `midtrans_transaction_id` pada migration constraint lanjutan. Jangan menambah kolom/indeks dua kali antara migration awal dan lanjutan.
- [ ] Sesuaikan `LoadTestSeeder` dan assertions menjadi fixture DOKU/status internal, tanpa request provider.
- [ ] Periksa `SiteSettingSeeder` dan urutan `AxeGearSqlSeeder`: importer SQL mengimpor `site_settings`, **bukan payments/payment_logs**. Arsip SQL pembayaran tidak perlu ditulis ulang hanya untuk menghapus teks Midtrans.
- [ ] Cegah expiry tersimpan tertimpa seeding tanpa sengaja; `SiteSettingSeeder` saat ini melakukan upsert dengan default 1440. Uji hasil akhir seeding, bukan hanya nilai pada satu seeder.
- [ ] Jalankan test schema/seeder pada database test. Validasi juga fresh migration di driver database development, termasuk konsistensi rollback payment migration.

**Reset saat implementasi:** pastikan koneksi menunjuk database development disposable sebelum `php artisan migrate:fresh --seed`. Perintah menghapus semua tabel/data target. Tidak dijalankan saat menyusun dokumen ini.

## 4. Task 3 — HTTP client DOKU, signature, konfigurasi

**Files:**
- Replace: `app/Services/Integrations/MidtransService.php` menjadi `app/Services/Integrations/DokuService.php`
- Modify: `config/services.php`, `.env.example`
- Modify: `app/Http/Requests/Admin/SettingRequest.php`, `app/Services/Admin/SettingManagementService.php`, `database/seeders/SiteSettingSeeder.php`, `resources/js/pages/admin/settings/index.tsx`
- Create test: `tests/Feature/Customer/DokuIntegrationTest.php`

**Interfaces rekomendasi:**

```php
DokuService::createCheckout(Order $order, string $requestId, int $expiryMinutes): array;
DokuService::findTransactionStatus(string $providerReference): ?array;
DokuService::validateNotificationSignature(string $rawBody, array $headers, string $requestTarget): bool;
DokuService::amountMatches(Payment $payment, mixed $amount): bool;
```

`createCheckout` menghasilkan response provider tervalidasi; caller menyimpan URL/deadline. Lookup hanya mengembalikan null untuk not-found definitif sesuai kontrak, bukan network/auth/malformed response. Nominal dibandingkan ketat sebagai IDR tanpa pembandingan float permisif.

- [ ] Tulis test vektor signature known-answer dan request `Http::fake`; expected signature jangan dihitung melalui helper produksi yang sedang diuji.
- [ ] Tambahkan contoh `DOKU_CLIENT_ID`, `DOKU_SECRET_KEY`, `DOKU_IS_PRODUCTION=false`; mapping `services.doku`. Pilih host API backend dari mode, bukan input customer. Tidak ada client key frontend yang perlu menggantikan Midtrans client key.
- [ ] Reuse Laravel HTTP client, UUID Laravel, `hash`, `hash_hmac`, `base64_encode`, dan `hash_equals`. Tidak perlu SDK.
- [ ] Encode JSON sekali, sign bytes yang sama dengan HTTP body. Digest POST adalah Base64 SHA256 **biner**, bukan hash heksadesimal.
- [ ] Susun komponen signature Non-SNAP berurutan, LF, tanpa newline terakhir:

```text
Client-Id:<client-id>
Request-Id:<request-id>
Request-Timestamp:<timestamp>
Request-Target:<path>
Digest:<base64-sha256-body>
```

Signature: `HMACSHA256=` ditambah Base64 HMAC-SHA256 komponen tersebut menggunakan secret. Untuk GET tanpa body, tidak memakai Digest; ikuti kontrak yang dibuktikan.

- [ ] Timestamp outbound mengikuti format UTC DOKU. Jangan mengarang timestamp tolerance notifikasi yang dapat menolak retry sah; replay handling harus sesuai kontrak retry dan dedupe.
- [ ] Validasi credentials sebelum create, serta invoice/amount response sesuai field wajib kontrak. Validasi URL HTTPS dan hostname checkout resmi sandbox/production yang telah dikonfirmasi; jangan menerima redirect arbitrer.
- [ ] Perlakukan checkout URL/token sebagai sensitif. Jangan menulisnya pada log umum atau menampilkan raw response tanpa pembatasan.
- [ ] Parse expiry strict `yyyyMMddHHmmss` di UTC+7 lalu normalisasi ke penyimpanan aplikasi. Snapshot durasi sebelum HTTP; deadline provider menjadi acuan setelah response valid. Perbedaan durasi tidak diabaikan diam-diam.
- [ ] Bedakan rejection definitif dari timeout, connection loss, 5xx, response tidak lengkap, dan duplicate reference. Jangan otomatis retry POST create tanpa kontrak idempotency yang terbukti.
- [ ] Uji QRIS-only, amount invalid/fractional, setting invalid/kosong, expiry rusak/zona waktu, credential hilang, URL tidak aman, host mode, signature bytes, dan klasifikasi error.

**Reuse settings:** `app/Services/Settings/SiteSettingService.php`; jangan membuat sumber expiry kedua. Setting tidak valid harus ditolak sebelum reservasi/HTTP, bukan menyebabkan fallback durasi tak terlihat.

## 5. Task 4 — Checkout dan reservasi tetap aman

**Files:**
- Modify: `app/Services/Customer/CheckoutService.php`
- Modify: `resources/js/contexts/checkout-context.tsx`, `resources/js/pages/customer/checkout/checkout.tsx`
- Test: `tests/Feature/Customer/CheckoutVoucherShippingTest.php`, `tests/Feature/Customer/DokuIntegrationTest.php`

**Interfaces tetap:** `CheckoutService::placeOrder(User $user, array $payload): array`; frontend `placeOrder(notes: string, agreed: boolean): Promise<string | null>`.

- [ ] Tambahkan failing tests untuk double-submit/retry, expiry SiteSetting, timeout create, dan rejection definitif.
- [ ] Pertahankan ownership alamat/cart, rate TTL/cart hash, verifikasi ongkir Biteship, harga/stok/dimensi variant, voucher lock, rounding total integer, dan order snapshot.
- [ ] Buat payment `doku/qris`, invoice, request ID, dan snapshot expiry dalam transaksi lokal existing. HTTP create sesudah commit; jangan menahan lock database selama request provider.
- [ ] Response valid menyimpan URL/deadline/raw response dan mengembalikan redirect. Gunakan lock/status guard ketika menyimpan agar response create terlambat tidak menimpa webhook yang sudah paid.
- [ ] Key idempotency sama menghasilkan order/payment yang sama. URL existing dipakai ulang; create masih berjalan/uncertain tidak memicu request checkout baru atau reservasi ulang.
- [ ] Rejection yang pasti tidak menciptakan checkout mengikuti jalur release stok/voucher existing. Timeout/hasil tidak pasti masuk `manual_review` dengan penanda `checkout_creation_uncertain`, reference/request ID tetap tersimpan, reservasi dipertahankan.
- [ ] Tampilkan jalan menuju status pesanan ketika create belum pasti. Pertahankan kemampuan pemulihan order; jangan membuat key baru atau menghilangkan cart/session sebelum outcome aman.
- [ ] Ganti tombol menjadi **Bayar dengan QRIS**, informasi provider DOKU, loading/error tetap aksesibel. Pertahankan `window.location.href`; jangan menambah `window.open`, `target=_blank`, atau script popup.
- [ ] Jalankan kembali test checkout, voucher, shipping, dan rounding existing.

## 6. Task 5 — Webhook DOKU dan transisi status

**Files:**
- Replace: `app/Services/Customer/MidtransWebhookService.php` menjadi `DokuWebhookService.php`
- Replace: `app/Http/Controllers/Customer/MidtransWebhookController.php` menjadi `DokuWebhookController.php`
- Replace: `app/Actions/Payments/ApplyMidtransPaymentStatusAction.php` menjadi `ApplyDokuPaymentStatusAction.php`
- Modify: `routes/api.php`, `bootstrap/app.php`
- Replace test: `tests/Feature/Customer/MidtransWebhookTest.php` menjadi `DokuWebhookTest.php`

**Interfaces:**

```php
DokuWebhookService::handle(string $rawBody, array $headers, string $requestTarget): void;
ApplyDokuPaymentStatusAction::execute(Payment $payment, string $status): void;
ApplyDokuPaymentStatusAction::canApply(Payment $payment, string $status): bool;
```

Caller action harus memvalidasi autentikasi, invoice/amount, serta memegang lock transaksi. Webhook dan rekonsiliasi memakai satu action transisi ini.

- [ ] Tulis tests raw-body tamper, header hilang, client ID/signature salah, target salah, JSON rusak, extra fields sah, dan mismatch invoice/amount/channel.
- [ ] Buat `POST /api/payments/doku/notification`, nama `payments.doku.notification`. Ambil `$request->getContent()`; jangan encode ulang JSON untuk verifikasi signature.
- [ ] Verifikasi client ID dan signature secara constant-time. Request-Target adalah path endpoint merchant publik, misalnya `/api/payments/doku/notification`, termasuk prefix yang memang dipakai; **bukan** `/checkout/v1/payment`.
- [ ] Parse sesudah autentikasi, validasi schema payload yang relevan. Service/channel QRIS harus sesuai kontrak merchant; contoh `service.id=QRIS`, `channel.id=QRIS_DOKU` bukan alasan menganggap semua varian selalu sama.
- [ ] Dalam satu DB transaction: lock payment/order dengan urutan konsisten, validasi invoice dan amount, currency bila diberikan, insert/dedupe log, lalu terapkan status. Jangan commit dedupe sebelum efek bisnis; processing gagal harus dapat diulang.
- [ ] Duplicate ID/body valid di-ACK tanpa mengulang efek. ID sama dengan body berbeda dicatat sebagai konflik dan tidak boleh diam-diam diakui sebagai event baru yang sah; lakukan rekonsiliasi bila diperlukan.
- [ ] ACK 2xx setelah proses lokal berhasil commit. Hindari HTTP Biteship/status API dan kerja berat sebelum ACK; transient failure harus dapat retry. Kebijakan response penolakan mengikuti kontrak Task 1, tidak boleh mengubah pembayaran/stok.

### Pemetaan status yang aman

| Input provider | Perilaku internal |
|---|---|
| `SUCCESS` QRIS autentik, invoice/amount cocok | Payment `success`, order payment `paid`, finalisasi stok dan alur order existing sekali |
| Pending/checkout generated | Tetap pending; tidak menimpa paid |
| Notifikasi Checkout `FAILED` | Bukan bukti invoice terminal; audit dan rekonsiliasi, tanpa release otomatis |
| Expiry/failure invoice terminal yang terbukti | `expired`/`failed`, release stok/voucher existing sekali |
| Unknown/konflik/mismatch | Jangan menandai paid/failed otomatis; log dan rekonsiliasi/manual review |
| Late success setelah stok terlepas | Catat uang diterima; jika finalisasi stok tidak aman, order manual review, bukan oversell atau mengabaikan pembayaran |

Dokumentasi best practice DOKU meminta mengabaikan failure notification Checkout karena customer masih dapat mencoba pembayaran lain. QRIS-only tidak membuktikan satu attempt gagal berarti invoice mati. `order.status` dan `transaction.status` tidak interchangeable.

- [ ] Reuse `FinalizeReservedStockAction`, `ReleaseStockReservationAction`, `ReleaseVoucherReservationAction`. Pertahankan timestamps/guards idempotent dan notifikasi bisnis existing.
- [ ] Paid tidak turun karena pending/failure terlambat. Refund/cancel API baru tidak dibangun dalam scope QRIS ini; status di luar kontrak tidak dipetakan sembarang.
- [ ] Uji duplicate ID, payload sama ID berbeda, ID sama payload berbeda, event terbalik, webhook vs sync, webhook vs create response, late success, rollback, dan efek hanya sekali.
- [ ] Uji race penting pada driver database development juga; SQLite in-memory tidak membuktikan row-lock concurrency.

## 7. Task 6 — Rekonsiliasi dan pembatalan aman

**Files:**
- Replace: `app/Actions/Payments/SyncMidtransPaymentAction.php` menjadi `SyncDokuPaymentAction.php`
- Replace: `app/Actions/Payments/SyncExpiredMidtransPaymentsAction.php` menjadi `SyncExpiredDokuPaymentsAction.php`
- Replace: `app/Console/Commands/SyncExpiredMidtransPaymentsCommand.php` menjadi `SyncExpiredDokuPaymentsCommand.php`
- Replace: `app/Jobs/Payments/SyncExpiredMidtransPaymentsJob.php` menjadi `SyncExpiredDokuPaymentsJob.php`
- Modify: `routes/console.php`, `app/Services/Customer/OrderService.php`, jalur status/cancel admin terkait
- Create test: `tests/Feature/Customer/DokuReconciliationTest.php`; adaptasi test order/admin existing

**Interfaces:**

```php
SyncDokuPaymentAction::execute(Payment $payment, string $eventType = 'admin_sync'): void;
SyncDokuPaymentAction::applyPayload(Payment $payment, array $payload, string $eventType): void;
```

- [ ] Tulis failing tests deadline lewat/provider pending, not-found sementara, attempt failed tetapi invoice hidup, API timeout, dan success dari lookup.
- [ ] Pertahankan manual admin sync, validasi invoice/amount, lock, audit log, dan `last_synced_at`. Error/not-found/unknown tidak berarti expired.
- [ ] Ganti command menjadi `payments:sync-expired-doku`; query payment due dan create uncertain/nonterminal yang perlu dipulihkan, chunk seperti existing.
- [ ] Pertahankan scheduler `everyTenMinutes()->withoutOverlapping()`; scheduler replay Biteship tidak berubah. Payment unknown/manual_review harus tetap eligible untuk pemeriksaan berikutnya.
- [ ] `expires_at` lokal hanya memicu lookup. Release hanya setelah terminal provider terkonfirmasi. Catat kegagalan sync agar admin dapat menindaklanjuti; jangan menelan error seolah sukses.
- [ ] Ikuti jeda/rate limit lookup terverifikasi. Tidak perlu polling browser terus-menerus atau job tambahan yang menduplikasi scheduler existing.
- [ ] Ambiguous create dicari melalui invoice/request tersimpan. Jika status ditemukan tetapi URL belum pulih, tampilkan status pada order/admin, bukan membuat checkout pengganti.
- [ ] Jika recovery provider tidak tersedia, operator memeriksa dashboard/support sampai terminal terbukti; jangan menambah force-release yang melewati aturan.
- [ ] Tolak cancel pending/uncertain pada `OrderService` **dan** jalur admin yang dapat melepas stok. Recheck di bawah lock untuk race webhook; hapus pemanggilan cancel Snap/Midtrans.
- [ ] Test direct POST cancel, admin cancel, cancel vs paid race, sync berulang, late success, kegagalan transaksi, dan reservasi tetap utuh selama unknown.

## 8. Task 7 — Customer/admin UI, return route, cleanup

**Files representatif:**
- `resources/js/pages/customer/order/my-order.tsx`, `resources/js/pages/customer/order/detail-order.tsx`
- `app/Services/Customer/OrderService.php`, `app/Services/Admin/PaymentManagementService.php`
- `app/Http/Controllers/Admin/AdminPageController.php`
- `resources/js/pages/admin/payments/index.tsx`, `resources/js/pages/admin/payments/show.tsx`
- `resources/js/pages/admin/payment-logs/index.tsx`, `resources/js/pages/admin/orders/show.tsx`
- `resources/js/pages/admin/settings/index.tsx`, `resources/js/pages/customer/policy/privacy-policy.tsx`
- `routes/web.php`; replace `app/Http/Controllers/Customer/MidtransFinishController.php` menjadi `DokuFinishController.php`
- Replace `tests/Feature/Customer/MidtransFinishRedirectTest.php` menjadi `DokuFinishRedirectTest.php`

- [ ] Ubah payload/types/links dari field Midtrans menjadi `provider_reference`, `checkout_url`, dan status internal baru. Jangan mengirim raw response/secret/token ke customer.
- [ ] Lanjut bayar memakai URL tersimpan yang eligible/tervalidasi, pada tab sama. Deadline lewat tanpa hasil terminal menampilkan menunggu konfirmasi, bukan batal otomatis.
- [ ] Tombol cancel pending dihapus atau disabled dengan penjelasan aksesibel; backend tetap otoritas eligibility.
- [ ] Buat `GET /payments/doku/finish`, nama `payments.doku.finish`; default kembali ke `my-order`, mengikuti pola existing. Query callback tidak mengubah pembayaran. Detail order tetap ownership-protected.
- [ ] Hapus `getMidtransReceiptUrl` dan link receipt Midtrans. Jangan mengarang endpoint receipt DOKU; gunakan detail/bukti internal yang sudah tersedia, tanpa membangun fitur invoice baru.
- [ ] Sesuaikan admin search/query termasuk `AdminPageController`, bukan hanya dedicated payment service. Update filter/count/stats paid/success, pending, expired/failed, manual review; hapus asumsi settlement/capture/fraud challenge.
- [ ] Periksa laporan/dashboard yang membaca payment status, agar nominal paid/pendapatan tidak berubah karena nama status berbeda.
- [ ] Ganti teks provider/settings/privacy policy. Credentials DOKU tetap `.env` backend, bukan input site settings.
- [ ] Hapus service/action/job/command/controller/enum Midtrans yang sudah diganti serta route/config/example keys/test lama. Bersihkan exception CSRF Midtrans usang pada `bootstrap/app.php`; jangan menambah wildcard exemption web untuk endpoint API.
- [ ] Regenerasi Wayfinder setelah routes/controllers final. Pakai fungsi generated untuk route internal yang diubah, bukan URL hardcoded baru.
- [ ] Audit referensi Midtrans pada kode aktif, fixtures, tests, README/AGENTS setup. Arsip SQL/dokumen historis boleh tetap menyebut Midtrans dengan alasan jelas; hindari search-replace massal.
- [ ] Test forged callback success, ownership detail/resume, admin stats/filters, serta absence of Midtrans fields. Perbarui self-check Node existing, tanpa framework baru.

## 9. Task 8 — Verifikasi dan runbook development

### Urutan test-first tiap task

1. Tambahkan test kasus spesifik task.
2. Jalankan test; pastikan gagal karena perilaku yang hendak diubah, bukan setup test rusak.
3. Implementasikan perubahan minimum.
4. Jalankan kembali sampai lulus; lanjut task berikutnya.

Gunakan Pest existing, `Http::fake`, dan `RefreshDatabase` per test bila perlu. Test biasa tidak memanggil DOKU atau Biteship sungguhan. Reuse pola fixtures/helpers checkout, voucher, shipping, webhook, dan order existing.

### Commands saat implementasi

```text
php artisan test tests/Feature/DatabaseSchemaTest.php
php artisan test tests/Feature/LoadTestSeederTest.php
php artisan test tests/Feature/AxeGearSqlSeederTest.php
php artisan test --filter=Doku
php artisan test tests/Feature/Customer/CheckoutVoucherShippingTest.php
php artisan test tests/Feature/Admin/SiteSettingsTest.php
node --test tests/checkout-rounding.test.mjs tests/order-workflow.test.mjs tests/order-tracking.test.mjs
npm run build
composer run ci:check
php artisan route:list --path=payments
php artisan schedule:list
```

- [ ] Jalankan juga regresi Biteship dan fulfillment/admin; full CI harus lulus. Catat output kegagalan, jangan mengklaim selesai jika ada langkah gagal/belum dijalankan.
- [ ] Validasi fresh schema/seeding pada database development disposable, selain test in-memory. Periksa driver dan target sebelum reset.
- [ ] Setelah konfigurasi aktual diganti, bersihkan config cache. Credentials diisi lokal tanpa menyalinnya ke dokumen/log.
- [ ] Jalankan `composer run dev`. Scheduler perlu proses tersendiri, misalnya `php artisan schedule:work`; `composer run dev` tidak otomatis memulai scheduler. Queue listener diperlukan untuk jobs/notifikasi yang dipakai.
- [ ] Daftarkan notification URL HTTPS publik development di dashboard DOKU; server DOKU tidak dapat menjangkau `localhost` Laragon. Callback web dan notification server adalah endpoint berbeda. Tunnel/dashboard diatur dengan izin operator; jangan expose debug/admin/secrets sembarangan.

### Matriks sandbox end-to-end

| Skenario | Hasil wajib |
|---|---|
| Checkout normal | Langsung QRIS, tab sama, nominal benar, expiry sesuai setting efektif |
| Double-submit/retry | Satu order/payment/reservasi dan URL yang sama |
| Scan/simulasi sandbox berhasil | Webhook valid, order paid, stok final sekali |
| Return sebelum webhook / query success palsu | Tidak menandai paid hanya dari browser |
| Back/close/resume | Tidak auto-cancel; lanjut memakai URL existing yang eligible |
| Duplicate/out-of-order webhook | Tidak menggandakan stok/voucher/notifikasi, tidak menurunkan paid |
| Create timeout | Reference dapat ditelusuri; tidak membuat invoice baru/release otomatis |
| Local deadline lewat/provider pending | Menunggu konfirmasi; reservasi tidak dilepas |
| QRIS benar-benar expired terminal | Release sekali; QR tidak masih dapat dibayar |
| API lookup gagal lalu pulih | Error terlihat, sync berikutnya tetap berjalan, status akhirnya benar |
| Customer/admin cancel pending | Ditolak UI dan backend, termasuk request langsung |
| Late success setelah release | Uang masuk tercatat; stok bermasalah masuk manual review |

- [ ] Simpan bukti sandbox tersanitasi dan hasil kontrak Task 1. Test lokal tidak membuktikan perilaku hosted page/expiry QRIS provider.
- [ ] Acceptance diblokir bila belum terbukti QR tidak dapat dibayar ketika reservasi dilepas.
- [ ] Production cutover, production credentials, dan charge nyata berada di luar scope development ini.

## 10. Definition of Done implementasi kelak

- [ ] Checkout langsung DOKU sesuai metode dan bank yang dipilih di toko, tanpa tab/popup baru.
- [ ] Expiry berasal dari SiteSetting, snapshot transaksi/deadline provider konsisten, unsupported setting ditolak jelas.
- [ ] Retry checkout tetap satu order/payment/reservasi; uncertain create tidak memicu pembayaran ganda.
- [ ] Webhook raw-body signature, invoice, amount, dedupe database, dan transisi aman teruji.
- [ ] Stok/voucher finalisasi/release sekali; tidak release karena attempt failure, callback, timeout, atau jam lokal saja.
- [ ] Cancel pending ditolak UI/server; late paid tidak diabaikan.
- [ ] Admin logs/search/stats/manual sync dan scheduler DOKU bekerja; Biteship tidak regresi.
- [ ] Fresh migration/seeders lulus, schema aplikasi tanpa field Midtrans, generated routes terbaru.
- [ ] Full CI, build, self-checks, dan sandbox relevan lulus. Tidak ada secret/token bocor pada frontend/log publik.

## 11. Referensi resmi DOKU

Diakses 4 November 2026. Kontrak akun merchant/sandbox tetap wajib dibuktikan, terutama expiry QRIS, order-vs-transaction status, dan recovery create.

- [Backend integration](https://developers.doku.com/accept-payments/doku-checkout/integration-guide/backend-integration.md)
- [Frontend integration](https://developers.doku.com/accept-payments/doku-checkout/integration-guide/frontend-integration.md)
- [Supported payment methods](https://developers.doku.com/accept-payments/doku-checkout/configuration/supported-payment-methods.md)
- [Signature Non-SNAP](https://developers.doku.com/get-started-with-doku-api/signature-component/non-snap/signature-component-from-request-header.md)
- [Notification samples Non-SNAP](https://developers.doku.com/get-started-with-doku-api/notification/http-notification-sample-non-snap.md)
- [Notification best practice](https://developers.doku.com/get-started-with-doku-api/notification/best-practice.md)
- [Notification retry](https://developers.doku.com/get-started-with-doku-api/notification/retry-notification.md)
- [Check status Non-SNAP](https://developers.doku.com/get-started-with-doku-api/check-status-api/non-snap.md)
- [Idempotency request](https://developers.doku.com/get-started-with-doku-api/idempotency-request.md)
- [Order status for Checkout page](https://developers.doku.com/accept-payments/doku-checkout/order-and-notification-handling/order-status-for-checkout-page.md)
- [Expired notification](https://developers.doku.com/accept-payments/doku-checkout/order-and-notification-handling/expired-notification.md)

## 12. Diagnosis dan konfigurasi sandbox — 9 November 2026

Respons aktual `POST /checkout/v1/payment` pada akun sandbox:

```json
{"message":["PAYMENT CHANNEL IS INACTIVE"]}
```

HTTP status **400**. Client ID `.env` cocok dengan brand dashboard. QRIS berstatus
`ACTIVE` pada menu Service, tetapi **Checkout Appearance → Pengaturan Kredensial
QRIS** belum berisi Client ID QRIS, Shared Key, Client Secret, MPAN, atau NMID.
Detail Service juga menampilkan “Gambar QRIS tidak tersedia”. Pemilik akun
mengonfirmasi kredensial QRIS belum tersedia dan membutuhkan provisioning DOKU.

### Langkah operator

1. Minta provisioning **QRIS sandbox untuk DOKU Checkout Non-SNAP** pada brand yang
   Client ID-nya digunakan aplikasi. Sertakan HTTP status dan pesan di atas;
   jangan mengirim Secret Key aplikasi. Status Service `ACTIVE` saja belum
   membuktikan channel Checkout tersedia.
2. Isi kredensial QRIS yang diberikan DOKU langsung di **Checkout Appearance →
   Pengaturan Kredensial QRIS**, lalu simpan. Jangan memakai BRN Client ID atau
   Secret Key Checkout sebagai pengganti kredensial QRIS yang berbeda.
3. Pastikan QRIS tersedia pada **Pengaturan Metode Pembayaran**. Aplikasi tetap
   mengirim `payment_method_types: ["QRIS"]` saat pelanggan memilih QRIS.
   Untuk pengujian VA, pilih bank di checkout toko sesuai revisi pada bagian 13.
4. Sediakan endpoint HTTPS publik untuk `/api/payments/doku/notification`.
   Daftarkan pada **Settings → Payment Settings → QRIS**. Batasi akses tunnel ke
   endpoint yang diperlukan; jangan mempublikasikan halaman debug atau admin.
   URL callback browser berbeda dari URL webhook server.
5. Jalankan `composer run dev` dan `php artisan schedule:work`. Uji checkout
   dengan akun pengujian yang diberikan, lalu gunakan [simulator
   DOKU](https://sandbox.doku.com/integration/simulator/) sampai webhook valid
   menghasilkan order `paid` dan finalisasi stok sekali.

### Konfigurasi aplikasi dan pemulihan

- `DOKU_CLIENT_ID`, `DOKU_SECRET_KEY`, dan `DOKU_IS_PRODUCTION=false` sudah terisi.
  Tidak perlu menambahkan private key SNAP, MPAN, atau NMID ke `.env` untuk
  integrasi hosted Checkout ini. Kredensial QRIS pada langkah 2 diatur di DOKU.
- `APP_URL` lokal dapat dipakai untuk callback browser pada pengujian lokal;
  webhook DOKU memerlukan URL publik tersendiri. Gunakan origin aplikasi publik
  sebagai `APP_URL` bila aplikasi juga diakses melalui origin tersebut.
- Penolakan channel inactive kini menampilkan pesan konfigurasi yang jelas.
  Log `DOKU checkout rejected` hanya menyimpan invoice, request ID, HTTP status,
  dan alasan yang sudah dipetakan; tidak menyimpan body atau header provider.
- Respons penolakan definitif menyertakan `retry_allowed: true` pada HTTP 422.
  Frontend menghapus key checkout hanya pada respons ini; percobaan berikutnya
  menggunakan key baru. Timeout dan hasil uncertain mempertahankan key serta
  reservasi. Empat pembayaran lama tetap `manual_review`; jangan reset atau
  melepas reservasinya hanya berdasarkan HTTP 404 lookup.
- Notifikasi terautentikasi dengan data tidak cocok dicatat sekali, mengembalikan
  422, dan mempertahankan reservasi. Pembayaran lunas tidak diturunkan statusnya;
  notifikasi valid berikutnya tetap dapat memulihkan pembayaran yang belum lunas.

**Batas verifikasi:** provisioning QRIS belum tersedia. Checkout QRIS nyata dan
status `paid` melalui simulator belum terbukti. Penyiapan proxy/tunnel publik
otomatis ditolak oleh approval review dengan alasan `blocked by policy`; tidak
ada tunnel yang dijalankan.

### Hasil verifikasi perbaikan

- Enam file pengujian PHP terkait DOKU, checkout, ongkir, dan voucher: **132 lulus,
  883 assertions**. Lima pemeriksaan JavaScript terkait checkout dan pesanan lulus.
- Pint pada file PHP yang disentuh, ESLint terarah, Prettier checkout context,
  TypeScript, build Vite, dan `git diff --check` lulus.
- Uji browser sandbox menampilkan alasan QRIS belum aktif, menghapus key retry
  setelah penolakan definitif, melepas reservasi stok, dan mempertahankan cart.
- CI keseluruhan belum lulus: terdapat masalah lint/format dan pengujian lama
  Midtrans serta isolasi database yang tidak terkait perbaikan ini.

## 13. Pilihan QRIS dan VA di checkout toko — 9 November 2026

Bagian ini menggantikan pembatasan QRIS-only pada checklist/rancangan awal.
Pelanggan wajib memilih QRIS atau VA sebelum membuat order; VA juga wajib
memilih bank di toko. Tidak ada pilihan default. QRIS tetap bisa dipilih di
sandbox sesuai permintaan pengguna. Nomor VA dan instruksi pembayaran ditangani
oleh hosted Checkout DOKU, tanpa SDK atau integrasi SNAP baru.

### Kontrak metode

`POST /checkout/place-order` mewajibkan `payment_method`. Props Inertia
`paymentMethods` berisi daftar `{value, label}` dari backend. Pilihan disimpan
pada kolom `payments.payment_method` existing; tidak perlu migrasi/database reset.

| Kode lokal | Channel Checkout DOKU |
|---|---|
| `qris` | `QRIS` |
| `va_bca` | `VIRTUAL_ACCOUNT_BCA` |
| `va_mandiri` | `VIRTUAL_ACCOUNT_BANK_MANDIRI` |
| `va_bni` | `VIRTUAL_ACCOUNT_BNI` |
| `va_bri` | `VIRTUAL_ACCOUNT_BRI` |
| `va_bsi` | `VIRTUAL_ACCOUNT_BANK_SYARIAH_MANDIRI` |
| `va_permata` | `VIRTUAL_ACCOUNT_BANK_PERMATA` |
| `va_cimb` | `VIRTUAL_ACCOUNT_BANK_CIMB` |
| `va_danamon` | `VIRTUAL_ACCOUNT_BANK_DANAMON` |
| `va_btn` | `VIRTUAL_ACCOUNT_BTN` |
| `va_bnc` | `VIRTUAL_ACCOUNT_BNC` |

Backend mengirim tepat satu channel. Metode kosong/tidak dikenal ditolak sebelum
reservasi. Key checkout existing tidak boleh mengganti metode/bank pembayaran
pending atau uncertain; lanjutkan lewat detail pesanan. Penolakan definitif tetap
mengizinkan key baru, tanpa mengubah reservasi pembayaran lama yang uncertain.

Webhook wajib memiliki service dan channel sesuai metode tersimpan. Service VA
adalah `VIRTUAL_ACCOUNT`; channel harus cocok tepat dengan bank. Status lookup
VA `SUCCESS` juga wajib membawa service/channel yang cocok. Signature, invoice,
nominal, currency, deduplikasi, dan paid yang tidak boleh diturunkan tetap berlaku.
Kebijakan pembatalan/expiry konservatif tetap dipertahankan untuk hosted invoice.

### Pengujian sandbox

Gunakan kredensial Checkout `.env` existing. Pastikan channel bank terpilih aktif
pada akun yang sama. Daftarkan endpoint HTTPS publik
`/api/payments/doku/notification` sebagai notification URL channel VA yang diuji.
Gunakan endpoint publik HTTPS yang didukung DOKU; jangan membuat tunnel baru
secara otomatis. Dokumentasi DOKU saat ini melarang domain ngrok untuk
notification URL, sehingga tunnel ngrok existing bukan konfigurasi webhook
yang didukung.
Simulator DOKU memerlukan nomor VA yang terbit dari invoice pengujian.
Webhook autentik atau rekonsiliasi status API menentukan `paid`; callback browser
bukan bukti pembayaran.

Referensi: [channel hosted Checkout](https://developers.doku.com/accept-payments/doku-checkout/configuration/supported-payment-methods),
[notifikasi Non-SNAP](https://developers.doku.com/get-started-with-doku-api/notification/http-notification-sample-non-snap),
[status Non-SNAP](https://developers.doku.com/get-started-with-doku-api/check-status-api/non-snap).

### Bukti runtime dan batas verifikasi

- API sandbox mengembalikan HTTP 200 dan URL hosted Checkout pada
  `https://staging.doku.com`. Aplikasi kini menerima host tersebut **khusus
  sandbox**, selain `sandbox.doku.com`. Production tetap hanya menerima
  `jokul.doku.com`. Domain asing, HTTP, userinfo, dan port tambahan tetap ditolak.
- Checkout VA CIMB dan VA BNI menghasilkan payment `pending` beserta URL valid.
  Label bank pada detail pesanan dan tombol **Lanjut Bayar** terverifikasi;
  navigasi membuka DOKU pada tab yang sama dengan nominal sesuai order.
- Hosted Checkout gagal menerbitkan nomor VA. Endpoint DOKU
  `/checkout/v1/payment/{token}/generate-code` mengembalikan HTTP 400.
  Pada VA BNI, respons tersanitasi:

  ```json
  {"message":["{\"error\":{\"code\":\"invalid_client_id\",\"message\":\"Invalid Client-Id\",\"type\":\"invalid_request_error\"}}"]}
  ```

  Kredensial Checkout diterima untuk membuat invoice, tetapi layanan penerbitan
  VA menolak Client ID. Periksa konfigurasi/provisioning VA pada brand sandbox
  yang sama bersama DOKU. Jangan mengganti Client ID dengan nilai dokumentasi
  atau melakukan fallback ke bank lain secara diam-diam. Host resmi
  `sandbox.doku.com` juga menghasilkan HTTP 400 untuk invoice CIMB yang sama.
- Pembayaran pengujian yang belum pasti tetap dipertahankan. Tidak ada reset
  database, pelepasan reservasi spekulatif, atau penandaan `paid` manual.
- Pemeriksaan dashboard sandbox setelah login: delapan bank terpilih pada
  Checkout Appearance; seluruh channel VA berstatus Active/SNAP. Pengaturan BNI
  menunjukkan Aggregator, FIX_BILL, DGPC; Payment Notification URL masih kosong.
  Client ID di API Keys cocok dengan `.env`. `DOKU_CLIENT_ID` dan
  `DOKU_SECRET_KEY` terisi, `DOKU_IS_PRODUCTION=false`; `.env` tidak diubah.
  Hosted Checkout sudah SNAP-ready menurut dokumentasi DOKU. Tidak ada bukti
  bahwa aplikasi perlu menambahkan private key atau Token URL SNAP untuk flow
  hosted ini; Token URL didokumentasikan untuk fitur DIPC, sedangkan BNI DGPC.
  Tidak ada perubahan mode SNAP, regenerasi kredensial, atau penyimpanan
  konfigurasi dashboard secara spekulatif.
- Endpoint webhook dapat dijangkau melalui tunnel existing; request tanpa
  signature ditolak HTTP 403 sebagaimana diharapkan. Domain ngrok tersebut
  dilarang oleh dokumentasi DOKU untuk notification URL. Sediakan endpoint HTTPS
  yang didukung, lalu daftarkan pada channel yang digunakan sebelum menguji
  penerimaan webhook. Pembayaran simulator juga dapat diverifikasi melalui
  status API. Kekurangan URL ini terpisah dari penolakan
  `invalid_client_id` saat DOKU menerbitkan VA.
- Tindak lanjut akun: minta DOKU memeriksa mapping/provisioning Client ID brand
  sandbox untuk hosted Checkout VA BNI/CIMB. Sertakan invoice, request ID dari
  log checkout, waktu kejadian, dan respons `invalid_client_id`; jangan sertakan
  Secret Key. Kanal bank sudah aktif dan Client ID cocok, tetapi dokumentasi
  tidak menjelaskan penyebab penolakan internal tersebut.
- Regresi backend terkait: **294 pengujian lulus, 1805 assertions**. Lima pemeriksaan JavaScript,
  TypeScript, lint/format terarah, dan build Vite lulus. Nomor VA nyata serta
  pembayaran simulator hingga `paid` belum dapat diverifikasi akibat penolakan
  provider tersebut. CI penuh memiliki kegagalan lama yang dicatat di bagian 12.

Referensi konfigurasi terbaru:
[VA dan kesiapan SNAP Checkout](https://docs.doku.com/get-started/manage-business/manage-payment-methods/bank-transfer-virtual-account),
[API Keys dan kebutuhan Token URL DIPC](https://docs.doku.com/get-started/manage-business/set-up-integration),
[notification URL dan larangan ngrok](https://developers.doku.com/get-started-with-doku-api/notification/setup-notification-url).

## 14. Alternatif sandbox VA BTN/BNC — 10 November 2026

### Perubahan dan dasar pemilihan

Tambahkan `va_btn` (VA BTN) dan `va_bnc` (VA BNC) ke map metode existing.
Dropdown, validasi request, channel invoice, dan label pembayaran memakai map
yang sama. QRIS serta delapan bank sebelumnya tetap tersedia tanpa pilihan
default atau fallback bank otomatis. Tidak ada SDK, migrasi, perubahan `.env`,
key RSA, handler Direct SNAP, atau modifikasi halaman DOKU.

Kode JavaScript hosted Checkout sandbox versi `1.6.112` yang diperiksa
menetapkan `useVASnap=false` untuk delapan bank awal; halaman memanggil
`/checkout/v1/payment/{token}/generate-code`. BTN dan BNC memiliki
`useVASnap=true` dan memakai `/checkout/v2/generate-code`. Perbedaan jalur ini
menjadi dasar pengujian, bukan bukti bahwa mapping akun merupakan penyebab
pasti `invalid_client_id` pada bank lain. Keduanya didukung dokumentasi Checkout
dan tersedia pada simulator resmi.

### Verifikasi

- **304 tes PHP lulus, 1864 assertions**: integrasi, webhook, rekonsiliasi,
  finish redirect, checkout/pengiriman/voucher, serta workflow pesanan admin.
  Dataset BTN/BNC memastikan channel yang dikirim tepat, pilihan tersimpan,
  label tampil, bank tidak bisa diganti pada key pending, notifikasi tidak
  diproses dua kali, dan status bank yang berbeda ditolak.
- Tiga pemeriksaan JavaScript checkout/order/admin, TypeScript, Pint, serta
  ESLint/Prettier checkout terarah lulus. Tidak ada perubahan frontend atau
  generated Wayfinder pada penambahan dua bank ini.
- Melalui akun aplikasi pengujian, masing-masing bank membuat invoice baru
  senilai **Rp20.001**. Halaman hosted menerbitkan nomor VA beserta instruksi dan
  expiry, dengan **HTTP 200** dari `/checkout/v2/generate-code`.
- BTN: payment/order **17**, invoice `ORD-20261109-GDPEPU`. Simulator resmi
  berhasil membayar. Status API mengembalikan `SUCCESS`, service
  `VIRTUAL_ACCOUNT`, channel `VIRTUAL_ACCOUNT_BTN`, invoice dan nominal sesuai.
  Action rekonsiliasi existing mengubah pesanan menjadi `paid`. Stok varian 27
  berubah **8 menjadi 7**, reservasi **6 menjadi 5**; sinkronisasi ulang
  mempertahankan angka dan waktu pembayaran. Detail pelanggan menampilkan
  **VA BTN** dan **Sudah dibayar**.
- BNC: payment/order **18**, invoice `ORD-20261109-MAMFPX`. Nomor VA berhasil
  diterbitkan; simulator resmi menyatakan pembayaran Rp20.001 berhasil. Setelah
  jeda minimal 60 detik, API status mengembalikan `SUCCESS`, service
  `VIRTUAL_ACCOUNT`, channel `VIRTUAL_ACCOUNT_BNC`, invoice dan nominal sesuai.
  Rekonsiliasi existing mengubah pesanan menjadi `paid`; stok varian 27 berubah
  **7 menjadi 6**, reservasi **6 menjadi 5**. Sinkronisasi ulang mempertahankan
  stok, reservasi, dan waktu pembayaran. Detail pelanggan menampilkan **VA BNC**
  serta **Sudah dibayar**, dengan tombol **Lanjut Bayar** dinonaktifkan.

Pengujian memakai rekonsiliasi status terautentikasi, tanpa menandai `paid`
manual dan tanpa melepas reservasi invoice lama yang belum pasti. Keberhasilan
webhook publik serta transaksi produksi belum diuji. Untuk mencoba sandbox,
pilih **Virtual Account → VA BTN** atau **VA BNC** pada checkout toko.

Referensi:
[metode Checkout resmi](https://developers.doku.com/accept-payments/doku-checkout/configuration/supported-payment-methods),
[simulator dan notifikasi](https://developers.doku.com/accept-payments/doku-checkout/integration-guide/simulate-payment-and-notification),
[status API dan jeda 60 detik](https://developers.doku.com/get-started-with-doku-api/check-status-api/non-snap).

## 15. Perbaikan nominal webhook QRIS — 10 November 2026

Notifikasi simulator pada 11:01:39 dan 11:03:14 WIB diterima aplikasi tetapi
menghasilkan HTTP 422. Kedua signature valid, invoice dan channel sesuai.
Body asli mengirim `order.amount` sebagai JSON number `643280.00` dan
`20001.00`; `json_decode()` menghasilkan `float`, sementara `wholeAmount()`
hanya menerima `int` atau `string`. Audit juga menghilangkan nominal float.

`wholeAmount()` kini menormalkan float finite yang bernilai bulat, kemudian
menerapkan validasi nominal positif maksimal 12 digit yang sama. Pecahan tidak
dibulatkan. `auditPayload()` mempertahankan float finite pada field yang sudah
diizinkan. Signature tetap diverifikasi terhadap body asli sebelum decoding;
pemeriksaan invoice, nominal, currency, service, channel, serta deduplikasi
tetap berlaku. Tidak ada perubahan `.env`, frontend, atau endpoint webhook.

Regresi Pest memakai raw JSON dengan nominal desimal, pemulihan manual review,
duplikat notifikasi, nominal tidak cocok, pecahan, nilai non-finite, batas
12 digit, dan rekonsiliasi respons desimal. **253 tes PHP lulus, 1251 assertions**
meliputi integrasi, webhook, rekonsiliasi, finish redirect, dan workflow pesanan
admin. Pint terarah serta `git diff --check` lulus.

Body dan header notifikasi asli yang tertangkap dikirim ulang melalui endpoint
HTTP lokal, masing-masing dua kali. Semua respons HTTP 200. Pesanan **23**
(`ORD-20261110-KECPZZ`, Rp643.280) dan **24** (`ORD-20261110-5CUCWJ`, Rp20.001)
menjadi `paid`, pembayaran `success`, melalui handler normal. Stok varian 23
berubah **23 menjadi 21**, reservasi **7 menjadi 5**; varian 27 berubah
**6 menjadi 5**, reservasi **6 menjadi 5**. Setiap pembayaran memiliki satu
log notifikasi sukses; riwayat penolakan dipertahankan. Detail pelanggan untuk
pesanan 24 menampilkan **QRIS** dan **Sudah dibayar** setelah refresh.
Verifikasi runtime ini memakai replay webhook autentik, bukan transaksi
simulator baru atau transaksi produksi.

## 16. QRIS sebagai satu-satunya metode — 10 November 2026

Checkout hanya menawarkan QRIS melalui hosted DOKU Checkout. Backend menolak
seluruh metode VA, termasuk BTN dan BNC. `manual_review` dihapus dari enum,
constraint untuk database baru, rekonsiliasi, statistik admin, dan tampilan
pesanan. Handler Midtrans yang sudah tidak digunakan dihapus. Bagian terdahulu
yang menjelaskan pilihan VA atau pemulihan manual review merupakan riwayat,
bukan perilaku aplikasi saat ini.

Jika penerbitan link gagal, checkout membatalkan pesanan lokal dengan status
`failed` / `payment_failed`, melepas reservasi stok dan voucher, mempertahankan
keranjang, serta mengembalikan HTTP 422 dengan `retry_allowed: true`.
Pengulangan request memakai key yang sama tidak menerbitkan invoice lagi;
frontend memakai key baru setelah respons kegagalan tersebut. Respons browser
yang hilang mempertahankan key sebelumnya untuk mencegah checkout ganda.
URL pembayaran tidak diberikan pada checkout yang dibatalkan.

Pembatalan lokal mencakup timeout dan respons provider yang tidak pasti,
sesuai rencana yang disetujui. Ketidakpastian tetap tercatat dalam audit;
pembatalan lokal tidak membuktikan invoice DOKU dibatalkan. Notifikasi SUCCESS
yang valid tetap mencatat dana sebagai `paid` / `success`, termasuk saat
reservasi sudah dilepas. Kegagalan finalisasi stok dicatat; fulfillment
diblokir sampai stok berhasil difinalisasi. Pembayaran lokal `failed` tidak
masuk sinkronisasi terjadwal; SUCCESS terlambat dapat diterima melalui webhook
atau sinkronisasi status admin. Tidak ada penandaan pembayaran manual.

Webhook tetap memeriksa signature body asli, invoice, nominal, currency,
service `QRIS`, channel `QRIS_DOKU`, dan deduplikasi. Respons status yang belum
membuktikan invoice berakhir mempertahankan status pending dan reservasi.
Keberhasilan pembayaran tidak dapat diturunkan oleh notifikasi berikutnya.

Konfigurasi lingkungan:

- `DOKU_IS_PRODUCTION=false`: API `https://api-sandbox.doku.com`; hosted URL
  `sandbox.doku.com` atau `staging.doku.com`.
- `DOKU_IS_PRODUCTION=true`: API `https://api.doku.com`; hosted URL
  `jokul.doku.com`.
- Isi `DOKU_CLIENT_ID` dan `DOKU_SECRET_KEY` dari lingkungan yang dipilih.
  Flag memilih endpoint; flag tidak mengubah kredensial sandbox menjadi produksi.
- Sesudah mengubah `.env`, jalankan `php artisan config:clear` untuk lokal,
  atau bangun ulang cache produksi dengan `php artisan config:cache`; restart
  worker yang berjalan. Pastikan notification URL dashboard menunjuk HTTPS
  aplikasi aktif pada `/api/payments/doku/notification`.

Pemeriksaan `.env` mendapati kedua kredensial terisi dan flag `false`.
Nilai secret tidak disalin ke dokumentasi. `.env` dan database pengguna tidak
diubah. Pengguna akan menjalankan reset database sendiri; constraint yang
direvisi berlaku saat migrasi baru dijalankan, bukan otomatis pada data lama.

Verifikasi akhir: **314 tes PHP lulus, 1884 assertions** pada integrasi,
webhook, rekonsiliasi, finish redirect, checkout/ongkir/voucher, dan workflow
fulfillment. Pemeriksaan Node checkout-payment, doku-surfaces, order-workflow,
dan order-tracking; TypeScript; lint/format file terkait; serta build Vite
lulus. Fixture pengiriman memfinalisasi stok sebelum mencoba fulfillment.

Pemeriksaan seluruh repository masih memiliki kegagalan terpisah: `ci:check`
berhenti pada temuan ESLint di file lain, sedangkan seluruh suite PHP terhenti
pada batas memori 128 MB saat merender QueryException dari `ExampleTest`
yang tidak menyiapkan schema database. Verifikasi browser baru tertahan dialog
izin remote debugging Chrome. Transaksi simulator baru dan produksi belum
diverifikasi pada perubahan ini; bukti runtime bagian 15 tetap berlaku hanya
untuk perbaikan webhook sebelumnya.

## 17. Kedaluwarsa QRIS dan notifikasi expired — 10 November 2026

Penyebab pesanan 29 tetap pending: handler hanya menerapkan SUCCESS/PENDING,
validator menolak pasangan hosted QRIS `SCAN_CODE` / `QRIS`, dan Expired
Notification di dashboard sandbox belum aktif. API status DOKU mengonfirmasi
invoice tersebut EXPIRED, sementara data lokal belum pernah disinkronkan.

Perbaikan:

- Terima pasangan `QRIS` / `QRIS_DOKU` dan `SCAN_CODE` / `QRIS`.
  Pasangan campuran serta channel VA tetap ditolak. Lookup autentik boleh
  tidak memiliki service/channel sebelum metode dipilih.
- Terapkan `transaction.status=EXPIRED`, `order.status=EXPIRED`, atau
  `order.status=ORDER_EXPIRED`. SUCCESS memiliki prioritas atas order expiry.
  Payment menjadi `expired`; pesanan menjadi `expired` / `payment_expired`,
  dengan timestamp kedaluwarsa. Reservasi stok dan voucher dilepas satu kali
  di dalam transaksi dengan urutan lock order lalu payment.
- Signature body asli, invoice, nominal, currency, channel, deduplikasi,
  dan proteksi pembayaran paid/refunded tetap diperiksa. SUCCESS terlambat
  tetap mencatat dana; fulfillment diblokir jika stok sudah dilepas.
- Notifikasi expiry tanpa nominal atau service/channel diverifikasi lewat
  GET status autentik sebelum mengambil lock database. Fakta salah yang
  disertakan pada notifikasi tetap ditolak. Timeout/error provider membalas
  HTTP 503 tanpa menandai notifikasi selesai sehingga pengiriman bisa diulang.
  Audit menyimpan fakta aman notifikasi dan hasil lookup, tanpa data pelanggan.
- Rekonsiliasi berjalan setiap menit. Detail pesanan milik pelanggan juga
  memicu lookup jika lewat deadline; scheduler dan detail berbagi lock cache
  dan cooldown 60 detik, termasuk saat lookup gagal. Deadline lokal hanya
  memicu pemeriksaan, bukan bukti untuk melepas reservasi.
- Detail pembayaran pending memuat ulang prop `order` melalui Inertia setiap
  60 detik. Polling berhenti ketika status pembayaran bukan pending.

Konfigurasi sandbox sudah disimpan dan diverifikasi setelah memuat ulang
dashboard: Settings → Checkout Appearance → Pengaturan Kadaluwarsa,
Aktifkan Notifikasi Kedaluwarsa **ON**, Recover Abandoned Cart **OFF**.
URL mengikuti instruksi pengguna untuk memakai tunnel yang sedang aktif:
`https://improper-uranium-carrousel.ngrok-free.dev/api/payments/doku/notification`.
Dashboard menerima URL tersebut. Ganti URL bila tunnel berubah. Produksi
memerlukan pengaturan notifikasi yang sama pada dashboard produksi dengan
URL HTTPS aplikasi produksi; `.env` tetap memilih API melalui
`DOKU_IS_PRODUCTION` dan kredensial lingkungan yang sesuai.

`composer run dev` kini menyertakan `php artisan schedule:work`.
Scheduler lokal juga sudah dijalankan pada sesi ini; lognya berada di
`storage/logs/doku-scheduler.stdout.log` dan `doku-scheduler.stderr.log`.
Untuk produksi, jalankan scheduler Laravel melalui cron per menit:

```cron
* * * * * cd /path/to/app && php artisan schedule:run >> /dev/null 2>&1
```

Verifikasi runtime:

- Pesanan **29** dipulihkan menggunakan `SyncDokuPaymentAction` dan API
  sandbox, tanpa menulis status secara langsung. Status menjadi
  `expired` / `payment_expired`; browser menampilkan **Pembayaran kedaluwarsa**.
  Sinkronisasi ulang mempertahankan timestamp dan angka stok/reservasi.
- Dibuat satu pesanan uji sandbox **30**, invoice
  `EXPIRY-TEST-20261110105739`, Rp10.001, deadline satu menit, tanpa produk
  atau pengiriman sehingga tidak mengubah inventori.
- DOKU mengirim webhook nyata pukul **17:58:39 WIB**, dengan
  `order.status=EXPIRED` dan `transaction.status=EXPIRED`, tanpa service/channel.
  Handler memverifikasi lookup `SCAN_CODE` / `QRIS` lalu membalas **HTTP 200**.
  Payment dan order berubah menjadi expired melalui satu log
  `payment_notification`; tidak ada sinkronisasi manual pada pesanan uji.
  Browser detail pesanan 30 juga menampilkan status kedaluwarsa.
- **264 tes PHP, 1349 assertions lulus**: integrasi DOKU, webhook,
  rekonsiliasi, finish redirect, checkout/voucher/ongkir, detail pelanggan,
  dan workflow fulfillment. Regression test memakai bentuk webhook sandbox
  di atas, termasuk pemeriksaan lookup di luar transaksi handler.
- Pint terarah, ESLint/Prettier halaman detail, TypeScript, pemeriksaan Node
  order-tracking, build Vite, serta `git diff --check` lulus. Hasil build
  verifikasi dikembalikan agar diff tetap berisi source. Pengujian provider
  nyata dilakukan di sandbox; transaksi produksi tidak dijalankan.

Referensi resmi:

- https://developers.doku.com/accept-payments/doku-checkout/order-and-notification-handling/expired-notification
- https://developers.doku.com/accept-payments/doku-checkout/order-and-notification-handling/order-status-for-checkout-page
- https://developers.doku.com/get-started-with-doku-api/check-status-api/non-snap
