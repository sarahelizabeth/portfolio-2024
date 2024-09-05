from rest_framework.routers import DefaultRouter

from .views import ProjectViewSet, ContactMessageViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'contact', ContactMessageViewSet, basename='contact')
urlpatterns = router.urls