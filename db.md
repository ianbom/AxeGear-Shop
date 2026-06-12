Project axegear_ecommerce_final {
  database_type: "MySQL"
}

/*
  AXEGEAR E-COMMERCE DATABASE FINAL

  Prinsip:
  - Product dibuat sederhana.
  - Description memakai longtext untuk Tiptap.js.
  - Product detail seperti fitur, spesifikasi, best for, isi paket masuk ke description.
  - Collections tetap dipakai untuk campaign / grouping produk.
  - Product bisa masuk banyak collection lewat product_collections.
  - Stock utama mengikuti Desty Omni.
  - Website hanya menyimpan cache stok dan reserved stock.
*/


// =========================
// USERS
// =========================

Table users {
  id bigint [pk, increment]
  name varchar(255) [not null]
  email varchar(255) [not null, unique]
  google_id varchar(255) [unique]
  phone varchar(255)
  role varchar(255) [not null, default: 'customer', note: 'customer, admin, super_admin']
  avatar_url varchar(255)
  is_active boolean [not null, default: true]
  email_verified_at timestamp
  password varchar(255) [not null]
  two_factor_secret text
  two_factor_recovery_codes text
  two_factor_confirmed_at timestamp
  remember_token varchar(100)
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  indexes {
    email
    role
    is_active
  }
}

Table customer_addresses {
  id bigint [pk, increment]
  user_id bigint [not null]
  recipient_name varchar(150) [not null]
  recipient_phone varchar(30) [not null]
  label varchar(100)
  province varchar(100) [not null]
  city varchar(100) [not null]
  district varchar(100) [not null]
  subdistrict varchar(100)
  postal_code varchar(20) [not null]
  biteship_area_id varchar(100)
  latitude decimal(10,7)
  longitude decimal(10,7)
  full_address text [not null]
  note text
  is_default boolean [not null, default: false]
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  indexes {
    user_id
    biteship_area_id
  }
}


// =========================
// PRODUCT CATALOG
// =========================

Table categories {
  id bigint [pk, increment]
  parent_id bigint
  name varchar(150) [not null]
  slug varchar(180) [not null, unique]
  description text
  image_url varchar(255)
  sort_order int [not null, default: 0]
  is_active boolean [not null, default: true]
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  indexes {
    parent_id
    slug
    is_active
  }
}

Table collections {
  id bigint [pk, increment]
  name varchar(150) [not null]
  slug varchar(180) [not null, unique]
  description text
  banner_desktop_url varchar(255)
  banner_mobile_url varchar(255)
  sort_order int [not null, default: 0]
  is_featured boolean [not null, default: false]
  is_active boolean [not null, default: true]
  starts_at timestamp
  ends_at timestamp
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  indexes {
    slug
    is_featured
    is_active
    starts_at
    ends_at
  }
}

Table products {
  id bigint [pk, increment]
  category_id bigint

  name varchar(200) [not null]
  slug varchar(220) [not null, unique]

  sku varchar(100) [unique, note: 'SKU induk / kode produk utama']
  brand_name varchar(150) [not null, default: 'Axegear']
  product_line varchar(150) [note: 'Contoh: Hydropack, Tank Bag, Running Belt, Helmet Bag']
  style_name varchar(180) [note: 'Contoh: Black 8L, Navy Blue, With Bladder']

  regular_price decimal(15,2) [not null]
  sale_price decimal(15,2)

  short_description text
  description longtext [note: 'Konten rich text dari Tiptap.js. Berisi deskripsi, fitur, spesifikasi, best for, isi paket, dll']

  stock_status varchar(50) [not null, default: 'in_stock', note: 'in_stock, out_of_stock, preorder']
  status varchar(30) [not null, default: 'draft', note: 'draft, active, inactive, archived']

  weight int [not null, default: 0, note: 'gram']
  length int [note: 'cm']
  width int [note: 'cm']
  height int [note: 'cm']

  is_featured boolean [not null, default: false]
  is_new_arrival boolean [not null, default: false]
  is_best_seller boolean [not null, default: false]

  meta_title varchar(255)
  meta_description text

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  indexes {
    category_id
    sku
    brand_name
    product_line
    stock_status
    status
    is_featured
    is_new_arrival
    is_best_seller
  }
}

Table product_collections {
  id bigint [pk, increment]
  product_id bigint [not null]
  collection_id bigint [not null]
  sort_order int [not null, default: 0]
  created_at timestamp
  updated_at timestamp

  indexes {
    (product_id, collection_id) [unique]
    product_id
    collection_id
  }
}

