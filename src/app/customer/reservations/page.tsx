"use client"

import { 
  ReservationCard, 
  ReservationSummary 
} from "@/features/customer-dashboard"
import type { ReservationData } from "@/features/customer-dashboard/components/reservation-card"
import { cn } from "@/lib/utils"

export default function ReservationsPage() {
  const tabs = ["All", "Processing", "Ready", "Completed"]
  const activeTab = "All"

  // Demo reservations
  const featuredReservation: ReservationData = {
    id: "RES-2026-001",
    title: "Monthly Grocery Stash",
    status: "ready",
    date: "May 18, 2026",
    location: "Main Branch",
    items: "12 items",
    shipping: "In-Store Pickup",
    image: "/images/landing/product-1.png",
  }

  const compactReservations: ReservationData[] = [
    {
      id: "RES-2026-002",
      title: "Weekly Fresh Produce",
      description: "Apples, Bananas, and seasonal vegetables.",
      status: "processing",
      date: "May 20, 2026",
      image: "/images/landing/product-2.png",
    },
    {
      id: "RES-2026-003",
      title: "Baking Supplies",
      description: "Flour, sugar, and yeast for weekend baking.",
      status: "processing",
      date: "May 21, 2026",
      image: "/images/landing/product-3.png",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          My Reservations
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your active reservations and view pickup details.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={cn(
              "pb-3 text-sm font-medium transition-colors relative",
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Featured Card */}
        <ReservationCard variant="featured" data={featuredReservation} />

        {/* Summary Sidebar */}
        <ReservationSummary />

        {/* Compact Cards */}
        {compactReservations.map((res) => (
          <ReservationCard key={res.id} variant="compact" data={res} />
        ))}

        {/* Past Reservations Table (Placeholder or simple list) */}
        <div className="md:col-span-12 bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-heading text-lg font-bold text-foreground mb-4">
            Past Reservations
          </h3>
          <p className="text-sm text-muted-foreground">
            No past reservations to display.
          </p>
        </div>
      </div>
    </div>
  )
}
