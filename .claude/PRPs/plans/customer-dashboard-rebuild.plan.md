# Plan: Customer Dashboard Pages Rebuild

## Summary
Rebuild the customer dashboard pages (Home, Browse Catalog, My Reservations, Transaction History) to match the updated HTML prototypes from stitch.ai. The existing components in `src/features/customer-dashboard/` will be rewritten to achieve pixel-accurate fidelity with the new designs while preserving the established FSD architecture, theme variables, and codebase conventions.

## User Story
As a BentaHub customer, I want a polished dashboard experience with browsing, reservations, and transaction views, so that I can manage my sari-sari store orders efficiently.

## Problem → Solution
Current implementations are rough first-pass components that deviate from the detailed prototypes → Rewrite each component to precisely match the prototype layouts, typography, spacing, colors, and interactions.

## Metadata
- **Complexity**: Large
- **Source PRD**: N/A (HTML prototypes provided directly)
- **Estimated Files**: 19 files (15 component rewrites + 4 page rewrites)

---

## Constraints
- **MUST NOT** touch `src/app/globals.css`
- **MUST** use existing OKLCH theme variables (`primary`, `muted`, `border`, `card`, `accent`, etc.)
- **MUST** use `lucide-react` icons (map Material Symbols → Lucide equivalents)
- **MUST** follow FSD barrel export pattern
- **MUST** use existing shadcn components (`Button`, `Input`, `Card`, `Label`, `Separator`)

---

## Prototype → Theme Mapping

| Prototype Token | BentaHub Theme Variable |
|---|---|
| `bg-surface-container-low` | `bg-muted` |
| `bg-surface-container-high` | `bg-muted/50` or `bg-accent` |
| `bg-surface` | `bg-background` |
| `bg-card` / `bg-surface-container-lowest` | `bg-card` |
| `text-on-surface` | `text-foreground` |
| `text-on-surface-variant` | `text-muted-foreground` |
| `text-primary` | `text-primary` |
| `bg-primary-container` | `bg-primary` (for active nav) |
| `text-on-primary-container` | `text-primary-foreground` |
| `border-outline-variant` | `border-border` |
| `bg-accent` (prototype) | `bg-accent` |
| `font-headline-lg` (32px/600) | `text-2xl md:text-3xl font-bold` |
| `font-headline-md` (24px/600) | `text-lg font-bold` or `text-xl font-bold` |
| `font-body-sm` (14px/400) | `text-sm` |
| `font-label-md` (12px/500) | `text-xs font-medium` |
| `font-mono-md` | `font-mono text-sm` |

## Icon Mapping

| Material Symbol | Lucide Icon |
|---|---|
| `dashboard` / `home` | `LayoutDashboard` / `Home` |
| `storefront` / `grid_view` | `Store` / `LayoutGrid` |
| `bookmark` | `Bookmark` |
| `receipt_long` / `history` | `Receipt` / `History` |
| `settings` | `Settings` |
| `search` | `Search` |
| `notifications` | `Bell` |
| `person` / `account_circle` | `User` |
| `shopping_bag` | `ShoppingBag` |
| `calendar_today` | `Calendar` |
| `workspace_premium` | `Award` |
| `location_on` | `MapPin` |
| `store` | `Store` |
| `shopping_cart` / `shopping_basket` | `ShoppingCart` |
| `expand_more` | `ChevronDown` |
| `chevron_left` / `chevron_right` | `ChevronLeft` / `ChevronRight` |
| `more_vert` | `MoreVertical` |
| `inventory_2` | `Package` |
| `local_shipping` | `Truck` |
| `check_circle` | `CircleCheck` |
| `sync` | `RefreshCw` |
| `cancel` / `block` | `XCircle` / `Ban` |

---

## Mandatory Reading

| Priority | File | Why |
|---|---|---|
| P0 | `src/app/globals.css` | Theme variables — DO NOT MODIFY |
| P0 | `src/app/customer/layout.tsx` | Layout shell structure |
| P0 | `src/features/customer-dashboard/components/index.ts` | Barrel exports |
| P1 | `src/config/constants.ts` | APP_NAME, BRANCHES |
| P1 | `src/lib/utils.ts` | `cn()` utility |
| P1 | `src/components/ui/button.tsx` | Button variants |
| P1 | `src/components/ui/input.tsx` | Input component |

---

## Patterns to Mirror

