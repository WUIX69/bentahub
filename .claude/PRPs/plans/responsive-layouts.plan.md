# Plan: Responsive Layouts for Staff, Admin, and Cashier Panels

## Summary
Implement a cohesive, fully responsive design for the **Staff**, **Admin**, and **Cashier** panels in BentaHub. This involves:
1. Transforming all three panel layouts to support fluid viewports, ranging from mobile devices (320px+) to high-resolution desktop monitors.
2. Building an interactive, mobile-friendly **Sidebar Overlay Drawer** for each panel.
3. Adding mobile-optimized Topbars with hamburger navigation toggle buttons.
4. Ensuring that large data tables, metric grids, and page-specific views (like the Cashier POS Catalog & Cart) stack or overflow elegantly on smaller viewports.

This work ensures an outstanding and premium mobile user experience across the entire system.

## User Story
As a user (Staff, Admin, or Cashier), I want to access my respective panel seamlessly on my smartphone, tablet, or laptop, with a layout that adapts naturally to my screen size without overlapping elements, clipping, or losing operational efficiency.

## Problem → Solution
- **Current State**: Panel layouts utilize rigid desktop sizes (e.g., permanent sidebar fixed at 280px left margin, resulting in squished content panes and tables on mobile screens).
- **Desired State**: Sidebars hide off-screen on mobile devices and slide in as overlay drawers via a hamburger menu. Metric grids and tables wrap or scroll gracefully.

## Metadata
- **Complexity**: Medium-Large
- **Estimated Files**: ~10 files
- **Key Focus**: Tailwind responsive breakpoints, CSS state-based drawer transitions.

---

## UX Design

### Mobile Drawer Interactions
- **Desktop (md/lg and above)**: Sidebar is statically displayed (`w-[280px]`). Page content margin offsets it (`md:ml-[280px]`).
- **Mobile (below md/lg)**: Sidebar is hidden off-screen (`-translate-x-full`). Content occupies full width (`ml-0`).
- **Hamburger Button**: Displayed on the left side of the Topbar on mobile. Tapping it toggles the sidebar (`translate-x-0`).
- **Backdrop Overlay**: A dark semi-transparent backdrop (`bg-black/50`) appears when the mobile sidebar is active. Tapping the backdrop or nav link dismisses it.

### Content Adaptations
- **Metric Cards Grid**: Adjust from a 4-column layout to a 1-column layout on mobile, transitioning through 2 columns on tablet.
- **Data Tables**: Nested inside responsive `overflow-x-auto` wrappers to support horizontal swipe navigation without breaking page width.
- **Cashier POS Cart**: Stacks below the product list or slides in as a mobile drawer instead of crowding the catalog grid.

---

## Patterns to Mirror

### RESPONSIVE_LAYOUT_SHELL
```tsx
// Pattern: State-driven responsive sidebar wrapping
"use client"
import { useState } from "react"

export default function PanelLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar Overlay and Slide-in */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Panel Area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-[280px] overflow-hidden">
        <Topbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
```

### RESPONSIVE_SIDEBAR_DRAWER
```tsx
// Pattern: Tailwind classes for off-screen mobile drawer
<aside className={cn(
  "w-[280px] bg-[#0c1221] text-white flex flex-col fixed inset-y-0 left-0 z-50",
  "transition-transform duration-300 ease-in-out md:translate-x-0",
  isOpen ? "translate-x-0" : "-translate-x-full"
)}>
  ...
</aside>
{isOpen && (
  <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in" />
)}
```

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `src/app/admin/layout.tsx` | UPDATE | Convert to stateful sidebar manager with toggle capabilities |
| `src/features/admin-dashboard/components/admin-sidebar.tsx` | UPDATE | Implement off-screen mobile translations and backdrop overlay |
| `src/features/admin-dashboard/components/admin-topbar.tsx` | UPDATE | Add Hamburger toggle menu button for mobile screens |
| `src/app/cashier/layout.tsx` | UPDATE | Transform into client-side stateful shell with toggles |
| `src/features/cashier-dashboard/components/cashier-sidebar.tsx` | UPDATE | Implement off-screen mobile translations and responsive hooks |
| `src/features/cashier-dashboard/components/cashier-topbar.tsx` | UPDATE | Add Hamburger toggle and optimize user display on smaller viewports |
| `src/app/staff/layout.tsx` | UPDATE | Integrate responsive toggles in initial layout drafting |
| `src/features/staff-dashboard/components/staff-sidebar.tsx` | CREATE | Construct mobile-ready sidebar layout from day one |
| `src/features/staff-dashboard/components/staff-topbar.tsx` | CREATE | Construct mobile-ready topbar layout from day one |

