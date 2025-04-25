import { createEnv } from "@t3-oss/env-nextjs";
import { authEnv } from "./auth";
import { debugEnv } from "./debug";
import { hostsEnv } from "./hosts";
import { storageEnv } from "./storage";

export const env = createEnv({
  server: {},
  client: {},
  experimental__runtimeEnv: process.env,
  extends: [authEnv, storageEnv, hostsEnv, debugEnv],
});
