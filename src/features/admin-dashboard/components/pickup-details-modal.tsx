"use client"

import React from "react"
import { X, Printer } from "lucide-react"

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

interface PickupDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  order: PickupOrder | null
}

export function PickupDetailsModal({ isOpen, onClose, order }: PickupDetailsModalProps) {
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

  const handlePrint = () => {
    window.print()
  }

  const isReady = order.status === "READY FOR PICKUP"

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 print:hidden">
      <div className="bg-card w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh] animate-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
          <h2 className="text-lg font-bold text-foreground">Pickup Details - {order.id}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Status Badge */}
          <div className="flex">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-xs border ${isReady
                ? "bg-accent/50 text-primary border-primary/20"
                : "bg-muted text-muted-foreground border-border"
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${isReady ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />
              {order.status}
            </span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-muted/20 rounded-lg border border-border">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Order Info</h4>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">Order ID: <span className="font-semibold text-foreground">{order.id}</span></p>
                <p className="text-muted-foreground">Scheduled Date: <span className="font-semibold text-foreground">{order.scheduledDate}</span></p>
                <p className="text-muted-foreground">Branch: <span className="font-semibold text-foreground">{order.branch}</span></p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Customer Info</h4>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">Full Name: <span className="font-semibold text-foreground">{order.customerName}</span></p>
                <p className="text-muted-foreground">Email: <span className="font-semibold text-foreground">{order.customerEmail}</span></p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Items</h4>
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-muted/10 border-b border-border">
                  <tr className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3 text-center">Qty</th>
                    <th className="px-4 py-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-foreground">
                  {order.itemsList.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3 text-center font-medium">{item.qty} units</td>
                      <td className="px-4 py-3 text-right font-medium">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/10 font-bold text-foreground border-t border-border">
                    <td className="px-4 py-3 text-right" colSpan={2}>Total Amount</td>
                    <td className="px-4 py-3 text-right text-primary">{calculateTotal()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Status History</h4>
            <div className="relative flex flex-col gap-6 pl-6 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-border">
              <div className="relative flex flex-col">
                <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-muted-foreground/30" />
                <p className="text-sm font-bold text-foreground leading-tight">Order Placed</p>
                <p className="text-xs text-muted-foreground">Sep 20, 2026, 09:00 AM</p>
              </div>
              <div className="relative flex flex-col">
                <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-muted-foreground/30" />
                <p className="text-sm font-bold text-foreground leading-tight">Payment Verified</p>
                <p className="text-xs text-muted-foreground">Sep 21, 2026, 10:30 AM</p>
              </div>
              <div className="relative flex flex-col">
                <div
                  className={`absolute -left-[23px] top-1.5 w-3 h-3 rounded-full ${isReady
                    ? "bg-primary ring-4 ring-primary/20"
                    : "bg-muted-foreground/30"
                    }`}
                />
                <p className={`text-sm font-bold leading-tight ${isReady ? "text-primary" : "text-foreground"}`}>
                  Ready for Pickup
                </p>
                {isReady && <p className="text-xs text-muted-foreground">Oct 21, 2023, 02:00 PM</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/20 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="h-11 px-6 border border-border text-foreground hover:bg-muted rounded-lg text-sm font-bold transition-all"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="h-11 px-6 bg-primary text-primary-foreground rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/95 transition-all flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print Summary
          </button>
        </div>
      </div>
    </div>
  )
}
