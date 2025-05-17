"use client";

import {
  QueryClient,
  type QueryClientConfig,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCContext as shinyNewTRPCQuery } from "@trpc/tanstack-react-query";
import type { AppRouter } from "..";
import { transformer } from "./transformer";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  shinyNewTRPCQuery<AppRouter>();

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const TANSTACK_OPTIONS = (
  conf?: QueryClientConfig,
): QueryClientConfig => ({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
      ...conf?.defaultOptions?.queries,
    },
    mutations: {
      ...conf?.defaultOptions?.mutations,
    },
    dehydrate: {
      serializeData: transformer.serialize,
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      ...conf?.defaultOptions?.dehydrate,
    },
    hydrate: {
      deserializeData: transformer.deserialize,
      ...conf?.defaultOptions?.hydrate,
    },
    ...conf?.defaultOptions,
  },
  ...conf?.mutationCache,
  ...conf?.queryCache,
});

export const createQueryClient = (conf?: QueryClientConfig) =>
  new QueryClient(TANSTACK_OPTIONS(conf));
