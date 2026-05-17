"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"


export function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Prev */}
      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors border border-border">
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous Page</span>
      </button>

      {/* Pages */}
      <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium bg-primary text-primary-foreground">
        1
      </button>
      <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium border border-border hover:bg-muted text-foreground transition-colors">
        2
      </button>
      <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium border border-border hover:bg-muted text-foreground transition-colors">
        3
      </button>
      
      <span className="text-muted-foreground">...</span>
      
      <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium border border-border hover:bg-muted text-foreground transition-colors">
        12
      </button>

      {/* Next */}
      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors border border-border">
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next Page</span>
      </button>
    </div>
  )
}
