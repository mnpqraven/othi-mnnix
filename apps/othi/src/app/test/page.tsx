import { cn } from "@repo/lib";
import { Protocol } from "@repo/protocol";
import { Button } from "@repo/ui";

export default function Page() {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <h1 className="text-red-500">Red</h1>
      <h1 className={cn("text-blue-500")}>Blue</h1>
      <Protocol />

      <Button>Click me</Button>
    </section>
  );
}
