import { Search, Download, Eye, ChevronLeft, ChevronRight } from "lucide-react"

interface Transaction {
  date: string
  id: string
  branch: string
  cashier: string
  items: string
  total: string
  payment: "CASH" | "GCASH"
  status: "Completed" | "Pending"
}

const mockTransactions: Transaction[] = [
  {
    date: "5/16/2026",
    id: "#TXN-00001",
    branch: "B001 - Makati",
    cashier: "Cashier 2",
    items: "1 items",
    total: "₱35.00",
    payment: "CASH",
    status: "Completed",
  },
  {
    date: "5/16/2026",
    id: "#TXN-00002",
    branch: "B003 - Quezon City",
    cashier: "Cashier 1",
    items: "4 items",
    total: "₱1,240.00",
    payment: "GCASH",
    status: "Completed",
  },
  {
    date: "5/16/2026",
    id: "#TXN-00003",
    branch: "B001 - Makati",
    cashier: "Cashier 2",
    items: "2 items",
    total: "₱520.00",
    payment: "CASH",
    status: "Pending",
  },
]

export function HistoryTable() {
  return (
    <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="px-6 py-3 bg-muted/20 border-b border-border flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h3 className="text-sm font-bold text-foreground">All Branch Transactions</h3>
          <p className="text-[11px] text-muted-foreground">Real-time update from all active branch registers.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search ID, Branch..."
              className="pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64"
            />
          </div>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95">
            <Download className="h-[18px] w-[18px]" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted/10 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Transaction ID</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Branch</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Cashier</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Items</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockTransactions.map((txn) => {
              const paymentStyles = txn.payment === "CASH"
                ? "bg-muted text-muted-foreground"
                : "bg-accent text-primary"

              const statusStyles = txn.status === "Completed"
                ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800"
                : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800"

              return (
                <tr key={txn.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">{txn.date}</td>
                  <td className="px-6 py-4 font-mono text-sm text-primary">{txn.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{txn.branch}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{txn.cashier}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{txn.items}</td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">{txn.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${paymentStyles}`}>
                      {txn.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusStyles}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-muted/5 border-t border-border flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-bold text-foreground">1 - 3</span> of <span className="font-bold text-foreground">1,284</span> entries
        </p>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-muted transition-colors text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">1</button>
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-muted text-xs font-bold">2</button>
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-muted transition-colors text-muted-foreground">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
