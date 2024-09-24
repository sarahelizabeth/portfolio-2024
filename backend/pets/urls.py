# from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PetViewSet, PetImageViewSet, PetPicViewSet

router = DefaultRouter()
router.register(r'cuties', PetViewSet, basename='cuties')
# router.register(r'pics', PetImageViewSet, basename='pics')
router.register(r'pics', PetPicViewSet, basename='pics')

urlpatterns = router.urls
