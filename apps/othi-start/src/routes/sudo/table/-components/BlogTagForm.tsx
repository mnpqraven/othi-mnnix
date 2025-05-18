import { useForm } from "@/components/form";
import { Button } from "@repo/ui/primitive/button";
import { toast } from "@repo/ui/primitive/sonner";
import { useRouter } from "@tanstack/react-router";
import { BlogTagSchema, blogTagCRUD } from "../blog_tag/-blog_tag_server";

interface Props {
  defaultValues?: BlogTagSchema;
  mode: "create" | "update";
}

export function BlogTagForm({ defaultValues, mode = "create" }: Props) {
  const router = useRouter();
  const form = useForm({
    defaultValues,
    validators: {
      // we are validating twice, maybe server side form only ?
      onChange: BlogTagSchema.omit("id"),
    },
    onSubmit: async ({ value, formApi }) => {
      console.log("form value", value);

      await blogTagCRUD[mode]({ data: value });

      toast.success(`blog tag ${mode}d`);
      router.invalidate();
      formApi.reset();
    },
    onSubmitInvalid: () => {
      console.log("trigger onSubmitInvalid");
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
          children={(field) => <field.Input labelText="Code" />}
        />
        <form.AppField
          name="label"
          children={(field) => <field.Input labelText="Label" />}
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
