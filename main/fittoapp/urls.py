from django.urls import path
from . import views

app_name = 'fittoapp'
urlpatterns = [
    path("", views.index, name="index"),
    path("calorie", views.calorie, name="calorie"),
    path("activity", views.activity, name="activity"),
    path("foodentry", views.foodentry, name="foodentry"),
    path("activityentry",  views.activityentry, name="acitivityentry")
]
