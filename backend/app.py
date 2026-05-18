import requests
from flask import Flask, request, jsonify, render_template, redirect, url_for

app = Flask(__name__, template_folder="../templates", static_folder="../static")

# ---------------- PAGES ----------------
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/login-page')
def login_page():
    return render_template("login.html")

@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")


# ---------------- LOGIN ----------------
@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    if username == "admin" and password == "1234":
        return redirect(url_for('dashboard'))
    else:
        return "Login failed ❌"


# ---------------- IP LOOKUP ----------------
@app.route('/ip-lookup')
def ip_lookup():
    ip = request.args.get('ip')

    if not ip:
        return jsonify({"error": "No IP provided"})

    response = requests.get(f"http://ip-api.com/json/{ip}")
    return jsonify(response.json())


if __name__ == '__main__':
    app.run(debug=True)