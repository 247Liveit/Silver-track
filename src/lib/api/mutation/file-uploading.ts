import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import useAxiosAuth from '../axios/hooks/useAxiosAuth';
import { Files } from '@/types/pagesData';

interface UploadFileResponse {
    data: any;
    message: string;
    status?: number | undefined;
}

export type NewFile = {
    file: File;
    modelId: number;
    model: string;
};

const useUploadFile = (key: string): UseMutationResult<UploadFileResponse, Error, NewFile> => {
    const axios = useAxiosAuth();
    const queryClient= useQueryClient()
    return useMutation({
        mutationKey: [key],
        mutationFn: async (newFile: NewFile) => {
            const fd = new FormData();
            fd.append("file", newFile.file);
            fd.append("modelId", newFile.modelId.toString());
            const response = await axios.post<UploadFileResponse>(`/shared/attachments/${newFile.model}`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            queryClient.setQueryData([key], (oldData:Files[]) => [...oldData, response.data.data]);
             
            return response.data;
        },
    });
};

export { useUploadFile };
