## Overview

AxeGear uses a **clean performance-commerce design system** inspired by the provided catalog mockup: a white product-first canvas, strong black navigation and UI structure, and a focused orange accent for calls-to-action, sale highlights, important icons, and active states. The site should feel sharp, fast, technical, and retail-ready — closer to a motorsport / sport gear catalog than a soft lifestyle marketplace.

The primary visual rule is a **three-color identity**:

- **White** (`{colors.canvas}` — `#FFFFFF`) for the main background, content area, product card surfaces, whitespace, and clean product photography zones.
- **Black** (`{colors.ink}` — `#1A1A1A`) for text, navigation, footer, product titles, filter labels, borders, icons, and key UI structure.
- **Orange** (`{colors.primary}` — `#F58220`) for CTA buttons, sale badges, sale prices, active navigation, selected states, important icons, floating action buttons, cart counters, and promotional accents.

The design should follow the uploaded catalog reference:
- white header with bold black AxeGear logo,
- uppercase black navigation,
- orange active `SALE` navigation item,
- thin black header divider,
- left filter sidebar,
- dense product grid,
- white product cards with thin gray borders,
- orange sale badges and sale prices,
- black product titles,
- black footer with white text,
- orange newsletter button and floating action button.

The design should avoid unnecessary gradients, heavy shadows, glassmorphism, neon, over-rounded SaaS cards, and excessive decorative graphics. Visual strength should come from **contrast, spacing, grid alignment, typography, and product photography**.

**Key Characteristics:**
- **Three-color discipline:** #FFFFFF, #1A1A1A, and #F58220 are the core brand colors.
- **Product-first layout:** product images dominate the catalog view.
- **Bold uppercase navigation:** menu labels feel sporty and performance-oriented.
- **Sharp retail grid:** dense product cards with consistent image area and clear pricing.
- **Orange as action color:** orange is reserved for CTA, sale, highlights, important icons, and active states.
- **Black as structure color:** black controls logo, text, navigation, footer, borders, and primary UI hierarchy.
- **White as breathing space:** white creates a clean premium catalog feel.
- **Minimal elevation:** borders and layout define hierarchy more than shadows.
- **Footer contrast:** footer uses black background, white text, and orange CTA for newsletter.
- **E-commerce utility focus:** category browsing, filtering, sorting, quick add, cart, checkout, and product clarity matter most.

---

## Colors

### Core Palette

- **Canvas White** (`{colors.canvas}` — `#FFFFFF`): Main page background, product card background, content sections, product detail background, checkout surface, and whitespace.
- **AxeGear Black** (`{colors.ink}` — `#1A1A1A`): Primary text, logo, navigation, filter labels, footer background, icons, product titles, borders, and strong UI structure.
- **AxeGear Orange** (`{colors.primary}` — `#F58220`): CTA buttons, sale badges, sale prices, active nav item, selected states, important icons, floating action button, notification/cart badge, newsletter submit button, and highlights.

### Brand & Accent

- **Primary Orange** (`{colors.primary}` — `#F58220`): Main action and accent color. Use for `SALE`, `SUBSCRIBE`, `ADD TO CART`, sale badges, highlighted prices, active icons, and important UI actions.
- **Primary Hover** (`{colors.primary-hover}` — `#E67312`): Hover state for orange buttons and interactive orange elements.
- **Primary Active** (`{colors.primary-active}` — `#CC5F08`): Pressed state for orange buttons.
- **Primary Soft** (`{colors.primary-soft}` — `#FFF3E8`): Very light orange background for subtle highlights, promo notes, selected filter backgrounds, and alerts.
- **Primary Border** (`{colors.primary-border}` — `#F7B06A`): Light orange border for selected chips, selected swatches, or soft promo boxes.

### Surface

