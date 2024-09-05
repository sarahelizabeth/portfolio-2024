from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from .models import Project, ContactMessage
from .serializers import ProjectSerializer, ContactMessageSerializer

class ProjectViewSet(viewsets.ModelViewSet):
  queryset = Project.objects.all()
  serializer_class = ProjectSerializer
  filter_backends = [DjangoFilterBackend]
  filterset_fields = ['project_type']


class ContactMessageViewSet(viewsets.ModelViewSet):
  queryset = ContactMessage.objects.all()
  serializer_class = ContactMessageSerializer
