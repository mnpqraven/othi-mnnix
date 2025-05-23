import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/primitive/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/primitive/form";
import { Input } from "@repo/ui/primitive/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@repo/ui/primitive/popover";
import { Toggle } from "@repo/ui/primitive/toggle";
import { useCurrentEditor } from "@tiptap/react";
import type { LucideIcon } from "lucide-react";
import {
  Bold,
  Check,
  Code,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  Link,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Subscript,
  Superscript,
  TextQuote,
  Underline,
  Undo,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function EditorBold() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Toggle
      onClick={() => {
        editor.chain().focus().toggleBold().run();
      }}
      pressed={editor.isActive("bold")}
      size="sm"
    >
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}

export function EditorItalic() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Toggle
      onClick={() => {
        editor.chain().focus().toggleItalic().run();
      }}
      pressed={editor.isActive("italic")}
      size="sm"
    >
      <Italic className="h-4 w-4" />
    </Toggle>
  );
}

export function EditorUnderline() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Toggle
      onClick={() => {
        editor.chain().focus().toggleUnderline().run();
      }}
      pressed={editor.isActive("underline")}
      size="sm"
    >
      <Underline className="h-4 w-4" />
    </Toggle>
  );
}

export function EditorStrike() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Toggle
      onClick={() => {
        editor.chain().focus().toggleStrike().run();
      }}
      pressed={editor.isActive("strike")}
      size="sm"
    >
      <Strikethrough className="h-4 w-4" />
    </Toggle>
  );
}

export function EditorSubscript() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Toggle
      onClick={() => {
        editor.chain().focus().toggleSubscript().run();
      }}
      pressed={editor.isActive("strike")}
      size="sm"
    >
      <Subscript className="h-4 w-4" />
    </Toggle>
  );
}

export function EditorSuperscript() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Toggle
      onClick={() => {
        editor.chain().focus().toggleSuperscript().run();
      }}
      pressed={editor.isActive("strike")}
      size="sm"
    >
      <Superscript className="h-4 w-4" />
    </Toggle>
  );
}

export function EditorCode() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Toggle
      onClick={() => {
        editor.chain().focus().toggleCode().run();
      }}
      pressed={editor.isActive("code")}
      size="sm"
    >
      <Code className="h-4 w-4" />
    </Toggle>
  );
}

export function EditorUndo() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Button
      className="h-8"
      disabled={!editor.can().undo()}
      onClick={() => {
        editor.chain().focus().undo().run();
      }}
      size="sm"
      variant="ghost"
    >
      <Undo className="h-4 w-4" />
    </Button>
  );
}

export function EditorRedo() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Button
      className="h-8"
      disabled={!editor.can().redo()}
      onClick={() => {
        editor.chain().focus().undo().run();
      }}
      size="sm"
      variant="ghost"
    >
      <Redo className="h-4 w-4" />
    </Button>
  );
}

export function EditorLink() {
  const [prevUrl, setPrevUrl] = useState("");
  const [open, setOpen] = useState(false);

  const form = useForm<{ url: string }>({
    defaultValues: { url: prevUrl },
    resolver: zodResolver(
      z.object({
        url: z.string().url(),
      }),
    ),
  });

  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const unsetLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setOpen(false);
  };

  const onSubmit = ({ url }: { url: string }) => {
    setPrevUrl(url);
    if (url.length) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
      setOpen(false);
    } else unsetLink();
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverAnchor asChild>
        <Toggle
          onClick={() => {
            setOpen(true);
          }}
          pressed={editor.isActive("link")}
          size="sm"
        >
          <Link className="h-4 w-4" />
        </Toggle>
      </PopoverAnchor>

      <PopoverContent className="p-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <Input autoComplete="off" placeholder="Link" {...field} />
                    <Button className="p-2" type="submit" variant="outline">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      className="p-2"
                      onClick={unsetLink}
                      type="button"
                      variant="outline"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

export function EditorHeadingGroup() {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);

  if (!editor) return null;
  const headings: { level: 1 | 2 | 3 | 4 | 5 | 6; icon: LucideIcon }[] = [
    { level: 1, icon: Heading1 },
    { level: 2, icon: Heading2 },
    { level: 3, icon: Heading3 },
    { level: 4, icon: Heading4 },
  ];
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverAnchor asChild>
        <Toggle
          onClick={() => {
            setOpen(true);
          }}
          pressed={editor.isActive("heading")}
          size="sm"
        >
          <Heading className="h-4 w-4" />
        </Toggle>
      </PopoverAnchor>

      <PopoverContent className="w-fit p-2">
        <div className="flex gap-1">
          {headings.map(({ level, icon: Icon }) => (
            <Toggle
              key={level}
              onPressedChange={() => {
                editor.chain().focus().toggleHeading({ level }).run();
              }}
              pressed={editor.isActive("heading", { level })}
            >
              <Icon className="h-4 w-4" />
            </Toggle>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function EditorBulletList() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Toggle
      onClick={() => {
        editor.chain().focus().toggleBulletList().run();
      }}
      pressed={editor.isActive("bulletList")}
      size="sm"
    >
      <List className="h-4 w-4" />
    </Toggle>
  );
}

export function EditorOrderedList() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Toggle
      onClick={() => {
        editor.chain().focus().toggleOrderedList().run();
      }}
      pressed={editor.isActive("orderedList")}
      size="sm"
    >
      <ListOrdered className="h-4 w-4" />
    </Toggle>
  );
}

export function EditorBlockquote() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Toggle
      onClick={() => {
        editor.chain().focus().toggleBlockquote().run();
      }}
      pressed={editor.isActive("blockquote")}
      size="sm"
    >
      <TextQuote className="h-4 w-4" />
    </Toggle>
  );
}
