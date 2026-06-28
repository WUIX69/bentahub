"use client"

import { ShoppingBag } from "lucide-react"
import { KPICard } from "@/components/kpi-card"

interface PendingPickupsCardProps {
  pendingPickups: number
}

export function PendingPickupsCard({ pendingPickups }: PendingPickupsCardProps) {
  return (
    <KPICard
      title="Pending Pickups"
      value={pendingPickups}
      icon={ShoppingBag}
      iconColorClass="text-amber-500"
      subtext={`${pendingPickups} orders waiting`}
      subtextClass="text-amber-500"
    />
  )
}
