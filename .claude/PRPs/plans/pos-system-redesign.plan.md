# Plan: POS System — Cashier Dashboard Redesign

## Summary
Redesign the existing Cashier POS system components to match the stitch.ai reference design while preserving the established FSD architecture, Tailwind-based theming, and responsive layout patterns. The work involves visual upgrades to 5 existing components (product-catalog, product-card, cart-sidebar, cart-item, cashier-topbar) plus alignment of the cashier layout and page composition — all without touching `globals.css`.

## User Story
As a **Cashier operator**,
I want a **premium, polished POS interface matching our approved stitch.ai design**,
So that **I can efficiently process sales with a visually consistent, modern, and responsive UI that matches BentaHub's brand identity**.

## Problem → Solution
**Current state**: The POS components work functionally but use generic `slate-*` / `blue-600` hardcoded colors with inconsistent spacing, smaller type, and no design-system alignment to the stitch.ai reference. The cart sidebar width, product card style, search bar, category pills, checkout panel, and topbar styling all diverge from the approved design spec.

**Desired state**: All POS components pixel-closely match the stitch.ai reference design — using the project's existing Tailwind theme tokens, Poppins/JetBrains Mono fonts, and `cn()` utility — while maintaining full mobile responsiveness and FSD domain boundaries.

## Metadata
- **Complexity**: Medium
- **Source PRD**: stitch.ai HTML reference (provided inline by user)
- **PRD Phase**: N/A
- **Estimated Files**: 7 files modified, 0 new, 0 deleted

---

## UX Design

### Before
```
┌─────────────────────────────────────────────────────────────────┐
│ [Sidebar 280px][                Topbar (80px)                 ] │
│ [bg-[#0c1221] ][ h1.text-xl "POS System"  | Bell | RL avatar ] │
│ [             ]├─────────────────────────┬───────────────────────│
│ [             ]│ Product Catalog         │ Cart Sidebar (360px)  │
│ [             ]│ ┌─ Search ─────────────┐│ Orders header         │
│ [             ]│ │ text-sm input        ││ Cart items list       │
│ [             ]│ └──────────────────────┘│ ┌─ Checkout panel ──┐ │
│ [             ]│ [All][Groceries][...]   ││ │ Subtotal/Discount │ │
│ [             ]│ 5col grid, rounded-xl   ││ │ Cash | GCash toggle│ │
│ [             ]│ product cards, text-xs  ││ │ Amount Paid input  │ │
│ [             ]│                         ││ │ COMPLETE SALE btn  │ │
│ [             ]│                         ││ └──────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
  Generic slate palette, small text, rounded-xl cards
```

### After (stitch.ai reference)
```
┌─────────────────────────────────────────────────────────────────┐
│ [Sidebar 280px][         TopAppBar (80px)                     ] │
│ [bg-[#0c1221] ][ h1.headline-md "POS System" | Bell | RL pill] │
│ [             ]├─────────────────────────┬───────────────────────│
│ [             ]│ Product Catalog         │ Cart Sidebar (w-96)   │
│ [             ]│ bg-background           │ bg-white              │
│ [             ]│ ┌─ Search (rounded-xl)─┐│ "Orders" header       │
│ [             ]│ │ body-sm, primary icon ││ Cart items list       │
│ [             ]│ └──────────────────────┘│ ┌─ Checkout section ─┐│
│ [             ]│ [All●][Groceries][...]  ││ │ Subtotal/Discount  ││
│ [             ]│ rounded-full pills     ││ │ Total: ₱ 3xl bold  ││
│ [             ]│ ┌─ rounded-2xl cards ──┐││ │ Cash | GCash grid  ││
│ [             ]│ │ aspect-square image  │││ │ Amount Paid (3xl)  ││
│ [             ]│ │ stock badge overlay  │││ │ Change Due         ││
│ [             ]│ │ name body-sm bold    │││ │ COMPLETE SALE btn  ││
│ [             ]│ │ price primary mono lg│││ │ rounded-2xl, bold  ││
│ [             ]│ └──────────────────────┘│└──────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
  Design-system tokens, primary brand colors, larger type hierarchy,
  rounded-2xl, shadow-primary, backdrop-blur, premium aesthetic
```

