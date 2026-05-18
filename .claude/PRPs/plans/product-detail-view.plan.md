# Plan: Product Detail View Page

## Summary
Build a new product detail view page at `/customer/catalog/[id]` that shows a full product page with image gallery, pricing (retail + bulk), quantity selector, description, technical specifications, pickup CTA, and related products. This is a new dynamic route under the existing catalog section.

## User Story
As a BentaHub customer, I want to view detailed product information including images, pricing tiers, and specifications, so that I can make informed purchasing decisions before adding items to my reservation.

## Problem → Solution
Currently the catalog only shows a grid of product cards with minimal info → Build a detailed product page that customers can click through to, showing the full product experience with gallery, pricing breakdown, specs, and related products.

## Metadata
- **Complexity**: Medium
- **Source PRD**: N/A (Prototype-driven)
- **PRD Phase**: N/A
- **Estimated Files**: 10

---

## UX Design

### After (Prototype)
```
┌──────────────────────────────────────────────────────┐
│ Catalog > Pantry Essentials > Del Monte Tomato Sauce │  ← Breadcrumb
├──────────────────────────┬───────────────────────────┤
│                          │ Del Monte Tomato Sauce  ♡ │
│   [Main Product Image]   │                           │
│   "Bestseller" badge     │ ┌─ Pricing Card ────────┐ │
│                          │ │ Retail: ₱45.50  ̶₱̶4̶8̶   │ │
│ [Thumb1][Thumb2]         │ │ Bulk: ₱41.25/unit     │ │
│ [Thumb3][Video]          │ └───────────────────────┘ │
│                          │                           │
│                          │ Qty: [-][1][+] [Add Res.] │
│                          │                           │
│                          │ [SKU: DMT-250G] [✓ Avail] │
├──────────────────────────┴───────────────────────────┤
│ ┌─ Description ─────────────┐ ┌─ Fast Pick-up ─────┐│
│ │ Del Monte Tomato Sauce... │ │ Reserve & pick up   ││
│ │ ✓ No Preservatives        │ │ within 2 hours.     ││
│ │ ✓ Rich in Vitamin A & C   │ │ [Select Store]      ││
│ └───────────────────────────┘ └─────────────────────┘│
│ ┌─ Technical Specs ─────────┐ ┌─ Related Products ──┐│
│ │ Weight: 250g Pouch        │ │ Datu Puti  ₱32.00   ││
│ │ Exp: 12 Months            │ │ Palm Oil   ₱68.50   ││
│ │ Origin: Philippines       │ │ Salt       ₱15.00   ││
│ │ Storage: Cool, Dry Place  │ │ [View All Staples]  ││
│ └───────────────────────────┘ └─────────────────────┘│
└──────────────────────────────────────────────────────┘
```

### Interaction Changes
| Touchpoint | Before | After | Notes |
|---|---|---|---|
| ProductCard click | No navigation | Navigates to `/customer/catalog/[id]` | Link wraps card |
| Breadcrumb | Not present | Shows Catalog > Category > Product | Clickable navigation |
| Image Gallery | N/A | Main image + 4 thumbnails (click to switch) | Interactive gallery |
| Quantity Selector | N/A | -, input, + controls | Clamped 1-99 |
| Add to Reservation | "Add to Cart" on card | Full "Add to Reservation" button | Stub handler |
| Favorite | N/A | Heart icon toggle | Stub state |

---

## Mandatory Reading

| Priority | File | Lines | Why |
|---|---|---|---|
| P0 | `src/app/customer/catalog/page.tsx` | all | Catalog page with product data structure |
| P0 | `src/features/customer-dashboard/components/product-card.tsx` | all | ProductCardProps interface, existing card pattern |
| P0 | `src/app/customer/layout.tsx` | all | Customer layout with sidebar/topbar shell |
| P1 | `src/features/customer-dashboard/components/index.ts` | all | Barrel exports to update |
| P1 | `src/features/customer-dashboard/components/reservation-card.tsx` | all | Card component pattern with variants |
| P2 | `src/components/ui/button.tsx` | all | Button component API |
| P2 | `src/components/ui/card.tsx` | all | Card component API |

---

## Patterns to Mirror

### COMPONENT_EXPORT
```tsx
// SOURCE: src/features/customer-dashboard/components/product-card.tsx:1-17
"use client"
import Image from "next/image"
import { ShoppingCart, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ProductCardProps {
  id: string
  name: string
  // ...
}
```

### BARREL_EXPORT
```tsx
// SOURCE: src/features/customer-dashboard/components/index.ts:7-20
export * from "./dashboard-sidebar"
export * from "./product-card"
// ...
```

