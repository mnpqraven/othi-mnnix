import { db } from "@repo/database";
import { createServerFn } from "@tanstack/react-start";
import { blogTags } from "@repo/database/schema";
import { type } from "arktype";
import { eq } from "drizzle-orm";

// TODO: integrate with
export const BlogTagSchema = type({
  id: "string",
  code: "0<string<256",
  label: "0<string<256",
});
export type BlogTagSchema = typeof BlogTagSchema.infer;

export const blogTagList = createServerFn({ method: "GET" }).handler(
  async () => {
    // TODO: params
    return db.query.blogTags.findMany();
  },
);

export const blogTagCreate = createServerFn({ method: "POST" })
  .validator(BlogTagSchema.omit("id"))
  .handler(async ({ data }) => {
    await db.insert(blogTags).values(data);
  });

export const blogTagDelete = createServerFn({ method: "POST" })
  .validator(BlogTagSchema.pick("id"))
  .handler(async ({ data }) => {
    await db.delete(blogTags).where(eq(blogTags.id, data.id));
  });

export const blogTagUpdate = createServerFn({ method: "POST" })
  .validator(BlogTagSchema)
  .handler(async ({ data }) => {
    await db.update(blogTags).set(data).where(eq(blogTags.id, data.id));
  });