Table product_images {
  id bigint [pk, increment]
  product_id bigint [not null]
  image_url varchar(255) [not null]
  alt_text varchar(255)
  sort_order int [not null, default: 0]
  is_primary boolean [not null, default: false]
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  indexes {
    product_id
    is_primary
  }
}

Table product_variants {
  id bigint [pk, increment]
  product_id bigint [not null]

  sku varchar(100) [not null, unique, note: 'SKU varian, wajib cocok / termapping dengan SKU Desty']
  barcode varchar(100)

  variant_name varchar(180) [not null, default: 'Default Title']
  color_name varchar(100)
  color_hex varchar(20)
  size varchar(100)
  package_type varchar(150) [note: 'Contoh: With Bladder, Tanpa Bladder, Bundle']

  regular_price decimal(15,2)
  sale_price decimal(15,2)

  stock int [not null, default: 0, note: 'Cache stok website dari Desty']
  reserved_stock int [not null, default: 0, note: 'Stok yang sedang di-reserve saat checkout website']
  desty_available_stock int [not null, default: 0]
  desty_on_hand_stock int [not null, default: 0]
  desty_reserved_stock int [not null, default: 0]
  desty_last_synced_at timestamp

  stock_source varchar(50) [not null, default: 'desty', note: 'desty, manual, migration']
  allow_manual_stock_edit boolean [not null, default: false]

  weight int
  length int
  width int
  height int

  image_url varchar(255)
  is_active boolean [not null, default: true]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  indexes {
    product_id
    sku
    color_name
    size
    package_type
    is_active
    stock_source
  }
}

Table product_marketplace_links {
  id bigint [pk, increment]
  product_id bigint [not null]
  marketplace_name varchar(100) [not null, note: 'shopee, tokopedia, tiktok_shop, lazada']
  external_product_id varchar(150)
  external_sku varchar(150)
  product_url varchar(255) [not null]
  price_snapshot decimal(15,2)
  stock_snapshot int
  last_synced_at timestamp
  is_active boolean [not null, default: true]
  created_at timestamp
  updated_at timestamp

  indexes {
    product_id
    marketplace_name
    (product_id, marketplace_name) [unique]
  }
}


// =========================
// DESTY OMNI INTEGRATION
// =========================

Table desty_connections {
  id bigint [pk, increment]
  name varchar(150) [not null]
  vendor_id varchar(150)
  api_key_encrypted text
  access_token_encrypted text
  refresh_token_encrypted text
  base_url varchar(255)
  sync_mode varchar(50) [not null, default: 'desty_master', note: 'desty_master, website_master, two_way']
  is_active boolean [not null, default: true]
  last_connected_at timestamp
  last_sync_at timestamp
  created_at timestamp
  updated_at timestamp

  indexes {
    is_active
  }
}

Table desty_warehouses {
  id bigint [pk, increment]
  desty_connection_id bigint [not null]
  desty_warehouse_id varchar(150) [not null]
  name varchar(150) [not null]
  code varchar(100)
  address text
  is_default boolean [not null, default: false]
  is_active boolean [not null, default: true]
  last_synced_at timestamp
  created_at timestamp
  updated_at timestamp

  indexes {
    (desty_connection_id, desty_warehouse_id) [unique]
    is_default
    is_active
  }
}

Table desty_product_mappings {
  id bigint [pk, increment]
  product_id bigint [not null]
  desty_connection_id bigint [not null]
  desty_product_id varchar(150) [not null]
  desty_product_code varchar(150)
  desty_product_name varchar(255)
  sync_status varchar(50) [not null, default: 'mapped', note: 'mapped, unmapped, conflict, inactive']
  last_synced_at timestamp
  created_at timestamp
  updated_at timestamp

  indexes {
    product_id
    desty_product_id
    sync_status
    (product_id, desty_connection_id) [unique]
  }
}

Table desty_variant_mappings {
  id bigint [pk, increment]
  product_variant_id bigint [not null]
  desty_product_mapping_id bigint [not null]
  desty_variant_id varchar(150)
  desty_sku varchar(150) [not null]
  desty_barcode varchar(150)
  desty_warehouse_id varchar(150)
  sync_status varchar(50) [not null, default: 'mapped', note: 'mapped, unmapped, conflict, inactive']
  last_stock_synced_at timestamp
  created_at timestamp
  updated_at timestamp

  indexes {
    product_variant_id
    desty_sku
    sync_status
    (product_variant_id, desty_product_mapping_id) [unique]
  }
}

