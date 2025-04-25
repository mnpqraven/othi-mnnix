import { createEnv } from "@t3-oss/env-nextjs";

export const hostsEnv = createEnv({
  server: {},
  client: {},
  experimental__runtimeEnv: {},
});
