"use client"

import Image from "next/image"
import { ShoppingCart, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ProductCardProps {
  id: string
  name: string
  category: string
  price: string
  image: string
  stockStatus: "in-stock" | "low-stock" | "out-of-stock"
  weight?: string
  branch?: string
}

export function ProductCard({
  name,
  category,
  price,
  image,
  stockStatus,
  weight,
  branch = "Main Branch",
}: ProductCardProps) {
  const isOutOfStock = stockStatus === "out-of-stock"
  const isLowStock = stockStatus === "low-stock"

  return (
    <div className={cn(
      "group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col h-full",
      isOutOfStock && "opacity-75"
    )}>
      {/* Image Container */}
      <div className="relative aspect-square bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          className={cn(
            "object-cover transition-transform group-hover:scale-105",
            isOutOfStock && "grayscale"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Stock Badge */}
        <div className="absolute top-2 left-2">
          {stockStatus === "in-stock" && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              In Stock
            </span>
          )}
          {isLowStock && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              Low Stock
            </span>
          )}
          {isOutOfStock && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              Out of Stock
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <span className="text-sm font-bold text-foreground bg-background/80 px-3 py-1.5 rounded-lg shadow-sm">
              Temporarily Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
          {category}
        </span>
        <h3 className="font-heading text-base font-bold text-foreground mb-1 line-clamp-1">
          {name}
        </h3>
        <div className="text-xs text-muted-foreground mb-3">
          {weight && <span>{weight}</span>}
          {weight && branch && <span> • </span>}
          {branch && <span>{branch}</span>}
        </div>
        
        <div className="mt-auto space-y-3">
          <span className="text-lg font-bold text-primary block">
            {price}
          </span>

          {isOutOfStock ? (
            <Button size="sm" variant="outline" className="w-full gap-1.5" disabled>
              <Bell className="size-3.5" />
              Notify Me
            </Button>
          ) : (
            <Button size="sm" className="w-full gap-1.5">
              <ShoppingCart className="size-3.5" />
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

