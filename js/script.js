const photos = document.querySelectorAll(".photo");
const photoText = document.getElementById("photoText");

photos.forEach(function(photo) {
    photo.addEventListener("click", function() {
        photoText.textContent = "You selected: " + photo.dataset.name;
    });
});

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("formMessage");

        if (name === "" || email === "" || message === "") {
            formMessage.textContent = "Please fill in all the fields.";
            return;
        }

        formMessage.textContent = "Thank you, " + name + "! Your message has been received.";
        form.reset();
    });
}
