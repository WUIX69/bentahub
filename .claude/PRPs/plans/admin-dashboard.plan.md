# Plan: Admin Dashboard

## Summary
Implement the core Admin Dashboard layout and Overview page based on the provided UI prototype, utilizing Feature-Sliced Design (FSD) and integrating with the existing Tailwind theme.

## User Story
As an administrator, I want a comprehensive dashboard with key performance indicators, sales trends, and branch stock distribution, so that I can effectively monitor and manage operations across all branches.

## Problem → Solution
Current state lacks a functional and styled admin interface → Desired state provides a fully styled, responsive Admin Dashboard with navigation and a rich Overview page featuring KPIs and data visualizations.

## Metadata
- **Complexity**: Large
- **Source PRD**: N/A
- **PRD Phase**: N/A
- **Estimated Files**: 15

---

## UX Design

### Before
Minimal stub at `/admin` with no navigation or styling.

### After
Full-width dashboard with a dark sidebar, sticky top header, KPI metric cards, a sales trend chart area, and a branch stock distribution table.

### Interaction Changes
| Touchpoint | Before | After | Notes |
|---|---|---|---|
| Admin Navigation | None | Sidebar with categorized links | Uses Lucide icons |
| Dashboard Overview | Stub text | Rich metrics and charts | Interactive hover states |

---

## Mandatory Reading

| Priority | File | Lines | Why |
|---|---|---|---|
| P0 | `src/features/customer-dashboard/components/dashboard-sidebar.tsx` | all | To match existing sidebar component structure |
| P1 | `src/app/admin/layout.tsx` | all | Current stub to be replaced |

---

## Patterns to Mirror

### COMPONENT_STRUCTURE
// SOURCE: `src/features/customer-dashboard/components/dashboard-sidebar.tsx`
Use functional components with explicit props interfaces, Lucide icons, and Tailwind for styling.

### THEME_INTEGRATION
// SOURCE: `src/app/globals.css`
Map custom prototype colors to existing CSS variables (e.g., `bg-card`, `text-primary`, `bg-destructive`) instead of adding new custom colors.

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `src/features/admin-dashboard/components/admin-sidebar.tsx` | CREATE | Sidebar navigation |
| `src/features/admin-dashboard/components/admin-topbar.tsx` | CREATE | Header with notifications and profile |
| `src/features/admin-dashboard/components/kpi-card.tsx` | CREATE | Reusable KPI metric card |
| `src/features/admin-dashboard/components/sales-chart.tsx` | CREATE | Sales trend visualization |
| `src/features/admin-dashboard/components/stock-table.tsx` | CREATE | Branch stock distribution table |
| `src/features/admin-dashboard/components/index.ts` | CREATE | Exports for the feature slice |
| `src/app/admin/layout.tsx` | UPDATE | Wrap content with Admin Sidebar and Topbar |
| `src/app/admin/page.tsx` | UPDATE | Render the dashboard overview components |
| `src/app/admin/(management)/monitoring/page.tsx` | CREATE | Placeholder route |
| `src/app/admin/(management)/sales/page.tsx` | CREATE | Placeholder route |
| `src/app/admin/(management)/reservations/page.tsx` | CREATE | Placeholder route |
| `src/app/admin/(management)/users/page.tsx` | CREATE | Placeholder route |
| `src/app/admin/(operations)/payments/page.tsx` | CREATE | Placeholder route |
| `src/app/admin/(operations)/history/page.tsx` | CREATE | Placeholder route |
| `src/app/admin/(operations)/pickups/page.tsx` | CREATE | Placeholder route |

## NOT Building
- Fully functional backend integration for the charts and tables (will use mock data initially).
- Complex chart libraries like Recharts (will use CSS-based layout as per prototype, or simple wrappers).

---

## Step-by-Step Tasks

### Task 1: Create Admin Dashboard Feature Structure
- **ACTION**: Create the feature directory and component files.
- **IMPLEMENT**: Scaffold `src/features/admin-dashboard/components` and export them from `index.ts`.
- **VALIDATE**: Directory exists and exports are clean.

### Task 2: Implement Admin Sidebar
- **ACTION**: Build `admin-sidebar.tsx`.
- **IMPLEMENT**: Map prototype's Material Symbols to `lucide-react`. Use existing Tailwind colors. Implement navigation links.
- **MIRROR**: `dashboard-sidebar.tsx`
- **VALIDATE**: Ensure component renders without errors.

### Task 3: Implement Admin Topbar
- **ACTION**: Build `admin-topbar.tsx`.
- **IMPLEMENT**: Create sticky header with notifications, profile avatar, and potentially the `ThemeToggle`.
- **MIRROR**: `dashboard-topbar.tsx`
- **VALIDATE**: Ensure correct alignment and responsive behavior.

### Task 4: Implement Overview Components (KPIs, Charts, Tables)
- **ACTION**: Build `kpi-card.tsx`, `sales-chart.tsx`, `stock-table.tsx`.
- **IMPLEMENT**: Extract HTML from prototype into React components. Replace custom colors with theme variables (`bg-card`, `border-border`, `text-primary`, `text-destructive`).
- **VALIDATE**: Check for hydration errors and Tailwind class validity.

### Task 5: Integrate Layout and Overview Page
- **ACTION**: Update `src/app/admin/layout.tsx` and `src/app/admin/page.tsx`.
- **IMPLEMENT**: Use the new layout components to wrap the admin routes. Assemble the overview page with the KPI cards, chart, and table.
- **VALIDATE**: Visit `/admin` in the browser to verify the full UI.

### Task 6: Create Placeholder Routes
- **ACTION**: Create routing structure for the sidebar links.
- **IMPLEMENT**: Add simple page components for Monitoring, Sales, Reservations, Users, Payments, History, and Pickups so the sidebar links don't 404.
- **VALIDATE**: Click through sidebar links to ensure navigation works.

---

## Testing Strategy
- Manual verification of layout responsiveness and visual fidelity against the prototype.
- Verify sidebar navigation routes correctly.

---

## Validation Commands
### Static Analysis
```bash
pnpm run validate
```
EXPECT: Zero type errors and lint errors

---

## Acceptance Criteria
- [ ] Admin layout applied to all `/admin` routes.
- [ ] Overview page matches prototype design closely using existing theme variables.
- [ ] Sidebar links navigate to placeholder pages without 404s.
- [ ] Lucide icons used consistently.
- [ ] No `globals.css` modifications.
