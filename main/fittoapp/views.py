from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User, FoodDiary



# Create your views here.
def index(request):
    
    return render(request, "fittoapp/index.html")

def calculate_calories(request):
    return render(request, "fittoapp/calc.html")

@csrf_exempt
def send(request):
    if request.method=='POST':
        xml_fetched_bytesvalue = request.body
        datajson = xml_fetched_bytesvalue.decode("utf-8").replace("'", '"')

        data = json.loads(datajson)
        print(data)
        return HttpResponse('success')
    return HttpResponse('failed')