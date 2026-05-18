# Plan: Authentication Pages Rebuild (Sign-In & Sign-Up)

## Summary
Rebuild the existing Sign-In (`/login`) and Sign-Up (`/register`) pages to match the high-fidelity prototypes provided from `stitch.ai`. The pages already exist with a working component structure in the `(auth)` route group — this plan updates them to align with the prototype's design, removes elements not present in the prototype (social auth, divider, role toggle), and adds missing elements (remember me checkbox, "Lourdes Sari-Sari Store" subtitle).

## User Story
As a BentaHub customer, I want a clean and professional sign-in/sign-up experience, so that I can quickly access my dashboard.

## Problem → Solution
Current pages use generic placeholders and include Social Auth (Google/Github) buttons and an "or continue with" divider that are **not** in the prototype → Rebuild pages to match the exact prototype layout with only email/password fields, a "Remember me" checkbox, and a clean card design.

## Metadata
- **Complexity**: Small
- **Source PRD**: N/A (Prototype-driven)
- **PRD Phase**: N/A
- **Estimated Files**: 7

---

## UX Design

### Sign-In — Before
```
┌─────────────────────────────────┐
│   [Icon] BentaHub              │
│   "Your trusted neighborhood"   │
│ ┌─────────────────────────────┐ │
│ │ Sign In                     │ │
│ │ [Email]                     │ │
│ │ [Password]  Forgot Password?│ │
│ │ [Sign In Button]            │ │
│ │ ── or continue with ──      │ │
│ │ [Google]  [Github]          │ │
│ │ Don't have an account?      │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### Sign-In — After (Prototype)
```
┌─────────────────────────────────┐
│   [Icon] BentaHub              │
│   "Lourdes Sari-Sari Store"    │
│ ┌─────────────────────────────┐ │
│ │ Sign In                     │ │
│ │ [Email]                     │ │
│ │ [Password]                  │ │
│ │ [✓ Remember me] [Forgot?]   │ │
│ │ [Sign In Button]            │ │
│ │ Don't have an account?      │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### Sign-Up — Before
```
┌─────────────────────────────────┐
│   [Icon] BentaHub              │
│ ┌─────────────────────────────┐ │
│ │ Create an account           │ │
│ │ "Join our neighborhood..."  │ │
│ │ [Full Name]                 │ │
│ │ [Email]                     │ │
│ │ [Phone]                     │ │
│ │ [Role: Customer | Staff]    │ │
│ │ [Password]                  │ │
│ │ "Min 8 chars..."            │ │
│ │ [Sign Up Button]            │ │
│ │ Already have an account?    │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### Sign-Up — After (Prototype)
```
┌─────────────────────────────────┐
│   [■ Icon] BentaHub            │
│ ┌─────────────────────────────┐ │
│ │ Create an account           │ │
│ │ [Full Name]                 │ │
│ │ [Email]                     │ │
│ │ [Phone]                     │ │
│ │ [Password + eye toggle]     │ │
│ │ "Min 8 chars with symbol"   │ │
│ │ [Sign Up Button]            │ │
│ │ Already have an account?    │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### Interaction Changes
| Touchpoint | Before | After | Notes |
|---|---|---|---|
| Sign-In: Social Auth | Google & Github buttons shown | **Removed** | Not in prototype |
| Sign-In: Divider | "or continue with" divider shown | **Removed** | Not in prototype |
| Sign-In: Remember Me | Not present | **Added** checkbox + label | Below password field |
| Sign-In: Forgot Password | Above password label | Moved to **right of Remember Me** | Same row as checkbox |
| Sign-In: Subtitle | "Your trusted neighborhood partner." | **"Lourdes Sari-Sari Store"** | Matches prototype |
| Sign-Up: Subtitle/Description | "Join our neighborhood partner ecosystem today." | **Removed** | Not in prototype |
| Sign-Up: Role Toggle | Customer/Staff toggle shown | **Removed** | Not in prototype |
| Sign-Up: Card shape | `rounded-lg` | `rounded-xl` | Matches prototype |

---

## Mandatory Reading

