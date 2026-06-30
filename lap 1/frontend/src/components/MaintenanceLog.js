export default function MaintenanceLog() {
  const logs = [
    { id: 1, date: '2024-06-20', description: 'ซ่อมมิเตอร์บ้าน #001', status: 'completed' },
    { id: 2, date: '2024-06-18', description: 'ตรวจสอบระบบท่อ', status: 'completed' },
    { id: 3, date: '2024-06-15', description: 'ทำความสะอาดตัวกรอง', status: 'in-progress' },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">บันทึกการบำรุงรักษา</h2>
      
      <div className="space-y-3">
        {logs.map(log => (
          <div key={log.id} className="flex items-start gap-3 pb-3 border-b border-gray-200">
            <div className={`w-3 h-3 rounded-full mt-1 ${
              log.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{log.description}</p>
              <p className="text-sm text-gray-500">{log.date} - {log.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
