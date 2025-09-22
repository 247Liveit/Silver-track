// 'use client'
// import React from 'react'
// import {
//     Button,
//     Chip,
//     Dropdown,
//     DropdownItem,
//     DropdownMenu,
//     DropdownTrigger,
//     User as UserComponent
// } from "@nextui-org/react";
// import {VerticalDotsIcon} from "@/ui/dashboard/table/VerticalDotsIcon";
// import {useRouter} from "next/navigation";
// import {toast} from "react-toastify";
// import axios from "@/lib/hooks/axios/axios";
// import {AxiosRequestConfig} from "axios";
// import useAxiosHeadersUrl from "@/lib/hooks/axios/hooks/useAxiosHeadersUrl";
// import Link from "next/link";
// import {Backend_URL} from "@/lib/constants/Constants";


// export default function useTableCell(url: string,nextUrl:string, setData: (d: any) => void) {
//     const router = useRouter();
//     const [api_url, headers] = useAxiosHeadersUrl(url);
//     const handleDelete = (id: string) => {

//         toast.loading('Waiting...', {
//             toastId: "loading-delete" + url,
//         });

//         axios.delete(api_url + `/${id}` as string, headers as AxiosRequestConfig)
//             .then(res => {
//                 toast.success('Successfully Deleted!',
//                     {
//                         toastId: "delete" + url,
//                     });
//                 toast.dismiss("loading-delete" + url)
//                 setData((d: any) => {
//                     return {...d, items: d.items.filter((e: any) => e.id != id)};
//                 })
//             }).catch(e => {
//             toast.error(e.response.data.message,
//                 {
//                     position: 'bottom-center',
//                     toastId: "delete-error" + url,

//                 });
//             toast.dismiss("loading-delete" + url)
//         })
//     }

//     const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
//         const cellValue = item[columnKey];

//         switch (columnKey) {
//             case "name":
//                 return (
//                     <UserComponent
//                         avatarProps={{radius: "full", size: "sm", src: item.imageUrl,className:`${!item.roleId?'hidden':''} `}}
//                         classNames={{
//                             description: "text-default-500",
//                         }}
//                         description={item.email}
//                         name={cellValue}
//                     >
//                         {item.email}
//                     </UserComponent>
//                 );
//             case "file":
//                 return (
//                     <Link
//                         target="_blank"
//                         className="text-cyan-500"
//                         href={Backend_URL+"/"+cellValue}
//                     >
//                         {item.title?item.title:item.name}
//                     </Link>
//                 );
//             case "roleName":
//                 return (
//                     <div className="flex flex-col">
//                         <p className="text-bold text-small capitalize">{cellValue}</p>
//                         <p className="text-bold text-tiny capitalize text-default-500">{item.roleName}</p>
//                     </div>
//                 );
//             case "isActive":
//                 return (
//                     <Chip
//                         className="capitalize border-none gap-1 text-default-600"
//                         color={item.isActive ? 'success' : 'danger'}
//                         size="sm"
//                         variant="dot"
//                     >
//                         {item.isActive ? "Active" : "Not Active"}
//                     </Chip>
//                 );
//             case "featured":
//                 return (
//                     <div className="capitalize border-none gap-1 text-default-600">
//                         {item.featured==1 ? "Yes" : "No"}
//                     </div>
//                 );
//             case "actions":
//                 return (
//                     <div className="relative flex justify-end items-center gap-2">
//                         <Dropdown aria-label="col-menu" className="bg-background border-1 border-default-200">
//                             <DropdownTrigger>
//                                 <Button isIconOnly radius="full" size="sm" variant="light">
//                                     <VerticalDotsIcon className="text-default-400"/>
//                                 </Button>
//                             </DropdownTrigger>
//                             <DropdownMenu aria-labelledby="col-menu">
//                                 {!(['/contact-us','/request-quotes'].includes(url)) ?
//                                 <DropdownItem ><Link className='block w-full' href={`${nextUrl}/${item.id}/show`}>View</Link></DropdownItem>
//                                 :<DropdownItem></DropdownItem>
//                                 }
//                                 {!['/contact-us','/request-quotes'].includes(url)?
//                                 <DropdownItem ><Link className='block w-full' href={`${nextUrl}/${item.id}/edit`}>Edit</Link></DropdownItem>
//                                     :<DropdownItem></DropdownItem>
//                                 }
//                                 <DropdownItem onClick={() => handleDelete(`${item.id}`)}>Delete</DropdownItem>
//                             </DropdownMenu>
//                         </Dropdown>
//                     </div>
//                 );
//             default:
//                 return cellValue;
//         }
//     }, []);


//     return {renderCell}
// }
