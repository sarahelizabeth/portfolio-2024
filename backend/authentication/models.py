from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager

class CustomUser(AbstractUser):
  username = None
  email = models.EmailField(_('email address'), unique=True)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []

  objects = CustomUserManager()

  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100, null=True, blank=True)

  def __str__(self):
    return self.email