| Priority | File | Lines | Why |
|---|---|---|---|
| P0 | `src/app/(auth)/login/page.tsx` | all | Current sign-in page to update |
| P0 | `src/app/(auth)/register/page.tsx` | all | Current sign-up page to update |
| P0 | `src/app/(auth)/layout.tsx` | all | Auth layout (bento pattern background) |
| P1 | `src/features/user-mgmt/components/auth-header.tsx` | all | Shared branding header |
| P1 | `src/features/user-mgmt/components/password-input.tsx` | all | Reusable password input |
| P1 | `src/features/user-mgmt/components/index.ts` | all | Barrel exports to update |
| P2 | `src/components/ui/input.tsx` | all | Base Input component styling |

---

## Patterns to Mirror

### COMPONENT_STRUCTURE
```tsx
// SOURCE: src/app/(auth)/login/page.tsx:1-11
"use client"
import * as React from "react"
import Link from "next/link"
import { LogIn, Mail } from "lucide-react"
import { AuthHeader, PasswordInput } from "@/features/user-mgmt"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
```

### LABEL_STYLE
```tsx
// SOURCE: src/app/(auth)/login/page.tsx:29
<Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
```

### ICON_INPUT_PATTERN
```tsx
// SOURCE: src/app/(auth)/login/page.tsx:32-41
<div className="relative">
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
  <Input id="email" type="email" placeholder="name@company.com" className="pl-10" required />
</div>
```

### AUTH_HEADER_USAGE
```tsx
// SOURCE: src/app/(auth)/login/page.tsx:20
<AuthHeader subtitle="Your trusted neighborhood partner." />
```

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `src/app/(auth)/login/page.tsx` | UPDATE | Remove social auth/divider, add remember me, update subtitle |
| `src/app/(auth)/register/page.tsx` | UPDATE | Remove role toggle & description, remove CardDescription |
| `src/features/user-mgmt/components/auth-header.tsx` | UPDATE | Use `Store` icon instead of `Network` |
| `src/features/user-mgmt/components/index.ts` | UPDATE | Remove social-auth-buttons and auth-divider exports |
| `src/features/user-mgmt/components/social-auth-buttons.tsx` | DELETE | Not in prototype |
| `src/features/user-mgmt/components/auth-divider.tsx` | DELETE | Not in prototype |
| `src/features/user-mgmt/components/role-toggle.tsx` | DELETE | Not in prototype |

## NOT Building
- Backend authentication logic (remains stubbed)
- Forgot Password page
- Email verification flow
- OAuth/social login integration
- Any changes to `globals.css`

---

## Step-by-Step Tasks

### Task 1: Update AuthHeader — Use Store icon & default subtitle
- **ACTION**: Change the icon from `Network` to `Store` (lucide-react) to match the storefront icon in the prototype. Keep the BentaHub title.
- **IMPLEMENT**: Replace `Network` import with `Store` import. Change `<Network className="size-7" />` to `<Store className="size-7" />`.
- **MIRROR**: Existing AuthHeader component structure.
- **IMPORTS**: `import { Store } from "lucide-react"`
- **GOTCHA**: The `Store` icon is already imported elsewhere (dashboard-sidebar) — no conflicts since this is a different file.
- **VALIDATE**: Build passes, auth header shows a storefront-like icon.

### Task 2: Update Sign-In Page — Match prototype layout
- **ACTION**: Remove `AuthDivider` and `SocialAuthButtons` imports/usage. Add "Remember me" checkbox next to "Forgot Password?" link. Update subtitle to "Lourdes Sari-Sari Store". Move "Forgot Password?" from above the password field to below it (same row as Remember me). Add `p-5` to make the button taller.
- **IMPLEMENT**: Rewrite the login page form to match prototype layout exactly:
  1. `<AuthHeader subtitle="Lourdes Sari-Sari Store" />`
  2. Email field (unchanged)
  3. Password field with label only (no "Forgot Password?" next to label)
  4. Below password: flex row with `[✓ Remember me]` left and `[Forgot Password?]` right
  5. Sign In button (full width, with LogIn icon)
  6. "Don't have an account?" footer text
- **MIRROR**: ICON_INPUT_PATTERN, LABEL_STYLE
- **IMPORTS**: Remove `AuthDivider`, `SocialAuthButtons` from imports.
- **GOTCHA**: The `Checkbox` component from shadcn is not installed. Use a native `<input type="checkbox">` with Tailwind classes to keep it simple.
- **VALIDATE**: Build passes. Login page renders with no social auth buttons, has remember me checkbox.

