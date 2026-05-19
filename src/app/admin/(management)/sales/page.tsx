import { 
  SalesFilters, 
  SalesMetrics, 
  TransactionDetailsTable 
} from "@/features/admin-dashboard"

export default function SalesPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Bento Grid - Filters & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <SalesFilters />
        <SalesMetrics />
      </div>

      {/* Transaction Details Table */}
      <TransactionDetailsTable />
    </div>
  )
}
