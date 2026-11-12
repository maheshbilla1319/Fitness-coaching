/* ===== fitness.js : plan tabs, calorie calculator, interval timer ===== */
document.addEventListener('DOMContentLoaded', () => {
  // plan tabs
  const tabs = document.querySelectorAll('#planTabs .tab'), plans = document.querySelectorAll('.plan-body');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('on')); plans.forEach(p => p.classList.remove('on'));
    t.classList.add('on'); document.getElementById(t.dataset.tab).classList.add('on');
  }));

  // calorie calculator (Mifflin-St Jeor)
  const cal = document.getElementById('calForm');
  cal.addEventListener('submit', e => {
    e.preventDefault();
    const age = +cAge.value, h = +cH.value, w = +cW.value, act = +cAct.value;
    if (!age || !h || !w) { calSub.textContent = 'Please fill in every field.'; return; }
    const bmr = 10 * w + 6.25 * h - 5 * age + (cSex.value === 'm' ? 5 : -161);
    const tdee = Math.round(bmr * act);
    calMain.textContent = tdee.toLocaleString();
    calSub.textContent = 'kcal per day';
    calSplit.innerHTML = `<div><b>${tdee - 400}</b>To lose fat</div><div><b>${tdee + 300}</b>To build muscle</div>`;
  });

  // interval timer
  let timer = null, phase = 'ready', left = 0, round = 0;
  const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  const set = (p, secs) => { phase = p; left = secs; clock.textContent = fmt(left); clock.classList.toggle('rest', p === 'rest'); tState.textContent = p === 'work' ? `Work: round ${round} of ${+tRounds.value}` : p === 'rest' ? 'Rest' : p === 'done' ? 'Workout complete' : 'Ready'; };
  const stop = () => { clearInterval(timer); timer = null; tStart.textContent = 'Start'; };
  tStart.addEventListener('click', () => {
    if (timer) { stop(); tStart.textContent = 'Resume'; return; }
    if (phase === 'ready' || phase === 'done') { round = 1; set('work', +tWork.value); }
    tStart.textContent = 'Pause';
    timer = setInterval(() => {
      left--;
      if (left > 0) { clock.textContent = fmt(left); return; }
      if (phase === 'work') { if (round >= +tRounds.value) { stop(); set('done', 0); return; } set('rest', +tRest.value); }
      else { round++; set('work', +tWork.value); }
    }, 1000);
  });
  tReset.addEventListener('click', () => { stop(); round = 0; set('ready', +tWork.value); });
  [tWork].forEach(el => el.addEventListener('change', () => { if (!timer && (phase === 'ready' || phase === 'done')) set('ready', +tWork.value); }));
});