# Book Store — Frontend

A practice project I built to get hands-on experience with a **headless CMS (Strapi)**, **Tailwind CSS**, and a modern **React + TypeScript** stack. It's the frontend of a small book store app: it fetches books and reviews from a Strapi backend and lets users browse, favourite, rate, and review them.

The goal was less about shipping a product and more about learning — wiring a React frontend up to a CMS, managing content through Strapi's admin panel instead of hardcoding data, and styling everything with Tailwind.

## What I practised

- **Strapi (headless CMS)** — books, reviews, and users are modelled and managed in Strapi. The frontend consumes its REST API (`/api/books?populate=*`) so content can be edited without touching code.
- **Tailwind CSS** — the entire UI is styled with Tailwind utility classes (using Tailwind v4 with the Vite plugin), including a custom light/dark theme.
- **React + TypeScript** — components, hooks, and typed data models (`Book`, `User`, sorting types).
- **React Context** — a `ThemeContext` for light/dark theming and a `BookInfoContext` for sharing the currently focused book across components.
- **Data fetching with axios** — a small service layer (`fetchBooks`, `rateBook`, `updateBook`, `checkLoginStatus`) wraps calls to the Strapi API.
- **Client-side routing** — `react-router-dom` (using `HashRouter`).

## Features

- Browse books in scrollable card sections and a carousel
- Favourite / like books
- Star ratings and a reviews section
- Sorting of the book list
- Login and account creation (auth against Strapi)
- Hover info boxes for book, sale, and trending details
- Light and dark theme toggle

## Tech stack

| Area        | Tool                          |
| ----------- | ----------------------------- |
| Framework   | React 19 + TypeScript         |
| Build tool  | Vite 6                        |
| Styling     | Tailwind CSS 4                 |
| CMS/backend | Strapi (headless CMS)         |
| Data        | axios                         |
| Routing     | react-router-dom 7            |

## Getting started

This is the **frontend** only — it expects a Strapi backend running locally.

1. Start the Strapi backend. The frontend points at `http://localhost:1338` by default (see [src/config/api.ts](src/config/api.ts) to change the base URL).

2. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

3. Open the URL Vite prints (typically `http://localhost:5173`).

### Available scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server with HMR   |
| `npm run build`   | Type-check and build for production   |
| `npm run preview` | Preview the production build locally  |
| `npm run lint`    | Run ESLint                           |

## Project structure

```
src/
├── components/    # UI components (Header, Cards, Reviews, InspoPart, info boxes, logos…)
├── contexts/      # ThemeContext, bookInfoContext
├── config/        # API base URL, colors
├── pages/         # Home / logged-in home
├── services/      # API calls to Strapi (fetchBooks, rateBook, updateBook, auth…)
└── types/         # TypeScript models (book, user, sorting)
```