Table desty_order_mappings {
  id bigint [pk, increment]
  order_id bigint [not null]
  desty_connection_id bigint [not null]
  desty_order_id varchar(150)
  desty_order_number varchar(150)
  desty_order_status varchar(100)
  sync_status varchar(50) [not null, default: 'pending', note: 'pending, synced, failed, cancelled']
  last_synced_at timestamp
  raw_payload json
  created_at timestamp
  updated_at timestamp

  indexes {
    order_id
    desty_order_id
    sync_status
    (order_id, desty_connection_id) [unique]
  }
}

Table desty_sync_jobs {
  id bigint [pk, increment]
  desty_connection_id bigint [not null]
  job_type varchar(100) [not null, note: 'pull_products, pull_stock, push_order, push_stock_adjustment, sync_order_status']
  direction varchar(30) [not null, note: 'pull, push']
  status varchar(50) [not null, default: 'pending', note: 'pending, processing, success, failed, retrying']
  reference_type varchar(100)
  reference_id bigint
  attempt_count int [not null, default: 0]
  max_attempts int [not null, default: 3]
  request_payload json
  response_payload json
  error_message text
  started_at timestamp
  finished_at timestamp
  created_at timestamp
  updated_at timestamp

  indexes {
    desty_connection_id
    job_type
    status
    reference_type
    reference_id
  }
}

Table desty_webhook_logs {
  id bigint [pk, increment]
  desty_connection_id bigint
  event_type varchar(150)
  event_id varchar(150)
  payload_hash varchar(64) [unique]
  payload json [not null]
  processed_status varchar(50) [not null, default: 'pending', note: 'pending, processed, failed, ignored']
  processed_at timestamp
  error_message text
  created_at timestamp
  updated_at timestamp

  indexes {
    desty_connection_id
    event_type
    event_id
    processed_status
  }
}


// =========================
// STOCK & RESERVATION
// =========================

Table stock_logs {
  id bigint [pk, increment]
  product_variant_id bigint [not null]
  user_id bigint

  source varchar(50) [not null, default: 'website', note: 'website, desty, shopee, tokopedia, manual, system']
  desty_sync_job_id bigint
  desty_event_id varchar(150)

  type varchar(50) [not null, note: 'in, out, reserved, released, adjustment, returned, sync']
  quantity int [not null]
  stock_before int [not null]
  stock_after int [not null]

  reference_type varchar(100)
  reference_id bigint
  note text
  raw_payload json

  created_at timestamp
  updated_at timestamp

  indexes {
    product_variant_id
    user_id
    source
    type
    reference_type
    reference_id
  }
}

Table inventory_reservations {
  id bigint [pk, increment]
  order_id bigint [not null]
  order_item_id bigint
  product_variant_id bigint [not null]
  quantity int [not null]
  status varchar(50) [not null, default: 'reserved', note: 'reserved, released, finalized, expired']
  reserved_at timestamp [not null]
  released_at timestamp
  finalized_at timestamp
  expired_at timestamp
  created_at timestamp
  updated_at timestamp

  indexes {
    order_id
    order_item_id
    product_variant_id
    status
  }
}


// =========================
// CART
// =========================

Table carts {
  id bigint [pk, increment]
  user_id bigint [not null, unique]
  created_at timestamp
  updated_at timestamp
}

Table cart_items {
  id bigint [pk, increment]
  cart_id bigint [not null]
  product_id bigint [not null]
  product_variant_id bigint [not null]
  quantity int [not null, default: 1]
  price_snapshot decimal(15,2) [not null]
  variant_name_snapshot varchar(180)
  created_at timestamp
  updated_at timestamp

  indexes {
    cart_id
    product_id
    product_variant_id
    (cart_id, product_variant_id) [unique]
  }
}


// =========================
// VOUCHERS
// =========================

Table vouchers {
  id bigint [pk, increment]
  code varchar(50) [not null, unique]
  name varchar(150) [not null]
  description text
  discount_type varchar(30) [not null, note: 'percentage, fixed']
  discount_value decimal(15,2) [not null]
  max_discount decimal(15,2)
  min_order_amount decimal(15,2)
  usage_limit int
  used_count int [not null, default: 0]
  starts_at timestamp
  ends_at timestamp
  is_active boolean [not null, default: true]
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  indexes {
    code
    is_active
    starts_at
    ends_at
  }
}

