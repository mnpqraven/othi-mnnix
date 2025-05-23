import { cn } from "@repo/lib";
import React from "react";

interface HtmlContentProp {
  className?: string;
  html: string;
  markdown?: boolean;
}
export function HtmlContent({
  html: contentHtml,
  className,
  markdown,
}: HtmlContentProp) {
  return (
    <div
      className={cn(className, markdown ? "markdown" : null)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled html injection env
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
