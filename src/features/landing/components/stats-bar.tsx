"use client"

import { Network, Package, Clock } from "lucide-react"

export function StatsBar() {
  return (
    <section className="bg-muted py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Active Branches */}
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <Network className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Branches</p>
              <p className="text-2xl font-bold text-foreground">3 Locations</p>
            </div>
          </div>

          {/* Card 2: Available Products */}
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Available Products</p>
              <p className="text-2xl font-bold text-foreground">500+ Essentials</p>
            </div>
          </div>

          {/* Card 3: Operating Hours */}
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Operating Hours</p>
              <p className="text-2xl font-bold text-foreground">Daily 6AM – 10PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
