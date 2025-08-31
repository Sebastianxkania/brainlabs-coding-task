from django.contrib import admin

from .models import Campaign


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "budget", "spend", "status", "created_at", "updated_at")
    list_filter = ("status",)
    search_fields = ("name",)
