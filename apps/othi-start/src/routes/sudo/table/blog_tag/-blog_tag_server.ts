import { LibsqlError } from "@libsql/client";
import { db } from "@repo/database";
import { BlogTagSchemas, blogTags } from "@repo/database/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

export const blogTagList = createServerFn({ method: "GET" }).handler(
  async () => {
    // TODO: params
    return db.query.blogTags.findMany();
  },
);

export const blogTagCreate = createServerFn({ method: "POST" })
  .validator(BlogTagSchemas.create)
  .handler(async ({ data }) => {
    try {
      await db.insert(blogTags).values(data);
    } catch (e) {
      // TODO: libsql handling

      console.log("from server", e instanceof LibsqlError);
      if (e instanceof LibsqlError) {
        // TODO: own handler
        // SQLITE_CONSTRAINT
        console.log("inner", e);
        console.log("inner", e.code);
        console.log("inner", e.cause);
      }
      throw e;
    }
  });

export const blogTagDelete = createServerFn({ method: "POST" })
  .validator(BlogTagSchemas.select.pick("id"))
  .handler(async ({ data }) => {
    await db.delete(blogTags).where(eq(blogTags.id, data.id));
  });

export const blogTagUpdate = createServerFn({ method: "POST" })
  // FIXME: id being optional is still valid here
  // should have required id
  .validator(BlogTagSchemas.update)
  .handler(async ({ data }) => {
    await db
      .update(blogTags)
      .set(data)
      .where(eq(blogTags.id, data.id ?? ""));
  });

export const blogTagCRUD = {
  list: blogTagList,
  create: blogTagCreate,
  update: blogTagUpdate,
  delete: blogTagDelete,
};
