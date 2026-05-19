# Plan: Admin Reservations & User Management Pages

## Summary
Build the Reservation Management and User Management pages for the Admin Dashboard based on the provided Stitch.ai HTML prototypes. Both pages follow the established FSD component architecture, use lucide-react icons mapped from Material Symbols, and leverage the existing Tailwind theme variables.

## User Story
As an administrator, I want dedicated pages for Reservations (KPIs, filters, searchable table with status badges and actions) and User Management (metrics, search/filter bar, user table with role badges and CRUD actions) so that I can manage customer reservations and system users across all branches.

## Problem → Solution
Placeholder stub pages at `/admin/reservations` and `/admin/users` → Fully styled, data-rich pages matching the prototypes.

## Metadata
- **Complexity**: Large
- **Source PRD**: N/A
- **PRD Phase**: N/A
- **Estimated Files**: 10

---

## Mandatory Reading

| Priority | File | Why |
|---|---|---|
| P0 | `src/features/admin-dashboard/components/monitoring-metrics.tsx` | Metric card pattern |
| P0 | `src/features/admin-dashboard/components/transaction-details-table.tsx` | Table + pagination pattern |
| P0 | `src/features/admin-dashboard/components/sales-filters.tsx` | Filter controls pattern |
| P1 | `src/features/admin-dashboard/components/admin-topbar.tsx` | Route-based title mapping |
| P1 | `src/features/admin-dashboard/components/index.ts` | Barrel export pattern |

---

## Patterns to Mirror

### METRIC_CARD
```tsx
// SOURCE: monitoring-metrics.tsx
<div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col ...">
  <div className="flex justify-between items-start">
    <div className="p-3 bg-primary/10 rounded-lg text-primary"><Icon /></div>
    <span className="... text-[11px] ... rounded-full">Badge</span>
  </div>
  <div className="mt-8">
    <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Label</p>
    <h3 className="text-3xl font-bold text-foreground tracking-tight">Value</h3>
  </div>
</div>
```

### TABLE_SECTION
```tsx
// SOURCE: transaction-details-table.tsx
<section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
  <div className="px-6 py-3 bg-muted/20 border-b border-border ...">Header</div>
  <table className="w-full text-left border-collapse">
    <thead className="bg-background border-b border-border">
      <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
    </thead>
    <tbody className="divide-y divide-border">...</tbody>
  </table>
  <div className="px-6 py-4 bg-background border-t border-border ...">Pagination</div>
</section>
```

### PAGE_ASSEMBLY
```tsx
// SOURCE: monitoring/page.tsx
import { Components } from "@/features/admin-dashboard"
export default function Page() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <Component1 />
      <Component2 />
    </div>
  )
}
```

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `src/features/admin-dashboard/components/reservation-metrics.tsx` | CREATE | 4 KPI cards (Total, Pending, Completed, Cancelled) |
| `src/features/admin-dashboard/components/reservation-filters.tsx` | CREATE | Status/Branch/Date filter controls |
| `src/features/admin-dashboard/components/reservation-table.tsx` | CREATE | Reservation data table with status badges, avatar initials, and action buttons |
| `src/features/admin-dashboard/components/user-metrics.tsx` | CREATE | 3 metric cards (New Users, Active Rate, Role Types) |
| `src/features/admin-dashboard/components/user-table.tsx` | CREATE | User data table with role badges, status dots, and edit/delete actions |
| `src/features/admin-dashboard/components/index.ts` | UPDATE | Export new components |
| `src/features/admin-dashboard/components/admin-topbar.tsx` | UPDATE | Add subtitles for reservations and users routes |
| `src/app/admin/(management)/reservations/page.tsx` | UPDATE | Assemble Reservations page |
| `src/app/admin/(management)/users/page.tsx` | UPDATE | Assemble User Management page |

## NOT Building
- Real CRUD operations or API calls (mock data only)
- Modal dialogs for editing/viewing details
- Actual search filtering logic
- Real pagination

