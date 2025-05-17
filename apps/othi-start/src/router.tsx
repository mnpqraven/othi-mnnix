import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { AppProvider, queryClient } from "./providers";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "viewport",
    context: {
      queryClient,
    },
    Wrap: AppProvider,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