Table voucher_products {
  id bigint [pk, increment]
  voucher_id bigint [not null]
  product_id bigint [not null]
  created_at timestamp
  updated_at timestamp

  indexes {
    (voucher_id, product_id) [unique]
  }
}

Table voucher_categories {
  id bigint [pk, increment]
  voucher_id bigint [not null]
  category_id bigint [not null]
  created_at timestamp
  updated_at timestamp

  indexes {
    (voucher_id, category_id) [unique]
  }
}


// =========================
// ORDERS
// =========================

Table orders {
  id bigint [pk, increment]
  user_id bigint [not null]
  customer_address_id bigint
  order_number varchar(100) [not null, unique]
  checkout_idempotency_key varchar(100)

  customer_name varchar(150) [not null]
  customer_email varchar(191) [not null]
  customer_phone varchar(30) [not null]

  subtotal decimal(15,2) [not null, default: 0]
  discount_amount decimal(15,2) [not null, default: 0]
  shipping_cost decimal(15,2) [not null, default: 0]
  insurance_cost decimal(15,2) [not null, default: 0]
  service_fee decimal(15,2) [not null, default: 0]
  grand_total decimal(15,2) [not null, default: 0]

  voucher_id bigint
  voucher_code varchar(50)

  payment_status varchar(50) [not null, default: 'pending', note: 'pending, paid, failed, expired, refunded']
  order_status varchar(50) [not null, default: 'pending_payment', note: 'pending_payment, paid, paid_pending_desty_sync, processing, shipped, completed, cancelled, sync_failed']
  shipping_status varchar(50) [not null, default: 'not_created', note: 'not_created, created, picked_up, in_transit, delivered, failed, returned']

  source_channel varchar(50) [not null, default: 'website', note: 'website, shopee, tokopedia, manual']
  desty_sync_status varchar(50) [not null, default: 'not_synced', note: 'not_synced, pending, synced, failed, ignored']
  desty_synced_at timestamp

  no_return_refund_agreed boolean [not null, default: false]
  no_return_refund_agreed_at timestamp

  notes text
  paid_at timestamp
  cancelled_at timestamp
  expired_at timestamp
  completed_at timestamp

  stock_reserved_at timestamp
  stock_released_at timestamp
  stock_finalized_at timestamp
  voucher_released_at timestamp

  created_at timestamp
  updated_at timestamp

  indexes {
    (user_id, checkout_idempotency_key) [unique]
    order_number
    payment_status
    order_status
    shipping_status
    source_channel
    desty_sync_status
  }
}

Table order_items {
  id bigint [pk, increment]
  order_id bigint [not null]
  product_id bigint
  product_variant_id bigint

  product_name varchar(200) [not null]
  product_sku varchar(100)
  variant_sku varchar(100)
  variant_name varchar(180)
  color_name varchar(100)
  size varchar(100)
  package_type varchar(150)

  price decimal(15,2) [not null]
  quantity int [not null]
  subtotal decimal(15,2) [not null]

  weight int [not null, default: 0]
  length int
  width int
  height int

  product_image_url varchar(255)

  created_at timestamp
  updated_at timestamp

  indexes {
    order_id
    product_id
    product_variant_id
    variant_sku
  }
}

Table order_addresses {
  id bigint [pk, increment]
  order_id bigint [not null, unique]
  recipient_name varchar(150) [not null]
  recipient_phone varchar(30) [not null]
  province varchar(100) [not null]
  city varchar(100) [not null]
  district varchar(100) [not null]
  subdistrict varchar(100)
  postal_code varchar(20) [not null]
  biteship_area_id varchar(100)
  latitude decimal(10,7)
  longitude decimal(10,7)
  full_address text [not null]
  note text
  created_at timestamp
  updated_at timestamp
}


// =========================
// PAYMENTS
// =========================

Table payments {
  id bigint [pk, increment]
  order_id bigint [not null, unique]
  payment_provider varchar(50) [not null, default: 'midtrans']
  payment_method varchar(100)

  midtrans_order_id varchar(100) [unique]
  midtrans_transaction_id varchar(150)
  midtrans_snap_token varchar(255)
  midtrans_redirect_url varchar(255)

  transaction_status varchar(50)
  fraud_status varchar(50)
  gross_amount decimal(15,2) [not null]
  currency varchar(10) [not null, default: 'IDR']

  paid_at timestamp
  expired_at timestamp
  expires_at timestamp
  last_synced_at timestamp
  failure_reason text
  raw_response json

  created_at timestamp
  updated_at timestamp

  indexes {
    midtrans_order_id
    midtrans_transaction_id
    expires_at
    last_synced_at
  }
}

