import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useAxiosAuth from '../axios/hooks/useAxiosAuth';

const  useGet = <T>(key: string,params?:any|undefined,url?:string|undefined): UseQueryResult<T[]> => {
    const axios = useAxiosAuth();

    return useQuery<T[]>({
        queryKey: [key, params||key, url||key],
        queryFn: async () => {
            const reqUrl=url||key
            if(reqUrl.includes('undefined')||reqUrl.includes('null')) return []
            const response = await axios.get(reqUrl,{
                params:params
            });
            console.log(response.data)
            return response.data.data;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

const useGetSingle = <T>(key: string,params?:any|undefined,defaule?:any,url?:string): UseQueryResult<T> => {
    const axios = useAxiosAuth();
    return useQuery<T>({
        queryKey: [key,params||key,url||key,JSON.stringify(params)],
        queryFn: async () => {
            const reqUrl=url||key
            if(!reqUrl.includes('undefined')&&!reqUrl.includes('null')){
            const response = await axios.get(reqUrl,{
                params:params
            });
            return response.data.data;
        }

        return defaule;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

export { useGet,useGetSingle };
