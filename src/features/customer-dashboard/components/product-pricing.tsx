"use client"

import { Info } from "lucide-react"

interface ProductPricingProps {
  retailPrice: string
  originalPrice?: string
  bulkPrice: string
  bulkMinUnits?: number
  casePrice?: string
}

export function ProductPricing({
  retailPrice,
  originalPrice,
  bulkPrice,
  bulkMinUnits = 12,
  casePrice = "₱495.00",
}: ProductPricingProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-muted border border-border rounded-xl">
      {/* Retail Price */}
      <div className="flex justify-between items-end border-b border-border pb-4">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Retail Price
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">{retailPrice}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </div>
        {originalPrice && (
          <span className="text-xs font-bold text-primary bg-accent px-2 py-1 rounded">
            Save 5%
          </span>
        )}
      </div>

      {/* Bulk Price */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Bulk / Wholesale (Min. {bulkMinUnits} units)
          </span>
          <span className="text-xs font-bold text-primary">Most Popular</span>
        </div>
        <div className="bg-card p-4 border border-primary/30 rounded-lg shadow-sm flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground">
              {bulkPrice} <span className="text-sm font-medium text-muted-foreground">/unit</span>
            </span>
            <span className="text-xs text-muted-foreground">
              {casePrice} total for 1 case
            </span>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Info className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
