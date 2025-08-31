"use client"

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from '@/components/providers/queryClient';


interface TanstackProviderProps {
  children: React.ReactNode;
}

export const TanstackProvider = ({children}: TanstackProviderProps) => {

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
};
