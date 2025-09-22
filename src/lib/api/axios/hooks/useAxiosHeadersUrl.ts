import {Backend_URL} from "@/lib/constants/Constants";

const useAxiosHeadersUrl=(url: string) =>{
    let customHeaders:any={
        "authorization": `Bearer`,
    };
    if(["/locations",'/lessons','/testimonials','/news','/employees'].includes(url)){
        customHeaders={...customHeaders,"Content-Type": 'multipart/form-data'}
    }
    customHeaders={...customHeaders,"Accept":"application/json"}

    const headers = {
        headers: customHeaders
    };
    const api_url=Backend_URL + url;

    return [api_url,headers];
}

export default useAxiosHeadersUrl;
