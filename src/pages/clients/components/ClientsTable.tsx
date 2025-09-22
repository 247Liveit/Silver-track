import TableActions from "@/components/TableActions";
import TableHeader from "@/components/TableHeader";
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { useCallback, useState } from "react";

import { Modal } from '@/components/ui/modal';
import { ItemType } from "@/types/CommonPageProp";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { Button } from "@/components/ui/button";
import { useModalHook } from "@/providers/modalContext";
import { Client, User } from "@/types/types";
import { onDelete } from "@/lib/api/axios/delete-item";
import { clientSchema } from "@/lib/validation/zodSchema";
import ClientsForm from "./ClientForm";
import Pagination from "@/components/Pagination";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

export default function ClientsTable({ items: data, setItems }: { items: PaginationApiType<Client> | undefined, setItems: any }) {
    const [searchParams,] = useSearchParams();
    const search = searchParams.get('search') || '';

    const [isEdit, setIsEdit] = useState(false);
    const { isOpen, setIsOpen } = useModalHook();
    const [currentItem, setCurrentItem] = useState<Client | null>(data ? (data.items?.length > 0 ? data[0] : null) : null);
    const [openDeleteDialog, setIsOpenDialog] = useState(false);
    const axios = useAxiosAuth();
    const { toast } = useToast()
    const handleSelection = function (selectedItem, type) {
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
        <>

            <div className="rounded-sm border border-stroke bg-white  pb-2.5 shadow-default  sm:px-7.5 xl:pb-1 ">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <TableHeader headers={["ID", 'Name', 'City', "Phone", "Balance"]} />
                        <tbody>
                            {data?.items?.map(function (item) {
                                return (<tr key={item.id}>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className="font-semibold text-black text-center">
                                            {item.id} {(item.zip =="00" && item.phone =="000000") ?<Badge variant="destructive">Needs an Update</Badge>:""}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className=" text-black">
                                            {item.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className=" text-black">
                                            {item.city}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className=" text-black">
                                            {item.phone}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className=" text-black">
                                            ${item.balance}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2 text-center">
                                        <TableActions link='/clients' handleAction={handleSelection} Item={item} />
                                    </td>
                                </tr>)
                            })}

                        </tbody>
                    </table>
                    {data?.links &&

                        <Pagination meta={data.meta} links={data.links} url={`/dashboard/clients?${search ? "search=" + search + "&" : ""}`} />
                    }
                    <div className="flex gap-3 mb-4">
                        <Modal
                            key={"edit"}
                            isOpen={isOpen === 'edit' || isOpen === 'view'}
                            onClose={() => { setIsOpen("") }}
                            className={'!bg-background !px-1 w-full lg:w-[85%]'}
                        >
                            <h5 className='text-2xl font-bold px-4'>{"Update Client"}</h5>

                            <CustomFormLayout key={"formEditView"} item={{...currentItem,termId:currentItem?.termId+""}} url='/clients'
                                redirectUrl='' edit={isEdit && isOpen == "edit"} showNewBtn={false}
                                validationSchema={clientSchema}
                                onSave={(clients: User) => {
                                    setItems((prev: ItemType<User>) => {
                                        const newData = prev.data.map(item => {
                                            if (item.id === clients.id) {
                                                item = clients;
                                            }
                                            return item
                                        })

                                        return { ...prev, data: newData }

                                    })
                                    setIsOpen("")
                                }}>
                                <ClientsForm />
                            </CustomFormLayout>


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
                                <p>Are you sure you want to <span className="font-bold">de-activate?</span></p>
                                <div className="flex items-center justify-between mt-4">
                                    <Button
                                        className="flext-1 bg-red-500 disabled:bg-gray-500"
                                        onClick={() => {

                                            onDelete(`/clients/${currentItem?.id}`, currentItem, axios, toast, setItems);
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
        </>
    );
}
