# Plan: Admin Payments, Transaction History & Pickups Pages

## Summary
Build the three Operations module pages for the Admin Dashboard — Payment Management, Transaction History, and Pickup Management — based on the provided Stitch.ai HTML prototypes. Each page follows the established FSD component architecture with mock data, lucide-react icons, and existing Tailwind theme tokens.

## User Story
As an administrator, I want dedicated pages for Payments (summary cards + payment records table), Transaction History (KPIs + branch transaction table with search), and Pickups (4 summary cards + pending pickups table with confirm/view actions) so that I can oversee all operational workflows across branches.

## Problem → Solution
Placeholder stub pages at `/admin/payments`, `/admin/history`, `/admin/pickups` → Fully styled, data-rich pages matching the prototypes.

## Metadata
- **Complexity**: Large
- **Source PRD**: N/A
- **PRD Phase**: N/A
- **Estimated Files**: 12

---

## Mandatory Reading

| Priority | File | Why |
|---|---|---|
| P0 | `src/features/admin-dashboard/components/reservation-metrics.tsx` | Metric card pattern (vertical KPI) |
| P0 | `src/features/admin-dashboard/components/user-metrics.tsx` | Horizontal metric card with left-border accent |
| P0 | `src/features/admin-dashboard/components/reservation-table.tsx` | Table with search, status badges, pagination |
| P1 | `src/features/admin-dashboard/components/admin-topbar.tsx` | Route-based title/subtitle mapping |
| P1 | `src/features/admin-dashboard/components/index.ts` | Barrel export pattern |

---

## Patterns to Mirror

### METRIC_CARD_WITH_PROGRESS_BAR (Payments)
```tsx
// New pattern from prototype — vertical card with left border accent + bottom progress bar
<div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col justify-between border-l-4 border-l-primary">
  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Label</span>
  <div className="mt-4">
    <h4 className="text-2xl font-black text-foreground">₱35.00</h4>
    <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-primary" style={{ width: '100%' }}></div>
    </div>
  </div>
</div>
```

### PICKUP_SUMMARY_CARD (Pickups)
```tsx
// New pattern — tall card with absolute left-edge stripe + bottom trend line
<div className="bg-card p-8 rounded-xl border border-border shadow-sm relative overflow-hidden flex flex-col justify-between h-[140px]">
  <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
  <p className="text-[11px] text-muted-foreground uppercase tracking-widest">Label</p>
  <h3 className="text-[32px] font-bold text-foreground">124</h3>
  <div className="flex items-center gap-1 text-xs font-medium text-primary">
    <TrendingUp className="h-3.5 w-3.5" /> 12% vs last week
  </div>
</div>
```

### TABLE_SECTION (established)
```tsx
// SOURCE: reservation-table.tsx
<section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
  <div className="... bg-muted/20 border-b border-border ...">Header</div>
  <table className="w-full text-left border-collapse">
    <thead className="bg-muted/10 border-b border-border">...</thead>
    <tbody className="divide-y divide-border">...</tbody>
  </table>
  <div className="... bg-muted/5 border-t border-border ...">Pagination</div>
</section>
```

### PAGE_ASSEMBLY (established)
```tsx
// SOURCE: reservations/page.tsx
import { Components } from "@/features/admin-dashboard"
export default function Page() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-8">...</div>
  )
}
```

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `src/features/admin-dashboard/components/payment-metrics.tsx` | CREATE | 3 summary cards with progress bars (Total, Cash, GCash) |
| `src/features/admin-dashboard/components/payment-table.tsx` | CREATE | Payment records table with method/status badges, Filter/Export header, pagination |
| `src/features/admin-dashboard/components/history-metrics.tsx` | CREATE | 2 KPI cards (Total Transactions, Total Sales) with border-left accents |
| `src/features/admin-dashboard/components/history-table.tsx` | CREATE | Branch transaction table with search, payment method tags, pagination |
| `src/features/admin-dashboard/components/pickup-metrics.tsx` | CREATE | 4 summary cards (Total, Completed, Pending, Delayed) with absolute stripe + trend |
| `src/features/admin-dashboard/components/pickup-table.tsx` | CREATE | Pending pickups table with customer detail rows, status dot badges, confirm/view actions |
| `src/features/admin-dashboard/components/index.ts` | UPDATE | Export 6 new components |
| `src/features/admin-dashboard/components/admin-topbar.tsx` | UPDATE | Add subtitles for payments, history, pickups routes |
| `src/app/admin/(operations)/payments/page.tsx` | UPDATE | Assemble Payments page |
| `src/app/admin/(operations)/history/page.tsx` | UPDATE | Assemble Transaction History page |
| `src/app/admin/(operations)/pickups/page.tsx` | UPDATE | Assemble Pickups page |

## NOT Building
- Real payment processing or verification logic
- API integration or real data fetching
- Modal dialogs for viewing payment/transaction details
- Actual search/filter state management
- Real pagination

---

## Step-by-Step Tasks

### Task 1: Create Payment Components
- **ACTION**: Build `payment-metrics.tsx` and `payment-table.tsx`
- **IMPLEMENT**:
  - **Metrics**: 3-column grid. Each card has a left-4 border accent (primary / teal / amber), label, currency value, and a bottom progress bar.
    - Total Payments: ₱35.00, border-l-primary, 100% bar
    - Cash: ₱35.00, border-l-teal-500, 100% bar
    - GCash: ₱0.00, border-l-amber-500, 0% bar
  - **Table**: Header row with "Payment Records" title, Filter button (muted), Export button (primary). Columns: Payment ID (mono), Transaction, Amount (bold), Method (CASH=primary badge, GCASH=amber badge), Date & Time, Branch, Status (Verified=green, Pending=amber), Actions (Eye icon). 3 mock rows. Numbered pagination.
