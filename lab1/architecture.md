# Architecture Overview

## Components
- Frontend: React/Next.js interface for monitoring water status and maintenance activity.
- Backend: FastAPI or Flask-style service layer for business logic.
- Data layer: simple in-memory or database-backed repository abstractions.

## Request Flow
1. User opens the dashboard page.
2. Frontend requests data from API routes.
3. API route calls backend services or mock data helpers.
4. Responses are rendered in the UI.
