from django.urls import path, include
from rest_framework import routers
from cars import views


router = routers.DefaultRouter()
router.register(r'cars', views.CarView, 'cars')

urlpatterns = [
    # Versionado de la api
    path("api/v1/", include(router.urls))
]
