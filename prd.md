# PRD Website E-Commerce Axegear

**Nama Produk:** Axegear E-Commerce Website  
**Tipe Dokumen:** Product Requirements Document (PRD)  
**Versi:** 1.0  
**Tanggal:** 12 Juni 2026  
**Stack:** Laravel, Inertia.js, React, TypeScript, MySQL, Midtrans, Biteship, Desty Omni  
**Target Platform:** Web desktop dan mobile responsive

---

## 1. Ringkasan Produk

Website e-commerce Axegear adalah platform penjualan online resmi untuk produk alat olahraga, riding gear, outdoor gear, dan aksesoris seperti hydropack, tank bag, tas stang, strap motor trail, helmet bag, running belt, water bladder, dan produk sejenis.

Website ini dibuat untuk memberikan pengalaman belanja langsung dari brand, tanpa hanya bergantung pada marketplace seperti Shopee dan Tokopedia. Website tetap menyediakan link marketplace sebagai opsi pembelian tambahan, tetapi checkout utama dapat dilakukan langsung di website.

Website akan menggunakan Laravel sebagai backend utama, Inertia.js sebagai penghubung backend dan frontend, React TypeScript sebagai frontend, MySQL sebagai database, Midtrans sebagai payment gateway, Biteship sebagai shipping aggregator, dan Desty Omni sebagai sumber utama sinkronisasi stok.

---

## 2. Tujuan Produk

Tujuan utama website ini adalah:

1. Menyediakan katalog produk resmi Axegear yang rapi, modern, dan mudah dikelola.
2. Memungkinkan customer membeli produk langsung melalui website.
3. Mengintegrasikan pembayaran online menggunakan Midtrans.
4. Mengintegrasikan pengiriman menggunakan Biteship.
5. Menampilkan stok yang akurat dengan menjadikan Desty Omni sebagai master stock.
6. Menghindari overselling akibat stok berbeda antara website, marketplace, dan Desty Omni.
7. Memberikan admin panel untuk mengelola produk, kategori, collection, order, pembayaran, pengiriman, voucher, banner, halaman statis, dan integrasi.
8. Menyediakan fondasi database yang sederhana, scalable, dan sesuai kebutuhan toko Axegear.

---

## 3. Latar Belakang

Axegear sebelumnya sudah memiliki channel penjualan melalui marketplace. Namun, website resmi diperlukan untuk:

- Meningkatkan kredibilitas brand.
- Menampilkan katalog produk dengan kontrol penuh.
- Mengelola campaign seperti Best Seller, New Arrival, Promo, dan Bundling.
- Mengumpulkan traffic langsung dari SEO, iklan, dan social media.
- Mengurangi ketergantungan terhadap marketplace.
- Menyediakan pengalaman belanja yang lebih brand-oriented.

Rancangan database awal sebelumnya lebih cocok untuk toko baju karena varian produk masih berfokus pada warna dan ukuran. Setelah revisi, modul produk disederhanakan agar cocok untuk Axegear: detail produk seperti fitur, spesifikasi, isi paket, dan best for akan dimasukkan ke `products.description` menggunakan Tiptap.js.

---

## 4. Ruang Lingkup Produk

### 4.1 Dalam Scope

Website mencakup:

1. Public storefront.
2. Customer authentication.
3. Product catalog.
4. Category page.
5. Collection page.
6. Product detail page.
7. Cart.
8. Checkout.
9. Address management.
10. Shipping rate calculation using Biteship.
11. Payment using Midtrans Snap.
12. Order history.
13. Order detail and tracking.
14. Admin dashboard.
15. Product management.
16. Category management.
17. Collection management.
18. Product image management.
19. Product variant and stock display.
20. Marketplace links.
21. Voucher management.
22. Banner management.
23. CMS pages.
24. Payment webhook handling.
25. Shipping webhook handling.
26. Desty Omni stock mapping and sync logs.
27. Notification system.
28. Wishlist.
29. Product review.

### 4.2 Di Luar Scope untuk MVP

Fitur berikut tidak wajib pada MVP pertama:

1. Loyalty point.
2. Affiliate/referral system.
3. Multi-vendor marketplace.
4. Auction/preorder complex system.
5. Live chat internal.
6. Product comparison.
7. Advanced recommendation engine.
8. Mobile app native.
9. Warehouse management internal selain Desty.
10. Full accounting system.
11. ERP internal.
12. Return/refund automation kompleks.

---

## 5. User Role

### 5.1 Guest

Guest adalah pengunjung yang belum login.

Kemampuan:

- Melihat homepage.
- Melihat kategori.
- Melihat collection.
- Melihat detail produk.
- Mencari produk.
- Melihat link marketplace.
- Menambahkan produk ke cart sebagai session cart jika fitur guest cart diaktifkan.
- Login/register sebelum checkout.

### 5.2 Customer

Customer adalah user yang sudah login.

Kemampuan:

- Mengelola profil.
- Mengelola alamat.
- Menambahkan produk ke cart.
- Checkout.
- Memilih kurir.
- Melakukan pembayaran.
- Melihat riwayat order.
- Melihat status pembayaran.
- Melihat status pengiriman.
- Memberikan review produk setelah order selesai.
- Menambahkan produk ke wishlist.

### 5.3 Admin

Admin adalah pengelola operasional website.

Kemampuan:

