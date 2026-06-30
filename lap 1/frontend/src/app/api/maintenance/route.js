import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Maintenance API endpoint',
    endpoints: [
      'GET /api/maintenance - ดึงบันทึกการบำรุงรักษา',
      'POST /api/maintenance - เพิ่มบันทึกใหม่',
    ]
  })
}

export async function POST(request) {
  try {
    const data = await request.json()
    
    return NextResponse.json({
      success: true,
      message: 'เพิ่มบันทึกการบำรุงรักษาสำเร็จ',
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
