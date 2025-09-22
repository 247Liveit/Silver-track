import TableActions from "@/components/TableActions"
import { TabsContent } from "@/components/ui/tabs"

export default function GenericTab({key,data,handleAction}){
  
    return(
        <TabsContent value={key} className="mt-4">
          <div className="border rounded-md p-4 h-40 overflow-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left pb-2  border p-2" >Note</th>
                  <th className="text-left pb-2  border p-2" >Actions</th>
                </tr>
              </thead>
              <tbody>

                {
                  data?.map(item => {
                    return (
                      <tr key={item.id}>
                        <td className="text-left pb-2  border p-2">{item.text}</td>
                        <td className="text-center flex justify-left border p-2">
                        <TableActions link='form-card' handleAction={handleAction} Item={item}  />
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