# Plan: Staff Dashboard & Operations Panel

## Summary
Implement a highly polished, responsive, and functional **Staff Panel** for BentaHub inside the existing Next.js 16 project. This panel covers five core operations pages:
1. **Dashboard Overview** (`/staff`) — Operations KPI cards, branch metrics, and summary visuals.
2. **Transaction Monitoring** (`/staff/monitoring`) — Real-time stream of cashier/POS transactions, searching, and filtering.
3. **Inventory Updating** (`/staff/inventory`) — Comprehensive product stock levels list, real-time edit capabilities, and warning alerts.
4. **Transaction History** (`/staff/history`) — Searchable historical receipt records.
5. **Payment & Pickup** (`/staff/pickup`) — Validation list for Cash/GCash payments and client-pickup execution workflows.

This feature is designed using Feature-Sliced Design (FSD) patterns, utilizing existing CSS Tailwind theme variables, Lucide React icons, and robust client-side state.

## User Story
As a branch staff member, I want an integrated dashboard to manage daily inventory levels, monitor live store transactions, verify payments, and handle order pickups efficiently, so that operations remain seamless and error-free.

## Problem → Solution
Current `/staff` route contains a basic placeholder screen → Desired state provides a fully styled layout containing a custom sidebar, header, and five interactive operational pages with rich components and full state interactions (including updating inventory stock count and modal verification dialogs).

## Metadata
- **Complexity**: Large
- **Source PRD**: N/A
- **PRD Phase**: N/A
- **Estimated Files**: ~16 files

---

## UX Design

### Sidebar & Theme Styling
- **Navigation Shell**: Custom navy-blue sidebar (`bg-[#0c1221]`) with role indicator `Staff Panel`. Active routes highlighted in light-blue transparency with a blue vertical indicator bar (`border-blue-600`).
- **Dashboard Cards**: Bento-style KPI containers featuring light gray borders (`border-border`), white backgrounds (`bg-card`), rounded corners (`rounded-xl`), and micro-interactions on hover.
- **Action Buttons**: Sleek, theme-consistent button classes (`bg-primary`, `text-primary-foreground` for main actions; `border-border`, `hover:bg-muted` for filters).

---

## Mandatory Reading

| Priority | File | Why |
|---|---|---|
| P0 | `src/app/cashier/layout.tsx` | Mirror navigation wrapper pattern |
| P0 | `src/features/cashier-dashboard/components/cashier-sidebar.tsx` | Sidebar list design reference |
| P0 | `src/features/cashier-dashboard/components/cashier-topbar.tsx` | Route-based header rendering |
| P1 | `src/features/admin-dashboard/components/confirm-pickup-modal.tsx` | Modal/Dialog patterns for confirming states |

---

## Patterns to Mirror

### SIDEBAR_LAYOUT
```tsx
// Pattern: Nested responsive nav shell with sidebar and top header
<div className="min-h-screen bg-slate-50 text-slate-900 flex overflow-hidden">
  <StaffSidebar />
  <div className="flex-1 flex flex-col min-h-screen ml-[280px] overflow-hidden">
    <StaffTopbar />
    <main className="flex-1 overflow-y-auto p-6">{children}</main>
  </div>
</div>
```

### METRICS_GRID
```tsx
// Pattern: Reusable grid cards with Lucide icons and hover effects
<div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-muted-foreground">Label</span>
    <Icon className="w-5 h-5 text-blue-500" />
  </div>
  <div className="mt-2">
    <h3 className="text-3xl font-extrabold text-foreground">Value</h3>
    <span className="text-xs text-green-500 font-medium">Subtext / Status</span>
  </div>
</div>
```

### MODAL_CONFIRMATION
```tsx
// Pattern: Standard overlay drawer for processing verify/pickup tasks
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
```

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `src/features/staff-dashboard/components/staff-sidebar.tsx` | CREATE | Custom left navigation sidebar for staff roles |
| `src/features/staff-dashboard/components/staff-topbar.tsx` | CREATE | Header with notification counters, page titles, and user profile pill |
| `src/features/staff-dashboard/components/staff-kpi-cards.tsx` | CREATE | KPI metric cards for Dashboard overview |
| `src/features/staff-dashboard/components/live-transaction-feed.tsx` | CREATE | Live dashboard and details feed for Transaction Monitoring |
| `src/features/staff-dashboard/components/inventory-update-table.tsx` | CREATE | Inventory list table with interactive stock adjustments |
| `src/features/staff-dashboard/components/quick-stock-modal.tsx` | CREATE | Interactive edit form/modal for adjusting stock quantity |
| `src/features/staff-dashboard/components/staff-transaction-table.tsx` | CREATE | Past transaction records list with receipts preview |
| `src/features/staff-dashboard/components/payment-pickup-list.tsx` | CREATE | Dual tabs for payment confirmations and customer pickups |
| `src/features/staff-dashboard/components/verify-pickup-modal.tsx` | CREATE | Form modal to verify GCash/cash payment and confirm pickups |
| `src/features/staff-dashboard/components/index.ts` | CREATE | Export all feature-sliced components |
| `src/app/staff/layout.tsx` | UPDATE | Wrap routes with StaffSidebar and StaffTopbar shell |
| `src/app/staff/page.tsx` | UPDATE | Render staff Dashboard Overview |
| `src/app/staff/monitoring/page.tsx` | CREATE | Assemble live Transaction Monitoring page |
| `src/app/staff/inventory/page.tsx` | CREATE | Assemble Inventory Updating page |
| `src/app/staff/history/page.tsx` | CREATE | Assemble Transaction History page |
| `src/app/staff/pickup/page.tsx` | CREATE | Assemble Payment & Pickup page |

