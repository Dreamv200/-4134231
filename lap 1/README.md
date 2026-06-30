# ระบบจัดการน้ำประปาหมู่บ้าน — Backend (Next.js + Prisma)

โปรเจคนี้เป็น Backend scaffold สำหรับระบบจัดการน้ำประปาหมู่บ้าน โดยใช้ Next.js API routes และ Prisma (SQLite)

**คุณสมบัติหลักที่มีแล้ว**
- จัดการ `Household` (CRUD)
- เก็บ `Meter` และ `Reading`
- รายงานการใช้น้ำรวมสำหรับแต่ละครัวเรือน
- สคริปต์ seed ตัวอย่างข้อมูล

**ความต้องการเบื้องต้น**
- Node.js >= 18
- npm หรือ yarn

การติดตั้งและรัน (ภายในโฟลเดอร์โปรเจค)

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

ไฟล์สำคัญ
- [prisma/schema.prisma](prisma/schema.prisma) — โครงสร้างฐานข้อมูล
- [prisma/seed.js](prisma/seed.js) — สคริปต์สร้างตัวอย่างข้อมูล
- [lib/prisma.js](lib/prisma.js) — helper สำหรับ Prisma client
- [pages/api/households/index.js](pages/api/households/index.js) — รายการและสร้างครัวเรือน
- [pages/api/households/[id].js](pages/api/households/%5Bid%5D.js) — อ่าน/แก้ไข/ลบครัวเรือน
- [pages/api/readings/index.js](pages/api/readings/index.js) — อ่านและเพิ่ม readings
- [pages/api/reports/consumption.js](pages/api/reports/consumption.js) — รายงานปริมาณรวม

ตัวอย่างการใช้งาน API (cURL)

- สร้างครัวเรือน

```bash
curl -X POST http://localhost:3000/api/households \
	-H "Content-Type: application/json" \
	-d '{"name":"บ้านโชคดี","address":"หมู่ 1"}'
```

- ดึงรายการ readings ของครัวเรือนระหว่างวันที่

```bash
curl "http://localhost:3000/api/readings?householdId=1&start=2026-01-01&end=2026-12-31"
```

- รายงานการใช้น้ำรวม

```bash
curl "http://localhost:3000/api/reports/consumption?householdId=1&start=2026-01-01&end=2026-12-31"
```

คำแนะนำถัดไป (ถ้าต้องการให้ต่อ)
- เพิ่มระบบ Authentication (JWT) และบทบาทผู้ใช้
- สร้าง CRUD สำหรับ `Meter` (หน้า API เพิ่มเติม)
- เพิ่ม validation ด้วย `zod` หรือ `yup` และเขียน unit tests

ถ้าต้องการ ผมช่วยต่อส่วน frontend หรือออกแบบฐานข้อมูล/ฟีเจอร์เพิ่มเติมได้เลย
