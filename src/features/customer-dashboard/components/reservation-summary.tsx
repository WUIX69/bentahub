"use client"

import { Button } from "@/components/ui/button"

export function ReservationSummary() {
  return (
    <div className="flex flex-col gap-6 md:col-span-4">
      {/* Quick Action Card */}
      <div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-sm">
        <h3 className="font-heading text-lg font-bold mb-2">Need More Time?</h3>
        <p className="text-sm text-primary-foreground/80 mb-4">
          You can extend your pickup window by up to 24 hours if you cannot make it today.
        </p>
        <Button variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white hover:text-primary">
          Extend Pickup Time
        </Button>
      </div>

      {/* Stats Card */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="font-heading text-base font-bold text-foreground mb-4">
          Reservation Summary
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Active Reservations</span>
            <span className="font-mono font-bold text-foreground">01</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Processing</span>
            <span className="font-mono font-bold text-foreground">02</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Completed</span>
            <span className="font-mono font-bold text-foreground">12</span>
          </div>
          
          <div className="border-t border-border mt-3 pt-3 flex items-center justify-between text-sm font-bold">
            <span className="text-foreground">Total History</span>
            <span className="font-mono text-primary">15</span>
          </div>
        </div>
      </div>
    </div>
  )
}
