"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingBasket, Package, ShieldCheck } from "lucide-react"

interface ProductActionsProps {
  stockCount: number
  sku: string
  status: string
}

export function ProductActions({ stockCount, sku, status }: ProductActionsProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 99))
  }

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value)) {
      setQuantity(Math.min(Math.max(value, 1), 99))
    }
  }

  const handleAddToReservation = () => {
    router.push("/customer/cart")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Quantity Selector Area */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Select Quantity</span>
          <span className="text-sm font-medium text-primary">{stockCount} units in stock</span>
        </div>
        
        <div className="flex gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center border border-border rounded-lg bg-card overflow-hidden h-11">
            <button
              onClick={handleDecrement}
              className="px-3 h-full hover:bg-muted active:bg-accent transition-colors border-r border-border flex items-center justify-center"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-14 border-none text-center font-mono text-sm focus:ring-0 focus:outline-none bg-transparent"
              min="1"
              max="99"
            />
            <button
              onClick={handleIncrement}
              className="px-3 h-full hover:bg-muted active:bg-accent transition-colors border-l border-border flex items-center justify-center"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Add to Reservation Button */}
          <Button className="flex-grow h-11 gap-2 text-sm font-medium" onClick={handleAddToReservation}>
            <ShoppingBasket className="h-4 w-4" />
            Add to Reservation
          </Button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* SKU Card */}
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border">
          <Package className="h-5 w-5 text-primary flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">SKU</span>
            <span className="text-sm font-mono text-foreground truncate">{sku}</span>
          </div>
        </div>

        {/* Status Card */}
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border">
          <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</span>
            <span className="text-sm font-medium text-foreground truncate">{status}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
