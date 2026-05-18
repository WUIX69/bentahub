# Plan: Customer Dashboard Pages

## Summary

Build the customer dashboard with 5 pages: Home, Browse Catalog, My Reservations, Transaction History, and Profile & Settings. All pages share a sidebar+topbar shell layout under `/customer/`. Components live in `features/customer-dashboard/`.

## User Story

As a **customer**, I want a full dashboard experience to browse products, manage reservations, view transactions, and update my profile.

## Metadata

- **Complexity**: XL
- **Source PRD**: N/A (user-provided HTML prototypes)
- **Estimated Files**: ~25 files
- **Key constraint**: MUST NOT touch `globals.css`

---

## Design Token Mapping (Prototype → BentaHub Theme)

| Prototype | BentaHub Tailwind | Usage |
|---|---|---|
| `bg-surface-container-low` | `bg-muted` | Sidebar bg |
| `bg-surface` / `bg-background` | `bg-background` | Page bg |
| `bg-card` | `bg-card` | Cards |
| `border-outline-variant` | `border-border` | All borders |
| `text-on-surface` | `text-foreground` | Primary text |
| `text-on-surface-variant` / `text-outline` | `text-muted-foreground` | Secondary text |
| `bg-primary-container` | `bg-primary` | Active nav, badges |
| `text-on-primary-container` | `text-primary-foreground` | Active nav text |
| `bg-primary` / `text-on-primary` | `bg-primary text-primary-foreground` | CTAs |
| `text-primary` | `text-primary` | Links, highlights |
| `bg-surface-container-high` | `bg-accent` | Hover states |
| `bg-accent` | `bg-accent` | Tag backgrounds |
| `bg-secondary-container` | `bg-secondary` | Status badges |
| `text-destructive` | `text-destructive` | Error/cancelled |
| `bg-tertiary-fixed` | `bg-amber-50` | Delivery tags |
| `bg-primary-fixed` | `bg-accent` | Stat icon bg |
| `font-mono-md` | `font-mono text-sm` | Order IDs |

## Lucide Icon Mapping

| Prototype Material Icon | Lucide | Verified |
|---|---|---|
| `dashboard` / `home` | `LayoutDashboard` / `Home` | ✅ |
| `storefront` / `grid_view` | `Store` / `Grid3X3` | ✅ |
| `bookmark` | `Bookmark` | ✅ |
| `receipt_long` / `history` | `Receipt` / `History` | ✅ |
| `settings` | `Settings` | ✅ |
| `search` | `Search` | ✅ |
| `shopping_cart` / `shopping_bag` / `shopping_basket` | `ShoppingCart` / `ShoppingBag` | ✅ |
| `account_circle` / `person` | `User` | ✅ |
| `notifications` | `Bell` | ✅ |
| `location_on` | `MapPin` | ✅ |
| `calendar_today` | `Calendar` | ✅ |
| `inventory_2` / `package_2` | `Package` / `Boxes` | ✅ |
| `local_shipping` | `Truck` | ✅ |
| `workspace_premium` | `Award` | ✅ |
| `download` | `Download` | ✅ |
| `chevron_left/right` | `ChevronLeft` / `ChevronRight` | ✅ |
| `more_vert` | `MoreVertical` | ✅ |
| `check_circle` | `CircleCheck` | ✅ |
| `sync` | `RefreshCw` | ✅ |
| `cancel` | `XCircle` | ✅ |
| `expand_more` | `ChevronDown` | ✅ |
| `store` | `Store` | ✅ |
| `list` | `List` | ✅ |

---

## UX Design

### Route Structure
```
/customer                → Dashboard Home
/customer/catalog        → Browse Catalog
/customer/reservations   → My Reservations
/customer/transactions   → Transaction History
/customer/settings       → Profile & Settings
```

### Layout Shell (shared across all pages)
```
┌──────────────────────────────────────────────────────┐
│ [TopBar] Search · Notifications · Avatar             │
├────────┬─────────────────────────────────────────────┤
│        │                                             │
│ [Side] │  [Page Content]                             │
│  Nav   │                                             │
│  264px │                                             │
│        │                                             │
├────────┴─────────────────────────────────────────────┤
│ [Mobile Bottom Nav] (md:hidden)                      │
└──────────────────────────────────────────────────────┘
```

