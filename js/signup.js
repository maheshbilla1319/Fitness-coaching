
// =====================================
// IRONPEAK SIGNUP JAVASCRIPT
// =====================================

// AOS Animation
AOS.init({
    duration: 850,
    easing: "ease-out-cubic",
    once: true,
    offset: 60
});

// Get Elements
const signupForm = document.getElementById("signupForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const terms = document.getElementById("terms");
const signupMessage = document.getElementById("signupMessage");

// Password Show / Hide
const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const targetId = button.dataset.target;
        const input = document.getElementById(targetId);

        const isHidden = input.type === "password";

        input.type = isHidden ? "text" : "password";

        button.innerHTML = isHidden
            ? '<i class="bi bi-eye-slash"></i>'
            : '<i class="bi bi-eye"></i>';

        button.setAttribute(
            "aria-label",
            isHidden ? "Hide password" : "Show password"
        );

    });

});

// Signup Form Submit
signupForm.addEventListener("submit", (event) => {

    event.preventDefault();

    signupMessage.textContent = "";

    const nameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value;
    const confirmValue = confirmPassword.value;

    const selectedRole = document.querySelector(
        'input[name="role"]:checked'
    );

    // Name validation
    if (!nameValue) {
        signupMessage.textContent = "Please enter your full name.";
        fullname.focus();
        return;
    }

    // Email validation
    if (!emailValue || !email.validity.valid) {
        signupMessage.textContent = "Please enter a valid email address.";
        email.focus();
        return;
    }

    // Role validation
    if (!selectedRole) {
        signupMessage.textContent = "Please select Student or Admin role.";
        return;
    }

    // Password validation
    if (passwordValue.length < 6) {
        signupMessage.textContent =
            "Password must contain at least 6 characters.";
        password.focus();
        return;
    }

    // Confirm Password validation
    if (passwordValue !== confirmValue) {
        signupMessage.textContent = "Passwords do not match.";
        confirmPassword.focus();
        return;
    }

    // Terms validation
    if (!terms.checked) {
        signupMessage.textContent =
            "Please accept the Terms & Conditions.";
        return;
    }

    // Save role for the login page
    sessionStorage.setItem("ironpeakRole", selectedRole.value);

    // Save email for the login page
    sessionStorage.setItem("ironpeakSignupEmail", emailValue);

    // Frontend demo only: do not store passwords in browser storage.
    signupMessage.textContent =
        "Registration details validated! Redirecting to Login...";

    // Redirect to Login Page
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);

});
