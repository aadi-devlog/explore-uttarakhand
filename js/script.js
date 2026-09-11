document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // 1. CONTACT FORM VALIDATION
    // =========================================================
    const contactForm = document.querySelector("form");

    if (contactForm) {
        const nameInput = contactForm.querySelector('input[name="name"], #name');
        const emailInput = contactForm.querySelector('input[name="email"], #email');
        const messageInput = contactForm.querySelector('textarea[name="message"], #message');

        function showError(input, message) {
            if (!input) return;
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

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let isValid = true;

            contactForm.querySelectorAll(".form-error").forEach(function (error) {
                error.remove();
            });

            if (nameInput && nameInput.value.trim() === "") {
                showError(nameInput, "Please enter your name.");
                isValid = false;
            }

            if (emailInput) {
                const email = emailInput.value.trim();
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

                if (email === "") {
                    showError(emailInput, "Please enter your email address.");
                    isValid = false;
                } else if (!emailPattern.test(email)) {
                    showError(emailInput, "Please enter a valid email address.");
                    isValid = false;
                }
            }

            if (messageInput && messageInput.value.trim() === "") {
                showError(messageInput, "Please enter your message.");
                isValid = false;
            }

            if (!isValid) return;

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

            successMessage.textContent = "Thank you! Your message has been sent successfully.";
            successMessage.style.display = "block";
            contactForm.reset();

            setTimeout(function () {
                successMessage.style.display = "none";
            }, 5000);
        });
    }

    // =========================================================
    // 2. PLACES PAGE: ARRAY + OBJECTS + SEARCH + FILTER
    // =========================================================
    const placesTableBody = document.querySelector("#placesTableBody");
    const searchInput = document.querySelector("#placeSearch");
    const clearSearchButton = document.querySelector("#clearSearch");
    const locationFilter = document.querySelector("#locationFilter");
    const resultCount = document.querySelector("#resultCount");
    const recommendButton = document.querySelector("#recommendPlace");
    const recommendationBox = document.querySelector("#recommendationBox");

    // Array of objects used as the website's destination data.
    const destinations = [
        { id: 1, name: "Tapkeshwar Mahadev Temple", location: "Dehradun", famousFor: "Natural cave temple" },
        { id: 2, name: "Robber's Cave (Gucchupani)", location: "Dehradun", famousFor: "Natural river cave" },
        { id: 3, name: "Maldevta", location: "Dehradun", famousFor: "Song River and scenic riverside setting" },
        { id: 4, name: "Sahastradhara", location: "Dehradun", famousFor: "Thousand-fold springs" },

        { id: 5, name: "Kempty Falls", location: "Mussoorie", famousFor: "Waterfall and scenic valley" },
        { id: 6, name: "Gun Hill Point", location: "Mussoorie", famousFor: "Himalayan and valley views" },
        { id: 7, name: "Lal Tibba", location: "Mussoorie", famousFor: "Panoramic Himalayan views" },
        { id: 8, name: "Camel's Back Road", location: "Mussoorie", famousFor: "Scenic Himalayan views and walking route" },

        { id: 9, name: "Triveni Ghat", location: "Rishikesh", famousFor: "Ganga Aarti and riverside spirituality" },
        { id: 10, name: "Beatles Ashram", location: "Rishikesh", famousFor: "Meditation history and art-covered ashram" },
        { id: 11, name: "Ram Jhula", location: "Rishikesh", famousFor: "Pedestrian suspension bridge over the Ganga" },
        { id: 12, name: "Raghunath Temple", location: "Rishikesh", famousFor: "Historic Hindu temple" },

        { id: 13, name: "Naini Lake", location: "Nainital", famousFor: "Boating and lake views" },
        { id: 14, name: "Snow View Point", location: "Nainital", famousFor: "Panoramic Himalayan views" },
        { id: 15, name: "Tiffin Top", location: "Nainital", famousFor: "Hilltop picnic and panoramic views" },
        { id: 16, name: "Naina Devi Temple", location: "Nainital", famousFor: "Temple beside Naini Lake" },

        { id: 17, name: "Auli", location: "Chamoli", famousFor: "Skiing and Himalayan scenery" },
        { id: 18, name: "Valley of Flowers", location: "Chamoli", famousFor: "Alpine flowers and trekking" },
        { id: 19, name: "Hemkund Sahib", location: "Chamoli", famousFor: "High-altitude Sikh pilgrimage site" },
        { id: 20, name: "Badrinath Temple", location: "Chamoli", famousFor: "Major Himalayan pilgrimage site" },

        { id: 21, name: "Rudraprayag Sangam", location: "Rudraprayag", famousFor: "Alaknanda-Mandakini confluence" },
        { id: 22, name: "Kartik Swami Temple", location: "Rudraprayag", famousFor: "Hilltop temple and Himalayan views" },
        { id: 23, name: "Ukhimath", location: "Rudraprayag", famousFor: "Himalayan pilgrimage town" },
        { id: 24, name: "Madhyamaheshwar", location: "Rudraprayag", famousFor: "Panch Kedar temple and trekking" }
    ];

    // Verified local recommendation data. Each recommendation is tied to the selected
    // city/district so a place from another location cannot be suggested by mistake.
    const nearbyPlaces = {
        Dehradun: [
            { name: "Tapkeshwar Mahadev Temple", detail: "a natural cave temple on the banks of a stream" },
            { name: "Robber's Cave (Gucchupani)", detail: "a natural cave with a river flowing through it" },
            { name: "Maldevta", detail: "a scenic Song River area near Raipur, Dehradun" },
            { name: "Sahastradhara", detail: "a Dehradun attraction known for its thousand-fold springs" }
        ],
        Mussoorie: [
            { name: "Kempty Falls", detail: "a waterfall set in a scenic valley near Mussoorie" },
            { name: "Gun Hill Point", detail: "Mussoorie's second-highest peak with broad Himalayan and valley views" },
            { name: "Lal Tibba", detail: "a high viewpoint in Landour with panoramic Himalayan views" },
            { name: "Camel's Back Road", detail: "a well-known Mussoorie route with Himalayan scenery" }
        ],
        Rishikesh: [
            { name: "Triveni Ghat", detail: "a sacred riverside ghat famous for its Ganga Aarti" },
            { name: "Beatles Ashram", detail: "the former Chaurasi Kutia ashram associated with the Beatles' 1968 stay" },
            { name: "Ram Jhula", detail: "a landmark suspension bridge across the Ganga" },
            { name: "Raghunath Temple", detail: "a Hindu temple featured among Rishikesh's attractions" }
        ],
        Nainital: [
            { name: "Naini Lake", detail: "the crescent-shaped lake at the heart of Nainital" },
            { name: "Snow View Point", detail: "a 2,270-metre viewpoint overlooking the Himalayan peaks" },
            { name: "Tiffin Top", detail: "a popular hilltop picnic spot with panoramic views" },
            { name: "Naina Devi Temple", detail: "a revered temple located beside Naini Lake" }
        ],
        Chamoli: [
            { name: "Auli", detail: "a Chamoli destination known for skiing and Himalayan views" },
            { name: "Valley of Flowers", detail: "a UNESCO World Heritage Site known for alpine flowers" },
            { name: "Hemkund Sahib", detail: "a high-altitude Sikh pilgrimage site at 4,329 metres" },
            { name: "Badrinath Temple", detail: "a major pilgrimage temple in Chamoli district" }
        ],
        Rudraprayag: [
            { name: "Rudraprayag Sangam", detail: "the confluence of the Alaknanda and Mandakini rivers" },
            { name: "Kartik Swami Temple", detail: "a hilltop temple in Rudraprayag district with Himalayan views" },
            { name: "Ukhimath", detail: "a Himalayan pilgrimage town connected with the Panch Kedar circuit" },
            { name: "Madhyamaheshwar", detail: "a Rudraprayag district Panch Kedar site and trekking destination" }
        ]
    };

    let favoritePlaces = JSON.parse(localStorage.getItem("favoritePlaces")) || [];

    function saveFavorites() {
        localStorage.setItem("favoritePlaces", JSON.stringify(favoritePlaces));
    }

    function isFavorite(id) {
        return favoritePlaces.includes(id);
    }

    function toggleFavorite(id) {
        if (isFavorite(id)) {
            favoritePlaces = favoritePlaces.filter(function (placeId) {
                return placeId !== id;
            });
        } else {
            favoritePlaces.push(id);
        }
        saveFavorites();
        renderPlaces();
    }

    function getFilteredPlaces() {
        if (!placesTableBody) return [];

        const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
        const selectedLocation = locationFilter ? locationFilter.value : "all";

        // Normalize punctuation/spaces so searches such as
        // "gucchupani", "guchhupani", or "robber's cave" remain useful.
        const normalize = function (value) {
            return value
                .toLowerCase()
                .replace(/[’']/g, "")
                .replace(/[^a-z0-9]+/g, " ")
                .trim();
        };

        const query = normalize(searchText);

        return destinations.filter(function (place) {
            const searchableText = normalize(
                place.name + " " +
                place.location + " " +
                place.famousFor
            );

            // Also match each individual search word, making multi-word searches
            // like "nainital lake" and "mussoorie waterfall" work naturally.
            const searchWords = query ? query.split(/\s+/) : [];
            const matchesSearch = searchWords.every(function (word) {
                return searchableText.includes(word);
            });

            const matchesLocation =
                selectedLocation === "all" || place.location === selectedLocation;

            return matchesSearch && matchesLocation;
        });
    }

    function renderPlaces() {
        if (!placesTableBody) return;

        const filteredPlaces = getFilteredPlaces();
        placesTableBody.innerHTML = "";

        filteredPlaces.forEach(function (place) {
            const row = document.createElement("tr");

            const placeCell = document.createElement("td");
            placeCell.textContent = place.name;

            const locationCell = document.createElement("td");
            locationCell.textContent = place.location;

            const famousCell = document.createElement("td");
            famousCell.textContent = place.famousFor;

            const actionCell = document.createElement("td");
            const favoriteButton = document.createElement("button");
            favoriteButton.type = "button";
            favoriteButton.className = "favorite-button";
            favoriteButton.textContent = isFavorite(place.id) ? "★ Saved" : "☆ Save";
            favoriteButton.setAttribute(
                "aria-label",
                isFavorite(place.id)
                    ? "Remove " + place.name + " from favourites"
                    : "Save " + place.name + " to favourites"
            );

            favoriteButton.addEventListener("click", function () {
                toggleFavorite(place.id);
            });

            actionCell.appendChild(favoriteButton);
            row.appendChild(placeCell);
            row.appendChild(locationCell);
            row.appendChild(famousCell);
            row.appendChild(actionCell);
            placesTableBody.appendChild(row);
        });

        if (resultCount) {
            resultCount.textContent =
                filteredPlaces.length +
                (filteredPlaces.length === 1 ? " destination found" : " destinations found");
        }

        if (filteredPlaces.length === 0) {
            const emptyRow = document.createElement("tr");
            const emptyCell = document.createElement("td");
            emptyCell.colSpan = 4;
            emptyCell.textContent = "No destinations match your search.";
            emptyCell.style.textAlign = "center";
            emptyRow.appendChild(emptyCell);
            placesTableBody.appendChild(emptyRow);
        }
    }

    function updateSearchControls() {
        if (!searchInput || !clearSearchButton) return;

        clearSearchButton.style.display = searchInput.value.trim() ? "inline-block" : "none";
    }

    if (placesTableBody) {
        renderPlaces();
        updateSearchControls();

        if (searchInput) {
            searchInput.addEventListener("input", function () {
                renderPlaces();
                updateSearchControls();
            });
        }

        if (clearSearchButton) {
            clearSearchButton.addEventListener("click", function () {
                if (searchInput) {
                    searchInput.value = "";
                    searchInput.focus();
                }
                renderPlaces();
                updateSearchControls();
            });
        }

        if (locationFilter) {
            locationFilter.addEventListener("change", function () {
                renderPlaces();
                updateSearchControls();
            });
        }
    }

    if (recommendButton && recommendationBox) {
        recommendButton.addEventListener("click", function () {
            const selectedLocation = locationFilter ? locationFilter.value : "all";
            let location = selectedLocation;

            // When a city is not explicitly selected, use the location of the first search result.
            if (location === "all") {
                const matchingPlaces = getFilteredPlaces();
                if (matchingPlaces.length > 0) {
                    location = matchingPlaces[0].location;
                }
            }

            const source = nearbyPlaces[location];

            if (!source) {
                recommendationBox.textContent =
                    "Choose a location to get a recommendation from that city's nearby attractions.";
                return;
            }

            const randomPlace = source[Math.floor(Math.random() * source.length)];

            recommendationBox.textContent =
                "Try " + randomPlace.name + " in " + location + " for " + randomPlace.detail + ".";
        });
    }

    // =========================================================
    // 3. GALLERY LIGHTBOX + PHOTO NAME
    // =========================================================
    const galleryImages = document.querySelectorAll(
        ".gallery img, .gallery-image, .destination-card img"
    );

    const photoText = document.querySelector("#photoText");

    if (galleryImages.length > 0) {
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
        lightbox.style.flexDirection = "column";
        lightbox.style.padding = "20px";
        lightbox.style.boxSizing = "border-box";

        const enlargedImage = document.createElement("img");
        enlargedImage.style.maxWidth = "90%";
        enlargedImage.style.maxHeight = "75%";
        enlargedImage.style.objectFit = "contain";
        enlargedImage.style.borderRadius = "8px";
        enlargedImage.style.boxShadow = "0 5px 25px rgba(0,0,0,0.5)";

        const caption = document.createElement("p");
        caption.style.color = "white";
        caption.style.fontSize = "18px";
        caption.style.fontWeight = "bold";
        caption.style.marginTop = "12px";

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
        lightbox.appendChild(caption);
        lightbox.appendChild(closeButton);
        document.body.appendChild(lightbox);

        galleryImages.forEach(function (image) {
            image.style.cursor = "pointer";

            image.addEventListener("click", function () {
                const name = image.closest(".photo")?.dataset.name || image.alt || "Uttarakhand destination";
                enlargedImage.src = image.src;
                enlargedImage.alt = image.alt || "Uttarakhand destination";
                caption.textContent = name;

                if (photoText) {
                    photoText.textContent = "Selected: " + name;
                }

                lightbox.style.display = "flex";
                document.body.style.overflow = "hidden";
            });
        });

        function closeLightbox() {
            lightbox.style.display = "none";
            document.body.style.overflow = "";
        }

        closeButton.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && lightbox.style.display === "flex") {
                closeLightbox();
            }
        });
    }

    // =========================================================
    // 4. BACK TO TOP BUTTON
    // =========================================================
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

    window.addEventListener("scroll", function () {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // =========================================================
    // 5. SMOOTH NAVIGATION
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (targetId && targetId !== "#") {
                const target = document.querySelector(targetId);

                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });
});
