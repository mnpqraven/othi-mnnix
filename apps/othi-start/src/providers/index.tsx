import { TANSTACK_OPTIONS } from "@repo/protocol/trpc/react";
import { TooltipProvider } from "@repo/ui/primitive/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import type { ReactNode } from "react";

export const queryClient = new QueryClient(TANSTACK_OPTIONS());

export function AppProvider({ children }: { children: Readonly<ReactNode> }) {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}
