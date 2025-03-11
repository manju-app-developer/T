// Check if user is already logged in
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("username")) {
        window.location.href = "index.html"; // Redirect to feed if logged in
    }
});

// Login function
function login() {
    let username = document.getElementById("username").value.trim();
    if (username === "") {
        alert("Please enter a username!");
        return;
    }
    localStorage.setItem("username", username);
    window.location.href = "index.html"; // Redirect to feed
}
