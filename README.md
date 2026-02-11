# CINEMA_SOFTSERVE — Cinema Booking System

A full-stack cinema booking and management platform built as part of **SoftServe Practice for Students**.  
It includes a **backend API** (ASP.NET Core) and a **frontend SPA** (React + Vite), with a PostgreSQL database.

---

## Repository Structure

- `backend/` — ASP.NET Core Web API + data/services layers, Docker setup
- `frontend/` — React (Vite) client application
- `.github/` — CI/CD workflows

---

## Tech Stack

**Backend**
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- Docker Compose (local infrastructure)

**Frontend**
- React + Vite
- TypeScript
- Tailwind CSS
- Axios
- Storybook (UI development)
- Vitest / Playwright (testing)

---

## Prerequisites

Install the following tools:

- **.NET SDK** (matching the backend target framework)
- **npm**
- **Docker Desktop** (for PostgreSQL via compose)
- **Git** to clone the repo

---

## Quick Start (Recommended)

### 1) Clone the repository

```shell script
git clone https://github.com/feed7362/CINEMA-PRACTICE-SOFTSERVE
cd CINEMA-PRACTICE-SOFTSERVE
```


---

## Backend Setup

### 2) Start PostgreSQL (Docker)

From the `backend/` folder:

```shell script
cd backend
docker compose -p softserve_practice -f ./docker-compose.yml up -d --build
```


### 3) Configure secrets (development)

From `backend/Backend.API`:

```shell script
cd Backend.API
dotnet user-secrets set "Google:ClientId" "<GOOGLE_CLIENT_ID>"
dotnet user-secrets set "Jwt:Key" "<JWT_SIGNING_KEY>"
dotnet user-secrets set "Stripe:SecretKey" "<STRIPE_SECRET_KEY>"
```


> Use placeholders like above—never commit real keys to the repository.

### 4) Apply database migrations

From `backend/` (or adjust paths if you run commands elsewhere):

```shell script
dotnet ef database update --project Backend.Data --startup-project Backend.API
```


### 5) Run the backend API

```shell script
dotnet run --project Backend.API
```


The API will start on the configured URL(s) shown in the console output.

---

## Frontend Setup

### 6) Configure environment variables

From `frontend/`, copy the example env file and update values:

```shell script
cd frontend
copy .env.example .env
```


Edit `.env` and set (example):

```
VITE_BACKEND_URL=http://localhost:<BACKEND_PORT>/api
VITE_STRIPE_PUBLISHABLE_KEY=<STRIPE_PUBLISHABLE_KEY>
VITE_CAPTCHA_SITE_KEY=<CAPTCHA_SITE_KEY>
VITE_GOOGLE_OAUTH=<GOOGLE_OAUTH_CLIENT_ID>
```


### 7) Install dependencies and run

```shell script
npm install
npm run dev
```


Open the printed local URL (usually `http://localhost:5173`).

---

## Common Scripts (Frontend)

From `frontend/`:

```shell script
npm run dev
npm run build
npm run preview
npm run lint
```


(Available scripts may vary—see `frontend/package.json`.)

---

## Documentation

- Backend docs: see `backend/README.md`
- Frontend docs: see `frontend/README.md`

---

## License

This project is licensed under the **MIT License**. See `LICENSE` for details.

---

## Troubleshooting

- **Database connection issues:** ensure Docker is running and the compose services are up (`docker compose ps`).
- **CORS / API URL issues:** verify `VITE_BACKEND_URL` matches the backend address and includes `/api` if your routes are prefixed.
- **Migrations fail:** make sure EF tools are available and the DB container is reachable; re-check connection string configuration.
