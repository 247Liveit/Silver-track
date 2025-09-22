import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { TabsContent } from "@/components/ui/tabs"
import GeneralForm from "./GeneralForm";

export default function GeneralTab({ id, data, handleAction }) {

  return (
    <TabsContent value={id} className="mt-4">
      <div className="border rounded-md p-4 overflow-auto">
        <CustomFormLayout key={`/preferences/general`} item={data ?? {}} redirectUrl='' showCancelBtn={false}
          url={`/preferences/general`} showNewBtn={false}
          edit={true} onSave={handleAction}>

          <GeneralForm />

        </CustomFormLayout>
      </div>
    </TabsContent>
  )
}