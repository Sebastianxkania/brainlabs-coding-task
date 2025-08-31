export interface CampaignCreate {
  name: string;
  budget: string;
  spend: string;
  status: "draft" | "active" | "paused" | "completed";
}

export interface CampaignResponse {
  id: string;
  name: string;
  budget: string;
  spend: string;
  status: "draft" | "active" | "paused" | "completed";
  created_at: string;
  updated_at: string;
}