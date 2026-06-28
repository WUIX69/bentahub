"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"

interface OrdersCountCardProps {
  count?: string | number
}

export function OrdersCountCard({ count = "42" }: OrdersCountCardProps) {
  return (
    <Link href="/customer/transactions">
      <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex items-center gap-5 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
        <div className="size-12 bg-accent rounded-lg flex items-center justify-center">
          <ShoppingBag className="h-6 w-6 text-accent-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">Total Orders</p>
          <h3 className="text-2xl font-bold mt-0.5">{count}</h3>
        </div>
      </div>
    </Link>
  )
}