- Mengelola produk.
- Mengelola kategori.
- Mengelola collection.
- Mengelola gambar produk.
- Mengelola varian produk.
- Melihat stok hasil sinkron Desty.
- Mengelola order.
- Melihat pembayaran.
- Membuat pengiriman Biteship.
- Melihat tracking pengiriman.
- Mengelola voucher.
- Mengelola banner.
- Mengelola halaman statis.
- Melihat log integrasi.
- Melihat aktivitas admin.

### 5.4 Super Admin

Super Admin memiliki akses penuh.

Kemampuan tambahan:

- Mengelola admin.
- Mengelola konfigurasi integrasi Midtrans.
- Mengelola konfigurasi integrasi Biteship.
- Mengelola konfigurasi Desty Omni.
- Mengatur site settings.
- Melihat semua audit log.

---

## 6. Target User

Target user website:

1. Pengguna motor trail/enduro.
2. Pengguna sepeda MTB.
3. Pelari/trail runner.
4. Pengguna outdoor gear.
5. Customer yang sudah mengenal Axegear dari marketplace.
6. Customer baru dari SEO, Instagram, TikTok, Facebook, komunitas riding, dan ads.

---

## 7. Value Proposition

Website harus menonjolkan:

1. Produk original Axegear.
2. Katalog lengkap dan rapi.
3. Produk cocok untuk trail riding, touring, MTB, running, dan outdoor.
4. Pembayaran aman melalui Midtrans.
5. Pengiriman fleksibel melalui Biteship.
6. Opsi beli langsung di website atau marketplace.
7. Stok lebih akurat karena terhubung dengan Desty Omni.
8. Deskripsi produk lengkap dengan foto, spesifikasi, fitur, dan isi paket.

---

## 8. Teknologi

### 8.1 Backend

- Laravel 12 atau versi stabil terbaru.
- PHP 8.3+.
- Laravel Breeze / Starter Kit React Inertia.
- Laravel Queue untuk proses async.
- Laravel Scheduler untuk sync berkala.
- Laravel Notifications untuk notifikasi internal.
- Laravel Policies untuk authorization.
- Laravel Form Request untuk validasi.
- Laravel Eloquent ORM.

### 8.2 Frontend

- React.
- TypeScript.
- Inertia.js.
- Vite.
- Tailwind CSS.
- Tiptap.js untuk rich text editor produk dan CMS.
- React Hook Form atau form bawaan Inertia.
- Zod opsional untuk validasi frontend.
- Shadcn/ui atau custom UI component.

### 8.3 Database

- MySQL 8.x.

### 8.4 Payment

- Midtrans Snap.
- Midtrans notification/webhook.

### 8.5 Shipping

- Biteship Rates API.
- Biteship Orders API.
- Biteship Tracking API.
- Biteship webhook.

### 8.6 Inventory Sync

- Desty Omni API.
- Desty as master stock.
- Website stores stock snapshot only.

### 8.7 Storage

- Local storage untuk development.
- S3-compatible storage atau hosting storage untuk production.
- Product images disimpan di storage dan URL disimpan di database.

---

## 9. Prinsip Arsitektur

1. Laravel tetap menjadi backend utama.
2. Inertia digunakan agar frontend React tetap memakai routing dan controller Laravel.
3. React TypeScript digunakan untuk UI yang modern dan typed.
4. MySQL digunakan sebagai relational database.
5. Product detail tidak dibuat banyak tabel; rich content disimpan di `products.description`.
6. Stok utama berasal dari Desty Omni.
7. Website tidak boleh menjadi master stock jika Desty aktif.
8. Order yang sudah dibayar harus dikirim ke Desty.
9. Jika sync Desty gagal, order tidak boleh hilang; status masuk `paid_pending_desty_sync` atau `sync_failed`.
10. Semua webhook harus idempotent.
11. Semua request penting ke Midtrans, Biteship, dan Desty harus dicatat dalam log.
12. Proses berat seperti sync stok, create shipment, dan push order ke Desty harus menggunakan queue.

---

## 10. Modul Utama

## 10.1 Public Storefront

### Deskripsi

Halaman publik untuk menampilkan brand, campaign, kategori, collection, dan produk.

### Halaman

1. Homepage.
2. Product listing.
3. Category detail.
4. Collection detail.
5. Product detail.
6. Search result.
7. Cart.
8. Checkout.
9. Static pages.

### Requirement

- Homepage menampilkan banner utama.
- Homepage menampilkan featured collections.
- Homepage menampilkan best seller.
- Homepage menampilkan new arrival.
- Homepage menampilkan kategori utama.
- Product card menampilkan gambar utama, nama, harga, harga diskon, stock status, dan badge.
- Product listing bisa difilter berdasarkan kategori, collection, harga, status stok, dan keyword.
- Product detail menampilkan gambar galeri, nama, harga, varian, stok, deskripsi rich text, marketplace links, dan produk rekomendasi.

---

## 10.2 Product Catalog

### Deskripsi

Modul untuk mengelola produk Axegear.

### Struktur final modul produk

Tabel utama:

1. `categories`
2. `collections`
3. `products`
4. `product_collections`
5. `product_images`
6. `product_variants`
7. `product_marketplace_links`

### Requirement

