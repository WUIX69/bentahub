import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export interface KPICardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconColorClass?: string
  iconBgClass?: string
  subtext?: string
  subtextClass?: string
  trend?: string
  trendType?: "up" | "down" | "warning"
  trendLabel?: string
  href?: string
  className?: string
}

export function KPICard({
  title,
  value,
  icon: Icon,
  iconColorClass = "text-primary",
  iconBgClass = "bg-primary/10",
  subtext,
  subtextClass = "text-muted-foreground",
  trend,
  trendType,
  trendLabel = "from last month",
  href,
  className,
}: KPICardProps) {
  const trendColor = trendType
    ? {
        up: "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
        down: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
        warning: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400",
      }[trendType]
    : ""

  const CardContent = (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-200",
        href && "cursor-pointer hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBgClass)}>
          <Icon className={cn("h-5 w-5", iconColorClass)} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-extrabold text-foreground">{value}</span>
        {trend && trendType && (
          <div className="flex items-center gap-1.5 text-xs mt-1">
            <span className={cn("px-1.5 py-0.5 rounded-full font-medium", trendColor)}>
              {trend}
            </span>
            <span className="text-muted-foreground">{trendLabel}</span>
          </div>
        )}
        {subtext && !trend && (
          <span className={cn("text-xs font-medium mt-1", subtextClass)}>
            {subtext}
          </span>
        )}
      </div>
    </div>
  )

  if (href) {
    return <Link href={href}>{CardContent}</Link>
  }

  return CardContent
}
