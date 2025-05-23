"use client";

import { useTRPC } from "@repo/protocol/trpc/react";
import { useMutation } from "@tanstack/react-query";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import type { Editor, Extensions } from "@tiptap/react";
import { EditorProvider as PrimitiveProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cva } from "class-variance-authority";
import { useAtomValue } from "jotai";
import type { ComponentProps, ReactNode } from "react";
import { EditorHelpDialog } from "./EditorHelpDialog";
import { EditorListener } from "./EditorListener";
import { EditorMenubar } from "./EditorMenubar";
import { EditorPopover } from "./EditorPopover";
import { editorTempBlogIdAtom } from "./store";

type MediaInsert = { mode: "drop"; pos: number } | { mode: "paste" };

function useExtensions() {
  const tempBlogId = useAtomValue(editorTempBlogIdAtom);
  const trpc = useTRPC();
  const { mutate: uploadTempImage } = useMutation(
    trpc.blog.tempImage.append.mutationOptions(),
  );

  function editorMediaInsert(editor: Editor, files: File[], opt: MediaInsert) {
    if (tempBlogId) uploadTempImage({ files, tempBlogId });

    for (const file of files) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        editor
          .chain()
          .insertContentAt(
            opt.mode === "drop" ? opt.pos : editor.state.selection.anchor,
            { type: "image", attrs: { src: fileReader.result } },
          )
          .focus()
          .run();
      };
    }
  }

  const extensions: Extensions = [
    StarterKit.configure({
      bulletList: { keepMarks: true, keepAttributes: false },
      orderedList: { keepMarks: true, keepAttributes: false },
    }),
    Underline,
    Link.configure({
      autolink: true,
      openOnClick: false,
      defaultProtocol: "https",
    }),
    TextAlign,
    Subscript,
    Superscript,
    Image,
    FileHandler.configure({
      allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
      onDrop: (currentEditor, files, pos) => {
        editorMediaInsert(currentEditor, files, { mode: "drop", pos });
      },
      onPaste: (currentEditor, files, htmlContent) => {
        if (htmlContent) return;

        editorMediaInsert(currentEditor, files, { mode: "paste" });
      },
    }),
  ];
  return { extensions };
}

export function EditorProvider({
  children,
  content,
}: {
  children?: ReactNode;
  content?: ComponentProps<typeof PrimitiveProvider>["content"];
}) {
  // from textarea
  const editorStyle = cva(
    // custom name
    [
      "markdown",
      // some of these styles need to move to globals.css
      "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-[80px] w-full rounded-md border px-4 py-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    ],
  );
  const { extensions } = useExtensions();

  return (
    <PrimitiveProvider
      content={content}
      editorProps={{
        attributes: {
          class: editorStyle(),
        },
      }}
      extensions={extensions}
      immediatelyRender={false}
      slotBefore={<EditorMenubar className="sticky top-16 z-20" />}
    >
      <EditorPopover />
      <EditorListener />
      <EditorHelpDialog />

      {children}
    </PrimitiveProvider>
  );
}