- Admin dapat membuat kategori.
- Admin dapat membuat collection.
- Admin dapat membuat produk.
- Admin dapat upload beberapa gambar produk.
- Admin dapat menentukan gambar utama.
- Admin dapat membuat varian produk.
- Admin dapat mengisi SKU varian.
- Admin dapat mengatur harga normal dan harga sale.
- Admin dapat mengisi deskripsi produk menggunakan Tiptap.js.
- Admin dapat memasukkan spesifikasi, fitur, isi paket, dan best for langsung di deskripsi rich text.
- Admin dapat memasukkan link Shopee, Tokopedia, TikTok Shop, atau marketplace lain.
- Admin tidak boleh mengubah stok manual jika `stock_source = desty` dan `allow_manual_stock_edit = false`.

### Contoh produk

Produk: `AXEGEAR Tas Trail Enduro Hydropack 05`

Kategori:

- Hydropack

Collections:

- Best Seller
- Trail Riding Gear
- Promo

Varian:

- Hitam
- Hitam + Water Bladder 2L
- Army

Marketplace Links:

- Shopee
- Tokopedia

---

## 10.3 Category

### Deskripsi

Kategori adalah klasifikasi utama produk.

### Contoh kategori

- Hydropack
- Tas Stang
- Tas Tangki
- Helmet Bag
- Running Belt
- Water Bladder
- Strap Motor Trail
- Aksesoris

### Requirement

- Category dapat memiliki parent category.
- Category memiliki slug.
- Category dapat diaktifkan/nonaktifkan.
- Category dapat memiliki gambar.
- Category digunakan untuk navigasi utama katalog.

---

## 10.4 Collection

### Deskripsi

Collection adalah grouping marketing atau campaign.

### Contoh collection

- Best Seller
- New Arrival
- Promo
- Bundling Hemat
- Trail Riding Gear
- Touring Gear
- Hydropack Series

### Requirement

- Produk dapat masuk ke banyak collection.
- Collection dapat memiliki banner desktop dan mobile.
- Collection dapat memiliki periode aktif dengan `starts_at` dan `ends_at`.
- Collection dapat ditandai sebagai featured.
- Collection digunakan untuk landing page campaign.

---

## 10.5 Product Variant dan Stock

### Deskripsi

Varian produk menyimpan SKU, harga varian, stok cache, dan mapping ke Desty.

### Requirement

- Setiap produk minimal memiliki 1 varian.
- Varian default bernama `Default Title` jika produk tidak memiliki variasi.
- SKU varian wajib unik.
- SKU varian harus cocok atau termapping dengan SKU Desty.
- Stok ditampilkan berdasarkan `stock` pada `product_variants`.
- `stock` adalah cache dari Desty, bukan master stock.
- Saat checkout, sistem menggunakan `reserved_stock` untuk menahan stok sementara.
- Jika Desty aktif, admin tidak boleh mengubah stok langsung dari website.

### Formula stok website

```text
stock = desty_available_stock - reserved_stock
```

Jika hasil kurang dari 0, tampilkan 0.

---

## 10.6 Cart

### Deskripsi

Cart menyimpan item yang akan dibeli customer.

### Requirement

- Customer dapat menambahkan produk ke cart.
- Customer dapat mengubah quantity.
- Customer dapat menghapus item.
- Sistem mengecek stok varian sebelum menambahkan ke cart.
- Harga di cart disimpan sebagai `price_snapshot`.
- Jika harga produk berubah setelah item ada di cart, sistem harus menampilkan harga terbaru saat checkout.
- Jika stok habis, customer tidak bisa checkout item tersebut.

---

## 10.7 Checkout

### Deskripsi

Checkout adalah proses customer memilih alamat, memilih kurir, membuat order, dan membayar.

### Flow Checkout

1. Customer membuka cart.
2. Customer klik checkout.
3. Sistem validasi stok.
4. Customer memilih alamat.
5. Sistem mengambil shipping rate dari Biteship.
6. Customer memilih kurir.
7. Sistem menghitung subtotal, diskon, ongkir, biaya layanan, dan grand total.
8. Customer menyetujui kebijakan toko.
9. Sistem membuat order dengan status `pending_payment`.
10. Sistem membuat inventory reservation.
11. Sistem membuat Snap token Midtrans.
12. Customer membayar melalui Midtrans Snap.
13. Midtrans mengirim webhook.
14. Jika payment sukses, order menjadi `paid` atau `paid_pending_desty_sync`.
15. Sistem push order ke Desty.
16. Sistem membuat shipment Biteship jika diperlukan.

### Requirement

- Checkout wajib login.
- Checkout wajib memiliki alamat pengiriman.
- Checkout wajib memilih kurir.
- Checkout wajib validasi stok terbaru.
- Checkout harus menggunakan idempotency key untuk mencegah order dobel.
- Setelah order dibuat, cart item yang sudah checkout dihapus.
- Jika payment expired, inventory reservation dilepas.

---

## 10.8 Payment Midtrans

### Deskripsi

Midtrans digunakan sebagai payment gateway.

### Requirement

- Sistem menggunakan Midtrans Snap.
- Request Snap token dilakukan dari backend Laravel.
- Frontend menampilkan Snap popup atau redirect URL.
- Sistem menyimpan Snap token dan redirect URL.
- Sistem menerima notification/webhook dari Midtrans.
- Webhook harus memverifikasi signature.
- Webhook harus idempotent.
- Jika payment `settlement` atau `capture` sukses, order menjadi paid.
- Jika payment expired, order menjadi expired dan stok reservation dilepas.
- Jika payment failed/cancelled/deny, order menjadi failed/cancelled sesuai kebutuhan.

