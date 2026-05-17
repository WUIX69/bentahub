# Plan: Customer Landing Page

## Summary

Build the public-facing landing page for BentaHub based on the provided stitch.ai HTML prototype. The page serves as the primary entry point for customers — showcasing branches, featured products, quick stats, a hero CTA, and a call-to-action banner. All components are presentational stubs with no backend wiring.

## User Story

As a **customer**, I want to land on an engaging homepage that showcases nearby branches and essential products, so that I can quickly understand BentaHub's value and navigate to browse or register.

## Problem → Solution

**Current**: There is no root page (`src/app/page.tsx`). The `customer/page.tsx` is a stub placeholder ("Product Catalog"). There is no sticky navigation, hero, stats bar, branch grid, product grid, or CTA.

**Desired**: A fully designed, responsive landing page at the root `/` route matching the prototype, using the existing BentaHub theme (`globals.css` tokens), Lucide React icons, and shadcn components.

## Metadata

- **Complexity**: Large
- **Source PRD**: N/A (user-provided HTML prototype)
- **PRD Phase**: N/A — standalone
- **Estimated Files**: ~12 files
- **Key constraint**: MUST NOT touch `globals.css`

---

## UX Design

### Before
```
/ → 404 (no root page exists)
/customer → Bare stub: "Product Catalog" + "Browse and reserve items for pickup."
```

### After
```
/ → Full landing page:
┌──────────────────────────────────────────────────┐
│ [Sticky Nav]  Logo · Home · Browse │ Login · Register │
├──────────────────────────────────────────────────┤
│ [Hero]  Full-width image with gradient overlay   │
│         Headline + subtitle + 2 CTA buttons      │
├──────────────────────────────────────────────────┤
│ [Stats Bar]  3 info cards (Branches, Products,   │
│              Operating Hours)                     │
├──────────────────────────────────────────────────┤
│ [Branches]  3-col grid of branch cards with      │
│             images, manager, stock %, CTA button  │
├──────────────────────────────────────────────────┤
│ [Products]  6-col grid of product cards with     │
│             hover overlay + reserve button        │
├──────────────────────────────────────────────────┤
│ [CTA Banner] Primary-bg banner + "Get Started"   │
└──────────────────────────────────────────────────┘
```

### Interaction Changes

| Touchpoint | Before | After | Notes |
|---|---|---|---|
| Root URL `/` | 404 | Full landing page | New page |
| Nav "Login" | N/A | Links to `/login` | Stub link |
| Nav "Register" | N/A | Links to `/register` | Stub link |
| "Browse Catalog" hero CTA | N/A | Links to `/customer` | Stub link |
| Branch "View Live Catalog" | N/A | Links to `/customer` | Stub link |
| Product hover → "Reserve" | N/A | No-op button stub | Future wiring |
| CTA "Get Started" | N/A | Links to `/register` | Stub link |

---

## Mandatory Reading

| Priority | File | Lines | Why |
|---|---|---|---|
| P0 | `src/app/globals.css` | 1-201 | All design tokens — MUST NOT modify, MUST use existing variables |
| P0 | `src/components/ui/button.tsx` | 1-68 | Button variant pattern (cva, data-slot, radix-nova) |
| P0 | `src/components/ui/card.tsx` | 1-104 | Card component pattern for branch cards |
| P0 | `src/config/constants.ts` | 1-14 | APP_NAME, BRANCHES constants |
| P1 | `src/app/layout.tsx` | 1-31 | Root layout structure (fonts, ThemeProvider) |
| P1 | `src/features/user-mgmt/components/auth-header.tsx` | 1-23 | Component pattern (imports, cn usage, APP_NAME) |
| P1 | `src/app/(auth)/layout.tsx` | 1-25 | Route group layout pattern |
| P2 | `src/features/user-mgmt/components/index.ts` | 1-6 | Barrel export pattern |
| P2 | `docs/BENTAHUB.md` | 158-178 | Customer workflow definition |

---

## Patterns to Mirror

