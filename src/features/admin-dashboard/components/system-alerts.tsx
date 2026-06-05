import { AlertTriangle, Info, CheckCircle } from "lucide-react"

export function SystemAlerts() {
  const alerts = [
    {
      type: "critical",
      title: "Stock Critical: Main Branch",
      description: "Rice levels below 5% of capacity.",
      icon: AlertTriangle,
      borderClass: "border-l-4 border-l-destructive",
      bgClass: "bg-destructive/5 dark:bg-destructive/10",
      iconClass: "text-destructive"
    },
    {
      type: "warning",
      title: "Reorder Reminder",
      description: "Sugar orders pending approval.",
      icon: Info,
      borderClass: "border-l-4 border-l-amber-500",
      bgClass: "bg-amber-500/5 dark:bg-amber-500/10",
      iconClass: "text-amber-500"
    },
    {
      type: "success",
      title: "Stock Sync Successful",
      description: "All branches synchronized at 08:00 AM.",
      icon: CheckCircle,
      borderClass: "border-l-4 border-l-green-500",
      bgClass: "bg-green-500/5 dark:bg-green-500/10",
      iconClass: "text-green-500"
    }
  ]

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm flex flex-col overflow-hidden h-[380px]">
      <div className="p-6 bg-muted/20 border-b border-border">
        <h4 className="font-bold text-lg text-foreground">System Alerts</h4>
      </div>
      <div className="p-6 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
        {alerts.map((alert, i) => {
          const Icon = alert.icon
          return (
            <div 
              key={i} 
              className={`p-4 rounded flex gap-4 ${alert.bgClass} ${alert.borderClass}`}
            >
              <Icon className={`h-5 w-5 ${alert.iconClass} shrink-0`} />
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
