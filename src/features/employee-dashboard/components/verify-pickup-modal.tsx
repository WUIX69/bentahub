"use client"

import { useState } from "react"
import { X, CheckCircle2 } from "lucide-react"

interface VerifyPickupModalProps {
  isOpen: boolean
  onClose: () => void
  type: "payment" | "pickup" | null
  item: {
    id: string
    customerName: string
    referenceNumber?: string
    amount?: number
    code?: string
    date: string
  } | null
  onConfirm: (id: string) => void
}

export function VerifyPickupModal({ isOpen, onClose, type, item, onConfirm }: VerifyPickupModalProps) {
  const [confirmed, setConfirmed] = useState(false)

  if (!isOpen || !item || !type) return null

  const dateStr = new Date(item.date).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  })

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col animate-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
          <h2 className="text-lg font-bold text-foreground">
            {type === "payment" ? "Verify Payment" : "Complete Pickup"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg border border-border">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Customer</p>
              <p className="text-sm font-bold text-foreground">{item.customerName}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Date</p>
              <p className="text-xs font-mono text-foreground">{dateStr}</p>
            </div>
            {type === "payment" && item.referenceNumber && (
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Ref Number</p>
                <p className="text-xs font-mono font-bold text-foreground">{item.referenceNumber}</p>
              </div>
            )}
            {type === "payment" && item.amount !== undefined && (
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Amount</p>
                <p className="text-sm font-mono font-bold text-primary">₱{item.amount.toFixed(2)}</p>
              </div>
            )}
            {type === "pickup" && item.code && (
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Pickup Code</p>
                <p className="text-sm font-mono font-bold text-foreground">{item.code}</p>
              </div>
            )}
          </div>

          <label className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors cursor-pointer select-none">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20"
            />
            <span className="text-sm text-foreground font-medium">
              {type === "payment"
                ? "I confirm the payment reference is valid and has been received"
                : "I confirm the customer's identity and items have been handed over"}
            </span>
          </label>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-700">
              {type === "payment"
                ? "This action will mark the payment as verified and make the order ready for pickup."
                : "This action will complete the pickup process and remove this item from the queue."}
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border bg-muted/20 flex justify-end gap-3">
          <button onClick={onClose} className="h-11 px-6 border border-border text-muted-foreground hover:bg-muted rounded-lg text-sm font-bold transition-all">Cancel</button>
          <button
            disabled={!confirmed}
            onClick={() => { onConfirm(item.id); setConfirmed(false) }}
            className="h-11 px-6 bg-primary text-primary-foreground rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/95 disabled:opacity-40 disabled:pointer-events-none transition-all"
          >
            {type === "payment" ? "Confirm Verified" : "Complete Pickup"}
          </button>
        </div>
      </div>
    </div>
  )
}
