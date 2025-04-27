import { BlogTagForm } from "./BlogTagForm";
import { BlogTagTable } from "./BlogTagTable";

export default async function Page() {
  return (
    <div className="flex flex-col gap-2">
      <BlogTagForm />

      <BlogTagTable />
    </div>
  );
}
