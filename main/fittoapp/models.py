from django.db import models
from users.models import User
from datetime import date
# Create your models here.

today = date.today()

class FoodDiary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="user", related_name="food")
    energy = models.IntegerField(null=True, default=0)
    protein = models.IntegerField(null=True, default=0)
    carbs = models.IntegerField(null=True, default=0)
    fat = models.IntegerField(null=True, default=0)
    fiber = models.IntegerField(null=True, default=0)
    date = models.DateField(null=True, default=f"{today.year}-{today.month}-{today.day}")

    def __str__(self):
        return f"{self.user} ate {self.energy}kcal, protein: {self.protein}, carbs: {self.carbs}, fat: {self.fat}, fiber: {self.fiber} on {self.date}"

    