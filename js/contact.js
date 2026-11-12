
/* =====================================
   IRONPEAK CONTACT PAGE JAVASCRIPT
===================================== */


/* ===== AOS ANIMATION ===== */

if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 850,
        once: true,
        offset: 60,
        easing: "ease-out-cubic"
    });
}


/* ===== MOBILE NAVIGATION ===== */

const burger = document.getElementById("burger");
const mainNav = document.getElementById("mainNav");

if (burger && mainNav) {

    burger.addEventListener("click", function () {

        const isOpen = mainNav.classList.toggle("open");

        burger.classList.toggle("active", isOpen);
        burger.setAttribute("aria-expanded", isOpen);
        burger.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

        document.body.classList.toggle("menu-open", isOpen);
    });

    // Close menu after clicking a navigation link
    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function () {

            mainNav.classList.remove("open");
            burger.classList.remove("active");
            burger.setAttribute("aria-expanded", "false");
            burger.setAttribute("aria-label", "Open menu");

            document.body.classList.remove("menu-open");
        });

    });

    // Close menu with Escape
    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {
            mainNav.classList.remove("open");
            burger.classList.remove("active");
            burger.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        }

    });
}


/* ===== FAQ ACCORDION ===== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    item.addEventListener("toggle", function () {

        // When one FAQ opens, close all other FAQs
        if (item.open) {

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {
                    otherItem.open = false;
                }

            });

        }

    });

});


/* ===== CONTACT FORM VALIDATION ===== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const nameInput = document.getElementById("cName");
    const emailInput = document.getElementById("cEmail");
    const phoneInput = document.getElementById("cPhone");
    const goalInput = document.getElementById("cGoal");
    const msgInput = document.getElementById("cMsg");

    const formMsg = document.getElementById("formMsg");
    const submitBtn = document.getElementById("contactSubmit");

    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const phonePattern = /^[6-9]\d{9}$/;

    const namePattern = /^[a-zA-Z][a-zA-Z\s'-]{2,49}$/;


    // Show field error
    function showError(input, message) {

        const field = input.closest(".field");
        const error = field.querySelector(".err");

        error.textContent = message;
        input.classList.add("invalid");

    }


    // Clear field error
    function clearError(input) {

        const field = input.closest(".field");
        const error = field.querySelector(".err");

        error.textContent = "";
        input.classList.remove("invalid");

    }


    // Clear errors while typing
    [nameInput, emailInput, phoneInput, goalInput, msgInput]
        .forEach(input => {

            input.addEventListener("input", function () {
                clearError(input);
                formMsg.textContent = "";
            });

            input.addEventListener("change", function () {
                clearError(input);
                formMsg.textContent = "";
            });

        });


    // Form submission
    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let isValid = true;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const goal = goalInput.value;
        const message = msgInput.value.trim();

        // Clear old errors
        [nameInput, emailInput, phoneInput, goalInput, msgInput]
            .forEach(clearError);

        formMsg.textContent = "";


        // Name validation
        if (!name) {

            showError(nameInput, "Please enter your full name.");
            isValid = false;

        } else if (!namePattern.test(name)) {

            showError(nameInput, "Enter a valid name with at least 3 letters.");
            isValid = false;

        }


        // Email validation
        if (!email) {

            showError(emailInput, "Please enter your email address.");
            isValid = false;

        } else if (!emailPattern.test(email)) {

            showError(emailInput, "Please enter a valid email address.");
            isValid = false;

        }


        // Phone validation
        if (!phone) {

            showError(phoneInput, "Please enter your mobile number.");
            isValid = false;

        } else if (!phonePattern.test(phone)) {

            showError(
                phoneInput,
                "Enter a valid 10-digit Indian mobile number."
            );

            isValid = false;

        }


        // Fitness goal validation
        if (!goal) {

            showError(goalInput, "Please select your fitness goal.");
            isValid = false;

        }


        // Message validation
        if (!message) {

            showError(msgInput, "Please enter your message.");
            isValid = false;

        } else if (message.length < 10) {

            showError(
                msgInput,
                "Message must contain at least 10 characters."
            );

            isValid = false;

        } else if (message.length > 1000) {

            showError(
                msgInput,
                "Message cannot exceed 1000 characters."
            );

            isValid = false;

        }


        // Stop submission if errors exist
        if (!isValid) {

            formMsg.textContent = "Please correct the errors above.";
            formMsg.style.color = "#ff8585";

            const firstInvalid = contactForm.querySelector(".invalid");

            if (firstInvalid) {
                firstInvalid.focus();
            }

            return;

        }


        // Success message
        formMsg.textContent =
            "Your form is valid! Redirecting to the next page...";

        formMsg.style.color = "#D6A84F";

        submitBtn.disabled = true;
        submitBtn.innerHTML =
            'Please wait <i class="bi bi-arrow-repeat"></i>';


        // Redirect to 404 page
        setTimeout(function () {

            window.location.href = "404.html";

        }, 1500);

    });

}


/* ===== BACK TO TOP ===== */

const toTop = document.getElementById("toTop");

if (toTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            toTop.classList.add("show");
        } else {
            toTop.classList.remove("show");
        }

    });

    toTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ===== DYNAMIC COPYRIGHT YEAR ===== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

