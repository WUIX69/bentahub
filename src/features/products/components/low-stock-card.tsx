"use client"

import { AlertTriangle } from "lucide-react"

interface LowStockCardProps {
  lowStockCount: number
}

export function LowStockCard({ lowStockCount }: LowStockCardProps) {
  const hasLowStock = lowStockCount > 0

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Low Stock Warnings</span>
        <AlertTriangle className={`w-5 h-5 ${hasLowStock ? "text-red-500" : "text-muted-foreground"}`} />
      </div>
      <div className="mt-2">
        <h3 className="text-3xl font-extrabold text-foreground">{lowStockCount}</h3>
        <span className={`text-xs font-medium ${hasLowStock ? "text-red-500" : "text-green-500"}`}>
          {hasLowStock ? "Needs attention" : "All good"}
        </span>
      </div>
    </div>
  )
}
