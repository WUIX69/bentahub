"use client"

import { FileText, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function TransactionTable() {
  const transactions = [
    {
      id: "#BH-0001",
      date: "May 15, 2026",
      amount: "₱1,250.00",
      status: "Successful",
      method: "GCash",
    },
    {
      id: "#BH-0002",
      date: "May 12, 2026",
      amount: "₱450.50",
      status: "Successful",
      method: "Cash on Pickup",
    },
    {
      id: "#BH-0003",
      date: "May 10, 2026",
      amount: "₱890.00",
      status: "Processing",
      method: "GCash",
    },
    {
      id: "#BH-0004",
      date: "May 05, 2026",
      amount: "₱320.00",
      status: "Failed",
      method: "Credit Card",
    },
  ]

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="p-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Transaction ID
              </th>
              <th className="p-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Date
              </th>
              <th className="p-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Amount
              </th>
              <th className="p-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Payment Method
              </th>
              <th className="p-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Status
              </th>
              <th className="p-3 text-xs font-bold tracking-widest text-muted-foreground uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-muted/50 transition-colors">
                <td className="p-3 text-sm font-mono text-foreground">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{transaction.id}</span>
                  </div>
                </td>
                <td className="p-3 text-sm text-muted-foreground">
                  {transaction.date}
                </td>
                <td className="p-3 text-sm font-bold text-foreground">
                  {transaction.amount}
                </td>
                <td className="p-3 text-sm text-muted-foreground">
                  {transaction.method}
                </td>
                <td className="p-3 text-sm">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                    transaction.status === "Successful" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                    transaction.status === "Processing" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                    transaction.status === "Failed" && "bg-destructive/10 text-destructive"
                  )}>
                    {transaction.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-right">
                  <button className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
        <span className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">4</span> of <span className="font-medium text-foreground">24</span>
        </span>
        
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg border border-border disabled:opacity-50" disabled>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg border border-border">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