Table payment_logs {
  id bigint [pk, increment]
  payment_id bigint
  order_id bigint
  provider varchar(50) [not null, default: 'midtrans']
  event_type varchar(100)
  transaction_status varchar(50)
  payload_hash varchar(64) [unique]
  payload json [not null]
  processed_at timestamp
  created_at timestamp
  updated_at timestamp

  indexes {
    payment_id
    order_id
    event_type
    transaction_status
  }
}


// =========================
// SHIPMENTS
// =========================

Table shipments {
  id bigint [pk, increment]
  order_id bigint [not null, unique]

  shipping_provider varchar(50) [not null, default: 'biteship']
  biteship_order_id varchar(150) [unique]
  biteship_tracking_id varchar(150)
  waybill_id varchar(150)
  label_url varchar(255)

  courier_company varchar(100) [not null]
  courier_type varchar(100) [not null]
  courier_service_name varchar(150)
  delivery_type varchar(50) [not null, default: 'now']

  shipping_cost decimal(15,2) [not null, default: 0]
  insurance_cost decimal(15,2) [not null, default: 0]
  estimated_delivery varchar(100)

  shipping_status varchar(50) [not null, default: 'not_created']
  shipped_at timestamp
  delivered_at timestamp
  cancelled_at timestamp
  creating_at timestamp
  last_synced_at timestamp
  failed_reason text

  raw_rate_response json
  raw_order_response json

  created_at timestamp
  updated_at timestamp

  indexes {
    biteship_tracking_id
    waybill_id
    shipping_status
  }
}

Table shipment_trackings {
  id bigint [pk, increment]
  shipment_id bigint [not null]
  status varchar(100) [not null]
  description text
  location varchar(255)
  happened_at timestamp
  provider_happened_at timestamp
  payload_hash varchar(64) [unique]
  raw_payload json
  created_at timestamp
  updated_at timestamp

  indexes {
    shipment_id
    status
    happened_at
  }
}

Table biteship_webhook_logs {
  id bigint [pk, increment]
  event_type varchar(100)
  biteship_order_id varchar(150)
  biteship_tracking_id varchar(150)
  waybill_id varchar(150)
  payload_hash varchar(64) [unique]
  payload json [not null]
  processed_at timestamp
  created_at timestamp
  updated_at timestamp

  indexes {
    event_type
    biteship_order_id
    biteship_tracking_id
    waybill_id
  }
}


// =========================
// REVIEWS
// =========================

Table product_reviews {
  id bigint [pk, increment]
  user_id bigint [not null]
  order_item_id bigint
  product_id bigint [not null]
  rating int [not null, note: '1 sampai 5']
  title varchar(150)
  comment text
  is_visible boolean [not null, default: true]
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp

  indexes {
    product_id
    user_id
    order_item_id
    is_visible
  }
}


// =========================
// WISHLIST & NOTIFICATIONS
// =========================

Table wishlists {
  id bigint [pk, increment]
  user_id bigint [not null]
  product_id bigint [not null]
  created_at timestamp
  updated_at timestamp

  indexes {
    (user_id, product_id) [unique]
  }
}

Table notifications {
  id bigint [pk, increment]
  user_id bigint [not null]
  title varchar(180) [not null]
  message text [not null]
  type varchar(50) [not null]
  reference_type varchar(100)
  reference_id bigint
  is_read boolean [not null, default: false]
  read_at timestamp
  created_at timestamp
  updated_at timestamp

  indexes {
    user_id
    type
    is_read
  }
}


// =========================
// CMS
// =========================

Table banners {
  id bigint [pk, increment]
  title varchar(180) [not null]
  subtitle varchar(255)
  image_desktop_url varchar(255) [not null]
  image_mobile_url varchar(255)
  button_text varchar(100)
  button_url varchar(255)
  placement varchar(100) [not null, default: 'homepage']
  sort_order int [not null, default: 0]
  is_active boolean [not null, default: true]
  starts_at timestamp
  ends_at timestamp
  created_at timestamp
  updated_at timestamp

  indexes {
    placement
    is_active
    sort_order
  }
}

Table pages {
  id bigint [pk, increment]
  title varchar(180) [not null]
  slug varchar(180) [not null, unique]
  content longtext [not null]
  type varchar(100) [not null, note: 'about, terms, privacy, shipping, return_policy']
  meta_title varchar(255)
  meta_description text
  is_active boolean [not null, default: true]
  created_at timestamp
  updated_at timestamp

  indexes {
    slug
    type
    is_active
  }
}