### NAMING_CONVENTION
```tsx
// SOURCE: src/features/user-mgmt/components/auth-header.tsx:1-23
// PascalCase component names, kebab-case file names
// Function components exported as named exports
export function AuthHeader({ subtitle, className }: AuthHeaderProps) { ... }
```

### COMPONENT_PATTERN
```tsx
// SOURCE: src/components/ui/button.tsx:44-65
// shadcn components use: data-slot, cn() for className merging, React.ComponentProps
function Button({ className, variant = "default", ...props }: ...) {
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
```

### BARREL_EXPORT
```tsx
// SOURCE: src/features/user-mgmt/components/index.ts:1-6
export * from "./auth-header"
export * from "./password-input"
```

### FEATURE_INDEX
```tsx
// SOURCE: src/features/user-mgmt/index.ts:1-13
// JSDoc header, then re-export from ./components
export * from "./components"
```

### IMPORT_ALIASES
```tsx
// SOURCE: src/app/(auth)/login/page.tsx:6-10
import { AuthHeader } from "@/features/user-mgmt"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { APP_NAME } from "@/config"
```

### LAYOUT_PATTERN
```tsx
// SOURCE: src/app/(auth)/layout.tsx:1-25
import { Metadata } from "next"
export const metadata: Metadata = { title: "...", description: "..." }
export default function AuthLayout({ children }: { children: React.ReactNode }) { ... }
```

---

## Design Token Mapping (Prototype → BentaHub Theme)

The prototype uses custom Material 3 color names. These map to existing BentaHub theme variables:

| Prototype Token | BentaHub Tailwind Class | Usage |
|---|---|---|
| `bg-background` | `bg-background` | Page backgrounds |
| `text-on-surface` | `text-foreground` | Primary text |
| `text-on-surface-variant` | `text-muted-foreground` | Secondary text |
| `bg-surface-container` | `bg-muted` | Section backgrounds |
| `bg-card` / `border-outline-variant` | `bg-card border-border` | Card surfaces |
| `bg-primary` / `text-on-primary` | `bg-primary text-primary-foreground` | CTAs, badges |
| `bg-accent` | `bg-accent` | Icon backgrounds |
| `text-primary` | `text-primary` | Links, highlights |
| `bg-muted` | `bg-muted` | Image placeholder bg |
| `font-headline-xl (48px, 700)` | `text-5xl font-bold tracking-tight` | Hero headline |
| `font-headline-lg (32px, 600)` | `text-3xl font-semibold tracking-tight` | Section headlines |
| `font-headline-md (24px, 600)` | `text-2xl font-semibold` | Card titles |
| `font-body-lg (18px, 400)` | `text-lg` | Hero subtitle |
| `font-body-md (16px, 400)` | `text-base` | Body text |
| `font-body-sm (14px, 400)` | `text-sm` | Detail text |
| `font-label-md (12px, 500)` | `text-xs font-medium` | Labels |

## Lucide Icon Mapping (Prototype → Available Icons)

| Prototype (Material) | Lucide Equivalent | Verified |
|---|---|---|
| `storefront` (FILL 1) | `Store` | ✅ |
| `hub` (FILL 1) | `Network` | ✅ (Hub unavailable) |
| `package_2` (FILL 1) | `Package` | ✅ |
| `schedule` (FILL 1) | `Clock` | ✅ |
| `location_on` | `MapPin` | ✅ |
| `arrow_forward` | `ArrowRight` | ✅ |
| `open_in_new` | `ExternalLink` | ✅ |
| `add_shopping_cart` | `ShoppingCart` | ✅ |

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `src/app/(landing)/layout.tsx` | CREATE | Landing page layout with sticky nav |
| `src/app/(landing)/page.tsx` | CREATE | Root landing page assembling all sections |
| `src/features/landing/components/navbar.tsx` | CREATE | Sticky navigation bar component |
| `src/features/landing/components/hero-section.tsx` | CREATE | Hero section with CTA buttons |
| `src/features/landing/components/stats-bar.tsx` | CREATE | 3-card stats quick-info section |
| `src/features/landing/components/branch-grid.tsx` | CREATE | 3-column branch card grid |
| `src/features/landing/components/product-grid.tsx` | CREATE | 6-column essential products grid |
| `src/features/landing/components/cta-banner.tsx` | CREATE | CTA banner "Ready to start shopping?" |
| `src/features/landing/components/index.ts` | CREATE | Barrel exports for landing components |
| `src/features/landing/index.ts` | CREATE | Feature slice entry point |

