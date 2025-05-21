"use client";

import { arktypeResolver } from "@hookform/resolvers/arktype";
import { BlogTagSchemas } from "@repo/database/schema";
import { useTRPC } from "@repo/protocol/trpc/react";
import { Button } from "@repo/ui/primitive/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/primitive/form";
import { Input } from "@repo/ui/primitive/input";
import { toast } from "@repo/ui/primitive/sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export function BlogTagForm() {
  const form = useForm({
    resolver: arktypeResolver(BlogTagSchemas.create),
    defaultValues: {
      label: "",
      code: "",
    },
  });
  const utils = useQueryClient();
  const trpc = useTRPC();
  const { mutate } = useMutation(
    trpc.othi.blogTag.create.mutationOptions({
      onSuccess() {
        void utils.invalidateQueries(trpc.othi.blogTag.list.queryFilter());
        form.reset();
        toast("Success");
      },
    }),
  );

  return (
    <Form {...form}>
      <form
        className="flex gap-4"
        onSubmit={form.handleSubmit((e) => {
          mutate(e);
        })}
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-8" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
}
