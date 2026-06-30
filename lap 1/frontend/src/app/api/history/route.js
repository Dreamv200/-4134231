import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'History API endpoint',
    endpoints: [
      'GET /api/history - ดึงประวัติการใช้น้ำ',
      'GET /api/history?start=2024-01-01&end=2024-12-31 - ดึงประวัติตามช่วงเวลา',
    ]
  })
}
