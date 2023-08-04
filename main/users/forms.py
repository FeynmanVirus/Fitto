from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from users.models import User 

class CustomUserForm(UserCreationForm):

    class Meta:
        model = User
        fields = ("email", "age", "height", "weight")
        

class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = User
        fields = ("email", "age", "height", "weight")