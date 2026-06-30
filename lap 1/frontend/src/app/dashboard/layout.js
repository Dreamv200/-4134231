export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <nav className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h2>
          <NavLink href="/dashboard" label="📊 ภาพรวม" />
          <NavLink href="/dashboard/water" label="💧 การใช้น้ำ" />
          <NavLink href="/dashboard/maintenance" label="🔧 บำรุงรักษา" />
          <NavLink href="/dashboard/history" label="📜 ประวัติ" />
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

function NavLink({ href, label }) {
  return (
    <a 
      href={href}
      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition"
    >
      {label}
    </a>
  )
}
