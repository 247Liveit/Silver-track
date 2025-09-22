"use client"

import {LogOutIcon,MoreVerticalIcon} from "lucide-react"
import {Avatar,AvatarFallback,} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { User } from "@/types/types"
import { useAuthHook } from "@/providers/authContext"
import { useRouter } from "@/routes/hooks"
import { useToast } from "../ui/use-toast"
import { dateFromat } from "@/lib/utils"

export function NavUser({user}: {user: User | null | undefined}) {
  const { isMobile } = useSidebar()
  const useAuth = useAuthHook();
  const router = useRouter();
  const { toast } = useToast();

  async function logout() {
    const tost = toast({
      title: "Please wait ...",
      itemID: "formSubmitWaiting",
    })
    try {
      useAuth.setAuthData(undefined, undefined);
      router.replace('/login')
    } catch (err: any) {
      if (err?.response?.status == 401) {
        useAuth.setAuthData(undefined, undefined);
        router.replace('/login')
      } else {
        tost.dismiss()
        toast({
          title: err.message,
          description: dateFromat(new Date()),
          variant: "destructive"
        })

      }
    } finally {
      localStorage.removeItem("hasSeenMessage")
    }

  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
