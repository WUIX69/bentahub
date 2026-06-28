import { AlertTriangle, Info, CheckCircle } from "lucide-react"
import type { SystemAlertItem } from "@/types/admin"

interface SystemAlertsProps {
  data: SystemAlertItem[]
}

export function SystemAlerts({ data }: SystemAlertsProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm flex flex-col overflow-hidden h-[380px]">
      <div className="p-6 bg-muted/20 border-b border-border">
        <h4 className="font-bold text-lg text-foreground">System Alerts</h4>
      </div>
      <div className="p-6 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
        {data.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">No alerts</p>
        )}
        {data.map((alert, i) => {
          const iconMap = { critical: AlertTriangle, warning: Info, success: CheckCircle } as const
          const Icon = iconMap[alert.type]
          const borderMap = { critical: "border-l-destructive", warning: "border-l-amber-500", success: "border-l-green-500" }
          const bgMap = {
            critical: "bg-destructive/5 dark:bg-destructive/10",
            warning: "bg-amber-500/5 dark:bg-amber-500/10",
            success: "bg-green-500/5 dark:bg-green-500/10",
          }
          const iconMapColors = { critical: "text-destructive", warning: "text-amber-500", success: "text-green-500" }

          return (
            <div key={i} className={`p-4 rounded flex gap-4 ${bgMap[alert.type]} border-l-4 ${borderMap[alert.type]}`}>
              <Icon className={`h-5 w-5 ${iconMapColors[alert.type]} shrink-0`} />
              <div>
                <p className="text-xs font-bold text-foreground">{alert.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{alert.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
