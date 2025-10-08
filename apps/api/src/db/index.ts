import { drizzle } from "drizzle-orm/neon-http";
import env from "$lib/env.js";
import type { TContext } from "$routers/index.js";

function createDB(c: TContext) {
  const dbUrl = env.get(c, "DB_URL");

  return connectDB(dbUrl);
}

function connectDB(dbUrl: string) {
  return drizzle(dbUrl);
}

type TDB = ReturnType<typeof connectDB>;

export { createDB, type TDB };
