import { SudoGuard } from "@/components/SudoGuard";
import { cn } from "@repo/lib";
import { caller } from "@repo/protocol/trpc/server";
import { Badge } from "@repo/ui/primitive/badge";
import { Button } from "@repo/ui/primitive/button";
import { Separator } from "@repo/ui/primitive/separator";
import { format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Othi's blogs",
  description: "My personal blogs, random opinions, rants etc.",
};

export default async function Page() {
  const blogs = await caller.blog.listMeta();

  // TODO: probably better to have a server side filter
  return (
    <div className="flex flex-col gap-4">
      <SudoGuard>
        <div className="flex items-center justify-end">
          <Link href="/blog/editor">
            <Button>New</Button>
          </Link>
        </div>
      </SudoGuard>

      <div className="flex flex-col gap-4">
        {blogs.map(({ title, id, createdAt, publish }) => (
          <Link href={`/blog/${id}`} key={id}>
            <Button
              className={cn(
                "flex h-fit w-full flex-col items-start p-4",
                "md:flex-row md:items-center md:justify-between",
              )}
              variant="outline"
            >
              <span className="capitalize">{title}</span>
              <div className="flex items-center gap-2">
                {!publish ? (
                  <>
                    <Badge>Draft</Badge>
                    <Separator className="h-4" orientation="vertical" />
                  </>
                ) : null}
                <span className="text-muted-foreground">
                  {format(createdAt, "dd MMM yyyy")}
                </span>
              </div>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
