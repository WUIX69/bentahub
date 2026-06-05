"use client"

import { useState } from "react"
import {
  Utensils,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  ChevronDown,
  Clock,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CashierNotification {
  id: string
  title: string
  description?: string
  type: "reservation" | "payment" | "stock" | "system"
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  borderColor?: string
  isDashed?: boolean
  mutedBg?: boolean
  timestamp: string
  badgeText?: string
  badgeVariant?: "success" | "warning" | "primary" | "info"
  metadata?: { label: string; value: string }[]
  actions?: { label: string; variant: "primary" | "outline" | "danger"; onClick?: () => void }[]
}

export function CashierNotificationsFeed() {
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Orders" | "Payments" | "System">("All")
  
  const mockNotifications: CashierNotification[] = [
    {
      id: "n-1",
      title: "New Reservation: Table #4",
      description: "Reservation ready for in-store checkout and processing. Table reserved for Sarah Connor.",
      type: "reservation",
      icon: <Utensils className="w-5 h-5" />,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      borderColor: "border-l-4 border-l-primary",
      timestamp: "Just now",
      badgeText: "Pending POS Confirmation",
      badgeVariant: "primary",
      metadata: [
        { label: "Customer", value: "Sarah Connor" },
        { label: "Guests", value: "3 Pax" },
        { label: "Reservation ID", value: "RES-9902" }
      ],
      actions: [
        {
          label: "Confirm Order",
          variant: "primary",
          onClick: () => alert("Reservation order confirmed successfully!")
        },
        {
          label: "Details",
          variant: "outline",
          onClick: () => alert("Viewing reservation RES-9902 details...")
        }
      ]
    },
    {
      id: "n-2",
      title: "GCash Payment Verified",
      description: "Payment transaction completed successfully. GCash Reference #987216354 verified.",
      type: "payment",
      icon: <CheckCircle className="w-5 h-5" />,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      timestamp: "8m ago",
      badgeText: "Transaction Logged",
      badgeVariant: "success",
      metadata: [
        { label: "Amount", value: "₱385.00" },
        { label: "Reference", value: "987216354" },
        { label: "Payment ID", value: "PAY-5002" }
      ],
      actions: [
        {
          label: "View Transaction",
          variant: "outline",
          onClick: () => alert("Navigating to transaction logs for PAY-5002...")
        }
      ]
    },
    {
      id: "n-3",
      title: "Low Stock Alert: Mineral Water 500mL",
      description: "Inventory level has dropped below safety limits. Immediately review to prevent OOS.",
      type: "stock",
      icon: <AlertTriangle className="w-5 h-5" />,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      borderColor: "border-l-4 border-l-red-500",
      timestamp: "1h ago",
      badgeText: "Critical Level (5 left)",
      badgeVariant: "warning",
      metadata: [
        { label: "Product", value: "Mineral Water 500mL" },
        { label: "SKU", value: "BEV-WAT-002" },
        { label: "Current Stock", value: "5 Bottles" }
      ],
      actions: [
        {
          label: "Restock Now",
          variant: "danger",
          onClick: () => alert("Opening inventory restock form for Mineral Water...")
        }
      ]
    },
    {
      id: "n-4",
      title: "System Update: BentaHub POS v1.2.4",
      description: "Automatic background patch successfully applied. Here's a brief summary of the release notes:",
      type: "system",
      icon: <RefreshCw className="w-5 h-5" />,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-500",
      isDashed: true,
      mutedBg: true,
      timestamp: "4h ago",
      badgeText: "System Patch Applied",
      badgeVariant: "info",
      metadata: [
        { label: "Version", value: "v1.2.4" },
        { label: "Build Target", value: "POS-Client-Production" }
      ],
      actions: [
        {
          label: "Release Notes",
          variant: "outline",
          onClick: () => alert("Changelog:\n- Improved checkout and cash verification speed\n- Fixed thermal printer alignment offset\n- Synchronized local caching for offline POS failover")
        }
      ]
    }
  ]

  const filteredNotifications = mockNotifications.filter((item) => {
    if (selectedFilter === "All") return true
    if (selectedFilter === "Orders") return item.type === "reservation"
    if (selectedFilter === "Payments") return item.type === "payment"
    if (selectedFilter === "System") return item.type === "system" || item.type === "stock"
    return true
  })

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto bg-background">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        
        {/* Header Summary Stats */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800">Notifications</h1>
            <p className="text-sm font-medium text-slate-400 mt-1">
              Real-time operational alerts, payments, and system notices.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("All notifications marked as read.")}
              className="px-4 py-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-xl hover:border-primary hover:text-primary transition-all active:scale-[0.98]"
            >
              Mark all as read
            </button>
          </div>
        </section>

        {/* Filter Pills row */}
        <section className="flex gap-2 pb-1 overflow-x-auto select-none scrollbar-none items-center">
          {(["All", "Orders", "Payments", "System"] as const).map((filter) => {
            const isActive = selectedFilter === filter
            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={cn(
                  "px-5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all shadow-sm border",
                  isActive
                    ? "bg-primary text-white border-primary shadow-primary/20"
                    : "bg-white text-slate-500 border-slate-200 hover:border-primary hover:text-primary"
                )}
              >
                {filter}
                {isActive && <span className="ml-1.5 inline-block w-1.5 h-1.5 bg-white rounded-full"></span>}
              </button>
            )
          })}
        </section>

        {/* Feed layout list */}
        <section className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <Info className="w-8 h-8 text-slate-300 mb-2" />
              <span className="text-sm font-semibold">No notifications found</span>
              <span className="text-xs">There are no notices under this category right now.</span>
            </div>
          ) : (
            filteredNotifications.map((n) => (
              <div
                key={n.id}
                className={cn(
                  "relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row gap-4 items-start overflow-hidden",
                  n.borderColor,
                  n.isDashed && "border-dashed border-slate-300",
                  n.mutedBg && "bg-slate-50/40"
                )}
              >
                {/* Accent Icon Circle */}
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm", n.iconBg, n.iconColor)}>
                  {n.icon}
                </div>

                {/* Body Content */}
                <div className="flex-1 space-y-3 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-sm text-slate-800 leading-snug">{n.title}</h3>
                      {n.badgeText && (
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-tight",
                            n.badgeVariant === "success" && "bg-emerald-50 text-emerald-600 border border-emerald-100",
                            n.badgeVariant === "warning" && "bg-rose-50 text-red-500 border border-rose-100",
                            n.badgeVariant === "primary" && "bg-primary/5 text-primary border border-primary/10",
                            n.badgeVariant === "info" && "bg-blue-50 text-blue-600 border border-blue-100"
                          )}
                        >
                          {n.badgeText}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{n.timestamp}</span>
                    </div>
                  </div>

                  {n.description && (
                    <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{n.description}</p>
                  )}

                  {/* Metadata Table-like Rows */}
                  {n.metadata && n.metadata.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100/80">
                      {n.metadata.map((m, i) => (
                        <div key={i} className="flex flex-col gap-0.5">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{m.label}</span>
                          <span className="text-xs font-bold text-slate-700 truncate">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action row buttons */}
                  {n.actions && n.actions.length > 0 && (
                    <div className="flex items-center gap-2 pt-1">
                      {n.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={act.onClick}
                          className={cn(
                            "px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-[0.97]",
                            act.variant === "primary" && "bg-primary text-white hover:brightness-105 shadow-sm shadow-primary/20",
                            act.variant === "outline" && "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                            act.variant === "danger" && "bg-red-500 text-white hover:brightness-105 shadow-sm shadow-red-500/20"
                          )}
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </section>

        {/* Load More Link Footer */}
        <section className="flex justify-center pt-2">
          <button
            onClick={() => alert("Loading older notifications...")}
            className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline hover:brightness-95 active:scale-95 transition-all"
          >
            <span>Load previous notifications</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </section>
      </div>
    </div>
  )
}
