from django.urls import path, include
from rest_framework import routers
from . import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'makes', views.MakeViewSet, 'makes')
router.register(r'categories', views.CategoryViewSet, 'categories')
router.register(r'vehicles', views.VehicleViewSet, 'vehicles')
router.register(r'users', views.UserViewSet, 'users')
router.register(r'roles', views.RoleViewSet, 'roles')
router.register(r'buyers', views.BuyerViewSet, 'buyers')
router.register(r'experts', views.ExpertViewSet, 'experts')
router.register(r'reviews', views.ReviewViewSet, 'reviews')
router.register(r'cart', views.CartViewSet, 'cart')

urlpatterns = [
    # Versionado de la api
    path("api/v1/", include(router.urls)),
]
