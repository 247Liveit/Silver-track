import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useAxiosAuth from '../axios/hooks/useAxiosAuth';
import { Location, LocationShift } from '@/types/pagesData';
import { LocationEmployeeSchedule } from '@/types/types';


const useGetLocationShifts = (page: number, key: string, id?: number): UseQueryResult<LocationShift[]> => {
    const axios = useAxiosAuth();

    return useQuery<LocationShift[]>({
        queryKey: [key, page],
        queryFn: async () => {
            const response = await axios.get(`/location-shifts/location/${id}`, {
                params: {
                    paginate: true,
                    page: page,
                }
            });

            const locations = response.data.data;
            return locations;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

const useGetOneLocationShift = (key: string, id?: number): UseQueryResult<LocationShift> => {
    const axios = useAxiosAuth();

    return useQuery<LocationShift>({
        queryKey: [key],
        queryFn: async () => {
            const response = await axios.get(`/location-shifts/${id}`);

            const shfitLocation = response.data.data;
            return shfitLocation;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};
const useGetLocationEmployeeSchedule = (key: string, id?: string|undefined,params?:any|undefined): UseQueryResult<LocationEmployeeSchedule> => {
    const axios = useAxiosAuth();

    return useQuery<LocationEmployeeSchedule>({
        queryKey: [key,params.startDate,params.endDate],
        queryFn: async () => {
            if (!id || id == "undefined" || id == "null") return null;
            if(id=="0" || !params.startDate || !params.endDate) return null;
            
            const response = await axios.get(`/employee-shifts/for-location/${id}`,{
                params:params
            });

            const shfitLocation = response.data.data;
            return shfitLocation;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};


export { useGetLocationShifts, useGetOneLocationShift ,useGetLocationEmployeeSchedule};