- **Canvas** (`{colors.canvas}` — `#FFFFFF`): Default global background.
- **Content Surface** (`{colors.surface}` — `#FFFFFF`): Product cards, checkout cards, account cards, cart item rows, modal content, and form sections.
- **Surface Soft** (`{colors.surface-soft}` — `#F8F8F8`): Product image background, disabled input fill, skeleton loader, subtle section background.
- **Surface Muted** (`{colors.surface-muted}` — `#F2F2F2`): Secondary gray background for separators, loading states, and empty state panels.
- **Surface Dark** (`{colors.surface-dark}` — `#1A1A1A`): Footer, optional announcement bar, dark campaign strip, black UI sections.
- **Surface Dark Soft** (`{colors.surface-dark-soft}` — `#242424`): Footer input background, dark hover state, dark card separator.

### Hairlines & Borders

- **Hairline** (`{colors.hairline}` — `#E5E5E5`): Product card border, form input border, filter divider, cart row border, footer column separator.
- **Hairline Strong** (`{colors.hairline-strong}` — `#CFCFCF`): Stronger divider, active filter group border, product grid card outline.
- **Border Ink** (`{colors.border-ink}` — `#1A1A1A`): Header divider, selected variant border, black outline buttons, focused input border.
- **Border Orange** (`{colors.border-primary}` — `#F58220`): Selected filter, active swatch, active tab, important CTA outline.
- **Divider Soft** (`{colors.divider-soft}` — `#EEEEEE`): Low-emphasis separators.

### Text

- **Ink** (`{colors.ink}` — `#1A1A1A`): Main text color for headings, navigation, product titles, filters, labels, and body text.
- **Body** (`{colors.body}` — `#2E2E2E`): Product descriptions, checkout copy, form labels, and long content.
- **Muted** (`{colors.muted}` — `#707070`): Breadcrumbs, product variant subtitles, helper text, filter counts, footer secondary links.
- **Muted Soft** (`{colors.muted-soft}` — `#9A9A9A`): Disabled text, placeholder text, unavailable variants, old price text.
- **On Dark** (`{colors.on-dark}` — `#FFFFFF`): Text on black footer, black buttons, dark announcement bar.
- **On Primary** (`{colors.on-primary}` — `#FFFFFF`): Text on orange CTA buttons and orange badges.
- **Highlight Text** (`{colors.highlight}` — `#F58220`): Sale price, active nav item, inline emphasis, important link.

### Product Status

- **Sale** (`{colors.status-sale}` — `#F58220`): Sale badge and discounted price.
- **In Stock** (`{colors.status-in-stock}` — `#1A1A1A`): In-stock label should stay black unless status needs strong semantic color.
- **Out of Stock** (`{colors.status-out}` — `#8A8A8A`): Out-of-stock label and disabled button text.
- **Low Stock** (`{colors.status-low}` — `#F58220`): Low-stock warning can use orange.
- **Error** (`{colors.error}` — `#C81E1E`): Payment failed, form error, sync failed.
- **Success** (`{colors.success}` — `#16803C`): Paid, delivered, completed.

### Scrim

- **Scrim** (`{colors.scrim}` — `#000000` at 50% opacity): Mobile menu backdrop, filter drawer overlay, cart drawer overlay, quick-add modal backdrop.

### Color Usage Ratio

Recommended page ratio:
- **White:** 70–80%
- **Black:** 15–25%
- **Orange:** 5–10%

Orange should feel powerful because it is used sparingly. Do not turn large sections orange unless it is a campaign banner.

---

## Typography

### Font Family

The typography should feel bold, athletic, and technical. Use a strong sans-serif system.

Recommended stack:

```css
font-family: Inter, "Helvetica Neue", Arial, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
```

For stronger logo-adjacent headings or campaign banners, optionally use:

```css
font-family: "Barlow Condensed", Inter, "Helvetica Neue", Arial, sans-serif;
```

