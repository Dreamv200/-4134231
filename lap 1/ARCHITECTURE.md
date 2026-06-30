# ระบบจัดการน้ำประปาหมู่บ้าน — Architecture Document

## 📐 ภาพรวมสถาปัตยกรรม

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser / Client                         │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/REST
                         │
        ┌────────────────▼──────────────────┐
        │     Frontend (Next.js 14)         │
        │  - React Components               │
        │  - Pages & Layout (App Router)    │
        │  - Client-side API Calls          │
        └────────┬──────────────────────────┘
                 │ API Calls (localhost:3000)
    ┌────────────┴───────────────┬──────────────────────────┐
    │                            │                          │
    ▼                            ▼                          ▼
┌─────────────────┐    ┌─────────────────┐    ┌──────────────────┐
│  Frontend API   │    │  Backend API    │    │   Database       │
│ (Next.js Routes)│    │ (Flask Routes)  │    │  (SQLite / PG)   │
│                 │    │                 │    │                  │
│ /api/water      │    │ /api/water      │    │  Households      │
│ /api/maintenance    │ /api/maintenance│    │  Meters          │
│ /api/history    │    │ /api/history    │    │  Readings        │
└─────────────────┘    └─────────────────┘    └──────────────────┘
                                │ (Port 5000)
```

## 🗂️ โครงสร้างโปรเจกต์ (สมบูรณ์)

```
lab1/
├── README.md                   # เอกสารหลัก
├── architecture.md             # เอกสารนี้
├── SRS.md                      # Software Requirements
├── claude.md                   # Notes for AI Assistant
├── .gitignore                  # Git ignore rules
├── .env.local                  # Environment (local)
│
├── frontend/                   # Next.js 14 App Router
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.local
│   ├── public/
│   │   └── images/
│   │
│   └── src/
│       ├── app/
│       │   ├── layout.js       # Root layout
│       │   ├── page.js         # Home page
│       │   ├── dashboard/
│       │   │   ├── layout.js   # Dashboard layout (sidebar)
│       │   │   └── page.js     # Dashboard main page
│       │   └── api/
│       │       ├── water/
│       │       │   └── route.js
│       │       ├── maintenance/
│       │       │   └── route.js
│       │       └── history/
│       │           └── route.js
│       │
│       ├── components/         # Reusable React Components
│       │   ├── Header.js
│       │   ├── WaterStatus.js
│       │   ├── MaintenanceLog.js
│       │   └── Alert.js
│       │
│       ├── lib/
│       │   ├── api-client.js   # Axios instance & API functions
│       │   ├── db.js           # DB config helper
│       │   └── constants.js    # Constants & enums
│       │
│       ├── hooks/
│       │   └── useWaterData.js # Custom React Hook
│       │
│       └── styles/
│           ├── globals.css     # Tailwind + Global styles
│           └── Home.module.css # Component-specific styles
│
└── backend/                    # Flask Backend
    ├── app.py                  # Entry point
    ├── requirements.txt        # Python dependencies
    ├── .env                    # Backend env vars
    │
    ├── routes/                 # API Routes
    │   ├── __init__.py
    │   ├── water.py            # Water endpoints
    │   ├── maintenance.py      # Maintenance endpoints
    │   └── history.py          # History endpoints
    │
    ├── models/                 # Data Models
    │   ├── __init__.py
    │   ├── water_model.py
    │   ├── maintenance_model.py
    │   └── database.py         # DB connection helper
    │
    ├── services/               # Business Logic
    │   ├── __init__.py
    │   ├── water_service.py    # Calculations & logic
    │   └── alert_service.py    # Alert detection
    │
    └── config/
        └── settings.py         # Configuration classes
```

## 🔄 Data Flow

### Create Water Reading Flow
```
User Input → Form Submission → /api/water (POST)
   ↓
Next.js API Route
   ↓
API Validation
   ↓
