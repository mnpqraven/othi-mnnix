import { Input } from "@repo/ui/primitive/input";
import { Label } from "@repo/ui/primitive/label";
import { useId } from "react";
import { useFieldContext } from ".";

export function FormInput({ labelText }: { labelText?: string }) {
  const field = useFieldContext<string>();
  const id = useId();
  return (
    <div className="space-y-2">
      {labelText?.length ? <Label htmlFor={id}>{labelText}</Label> : null}
      <Input
        id={id}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.errors.length ? (
        <span className="text-destructive">
          {field.state.meta.errors.join(", ")}
        </span>
      ) : null}
    </div>
  );
}
