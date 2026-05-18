function lookupIP() {
    let ip = prompt("Enter IP address:");
    if (!ip) return;

    fetch("/ip-lookup?ip=" + ip)
    .then(res => res.json())
    .then(data => {
        alert(
            "IP: " + data.query + "\n" +
            "Country: " + data.country + "\n" +
            "City: " + data.city + "\n" +
            "ISP: " + data.org
        );
    })
    .catch(() => alert("Error fetching IP data"));
}
function lookupMyIP() {
    fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => {
        let ip = data.ip;

        fetch("/ip-lookup?ip=" + ip)
        .then(res => res.json())
        .then(info => {
            alert(
                "Your IP: " + ip + "\n" +
                "Country: " + info.country + "\n" +
                "City: " + info.city + "\n" +
                "ISP: " + info.org
            );
        });
    });
}

function passwordCheck() {
    let pass = prompt("Enter password:");
    if (!pass) return;

    let strength = "Weak";
    if (pass.length >= 8) strength = "Medium";
    if (pass.length >= 12) strength = "Strong";

    alert("Password Strength: " + strength);
}

function hashGen() {
    let text = prompt("Enter text:");
    if (!text) return;

    let hash = btoa(text);
    alert("Base64 Hash (demo): " + hash);
}