"use client"

import Image from "next/image"
import { Calendar, MapPin, Package, Truck, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ReservationData {
  id: string
  title: string
  description?: string
  status: "processing" | "ready" | "completed"
  date: string
  location?: string
  items?: string
  shipping?: string
  image?: string
}

interface ReservationCardProps {
  variant: "featured" | "compact"
  data: ReservationData
}

export function ReservationCard({ variant, data }: ReservationCardProps) {
  const isFeatured = variant === "featured"

  const statusStyles = {
    processing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    ready: "bg-primary/15 text-primary",
    completed: "bg-muted text-muted-foreground",
  }

  const statusLabels = {
    processing: "Processing",
    ready: "Ready for Pickup",
    completed: "Completed",
  }

  return (
    <div className={cn(
      "bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow",
      isFeatured ? "md:flex-row md:col-span-8" : "md:col-span-6"
    )}>
      {/* Image / Icon Area */}
      <div className={cn(
        "relative bg-muted",
        isFeatured ? "md:w-2/5 aspect-video md:aspect-auto" : "aspect-video"
      )}>
        {data.image ? (
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <Package className="h-12 w-12" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            statusStyles[data.status]
          )}>
            {statusLabels[data.status]}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 md:p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="font-mono text-xs text-muted-foreground">{data.id}</span>
              <h3 className="font-heading text-lg font-bold text-foreground mt-0.5">
                {data.title}
              </h3>
            </div>
            <button className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More Options</span>
            </button>
          </div>

          {/* Description or Metadata */}
          {isFeatured ? (
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{data.date}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="truncate">{data.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4 text-primary" />
                <span>{data.items}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" />
                <span>{data.shipping}</span>
              </div>
            </div>
          ) : (
            <>
              {data.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {data.description}
                </p>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>Expected: {data.date}</span>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-4">
          <span className="text-sm font-medium text-foreground">
            {isFeatured ? "Full details available" : "Standard Pickup"}
          </span>
          <Button size="sm" variant={isFeatured ? "default" : "outline"}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}
