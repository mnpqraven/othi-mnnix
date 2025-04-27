"use client";

import { cn } from "@repo/lib";
import { useTRPC } from "@repo/protocol/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/primitive/form";
import { Input } from "@repo/ui/primitive/input";
import { MultiCombobox } from "@repo/ui/primitive/multicombobox";
import { Switch } from "@repo/ui/primitive/switch";
import { useQuery } from "@tanstack/react-query";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { useBlogForm } from "./BlogFormProvider";

export const BlogForm = forwardRef<
  HTMLFormElement,
  HTMLAttributes<HTMLFormElement>
>(function BlogForm({ className, ...props }, ref) {
  const trpc = useTRPC();
  const { data = [], isLoading } = useQuery(trpc.blog.tag.list.queryOptions());
  const { form } = useBlogForm();

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-4", className)}
        ref={ref}
        {...props}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultiCombobox
                    badge
                    isLoading={isLoading}
                    labelAccessor={(e) => e.label}
                    onValueChange={field.onChange}
                    options={data}
                    valueAccessor={(e) => e.code}
                    values={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publish"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published</FormLabel>
                <div className="flex h-10 items-center">
                  <FormControl>
                    <Switch
                      checked={field.value ?? undefined}
                      className="block"
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
});
