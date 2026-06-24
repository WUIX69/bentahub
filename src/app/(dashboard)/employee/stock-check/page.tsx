"use client"

import { StockSummaryCards } from "@/features/employee-dashboard/components/stock-summary-cards"
import { StockTable } from "@/features/employee-dashboard/components/stock-table"

export default function EmployeeStockCheckPage() {
  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto bg-slate-50">
      {/* Bento Metric Widgets */}
      <StockSummaryCards />

      {/* Grid Table Workspace */}
      <StockTable />
    </div>
  )
}