---

## Files to Change

### Shared Dashboard Shell

| File | Action |
|---|---|
| `src/features/customer-dashboard/components/dashboard-sidebar.tsx` | CREATE |
| `src/features/customer-dashboard/components/dashboard-topbar.tsx` | CREATE |
| `src/features/customer-dashboard/components/dashboard-mobile-nav.tsx` | CREATE |
| `src/features/customer-dashboard/components/index.ts` | CREATE |
| `src/features/customer-dashboard/index.ts` | CREATE |

### Dashboard Home

| File | Action |
|---|---|
| `src/features/customer-dashboard/components/summary-cards.tsx` | CREATE |
| `src/features/customer-dashboard/components/recent-orders-table.tsx` | CREATE |
| `src/features/customer-dashboard/components/nearby-branches.tsx` | CREATE |

### Browse Catalog

| File | Action |
|---|---|
| `src/features/customer-dashboard/components/catalog-toolbar.tsx` | CREATE |
| `src/features/customer-dashboard/components/category-sidebar.tsx` | CREATE |
| `src/features/customer-dashboard/components/product-card.tsx` | CREATE |
| `src/features/customer-dashboard/components/pagination.tsx` | CREATE |

### Reservations

| File | Action |
|---|---|
| `src/features/customer-dashboard/components/reservation-card.tsx` | CREATE |
| `src/features/customer-dashboard/components/reservation-summary.tsx` | CREATE |

### Transactions

| File | Action |
|---|---|
| `src/features/customer-dashboard/components/transaction-filters.tsx` | CREATE |
| `src/features/customer-dashboard/components/transaction-table.tsx` | CREATE |

### Pages & Layout

| File | Action |
|---|---|
| `src/app/customer/layout.tsx` | MODIFY — replace stub with dashboard shell |
| `src/app/customer/page.tsx` | MODIFY — replace stub with Dashboard Home |
| `src/app/customer/catalog/page.tsx` | CREATE |
| `src/app/customer/reservations/page.tsx` | CREATE |
| `src/app/customer/transactions/page.tsx` | CREATE |
| `src/app/customer/settings/page.tsx` | CREATE |

### Product Images

| File | Action |
|---|---|
| `public/images/dashboard/` | CREATE — generated product images |

## NOT Building

- No functional search, filter, or pagination logic (all presentational stubs)
- No real authentication / user session
- No cart state management
- No API integration
- No Profile & Settings form logic (placeholder page only — no prototype provided)
- No dark mode adjustments beyond what theme provides automatically
- No mobile hamburger menu for sidebar

---

## Step-by-Step Tasks

### Task 1: Create Feature Slice

- **ACTION**: Create `src/features/customer-dashboard/` with barrel exports
- **IMPLEMENT**: `index.ts` and `components/index.ts` following FSD pattern
- **MIRROR**: `FEATURE_INDEX` and `BARREL_EXPORT` from `features/landing/`
- **VALIDATE**: Files exist, exports compile

### Task 2: Dashboard Sidebar

- **ACTION**: Create `dashboard-sidebar.tsx`
- **IMPLEMENT**: Fixed left sidebar (w-64, hidden on mobile) with:
  - Logo (APP_NAME) + subtitle
  - Nav items: Home, Browse Catalog, My Reservations, Transaction History, Profile & Settings
  - Active state: `bg-primary text-primary-foreground rounded-lg font-bold`
  - Inactive: `text-muted-foreground hover:bg-accent`
  - Accept `activePath` prop to highlight current route
  - Icons: `LayoutDashboard`, `Store`, `Bookmark`, `Receipt`, `Settings`
- **IMPORTS**: `Link`, Lucide icons, `APP_NAME` from `@/config`
- **VALIDATE**: Sidebar renders with correct active state

### Task 3: Dashboard Top Bar

- **ACTION**: Create `dashboard-topbar.tsx`
- **IMPLEMENT**: Sticky top bar with:
  - Search input (left side, max-w-md)
  - Notifications bell with red dot badge
  - User avatar circle (primary bg with User icon)
  - User name display
  - `sticky top-0 z-40 bg-background border-b border-border h-16`
