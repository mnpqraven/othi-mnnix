"use client";

import { useTRPC } from "@repo/protocol/trpc/react";
import { Button } from "@repo/ui/primitive/button";
import { ConfirmPopover } from "@repo/ui/shared/ConfirmPopover";
import { useMutation } from "@tanstack/react-query";

interface Props {
  blogId: string;
}
export function DeleteButton({ blogId }: Props) {
  const trpc = useTRPC();
  // TODO: onSuccess toast
  const { mutate } = useMutation(trpc.blog.delete.mutationOptions());

  return (
    <ConfirmPopover
      onConfirm={() => {
        mutate({ id: blogId });
      }}
      variants={{
        yes: "destructive",
      }}
    >
      <Button>Delete</Button>
    </ConfirmPopover>
  );
}
