// 'use client'
// import React from "react";
// import {
//     Button,
//     Dropdown,
//     DropdownItem,
//     DropdownMenu,
//     DropdownTrigger,
//     Input,
//     Selection,
// } from "@nextui-org/react";
// import {SearchIcon} from "@/ui/dashboard/table/SearchIcon";
// import { getInitialVisableColumns} from "@/lib/constants/Constants";
// import {ChevronDownIcon} from "@/ui/dashboard/table/ChevronDownIcon";
// import {capitalize} from "@/lib/utils";
// import {PlusIcon} from "@/ui/dashboard/table/PlusIcon";
// import {useRouter} from "next/navigation";
// import {ColumnIndexType, getColumns} from "@/lib/constants/columnsAndData.data";
// import {useGlobalSearchContext} from "@/lib/context/useTableSearchFilterContext";
// import {ColumnType, TableSearchProps} from "@/types/table/table-types";

// export default function useTableSearchRowHook({totalItems,url,nextUrl,showAddBtn=true}: TableSearchProps) {

//     const router=useRouter();
//     const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(getInitialVisableColumns(`${url}`)));
//     const columns:ColumnType[]=getColumns(url as ColumnIndexType)

//     const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
//         setPageRowsPerPage(Number(e.target.value),1);
//     }, []);

//     const {setFilterValue , setPageRowsPerPage,onSearchChange,searchQuery}=useGlobalSearchContext();

//     const filterValue=searchQuery.search



//     const headerColumns = React.useMemo(() => {
//         if ([...visibleColumns].find((v)=>v=="all"))
//             return columns.filter((column) => column.uid!=="all");

//         return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
//     }, [visibleColumns,columns]);

//     const topContent = React.useMemo(() => {
//         return (
//             <div className="flex flex-col gap-4">
//                 <div className="flex justify-between gap-3 items-end">
//                     <Input
//                         isClearable
//                         classNames={{
//                             base: "w-full sm:max-w-[44%]",

//                         }}
//                         style={{border:"none"}}
//                         placeholder="Search"
//                         size="sm"
//                         startContent={<SearchIcon className="text-default-300"/>}
//                         value={filterValue as string}
//                         variant="bordered"
//                         onClear={() => setFilterValue(10,1,"")}
//                         onValueChange={onSearchChange}
//                     />
//                     <div className="flex gap-3">
//                         <Dropdown>
//                             <DropdownTrigger className="hidden sm:flex">
//                                 <Button
//                                     endContent={<ChevronDownIcon className="text-small"/>}
//                                     size="md"
//                                     variant="flat"
//                                 >
//                                     Columns
//                                 </Button>
//                             </DropdownTrigger>
//                             <DropdownMenu
//                                 disallowEmptySelection
//                                 aria-label="Table Columns"
//                                 closeOnSelect={false}
//                                 selectedKeys={visibleColumns}
//                                 selectionMode="multiple"
//                                 onSelectionChange={setVisibleColumns}
//                             >
//                                 {columns.map((column) => (
//                                     <DropdownItem key={column.uid} className="capitalize">
//                                         {capitalize(column.name)}
//                                     </DropdownItem>
//                                 ))}
//                             </DropdownMenu>
//                         </Dropdown>
//                         {showAddBtn!==false&&
//                         <Button
//                             className="bg-foreground text-background"
//                             endContent={<PlusIcon/>}
//                             size="md"
//                             onClick={e=>{router.push(nextUrl+'/create');e.currentTarget.innerText="Please wait";e.currentTarget.setAttribute('disabled',"disabled")}}>
//                             Add New
//                         </Button>
//                         }
//                     </div>
//                 </div>

//                 <div className="flex justify-between items-center">
//                     <span className="text-default-400 text-small">Total {totalItems}</span>
//                     <label className="flex items-center text-default-400 text-small">
//                         Rows per page:
//                         <select
//                             style={{border:"none"}}
//                             className="bg-transparent outline-none text-default-400 text-small"
//                             onChange={onRowsPerPageChange}
//                         >
//                             <option value="5">5</option>
//                             <option value="10">10</option>
//                             <option value="15">15</option>
//                         </select>
//                     </label>
//                 </div>
//             </div>
//         );
//     }, [
//         filterValue,columns,nextUrl,totalItems,visibleColumns
//     ]);


//     return {headerColumns, topContent}

// }