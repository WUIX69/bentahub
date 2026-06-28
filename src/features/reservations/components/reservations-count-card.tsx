"use client"

import Link from "next/link"
import { Calendar } from "lucide-react"

interface ReservationsCountCardProps {
  count?: string | number
}

export function ReservationsCountCard({ count = "3" }: ReservationsCountCardProps) {
  return (
    <Link href="/customer/reservations">
      <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex items-center gap-5 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
        <div className="size-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
          <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">Active Reservations</p>
          <h3 className="text-2xl font-bold mt-0.5">{count}</h3>
        </div>
      </div>
    </Link>
  )
}
