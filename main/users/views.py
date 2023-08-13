from django.http import HttpResponseRedirect, HttpResponse 
from django.shortcuts import render, redirect
from users.forms import CustomUserForm, CustomUserChangeForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from users.managers import CustomUserManager
from fittoapp.models import UserBodyReq

# Create your views here.

def register_request(request):
    if request.method == 'POST':
        form = CustomUserForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(request, email=email, password=raw_password)
            
            # calculating bmr and daily calorie intake 
            age = form.cleaned_data.get('age')
            weight = form.cleaned_data.get('weight')
            height = form.cleaned_data.get('height')
            sex = form.cleaned_data.get('sex')
            activity = form.cleaned_data.get('activity')
            goal = form.cleaned_data.get('goal')

            activityhash = {
                'N': 1.2,
                'L': 1.375,
                'M': 1.55,
                'A': 1.725,
            }

            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
            TDEE = bmr * activityhash[activity]

            if goal == 'G':
                daily_intake = TDEE + 250
            elif goal == 'M':
                daily_intake = TDEE
            else:
                daily_intake = TDEE - 250

            print(bmr, TDEE, daily_intake)
            
            b = UserBodyReq(user=user, bmr=bmr, tdee=TDEE, daily_intake=daily_intake)
            b.save()
            login(request, user)
           
            return redirect('fittoapp:index')
    form = CustomUserForm()
    return render(request, "users/register.html", {
        "form": form,
    })

def logout_request(request):
    logout(request)
    messages.success(request, "You have been logged out successfully.")
    return redirect('fittoapp:index')