import { cn } from "@repo/lib";
import { useCurrentEditor } from "@tiptap/react";
import type { HTMLAttributes } from "react";
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

export function EditorMenubar({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <div
      className={cn(
        "flex gap-2 rounded-md border bg-background p-1",
        className,
      )}
      {...props}
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
}
