"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, CheckCircle2, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { ConfirmPickupModal } from "./confirm-pickup-modal"
import { PickupDetailsModal } from "./pickup-details-modal"

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

const mockPickups: PickupOrder[] = [
  {
    id: "#ORD-9021",
    customerName: "Marcus Thorne",
    customerEmail: "m.thorne@example.com",
    branch: "Downtown Central",
    items: "4 units",
    itemsList: [
      { name: "Premium Jasmine Rice (5kg)", qty: "2", price: "₱45.00" },
      { name: "Fresh Bell Peppers", qty: "1kg", price: "₱8.50" },
    ],
    scheduledDate: "Oct 24, 2023 · 14:30",
    status: "READY FOR PICKUP",
  },
  {
    id: "#ORD-8945",
    customerName: "Elena Rodriguez",
    customerEmail: "elena.r@corporate.net",
    branch: "North Plaza Hub",
    items: "12 units",
    itemsList: [
      { name: "Organic Brown Eggs (Tray)", qty: "1", price: "₱15.00" },
      { name: "Ligo Sardines Red (Can)", qty: "10", price: "₱2.00" },
    ],
    scheduledDate: "Oct 24, 2023 · 16:00",
    status: "PENDING",
  },
]

export function PickupTable() {
  const [pickups, setPickups] = useState<PickupOrder[]>(mockPickups)
  const [confirmingPickup, setConfirmingPickup] = useState<PickupOrder | null>(null)
  const [viewingPickup, setViewingPickup] = useState<PickupOrder | null>(null)

  const handleConfirmPickup = (orderId: string) => {
    setPickups((prev) => prev.filter((p) => p.id !== orderId))
    setConfirmingPickup(null)
  }

  return (
    <>
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-border flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h4 className="text-base font-bold text-foreground">Pending Pickups</h4>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search order ID or customer..."
                className="pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all w-64 md:w-72 shadow-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all">
              <SlidersHorizontal className="h-[18px] w-[18px]" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/10 border-b border-border">
                <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Order ID</th>
                <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Customer</th>
                <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Branch</th>
                <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold text-center">Items</th>
                <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Scheduled Date</th>
                <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Status</th>
                <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {pickups.map((order) => {
                const isReady = order.status === "READY FOR PICKUP"

                const statusStyles = isReady
                  ? "bg-accent/50 text-primary border border-primary/20"
                  : "bg-muted text-muted-foreground border border-border"

                const dotColor = isReady ? "bg-primary animate-pulse" : "bg-muted-foreground"

                return (
                  <tr key={order.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-primary font-semibold">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm">{order.customerName}</span>
                        <span className="text-muted-foreground text-xs">{order.customerEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{order.branch}</td>
                    <td className="px-6 py-4 text-sm text-foreground text-center font-medium">{order.items}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{order.scheduledDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-[10px] ${statusStyles}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setConfirmingPickup(order)}
                          className="p-2 border border-border hover:bg-primary/10 hover:border-primary text-primary rounded-lg transition-all"
                          title="Confirm Pickup"
                        >
                          <CheckCircle2 className="h-[18px] w-[18px]" />
                        </button>
                        <button
                          onClick={() => setViewingPickup(order)}
                          className="p-2 border border-border hover:bg-muted text-muted-foreground rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="h-[18px] w-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-border flex justify-between items-center bg-muted/5">
          <p className="text-xs text-muted-foreground">Showing {pickups.length} of 18 pending orders</p>
          <div className="flex items-center gap-1.5">
            <button className="w-9 h-9 flex items-center justify-center border border-border rounded text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50" disabled>
              <ChevronLeft className="h-[18px] w-[18px]" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded border border-primary bg-primary text-primary-foreground font-bold text-xs">1</button>
            <button className="w-9 h-9 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted transition-colors font-bold text-xs">2</button>
            <button className="w-9 h-9 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted transition-colors font-bold text-xs">3</button>
            <span className="px-1 text-muted-foreground text-xs">...</span>
            <button className="w-9 h-9 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted transition-colors font-bold text-xs">9</button>
            <button aria-label="Next page" className="w-9 h-9 flex items-center justify-center border border-border rounded text-muted-foreground hover:bg-muted transition-colors">
              <ChevronRight className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmPickupModal
        key={confirmingPickup ? `confirm-${confirmingPickup.id}` : "confirm-closed"}
        isOpen={confirmingPickup !== null}
        onClose={() => setConfirmingPickup(null)}
        order={confirmingPickup}
        onConfirm={handleConfirmPickup}
      />

      <PickupDetailsModal
        key={viewingPickup ? `details-${viewingPickup.id}` : "details-closed"}
        isOpen={viewingPickup !== null}
        onClose={() => setViewingPickup(null)}
        order={viewingPickup}
      />
    </>
  )
}
