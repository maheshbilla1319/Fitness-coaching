/* =================================
   IRONPEAK STUDENT DASHBOARD JS
================================= */


// AOS INITIALIZATION
if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 850,
        easing: "ease-out-cubic",
        once: true,
        offset: 65
    });
}


// =================================
// MOBILE SIDEBAR (defined first so other code can use it)
// =================================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");


// OPEN SIDEBAR
function openSidebar() {

    if (!sidebar || !sidebarOverlay) return;

    sidebar.classList.add("show");
    sidebarOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "true");
    }

}


// CLOSE SIDEBAR
function closeSidebar() {

    if (!sidebar || !sidebarOverlay) return;

    sidebar.classList.remove("show");
    sidebarOverlay.classList.remove("show");

    document.body.style.overflow = "";

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
    }

}


// TOGGLE MENU
if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        if (sidebar && sidebar.classList.contains("show")) {
            closeSidebar();
        } else {
            openSidebar();
        }

    });

}


// OVERLAY CLICK
if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
}


// ESC KEY
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
        closeSidebar();
    }

});


// =================================
// SMOOTH SCROLLING - LOGO & MENU
// =================================

const navLinks = document.querySelectorAll(
    '.sidebar-nav a[href^="#"], .logo[href^="#"]'
);


// Scroll to very top (works for window scroll AND .main-content scroll)
function scrollToTop() {

    window.scrollTo({ top: 0, behavior: "smooth" });

    const main = document.querySelector(".main-content");
    if (main) {
        main.scrollTo({ top: 0, behavior: "smooth" });
    }

}


// Highlight active sidebar link
function setActiveLink(id) {

    document.querySelectorAll(".sidebar-nav .nav-link").forEach(item => {
        item.classList.toggle("active", item.getAttribute("href") === id);
    });

}


navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        // Logo / Dashboard click -> go to top (dashboard)
        if (targetId === "#dashboard" || !target) {
            scrollToTop();
        } else {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        setActiveLink(targetId);
        closeSidebar();

    });

});


// =================================
// IMAGE SLIDER
// =================================

const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("sliderDots");
const nextButton = document.getElementById("nextSlide");
const prevButton = document.getElementById("prevSlide");

let currentSlide = 0;
let sliderInterval;

let dots = [];


// CREATE DOTS
if (slides.length > 0 && dotsContainer) {

    slides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.type = "button";
        dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

        dot.addEventListener("click", () => {
            showSlide(index);
            resetSlider();
        });

        dotsContainer.appendChild(dot);

    });

    dots = dotsContainer.querySelectorAll("button");

}


// SHOW SLIDE
function showSlide(index) {

    if (slides.length === 0) return;

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }

}


// NEXT SLIDE
function nextSlide() {
    showSlide(currentSlide + 1);
}


// PREVIOUS SLIDE
function previousSlide() {
    showSlide(currentSlide - 1);
}


// AUTOPLAY
function startSlider() {

    if (slides.length <= 1) return;

    clearInterval(sliderInterval);

    sliderInterval = setInterval(() => {
        nextSlide();
    }, 5000);

}


// RESET SLIDER
function resetSlider() {
    startSlider();
}


// NEXT BUTTON
if (nextButton) {

    nextButton.addEventListener("click", () => {
        nextSlide();
        resetSlider();
    });

}


// PREVIOUS BUTTON
if (prevButton) {

    prevButton.addEventListener("click", () => {
        previousSlide();
        resetSlider();
    });

}


// START SLIDER
if (slides.length > 0) {
    showSlide(0);
    startSlider();
}


// =================================
// CURRENT YEAR
// =================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// =================================
// ACTIVE MENU ON SCROLL
// =================================

const sections = document.querySelectorAll(
    "#dashboard, #workouts, #programs, #progress, #schedule, #nutrition"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink("#" + entry.target.id);
            }
        });

    }, {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));

}