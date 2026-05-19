import { Filter, MoreVertical, FileX } from "lucide-react"

export function TransactionDetailsTable() {
  return (
    <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden mt-6">
      <div className="px-6 py-3 bg-muted/20 border-b border-border flex justify-between items-center">
        <h3 className="text-sm font-bold text-foreground">Transaction Details</h3>
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-muted rounded text-muted-foreground transition-colors">
            <Filter className="h-5 w-5" />
          </button>
          <button className="p-1.5 hover:bg-muted rounded text-muted-foreground transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Transaction ID</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Branch</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Items</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Cashier</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/20 transition-colors group">
              <td className="px-6 py-20 text-center" colSpan={7}>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <FileX className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">No records found for the selected filters.</p>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your date range or branch selection.</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-background border-t border-border flex justify-between items-center">
        <p className="text-xs text-muted-foreground font-medium">Showing 0 of 0 entries</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-border rounded text-muted-foreground cursor-not-allowed opacity-50 text-sm font-medium" disabled>
            Previous
          </button>
          <button className="px-3 py-1 border border-border rounded text-muted-foreground cursor-not-allowed opacity-50 text-sm font-medium" disabled>
            Next
          </button>
        </div>
      </div>
    </section>
  )
}
