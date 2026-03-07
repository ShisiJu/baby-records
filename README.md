# baby-records

Baby growth recording system with:

- Frontend: React + Vite + TypeScript
- Backend: Elixir Phoenix (API-only) + PostgreSQL

## Project layout

- `frontend`: React app
- `backend`: Phoenix JSON API

## Prerequisites

Tool versions are defined in `.tool-versions`:

- `erlang 28.4`
- `elixir 1.19.5-otp-28`
- `nodejs 24.14.0`
- `pnpm 9.15.9`
- `postgres 18.3` (tool version), backend currently runs against system PostgreSQL 16 service

## First-time setup

### 1) Start PostgreSQL

If needed (Ubuntu/WSL):

```bash
pg_ctlcluster 16 main start
```

### 2) Setup backend

```bash
cd backend
mix setup
```

This installs dependencies and creates/migrates `backend_dev`.

### 3) Setup frontend

```bash
cd frontend
pnpm install
cp .env.example .env
```

## Run in development

Open two terminals:

### Terminal A (backend)

```bash
cd backend
mix phx.server
```

Backend URL: `http://localhost:4000`

Health check endpoint:

```bash
curl http://127.0.0.1:4000/api/health
```

### Terminal B (frontend)

```bash
cd frontend
pnpm dev
```

Frontend URL: `http://localhost:5173`

In development, Vite proxies `/api/*` to the backend (`127.0.0.1:4000`) so the frontend can call the API without CORS setup.

## Current smoke test

Verified:

- Phoenix app boots on `127.0.0.1:4000`
- Vite app boots on `127.0.0.1:5173`
- Frontend proxy reaches backend successfully:

```bash
curl http://127.0.0.1:5173/api/health
```
