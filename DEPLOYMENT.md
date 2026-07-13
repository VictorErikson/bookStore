# Deploying BookStore

Frontend → GitHub Pages (static, free).
Backend (Strapi) → Render free tier + Neon Postgres (free) + Cloudinary (free media hosting).

Local development is unchanged: SQLite + local uploads, `npm run develop` in `backend/`, `npm run dev` in `frontend/`. None of the cloud env vars are needed locally.

---

## 1. Neon (free Postgres)

1. Create an account at https://neon.tech and create a project (e.g. `bookstore`).
2. Copy the **connection string** (looks like `postgresql://user:pass@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require`).

## 2. Cloudinary (free media hosting)

1. Create an account at https://cloudinary.com.
2. From the dashboard copy: **Cloud name**, **API Key**, **API Secret**.

## 3. Render (free web service for Strapi)

1. Create an account at https://render.com and click **New → Web Service**, connect the `VictorErikson/bookStore` GitHub repo.
2. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: Free
3. Environment variables (Environment tab). Copy the secret values from `backend/.env`:

   | Key | Value |
   |---|---|
   | `NODE_VERSION` | `22` |
   | `APP_KEYS` | (from backend/.env) |
   | `API_TOKEN_SALT` | (from backend/.env) |
   | `ADMIN_JWT_SECRET` | (from backend/.env) |
   | `TRANSFER_TOKEN_SALT` | (from backend/.env) |
   | `JWT_SECRET` | (from backend/.env) |
   | `DATABASE_CLIENT` | `postgres` |
   | `DATABASE_URL` | (Neon connection string) |
   | `DATABASE_SSL` | `true` |
   | `DATABASE_SSL_REJECT_UNAUTHORIZED` | `false` |
   | `CLOUDINARY_NAME` | (Cloudinary cloud name) |
   | `CLOUDINARY_KEY` | (Cloudinary API key) |
   | `CLOUDINARY_SECRET` | (Cloudinary API secret) |

4. Deploy. When it's live, note the URL, e.g. `https://bookstore-api.onrender.com`.
   The bootstrap in `backend/src/index.js` seeds the public rating permissions automatically on first boot.

## 4. Migrate the local data (books, images, users)

From `backend/`, export the local SQLite content, then import it into the cloud services by running the import with the cloud env vars set for that one command:

Two important things first:

Stop the running backend (npm run develop) before you start — otherwise SQLite can be locked and the export fails.
Do the export in a clean terminal first (no cloud vars set). The export reads your local SQLite; the cloud vars are only for the import. If cloud vars are set during export, it'd try to export from the empty Neon DB instead.
Step 1 — export local data (clean terminal, from backend/)

npm run strapi export -- --no-encrypt -f ../bookstore-export
This creates bookstore-export.tar.gz in the repo root.

Step 2 — import into Neon + Cloudinary
Set the cloud vars for this session, then import:


$env:DATABASE_CLIENT="postgres"
$env:DATABASE_URL="<neon connection string>"
$env:DATABASE_SSL="true"
$env:DATABASE_SSL_REJECT_UNAUTHORIZED="false"
$env:CLOUDINARY_NAME="<name>"
$env:CLOUDINARY_KEY="<key>"
$env:CLOUDINARY_SECRET="<secret>"

npm run strapi import -- -f ../bookstore-export.tar.gz --force

This pushes all content to Neon and uploads all media to Cloudinary. 

Afterwards, log into `https://<render-url>/admin` with your existing admin account.

## 5. GitHub Pages (frontend)

1. Repo → **Settings → Pages → Source: GitHub Actions**.
2. Repo → **Settings → Secrets and variables → Actions → Variables** → add:
   - `VITE_API_URL` = `https://<your-render-url>.onrender.com` (no trailing slash)
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds `frontend/` and deploys it.
4. Site goes live at `https://victorerikson.github.io/bookStore/`.

## 6. Keep the server awake (avoid cold starts)

Render free services sleep after ~15 min idle. Two remedies:

- **UptimeRobot** (free): add an HTTP monitor for `https://<render-url>/_health` at a 5-minute interval. Render's 750 free instance-hours/month cover one always-on service.
- **Resume page pre-wake**: if your resume/portfolio is a webpage, add this so the server wakes while the visitor is still reading:

```html
<script>
  fetch("https://<your-render-url>.onrender.com/_health", { mode: "no-cors" });
</script>
```

The frontend also shows a "waking up the server" notice if the API takes more than a couple of seconds to respond.

## Notes

- CORS: Strapi's default allows all origins, so the Pages site can call the API without extra config.
- The `saleBackground.webp` and all `public/assets` images ship with the frontend bundle; only book covers and carousel images come from Cloudinary.
- Free-tier caveats: Neon's free project suspends compute after inactivity (wakes in ~1s, negligible); Render cold starts take ~30-60s without the pinger.
