"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function InventoryFlowTrend() {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly">("daily")
  
  // Height percentages for mockup
  const flowBars = [40, 65, 50, 80, 45, 70, 55, 90]

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm flex flex-col overflow-hidden h-[380px]">
      <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
        <h4 className="font-bold text-lg text-foreground">Inventory Flow Trend</h4>
        <div className="flex p-1 bg-muted rounded-lg">
          <button 
            onClick={() => setTimeframe("daily")}
            className={cn(
              "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
              timeframe === "daily" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Daily
          </button>
          <button 
            onClick={() => setTimeframe("weekly")}
            className={cn(
              "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
              timeframe === "weekly" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Weekly
          </button>
        </div>
      </div>
      <div className="p-6 flex-1 flex items-end gap-4 h-[280px]">
        {flowBars.map((height, i) => (
          <div 
            key={i} 
            className={cn(
              "flex-1 rounded-t-lg transition-all duration-500",
              i === flowBars.length - 1 ? "bg-primary" : "bg-primary/20 hover:bg-primary/45"
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  )
}
