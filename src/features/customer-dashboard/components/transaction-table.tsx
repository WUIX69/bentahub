"use client"

import { 
  ShoppingBag, 
  Truck, 
  CircleCheck, 
  RefreshCw, 
  XCircle, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react"
import { cn } from "@/lib/utils"

export function TransactionTable() {
  const transactions = [
    {
      id: "ORD-2026-001",
      date: "May 15, 2026",
      branch: "Main Branch",
      method: "pickup",
      total: "₱1,250.00",
      status: "completed",
    },
    {
      id: "ORD-2026-002",
      date: "May 12, 2026",
      branch: "Pulong Buhangin",
      method: "delivery",
      total: "₱450.50",
      status: "processing",
    },
    {
      id: "ORD-2026-003",
      date: "May 10, 2026",
      branch: "Main Branch",
      method: "pickup",
      total: "₱890.00",
      status: "completed",
    },
    {
      id: "ORD-2026-004",
      date: "May 05, 2026",
      branch: "Caypombo Branch",
      method: "pickup",
      total: "₱320.00",
      status: "cancelled",
    },
  ]

  const statusIcons = {
    completed: CircleCheck,
    processing: RefreshCw,
    cancelled: XCircle,
  }

  const statusColors = {
    completed: "text-primary",
    processing: "text-amber-500 dark:text-amber-400",
    cancelled: "text-destructive",
  }

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border bg-muted/30">
              <th className="px-4 md:px-6 py-3 font-medium">Order ID</th>
              <th className="px-4 md:px-6 py-3 font-medium">Date</th>
              <th className="px-4 md:px-6 py-3 font-medium">Branch</th>
              <th className="px-4 md:px-6 py-3 font-medium">Method</th>
              <th className="px-4 md:px-6 py-3 font-medium">Total</th>
              <th className="px-4 md:px-6 py-3 font-medium">Status</th>
              <th className="px-4 md:px-6 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const StatusIcon = statusIcons[tx.status as keyof typeof statusIcons]
              
              return (
                <tr 
                  key={tx.id}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 md:px-6 py-4 font-mono text-sm font-bold text-primary">
                    {tx.id}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-muted-foreground">
                    {tx.date}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-foreground">
                    {tx.branch}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                      tx.method === "pickup" ? "bg-accent text-accent-foreground" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    )}>
                      {tx.method === "pickup" ? <ShoppingBag className="h-3 w-3" /> : <Truck className="h-3 w-3" />}
                      <span className="capitalize">{tx.method}</span>
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 font-mono font-bold text-foreground">
                    {tx.total}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <StatusIcon className={cn("h-4 w-4", statusColors[tx.status as keyof typeof statusColors], tx.status === "processing" && "animate-spin")} />
                      <span className="capitalize text-foreground">{tx.status}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    <button className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-t border-border bg-muted/30">
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
