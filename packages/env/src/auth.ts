import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const authEnv = createEnv({
  server: {
    NEXTAUTH_SECRET: z.string(),
    OAUTH_OTHI_GITHUB_ID: z.string(),
    OAUTH_OTHI_GITHUB_SECRET: z.string(),
    OAUTH_GITHUB_SUDO_IDENT: z.coerce.number(),
  },
  client: {},
  experimental__runtimeEnv: process.env,
});
