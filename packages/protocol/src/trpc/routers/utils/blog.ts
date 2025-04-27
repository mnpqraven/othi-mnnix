import { db } from "@repo/database";
import { blogs, insertBlogSchema } from "@repo/database/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { utapi } from "../../../server/uploadthing";
import { authedProcedure, router } from "../../trpc";

export const blogUtilsRouter = router({
  update: {
    blogMeta: authedProcedure
      .input(
        insertBlogSchema.pick({
          id: true,
          mdUrl: true,
          fileName: true,
        }),
      )
      .mutation(async ({ input }) => {
        const { id: blogId, mdUrl, fileName } = input;

        // update meta entry
        const updateReq = await db
          .update(blogs)
          .set({ mdUrl, fileName })
          .where(eq(blogs.id, blogId));

        console.log("updateReq", updateReq);

        return { wip: true };
      }),
    /**
     * updates a markdown file (replace existing MD in UT with a new one)
     */
    markdownFile: authedProcedure
      .input(
        z.object({
          oldFileName: z.string(),
          markdownString: z.string(),
          tempBlogId: z.string(),
          title: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        // unix time
        const unix = new Date().getTime();
        const fileName = `${unix}.md`;
        const blob = new Blob([input.markdownString]);

        const response = await utapi.uploadFiles([new File([blob], fileName)]);

        console.log("UPLOAD RESPONSE", response);

        // if upload succeeds, delete old files
        const delResponse = await utapi.deleteFiles([input.oldFileName]);

        console.log("delResponse", delResponse);

        return response.map((e) => e.data).at(0);
      }),
  },
});
