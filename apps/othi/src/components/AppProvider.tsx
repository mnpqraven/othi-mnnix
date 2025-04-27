"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { TRPCReactProvider } from "@repo/protocol/trpc/react";
import { toast } from "@repo/ui/primitive/sonner";
import { TooltipProvider } from "@repo/ui/primitive/tooltip";
import type { QueryClientConfig } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Provider } from "jotai";
import { DevTools } from "jotai-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { extractRouterConfig } from "uploadthing/server";

interface RootProps {
  children: React.ReactNode;
}

const partialConfWithToast: QueryClientConfig = {
  defaultOptions: {
    mutations: {
      onError(e) {
        toast.error(e.message);
      },
    },
  },
};

export function AppProvider({ children }: RootProps) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        <TooltipProvider delayDuration={300}>
          <TRPCReactProvider conf={partialConfWithToast}>
            <Provider>
              <NextSSRPlugin
                /**
                 * The `extractRouterConfig` will extract **only** the route configs
                 * from the router to prevent additional information from being
                 * leaked to the client. The data passed to the client is the same
                 * as if you were to fetch `/api/uploadthing` directly.
                 */
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              {children}

              <DevTools isInitialOpen={false} theme="dark" />
              <ReactQueryDevtools initialIsOpen={false} />
            </Provider>
          </TRPCReactProvider>
        </TooltipProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
