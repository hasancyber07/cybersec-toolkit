import os
import requests
import datetime
from flask import Flask, request, jsonify, render_template, redirect, url_for

app = Flask(__name__, template_folder="../templates", static_folder="../static")

# ----------- PAGES -----------
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/login-page')
def login_page():
    return render_template("login.html")

@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")

# ----------- LOGIN -----------
@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    if username == "admin" and password == "1234":
        return redirect(url_for('dashboard'))
    else:
        return "Login failed ❌"

# ----------- IP LOOKUP -----------
@app.route('/ip-lookup')
def ip_lookup():
    ip = request.args.get('ip')

    if not ip:
        return jsonify({"error": "No IP provided"})

    response = requests.get(f"http://ip-api.com/json/{ip}")
    data = response.json()

    # LOG SAVE
    with open("../logs/activity.log", "a") as f:
        f.write(f"{datetime.datetime.now()} - IP checked: {ip}\n")

    return jsonify(data)
    # ----------- GET LOGS -----------
@app.route('/logs')
def get_logs():
    logs = []

    try:
        with open("../logs/activity.log", "r") as f:
            lines = f.readlines()

            for line in lines[-10:]:  # son 10 log
                logs.append(line.strip())

    except:
        logs = ["No logs yet"]

    return jsonify(logs)

if __name__ == '__main__':
    app.run()