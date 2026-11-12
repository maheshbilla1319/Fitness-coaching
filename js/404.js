/* ===== 404.js : countdown redirect + shows the wrong address ===== */
document.addEventListener('DOMContentLoaded', () => {
  const secEl = document.getElementById('sec'), stop = document.getElementById('stopRedirect'), box = document.getElementById('redirect');
  let left = 15;
  const timer = setInterval(() => {
    left--; secEl.textContent = left;
    if (left <= 0) { clearInterval(timer); window.location.href = 'index.html'; }
  }, 1000);
  stop.addEventListener('click', () => { clearInterval(timer); box.textContent = 'Auto redirect stopped. Use the buttons above to continue.'; });
});


function goBack() {
    if (document.referrer && document.referrer !== window.location.href) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
}
