import { EditorProvider } from "@/components/editor/EditorProvider";
import { Info, MoveLeft } from "lucide-react";
import Link from "next/link";
import { BlogForm } from "../[id]/_provider/BlogForm";
import { BlogFormProvider } from "../[id]/_provider/BlogFormProvider";
import { EditorSubmitButton } from "../[id]/_provider/EditorSubmitButton";

export default function Page() {
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

      <BlogFormProvider mode="create">
        <BlogForm />

        <EditorProvider>
          <EditorSubmitButton mode="create" />
        </EditorProvider>
      </BlogFormProvider>
    </div>
  );
}
