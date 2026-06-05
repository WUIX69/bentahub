"use client"

import { StaffTransactionTable } from "@/features/staff-dashboard/components/staff-transaction-table"
import { staffTransactions } from "@/features/staff-dashboard/data/transactions"

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
          <span className="text-sm font-medium text-muted-foreground">Total Records</span>
          <h3 className="text-2xl font-extrabold text-foreground mt-1">{staffTransactions.length}</h3>
          <span className="text-xs text-muted-foreground font-medium">All time</span>
        </div>
        <div className="bg-card rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
          <span className="text-sm font-medium text-muted-foreground">Cash Payments</span>
          <h3 className="text-2xl font-extrabold text-foreground mt-1">{staffTransactions.filter((t) => t.paymentMethod === "cash").length}</h3>
          <span className="text-xs text-muted-foreground font-medium">Transactions</span>
        </div>
        <div className="bg-card rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
          <span className="text-sm font-medium text-muted-foreground">GCash Payments</span>
          <h3 className="text-2xl font-extrabold text-foreground mt-1">{staffTransactions.filter((t) => t.paymentMethod === "gcash").length}</h3>
          <span className="text-xs text-muted-foreground font-medium">Transactions</span>
        </div>
      </div>

      <StaffTransactionTable transactions={staffTransactions} />
    </div>
  )
}
