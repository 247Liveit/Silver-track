import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useAxiosAuth from "../axios/hooks/useAxiosAuth";
import { Employee, EmployeeShift } from "@/types/pagesData";

const useGetOneEmployeeShift = (key: string, id?: number): UseQueryResult<EmployeeShift> => {
    const axios = useAxiosAuth();

    return useQuery<EmployeeShift>({
        queryKey: [key],
        queryFn: async () => {
            const response = await axios.get(`/employee-shifts/${id}`);

            const employeeShift = response.data.data;
            return employeeShift
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};
export{useGetOneEmployeeShift}