from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
import json 
from .models import FoodDiary # db
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
import datetime

# Create your views here. 
def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))
    return render(request, "fittoapp/index.html")

@login_required
def calculate_calories(request):
    return render(request, "fittoapp/calc.html")

@csrf_exempt
def send(request):
    if request.method=='POST':
        xml_fetched_bytesvalue = request.body
        datajson = xml_fetched_bytesvalue.decode("utf-8").replace("'", '"')
        data = json.loads(datajson)
        print(data['PROCNT'])

        b = FoodDiary(user=request.user, energy=data['ENERC_KCAL'], protein=data['PROCNT'], carbs=data['CHOCDF'], fat=data['FAT'],  fiber=data['FIBTG'], date=datetime.date.today())
        b.save()
        print(b)
        return HttpResponse('success')
    return HttpResponse('failed')