---

## Step-by-Step Tasks

### Task 1: Refactoring the Admin Dashboard Layout
- **ACTION**: Modify `admin/layout.tsx`, `admin-sidebar.tsx`, and `admin-topbar.tsx`.
- **IMPLEMENT**:
  - Add client-side state `isSidebarOpen` to layout.
  - Add `Menu` button toggle on the left of `AdminTopbar` (visible only below `md:`).
  - Update `AdminSidebar` to accept `isOpen` and `onClose` props. Apply responsive classes: `fixed md:translate-x-0 z-50 transition-transform duration-300 ease-in-out` along with backdrop helper overlays.
- **VALIDATE**: Ensure layout renders normally on desktop and sidebar collapses/opens cleanly on mobile screens.

### Task 2: Refactoring the Cashier Panel Layout
- **ACTION**: Modify `cashier/layout.tsx`, `cashier-sidebar.tsx`, and `cashier-topbar.tsx`.
- **IMPLEMENT**:
  - Add `"use client"` tag to layout and inject reactive state.
  - Implement mobile side drawer overlay hooks inside `cashier-sidebar.tsx`.
  - Add toggle Menu button to `cashier-topbar.tsx` on screen widths < `md:`. Optimize User Profile to show only the initials pill on phone screens to save horizontal space.
- **VALIDATE**: Confirm smooth drawer animations on mobile viewports.

### Task 3: Tailoring Cashier POS Inner View for Mobile
- **ACTION**: Update component grids in cashier views.
- **IMPLEMENT**:
  - Make `ProductCatalog` product grid start at 1 column on smallest mobile: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`.
  - Stacking POS: For screens below `lg:`, render the Catalog and Cart side-by-side or stack them vertically (`flex-col lg:flex-row`). Add a toggle button "View Order Cart" on smaller screens so the cashier can check out easily.
- **VALIDATE**: Checkout and catalog function perfectly on phone widths.

### Task 4: Standardizing Page Tables and Metrics for Mobile
- **ACTION**: Audit and apply overflow classes.
- **IMPLEMENT**:
  - Wrap **every single table element** across Admin, Cashier, and Staff routes inside a `<div className="w-full overflow-x-auto rounded-xl border border-border shadow-sm">` container.
  - Update Metric card containers to use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6`.
- **VALIDATE**: No horizontal viewport page scrolling is observed.

### Task 5: Launching Staff Layout as Mobile-First
- **ACTION**: Create responsive foundations in Staff files.
- **IMPLEMENT**:
  - Implement `StaffSidebar` and `StaffTopbar` with mobile-first sliding layouts as drafted in the responsive patterns above.
- **VALIDATE**: Full validation compile test passes without error.

---

## Validation Commands
```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```
Ensure build succeeds without any errors.

---

## Acceptance Criteria
- [ ] No layout content clips or overflows off-screen on devices from 320px width up to 1920px width.
- [ ] Hamburger menus successfully open sidebar overlays on all three roles (Admin, Cashier, Staff).
- [ ] Clicking on mobile sidebar navigation links or backdrops auto-closes the overlay.
- [ ] All table lists are swipe-scrollable horizontally without breaking the root viewport.
- [ ] Cashier POS catalog wraps and checkout remains fully operational on small screens.
- [ ] Clean type checks and lint completions.
