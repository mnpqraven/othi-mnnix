import { Button } from "@repo/ui/primitive/button";
import { Input } from "@repo/ui/primitive/input";
import { Label } from "@repo/ui/primitive/label";
import { toast } from "@repo/ui/primitive/sonner";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import {
  blogTagCreate,
  BlogTagSchema,
  blogTagUpdate,
} from "../blog_tag/-blog_tag_server";
import { useRouter } from "@tanstack/react-router";

// FORM init block
// TODO: global hook
const { fieldContext, formContext } = createFormHookContexts();
const { useAppForm } = createFormHook({
  fieldComponents: {
    Label,
    Input,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

interface Props {
  defaultValues?: BlogTagSchema;
  mode: "create" | "update";
}

export function BlogTagForm({ defaultValues, mode = "create" }: Props) {
  const router = useRouter();
  const form = useAppForm({
    defaultValues,
    validators: {
      // we are validating twice, maybe server side form only ?
      onChange: BlogTagSchema.omit("id"),
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        console.log("form value", value);
        switch (mode) {
          case "create":
            await blogTagCreate({ data: value });
            break;
          case "update":
            await blogTagUpdate({ data: value });
            break;
          default:
            break;
        }
        toast.success(`blog tag ${mode}d`);
        router.invalidate();
        formApi.reset();
      } catch (e) {
        toast.error("client error");
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex gap-2">
        <form.AppField
          name="code"
          children={(field) => (
            <div className="space-y-2">
              <field.Label className="capitalize" htmlFor={field.name}>
                {field.name}
              </field.Label>
              <field.Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid ? (
                <em>{field.state.meta.errors.join(", ")}</em>
              ) : null}
            </div>
          )}
        />
        <form.AppField
          name="label"
          children={(field) => (
            <div className="space-y-2">
              <field.Label className="capitalize" htmlFor={field.name}>
                {field.name}
              </field.Label>
              <field.Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid ? (
                <em>{field.state.meta.errors.join(", ")}</em>
              ) : null}
            </div>
          )}
        />

        <Button
          className="mt-6 capitalize"
          type="submit"
          disabled={form.state.isSubmitting}
        >
          {mode}
        </Button>
      </div>
    </form>
  );
}