### Interaction Changes
| Touchpoint | Before | After | Notes |
|---|---|---|---|
| Search bar | `rounded-xl`, `text-sm`, `slate-*` | `rounded-xl`, `body-sm`, `outline-variant` border, primary-focused icon | Matches design language |
| Category pills | `rounded-full`, `bg-blue-600` | `rounded-full`, `bg-primary text-on-primary`, primary-hover border | Theme-token aligned |
| Product cards | `rounded-xl p-3`, `text-xs`, `blue-600` | `rounded-2xl p-sm`, `body-sm`, scaled-105 hover, `primary` price | Larger, more premium feel |
| Stock badges | `bg-emerald-500/90` etc. | `bg-green-500/90`, `bg-orange-500/90`, `bg-red-500/90` | Matches spec exactly |
| Cart sidebar | `w-[360px]`, `slate-50` bg | `w-96`, `bg-white`, `shadow-[-10px_0_30px_...]` | Matches design width/shadow |
| Total amount | `text-lg font-black` | `text-3xl font-black font-mono` | Much larger visual weight |
| Payment toggles | `grid-cols-2 gap-2 rounded-xl` | `grid-cols-2 rounded-2xl`, column flex with icon+label | Icon-above-label layout |
| Amount input | `text-xl font-black` | `text-3xl font-black font-mono` | Larger, monospace display |
| Complete Sale btn | `py-3 rounded-xl text-xs` | `py-md rounded-2xl body-md`, `shadow-xl shadow-primary/30` | Bigger, more prominent |
| Topbar title | `text-xl font-bold` | `text-2xl font-bold` (headline-md feel) | Larger heading |
| Cart header | "Current Orders" | "Orders" | Simplified label |

---

## Mandatory Reading

Files that MUST be read before implementing:

| Priority | File | Lines | Why |
|---|---|---|---|
| P0 (critical) | `src/features/cashier-dashboard/components/cart-sidebar.tsx` | all | Primary redesign target — checkout panel |
| P0 (critical) | `src/features/cashier-dashboard/components/product-catalog.tsx` | all | Search bar + category filter redesign |
| P0 (critical) | `src/features/cashier-dashboard/components/product-card.tsx` | all | Card visual redesign |
| P1 (important) | `src/features/cashier-dashboard/components/cart-item.tsx` | all | Cart row redesign |
| P1 (important) | `src/features/cashier-dashboard/components/cashier-topbar.tsx` | all | Header redesign |
| P1 (important) | `src/app/cashier/page.tsx` | all | Page composition / cart width |
| P1 (important) | `src/app/cashier/layout.tsx` | all | Layout shell |
| P2 (reference) | `src/types/cashier.ts` | all | Type contracts |
| P2 (reference) | `src/features/cashier-dashboard/hooks/use-cart.ts` | all | Cart state API |
| P2 (reference) | `src/app/globals.css` | all | Theme tokens (DO NOT MODIFY) |
| P2 (reference) | `src/lib/utils.ts` | all | cn() utility |

## External Documentation

| Topic | Source | Key Takeaway |
|---|---|---|
| stitch.ai reference HTML | User-provided inline | Authoritative design spec for all visual changes |

---

## Patterns to Mirror

Code patterns discovered in the codebase. Follow these exactly.

### NAMING_CONVENTION
```tsx
// SOURCE: src/features/cashier-dashboard/components/product-card.tsx:1-9
// Component: PascalCase, file: kebab-case, exports: named
export function ProductCard({ product, onAdd, disabled }: ProductCardProps) {
```

