from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class NewUserForm(UserCreationForm):
    age = forms.IntegerField()
    weight = forms.IntegerField()
    height = forms.IntegerField()

    class Meta:
        model = User
        fields = ("username", 'age', 'weight', 'height', "password1", "password2")

    def save(self, commit=True):
        user = super(NewUserForm, self).save(commit=False)
        user.age = self.cleaned_data['age']
        user.weight = self.cleaned_data['weight']
        user.height = self.cleaned_data['height']
        
        if commit: 
            user.save()
        return user