## NOT Building
- Real-time WebSockets/SSE server notifications (will use reactive local states and periodic polling simulations).
- Real inventory persistence database integration (simulated via local state / localStorage so updates persist within the browser session).
- Production payment gateways (all verification is administrative mock verification).

---

## Step-by-Step Tasks

### Task 1: Scaffolding Feature & Layout Navigation
- **ACTION**: Build `staff-sidebar.tsx`, `staff-topbar.tsx`, and `index.ts`. Update `src/app/staff/layout.tsx`.
- **IMPLEMENT**:
  - **Sidebar**: Include items for:
    - POS Dashboard (`/staff`, Icon: LayoutGrid)
    - Live Monitoring (`/staff/monitoring`, Icon: Activity)
    - Inventory Stock (`/staff/inventory`, Icon: PackageSearch)
    - Past History (`/staff/history`, Icon: History)
    - Payments & Pickups (`/staff/pickup`, Icon: CheckCircle2)
  - **Topbar**: Route-based title parsing, bell icon with static badge, profile info ("Dolly Cruz", "Branch Staff").
  - **Layout**: Configure margins and layout offsets (`ml-[280px]`) and scrolling behavior.
- **VALIDATE**: Navigation behaves smoothly; sidebar active states highlight properly as routes change.

### Task 2: Implement Staff Dashboard Page
- **ACTION**: Build `staff-kpi-cards.tsx` and update `src/app/staff/page.tsx`.
- **IMPLEMENT**:
  - Four key metric cards:
    - **Total Products Managed** (e.g. 142 SKUs)
    - **Low Stock Warnings** (e.g. 12 alerts, highlight red if > 0)
    - **Pending Pickups** (e.g. 8 orders, amber accent)
    - **Today's Verified Transactions** (e.g. ₱14,850.00, green trend)
  - Layout also features a list of recent stock changes and quick system operational alerts.
- **VALIDATE**: Metrics look crisp and align beautifully in grid configurations.

### Task 3: Implement Live Transaction Monitoring
- **ACTION**: Create `/staff/monitoring/page.tsx` and `live-transaction-feed.tsx`.
- **IMPLEMENT**:
  - Real-time-looking ledger card showing POS sales as they occur.
  - Filters: Payment type (Cash, GCash), Status (Completed, Voided).
  - Row click expands transaction items detail pane showing product catalog list, subtotal, and cashier user details.
- **VALIDATE**: Searching by ID or cashier works correctly. Expand toggles animate elegantly.

### Task 4: Implement Inventory Updating with Quick-Stock Edit
- **ACTION**: Build `inventory-update-table.tsx`, `quick-stock-modal.tsx`, and `/staff/inventory/page.tsx`.
- **IMPLEMENT**:
  - Searchable inventory database. Low stock alerts clearly highlighted with warning badges.
  - Column actions include an **"Edit Stock"** button which opens a modal drawer.
  - **Edit Modal**: Contains current stock display, increment/decrement stepper (+10, -10, custom input), reorder warning threshold configurator, and safe "Save Changes" execution.
  - Persist modifications in local state/localStorage so updates reflect across the Dashboard page immediately.
- **VALIDATE**: Changing stock quantities adjusts warning states instantly, and updates counts on `/staff` dashboard KPI metrics.

### Task 5: Implement Transaction History Page
- **ACTION**: Create `/staff/history/page.tsx` and `staff-transaction-table.tsx`.
- **IMPLEMENT**:
  - Comprehensive historical table showing all transactions with customer detail logs.
  - Filter by branch, payment status, and calendar dates.
  - Column actions show a **"View Receipt"** visual representation showing digital invoice receipts with printable layouts.
- **VALIDATE**: Search and filter behaviors accurately reduce list size without layout breaking.

### Task 6: Implement Payment & Pickup Management
- **ACTION**: Create `/staff/pickup/page.tsx`, `payment-pickup-list.tsx`, and `verify-pickup-modal.tsx`.
- **IMPLEMENT**:
  - Screen divided into **Two Tab panes**:
    - **Payments to Verify**: List of GCash transactions with reference numbers requiring manual approval. Click "Verify" to open popup modal showing details, click "Confirm Verified" to change status.
    - **Orders for Pickup**: List of orders ready for pickup. Displays customer names, code, and date. Clicking "Complete Pickup" triggers confirmation check and clears the queue item.
- **VALIDATE**: Confirming payment unlocks order pickup validation status smoothly.

---

## Testing & Verification Strategy

### Automated Verification
Run the standard validation check to ensure perfect compilation:
```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```
Verify: No error reports, clean static build bundles.

### Manual UI Flow Verification
- Navigate through `/staff` subpages to confirm Layout consistency.
- Modify a product's stock count from `12` to `3` on `/staff/inventory` — confirm it now displays "Low Stock" badge and increases the Warning count on the Dashboard.
- On Payments tab under `/staff/pickup`, verify a pending GCash reference, check that it successfully updates the verification list.
- On Pickup tab, perform order release and confirm queue item drops correctly.

---

## Acceptance Criteria
- [ ] Responsive sidebar navigation fully implemented without CSS layout overlaps.
- [ ] Interactive Inventory modifier adjusts values dynamically in browser context.
- [ ] Status filters, search fields, and table lists behave responsively.
- [ ] Design aesthetics are stunning, utilising sleek dark elements (`#0c1221`), precise borders, and HSL accents matching BentaHub's design language.
- [ ] No `globals.css` hacks are used; all design variables align with standard tokens.
- [ ] Validates cleanly with zero linting or typescript errors.
