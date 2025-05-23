import { isSuperAdmin } from "@repo/auth";
import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { ZodError } from "zod";
import { transformer } from "./react/transformer";

/**
 * some chunks are copied from t3 app
 * @see https://github.com/t3-oss/create-t3-app
 */

export interface Context {
  // this is where we put in context data e.g bearer token
  // token?: string;
  role: "public" | "authed" | "sudo";
}

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
interface ContextOpts {
  headers: Headers;
  cookies?: () => Promise<ReadonlyRequestCookies>;
}
export const createTRPCContext = async (
  opts: ContextOpts,
): Promise<ContextOpts & Context> => {
  let role: "public" | "authed" | "sudo" = "public";

  if (opts.cookies) {
    const isSudo = await isSuperAdmin({
      sessionFn: getServerSession,
    });

    if (isSudo) role = "sudo";
  }

  return {
    role,
    ...opts,
  };
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const t = initTRPC.context<Context>().create({
  transformer,
  errorFormatter: ({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;

export const publicProcedure = t.procedure;

export const authedProcedure = t.procedure.use((opts) => {
  const { ctx } = opts;
  const { role } = ctx;

  if (role === "public")
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });

  // Infers the `session` as non-nullable
  return opts.next({ ctx: opts.ctx });
});

export const superAdminProcedure = t.procedure.use(async (opts) => {
  if (opts.ctx.role !== "sudo")
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });

  // Infers the `session` as non-nullable
  return opts.next({ ctx: opts.ctx });
});
