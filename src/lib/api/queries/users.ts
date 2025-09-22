import { useQuery } from '@tanstack/react-query';
import useAxiosAuth from '../axios/hooks/useAxiosAuth';

const useGetUsers = (offset, pageLimit, country) => {
  
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ['students', offset, pageLimit, country],
    queryFn: async () =>{
      const roles=await axios.get('/roles')
      return roles.data;
    }
  });
};


export {useGetUsers}