---

## Step-by-Step Tasks

### Task 1: Create Reservation Components
- **ACTION**: Build `reservation-metrics.tsx`, `reservation-filters.tsx`, `reservation-table.tsx`
- **IMPLEMENT**: 
  - **Metrics**: 4-column grid with CalendarCheck, Clock, CheckCircle2, XCircle icons. Badges: "+12%", "Active", "92% Success", "4% Growth"
  - **Filters**: Status dropdown, Branch dropdown, Date input, Export button
  - **Table**: Columns: ID, Customer (avatar initials), Branch, Items, Pickup Date, Status (Pending/Completed/Confirmed/Cancelled badges), Actions (Eye/Edit). Pagination with page numbers.
- **MIRROR**: METRIC_CARD, TABLE_SECTION patterns
- **IMPORTS**: lucide-react icons, cn utility
- **GOTCHA**: Status badge colors: Pending=amber, Completed=green, Confirmed=blue/primary, Cancelled=destructive
- **VALIDATE**: No type errors

### Task 2: Assemble Reservations Page
- **ACTION**: Update `src/app/admin/(management)/reservations/page.tsx`
- **IMPLEMENT**: Import and compose ReservationMetrics, ReservationFilters, ReservationTable
- **MIRROR**: PAGE_ASSEMBLY pattern
- **VALIDATE**: Visit `/admin/reservations`

### Task 3: Create User Management Components
- **ACTION**: Build `user-metrics.tsx`, `user-table.tsx`
- **IMPLEMENT**:
  - **Metrics**: 3-column grid with horizontal layout (icon circle left, text right). Cards: "New this week: 12 Users", "Active Rate: 94.2%", "Role Types: 4 Types". Border-left accents.
  - **Table**: Search bar + Filters + Add User button action bar. Columns: Name (avatar initials), Email, Role (colored badge), Branch, Status (dot + text), Join Date, Actions (edit/delete). Pagination with numbered pages.
- **MIRROR**: METRIC_CARD (horizontal variant), TABLE_SECTION patterns
- **IMPORTS**: lucide-react: UserPlus, ShieldCheck, Shield, Search, SlidersHorizontal, Plus, Pencil, Trash2, ChevronLeft, ChevronRight
- **GOTCHA**: Role badges have different colors per role (Admin=primary, Cashier=muted, Staff=gray, Customer=accent). Status uses inline dot indicator.
- **VALIDATE**: No type errors

### Task 4: Assemble User Management Page
- **ACTION**: Update `src/app/admin/(management)/users/page.tsx`
- **IMPLEMENT**: Import and compose UserMetrics, search/action bar, UserTable
- **MIRROR**: PAGE_ASSEMBLY pattern
- **VALIDATE**: Visit `/admin/users`

### Task 5: Update Exports & Topbar
- **ACTION**: Update `index.ts` with new exports. Update `admin-topbar.tsx` subtitles.
- **IMPLEMENT**: Add subtitles: Reservations → "Monitor and manage all customer reservations across branches", Users → "Add, Edit, Remove, and manage users"
- **VALIDATE**: `pnpm run validate` passes with zero errors

---

## Validation Commands

### Static Analysis
```bash
pnpm run validate
```
EXPECT: Zero type errors and zero lint errors

### Browser Validation
- Navigate to `/admin/reservations` — verify KPIs, filters, and table render correctly
- Navigate to `/admin/users` — verify metrics, search bar, and table render correctly

---

## Acceptance Criteria
- [ ] Reservations page matches prototype layout (4 KPIs, filter card, data table with pagination)
- [ ] User Management page matches prototype layout (3 metric cards, search/action bar, user table with pagination)
- [ ] Status badges use correct colors per status type
- [ ] Avatar initials render correctly in table rows
- [ ] Uses FSD structure and existing theme variables
- [ ] Uses lucide-react icons (no Material Symbols)
- [ ] No globals.css modifications
- [ ] `pnpm run validate` passes cleanly
