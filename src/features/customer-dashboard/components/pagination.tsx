"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Prev */}
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage <= 1}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors border border-border disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous Page</span>
      </button>

      {/* Pages */}
      {[1, 2, 3].map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            currentPage === page
              ? "bg-primary text-primary-foreground"
              : "border border-border hover:bg-muted text-foreground"
          }`}
        >
          {page}
        </button>
      ))}

      <span className="text-muted-foreground">...</span>

      <button
        onClick={() => setCurrentPage(24)}
        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
          currentPage === 24
            ? "bg-primary text-primary-foreground"
            : "border border-border hover:bg-muted text-foreground"
        }`}
      >
        24
      </button>

      {/* Next */}
      <button
        onClick={() => setCurrentPage((p) => Math.min(24, p + 1))}
        disabled={currentPage >= 24}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors border border-border disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next Page</span>
      </button>
    </div>
  )
}
