import { Navbar } from "@/components/Navbar";
import { getThemeServerFn } from "@/lib/theme";
import { ProviderDOM } from "@/providers";
import { useTheme } from "@/providers/theme";
import {
  DefaultGlobalNotFound,
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles/app.css?url";

export async function rootLoader() {
  const theme = await getThemeServerFn();
  return { theme };
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TanStack Start Starter" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: DefaultGlobalNotFound,
  loader: rootLoader,
});

function RootComponent() {
  const loaded = Route.useLoaderData();
  return (
    <ProviderDOM loaded={loaded}>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ProviderDOM>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { theme } = useTheme();
  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        <Navbar />
        <main className="flex flex-col">{children}</main>
        <Scripts />
      </body>
    </html>
  );
}
