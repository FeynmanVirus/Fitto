from flask import Flask, render_template, request, redirect, session
from helper import loader

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def hello_world():
    return render_template("index.html")

@app.route("/calorie", methods=["GET", "POST"])
def calorie():
    if request.method == "GET":
    #     food = request.form.get('food-input')
    #     data = loader(food)    
    #     return render_template("calc.html", data=data)
    # else:
        return render_template("calc.html")

