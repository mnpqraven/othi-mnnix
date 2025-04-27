import { cn } from "@repo/lib";
import { useCurrentEditor } from "@tiptap/react";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import {
  EditorBlockquote,
  EditorBold,
  EditorBulletList,
  EditorCode,
  EditorHeadingGroup,
  EditorItalic,
  EditorLink,
  EditorOrderedList,
  EditorRedo,
  EditorStrike,
  EditorUnderline,
  EditorUndo,
} from "./modifiers";

export const EditorMenubar = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function EditorMenubar({ className, ...props }, ref) {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <div
      className={cn(
        "flex gap-2 rounded-md border bg-background p-1",
        className,
      )}
      {...props}
      ref={ref}
    >
      <EditorUndo />
      <EditorRedo />
      <EditorBold />
      <EditorItalic />
      <EditorUnderline />
      <EditorStrike />
      <EditorBulletList />
      <EditorOrderedList />
      <EditorCode />
      <EditorLink />
      <EditorHeadingGroup />
      <EditorBlockquote />
    </div>
  );
});
