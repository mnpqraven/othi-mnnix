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

export const BlogSchemas = crudSchema(blogs);

export type Blog = typeof blogs.$inferSelect;
export type BlogInsert = typeof blogs.$inferInsert;

export const blogTags = sqliteTable("blog_tag", {
  id: text("id").primaryKey().$defaultFn(ulid),
  code: text("code").unique().notNull(),
  label: text("label", { length: 256 }).notNull(),
});

export const BlogTagSchemas = crudSchema(blogTags);

export type BlogTag = typeof blogTags.$inferSelect;
