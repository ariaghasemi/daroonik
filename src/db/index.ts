import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool, type Pool as PoolType } from "pg";

/**
 * PostgreSQL is optional.
 *
 * - With `DATABASE_URL` set (local dev / a VPS or container deploy) the store reads
 *   and writes real rows: catalog, blog posts, reviews, orders and contact messages.
 * - Without it — which is how the site runs on static hosts such as Cloudflare Pages —
 *   every read falls back to the bundled demo catalog in `src/data/*` and every write
 *   is a no-op, so the whole storefront keeps working with zero infrastructure.
 */
const databaseUrl = process.env.DATABASE_URL;

export const hasDatabase = Boolean(databaseUrl);

type GlobalWithPool = typeof globalThis & { __darunikPgPool?: PoolType };

let cached: NodePgDatabase | null = null;

/** Returns a Drizzle client, or `null` when no database is configured. Never throws at import time. */
export function getDb(): NodePgDatabase | null {
  if (!hasDatabase || !databaseUrl) return null;
  if (cached) return cached;

  const scope = globalThis as GlobalWithPool;
  const pool = scope.__darunikPgPool ?? new Pool({ connectionString: databaseUrl });
  if (process.env.NODE_ENV !== "production") scope.__darunikPgPool = pool;

  cached = drizzle(pool);
  return cached;
}
