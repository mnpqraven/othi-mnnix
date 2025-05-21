// import { createClient } from "@libsql/client/web";
import { databaseEnv as env } from "@repo/env-agnostic";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

/** database instance
 * @usage server only */
export const db = drizzle({
  connection: {
    connectionString: env.DB_URL,
  },
  schema,
});
