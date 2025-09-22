import TableActions from "@/components/TableActions";
import TableHeader from "@/components/TableHeader";
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { useState } from "react";
import { Modal } from '@/components/ui/modal';
import { ItemType } from "@/types/CommonPageProp";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { Button } from "@/components/ui/button";
import { useModalHook } from "@/providers/modalContext";
import { User, UserGroup } from "@/types/types";
import { createUserGroupSchema, extraChargesSchema, UserGroupFormDataFormat } from "@/lib/validation/zodSchema";
import { onDelete } from "@/lib/api/axios/delete-item";
import { useToast } from "@/components/ui/use-toast";
import UserGroupForm from "../forms/UserGroupForm";
import { dateFromat } from "@/lib/utils";

export default function UserGroupsTable({ items, setItems }: { items: UserGroup[] | undefined, setItems: any }) {

    const [isEdit, setIsEdit] = useState(false);
    const { toast } = useToast()
    const { isOpen, setIsOpen } = useModalHook();
    const [currentItem, setCurrentItem] = useState<UserGroup | null>(items ? (items.length > 0 ? items[0] : null) : null);
    const [currentItemFull, setCurrentItemFull] = useState<UserGroup | null>(null);
    const [openDeleteDialog, setIsOpenDialog] = useState(false);
    const axios = useAxiosAuth();

    const handleSelection = function (selectedItem, type) {
        axios.get('/user-groups/'+selectedItem.id).then(res=>{
            console.log(res)
            setCurrentItemFull(res.data)
        }).catch(err=>{
            toast({
                title: "Something went wrong!",
                description: dateFromat(new Date()),
                variant: "destructive"
            })
        })
        setCurrentItem(prev => {
            return selectedItem
        });
        switch (type) {
            case 1: {
                setIsEdit(true);
                setIsOpen("edit");
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


    return (
        <div className="rounded-sm border border-stroke bg-white  pb-2.5 shadow-default  sm:px-7.5 xl:pb-1 ">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <TableHeader headers={["ID", 'Name']} />
                    <tbody>
                        {items?.map(function (item) {
                            return (<tr key={item.id}>
                                <td className="border-b border-[#eee] py-2 px-2   text-center">
                                    <h5 className="font-semibold text-black text-center">
                                        {item.id}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-2 px-2   text-center">
                                    <h5 className=" text-black">
                                        {item.name}
                                    </h5>
                                </td>
                               
                                <td className="border-b border-[#eee] py-2 px-2 text-center">
                                    <TableActions link='/user-groups' handleAction={handleSelection} Item={item} />
                                </td>
                            </tr>)
                        })}

                    </tbody>
                </table>

                <div className="flex gap-3 mb-4">
                    <Modal

                        key={"edit"}
                        isOpen={isOpen === 'edit' || isOpen === 'view'}
                        onClose={() => { setIsOpen("");setCurrentItemFull(null) }}
                        className={'!bg-background !px-1'}
                    >
                        <h5 className='text-2xl font-bold px-4'>{"Update User"}</h5>
                        {currentItemFull ?
                        <CustomFormLayout key={"formEditView"} item={currentItemFull} url='/user-groups'
                            redirectUrl='' edit={isEdit && isOpen == "edit"}
                            validationSchema={createUserGroupSchema}
                            dataFromatter={UserGroupFormDataFormat}
                            onSave={(userGroups: User) => {
                                setItems((prev: ItemType<User>) => {
                                    const newData = prev.data.map(item => {
                                        if (item.id === userGroups.id) {
                                            item = userGroups;
                                        }
                                        return item
                                    })

                                    return { ...prev, data: newData }

                                })
                                setIsOpen("")
                            }}>
                            <UserGroupForm />
                        </CustomFormLayout>
                        :
                        'Please Wait...'
}

                    </Modal>

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
                                        onDelete(`/user-groups/${currentItem?.id}`, currentItem, axios, toast, setItems);
                                        setIsOpenDialog(false);
                                    }}>
                                    Yes
                                </Button>
                                <Button className="flext-1" onClick={() => setIsOpenDialog(false)}>No</Button>
                            </div>
                        </div>
                    </Modal>

                </div>
            </div>

        </div>
    );
}
