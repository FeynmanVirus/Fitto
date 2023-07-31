from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "fittoapp/index.html")

def calculate_calories(request):
    return render(request, "fittoapp/calc.html")