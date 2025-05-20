import type { Type } from "arktype";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-arktype";
import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";
import { crudSchema } from "../../../src/utils";

export const blogs = sqliteTable("blogs", {
  id: text("blog_id").primaryKey(),
  title: text("title", { length: 256 }).notNull(),
  fileName: text("file_name", { length: 256 }).notNull(),
  fileKey: text("file_key", { length: 256 }).notNull(),
  publish: int("publish", { mode: "boolean" }).default(false),
  mdUrl: text("md_url").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// TODO: refinements
export const BlogSchemas = crudSchema(blogs);

export type Blog = typeof blogs.$inferSelect;
export type BlogInsert = typeof blogs.$inferInsert;

export const blogTags = sqliteTable("blog_tag", {
  id: text("id").primaryKey().$defaultFn(ulid),
  code: text("code").unique().notNull(),
  label: text("label", { length: 256 }).notNull(),
  createdAt: int("created_at").$default(() => Date.now()),
  updatedAt: int("updated_at").$default(() => Date.now()),
});

const lenReq = (t: Type<string>) =>
  t.pipe(t, t.atLeastLength(4).atMostLength(256));
const refinements = {
  code: lenReq,
  label: lenReq,
};
export const BlogTagSchemas = {
  // TODO: snippets
  create: createInsertSchema(blogTags, refinements),
  update: createUpdateSchema(blogTags, refinements),
  select: createSelectSchema(blogTags),
};

export type BlogTag = typeof blogTags.$inferSelect;
