/* ===== script.js : shared on every page + home page features ===== */
document.addEventListener('DOMContentLoaded', () => {
  // AOS animations
  if (window.AOS) AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out-cubic' });

  // footer year
  const yr = document.getElementById('year'); if (yr) yr.textContent = new Date().getFullYear();

const burger = document.getElementById("burger");
const mainNav = document.getElementById("mainNav");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    mainNav.classList.toggle("open");

    const isOpen = burger.classList.contains("active");
    burger.setAttribute("aria-expanded", isOpen);
    burger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});


  // sticky header + back to top
  const header = document.getElementById('header'), toTop = document.getElementById('toTop');
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 60);
    if (toTop) toTop.classList.toggle('show', window.scrollY > 500);
  };
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // counters
  const counters = document.querySelectorAll('.count');
  if (counters.length) {
    const run = el => {
      const target = +el.dataset.target, dur = 1600, t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
        if (p < 1) requestAnimationFrame(tick); else el.textContent = target.toLocaleString() + (target >= 1000 ? '+' : '');
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { run(e.target); o.unobserve(e.target); } }), { threshold: .5 });
    counters.forEach(c => io.observe(c));
  }

  // BMI calculator (home)
  const bmiForm = document.getElementById('bmiForm');
  if (bmiForm) {
    bmiForm.addEventListener('submit', e => {
      e.preventDefault();
      const h = +document.getElementById('bmiH').value / 100, w = +document.getElementById('bmiW').value;
      const val = document.getElementById('bmiVal'), txt = document.getElementById('bmiTxt');
      if (!h || !w) { val.textContent = '--'; txt.textContent = 'Please enter both height and weight.'; return; }
      const bmi = w / (h * h);
      val.textContent = bmi.toFixed(1);
      txt.textContent = bmi < 18.5 ? 'Underweight. A coach can help you build up safely.'
        : bmi < 25 ? 'Healthy range. Keep training to stay strong.'
        : bmi < 30 ? 'Overweight range. A mix of strength and cardio works well.'
        : 'Obese range. Start with a coach-led plan.';
    });
  }

  // testimonial slider (home)
  const slides = document.querySelectorAll('#slider .slide'), dots = document.querySelectorAll('#dots button');
  if (slides.length) {
    let i = 0, timer;
    const show = n => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('active', k === i));
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => show(i + 1), 5000); };
    dots.forEach((d, k) => d.addEventListener('click', () => { show(k); auto(); }));
    auto();
  }

  // CTA FORM VALIDATION AND REDIRECT

const ctaForm = document.getElementById("ctaForm");

if (ctaForm) {
    ctaForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("ctaMail").value.trim();
        const message = document.getElementById("ctaMsg");

        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Empty validation
        if (email === "") {
            message.textContent = "Please enter your email address.";
            message.style.color = "#ff6b6b";
            return;
        }

        // Email validation
        if (!emailPattern.test(email)) {
            message.textContent = "Please enter a valid email address.";
            message.style.color = "#ff6b6b";
            return;
        }

        // Success
        message.textContent = "Email submitted successfully! Redirecting...";
        message.style.color = "#D6A84F";

        ctaForm.querySelector("button").disabled = true;

        // Redirect to 404 page
        setTimeout(function () {
            window.location.href = "404.html";
        }, 1500);
    });
}
});