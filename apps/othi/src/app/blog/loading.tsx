import { Button } from "@repo/ui/primitive/button";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Button
        className="w-full animate-pulse justify-between p-4"
        variant="outline"
      >
        Loading...
      </Button>
    </div>
  );
}