## NOT Building

- No backend/API wiring for products or branches (all hardcoded demo data)
- No functional "Reserve" button logic
- No footer (not present in prototype)
- No search/filter functionality
- No dark mode adjustments for the hero image overlay (not in prototype)
- No mobile hamburger menu (nav items hidden on mobile per prototype)
- No scroll-reveal JS animation (pure CSS transitions instead)

---

## Step-by-Step Tasks

### Task 1: Create Landing Feature Slice

- **ACTION**: Create the `src/features/landing/` directory with barrel exports
- **IMPLEMENT**: Create `index.ts` and `components/index.ts`
- **MIRROR**: `FEATURE_INDEX` and `BARREL_EXPORT` patterns
- **IMPORTS**: None
- **GOTCHA**: None
- **VALIDATE**: Files exist and export properly

---

### Task 2: Create Navbar Component

- **ACTION**: Create `src/features/landing/components/navbar.tsx`
- **IMPLEMENT**: Sticky top nav with:
  - Logo (Store icon + APP_NAME from `@/config`)
  - Nav links: "Home" (active, bold with underline), "Browse Products"
  - Right side: "Login" ghost button, "Register" primary button
  - `sticky top-0 z-50` with `bg-background/95 backdrop-blur-md border-b border-border shadow-sm`
  - `max-w-7xl mx-auto` container constraint
  - `hidden md:flex` on nav links for mobile hiding
- **MIRROR**: `IMPORT_ALIASES`, `NAMING_CONVENTION`
- **IMPORTS**: `Link` from `next/link`, `Store` from `lucide-react`, `Button` from `@/components/ui/button`, `APP_NAME` from `@/config`, `cn` from `@/lib/utils`
- **GOTCHA**: Use `Link` for Login/Register to navigate to `/login` and `/register`
- **VALIDATE**: Renders sticky header, links navigate correctly

---

### Task 3: Create Hero Section Component

- **ACTION**: Create `src/features/landing/components/hero-section.tsx`
- **IMPLEMENT**: Full-width hero with:
  - Generated background image with dark gradient overlay (`from-black/80 via-black/40 to-transparent`)
  - Badge pill: "REVOLUTIONIZING LOCAL RETAIL" with `bg-primary/20 border border-primary/30`
  - Headline: "Your Neighborhood Sari-Sari Store, **Now Digital**" — second part in `text-accent`
  - Subtitle paragraph
  - Two CTA buttons: "Browse Catalog" (primary + ArrowRight icon), "Our Branches" (glass-style outline)
  - Fixed height `h-[650px]` with flex centering
  - Content constrained to `max-w-2xl` within `max-w-7xl` container
- **MIRROR**: `COMPONENT_PATTERN`
- **IMPORTS**: `Link` from `next/link`, `ArrowRight` from `lucide-react`, `Button` from `@/components/ui/button`
- **GOTCHA**: Use a generated image (via `generate_image`) for the hero background. Use `Image` from `next/image` for optimization.
- **VALIDATE**: Hero renders full width, gradient overlay visible, CTAs aligned

---

### Task 4: Create Stats Bar Component

- **ACTION**: Create `src/features/landing/components/stats-bar.tsx`
- **IMPLEMENT**: 3-column grid of info cards with:
  - Card 1: Network icon (accent bg) → "Active Branches" / "3 Locations"
  - Card 2: Package icon (orange-tinted bg) → "Available Products" / "500+ Essentials"
  - Card 3: Clock icon (secondary bg) → "Operating Hours" / "Daily 6AM – 10PM"
  - Each card: `bg-card border border-border p-6 rounded-xl shadow-sm flex items-center gap-4`
  - Section bg: `bg-muted`
  - Responsive: `grid-cols-1 md:grid-cols-3`
