"use client"

import { ShoppingBag, Calendar, Award } from "lucide-react"

export function SummaryCards() {
  const cards = [
    {
      label: "Total Orders",
      value: "42",
      icon: ShoppingBag,
      iconBg: "bg-accent",
      iconColor: "text-accent-foreground",
    },
    {
      label: "Active Reservations",
      value: "3",
      icon: Calendar,
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Loyalty Points",
      value: "1,250",
      icon: Award,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div 
            key={index}
            className="bg-card border border-border p-6 rounded-xl shadow-sm flex items-center gap-5 transition-all hover:shadow-md"
          >
            <div className={`size-12 ${card.iconBg} rounded-full flex items-center justify-center`}>
              <Icon className={`h-6 w-6 ${card.iconColor}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{card.label}</p>
              <h3 className="text-2xl font-bold mt-0.5">{card.value}</h3>
            </div>
          </div>
        )
      })}
    </div>
  )
}
