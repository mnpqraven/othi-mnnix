import "server-only";

import { publicProcedure, router, createTRPCContext } from "./trpc";
// import { othiRouter } from "./routers/othi";
// import { blogUtilsRouter } from "./routers/utils/blog";
import type { RouterInputs, RouterOutputs } from "./react/client";
// import { blogRouter } from "./routers/blog";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const appRouter = router({
  utils: {
    // blog: blogUtilsRouter,
  },
  // blog: blogRouter,
  // othi: othiRouter,
  greet: publicProcedure.query(async () => "hello world!"),
});

// NOTE: Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

export type { RouterInputs, RouterOutputs };

export { createTRPCContext, fetchRequestHandler };
