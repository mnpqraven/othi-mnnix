import "server-only";

import { createCallerFactory, publicProcedure, router } from "./trpc";
import { othiRouter } from "./routers/othi";
import { blogUtilsRouter } from "./routers/utils/blog";
import type { RouterInputs, RouterOutputs } from "./react/client";
import { blogRouter } from "./routers/blog";

export const appRouter = router({
  utils: {
    blog: blogUtilsRouter,
  },
  blog: blogRouter,
  othi: othiRouter,
  greet: publicProcedure.query(async () => "hello world!"),
});

// NOTE: Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

export type { RouterInputs, RouterOutputs };
