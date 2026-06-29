import Database from "better-sqlite3";
import { mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";

// ─── Datei-Setup ─────────────────────────────────────────────────────────────

const DB_PATH = join(process.cwd(), "data", "sgf.db");

if (!existsSync(dirname(DB_PATH))) {
  mkdirSync(dirname(DB_PATH), { recursive: true });
}

let _db: Database.Database | null = null;

function db(): Database.Database {
  if (_db) return _db;
  _db = new Database(DB_PATH);
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");
  migrate(_db);
  return _db;
}

function migrate(d: Database.Database) {
  d.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      url TEXT NOT NULL,
      stripe_session_id TEXT,
      status TEXT NOT NULL,
      amount_cents INTEGER,
      text_assets_json TEXT,
      image_paths_json TEXT,
      brand_context_json TEXT,
      created_at INTEGER NOT NULL,
      paid_at INTEGER,
      ready_at INTEGER,
      download_token TEXT,
      download_expires_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS generation_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      step TEXT NOT NULL,
      status TEXT NOT NULL,
      payload TEXT,
      ts INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );

    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
    CREATE INDEX IF NOT EXISTS idx_logs_order ON generation_logs(order_id);
  `);
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "paid"
  | "generating"
  | "ready"
  | "failed";

export interface OrderRow {
  id: string;
  email: string;
  url: string;
  stripe_session_id: string | null;
  status: OrderStatus;
  amount_cents: number | null;
  text_assets_json: string | null;
  image_paths_json: string | null;
  brand_context_json: string | null;
  created_at: number;
  paid_at: number | null;
  ready_at: number | null;
  download_token: string | null;
  download_expires_at: number | null;
}

// ─── Queries ─────────────────────────────────────────────────────────────────

export function createOrder(input: {
  email: string;
  url: string;
  amountCents: number;
  textAssets: unknown;
}): string {
  const id = randomUUID();
  db()
    .prepare(
      `INSERT INTO orders (id, email, url, status, amount_cents, text_assets_json, created_at)
       VALUES (?, ?, ?, 'pending', ?, ?, ?)`
    )
    .run(
      id,
      input.email,
      input.url,
      input.amountCents,
      JSON.stringify(input.textAssets),
      Date.now()
    );
  return id;
}

export function markPaid(orderId: string, stripeSessionId: string): void {
  db()
    .prepare(
      `UPDATE orders SET status = 'paid', stripe_session_id = ?, paid_at = ? WHERE id = ?`
    )
    .run(stripeSessionId, Date.now(), orderId);
}

export function markGenerating(orderId: string): void {
  db().prepare(`UPDATE orders SET status = 'generating' WHERE id = ?`).run(orderId);
}

export function markReady(
  orderId: string,
  imagePaths: string[],
  brandContext: unknown,
  downloadToken: string,
  downloadExpiresAt: number
): void {
  db()
    .prepare(
      `UPDATE orders
       SET status = 'ready',
           image_paths_json = ?,
           brand_context_json = ?,
           download_token = ?,
           download_expires_at = ?,
           ready_at = ?
       WHERE id = ?`
    )
    .run(
      JSON.stringify(imagePaths),
      JSON.stringify(brandContext),
      downloadToken,
      downloadExpiresAt,
      Date.now(),
      orderId
    );
}

export function markFailed(orderId: string): void {
  db().prepare(`UPDATE orders SET status = 'failed' WHERE id = ?`).run(orderId);
}

export function getOrder(orderId: string): OrderRow | null {
  const row = db()
    .prepare(`SELECT * FROM orders WHERE id = ?`)
    .get(orderId) as OrderRow | undefined;
  return row ?? null;
}

export function logGenerationStep(
  orderId: string,
  step: string,
  status: "ok" | "retry" | "fail",
  payload?: unknown
): void {
  db()
    .prepare(
      `INSERT INTO generation_logs (order_id, step, status, payload, ts) VALUES (?, ?, ?, ?, ?)`
    )
    .run(orderId, step, status, payload ? JSON.stringify(payload) : null, Date.now());
}
