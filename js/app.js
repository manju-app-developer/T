// Upload photo function
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
        window.location.href = "index.html"; // Redirect to feed
    };
}
