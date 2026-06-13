# Development Journal

An informal, chronological log of backend work — what happened and *why*. For the formal,
version-grouped summary see [CHANGELOG.md](./CHANGELOG.md).

---

## 2026-06-13 — Phase 0 build & deploy

**Goal:** stand up a deployable "walking skeleton" — one vertical slice (`tasks`) running
end-to-end on Cloudflare Workers + Neon Postgres, no auth or extra tables yet.

### Scaffolding
- Created the `server/` project (the React frontend stays in `../client/`).
- Chose the exact required stack: Workers (V8 isolate, not Node) + Hono + Drizzle + the
  **Neon HTTP driver**. The HTTP driver matters because Workers can't hold long-lived TCP
  connections, so the DB client is built fresh per request rather than pooled at startup.
- Wrote schema, per-request client, Hono routes, and `drizzle.config.ts` (current
  `defineConfig` shape — deliberately avoided the deprecated `driver: "pg"` form).

### Verified during build
- `tsc --noEmit` clean.
- `db:generate` produced correct SQL (`gen_random_uuid()`, `timestamptz`, NOT NULL where specified).
- `wrangler dev` boots; `/health` → `{"ok":true}`; empty-title `POST /tasks` → `400`
  (validation runs before DB access, so this was confirmable without a live DB).

### Decisions along the way
- **wrangler v3 → v4 upgrade.** Nothing in the plan depended on a specific version, but since
  this is greenfield we bumped to v4 for long-term maintainability. Verified version, lockfile
  sync, and typecheck after the bump.
- **Added a local-only `CLAUDE.md`** (git-ignored) to carry project context across sessions.

### Bringing the database online
- User created a Neon project and supplied the **pooled** connection string.
- Reinforced the "three places" rule for `DATABASE_URL`: `.env` (drizzle-kit), `.dev.vars`
  (local Worker), and `wrangler secret put` (production) — same string in all three.
- `npm run db:migrate` succeeded → `tasks` table created in Neon.

### Gotchas hit (and fixed)
- **`wrangler secret put` "missing worker name":** caused by running it from the repo root;
  wrangler reads `wrangler.toml` from the current directory, so commands must run from `server/`.
- **`POST /tasks` returned 400 with valid-looking input:** PowerShell quoting. Bash-style
  backslash-escaped JSON (`-d '{\"title\":\"x\"}'`) is sent literally by PowerShell, producing
  invalid JSON. Fix: single-quoted JSON with no backslashes via `curl.exe`, or `Invoke-RestMethod`.

### Result
- Local create/list loop works; data persists in Neon across `wrangler dev` restarts.
- `npm run deploy` published to Workers; the live `*.workers.dev` URL passes `/health`,
  `POST /tasks`, `GET /tasks`, and the `400` check. **Phase 0 complete.**
