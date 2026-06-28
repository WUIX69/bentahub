/**
 * Drill-Down Analytics Module Feature Slice
 *
 * Responsible for:
 * - Branch performance report generation
 * - Historical audits and metric summaries
 *
 * Consumed by: src/app/admin/
 */

// Export actions, components, hooks, and types as they are built
export { BranchStockOverview } from "./components/branch-stock-overview"
export { SalesFilters } from "./components/sales-filters"
export { SalesMetrics } from "./components/sales-metrics"
export { getSalesData } from "./server/db/get-sales"
export { SalesChart } from "./components/sales-chart"