Table site_settings {
  id bigint [pk, increment]
  key varchar(150) [not null, unique]
  value text
  type varchar(50) [not null, default: 'string']
  created_at timestamp
  updated_at timestamp
}


// =========================
// ADMIN LOGS
// =========================

Table admin_activity_logs {
  id bigint [pk, increment]
  user_id bigint [not null]
  action varchar(150) [not null]
  module varchar(100) [not null]
  reference_type varchar(100)
  reference_id bigint
  old_values json
  new_values json
  ip_address varchar(45)
  user_agent text
  created_at timestamp

  indexes {
    user_id
    action
    module
    reference_type
    reference_id
  }
}


// =========================
// RELATIONSHIPS
// =========================

Ref: customer_addresses.user_id > users.id [delete: cascade]

Ref: categories.parent_id > categories.id [delete: set null]

Ref: products.category_id > categories.id [delete: set null]

Ref: product_collections.product_id > products.id [delete: cascade]
Ref: product_collections.collection_id > collections.id [delete: cascade]

Ref: product_images.product_id > products.id [delete: cascade]

Ref: product_variants.product_id > products.id [delete: cascade]

Ref: product_marketplace_links.product_id > products.id [delete: cascade]

Ref: desty_warehouses.desty_connection_id > desty_connections.id [delete: cascade]

Ref: desty_product_mappings.product_id > products.id [delete: cascade]
Ref: desty_product_mappings.desty_connection_id > desty_connections.id [delete: cascade]

Ref: desty_variant_mappings.product_variant_id > product_variants.id [delete: cascade]
Ref: desty_variant_mappings.desty_product_mapping_id > desty_product_mappings.id [delete: cascade]

Ref: desty_order_mappings.order_id > orders.id [delete: cascade]
Ref: desty_order_mappings.desty_connection_id > desty_connections.id [delete: cascade]

Ref: desty_sync_jobs.desty_connection_id > desty_connections.id [delete: cascade]

Ref: desty_webhook_logs.desty_connection_id > desty_connections.id [delete: set null]

Ref: stock_logs.product_variant_id > product_variants.id [delete: cascade]
Ref: stock_logs.user_id > users.id [delete: set null]
Ref: stock_logs.desty_sync_job_id > desty_sync_jobs.id [delete: set null]

Ref: inventory_reservations.order_id > orders.id [delete: cascade]
Ref: inventory_reservations.order_item_id > order_items.id [delete: set null]
Ref: inventory_reservations.product_variant_id > product_variants.id [delete: cascade]

Ref: carts.user_id > users.id [delete: cascade]

Ref: cart_items.cart_id > carts.id [delete: cascade]
Ref: cart_items.product_id > products.id [delete: cascade]
Ref: cart_items.product_variant_id > product_variants.id [delete: cascade]

Ref: voucher_products.voucher_id > vouchers.id [delete: cascade]
Ref: voucher_products.product_id > products.id [delete: cascade]

Ref: voucher_categories.voucher_id > vouchers.id [delete: cascade]
Ref: voucher_categories.category_id > categories.id [delete: cascade]

Ref: orders.user_id > users.id [delete: restrict]
Ref: orders.customer_address_id > customer_addresses.id [delete: set null]
Ref: orders.voucher_id > vouchers.id [delete: set null]

Ref: order_items.order_id > orders.id [delete: cascade]
Ref: order_items.product_id > products.id [delete: set null]
Ref: order_items.product_variant_id > product_variants.id [delete: set null]

Ref: order_addresses.order_id > orders.id [delete: cascade]

Ref: payments.order_id > orders.id [delete: cascade]

Ref: payment_logs.payment_id > payments.id [delete: set null]
Ref: payment_logs.order_id > orders.id [delete: set null]

Ref: shipments.order_id > orders.id [delete: cascade]

Ref: shipment_trackings.shipment_id > shipments.id [delete: cascade]

Ref: product_reviews.user_id > users.id [delete: cascade]
Ref: product_reviews.order_item_id > order_items.id [delete: set null]
Ref: product_reviews.product_id > products.id [delete: cascade]

Ref: wishlists.user_id > users.id [delete: cascade]
Ref: wishlists.product_id > products.id [delete: cascade]

Ref: notifications.user_id > users.id [delete: cascade]

Ref: admin_activity_logs.user_id > users.id [delete: cascade]