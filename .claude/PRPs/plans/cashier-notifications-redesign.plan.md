# Plan: Cashier Notifications Page

## Summary
Build a new Notifications page for the Cashier dashboard matching the stitch.ai reference design. This involves creating a new route (`/cashier/notifications`), a notification feed component with filter chips, mock notification data, adding the route to the sidebar navigation and topbar title logic. Follows the existing FSD architecture exactly.

## User Story
As a **Cashier operator**,
I want a **dedicated notifications feed with category filters and actionable alerts**,
So that **I can quickly see new reservations, payment verifications, low stock alerts, and system updates without leaving the POS dashboard**.

## Problem → Solution
**Current state**: The cashier dashboard has no notifications page. The topbar has a bell icon but it doesn't link anywhere. There is no `/cashier/notifications` route.

**Desired state**: A full notification feed page at `/cashier/notifications` with filter chips (All, Orders, Payments, System), notification cards with left-accent borders, action buttons, timestamps, and a "Load previous notifications" link — all styled to match the stitch.ai reference using the project's existing theme tokens.

## Metadata
- **Complexity**: Medium
- **Source PRD**: stitch.ai HTML reference (provided inline by user)
- **PRD Phase**: N/A
- **Estimated Files**: 5 files (3 new, 2 modified)

---

## UX Design

### Before
```
┌─────────────────────────────────────────────────────────────────┐
│ [Sidebar 280px][         TopAppBar (80px)                     ] │
│ [bg-[#0c1221] ][ No "Notifications" link    | Bell (dead) |  ] │
│ [  POS System ]│                                              │ │
│ [  Stock Check]│     (No notifications page exists)           │ │
│ [  Payments   ]│                                              │ │
│ [  History    ]│                                              │ │
└─────────────────────────────────────────────────────────────────┘
```

### After (stitch.ai reference)
```
┌─────────────────────────────────────────────────────────────────┐
│ [Sidebar 280px][         TopAppBar (80px)                     ] │
│ [bg-[#0c1221] ][ h1 "Notifications"  | Bell(active) | User  ] │
│ [  POS System ]├──────────────────────────────────────────────│ │
│ [  Stock Check]│ [All●][Orders][Payments][System]  filter row │ │
│ [  Payments   ]│                                              │ │
│ [  History    ]│ ┌─ New Reservation ─────────────────────────┐│ │
│ [●Notifs     ]│ │ █ primary left-border                     ││ │
│ [             ]│ │ 🍴 icon  | Title + order ID              ││ │
│ [             ]│ │          | description text               ││ │
│ [             ]│ │          | [Confirm Order] [Details]      ││ │
│ [             ]│ └──────────────────────────────────────────┘│ │
│ [             ]│ ┌─ Payment Verified ────────────────────────┐│ │
│ [             ]│ │ ✓ green icon | Title + ref ID            ││ │
│ [             ]│ │              | GCash processed message    ││ │
│ [             ]│ │              | [Transaction Logged] badge ││ │
│ [             ]│ └──────────────────────────────────────────┘│ │
│ [             ]│ ┌─ Low Stock Alert ─────────────────────────┐│ │
│ [             ]│ │ █ red left-border                         ││ │
│ [             ]│ │ ⚠ error icon | Title + product name      ││ │
│ [             ]│ │              | [Restock Now] button       ││ │
│ [             ]│ └──────────────────────────────────────────┘│ │
│ [             ]│ ┌─ System Update ───────────────────────────┐│ │
│ [             ]│ │ dashed border, muted bg                   ││ │
│ [             ]│ │ 🔄 icon | version changelog list          ││ │
│ [             ]│ └──────────────────────────────────────────┘│ │
│ [             ]│                                              │ │
│ [             ]│ [Load previous notifications ▼]              │ │
└─────────────────────────────────────────────────────────────────┘
```

### Interaction Changes
| Touchpoint | Before | After | Notes |
|---|---|---|---|
| Sidebar nav | No notifications link | New "Notifications" nav item with Bell icon | Appears under "Operations" group |
| Topbar title | No "Notifications" case | Shows "Notifications" when on `/cashier/notifications` | Pathname-based switch |
| Bell icon | Static, no navigation | Links to `/cashier/notifications` | Wraps in `<Link>` |
| Filter chips | N/A | All/Orders/Payments/System pill tabs | Active uses `bg-primary text-primary-foreground` |
| Notification cards | N/A | 4 notification types with distinct styling | Left-accent borders, icon circles, action buttons |
| Load more | N/A | "Load previous notifications" link at bottom | Text link with chevron icon |

---

## Mandatory Reading

Files that MUST be read before implementing:

