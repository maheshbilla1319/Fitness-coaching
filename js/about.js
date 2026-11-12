
/* =========================================
   IRONPEAK FITNESS - ABOUT PAGE JAVASCRIPT
========================================= */


/* 1. AOS ANIMATIONS */

AOS.init({
    duration: 850,
    easing: "ease-out-cubic",
    once: true,
    offset: 65,
    mirror: false
});


/* 2. MOBILE MENU TOGGLE */

const burger = document.getElementById("burger");
const mainNav = document.getElementById("mainNav");

if (burger && mainNav) {

    burger.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("open");

        burger.classList.toggle("active", isOpen);

        burger.setAttribute("aria-expanded", isOpen);

        burger.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

    });

    // Close menu after clicking navigation link

    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");
            burger.classList.remove("active");

            burger.setAttribute("aria-expanded", "false");
            burger.setAttribute("aria-label", "Open menu");

        });

    });

    // Close menu when clicking outside

    document.addEventListener("click", (event) => {

        if (
            !mainNav.contains(event.target) &&
            !burger.contains(event.target)
        ) {

            mainNav.classList.remove("open");
            burger.classList.remove("active");

            burger.setAttribute("aria-expanded", "false");
            burger.setAttribute("aria-label", "Open menu");

        }

    });

}


/* 3. HEADER SCROLL EFFECT */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (header) {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

});


/* 4. ANIMATED STATISTICS COUNTERS */

const counters = document.querySelectorAll(".stat-card h3");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const statsSection = document.querySelector(".stats-section");

    if (!statsSection) return;

    const sectionPosition =
        statsSection.getBoundingClientRect().top;

    const screenPosition = window.innerHeight - 100;

    if (sectionPosition < screenPosition) {

        counterStarted = true;

        counters.forEach(counter => {

            const targetText = counter.textContent.trim();
            const target = parseInt(targetText.replace(/\D/g, ""), 10);

            const suffix = targetText.replace(/[0-9,]/g, "");

            if (!Number.isFinite(target)) return;

            let current = 0;

            const increment = Math.max(
                1,
                Math.ceil(target / 100)
            );

            const timer = setInterval(() => {

                current += increment;

                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                counter.textContent =
                    current.toLocaleString("en-IN") + suffix;

            }, 20);

        });

        window.removeEventListener("scroll", startCounters);

    }

}

window.addEventListener("scroll", startCounters);

startCounters();


/* 5. CURRENT YEAR */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* 6. SMOOTH SCROLLING */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* 7. CLOSE MOBILE MENU ON RESIZE */

window.addEventListener("resize", () => {

    if (window.innerWidth > 900 && mainNav && burger) {

        mainNav.classList.remove("open");
        burger.classList.remove("active");

        burger.setAttribute("aria-expanded", "false");

    }

});


/* 8. IMAGE LOADING EFFECT */

document.querySelectorAll(".coach-image img, .facility-card img, .story-image img")
.forEach(img => {

    img.addEventListener("error", () => {
        img.style.opacity = "0.4";
    });

});


console.log("IronPeak About Page JavaScript Loaded Successfully!");
// ===== BACK TO TOP BUTTON =====

const toTop = document.getElementById("toTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
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