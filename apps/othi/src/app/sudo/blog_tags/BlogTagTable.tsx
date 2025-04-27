"use client";

import { useTable } from "@repo/lib/hooks";
import { useTRPC } from "@repo/protocol/trpc/react";
import { DataTable } from "@repo/ui/shared/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { blogTagColumns } from "./columns";

export function BlogTagTable() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.othi.blogTag.list.queryOptions());
  const tableData = useMemo(() => data ?? [], [data]);
  const { table } = useTable({
    data: tableData,
    columns: blogTagColumns,
  });

  return <DataTable table={table} />;
}
