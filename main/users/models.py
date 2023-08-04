from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager

# Create your models here.
class User(AbstractUser, PermissionsMixin):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    age = models.PositiveIntegerField(_("age"), null=True)
    weight = models.PositiveIntegerField(_("weight"), null=True)
    height = models.PositiveIntegerField(_("height"), null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email}, age: {self.age}, weight: {self.weight}, height: {self.height}"

