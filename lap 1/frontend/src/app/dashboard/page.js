export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">ภาพรวมระบบ</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="ครัวเรือนทั้งหมด" value="45" icon="🏠" />
        <StatCard label="มิเตอร์ทั้งหมด" value="52" icon="📏" />
        <StatCard label="การใช้น้ำรวม" value="1,250 m³" icon="💧" />
        <StatCard label="ปัญหาที่ต้องแก้" value="3" icon="⚠️" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">ข้อมูลเคล็ดสำหรับ</h2>
          <div className="text-center py-12 text-gray-400">
            <p>กำลังเชื่อมต่อกับ API...</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">กิจกรรมล่าสุด</h2>
          <div className="space-y-3">
            <ActivityLog text="อัปเดตข้อมูล Meter #001" time="10 นาที ที่แล้ว" />
            <ActivityLog text="เพิ่มการอ่านค่า น้ำใหม่" time="1 ชั่วโมง ที่แล้ว" />
            <ActivityLog text="แก้ไขข้อมูลครัวเรือน" time="2 ชั่วโมง ที่แล้ว" />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-gray-600 text-sm mb-2">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  )
}

function ActivityLog({ text, time }) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
      <div className="flex-1">
        <p className="text-gray-800">{text}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  )
}
