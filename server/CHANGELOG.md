# Changelog

All notable changes to the **KabsuPanion API** (backend) are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project aims to follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

_Phase 1 work will land here: full schema, JWT auth, users/admins/students/masterlist,
subjects/schedule/notes/announcements, Cloudinary, and the remaining routes._

## [0.0.0] — 2026-06-13

Phase 0 "walking skeleton": one thin vertical slice working end-to-end and deployed.

### Added

- Cloudflare Workers project scaffolding with **wrangler** (`wrangler.toml`, `name = kabsupanion-api`).
- **Hono** app (`src/index.ts`) with a typed `Env` interface (`DATABASE_URL`, placeholder `JWT_SECRET`).
- CORS allowing `http://localhost:5173` and a placeholder Vercel origin; methods `GET, POST, PATCH, DELETE`.
- Routes:
  - `GET /health` → `{ ok: true }`.
  - `GET /tasks` → list all tasks, ordered by `createdAt` desc.
  - `POST /tasks` → create a task from `{ title, description?, dueDate? }`; returns `201`,
    or `400` when `title` is missing/empty or the JSON body is invalid.
- **Drizzle** schema (`src/db/schema.ts`) with a minimal `tasks` table
  (`id`, `title`, `description`, `dueDate`, `createdAt`, `updatedAt`).
- Per-request DB client (`src/db/client.ts`) using the **Neon HTTP driver**
  (`@neondatabase/serverless` + `drizzle-orm/neon-http`).
- `drizzle.config.ts` (current `defineConfig` shape, `dialect: "postgresql"`), loading `.env` via `dotenv`.
- Initial generated migration in `drizzle/` and applied to Neon (`tasks` table created).
- npm scripts: `dev`, `deploy`, `db:generate`, `db:migrate`.
- Committed env templates (`.dev.vars.example`, `.env.example`) and `.gitignore`.
- README with setup, manual steps, and Phase 1 scope note.

### Notes

- Verified end-to-end: migrations applied to Neon, local create/list loop works and persists
  across restarts, and the deployed `*.workers.dev` URL passes the same checks.
- wrangler pinned to **v4** during setup (devDependency bump; no source changes required).
