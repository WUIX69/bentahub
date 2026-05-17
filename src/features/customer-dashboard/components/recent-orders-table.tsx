"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export function RecentOrdersTable() {
  const orders = [
    {
      id: "ORD-2026-001",
      date: "May 15, 2026",
      total: "₱1,250.00",
      status: "Ready for Pickup",
      statusVariant: "primary",
    },
    {
      id: "ORD-2026-002",
      date: "May 12, 2026",
      total: "₱450.50",
      status: "Completed",
      statusVariant: "secondary",
    },
    {
      id: "ORD-2026-003",
      date: "May 10, 2026",
      total: "₱890.00",
      status: "Pending",
      statusVariant: "warning",
    },
  ]

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
        <h2 className="font-heading text-lg font-bold">Recent Orders</h2>
        <Link 
          href="/customer/transactions" 
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border bg-muted/30">
              <th className="px-4 md:px-6 py-3 font-medium">Order ID</th>
              <th className="px-4 md:px-6 py-3 font-medium">Date</th>
              <th className="px-4 md:px-6 py-3 font-medium">Total</th>
              <th className="px-4 md:px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 md:px-6 py-4 font-mono text-sm text-foreground">
                  {order.id}
                </td>
                <td className="px-4 md:px-6 py-4 text-muted-foreground">
                  {order.date}
                </td>
                <td className="px-4 md:px-6 py-4 font-bold text-foreground">
                  {order.total}
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span 
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      order.statusVariant === "primary" && "bg-primary/15 text-primary",
                      order.statusVariant === "secondary" && "bg-muted text-muted-foreground",
                      order.statusVariant === "warning" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    )}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
