import {useQuery} from '@tanstack/react-query';
import { getCsrfToken } from "@/api_services/csrf/csrfServices";


export const useFetchCsrf = () => {
    return useQuery(
      {
        queryKey: ['csrf'],                             
        queryFn: async () => {                   
          return await getCsrfToken()   
        }
      }
    );
};