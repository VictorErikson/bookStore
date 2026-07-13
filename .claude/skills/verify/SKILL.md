---
name: verify
description: Build, launch, and drive the BookStore app (Strapi backend + Vite frontend) to verify frontend changes end-to-end.
---

# Verify BookStore changes

## Launch

- Backend: `cd backend; npm run develop` (port 1338, SQLite at backend/.tmp/data.db — gitignored, never delete). Ready when output says "Strapi started successfully".
- Frontend: `cd frontend; npm run dev` (Vite, port 5173 or 5174 if occupied). API URL defaults to localhost:1338.
- Build check: `cd frontend; npx tsc --noEmit` and `npm run build`.

## Drive (Playwright)

Playwright is not a project dep. Install into the session scratchpad: `npm init -y; npm install playwright; npx playwright install chromium`, then drive `http://localhost:5173/` headless.

Useful selectors:
- Cards: `#card`, title `h2` inside; like button `#like`; stars `.star-rating > span` (hover a star first, then click it — click handler only exists while hovered).
- Login drawer: `[aria-label="Open login"]`, inputs `input[name=username|password|mail]`, submit `form button[type=submit]`, switch mode via `button:has-text("Create new account?")`.
- Sections: `h3:has-text("Favourites")`, `h3:has-text("Ratings")`, etc.
- Waking pill: `text=Waking up the bookstore server`. Toasts: top-center, text match.

Simulate Render cold start / failures with `context.route("http://localhost:1338/**", ...)`: abort all to test the retry pill and sessionStorage-cached reload, delay PUT/POST to observe optimistic UI, abort mutations to test rollback + error toast.

## Gotchas

- Anonymous ratings POST works (public role seeded in backend/src/index.js).
- Signup creates real users in the local DB (`verify_*`, `demo_*`) — user cleans them via Strapi admin later.
- Strapi pLevel=4 returns draft+published duplicates; UI dedupes by documentId.
- LoginMsg result modal auto-dismisses after 5s or via its Ok button.
