import { Search, Eye, Pencil, ChevronLeft, ChevronRight } from "lucide-react"

interface Reservation {
  id: string
  customerName: string
  initials: string
  avatarBg: string
  avatarText: string
  branch: string
  itemsCount: number
  pickupDate: string
  status: "Pending" | "Completed" | "Confirmed" | "Cancelled"
}

const mockReservations: Reservation[] = [
  {
    id: "#BH-7821",
    customerName: "Juan Dela Cruz",
    initials: "JD",
    avatarBg: "bg-accent/40",
    avatarText: "text-primary",
    branch: "Quezon City Main",
    itemsCount: 5,
    pickupDate: "Oct 24, 2023 • 14:30",
    status: "Pending",
  },
  {
    id: "#BH-7822",
    customerName: "Maria Santos",
    initials: "MS",
    avatarBg: "bg-muted/80",
    avatarText: "text-muted-foreground",
    branch: "Makati Business Hub",
    itemsCount: 2,
    pickupDate: "Oct 24, 2023 • 11:00",
    status: "Completed",
  },
  {
    id: "#BH-7823",
    customerName: "Antonio Luna",
    initials: "AL",
    avatarBg: "bg-primary/10",
    avatarText: "text-primary",
    branch: "Cebu IT Park",
    itemsCount: 12,
    pickupDate: "Oct 25, 2023 • 09:00",
    status: "Confirmed",
  },
  {
    id: "#BH-7824",
    customerName: "Elena Reyes",
    initials: "ER",
    avatarBg: "bg-destructive/10",
    avatarText: "text-destructive",
    branch: "Davao City Branch",
    itemsCount: 1,
    pickupDate: "Oct 23, 2023 • 17:45",
    status: "Cancelled",
  },
]

export function ReservationTable() {
  return (
    <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/5">
        <h4 className="text-base font-bold text-foreground">All Reservations</h4>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search ID or Customer..."
            className="w-full pl-9 pr-4 py-1.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted/10 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Reservation ID
              </th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Branch
              </th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Pickup Date
              </th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockReservations.map((reservation) => {
              const statusStyles = (() => {
                switch (reservation.status) {
                  case "Pending":
                    return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  case "Completed":
                    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  case "Confirmed":
                    return "bg-primary/10 text-primary"
                  case "Cancelled":
                    return "bg-destructive/10 text-destructive"
                  default:
                    return "bg-muted text-muted-foreground"
                }
              })()

              return (
                <tr
                  key={reservation.id}
                  className="hover:bg-muted/10 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-sm text-primary font-bold">
                    {reservation.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${reservation.avatarBg} ${reservation.avatarText} flex items-center justify-center font-bold text-xs`}
                      >
                        {reservation.initials}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {reservation.customerName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {reservation.branch}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {reservation.itemsCount} {reservation.itemsCount === 1 ? "Item" : "Items"}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {reservation.pickupDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles}`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1 hover:bg-muted rounded text-primary transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-muted/5 border-t border-border flex justify-between items-center">
        <p className="text-xs text-muted-foreground font-medium">
          Showing 1-4 of 1,284 results
        </p>
        <div className="flex items-center gap-2">
          <button className="p-1.5 border border-border rounded hover:bg-muted transition-colors text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-bold">
            1
          </button>
          <button className="px-3 py-1 hover:bg-muted rounded text-xs font-bold">
            2
          </button>
          <button className="px-3 py-1 hover:bg-muted rounded text-xs font-bold">
            3
          </button>
          <button className="p-1.5 border border-border rounded hover:bg-muted transition-colors text-muted-foreground">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
