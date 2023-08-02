from django.urls import path
from . import views

app_name = "fittoapp"
urlpatterns = [
    path("", views.index, name="index"),
    path("calculate", views.calculate_calories, name="calculate"),
    path("send", views.send, name="send"),
    # path("register", views.register_request, name="register"),
    # path("login", views.login_request, name="login"),
    # path("logout", views.logout_request, name="logout")
]
