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
window.addEventListener("load", function() {

    let input = document.getElementById("passwordInput");

    if (!input) return; // element yoxdursa error verməsin

    input.addEventListener("input", function() {

        let pass = this.value;
        let strength = 0;

        if (pass.length >= 8) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[0-9]/.test(pass)) strength++;
        if (/[^A-Za-z0-9]/.test(pass)) strength++;

        let bar = document.getElementById("strengthBar");
        let text = document.getElementById("strengthText");

        if (strength <= 1) {
            bar.style.width = "25%";
            bar.style.background = "red";
            text.innerText = "Weak";
        }
        else if (strength == 2) {
            bar.style.width = "50%";
            bar.style.background = "orange";
            text.innerText = "Medium";
        }
        else if (strength == 3) {
            bar.style.width = "75%";
            bar.style.background = "yellow";
            text.innerText = "Good";
        }
        else {
            bar.style.width = "100%";
            bar.style.background = "green";
            text.innerText = "Strong 💪";
        }
    });
});
window.addEventListener("load", function() {

    const input = document.getElementById("terminalInput");
    const output = document.getElementById("terminalOutput");

    if (!input || !output) return;

    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {

            let command = input.value;

            output.innerHTML += "<div>> " + command + "</div>";

            handleCommand(command, output);

            input.value = "";
        }
    });

});

function handleCommand(cmd, output) {

    let parts = cmd.split(" ");

    if (cmd === "clear") {
        output.innerHTML = "";
    }

    else if (cmd === "myip") {
        output.innerHTML += "<div>Fetching your IP...</div>";
        lookupMyIP();
    }

    else if (parts[0] === "ip") {

        let ip = parts[1];

        if (!ip) {
            output.innerHTML += "<div>No IP provided</div>";
            return;
        }

        fetch("/ip-lookup?ip=" + ip)
        .then(res => res.json())
        .then(data => {
            output.innerHTML += `
                <div>
                IP: ${data.query}<br>
                Country: ${data.country}<br>
                City: ${data.city}<br>
                ISP: ${data.org}
                </div>
            `;
        });
    }

    else {
        output.innerHTML += "<div>Unknown command</div>";
    }
}