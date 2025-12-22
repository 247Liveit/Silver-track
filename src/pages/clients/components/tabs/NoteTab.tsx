import { TabsContent } from "@/components/ui/tabs";
import { useGetSingle } from "@/lib/api/queries/generic";
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { Client } from "@/types/types";
import { NoteForm } from "../forms/NoteForm";
import { noteSchema } from "@/lib/validation/zodSchema";


export default function NoteTab({ clientId }: { clientId: number }) {
  const { data: clientData, isLoading, refetch } = useGetSingle<Client>(`/clients/${clientId}`);

  const handleNoteSaved = () => {
    refetch();
  };

  if (isLoading) {
    return <TabsContent value="noteInfo">Loading...</TabsContent>;
  }

  return (
    <TabsContent value="noteInfo" className="w-full m-4">
      <CustomFormLayout
        url={`/clients`}
        validationSchema={noteSchema}
        showNewBtn={false}
        showCancelBtn={false}
        item={clientData || {}}
        redirectUrl=""
        onSave={handleNoteSaved}
        edit={true}
      >
        <NoteForm clientId={clientId} />
      </CustomFormLayout>
    </TabsContent>
  );
}