import { useMutation, UseMutationResult } from "@tanstack/react-query";
import useAxiosAuth from "../axios/hooks/useAxiosAuth";
interface PostResponse {
    data: any;
    message: string;
    status?: number | undefined;
}

export const sendInvoiceEmail =  ():  UseMutationResult<PostResponse, Error, {invoiceId:number}> => {
    const axios = useAxiosAuth();
    return useMutation({
        mutationKey: ["SendInvoiceEmail"],
        mutationFn: async (fd:{invoiceId:number}) => {
            const response = await axios.post<PostResponse>(
                "/invoices/send-email",
                fd,
                {
                    headers: {
                        "Accept": "Application/json",
                        "Content-type": "Application/json",
                    }
                }
            );
            return response.data;

        }
    });
};