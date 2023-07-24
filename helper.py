from flask import Flask, render_template, request, redirect, session
import requests
import json
import urllib

def loader(food):
    food = food.capitalize()
    # Edamam Food Database API
    url = (
        f"https://api.edamam.com/api/food-database/v2/parser?app_id=c8b889bd&app_key=1cec0da810f8eb1e6a3dfbbb617510a5&ingr={food}&nutrition-type=logging"
    )
    
    response = requests.get(url)
    data = response.text
    parse_json = json.loads(data)
    energyKcal = round(parse_json['hints'][0]['food']['nutrients']['ENERC_KCAL'], 2)
    carbohydrate_by_diff = round(parse_json['hints'][0]['food']['nutrients']['CHOCDF'], 2)
    protein = round(parse_json['hints'][0]['food']['nutrients']['PROCNT'], 2)
    fiber = round(parse_json['hints'][0]['food']['nutrients']['FIBTG'], 2)
    fat = round(parse_json['hints'][0]['food']['nutrients']['FAT'], 2)

    return {
        "food": food,
        "energyKcal": energyKcal,
        "carbohydrates": carbohydrate_by_diff,
        "protein": protein,
        "fiber": fiber,
        "fats": fat
    }