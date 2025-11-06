import TableActions from "@/components/TableActions";
import TableHeader from "@/components/TableHeader";
import { useState } from "react";
import { Modal } from '@/components/ui/modal';
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { useModalHook } from "@/providers/modalContext";
import { Client } from "@/types/types";
import Pagination from "@/components/Pagination";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BuildingIcon } from "lucide-react";
import ClientLocations from "./ClientLocations";

export default function ClientsTable({ items: data, setItems }: { items: PaginationApiType<Client> | undefined, setItems: any }) {
    const [searchParams,] = useSearchParams();
    const search = searchParams.get('search') || '';

    const { isOpen, setIsOpen } = useModalHook();
    const [currentItem, setCurrentItem] = useState<Client | null>(data ? (data.items?.length > 0 ? data[0] : null) : null);
    const axios = useAxiosAuth();
    const { toast } = useToast()
    const handleSelection = function (selectedItem, type) {
        setCurrentItem(prev => {
            return selectedItem
        });
        setIsOpen(type);

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
                                            {item.id} {(item.zip == "00" && item.phone == "000000") ? <Badge variant="destructive">Needs an Update</Badge> : ""}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2 text-center">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    className="text-black cursor-pointer hover:text-blue-600  transition-colors "
                                                    onClick={() => handleSelection(item, 'showLocaitons')}
                                                >
                                                    {item.name}
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent 
                                                
                                                className="w-32 text-center px-0">
                                                <p>View Locations</p>
                                            </TooltipContent>
                                        </Tooltip>
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
                                        <TableActions link='/clients' handleAction={handleSelection} Item={item} showEdit={false} dontShowDeleteBtn={true} >
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="hover:bg-gray-200 hover:rounded-2xl ml-2 p-1"
                                                        onClick={() => handleSelection(item, 'showLocaitons')}
                                                    >
                                                        <BuildingIcon className="h-5 w-5 text-orange-500" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>Locations</TooltipContent>
                                            </Tooltip>
                                        </TableActions>
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
                            userPopup={true}
                            key={"showLocaitons"}
                            isOpen={isOpen === 'showLocaitons'}
                            onClose={() => { setIsOpen("") }}
                            className={'!bg-background !px-1 w-full lg:w-[85%]'}>
                            <h5 className='text-2xl font-bold px-4'>{"Client Locations"}</h5>


                            <ClientLocations client={currentItem} />

                        </Modal>

                    </div>

                </div>

            </div>
        </>
    );
}
