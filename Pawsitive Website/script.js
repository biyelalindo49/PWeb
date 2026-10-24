
/* ========================================
   PAWSITIVE PET ACADEMY
   Website JavaScript
======================================== */

function toggleMenu() {
    const navbar = document.getElementById("navbar");
    const menuButton = document.querySelector(".menu-toggle");

    if (!navbar) {
        return;
    }

    navbar.classList.toggle("active");

    const isOpen = navbar.classList.contains("active");

    if (menuButton) {
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
        menuButton.textContent = isOpen ? "Close" : "Menu";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    const menuButton = document.querySelector(".menu-toggle");

    /* Close the mobile menu after a navigation link is clicked */
    if (navbar) {
        const navigationLinks = navbar.querySelectorAll("a");

        navigationLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navbar.classList.remove("active");

                if (menuButton) {
                    menuButton.setAttribute("aria-expanded", "false");
                    menuButton.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );
                    menuButton.textContent = "Menu";
                }
            });
        });
    }

    /* Set the current year in the footer */
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* Highlight the current page in the navigation */
    if (navbar) {
        const currentPage = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

        navbar.querySelectorAll("a").forEach(function (link) {
            const linkPage = link.getAttribute("href");

            if (!linkPage || linkPage.startsWith("#")) {
                return;
            }

            const linkFile = linkPage.split("/").pop().toLowerCase();

            if (linkFile === currentPage) {
                link.setAttribute("aria-current", "page");
                link.classList.add("current-page");
            }
        });
    }

    const galleryFilters = document.querySelectorAll(".gallery-filter");
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryFilters.forEach(function (filter) {
        filter.addEventListener("click", function () {
            const selectedCategory = filter.dataset.filter;

            galleryFilters.forEach(function (button) {
                const isSelected = button === filter;
                button.setAttribute("aria-pressed", String(isSelected));
                button.classList.toggle("btn-outline", !isSelected);
            });

            galleryItems.forEach(function (item) {
                item.hidden = selectedCategory !== "all" &&
                    item.dataset.category !== selectedCategory;
            });
        });
    });

    const registrationForm = document.getElementById("registration-form");
    const registrationMessage = document.getElementById("registration-message");

    if (registrationForm && registrationMessage) {
        const registrationFields = registrationForm.querySelectorAll(
            "input, select, textarea"
        );
        const nameFields = registrationForm.querySelectorAll(
            "#first-name, #last-name"
        );
        const namePattern = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;
        const todayDate = new Date();
        const today = [
            todayDate.getFullYear(),
            String(todayDate.getMonth() + 1).padStart(2, "0"),
            String(todayDate.getDate()).padStart(2, "0")
        ].join("-");
        const birthDate = registrationForm.querySelector("#birth-date");
        const startDate = registrationForm.querySelector("#start-date");

        birthDate.max = today;
        startDate.min = today;

        function validateField(field) {
            const value = field.value.trim();

            if (field.matches("#first-name, #last-name")) {
                field.setCustomValidity(
                    !value && field.value
                        ? "Please enter a name."
                        : value && !namePattern.test(value)
                        ? "Enter a name using letters only. Spaces, apostrophes, and hyphens are allowed."
                        : ""
                );
            } else if (field.id === "city") {
                field.setCustomValidity(
                    !value && field.value
                        ? "Please enter a city or town."
                        : value && !namePattern.test(value)
                        ? "Enter a city or town using letters only."
                        : ""
                );
            } else if (field.id === "phone") {
                field.setCustomValidity(
                    value && !/^\+?[0-9][0-9\s()-]{6,18}$/.test(value)
                        ? "Enter a valid phone number using digits and optional spaces, parentheses, or hyphens."
                        : ""
                );
            }
        }

        registrationFields.forEach(function (field) {
            field.addEventListener("input", function () {
                validateField(field);

                if (field.checkValidity()) {
                    field.removeAttribute("aria-invalid");
                }
            });

            field.addEventListener("change", function () {
                validateField(field);

                if (field.checkValidity()) {
                    field.removeAttribute("aria-invalid");
                }
            });

            field.addEventListener("blur", function () {
                validateField(field);

                if (field.value && !field.checkValidity()) {
                    field.setAttribute("aria-invalid", "true");
                    field.reportValidity();
                }
            });
        });

        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            registrationFields.forEach(validateField);

            if (!registrationForm.checkValidity()) {
                const invalidFields = registrationForm.querySelectorAll(":invalid");

                invalidFields.forEach(function (field) {
                    field.setAttribute("aria-invalid", "true");
                });

                registrationMessage.setAttribute("role", "alert");
                registrationMessage.textContent =
                    "Please correct the highlighted fields. Names must contain letters only.";
                registrationMessage.hidden = false;
                invalidFields[0].focus();
                invalidFields[0].reportValidity();
                return;
            }

            registrationFields.forEach(function (field) {
                field.removeAttribute("aria-invalid");
            });

            registrationMessage.setAttribute("role", "status");
            registrationMessage.textContent =
                "Thank you for your interest! This demonstration form is not connected to a registration system yet.";
            registrationMessage.hidden = false;
        });

        registrationFields.forEach(function (field) {
            field.addEventListener("input", function () {
                if (registrationForm.checkValidity()) {
                    registrationMessage.hidden = true;
                    registrationMessage.textContent = "";
                }
            });
        });
    }
});
