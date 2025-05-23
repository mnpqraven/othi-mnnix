"use client";

import { editorTempBlogIdAtom } from "@/components/editor/store";
import { Button } from "@repo/ui/primitive/button";
import { useCurrentEditor } from "@tiptap/react";
import { useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useBlogForm } from "./BlogFormProvider";

interface Prop {
  mode: "create" | "update";
}
export function EditorSubmitButton({ mode }: Prop) {
  const { form, blogId, update, create, isPending } = useBlogForm();
  const { editor } = useCurrentEditor();
  const nameSubscriber = form.watch("title");
  const disabled = editor?.isEmpty || !nameSubscriber.length;
  const tempBlogId = useAtomValue(editorTempBlogIdAtom);

  async function onUpdate() {
    const valid = await form.trigger();

    if (editor && valid && blogId) {
      await form.handleSubmit(({ title, ...rest }) => {
        update({
          ...rest,
          htmlString: editor.getHTML(),
          blogId,
          title,
        });
      })();
    }
  }

  async function onCreate() {
    const valid = await form.trigger();

    if (editor && valid && tempBlogId) {
      await form.handleSubmit(({ title, ...rest }) => {
        create({
          tempBlogId,
          htmlString: editor.getHTML(),
          title,
          tags: rest.tags,
        });
      })();
    }
  }

  if (!editor) return null;

  if (mode === "update")
    return (
      <Button
        className="sticky bottom-0 items-center gap-1"
        disabled={disabled || isPending}
        onClick={onUpdate}
        type="button"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Update
      </Button>
    );

  return (
    <Button
      className="items-center gap-1"
      disabled={disabled || isPending}
      onClick={onCreate}
      type="button"
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Create
    </Button>
  );
}
