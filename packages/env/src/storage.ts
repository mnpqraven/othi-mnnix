import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const storageEnv = createEnv({
  server: {
    DB_URL: z.string(),
    DB_AUTH_TOKEN: z.string(),
    EDGE_CONFIG: z.string(),
    UPLOADTHING_TOKEN: z.string(),
  },
  client: {},
  experimental__runtimeEnv: {},
});
