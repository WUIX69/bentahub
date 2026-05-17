"use client"

import { 
  SummaryCards, 
  RecentOrdersTable, 
  NearbyBranches 
} from "@/features/customer-dashboard"

export default function CustomerPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          Hello, Alex Rivera!
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back to your dashboard. Here&apos;s what&apos;s happening with your account.
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Grid Layout for Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <RecentOrdersTable />
        </div>

        {/* Nearby Branches - Takes 1 column on large screens */}
        <div className="lg:col-span-1">
          <NearbyBranches />
        </div>
      </div>
    </div>
  )
}
