"use client"

import { ShoppingBag } from "lucide-react"
import { KPICard } from "@/components/kpi-card"

interface OrdersCountCardProps {
  count?: string | number
}

export function OrdersCountCard({ count = "42" }: OrdersCountCardProps) {
  return (
    <KPICard
      title="Total Orders"
      value={count}
      icon={ShoppingBag}
      href="/customer/transactions"
      iconBgClass="bg-accent"
      iconColorClass="text-accent-foreground"
    />
  )
}