### CN_UTILITY
```tsx
// SOURCE: src/features/cashier-dashboard/components/cashier-sidebar.tsx:78-83
// Always use cn() for conditional class merging
className={cn(
  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
  isActive
    ? "bg-blue-600/20 text-white font-semibold border-l-4 border-blue-600"
    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
)}
```

### COMPONENT_STRUCTURE
```tsx
// SOURCE: src/features/cashier-dashboard/components/cart-sidebar.tsx:1-12
// "use client" directive, imports at top, interface, named export function
"use client"

import { useEffect, useState, useCallback } from "react"
import { ShoppingCart, QrCode, Coins, CheckCircle, Percent, X } from "lucide-react"
import { CartItem } from "./cart-item"
import { cn } from "@/lib/utils"
import type { UseCartReturn } from "../hooks/use-cart"

interface CartSidebarProps {
  cart: UseCartReturn
  onClose?: () => void
}

export function CartSidebar({ cart, onClose }: CartSidebarProps) {
```

### IMAGE_RENDERING
```tsx
// SOURCE: src/features/cashier-dashboard/components/product-card.tsx:28-34
// eslint-disable comment for img tag, object-cover, transition-transform
{product.image ? (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
  />
) : (
  <Package className="w-12 h-12 text-slate-400 opacity-40" />
)}
```

### KEYBOARD_SHORTCUTS
```tsx
// SOURCE: src/features/cashier-dashboard/components/cart-sidebar.tsx:56-73
// useEffect for keyboard shortcuts, cleanup on unmount
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.repeat) {
      const activeTag = document.activeElement?.tagName.toLowerCase()
      if (activeTag !== "input" && activeTag !== "textarea") {
        e.preventDefault()
        completeSale()
      }
    }
  }
  window.addEventListener("keydown", handleKeyDown)
  return () => window.removeEventListener("keydown", handleKeyDown)
}, [completeSale, clearCart])
```

### RESPONSIVE_PATTERN
```tsx
// SOURCE: src/app/cashier/page.tsx:14-40
// Mobile overlay pattern: fixed with backdrop on mobile, static on desktop
<div className={`${isCartOpen ? 'fixed inset-0 z-40 lg:static lg:inset-auto' : 'hidden lg:block'}`}>
  {isCartOpen && (
    <div onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/50 lg:hidden" />
  )}
```

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `src/features/cashier-dashboard/components/product-catalog.tsx` | UPDATE | Redesign search bar, category pills, grid columns to match stitch.ai reference |
| `src/features/cashier-dashboard/components/product-card.tsx` | UPDATE | Upgrade to `rounded-2xl`, larger text, design-aligned stock badges, primary price |
| `src/features/cashier-dashboard/components/cart-sidebar.tsx` | UPDATE | Major redesign: checkout section with new layout, 3xl amounts, icon-above-label payment toggles, prominent CTA |
| `src/features/cashier-dashboard/components/cart-item.tsx` | UPDATE | Align visual style with sidebar redesign |
| `src/features/cashier-dashboard/components/cashier-topbar.tsx` | UPDATE | Larger title, refined layout matching stitch.ai topbar |
| `src/app/cashier/page.tsx` | UPDATE | Adjust cart sidebar width class alignment |
| `src/app/cashier/layout.tsx` | UPDATE | Ensure `bg-background` consistent with design spec |

## NOT Building

- New components or pages — only restyling existing ones
- Backend / Server Action changes
- Database schema changes
- New routes or navigation links
- Dark mode variation (light only for now per reference)
- Global CSS modifications (explicitly forbidden by user)
- New npm dependencies

---

## Step-by-Step Tasks

### Task 1: Update Cashier Layout
- **ACTION**: Change layout wrapper background from `bg-slate-50` to `bg-background` for design-system alignment
- **IMPLEMENT**: Update the `<div>` wrapper className in the layout component
- **MIRROR**: COMPONENT_STRUCTURE pattern
- **IMPORTS**: No new imports needed
- **GOTCHA**: The `bg-background` token maps to `--background` CSS var from globals.css — don't add new CSS vars. Also ensure `text-slate-900` becomes `text-foreground` for consistency.
- **VALIDATE**: Layout renders with correct background color, no visual regression on sub-pages

