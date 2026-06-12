# Customer Page Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix six customer-facing issues: product wishlist infinite scroll, notification click behavior, order empty state icon, profile frontend validation, automatic postal-code address lookup, and archived product filtering in wishlist.

**Architecture:** Keep changes close to existing Laravel + Inertia React patterns. Use backend filtering for source-of-truth data integrity, local frontend state for UI responsiveness, and Wayfinder-generated routes for frontend calls after route changes. Avoid schema changes.

**Tech Stack:** Laravel, Inertia.js v3 React, TypeScript, Wayfinder, Tailwind CSS, Pest PHP, Vite.

---

## File Map

- Modify `resources/js/pages/customer/products/list-product.tsx`: make wishlist toggle JSON-based/local-state so `products` infinite-scroll prop is not replaced by redirect response.
- Modify `app/Http/Controllers/Customer/WishlistController.php`: return JSON/no-content for JSON wishlist requests while preserving redirect behavior for normal Inertia form requests.
- Modify `app/Services/Customer/WishlistService.php`: exclude non-published products from wishlist data.
- Modify `resources/js/pages/customer/wishlist/my-wishlist.tsx`: defensive filter hidden/unavailable wishlist products.
- Modify `resources/js/pages/customer/notification/list-notification.tsx`: clicking notification marks unread as read and stays on list page.
- Modify `app/Http/Controllers/Customer/NotificationController.php`: remove detail endpoint method.
- Modify `app/Services/Notifications/NotificationService.php`: remove detail-only data mapping methods if no longer referenced.
- Modify `routes/web.php`: remove `GET /notifications/{notification}` route; keep read endpoints.
- Delete `resources/js/pages/customer/notification/detail-notification.tsx`: detail page no longer needed.
- Regenerate Wayfinder output under `resources/js/actions/**` and `resources/js/routes/**` after route removal.
- Modify `resources/js/pages/customer/order/my-order.tsx`: replace empty state image with cart icon.
- Modify `resources/js/pages/customer/profile/my-profile.tsx`: add local required validation for name and password fields.
- Modify `resources/js/pages/customer/manage-address/manage-address.tsx`: auto-search and auto-fill address from postal code without search button click.
- Add or modify Pest tests under `tests/Feature/Customer`.

---

## Task 1: Wishlist Toggle Must Not Break Infinite Scroll

**Files:**
- Modify: `resources/js/pages/customer/products/list-product.tsx`
- Modify: `app/Http/Controllers/Customer/WishlistController.php`
- Add: `tests/Feature/Customer/WishlistTest.php` if no wishlist test exists

- [ ] **Step 1: Add failing Pest coverage for JSON wishlist toggle**

Create `tests/Feature/Customer/WishlistTest.php` with this baseline:

```php
<?php

use App\Models\Product;
use App\Models\User;
use App\Models\Wishlist;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('adds a wishlist product through json without redirecting the product list', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create(['status' => 'published']);

    $this->actingAs($user)
        ->postJson(route('wishlist.store', $product))
        ->assertSuccessful();

    $this->assertDatabaseHas('wishlists', [
        'user_id' => $user->id,
        'product_id' => $product->id,
    ]);
});

it('removes a wishlist product through json without redirecting the product list', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create(['status' => 'published']);
    Wishlist::query()->create([
        'user_id' => $user->id,
        'product_id' => $product->id,
    ]);

    $this->actingAs($user)
        ->deleteJson(route('wishlist.products.destroy', $product))
        ->assertSuccessful();

    $this->assertDatabaseMissing('wishlists', [
        'user_id' => $user->id,
        'product_id' => $product->id,
    ]);
});
```

- [ ] **Step 2: Run test and confirm failure**

Run:

```bash
php artisan test --compact tests/Feature/Customer/WishlistTest.php
```

Expected before implementation: JSON requests redirect or do not return the desired successful JSON/no-content response.

- [ ] **Step 3: Update `WishlistController` response format**

In `store()` and `destroyProduct()`, keep current redirect for browser/Inertia requests, but add:

```php
if ($request->wantsJson()) {
    return response()->noContent();
}
```

Place it after service mutation and before `redirect()->back()`.

- [ ] **Step 4: Update product list wishlist toggle**

In `ProductTile.toggleWishlist`, replace Inertia `router.post` / `router.delete` redirect visits with `fetch()` requests:

```ts
const toggleWishlist = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isWishlistProcessing) {
        return;
    }

    setIsWishlistProcessing(true);
    const previous = isWishlisted;
    setIsWishlisted(!previous);

    try {
        const response = await fetch(
            previous
                ? removeWishlistProduct.url(product.id)
                : addWishlistItem.url(product.id),
            {
                method: previous ? 'DELETE' : 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
                            ?.content ?? '',
                },
            },
        );

        if (!response.ok) {
            setIsWishlisted(previous);
        }
    } catch {
        setIsWishlisted(previous);
    } finally {
        setIsWishlistProcessing(false);
    }
};
```

