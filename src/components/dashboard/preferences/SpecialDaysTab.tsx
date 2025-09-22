
import { toast } from "react-toastify";
import TableActions from "@/components/TableActions";
// import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { Modal } from "@/components/ui/modal";
import { TabsContent } from "@/components/ui/tabs"
import { onDelete } from "@/lib/api/axios/delete-item";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth"
import { useState } from "react";
import SpecialDaysForm from "./SpecialDaysForm";
import { getUTCDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";

export default function SpecialDaysTab({ id, data, handleAction }) {

  const axios = useAxiosAuth();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDaysAction = (item, type) => {
    setCurrentRow({ ...item, start: getUTCDate(new Date(item.start)), end: getUTCDate(new Date(item.end)) });

    switch (type) {
      case 1: {
        openModal();
        break;
      }
      case 3: {
        onDelete(`/preferences/special-days/${item.id}`, item, axios, handleAction,toast);
        break;
      }
    }

  }
  return (
    <TabsContent value={id} className="mt-4">
      <div className="border rounded-md p-4 overflow-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-center pb-2  border p-2" >Name</th>
              <th className="text-center pb-2  border p-2" >start</th>
              <th className="text-center pb-2  border p-2" >end</th>
              <th className="text-center pb-2  border p-2" >Actions</th>
            </tr>
          </thead>
          <tbody>


            {
              data

                .map(item => {
                  return (
                    <tr key={item.id}>
                      <td className="text-center pb-2  border p-2">{item.name} {item.floatingHoliday ? `(Floating Holiday)` : ``} </td>
                      <td className="text-center pb-2  border p-2">{new Date(item.start)?.toLocaleDateString()}</td>
                      <td className="text-center pb-2  border p-2">{new Date(item.end)?.toLocaleDateString()}</td>
                      <td className="text-center pb-2  border p-2">
                        <TableActions link={`/preferences/special-days/${item.id}`} handleAction={handleDaysAction} Item={item} />
                      </td>

                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </div>
      <Modal
        title={`Special Days`}
        description=""
        isOpen={isModalOpen}
        onClose={closeModal}
        className="h-11/12 p-4"
      >
        <CustomFormLayout key={`/preferences/special-days`} item={currentRow ?? {}} redirectUrl='' showCancelBtn={false}
          url={`/preferences/special-days`}
          edit={true} onSave={handleAction}>
          <SpecialDaysForm />
        </CustomFormLayout>
      </Modal>
      <Button className="float-right mt-2" onClick={e => {
        setCurrentRow(null)
        openModal()
      }}>Add new special Day</Button>
    </TabsContent>
  )

}