# SRS (Software Requirements Specification)
# ระบบจัดการน้ำประปาหมู่บ้าน

## 1. บทนำ

ระบบจัดการน้ำประปาหมู่บ้านเป็นแอปพลิเคชันเว็บที่ออกแบบมาเพื่อจัดการและติดตามการใช้น้ำของครัวเรือนในชุมชน โดยจัดเก็บข้อมูลการอ่านค่ามิเตอร์ บันทึกการบำรุงรักษา และให้รายงานการใช้น้ำแบบเรียลไทม์

## 2. วัตถุประสงค์

- ติดตามการใช้น้ำของแต่ละครัวเรือน
- จัดการข้อมูลมิเตอร์และการบ่อมอ่านค่า
- บันทึกและจัดการงานบำรุงรักษา
- สร้างรายงานการใช้น้ำรวมและวิเคราะห์แนวโน้ม
- แจ้งเตือนเมื่อการใช้น้ำสูงผิดปกติ

## 3. ความต้องการฟังก์ชันหลัก

### 3.1 จัดการครัวเรือน (Households)
- [ ] ดึงรายชื่อครัวเรือน (paginated)
- [ ] สร้างครัวเรือนใหม่
- [ ] แก้ไขข้อมูลครัวเรือน
- [ ] ลบครัวเรือน
- [ ] ค้นหาครัวเรือนตามชื่อ/ที่อยู่

### 3.2 จัดการมิเตอร์ (Meters)
- [ ] ดึงรายชื่อมิเตอร์ทั้งหมด
- [ ] ดึงมิเตอร์ของครัวเรือนเฉพาะ
- [ ] สร้างมิเตอร์ใหม่
- [ ] แก้ไขข้อมูลมิเตอร์
- [ ] ลบมิเตอร์

### 3.3 การอ่านค่ามิเตอร์ (Readings)
- [ ] บันทึกการอ่านค่าใหม่
- [ ] ดึงประวัติการอ่านค่า (filter by date range)
- [ ] ดึงการอ่านค่าเฉพาะมิเตอร์
- [ ] คำนวณการใช้น้ำระหว่างสองช่วงเวลา

### 3.4 บำรุงรักษา (Maintenance)
- [ ] บันทึกงานบำรุงรักษา
- [ ] ดึงประวัติการบำรุงรักษา
- [ ] เปลี่ยนสถานะงาน (pending, in-progress, completed)
- [ ] กำหนดช่วงการบำรุงรักษาเป็นระยะ

### 3.5 รายงาน (Reports)
- [ ] คำนวณการใช้น้ำรวมของครัวเรือน
- [ ] สร้างรายงานรายเดือน
- [ ] วิเคราะห์แนวโน้มการใช้น้ำ
- [ ] ส่งออกข้อมูลเป็น CSV/PDF

### 3.6 แจ้งเตือน (Alerts)
- [ ] ตรวจจับการใช้น้ำสูงผิดปกติ
- [ ] ตรวจจับสัญญาณรั่วไหล
- [ ] แจ้งเตือนสำหรับงานบำรุงรักษาที่ค้างคา

## 4. ความต้องการท่านระบบ

### 4.1 ความปลอดภัย
- JWT Authentication
- Role-based Access Control (RBAC) - Admin, Operator, User
- Encryption ของข้อมูลที่ละเอียดอ่อน
- CORS protection

### 4.2 การทำงาน
- Response time < 500ms
- Support concurrent users
- Uptime >= 99%

### 4.3 ความเข้าใจ
- Input Validation (zod, joi)
- Error Handling & Logging
- API Documentation (Swagger/OpenAPI)

## 5. ข้อมูลจำเพาะของ API

### 5.1 Water API
```
GET    /api/water              - ดึงข้อมูลการใช้น้ำทั้งหมด
GET    /api/water/:id          - ดึงรายละเอียดการอ่านค่า
POST   /api/water              - บันทึกการอ่านค่าใหม่
PUT    /api/water/:id          - แก้ไขการอ่านค่า
DELETE /api/water/:id          - ลบการอ่านค่า
```

### 5.2 Maintenance API
```
GET    /api/maintenance        - ดึงบันทึกการบำรุงรักษา
GET    /api/maintenance/:id    - ดึงรายละเอียด
POST   /api/maintenance        - สร้างบันทึกใหม่
PUT    /api/maintenance/:id    - แก้ไขบันทึก
DELETE /api/maintenance/:id    - ลบบันทึก
```

### 5.3 History API
```
GET    /api/history            - ดึงประวัติ
GET    /api/history/:id        - ดึงรายละเอียด
POST   /api/history            - สร้างบันทึกประวัติ
```

## 6. คุณสมบัติหน้าจอ (UI/UX)

### 6.1 หน้าแรก (Homepage)
- แสดงภาพรวมของระบบ
- สถิติหลัก: จำนวนครัวเรือน, มิเตอร์, การใช้น้ำรวม
- เมนูนำทาง

### 6.2 Dashboard
- กราฟแสดงการใช้น้ำเมื่อเร็ว ๆ นี้
- ข้อมูลเคล็ดสำหรับของแต่ละครัวเรือน
- กิจกรรมล่าสุด
- แจ้งเตือน

### 6.3 ฟีเจอร์เพิ่มเติม
- ค้นหาและการกรอง
- Pagination
- Responsive Design (Mobile-friendly)
- Dark mode (optional)

## 7. ข้อกำหนดของสภาพแวดล้อม

### Frontend
- Node.js >= 18
- Next.js 14
- React 18.2
- Tailwind CSS 3

### Backend
- Python >= 3.9
- Flask 2.3
- SQLite (dev) / PostgreSQL (production)

### DevOps
- Docker (optional)
- Git
- CI/CD Pipeline (GitHub Actions)

## 8. แผนการพัฒนา

### Phase 1: MVP (ตอนนี้)
- API หลัก (Water, Maintenance, History)
- UI พื้นฐาน
- Database Schema

### Phase 2: Enhancement
- Authentication & Authorization
- Input Validation
- Error Handling
- Unit Tests

### Phase 3: Production
- Database Migration (PostgreSQL)
- Performance Optimization
- Monitoring & Logging
- Deployment

## 9. ความเสี่ยงและข้อจำกัด

- ความพึ่งพาอินเทอร์เน็ต (ระบบจำเป็นต้องเชื่อมต่อ)
- ขยายตัวสำหรับจำนวนผู้ใช้มาก
- ความซับซ้อนของการแจ้งเตือนเรียลไทม์

---

**เอกสารนี้อาจได้รับการอัปเดต** เมื่อมีความเปลี่ยนแปลงหรือข้อมูลใหม่