Remove unused `router` import from this file if it is no longer used.

- [ ] **Step 5: Verify**

Run:

```bash
php artisan test --compact tests/Feature/Customer/WishlistTest.php
npm run types:check
```

Expected: tests pass and TypeScript has no errors.

---

## Task 2: Wishlist Page Must Hide Archived Products

**Files:**
- Modify: `app/Services/Customer/WishlistService.php`
- Modify: `resources/js/pages/customer/wishlist/my-wishlist.tsx`
- Test: `tests/Feature/Customer/WishlistTest.php`

- [ ] **Step 1: Add failing test for archived products**

Append to `tests/Feature/Customer/WishlistTest.php`:

```php
it('does not show archived products on the customer wishlist page', function () {
    $user = User::factory()->create();
    $published = Product::factory()->create([
        'name' => 'Published Product',
        'status' => 'published',
    ]);
    $archived = Product::factory()->create([
        'name' => 'Archived Product',
        'status' => 'archived',
    ]);

    Wishlist::query()->create(['user_id' => $user->id, 'product_id' => $published->id]);
    Wishlist::query()->create(['user_id' => $user->id, 'product_id' => $archived->id]);

    $this->actingAs($user)
        ->get(route('my-wishlist'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('customer/wishlist/my-wishlist')
            ->has('wishlistItems', 1)
            ->where('wishlistItems.0.title', 'Published Product')
            ->where('summary.item_count', 1));
});
```

- [ ] **Step 2: Run test and confirm failure**

Run:

```bash
php artisan test --compact tests/Feature/Customer/WishlistTest.php --filter=archived
```

Expected before implementation: archived product is still counted or returned.

- [ ] **Step 3: Filter in backend**

In `WishlistService::wishlistPageData`, add a product status condition to the query:

```php
->whereHas('product', fn ($query) => $query->where('status', 'published'))
```

Keep `wishlistCard()` null guard.

- [ ] **Step 4: Add defensive frontend filter**

In `MyWishlist`, derive visible list:

```ts
const visibleWishlistItems = wishlistItems.filter((item) => item.is_available);
```

Use `visibleWishlistItems.length`, `visibleWishlistItems.map(...)`, and display count from `visibleWishlistItems.length` or `summary.item_count` after backend fix. Prefer `summary.item_count` for header if backend is trusted.

- [ ] **Step 5: Verify**

Run:

```bash
php artisan test --compact tests/Feature/Customer/WishlistTest.php
npm run types:check
```

Expected: archived product absent from props and UI-safe filter compiles.

---

## Task 3: Notification Click Only Marks As Read

**Files:**
- Modify: `resources/js/pages/customer/notification/list-notification.tsx`
- Modify: `app/Http/Controllers/Customer/NotificationController.php`
- Modify: `app/Services/Notifications/NotificationService.php`
- Modify: `routes/web.php`
- Delete: `resources/js/pages/customer/notification/detail-notification.tsx`
- Regenerate: Wayfinder route/action files
- Add: `tests/Feature/Customer/NotificationTest.php`

- [ ] **Step 1: Add failing notification route tests**

Create `tests/Feature/Customer/NotificationTest.php`:

```php
<?php

use App\Models\Notification;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('marks a customer notification as read', function () {
    $user = User::factory()->create();
    $notification = Notification::query()->create([
        'user_id' => $user->id,
        'title' => 'Order update',
        'message' => 'Order has moved.',
        'type' => 'order',
        'is_read' => false,
    ]);

    $this->actingAs($user)
        ->post(route('notifications.read', $notification))
        ->assertRedirect();

    expect($notification->fresh()->is_read)->toBeTrue();
    expect($notification->fresh()->read_at)->not->toBeNull();
});

it('does not expose notification detail pages', function () {
    $user = User::factory()->create();
    $notification = Notification::query()->create([
        'user_id' => $user->id,
        'title' => 'Order update',
        'message' => 'Order has moved.',
        'type' => 'order',
        'is_read' => false,
    ]);

    $this->actingAs($user)
        ->get('/notifications/'.$notification->id)
        ->assertNotFound();
});
```

- [ ] **Step 2: Run test and confirm detail route still exists**

Run:

```bash
php artisan test --compact tests/Feature/Customer/NotificationTest.php
```

Expected before implementation: second test fails because detail route returns OK.

- [ ] **Step 3: Remove detail route and backend method**

