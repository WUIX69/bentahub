export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="staff-layout">
      {/* TODO: Add Staff-specific navigation and role guard */}
      <header className="p-4 border-b">Staff Dashboard Header</header>
      <main className="p-4">{children}</main>
    </div>
  )
}