- **IMPORTS**: `Search`, `Bell`, `User` from `lucide-react`, `Input` from `@/components/ui/input`
- **VALIDATE**: Top bar renders sticky above content

### Task 4: Dashboard Mobile Nav

- **ACTION**: Create `dashboard-mobile-nav.tsx`
- **IMPLEMENT**: Fixed bottom nav (md:hidden) with:
  - 4 items: Home, Browse, Reservations, Settings
  - Active item: `text-primary`, inactive: `text-muted-foreground`
  - Accept `activePath` prop
  - `fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border`
- **IMPORTS**: `Link`, Lucide icons
- **VALIDATE**: Bottom nav visible only on mobile

### Task 5: Customer Layout

- **ACTION**: Replace `src/app/customer/layout.tsx` stub
- **IMPLEMENT**: Dashboard shell layout:
  - SEO metadata
  - Sidebar (hidden md:flex, w-64, fixed left)
  - TopBar (sticky top-0)
  - Main content area (`md:ml-64 pt-16 pb-20 md:pb-0`)
  - Mobile bottom nav
- **IMPORTS**: `DashboardSidebar`, `DashboardTopbar`, `DashboardMobileNav` from `@/features/customer-dashboard`
- **GOTCHA**: Use `"use client"` since we need `usePathname()` for active nav state
- **VALIDATE**: Layout renders shell, children appear in main area

### Task 6: Summary Cards Component

- **ACTION**: Create `summary-cards.tsx`
- **IMPLEMENT**: 3-column grid of stat cards:
  - Total Orders (ShoppingBag icon, accent bg) → "42"
  - Active Reservations (Calendar icon, amber bg) → "3"
  - Loyalty Points (Award icon, amber-100 bg) → "1,250"
  - Each: `bg-card border border-border p-6 rounded-lg shadow-sm flex items-center gap-6`
- **IMPORTS**: `ShoppingBag`, `Calendar`, `Award` from `lucide-react`
- **VALIDATE**: 3 cards render in grid

### Task 7: Recent Orders Table

- **ACTION**: Create `recent-orders-table.tsx`
- **IMPLEMENT**: Card with table:
  - Header row: "Recent Orders" + "View All" link
  - Table columns: Order ID (mono font), Date, Total (bold), Status (badge)
  - Status badges: "Ready for Pickup" (primary bg), "Completed" (secondary bg), "Pending" (amber bg)
  - 3 demo rows from prototype
  - Hover row: `hover:bg-muted/50 transition-colors`
- **IMPORTS**: None (pure JSX)
- **VALIDATE**: Table renders with 3 rows and status badges

### Task 8: Nearby Branches Card

- **ACTION**: Create `nearby-branches.tsx`
- **IMPLEMENT**: Card with branch list:
  - Header: "Nearby Branches" + MapPin icon
  - 3 branch items with Store icon, name, address, open/closed status
  - Open: green dot + "Open Now", Closed: red dot + "Closed • Opens 8 AM"
  - Each separated by `border-b border-border`
- **IMPORTS**: `MapPin`, `Store` from `lucide-react`
- **VALIDATE**: 3 branches render with correct status indicators

### Task 9: Dashboard Home Page

- **ACTION**: Replace `src/app/customer/page.tsx` stub
- **IMPLEMENT**: Assemble:
  - Welcome header: "Hello, Alex Rivera!" + subtitle
  - `<SummaryCards />`
  - 2-col grid (lg:grid-cols-3): Recent Orders (col-span-2) + Nearby Branches (col-span-1)
- **IMPORTS**: All home components from `@/features/customer-dashboard`
- **VALIDATE**: Home page renders at `/customer`

### Task 10: Catalog Toolbar

- **ACTION**: Create `catalog-toolbar.tsx`
- **IMPLEMENT**: Secondary toolbar with:
  - Branch selector (MapPin icon + "Branch: Santa Maria Bulacan" + ChevronDown)
  - Product count text
  - Grid/List view toggle buttons
  - `bg-muted border-b border-border px-4 py-3`
