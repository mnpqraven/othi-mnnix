// scaffolding from create t3 app
"use client";

import {
  type QueryClient,
  type QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  createTRPCClient,
  httpBatchStreamLink,
  loggerLink,
} from "@trpc/client";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import type { AppRouter } from "..";
import {
  TRPCProvider,
  createQueryClient,
  useTRPC,
  TANSTACK_OPTIONS,
} from "./client";
import { transformer } from "./transformer";

export { useTRPC, TANSTACK_OPTIONS };

let clientQueryClientSingleton: QueryClient | undefined = undefined;
let queryConf: QueryClientConfig | undefined = undefined;

const getQueryClient = (conf?: QueryClientConfig) => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  queryConf ??= conf;
  // Browser: use singleton pattern to keep the same query client
  // biome-ignore lint/suspicious/noAssignInExpressions: library code
  return (clientQueryClientSingleton ??= createQueryClient(queryConf));
};

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

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  conf?: QueryClientConfig;
}) {
  const queryClient = getQueryClient(props.conf);

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer,
          url: `${getBaseUrl()}/api/trpc`,
          headers: () => ({
            "x-trpc-source": "nextjs-react",
          }),
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://127.0.0.1:${process.env.PORT ?? 3001}`;
}
