from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.core import serializers
from django.db.models import Avg
from fittoapp.models import FoodDiary, UserBodyReq, ActivityDiary
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
        # food data
        create = FoodDiary.objects.get_or_create(date=today_string, user=u)
        food_data = FoodDiary.objects.filter(date=today_string, user=u)
        food_data_aggregate = FoodDiary.objects.filter(user=u)
        activity_data = ActivityDiary.objects.filter(date=today_string, user=u)

        food_data_energy = food_data_aggregate.values('energy', 'date')
        #user body requirements data
        b = UserBodyReq.objects.filter(user=u)

        food_data_energy_list = []
        food_data_date_list = []

        for energy in food_data_energy:
                food_data_energy_list.append(energy['energy'])
                food_data_date_list.append(energy['date'].strftime("%d"))
        #avg intakes
        avg_data = {
                'avgEnergy': food_data_aggregate.aggregate(Avg('energy')),
                'avgProtein': food_data_aggregate.aggregate(Avg('protein')),
                'avgCarbs': food_data_aggregate.aggregate(Avg('carbs')),
                'avgFat': food_data_aggregate.aggregate(Avg('fat')),
                'avgFiber': food_data_aggregate.aggregate(Avg('fiber')),
                'avgBreakfast': food_data_aggregate.aggregate(Avg('breakfast')),
                'avgLunch': food_data_aggregate.aggregate(Avg('lunch')),
                'avgDinner': food_data_aggregate.aggregate(Avg('dinner')),
                
        }

        #jsonify
        # food_data_energy_json = serializers.serialize("json", food_data_energy)

        bmr_data_json = serializers.serialize("json", b)
        food_data_json = serializers.serialize("json", food_data)
        activity_data_json = serializers.serialize("json", activity_data)

        avg_data_json = json.dumps(avg_data)
        food_data_energy_list_json = json.dumps(food_data_energy_list)
        food_data_date_list_json = json.dumps(food_data_date_list)
        return render(request, 'fittoapp/index.html', {
                "food_data": food_data_json,
                "bmr_data": bmr_data_json,
                "avg_data": avg_data_json,
                "food_data_energy": food_data_energy_list_json,
                "food_data_date": food_data_date_list_json,
                "activity_data": activity_data_json,
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
                timeofday = data['timeofday']
                breakfast = 0
                lunch = 0
                dinner = 0
                print(timeofday)
                if timeofday == 'Breakfast':
                        breakfast = float(data['Energy']) + p[0].breakfast
                elif timeofday == 'Lunch':
                        lunch = float(data['Energy']) + p[0].lunch
                else: 
                        dinner = float(data['Energy']) + p[0].dinner
                obj, created = FoodDiary.objects.update_or_create(
                        user=u,
                        date=today_string,
                        defaults={"user":u, "energy": energy, "protein": protein, "carbs": carbs, "fat": fat, "fiber": fiber, 'breakfast': breakfast, 'lunch': lunch, 'dinner': dinner}
                )

                return HttpResponse("Success")
        return HttpResponse('failure')

@csrf_exempt
def activityentry(request):
        if request.method == 'POST':
                xhr_bytesvalue = request.body
                data_decode = xhr_bytesvalue.decode("UTF-8").replace("'", '"')
                data = json.loads(data_decode)
                u = User.objects.get(pk=request.user.id)
        
                activity_done = data['activity_done']
                calories_burned = data['calories_burned']

                p = ActivityDiary.objects.create(user=u, activity_done=activity_done, calories_burned=calories_burned, date=today_string)

                return HttpResponse("Success")
        return HttpResponse('failure')

def calorie(request):
        return render(request, 'fittoapp/calc.html')

def activity(request):
        return render(request, 'fittoapp/activity.html')