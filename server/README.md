# KabsuPanion API — Phase 0 (walking skeleton)

A deployable **Cloudflare Workers** API built with **Hono**, talking to **Neon Postgres**
through **Drizzle** (Neon HTTP driver). Phase 0 is one thin vertical slice: a `tasks`
resource plus a health check, runnable locally and deployable to Workers.

> **Phase 1 (later)** will add the full schema, JWT auth, students/admins/masterlist,
> subjects/schedule/notes/announcements, Cloudinary, and the remaining routes.
> None of that exists yet — keep changes to the `tasks` slice for now.

## Stack

- **Runtime:** Cloudflare Workers (V8 isolate, not Node) via `wrangler`
- **Framework:** Hono (TypeScript)
- **DB driver:** `@neondatabase/serverless` (HTTP) + `drizzle-orm/neon-http`
- **Migrations:** `drizzle-kit`

## Routes

| Method | Path      | Description                                                        |
| ------ | --------- | ------------------------------------------------------------------ |
| GET    | `/health` | Liveness check → `{ "ok": true }`                                  |
| GET    | `/tasks`  | List all tasks, newest first                                       |
| POST   | `/tasks`  | Create a task from `{ title, description?, dueDate? }`; `title` required |

## Status — what's up and running

**Phase 0: ✅ complete and deployed.**

| Capability | Status | Notes |
| ---------- | ------ | ----- |
| `GET /health` | ✅ live | Returns `{ "ok": true }`; no DB access. |
| `GET /tasks` | ✅ live | Lists tasks newest-first from Neon. |
| `POST /tasks` | ✅ live | Creates a task; `400` on missing/empty `title` or invalid JSON. |
| Neon `tasks` table | ✅ migrated | Created via `npm run db:migrate`; data persists. |
| Local dev (`wrangler dev`) | ✅ verified | Full create/list loop confirmed locally. |
| Production (`wrangler deploy`) | ✅ deployed | Live `*.workers.dev` URL passes all checks. |
| Auth / JWT | 🔲 Phase 1 | `JWT_SECRET` is a placeholder; no auth yet. |
| Other tables & routes | 🔲 Phase 1 | users/admins, subjects, schedule, notes, announcements, Cloudinary. |

See [CHANGELOG.md](./CHANGELOG.md) for the release summary and [CHANGES.md](./CHANGES.md)
for the development journal.

## Why `DATABASE_URL` is configured in two places

This is the #1 thing that breaks Drizzle-on-Workers setups:

- **The Worker runtime** reads it from `.dev.vars` (local) and from a Wrangler secret
  (production). It is **never** in `wrangler.toml`.
- **`drizzle-kit`** runs in Node on your machine (not on Workers), so it reads a normal
  `.env`. `drizzle.config.ts` loads it via `import "dotenv/config"`.

So the same connection string goes into `.dev.vars`, `.env`, **and** a production secret.

---

## Manual steps you must do yourself

### 1. Create a Neon project and copy the POOLED connection string

In the [Neon console](https://console.neon.tech), create a project, then copy the
connection string that contains **`-pooler`** in the host (e.g.
`...@ep-xxxx-pooler.us-east-2.aws.neon.tech/...`). Keep `?sslmode=require`.

### 2. Paste it into all three places

```bash
cd server
cp .dev.vars.example .dev.vars   # for `wrangler dev`  — also add JWT_SECRET
cp .env.example .env             # for drizzle-kit migrations
# Edit both files, paste the pooled URL into DATABASE_URL.
```

For production (after you've logged in with `npx wrangler login`):

```bash
npx wrangler secret put DATABASE_URL
# paste the same pooled URL when prompted
```

### 3. Local run-and-test sequence

```bash
cd server
npm install

# Create the tasks table in Neon
npm run db:generate   # already generated once; re-run only if schema changes
npm run db:migrate    # applies migrations to your Neon DB

# Start the Worker locally (http://localhost:8787)
npm run dev
```

In a second terminal:

```bash
curl http://localhost:8787/health
# {"ok":true}

curl -X POST http://localhost:8787/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'
# 201 + the created row

curl http://localhost:8787/tasks
# includes the row above

curl -i -X POST http://localhost:8787/tasks \
  -H "Content-Type: application/json" \
  -d '{}'
# HTTP/1.1 400 Bad Request
```

Data persists in Neon across restarts.

### 4. Deploy and re-test against the live URL

```bash
cd server
npx wrangler login                 # one time
npx wrangler secret put DATABASE_URL   # if not already set
npm run deploy
```

Wrangler prints the deployed URL (e.g. `https://kabsupanion-api.<subdomain>.workers.dev`).
Re-run the same `curl` checks against it:

```bash
curl https://kabsupanion-api.<subdomain>.workers.dev/health
```
