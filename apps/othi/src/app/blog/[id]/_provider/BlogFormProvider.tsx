"use client";

import {
  editorTempBlogIdAtom,
  generateEditorTempBlogIdAtom,
} from "@/components/editor/store";
import { arktypeResolver } from "@hookform/resolvers/arktype";
import { BlogSchemas } from "@repo/database/schema";
import type { RouterInputs } from "@repo/protocol";
import { useTRPC } from "@repo/protocol/trpc/react";
import { toast } from "@repo/ui/primitive/sonner";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useRouter } from "next/navigation";
import { type ReactNode, createContext, useContext, useEffect } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";

const metaForm = BlogSchemas.select.pick("publish", "title").merge({
  tag_ids: "string[]",
});

type MetaForm = typeof metaForm.infer;

export function useBlogForm() {
  const {
    form,
    id,
    update,
    create,
    isPending = false,
  } = useContext(BlogFormContext);
  if (!form || !update || !create)
    throw new Error(
      "context value cant be undefined, did you use this hook outside <BlogFormProvider/> ?",
    );

  return { form, blogId: id, update, create, isPending };
}

interface ContextProps {
  form: UseFormReturn<MetaForm>;
  id?: string;
  update: (values: RouterInputs["blog"]["update"]["everything"]) => void;
  create: (values: RouterInputs["blog"]["create"]["everything"]) => void;
  isPending: boolean;
}
const BlogFormContext = createContext<Partial<ContextProps>>({});

interface ProviderProps {
  children: ReactNode;
  id?: string;
  defaultValue?: MetaForm;
  mode: "create" | "update";
}
export function BlogFormProvider({
  children,
  id,
  defaultValue,
  mode,
}: ProviderProps) {
  const router = useRouter();
  const form = useForm<MetaForm>({
    resolver: arktypeResolver(metaForm),
    defaultValues: {
      title: "",
      ...defaultValue,
    },
  });
  const trpc = useTRPC();
  const createTempBlogId = useSetAtom(generateEditorTempBlogIdAtom);
  const reset = useSetAtom(editorTempBlogIdAtom);

  // generates a new id on render
  useEffect(() => {
    if (mode === "create") createTempBlogId();
    return () => {
      reset(RESET);
    };
  }, [createTempBlogId, reset, mode]);

  const { mutate: update, isPending: isUpdating } = useMutation(
    trpc.blog.update.everything.mutationOptions({
      onSuccess() {
        toast.success("Blog updated");
        router.push("/blog");
      },
    }),
  );

  const { mutate: create, isPending: isCreating } = useMutation(
    trpc.blog.create.everything.mutationOptions({
      onSuccess() {
        toast.success("Blog created");
        router.push("/blog");
        reset(RESET);
      },
    }),
  );
  const isPending = isUpdating || isCreating;

  return (
    <BlogFormContext.Provider
      value={{
        id,
        form,
        update,
        create,
        isPending,
      }}
    >
      {children}
    </BlogFormContext.Provider>
  );
}
