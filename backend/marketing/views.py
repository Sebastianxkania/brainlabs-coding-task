from pydantic import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from marketing import services as marketing_services
from marketing import schemas as MarketingSchemas
from marketing import models as MarketingModels


@api_view(["GET", "POST"])
def campaigns_view(request):
    if request.method == "POST":
        # --- Handle invalid payloads (bonus test fix) ---
        try:
            data = MarketingSchemas.CampaignCreate(**request.data)
        except ValidationError as ve:
            return Response(
                {"detail": ve.errors()},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            campaign = marketing_services.create_campaign(data)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            MarketingSchemas.CampaignResponse.model_validate(campaign).model_dump(),
            status=status.HTTP_201_CREATED,
        )

    elif request.method == "GET":
        try:
            campaigns = marketing_services.get_campaigns()
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            [MarketingSchemas.CampaignResponse.model_validate(c).model_dump() for c in campaigns],
            status=status.HTTP_200_OK,
        )
