# Plan: Authentication Pages (Sign-In & Sign-Up)

## Summary

Build fully styled Sign-In and Sign-Up pages inside the existing `src/app/(auth)/` route group, faithfully translating the user's stitch.ai HTML prototypes into the project's Next.js 16 + shadcn/radix-nova + Tailwind v4 stack. All work follows FSD architecture rules, reuses the established design token system in `globals.css` (which will NOT be touched), and uses Lucide React icons instead of the prototype's Material Symbols.

## User Story

As a **BentaHub user** (Customer or Staff),  
I want **clearly designed sign-in and sign-up pages**,  
So that **I can authenticate into the appropriate role-based dashboard**.

## Problem → Solution

**Current state:** Placeholder stub pages with only `<h1>` and `<p>` text. No forms, no styling, no layout.  
**Desired state:** Production-quality auth pages matching the stitch.ai prototypes, with proper form fields, role selection, social login stubs, and responsive design.

## Metadata

- **Complexity**: Medium
- **Source PRD**: N/A (user-provided HTML prototypes)
- **PRD Phase**: N/A
- **Estimated Files**: 10–12

---

## UX Design

### Sign-In Page (After)

```
┌──────────────────────────────────────┐
│            [Hub Icon]                │
│            BentaHub                  │
│   Your trusted neighborhood partner │
│                                      │
│  ┌────────────────────────────────┐  │
│  │  Sign In                       │  │
│  │                                │  │
│  │  EMAIL ADDRESS                 │  │
│  │  ┌─[✉]─────────────────────┐  │  │
│  │  │ name@company.com        │  │  │
│  │  └─────────────────────────┘  │  │
│  │                                │  │
│  │  PASSWORD        Forgot Pass?  │  │
│  │  ┌─[🔒]────────────────────┐  │  │
│  │  │ ••••••••                │  │  │
│  │  └─────────────────────────┘  │  │
│  │                                │  │
│  │  [========= Sign In =========] │  │
│  │                                │  │
│  │  ──── or continue with ─────  │  │
│  │                                │  │
│  │  [ Google ]    [ Github ]      │  │
│  │                                │  │
│  │  Don't have an account?        │  │
│  │  Create an account             │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

### Sign-Up Page (After)

```
┌──────────────────────────────────────┐
│            [Hub Icon]                │
│            BentaHub                  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │  Create an account             │  │
│  │  Join our neighborhood partner │  │
│  │  ecosystem today.              │  │
│  │                                │  │
│  │  FULL NAME                     │  │
│  │  ┌─[👤]────────────────────┐  │  │
│  │  │ John Doe                │  │  │
│  │  └─────────────────────────┘  │  │
│  │                                │  │
│  │  EMAIL ADDRESS                 │  │
│  │  ┌─[✉]─────────────────────┐  │  │
│  │  │ john@example.com        │  │  │
│  │  └─────────────────────────┘  │  │
│  │                                │  │
│  │  PHONE NUMBER                  │  │
│  │  ┌─[📞]────────────────────┐  │  │
│  │  │ +1 (555) 000-0000       │  │  │
│  │  └─────────────────────────┘  │  │
│  │                                │  │
│  │  ROLE                          │  │
│  │  ┌──────────┬──────────────┐  │  │
│  │  │●Customer │  Staff       │  │  │
│  │  └──────────┴──────────────┘  │  │
│  │                                │  │
│  │  PASSWORD                      │  │
│  │  ┌─[🔒]──────────────[👁]─┐  │  │
│  │  │ ••••••••                │  │  │
│  │  └─────────────────────────┘  │  │
│  │  Min 8 chars with 1 symbol    │  │
│  │                                │  │
│  │  [========= Sign Up =========] │  │
│  │                                │  │
│  │  Already have an account?      │  │
│  │  Sign in instead               │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

### Interaction Changes

| Touchpoint | Before | After | Notes |
|---|---|---|---|
| `/login` | Placeholder text | Full sign-in form with social OAuth stubs | Matches stitch.ai sign-in prototype |
| `/register` | Placeholder text | Full sign-up form with role toggle | Matches stitch.ai sign-up prototype |
| Auth layout | None | Shared centered layout with branding | New `(auth)/layout.tsx` |
| Navigation | No links | Cross-links between sign-in ↔ sign-up | `<Link>` components |

