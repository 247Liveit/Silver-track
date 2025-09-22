import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useAxiosAuth from '../axios/hooks/useAxiosAuth';
import { Pagination } from '@/types/CommonPageProp';
import { Backend_Public_URL } from "@/lib/constants/Constants";
import { Location } from '@/types/pagesData';

const useGetLocations = (page: number, key: string, id?: number): UseQueryResult<Location[]> => {
    const axios = useAxiosAuth();

    return useQuery<Location[]>({
        queryKey: [key, page],
        queryFn: async () => {
            const response = await axios.get(`/locations`, {
                params: {
                    paginate: true,
                    page: page,
                }
            });

            const locations = response.data.data.map((location: Location) => ({
                ...location,
                image: `${Backend_Public_URL}/public-shared/attachement/${encodeURI(location.image)}` || ''
            }));

            return locations;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};
const useGetOneLocation = (key: string, id?: number): UseQueryResult<Location> => {
    const axios = useAxiosAuth();

    return useQuery<Location>({
        queryKey: [key],
        queryFn: async () => {
            if (id == 0) return null;
            const response = await axios.get(`${key}`);

            const location = response.data.data;

            return { ...location, image: `${Backend_Public_URL}/public-shared/attachement/${encodeURI(location.image)}` || '' };
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
            if (id == 0) return [];
            const response = await axios.get(`/shared/${modelType}/${type}/${id}`);
            return response.data.data;
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

export { useGetLocations, useGetDetails, useGetOneLocation };
