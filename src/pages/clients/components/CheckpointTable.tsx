import TableActions, { ActionType } from "@/components/TableActions";
import TableHeader from "@/components/TableHeader";
import { useState } from "react";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { Checkpoint } from "@/types/pagesData";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { onDelete } from "@/lib/api/axios/delete-item";
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { CheckPointForm } from "./forms/CheckpointForm";
import { createCheckPointTypeSchema } from "@/lib/validation/zodSchema";
import { set } from "date-fns";

export default function CheckpointsTable({ items, onDataChange,locationId,clientId }: { items: Checkpoint[], onDataChange: any,locationId:number,clientId:number }) {

    const [openDialog, setIsOpenDialog] = useState("");

    const [currentItem, setCurrentItem] = useState<Checkpoint | null>((items?.length > 0 ? items[0] : null));
    const axios = useAxiosAuth();
    const { toast } = useToast()
    const handleSelection = function (selectedItem, type: ActionType) {
        setCurrentItem(prev => {
            return selectedItem
        });
        if (type === ActionType.Edit)
            setIsOpenDialog("Edit CheckPoint");
        else if (type === ActionType.Delete)
            setIsOpenDialog("Delete CheckPoint");

    };

    return (
        <>

            <div className="rounded-sm border border-stroke bg-white  pb-2.5 shadow-default  sm:px-7.5 xl:pb-1 ">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <TableHeader headers={["ID", 'Name', 'Location', "CODE", "Issue Type", 'Other']} />
                        <tbody>
                            {items?.map(function (item) {
                                return (<tr key={item.id}>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className="font-semibold text-black text-center">
                                            {item.id}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className="font-semibold text-black text-center">
                                            {item.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className="font-semibold text-black text-center">
                                            {item.address}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className="font-semibold text-black text-center">
                                            {item.qrCode}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className="font-semibold text-black text-center">
                                            {item.issueType?.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className="font-semibold text-black text-center">
                                            {item.isActive && <Badge variant={"success"} className="text-white">isActive</Badge>}
                                            {item.allowKeepOpen && <Badge>Allow Keep Open</Badge>}
                                            {item.reportIfMissing && <Badge>Report If Missing</Badge>}
                                            {item.requiredPhoto && <Badge>Required Photo</Badge>}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2 text-center">
                                        <TableActions link='/checkpoints' handleAction={handleSelection} Item={item} />
                                    </td>
                                </tr>)
                            })}

                        </tbody>
                    </table>

                </div>
                <div className="flex gap-3 mb-4">
                    <Modal
                        key={"delete"}
                        userPopup={true}
                        isOpen={openDialog === "Delete CheckPoint"}
                        onClose={() => { setIsOpenDialog(""); setCurrentItem(null) }}
                        className={'!bg-background !px-1'}
                    >
                        <div className="rounded-md bg-gray-50 p-4 md:p-6">
                            <p>Are you sure you want to delete?</p>
                            <div className="flex items-center justify-between mt-4">
                                <Button
                                    className="flext-1 bg-red-500 disabled:bg-gray-500"
                                    onClick={() => {
                                        onDelete(`/checkpoints/${currentItem?.id}`, currentItem, axios, toast, onDataChange);
                                        setIsOpenDialog("false");
                                        setCurrentItem(null);
                                    }}>
                                    Yes
                                </Button>
                                <Button className="flext-1" onClick={() => { setIsOpenDialog("false"); setCurrentItem(null) }}>No</Button>
                            </div>
                        </div>
                    </Modal>

                </div>
                <div className="flex gap-3 mb-4">
                    <Modal

                        key={"edit"}
                        isOpen={openDialog === "Edit CheckPoint"}
                        onClose={() => { setIsOpenDialog(""); setCurrentItem(null) }}
                        className={'!bg-background !px-1'}
                    >
                        <h5 className='text-2xl font-bold px-4'>{openDialog}</h5>
                        <CustomFormLayout url="/checkpoints" validationSchema={createCheckPointTypeSchema} 
                        item={currentItem??{}} redirectUrl="" showNewBtn={false} onSave={() => { 
                            setIsOpenDialog(""); setCurrentItem(null); onDataChange();
                         }} >
                            <CheckPointForm locationId={locationId} clientId={clientId} />
                        </CustomFormLayout>
                    </Modal>
                </div>
            </div>
        </>
    );
}
