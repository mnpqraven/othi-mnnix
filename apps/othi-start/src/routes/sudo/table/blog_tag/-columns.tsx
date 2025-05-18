import type { BlogTag } from "@repo/database/schema";
import { Button } from "@repo/ui/primitive/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/primitive/dialog";
import { toast } from "@repo/ui/primitive/sonner";
import { ConfirmPopover } from "@repo/ui/shared/ConfirmPopover";
import { useRouter } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { Pen, Trash } from "lucide-react";
import { BlogTagForm } from "../-components/BlogTagForm";
import { blogTagDelete } from "./-blog_tag_server";

const col = createColumnHelper<BlogTag>();

export const blogTagsColumns = [
  col.accessor("id", {}),
  col.accessor("code", {}),
  col.accessor("label", {}),
  col.display({
    id: "action",
    cell: function Action({ row }) {
      const router = useRouter();

      return (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Pen />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update</DialogTitle>
                <DialogDescription>Update</DialogDescription>
              </DialogHeader>
              <BlogTagForm defaultValues={row.original} mode="update" />
            </DialogContent>
          </Dialog>
          <ConfirmPopover
            asChild
            onConfirm={async () => {
              blogTagDelete({ data: { id: row.original.id } }).then(() => {
                toast.success("tag deleted");
                router.invalidate();
              });
            }}
          >
            <Button>
              <Trash />
            </Button>
          </ConfirmPopover>
        </div>
      );
    },
  }),
];
