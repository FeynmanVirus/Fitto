from flask import Flask, render_template, request, redirect, session

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template("index.html")

@app.route("/calorie")
def calorie():
    return render_template("calc.html")