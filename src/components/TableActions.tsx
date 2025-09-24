import { Action } from "@/rbac/aceess-rules";
import useAccessControl from "@/rbac/use-access-control";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type TableActionsProps = {
    link?: string;
    showEdit?: boolean;
    handleAction: (event: any, type: number) => void;
    Item: any;
    dontShowDeleteBtn?: boolean;
    viewShowBtn?: boolean;
    editLink?: boolean;
    generateLink?: boolean;
    children?: React.ReactNode;
};

export default function TableActions({
    link,
    showEdit = true,
    handleAction,
    Item,
    dontShowDeleteBtn: viewEditOnly = false,
    viewShowBtn = false,
    editLink = false,
    generateLink = false,
    children,
}: TableActionsProps) {
    const handleClick = function (event: any, type: number) {
        handleAction(event, type);
    };
    const { isAllowed, getResourceByUrl } = useAccessControl();

    const AllowedDelete = link ? isAllowed(Action.Delete, getResourceByUrl(link)) : true;
    const AllowedEdit = link ? isAllowed(Action.Update, getResourceByUrl(link)) : true;
    return (
        <div className="flex items-center space-x-3.5 text-center justify-center">
            {viewShowBtn && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button className="hover:bg-gray-200 hover:rounded-2xl ml-2 p-1">
                            <EyeIcon
                                className="h-5 w-5 text-blue-500"
                                onClick={(event) => handleClick(Item, 2)}
                            />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>View</TooltipContent>
                </Tooltip>
            )}

            {(showEdit&&AllowedEdit) && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button className="hover:bg-gray-200 hover:rounded-2xl ml-2 p-1">
                            <PencilIcon
                                className="h-5 w-5 text-amber-500"
                                onClick={(event) => handleClick(Item, 1)}
                            />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                </Tooltip>
            )}

            {!viewEditOnly && AllowedDelete && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            className="hover:bg-gray-200 hover:rounded-2xl ml-2 p-1"
                            onClick={() => handleAction(Item, 3)}
                        >
                            <TrashIcon className="h-5 w-5 text-red-500" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                </Tooltip>
            )}

            {children}
        </div>
    );
}