### PAGE_STRUCTURE
```tsx
// SOURCE: src/app/customer/catalog/page.tsx:1-12
"use client"
import { CatalogToolbar, CategorySidebar, ProductCard, Pagination } from "@/features/customer-dashboard"
import { ShoppingCart } from "lucide-react"
import type { ProductCardProps } from "@/features/customer-dashboard/components/product-card"

export default function CatalogPage() {
  // Demo products
  const products: ProductCardProps[] = [...]
```

### CARD_STYLING
```tsx
// SOURCE: src/features/customer-dashboard/components/product-card.tsx:31-35
<div className={cn(
  "group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all",
)}>
```

### IMAGE_PATTERN
```tsx
// SOURCE: src/features/customer-dashboard/components/product-card.tsx:38-47
<Image
  src={image}
  alt={name}
  fill
  className="object-cover transition-transform group-hover:scale-105"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
/>
```

### STATUS_BADGE
```tsx
// SOURCE: src/features/customer-dashboard/components/product-card.tsx:51-54
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
  In Stock
</span>
```

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `src/app/customer/catalog/[id]/page.tsx` | CREATE | Dynamic route for product detail view |
| `src/features/customer-dashboard/components/product-breadcrumb.tsx` | CREATE | Breadcrumb navigation component |
| `src/features/customer-dashboard/components/product-image-gallery.tsx` | CREATE | Main image + thumbnail gallery |
| `src/features/customer-dashboard/components/product-pricing.tsx` | CREATE | Retail + bulk pricing card |
| `src/features/customer-dashboard/components/product-actions.tsx` | CREATE | Quantity selector + Add to Reservation + info cards |
| `src/features/customer-dashboard/components/product-details-section.tsx` | CREATE | Description + Technical Specs cards |
| `src/features/customer-dashboard/components/product-sidebar-section.tsx` | CREATE | Fast Pick-up CTA + Related Products |
| `src/features/customer-dashboard/components/index.ts` | UPDATE | Add new component exports |
| `src/features/customer-dashboard/components/product-card.tsx` | UPDATE | Wrap card in Link to `/customer/catalog/[id]` |

## NOT Building
- Backend API or data fetching (all data is hardcoded/demo)
- Cart/reservation state management
- Favorite/wishlist persistence
- Real image gallery with zoom
- Video player functionality
- Any changes to `globals.css`

---

## Step-by-Step Tasks

### Task 1: Create ProductBreadcrumb component
- **ACTION**: Create `product-breadcrumb.tsx` in the customer-dashboard components directory.
- **IMPLEMENT**: A breadcrumb nav showing `Catalog > [Category] > [Product Name]`. The "Catalog" link points to `/customer/catalog`. The category is a plain span. The product name is the current page (no link). Use `ChevronRight` from lucide-react as separators. Style with `text-xs uppercase tracking-wider text-muted-foreground`.
- **MIRROR**: COMPONENT_EXPORT pattern.
- **IMPORTS**: `Link` from next/link, `ChevronRight` from lucide-react.
- **GOTCHA**: Use `font-medium` on the last breadcrumb item (product name) and `text-foreground` to show it's the current page.
- **VALIDATE**: Component renders with proper breadcrumb trail.

### Task 2: Create ProductImageGallery component
- **ACTION**: Create `product-image-gallery.tsx` in the customer-dashboard components directory.
- **IMPLEMENT**: Left section (7 cols on desktop). A main image container with aspect-video on lg, aspect-square on mobile. A "Bestseller" badge in the top-left corner. Below the main image, a 4-column grid of thumbnail slots. The first 3 are image thumbnails (use the same product image for demo), the 4th is a "Video" placeholder with a `Video` icon. Clicking a thumbnail sets it as the main image (useState). Active thumbnail has `border-2 border-primary`, others have `border border-border`.
- **MIRROR**: IMAGE_PATTERN, CARD_STYLING.
- **IMPORTS**: `Image` from next/image, `Video` from lucide-react, `cn` from @/lib/utils, `useState` from react.
- **GOTCHA**: Use `relative` positioning on the main image container for the badge overlay. Use `object-cover` for all images.
- **VALIDATE**: Gallery renders with clickable thumbnails that swap the main image.

### Task 3: Create ProductPricing component
- **ACTION**: Create `product-pricing.tsx` in the customer-dashboard components directory.
- **IMPLEMENT**: A card showing two pricing tiers. Top section: "Retail Price" label, the price (e.g., `₱45.50`) with a strikethrough original price and a "Save 5%" accent badge. Bottom section: "Bulk / Wholesale (Min. 12 units)" with a "Most Popular" label, a highlighted inner card showing the per-unit bulk price and total case price. Use `bg-muted` with `border border-border rounded-xl` for the outer container and `bg-card border border-primary rounded-lg` for the bulk highlight.
- **MIRROR**: CARD_STYLING.
- **IMPORTS**: `cn` from @/lib/utils.
- **GOTCHA**: The "Save 5%" badge uses `bg-accent text-primary` styling. The border between retail and bulk sections uses `border-b border-border`.
- **VALIDATE**: Pricing card renders with both tiers clearly visible.

