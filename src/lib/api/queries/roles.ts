import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useAxiosAuth from '../axios/hooks/useAxiosAuth';
import { PermissionWithParent, Role } from '@/types/roles';
import { Pagination } from '@/types/CommonPageProp';

const useGetRoles = (page,key) :UseQueryResult<{roles:Pagination<Role>,permissions:PermissionWithParent[]}>=> {
  const axios = useAxiosAuth();
  
  return useQuery<{roles:Pagination<Role>,permissions:PermissionWithParent[]}>({
    queryKey: [key, page],
    queryFn: async () =>{
      const roles=await axios.get('/roles-with-permissions?page='+page)
      return roles.data.data;
    }
  });
}; 


export {useGetRoles}