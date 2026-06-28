"use client"

import { TrendingUp } from "lucide-react"
import { KPICard } from "@/components/kpi-card"

interface TodayRevenueCardProps {
  todayRevenue: number
}

export function TodayRevenueCard({ todayRevenue }: TodayRevenueCardProps) {
  return (
    <KPICard
      title={"Today's Verified Transactions"}
      value={`₱${todayRevenue.toFixed(2)}`}
      icon={TrendingUp}
      iconColorClass="text-green-500"
      subtext={"Today's revenue"}
      subtextClass="text-green-500"
    />
  )
}
