'use client';
import {useState, useEffect} from "react";
import axios, {AxiosStatic, CancelToken} from "axios";
import {Backend_URL} from "@/lib/constants/Constants";

const useFetchSingleAxios = (url: string, method: "get" | "post" | "patch" | "delete") => {
    const [data, setData] = useState<any[] | any>([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    

    function handleResult(unmounted: boolean,a:any) {
        if (!unmounted) {
            setData(a.data.data);
            setLoading(false);
        }
    }

    function handleAxios(axios: AxiosStatic, headers: {
        cancelToken: CancelToken;
        headers: { authorization: string }
    }) {
        switch (method) {
            case "get":
                return axios.get(Backend_URL + url, headers);
            case "post":
                return axios.post(Backend_URL + url, headers);
            case "patch":
                return axios.patch(Backend_URL + url, headers);
            case "delete":
                return axios.delete(Backend_URL + url, headers);
        }
    }

    function handleError(e: any, unmounted: boolean) {
        if (!unmounted) {
            setError(true);
            setErrorMessage(e.message);
            setLoading(false);
            // if (axios.isCancel(e)) {
            //     console.log(`request cancelled:${e.message}`);
            // } else {
            //     console.log("another error happened:" + e.message);
            // }
        }
    }

    useEffect(() => {
        let unmounted = false;
        const source = axios.CancelToken.source();
        const headers = {
            cancelToken: source.token,
            headers: {
                "authorization": `Bearer `
            }
        };

        handleAxios(axios, headers)
            .then(a => {
                handleResult(unmounted,a);
            }).catch(function (e) {
            handleError(e, unmounted)
        });
        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };
    }, [url]);

    return {data, loading, error, errorMessage};
};

export default useFetchSingleAxios;