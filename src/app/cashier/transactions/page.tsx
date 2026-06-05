"use client"

import { TransactionsTable } from "@/features/cashier-dashboard/components/transactions-table"

export default function TransactionsPage() {
  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto bg-slate-50">
      {/* Title / Description */}
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-bold text-slate-800">Closed Sales Register</h2>
        <p className="text-xs text-slate-400">
          History register of all closed retail and invoice sales recorded at this terminal branch
        </p>
      </div>

      {/* Main Ledger grid */}
      <TransactionsTable />
    </div>
  )
}
