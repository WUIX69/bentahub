"use client"

import { Plus, Minus, Trash2, Package } from "lucide-react"
import type { CartItem as CartItemType } from "@/types/employee"

interface CartItemProps {
  item: CartItemType
  onUpdateQty: (qty: number) => void
  onRemove: () => void
}

export function CartItem({ item, onUpdateQty, onRemove }: CartItemProps) {
  const { product, quantity } = item

  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:shadow-sm transition-all duration-200">
      {/* Thumbnail */}
      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200/50 flex items-center justify-center">
        {product.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <Package className="w-6 h-6 text-slate-400 opacity-40" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-xs text-slate-800 truncate leading-snug">
          {product.name}
        </h4>
        <span className="text-[10px] text-slate-400 font-mono">
          SKU: {product.sku}
        </span>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs font-bold text-primary">
            ₱{product.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200/40">
          <button
            onClick={() => onUpdateQty(quantity - 1)}
            className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-mono font-bold text-slate-800">
            {quantity}
          </span>
          <button
            disabled={quantity >= product.stock}
            onClick={() => onUpdateQty(quantity + 1)}
            className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-slate-500"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="w-7 h-7 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-150"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
