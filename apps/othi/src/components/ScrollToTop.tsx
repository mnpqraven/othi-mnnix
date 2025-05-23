"use client";

import { Button } from "@repo/ui/primitive/button";
import { cva } from "class-variance-authority";
import { ArrowUpToLine } from "lucide-react";
import { useViewportInfo } from "./AppListener/hook";

const style = cva(
  "rounded-full right-20 bottom-20 fixed p-4 h-auto transition-all duration-200 ease-in",
  {
    variants: {
      variant: {
        default: "invisible opacity-0",
        visible: "visible opacity-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function ScrollToTop() {
  const { isScrolled, scrollFn } = useViewportInfo();
  return (
    <Button
      className={style({ variant: isScrolled ? "visible" : "default" })}
      onClick={scrollFn}
      variant="outline"
    >
      <ArrowUpToLine />
    </Button>
  );
}