### Task 4: Create ProductActions component
- **ACTION**: Create `product-actions.tsx` in the customer-dashboard components directory.
- **IMPLEMENT**: Contains the quantity selector and info cards. Quantity selector: a flex row with `-` button, numeric input (w-16, centered, font-mono), `+` button, and a full-width "Add to Reservation" button. Below: a 2-column grid with SKU info card (icon + label + value) and Status info card. Use `useState` for quantity, clamped between 1-99. The stock count is shown as a label above the quantity selector.
- **MIRROR**: COMPONENT_EXPORT pattern.
- **IMPORTS**: `Button` from @/components/ui/button, `Minus`, `Plus`, `ShoppingBasket`, `Package`, `ShieldCheck` from lucide-react, `useState` from react, `Input` from @/components/ui/input.
- **GOTCHA**: The `-`/`+` buttons should be styled with `border border-border` and `hover:bg-muted`. The "Add to Reservation" button uses `bg-primary text-primary-foreground`. Don't use the `<Input>` component for the number input — use a plain `<input type="number">` with tailwind classes for the centered mono styling.
- **VALIDATE**: Quantity increments/decrements correctly, clamped to 1-99.

### Task 5: Create ProductDetailsSection component
- **ACTION**: Create `product-details-section.tsx` in the customer-dashboard components directory.
- **IMPLEMENT**: Two cards stacked vertically. Card 1 — "Description": A paragraph of product description text, followed by a 2-column grid of feature checkmarks (each with a `CheckCircle` icon + text). Card 2 — "Technical Specifications": A table-like list with rows showing label-value pairs (Weight, Exp.Date, Brand Origin, Storage), each separated by `border-b border-border`.
- **MIRROR**: CARD_STYLING.
- **IMPORTS**: `CheckCircle` from lucide-react, `Card` from @/components/ui/card.
- **GOTCHA**: Use `text-muted-foreground` for spec labels and `font-mono text-sm` for spec values.
- **VALIDATE**: Both cards render with proper content and formatting.

### Task 6: Create ProductSidebarSection component
- **ACTION**: Create `product-sidebar-section.tsx` in the customer-dashboard components directory.
- **IMPLEMENT**: Two cards stacked vertically. Card 1 — "Fast Pick-up": A CTA card with `bg-primary text-primary-foreground` styling, a `Truck` icon, heading, description text, and a "Select Store" button (`bg-background text-primary`). Card 2 — "Related Products": A list of 3 related product items, each showing a 64x64 thumbnail, product name, and price. At the bottom, a "View All Staples" outline button.
- **MIRROR**: CARD_STYLING, IMAGE_PATTERN.
- **IMPORTS**: `Image` from next/image, `Truck` from lucide-react, `Button` from @/components/ui/button.
- **GOTCHA**: Related product thumbnails use `w-16 h-16 rounded-lg bg-muted` container. The CTA card uses `rounded-xl shadow-md` with `p-6`.
- **VALIDATE**: Both cards render. Related products show name and price.

### Task 7: Create the Product Detail Page
- **ACTION**: Create `src/app/customer/catalog/[id]/page.tsx` — the dynamic route page.
- **IMPLEMENT**: A `"use client"` page component that accepts `params` with `id`. Contains hardcoded demo product data (using "Del Monte Tomato Sauce" as the default). Assembles the page layout:
  1. `ProductBreadcrumb` at top
  2. A 12-column grid: `ProductImageGallery` (col-span-7) + right side column (col-span-5) containing product name/favorite, `ProductPricing`, and `ProductActions`
  3. Below: A 3-column grid: `ProductDetailsSection` (col-span-2) + `ProductSidebarSection` (col-span-1)
  
  The product name and favorite icon are rendered directly in the page (not a separate component) using `text-2xl font-semibold` for the title and a `Heart` icon button.
- **MIRROR**: PAGE_STRUCTURE.
- **IMPORTS**: All new components from `@/features/customer-dashboard`, `Heart` from lucide-react.
- **GOTCHA**: The page must be a client component (`"use client"`) since child components use `useState`. Use `gap-6` or `gap-8` between major sections. On mobile, the grid collapses to single column.
- **VALIDATE**: Page renders at `/customer/catalog/1` with all sections visible.