### Task 2: Redesign Product Catalog (Search + Filters)
- **ACTION**: Restyle the search bar and category filter pills to match the stitch.ai reference
- **IMPLEMENT**:
  - Search bar: border-outline-variant styling, `rounded-xl`, focus ring `ring-primary/20`, `border-primary` on focus, `text-body-sm` placeholder
  - Category pills: `rounded-full`, active state `bg-primary text-white shadow-sm`, inactive `bg-white border border-slate-200 hover:border-primary hover:text-primary`
  - Container: `bg-background` instead of `bg-slate-50`, `p-6` padding
  - Grid: maintain `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4`
- **MIRROR**: CN_UTILITY pattern for conditional classes
- **IMPORTS**: No new imports
- **GOTCHA**: The search bar sticky behavior with `bg-background/90 backdrop-blur-md` must be preserved for scroll UX. Keep `Ctrl+K` shortcut untouched.
- **VALIDATE**: Search filters work, category switching works, responsive grid displays correctly

### Task 3: Redesign Product Card
- **ACTION**: Update product card to match stitch.ai rounded-2xl premium design with larger text
- **IMPLEMENT**:
  - Wrapper: `rounded-2xl p-3` (keep p-3 for internal spacing), `shadow-sm hover:shadow-md hover:border-primary`
  - Image container: `aspect-square rounded-xl`, image transition `group-hover:scale-105`
  - Stock badge overlay: keep existing logic, ensure badge uses `bg-green-500/90`, `bg-orange-500/90` (for low), `bg-red-500/90` (for OOS) with `text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm`
  - Product name: `font-bold text-sm text-slate-800 line-clamp-2 group-hover:text-primary`
  - Price: `text-primary font-mono text-lg font-black` (bigger than current `text-base`)
  - Remove SKU from card display (not in stitch.ai reference)
- **MIRROR**: IMAGE_RENDERING pattern, CN_UTILITY pattern
- **IMPORTS**: No new imports
- **GOTCHA**: Keep the `disabled` prop and `isOutOfStock` overlay logic. The `amber-500` for low stock should be `orange-500` per reference.
- **VALIDATE**: All stock status badges render correctly, click to add works, hover transitions smooth

### Task 4: Redesign Cart Sidebar — Header & Items
- **ACTION**: Update cart sidebar header and item list area
- **IMPLEMENT**:
  - Sidebar width: keep `w-full lg:w-[360px]` → change to `w-full lg:w-96` (384px matches `w-96` which is close to stitch.ai `w-96`)
  - Header: change title from "Current Orders" to "Orders", use cart icon from lucide, `text-lg font-bold`
  - Items area: `p-6 space-y-4` padding increase, background `bg-white` (items on white, not slate)
  - Shadow: `shadow-[-10px_0_30px_rgba(0,0,0,0.03)]` on the aside
- **MIRROR**: COMPONENT_STRUCTURE pattern
- **IMPORTS**: No new imports
- **GOTCHA**: Preserve the checkout success toast overlay and its animations. Maintain the mobile close button logic.
- **VALIDATE**: Cart header shows "Orders", sidebar shadow visible, items display cleanly

