# PRD Website E-Commerce Axegear

**Nama Produk:** Axegear E-Commerce Website  
**Tipe Dokumen:** Product Requirements Document (PRD)  
**Versi:** 1.0  
**Tanggal:** 12 Juni 2026  
**Stack:** Laravel, Inertia.js, React, TypeScript, MySQL, Midtrans, Biteship
**Target Platform:** Web desktop dan mobile responsive

---

## 1. Ringkasan Produk

Website e-commerce Axegear adalah platform penjualan online resmi untuk produk alat olahraga, riding gear, outdoor gear, dan aksesoris seperti hydropack, tank bag, tas stang, strap motor trail, helmet bag, running belt, water bladder, dan produk sejenis.

Website ini dibuat untuk memberikan pengalaman belanja langsung dari brand, tanpa hanya bergantung pada marketplace seperti Shopee dan Tokopedia. Website tetap menyediakan link marketplace sebagai opsi pembelian tambahan, tetapi checkout utama dapat dilakukan langsung di website.

Website akan menggunakan Laravel sebagai backend utama, Inertia.js sebagai penghubung backend dan frontend, React TypeScript sebagai frontend, MySQL sebagai database, Midtrans sebagai payment gateway, Biteship sebagai shipping aggregator, dan sistem stok lokal sebagai sumber utama pengelolaan stok.

---

## 2. Tujuan Produk

Tujuan utama website ini adalah:

1. Menyediakan katalog produk resmi Axegear yang rapi, modern, dan mudah dikelola.
2. Memungkinkan customer membeli produk langsung melalui website.
3. Mengintegrasikan pembayaran online menggunakan Midtrans.
4. Mengintegrasikan pengiriman menggunakan Biteship.
5. Menampilkan stok yang akurat dari data lokal website.
6. Menghindari overselling dengan mekanisme `reserved_stock` saat checkout.
7. Memberikan admin panel untuk mengelola produk, kategori, collection, order, pembayaran, pengiriman, voucher, banner, halaman statis, dan stok.
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
26. Stock adjustment and stock logs.
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
9. Warehouse management internal kompleks.
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
- Melihat dan menyesuaikan stok produk.
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
- Mengelola konfigurasi stok dan site settings.
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
7. Stok lebih akurat karena dikelola langsung dari admin website.
8. Deskripsi produk lengkap dengan foto, spesifikasi, fitur, dan isi paket.

---

## 8. Teknologi

### 8.1 Backend

- Laravel 12 atau versi stabil terbaru.
- PHP 8.3+.
- Laravel Breeze / Starter Kit React Inertia.
- Laravel Queue untuk proses async.
- Laravel Scheduler untuk scheduled jobs.
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

### 8.6 Inventory Management

- Stok dikelola lokal di database website.
- `product_variants.stock` menjadi stok utama per SKU.
- `product_variants.reserved_stock` digunakan untuk menahan stok sementara saat order belum selesai dibayar.
- `stock_logs` mencatat perubahan stok manual dan pengurangan stok karena order.

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
6. Stok utama berasal dari `product_variants.stock`.
7. Website menjadi master stock untuk penjualan langsung.
8. Order yang sudah dibayar mengurangi stok final.
9. Jika pembayaran gagal atau expired, stok reservation harus dilepas.
10. Semua webhook harus idempotent.
11. Semua request penting ke Midtrans dan Biteship harus dicatat dalam log.
12. Proses berat seperti create shipment dan webhook processing harus menggunakan queue.

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
7. `stock_logs`

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
- Admin dapat mengatur stok varian dari dashboard admin.
- Setiap perubahan stok penting harus dicatat ke `stock_logs`.

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

Varian produk menyimpan SKU, harga varian, stok utama, reserved stock, dan metadata varian.

### Requirement

- Setiap produk minimal memiliki 1 varian.
- Varian default bernama `Default Title` jika produk tidak memiliki variasi.
- SKU varian wajib unik.
- Stok ditampilkan berdasarkan `stock` pada `product_variants`.
- `stock` adalah master stock lokal website.
- Saat checkout, sistem menggunakan `reserved_stock` untuk menahan stok sementara.
- Admin dapat melakukan stock adjustment dan sistem mencatat perubahan ke `stock_logs`.