### COMPONENT_STRUCTURE
```tsx
// SOURCE: all existing components
"use client"
import { Icon } from "lucide-react"
import { cn } from "@/lib/utils"
export function ComponentName() { ... }
```

### BARREL_EXPORT
```tsx
// SOURCE: src/features/customer-dashboard/components/index.ts
export * from "./component-name"
```

### CARD_PATTERN
```tsx
// SOURCE: summary-cards.tsx, nearby-branches.tsx
<div className="bg-card border border-border rounded-xl shadow-sm p-6">
```

### TABLE_PATTERN
```tsx
// SOURCE: recent-orders-table.tsx
<table className="w-full text-sm">
  <thead><tr className="text-left text-muted-foreground border-b border-border bg-muted/30">
```

### STATUS_BADGE
```tsx
// SOURCE: recent-orders-table.tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary">
```

---

## Files to Change

| File | Action | Description |
|---|---|---|
| `components/dashboard-sidebar.tsx` | UPDATE | Match prototype nav — remove Settings, update active style to `bg-primary-container/10 text-primary` |
| `components/dashboard-topbar.tsx` | UPDATE | Add user name + border separator, match prototype layout |
| `components/dashboard-mobile-nav.tsx` | UPDATE | Match 4-tab bottom nav from prototype |
| `components/summary-cards.tsx` | UPDATE | Match prototype card layout with icon backgrounds |
| `components/recent-orders-table.tsx` | UPDATE | Add mono Order IDs `#BH-xxxx`, status pill styles from prototype |
| `components/nearby-branches.tsx` | UPDATE | Match prototype branch items with square store icons |
| `components/catalog-toolbar.tsx` | UPDATE | Add `Showing 1-12 of 248 products`, match toggle buttons |
| `components/category-sidebar.tsx` | UPDATE | Match prototype categories (Coffee, Condiments, Baking, Canned, Sauces, Household), counts, active style |
| `components/product-card.tsx` | UPDATE | Match prototype: category label, product name, weight+branch, price, "Add to Cart" button with icon |
| `components/pagination.tsx` | UPDATE | Match prototype pagination with ellipsis |
| `components/reservation-card.tsx` | UPDATE | Rewrite featured card (horizontal with image), compact card (vertical with thumbnail), match prototype metadata grid |
| `components/reservation-summary.tsx` | UPDATE | Replace "extend pickup" CTA with ORDER SUMMARY stats card matching prototype |
| `components/transaction-filters.tsx` | UPDATE | Replace with pill tabs (All/Processing/Completed/Cancelled) + search + date select |
| `components/transaction-table.tsx` | UPDATE | Replace table with card-based entries matching prototype (icon, order ID, date, status pill, 4-col detail grid) |
| `components/index.ts` | UPDATE | Ensure all exports are correct |
| `src/app/customer/page.tsx` | UPDATE | Match welcome header text, assemble components |
| `src/app/customer/catalog/page.tsx` | UPDATE | Use prototype-accurate product data (Kopiko, Ajinamoto, Graham, Ligo, etc.) |
| `src/app/customer/reservations/page.tsx` | UPDATE | Match bento grid with featured+sidebar+compact cards |
| `src/app/customer/transactions/page.tsx` | UPDATE | Replace with "Order History" title, pill tabs, search/date, card entries |

## NOT Building
- Profile & Settings page (keep existing placeholder)
- Cart/checkout functionality
- Real backend data integration
- Dark mode-specific overrides (existing theme handles it)
- Mobile drawer menu

---

## Step-by-Step Tasks

### Task 1: Update DashboardSidebar
- **ACTION**: Rewrite `dashboard-sidebar.tsx`
- **IMPLEMENT**: Remove "Profile & Settings" nav item. Change active state from `bg-primary text-primary-foreground` to `bg-accent text-primary font-bold` with filled icon. Use `text-on-surface-variant` (→ `text-muted-foreground`) for inactive items. Add `Digital Sari-Sari` subtitle below BentaHub logo. Remove user footer section.
- **VALIDATE**: Sidebar renders with 4 nav items, active state highlights correctly

### Task 2: Update DashboardTopbar
- **ACTION**: Rewrite `dashboard-topbar.tsx`
- **IMPLEMENT**: Match prototype: search input with icon on left (full-width max-w-md), notification bell with red dot, vertical separator `border-l`, user name label + avatar circle. Mobile: show "BentaHub" text.
- **VALIDATE**: Topbar renders with search, bell, separator, user name