### Task 3: Update Sign-Up Page — Match prototype layout
- **ACTION**: Remove `RoleToggle` and `Role` imports/usage. Remove `CardDescription`. Remove the `role` state. Ensure the card uses `rounded-xl`.
- **IMPLEMENT**: Rewrite the register page:
  1. `<AuthHeader />` (no subtitle, as in prototype)
  2. Card with `rounded-xl` and `border-border shadow-sm`
  3. Header: only `<CardTitle>Create an account</CardTitle>` — no description
  4. Fields: Full Name, Email, Phone, Password (with hint text)
  5. Sign Up button (full width, with ArrowRight icon)
  6. "Already have an account?" footer text
- **MIRROR**: COMPONENT_STRUCTURE, LABEL_STYLE, ICON_INPUT_PATTERN
- **IMPORTS**: Remove `RoleToggle`, `Role`. Remove `CardDescription`.
- **GOTCHA**: Remove the `const [role, setRole] = React.useState<Role>("customer")` state line.
- **VALIDATE**: Build passes. Register page renders without role toggle.

### Task 4: Update barrel exports — Remove deleted components
- **ACTION**: Remove exports for `social-auth-buttons`, `auth-divider`, and `role-toggle` from the user-mgmt components barrel.
- **IMPLEMENT**: Update `src/features/user-mgmt/components/index.ts` to only export `auth-header` and `password-input`.
- **MIRROR**: Existing barrel export pattern.
- **IMPORTS**: N/A
- **GOTCHA**: Make sure no other files import these deleted components. Search codebase before deleting.
- **VALIDATE**: Build passes with no missing module errors.

### Task 5: Delete unused component files
- **ACTION**: Delete `social-auth-buttons.tsx`, `auth-divider.tsx`, and `role-toggle.tsx`.
- **IMPLEMENT**: Remove the three files from `src/features/user-mgmt/components/`.
- **MIRROR**: N/A
- **IMPORTS**: N/A
- **GOTCHA**: Ensure Task 4 (barrel update) is done first so no import breaks.
- **VALIDATE**: Build passes cleanly.

### Task 6: Verify build & visual check
- **ACTION**: Run `npm run build` and visually verify both pages.
- **IMPLEMENT**: N/A
- **IMPORTS**: N/A
- **GOTCHA**: Ensure both `/login` and `/register` routes are listed in the build output.
- **VALIDATE**: Build exits with code 0. Both routes prerendered successfully.

---

## Testing Strategy

### Manual Verification
- [ ] `/login` page shows: BentaHub header with Store icon, "Lourdes Sari-Sari Store" subtitle, email field, password field, remember me checkbox, forgot password link, Sign In button, "Create an account" link
- [ ] `/login` page does NOT show: social auth buttons, "or continue with" divider
- [ ] `/register` page shows: BentaHub header with Store icon, "Create an account" title, full name/email/phone/password fields, password hint, Sign Up button, "Sign in instead" link
- [ ] `/register` page does NOT show: role toggle, card description, social auth
- [ ] Navigation between `/login` ↔ `/register` works via the links

---

## Validation Commands

### Build
```bash
npm run build
```
EXPECT: Zero errors, both `/login` and `/register` listed in route output.

### Dev Server
```bash
pnpm dev
```
EXPECT: Pages render correctly at `localhost:3000/login` and `localhost:3000/register`.

---

## Acceptance Criteria
- [ ] All tasks completed
- [ ] Build passes with zero errors
- [ ] Sign-In page matches prototype (no social auth, has remember me)
- [ ] Sign-Up page matches prototype (no role toggle, no description)
- [ ] AuthHeader uses Store icon
- [ ] Unused components deleted
- [ ] `globals.css` NOT modified
- [ ] FSD architecture maintained

## Completion Checklist
- [ ] Code follows discovered patterns (Label style, icon input pattern)
- [ ] No hardcoded values (uses theme variables via Tailwind classes)
- [ ] No unnecessary scope additions
- [ ] Self-contained — no questions needed during implementation

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Deleted components imported elsewhere | Low | Medium | Search codebase before deleting |
| Checkbox styling mismatch | Low | Low | Use native checkbox with Tailwind for consistency |

## Notes
- The prototype uses Material Symbols for icons — we continue using `lucide-react` per project convention.
- The prototype uses a `bento-pattern` dot background — this is already implemented in the `(auth)/layout.tsx`.
- No backend auth logic is implemented; form submissions remain stubbed.