Backend Flask API (localhost:5000/api/water)
   ↓
Database Insertion
   ↓
Response → Frontend Update → UI Render
```

### Get Water Data Flow
```
User Navigation → Dashboard Load
   ↓
useWaterData Hook → fetchWaterData()
   ↓
/api/history (GET) with filters
   ↓
Backend Flask API
   ↓
Database Query
   ↓
Data Response → State Update → Charts/Tables
```

## 🗄️ ฐานข้อมูล

### ER Diagram
```
┌─────────────┐         ┌─────────┐         ┌──────────┐
│ Household   │─────┬──│ Meter   │────┬────│ Reading  │
├─────────────┤     │   ├─────────┤    │    ├──────────┤
│ id (PK)     │     │   │ id (PK) │    │    │ id (PK)  │
│ name        │     │   │ serial  │    │    │ meterId  │
│ address     │     │   │ household_id   │ timestamp│
│ createdAt   │     │   │ installed_at   │ volume   │
└─────────────┘     │   └─────────┘    │    └──────────┘
                    └────────────────┘
```

### Schema
```sql
CREATE TABLE households (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE meters (
    id INTEGER PRIMARY KEY,
    serial VARCHAR(255) UNIQUE NOT NULL,
    household_id INTEGER FOREIGN KEY,
    installed_at TIMESTAMP
);

CREATE TABLE readings (
    id INTEGER PRIMARY KEY,
    meter_id INTEGER FOREIGN KEY,
    timestamp TIMESTAMP DEFAULT NOW(),
    volume FLOAT NOT NULL
);
```

## 🔗 API Endpoints

### Water API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/water` | ดึงข้อมูลการใช้น้ำทั้งหมด |
| GET | `/api/water/:id` | ดึงรายละเอียดการอ่านค่า |
| POST | `/api/water` | บันทึกการอ่านค่าใหม่ |
| PUT | `/api/water/:id` | แก้ไขข้อมูล |
| DELETE | `/api/water/:id` | ลบการอ่านค่า |

### Maintenance API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/maintenance` | ดึงบันทึกการบำรุงรักษา |
| GET | `/api/maintenance/:id` | ดึงรายละเอียด |
| POST | `/api/maintenance` | สร้างบันทึกใหม่ |
| PUT | `/api/maintenance/:id` | แก้ไข |
| DELETE | `/api/maintenance/:id` | ลบ |

### History API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/history` | ดึงประวัติ |
| GET | `/api/history/:id` | ดึงรายละเอียด |
| POST | `/api/history` | สร้างบันทึก |

## 🚀 การเรียกใช้งาน

### Frontend
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
# Backend runs at http://localhost:5000
```

## 📋 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3
- **HTTP Client**: Axios
- **Language**: JavaScript

### Backend
- **Framework**: Flask 2.3
- **Database ORM**: SQLAlchemy (optional)
- **Database**: SQLite (dev) → PostgreSQL (production)
- **Language**: Python 3.9+

## 🔐 Security Considerations

- [ ] Implement JWT Authentication
- [ ] Add Role-based Access Control (RBAC)
- [ ] Validate all inputs (zod/joi)
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Log all API calls
- [ ] Hash sensitive data

## 📈 Performance Optimization

- [ ] Database indexing
- [ ] Caching strategy (Redis optional)
- [ ] Pagination for large datasets
- [ ] Lazy loading of components
- [ ] Image optimization
- [ ] API response compression

## 🧪 Testing Strategy

- [ ] Unit tests (Jest for frontend, pytest for backend)
- [ ] Integration tests
- [ ] E2E tests (Cypress/Playwright)
- [ ] Performance tests

## 📦 Deployment

- Frontend: Vercel / Netlify / Docker
- Backend: Heroku / AWS / DigitalOcean / Docker
- Database: PostgreSQL on RDS / Cloud SQL

---

**Last Updated**: 2026-07-01