### Task 8: Update ProductCard to link to detail page
- **ACTION**: Modify `product-card.tsx` to make the card clickable, navigating to `/customer/catalog/[id]`.
- **IMPLEMENT**: Wrap the entire card `<div>` in a Next.js `<Link>` component pointing to `/customer/catalog/${id}`. Add `id` to the destructured props. Keep the existing card structure inside the Link.
- **MIRROR**: Existing Link usage in `dashboard-sidebar.tsx`.
- **IMPORTS**: Add `Link` from next/link.
- **GOTCHA**: The "Add to Cart" and "Notify Me" buttons inside the card need `e.preventDefault()` and `e.stopPropagation()` to prevent the Link navigation when clicked. Or alternatively, make only the image/name a link instead of wrapping everything. Since the prototype shows the whole card as clickable, wrap the card in Link but add `onClick` handlers on the buttons.
- **VALIDATE**: Clicking a product card navigates to its detail page. Clicking the button does not navigate.

### Task 9: Update barrel exports
- **ACTION**: Add the 6 new component exports to `src/features/customer-dashboard/components/index.ts`.
- **IMPLEMENT**: Add `export * from "./product-breadcrumb"`, `export * from "./product-image-gallery"`, `export * from "./product-pricing"`, `export * from "./product-actions"`, `export * from "./product-details-section"`, `export * from "./product-sidebar-section"`.
- **MIRROR**: BARREL_EXPORT pattern.
- **IMPORTS**: N/A.
- **GOTCHA**: Maintain alphabetical grouping — add after existing product-card export.
- **VALIDATE**: All components importable from `@/features/customer-dashboard`.

### Task 10: Verify build
- **ACTION**: Run `pnpm build` to ensure zero errors.
- **IMPLEMENT**: N/A.
- **IMPORTS**: N/A.
- **GOTCHA**: The dynamic route `[id]` needs `generateStaticParams` for static export, OR we can keep it as a client component which will work fine with Turbopack dev. For the build to work with static generation, we may need to add `export const dynamic = "force-static"` or add `generateStaticParams`.
- **VALIDATE**: Build exits with code 0. The `/customer/catalog/[id]` route is listed.

---

## Testing Strategy

### Manual Verification
- [ ] Navigate to `/customer/catalog/1` — full page renders
- [ ] Breadcrumb shows: Catalog > Pantry Essentials > Del Monte Tomato Sauce
- [ ] Main image displays, thumbnails are clickable and swap the main image
- [ ] Pricing shows retail (₱45.50) and bulk (₱41.25/unit) tiers
- [ ] Quantity selector increments/decrements, clamped to 1-99
- [ ] "Add to Reservation" button is present and styled
- [ ] SKU and Status info cards are visible
- [ ] Description card shows text + feature checkmarks
- [ ] Technical Specifications table shows 4 rows
- [ ] Fast Pick-up CTA card renders with primary background
- [ ] Related Products shows 3 items with thumbnails
- [ ] Clicking a ProductCard on `/customer/catalog` navigates to the detail page
- [ ] Mobile layout: all sections stack vertically
- [ ] Back navigation works via breadcrumb "Catalog" link

---

## Validation Commands

### Build
```bash
pnpm build
```
EXPECT: Zero errors, `/customer/catalog/[id]` route listed.

### Dev Server
```bash
pnpm dev
```
EXPECT: Page renders at `localhost:3000/customer/catalog/1`.

---

## Acceptance Criteria
- [ ] All 10 tasks completed
- [ ] Build passes with zero errors
- [ ] Product detail page matches prototype layout
- [ ] Image gallery is interactive (thumbnail switching)
- [ ] Quantity selector works correctly
- [ ] ProductCard links to detail page
- [ ] FSD architecture maintained (components in feature slice)
- [ ] `globals.css` NOT modified
- [ ] All components use existing theme tokens

## Completion Checklist
- [ ] Code follows discovered patterns (CARD_STYLING, IMAGE_PATTERN, etc.)
- [ ] No hardcoded color values (uses theme variables via Tailwind)
- [ ] No unnecessary scope additions
- [ ] Self-contained — no questions needed during implementation

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Dynamic route build issues | Medium | Medium | Add `generateStaticParams` or `force-dynamic` |
| ProductCard Link breaks button clicks | Medium | Low | Use `e.stopPropagation()` on buttons |
| Image paths for thumbnails | Low | Low | Reuse existing product image for demo |

## Notes
- The prototype uses Material Symbols icons — we use `lucide-react` per project convention.
- All product data is hardcoded for demo purposes — no backend integration.
- The "Video" thumbnail slot is a placeholder only — no video player is built.
- The existing `tomato-sauce.png` image in `/images/dashboard/` will be reused for the main product image.
- Related product images can reuse existing dashboard product images.
