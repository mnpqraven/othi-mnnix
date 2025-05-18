import {
  formOptions,
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from "@tanstack/react-form";
import {
  ServerValidateError,
  createServerValidate,
  getFormData,
} from "@tanstack/react-form/start";
import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";

// You can pass other form options here
export const formOpts = formOptions({
  defaultValues: {
    firstName: "",
    age: 0,
  },
});

// server action logic
const serverValidate = createServerValidate({
  ...formOpts,
  // TODO: arktype validation
  onServerValidate: ({ value }) => {
    if (value.age < 12) return "Server validation: age too low";
    return undefined;
  },
});

const handleForm = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error("invalid form data");
    return data;
  })
  .handler(async (ctx) => {
    try {
      const validated = await serverValidate(ctx.data);
      console.log("validated", validated);
    } catch (e) {
      if (e instanceof ServerValidateError) {
        // Log form errors or do any other logic here
        return "Validation error";
      }

      // Some other error occurred when parsing the form
      console.error(e);
      setResponseStatus(500);
      return "There was an internal error";
    }
    return "Form has validated successfully";
  });
const getFormDataFromServer = createServerFn({ method: "GET" }).handler(
  async () => {
    return getFormData();
  },
);

export const Route = createFileRoute({
  component: RouteComponent,
  loader: async () => ({
    state: await getFormDataFromServer(),
  }),
});

// render
function RouteComponent() {
  const { state } = Route.useLoaderData();
  const form = useForm({
    ...formOpts,
    transform: useTransform((base) => mergeForm(base, state), [state]),
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  return (
    <form action={handleForm.url} method="post" encType="multipart/form-data">
      {formErrors.map((error) => (
        <p key={error as unknown as string}>{error}</p>
      ))}

      <form.Field
        name="age"
        validators={{
          onChange: ({ value }) =>
            value < 8 ? "Client validation: You must be at least 8" : undefined,
        }}
      >
        {(field) => {
          return (
            <div>
              <input
                name="age"
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error as string}>{error}</p>
              ))}
            </div>
          );
        }}
      </form.Field>
      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Submit"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
