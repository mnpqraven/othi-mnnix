import { TANSTACK_OPTIONS } from "@repo/protocol/trpc/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient(TANSTACK_OPTIONS());

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "viewport",
    context: {
      queryClient,
    },
    Wrap,
  });

  return router;
}

// TODO: component
function Wrap({ children }: { children: Readonly<ReactNode> }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
