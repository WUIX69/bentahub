"use client"

import { useState } from "react"
import {
  CheckCircle, Wallet, Tag, AlertTriangle, Bell,
  ArrowRight, ShoppingBag, Percent
} from "lucide-react"

type FilterTab = "all" | "orders" | "payments" | "offers"

interface CustomerNotificationItem {
  id: string
  title: string
  description: string
  type: "order" | "payment" | "offer" | "alert"
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  borderColor: string
  timestamp: string
  span: string
  layout: "default" | "featured"
  actions?: { label: string; variant: "primary" | "outline" }[]
}

const mockNotifications: CustomerNotificationItem[] = [
  {
    id: "c1",
    title: "Reservation Approved!",
    description: 'Your <strong>Kopiko Blanca Twin</strong> is ready for pickup at <strong class="text-primary">BentaHub Branch A</strong>. Please show your QR code upon arrival.',
    type: "order",
    icon: <CheckCircle className="w-6 h-6" />,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "border-l-green-500",
    timestamp: "2m ago",
    span: "md:col-span-4",
    layout: "default",
    actions: [
      { label: "View Details", variant: "primary" },
      { label: "Mark as Read", variant: "outline" },
    ],
  },
  {
    id: "c2",
    title: "Payment Verified",
    description: "Reference #TXN-00042 has been successfully processed. Your wallet balance has been updated.",
    type: "payment",
    icon: <Wallet className="w-5 h-5" />,
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
    borderColor: "border-l-primary",
    timestamp: "1h ago",
    span: "md:col-span-2",
    layout: "default",
  },
  {
    id: "c3",
    title: "Flash Sale Today!",
    description: "10% off on all Grains & Rice categories for the next 4 hours. Stock up now!",
    type: "offer",
    icon: <Percent className="w-6 h-6" />,
    iconBg: "bg-tertiary-container",
    iconColor: "text-on-tertiary-container",
    borderColor: "",
    timestamp: "3h ago",
    span: "md:col-span-3",
    layout: "featured",
    actions: [
      { label: "Shop Now", variant: "primary" },
    ],
  },
  {
    id: "c4",
    title: "Low Stock Alert",
    description: "Canned goods inventory is below 15% at your favorite branch. Consider restocking soon to avoid missing out on bestsellers.",
    type: "alert",
    icon: <AlertTriangle className="w-6 h-6" />,
    iconBg: "bg-error-container",
    iconColor: "text-error",
    borderColor: "",
    timestamp: "Yesterday",
    span: "md:col-span-3",
    layout: "default",
  },
]

const tabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "orders", label: "Orders" },
  { key: "payments", label: "Payments" },
  { key: "offers", label: "Offers" },
]

export function CustomerNotificationsFeed() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all")

  const filtered = activeTab === "all"
    ? mockNotifications
    : mockNotifications.filter((n) => {
        if (activeTab === "orders") return n.type === "order"
        if (activeTab === "payments") return n.type === "payment"
        if (activeTab === "offers") return n.type === "offer" || n.type === "alert"
        return true
      })

  return (
    <div className="space-y-6">
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Stay updated with your latest activities and exclusive offers.
        </p>
      </section>

      <section className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={
              activeTab === tab.key
                ? "px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm transition-colors"
                : "px-4 py-1.5 rounded-full bg-surface-container-highest text-muted-foreground text-xs font-bold hover:bg-surface-variant transition-colors"
            }
          >
            {tab.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 cursor-pointer text-primary hover:underline">
          <Bell className="w-[18px] h-[18px]" />
          <span className="text-xs font-bold">Mark all as read</span>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {filtered.map((n) => {
          if (n.layout === "featured") {
            return (
              <div
                key={n.id}
                className={`${n.span} relative overflow-hidden bg-primary text-primary-foreground p-5 rounded-xl shadow-lg group`}
              >
                <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10 transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full bg-white/20 rounded-full" />
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
                      Hot Deal
                    </span>
                    <span className="text-xs opacity-80">{n.timestamp}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{n.title}</h3>
                  <p className="text-sm opacity-90 mb-4 max-w-[80%]">{n.description}</p>
                  {n.actions && (
                    <button className="flex items-center gap-1.5 bg-primary-foreground text-primary px-4 py-2 rounded-full text-xs font-bold shadow-md hover:bg-accent transition-colors">
                      {n.actions[0].label}
                      <ArrowRight className="w-[18px] h-[18px]" />
                    </button>
                  )}
                </div>
              </div>
            )
          }

          const isAlert = n.type === "alert"

          return (
            <div
              key={n.id}
              className={`${n.span} bg-card border ${isAlert ? "border-error/20 bg-error-container/20" : "border-border"} ${
                n.borderColor ? `border-l-4 ${n.borderColor}` : "rounded-xl border"
              } p-4 rounded-xl shadow-sm hover:shadow-md transition-all group`}
            >
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-full ${n.iconBg} flex items-center justify-center flex-shrink-0 ${isAlert ? "animate-pulse" : ""}`}>
                  <div className={n.iconColor}>{n.icon}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className={`text-sm font-bold ${isAlert ? "text-error" : "text-foreground"}`}>
                      {n.title}
                    </h3>
                    <span className="text-[11px] text-muted-foreground/60 whitespace-nowrap flex-shrink-0">
                      {n.timestamp}
                    </span>
                  </div>
                  <p
                    className="text-xs text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: n.description }}
                  />
                  {n.actions && (
                    <div className="flex gap-2 mt-3">
                      {n.actions.map((a, i) => (
                        <button
                          key={i}
                          className={
                            a.variant === "primary"
                              ? "px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-[11px] font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
                              : "px-3 py-1.5 bg-surface-container-highest text-muted-foreground rounded-lg text-[11px] font-bold hover:bg-surface-variant transition-colors"
                          }
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
