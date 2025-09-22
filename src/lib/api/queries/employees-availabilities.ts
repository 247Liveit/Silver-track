import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useAxiosAuth from '../axios/hooks/useAxiosAuth';

import { Employee, EmployeeAvailability } from '@/types/pagesData';

const useGetEmployeeAvailabilities = (page: number, key: string, id?: number): UseQueryResult<EmployeeAvailability[]> => {
    const axios = useAxiosAuth();

    return useQuery<EmployeeAvailability[]>({
        queryKey: [key, page],
        queryFn: async () => {
            const response = await axios.get(`/employee-availabilities/employee/${id}`, {
                params: {
                    paginate: true,
                    page: page,
                }
            });

            return response.data;
            
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};





export {  useGetEmployeeAvailabilities };
