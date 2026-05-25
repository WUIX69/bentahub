"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
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
  const router = useRouter()
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

  if (isFeatured) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row md:col-span-8 h-full hover:shadow-md transition-shadow">
        {/* Image Area - 1/3 width on desktop */}
        <div className="relative md:w-1/3 aspect-video md:aspect-auto bg-muted">
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

        {/* Content Area - 2/3 width on desktop */}
        <div className="p-6 flex flex-col flex-1 justify-between gap-4">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="font-mono text-xs text-muted-foreground">{data.id}</span>
                <h3 className="font-heading text-lg font-bold text-foreground mt-0.5">
                  {data.title}
                </h3>
              </div>
              <button
                onClick={() => {}}
                className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More Options</span>
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {data.description || "No description provided."}
            </p>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
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
          </div>

          <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-4">
            <span className="text-sm font-medium text-foreground">
              Full details available
            </span>
            <Button size="sm" onClick={() => router.push(`/customer/reservations`)}>
              View Pickup Pass
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Compact Variant
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col md:col-span-6 h-full hover:shadow-md transition-shadow p-4">
      <div className="flex items-start gap-4">
        {/* Small Thumbnail 80x80 */}
        <div className="relative size-20 bg-muted rounded-lg overflow-hidden shrink-0">
          {data.image ? (
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <Package className="h-8 w-8" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="font-mono text-xs text-muted-foreground">{data.id}</span>
              <h3 className="font-heading text-base font-bold text-foreground mt-0.5 truncate">
                {data.title}
              </h3>
            </div>
            <span className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
              statusStyles[data.status]
            )}>
              {statusLabels[data.status]}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {data.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>Expected: {data.date}</span>
        </div>
        <Button size="sm" variant="outline" onClick={() => router.push(`/customer/reservations`)}>
          Details
        </Button>
      </div>
    </div>
  )
}

