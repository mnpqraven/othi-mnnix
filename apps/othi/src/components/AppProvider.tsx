"use client";

import { ourFileRouter } from "@othi/app/api/uploadthing/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Provider } from "jotai";
import { DevTools } from "jotai-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { TRPCReactProvider } from "protocol/trpc/react";
import { transformer } from "protocol/trpc/react/transformer";
import { toast } from "ui/primitive/sonner";
import { TooltipProvider } from "ui/primitive/tooltip";
import { extractRouterConfig } from "uploadthing/server";

interface RootProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: RootProps) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        <TooltipProvider delayDuration={300}>
          <TRPCReactProvider toastFn={toast}>
            <Provider>
              <ReactQueryStreamedHydration transformer={transformer}>
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
              </ReactQueryStreamedHydration>

              <DevTools isInitialOpen={false} theme="dark" />
              <ReactQueryDevtools initialIsOpen={false} />
            </Provider>
          </TRPCReactProvider>
        </TooltipProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
