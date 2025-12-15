import TableHeader from "@/components/TableHeader";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Issue } from "@/types/pagesData";
import { getUTCDateTime } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import IssueInfo from "./IssueInfo";
import { MapIcon } from "lucide-react";
import TableActions from "@/components/TableActions";
import { Button } from "@/components/ui/button";
import { onDelete } from "@/lib/api/axios/delete-item";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { issueSchema } from "@/lib/validation/zodSchema";
import IssueForm from "./forms/IssueForm";
import { Badge } from "@/components/ui/badge";
export default function IssuesTable({ items: data, setItems }: { items: PaginationApiType<Issue> | undefined, setItems: any }) {
    const [isEdit, setIsEdit] = useState(false);
    const [searchParams,] = useSearchParams();
    const search = searchParams.get('search') || '';
    const { toast } = useToast()
    const navigate = useNavigate();
    const axios = useAxiosAuth();
    const [isOpen, setIsOpen] = useState("none");
    const [currentItem, setCurrentItem] = useState<Issue | null>(data ? (data.items?.length > 0 ? data[0] : null) : null);
    const [openDeleteDialog, setIsOpenDialog] = useState(false);


   
    const handleSelection = function (selectedItem: Issue, type: number) { 
        setCurrentItem(selectedItem);
   
        switch (type) {
            case 1: 
                setIsEdit(true);
                setIsOpen("edit");
                break;
            case 2: 
                setIsEdit(false);
                setIsOpen("issueReport");
                break;
            case 3: 
                setIsOpenDialog(true);
                break;
        }
    };


    const handleMapNavigation = (issue: Issue, event: React.MouseEvent) => {
        event.stopPropagation();
        navigate('/dashboard/gps-map', {
            state: {
                selectedIssue: issue,
                clientId: issue.client?.id,
                locationId: issue.location?.id
            }
        });
    };

    return (
        <>
            <div className="w-full rounded-sm border border-stroke bg-white pb-2.5 shadow-default sm:px-7.5 xl:pb-1 mt-3">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <TableHeader
                            headers={["ID", 'Client', 'Location', "Issue", "Create at", "Create By", "Level", "Map", "Assigned To","Actions"]}
                            withActions={false}
                        />
                        <tbody>
                            {data?.items?.map(function (item) {
                                return (
                                    <tr
                                        key={item.id}
                                        className="cursor-pointer"
                             
                                    >
                                   
                                        <td className="border-b border-[#eee] py-2 px-2 text-center">
                                            <h5 className="font-semibold text-black text-center">
                                                {item.id}{(item.status == "Open") ? <Badge variant="destructive">Needs an Update</Badge> : ""}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-2 px-2 text-center">
                                            <h5 className="text-black">
                                                {item.client?.name}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-2 px-2 text-center">
                                            <h5 className="text-black">
                                                {item.location?.name}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-2 px-2 bg-green-500 text-center">
                                            <h5 className="text-black">
                                                {item.issueType?.name}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-2 px-2 text-center">
                                            <h5 className="text-black">
                                                {item.created_at ? getUTCDateTime(new Date(item.created_at)).substring(16, -1) : ''}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-2 px-2 text-center">
                                            <h5 className="text-black">
                                                {item.user?.name}
                                            </h5>
                                        </td>
                                        
                                        <td className="border-b border-[#eee] py-2 px-2 text-center">
                                            <h5 className="text-black">
                                                {item.issueType?.level}
                                            </h5>
                                        </td>
                                        {/* Map Icon Column - Centered */}
                                        <td className="border-b border-[#eee] py-2 px-2 text-center">
                                            <div className="flex justify-center items-center">
                                                <button
                                                    onClick={(e) => handleMapNavigation(item, e)}
                                                    className="hover:bg-blue-100 p-1 rounded transition-colors"
                                                    title="View on map"
                                                >
                                                    <MapIcon className="w-5 h-5 text-blue-600" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="border-b border-[#eee] py-2 px-2 text-center">
                                            <h5 className="text-black">
                                                {item.assigendTo?.name}
                                            </h5>
                                        </td>
                                            
                                        <td className="border-b border-[#eee] py-2 px-2 text-center">
                                            <TableActions
                                                link='/issues'
                                                handleAction={handleSelection}
                                                Item={item}
                                                viewShowBtn={true}
                                                 showEdit={item.status !== 'Closed'} 
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {data?.links &&
                        <Pagination meta={data.meta} links={data.links} url={`/dashboard/?${search ? "search=" + search + "&" : ""}`} />
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


                <div className="flex gap-3 mb-4">
              <Modal
                    key="edit"
                    isOpen={isOpen === 'edit'}
                    onClose={() => {
                        setIsOpen("");
                        setCurrentItem(null);
                    }}
                    className="!bg-background !px-1"
                >
                    <h5 className='text-2xl font-bold px-4 mb-4'>Update Issue</h5> 
                    {currentItem ? (
                        <CustomFormLayout
                           key={`edit-${currentItem?.id}`}
                            item={currentItem}
                            url='/issues'
                            redirectUrl=''
                            edit={isEdit && isOpen == "edit"}
                            validationSchema={issueSchema}
                            onSave={(updatedIssue: Issue) => {
                                setItems((prev: PaginationApiType<Issue>) => {  
                                    const newItems = prev.items.map(item => {
                                        if (item.id === updatedIssue.id) {
                                            return updatedIssue;
                                        }
                                        return item;
                                    });
                                    return { ...prev, items: newItems };
                                });
                                setIsOpen("");
                            }}
                        >
                            <IssueForm issue={currentItem} />  
                        </CustomFormLayout>
                    ) : (
                        <p className="text-center py-4">Please Wait...</p>
                    )}
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
                                        onDelete(`/issues/${currentItem?.id}`, currentItem, axios, toast, setItems);
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
        </>
    );
}