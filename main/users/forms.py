from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.forms import ModelForm, TextInput, EmailInput, Select
from django.utils.translation import gettext_lazy as _  
from django import forms

from users.models import User 

class CustomUserForm(UserCreationForm):

    password1 = forms.CharField(
        label=_("Password"),
        strip=False,
        widget=forms.PasswordInput,
    )
    password2 = forms.CharField(
        label=_("Password confirmation"),
        widget=forms.PasswordInput,
        strip=False,
    )

    class Meta:
        model = User
        fields = ("email", "age", "height", "weight", "sex", "goal", "activity")
    
        widgets = {
            'email': EmailInput(attrs={
                'class': 'field',

                'placeholder': 'Email'
            }),
            'age': TextInput(attrs={
                'class': 'field',
                'placeholder': 'Age'
            }),
            'height': TextInput(attrs={
                'class': 'field',
                'placeholder': 'Height'
            }),
            'weight': TextInput(attrs={
                'class': 'field',
                'placeholder': 'Weight'
            }),
            'sex': Select(attrs={
                'class': 'field',
                'placeholder': 'Sex'
            }),
            'goal': Select(attrs={
                'class': 'field',
                'placeholder': 'Goal'
            }),
            'activity': Select(attrs={
                'class': 'field',
                'placeholder': 'Activity'
            }),


        }
    def __init__(self, *args, **kwargs):
        super(CustomUserForm, self).__init__(*args, **kwargs)

        self.fields['password1'].widget.attrs['class'] = 'field'
        self.fields['password2'].widget.attrs['class'] = 'field'
        

class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = User
        fields = ("email", "age", "height", "weight", "sex", "goal", "activity")