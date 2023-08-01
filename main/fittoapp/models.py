from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=60)
    age = models.IntegerField()
    weight = models.IntegerField()
    height = models.IntegerField()

    def __str__(self):
        return f"{self.name}, age: {self.age}, weight: {self.weight}, height: {self.height}"

class FoodDiary(models.Model):
    name = models.ForeignKey(User, on_delete=models.CASCADE)
    energy = models.IntegerField()
    protein = models.IntegerField()
    carbs = models.IntegerField()  
    fat = models.IntegerField()
    fiber = models.IntegerField()
    date = models.DateField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return f"On {self.date}, {self.name} had {self.energy} calories including {self.protein}g of protein, {self.carbs}g of carbs, {self.fat}g of fat, {self.fiber}g of fiber"

