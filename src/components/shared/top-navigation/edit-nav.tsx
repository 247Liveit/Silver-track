import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ProtectedDropdownMenuItem } from '@/components/ui/protected-components';
import { Resource } from '@/rbac/aceess-rules';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditNav() {

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const selectedLocationId = queryParams.get('locationId') ? queryParams.get('locationId') : null;
  const selectedEmplyeeId = queryParams.get('employeeId') ? queryParams.get('employeeId') : null;
  const selectedLocationShiftId = queryParams.get('locationShiftId') ? queryParams.get('locationShiftId') : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-14 w-14 rounded-full">
          Edit
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <ProtectedDropdownMenuItem
            accessedResource={Resource.Employees} onClick={(e) => {
              if (!selectedEmplyeeId) {
                toast.warning("Please Select An Employee")
              } else {
                navigate(`employees/${selectedEmplyeeId}`)
              }
            }}>
            Person
          </ProtectedDropdownMenuItem>
          <ProtectedDropdownMenuItem
            accessedResource={Resource.Locations}
            onClick={(e) => {
              if (!selectedLocationId) {
                toast.warning("Please Select A Location")
              } else {
                navigate(`locations/${selectedLocationId}`)
              }
            }}>
            Location
          </ProtectedDropdownMenuItem>
          <ProtectedDropdownMenuItem
            accessedResource={Resource.LocationShift}
            onClick={() => {
              if (!selectedLocationShiftId||!selectedLocationId) {
                toast.warning("Please Select A Location Shift")
              } else {
                navigate(`locations/${selectedLocationId}${selectedLocationShiftId ? "?locationShiftId=" + selectedLocationShiftId : ""}`)
              }
            }}
          >
            Work Shift
          </ProtectedDropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



