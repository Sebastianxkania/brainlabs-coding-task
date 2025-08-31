import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from marketing import models as MarketingModels

pytestmark = pytest.mark.django_db


def make_campaign(**overrides) -> MarketingModels.Campaign:
    """
    Helper function to create and return a Campaign model instance
    with sensible defaults, allowing overrides for specific fields.
    """
    defaults = {
        "name": "Spring Push",
        "budget": 10000,
        "spend": 0,
        "status": "draft",
    }
    defaults.update(overrides)
    return MarketingModels.Campaign.objects.create(**defaults)


def test_post_campaign_creates_campaign():
    """
    If we send a valid POST payload to /api/campaigns,
    the view should create a new Campaign, return 201,
    include the correct response data, and persist the model in the DB.
    """
    client = APIClient()
    payload = {
        "name": "Black Friday",
        "budget": 50000,
        "spend": 2500,
        "status": "active",
    }

    res = client.post(reverse("campaigns"), payload, format="json")

    assert res.status_code == status.HTTP_201_CREATED
    data = res.json()
    assert data["name"] == payload["name"]
    assert data["budget"] == payload["budget"]
    assert data["spend"] == payload["spend"]
    assert data["status"] == payload["status"]
    assert "id" in data  # new campaign should have an ID
    assert MarketingModels.Campaign.objects.filter(id=data["id"]).exists()


def test_get_campaigns_list_returns_items():
    """
    If we GET /api/campaigns with multiple campaigns in the DB,
    the view should return 200 and a list of campaigns containing those items.
    """
    make_campaign(name="C1")
    make_campaign(name="C2")

    client = APIClient()
    res = client.get(reverse("campaigns"))

    assert res.status_code == status.HTTP_200_OK
    data = res.json()
    names = {item["name"] for item in data}
    assert {"C1", "C2"}.issubset(names)
