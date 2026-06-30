export default function WaterStatus() {
  const waterUsage = 1250
  const waterLimit = 1500
  const percentage = (waterUsage / waterLimit) * 100

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">สถานะการใช้น้ำ</h2>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">การใช้น้ำรวม</span>
          <span className="font-bold text-lg">{waterUsage} / {waterLimit} m³</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        {percentage <= 75 && <p>✓ การใช้น้ำอยู่ในเกณฑ์ปกติ</p>}
        {percentage > 75 && percentage <= 90 && <p>⚠️ การใช้น้ำสูงกว่าปกติ</p>}
        {percentage > 90 && <p>🔴 การใช้น้ำเกินขีดจำกัด</p>}
      </div>
    </div>
  )
}