Guidelines:
- Use **Inter** for product cards, filters, checkout, forms, account, and admin-facing content.
- Use **Barlow Condensed** only for large campaign headings, collection hero titles, and promotional graphics.
- Navigation and buttons should use uppercase, bold, compact typography.
- Avoid decorative fonts that reduce readability.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---:|---:|---:|---:|---|
| `{typography.hero-xl}` | 56px | 800 | 1.0 | -1.2px | Homepage hero headline |
| `{typography.hero-lg}` | 44px | 800 | 1.05 | -0.8px | Collection hero title |
| `{typography.display-xl}` | 36px | 800 | 1.1 | -0.5px | Page title, campaign title |
| `{typography.display-lg}` | 28px | 800 | 1.15 | -0.3px | Product detail title |
| `{typography.display-md}` | 24px | 700 | 1.2 | -0.2px | Section heading, checkout step |
| `{typography.title-lg}` | 20px | 800 | 1.25 | 0 | Filter heading, product section title |
| `{typography.title-md}` | 16px | 800 | 1.25 | 0 | Product card title |
| `{typography.title-sm}` | 14px | 800 | 1.25 | 0.4px uppercase | Footer heading, nav label |
| `{typography.nav}` | 15px | 800 | 1.2 | 0.4px uppercase | Main navigation |
| `{typography.body-lg}` | 18px | 400 | 1.55 | 0 | Product long description |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | Default body |
| `{typography.body-sm}` | 14px | 400 | 1.45 | 0 | Product meta, filter option |
| `{typography.caption}` | 13px | 500 | 1.35 | 0 | Breadcrumb, stock label |
| `{typography.caption-bold}` | 12px | 800 | 1.3 | 0.6px uppercase | SALE badge, QUICK ADD, FILTER |
| `{typography.price}` | 16px | 800 | 1.35 | 0 | Product card price |
| `{typography.price-sale}` | 16px | 800 | 1.35 | 0 | Orange sale price |
| `{typography.button-md}` | 14px | 800 | 1.2 | 0.6px uppercase | CTA button |
| `{typography.button-sm}` | 12px | 800 | 1.2 | 0.7px uppercase | Small button / badge |

### Principles

- Product card names must be bold and compact.
- Product subtitles can use normal body text and should not overpower product names.
- Use uppercase for navigation, filter headings, sort/view labels, CTA buttons, sale badges, and footer headings.
- Use orange only on selected or important text: `SALE`, discounted price, active nav, active icon, or CTA text/icon.
- Long product descriptions from Tiptap.js should stay readable and not overly condensed.

### Product Name Rules

Use a compact product naming pattern:

```txt
{Product Line} {Model / Type} {Style / Color / Package}
```

Examples:
- `AXEVIEW PRO`
- `RACEVISION MX`
- `LENS KIT X1`
- `GRIPFORCE`
- `AXEGEAR Hydropack Enduro 05`
- `AXEGEAR Tank Bag Trail Enduro Tank 01`
- `AXEGEAR Tali Evakuasi Motor Trail Strap Belakang`

Product card names may be uppercase for a stronger catalog look.

---

## Layout

### Spacing System

- **Base unit:** 4px.
- **Tokens:** `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.base}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.2xl}` 48px · `{spacing.section}` 64px · `{spacing.hero}` 96px.
- **Header height desktop:** 72–88px.
- **Header height mobile:** 56–64px.
- **Main content top padding:** 28–40px after header.
- **Catalog left/right padding:** 32–48px desktop, 16–20px mobile.
- **Product grid gap:** 14–16px in dense layout, 20–24px in more premium layout.
- **Filter sidebar width:** 260–300px.
- **Footer padding:** 40–56px desktop, 28–32px mobile.
- **Footer column gutter:** 48–64px desktop.
- **Product card padding:** 16px content area, image area 100% width.
- **Card border:** 1px `#E5E5E5`.

### Grid & Container

