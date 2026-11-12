
// ===== IRONPEAK LOGIN JAVASCRIPT =====

// AOS Animation
AOS.init({
    duration: 850,
    once: true,
    offset: 60,
    easing: "ease-out-cubic"
});

// Elements
const loginForm = document.getElementById("loginForm");
const role = document.getElementById("role");
const email = document.getElementById("email");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginButton = document.getElementById("loginButton");
const formMessage = document.getElementById("formMessage");

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Show / Hide Password
togglePassword.addEventListener("click", () => {
    const isPassword = password.type === "password";

    password.type = isPassword ? "text" : "password";

    togglePassword.innerHTML = isPassword
        ? '<i class="bi bi-eye-slash"></i>'
        : '<i class="bi bi-eye"></i>';

    togglePassword.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
    );
});

// Clear errors
function clearErrors() {
    document.getElementById("roleError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    formMessage.textContent = "";
}

// Login Form
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    clearErrors();

    let valid = true;

    const selectedRole = role.value;
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    // Role validation
    if (!selectedRole) {
        document.getElementById("roleError").textContent =
            "Please select your role.";
        valid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
        document.getElementById("emailError").textContent =
            "Email address is required.";
        valid = false;
    } else if (!emailPattern.test(emailValue)) {
        document.getElementById("emailError").textContent =
            "Please enter a valid email address.";
        valid = false;
    }

    // Password validation
    if (!passwordValue) {
        document.getElementById("passwordError").textContent =
            "Password is required.";
        valid = false;
    } else if (passwordValue.length < 6) {
        document.getElementById("passwordError").textContent =
            "Password must contain at least 6 characters.";
        valid = false;
    }

    if (!valid) return;

    // Redirect based on selected role
    loginButton.disabled = true;
    loginButton.innerHTML =
        'PLEASE WAIT <i class="bi bi-arrow-repeat"></i>';

    formMessage.textContent = "Login successful! Redirecting...";

    setTimeout(() => {
        if (selectedRole === "student") {
            window.location.href = "student.html";
        } else if (selectedRole === "admin") {
            window.location.href = "admin.html";
        }
    }, 1000);
});
