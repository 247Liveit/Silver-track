import { Button } from '@/components/ui/button';
import { useAuthHook } from '@/providers/authContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from '@/routes/hooks';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Resource } from '@/rbac/aceess-rules';
import { ProtectedDropdownMenuItem } from '@/components/ui/protected-components';

export default function FileNav() {
  const useAuth = useAuthHook();
  const router = useRouter();



  async function logout() {
    toast.info("Please wait...", { toastId: "logout-info" })
    try {
      // await axios.post("/auth/logout");
      useAuth.setAuthData(undefined, undefined);
      router.replace('/login')
    } catch (err: any) {
      if (err?.response?.status == 401) {
        useAuth.setAuthData(undefined, undefined);
        router.replace('/login')
      } else {
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
        <Button variant="ghost" className="relative h-14 w-14 rounded-full">
          File
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <ControlItems />
        <DropdownMenuItem onClick={logout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ControlItems() {

  const navigate = useNavigate();
  return <>
    <DropdownMenuGroup>
      <ProtectedDropdownMenuItem accessedResource={Resource.Users} onClick={(e) => {
        navigate(`users`)
      }}>
        Users
      </ProtectedDropdownMenuItem>
      <ProtectedDropdownMenuItem accessedResource={Resource.Clients} onClick={(e) => {
        navigate(`clients`)
      }}>
        Clients
      </ProtectedDropdownMenuItem>
      <ProtectedDropdownMenuItem accessedResource={Resource.Preferences} onClick={(e) => {
        navigate(`preferences`)
      }}>
        Preference
      </ProtectedDropdownMenuItem>
      <ProtectedDropdownMenuItem accessedResource={Resource.Shared} onClick={(e) => {
        navigate(`archive`)
      }}>
        Archive
      </ProtectedDropdownMenuItem>

    </DropdownMenuGroup>
    <DropdownMenuSeparator /></>
}
