from django.http import HttpResponseRedirect, HttpResponse 
from django.shortcuts import render, redirect
from users.forms import CustomUserForm, CustomUserChangeForm
from django.contrib import messages
from django.contrib.auth import login, logout
from users.managers import CustomUserManager

# Create your views here.

def register_request(request):
    if request.method == 'POST':
        form = CustomUserForm(request.POST)
        if form.is_valid():
            form.save()
            login(request, user)
            messages.success(request, "You have been registered successfully.")
            return redirect('index')
    form = CustomUserForm()
    return render(request, "users/register.html", {
        "form": form,
    })

def logout_request(request):
    logout(request)
    messages.success(request, "You have been logged out successfully.")
    return redirect('fittoapp:index')