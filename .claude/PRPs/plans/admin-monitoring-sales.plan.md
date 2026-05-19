# Plan: Admin Monitoring & Sales Pages

## Summary
Implement the Centralized Monitoring and Sales Report pages for the Admin Dashboard. This includes building metric cards, data tables, filter controls, system alerts, and trend charts based on the provided UI prototypes while strictly adhering to the existing FSD structure and Tailwind theme variables.

## User Story
As an administrator, I want dedicated pages for Monitoring (inventory, alerts, flow) and Sales (filters, transactions, metrics) so that I can drill down into specific operational areas across all branches.

## Problem → Solution
Placeholder routes exist for Monitoring and Sales → Desired state replaces placeholders with fully functional, styled page layouts assembling modular components (tables, charts, alerts, filters) matching the Stitch.ai prototypes.

## Metadata
- **Complexity**: Large
- **Source PRD**: N/A
- **PRD Phase**: N/A
- **Estimated Files**: 10

---

## UX Design

### Before
Minimal placeholder text for `/admin/monitoring` and `/admin/sales`.

### After
Rich dashboards with branch filters, date pickers, data tables, alert lists, and metric cards with specific hover states and status colors.

### Interaction Changes
| Touchpoint | Before | After | Notes |
|---|---|---|---|
| Monitoring Page | Stub text | Interactive tables and alerts | Custom hover borders on metric cards |
| Sales Page | Stub text | Filter controls and empty states | Includes export buttons and pagination |

---

## Mandatory Reading

| Priority | File | Lines | Why |
|---|---|---|---|
| P0 | `src/features/admin-dashboard/components/kpi-card.tsx` | all | Reference for existing metric cards |
| P0 | `src/features/admin-dashboard/components/stock-table.tsx` | all | Reference for existing table structure |
| P1 | `src/app/admin/layout.tsx` | all | Admin layout wrapper |

---

## Patterns to Mirror

### COMPONENT_STRUCTURE
// SOURCE: `src/features/admin-dashboard/components/stock-table.tsx`
Use functional components, Lucide icons, and Tailwind for styling. Map prototype colors to theme variables (e.g., `bg-card`, `border-border`, `text-primary`, `text-destructive`).

### EMPTY_STATES
// SOURCE: Sales prototype HTML
Use centered layouts with an icon and descriptive text for empty table states.

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `src/features/admin-dashboard/components/monitoring-metrics.tsx` | CREATE | Specific metric cards for monitoring (Total Stock, Low Stock, Pending) |
| `src/features/admin-dashboard/components/inventory-status-table.tsx` | CREATE | Table for product inventory status |
| `src/features/admin-dashboard/components/inventory-flow-trend.tsx` | CREATE | Chart component for inventory flow |
| `src/features/admin-dashboard/components/system-alerts.tsx` | CREATE | List component for system notifications |
| `src/features/admin-dashboard/components/sales-filters.tsx` | CREATE | Date and branch filter controls |
| `src/features/admin-dashboard/components/sales-metrics.tsx` | CREATE | Sales specific KPI cards |
| `src/features/admin-dashboard/components/transaction-details-table.tsx` | CREATE | Table for sales transactions with empty state |
| `src/features/admin-dashboard/components/index.ts` | UPDATE | Export new components |
| `src/app/admin/(management)/monitoring/page.tsx` | UPDATE | Assemble Monitoring page |
| `src/app/admin/(management)/sales/page.tsx` | UPDATE | Assemble Sales page |

## NOT Building
- Real backend API integrations (using mock data for layout purposes).
- Actual date picker calendar widget (will use a simple text input or native date input as per prototype).
- Actual export functionality (button will be visual only).

---

## Step-by-Step Tasks

### Task 1: Create Monitoring Components
- **ACTION**: Build `monitoring-metrics.tsx`, `inventory-status-table.tsx`, `inventory-flow-trend.tsx`, `system-alerts.tsx`.
- **IMPLEMENT**: Extract HTML from Monitoring prototype. Replace Material Symbols with `lucide-react` (e.g., `Banknote`, `AlertTriangle`, `Calendar`, `Download`, `CheckCircle`, `Info`). Map custom colors to theme variables (`bg-card`, `border-border`, `text-destructive`).
- **VALIDATE**: Ensure no Tailwind validation errors.

### Task 2: Assemble Monitoring Page
- **ACTION**: Update `src/app/admin/(management)/monitoring/page.tsx`.
- **IMPLEMENT**: Add page header ("Centralized Monitoring"), branch selector utility row, and assemble the new components into the grid layout from the prototype.
- **VALIDATE**: Visit `/admin/monitoring` in browser.

### Task 3: Create Sales Components
- **ACTION**: Build `sales-filters.tsx`, `sales-metrics.tsx`, `transaction-details-table.tsx`.
- **IMPLEMENT**: Extract HTML from Sales prototype. Use `lucide-react` (e.g., `Calendar`, `Download`, `TrendingUp`, `Minus`, `BarChart3`, `Filter`, `MoreVertical`, `FileX`). Implement the empty state for the table.
- **VALIDATE**: Check responsive classes.

### Task 4: Assemble Sales Page
- **ACTION**: Update `src/app/admin/(management)/sales/page.tsx`.
- **IMPLEMENT**: Add page header ("Sales Report") and assemble the filters, metrics, and table components.
- **VALIDATE**: Visit `/admin/sales` in browser.

### Task 5: Update Exports
- **ACTION**: Update `src/features/admin-dashboard/components/index.ts`.
- **IMPLEMENT**: Export all newly created components.
- **VALIDATE**: Build passes.

---

## Validation Commands
### Static Analysis
```bash
pnpm run validate
```
EXPECT: Zero type errors and lint errors

---

## Acceptance Criteria
- [ ] Monitoring page accurately reflects the prototype layout (metrics, table, chart, alerts).
- [ ] Sales page accurately reflects the prototype layout (filters, metrics, empty state table).
- [ ] Uses FSD structure and BentaHub theme variables.
- [ ] Uses `lucide-react` icons.
- [ ] No `globals.css` modifications.