- **Max content width:** 1600px for catalog pages.
- **Catalog desktop layout:** filter sidebar left + product grid right.
- **Filter sidebar width:** 280px.
- **Product grid desktop:** 4 columns by default.
- **Product grid wide:** 4–5 columns depending viewport.
- **Product grid tablet:** 3 columns.
- **Product grid mobile:** 2 columns.
- **Product detail desktop:** product gallery left, purchase panel right.
- **Checkout desktop:** checkout form left, order summary right.

### Header Layout

Desktop header should match the uploaded reference:
- Left: AxeGear logo.
- Center: navigation menu.
- Right: search icon, account icon, cart icon with orange/black badge.
- Bottom border: 2px `#1A1A1A` or 1px strong black line.
- Active nav item: orange `#F58220`.
- Menu text: uppercase black.

Navigation examples:
- `NEW`
- `SPORT`
- `SUNGLASSES`
- `GOGGLES`
- `GLOVES`
- `APPAREL & ACCESSORIES`
- `SALE`
- `EXPLORE`

For actual Axegear implementation, adapt labels:
- `NEW`
- `HYDROPACK`
- `TAS MOTOR`
- `STRAP & AKSESORIS`
- `BUNDLING`
- `SALE`
- `EXPLORE`

### Catalog Layout

The catalog page should match the uploaded mockup closely:
1. Header
2. Breadcrumb row: `Shop / All Products`
3. Left filter sidebar
4. Top-right sort and view controls
5. Product grid
6. Floating help / chat button if needed
7. Black footer

Rules:
- Keep large white canvas.
- Product cards align to a strict grid.
- Filters use black text and thin gray dividers.
- Product cards use white background and gray border.
- Sale badges use orange fill with white uppercase text.
- Sale prices use orange text.
- Footer uses black background.

### Product Card Layout

Each product card:
1. Image area at the top.
2. Optional `SALE` badge at top-right.
3. Product name in bold black.
4. Variant / color / lens / style text in black or muted.
5. Price row with regular and sale price.
6. Optional quick add button on hover or below card.

Card rules:
- Border: 1px `#E5E5E5`.
- Radius: 0–4px only.
- Background: white.
- Image background: white or very subtle gray.
- Product title: uppercase, bold.
- Sale price: orange.
- Old price: black or muted with strikethrough.
- Badge: orange background, white text.

### Whitespace Philosophy

The page should feel **clean but dense**:
- White space separates the filter sidebar, grid, and footer.
- Product cards stay compact and efficient.
- The design should not feel like a SaaS landing page.
- Avoid oversized cards and overly large rounded corners.
- Let product photos and orange highlights carry the visual energy.

---

## Elevation

The reference image uses mostly flat surfaces. Use borders instead of shadows.

### Shadow Tokens

- **Flat** (`{shadow.none}`): Default for product cards, grid, filters, footer, and header.
- **Subtle** (`{shadow.subtle}`): `0 1px 2px rgba(26,26,26,0.06)` — sticky header, small dropdown.
- **Dropdown** (`{shadow.dropdown}`): `0 8px 24px rgba(26,26,26,0.14)` — mega menu, account menu, sort menu.
- **Modal** (`{shadow.modal}`): `0 24px 60px rgba(26,26,26,0.22)` — cart drawer, filter drawer, quick-add modal.

### Elevation Rules

- Product cards should not use heavy shadow.
- Header should be flat with black divider.
- Product hover can use a slightly darker border, image hover swap, or subtle quick-add reveal.
- Floating action buttons may use a soft shadow to separate from product grid.
- Footer should be flat black with clear column dividers.

---

## Components

### Header

**`site-header`** — White surface, black logo/nav/icons, orange active state.

Specs:
- Background: `#FFFFFF`
- Text/icon: `#1A1A1A`
- Active nav: `#F58220`
- Height: 72–88px desktop
- Border-bottom: 1–2px `#1A1A1A`
- Logo: left aligned, strong black
- Nav: centered, uppercase, bold
- Utility icons: search, account, cart
- Cart badge: black or orange circle with white number

Behavior:
- Sticky optional.
- On scroll, keep white background.
- Do not add blur/glass effect.

