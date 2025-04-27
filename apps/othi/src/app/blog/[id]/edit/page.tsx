import { EditorProvider } from "@/components/editor/EditorProvider";
import { isSuperAdmin } from "@repo/auth";
import type { Params } from "@repo/lib";
import { caller } from "@repo/protocol/trpc/server";
import { Info, MoveLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BlogForm } from "../_provider/BlogForm";
import { BlogFormProvider } from "../_provider/BlogFormProvider";
import { EditorSubmitButton } from "../_provider/EditorSubmitButton";

export default async function Page({ params }: Params) {
  const isSudo = await isSuperAdmin({
    sessionFn: getServerSession,
  });
  if (!isSudo) return redirect("/blog");

  const id = params?.id as string;
  const data = await caller.blog.byId({ id, tags: true });

  if (!data) return "not found";

  const { meta, contentHtml } = data;

  // flatten the tags, we don't need the labels
  const tags = "tags" in meta ? meta.tags.map((e) => e.code) : undefined;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Link
          className="flex items-center gap-2 text-muted-foreground hover:underline"
          href="/blog"
        >
          <MoveLeft className="h-4 w-4" />
          Blog
        </Link>
        <span className="inline-flex items-center gap-1 text-muted-foreground text-sm">
          <Info className="h-4 w-4" />
          Open help menu with Ctrl + /
        </span>
      </div>

      <BlogFormProvider defaultValue={{ ...meta, tags }} id={id} mode="update">
        <BlogForm />

        <EditorProvider content={contentHtml}>
          <EditorSubmitButton mode="update" />
        </EditorProvider>
      </BlogFormProvider>
    </div>
  );
}
