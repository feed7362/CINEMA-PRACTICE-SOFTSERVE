# ⚙️ Cinema Backend — ASP.NET Core (Minimal API)

Backend service for the cinema booking platform. Provides REST endpoints for authentication, movies/sessions, bookings & tickets, admin analytics, and logging.

## Tech Stack

- **Framework:** ASP.NET Core (.NET 10)
- **API style:** Minimal API
- **Database:** PostgreSQL
- **ORM:** Entity Framework Core
- **Auth:** ASP.NET Core Identity + JWT Bearer
- **Validation:** FluentValidation (endpoint filter)
- **Mapping:** AutoMapper
- **Payments:** Stripe (Stripe.net)
- **External auth:** Google ID token validation (Google.Apis.Auth)

## Solution structure

- `Backend.API/` — Minimal API host, endpoint mapping, middleware, Swagger, DI
- `Backend.Services/` — Business logic, DTOs, validators, background workers
- `Backend.Data/` — EF Core `DbContext`, migrations, repositories, seeding
- `Backend.Domain/` — Entities, enums, interfaces, domain exceptions
- `docker-compose.yml` — local PostgreSQL

## Key features (backend)

- **Seat locking**: booking lock for ~15 minutes + background worker to expire pending bookings.
- **Audit log**: DB change tracking (create/update/delete) persisted to `AuditLogs` (JSONB payload).
- **Error log**: centralized exception middleware logs unexpected errors (and selective 404s) to `ErrorLogs`.
- **Admin analytics**: revenue, occupancy %, popular movies, hall heatmap.
- **Recommendations**: records movie page views and returns personalized recommendations for signed-in users.

## Quick start (Development)

### 1) Start PostgreSQL (Docker)
From `backend/`:
shell docker compose up -d
PostgreSQL will be available on `localhost:5432`.

### 2) Configure secrets (recommended)
This project uses `UserSecretsId` in `Backend.API`, so configure secrets via user-secrets:
shell cd Backend.API dotnet user-secrets set "Jwt:Key" "<JWT_SIGNING_KEY>" dotnet user-secrets set "Google:ClientId" "<GOOGLE_CLIENT_ID>" dotnet user-secrets set "Stripe:SecretKey" "<STRIPE_SECRET_KEY>"
Notes:
- Never commit real keys. Use placeholders in documentation.
- `Jwt:Issuer` and `Jwt:Audience` are read from configuration as well (see `appsettings.Development.json`).

### 3) Run the API
From `backend/`:
shell dotnet run --project Backend.API
Default dev URLs (see `launchSettings.json`):
- `http://localhost:5122`
- `https://localhost:7124`

### 4) Database migrations + seed
In **Development**, the app automatically:
- applies pending EF Core migrations
- seeds initial data (roles, users, studios, genres, movies, halls/seats, sessions/prices, discounts, initial bookings)

This runs on startup in Development only.

## Swagger / OpenAPI

In Development, OpenAPI is enabled.

- Swagger JSON: `GET /swagger/v1/swagger.json` (route pattern uses `{documentName}`)
- Swagger UI: available when running in Development (served by `UseSwaggerUI()`)

If you don’t see Swagger UI, confirm you’re running with:
- `ASPNETCORE_ENVIRONMENT=Development`

## Authentication & roles

- **JWT Bearer** auth is used for secured endpoints.
- Roles:
  - `Admin`
  - `Customer`

### Seeded demo accounts (Development)
The database seeder creates demo users in Development. Use this for local testing only.

- Admin user: `admin@cinema.ua` (password is set in the seeder)
- Several demo customers are also created (passwords are set in the seeder)

If you change demo credentials, update the seeder accordingly.

## API overview (high level)

Base prefix is `/api`.

### Auth (`/api/auth`)
- `POST /login` — email/password login, returns `{ token, email, roles }`
- `POST /register` — register user (assigned `Customer` role)
- `POST /external-login` — Google ID token login, returns JWT
- `GET /me` — returns current user info (auth required)

### Movies (`/api/movie`)
- `GET /` — list movies (supports filtering/paging via query)
- `GET /{id}` — movie details; optional `recordView=true` to record view for recommendations
- `GET /me/recommendations` — personalized recommendations (auth required)
- `POST/PUT/DELETE` — admin-only management

### Sessions (`/api/session`)
- `GET /` — list sessions
- `GET /{id}` — session details
- `GET /{id}/seats` — seat availability/reservation status for a session
- `POST/PUT/DELETE` — admin-only management

### Booking (`/api/booking`) (auth required)
- `POST /lock` — locks seats for a short period (concurrency-protected)
- `POST /confirm` — confirms booking after successful payment
- `POST /{id}/apply-promo` — applies promo code to pending booking
- `POST /refund/{id}` — refunds a booking
- `GET /` — current user booking history (paged)
- `GET /{id}` and `/details` — booking info/details

### Admin analytics (`/api/admin/stats`) (Admin role)
- revenue, occupancy, discounted tickets count, popular movies, hall heatmap

### Admin logs (`/api/admin/logs`) (Admin role)
- audit logs (paged, optional email filter)
- error logs (paged, optional email/path filter)
- error log detail by id

### Misc
- `GET /api/genre` — list genres
- `GET /api/studio` — list studios (supports filtering/paging via query)
- `POST /api/contact` — submit contact message

## Troubleshooting

- **401/403 errors:** ensure you pass `Authorization: Bearer <JWT>` and your user has the required role.
- **CORS errors in browser:** confirm frontend origin is listed in `AllowedOrigins` (Development), and that preflight requests are allowed by the CORS policy.
- **Database not found / connection refused:** ensure Docker is running and `docker compose ps` shows the `db` container healthy.
- **Stripe failures:** verify `Stripe:SecretKey` is set via user-secrets/config for Development.

---