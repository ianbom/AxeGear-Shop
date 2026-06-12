## Overview

100% is a performance-first sports eyewear e-commerce reference with a **high-contrast black-and-white visual system**, dense product-grid layout, technical filters, and a strong catalog-navigation structure. The design feels utilitarian, bold, and performance-driven rather than soft, playful, or decorative. It is a good visual reference for an Axegear-style sports/outdoor e-commerce website because both brands sell functional gear where product clarity, specification filtering, and fast purchase actions matter more than storytelling-heavy pages.

The base canvas is **pure white** (`{colors.canvas}` — #ffffff), paired with deep black ink (`{colors.ink}` — #111111) for navigation, headings, product names, filters, and footer text. Accent color usage should be restrained. The reference site mostly relies on black/white contrast, uppercase labels, tight product-card hierarchy, and product photography. Promotional or urgency elements can use red (`{colors.sale}` — #e11919) or yellow/gold (`{colors.promo}` — #f5c542`), but these accents must not dominate the page.

The product listing page is structured around:
- a top announcement / campaign bar,
- large global navigation with multi-column category menu,
- breadcrumb,
- filter + sort control area,
- left-side or drawer-based product filtering,
- dense product grid,
- product cards with image-first layout,
- sale price / regular price hierarchy,
- quick add CTA,
- pagination,
- service benefit strip,
- large footer with support links and brand links.

The format of this `design.md` follows the provided reference document structure: `Overview`, `Colors`, `Typography`, `Layout`, `Elevation`, `Components`, `Responsive Behavior`, and `Known Gaps`.

**Key Characteristics:**
- **Monochrome-first identity:** black, white, and gray carry almost the entire UI.
- **Performance retail tone:** visual language is sharp, technical, direct, and product-focused.
- **Dense catalog layout:** product listing prioritizes many products per scroll, not oversized editorial spacing.
- **Filter-heavy discovery:** category, style, sport, color, size, price, availability, lens type, light transmission, and gender filters are prominent in the reference.
- **Uppercase microcopy:** CTAs and utility labels such as `QUICK ADD`, `FILTER`, `SORT`, and campaign messages should use uppercase.
- **Photography-led product cards:** product photos are the main visual weight; product names and prices are secondary but very readable.
- **Low decoration:** avoid gradients, glassmorphism, excessive shadows, neon effects, and large rounded SaaS cards.
- **Sharp but not brutal:** corners can be slightly rounded, but the overall feel should remain clean, grid-based, and structured.
- **E-commerce utility over storytelling:** the catalog, filter, quick add, cart, checkout, and shipping benefits are the visual priority.

---

## Colors

### Brand & Accent

- **Ink Black** (`{colors.ink}` — #111111): Primary text, header icons, navigation, product names, filter labels, button backgrounds, and footer headings.
- **Deep Black** (`{colors.black}` — #000000): Used sparingly for the strongest surfaces such as primary buttons, top bars, or high-emphasis text.
- **Axegear Red** (`{colors.primary}` — #e11919): Main Axegear accent. Use for sale labels, active states, limited offer badges, checkout emphasis, and small brand moments. Do not use it as a full-page dominant color.
- **Primary Active** (`{colors.primary-active}` — #b90f0f): Pressed / active variant for red CTA or selected filter states.
- **Promo Yellow** (`{colors.promo}` — #f5c542): Optional promotional accent for campaign badges, bundle highlights, or limited offer strips. Use sparingly.
- **Success Green** (`{colors.success}` — #16803c): In-stock indicator, successful payment, and completed order states.
- **Warning Orange** (`{colors.warning}` — #f59e0b): Low stock, pending payment, pending sync, or warning messages.
- **Error Red** (`{colors.error}` — #c81e1e): Form errors, failed payment, failed sync, cancelled shipment.

### Surface

- **Canvas** (`{colors.canvas}` — #ffffff): Default page background.
- **Surface Soft** (`{colors.surface-soft}` — #f7f7f7): Product image background, filter drawer background, disabled field fill, cart item row background.
- **Surface Muted** (`{colors.surface-muted}` — #f2f2f2): Slightly stronger gray for section dividers, promo bands, skeleton loaders, and secondary buttons.
- **Surface Dark** (`{colors.surface-dark}` — #111111): Header promo strip, black CTA button, footer emphasis area if needed.
- **Surface Inverse** (`{colors.surface-inverse}` — #000000): Full black campaign section or high-contrast banner.

### Hairlines & Borders

- **Hairline** (`{colors.hairline}` — #e5e5e5): Default 1px border for product cards, filter groups, form fields, tables, cart rows, and footer separators.
- **Hairline Strong** (`{colors.hairline-strong}` — #cfcfcf): Active filter border, focused input outline, selected variant outline.
- **Border Ink** (`{colors.border-ink}` — #111111): Primary outline button, selected swatch, active tab underline, important form focus state.
- **Divider Soft** (`{colors.divider-soft}` — #eeeeee): Long page dividers and low-emphasis section separators.

### Text

- **Ink** (`{colors.ink}` — #111111): Main headings, product titles, nav labels, body text, and filter titles.
- **Body** (`{colors.body}` — #333333): Product descriptions, footer links, form labels, support copy.
- **Muted** (`{colors.muted}` — #707070): Breadcrumbs, product meta, unit price, empty state copy, filter counts.
- **Muted Soft** (`{colors.muted-soft}` — #9a9a9a): Disabled text, placeholder text, unavailable variant text.
- **On Dark** (`{colors.on-dark}` — #ffffff): Text on black or red backgrounds.
- **Sale Text** (`{colors.sale-text}` — #e11919): Discounted price, sale label, campaign highlight.

### Product Status

- **In Stock** (`{colors.status-in-stock}` — #16803c): In-stock label.
- **Out of Stock** (`{colors.status-out}` — #8a8a8a): Out-of-stock label.
- **Low Stock** (`{colors.status-low}` — #f59e0b): Low-stock warning.
- **Preorder** (`{colors.status-preorder}` — #2563eb): Preorder status.

### Scrim

- **Scrim** (`{colors.scrim}` — #000000 at 50% opacity): Modal backdrop, filter drawer overlay, mobile menu overlay, quick-add modal background.

---

## Typography

### Font Family

Use a clean, condensed-friendly sans-serif system that feels bold and technical.

Recommended stack:

```css
font-family: Inter, "Helvetica Neue", Arial, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
```

Optional if the design needs a stronger motorsport / performance feel:

```css
font-family: "Barlow Condensed", Inter, "Helvetica Neue", Arial, sans-serif;
```

Use **Inter** for reliable UI readability. Use **Barlow Condensed** only for campaign headings, collection banners, and hero titles — not for body text.

There is no need for a decorative display font. The visual identity should come from weight, uppercase treatment, grid rhythm, and product photography.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---:|---:|---:|---:|---|
| `{typography.hero-xl}` | 56px | 800 | 1.0 | -1.2px | Homepage or campaign hero headline |
| `{typography.hero-lg}` | 44px | 800 | 1.05 | -0.8px | Collection landing hero |
| `{typography.display-xl}` | 36px | 800 | 1.1 | -0.5px | Page title, collection title |
| `{typography.display-lg}` | 28px | 700 | 1.15 | -0.3px | Product detail title, section heading |
| `{typography.display-md}` | 24px | 700 | 1.2 | -0.2px | Checkout step title, admin page title |
| `{typography.title-lg}` | 20px | 700 | 1.25 | 0 | Product detail sub-section title |
| `{typography.title-md}` | 16px | 700 | 1.25 | 0 | Product card title, filter group title |
| `{typography.title-sm}` | 14px | 700 | 1.25 | 0.3px uppercase | Footer heading, utility nav |
| `{typography.body-lg}` | 18px | 400 | 1.55 | 0 | Long product description |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | Default body text |
| `{typography.body-sm}` | 14px | 400 | 1.45 | 0 | Product meta, footer links, filter options |
| `{typography.caption}` | 13px | 500 | 1.35 | 0 | Breadcrumbs, stock label, form help |
| `{typography.caption-bold}` | 12px | 700 | 1.3 | 0.4px uppercase | `QUICK ADD`, `FILTER`, `SORT`, badges |
| `{typography.price}` | 15px | 700 | 1.35 | 0 | Product price |
| `{typography.price-sale}` | 15px | 800 | 1.35 | 0 | Sale price |
| `{typography.button-md}` | 14px | 800 | 1.2 | 0.6px uppercase | Primary and quick-add buttons |
| `{typography.button-sm}` | 12px | 800 | 1.2 | 0.7px uppercase | Small utility buttons |

### Principles

- Product titles should be compact but readable. Avoid long card descriptions inside product grid.
- Use uppercase for navigation categories, button labels, filters, badges, and campaign labels.
- Use normal sentence case for product names, checkout forms, descriptions, and policy content.
- Keep product page descriptions readable: 16–18px body, 1.5–1.6 line-height.
- Use strong font weight for prices and CTAs.
- Avoid overly playful typography; the tone should feel technical and durable.

### Product Name Rules

Product names should follow this pattern:

```txt
{Product Line} {Model / Product Type} {Style / Color / Package}
```

Examples:
- `AXEGEAR Hydropack Enduro 05 Black`
- `AXEGEAR Tank Bag Trail Enduro Tank 01`
- `AXEGEAR Tali Evakuasi Motor Trail Strap Belakang`
- `AXEGEAR Helmet Bag Moto Sport Enduro Touring`

---

## Layout

### Spacing System

- **Base unit:** 4px.
- **Common tokens:** `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.base}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.2xl}` 48px · `{spacing.section}` 64px · `{spacing.hero}` 96px.
- **Product grid gap:** 16px on mobile, 20px on tablet, 24px on desktop.
- **Filter sidebar width:** 260–320px on desktop.
- **Header height:** 72–88px desktop, 56–64px mobile.
- **Announcement bar height:** 36–44px.
- **Footer padding:** 48px vertical desktop, 32px tablet, 24px mobile.
- **Product detail vertical section spacing:** 40–56px.
- **Checkout content spacing:** 24–32px between steps.

### Grid & Container

- **Max content width:** 1440px for catalog and product listing pages.
- **Default content padding:** 16px mobile, 24px tablet, 32px desktop, 48px wide.
- **Catalog layout desktop:** left filter sidebar + right product grid.
- **Catalog product grid desktop:** 4 columns standard; 5 columns on wide screens if product cards remain readable.
- **Catalog product grid tablet:** 3 columns.
- **Catalog product grid mobile:** 2 columns for product cards; 1 column only for very small screens or checkout-like cards.
- **Product detail desktop:** 2-column layout: product gallery left, purchase panel right.
- **Product detail mobile:** stacked: gallery, title/price, variant selector, CTA, description.

### Page Structure

#### Homepage

Recommended structure:
1. Announcement bar
2. Header / mega navigation
3. Hero campaign banner
4. Featured collection strip
5. Product category tiles
6. Best seller product grid
7. New arrival product grid
8. Brand / performance story section
9. Marketplace trust / shipping benefit strip
10. Footer

#### Collection Page

Recommended structure:
1. Header
2. Breadcrumb
3. Collection title
4. Filter + sort control row
5. Sidebar filters / mobile drawer
6. Product grid
7. Pagination
8. Benefit strip
9. Footer

#### Product Detail Page

Recommended structure:
1. Header
2. Breadcrumb
3. Product gallery
4. Product info panel
5. Variant selector
6. Price + stock + CTA
7. Shipping / return / marketplace shortcut
8. Tiptap description content
9. Related products
10. Footer

### Whitespace Philosophy

The design should feel **dense but controlled**. The collection page should show many products quickly, like a performance gear catalog. Use whitespace to separate sections, not to make each product card overly airy.

Do:
- Keep product card spacing tight.
- Use strong alignment.
- Use clean grid rhythm.
- Keep filters visually organized.
- Give product detail pages more breathing room than listing pages.

Do not:
- Use oversized SaaS-style cards.
- Use soft pastel backgrounds across the whole site.
- Use too much gradient.
- Over-round product cards.
- Make product grid too editorial or magazine-like.

---

## Elevation

The 100%-style reference is mostly flat. Depth should come from product imagery, border lines, and layout contrast rather than shadows.

### Shadow Tokens

- **Flat** (`{shadow.none}`): Default for cards, sections, footer, header backgrounds.
- **Subtle** (`{shadow.subtle}`): `0 1px 2px rgba(0,0,0,0.06)` — used for sticky header, dropdown, filter drawer edge.
- **Dropdown** (`{shadow.dropdown}`): `0 8px 24px rgba(0,0,0,0.12)` — mega menu, account menu, quick-add modal.
- **Modal** (`{shadow.modal}`): `0 24px 60px rgba(0,0,0,0.18)` — cart drawer, product quick add modal, checkout alert modal.

### Elevation Rules

- Product cards should not have heavy shadows.
- Product image area may use a light gray background.
- Hover state can use a thin black border, slight image zoom, or quick-add reveal.
- Header dropdowns and mobile drawers can use stronger shadow because they float over content.
- Checkout cards can use border + subtle shadow, but should remain clean.

---

## Components

### Announcement Bar

**`announcement-bar`** — A narrow full-width strip at the top. Use black background with white text for general announcements, or red background for active sale campaigns.

Recommended style:
- Height: 36–44px
- Font: `{typography.caption-bold}`
- Text transform: uppercase
- Alignment: center
- Optional link: underlined or arrow text
- Example: `FREE SHIPPING FOR ORDERS OVER Rp500.000`
- Example: `BUNDLING HYDROPACK + WATER BLADDER AVAILABLE NOW`

### Header

**`site-header`** — White background, black text/icons, sticky optional. Contains logo, category navigation, search, account, and cart.

Desktop layout:
- Left: logo
- Center: primary navigation
- Right: search icon/input, login/account, cart
- Bottom or hover: mega menu

Mobile layout:
- Left: hamburger
- Center: logo
- Right: search/cart

### Mega Navigation

**`mega-menu`** — Large dropdown menu for categories and collections.

Recommended columns:
- New
- Sport / Activity
- Bags
- Hydropack
- Riding Gear
- Accessories
- Sale / Bundling
- Explore / Brand Story

Use uppercase section headings and compact link rows.

For Axegear:
- `NEW`
- `HYDROPACK`
- `TAS MOTOR`
- `STRAP & AKSESORIS`
- `BUNDLING`
- `SALE`
- `EXPLORE`

### Breadcrumb

**`breadcrumb`** — Small, muted navigation trail above collection or product title.

Style:
- 13px
- Muted gray
- Slash or chevron separator
- Example: `Shop / Hydropack / AXEGEAR Hydropack Enduro 05`

### Filter Sidebar

**`filter-sidebar`** — Desktop left rail for product discovery.

Recommended filter groups:
- Category
- Collection
- Color
- Package
- Availability
- Price
- Activity
- Size / Capacity if needed

Style:
- Width: 280px
- Group title: uppercase 12px / 700
- Option row: 14px body
- Count text: muted
- Checkbox: square 16px, black selected state
- Divider between groups

### Filter Drawer

**`filter-drawer-mobile`** — Mobile version of filter sidebar.

Style:
- Full-height drawer
- Opens from left or bottom
- Header: `FILTER`
- Footer: sticky `CLEAR` and `APPLY` buttons
- Use black primary Apply button
- Use outline Clear button

### Sort Control

**`sort-control`** — Dropdown or select near product count.

Options:
- Featured
- Best Selling
- Price: Low to High
- Price: High to Low
- Newest
- A–Z
- Z–A

Style:
- Compact
- Border-bottom or thin outline
- 14px text
- No oversized select style

### Product Grid

**`product-grid`** — Dense responsive grid for catalog pages.

Desktop:
- 4 columns default
- 24px gap
- 1440px max container

Tablet:
- 3 columns
- 20px gap

Mobile:
- 2 columns
- 12–16px gap

### Product Card

**`product-card`** — Image-first product card.

Structure:
1. Product image
2. Quick add button or hover reveal
3. Product name
4. Price row
5. Promo line / bundle message
6. Optional color swatches

Recommended style:
- No heavy card background; keep surface white.
- Image ratio: 1:1 or 4:5 depending product photography.
- Image background: #f7f7f7.
- Product name: 14–16px, 600–700.
- Price: 14–15px, 700.
- Sale price: red or black bold.
- Regular price: muted + strikethrough.
- CTA: uppercase `QUICK ADD`.

### Product Image

**`product-card-image`** — Product image container.

Rules:
- Use neutral light gray background.
- Image should be centered and fully visible.
- Hover can switch to secondary image.
- Hover can slightly zoom image to 1.03 scale.
- Avoid rounded corners heavier than 4–6px.
- Avoid drop-shadow product cutouts unless used consistently.

### Quick Add

**`quick-add`** — Fast add-to-cart action from product grid.

Style:
- Black background, white text
- Uppercase 12–14px
- Height: 40–44px
- Full-width under image or overlay at bottom of image
- Disabled state: gray background + `OUT OF STOCK`

Behavior:
- If product has one variant: add directly.
- If multiple variants: open quick-add variant drawer/modal.
- If out of stock: show `OUT OF STOCK` button and disable.

### Product Detail Gallery

**`product-gallery`** — Product image viewer.

Desktop:
- Left column gallery
- Large main image
- Thumbnail rail below or left
- Background light gray

Mobile:
- Horizontal swipe gallery
- Dots or thumbnail strip

Rules:
- Product image should remain large and clear.
- Use consistent aspect ratio.
- Allow click-to-zoom.
- Use minimal controls.

### Product Purchase Panel

**`product-purchase-panel`** — Right side information panel on product detail.

Contains:
- Product title
- Price
- Review summary
- Stock status
- Variant selector
- Quantity selector
- Add to cart
- Buy now
- Marketplace buttons
- Shipping estimate
- Return policy shortcut

Style:
- Sticky on desktop
- Flat white background
- No heavy card unless needed
- Clear hierarchy between title, price, and CTA

### Variant Selector

**`variant-selector`** — For color, size, package, or bundle options.

Types:
- Color swatch
- Text pill
- Radio tile
- Dropdown for long option lists

Style:
- Selected: black border 2px
- Unselected: gray border 1px
- Disabled: gray fill, line-through text
- Minimum target: 40px height

### Buttons

**`button-primary`**
- Background: black
- Text: white
- Radius: 4px
- Height: 48px
- Weight: 800
- Uppercase
- Use for: Add to Cart, Checkout, Apply Filter

**`button-primary-red`**
- Background: red
- Text: white
- Use only for sale / urgent CTA if necessary

**`button-secondary`**
- White background
- Black border
- Black text
- Use for: Wishlist, Continue Shopping, Clear Filter

**`button-ghost`**
- Transparent
- Underline on hover
- Use for: View details, Learn more, footer links

**`button-marketplace`**
- White background
- Border
- Optional marketplace color icon
- Use for: Buy on Shopee, Buy on Tokopedia

### Cart Drawer

**`cart-drawer`** — Slide-out cart from right.

Structure:
- Header: `YOUR CART`
- Empty state: clear CTA to continue shopping
- Cart item rows
- Subtotal
- Shipping/tax note
- Checkout button
- Continue shopping link

Style:
- Width: 420–480px desktop
- Full-width mobile
- Sticky footer checkout area
- Black checkout button

### Checkout

**`checkout-layout`** — Multi-step checkout page.

Recommended sections:
1. Customer information
2. Shipping address
3. Shipping method from Biteship
4. Order summary
5. Payment with Midtrans
6. Confirmation / order status

Style:
- Two-column desktop: form left, summary right
- One-column mobile
- Summary card sticky on desktop
- Use thin borders and compact fields

### Forms

**`text-input`**
- Height: 48–52px
- Border: 1px #cfcfcf
- Radius: 4px
- Focus: 2px black border
- Placeholder: muted gray
- Error: red helper text below

**`select-input`**
- Same as text input
- Use clear dropdown arrow
- Avoid browser-default ugly styling

**`checkbox`**
- 16–18px square
- Selected: black fill + white check
- Used for filters and agreement checkbox

### Product Description Content

Because product descriptions will be created using Tiptap.js, the rendered content should be styled consistently.

**`rich-description`**
- Max width: 760–840px
- Body: 16px / 1.6
- H2: 24px / 700
- H3: 18px / 700
- Paragraph margin: 12–16px
- List spacing: 8px between list items
- Table: full width, 1px border, 14–15px text
- Strong labels: bold black
- Avoid random inline colors from editor unless intentionally allowed.

Recommended product description sections:
- Deskripsi Produk
- Fitur Utama
- Spesifikasi
- Cocok Untuk
- Isi Paket
- Catatan Penggunaan
- Garansi / Kebijakan Retur

### Pagination

**`pagination`**
- Simple numeric pagination
- Active page: black background + white text
- Inactive: white + border
- Next/previous arrow
- Avoid infinite scroll for admin-friendly catalog unless needed

### Benefit Strip

**`benefit-strip`** — Service-value row above footer.

Example items:
- Free Shipping
- Easy Returns
- Secure Payment
- Official Product
- Customer Support

Style:
- 4 columns desktop
- 2 columns tablet
- 1 column mobile
- Icon + heading + short text
- Border-top and border-bottom

### Footer

**`footer`** — Large utility footer.

Sections:
- Support
- Shop
- Collections
- Axegear
- Social
- Newsletter

Style:
- White or black background.
- If white: black text, thin top border.
- If black: white text, gray muted links.
- Use uppercase headings.
- Keep link density high like performance retail sites.

### Newsletter

**`newsletter-signup`**
- Title: uppercase or bold
- Email input + submit button
- Black button
- Small privacy note

---

## Responsive Behavior

| Name | Width | Key Changes |
|---|---:|---|
| Mobile | < 640px | Header collapses to hamburger + logo + cart. Product grid becomes 2 columns. Filter becomes full-screen drawer. Product detail stacks vertically. Cart drawer becomes full screen. |
| Tablet | 640–1024px | Product grid becomes 3 columns. Header can keep simplified nav. Filter can use drawer or collapsible sidebar. |
| Desktop | 1024–1440px | Full header, mega menu, filter sidebar, 4-column product grid, sticky product purchase panel. |
| Wide | > 1440px | Container maxes at 1440px. Product grid can become 5 columns only if card readability remains strong. |

### Touch Targets

- Main CTA: minimum 48px height.
- Filter checkbox row: minimum 40px height.
- Variant option: minimum 40px height.
- Product card quick add: minimum 40px height.
- Cart icon / account icon: minimum 40×40px.
- Mobile menu items: minimum 44px height.

### Collapsing Strategy

- Desktop mega menu collapses into a mobile drawer.
- Filter sidebar collapses into a filter drawer below 1024px.
- Sort remains as a compact dropdown.
- Product detail sticky purchase panel becomes inline content on mobile.
- Checkout summary moves below form or into collapsible order summary on mobile.
- Footer columns collapse into accordion sections on mobile.

---

## Interaction States

### Hover

- Product image swaps to secondary image or slightly zooms.
- Quick Add appears or becomes more prominent.
- Nav links underline or darken.
- Footer links underline.
- Filter options darken slightly.

### Focus

- Inputs use 2px black outline.
- Buttons use visible focus ring.
- Links use underline + outline if keyboard focused.
- Do not remove browser focus without replacement.

### Disabled

- Disabled buttons use gray background.
- Disabled variants use muted text and optional diagonal line.
- Out-of-stock quick add uses `OUT OF STOCK`.

### Loading

- Product grid uses skeleton image boxes.
- Product card skeleton uses gray image block + text lines.
- Checkout shipping rates show loading rows.
- Add to cart button shows spinner and disabled state.

### Empty States

Examples:
- Empty cart: “Your cart is empty” + Continue Shopping button.
- No products: “No products found” + Clear Filters button.
- No address: “Add your first address”.
- Failed shipping rate: Retry button + manual support note.

---

## Imagery

### Product Photography

- Use white or light-gray background.
- Product should be centered.
- Keep consistent crop ratio.
- Prefer multiple angles: front, back, detail, in-use, packaging.
- Avoid inconsistent lighting between products.
- Use lifestyle images for hero and campaign banners, but product grid should remain clean.

### Hero & Campaign Imagery

- Use high-action outdoor / riding / trail imagery.
- Overlay text should be short, bold, and high contrast.
- Use black or dark scrim if text overlays busy image.
- Keep CTA clear.

### Image Ratios

| Use | Ratio |
|---|---|
| Product card | 1:1 or 4:5 |
| Product detail main image | 1:1 |
| Collection hero | 16:6 or 16:7 |
| Mobile hero | 4:5 or 3:4 |
| Category tile | 4:3 |
| Banner strip | 16:4 |

---

## Page-Level Guidelines

### Homepage

The homepage should feel like a performance gear storefront, not a generic fashion marketplace.

Required sections:
- Announcement bar
- Main navigation
- Hero campaign
- Shop by category
- Featured collection
- Best seller
- New arrival
- Bundling / promo
- Brand story
- Shipping/payment benefits
- Footer

### Collection Page

Collection page should follow the reference catalog behavior:
- Breadcrumb
- Collection title
- Product count
- Filter
- Sort
- Product grid
- Pagination
- Benefit strip
- Footer

### Product Detail Page

Product detail must prioritize:
- Product image clarity
- Product title
- Price
- Variant selection
- Stock availability
- Add to cart
- Shipping estimate
- Tiptap description
- Related products

### Cart & Checkout

Cart and checkout must feel utilitarian and trustworthy:
- Clear item summary
- Clear shipping cost
- Clear payment status
- Clear order total
- Minimal distraction
- Strong black checkout CTA
- Midtrans payment handoff clearly communicated

---

## Tailwind Token Recommendation

Recommended Tailwind color extension:

```ts
colors: {
  canvas: "#ffffff",
  ink: "#111111",
  black: "#000000",
  body: "#333333",
  muted: "#707070",
  "muted-soft": "#9a9a9a",
  hairline: "#e5e5e5",
  "hairline-strong": "#cfcfcf",
  "surface-soft": "#f7f7f7",
  "surface-muted": "#f2f2f2",
  primary: "#e11919",
  "primary-active": "#b90f0f",
  promo: "#f5c542",
  success: "#16803c",
  warning: "#f59e0b",
  error: "#c81e1e"
}
```

Recommended radius extension:

```ts
borderRadius: {
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  full: "9999px"
}
```

Recommended shadow extension:

```ts
boxShadow: {
  subtle: "0 1px 2px rgba(0,0,0,0.06)",
  dropdown: "0 8px 24px rgba(0,0,0,0.12)",
  modal: "0 24px 60px rgba(0,0,0,0.18)"
}
```

---

## Accessibility

- Text contrast must pass WCAG AA.
- Do not rely only on color for sale, stock, or error state.
- All icons need accessible labels.
- All buttons need visible focus states.
- Product card links must have descriptive labels.
- Cart and checkout errors must be announced clearly.
- Drawer and modal components must trap focus.
- Keyboard users must be able to open/close filter drawer, cart drawer, and mega menu.

---

## Known Gaps

- Exact font family and CSS variables from the 100% site were not exposed clearly in the parsed page source, so this document recommends practical alternatives such as Inter and optional Barlow Condensed.
- Exact pixel dimensions for product grid and card spacing were inferred from the observed catalog structure and should be refined during UI implementation.
- Hover animations and image-swap behavior should be validated visually during frontend build.
- This reference is adapted for Axegear; do not copy 100% brand assets, logo shape, product imagery, or exact copywriting.
- The design system intentionally avoids JSON-specific product specification layouts because the project will use Tiptap.js for product descriptions.
- Mobile behavior should be tested directly after implementation because the parsed source primarily exposes content structure, not all responsive CSS states.

---

## Source Notes

Reference analyzed:
- https://www.100percent.com/collections/all

