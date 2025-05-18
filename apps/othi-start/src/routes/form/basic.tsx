import { Input } from "@repo/ui/primitive/input";
import { Label } from "@repo/ui/primitive/label";
import { formOptions, useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { type } from "arktype";

export const Route = createFileRoute("/form/basic")({
  component: RouteComponent,
});

const UserSchema = type({
  name: "string",
  age: "18<=number<=100",
});
function RouteComponent() {
  return (
    <div>
      Hello "/form/basic"!
      <UserForm />
    </div>
  );
}

function UserForm() {
  const formOpts = formOptions({
    defaultValues: {
      name: "Othi",
      age: 30,
    } satisfies typeof UserSchema.infer,
  });

  const form = useForm({
    ...formOpts,
    validators: {
      onChange: UserSchema,
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value));
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-2"
    >
      <form.Field
        name="name"
        validators={{
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: async ({ value }) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return (
              value.includes("error") && 'No "error" allowed in first name'
            );
          },
        }}
        children={(field) => (
          <div className="flex flex-col gap-2 rounded-md border">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              autoComplete="off"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.isValidating ? "validating ..." : null}
            {field.state.meta.errors.join(", ")}
          </div>
        )}
      />
      <form.Field
        name="age"
        children={(field) => (
          <div className="flex flex-col gap-2 rounded-md border">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              autoComplete="off"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
            {field.state.meta.errors.join(", ")}
          </div>
        )}
      />

      <div className="flex gap-4">
        <button type="button" onClick={() => form.reset()}>
          Reset
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
