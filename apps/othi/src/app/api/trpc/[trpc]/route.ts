import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import {
  appRouter,
  createTRPCContext,
  fetchRequestHandler,
} from "@repo/protocol/trpc";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      createTRPCContext({
        headers: req.headers,
        cookies,
      }),
  });

export { handler as GET, handler as POST };
