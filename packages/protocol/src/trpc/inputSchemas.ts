import { z } from "zod";

export const Pagination = z.object({
  pageIndex: z.number().default(0),
  pageCount: z.number().default(10),
});
