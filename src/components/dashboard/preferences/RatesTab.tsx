import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { TabsContent } from "@/components/ui/tabs"
import RatesForm from "./RatesForm";

export default function RatesTab({ id, data, handleAction }) {


  return (
    <TabsContent value={id} className="mt-4">
      <div className="border rounded-md p-4 overflow-auto">
        <CustomFormLayout key={`/preferences/rates`} item={data ?? {}} redirectUrl='' showCancelBtn={false}
          url={`/preferences/rates`} showNewBtn={false}
          edit={true} onSave={handleAction}>

          <RatesForm />

        </CustomFormLayout>
      </div>
    </TabsContent>
  )
}