### Task 3: Update DashboardMobileNav
- **ACTION**: Rewrite `dashboard-mobile-nav.tsx`
- **IMPLEMENT**: 4 tabs: Home, Browse, Saved (Bookmark), Profile (User). Match prototype active state with filled icon + `text-primary`. Use `text-[10px]` labels.
- **VALIDATE**: Bottom nav shows 4 items on mobile

### Task 4: Update SummaryCards
- **ACTION**: Rewrite `summary-cards.tsx`
- **IMPLEMENT**: 3 cards in grid. Each card: colored icon container (rounded-lg not round) + label + large value. Colors: card1 `bg-accent` ShoppingBag, card2 `bg-amber-100` Calendar, card3 `bg-primary/10` Award. Values: 42, 3, 1250.
- **VALIDATE**: 3 cards render in row on desktop

### Task 5: Update RecentOrdersTable
- **ACTION**: Rewrite `recent-orders-table.tsx`
- **IMPLEMENT**: Match prototype table: header with "Recent Orders" + "View All" link. Columns: Order ID (mono `#BH-xxxx`), Date, Total (bold), Status (pill badges). 3 rows: Ready for Pickup (primary), Completed (secondary), Pending (tertiary/amber).
- **VALIDATE**: Table renders with 3 rows and correct badges

### Task 6: Update NearbyBranches
- **ACTION**: Rewrite `nearby-branches.tsx`
- **IMPLEMENT**: Match prototype: Header with location icon + title. Branch items: square icon container (rounded-lg, `bg-muted`), branch name (bold), address, status dot + text. 3 branches: 2 open (emerald), 1 closed (destructive).
- **VALIDATE**: 3 branch items render with status indicators

### Task 7: Update CustomerPage (Home)
- **ACTION**: Rewrite `src/app/customer/page.tsx`
- **IMPLEMENT**: Welcome header "Hello, Alex Rivera!" + subtitle. SummaryCards. Grid: RecentOrdersTable (2 cols) + NearbyBranches (1 col).
- **VALIDATE**: Home page assembles all sections correctly

### Task 8: Update CategorySidebar
- **ACTION**: Rewrite `category-sidebar.tsx`
- **IMPLEMENT**: Match prototype categories: All Products (248), Coffee (12), Condiments (45), Baking Ingredients (28), Canned Goods (89), Sauces (35), Household Supplies (22). Active "All Products" has `bg-accent text-primary` + count badge `bg-primary text-white`. Availability checkboxes below.
- **VALIDATE**: Category list renders with counts and active state

### Task 9: Update CatalogToolbar
- **ACTION**: Rewrite `catalog-toolbar.tsx`
- **IMPLEMENT**: Branch selector with MapPin + "Branch: Santa Maria Bulacan" + ChevronDown. Right side: "Showing 1-12 of 248 products" + grid/list toggle buttons.
- **VALIDATE**: Toolbar renders with branch selector and view toggle

### Task 10: Update ProductCard
- **ACTION**: Rewrite `product-card.tsx`
- **IMPLEMENT**: Match prototype exactly: aspect-square image, stock badge (In Stock green / Low Stock orange / OUT OF STOCK overlay), category label, product name (bold), weight + branch info, price (headline-md primary), full-width "Add to Cart" button with shopping_cart icon. Out of stock: "Notify Me" with bell icon, disabled, opacity-75 on card.
- **VALIDATE**: Cards render with all 3 stock states

### Task 11: Update Pagination
- **ACTION**: Rewrite `pagination.tsx`
- **IMPLEMENT**: Match prototype: prev arrow, active page 1 (bg-primary text-white), pages 2,3, ellipsis, last page 24, next arrow. All buttons 40x40px rounded-lg.
- **VALIDATE**: Pagination renders centered with correct styling

### Task 12: Update CatalogPage
- **ACTION**: Rewrite `src/app/customer/catalog/page.tsx`
- **IMPLEMENT**: Use prototype-accurate products: Kopiko Blanca TWIN (₱15, Coffee, in-stock), Ajinamoto Seasoning (₱5, Condiments, in-stock), Graham Crushed (₱50, Baking, low-stock), Ligo Sardines Red (₱28, Canned, out-of-stock), Tomato Sauce (₱22, Sauces, in-stock), Maxglow Dishwashing (₱20, Household, in-stock), Datu Toyo (₱12, Condiments, in-stock), All-Purpose Flour (₱35, Baking, in-stock). FAB cart button fixed bottom-right.
- **VALIDATE**: Catalog page renders 8 products in grid