- **MIRROR**: `COMPONENT_PATTERN`
- **IMPORTS**: `Network`, `Package`, `Clock` from `lucide-react`
- **GOTCHA**: None
- **VALIDATE**: 3 cards render horizontally on desktop, stack on mobile

---

### Task 5: Create Branch Grid Component

- **ACTION**: Create `src/features/landing/components/branch-grid.tsx`
- **IMPLEMENT**: Section with:
  - Header row: "Our Branches" heading + "Find the BentaHub branch nearest to you." subtitle
  - 3-column grid of branch cards with:
    - Generated image (`h-52`) with hover scale effect (`group-hover:scale-105`)
    - "Open Now" badge (absolute positioned, `bg-primary text-primary-foreground`)
    - Location line with MapPin icon
    - Branch name heading
    - Info box (manager name, availability percentage) in `bg-muted rounded-xl`
    - "View Live Catalog" CTA button (full-width, primary)
  - Demo data array of 3 branches matching the prototype (Main Branch, Branch 2, Branch 3)
  - Card wrapper: `bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group`
- **MIRROR**: `COMPONENT_PATTERN`
- **IMPORTS**: `MapPin` from `lucide-react`, `Button` from `@/components/ui/button`, `Link` from `next/link`
- **GOTCHA**: Use generated images via `generate_image` tool. 3 branch images needed.
- **VALIDATE**: 3 branch cards render, hover effects work

---

### Task 6: Create Product Grid Component

- **ACTION**: Create `src/features/landing/components/product-grid.tsx`
- **IMPLEMENT**: Section with:
  - Header: "Essential Goods" + "See all products" link (with ExternalLink icon)
  - 6-column responsive grid (`grid-cols-2 md:grid-cols-4 lg:grid-cols-6`)
  - Each product card:
    - `aspect-[4/5]` image container with `rounded-2xl` and `border border-border`
    - Hover overlay: black/40 bg with "Reserve" button (ShoppingCart icon)
    - Below image: category label, product name (truncated), price in ₱
  - Demo data array: 6 products from prototype (Rice, Tomatoes, Sardines, Eggs, Oil, Pancit Canton)
- **MIRROR**: `COMPONENT_PATTERN`
- **IMPORTS**: `ShoppingCart`, `ExternalLink` from `lucide-react`, `Link` from `next/link`
- **GOTCHA**: Use generated images via `generate_image` for products. Group hover effects: `group-hover:scale-110` on image, `opacity-0 group-hover:opacity-100` on overlay.
- **VALIDATE**: 6 product tiles visible, hover overlay appears on hover

---

### Task 7: Create CTA Banner Component

- **ACTION**: Create `src/features/landing/components/cta-banner.tsx`
- **IMPLEMENT**: Full-width section with:
  - Container with `bg-primary rounded-3xl p-8` (or `p-10`)
  - Flex row on desktop: headline + subtitle on left, "Get Started" button on right
  - Button: `bg-white text-primary` (inverse of primary) with shadow
  - Text: white (`text-primary-foreground`)
  - Responsive: column on mobile, row on desktop
- **MIRROR**: `COMPONENT_PATTERN`
- **IMPORTS**: `Link` from `next/link`, `Button` from `@/components/ui/button`
- **GOTCHA**: None
- **VALIDATE**: Banner renders with correct colors, button links to `/register`

---

### Task 8: Create Landing Layout

- **ACTION**: Create `src/app/(landing)/layout.tsx`
- **IMPLEMENT**: Route group layout for the landing page:
  - SEO metadata: `title: "BentaHub | Your Neighborhood Sari-Sari Store, Now Digital"`
  - Render `<Navbar />` at the top
  - Render `{children}` in a `<main>` tag
  - No footer (per prototype)
