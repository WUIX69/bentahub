"use client"

import { TrendingUp } from "lucide-react"

interface TodayRevenueCardProps {
  todayRevenue: number
}

export function TodayRevenueCard({ todayRevenue }: TodayRevenueCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{"Today's Verified Transactions"}</span>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>
      <div className="mt-2">
        <h3 className="text-3xl font-extrabold text-foreground">₱{todayRevenue.toFixed(2)}</h3>
        <span className="text-xs font-medium text-green-500">{"Today's revenue"}</span>
      </div>
    </div>
  )
}
