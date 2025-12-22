import CustomInput from "@/components/shared/form/inputs/CustomInput";
import { FormContext } from "@/providers/formContext";
import { useContext, useEffect } from "react";

export function NoteForm({ clientId }: { clientId: number }) {
  const form = useContext(FormContext);

  useEffect(() => {
    form.setValue('clientId', clientId);
  }, [clientId, form]);

  return (
    <section className="grid lg:grid-cols-1 grid-cols-1 gap-4 p-4">
      <CustomInput
        type="textarea"
        className="dark:text-black text-lg col-span-1 m-0 min-h-[200px]"
        title="Client Notes"
        name="notes"
        placeholder="Enter notes for this client..."
        disabled={false}
      />
    </section>
  );
}