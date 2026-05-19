import { KPICard, SalesChart, StockTable } from "@/features/admin-dashboard"
import { BranchStockOverview } from "@/features/analytics"
import { CreditCard, Package, AlertTriangle } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Revenue"
          value="₱124,500.00"
          trend="+12.5%"
          trendType="up"
          icon={CreditCard}
        />
        <KPICard
          title="Total Inventory"
          value="1,245 items"
          trend="-2.3%"
          trendType="down"
          icon={Package}
        />
        <KPICard
          title="Low Stock Alerts"
          value="14 items"
          trend="Requires attention"
          trendType="warning"
          icon={AlertTriangle}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <SalesChart />
        </div>
        <div className="lg:col-span-4">
          <BranchStockOverview />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <StockTable />
      </div>
    </div>
  )
}
