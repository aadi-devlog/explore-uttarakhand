document.addEventListener("DOMContentLoaded", function () {

    // Contact form validation
    const contactForm = document.querySelector("form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = contactForm.querySelector(
                'input[name="name"], #name'
            );
            const emailInput = contactForm.querySelector(
                'input[name="email"], #email'
            );
            const messageInput = contactForm.querySelector(
                'textarea[name="message"], #message'
            );

            let isValid = true;

            // Remove previous errors
            contactForm.querySelectorAll(".form-error").forEach(function (error) {
                error.remove();
            });

            // Show validation error
            function showError(input, message) {
                if (!input) return;

                isValid = false;
                input.style.borderColor = "#e74c3c";

                const error = document.createElement("small");
                error.className = "form-error";
                error.textContent = message;

                error.style.display = "block";
                error.style.color = "#e74c3c";
                error.style.marginTop = "5px";
                error.style.marginBottom = "10px";

                input.insertAdjacentElement("afterend", error);
            }

            // Reset errors when typing
            [nameInput, emailInput, messageInput].forEach(function (input) {
                if (input) {
                    input.addEventListener("input", function () {
                        input.style.borderColor = "";

                        const error = input.nextElementSibling;

                        if (error && error.classList.contains("form-error")) {
                            error.remove();
                        }
                    });
                }
            });

            // Name validation
            if (nameInput && nameInput.value.trim() === "") {
                showError(nameInput, "Please enter your name.");
            }

            // Email validation
            if (emailInput) {
                const email = emailInput.value.trim();

                if (email === "") {
                    showError(emailInput, "Please enter your email address.");
                } else {
                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

                    if (!emailPattern.test(email)) {
                        showError(
                            emailInput,
                            "Please enter a valid email address."
                        );
                    }
                }
            }

            // Message validation
            if (messageInput && messageInput.value.trim() === "") {
                showError(messageInput, "Please enter your message.");
            }

            // Stop if validation failed
            if (!isValid) {
                return;
            }

            // Show success message
            let successMessage = contactForm.querySelector(".form-success");

            if (!successMessage) {
                successMessage = document.createElement("div");
                successMessage.className = "form-success";

                successMessage.style.padding = "12px 15px";
                successMessage.style.marginTop = "15px";
                successMessage.style.borderRadius = "6px";
                successMessage.style.backgroundColor = "#d4edda";
                successMessage.style.color = "#155724";
                successMessage.style.border = "1px solid #c3e6cb";
                successMessage.style.textAlign = "center";

                contactForm.appendChild(successMessage);
            }

            successMessage.textContent =
                "Thank you! Your message has been sent successfully.";

            successMessage.style.display = "block";

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(function () {
                successMessage.style.display = "none";
            }, 5000);
        });
    }

    // Gallery lightbox
    const galleryImages = document.querySelectorAll(
        ".gallery img, .gallery-image, .destination-card img"
    );

    if (galleryImages.length > 0) {

        // Create lightbox
        const lightbox = document.createElement("div");
        lightbox.id = "imageLightbox";

        lightbox.style.display = "none";
        lightbox.style.position = "fixed";
        lightbox.style.zIndex = "9999";
        lightbox.style.left = "0";
        lightbox.style.top = "0";
        lightbox.style.width = "100%";
        lightbox.style.height = "100%";
        lightbox.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
        lightbox.style.alignItems = "center";
        lightbox.style.justifyContent = "center";
        lightbox.style.padding = "20px";
        lightbox.style.boxSizing = "border-box";

        const enlargedImage = document.createElement("img");

        enlargedImage.style.maxWidth = "90%";
        enlargedImage.style.maxHeight = "85%";
        enlargedImage.style.objectFit = "contain";
        enlargedImage.style.borderRadius = "8px";
        enlargedImage.style.boxShadow = "0 5px 25px rgba(0,0,0,0.5)";

        const closeButton = document.createElement("button");

        closeButton.innerHTML = "&times;";
        closeButton.setAttribute("aria-label", "Close image preview");

        closeButton.style.position = "absolute";
        closeButton.style.top = "20px";
        closeButton.style.right = "30px";
        closeButton.style.fontSize = "40px";
        closeButton.style.color = "white";
        closeButton.style.background = "none";
        closeButton.style.border = "none";
        closeButton.style.cursor = "pointer";
        closeButton.style.lineHeight = "1";

        lightbox.appendChild(enlargedImage);
        lightbox.appendChild(closeButton);
        document.body.appendChild(lightbox);

        // Open image
        galleryImages.forEach(function (image) {
            image.style.cursor = "pointer";

            image.addEventListener("click", function () {
                enlargedImage.src = image.src;
                enlargedImage.alt = image.alt || "Uttarakhand destination";

                lightbox.style.display = "flex";
                document.body.style.overflow = "hidden";
            });
        });

        // Close button
        closeButton.addEventListener("click", closeLightbox);

        // Close by clicking the background
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        // Close with Escape key
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && lightbox.style.display === "flex") {
                closeLightbox();
            }
        });

        function closeLightbox() {
            lightbox.style.display = "none";
            document.body.style.overflow = "";
        }
    }

    // Back to top button
    const backToTop = document.createElement("button");

    backToTop.id = "backToTop";
    backToTop.innerHTML = "&#8593;";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.title = "Back to top";

    backToTop.style.position = "fixed";
    backToTop.style.bottom = "25px";
    backToTop.style.right = "25px";
    backToTop.style.width = "45px";
    backToTop.style.height = "45px";
    backToTop.style.border = "none";
    backToTop.style.borderRadius = "50%";
    backToTop.style.backgroundColor = "#2e7d32";
    backToTop.style.color = "white";
    backToTop.style.fontSize = "22px";
    backToTop.style.cursor = "pointer";
    backToTop.style.zIndex = "1000";
    backToTop.style.display = "none";
    backToTop.style.boxShadow = "0 3px 10px rgba(0,0,0,0.3)";

    document.body.appendChild(backToTop);

    // Show or hide button while scrolling
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    // Smooth scroll to top
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Smooth navigation
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (targetId && targetId !== "#") {
                const target = document.querySelector(targetId);

                if (target) {
                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

});