- **MIRROR**: `LAYOUT_PATTERN`
- **IMPORTS**: `Navbar` from `@/features/landing`, `Metadata` from `next`
- **GOTCHA**: This route group `(landing)` renders at `/` — confirm no conflict with missing root `page.tsx`
- **VALIDATE**: Layout renders navbar above page content

---

### Task 9: Create Landing Page

- **ACTION**: Create `src/app/(landing)/page.tsx`
- **IMPLEMENT**: Assemble all sections in order:
  1. `<HeroSection />`
  2. `<StatsBar />`
  3. `<BranchGrid />`
  4. `<ProductGrid />`
  5. `<CtaBanner />`
- **MIRROR**: `IMPORT_ALIASES`
- **IMPORTS**: All section components from `@/features/landing`
- **GOTCHA**: This is a Server Component (no "use client" needed since sections handle their own client interactivity if any)
- **VALIDATE**: Page renders all 5 sections at `/`

---

### Task 10: Generate Hero & Branch Images

- **ACTION**: Use `generate_image` tool to create:
  1. Hero background: A warm, inviting Filipino sari-sari store scene
  2. 3 branch storefront images
  3. 6 product images (rice, tomatoes, sardines, eggs, oil, instant noodles)
- **IMPLEMENT**: Save to `public/images/landing/` directory, reference in components
- **GOTCHA**: Images must be placed in `public/` for Next.js static serving. Use `next/image` with proper `width`/`height` or `fill` prop.
- **VALIDATE**: All images load correctly in the browser

---

## Testing Strategy

### Static Analysis
```bash
pnpm lint
```
EXPECT: Zero lint errors

### Type Check
```bash
pnpm typecheck
```
EXPECT: Zero type errors

### Build
```bash
pnpm build
```
EXPECT: Successful build, `/` route listed as static

### Browser Validation
```bash
pnpm dev
# Navigate to http://localhost:3000
```
EXPECT: Full landing page renders with all sections

### Manual Validation
- [ ] Navbar is sticky on scroll
- [ ] Hero section has gradient overlay and readable text
- [ ] Stats bar shows 3 info cards
- [ ] Branch grid shows 3 cards with hover effects
- [ ] Product grid shows 6 items with hover overlay
- [ ] CTA banner has correct primary background
- [ ] Login → `/login`, Register → `/register`
- [ ] "Browse Catalog" → `/customer`
- [ ] Responsive: sections stack on mobile
- [ ] All images load without errors

---

## Acceptance Criteria

- [ ] All tasks completed
- [ ] All validation commands pass (`lint`, `typecheck`, `build`)
- [ ] Root `/` renders the full landing page
- [ ] All 5 sections match the prototype layout
- [ ] Sticky navbar with working navigation links
- [ ] Responsive design (mobile stacking)
- [ ] Uses existing BentaHub theme tokens only — no `globals.css` modifications
- [ ] Follows FSD architecture (components in `features/landing/`)

## Completion Checklist

- [ ] Code follows discovered patterns (named exports, cn(), data-slot)
- [ ] Uses `@/config` APP_NAME constant
- [ ] Uses `@/components/ui/button` for all buttons
- [ ] Uses `@/lib/utils` cn() for all className merging
- [ ] No hardcoded color values — all from theme
- [ ] No `globals.css` modifications
- [ ] Barrel exports in place

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Generated images don't match prototype aesthetic | Medium | Low | Can regenerate or use placeholder gradients |
| Hero image too large for page load | Low | Medium | Use `next/image` with proper sizing |
| Route group `(landing)` conflicts with existing routes | Low | High | Verify no existing root `page.tsx` — confirmed none exists |

## Notes

- The prototype uses Material Symbols font icons; we replace all with Lucide React equivalents verified to exist.
- `Hub` icon doesn't exist in Lucide — `Network` is used as the proven fallback (already used in auth-header).
- All branch/product data is hardcoded demo data; no database wiring.
- Social proof / scroll-reveal animations are omitted in favor of simpler CSS `transition-all` hover effects. Can be added later with `framer-motion` if desired.
