from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager

# Create your models here.
class User(AbstractUser, PermissionsMixin):
    username = None
    email = models.EmailField(_("email address"), unique=True)

    SEX_CHOICES = (
        ('F', 'Female',),
        ('M', 'Male',),
        ('U', 'Unsure',),
    )

    GOAL = (
        ('G','Gain weight'),
        ('M', 'Maintain weight'),
        ('L', 'Lose weight')
    )

    ACTIVITY = (
        ('N', 'Very little or no exercise'),
        ('L', 'Light: exercise 1-3 times a week'),
        ('M', 'Moderate: exercise 4-5 times a week'),
        ('A','Active: exercise everyday or intense exercise 3-4 times a week'),
    )


    age = models.PositiveIntegerField(_("age"), null=True)
    weight = models.PositiveIntegerField(_("weight"), null=True)
    height = models.PositiveIntegerField(_("height"), null=True)
    sex = models.CharField(_("sex"), max_length=1, choices=SEX_CHOICES, null=True,)
    goal = models.CharField(_("goal"), max_length=1, choices=GOAL, null=True)
    activity = models.CharField(_("activity"), max_length=1, choices=ACTIVITY, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email}, age: {self.age}, weight: {self.weight}, height: {self.height}, sex: {self.sex}, goal: {self.goal}, activity: {self.activity}"

