import { getDb, hasDatabase } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

/** Liveness/DB check for Node deployments (used by `npm start`, containers, uptime bots). */
export async function GET() {
  if (!hasDatabase) {
    return Response.json({ ok: true, database: "not configured — running on the bundled demo catalog" });
  }
  try {
    await getDb()?.execute(sql`select 1`);
    return Response.json({ ok: true, database: "connected" });
  } catch {
    return Response.json({ ok: false, database: "unreachable" }, { status: 500 });
  }
}
