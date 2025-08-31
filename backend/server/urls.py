from django.contrib import admin
from django.http import JsonResponse, HttpResponse
from django.urls import path
from marketing import views as marketing_views
from django.views.decorators.csrf import ensure_csrf_cookie


def ping(request):
    return JsonResponse({"status": "ok"})


def home(request):
    return HttpResponse("Django backend is running. Try /api/ping")


@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({"ok": True})


urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),
    path("api/ping", ping),
    path("api/csrf/", csrf),
    path("api/campaigns", marketing_views.campaigns_view, name="campaigns"),
]