### Status payment internal

- `pending`
- `paid`
- `failed`
- `expired`
- `refunded`

### Data yang disimpan

- `midtrans_order_id`
- `midtrans_transaction_id`
- `midtrans_snap_token`
- `midtrans_redirect_url`
- `transaction_status`
- `fraud_status`
- `gross_amount`
- `raw_response`

---

## 10.9 Shipping Biteship

### Deskripsi

Biteship digunakan untuk cek ongkir, membuat pengiriman, dan tracking paket.

### Requirement

- Sistem dapat mengambil area ID atau menggunakan alamat customer.
- Sistem dapat melakukan rate checking.
- Customer dapat memilih kurir dan layanan.
- Setelah order dibayar, admin atau sistem dapat membuat shipment.
- Sistem menyimpan `biteship_order_id`, `tracking_id`, `waybill_id`, dan `label_url`.
- Sistem menerima webhook tracking dari Biteship.
- Customer dapat melihat status pengiriman.
- Admin dapat melihat riwayat tracking.

### Status shipping internal

- `not_created`
- `created`
- `picked_up`
- `in_transit`
- `delivered`
- `failed`
- `returned`

---

## 10.10 Desty Omni Integration

### Deskripsi

Desty Omni digunakan sebagai master stock dan sinkronisasi stok lintas channel.

### Prinsip

- Desty adalah master stock.
- Website adalah sales channel.
- Website menyimpan stock snapshot.
- SKU varian website harus termapping dengan SKU Desty.
- Stok masuk dan stok keluar utama mengikuti Desty.
- Order dari website harus dikirim ke Desty setelah payment sukses.

### Requirement

- Admin dapat menyimpan konfigurasi koneksi Desty.
- Admin dapat mapping produk website ke produk Desty.
- Admin dapat mapping varian website ke SKU Desty.
- Sistem dapat melakukan pull stock dari Desty.
- Sistem dapat menerima webhook Desty jika tersedia.
- Sistem dapat push order website ke Desty.
- Sistem mencatat semua sync job ke `desty_sync_jobs`.
- Sistem mencatat semua webhook ke `desty_webhook_logs`.
- Jika sync gagal, sistem retry melalui queue.
- Jika order sudah paid tetapi gagal sync ke Desty, status order menjadi `paid_pending_desty_sync` atau `sync_failed`.

### Flow stok masuk

1. Admin update stok di Desty.
2. Website pull stock atau menerima webhook.
3. Website update `desty_available_stock`.
4. Website update `stock`.
5. Website mencatat `stock_logs` dengan source `desty`.

### Flow stok keluar website

1. Customer checkout.
2. Website reserve stok lokal.
3. Customer bayar.
4. Website push order ke Desty.
5. Desty mengurangi stok pusat.
6. Website sync ulang stok.
7. Reservation menjadi finalized.

### Flow payment expired

1. Payment expired dari Midtrans.
2. Order menjadi expired.
3. Reservation dilepas.
4. `reserved_stock` dikurangi.
5. Tidak perlu push stock out ke Desty.

---

## 10.11 Voucher

### Deskripsi

Voucher digunakan untuk promosi diskon.

### Requirement

- Admin dapat membuat voucher.
- Voucher bisa fixed amount atau percentage.
- Voucher bisa memiliki minimal order.
- Voucher bisa memiliki maksimal diskon.
- Voucher bisa memiliki periode aktif.
- Voucher bisa dibatasi jumlah pemakaian.
- Voucher bisa berlaku untuk semua produk, produk tertentu, atau kategori tertentu.
- Sistem menyimpan voucher code snapshot di order.

---

## 10.12 Wishlist

### Deskripsi

Customer dapat menyimpan produk favorit.

### Requirement

- Customer dapat menambahkan produk ke wishlist.
- Customer dapat menghapus produk dari wishlist.
- Wishlist hanya untuk user login.
- Produk yang sudah tidak aktif tetap bisa muncul dengan status unavailable atau disembunyikan sesuai aturan admin.

---

## 10.13 Product Review

### Deskripsi

Customer dapat memberi review setelah membeli produk.

### Requirement

- Review hanya bisa dibuat oleh customer yang membeli produk.
- Review dapat dibuat setelah order selesai.
- Review berisi rating 1-5, title, dan comment.
- Admin dapat menyembunyikan review.
- Rating rata-rata produk dihitung dari review visible.

---

## 10.14 Admin Dashboard

### Deskripsi

Admin dashboard digunakan untuk mengelola operasional website.

### Halaman admin

1. Dashboard overview.
2. Product list.
3. Product create/edit.
4. Category list.
5. Collection list.
6. Order list.
7. Order detail.
8. Payment list.
9. Shipment list.
10. Voucher list.
11. Banner list.
12. Page CMS.
13. Customer list.
14. Review moderation.
15. Desty mapping.
16. Integration logs.
17. Site settings.
18. Admin activity logs.

### Dashboard metrics

- Total sales.
- Total orders.
- Pending payment.
- Paid orders.
- Orders pending Desty sync.
- Orders pending shipment.
- Low stock products.
- Best selling products.
- Recent orders.

---

## 10.15 CMS

### Deskripsi

CMS digunakan untuk konten non-produk.

