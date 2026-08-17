# Repository guide

## Stack and boundaries
- Laravel 13 / PHP 8.3 backend; Inertia 3 + React 19 + TypeScript frontend.
- Browser entrypoints: `resources/js/app.tsx` and `resources/css/app.css`; route/page wiring starts in `routes/web.php`, with Inertia pages under `resources/js/pages`.
- `resources/js/actions`, `resources/js/routes`, and `resources/js/wayfinder` are Wayfinder-generated. Change Laravel routes/controllers, then let the Vite Wayfinder plugin regenerate them; do not hand-edit generated files.
- Use generated Wayfinder functions for frontend links/forms that target Laravel routes, not hardcoded URLs.
- Shared Inertia props live in `app/Http/Middleware/HandleInertiaRequests.php`; changes there affect every page.

## Setup and runtime
- Full setup: `composer run setup`. It installs both ecosystems, creates `.env`, generates the key, runs migrations, then builds assets.
- Local stack: `composer run dev`. It starts the Laravel server, queue listener, and Vite together; queued behavior can differ from tests because tests force `QUEUE_CONNECTION=sync`.
- Local defaults use SQLite plus database-backed sessions, cache, and queues. Ensure the configured SQLite database exists and migrations have run.
- Biteship and Midtrans flows need `BITESHIP_API_KEY`, `MIDTRANS_SERVER_KEY`, and `MIDTRANS_CLIENT_KEY`; ordinary tests should fake external HTTP.

## Verification
- Canonical full check: `composer run ci:check`; order is ESLint check, Prettier check, TypeScript, then PHP lint/test.
- PHP suite: `composer test`. This clears config, checks Pint, then runs Pest.
- Focus one Pest file/test: `php artisan test tests/Feature/FooTest.php` or `php artisan test --filter="test name"`.
- Frontend-only checks: `npm run lint:check && npm run format:check && npm run types:check`.
- Apply formatters deliberately: `composer run lint` for PHP; `npm run lint` fixes ESLint findings; `npm run format` rewrites `resources/`.
- Pest uses in-memory SQLite, array cache/session/mail, and synchronous queues. `RefreshDatabase` is imported but not globally enabled in `tests/Pest.php`; opt tests into it when isolation requires it.

## Frontend constraints
- `@/*` resolves to `resources/js/*`.
- ESLint requires top-level type imports and alphabetized import groups. It intentionally ignores generated Wayfinder directories and `resources/js/components/ui/*`.
- Vite excludes `leaflet` and `react-leaflet` from dependency optimization; preserve this unless map behavior is revalidated.
