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

  const featuredReservation: ReservationData = {
    id: "#BH-0001",
    title: "Monthly Grocery Essentials",
    description: "Bulk order for monthly supplies including rice, canned goods, and condiments.",
    status: "ready",
    date: "May 20, 2026",
    location: "Main Branch",
    items: "12 items",
    shipping: "Standard Pickup",
    image: "/images/dashboard/product-1.png",
  }

  const otherReservations: ReservationData[] = [
    {
      id: "#BH-0002",
      title: "Baking Supplies",
      description: "Ingredients for weekend baking session.",
      status: "processing",
      date: "May 22, 2026",
      location: "Pulong Buhangin Branch",
      items: "5 items",
      shipping: "Standard Pickup",
      image: "/images/dashboard/product-2.png",
    },
    {
      id: "#BH-0003",
      title: "Quick Snacks",
      description: "Assorted snacks and drinks.",
      status: "completed",
      date: "May 15, 2026",
      location: "Caypombo Branch",
      items: "8 items",
      shipping: "Standard Pickup",
      image: "/images/dashboard/product-3.png",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            My Reservations
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your reserved items for pickup.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">3</span> reservations
        </div>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Featured Reservation + Compact List */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            Active Reservation
          </h2>
          
          <ReservationCard variant="featured" data={featuredReservation} />

          <div className="pt-2">
            <h2 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">
              Other Reservations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherReservations.map((res) => (
                <ReservationCard key={res.id} variant="compact" data={res} />
              ))}
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4">
          <ReservationSummary />
        </div>
      </div>
    </div>
  )
}
