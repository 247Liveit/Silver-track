import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useAxiosAuth from '../axios/hooks/useAxiosAuth';

import { ShiftScheduleTable } from '@/types/pagesData';

const useShiftsScheduleTable = (key: string, id: number, startDate: string, endDate: string): UseQueryResult<ShiftScheduleTable[]> => {
    const axios = useAxiosAuth();

    return useQuery<ShiftScheduleTable[]>({
        queryKey: [key, startDate, endDate],
        queryFn: async () => {
            const response = await axios.get(`/employee-shifts/schedule-table/${id}`, {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                }
            });

            return response.data.data;

        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};


const useEmployeeShiftsScheduleTable = (key: string, startDate: string, endDate: string): UseQueryResult<ShiftScheduleTable[]> => {
    const axios = useAxiosAuth();

    return useQuery<ShiftScheduleTable[]>({
        queryKey: [key, startDate, endDate],
        queryFn: async () => {
            const response = await axios.get(`/employee-shifts/schedule-table/self-schedule`, {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                }
            });
            return response.data.data;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};





export { useShiftsScheduleTable, useEmployeeShiftsScheduleTable };