### Requirement

- Admin dapat membuat halaman statis.
- Admin dapat membuat halaman seperti About, Terms, Privacy, Shipping Policy, Return Policy.
- Konten halaman menggunakan Tiptap.js.
- Admin dapat mengelola banner homepage.

---

## 11. User Flow

## 11.1 Guest Melihat Produk

```text
Homepage
→ Pilih kategori / collection
→ Product listing
→ Product detail
→ Pilih varian
→ Add to cart
→ Login/Register
```

## 11.2 Customer Checkout

```text
Cart
→ Checkout
→ Pilih alamat
→ Cek ongkir Biteship
→ Pilih kurir
→ Buat order
→ Bayar Midtrans
→ Payment success
→ Order detail
```

## 11.3 Admin Tambah Produk

```text
Admin login
→ Product management
→ Create product
→ Pilih category
→ Isi nama, harga, SKU induk
→ Isi description dengan Tiptap
→ Upload gambar
→ Tambah varian
→ Mapping SKU Desty
→ Publish
```

## 11.4 Admin Proses Order

```text
Order paid
→ Cek sync Desty
→ Jika belum sync, retry sync
→ Create shipment Biteship
→ Cetak label
→ Update tracking otomatis via webhook
→ Order delivered
→ Order completed
```

---

## 12. Status dan State Machine

## 12.1 Order Status

| Status | Deskripsi |
|---|---|
| `pending_payment` | Order dibuat, customer belum bayar |
| `paid` | Pembayaran sukses, belum masuk proses berikutnya |
| `paid_pending_desty_sync` | Sudah bayar, tetapi belum berhasil sync ke Desty |
| `processing` | Order sedang diproses admin |
| `shipped` | Order sudah dikirim |
| `completed` | Order selesai |
| `cancelled` | Order dibatalkan |
| `sync_failed` | Sinkronisasi ke sistem eksternal gagal |

## 12.2 Payment Status

| Status | Deskripsi |
|---|---|
| `pending` | Menunggu pembayaran |
| `paid` | Pembayaran sukses |
| `failed` | Pembayaran gagal |
| `expired` | Pembayaran kadaluarsa |
| `refunded` | Pembayaran dikembalikan |

## 12.3 Shipping Status

| Status | Deskripsi |
|---|---|
| `not_created` | Shipment belum dibuat |
| `created` | Shipment dibuat |
| `picked_up` | Paket sudah dipickup |
| `in_transit` | Paket dalam pengiriman |
| `delivered` | Paket diterima |
| `failed` | Pengiriman gagal |
| `returned` | Paket dikembalikan |

## 12.4 Inventory Reservation Status

| Status | Deskripsi |
|---|---|
| `reserved` | Stok ditahan sementara |
| `released` | Reservation dilepas |
| `finalized` | Reservation menjadi pengurangan stok final |
| `expired` | Reservation expired |

---

## 13. Database Ringkas

Database final mengikuti struktur berikut.

### 13.1 User

- `users`
- `customer_addresses`

### 13.2 Product Catalog

- `categories`
- `collections`
- `products`
- `product_collections`
- `product_images`
- `product_variants`
- `product_marketplace_links`

### 13.3 Desty Integration

- `desty_connections`
- `desty_warehouses`
- `desty_product_mappings`
- `desty_variant_mappings`
- `desty_order_mappings`
- `desty_sync_jobs`
- `desty_webhook_logs`

### 13.4 Stock

- `stock_logs`
- `inventory_reservations`

### 13.5 Cart & Order

- `carts`
- `cart_items`
- `orders`
- `order_items`
- `order_addresses`

### 13.6 Payment

- `payments`
- `payment_logs`

### 13.7 Shipping

- `shipments`
- `shipment_trackings`
- `biteship_webhook_logs`

### 13.8 Promotion

- `vouchers`
- `voucher_products`
- `voucher_categories`

### 13.9 Additional

- `product_reviews`
- `wishlists`
- `notifications`
- `banners`
- `pages`
- `site_settings`
- `admin_activity_logs`

---

## 14. API/Internal Route Design

Karena menggunakan Inertia, sebagian besar route adalah web route Laravel. Endpoint API tetap diperlukan untuk webhook, async request, dan integrasi eksternal.

## 14.1 Public Routes

| Method | Route | Deskripsi |
|---|---|---|
| GET | `/` | Homepage |
| GET | `/products` | Product listing |
| GET | `/products/{slug}` | Product detail |
| GET | `/categories/{slug}` | Category page |
| GET | `/collections/{slug}` | Collection page |
| GET | `/search` | Search result |
| GET | `/pages/{slug}` | Static page |

## 14.2 Customer Routes

| Method | Route | Deskripsi |
|---|---|---|
| GET | `/cart` | Cart page |
| POST | `/cart/items` | Add to cart |
| PATCH | `/cart/items/{id}` | Update quantity |
| DELETE | `/cart/items/{id}` | Remove cart item |
| GET | `/checkout` | Checkout page |
| POST | `/checkout` | Create order |
| GET | `/orders` | Order history |
| GET | `/orders/{order_number}` | Order detail |
| POST | `/wishlist/{product}` | Add wishlist |
| DELETE | `/wishlist/{product}` | Remove wishlist |
| POST | `/reviews` | Create review |

## 14.3 Admin Routes

