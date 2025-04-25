"use client";

import { useQuery } from "@tanstack/react-query";
// TODO:
import { useTRPC } from "../../../../packages/protocol/src/trpc/react/client";

export function ClientComponent() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.greet.queryOptions());
  return <div>{JSON.stringify(data)}</div>;
}
