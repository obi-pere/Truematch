# Truematch Platform Scaffold

Production-ready full-stack scaffold for a commercial education agency platform.

## Stack

- Backend: Node.js, Express, Prisma, SQLite, JWT cookies, bcrypt, Zod, ws, Helmet, CORS, Rate Limiting
- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form + Zod, Zustand, Axios

## Project Structure

- `backend/` API, auth, users, websocket, Prisma
- `frontend/` React app, routes, pages, UI components, auth store/services

## Backend Setup

1. Install dependencies:
   - `cd backend`
   - `npm install`
2. Configure env:
   - `cp .env.example .env`
   - Update secrets and origin values.
3. Run Prisma migrate:
   - `npx prisma migrate dev --name init`
4. Start backend dev server:
   - `npm run dev`

Backend runs on `http://localhost:5000`.

## Frontend Setup

1. Install dependencies:
   - `cd frontend`
   - `npm install`
2. Configure env:
   - `cp .env.example .env`
3. Start frontend dev server:
   - `npm run dev`

Frontend runs on `http://localhost:5173`.

## Build Commands

- Backend build: `cd backend && npm run build`
- Frontend build: `cd frontend && npm run build`

## Auth & Security Notes

- Access token in `httpOnly` cookie, 15 minutes.
- Refresh token in `httpOnly` cookie, 7 days.
- `POST /api/v1/auth/refresh` rotates session cookies.
- `POST /api/v1/auth/logout` clears auth cookies.
- Zod validates auth DTOs.
- Helmet, strict CORS origin, and auth route rate limits are enabled.

## WebSocket

- Endpoint: `ws://localhost:5000/ws?token=<accessToken>`
- JWT validated at connection.
- In-memory userId → socket map enables USER ↔ ADMIN private messaging base.

## Implemented UX

- Landing page with responsive hero and CTA.
- `/apply` multi-step-ready stepper flow (Step 1 account details implemented).
- Auto-login after registration, then redirect to `/dashboard`.
- `/login` for existing users.
- Protected `/dashboard` with sidebar, welcome section, placeholders for status/messages/logout.
