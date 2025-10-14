"use client";

import { useTRPC } from "@repo/protocol/trpc/react";
import { Button } from "@repo/ui/primitive/button";
import { toast } from "@repo/ui/primitive/sonner";
import { ConfirmPopover } from "@repo/ui/shared/ConfirmPopover";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  blogId: string;
}
export function DeleteButton({ blogId }: Props) {
  const trpc = useTRPC();
  const router = useRouter();
  const { mutate } = useMutation(
    trpc.blog.delete.mutationOptions({
      onSuccess() {
        toast("Blog deleted");
        router.push("/blog");
      },
    }),
  );

  return (
    <ConfirmPopover
      asChild
      onConfirm={() => {
        mutate({ id: blogId });
      }}
      variants={{
        yes: "destructive",
      }}
    >
      <Button variant="destructive">Delete</Button>
    </ConfirmPopover>
  );
}
