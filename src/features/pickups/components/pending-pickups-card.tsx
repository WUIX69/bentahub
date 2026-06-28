"use client"

import { ShoppingBag } from "lucide-react"

interface PendingPickupsCardProps {
  pendingPickups: number
}

export function PendingPickupsCard({ pendingPickups }: PendingPickupsCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Pending Pickups</span>
        <ShoppingBag className="w-5 h-5 text-amber-500" />
      </div>
      <div className="mt-2">
        <h3 className="text-3xl font-extrabold text-foreground">{pendingPickups}</h3>
        <span className="text-xs font-medium text-amber-500">{pendingPickups} orders waiting</span>
      </div>
    </div>
  )
}
