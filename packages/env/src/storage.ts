import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const storageEnv = createEnv({
  server: {
    DB_URL: z.string(),
    UPLOADTHING_TOKEN: z.string(),
  },
  client: {},
  experimental__runtimeEnv: {},
});
