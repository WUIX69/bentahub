"use client"

import { useState } from "react"
import {
  Bell, ShoppingCart, AlertTriangle, Package, RefreshCw,
  ChevronRight, Filter, Download, Clock, User, ListChecks
} from "lucide-react"

interface StaffNotificationItem {
  id: string
  title: string
  description?: string
  type: "order" | "overdue" | "sync" | "payout"
  icon: React.ReactNode
  iconBg: string
  borderColor: string
  titleColor: string
  timestamp: string
  metadata?: { label: string; value: string }[]
  actions?: { label: string; variant: "primary" | "outline" | "ghost"; href?: string }[]
}

const mockNotifications: StaffNotificationItem[] = [
  {
    id: "s1",
    title: "New Reservation: #BH-99128 Ready for Prep",
    type: "order",
    icon: <ShoppingCart className="w-8 h-8" />,
    iconBg: "bg-primary/10",
    borderColor: "border-l-primary",
    titleColor: "text-primary",
    timestamp: "Just now",
    metadata: [
      { label: "Customer", value: "Sarah Johnson" },
      { label: "Item", value: "Dual-Core Processing Unit (x4)" },
      { label: "Station", value: "B-12" },
    ],
    actions: [
      { label: "Process", variant: "primary" },
      { label: "View Details", variant: "outline" },
    ],
  },
  {
    id: "s2",
    title: "Pickup Overdue: James Smith (Order #BH-72805)",
    description: "Slot ended at 09:00 AM. Item remains in Locker Cluster C-04.",
    type: "overdue",
    icon: <AlertTriangle className="w-8 h-8" />,
    iconBg: "bg-tertiary/10",
    borderColor: "border-l-tertiary",
    titleColor: "text-tertiary",
    timestamp: "14m overdue",
    actions: [
      { label: "Call Customer", variant: "primary" },
      { label: "Dismiss", variant: "ghost" },
    ],
  },
  {
    id: "s3",
    title: "Stock Sync: Branch B001 inventory updated",
    description: "Automatic sync completed. 450 SKUs updated. 2 discrepancies flagged for review in 'Peripherals' category.",
    type: "sync",
    icon: <Package className="w-8 h-8" />,
    iconBg: "bg-surface-variant",
    borderColor: "border-l-outline",
    titleColor: "text-foreground",
    timestamp: "2h ago",
    actions: [
      { label: "Review Discrepancies", variant: "outline" },
    ],
  },
  {
    id: "s4",
    title: "Payout Processed: #PAY-8821",
    description: "Settlement for week 24 has been successfully distributed to merchant accounts. Batch ID: BT-X992-K.",
    type: "payout",
    icon: <Download className="w-8 h-8" />,
    iconBg: "bg-green-50",
    borderColor: "border-l-green-600",
    titleColor: "text-green-700",
    timestamp: "5h ago",
    actions: [
      { label: "Export Report", variant: "primary" },
    ],
  },
]

export function StaffNotificationsFeed() {
  const [notifications] = useState(mockNotifications)

  const progressValue = 95

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-foreground">Staff Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage operational alerts and system synchronization.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-error fill-current" />
              Urgent Tasks
            </h3>
            <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded-full text-[10px] font-bold">
              Action Required
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-border/30 hover:border-error/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-error" />
                <span className="text-sm font-medium text-foreground">3 Overdue Pickups</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-border/30 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-tertiary" />
                <span className="text-sm font-medium text-foreground">12 Prep Pending</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary" />
              Inventory Sync
            </h3>
            <button className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-[11px] font-bold hover:opacity-90 active:scale-95 transition-all">
              Manual Re-sync
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-surface-variant stroke-current"
                  cx="50" cy="50" fill="transparent" r="40"
                  strokeWidth="8"
                />
                <circle
                  className="text-primary stroke-current"
                  cx="50" cy="50" fill="transparent" r="40"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * progressValue) / 100}
                  strokeLinecap="round"
                  strokeWidth="8"
                  style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset 0.35s" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{progressValue}%</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">
                Sync state: <span className="text-green-600 font-bold">Stable</span>
              </p>
              <p className="text-xs text-muted-foreground/70 font-mono">
                Last node: B001-A (3s ago)
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Live Operations Feed</h2>
          <div className="flex items-center gap-2">
            <button className="bg-surface-container px-3 py-1.5 rounded-lg text-[11px] font-bold text-muted-foreground flex items-center gap-1.5 hover:bg-surface-container-higher transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="bg-surface-container px-3 py-1.5 rounded-lg text-[11px] font-bold text-muted-foreground hover:bg-surface-container-higher transition-colors">
              Mark all as read
            </button>
          </div>
        </div>

        {notifications.map((n) => (
          <div
            key={n.id}
            className={`bg-card border-l-4 ${n.borderColor} border-y border-r border-border rounded-r-xl p-5 flex flex-col md:flex-row gap-4 items-start shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
          >
            <div className="absolute top-2 right-3">
              <span className="text-[11px] text-muted-foreground/60 font-mono">{n.timestamp}</span>
            </div>

            <div className={`${n.iconBg} p-3 rounded-lg flex-shrink-0`}>
              {n.icon}
            </div>

            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className={`text-sm font-bold ${n.titleColor}`}>{n.title}</h4>
                {n.type === "order" && (
                  <span className="bg-accent text-primary px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-tighter">
                    New Order
                  </span>
                )}
              </div>

              {n.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">{n.description}</p>
              )}

              {n.metadata && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {n.metadata.map((m, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{m.label}</span>
                      <span className="text-xs font-medium text-foreground">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {n.actions && (
                <div className="flex gap-2 pt-1">
                  {n.actions.map((a, i) => (
                    <button
                      key={i}
                      className={
                        a.variant === "primary"
                          ? "px-4 py-1.5 bg-primary text-primary-foreground rounded text-[11px] font-bold hover:bg-primary/90 transition-colors"
                          : a.variant === "outline"
                            ? "px-4 py-1.5 border border-border rounded text-[11px] font-bold text-foreground hover:bg-surface-container transition-colors"
                            : "px-3 py-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground hover:underline transition-colors"
                      }
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      <div className="flex justify-center pt-2">
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-50">
          <RefreshCw className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
