# CLAUDE — Project Notes for AI Assistant

ไฟล์นี้เป็นบันทึกสั้น ๆ สำหรับการใช้งานผู้ช่วย (Claude/GitHub Copilot) กับโปรเจคนี้

## 📋 Context

- **Project Name**: ระบบจัดการน้ำประปาหมู่บ้าน (Village Water Management System)
- **Type**: Full-Stack Web Application
- **Frontend**: Next.js 14 (App Router) + React 18 + Tailwind CSS
- **Backend**: Flask (Python)
- **Database**: SQLite (dev) / PostgreSQL (production)
- **Status**: MVP Phase

## 🎯 Project Goals

1. Manage household water consumption tracking
2. Record meter readings and maintenance logs
3. Generate reports and alerts
4. Provide real-time dashboard

## 📂 Project Structure

```
lab1/
├── frontend/        # Next.js 14 App Router
├── backend/         # Flask API
├── README.md        # Main documentation
├── SRS.md           # Software Requirements
├── architecture.md  # System Architecture
└── claude.md        # This file
```

## 🔧 Common Tasks & Commands

### Frontend Development
```bash
cd frontend
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
python app.py        # Start server (localhost:5000)
pip install -r requirements.txt
```

### Git
```bash
git status
git add .
git commit -m "message"
git push
```

## 📝 Naming Conventions

- **Components**: PascalCase (e.g., `WaterStatus.js`)
- **Functions**: camelCase (e.g., `fetchWaterData()`)
- **Files**: kebab-case for routes, PascalCase for components
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## 🏗️ Architecture Notes

### Frontend Structure
- `src/app/` - App Router pages
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions (api-client, constants)
- `src/hooks/` - Custom React hooks
- `src/styles/` - Global CSS + Tailwind

### Backend Structure
- `routes/` - API endpoints (water, maintenance, history)
- `models/` - Data models and database
- `services/` - Business logic (calculations, alerts)
- `config/` - Configuration and settings

## 🔌 API Endpoints

### Frontend Internal Routes
- `GET /api/water` - Water data
- `GET /api/maintenance` - Maintenance logs
- `GET /api/history` - History records

### Backend Routes (localhost:5000)
- `GET /api/water` - Water API
- `GET /api/maintenance` - Maintenance API
- `GET /api/history` - History API

## 🔐 Security Checklist

- [ ] Implement JWT Authentication
- [ ] Add role-based access control
- [ ] Validate all inputs
- [ ] Use HTTPS
- [ ] Secure environment variables
- [ ] Rate limiting
- [ ] CORS configuration

## 📌 Current Status

### Completed ✅
- Project structure setup
- Frontend scaffolding (Next.js 14)
- Backend scaffolding (Flask)
- Basic API routes (mock data)
- UI components (Header, WaterStatus, Alert, etc.)
- Tailwind CSS configuration
- API client setup

### In Progress 🚧
- (Nothing yet)

### To Do 📋
1. Add JWT Authentication
2. Implement database integration (Prisma/SQLAlchemy)
3. Add input validation (Zod)
4. Write unit tests
5. Add error handling & logging
6. Create API documentation (Swagger)
7. Implement advanced features (alerts, reports)

## 💡 Tips for Using Claude/Copilot

### When asking for help, be specific:
- ✅ "Add Meter CRUD API with validation"
- ❌ "Fix the code" (too vague)

### When asking for edits:
- Mention the file path
- Specify line numbers if possible
- Example: "In `frontend/src/components/Header.js`, update the navigation links"

### When asking for new features:
- Describe the requirement clearly
- Specify which part (frontend/backend)
- Example: "Add a form to create new water readings in the frontend"

### When asking for tests:
- Mention the file to test
- Specify test framework (Jest for frontend, pytest for backend)

## 🚀 Next Steps Recommendations

1. **Phase 1 - MVP** (Current)
   - ✅ Project structure
   - [ ] Database integration
   - [ ] Basic CRUD operations
   - [ ] Authentication

2. **Phase 2 - Enhancement**
   - [ ] Input validation
   - [ ] Error handling
   - [ ] Logging system
   - [ ] Unit tests

3. **Phase 3 - Production**
   - [ ] Performance optimization
   - [ ] Deployment setup
   - [ ] Monitoring & alerts
   - [ ] Documentation

## 📞 Quick Help

**Q: How do I start both frontend and backend?**
A: Open two terminals:
- Terminal 1: `cd frontend && npm run dev`
- Terminal 2: `cd backend && python app.py`

**Q: Where do I add new API endpoints?**
A: 
- Frontend: `frontend/src/app/api/[feature]/route.js`
- Backend: `backend/routes/[feature].py`

**Q: How do I modify the database schema?**
A: Backend uses models in `backend/models/database.py`

**Q: Where are the environment variables?**
A:
- Frontend: `frontend/.env.local`
- Backend: `backend/.env`

---

**Last Updated**: 2026-07-01

### Contact
For questions about this project, refer to:
- README.md - General information
- SRS.md - Requirements
- architecture.md - Technical details
- This file - AI Assistant notes
