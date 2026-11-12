
/* ===================================
   IRONPEAK ADMIN DASHBOARD JAVASCRIPT
=================================== */

// AOS ANIMATION
AOS.init({
    duration: 850,
    easing: "ease-out-cubic",
    once: true,
    offset: 65
});


// IMAGE SLIDER
const slides = document.querySelectorAll(".admin-slide");
const dotsContainer = document.getElementById("sliderDots");

const nextButton = document.getElementById("nextSlide");
const prevButton = document.getElementById("prevSlide");

let currentSlide = 0;
let sliderTimer;


// CREATE SLIDER DOTS
slides.forEach((slide, index) => {

    const dot = document.createElement("button");

    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        showSlide(index);
        restartSlider();
    });

    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("button");


// SHOW SLIDE
function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}


// NEXT AND PREVIOUS
function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}


// AUTOPLAY
function startSlider() {
    sliderTimer = setInterval(nextSlide, 5000);
}

function restartSlider() {
    clearInterval(sliderTimer);
    startSlider();
}

nextButton.addEventListener("click", () => {
    nextSlide();
    restartSlider();
});

prevButton.addEventListener("click", () => {
    previousSlide();
    restartSlider();
});

startSlider();


// MOBILE SIDEBAR
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar() {
    sidebar.classList.add("show");
    sidebarOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeSidebar() {
    sidebar.classList.remove("show");
    sidebarOverlay.classList.remove("show");
    document.body.style.overflow = "";
}

menuToggle.addEventListener("click", () => {

    if (sidebar.classList.contains("show")) {
        closeSidebar();
    } else {
        openSidebar();
    }

});

sidebarOverlay.addEventListener("click", closeSidebar);


// CLOSE SIDEBAR AFTER NAVIGATION
document.querySelectorAll(".sidebar-nav a").forEach(link => {

    link.addEventListener("click", () => {
        closeSidebar();
    });

});


// ACTIVE SIDEBAR MENU
document.querySelectorAll(".sidebar-nav a").forEach(link => {

    link.addEventListener("click", () => {

        document.querySelectorAll(".sidebar-nav a").forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


// FOOTER YEAR
document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// ESCAPE KEY CLOSES MOBILE MENU
document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeSidebar();
    }

});