| Priority | File | Lines | Why |
|---|---|---|---|
| P0 (critical) | `src/features/staff-dashboard/components/staff-notifications-feed.tsx` | all | Existing notification feed pattern to mirror |
| P0 (critical) | `src/features/cashier-dashboard/components/cashier-sidebar.tsx` | 1-23 | NAV_ITEMS structure for adding new route |
| P0 (critical) | `src/features/cashier-dashboard/components/cashier-topbar.tsx` | 10-20 | Pathname-based title switching logic |
| P1 (important) | `src/app/cashier/payments/page.tsx` | all | Page composition pattern (wrapper div styling) |
| P1 (important) | `src/app/cashier/stock-check/page.tsx` | all | Confirms page wrapper pattern |
| P2 (reference) | `src/types/cashier.ts` | all | Type organization pattern |
| P2 (reference) | `src/features/cashier-dashboard/data/payments.ts` | all | Mock data file pattern |
| P2 (reference) | `src/app/globals.css` | all | Theme tokens (DO NOT MODIFY) |

## External Documentation

| Topic | Source | Key Takeaway |
|---|---|---|
| stitch.ai reference HTML | User-provided inline | Authoritative design spec for all visual changes |

---

## Patterns to Mirror

Code patterns discovered in the codebase. Follow these exactly.

### NAMING_CONVENTION
```tsx
// SOURCE: src/features/cashier-dashboard/components/payments-table.tsx:1-10
// Component: PascalCase, file: kebab-case, exports: named
export function PaymentsTable() {
```

### CN_UTILITY
```tsx
// SOURCE: src/features/cashier-dashboard/components/cashier-sidebar.tsx:78-83
// Always use cn() for conditional class merging
className={cn(
  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
  isActive
    ? "bg-primary/20 text-white font-semibold border-l-4 border-primary"
    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
)}
```

### PAGE_COMPOSITION
```tsx
// SOURCE: src/app/cashier/payments/page.tsx:6-16
// "use client", wrapper div with flex-1 p-6 space-y-6 overflow-y-auto bg-slate-50
"use client"
export default function PaymentsPage() {
  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto bg-slate-50">
      <PaymentSummaryCards />
      <PaymentsTable />
    </div>
  )
}
```

### ROUTE_PAGE_PATTERN
```tsx
// SOURCE: src/app/staff/notifications/page.tsx:1-5
// Thin route page importing feature component
import { StaffNotificationsFeed } from "@/features/staff-dashboard/components/staff-notifications-feed"

export default function StaffNotificationsPage() {
  return <StaffNotificationsFeed />
}
```

### NOTIFICATION_FEED_PATTERN
```tsx
// SOURCE: src/features/staff-dashboard/components/staff-notifications-feed.tsx:9-21
// Interface for notification items with typed fields
interface StaffNotificationItem {
  id: string
  title: string
  description?: string
  type: "order" | "overdue" | "sync" | "payout"
  icon: React.ReactNode
  iconBg: string
  borderColor: string
  titleColor: string
  timestamp: string
  metadata?: { label: string; value: string }[]
  actions?: { label: string; variant: "primary" | "outline" | "ghost"; href?: string }[]
}
```

### MOCK_DATA_INLINE
```tsx
// SOURCE: src/features/staff-dashboard/components/staff-notifications-feed.tsx:23-86
// Mock notifications defined as const array inside the component file (not in data/ folder)
const mockNotifications: StaffNotificationItem[] = [
  { id: "s1", title: "...", type: "order", ... },
]
```

### TOPBAR_TITLE_SWITCH
```tsx
// SOURCE: src/features/cashier-dashboard/components/cashier-topbar.tsx:13-20
let title = "POS System"
if (pathname === "/cashier/stock-check") {
  title = "Stock Check"
} else if (pathname === "/cashier/payments") {
  title = "Validate Payments"
} else if (pathname === "/cashier/transactions") {
  title = "Transaction History"
}
```

### SIDEBAR_NAV_ITEMS
```tsx
// SOURCE: src/features/cashier-dashboard/components/cashier-sidebar.tsx:8-23
const NAV_ITEMS = [
  {
    category: "Dashboard",
    links: [
      { href: "/cashier", label: "POS System", icon: Monitor },
    ],
  },
  {
    category: "Operations",
    links: [
      { href: "/cashier/stock-check", label: "Stock Check", icon: ClipboardList },
      { href: "/cashier/payments", label: "Payments", icon: Coins },
      { href: "/cashier/transactions", label: "Transaction History", icon: History },
    ],
  },
]
```

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `src/app/cashier/notifications/page.tsx` | CREATE | New route page for `/cashier/notifications` |
| `src/features/cashier-dashboard/components/cashier-notifications-feed.tsx` | CREATE | Main notification feed component with filter chips, notification cards, mock data |
| `src/features/cashier-dashboard/components/cashier-sidebar.tsx` | UPDATE | Add "Notifications" nav item with Bell icon to Operations group |
| `src/features/cashier-dashboard/components/cashier-topbar.tsx` | UPDATE | Add `Notifications` title case + make bell icon a Link to `/cashier/notifications` |

