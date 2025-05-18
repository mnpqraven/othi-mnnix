import { databaseEnv as env } from "@repo/env-agnostic";
import type { Config } from "drizzle-kit";

export default {
  schema: "src/schema/*",
  out: "src/drizzle",
  dialect: "turso",
  dbCredentials: {
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
  verbose: true,
} satisfies Config;