### Formula stok website

```text
available_stock = stock - reserved_stock
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
10. Sistem menaikkan `reserved_stock` pada varian terkait.
11. Sistem membuat Snap token Midtrans.
12. Customer membayar melalui Midtrans Snap.
13. Midtrans mengirim webhook.
14. Jika payment sukses, order menjadi `paid`.
15. Sistem finalisasi stok dengan mengurangi `stock` dan `reserved_stock`.
16. Sistem membuat shipment Biteship jika diperlukan.

### Requirement

- Checkout wajib login.
- Checkout wajib memiliki alamat pengiriman.
- Checkout wajib memilih kurir.
- Checkout wajib validasi stok terbaru.
- Checkout harus menggunakan idempotency key untuk mencegah order dobel.
- Setelah order dibuat, cart item yang sudah checkout dihapus.
- Jika payment expired, `reserved_stock` dilepas.

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

## 10.10 Stock Management

### Deskripsi

Stock management dikelola langsung di website menggunakan model stok lama: `stock`, `reserved_stock`, dan `stock_logs`.

### Prinsip

- Website adalah master stock untuk checkout website.
- Stok tersedia dihitung dari `stock - reserved_stock`.
- `reserved_stock` hanya menahan stok sementara sampai payment selesai, gagal, atau expired.
- Stok final dikurangi setelah payment sukses.
- Semua perubahan stok penting harus tercatat di `stock_logs`.

### Requirement

- Admin dapat melihat stok total, reserved stock, dan available stock.
- Admin dapat melakukan stock adjustment dari dashboard.
- Sistem menolak adjustment yang membuat `stock < reserved_stock`.
- Sistem mencatat stock adjustment manual ke `stock_logs`.
- Saat checkout, sistem validasi stok terbaru dengan row lock.
- Saat order dibuat, sistem menaikkan `reserved_stock`.
- Saat payment sukses, sistem mengurangi `stock` dan `reserved_stock`.
- Saat payment expired/cancelled/failed, sistem melepas `reserved_stock`.

### Flow stok masuk

1. Admin membuka halaman stock adjustment.
2. Admin menambah stok varian.
3. Website update `product_variants.stock`.
4. Website mencatat perubahan ke `stock_logs`.

### Flow stok keluar website

1. Customer checkout.
2. Website validasi available stock.
3. Website menaikkan `reserved_stock`.
4. Customer bayar.
5. Payment sukses dari Midtrans.
6. Website mengurangi `stock` dan `reserved_stock`.
7. Website mencatat pengurangan stok ke `stock_logs`.

### Flow payment expired

1. Payment expired dari Midtrans.
2. Order menjadi expired.
3. Website melepas reservation.
4. `reserved_stock` dikurangi.

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
15. Stock logs.
16. Integration logs.
17. Site settings.
18. Admin activity logs.

### Dashboard metrics

- Total sales.
- Total orders.
- Pending payment.
- Paid orders.
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
→ Publish
```

## 11.4 Admin Proses Order

