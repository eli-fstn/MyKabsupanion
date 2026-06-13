import { Hono } from "hono";
import { cors } from "hono/cors";
import { desc } from "drizzle-orm";
import { createDb } from "./db/client";
import { tasks } from "./db/schema";

export interface Env {
  DATABASE_URL: string;
  // Placeholder for Phase 1 auth — not used yet.
  JWT_SECRET: string;
}

const app = new Hono<{ Bindings: Env }>();

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      // TODO(phase-1): replace with the real deployed Vercel origin.
      "https://kabsupanion.vercel.app",
    ],
    allowMethods: ["GET", "POST", "PATCH", "DELETE"],
    allowHeaders: ["Content-Type"],
  })
);

app.get("/health", (c) => c.json({ ok: true }));

app.get("/tasks", async (c) => {
  const db = createDb(c.env.DATABASE_URL);
  const rows = await db.select().from(tasks).orderBy(desc(tasks.createdAt));
  return c.json(rows);
});

app.post("/tasks", async (c) => {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const { title, description, dueDate } = (body ?? {}) as {
    title?: unknown;
    description?: unknown;
    dueDate?: unknown;
  };

  if (typeof title !== "string" || title.trim() === "") {
    return c.json({ error: "`title` is required and must be a non-empty string" }, 400);
  }

  const db = createDb(c.env.DATABASE_URL);
  const [created] = await db
    .insert(tasks)
    .values({
      title: title.trim(),
      description: typeof description === "string" ? description : null,
      dueDate: typeof dueDate === "string" ? new Date(dueDate) : null,
    })
    .returning();

  return c.json(created, 201);
});

export default app;