## NOT Building

- Backend API or database integration for notifications
- Real-time push notifications / WebSocket
- Read/unread state persistence
- Notification preferences/settings page
- Dark mode variation (light only for now per reference)
- Global CSS modifications (explicitly forbidden by user)
- New npm dependencies

---

## Step-by-Step Tasks

### Task 1: Create Cashier Notifications Feed Component
- **ACTION**: Create `src/features/cashier-dashboard/components/cashier-notifications-feed.tsx`
- **IMPLEMENT**:
  - Define `CashierNotificationItem` interface matching stitch.ai card types: `"reservation" | "payment" | "stock" | "system"`
  - Create `mockNotifications` array with 4 items matching the stitch.ai reference exactly:
    1. **New Reservation** — primary left-border, restaurant/utensils icon on `bg-primary/10`, "Confirm Order" + "Details" buttons
    2. **Payment Verified** — no left-border, green check icon on `bg-green-100`, "Transaction Logged" badge
    3. **Low Stock Alert** — red/destructive left-border, alert-triangle icon on `bg-red-100`, "Restock Now" button
    4. **System Update** — dashed border, muted bg, refresh icon on `bg-slate-100`, changelog bullet list
  - Filter chips row: `["All", "Orders", "Payments", "System"]` with `useState` for `selectedFilter`
    - Active: `bg-primary text-primary-foreground rounded-full shadow-sm`
    - Inactive: `bg-slate-200 text-slate-600 hover:bg-slate-300 rounded-full`
  - Notification cards layout:
    - Card wrapper: `bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow`
    - Left accent bar (for reservation/stock): `absolute left-0 top-0 bottom-0 w-1 bg-primary` or `bg-red-500`
    - Icon circle: `w-10 h-10 rounded-full flex items-center justify-center shrink-0`
    - Title row: `font-bold text-sm` + timestamp `text-[11px] text-slate-400 font-mono`
    - Description: `text-sm text-slate-500`
    - Action buttons: primary = `bg-primary text-primary-foreground rounded-lg text-xs font-bold px-3 py-1.5`, outline = `border border-slate-200 rounded-lg text-xs font-bold px-3 py-1.5`
  - "Load previous notifications" link at bottom: `text-primary font-bold text-xs hover:underline flex items-center gap-1`
  - Page wrapper: `flex-1 flex flex-col p-6 space-y-6 overflow-y-auto bg-background` with inner `max-w-5xl mx-auto w-full`
- **MIRROR**: NOTIFICATION_FEED_PATTERN, CN_UTILITY, NAMING_CONVENTION
- **IMPORTS**: `useState` from react, lucide-react icons (Utensils, CheckCircle, AlertTriangle, RefreshCw, ChevronDown), `cn` from `@/lib/utils`
- **GOTCHA**: Use `bg-background` not `bg-slate-50` for the outer wrapper (matching the POS redesign). Keep existing project fonts (Poppins/Source Code Pro), NOT Geist from reference. Use Lucide React icons, NOT Material Symbols. Map stitch.ai custom colors to existing Tailwind/theme tokens.
- **VALIDATE**: Component renders with all 4 notification types, filter chips switch state, responsive on mobile

### Task 2: Create Route Page
- **ACTION**: Create `src/app/cashier/notifications/page.tsx`
- **IMPLEMENT**: Thin wrapper page importing and rendering `CashierNotificationsFeed`
- **MIRROR**: ROUTE_PAGE_PATTERN
- **IMPORTS**: `CashierNotificationsFeed` from `@/features/cashier-dashboard/components/cashier-notifications-feed`
- **GOTCHA**: Do NOT add `"use client"` to the route page — the feed component already has it. Actually, looking at the staff pattern, the route page doesn't use "use client" but the payments page does. Follow the staff pattern (no "use client" on route page).
- **VALIDATE**: Navigating to `/cashier/notifications` renders the feed

### Task 3: Add Notifications to Sidebar Navigation
- **ACTION**: Update `src/features/cashier-dashboard/components/cashier-sidebar.tsx`
- **IMPLEMENT**: Add `{ href: "/cashier/notifications", label: "Notifications", icon: Bell }` to the "Operations" links array, after "Transaction History"
- **MIRROR**: SIDEBAR_NAV_ITEMS
- **IMPORTS**: Add `Bell` to the existing lucide-react import
- **GOTCHA**: Keep exact ordering. Bell is already used in `cashier-topbar.tsx` but NOT currently imported in `cashier-sidebar.tsx`. Must add Bell to the import statement.
- **VALIDATE**: Sidebar shows "Notifications" link, active state works when on `/cashier/notifications`

