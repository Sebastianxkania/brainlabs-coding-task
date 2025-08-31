from marketing import models as MarketingModels
from marketing import schemas as MarketingSchemas
from django.db import transaction


def create_campaign(campaign: MarketingSchemas.CampaignCreate) -> MarketingModels.Campaign:
    """
    Create a new campaign.

    Args:
        campaign: MarketingSchemas.CampaignCreate.

    Returns:
        MarketingModels.Campaign: The created campaign.
    """

    try:
        with transaction.atomic():
            campaign = MarketingModels.Campaign.objects.create(name=campaign.name, budget=campaign.budget, spend=campaign.spend, status=campaign.status)
    except Exception as e:
        raise ValueError(f"Failed to create campaign: {str(e)}")

    return campaign


def get_campaigns() -> list[MarketingModels.Campaign]:
    """
    Get all campaigns.
    Returns:
        list[MarketingModels.Campaign]: List of all campaigns.
    """
    try:
        campaigns = MarketingModels.Campaign.objects.all()
        return list(campaigns)
    except Exception as e:
        raise ValueError(f"Failed to retrieve campaigns: {str(e)}")
