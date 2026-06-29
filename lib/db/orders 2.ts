// Stub: better-sqlite3 läuft nicht auf Vercel (native C++ module).
// Production-Build No-Op – der PMax-Builder ist nur lokal.
import { randomUUID } from "node:crypto";

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

// ─── Queries (No-Op Stubs) ────────────────────────────────────────────────────

export function createOrder(input: {
  email: string;
  url: string;
  amountCents: number;
  textAssets: unknown;
}): string {
  void input;
  return randomUUID();
}

export function markPaid(_orderId: string, _stripeSessionId: string): void {}

export function markGenerating(_orderId: string): void {}

export function markReady(
  _orderId: string,
  _imagePaths: string[],
  _brandContext: unknown,
  _downloadToken: string,
  _downloadExpiresAt: number
): void {}

export function markFailed(_orderId: string): void {}

export function getOrder(_orderId: string): OrderRow | null {
  return null;
}

export function logGenerationStep(
  _orderId: string,
  _step: string,
  _status: "ok" | "retry" | "fail",
  _payload?: unknown
): void {}
