import { useTable } from "@repo/lib/hooks";
import { DataTable } from "@repo/ui/shared/table/DataTable";
import { BlogTagForm } from "../-components/BlogTagForm";
import { blogTagList } from "./-blog_tag_server";
import { blogTagsColumns } from "./-columns";

export const Route = createFileRoute({
  component: RouteComponent,
  loader: async () => await blogTagList(),
  ssr: false,
});

function RouteComponent() {
  const blogTags = Route.useLoaderData();
  const { table } = useTable({
    data: blogTags,
    columns: blogTagsColumns,
  });

  return (
    <div>
      <BlogTagForm mode="create" />
      <DataTable table={table} />
    </div>
  );
}
