from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as authtoken_views
from . import views

# Create router and register viewsets
router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'profiles', views.UserProfileViewSet, basename='profile')
router.register(r'missionaries', views.MissionaryViewSet, basename='missionary')
router.register(r'missions', views.MissionViewSet, basename='mission')
router.register(r'donations', views.DonationViewSet, basename='donation')

# API URLs
urlpatterns = [
    # Router URLs
    path('', include(router.urls)),
    
    # Authentication
    path('api-token-auth/', authtoken_views.obtain_auth_token, name='api_token_auth'),
    
    # Additional endpoints
    path('api-auth/', include('rest_framework.urls')),
]
