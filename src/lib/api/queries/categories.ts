import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useAxiosAuth from '../axios/hooks/useAxiosAuth';
import { Pagination } from '@/types/CommonPageProp';
import { Category } from '@/types/pagesData';
import { Backend_Public_URL } from "@/lib/constants/Constants";

const useGetCategories = (page: number, key: string): UseQueryResult<{ categories: Pagination<Category> }> => {
    const axios = useAxiosAuth();

    return useQuery<{ categories: Pagination<Category> }>({
        queryKey: [key, page],
        queryFn: async () => {
            const response = await axios.get('/categories', {
                params: {
                    paginate: true,
                    page: page,
                }
            });
            let categories = response.data.data;
            categories.data = categories.data.map((category: Category) => ({
                ...category,
                is_restricted: JSON.parse(category.is_restricted as string),
                image: Backend_Public_URL + 'storage/' + category.files?.path || ''
            }));
            return { categories };
        }
    });
};

export { useGetCategories };
