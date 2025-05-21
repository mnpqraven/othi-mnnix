import { LibsqlError } from "@libsql/client";
import { db } from "@repo/database";
import { BlogTagSchemas, tags } from "@repo/database/schema";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router, superAdminProcedure } from "../trpc";

export const othiRouter = router({
  testSuperAdmin: superAdminProcedure.query(() => {
    return "ok";
  }),
  blogTag: {
    list: publicProcedure.query(async () => {
      const data = await db.select().from(tags);
      return data;
    }),
    create: superAdminProcedure
      .input(BlogTagSchemas.create)
      .mutation(async ({ input }) => {
        try {
          return db.insert(tags).values(input).returning();
        } catch (e) {
          const message =
            e instanceof LibsqlError
              ? e.message
              : "undefined message, server-side debug needed";
          throw new TRPCError({ code: "FORBIDDEN", message });
        }
      }),
  },
});
