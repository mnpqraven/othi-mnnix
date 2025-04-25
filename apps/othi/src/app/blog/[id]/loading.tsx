import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { Separator } from "@repo/ui/primitive/separator";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link
          className="flex items-center gap-2 text-muted-foreground hover:underline"
          href="/blog"
        >
          <MoveLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <span className="animate-pulse font-semibold text-2xl capitalize">
          Loading...
        </span>

        <span className="text-muted-foreground text-sm">Published at</span>
      </div>

      <Separator />
    </div>
  );
}
