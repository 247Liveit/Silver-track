import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useAxiosAuth from '../axios/hooks/useAxiosAuth';
import { Backend_Public_URL } from "@/lib/constants/Constants";
import { Employee } from '@/types/pagesData';

const useGetEmployees = (page: number, key: string, params: any): UseQueryResult<Employee[]> => {
    const axios = useAxiosAuth();

    return useQuery<Employee[]>({
        queryKey: [key, page],
        queryFn: async () => {

            const response = await axios.get(`/employees`, {
                params: params
            });

            const locations = response.data.data.map((employee: Employee) => ({
                ...employee,
                photo: employee.photo ? `${Backend_Public_URL}/public-shared/attachement/${encodeURI(employee.photo)}` || '' : null,
                name: employee.firstName ? employee.firstName + ' ' + employee.lastName : employee.shortName,
            }));

            return locations;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

const useGetDetails = (key: string, type: string, modelType: string, id: number): UseQueryResult<any[]> => {

    const axios = useAxiosAuth();

    return useQuery<any[]>({
        queryKey: [key],
        queryFn: async () => {
            const response = await axios.get(`/shared/${modelType}/${type}/${id}`);
            return response.data.data;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

const useGetOneEmployee = (key: string, id?: number): UseQueryResult<Employee> => {
    const axios = useAxiosAuth();

    return useQuery<Employee>({
        queryKey: [key],
        queryFn: async () => {
            if (id == 0) return null;
            const response = await axios.get(`/employees/${id}`);

            const employee = response.data.data;

            return {
                ...employee,
                photo: employee.photo ? `${Backend_Public_URL}/public-shared/attachement/${encodeURI(employee.photo)}` || '' : null,
                name: employee.firstName ? employee.firstName + ' ' + employee.lastName : employee.shortName,
            };
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};



// const useGetCites = (page: number, key: string): UseQueryResult<{ cities: Pagination<City> }> => {
//     const axios = useAxiosAuth();

//     return useQuery<{ cities: Pagination<City> }>({
//         queryKey: [key, page],
//         queryFn: async () => {
//             const response = await axios.get('/cities', {
//                 params: {
//                     paginate: true,
//                     page: page,
//                 }
//             });
//             const cities = response.data.data;
//             cities.data = cities.data.map((city: City) => ({
//                 ...city,
//                 image: Backend_Public_URL + 'storage/' + city.image || ''
//             }));
//             console.log(cities);

//             return { cities };
//         }
//     });
// };

export { useGetEmployees, useGetDetails, useGetOneEmployee };
