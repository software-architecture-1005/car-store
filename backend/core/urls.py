from django.urls import path, include
from rest_framework import routers
from . import views
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import SignupView


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
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # refresh token
    path('api/signup/', SignupView.as_view(), name='signup'),

]