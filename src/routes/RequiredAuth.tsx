import { useAuthHook } from "@/providers/authContext"
import { useLocation, Outlet, Navigate } from 'react-router-dom';

const RequiredAuth=()=>{
    const auth=useAuthHook();
    const location=useLocation();
return (
    (auth?.user && auth?.user?.verified)
    ? <Outlet/>
    : <Navigate to="/login" state={{from:location}} replace/>
);

}
export default RequiredAuth;