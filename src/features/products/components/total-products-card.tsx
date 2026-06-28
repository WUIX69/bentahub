"use client"

import { Package } from "lucide-react"
import type { Product } from "@/types/employee"
import { getStockStatus } from "@/features/products"

interface TotalProductsCardProps {
  products: Product[]
}

export function TotalProductsCard({ products }: TotalProductsCardProps) {
  const inStockCount = products.filter((p) => getStockStatus(p) === "in-stock").length

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Total Products Managed</span>
        <Package className="w-5 h-5 text-blue-500" />
      </div>
      <div className="mt-2">
        <h3 className="text-3xl font-extrabold text-foreground">{products.length}</h3>
        <span className="text-xs font-medium text-green-500">{inStockCount} in stock</span>
      </div>
    </div>
  )
}
