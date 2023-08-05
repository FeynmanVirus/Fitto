from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.core import serializers
from django.db.models import Avg
from fittoapp.models import FoodDiary
from users.models import User
import json
from datetime import date

# Create your views here.

today = date.today()
today_string = f"{today.year}-{today.month}-{today.day}"

def index(request):
        if not request.user.is_authenticated:
                return redirect('login')
        u = User.objects.get(pk=request.user.id)
        create = FoodDiary.objects.get_or_create(date=today_string, user=u)
        food_data = FoodDiary.objects.filter(date=today_string, user=u)

        food_data_json = serializers.serialize("json", food_data)
        print(food_data_json)
        return render(request, 'fittoapp/index.html', {
                "food_data": food_data_json,
        })

@csrf_exempt
def foodentry(request):
        if request.method == 'POST':
                xml_bytesvalue = request.body
                data_decode = xml_bytesvalue.decode("utf-8").replace("'", '"')
                data = json.loads(data_decode)
                u = User.objects.get(pk=request.user.id)
                #retriving current macro values, default: 0
                p = FoodDiary.objects.get_or_create(date=today_string, user=u)
                print(p)
                print(data)
                # updating macro values
                energy = float(data['Energy']) + p[0].energy
                protein = float(data['Protein']) + p[0].protein
                carbs = float(data['Carbs']) + p[0].carbs
                fat = float(data['Fat']) + p[0].fat
                fiber = float(data['Fiber']) + p[0].fiber

                obj, created = FoodDiary.objects.update_or_create(
                        user=u,
                        date=today_string,
                        defaults={"user":u, "energy": energy, "protein": protein, "carbs": carbs, "fat": fat, "fiber": fiber}
                )

                return HttpResponse("Success")
        return HttpResponse('failure')

def calorie(request):
        return render(request, 'fittoapp/calc.html')