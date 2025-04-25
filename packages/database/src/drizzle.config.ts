import type { Config } from "drizzle-kit";
import { env } from "@repo/env";

export default {
  schema: "schema/*",
  out: "drizzle",
  dialect: "turso",
  dbCredentials: {
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
  verbose: true,
} satisfies Config;
