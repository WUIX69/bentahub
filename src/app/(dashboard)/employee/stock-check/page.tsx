"use client"

import { StockSummaryCards, StockTable } from "@/features/products"

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
