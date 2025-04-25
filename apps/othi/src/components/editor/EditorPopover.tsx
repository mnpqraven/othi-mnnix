import { BubbleMenu, useCurrentEditor } from "@tiptap/react";
import {
  EditorBold,
  EditorItalic,
  EditorStrike,
  EditorUnderline,
} from "./modifiers";

export function EditorPopover() {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const isImage = editor.isActive("image");

  // TODO: buttons for image

  return (
    <BubbleMenu
      className="flex gap-1 rounded-md border bg-background p-1"
      editor={editor}
      tippyOptions={{ duration: 100, appendTo: "parent" }}
    >
      {isImage ? null : (
        <>
          <EditorBold />
          <EditorItalic />
          <EditorUnderline />
          <EditorStrike />
        </>
      )}
    </BubbleMenu>
  );
}
