"use client";

import { cn } from "@repo/lib";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HTMLAttributes } from "react";
import { useViewportInfo } from "./AppListener/hook";
import { LoggedAvatar } from "./LoggedAvatar";

const HEADER_HEIGHT = 64; // in px

const adminRoutes = ["/sudo", "/whoami"];

export function Navbar({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { isScrolled } = useViewportInfo();
  const path = usePathname();
  const truncatedPath = `/${path.split("/").at(1) ?? ""}`;
  const { status } = useSession();

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
        <span>{truncatedPath.toUpperCase()}</span>
        {(status === "authenticated" ? adminRoutes : ["/blog"]).map((route) => (
          <Link href={route} key={route}>
            {route.toUpperCase()}
          </Link>
        ))}
      </div>

      {status === "authenticated" ? <LoggedAvatar /> : null}
    </div>
  );
}
