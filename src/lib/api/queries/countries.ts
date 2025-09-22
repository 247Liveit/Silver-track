import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useAxiosAuth from '../axios/hooks/useAxiosAuth';
import { Pagination } from '@/types/CommonPageProp';
import { Country } from '@/types/pagesData';
import { Backend_Public_URL } from "@/lib/constants/Constants";

const useGetCountries = (page: number, key: string): UseQueryResult<{ countries: Pagination<Country> }> => {
    const axios = useAxiosAuth();

    return useQuery<{ countries: Pagination<Country> }>({
        queryKey: [key, page],
        queryFn: async () => {
            const response = await axios.get('/countries', {
                params: {
                    paginate: true,
                    page: page,
                }
            });
            const countries = response.data.data;
            countries.data = countries.data.map((country: Country) => ({
                ...country,
                image: Backend_Public_URL + 'storage/' + country.icon || ''
            }));
            return { countries };
        }
    });
};

export { useGetCountries };
