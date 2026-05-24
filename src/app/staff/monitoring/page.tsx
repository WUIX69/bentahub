"use client"

import { LiveTransactionFeed } from "@/features/staff-dashboard/components/live-transaction-feed"
import { staffTransactions } from "@/features/staff-dashboard/data/transactions"

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
          <span className="text-sm font-medium text-muted-foreground">Today&apos;s Transactions</span>
          <h3 className="text-2xl font-extrabold text-foreground mt-1">{staffTransactions.length}</h3>
          <span className="text-xs text-green-500 font-medium">{staffTransactions.filter((t) => t.status === "completed").length} completed</span>
        </div>
        <div className="bg-card rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
          <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
          <h3 className="text-2xl font-extrabold text-foreground mt-1">₱{staffTransactions.reduce((s, t) => s + t.total, 0).toFixed(2)}</h3>
          <span className="text-xs text-green-500 font-medium">Today&apos;s total</span>
        </div>
        <div className="bg-card rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
          <span className="text-sm font-medium text-muted-foreground">Voided Transactions</span>
          <h3 className="text-2xl font-extrabold text-foreground mt-1">{staffTransactions.filter((t) => t.status === "voided").length}</h3>
          <span className="text-xs text-red-500 font-medium">Requires attention</span>
        </div>
      </div>

      <LiveTransactionFeed transactions={staffTransactions} />
    </div>
  )
}
