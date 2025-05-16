"use client";

import { cn } from "@repo/lib";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import { useViewportInfo } from "./AppListener/hook";
import { LoggedAvatar } from "./LoggedAvatar";

const HEADER_HEIGHT = 64; // in px

const adminRoutes = ["/", "/sudo", "/whoami"];
const normalRoutes = ["/", "/blog"];

export function Navbar({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { isScrolled } = useViewportInfo();
  const { status } = useSession();
  const routes = status === "authenticated" ? adminRoutes : normalRoutes;

  return (
    <div
      className={cn(
        "sticky top-0 z-50 flex items-center justify-between gap-2 border-b px-4 duration-1000",
        isScrolled ? "bg-background/50 backdrop-blur-md" : "bg-background",
        className,
      )}
      style={{ height: `${HEADER_HEIGHT}px` }}
      {...props}
    >
      <div className="flex gap-2 font-bold font-mono text-2xl">
        {routes.map((route) => (
          <Link href={route} key={route}>
            {route.toUpperCase()}
          </Link>
        ))}
      </div>

      {status === "authenticated" ? <LoggedAvatar /> : null}
    </div>
  );
}
