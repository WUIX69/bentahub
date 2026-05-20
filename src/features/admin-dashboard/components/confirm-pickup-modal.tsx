"use client"

import React, { useState } from "react"
import { X } from "lucide-react"

interface PickupItem {
  name: string
  qty: string
  price: string
}

interface PickupOrder {
  id: string
  customerName: string
  customerEmail: string
  branch: string
  items: string
  itemsList: PickupItem[]
  scheduledDate: string
  status: "READY FOR PICKUP" | "PENDING"
}

interface ConfirmPickupModalProps {
  isOpen: boolean
  onClose: () => void
  order: PickupOrder | null
  onConfirm: (orderId: string) => void
}

export function ConfirmPickupModal({ isOpen, onClose, order, onConfirm }: ConfirmPickupModalProps) {
  const [idVerified, setIdVerified] = useState(false)
  const [itemsChecked, setItemsChecked] = useState(false)

  if (!isOpen || !order) return null

  // Calculate total amount
  const calculateTotal = () => {
    let total = 0
    order.itemsList.forEach((item) => {
      const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, ""))
      const numericQty = parseInt(item.qty) || 1
      if (!isNaN(numericPrice)) {
        total += numericPrice * numericQty
      }
    })
    return `₱${total.toFixed(2)}`
  }

  const isFormValid = idVerified && itemsChecked

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh] animate-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
          <h2 className="text-lg font-bold text-foreground">Confirm Order Pickup - {order.id}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg border border-border">
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Customer</p>
              <p className="text-sm font-bold text-foreground">{order.customerName}</p>
              <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Branch</p>
              <p className="text-sm font-bold text-foreground">{order.branch}</p>
            </div>
          </div>

          {/* Order Summary Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Order Summary</h3>
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/10 text-[11px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
                    <th className="px-4 py-3">Item</th>
                    <th className="px-4 py-3 text-center">Qty</th>
                    <th className="px-4 py-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {order.itemsList.map((item, idx) => (
                    <tr key={idx} className="text-sm text-foreground">
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3 text-center font-medium">{item.qty}</td>
                      <td className="px-4 py-3 text-right font-medium">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/10 font-bold text-foreground border-t border-border">
                    <td className="px-4 py-3" colSpan={2}>Total Amount</td>
                    <td className="px-4 py-3 text-right text-primary">{calculateTotal()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Verification Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Verification Checklist</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={idVerified}
                  onChange={(e) => setIdVerified(e.target.checked)}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20"
                />
                <span className="text-sm text-foreground font-medium">Identity Verified (Customer ID Checked)</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={itemsChecked}
                  onChange={(e) => setItemsChecked(e.target.checked)}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20"
                />
                <span className="text-sm text-foreground font-medium">Items Checked (Order contents match summary)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-border bg-muted/20 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-6 border border-border text-muted-foreground hover:bg-muted rounded-lg text-sm font-bold transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!isFormValid}
            onClick={() => onConfirm(order.id)}
            className="h-11 px-6 bg-primary text-primary-foreground rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/95 disabled:opacity-40 disabled:pointer-events-none transition-all"
          >
            Confirm &amp; Complete Pickup
          </button>
        </div>
      </div>
    </div>
  )
}
