import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ระบบจัดการน้ำประปาหมู่บ้าน
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          ระบบอัจฉริยะสำหรับการจัดการและติดตามการใช้น้ำของครัวเรือนแต่ละหลัง
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            href="/dashboard" 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            เข้าสู่ระบบ
          </Link>
          <button className="px-8 py-3 bg-white text-gray-800 rounded-lg font-semibold border-2 border-gray-300 hover:bg-gray-100 transition">
            ติดต่อเรา
          </button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <FeatureCard 
          icon="📊"
          title="ติดตามการใช้น้ำ"
          desc="ดูการใช้น้ำแบบเรียลไทม์ของครัวเรือนคุณ"
        />
        <FeatureCard 
          icon="🔧"
          title="บำรุงรักษา"
          desc="บันทึกและจัดการงานบำรุงรักษา"
        />
        <FeatureCard 
          icon="📈"
          title="รายงาน"
          desc="วิเคราะห์ข้อมูลการใช้น้ำรายเดือน"
        />
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  )
}
