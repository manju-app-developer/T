// 🚀 Load Home Feed
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("feed")) {
        loadFeed();
    }
    if (document.getElementById("profile-feed")) {
        loadProfile();
    }
});

// ✅ User Login (Username-based)
function login() {
    let username = document.getElementById("usernameInput").value.trim();
    if (username === "") {
        alert("Please enter a username!");
        return;
    }
    localStorage.setItem("username", username);
    window.location.href = "index.html"; // Redirect to home feed
}

// ⬇️ Load Feed (All Users' Photos)
function loadFeed() {
    let feedContainer = document.getElementById("feed");
    let photos = JSON.parse(localStorage.getItem("photos")) || [];

    feedContainer.innerHTML = photos.length === 0 ? "<p>No photos yet!</p>" : "";

    photos.forEach(photo => {
        let post = document.createElement("div");
        post.classList.add("post");
        post.innerHTML = `
            <p><strong>@${photo.username}</strong></p>
            <img src="${photo.image}" alt="Travel Photo">
            <p>${photo.caption}</p>
        `;
        feedContainer.appendChild(post);
    });
}

// 📤 Upload Photo
function uploadPhoto() {
    let fileInput = document.getElementById("photoInput").files[0];
    let caption = document.getElementById("captionInput").value.trim();
    let username = localStorage.getItem("username");

    if (!fileInput) {
        alert("Please select a photo!");
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(fileInput);
    reader.onload = function () {
        let imageBase64 = reader.result;
        let photos = JSON.parse(localStorage.getItem("photos")) || [];

        photos.push({
            username: username,
            image: imageBase64,
            caption: caption
        });

        localStorage.setItem("photos", JSON.stringify(photos));
        window.location.href = "index.html"; // Redirect to home feed
    };
}

// 🏠 Load Profile Page (User's Own Photos)
function loadProfile() {
    let username = localStorage.getItem("username");
    document.getElementById("profile-username").textContent = username;

    let feedContainer = document.getElementById("profile-feed");
    let photos = JSON.parse(localStorage.getItem("photos")) || [];
    let userPhotos = photos.filter(photo => photo.username === username);

    feedContainer.innerHTML = userPhotos.length === 0 ? "<p>No photos uploaded yet!</p>" : "";

    userPhotos.forEach((photo, index) => {
        let post = document.createElement("div");
        post.classList.add("profile-item");
        post.innerHTML = `
            <img src="${photo.image}" alt="Travel Photo">
            <p>${photo.caption}</p>
            <div class="profile-actions">
                <button onclick="deletePhoto(${index})">Delete</button>
            </div>
        `;
        feedContainer.appendChild(post);
    });
}

// ❌ Delete Photo from Profile
function deletePhoto(index) {
    let photos = JSON.parse(localStorage.getItem("photos")) || [];
    let username = localStorage.getItem("username");

    // Remove only user's own photo
    photos = photos.filter((photo, i) => !(photo.username === username && i === index));

    localStorage.setItem("photos", JSON.stringify(photos));
    loadProfile(); // Refresh profile feed
}

// 🚀 Logout Function (Clears Username)
function logout() {
    localStorage.removeItem("username");
    window.location.href = "login.html"; // Redirect to login page
}
