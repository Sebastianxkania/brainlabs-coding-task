import apiClient from '@/api_services/apiClient'
import * as CampaignTypes from '@/api_services/campaign/campaignTypes';

export const campaigneServices = {
  get: (): Promise<CampaignTypes.CampaignResponse[]> => {
    return new Promise((resolve, reject) => {
      apiClient
        .get('/api/campaigns')
        .then((response:{ data: CampaignTypes.CampaignResponse[] }) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  post: (campaign: CampaignTypes.CampaignCreate): Promise<CampaignTypes.CampaignResponse> => {
    return new Promise((resolve, reject) => {
      apiClient
        .post('/api/campaigns', campaign)
        .then((response: { data:CampaignTypes.CampaignResponse; }) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }
};
