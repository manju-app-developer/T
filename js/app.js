// Redirect to login if user is not logged in
document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("username")) {
        window.location.href = "login.html";
    } else {
        loadFeed();
    }
});

// Logout function
function logout() {
    localStorage.removeItem("username");
    window.location.href = "login.html";
}

// Load Feed from LocalStorage
function loadFeed() {
    let feedContainer = document.getElementById("feed");
    let photos = JSON.parse(localStorage.getItem("photos")) || [];

    if (photos.length === 0) {
        feedContainer.innerHTML = "<p>No travel photos uploaded yet!</p>";
        return;
    }

    photos.forEach(photo => {
        let post = document.createElement("div");
        post.classList.add("feed-item");
        post.innerHTML = `
            <img src="${photo.image}" alt="Travel Photo">
            <p><strong>@${photo.username}</strong></p>
            <p>${photo.caption}</p>
        `;
        feedContainer.appendChild(post);
    });
}