### Task 5: Redesign Cart Sidebar — Checkout Panel
- **ACTION**: Major restyle of the checkout/payment section at the bottom of cart sidebar
- **IMPLEMENT**:
  - Summary section: `bg-slate-50/80` background, clean spacing
    - Subtotal row: `text-slate-500 text-xs font-medium` left, `font-mono` right
    - Discount row: show "Discount (0%)" label with "Add Promo" as `text-primary hover:underline font-bold` button (replaces numeric input)
    - Total row: `text-base font-bold` label, `text-3xl font-black text-primary font-mono` value (massive visual weight per reference)
  - Payment toggles: `grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 gap-2`
    - Active: `flex flex-col items-center justify-center gap-1 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 py-3`
    - Inactive: `flex flex-col items-center justify-center gap-1 bg-white text-slate-500 rounded-xl font-bold hover:bg-slate-50 py-3`
    - Icon above text layout (vertical), icons `text-2xl`, label `text-[11px] tracking-wider uppercase`
  - Amount Paid input section: `bg-white rounded-2xl border border-slate-200 p-4 shadow-sm`
    - Label: `text-[10px] font-black text-slate-400 uppercase tracking-widest`
    - "Exact Amount" button: `text-[10px] font-bold text-primary uppercase`
    - Peso sign: `text-2xl font-bold text-slate-300 font-mono`
    - Input: `text-3xl font-black font-mono` (much larger per reference)
    - Change Due: `text-xl font-black font-mono text-amber-600` (amber maps to tertiary)
  - Complete Sale button: `w-full bg-primary text-white rounded-2xl font-black text-base shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.98] py-4 flex items-center justify-center gap-3`
  - Cancel button: `bg-transparent text-slate-400 py-2 rounded-xl font-bold text-sm hover:bg-red-50 hover:text-red-500`
- **MIRROR**: CN_UTILITY, KEYBOARD_SHORTCUTS patterns
- **IMPORTS**: No new imports needed
- **GOTCHA**: The discount "Add Promo" button replaces the numeric input in the design — but we should keep the discount functionality. Clicking "Add Promo" should toggle a small inline input. Keep `completeSale` logic and keyboard shortcuts exactly the same. Don't break the GCash auto-fill behavior.
- **VALIDATE**: Payment method switching works, exact amount button works, Enter key completes sale, change calculation correct

### Task 6: Redesign Cart Item
- **ACTION**: Refine cart item row styling for premium feel
- **IMPLEMENT**:
  - Container: `p-3 bg-white border border-slate-100 rounded-xl` (keep existing pattern, slight refinement)
  - Image thumbnail: `w-12 h-12 rounded-lg` (keep as-is, works well)
  - Text: product name `font-bold text-xs text-slate-800`, SKU `text-[10px] text-slate-400 font-mono`, price `text-xs font-bold text-primary`
  - Quantity controls: clean up with consistent primary hover colors
- **MIRROR**: IMAGE_RENDERING pattern
- **IMPORTS**: No new imports
- **GOTCHA**: Keep the stock limit guard on the + button. Maintain the remove button with its red hover state.
- **VALIDATE**: Quantity +/- works, stock limit enforced, remove works

### Task 7: Refine Cashier Topbar
- **ACTION**: Align topbar styling with stitch.ai reference
- **IMPLEMENT**:
  - Title: `text-2xl font-bold text-slate-800` (larger heading per reference)
  - Bell button: keep notification dot, ensure clean circle styling
  - User pill: maintain avatar + name layout, ensure name text sizes match reference
  - Wrapper: `px-6` on all breakpoints, height stays `h-[80px]`
- **MIRROR**: COMPONENT_STRUCTURE pattern
- **IMPORTS**: No new imports
- **GOTCHA**: Keep the hamburger menu button for mobile. Keep the pathname-based title switching logic.
- **VALIDATE**: Title shows correctly, responsive hamburger appears on mobile

---

## Testing Strategy

### Unit Tests
N/A — This is a purely visual redesign with no logic changes.

### Edge Cases Checklist
- [x] Empty cart state (no items) — verify empty cart illustration renders
- [x] Out-of-stock products — verify red badge + disabled state
- [x] Low stock products — verify orange badge
- [x] Maximum quantity reached — verify + button disabled
- [x] GCash payment mode — verify auto-fill amount and disabled input
- [x] Discount > 0 — verify discount row displays correctly
- [x] Cart with many items — verify scroll behavior in items list
- [x] Mobile viewport (<1024px) — verify cart overlay, hamburger menu
- [x] Keyboard shortcut Enter — verify sale completion
- [x] Keyboard shortcut Escape — verify cart clear
- [x] Ctrl+K — verify search focus

