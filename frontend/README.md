# Cinema Frontend — React

A high-performance, responsive user interface built with **React** and **Vite**, designed for an optimal ticket-buying experience.

---

## Tech Stack

- **UI Library:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **API Layer:** Axios
- **State Management:** Context API, React Hooks

---

## Key Features

- **Interactive Cinema Hall:** Dynamic SVG/Canvas-based seat selector reflecting real-time availability.
- **Admin Dashboard:** Visualization of sales data, occupancy rates, and movie performance.
- **Personalized Experience:** “For You” section powered by the backend recommendation engine.
- **Payment Flow:** Stripe Elements integration for secure, PCI-compliant payments.

---

## Folder Structure

High-level overview of the frontend project layout:

```text
frontend/
├─ .storybook/            # Storybook configuration (component docs & UI dev)
├─ src/
│  ├─ api/                # API clients (Axios setup + feature APIs)
│  ├─ assets/             # Static assets (icons, images)
│  ├─ components/         # Reusable UI components
│  ├─ constants/          # Application constants
│  ├─ context/            # React Context providers (e.g. auth)
│  ├─ data/               # Local/static data
│  ├─ hooks/              # Custom React hooks
│  ├─ pages/              # Route-level pages
│  ├─ routes/             # Router configuration
│  ├─ stories/            # Storybook stories
│  ├─ types/              # TypeScript types and models
│  ├─ utils/              # Helper utilities
│  ├─ App.tsx             # App shell (layout + providers)
│  ├─ main.tsx            # Application entry point
│  └─ index.css           # Global styles (Tailwind + base styles)
├─ .env.example           # Example environment variables
├─ index.html             # Vite HTML entry
├─ vite.config.ts         # Vite configuration
└─ package.json           # Scripts and dependencies
````

---

## Environment Configuration

Create a `.env` file based on `.env.example` and configure the following variables:

```env
VITE_BACKEND_URL=http://localhost:5122/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51Lxxxxxx
VITE_CAPTCHA_SITE_KEY=6LxxxxxxAAAAAMxxxxxxxxxxbOj5a3uBi4_XOW
VITE_GOOGLE_OAUTH=256773970062-xxxxxxxxxx.apps.googleusercontent.com
```