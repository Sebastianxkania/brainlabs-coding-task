import pytest
from marketing import models as MarketingModels
from marketing import services as marketing_services

pytestmark = pytest.mark.django_db


def make_campaign(**overrides) -> MarketingModels.Campaign:
    defaults = {
        "name": "Service Test",
        "budget": 1000,
        "spend": 10,
        "status": "draft",
    }
    defaults.update(overrides)
    return MarketingModels.Campaign.objects.create(**defaults)


def test_create_campaign_service_creates_model():
    from marketing import schemas as MarketingSchemas

    payload = MarketingSchemas.CampaignCreate(
        name="Service Create",
        budget=2000,
        spend=0,
        status="active",
    )
    c = marketing_services.create_campaign(payload)

    assert isinstance(c, MarketingModels.Campaign)
    assert c.name == "Service Create"
    assert c.budget == 2000
    assert c.spend == 0
    assert c.status == "active"
    assert MarketingModels.Campaign.objects.filter(id=c.id).exists()


def test_get_campaigns_returns_list():
    make_campaign(name="A")
    make_campaign(name="B")

    items = marketing_services.get_campaigns()
    assert isinstance(items, list)
    assert {c.name for c in items}.issuperset({"A", "B"})
