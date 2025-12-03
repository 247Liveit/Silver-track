import * as React from "react"
import {
  ArrowUpCircleIcon,
  BanknoteIcon,
  BarChartIcon,
  FilesIcon,
  GemIcon,
  LayoutDashboardIcon,
  PhoneIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

// import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/layout/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/layout/nav-main"
import { NavUser } from "./nav-user"
import { useAuthHook } from "@/providers/authContext"
import { MobileIcon } from "@radix-ui/react-icons"
import { MapIcon } from "lucide-react"
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: UsersIcon,
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: BarChartIcon,
    },
    {
      title: "User Devices",
      url: "/dashboard/user-devices",
      icon: MobileIcon,
    },

    {
         title:"Gps Map",
         url:"/dashboard/gps-map",
         icon:MapIcon

    }
   
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/preferences",
      icon: SettingsIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const auth= useAuthHook();
  return (
    <Sidebar collapsible="offcanvas" {...props} className="">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">ACS Tracking</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={auth.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
