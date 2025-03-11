document.addEventListener("DOMContentLoaded", function () {
    const loginContainer = document.querySelector(".login-container");
    const homeContainer = document.querySelector(".feed-container");
    const exploreContainer = document.querySelector(".explore-container");
    const profileContainer = document.querySelector(".profile-container");
    const uploadForm = document.querySelector("#uploadForm");
    const fileInput = document.querySelector("#fileInput");
    const captionInput = document.querySelector("#captionInput");
    const feed = document.querySelector("#feed");
    const exploreFeed = document.querySelector("#exploreFeed");
    const profileFeed = document.querySelector("#profileFeed");
    const loginButton = document.querySelector("#loginButton");
    const usernameInput = document.querySelector("#username");
    const logoutButton = document.querySelector("#logoutButton");
    const exploreButton = document.querySelector("#exploreButton");

    let currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        homeContainer.style.display = "none";
        exploreContainer.style.display = "none";
        profileContainer.style.display = "none";
    } else {
        loginContainer.style.display = "none";
        loadFeed();
        loadExploreFeed();
        loadProfileFeed();
    }

    loginButton.addEventListener("click", function () {
        const username = usernameInput.value.trim();
        if (username.length >= 3) {
            localStorage.setItem("currentUser", username);
            location.reload();
        } else {
            alert("Username must be at least 3 characters long!");
        }
    });

    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        location.reload();
    });

    uploadForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const file = fileInput.files[0];
        const caption = captionInput.value.trim();

        if (file && caption) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const imageData = event.target.result;
                const post = {
                    username: currentUser,
                    image: imageData,
                    caption: caption,
                    time: new Date().toISOString(),
                };
                savePost(post);
                loadFeed();
                loadProfileFeed();
                uploadForm.reset();
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select an image and add a caption!");
        }
    });

    function savePost(post) {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.unshift(post);
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    function loadFeed() {
        feed.innerHTML = "";
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.forEach((post) => {
            const postElement = createPostElement(post);
            feed.appendChild(postElement);
        });
    }

    function loadExploreFeed() {
        exploreFeed.innerHTML = "";
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        let randomPosts = shuffleArray(posts).slice(0, 10);
        randomPosts.forEach((post) => {
            const postElement = createPostElement(post);
            exploreFeed.appendChild(postElement);
        });
    }

    function loadProfileFeed() {
        profileFeed.innerHTML = "";
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts
            .filter((post) => post.username === currentUser)
            .forEach((post) => {
                const postElement = createPostElement(post, true);
                profileFeed.appendChild(postElement);
            });
    }

    function createPostElement(post, isProfile = false) {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        postDiv.innerHTML = `
            <h4>@${post.username}</h4>
            <img src="${post.image}" alt="Uploaded photo">
            <p>${post.caption}</p>
            <span>${formatTimeAgo(post.time)}</span>
            ${isProfile ? `<button class="delete-btn" data-time="${post.time}">Delete</button>` : ""}
        `;

        if (isProfile) {
            postDiv.querySelector(".delete-btn").addEventListener("click", function () {
                deletePost(post.time);
            });
        }

        return postDiv;
    }

    function deletePost(time) {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts = posts.filter((post) => post.time !== time);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadProfileFeed();
        loadFeed();
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function formatTimeAgo(timestamp) {
        const now = new Date();
        const postDate = new Date(timestamp);
        const secondsAgo = Math.floor((now - postDate) / 1000);

        if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
        if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minutes ago`;
        if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hours ago`;
        return `${Math.floor(secondsAgo / 86400)} days ago`;
    }

    exploreButton.addEventListener("click", function () {
        homeContainer.style.display = "none";
        exploreContainer.style.display = "block";
        profileContainer.style.display = "none";
        loadExploreFeed();
    });

});
