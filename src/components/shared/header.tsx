import Heading from './heading';
import UserNav from './user-nav';
import { ModeToggle } from './theme-toggle';
import FileNav from './top-navigation/file-nav';
import EditNav from './top-navigation/edit-nav';
import { ProtectedDisplayNav } from './top-navigation/display-nav';
import { usePathname } from '@/routes/hooks';
import { ReportNavProtected } from './top-navigation/report-nav';
import { Resource } from '@/rbac/aceess-rules';
import { useAuthHook } from '@/providers/authContext';

export default function Header() {
  const path = usePathname();
  const auth = useAuthHook();
  return (
    <div className="flex flex-1 items-center  bg-secondary px-4">
      <Heading title={"Tracking ACS"} />
      <div className="ml-4 flex items-center  md:ml-6">

        <UserNav />
        <ModeToggle />
        {auth?.user?.role != "dispatcher" &&
          <>
            {["/dashboard", "/dashboard/"].includes(path) &&
              <div className='xs:hidden'>
                <FileNav />
                <EditNav />
                <ProtectedDisplayNav accessedResource={Resource.EmployeeShift} />
                <ReportNavProtected accessedResource={Resource.Reports} />
              </div>
            }
          </>
        }
        <h2 className="text-xl font-bold tracking-tight text-primary sm:text-3xl sm:hidden">
          ACS
        </h2>
      </div>
    </div>
  );
}
