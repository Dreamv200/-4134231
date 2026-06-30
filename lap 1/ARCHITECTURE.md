# ARCHITECTURE — ระบบจัดการน้ำประปาหมู่บ้าน

เอกสารนี้สรุปสถาปัตยกรรมของ backend ที่พัฒนาด้วย Next.js API routes และ Prisma (SQLite)

## ภาพรวมคอมโพเนนต์

- Next.js API Routes: รับคำขอ HTTP ทั้งหมด (REST-ish) และเป็น entry point ของ backend
- Prisma: ORM สำหรับติดต่อฐานข้อมูล SQLite (ไฟล์ `dev.db`)
- Seed script: สร้างข้อมูลตัวอย่างสำหรับพัฒนา/ทดสอบ (`prisma/seed.js`)
- lib/prisma.js: wrapper สำหรับ Prisma Client เพื่อหลีกเลี่ยงการสร้าง client ซ้ำใน development

## โครงสร้างฐานข้อมูล (ย่อ)

- Household: เก็บข้อมูลครัวเรือน (id, name, address, createdAt)
- Meter: มิเตอร์ของครัวเรือน (id, serial, householdId, installedAt)
- Reading: ค่าการอ่านมิเตอร์ (id, meterId, timestamp, volume)

ความสัมพันธ์
- Household 1 - N Meter
- Meter 1 - N Reading

## API หลัก

- `GET /api/households` — ดึงรายชื่อครัวเรือน (รวมมิเตอร์)
- `POST /api/households` — สร้างครัวเรือน
- `GET /api/households/[id]` — รายละเอียดครัวเรือน
- `PUT /api/households/[id]` — แก้ไข
- `DELETE /api/households/[id]` — ลบ

- `GET /api/readings` — ดึง readings (query: `householdId`, `start`, `end`)
- `POST /api/readings` — เพิ่ม reading (body: `meterId`, `timestamp`, `volume`)

- `GET /api/reports/consumption?householdId=...` — สรุปปริมาณน้ำรวมในช่วงเวลาที่ระบุ

## การทำงานหลัก (flow)

1. ผู้ใช้งาน/ระบบภายนอกเรียก API ของ Next.js
2. API route ตรวจสอบ input และเรียกใช้งาน `prisma` เพื่ออ่าน/เขียนข้อมูล
3. Prisma แปลงเป็นคำสั่ง SQL บันทึกในไฟล์ SQLite
4. ผลลัพธ์ถูกส่งกลับเป็น JSON

## Deployment / การรันในเครื่อง

- ใช้ SQLite สำหรับการพัฒนาและเดโม แต่สำหรับ production แนะนำให้ย้ายไปใช้ PostgreSQL/MySQL
- ตัวอย่างการรัน local:

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

## ความปลอดภัยและการขยายตัว (ข้อเสนอ)

- เพิ่ม Authentication (JWT) และ role-based access (admin, operator)
- เพิ่ม validation input (เช่น `zod`) และ error handling ให้ละเอียดขึ้น
- เปลี่ยนฐานข้อมูลเป็น RDBMS ที่รองรับ concurrent และ backup
- เพิ่ม endpoints สำหรับ `Meter` CRUD และการคำนวณ billing
- เพิ่ม unit/integration tests และ CI pipeline

## ไฟล์สำคัญในโครงการ

- `prisma/schema.prisma` — นิยามโมเดล
- `prisma/seed.js` — seed data
- `lib/prisma.js` — Prisma client wrapper
- `pages/api/*` — API routes
- `README.md` — วิธีรันและตัวอย่าง API

---

ถ้าต้องการ ผมสามารถเพิ่มแผนการย่อย (เช่น เพิ่ม API `Meter` + tests) ให้เป็นขั้นตอนต่อไปได้ทันที
