import { 
  MonitoringMetrics, 
  InventoryStatusTable, 
  SystemAlerts 
} from "@/features/admin-dashboard"
import { Download } from "lucide-react"

export default function MonitoringPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Metric Cards Row */}
      <MonitoringMetrics />

      {/* Utility Row: Select Branch & Export */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <label className="text-sm font-bold text-muted-foreground whitespace-nowrap" htmlFor="branch-select">
            Select Branch:
          </label>
          <select 
            id="branch-select"
            className="w-full md:w-64 rounded-lg border-border bg-background focus:ring-primary focus:border-primary text-sm p-2.5"
          >
            <option>All Branches</option>
            <option>Main Branch</option>
            <option>Branch 2</option>
            <option>Branch 3</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-muted/50 hover:bg-muted rounded-lg border border-border text-sm font-bold transition-all w-full md:w-auto justify-center">
          <Download className="h-[18px] w-[18px]" />
          Export Data
        </button>
      </div>

      {/* Inventory Status Table Section */}
      <InventoryStatusTable />

      <SystemAlerts />
    </div>
  )
}
