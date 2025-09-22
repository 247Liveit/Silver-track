import ScheduleTableDateRange from "@/components/shared/date-range";
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import AdvanceSelectSimple from "@/components/shared/form/inputs/AdvanceSelectSimple";
import PopupModal from "@/components/shared/popup-modal";
import TableHeader from "@/components/TableHeader";
import { Card } from "@/components/ui/card";
import { SkeletonBig } from "@/components/ui/skeleton";
import { useGet } from "@/lib/api/queries/generic";
import { createUserSchema, extraChargesSchema } from "@/lib/validation/zodSchema";
import UserForm from "@/pages/users/forms/UserForm";
import { Location, LocationExtraCharges, LocationShift } from "@/types/pagesData";
import { EmployeeSchedule } from "@/types/types";
import { addDays, endOfMonth, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExtraChargesForm from "./ExtraChargesForm";
import { useModalHook } from "@/providers/modalContext";
import TableActions from "@/components/TableActions";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { onDelete } from "@/lib/api/axios/delete-item";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { TabsContent } from "@/components/ui/tabs";

export default function LocationExtraChagresTab({ selectedLocation ,id}: { selectedLocation: Location | null | undefined,id:string }) {
  const queryParams = new URLSearchParams(location.search);
  const filterStartDate = queryParams.get('extraFilterStartDate') ?? startOfMonth(new Date()).toISOString().split('T')[0];
  const filterEndDate = queryParams.get('extraFilterEndDate') ?? endOfMonth(new Date()).toISOString().split('T')[0];
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen, setIsOpen } = useModalHook();
  const [currentItem, setCurrentItem] = useState<LocationExtraCharges | null>(null);
  const [openDeleteDialog, setIsOpenDialog] = useState(false);
  const axios = useAxiosAuth();
  const { toast } = useToast()

  const { data: items, isLoading, refetch } = useGet<EmployeeSchedule[]>(
    `/location-extra-charges/${selectedLocation?.id}`, {
    startDate: filterStartDate,
    endDate: filterEndDate,
  })

  useEffect(()=>{
    refetch()
  },[filterStartDate,filterEndDate])

  const handleSelection = function (selectedItem, type) {
    setCurrentItem(prev => {
      return selectedItem
    });
    //  setCurrentItem(type);
    switch (type) {
      case 1: {
        // setIsLoading(true)
        setIsEdit(true);
        setIsOpen("EditExtra");
        break;
      }
      case 2: {
        setIsOpen("view");
        setIsEdit(false);
        break;
      }
      case 3: {
        setIsOpenDialog(true);
        break;
      }

    }

  };

  if (isLoading)
    return <SkeletonBig />

  return (
    <TabsContent value={id} className="mt-4">
      <div className="border rounded-md p-4 overflow-auto">
        <Card className="p-4 rounded-lg mt-2">

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2  mt-4">
            <ScheduleTableDateRange className="w-full" startDateParamName="extraFilterStartDate" endDateParamName="extraFilterEndDate"/>
            <PopupModal
              modalName="CreateExtra"
              title="Add Location Extra Charges"
              renderModal={(onClose) => {
                return (<CustomFormLayout
                  item={{ password: "" }}
                  url={`/location-extra-charges/${selectedLocation?.id}`} redirectUrl=''
                  edit={true} onSave={() => {
                    refetch();
                    onClose();
                  }}
                  validationSchema={extraChargesSchema}
                  showNewBtn={false}>
                  <ExtraChargesForm />
                </CustomFormLayout>
                );
              }}
            />
          </div>
          <div className="rounded-sm border border-stroke bg-white  pb-2.5 shadow-default  sm:px-7.5 xl:pb-1 mt-4">
            <div className="lg:max-h-[32rem] overflow-x-auto">
              <table className="w-full table-auto ">
                <TableHeader headers={["Discription", 'Amount', 'Type','Date']} />
                <tbody>

                  {items?.map((item: any) => {
                    return (<tr key={item.id}>
                      <td className="border-b border-[#eee] py-2 px-2   text-center">
                        <h5 className=" text-black">
                          {item.description}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-2 px-2   text-center">
                        <h5 className=" text-black">
                          {item.amount}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-2 px-2   text-center">
                        <h5 className=" text-black">
                          {item.type}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-2 px-2   text-center">
                        <h5 className=" text-black">
                          {new Date(item.created_at).toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: '2-digit'})}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-2 px-2 text-center">
                        <TableActions link='/location-extra-charges' handleAction={handleSelection} Item={item} />
                      </td>
                    </tr>)
                  })
                  }

                </tbody>
              </table>
            </div>

          </div>

          <div className="flex gap-3 mb-4">
            <PopupModal
              title="Edit Location Extra Charges"
              showAddBtn={false}
              modalName="EditExtra"
              renderModal={(onClose) => {
                return (<CustomFormLayout key={"EditExtra"} item={currentItem} url='/location-extra-charges'
                  redirectUrl='' edit={isEdit && isOpen == "EditExtra"} showNewBtn={false}
                  validationSchema={extraChargesSchema}
                  onSave={() => {
                    refetch()
                    setIsOpen("")
                  }}>
                  <ExtraChargesForm />
                </CustomFormLayout>
                );
              }} />

          </div>
          <div className="flex gap-3 mb-4">
            <Modal
              key={"delete"}
              userPopup={true}
              isOpen={openDeleteDialog}
              onClose={() => { setIsOpenDialog(false) }}
              className={'!bg-background !px-1'}
            >
              <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <p>Are you sure you want to delete?</p>
                <div className="flex items-center justify-between mt-4">
                  <Button
                    className="flext-1 bg-red-500 disabled:bg-gray-500"
                    onClick={() => {
                      onDelete(`/location-extra-charges/${currentItem?.id}`, currentItem, axios, toast, () => {
                        refetch()
                      });
                      setIsOpenDialog(false);
                    }}>
                    Yes
                  </Button>
                  <Button className="flext-1" onClick={() => setIsOpenDialog(false)}>No</Button>
                </div>
              </div>
            </Modal>

          </div>
        </Card>
      </div>
    </TabsContent>
  )
}