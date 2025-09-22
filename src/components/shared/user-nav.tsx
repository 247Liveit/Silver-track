import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuthHook } from '@/providers/authContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from '@/routes/hooks';
import { toast } from 'react-toastify';
// import useAxiosAuth from '@/lib/api/axios/hooks/useAxiosAuth';

export default function UserNav() {
  const useAuth = useAuthHook();
  const router = useRouter();
  // const axios = useAxiosAuth();

  async function logout() {
    toast.info("Please wait...",{toastId:"logout-info"})
    try {
      // await axios.post("/auth/logout");
      useAuth.setAuthData(undefined, undefined);
      router.replace('/login')
    } catch (err: any) {
      if(err?.response?.status==401){
        useAuth.setAuthData(undefined, undefined);
        router.replace('/login')
      }else{
      toast.dismiss("logout-info")
      toast.error(err.message);
      }
    }finally{
      localStorage.removeItem("hasSeenMessage")
    }

  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-12 w-14 rounded-full">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={
                'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png'
              }
              alt={''}
            />
            <AvatarFallback>hello</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{useAuth.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
             {useAuth.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
