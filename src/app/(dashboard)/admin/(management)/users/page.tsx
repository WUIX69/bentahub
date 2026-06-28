import { UserMetrics, UserTable } from "@/features/users"

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-8">
      {/* KPI Cards */}
      <UserMetrics />

      {/* User Table & Action Bar */}
      <UserTable />
    </div>
  )
}