### Navigation Link

**`nav-link`**
- Font: `{typography.nav}`
- Color: `#1A1A1A`
- Transform: uppercase
- Hover: `#F58220`
- Active: `#F58220`
- Active indicator: optional 2px orange underline

### Breadcrumb

**`breadcrumb`**
- Color: `#1A1A1A`
- Muted parts can use `#707070`
- Size: 14–16px
- Separator: `/`
- Active item: bold black
- Example: `Shop / All Products`

### Filter Sidebar

**`filter-sidebar`**
- Width: 260–300px
- Background: `#FFFFFF`
- Heading: `Filter:` in black, bold, 22–24px
- Group label: black, bold, 16px
- Divider: `#CFCFCF`
- Chevron icon: black
- Open/active group can use orange icon or orange left border

Filter groups based on the mockup:
- Category
- Style
- Type
- Sport
- Colors
- Size
- Availability
- Lens Type

For Axegear:
- Category
- Collection
- Product Type
- Activity
- Color
- Package
- Availability
- Price

### Sort & View Controls

**`sort-view-bar`**
- Align top-right above grid.
- Text: black.
- Active grid view icon: orange.
- Inactive view icon: black.
- Divider: vertical line `#CFCFCF`.

Example:
- `Sort by: Featured`
- `View: grid/list icons`

### Product Grid

**`product-grid`**
- Desktop: 4 columns.
- Wide: max 5 columns if enough width.
- Tablet: 3 columns.
- Mobile: 2 columns.
- Gap: 14–24px.
- Align with top sort row.

### Product Card

**`product-card`**
- Background: `#FFFFFF`
- Border: 1px `#E5E5E5`
- Radius: 0–4px
- Overflow: hidden
- No heavy shadow
- Product image top
- Product info bottom

Product title:
- Black `#1A1A1A`
- Bold 16px
- Uppercase
- Margin-top: 12–16px

Product subtitle:
- Black or muted
- 14–15px
- 2 lines max

Price:
- Regular price: black, bold
- Sale price: orange, bold
- Old price if needed: muted + strikethrough

### Sale Badge

**`sale-badge`**
- Background: `#F58220`
- Text: `#FFFFFF`
- Font: uppercase, 12px, 800
- Position: top-right of product card image
- Padding: 6px 10px
- Radius: 0–2px
- Text: `SALE`

### Product Image

**`product-image`**
- Background: `#FFFFFF` or `#F8F8F8`
- Aspect ratio: 1:1
- Object fit: contain
- Padding: 20–32px depending product
- Hover: secondary image swap or 1.03 scale
- Keep product centered and clean

### Quick Add Button

**`quick-add`**
- Background: `#1A1A1A`
- Hover background: `#F58220`
- Text: `#FFFFFF`
- Height: 42–48px
- Width: 100%
- Font: uppercase, 14px, 800
- Border radius: 0–4px

Use orange hover to reinforce CTA behavior.

### Primary Button

**`button-primary`**
- Background: `#F58220`
- Hover: `#E67312`
- Active: `#CC5F08`
- Text: `#FFFFFF`
- Height: 48px
- Padding: 0 24px
- Radius: 0–4px
- Font: uppercase, 14px, 800
- Use for: Subscribe, Checkout, Buy Now, Apply Filter, Save Address

### Secondary Button

**`button-secondary`**
- Background: `#FFFFFF`
- Border: 1px solid `#1A1A1A`
- Text: `#1A1A1A`
- Hover background: `#1A1A1A`
- Hover text: `#FFFFFF`
- Height: 48px
- Radius: 0–4px
- Use for: Continue Shopping, Clear Filter, Wishlist

### Black Button

**`button-black`**
- Background: `#1A1A1A`
- Hover background: `#F58220`
- Text: `#FFFFFF`
- Use for secondary strong action where orange should be saved for the main CTA.

### Icon Button

