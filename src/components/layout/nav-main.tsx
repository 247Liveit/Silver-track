"use client"

import { ActivityIcon, ChevronRight, FileIcon, type LucideIcon } from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Link, LinkProps, useLocation, useNavigate } from "react-router-dom"
import { ForwardRefExoticComponent, ReactNode, useState } from "react"
import { Client } from "@/types/types"
import { pageTitles } from "@/lib/constants/URLS"
import { IconProps } from "@radix-ui/react-icons/dist/types"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Badge } from "../ui/badge"

type BaseNavItem = {
    title: string
    badge?: string
    icon?: React.ElementType,
    isActive?: boolean
}

type NavLink = BaseNavItem & {
    url: LinkProps['to'] | (string & {})
    items?: never
}

type NavCollapsible = BaseNavItem & {
    items: (BaseNavItem & { url: LinkProps['to'] | (string & {}) })[]
    url?: never
}

type NavItem = NavCollapsible | NavLink



export function NavMain({
    items,
    children
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon | ForwardRefExoticComponent<IconProps & React.SVGAttributes<SVGElement>> | undefined
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

    // const { data: clients, isFetched ,refetch} = useGetSingle<PaginationApiType<Client>>('/clients/paginate', {
    //     limit: 1000,
    //     page: 1,
    //     search:  dropSearch,
    //     clientId: selectedclientId ,
    //     sortBy: "id",
    //     sortOrder: "DESC",
    //     fields: "id,name",
    // }, []);

    // const setSelectedLocationAndEmployeeId = (newLocation) => {

    //     if (newLocation === null) {
    //         queryParams.delete('clientId');
    //     } else {
    //         queryParams.set('clientId', newLocation);
    //     }

    //     navigate({ search: queryParams.toString() });
    // };


    // const handleSearch = useCallback(
    //     debounce((searchTerm: string) => {
    //         setDropSearch(searchTerm);
    //     }, 300),
    //     []
    // );

    // useEffect(() => {
    //     refetch()
    // }, [dropSearch])

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                {/* <SidebarMenu>
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
                </SidebarMenu> */}
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} className={title == item.title ? "font-bold bg-white rounded-lg shadow-md" : ""}>
                            <SidebarMenuButton tooltip={item.title} onClick={() => {
                                navigate(item.url)
                            }}>
                                {item.icon && <item.icon />}
                                <span >{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}

                    <SidebarMenuItem>
                        <SidebarMenuCollapsible href="/dashboard/checkpoint-reports" item={{
                            title: "Reports",
                            items: [
                                { title: "Checkpoint Reports", badge: undefined, icon: FileIcon, url: "/dashboard/checkpoint-reports",isActive:title=="Checkpoint Reports" },
                                { title: "Daily Activity Report", badge: undefined, icon: ActivityIcon, url: "/dashboard/daily-activities-reports" },
                                { title: "Daily Report(Compact)", badge: undefined, icon: ActivityIcon, url: "/dashboard/daily-activities-reports-compact" },
                                { title: "User Shift Reports", badge: undefined, icon: FileIcon, url: "/dashboard/user-shift-reports", isActive: title == "User Shift Reports" },
                            ]
                        }} />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
function SidebarMenuCollapsible({
    item,
    href
}: {
    item: NavCollapsible
    href: string,
}) {
    const { setOpenMobile } = useSidebar()
    return (
        <Collapsible
            asChild
            className='group/collapsible'
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        {item.badge && <NavBadge>{item.badge}</NavBadge>}
                        <ChevronRight className='ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180' />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className='CollapsibleContent'>
                    <SidebarMenuSub>
                        {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={subItem.isActive}
                                >
                                    <Link to={subItem.url} onClick={() => setOpenMobile(false)}>
                                        {subItem.icon && <subItem.icon />}
                                        <span>{subItem.title}</span>
                                        {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    )
}


function checkIsActive(href: string, item: NavItem, mainNav = false) {
    return (
        href === item.url ||
        href.split('?')[0] === item.url ||
        !!item?.items?.filter((i) => i.url === href).length || // if child nav is active
        (mainNav &&
            href.split('/')[1] !== '' &&
            //@ts-ignore
            href.split('/')[1] === item?.url?.split('/')[1])
    )
}
function NavBadge({ children }: { children: ReactNode }) {
    return <Badge className='rounded-full px-1 py-0 text-xs'>{children}</Badge>
}