In `routes/web.php`, delete:

```php
Route::get('/notifications/{notification}', [CustomerNotificationController::class, 'show'])->name('notifications.show');
```

In `NotificationController`, delete method:

```php
public function show(Request $request, Notification $notification, NotificationService $notifications): Response
```

Remove unused `Inertia\Response` import only if no longer used by other methods.

- [ ] **Step 4: Remove unused detail service code**

In `NotificationService`, remove `detailData()` and private methods used only by detail data:

- `mapNotificationDetail`
- `referenceOrder`
- `resolveDetailType`
- `typeLabel`
- `mapOrderSummary`
- `mapPaymentDetail`
- `mapShipmentDetail`
- `buildTimeline`
- `orderTimeline`
- `buildActions`
- `labelValue`

Keep `forOrder`, `pageData`, `markAllAsRead`, `markAsRead`, `notifications`, `mapNotification`, and `meta`.

- [ ] **Step 5: Delete detail page**

Delete:

```bash
resources/js/pages/customer/notification/detail-notification.tsx
```

- [ ] **Step 6: Update notification list UI**

In `list-notification.tsx`:

- Remove `Link` import if only used by notification rows; keep it if empty state CTA still uses `Link`.
- Import route helpers:

```ts
import { markAllAsRead, markAsRead } from '@/actions/App/Http/Controllers/Customer/NotificationController';
```

- Replace hardcoded POST URLs:

```ts
router.post(markAllAsRead.url(), {}, { preserveScroll: true, preserveState: true });
router.post(markAsRead.url(id), {}, { preserveScroll: true, preserveState: true });
```

- Replace notification row `<Link href={`/notifications/${notification.id}`}>` with:

