"use client"

import { MapPin, Store } from "lucide-react"

export function NearbyBranches() {
  const branches = [
    {
      name: "Main Branch",
      address: "Poblacion, Santa Maria, Bulacan",
      status: "open",
      statusText: "Open Now",
    },
    {
      name: "Pulong Buhangin Branch",
      address: "Pulong Buhangin, Santa Maria, Bulacan",
      status: "open",
      statusText: "Open Now",
    },
    {
      name: "Caypombo Branch",
      address: "Caypombo, Santa Maria, Bulacan",
      status: "closed",
      statusText: "Closed • Opens 8 AM",
    },
  ]

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 md:p-6 border-b border-border">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="font-heading text-lg font-bold">Nearby Branches</h2>
      </div>

      {/* Branch List */}
      <div className="divide-y divide-border">
        {branches.map((branch, index) => (
          <div key={index} className="p-4 md:p-6 flex items-start gap-4">
            <div className="size-10 bg-muted rounded-full flex items-center justify-center shrink-0">
              <Store className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground truncate">{branch.name}</h3>
              <p className="text-xs text-muted-foreground truncate mb-2">{branch.address}</p>
              
              <div className="flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${branch.status === "open" ? "bg-emerald-500" : "bg-destructive"}`} />
                <span className={`text-xs font-medium ${branch.status === "open" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                  {branch.statusText}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
