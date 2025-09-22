import axios from 'axios';
import {Backend_URL} from "@/lib/constants/Constants";

export default axios.create({
    baseURL:`${Backend_URL}`,
    headers:{
        "Content-type":"application/json"
    },
    withCredentials:true
})
export const axiosAuth=axios.create({
    baseURL:`${Backend_URL}`,
    headers:{
        "Content-type":"application/json",
        "Accept":"application/json"
    },
    cancelToken: new axios.CancelToken((cancel) => {
        // The cancel function will be called when needed
        // (e.g., when the component unmounts or based on a condition)
        // You can also pass a custom message to the cancel function.
      }),
    withCredentials:true
})