| Method | Route | Deskripsi |
|---|---|---|
| GET | `/admin` | Dashboard |
| GET | `/admin/products` | Product list |
| GET | `/admin/products/create` | Create product page |
| POST | `/admin/products` | Store product |
| GET | `/admin/products/{id}/edit` | Edit product page |
| PUT | `/admin/products/{id}` | Update product |
| DELETE | `/admin/products/{id}` | Delete product |
| GET | `/admin/orders` | Order list |
| GET | `/admin/orders/{id}` | Order detail |
| POST | `/admin/orders/{id}/create-shipment` | Create Biteship shipment |
| POST | `/admin/orders/{id}/retry-desty-sync` | Retry Desty sync |
| GET | `/admin/desty/mappings` | Desty mapping page |
| POST | `/admin/desty/sync-stock` | Trigger stock sync |

## 14.4 Webhook Routes

| Method | Route | Deskripsi |
|---|---|---|
| POST | `/webhooks/midtrans` | Midtrans notification |
| POST | `/webhooks/biteship` | Biteship webhook |
| POST | `/webhooks/desty` | Desty webhook jika tersedia |

## 14.5 Utility API Routes

| Method | Route | Deskripsi |
|---|---|---|
| POST | `/api/shipping/rates` | Get Biteship rates |
| POST | `/api/payments/midtrans/snap-token` | Generate Snap token |
| GET | `/api/areas/search` | Search Biteship area |

---

## 15. Integrasi Detail

## 15.1 Midtrans

### Trigger

- Saat order dibuat dan customer masuk ke pembayaran.

### Data input

- Order number.
- Customer name.
- Customer email.
- Customer phone.
- Item details.
- Gross amount.

### Output

- Snap token.
- Redirect URL.
- Transaction status.
- Webhook payload.

### Failure handling

- Jika Snap token gagal dibuat, order tetap tersimpan dengan payment status `pending` dan user diminta mencoba lagi.
- Jika webhook datang lebih dari sekali, sistem tidak memproses dua kali.
- Jika signature tidak valid, webhook ditolak.

---

## 15.2 Biteship

### Trigger rate checking

- Saat customer berada di checkout dan memilih alamat.

### Trigger create order

- Setelah payment sukses.
- Bisa otomatis atau manual oleh admin.

### Data input rate

- Origin area ID.
- Destination area ID.
- Weight total.
- Item dimensions jika tersedia.
- Courier preferences jika dibatasi.

### Data output

- Courier company.
- Courier service.
- Estimated delivery.
- Price.

### Failure handling

- Jika rate gagal, tampilkan pesan error dan tombol retry.
- Jika create shipment gagal, order tetap `processing` dan admin dapat retry.
- Tracking update diproses secara idempotent.

---

## 15.3 Desty Omni

### Trigger pull stock

- Scheduler setiap 5-15 menit.
- Manual trigger oleh admin.
- Webhook jika tersedia.

### Trigger push order

- Setelah payment sukses.

### Data penting

- Product ID Desty.
- Variant ID Desty.
- SKU Desty.
- Warehouse ID.
- Available stock.
- On hand stock.
- Order ID Desty.

### Failure handling

- Semua sync dicatat ke `desty_sync_jobs`.
- Retry maksimal 3 kali.
- Jika tetap gagal, status menjadi `failed`.
- Admin dapat retry manual.

---

## 16. Validasi Bisnis

### Product

- `name` wajib.
- `slug` wajib unik.
- `regular_price` wajib lebih dari 0.
- `sale_price` tidak boleh lebih besar dari `regular_price`.
- Minimal 1 gambar utama direkomendasikan.
- Minimal 1 varian wajib.
- SKU varian wajib unik.

### Cart

- Quantity minimal 1.
- Quantity tidak boleh melebihi stok tersedia.
- Item inactive tidak bisa ditambahkan.

### Checkout

- User wajib login.
- Alamat wajib lengkap.
- Kurir wajib dipilih.
- Grand total harus sama dengan kalkulasi backend.
- Payment hanya dibuat untuk order valid.

### Order

- Order number wajib unik.
- Order tidak boleh dibayar dua kali.
- Order expired harus melepas inventory reservation.

### Stock

- Admin tidak boleh edit stok manual jika sumber stok Desty.
- Stock log wajib dibuat untuk perubahan stok penting.
- Reservation wajib dilepas jika payment expired.

---

## 17. Non-Functional Requirements

## 17.1 Performance

- Homepage load time target kurang dari 3 detik.
- Product listing mendukung pagination.
- Image harus dioptimasi.
- Query product list harus menggunakan index.
- Admin order list harus menggunakan pagination dan filter.
- Heavy sync menggunakan queue.

## 17.2 Security

- Password menggunakan hashing Laravel.
- Admin route wajib middleware auth dan role.
- Webhook Midtrans wajib verifikasi signature.
- API key disimpan encrypted.
- Upload file wajib validasi MIME dan ukuran.
- Input rich text dari Tiptap wajib disanitasi.
- CSRF protection untuk web route.
- Rate limit untuk endpoint sensitif.

## 17.3 Reliability

- Webhook harus idempotent.
- Payment log wajib menyimpan payload.
- Biteship webhook log wajib menyimpan payload.
- Desty sync job wajib menyimpan request dan response.
- Queue worker harus diawasi.
- Scheduler harus aktif.

## 17.4 Maintainability

