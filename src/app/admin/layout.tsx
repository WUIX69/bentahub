export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      {/* TODO: Add Admin-specific navigation/sidebar and role guard */}
      <aside className="p-4 border-r">Admin Sidebar</aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