---

## Design Token Mapping

> [!IMPORTANT]
> The `globals.css` file is **NOT to be modified**. All styling uses existing CSS variables and Tailwind utility classes.

The prototype uses a custom Tailwind config with named colors. Here's how those map to our existing theme variables:

| Prototype Token | CSS Variable | Tailwind Class | Hex Approx |
|---|---|---|---|
| `primary` | `--primary` | `bg-primary` | `#2c4dd6` (oklch mapped) |
| `on-primary` | `--primary-foreground` | `text-primary-foreground` | `#ffffff` |
| `card` | `--card` | `bg-card` | `#ffffff` |
| `on-surface` | `--foreground` | `text-foreground` | `#1a1b23` |
| `on-surface-variant` | `--muted-foreground` | `text-muted-foreground` | `#444654` |
| `outline-variant` | `--border` | `border-border` | `#c4c5d7` |
| `outline` | `--muted-foreground` | `text-muted-foreground` | `#747686` |
| `surface` | `--background` | `bg-background` | `#fbf8ff` |
| `surface-container-lowest` | `--background` | `bg-background` | `#ffffff` |
| `surface-container-high` | `--muted` | `bg-muted` | `#e8e7f3` |
| `accent` | `--accent` | `bg-accent` | `#E3E9FF` |
| `error` | `--destructive` | `text-destructive` | `#ba1a1a` |

### Icon Mapping (Material Symbols → Lucide React)

| Prototype Icon | Lucide Equivalent | Used In |
|---|---|---|
| `hub` (filled) | `Hub` (or custom SVG) | Logo branding |
| `mail` | `Mail` | Email field |
| `lock` | `Lock` | Password field |
| `visibility` / `visibility_off` | `Eye` / `EyeOff` | Password toggle |
| `person` | `User` | Full name field |
| `call` | `Phone` | Phone field |
| `person_search` | `UserSearch` | Customer role |
| `badge` | `BadgeCheck` | Staff role |
| `arrow_forward` | `ArrowRight` | Sign-up submit |
| `login` | `LogIn` | Sign-in submit |
| `account_circle` | `Chrome` (or custom) | Google OAuth |
| `terminal` | `Github` | Github OAuth |

---

## Mandatory Reading