**`icon-button`**
- Icon color: `#1A1A1A`
- Hover color: `#F58220`
- Active color: `#F58220`
- Size: 40–44px
- Used for search, account, cart, wishlist, view toggle

### Floating Action Button

**`floating-action-button`**
- Background: `#F58220`
- Icon: `#FFFFFF`
- Size: 64px desktop, 56px mobile
- Radius: full
- Shadow: subtle/dropdown
- Use for important chat/help/promo action
- Position: bottom-right, above chat bubble if both exist

### Chat Bubble

**`chat-bubble`**
- Background: `#1A1A1A`
- Icon: `#FFFFFF`
- Size: 52–56px
- Radius: full
- Shadow: dropdown
- Position: bottom-right below orange floating button

### Footer

**`footer`**
- Background: `#1A1A1A`
- Text: `#FFFFFF`
- Secondary text: `#D6D6D6`
- Divider: rgba(255,255,255,0.28)
- CTA: orange `#F58220`
- Newsletter input: dark black/transparent with white border
- Newsletter button: orange background

Footer columns:
- SHOP
- SUPPORT
- COMPANY
- NEWSLETTER

Footer link style:
- White or light gray
- Hover: orange
- Headings: uppercase, bold

### Newsletter

**`newsletter-signup`**
- Input background: transparent or `#111111`
- Input border: rgba(255,255,255,0.4)
- Input text: white
- Placeholder: #D6D6D6
- Button background: `#F58220`
- Button text: white
- Button hover: `#E67312`

### Forms

**`text-input`**
- Background: `#FFFFFF`
- Border: 1px `#CFCFCF`
- Text: `#1A1A1A`
- Placeholder: `#9A9A9A`
- Height: 48–52px
- Radius: 0–4px
- Focus border: 2px `#1A1A1A`
- Error border: error red
- Success border: black or green only if needed

**`select-input`**
- Same as text input.
- Chevron icon black.
- Active/focused border black.

**`checkbox`**
- Border: `#1A1A1A`
- Checked background: `#F58220`
- Check icon: white
- Used for filters, agreement, newsletter consent.

### Product Detail Gallery

**`product-gallery`**
- Background: white.
- Image area: white or subtle gray.
- Main image: large, centered, object contain.
- Thumbnail selected border: orange.
- Thumbnail border: gray.
- Zoom icon: black, hover orange.

### Product Purchase Panel

**`product-purchase-panel`**
- Background: white.
- Title: black.
- Price: black or orange if sale.
- Variant selector: black border selected, orange for highlight.
- Add to Cart: orange primary button.
- Buy Now: black button or orange if only one main CTA.
- Marketplace links: white button with black border, orange hover.

### Variant Selector

**`variant-selector`**
- Selected border: `#1A1A1A` or `#F58220`
- Selected text: black
- Hover border: orange
- Disabled: muted gray, line-through
- Minimum height: 40px

### Cart Drawer

**`cart-drawer`**
- Background: white.
- Header: black text.
- Close icon: black, hover orange.
- Checkout button: orange.
- Item title: black.
- Price: black / orange sale.
- Divider: gray.

### Checkout Layout

**`checkout-layout`**
- Background: white.
- Form cards: white with gray border.
- Primary action: orange.
- Order summary: white card with black text.
- Total price: black or orange emphasis.
- Payment status: use semantic status with black/orange support.

### Product Description Content

Because product descriptions will be created using Tiptap.js, all rich text should be styled consistently.

**`rich-description`**
- Background: white.
- Text: black.
- Max width: 760–880px.
- Body: 16px / 1.6.
- H2: 24px / 800.
- H3: 18px / 800.
- Paragraph margin: 12–16px.
- Table border: 1px `#E5E5E5`.
- Table header: `#1A1A1A` text on `#F8F8F8`.
- Links: orange.
- Strong text: black bold.

Recommended sections:
- Deskripsi Produk
- Fitur Utama
- Spesifikasi
- Cocok Untuk
- Isi Paket
- Catatan Penggunaan
- Garansi / Kebijakan Retur

