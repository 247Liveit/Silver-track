import InlineCheckBoxSimple from "@/components/shared/form/inputs/InlineCheckBoxSimple";
import { TabsContent } from "@/components/ui/tabs"
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth"
import { Action, Resource } from "@/rbac/aceess-rules";
import useAccessControl from "@/rbac/use-access-control";
import { toast } from "react-toastify";

export default function AlertTab({ id, data, handleAction }) {

  const axios = useAxiosAuth();
  const updateAlert = (item) => {
    toast.loading('Waiting...', { toastId: "loading-pref", position: "bottom-center" });

    axios.patch(`/preferences/alerts/${item.id}`, {
      isActive: !item.isActive
    }).then(res => {
      handleAction(res.data.data)
      toast.success("Updated successfully", { position: "bottom-center" })
    }).catch(() => {
      toast.error("Something went wrong!", { position: "bottom-center" })
    }).finally(() => {
      toast.dismiss("loading-pref")
    })
  }
  const { isAllowed, getResourceByUrl } = useAccessControl()

  return (
    <TabsContent value={id} className="mt-4">
      <div className="border rounded-md p-4 overflow-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left pb-2  border p-2" >Name</th>
              <th className="text-left pb-2  border p-2" >Active</th>
            </tr>
          </thead>
          <tbody>

            {
              data.map(i => {

                return { ...i, title: i.name, name: null }
              })
                .map(item => {
                  return (
                    <tr key={item.id}>
                      <td className="text-left pb-2  border p-2">{item.title}</td>
                      <td className="text-center flex justify-left border p-2">
                        {isAllowed(Action.Update, Resource.Preferences) &&
                          <InlineCheckBoxSimple
                            id="pay"
                            className="border-0"
                            error={""}
                            placeholder={""}
                            type=""
                            checked={item.isActive}
                            onChange={e => { updateAlert(item) }}
                            title=""
                            name="pay"
                            items={[item]}
                            disabled={false}
                          />
                        }
                      </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </div>
    </TabsContent>
  )
}