- **IMPORTS**: `MapPin`, `ChevronDown`, `Grid3X3`, `List` from `lucide-react`
- **VALIDATE**: Toolbar renders with branch selector and view toggle

### Task 11: Category Sidebar

- **ACTION**: Create `category-sidebar.tsx`
- **IMPLEMENT**: Filter sidebar (w-56) with:
  - "CATEGORIES" heading (uppercase, tracking-widest)
  - Category buttons: All Products (active: `bg-accent text-primary font-bold`), Grains, Produce, Canned Goods, Dairy
  - Each with item count badge
  - "AVAILABILITY" section with checkboxes: "In Stock Only" (checked), "Fast Delivery"
  - Sections separated by `border-t border-border`
- **IMPORTS**: None (pure JSX with checkboxes)
- **VALIDATE**: Filter sidebar renders with active category

### Task 12: Product Card

- **ACTION**: Create `product-card.tsx`
- **IMPLEMENT**: Reusable product card with props:
  - `aspect-square` image container with stock badge
  - In Stock: green badge, Low Stock: orange badge, Out of Stock: grayscale + overlay
  - Card body: category label, product name, weight/source, price (₱)
  - CTA: "Add to Cart" (primary) or "Notify Me" (disabled, muted)
  - Hover: `hover:shadow-md hover:-translate-y-1 transition-all`
- **IMPORTS**: `Image` from `next/image`, `ShoppingCart`, `Bell` from `lucide-react`, `Button`
- **VALIDATE**: Card renders with all states (in stock, low stock, out of stock)

### Task 13: Pagination Component

- **ACTION**: Create `pagination.tsx`
- **IMPLEMENT**: Reusable pagination bar:
  - Prev/Next arrow buttons
  - Page number buttons (active: `bg-primary text-primary-foreground`)
  - Ellipsis indicator
  - All presentational — no state logic
- **IMPORTS**: `ChevronLeft`, `ChevronRight` from `lucide-react`
- **VALIDATE**: Pagination renders with active page highlighted

### Task 14: Browse Catalog Page

