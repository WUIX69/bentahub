import { Search, SlidersHorizontal, Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

interface User {
  name: string
  initials: string
  avatarBg: string
  avatarText: string
  email: string
  role: "Admin" | "Cashier" | "Staff" | "Customer"
  branch: string
  status: "Active" | "Inactive"
  joinDate: string
}

const mockUsers: User[] = [
  {
    name: "John Doe",
    initials: "JD",
    avatarBg: "bg-primary/10",
    avatarText: "text-primary",
    email: "john.doe@bentahub.com",
    role: "Admin",
    branch: "All Branches",
    status: "Active",
    joinDate: "2023-10-12",
  },
  {
    name: "Sarah Cruz",
    initials: "SC",
    avatarBg: "bg-amber-500/10",
    avatarText: "text-amber-600 dark:text-amber-400",
    email: "sarah.c@bentahub.com",
    role: "Cashier",
    branch: "Manila Central",
    status: "Active",
    joinDate: "2024-01-05",
  },
  {
    name: "Mike Reyes",
    initials: "MR",
    avatarBg: "bg-muted/80",
    avatarText: "text-muted-foreground",
    email: "m.reyes@gmail.com",
    role: "Staff",
    branch: "Quezon City Hub",
    status: "Inactive",
    joinDate: "2023-11-20",
  },
  {
    name: "Cathy Lim",
    initials: "CL",
    avatarBg: "bg-accent/40",
    avatarText: "text-primary",
    email: "clim88@yahoo.com",
    role: "Customer",
    branch: "N/A",
    status: "Active",
    joinDate: "2024-02-14",
  },
]

export function UserTable() {
  return (
    <div className="flex flex-col gap-6">
      {/* Table Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-[536px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <input
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary shadow-sm transition-all text-sm h-12"
            placeholder="Search by name or email..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 h-12 px-6 bg-card border border-border text-foreground rounded-lg text-xs font-bold hover:bg-muted transition-all">
            <SlidersHorizontal className="h-[18px] w-[18px]" />
            Filters
          </button>
          <button className="flex flex-1 sm:flex-initial items-center justify-center gap-2 h-12 px-8 bg-primary text-primary-foreground rounded-lg font-bold text-xs shadow-lg shadow-primary/20 hover:opacity-95 active:scale-[0.98] transition-all">
            <Plus className="h-[18px] w-[18px]" />
            Add User
          </button>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/10 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Name
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Email
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">
                  Role
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Branch
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">
                  Join Date
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockUsers.map((user) => {
                const roleStyles = (() => {
                  switch (user.role) {
                    case "Admin":
                      return "bg-primary/10 text-primary border border-primary/20"
                    case "Cashier":
                      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    case "Staff":
                      return "bg-muted/80 text-muted-foreground border border-border"
                    case "Customer":
                      return "bg-accent/40 text-primary border border-primary/10"
                    default:
                      return "bg-muted text-muted-foreground"
                  }
                })()

                const statusStyles = user.status === "Active"
                  ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20"
                  : "bg-destructive/10 text-destructive border border-destructive/20"

                const dotColor = user.status === "Active" ? "bg-green-500" : "bg-destructive"

                return (
                  <tr
                    key={user.email}
                    className="hover:bg-muted/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full ${user.avatarBg} ${user.avatarText} flex items-center justify-center font-bold text-sm`}
                        >
                          {user.initials}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tight ${roleStyles}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {user.branch}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${statusStyles}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-sm text-muted-foreground">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 flex items-center justify-between bg-muted/5 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-bold text-foreground">1-4</span> of{" "}
            <span className="font-bold text-foreground">42</span> users
          </p>
          <div className="flex items-center gap-1">
            <button
              className="p-1 rounded border border-border hover:bg-muted disabled:opacity-30 disabled:pointer-events-none h-8 w-8 flex items-center justify-center"
              disabled
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-primary-foreground font-bold text-xs shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted text-xs font-bold">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted text-xs font-bold">
              3
            </button>
            <span className="px-1 text-xs text-muted-foreground">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted text-xs font-bold">
              11
            </button>
            <button className="p-1 rounded border border-border hover:bg-muted h-8 w-8 flex items-center justify-center">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