### Task 13: Update ReservationCard
- **ACTION**: Rewrite `reservation-card.tsx`
- **IMPLEMENT**: Featured variant: horizontal card (image 1/3 width, content 2/3), "Ready for Pickup" badge on image, mono reservation ID, title, description, 2x2 metadata grid (Calendar, MapPin, Package, Truck), "View Pickup Pass" primary button. Compact variant: vertical card with status badge, small thumbnail (80x80), title, description, footer with "Expected Pickup" date + "Details" button.
- **VALIDATE**: Both card variants render correctly

### Task 14: Update ReservationSummary
- **ACTION**: Rewrite `reservation-summary.tsx`
- **IMPLEMENT**: Match prototype: Single "ORDER SUMMARY" card with stats rows (Ready for Pickup: 1, Processing: 2, Completed: 12). Remove the "extend pickup" CTA card. Use mono font for values.
- **VALIDATE**: Summary card renders with correct stats

### Task 15: Update ReservationsPage
- **ACTION**: Rewrite `src/app/customer/reservations/page.tsx`
- **IMPLEMENT**: Page header + subtitle. Tab filters (All/Processing/Ready/Completed) with active underline. 12-col grid: featured card (col-span-8) + summary (col-span-4) + 2 compact cards (col-span-6 each). Match prototype data: #RES-88421 Grocery Bundle (ready), #RES-89012 Cooking Essentials (processing), #RES-89145 Baking Supplies (processing).
- **VALIDATE**: Bento grid renders correctly

### Task 16: Update TransactionFilters
- **ACTION**: Rewrite `transaction-filters.tsx` as `TransactionStatusTabs`
- **IMPLEMENT**: Replace grid filters with prototype design: pill-style tab buttons (All Orders active bg-primary text-white, others bg-muted). Below: search input with icon + date range select dropdown side-by-side.
- **VALIDATE**: Tabs and search/date filters render

### Task 17: Update TransactionTable
- **ACTION**: Rewrite `transaction-table.tsx` as card-based entries
- **IMPLEMENT**: Replace table with card-based transaction entries matching prototype. Each entry: left icon (ShoppingBag/Truck/Ban), Order ID + datetime, status pill (Completed green/Processing blue/Cancelled red), dashed border divider, 4-col detail grid (Branch, Fulfillment, Total Amount, Details link). 4 entries matching prototype data.
- **VALIDATE**: 4 transaction cards render with correct status styles

### Task 18: Update TransactionsPage
- **ACTION**: Rewrite `src/app/customer/transactions/page.tsx`
- **IMPLEMENT**: Title "Order History" (not "Transaction History"). Subtitle. TransactionFilters (tabs + search). TransactionTable (card entries). Pagination footer ("Showing 4 of 24 transactions").
- **VALIDATE**: Full page renders with tabs, search, entries, pagination

### Task 19: Update Barrel Exports & Verify Build
- **ACTION**: Update `components/index.ts`, run lint + typecheck + build
- **VALIDATE**: `pnpm lint` → 0 errors, `pnpm typecheck` → 0 errors, `pnpm build` → success

---

## Validation Commands

### Lint
```bash
pnpm lint
```
EXPECT: Zero errors

### Type Check
```bash
pnpm typecheck
```
EXPECT: Zero errors

### Build
```bash
pnpm build
```
EXPECT: All routes static, zero errors

### Visual
```bash
pnpm dev
# Visit /customer, /customer/catalog, /customer/reservations, /customer/transactions
```
EXPECT: Pages match prototypes

---

## Acceptance Criteria
- [ ] All 19 tasks completed
- [ ] All validation commands pass
- [ ] Dashboard Home matches prototype layout
- [ ] Browse Catalog matches prototype (categories, products, pagination, FAB)
- [ ] My Reservations matches prototype (bento grid, featured/compact cards)
- [ ] Transaction History matches prototype (card-based entries, pill tabs)
- [ ] No modifications to `globals.css`
- [ ] All icons use `lucide-react`
- [ ] All colors use theme variables

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Missing Lucide icon equivalents | Low | Low | Verified mapping above covers all needed icons |
| Image paths breaking | Medium | Low | Reuse existing `/images/dashboard/` images |
| Type errors from refactored interfaces | Medium | Medium | Run typecheck after each component change |
