# Midtrans and Biteship recovery

- An uncertain Snap creation keeps the order in `manual_review`, preserves the cart and stock/voucher reservations, and never recreates a Snap token. Inspect the payment failure reason and use the existing admin Sync action. The scheduled Midtrans sync also checks Snap-uncertain records. Provider not-found is not permission to release reservations.
- A confirmed Snap rejection uses the existing failure/release path. A late settlement after reservation release requires inventory review; another order's reservation must not be used. Existing incoming refund statuses remain supported; no refund action is added.
- New checkout totals use whole-IDR half-up rounding. Snap item details include a rounding adjustment only when necessary. Historical fractional payment records match the integer amount originally sent; historical data is not rewritten.
- Customer cancellation verifies Midtrans before any local cancellation. An unused session must be successfully cancelled at Snap first. An uncertain response or concurrent settlement prevents local cancellation.
- Biteship receipts are complete only when `processed_at` is set. Unmatched receipts remain pending. Booking completion immediately replays matching receipts; `shipments:replay-biteship-webhooks` retries matching pending receipts every ten minutes through the existing scheduler. Processing and marking completion are atomic.

## Release gates

Run the integration feature tests, `node tests/checkout-rounding.test.mjs`, scoped Pint/ESLint/Prettier checks, and `npm run types:check`. Use the testing configuration with SQLite in-memory and HTTP fakes; never run migrations or seeders against the active database.

Before production release, verify Snap creation/status/cancellation and Biteship nested booking coordinates in sandbox or an explicitly authorized test environment. Run locking/concurrency checks against a separate MySQL test database. HTTP fakes and SQLite tests do not establish provider compatibility or MySQL row-lock behavior. No automated repair of historical production records is included.
