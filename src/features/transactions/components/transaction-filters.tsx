"use client"

import { useState } from "react"
import { Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TransactionFilters() {
  const [activeTab, setActiveTab] = useState("All")
  const [dateFilter, setDateFilter] = useState("Last 30 Days")
  const tabs = ["All", "Successful", "Processing", "Failed"]

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Tabs */}
      <div className="flex border-b border-border gap-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors relative whitespace-nowrap",
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search & Date */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="h-9 w-full md:w-64 pl-9 pr-4 text-sm bg-background border border-border rounded-lg outline-none focus:border-primary transition-colors"
          />
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="gap-2 shrink-0"
          onClick={() => setDateFilter(dateFilter === "Last 30 Days" ? "All Time" : "Last 30 Days")}
        >
          <Calendar className="h-4 w-4" />
          <span>{dateFilter}</span>
        </Button>
      </div>
    </div>
  )
}

