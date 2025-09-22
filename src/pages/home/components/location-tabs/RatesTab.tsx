import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { TabsContent } from "@/components/ui/tabs"
import { handleEditCache } from "@/lib/cache-util";
import LocationRateForm from "./RatesForm";
import { createLocationRatesSchema } from "@/lib/validation/zodSchema";
import { useAuthHook } from "@/providers/authContext";
import { Role } from "@/rbac/aceess-rules";

export default function LocationRatesTab({ location, id }) {

  const auth = useAuthHook();
  return (
    <TabsContent value={id} className="mt-4">
      <div className="border rounded-md p-4 overflow-auto">
        <CustomFormLayout key={`/locations/rates-long-day-week/${location.id}`} item={location} redirectUrl=''
          url={`/locations/rates-long-day-week`}
          validationSchema={createLocationRatesSchema}
          showNewBtn={false}
          edit={[Role.TRACKER_MANAGER, Role.Admin,Role.TRACKER_CLIENT].includes(auth.user?.role as Role)}
          onSave={data => {

            handleEditCache({ item: { ...location, ...data }, type: 'edit', cacheKey: `/clients/location/${location.clientId}` })

          }} >
          <LocationRateForm />
        </CustomFormLayout>
      </div>
    </TabsContent>
  )
}