- Gunakan service class untuk Midtrans, Biteship, dan Desty.
- Gunakan action class untuk checkout dan order flow.
- Gunakan policy untuk authorization.
- Gunakan form request untuk validasi.
- Gunakan enum atau constants untuk status.

## 17.5 SEO

- Product detail memiliki meta title dan meta description.
- Category dan collection memiliki slug SEO-friendly.
- Product image memiliki alt text.
- Static page dapat memiliki meta data.
- URL produk harus stabil.

---

## 18. Suggested Folder Structure

```text
app/
  Actions/
    Checkout/
      CreateOrderAction.php
      ReserveStockAction.php
      ReleaseStockAction.php
    Payment/
      CreateMidtransSnapTokenAction.php
      HandleMidtransWebhookAction.php
    Shipping/
      GetBiteshipRatesAction.php
      CreateBiteshipShipmentAction.php
      HandleBiteshipWebhookAction.php
    Desty/
      PullDestyStockAction.php
      PushOrderToDestyAction.php
      HandleDestyWebhookAction.php

  Enums/
    OrderStatus.php
    PaymentStatus.php
    ShippingStatus.php
    StockSource.php
    InventoryReservationStatus.php

  Http/
    Controllers/
      Storefront/
      Customer/
      Admin/
      Webhook/
      Api/
    Requests/
      ProductRequest.php
      CheckoutRequest.php
      VoucherRequest.php

  Jobs/
    SyncDestyStockJob.php
    PushOrderToDestyJob.php
    CreateBiteshipShipmentJob.php
    ProcessMidtransWebhookJob.php

  Models/
    User.php
    Product.php
    ProductVariant.php
    Order.php
    Payment.php
    Shipment.php

  Services/
    MidtransService.php
    BiteshipService.php
    DestyService.php

resources/
  js/
    Pages/
      Storefront/
      Auth/
      Customer/
      Admin/
    Components/
    Layouts/
    Types/
```

---

## 19. Frontend Page Requirements

## 19.1 Homepage

Komponen:

- Header.
- Search bar.
- Hero banner.
- Category shortcut.
- Featured collection.
- Best seller products.
- New arrival products.
- Promo banner.
- Footer.

## 19.2 Product Listing

Komponen:

- Filter category.
- Filter collection.
- Filter price.
- Filter stock status.
- Sort newest, price low-high, price high-low, best seller.
- Product grid.
- Pagination.

## 19.3 Product Detail

Komponen:

- Product image gallery.
- Product title.
- Price.
- Sale price.
- Variant selector.
- Stock status.
- Quantity selector.
- Add to cart.
- Buy now.
- Marketplace buttons.
- Rich description.
- Reviews.
- Related products.

## 19.4 Cart

Komponen:

- Cart item list.
- Quantity update.
- Remove item.
- Price summary.
- Checkout button.

## 19.5 Checkout

Komponen:

- Address selector.
- Add/edit address.
- Shipping rate selector.
- Voucher input.
- Order summary.
- Payment button.

## 19.6 Order Detail

Komponen:

- Order status.
- Payment status.
- Shipping status.
- Items.
- Address.
- Payment info.
- Tracking info.
- Marketplace/order support info.

---

## 20. Admin Page Requirements

## 20.1 Product Management

- Table product.
- Search product.
- Filter status.
- Filter category.
- Create/edit product.
- Upload product images.
- Set primary image.
- Manage variants.
- Manage marketplace links.
- Rich text description editor.

## 20.2 Order Management

- Order list.
- Filter by status.
- Filter by date.
- Filter by payment status.
- Filter by shipping status.
- Order detail.
- Retry Desty sync.
- Create shipment.
- View payment raw response.
- View shipment tracking.

## 20.3 Integration Log

- Desty sync job list.
- Midtrans payment log list.
- Biteship webhook log list.
- Error detail.
- Retry button where applicable.

---

## 21. Acceptance Criteria

## 21.1 Product Catalog

- Admin dapat membuat produk dengan minimal 1 varian.
- Product detail tampil di frontend.
- Product dapat masuk lebih dari 1 collection.
- Product dapat memiliki banyak gambar.
- Product description dapat menyimpan HTML dari Tiptap.

## 21.2 Cart & Checkout

- Customer dapat add to cart.
- Customer dapat update quantity.
- Customer tidak bisa checkout jika stok tidak cukup.
- Customer dapat memilih alamat.
- Customer dapat memilih ongkir dari Biteship.
- Order berhasil dibuat.

## 21.3 Payment

- Sistem berhasil membuat Snap token.
- Customer dapat membayar melalui Midtrans.
- Webhook payment sukses mengubah order menjadi paid.
- Payment expired melepas stok reservation.

## 21.4 Shipping

- Sistem dapat menampilkan pilihan ongkir.
- Admin dapat membuat shipment Biteship.
- Tracking update dapat disimpan.
- Customer dapat melihat status pengiriman.

## 21.5 Desty

- Admin dapat mapping SKU website ke SKU Desty.
- Sistem dapat menyimpan hasil sync stok.
- Stok product variant berubah berdasarkan data Desty.
- Order paid dapat dikirim ke Desty.
- Jika sync gagal, sistem menandai status order dan membuat log.

---

