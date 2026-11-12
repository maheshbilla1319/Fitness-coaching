/* ===== services.js : category filter + FAQ accordion ===== */
document.addEventListener('DOMContentLoaded', () => {
  // filter
  const chips = document.querySelectorAll('#filters .chip'), rows = document.querySelectorAll('.svc-row');
  chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(x => x.classList.remove('on')); c.classList.add('on');
    const f = c.dataset.f;
    rows.forEach(r => r.classList.toggle('hide', f !== 'all' && r.dataset.cat !== f));
    if (window.AOS) setTimeout(() => AOS.refresh(), 50);
  }));

  // accordion (one open at a time)
  const items = document.querySelectorAll('.acc-item');
  items.forEach(it => it.querySelector('.acc-q').addEventListener('click', () => {
    const open = it.classList.contains('open');
    items.forEach(o => { o.classList.remove('open'); o.querySelector('.acc-a').style.maxHeight = null; });
    if (!open) { it.classList.add('open'); const a = it.querySelector('.acc-a'); a.style.maxHeight = a.scrollHeight + 'px'; }
  }));
});