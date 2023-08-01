from django.urls import path
from . import views

app_name = "fittoapp"
urlpatterns = [
    path("", views.index, name="index"),
    path("calculate", views.calculate_calories, name="calculate"),
    path("send", views.send, name="send")
]
