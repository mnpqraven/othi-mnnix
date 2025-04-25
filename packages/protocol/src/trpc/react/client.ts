"use client";

import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import {
  defaultShouldDehydrateQuery,
  QueryClient,
  type QueryClientConfig,
} from "@tanstack/react-query";
// import type { ToastFn } from "ui/primitive/sonner";
// import { toast } from "ui/primitive/sonner";
import type { AppRouter } from "..";
import { transformer } from "./transformer";
import { createTRPCContext as shinyNewTRPCQuery } from "@trpc/tanstack-react-query";

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

const TANSTACK_OPTIONS = (toastFn?: ToastFn): QueryClientConfig => ({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError(e) {
        // if (toastFn) toast.error(e.message);
      },
    },
    dehydrate: {
      serializeData: transformer.serialize,
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === "pending",
    },
    hydrate: {
      deserializeData: transformer.deserialize,
    },
  },
});

export const createQueryClient = (toastFn?: ToastFn) =>
  new QueryClient(TANSTACK_OPTIONS(toastFn));
