"use client"

import { Calendar } from "lucide-react"
import { KPICard } from "@/components/kpi-card"

interface ReservationsCountCardProps {
  count?: string | number
}

export function ReservationsCountCard({ count = "3" }: ReservationsCountCardProps) {
  return (
    <KPICard
      title="Active Reservations"
      value={count}
      icon={Calendar}
      href="/customer/reservations"
      iconBgClass="bg-amber-100 dark:bg-amber-900/30"
      iconColorClass="text-amber-600 dark:text-amber-400"
    />
  )
}
