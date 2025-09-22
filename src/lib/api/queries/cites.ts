import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useAxiosAuth from '../axios/hooks/useAxiosAuth';
import { Pagination } from '@/types/CommonPageProp';
import { City, Country } from '@/types/pagesData';  // Updated import to include Country type
import { Backend_Public_URL } from "@/lib/constants/Constants";

const useGetCountryCites = (page: number, key: string, id: number): UseQueryResult<{ country: Pagination<Country> }> => {
    const axios = useAxiosAuth();

    return useQuery<{ country: Pagination<Country> }>({
        queryKey: [key, page],
        queryFn: async () => {
            const response = await axios.get(`/countriesWithCities/${id}`, {
                params: {
                    paginate: true,
                    page: page,
                }
            });

            const country = response.data.data;
            // Updating the country object to include full image paths
            country.icon = Backend_Public_URL + 'storage/' + country.icon;
            country.cities = country.cities.map((city: City) => ({
                ...city,
                image: Backend_Public_URL + 'storage/' + city.image,
            }));
            return { country };
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};




const useGetCites = (page: number, key: string): UseQueryResult<{ cities: Pagination<City> }> => {
    const axios = useAxiosAuth();

    return useQuery<{ cities: Pagination<City> }>({
        queryKey: [key, page],
        queryFn: async () => {
            const response = await axios.get('/cities', {
                params: {
                    paginate: true,
                    page: page,
                }
            });
            const cities = response.data.data;
            cities.data = cities.data.map((city: City) => ({
                ...city,
                image: Backend_Public_URL + 'storage/' + city.image || ''
            }));
            
            return { cities };
        }
    });
};

export { useGetCites, useGetCountryCites };