### Task 4: Update Topbar Title + Bell Link
- **ACTION**: Update `src/features/cashier-dashboard/components/cashier-topbar.tsx`
- **IMPLEMENT**:
  - Add `else if (pathname === "/cashier/notifications") { title = "Notifications" }` to the title switch
  - Wrap the bell icon `<button>` in a Next.js `<Link href="/cashier/notifications">` to make it navigable
- **MIRROR**: TOPBAR_TITLE_SWITCH
- **IMPORTS**: Add `Link` from `next/link`
- **GOTCHA**: The bell button currently has a red dot notification indicator — preserve it. Replace `<button>` with `<Link>` and apply the same classes. Ensure it still has `relative` for the absolute notification dot.
- **VALIDATE**: Clicking bell navigates to `/cashier/notifications`, title shows "Notifications"

---

## Testing Strategy

### Unit Tests
N/A — This is a UI-only feature with mock data, no business logic.

### Edge Cases Checklist
- [x] Filter "All" shows all notification types
- [x] Filter "Orders" shows only reservation type
- [x] Filter "Payments" shows only payment type
- [x] Filter "System" shows only system type
- [x] Empty filter state (no matching items) — show empty state message
- [x] Mobile viewport (<768px) — verify responsive card layout
- [x] Notification cards hover shadow transition
- [x] Action buttons clickable and styled correctly
- [x] Bell icon in topbar navigates correctly
- [x] Sidebar active state highlights on notifications page

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
EXPECT: Successful build, `/cashier/notifications` appears in route list

### Browser Validation
```bash
pnpm run dev
```
EXPECT:
- Navigate to `/cashier/notifications` — notifications page renders
- Filter chips switch active state
- All 4 notification types display with correct styling
- Sidebar highlights "Notifications" item
- Topbar shows "Notifications" title
- Clicking bell icon navigates to notifications page
- Mobile responsive layout works
- Hover effects on cards work

### Manual Validation
- [ ] Compare each notification card side-by-side with stitch.ai reference
- [ ] Verify responsive behavior at 375px, 768px, 1024px, 1440px
- [ ] Bell icon navigation works from any cashier page

---

## Acceptance Criteria
- [ ] New route `/cashier/notifications` exists and renders
- [ ] Feed component shows 4 mock notification types matching stitch.ai design
- [ ] Filter chips (All/Orders/Payments/System) work correctly
- [ ] Sidebar has "Notifications" link with Bell icon
- [ ] Topbar shows "Notifications" title on the page
- [ ] Bell icon links to notifications page
- [ ] `globals.css` NOT modified
- [ ] No new dependencies added
- [ ] All validation commands pass
- [ ] Full mobile responsiveness maintained

## Completion Checklist
- [ ] Code follows discovered FSD patterns
- [ ] All styling uses existing Tailwind classes and theme tokens
- [ ] cn() utility used for conditional classes
- [ ] Lucide icons used consistently (no Material Symbols)
- [ ] Project fonts preserved (Poppins/Source Code Pro, not Geist)
- [ ] No hardcoded values added
- [ ] Mobile responsive breakpoints maintained
- [ ] No unnecessary scope additions
- [ ] Self-contained — no questions needed during implementation

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Tailwind class misalignment with design | Low | Medium | Cross-reference each card type against stitch.ai HTML |
| Breaking mobile responsive layout | Low | High | Test at all breakpoints before/after |
| Sidebar nav ordering conflict | Very Low | Low | Add at end of Operations group |
| Font rendering differences | Low | Low | Project uses Poppins/Source Code Pro, not Geist — accept as-is |

## Notes
- The stitch.ai reference uses Geist font family, but the project uses Poppins (`--font-sans`) and Source Code Pro (`--font-mono`). We will NOT change fonts.
- The stitch.ai reference uses Material Symbols icons, but the project uses Lucide React. We will map: `restaurant` → `Utensils`, `verified` → `CheckCircle`, `warning` → `AlertTriangle`, `update` → `RefreshCw`, `expand_more` → `ChevronDown`.
- The reference HTML uses custom Tailwind colors (e.g., `primary-container`, `surface-container-low`). We will NOT adopt those — instead map to existing theme tokens (`bg-primary`, `text-foreground`, etc.) and standard Tailwind utilities.
- Notification data is mock/static — no backend integration. The `mockNotifications` array lives inside the component file (mirroring the staff notifications pattern), not in `data/`.
- The "Load previous notifications" button is decorative (shows an alert on click).
- The stitch.ai footer with "SERVER ONLINE" / "UTC+8:00" is NOT in scope — the cashier layout already has its own structure.