| Priority | File | Lines | Why |
|---|---|---|---|
| P0 | [globals.css](file:///c:/projects/bentahub/src/app/globals.css) | all | Theme variables — DO NOT MODIFY |
| P0 | [layout.tsx](file:///c:/projects/bentahub/src/app/layout.tsx) | all | Root layout pattern, font setup |
| P0 | [constants.ts](file:///c:/projects/bentahub/src/config/constants.ts) | all | `USER_ROLES`, `APP_NAME` constants |
| P0 | [auth.ts](file:///c:/projects/bentahub/src/types/auth.ts) | all | `User`, `Session` types |
| P1 | [button.tsx](file:///c:/projects/bentahub/src/components/ui/button.tsx) | all | shadcn button variant pattern |
| P1 | [theme-provider.tsx](file:///c:/projects/bentahub/src/components/theme-provider.tsx) | all | `"use client"` pattern |
| P1 | [utils.ts](file:///c:/projects/bentahub/src/lib/utils.ts) | all | `cn()` utility |
| P2 | [components.json](file:///c:/projects/bentahub/components.json) | all | shadcn config (radix-nova style) |
| P2 | [BENTAHUB.md](file:///c:/projects/bentahub/docs/BENTAHUB.md) | 1-35 | FSD architecture rules |
| P2 | [user-mgmt/index.ts](file:///c:/projects/bentahub/src/features/user-mgmt/index.ts) | all | Feature slice export pattern |

---

## Patterns to Mirror

### COMPONENT_DECLARATION
```tsx
// SOURCE: src/components/ui/button.tsx:44-65
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

### CLIENT_DIRECTIVE
```tsx
// SOURCE: src/components/theme-provider.tsx:1
"use client"
```

### CN_UTILITY
```tsx
// SOURCE: src/lib/utils.ts:4-6
import { cn } from "@/lib/utils"
cn("base-class", conditional && "conditional-class", className)
```

### EXPORT_PATTERN
```tsx
// SOURCE: src/config/index.ts:1-2
export { APP_NAME, USER_ROLES } from "./constants"
export type { UserRole } from "./constants"
```

### FEATURE_SLICE_INDEX
```tsx
// SOURCE: src/features/user-mgmt/index.ts:1-12
/**
 * User Management Feature Slice
 *
 * Responsible for:
 * - Role-based access control
 * - Account management and credential overrides
 *
 * Consumed by: src/app/admin/
 */
export {}
```

### PAGE_COMPONENT
```tsx
// SOURCE: src/app/page.tsx:3-19
export default function Page() {
  return (
    <div>...</div>
  )
}
```

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `src/app/(auth)/layout.tsx` | **CREATE** | Shared auth layout with centered card + branding |
| `src/app/(auth)/login/page.tsx` | **UPDATE** | Replace stub with full sign-in form |
| `src/app/(auth)/register/page.tsx` | **UPDATE** | Replace stub with full sign-up form |
| `src/features/user-mgmt/components/auth-header.tsx` | **CREATE** | Reusable BentaHub logo/branding header |
| `src/features/user-mgmt/components/role-toggle.tsx` | **CREATE** | Customer/Staff toggle selector |
| `src/features/user-mgmt/components/password-input.tsx` | **CREATE** | Password field with visibility toggle |
| `src/features/user-mgmt/components/social-auth-buttons.tsx` | **CREATE** | Google/Github OAuth button stubs |
| `src/features/user-mgmt/components/auth-divider.tsx` | **CREATE** | "or continue with" divider |
| `src/features/user-mgmt/components/index.ts` | **CREATE** | Barrel export for auth components |
| `src/features/user-mgmt/index.ts` | **UPDATE** | Export auth components |
| `src/components/ui/input.tsx` | **CREATE** (via shadcn CLI) | shadcn Input component |
| `src/components/ui/label.tsx` | **CREATE** (via shadcn CLI) | shadcn Label component |
| `src/components/ui/card.tsx` | **CREATE** (via shadcn CLI) | shadcn Card component |
| `src/components/ui/separator.tsx` | **CREATE** (via shadcn CLI) | shadcn Separator component |

## NOT Building

- Backend authentication logic (server actions, database queries, session management)
- Form validation with Zod (deferred to backend integration phase)
- Actual OAuth provider integration (Google, Github)
- Forgot password flow / page
- Email verification flow
- Admin/Cashier-specific login pages
- Dark mode specific tweaks (theme system handles automatically)

---

## Step-by-Step Tasks

### Task 1: Install Required shadcn UI Components

- **ACTION**: Use shadcn CLI to install `input`, `label`, `card`, and `separator`
- **IMPLEMENT**: Run `pnpm dlx shadcn@latest add input label card separator`
- **MIRROR**: Existing `button.tsx` component pattern (radix-nova style)
- **IMPORTS**: N/A (CLI generates files)
- **GOTCHA**: Use `pnpm dlx` not `npx` since project uses pnpm. Do NOT modify `globals.css`.
- **VALIDATE**: Verify files exist in `src/components/ui/` and compile without errors

---

### Task 2: Create Auth Header Component

- **ACTION**: Create `src/features/user-mgmt/components/auth-header.tsx`
- **IMPLEMENT**: Reusable branding component with:
  - Lucide `Hub` icon (fallback: styled `<div>` with icon) in a primary-colored rounded square
  - `APP_NAME` from `@/config/constants`
  - Optional subtitle prop (sign-in uses "Your trusted neighborhood partner", sign-up omits it)
- **MIRROR**: `CLIENT_DIRECTIVE` (this is a presentational component, can stay server component); `CN_UTILITY`
- **IMPORTS**: `import { APP_NAME } from "@/config"`, `import { Hub } from "lucide-react"`, `import { cn } from "@/lib/utils"`
- **GOTCHA**: `Hub` icon may not exist in lucide-react — use `Network` or a simple SVG fallback. Check lucide icon availability first.
- **VALIDATE**: Component renders BentaHub logo and name correctly

---

### Task 3: Create Password Input Component

- **ACTION**: Create `src/features/user-mgmt/components/password-input.tsx`
- **IMPLEMENT**: Client component wrapping shadcn `Input` with:
  - `"use client"` directive (needs `useState` for toggle)
  - Lock icon on the left (absolute positioned)
  - Eye/EyeOff toggle button on the right
  - `useState` to toggle `type="password"` ↔ `type="text"`
  - Forward all standard input props
- **MIRROR**: `CLIENT_DIRECTIVE`, `CN_UTILITY`
- **IMPORTS**: `import { Eye, EyeOff, Lock } from "lucide-react"`, `import { Input } from "@/components/ui/input"`, `import { cn } from "@/lib/utils"`
- **GOTCHA**: Must prevent toggle button from submitting the form — use `type="button"`
- **VALIDATE**: Toggle works, password shows/hides correctly

---

### Task 4: Create Role Toggle Component

- **ACTION**: Create `src/features/user-mgmt/components/role-toggle.tsx`
- **IMPLEMENT**: Client component with a "bento-style" toggle:
  - `"use client"` directive (needs `useState`)
  - Two options: "Customer" (with `UserSearch` icon) and "Staff" (with `BadgeCheck` icon)
  - Grid layout with 2 columns inside a muted background container
  - Active state: white card background + primary text + bold font + shadow
  - Inactive state: transparent + muted text + hover effect
  - Props: `value`, `onChange` callback
  - Uses `USER_ROLES` type from config (filtered to `"customer" | "staff"`)
- **MIRROR**: `CLIENT_DIRECTIVE`, `CN_UTILITY`
- **IMPORTS**: `import { UserSearch, BadgeCheck } from "lucide-react"`, `import { cn } from "@/lib/utils"`
- **GOTCHA**: Buttons inside the toggle must be `type="button"` to prevent form submission. Only expose "customer" and "staff" roles (not "admin" or "cashier").
- **VALIDATE**: Toggle state switches correctly, visual state matches prototype

---

### Task 5: Create Social Auth Buttons Component

- **ACTION**: Create `src/features/user-mgmt/components/social-auth-buttons.tsx`
- **IMPLEMENT**: Component rendering two outline-style buttons:
  - Google button with a Chrome/User icon
  - Github button with a Github icon
  - Both are `type="button"` with no action (stub for future OAuth)
  - Grid layout with 2 columns, matching prototype spacing
- **MIRROR**: `CN_UTILITY`
- **IMPORTS**: `import { Chrome, Github } from "lucide-react"`, `import { Button } from "@/components/ui/button"`
- **GOTCHA**: These are non-functional stubs. Don't wire to any auth providers.
- **VALIDATE**: Both buttons render with correct icons and hover states

---

### Task 6: Create Auth Divider Component

- **ACTION**: Create `src/features/user-mgmt/components/auth-divider.tsx`
- **IMPLEMENT**: Styled horizontal divider with centered text:
  - Full-width line with "or continue with" text in the center
  - Text sits on a card-colored background to "cut through" the line
  - Uppercase, small tracking, monospace font
- **MIRROR**: `CN_UTILITY`
- **IMPORTS**: `import { Separator } from "@/components/ui/separator"` (or use CSS border approach as in prototype)
- **GOTCHA**: Use `relative` positioning trick from the prototype to overlay the text on the line
- **VALIDATE**: Visually matches the prototype's divider

---

### Task 7: Create Component Barrel Exports

- **ACTION**: Create `src/features/user-mgmt/components/index.ts` and update `src/features/user-mgmt/index.ts`
- **IMPLEMENT**: 
  - `components/index.ts`: export all auth components
  - `index.ts`: update the feature slice docstring and re-export from `./components`
- **MIRROR**: `EXPORT_PATTERN`, `FEATURE_SLICE_INDEX`
- **IMPORTS**: N/A
- **GOTCHA**: Follow the existing barrel export convention strictly
- **VALIDATE**: Imports resolve correctly from `@/features/user-mgmt`

---

### Task 8: Create Auth Layout

- **ACTION**: Create `src/app/(auth)/layout.tsx`
- **IMPLEMENT**: Shared layout wrapping both login and register pages:
  - Full-height centered flex container (`min-h-screen`, `items-center`, `justify-center`)
  - Subtle dot pattern background (CSS `radial-gradient` as in sign-in prototype's `.bento-pattern`)
  - Responsive padding
  - Passes `children` in a max-width container
  - Server component (no `"use client"`)
- **MIRROR**: `PAGE_COMPONENT` pattern for layout
- **IMPORTS**: N/A
- **GOTCHA**: Do NOT add fonts or theme providers here — the root layout already handles that. The dot pattern should be inline `style` or a Tailwind arbitrary value, NOT added to `globals.css`.
- **VALIDATE**: Both `/login` and `/register` render inside this layout

---

### Task 9: Build Sign-In Page

- **ACTION**: Replace `src/app/(auth)/login/page.tsx` with full sign-in form
- **IMPLEMENT**: Complete sign-in page matching the prototype:
  - `"use client"` (form has interactive elements)
  - `AuthHeader` with subtitle "Your trusted neighborhood partner"
  - Card containing:
    - "Sign In" heading
    - Email field with mail icon (left icon pattern)
    - Password field using `PasswordInput` component
    - "Forgot Password?" link (right-aligned, non-functional href="#")
    - Primary "Sign In" button (full width) with `LogIn` icon
    - `AuthDivider` with "or continue with"
    - `SocialAuthButtons` (Google, Github)
    - Footer text: "Don't have an account? Create an account" with `<Link href="/register">`
  - Form uses `<form>` with `onSubmit` handler (preventDefault for now)
- **MIRROR**: `CLIENT_DIRECTIVE`, `CN_UTILITY`, `PAGE_COMPONENT`
- **IMPORTS**: All from `@/features/user-mgmt`, `@/components/ui/*`, `lucide-react`, `next/link`
- **GOTCHA**: Use Next.js `<Link>` for navigation between auth pages, not `<a>`. Input fields need icon wrappers with absolute positioning.
- **VALIDATE**: Page matches prototype layout and all interactive elements work

---

### Task 10: Build Sign-Up Page

- **ACTION**: Replace `src/app/(auth)/register/page.tsx` with full sign-up form
- **IMPLEMENT**: Complete sign-up page matching the prototype:
  - `"use client"` (form has interactive elements + role toggle state)
  - `AuthHeader` without subtitle
  - Wider card (`max-w-[520px]` vs `max-w-[440px]` for sign-in)
  - Card containing:
    - "Create an account" heading
    - "Join our neighborhood partner ecosystem today." subtext
    - Full Name field with user icon
    - Email field with mail icon
    - Phone Number field with phone icon
    - `RoleToggle` component (Customer selected by default)
    - `PasswordInput` component with hint text "Minimum 8 characters with one special symbol."
    - Primary "Sign Up" button (full width) with `ArrowRight` icon
    - Footer text: "Already have an account? Sign in instead" with `<Link href="/login">`
  - Form uses `<form>` with `onSubmit` handler (preventDefault for now)
  - State: `role` state (default: `"customer"`)
- **MIRROR**: `CLIENT_DIRECTIVE`, `CN_UTILITY`, `PAGE_COMPONENT`
- **IMPORTS**: All from `@/features/user-mgmt`, `@/components/ui/*`, `lucide-react`, `next/link`
- **GOTCHA**: The card width is wider than sign-in (`520px` vs `440px`). Use the `max-w` class on the wrapper div in each page, not in the layout.
- **VALIDATE**: Page matches prototype layout, role toggle works, password visibility toggles

---

## Testing Strategy

### Browser Validation

| Check | Route | Expected Result |
|---|---|---|
| Sign-in renders | `/login` | Full form with email, password, social buttons |
| Sign-up renders | `/register` | Full form with name, email, phone, role toggle, password |
| Cross-navigation | Click "Create an account" on sign-in | Navigates to `/register` |
| Cross-navigation | Click "Sign in instead" on sign-up | Navigates to `/login` |
| Password toggle | Click eye icon on either page | Password text reveals/hides |
| Role toggle | Click "Staff" on sign-up | Staff button becomes active, Customer becomes inactive |
| Responsive | Resize to mobile | Cards scale down, maintain readability |
| Dark mode | Press `d` key | Theme switches, all elements remain readable |

### Edge Cases Checklist

- [ ] Empty form submission (should not crash, preventDefault handles it)
- [ ] Very long email/name values (field should not overflow)
- [ ] Mobile viewport (320px width) — layout doesn't break
- [ ] Dark mode renders correctly
- [ ] Tab navigation order is logical (top to bottom)
- [ ] Both pages accessible without JavaScript (SSR renders structure)

---

## Validation Commands

### Type Check
```bash
pnpm typecheck
```
EXPECT: Zero type errors

### Lint
```bash
pnpm lint
```
EXPECT: No lint errors

### Dev Server
```bash
pnpm dev
```
EXPECT: Both `/login` and `/register` render without errors

### Browser Validation
- Navigate to `http://localhost:3000/login` — verify full sign-in form renders
- Navigate to `http://localhost:3000/register` — verify full sign-up form renders
- Toggle password visibility on both pages
- Toggle role selector on sign-up page
- Click navigation links between sign-in ↔ sign-up
- Press `d` to verify dark mode compatibility
- Resize browser to verify responsive behavior

---

## Acceptance Criteria

- [ ] All tasks completed (1–10)
- [ ] All validation commands pass
- [ ] Sign-in page visually matches the stitch.ai prototype
- [ ] Sign-up page visually matches the stitch.ai prototype
- [ ] Cross-navigation between auth pages works via Next.js `<Link>`
- [ ] Password visibility toggle functional
- [ ] Role toggle functional (Customer/Staff)
- [ ] Responsive at mobile, tablet, and desktop breakpoints
- [ ] Dark mode compatible
- [ ] No modifications to `globals.css`
- [ ] FSD architecture maintained (feature components in `features/user-mgmt/`)
- [ ] No type errors or lint errors

## Completion Checklist

- [ ] Code follows discovered patterns (shadcn component style, `cn()` utility, barrel exports)
- [ ] `"use client"` only where needed (interactive components)
- [ ] Lucide React icons used consistently (no Material Symbols)
- [ ] `APP_NAME` constant used instead of hardcoded "BentaHub"
- [ ] All form buttons have correct `type` attribute (`type="button"` vs `type="submit"`)
- [ ] No console.log in production code
- [ ] No hardcoded color values — all from theme CSS variables
- [ ] No modifications to `globals.css`

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Lucide `Hub` icon doesn't exist | Medium | Low | Use `Network` or inline SVG fallback |
| shadcn CLI modifies globals.css | Low | High | Review CLI output, revert any globals.css changes |
| Color mismatch between prototype and existing theme | Low | Medium | Design token mapping table verified above |
| Dark mode contrast issues | Low | Medium | Test both themes during browser validation |

## Open Questions

> [!IMPORTANT]
> **Dot Background Pattern**: The sign-in prototype uses a `.bento-pattern` radial-gradient dot background. Should this be applied to both pages via the auth layout, or only on the sign-in page? The sign-up prototype doesn't have it explicitly. **Recommendation**: Apply to both via the auth layout for visual consistency.

> [!NOTE]
> **Social OAuth Buttons**: These are currently non-functional stubs. The prototype uses "Google" and "Github" labels. Should these remain as visual placeholders, or should they be hidden until OAuth integration is ready? **Recommendation**: Keep them visible as stubs per the prototype.

## Notes

- The project uses `pnpm` as its package manager and Next.js 16 with Turbopack
- shadcn is configured with `radix-nova` style and `lucide` icon library
- The `(auth)` route group already exists with `login/` and `register/` subdirectories
- The `user-mgmt` feature slice has the correct FSD directory structure but is empty (only `.gitkeep` files)
- Fonts (Geist via `Inter` + `Geist_Mono`) are already configured in the root layout
- The root layout wraps everything in `ThemeProvider` (next-themes) — dark mode works automatically
