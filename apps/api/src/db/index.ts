import { drizzle } from "drizzle-orm/neon-http";
import type { TContext } from "$routers/index.js";

function createDB(c: TContext) {
  const dbUrl = c.env.DB_URL;

  return connectDB(dbUrl);
}

function connectDB(dbUrl: string) {
  return drizzle(dbUrl);
}

type TDB = ReturnType<typeof connectDB>;

export { createDB, type TDB };