---

## Validation Commands

### Static Analysis
```bash
pnpm run typecheck
```
EXPECT: Zero type errors

### Lint
```bash
pnpm run lint
```
EXPECT: No new lint errors

### Full Build
```bash
pnpm run build
```
EXPECT: Successful build with no errors

### Browser Validation
```bash
pnpm run dev
```
EXPECT:
- Navigate to `/cashier` — POS page renders with redesigned components
- Product catalog shows search bar with new styling
- Category pills use primary color for active state
- Product cards use rounded-2xl with larger text
- Cart sidebar shows "Orders" header, wider checkout panel
- Payment toggles show icon-above-text layout
- Amount input is 3xl font size
- Complete Sale button is large and prominent
- Mobile viewport shows hamburger menu and cart overlay
- All existing interactions (add to cart, remove, quantity, checkout) work

### Manual Validation
- [ ] Compare each component side-by-side with stitch.ai reference
- [ ] Verify responsive behavior at 375px, 768px, 1024px, 1440px, 1920px
- [ ] Verify keyboard shortcuts still function
- [ ] Complete a full sale flow end-to-end
- [ ] Test GCash auto-fill behavior
- [ ] Test discount input functionality

---

## Acceptance Criteria
- [ ] All 7 files updated with visual redesign
- [ ] `globals.css` NOT modified
- [ ] No new dependencies added
- [ ] All validation commands pass
- [ ] Product catalog matches stitch.ai search + filter design
- [ ] Product cards match stitch.ai rounded-2xl premium design
- [ ] Cart sidebar matches stitch.ai checkout panel design
- [ ] Topbar matches stitch.ai header design
- [ ] Full mobile responsiveness maintained
- [ ] All existing functionality preserved (add, remove, quantity, checkout, shortcuts)

## Completion Checklist
- [ ] Code follows discovered FSD patterns
- [ ] All styling uses existing Tailwind classes (no custom CSS)
- [ ] cn() utility used for conditional classes
- [ ] Lucide icons used consistently
- [ ] eslint-disable comments preserved for img tags
- [ ] No hardcoded values added
- [ ] Mobile responsive breakpoints maintained
- [ ] Keyboard shortcuts untouched
- [ ] No unnecessary scope additions
- [ ] Self-contained — no questions needed during implementation

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Tailwind class misalignment with design | Low | Medium | Cross-reference each component against stitch.ai HTML |
| Breaking mobile responsive layout | Low | High | Test at all breakpoints before/after |
| Checkout logic regression | Very Low | High | Don't modify any business logic, only className strings |
| Font rendering differences | Low | Low | Project uses Poppins/JetBrains Mono, not Geist — accept as-is |

## Notes
- The stitch.ai reference uses Geist font family, but the project uses Poppins (`--font-sans`) and JetBrains Mono (`--font-mono`). We will NOT change fonts — the redesign targets layout, spacing, colors, and visual hierarchy only.
- The stitch.ai reference uses Material Symbols icons, but the project uses Lucide React. We will keep Lucide icons throughout.
- The reference HTML uses Tailwind CDN with custom config colors (e.g., `primary-container`, `surface-container-low`). We will NOT adopt those custom colors — instead we map to the project's existing CSS variable tokens (`bg-primary`, `text-foreground`, etc.) and Tailwind utility classes.
- The "Add Promo" button in the design replaces the numeric discount input. We'll implement this as a toggle: clicking "Add Promo" reveals the percentage input inline.
- Cart sidebar width: stitch.ai uses `w-96` (384px); current code uses `w-[360px]`. We'll adopt `w-96` for cleaner Tailwind alignment.
