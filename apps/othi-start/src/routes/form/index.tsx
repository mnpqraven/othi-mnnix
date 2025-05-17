import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/form/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-2">
      Hello "/form/"!
      <Link className="rounded-md border p-2" to="/form/basic">
        Basic form (client-side)
      </Link>
      <Link className="rounded-md border p-2" to="/form/server-action">
        server action
      </Link>
    </div>
  );
}
