"use client"

import { type LucideIcon } from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import AdvanceSelectSimple from "@/components/shared/form/inputs/AdvanceSelectSimple"
import { useLocation, useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { Client } from "@/types/types"
import { useGetSingle } from "@/lib/api/queries/generic"
import { PaginationApiType } from "@/types/table/PaginationTypes"
import { debounce } from "@/lib/utils"
import { pageTitles } from "@/lib/constants/URLS"

export function NavMain({
    items,
    children
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
    }[],
    children?: React.ReactNode
}) {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedClient, setSelectedLocation] = useState<Client | null | undefined>(null);
    const [dropSearch, setDropSearch] = useState<string>("");
    const queryParams = new URLSearchParams(location.search);
    const selectedclientId = queryParams.get('clientId') || "";


  
    // Get the title based on the current route
    const title = pageTitles[location.pathname] || 'Default Title';

    const { data: clients, isFetched ,refetch} = useGetSingle<PaginationApiType<Client>>('/clients/paginate', {
        limit: 1000,
        page: 1,
        search:  dropSearch,
        clientId: selectedclientId ,
        sortBy: "id",
        sortOrder: "DESC",
        fields: "id,name",
    }, []);

    const setSelectedLocationAndEmployeeId = (newLocation) => {

        if (newLocation === null) {
            queryParams.delete('clientId');
        } else {
            queryParams.set('clientId', newLocation);
        }
        
        navigate({ search: queryParams.toString() });
    };


    const handleSearch = useCallback(
        debounce((searchTerm: string) => {
            setDropSearch(searchTerm);
        }, 300),
        []
    );

    useEffect(() => {
        refetch()
    }, [dropSearch])

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className=" w-full">
                        <AdvanceSelectSimple className='dark:text-black mt-4' title="Client" name="locaiton"
                            disabled={false}
                            value={selectedClient ? selectedClient.id : ""}
                            options={clients ? clients.items.map(item => { return { label: item.name, value: item.id } }) : []}
                            selected={(selectedclientId as string) ?? "1"}
                            placeholder='Please Select'
                            onTypeing={handleSearch}
                            icon={<></>} error={""} type='single'
                            onChange={e => {
                                setSelectedLocationAndEmployeeId(e.target.value);
                                const location = clients ? clients.items.find(d => d.id == +e.target.value) : null;
                                setSelectedLocation(() => { return location });
                            }}
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} className={title==item.title?"font-bold bg-white rounded-lg shadow-md":""}>
                            <SidebarMenuButton tooltip={item.title} onClick={() => {
                                navigate(item.url)
                            }}>
                                {item.icon && <item.icon  />}
                                <span >{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
