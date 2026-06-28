"use client"

import { AlertTriangle } from "lucide-react"
import { KPICard } from "@/components/kpi-card"

interface LowStockCardProps {
  lowStockCount: number
}

export function LowStockCard({ lowStockCount }: LowStockCardProps) {
  const hasLowStock = lowStockCount > 0

  return (
    <KPICard
      title="Low Stock Warnings"
      value={lowStockCount}
      icon={AlertTriangle}
      iconColorClass={hasLowStock ? "text-red-500" : "text-muted-foreground"}
      subtext={hasLowStock ? "Needs attention" : "All good"}
      subtextClass={hasLowStock ? "text-red-500" : "text-green-500"}
    />
  )
}
