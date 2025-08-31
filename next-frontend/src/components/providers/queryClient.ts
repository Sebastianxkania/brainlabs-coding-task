import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300000,  // data will be cached for 5 minutes
      },
    },
  })