---

## Responsive Behavior

| Name | Width | Key Changes |
|---|---:|---|
| Mobile | < 640px | Header collapses to hamburger + logo + cart. Filter becomes drawer. Product grid becomes 2 columns. Footer columns become accordion. |
| Tablet | 640–1024px | Product grid becomes 3 columns. Header navigation may collapse into drawer. Filter can be drawer or collapsible sidebar. |
| Desktop | 1024–1440px | Full header, filter sidebar, 4-column product grid, top sort/view controls, full footer columns. |
| Wide | > 1440px | Content caps around 1600px. Product grid may become 5 columns if product cards remain readable. |

### Touch Targets

- Main CTA: minimum 48px height.
- Icon buttons: minimum 40×40px.
- Mobile menu rows: minimum 44px height.
- Variant options: minimum 40px height.
- Filter rows: minimum 40px height.
- Floating buttons: 52–64px.

### Collapsing Strategy

- Header nav becomes hamburger drawer on mobile.
- Filter sidebar becomes filter drawer under 1024px.
- Sort and View remain visible above product grid.
- Product detail purchase panel stacks below gallery.
- Cart drawer becomes full-screen on mobile.
- Footer columns collapse into accordions on mobile.

---

## Interaction States

### Hover

- Navigation link changes from black to orange.
- Product card border darkens slightly.
- Product image swaps to second image or slightly scales.
- Quick Add button appears or changes from black to orange.
- Footer links turn orange.
- Icon buttons turn orange.

### Active

- Active nav item is orange.
- Active view icon is orange.
- Selected filter can use orange check or orange border.
- Selected variant can use black 2px border with orange accent.

### Focus

- Inputs use 2px black border.
- Buttons use visible orange or black focus outline.
- Links use underline and focus ring.
- Drawer/modal focus must be trapped.

### Disabled

- Disabled button background: `#CFCFCF`.
- Disabled text: `#9A9A9A`.
- Disabled variant: muted with optional diagonal/line-through.
- Out-of-stock button: gray background, black/muted text.

### Loading

- Product grid uses white/gray skeleton.
- Skeleton blocks use `#F2F2F2`.
- CTA loading state keeps button color but dims content.
- Checkout shipping rates show skeleton rows.

### Empty States

Examples:
- Empty cart: `YOUR CART IS EMPTY` + orange `CONTINUE SHOPPING`.
- No products: `NO PRODUCTS FOUND` + black outline `CLEAR FILTERS`.
- Failed shipping rate: show retry action with orange button.
- Failed payment: use error red for status, orange for retry CTA.

---

## Imagery

### Product Photography

- Use white or very light gray product background.
- Products must be centered and sharply lit.
- Use object-contain for catalog cards.
- Keep crop ratio consistent.
- Use multiple angles: front, side, detail, in-use, packaging.
- Product grid should look clean and consistent like the uploaded mockup.
- Avoid busy lifestyle backgrounds inside product grid.

### Hero & Campaign Imagery

- Use high-energy outdoor, riding, trail, or sport imagery.
- Overlay text should be bold and short.
- Use black or dark scrim if needed.
- Orange CTA should stand out clearly.
- Avoid orange image overlays that overpower product color.

### Image Ratios

| Use | Ratio |
|---|---|
| Product card | 1:1 |
| Product detail main image | 1:1 |
| Collection hero | 16:6 or 16:7 |
| Mobile hero | 4:5 or 3:4 |
| Category tile | 4:3 |
| Footer/newsletter graphic | 16:5 |

---

## Page-Level Guidelines

### Homepage

Required sections:
- Header
- Hero campaign
- Category shortcuts
- Featured collection
- Best seller
- New arrival
- Bundling / promo
- Brand story
- Benefit strip
- Footer

Color usage:
- White background.
- Black navigation and text.
- Orange CTA and highlights.
- Footer black.

