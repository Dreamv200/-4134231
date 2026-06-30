export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💧</span>
          <h1 className="text-xl font-bold">Water Management</h1>
        </div>
        <nav className="flex gap-6">
          <a href="#" className="hover:bg-blue-700 px-3 py-2 rounded">Home</a>
          <a href="#" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</a>
          <a href="#" className="hover:bg-blue-700 px-3 py-2 rounded">Help</a>
        </nav>
      </div>
    </header>
  )
}
