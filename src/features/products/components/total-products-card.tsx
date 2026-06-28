"use client"

import { Package } from "lucide-react"
import type { Product } from "@/types/employee"
import { getStockStatus } from "@/features/products"
import { KPICard } from "@/components/kpi-card"

interface TotalProductsCardProps {
  products: Product[]
}

export function TotalProductsCard({ products }: TotalProductsCardProps) {
  const inStockCount = products.filter((p) => getStockStatus(p) === "in-stock").length

  return (
    <KPICard
      title="Total Products Managed"
      value={products.length}
      icon={Package}
      iconColorClass="text-blue-500"
      subtext={`${inStockCount} in stock`}
      subtextClass="text-green-500"
    />
  )
}