- **IMPORTS**: lucide-react: SlidersHorizontal, Download, Eye, ChevronLeft, ChevronRight
- **GOTCHA**: Method badges use different bg/text colors per type (CASH vs GCASH)
- **VALIDATE**: No type errors

### Task 2: Assemble Payments Page
- **ACTION**: Replace stub in `src/app/admin/(operations)/payments/page.tsx`
- **IMPLEMENT**: Import PaymentMetrics + PaymentTable, compose in page wrapper
- **MIRROR**: PAGE_ASSEMBLY pattern
- **VALIDATE**: Visit `/admin/payments`

### Task 3: Create Transaction History Components
- **ACTION**: Build `history-metrics.tsx` and `history-table.tsx`
- **IMPLEMENT**:
  - **Metrics**: 2-column grid. Each card has border-l-4 accent, label, large value, and optional trend indicator.
    - Total Transactions: 1,284, border-l-primary, "+12% this week" green trend
    - Total Sales (PHP): ₱45,920.00, border-l-teal-500
  - **Table**: Header with "All Branch Transactions" title + subtitle, search input, Export button. Columns: Date, Transaction ID (mono primary), Branch, Cashier, Items, Total (bold), Payment (CASH=muted badge, GCASH=accent badge), Status (Completed=green, Pending=yellow), Action (Eye). 3 mock rows. Pagination.
- **IMPORTS**: lucide-react: TrendingUp, Search, Download, Eye, ChevronLeft, ChevronRight
- **GOTCHA**: Payment method uses different badge styles than Payments page (rounded bg instead of pill)
- **VALIDATE**: No type errors

### Task 4: Assemble Transaction History Page
- **ACTION**: Replace stub in `src/app/admin/(operations)/history/page.tsx`
- **IMPLEMENT**: Import HistoryMetrics + HistoryTable, compose in page wrapper
- **MIRROR**: PAGE_ASSEMBLY pattern
- **VALIDATE**: Visit `/admin/history`

### Task 5: Create Pickup Components
- **ACTION**: Build `pickup-metrics.tsx` and `pickup-table.tsx`
- **IMPLEMENT**:
  - **Metrics**: 4-column grid. Tall cards (h-[140px]) with absolute left stripe, large number value, and bottom trend/status line.
    - Total Orders: 124, primary stripe, "12% vs last week" TrendingUp
    - Completed: 98, emerald stripe, "82% success rate" CheckCircle2
    - Pending: 18, amber stripe, "Action required" Clock
    - Delayed: 8, destructive stripe, "Immediate attention" AlertTriangle
  - **Table**: Header with "Pending Pickups" title, search input, Filter button. Columns: Order ID (mono primary), Customer (name + email stacked), Branch, Items (center), Scheduled Date, Status (dot+label: READY FOR PICKUP=primary pulsing dot, PENDING=muted dot), Actions (CheckCircle2 confirm + Eye view as bordered buttons). 2 mock rows. Pagination with ellipsis.
- **IMPORTS**: lucide-react: TrendingUp, CheckCircle2, Clock, AlertTriangle, Search, SlidersHorizontal, Eye, ChevronLeft, ChevronRight
- **GOTCHA**: Pickup status uses a pulsing animated dot for "READY FOR PICKUP" → use `animate-pulse` on a small circle
- **VALIDATE**: No type errors

### Task 6: Assemble Pickups Page
- **ACTION**: Replace stub in `src/app/admin/(operations)/pickups/page.tsx`
- **IMPLEMENT**: Import PickupMetrics + PickupTable, compose in page wrapper
- **MIRROR**: PAGE_ASSEMBLY pattern
- **VALIDATE**: Visit `/admin/pickups`

### Task 7: Update Exports & Topbar
- **ACTION**: Update `index.ts` with 6 new exports. Update `admin-topbar.tsx` subtitles.
- **IMPLEMENT**: Add subtitles:
  - Payments → "Review and verify payments via cash and GCash"
  - History → "Review all past transactions from every branch, ensuring accurate record tracking and verification of sales."
  - Pickups → "Monitor and confirm pickups across all branches in real-time."
- **VALIDATE**: `pnpm run validate` passes with zero errors

---

## Validation Commands

### Static Analysis
```bash
pnpm run validate
```
EXPECT: Zero type errors and zero lint errors

### Browser Validation
- Navigate to `/admin/payments` — verify 3 summary cards and payment records table
- Navigate to `/admin/history` — verify 2 KPI cards and branch transactions table
- Navigate to `/admin/pickups` — verify 4 summary cards and pending pickups table

---

## Acceptance Criteria
- [ ] Payments page matches prototype (3 progress-bar cards, records table with method/status badges)
- [ ] Transaction History page matches prototype (2 KPI cards, full transaction table with search)
- [ ] Pickups page matches prototype (4 tall summary cards, pending pickups table with action buttons)
- [ ] All badge colors match prototype per status/method type
- [ ] Uses FSD structure and existing theme variables
- [ ] Uses lucide-react icons (no Material Symbols)
- [ ] No globals.css modifications
- [ ] `pnpm run validate` passes cleanly