```text
Order paid
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
| `processing` | Order sedang diproses admin |
| `shipped` | Order sudah dikirim |
| `completed` | Order selesai |
| `cancelled` | Order dibatalkan |

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

### 13.3 Stock

- `stock_logs`

### 13.4 Cart & Order

- `carts`
- `cart_items`
- `orders`
- `order_items`
- `order_addresses`

### 13.5 Payment

- `payments`
- `payment_logs`

### 13.6 Shipping

- `shipments`
- `shipment_trackings`
- `biteship_webhook_logs`

### 13.7 Promotion

- `vouchers`
- `voucher_products`
- `voucher_categories`

### 13.8 Additional

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
| GET | `/admin/stock` | Stock list |
| GET | `/admin/stock/logs` | Stock log list |
| GET | `/admin/product-variants/{id}/stock-adjustment` | Stock adjustment page |
| PUT | `/admin/product-variants/{id}/stock-adjustment` | Update stock |

## 14.4 Webhook Routes

| Method | Route | Deskripsi |
|---|---|---|
| POST | `/webhooks/midtrans` | Midtrans notification |
| POST | `/webhooks/biteship` | Biteship webhook |

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

## 15.3 Stock Management

### Trigger stock adjustment

- Admin menambah atau mengurangi stok dari dashboard.
- Sistem finalisasi stok setelah payment sukses.
- Sistem melepas reserved stock saat payment expired, failed, atau cancelled.

### Data penting

- Product variant ID.
- SKU varian.
- Stock before.
- Stock after.
- Quantity perubahan.
- Reference type dan reference ID.
- Admin user ID jika perubahan dilakukan manual.

### Failure handling

- Sistem menolak stok negatif.
- Sistem menolak adjustment jika hasil `stock` lebih kecil dari `reserved_stock`.
- Semua perubahan stok penting dicatat ke `stock_logs`.
- Jika finalisasi stok gagal karena invariant rusak, error dilog dan order tidak diproses dua kali.

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
- Order expired harus melepas reserved stock.

### Stock

- Admin boleh edit stok manual melalui stock adjustment.
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
- Heavy processing seperti webhook dan shipment creation menggunakan queue.

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
- Stock log wajib menyimpan perubahan stok penting.
- Queue worker harus diawasi.
- Scheduler harus aktif.

## 17.4 Maintainability

- Gunakan service class untuk Midtrans, Biteship, dan stock management.
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
    Stock/
      FinalizeReservedStockAction.php
      ReleaseStockReservationAction.php

  Enums/
    OrderStatus.php
    PaymentStatus.php
    ShippingStatus.php

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
    StockService.php

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
- Rich text description editor.

## 20.2 Order Management

- Order list.
- Filter by status.
- Filter by date.
- Filter by payment status.
- Filter by shipping status.
- Order detail.
- Create shipment.
- View payment raw response.
- View shipment tracking.

## 20.3 Integration Log

- Stock log list.
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

## 21.5 Stock

- Admin dapat melihat stok varian.
- Admin dapat melakukan stock adjustment.
- Sistem mencatat perubahan stok ke `stock_logs`.
- Order paid mengurangi stok final.
- Payment expired/cancelled/failed melepas reserved stock.

---

## 22. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| SKU varian tidak rapi | Operasional stok sulit dilacak | Wajib SKU unik dan konsisten sebelum publish produk |
| Webhook Midtrans ganda | Order diproses dua kali | Gunakan payload hash dan idempotency |
| Biteship rate gagal | Customer tidak bisa checkout | Tampilkan retry dan fallback message |
| Stock adjustment salah | Stok tidak akurat | Gunakan stock log dan validasi `stock >= reserved_stock` |
| Rich text mengandung script | XSS | Sanitasi HTML dari Tiptap |
| Queue worker mati | Job webhook/shipment tidak berjalan | Monitoring worker dan scheduler |

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
12. Stock adjustment.
13. Stock logs.
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
- Stock adjustment.
- Stock reservation and release.

### Integration Test

- Midtrans sandbox.
- Biteship staging.
- Biteship staging.

### Manual Test

- Product create/edit.
- Image upload.
- Rich text editor.
- Checkout from mobile.
- Payment flow.
- Shipping tracking.
- Admin review stock logs.

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
```

Prinsip penyederhanaan:

- `features`, `specifications`, `best_for`, dan `package contents` tidak dibuat tabel terpisah.
- Semua detail panjang masuk ke `products.description` menggunakan Tiptap.js.
- Stok tetap di `product_variants` karena stok berbeda per SKU.
- Collection tetap many-to-many agar produk bisa masuk banyak campaign.
- Marketplace link dipisah agar website bisa menampilkan tombol beli di Shopee/Tokopedia.

---

## 30. Kesimpulan

Website e-commerce Axegear akan dibangun sebagai modern monolith menggunakan Laravel, Inertia, React TypeScript, dan MySQL. Fokus utama sistem adalah katalog produk yang sederhana, checkout yang aman, pembayaran Midtrans, pengiriman Biteship, serta stok lokal yang dikelola langsung dari dashboard admin.

Dengan PRD ini, tim developer dapat langsung menurunkan kebutuhan menjadi backlog, database migration, desain UI, service integration, dan task development per sprint.
