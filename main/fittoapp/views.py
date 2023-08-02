from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
import json 
from .models import User, FoodDiary # db
from .forms import NewUserForm # form
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm #login
from django.contrib import messages # form


# Create your views here.
def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('fittoapp:register'))
    return render(request, "fittoapp/index.html")

def calculate_calories(request):
    return render(request, "fittoapp/calc.html")

@csrf_exempt
def send(request):
    if request.method=='POST':
        xml_fetched_bytesvalue = request.body
        datajson = xml_fetched_bytesvalue.decode("utf-8").replace("'", '"')
        data = json.loads(datajson)
        
        insert = FoodDiary()

        return HttpResponse('success')
    return HttpResponse('failed')

def register_request(request):
    if request.method=='POST':
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful!")
            return redirect("fittoapp:index")
        messages.error(request, "Registration unsuccessful. Please try again with valid info.")
    form = NewUserForm()
    return render(request, "fittoapp/register.html", {
        "register_form":form
        })

def login_request(request):
    if request.method=="POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect("fittoapp:index")
            else:
                messages.error(request, "Invalid username or password")
        else:
            messages.error(request, "Invalid username or password")
    form = AuthenticationForm()
    return render(request, 'fittoapp/login.html', {
        "login_form": form,
    })

def logout_request(request):
    logout(request)
    messages.info(request, "You have successfully logged out.") 
    return redirect("fittoapp:index")