```tsx
<button
    key={notification.id}
    type="button"
    onClick={() => markAsRead(notification.id)}
    className={`group relative flex w-full items-start gap-4 p-5 text-left transition-all duration-300 hover:bg-[#ffffff] md:p-6 ${!notification.isRead ? 'bg-[#ffffff]/50' : 'bg-white'}`}
>
```

Close with `</button>`.

- [ ] **Step 7: Regenerate Wayfinder**

Run:

```bash
php artisan wayfinder:generate --with-form --no-interaction
```

Expected: `notifications.show` removed from generated route files.

- [ ] **Step 8: Verify**

Run:

```bash
php artisan test --compact tests/Feature/Customer/NotificationTest.php
npm run types:check
```

Expected: detail route not found, read route works, TypeScript imports resolve.

---

## Task 4: Order Empty State Uses Cart Icon

**Files:**
- Modify: `resources/js/pages/customer/order/my-order.tsx`

- [ ] **Step 1: Replace icon import**

Add `ShoppingCart` to lucide imports and remove `FALLBACK_IMAGE` if no longer used by this file.

```ts
import {
    Check,
    ChevronLeft,
    ChevronRight,
    Package,
    Search,
    ShoppingCart,
    Truck,
} from 'lucide-react';
```

- [ ] **Step 2: Replace empty image block**

Replace current empty-state image wrapper with:

```tsx
<div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-[#e7e2de] bg-white text-[#B98B63] shadow-sm">
    <div className="absolute inset-0 rounded-full bg-[#E8D6C1] opacity-60 blur-xl" />
    <ShoppingCart size={38} strokeWidth={1.7} className="relative z-10" />
</div>
```

- [ ] **Step 3: Verify**

Run:

```bash
npm run types:check
```

Expected: no unused `FALLBACK_IMAGE` and no TypeScript errors.

---

## Task 5: Profile Frontend Required Validation

**Files:**
- Modify: `resources/js/pages/customer/profile/my-profile.tsx`

- [ ] **Step 1: Add local error state types**

Near form setup, add:

```ts
const [profileClientErrors, setProfileClientErrors] = useState<{ name?: string }>({});
const [passwordClientErrors, setPasswordClientErrors] = useState<{
    current_password?: string;
    password?: string;
    password_confirmation?: string;
}>({});
```

- [ ] **Step 2: Validate profile submit**

At top of `submitProfile`, after `e.preventDefault()`:

```ts
const nextErrors: { name?: string } = {};

if (profileForm.data.name.trim() === '') {
    nextErrors.name = 'Nama lengkap wajib diisi.';
}

setProfileClientErrors(nextErrors);

if (Object.keys(nextErrors).length > 0) {
    return;
}
```

- [ ] **Step 3: Validate password submit**

At top of `submitPassword`, after `e.preventDefault()`:

```ts
const nextErrors: {
    current_password?: string;
    password?: string;
    password_confirmation?: string;
} = {};

if (passwordForm.data.current_password.trim() === '') {
    nextErrors.current_password = 'Kata sandi saat ini wajib diisi.';
}

if (passwordForm.data.password.trim() === '') {
    nextErrors.password = 'Kata sandi baru wajib diisi.';
}

if (passwordForm.data.password_confirmation.trim() === '') {
    nextErrors.password_confirmation = 'Konfirmasi kata sandi wajib diisi.';
}

setPasswordClientErrors(nextErrors);

if (Object.keys(nextErrors).length > 0) {
    return;
}
```

- [ ] **Step 4: Clear client errors on change**

For name input `onChange`, set data and clear local error:

```ts
onChange={(e) => {
    profileForm.setData('name', e.target.value);
    setProfileClientErrors((current) => ({ ...current, name: undefined }));
}}
```

For password fields, wrap existing `onChange` callbacks and clear matching key.

- [ ] **Step 5: Display merged errors**

For name:

```ts
const nameError = profileClientErrors.name ?? profileForm.errors.name;
```

Use `nameError` for border condition and message. For `PasswordField`, pass:

```ts
error={passwordClientErrors.current_password ?? passwordForm.errors.current_password}
```

Repeat for `password` and `password_confirmation`.

- [ ] **Step 6: Verify**

Run:

```bash
npm run types:check
```

Expected: no TypeScript errors. Manual browser check: empty name/password form shows local error and does not submit.

---

## Task 6: Manage Address Auto Postal Code Lookup

**Files:**
- Modify: `resources/js/pages/customer/manage-address/manage-address.tsx`

- [ ] **Step 1: Refactor `searchArea` to accept query**

Change:

```ts
const searchArea = async () => {
```

to:

```ts
const searchArea = async (query = areaQuery, autoSelect = false) => {
```

Use `query.trim()` instead of `areaQuery.trim()`.

- [ ] **Step 2: Auto-select clear postal-code match**

After payload success:

```ts
const areas = payload.areas ?? [];
setAreaResults(areas);

if (autoSelect) {
    const normalizedQuery = query.trim();
    const exactPostalMatches = areas.filter(
        (area: BiteshipArea) => area.postal_code === normalizedQuery,
    );

    if (exactPostalMatches.length === 1) {
        chooseArea(exactPostalMatches[0]);
    }
}
```

Remove old direct `setAreaResults(payload.areas ?? [])` line.

- [ ] **Step 3: Add debounce effect**

Add effect near other hooks:

```ts
useEffect(() => {
    const query = areaQuery.trim();

    if (!isModalOpen || query.length < 5) {
        return;
    }

    const timeout = window.setTimeout(() => {
        void searchArea(query, true);
    }, 500);

    return () => window.clearTimeout(timeout);
}, [areaQuery, isModalOpen]);
```

If eslint complains about `searchArea` dependency, wrap `searchArea` and `chooseArea` in `useCallback`, with correct dependencies.

- [ ] **Step 4: Change label and optional button**

Set label to:

```tsx
Kode Pos
```

Set placeholder to:

```tsx
Masukkan kode pos
```

Either remove search button or keep as fallback with:

```tsx
onClick={() => searchArea(areaQuery, true)}
```

- [ ] **Step 5: Verify**

Run:

```bash
npm run types:check
```

Manual browser check: type `40135`, wait debounce, area list appears, and if one exact match exists fields auto-fill without clicking search.

---

## Task 7: Full Verification

**Files:**
- All modified files from tasks above

- [ ] **Step 1: Run focused backend tests**

Run:

```bash
php artisan test --compact tests/Feature/Customer/WishlistTest.php tests/Feature/Customer/NotificationTest.php tests/Feature/Customer/ManageAddressTest.php
```

Expected: all pass.

- [ ] **Step 2: Run frontend checks**

Run:

```bash
npm run types:check
npm run build
```

Expected: TypeScript passes and Vite build completes.

- [ ] **Step 3: Manual acceptance checklist**

Verify in browser:

- Product list infinite scroll still loads next pages after add/remove wishlist.
- Wishlist heart updates immediately without product list shrinking.
- Notification click changes unread item to read and stays on `/notifications`.
- `/notifications/{id}` no longer opens detail page.
- My order empty state uses cart icon.
- My profile blocks empty name and empty password fields before request.
- Address modal auto-fills location data after postal code entry.
- Wishlist page hides archived products.

## Assumptions

- Archived product means `products.status = 'archived'`; only `published` products should show in customer product surfaces.
- Postal-code lookup continues using existing `/biteship/areas` endpoint through `biteshipAreas.url(...)`.
- If postal-code lookup returns multiple exact matches, show selectable results and do not auto-pick.
- Notification detail page has no replacement destination.
