import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-arktype";
import type { SQLiteTable } from "drizzle-orm/sqlite-core";

export function crudSchema<T extends SQLiteTable>(table: T) {
  return {
    create: createInsertSchema(table),
    update: createUpdateSchema(table),
    select: createSelectSchema(table),
  };
}