- **ACTION**: Create `src/app/customer/catalog/page.tsx`
- **IMPLEMENT**: Assemble:
  - `<CatalogToolbar />`
  - Flex row: `<CategorySidebar />` (hidden on mobile) + product grid
  - Product grid: 8 demo products in `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
  - `<Pagination />` below grid
  - FAB cart button (fixed bottom-right, primary circle with badge)
- **IMPORTS**: All catalog components from `@/features/customer-dashboard`
- **GOTCHA**: Generate product images for the catalog
- **VALIDATE**: Catalog page renders at `/customer/catalog`

### Task 15: Reservation Card

- **ACTION**: Create `reservation-card.tsx`
- **IMPLEMENT**: Two variants:
  - **Featured** (wide, image+content side-by-side): status badge, reservation ID, title, metadata grid (date, location, items, shipping), Details button
  - **Compact** (card only): status badge, ID, title, description, expected date, Details button
  - Props: `variant: "featured" | "compact"`, reservation data
- **IMPORTS**: `Calendar`, `MapPin`, `Package`, `Truck`, `MoreVertical` from `lucide-react`, `Button`, `Image`
- **VALIDATE**: Both variants render correctly

### Task 16: Reservation Summary

- **ACTION**: Create `reservation-summary.tsx`
- **IMPLEMENT**: Sidebar with 2 cards:
  - Quick Action card (primary bg): heading, description, "Extend Rental" button (white)
  - Summary stats card: Active (1), Processing (2), Completed (12) in mono font
- **IMPORTS**: `Button`
- **VALIDATE**: Both cards render with correct styling

### Task 17: My Reservations Page

- **ACTION**: Create `src/app/customer/reservations/page.tsx`
- **IMPLEMENT**: Assemble:
  - Page header: "My Reservations" + subtitle
  - Tab filters: All, Processing, Ready, Completed (presentational)
  - Bento grid (lg:grid-cols-12):
    - Featured card (col-span-8) + Summary sidebar (col-span-4)
    - 2 compact cards (col-span-6 each)
    - Past reservations table (col-span-12)
- **IMPORTS**: `ReservationCard`, `ReservationSummary` from `@/features/customer-dashboard`
- **VALIDATE**: Page renders at `/customer/reservations`

### Task 18: Transaction Filters

- **ACTION**: Create `transaction-filters.tsx`
- **IMPLEMENT**: 4-column bento grid:
  - Search input (col-span-2) with Search icon
  - Date Range select dropdown
  - Status select dropdown
  - Each in `bg-card border border-border rounded-xl p-4 shadow-sm`
- **IMPORTS**: `Search` from `lucide-react`
- **VALIDATE**: Filter grid renders with all inputs

### Task 19: Transaction Table

- **ACTION**: Create `transaction-table.tsx`
- **IMPLEMENT**: Card with data table:
  - Columns: Order ID (mono, primary), Date, Branch, Method (badge), Total (mono), Status (icon+text), Action (chevron)
  - Method badges: Pickup (accent bg), Delivery (amber bg)
  - Status: Completed (primary+CircleCheck), Processing (amber+RefreshCw), Cancelled (destructive+XCircle)
  - 4 demo rows from prototype
  - Footer: "Showing 4 of 24" + pagination buttons
- **IMPORTS**: `ShoppingBag`, `Truck`, `CircleCheck`, `RefreshCw`, `XCircle`, `ChevronRight`, `ChevronLeft` from `lucide-react`
- **VALIDATE**: Table renders with all status variants

### Task 20: Transaction History Page

- **ACTION**: Create `src/app/customer/transactions/page.tsx`
- **IMPLEMENT**: Assemble:
  - Page header: "Transaction History" + subtitle + Export PDF button
  - `<TransactionFilters />`
  - `<TransactionTable />`
- **IMPORTS**: `Download` from `lucide-react`, `Button`, transaction components
- **VALIDATE**: Page renders at `/customer/transactions`

### Task 21: Profile & Settings Page

- **ACTION**: Create `src/app/customer/settings/page.tsx`
- **IMPLEMENT**: Placeholder page (no prototype provided):
  - Page header: "Profile & Settings"
  - Stub card: "Profile settings coming soon" with Settings icon
- **IMPORTS**: `Settings` from `lucide-react`
- **VALIDATE**: Page renders at `/customer/settings`

### Task 22: Generate Product Images

- **ACTION**: Use `generate_image` tool to create product images for the catalog
- **IMPLEMENT**: Save to `public/images/dashboard/`
- **VALIDATE**: All images load in browser

### Task 23: Update Barrel Exports

- **ACTION**: Ensure all components are exported from `features/customer-dashboard/components/index.ts`
- **VALIDATE**: All imports resolve correctly

---

## Testing Strategy

### Static Analysis
```bash
pnpm lint
```
EXPECT: Zero errors

### Type Check
```bash
pnpm typecheck
```
EXPECT: Zero type errors

### Build
```bash
pnpm build
```
EXPECT: All `/customer/*` routes build successfully

### Browser Validation
- [ ] `/customer` → Dashboard Home with summary cards, orders table, branches
- [ ] `/customer/catalog` → Product grid with sidebar filters
- [ ] `/customer/reservations` → Bento grid with reservation cards
- [ ] `/customer/transactions` → Filter grid + data table
- [ ] `/customer/settings` → Placeholder page
- [ ] Sidebar active state highlights correct page
- [ ] Mobile bottom nav visible on small screens
- [ ] Sidebar hidden on mobile

---

## Acceptance Criteria

- [ ] All 23 tasks completed
- [ ] All validation commands pass (`lint`, `typecheck`, `build`)
- [ ] 5 customer routes render correctly
- [ ] Dashboard shell (sidebar + topbar + mobile nav) works
- [ ] Uses existing BentaHub theme tokens — no `globals.css` changes
- [ ] Follows FSD architecture (`features/customer-dashboard/`)
- [ ] All Lucide icons verified available

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| XL scope takes long to implement | High | Medium | Implement in order, validate incrementally |
| Generated product images don't match prototype | Medium | Low | Can regenerate or reuse landing images |
| Route conflicts with existing customer stub | Low | Low | We're replacing the stub, not adding alongside |
