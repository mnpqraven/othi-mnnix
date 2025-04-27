import type { BlogTag } from "@repo/database/schema";
import { createColumnHelper } from "@tanstack/react-table";

const col = createColumnHelper<BlogTag>();

export const blogTagColumns = [
  col.accessor("code", { header: "Code" }),
  col.accessor("label", { header: "Label" }),
];
