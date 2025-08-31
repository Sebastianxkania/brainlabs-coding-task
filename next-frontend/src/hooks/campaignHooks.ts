import {useQuery, useMutation} from '@tanstack/react-query';
import {campaigneServices} from '@/api_services/campaign/campaignServices';
import * as CampaignTypes from '@/api_services/campaign/campaignTypes';
import { queryClient } from '@/components/providers/queryClient';

export const useFetchCampaigns = () => {
  return useQuery<CampaignTypes.CampaignResponse[], Error>(
    {
      queryKey: ['campaigns'],                             
      queryFn: async () => {                                        
        const res = await campaigneServices.get()                             
        return res
      }
    }
  );
};

export const useAddCampaign = () => {
  return useMutation<
    CampaignTypes.CampaignResponse,
    Error,
    { campaign: CampaignTypes.CampaignCreate }
  >(
    {
      mutationFn: ({campaign}) => campaigneServices.post(campaign),
      onSuccess: () => {
        // Invalidate the campaigns in the cache
        queryClient.invalidateQueries({
          queryKey: ['campaigns'],
        });
      },
    }
  );
};