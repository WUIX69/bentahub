"use client"

import { useEffect, useState, useCallback } from "react"
import { ShoppingCart, QrCode, Coins, CheckCircle, Percent } from "lucide-react"
import { CartItem } from "./cart-item"
import { cn } from "@/lib/utils"
import type { UseCartReturn } from "../hooks/use-cart"

interface CartSidebarProps {
  cart: UseCartReturn
}

export function CartSidebar({ cart }: CartSidebarProps) {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    paymentMethod,
    setPaymentMethod,
    amountPaid,
    setAmountPaid,
    discountPercent,
    setDiscountPercent,
    subtotal,
    total,
    changeDue,
  } = cart

  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")

  const completeSale = useCallback(() => {
    if (items.length === 0) return
    const paidVal = parseFloat(amountPaid) || 0
    if (paidVal < total && paymentMethod === "cash") {
      alert("Insufficient payment amount!")
      return
    }

    setSuccessMsg(
      `Transaction Completed! Total Amount: ₱${total.toFixed(
        2
      )}. Payment Method: ${paymentMethod.toUpperCase()}`
    )
    setCheckoutSuccess(true)
    clearCart()

    setTimeout(() => {
      setCheckoutSuccess(false)
    }, 4000)
  }, [items, amountPaid, total, paymentMethod, clearCart])

  // Keyboard action shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.repeat) {
        // Only trigger complete sale if not typing in inputs
        const activeTag = document.activeElement?.tagName.toLowerCase()
        if (activeTag !== "input" && activeTag !== "textarea") {
          e.preventDefault()
          completeSale()
        }
      }
      if (e.key === "Escape") {
        e.preventDefault()
        clearCart()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [items, amountPaid, total, paymentMethod, completeSale, clearCart])

  return (
    <aside className="w-[360px] bg-white border-l border-slate-200 flex flex-col z-20 overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.03)] h-full relative">
      {/* Checkout Toast overlay */}
      {checkoutSuccess && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="font-bold text-lg text-slate-800 mb-1">Sale Complete</h3>
          <p className="text-xs text-slate-500 max-w-xs">{successMsg}</p>
          <button
            onClick={() => setCheckoutSuccess(false)}
            className="mt-6 px-5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4.5 h-4.5 text-blue-600 font-bold" />
          <h2 className="font-bold text-sm text-slate-800">Current Orders</h2>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-500">
          {items.length} Items
        </span>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-slate-50/50">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <ShoppingCart className="w-12 h-12 stroke-[1.5] mb-2 text-slate-300" />
            <span className="text-xs font-medium">Cart is empty</span>
          </div>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onUpdateQty={(q) => updateQuantity(item.product.id, q)}
              onRemove={() => removeItem(item.product.id)}
            />
          ))
        )}
      </div>

      {/* Checkout Panel */}
      <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col gap-3">
        {/* Subtotal & Discount info */}
        <div className="space-y-1 bg-white p-2.5 rounded-lg border border-slate-200/60 shadow-2xs">
          <div className="flex justify-between text-slate-500 text-xs font-medium">
            <span>Subtotal</span>
            <span className="font-mono">₱{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
            <span>Discount (%)</span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max="100"
                value={discountPercent || ""}
                onChange={(e) => {
                  const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                  setDiscountPercent(val)
                }}
                className="w-10 px-1 py-0.5 text-center font-mono text-xs border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="0"
              />
              <Percent className="w-3 h-3 text-slate-400" />
            </div>
          </div>
          <div className="flex justify-between items-baseline pt-1.5 border-t border-slate-100 mt-1.5">
            <span className="text-xs font-bold text-slate-800">Total Amount</span>
            <span className="text-lg font-black text-blue-600 font-mono">
              ₱{total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/50 rounded-xl border border-slate-200/80">
          <button
            onClick={() => {
              setPaymentMethod("cash")
              setAmountPaid("")
            }}
            className={cn(
              "flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-bold transition-all duration-200",
              paymentMethod === "cash"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-transparent text-slate-600 hover:bg-slate-200/80"
            )}
          >
            <Coins className="w-4 h-4" />
            <span className="text-[10px] tracking-wider uppercase">Cash</span>
          </button>
          <button
            onClick={() => {
              setPaymentMethod("gcash")
              setAmountPaid(total.toFixed(2)) // GCash is always exact amount
            }}
            className={cn(
              "flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-bold transition-all duration-200",
              paymentMethod === "gcash"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-transparent text-slate-600 hover:bg-slate-200/80"
            )}
          >
            <QrCode className="w-4 h-4" />
            <span className="text-[10px] tracking-wider uppercase">GCash</span>
          </button>
        </div>

        {/* Payment Details Form */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Amount Paid
            </label>
            {paymentMethod === "cash" && (
              <button
                onClick={() => setAmountPaid(total.toFixed(2))}
                className="text-[9px] font-bold text-blue-600 uppercase hover:bg-blue-50 px-1.5 py-0.5 rounded transition-all"
              >
                Exact Amount
              </button>
            )}
          </div>
          <div className="flex items-baseline gap-1 border-b border-slate-100 pb-1.5">
            <span className="text-lg font-bold text-slate-300 font-mono">₱</span>
            <input
              type="text"
              placeholder="0.00"
              value={amountPaid}
              disabled={paymentMethod === "gcash"}
              onChange={(e) => {
                // Ensure only decimals
                const val = e.target.value
                if (/^\d*\.?\d*$/.test(val)) {
                  setAmountPaid(val)
                }
              }}
              className="w-full border-none p-0 text-xl font-black font-mono text-slate-800 focus:ring-0 placeholder:text-slate-200 bg-transparent outline-none"
            />
          </div>
          {paymentMethod === "cash" && (
            <div className="flex justify-between items-center pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                Change Due
              </span>
              <span className="text-base font-black font-mono text-amber-600">
                ₱{changeDue.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Action button trigger blocks */}
        <div className="flex flex-col gap-1.5 pt-0.5">
          <button
            disabled={items.length === 0}
            onClick={completeSale}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-black text-xs shadow-md shadow-blue-600/10 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <CheckCircle className="w-4 h-4" />
            COMPLETE SALE (ENTER)
          </button>
          <button
            disabled={items.length === 0}
            onClick={clearCart}
            className="w-full bg-transparent text-slate-400 hover:text-red-500 py-1.5 rounded-lg text-[10px] font-bold transition-all"
          >
            Discard Transaction (ESC)
          </button>
        </div>
      </div>
    </aside>
  )
}