### Collection Page

Follow the uploaded mockup closely:
- White header.
- Breadcrumb row.
- Left filter sidebar.
- Sort/View controls right.
- Dense product grid.
- Orange sale badges.
- Orange active view icon.
- Black footer with orange subscribe button.

### Product Detail Page

Prioritize:
- Large product image.
- Clear black product title.
- Orange sale price/CTA.
- Variant selector.
- Stock information.
- Add to cart.
- Marketplace buttons.
- Tiptap description.
- Related products.

### Cart & Checkout

Cart and checkout must feel clean and trustworthy:
- White background.
- Black text.
- Orange main action.
- Thin borders.
- Clear totals.
- Minimal distractions.
- Midtrans payment status displayed clearly.
- Biteship shipping options displayed as selectable rows.

---

## Tailwind Token Recommendation

Recommended Tailwind color extension:

```ts
colors: {
  canvas: "#FFFFFF",
  ink: "#1A1A1A",
  primary: "#F58220",
  "primary-hover": "#E67312",
  "primary-active": "#CC5F08",
  "primary-soft": "#FFF3E8",
  "primary-border": "#F7B06A",

  body: "#2E2E2E",
  muted: "#707070",
  "muted-soft": "#9A9A9A",

  surface: "#FFFFFF",
  "surface-soft": "#F8F8F8",
  "surface-muted": "#F2F2F2",
  "surface-dark": "#1A1A1A",
  "surface-dark-soft": "#242424",

  hairline: "#E5E5E5",
  "hairline-strong": "#CFCFCF",
  "border-ink": "#1A1A1A",
  "border-primary": "#F58220",

  success: "#16803C",
  warning: "#F58220",
  error: "#C81E1E"
}
```

Recommended radius extension:

```ts
borderRadius: {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  full: "9999px"
}
```

Recommended shadow extension:

```ts
boxShadow: {
  subtle: "0 1px 2px rgba(26,26,26,0.06)",
  dropdown: "0 8px 24px rgba(26,26,26,0.14)",
  modal: "0 24px 60px rgba(26,26,26,0.22)"
}
```

Recommended typography utility notes:
- Use uppercase tracking for nav and CTA.
- Use `font-extrabold` for product card names.
- Use `text-primary` for sale price and active state.
- Use `bg-primary` for primary CTA and sale badge.
- Use `bg-surface-dark` for footer.

---

## Accessibility

- `#1A1A1A` on `#FFFFFF` is the default readable text pairing.
- `#FFFFFF` text on `#F58220` should be used with bold labels for CTA readability.
- Do not rely only on orange for status meaning; include text labels such as `SALE`, `LOW STOCK`, `ACTIVE`, or `SELECTED`.
- All icons need accessible labels.
- Cart badge must be readable against icon/background.
- Header and footer links must be keyboard accessible.
- Filter drawer and cart drawer must trap focus.
- Product cards must have descriptive link labels.
- Button focus states must be visible.
- Forms must show clear error text below fields.

---

## Known Gaps

- The uploaded mockup is a static visual reference, so exact component states such as hover, focus, drawer animation, and loading behavior need validation during frontend implementation.
- The logo style in the mockup should be treated as visual inspiration; actual AxeGear logo usage should follow the brand asset file.
- Product images should be standardized during content preparation to preserve the clean catalog grid.
- The design intentionally avoids additional brand colors beyond white, black, and orange, except semantic colors for error/success when required.
- The product description layout assumes Tiptap.js rich text content and should be tested with tables, lists, headings, and images.
- Mobile layout should be manually QA-tested because dense catalog grids can become cramped on small screens.

---

## Source Notes

Reference inputs:
- Uploaded AxeGear catalog mockup image.
- Final color requirements from user:
  - `#FFFFFF` for main background, content area, and whitespace.
  - `#1A1A1A` for text, navigation, footer, and UI elements.
  - `#F58220` for CTA buttons, highlights, accents, and important icons.
