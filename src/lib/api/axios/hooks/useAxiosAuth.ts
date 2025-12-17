import { useAuthHook } from "@/providers/authContext";
import useRefreshToken from "@/lib/api/axios/useRefreshToken";
import { useEffect, useState } from "react";
import { axiosAuth } from "../axios";
import { AxiosError, InternalAxiosRequestConfig } from 'axios';

const useAxiosAuth = () => {
    const refresh = useRefreshToken();
    const [sent, setSent] = useState<boolean>(false)
    const auth = useAuthHook();

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use(
            (config: InternalAxiosRequestConfig<any>) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.tokens?.access_token}`
                }
                config.headers['X-System-Type'] = 'SILVERTRACK';
                return config;
            },
            error => Promise.reject(error)
        );
        const responseIntercept = axiosAuth.interceptors.response.use(
            (response) => response,
            async (err: AxiosError) => {
                // Get the previous request using axios
                const prevRequest = err?.config;
                if ((err?.response?.status === 401) && !sent) {
                    setSent(true);
                    
                    const newToken = await refresh(); // Assuming you have a function to refresh the token
                    if(!newToken){
                        auth.setAuthData(undefined, undefined);
                        window.location.href="/login";
                    }
                    if (prevRequest) {
                        prevRequest.headers['Authorization'] = `Bearer ${newToken?.access_token}`;
                           prevRequest.headers['X-System-Type'] = 'SILVERTRACK';
                        return axiosAuth(prevRequest)
                    } else {
                        return Promise.reject(err)
                    }

                }
                return Promise.reject(err)
            }
        );
        return () => {
            axiosAuth.interceptors.response.eject(responseIntercept);
            axiosAuth.interceptors.request.eject(requestIntercept);
            setSent(false);

        }
        
    },[auth,refresh])
    return axiosAuth;
}

export default useAxiosAuth;