## 22. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| SKU website dan Desty tidak sama | Stok salah | Wajib mapping SKU sebelum publish produk |
| Webhook Midtrans ganda | Order diproses dua kali | Gunakan payload hash dan idempotency |
| Biteship rate gagal | Customer tidak bisa checkout | Tampilkan retry dan fallback message |
| Desty sync gagal | Order paid belum mengurangi stok pusat | Status `paid_pending_desty_sync` dan retry queue |
| Admin edit stok manual | Stok tidak sinkron | Disable manual edit jika stock source Desty |
| Rich text mengandung script | XSS | Sanitasi HTML dari Tiptap |
| Queue worker mati | Sync tidak berjalan | Monitoring worker dan scheduler |

---

## 23. MVP Scope

MVP pertama sebaiknya fokus pada:

1. Storefront.
2. Product catalog sederhana.
3. Category dan collection.
4. Product detail dengan Tiptap description.
5. Cart.
6. Checkout.
7. Midtrans payment.
8. Biteship rate checking.
9. Basic shipment creation.
10. Admin product management.
11. Admin order management.
12. Desty SKU mapping.
13. Pull stock dari Desty.
14. Stock reservation.
15. Payment webhook.
16. Biteship tracking webhook.

---

## 24. Future Enhancement

Setelah MVP stabil, fitur yang bisa ditambahkan:

1. Product recommendation.
2. Advanced SEO schema markup.
3. Live chat WhatsApp integration.
4. Abandoned cart reminder.
5. Loyalty point.
6. Bundle builder.
7. Product comparison.
8. Advanced dashboard analytics.
9. Export laporan penjualan.
10. Customer segmentation.
11. Email marketing integration.
12. Multi warehouse display.
13. Return/refund management.

---

## 25. Environment Variables

Contoh `.env` yang diperlukan:

```env
APP_NAME="Axegear"
APP_ENV=local
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=axegear_ecommerce
DB_USERNAME=root
DB_PASSWORD=

MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false
MIDTRANS_IS_SANITIZED=true
MIDTRANS_IS_3DS=true

BITESHIP_API_KEY=
BITESHIP_BASE_URL=https://api.biteship.com
BITESHIP_ORIGIN_AREA_ID=

DESTY_BASE_URL=
DESTY_VENDOR_ID=
DESTY_API_KEY=

QUEUE_CONNECTION=database
FILESYSTEM_DISK=public
```

---

## 26. Testing Requirements

### Unit Test

- Product price calculation.
- Voucher calculation.
- Stock reservation.
- Order total calculation.
- Status transition.

### Feature Test

- Add to cart.
- Checkout.
- Create Midtrans payment.
- Handle Midtrans webhook.
- Get Biteship rates.
- Create shipment.
- Pull Desty stock.
- Push order to Desty.

### Integration Test

- Midtrans sandbox.
- Biteship staging.
- Desty sandbox/staging jika tersedia.

### Manual Test

- Product create/edit.
- Image upload.
- Rich text editor.
- Checkout from mobile.
- Payment flow.
- Shipping tracking.
- Admin retry sync.

---

## 27. Definition of Done

Fitur dianggap selesai jika:

1. UI selesai dan responsive.
2. Backend validation selesai.
3. Database migration selesai.
4. Authorization berjalan.
5. Error handling tersedia.
6. Test minimal untuk flow utama tersedia.
7. Dokumentasi environment variable tersedia.
8. Tidak ada data dummy hardcoded di production.
9. Webhook sudah idempotent.
10. Log integrasi tersimpan.
11. Admin dapat mengoperasikan fitur tanpa akses database langsung.

---

## 28. Referensi Teknis

- Laravel Starter Kit React Inertia: https://laravel.com/docs/13.x/starter-kits
- Inertia.js: https://inertiajs.com/
- Midtrans Snap: https://docs.midtrans.com/docs/snap
- Midtrans Snap Integration Guide: https://docs.midtrans.com/docs/snap-snap-integration-guide
- Biteship API Introduction: https://biteship.com/en/docs/intro
- Biteship Rates API: https://biteship.com/id/docs/api/rates/overview
- Biteship Create Order API: https://biteship.com/en/docs/api/orders/create
- Desty Omni API Documentation: https://api.desty.app/
- Mekari Desty Inventory: https://desty.mekari.com/fitur/sistem-manajemen-inventory

---

## 29. Lampiran: Product Schema Final

Modul produk final yang digunakan:

```text
categories
collections
products
product_collections
product_images
product_variants
product_marketplace_links
```

Prinsip penyederhanaan:

- `features`, `specifications`, `best_for`, dan `package contents` tidak dibuat tabel terpisah.
- Semua detail panjang masuk ke `products.description` menggunakan Tiptap.js.
- Stok tetap di `product_variants` karena stok berbeda per SKU.
- Collection tetap many-to-many agar produk bisa masuk banyak campaign.
- Marketplace link dipisah agar website bisa menampilkan tombol beli di Shopee/Tokopedia.

---

## 30. Kesimpulan

Website e-commerce Axegear akan dibangun sebagai modern monolith menggunakan Laravel, Inertia, React TypeScript, dan MySQL. Fokus utama sistem adalah katalog produk yang sederhana, checkout yang aman, pembayaran Midtrans, pengiriman Biteship, serta stok yang tersinkron dengan Desty Omni.

Dengan PRD ini, tim developer dapat langsung menurunkan kebutuhan menjadi backlog, database migration, desain UI, service integration, dan task development per sprint.
