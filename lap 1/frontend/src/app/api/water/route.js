import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Water API endpoint',
    endpoints: [
      'GET /api/water - ดึงข้อมูลการใช้น้ำทั้งหมด',
      'GET /api/water/[id] - ดึงข้อมูลการใช้น้ำตามครัวเรือน',
      'POST /api/water - เพิ่มข้อมูลการใช้น้ำใหม่',
    ]
  })
}

export async function POST(request) {
  try {
    const data = await request.json()
    
    return NextResponse.json({
      success: true,
      message: 'เพิ่มข้อมูลการใช้น้ำสำเร็จ',
      data: {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date().toISOString(),
      }
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
