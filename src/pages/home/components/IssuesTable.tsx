import TableHeader from "@/components/TableHeader";
import { useState } from "react";
import { useModalHook } from "@/providers/modalContext";
import Pagination from "@/components/Pagination";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { useSearchParams } from "react-router-dom";
import { Issue } from "@/types/pagesData";
import { getUTCDateTime } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import IssueInfo from "./IssueInfo";

export default function IssuesTable({ items: data, setItems }: { items: PaginationApiType<Issue> | undefined, setItems: any }) {
    const [searchParams,] = useSearchParams();
    const search = searchParams.get('search') || '';

    const [ isOpen, setIsOpen ] = useState("none");
    const [currentItem, setCurrentItem] = useState<Issue | null>(data ? (data.items?.length > 0 ? data[0] : null) : null);
    const handleSelection = function (selectedItem, type) {
        setCurrentItem(prev => {
            return selectedItem});
        setIsOpen(type);
    };
    return (
        <>

            <div className="w-full rounded-sm border border-stroke bg-white  pb-2.5 shadow-default  sm:px-7.5 xl:pb-1 mt-3">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <TableHeader headers={["ID", 'Client', 'Location', "Issue", "Create at", "Create By", "Level", "Assigned To"]} withActions={false} />
                        <tbody>
                            {data?.items?.map(function (item) {
                                return (<tr key={item.id} className="cursor-pointer" onClick={() => { handleSelection(item, "issueReport") }}>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className="font-semibold text-black text-center">
                                            {item.id}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className=" text-black">
                                            {item.client?.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className=" text-black">
                                            {item.location?.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2 bg-green-500  text-center">
                                        <h5 className=" text-black ">
                                            {item.issueType?.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className=" text-black">
                                            {item.created_at ? getUTCDateTime(new Date(item.created_at)).substring(16, -1) : ''}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className=" text-black">
                                            {item.user?.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2   text-center">
                                        <h5 className=" text-black">
                                            {item.issueType?.level}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 px-2  bg-gray-500 text-center">
                                        <h5 className=" text-black">
                                            {item.assigendTo?.name}
                                        </h5>
                                    </td>
                                    {/* <td className="border-b border-[#eee] py-2 px-2 text-center">
                                        <TableActions link='/clients' handleAction={handleSelection} Item={item} showEdit={false} dontShowDeleteBtn={true} >
                                           
                                        </TableActions>
                                    </td> */}
                                </tr>)
                            })}

                        </tbody>
                    </table>
                    {data?.links &&

                        <Pagination meta={data.meta} links={data.links} url={`/dashboard/clients?${search ? "search=" + search + "&" : ""}`} />
                    }

                </div>
                <div className="flex gap-3 mb-4">
                    <Modal
                        userPopup={true}
                        key={"IssueReport"}
                        isOpen={isOpen === 'issueReport'}
                        onClose={() => { setIsOpen("") }}
                        className={'!bg-background !px-1 mt-0 pt-0 w-full lg:w-[85%]'}>
                        <header className="flex items-center justify-between border-b p-4">
                            <h5 className='text-2xl font-bold px-4'>{"Issue Type "} <span className="text-blue-500">{currentItem?.issueType?.name}</span></h5>
                            <h5 className='text-2xl font-bold px-4'>{"Issue # "} <span className="text-blue-500">{currentItem?.id}</span></h5>
                        </header>
                        <IssueInfo issue={currentItem} />
                    </Modal>

                </div>
            </div>
        </>
    );
}
