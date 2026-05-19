function showResult(data) {

    if (!data || data.status === "fail") {
        alert("Invalid or private IP!");
        return;
    }

    document.getElementById("resultBox").style.display = "block";

    document.getElementById("ip").innerText = data.query || "N/A";
    document.getElementById("country").innerText = data.country || "N/A";
    document.getElementById("city").innerText = data.city || "N/A";
    document.getElementById("isp").innerText = data.org || "N/A";

    document.getElementById("flag").src =
        "https://flagsapi.com/" + data.countryCode + "/flat/64.png";

    document.getElementById("mapLink").href =
        "https://www.google.com/maps?q=" + data.lat + "," + data.lon;
}

// manual IP
function lookupIP() {
    let ip = prompt("Enter IP:");
    if (!ip) return;

    fetch("/ip-lookup?ip=" + ip)
    .then(res => res.json())
    .then(showResult);
}

// auto IP
function lookupMyIP() {
    fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => {
        fetch("/ip-lookup?ip=" + data.ip)
        .then(res => res.json())
        .then(showResult);
    });
}

// password
function passwordCheck() {
    let pass = prompt("Enter password:");
    if (!pass) return;

    let strength = "Weak";
    if (pass.length >= 8) strength = "Medium";
    if (pass.length >= 12) strength = "Strong";

    alert(strength);
}

// hash
function hashGen() {
    let text = prompt("Enter text:");
    if (!text) return;

    alert(btoa(text));
}
function loadLogs() {
    fetch("/logs")
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("logList");
        list.innerHTML = "";

        data.forEach(log => {
            let li = document.createElement("li");
            li.textContent = log;
            list.appendChild(li);
        });
    });
}

// səhifə açılan kimi logs yüklə
window.onload = loadLogs;