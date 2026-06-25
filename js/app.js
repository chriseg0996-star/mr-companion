// MapleRoyals Companion — Main App Logic

// ══════════════════════════════════════════════
// NAV
// ══════════════════════════════════════════════
const PAGE_TITLES = {
  home: 'Start Here', leveling: 'Leveling', pqs: 'Party Quests', bosses: 'Bosses',
  items: 'Items', jobadv: 'Jobs', quiz: 'Class Quiz', gear: 'Gear',
  checklist: 'Daily', tools: 'Tools', hpwash: 'HP Wash', scrolls: 'Scrolls',
  mesos: 'Mesos', party: 'Party',
};

function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  if (btn) btn.classList.add('active');
  else {
    const match = document.querySelector(`.nav-btn[data-page="${id}"]`);
    if (match) match.classList.add('active');
  }
  document.title = (PAGE_TITLES[id] || 'Guide') + ' — MR Companion';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ══════════════════════════════════════════════
// HOME
// ══════════════════════════════════════════════
function renderHome() {
  document.getElementById('guide-grid').innerHTML = GUIDE_SECTIONS.map(s => `
    <div class="guide-card" onclick="showPage('${s.id}')">
      <div class="guide-icon">${s.icon}</div>
      <div class="guide-title">${s.title}</div>
      <div class="guide-desc">${s.desc}</div>
    </div>
  `).join('');
}

function renderTools() {
  const tools = [
    { id: 'hpwash', icon: '❤️', title: 'HP Wash Calculator', desc: 'How much HP you gain per wash at your INT.' },
    { id: 'scrolls', icon: '📜', title: 'Scroll Tracker', desc: 'Log scroll attempts and track your success rate.' },
    { id: 'mesos', icon: '💰', title: 'Meso Tracker', desc: 'Track income and expenses per session.' },
    { id: 'party', icon: '⚔️', title: 'Party Builder', desc: 'Build a bossing party and check for missing buffs.' },
    { id: 'checklist', icon: '✅', title: 'Daily Checklist', desc: 'Daily and weekly tasks with progress bar.' },
  ];
  document.getElementById('tools-grid').innerHTML = tools.map(t => `
    <div class="guide-card" onclick="showPage('${t.id}')">
      <div class="guide-icon">${t.icon}</div>
      <div class="guide-title">${t.title}</div>
      <div class="guide-desc">${t.desc}</div>
    </div>
  `).join('');
}

// ══════════════════════════════════════════════
// PQs
// ══════════════════════════════════════════════
function renderPQs() {
  const priorityBadge = { high: 'badge-green', medium: 'badge-yellow', optional: 'badge-blue' };
  document.getElementById('pq-list').innerHTML = PQS.map(pq => `
    <div class="card pq-card">
      <div class="card-header">
        <h2>${pq.name} <span style="color:var(--muted);font-weight:400;font-size:13px;">(${pq.short})</span></h2>
        <span class="badge ${priorityBadge[pq.priority]}">${pq.priority}</span>
      </div>
      <div class="info-grid" style="margin-bottom:12px;">
        <div class="info-item"><div class="label">Level</div><div class="value">${pq.level}</div></div>
        <div class="info-item"><div class="label">Party</div><div class="value">${pq.party}</div></div>
        <div class="info-item"><div class="label">Location</div><div class="value" style="font-size:12px;">${pq.location}</div></div>
      </div>
      <h3>Rewards</h3>
      <div style="margin-bottom:12px;">${pq.rewards.map(r => `<span class="tag">${r}</span>`).join('')}</div>
      <h3>How to run</h3>
      <ul class="drop-list">${pq.howTo.map(s => `<li>${s}</li>`).join('')}</ul>
      <h3>Tips</h3>
      <ul class="drop-list">${pq.tips.map(s => `<li>${s}</li>`).join('')}</ul>
    </div>
  `).join('');
}

// ══════════════════════════════════════════════
// ITEM CHECKER
// ══════════════════════════════════════════════
function checkItem() {
  const q = document.getElementById('item-search').value.trim().toLowerCase();
  const box = document.getElementById('item-result');
  if (!q) return;

  const match = Object.keys(ITEM_DB).find(k => q.includes(k) || k.includes(q));
  if (match) {
    const d = ITEM_DB[match];
    const colors = { keep: 'verdict-keep', fm: 'verdict-fm', vendor: 'verdict-vendor' };
    const labels = { keep: '✓ Keep', fm: '💰 Sell in FM', vendor: '✗ Vendor' };
    box.innerHTML = `
      <div class="item-result-header ${colors[d.verdict]}">${labels[d.verdict]}</div>
      <p style="color:var(--muted);font-size:14px;margin-bottom:12px;">${d.reason}</p>
      <div>${d.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    `;
  } else {
    box.innerHTML = `
      <div style="font-size:15px;font-weight:600;margin-bottom:8px;color:var(--yellow);">Item not in database</div>
      <p style="color:var(--muted);font-size:14px;margin-bottom:12px;">Check the item library for max stats, then price check in FM before deciding.</p>
      <a href="https://royals-library.netlify.app" target="_blank" style="color:var(--blue);font-size:14px;">🗃️ Open Item Library →</a>
    `;
  }
  box.classList.add('show');
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('item-search');
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') checkItem(); });
});

// ══════════════════════════════════════════════
// BOSSES
// ══════════════════════════════════════════════
function renderBosses(filter = 'all') {
  const grid = document.getElementById('boss-grid');
  const tierColors = { early: 'badge-green', mid: 'badge-yellow', late: 'badge-purple' };
  const filtered = BOSSES.filter(b => filter === 'all' || b.tier === filter);
  grid.innerHTML = filtered.map(b => `
    <div class="boss-card" onclick="showBoss('${b.id}')">
      <img src="${b.image}" alt="${b.name}" class="boss-img" onerror="this.style.display='none'">
      <div class="card-header" style="margin-bottom:4px;">
        <h2>${b.name}</h2>
        <span class="badge ${tierColors[b.tier]}">${b.tier}</span>
      </div>
      <div class="boss-level">Level ${b.level} · ${b.location}</div>
      <div style="font-size:12px;color:var(--muted);">HP req: ${b.hpReq} · Damage: ${b.dmgReq}</div>
    </div>
  `).join('');
}

function showBoss(id) {
  const b = BOSSES.find(x => x.id === id);
  const detail = document.getElementById('boss-detail');
  detail.innerHTML = `
    <div class="boss-detail-top">
      <img src="${b.image}" alt="${b.name}" class="boss-detail-img" onerror="this.style.display='none'">
      <div class="boss-detail-head">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
          <div>
            <h2>${b.name}</h2>
            <div style="font-size:13px;color:var(--muted);">${b.location}</div>
          </div>
          <button class="btn-ghost" onclick="document.getElementById('boss-detail').classList.remove('show')" style="font-size:12px;padding:5px 12px;flex-shrink:0;">Close</button>
        </div>
      </div>
    </div>
    <div class="info-grid">
      <div class="info-item"><div class="label">Level req</div><div class="value">${b.level}</div></div>
      <div class="info-item"><div class="label">HP required</div><div class="value">${b.hpReq}</div></div>
      <div class="info-item"><div class="label">Damage req</div><div class="value">${b.dmgReq}</div></div>
      <div class="info-item"><div class="label">Party size</div><div class="value">${b.party}</div></div>
      <div class="info-item"><div class="label">Respawn</div><div class="value">${b.respawn}</div></div>
    </div>
    <div class="sep"></div>
    <h3>Prequest</h3>
    <p style="font-size:13px;color:var(--muted);margin-bottom:16px;">${b.prequest}</p>
    <h3>Drops</h3>
    <ul class="drop-list">${b.drops.map(d => `<li>${d}</li>`).join('')}</ul>
    <div class="sep"></div>
    <h3>Tips</h3>
    <ul class="drop-list">${b.tips.map(t => `<li>${t}</li>`).join('')}</ul>
  `;
  detail.classList.add('show');
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function filterBoss(tier, btn) {
  document.querySelectorAll('#page-bosses .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('boss-detail').classList.remove('show');
  renderBosses(tier);
}

// ══════════════════════════════════════════════
// LEVELING
// ══════════════════════════════════════════════
let levelTypeFilter = 'all';

function renderLevels() {
  const myLevel = parseInt(document.getElementById('level-filter')?.value) || 0;
  document.getElementById('level-list').innerHTML = LEVELS.map((l, i) => {
    const rangeParts = l.range.match(/(\d+)\s*[–-]\s*(\d+)/);
    const rangeStart = rangeParts ? parseInt(rangeParts[1]) : 0;
    const rangeEnd = rangeParts ? parseInt(rangeParts[2]) : 200;
    const isCurrent = myLevel >= rangeStart && myLevel <= rangeEnd;
    const spots = l.spots.filter(s => levelTypeFilter === 'all' || s.type === levelTypeFilter);
    if (!spots.length) return '';
    return `
    <div class="level-range ${isCurrent ? 'level-current' : ''}" id="level-range-${i}">
      <div class="level-header" onclick="toggleLevel(${i})">
        <div>
          <span class="level-range-label">Lv ${l.range}</span>
          ${isCurrent ? '<span class="badge badge-green" style="margin-left:8px;font-size:10px;">YOU ARE HERE</span>' : ''}
          <span style="color:var(--muted);font-size:13px;margin-left:10px;">${l.label}</span>
        </div>
        <span style="color:var(--muted);font-size:12px;">${spots.length} spot${spots.length > 1 ? 's' : ''} ▾</span>
      </div>
      <div class="level-body ${isCurrent ? 'open' : ''}" id="level-${i}">
        ${spots.map(s => `
          <div class="spot">
            <div class="spot-name">${s.name} <span class="badge ${s.type === 'party' ? 'badge-blue' : 'badge-green'}" style="font-size:10px;margin-left:6px;">${s.type}</span></div>
            ${s.mobs ? `<div class="spot-mobs">Mobs: ${s.mobs.join(' · ')}</div>` : ''}
            <div class="spot-detail">${s.detail}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `}).join('');
}

function highlightLevel() {
  renderLevels();
}

function filterLevelType(type, btn) {
  levelTypeFilter = type;
  document.querySelectorAll('#page-leveling .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLevels();
}

function toggleLevel(i) {
  document.getElementById('level-' + i).classList.toggle('open');
}

// ══════════════════════════════════════════════
// CHECKLIST
// ══════════════════════════════════════════════
let checkState = {};

function renderChecklist() {
  const container = document.getElementById('checklist-container');
  let lastCat = '';
  let html = '';
  CHECKLIST.forEach(item => {
    if (item.cat !== lastCat) {
      html += `<div class="check-category">${item.cat}</div>`;
      lastCat = item.cat;
    }
    const done = checkState[item.id];
    html += `
      <div class="check-item ${done ? 'done' : ''}" onclick="toggleCheck('${item.id}')">
        <div class="check-box">${done ? '✓' : ''}</div>
        <span class="check-label">${item.label}</span>
      </div>
    `;
  });
  container.innerHTML = html;
  const done = Object.values(checkState).filter(Boolean).length;
  const total = CHECKLIST.length;
  document.getElementById('check-bar').style.width = (done / total * 100) + '%';
  document.getElementById('check-count').textContent = `${done} / ${total} complete`;
}

function toggleCheck(id) {
  checkState[id] = !checkState[id];
  renderChecklist();
}

function resetChecklist() {
  checkState = {};
  renderChecklist();
}

// ══════════════════════════════════════════════
// HP WASH CALCULATOR
// ══════════════════════════════════════════════
function calcHPWash() {
  const intVal = parseInt(document.getElementById('wash-int').value) || 0;
  const count = parseInt(document.getElementById('wash-count').value) || 0;
  let hpPer = 8;
  if (intVal >= 256) hpPer = 20;
  else if (intVal >= 200) hpPer = 18;
  else if (intVal >= 120) hpPer = 16;
  else if (intVal >= 80) hpPer = 14;
  const total = hpPer * count;
  document.getElementById('wash-hp-gain').textContent = total.toLocaleString() + ' HP';
  document.getElementById('wash-per-wash').textContent = `+${hpPer} HP per wash at ${intVal} INT`;
  document.getElementById('wash-result').classList.add('show');
}

// ══════════════════════════════════════════════
// SCROLL TRACKER
// ══════════════════════════════════════════════
let scrollLog = [];

function logScroll(success) {
  const item = document.getElementById('scroll-item').value || 'Unknown item';
  const type = document.getElementById('scroll-type').value;
  scrollLog.unshift({ item, type, success, time: new Date().toLocaleTimeString() });
  updateScrollStats();
}

function updateScrollStats() {
  const total = scrollLog.length;
  const succ = scrollLog.filter(s => s.success).length;
  const fail = total - succ;
  document.getElementById('s-total').textContent = total;
  document.getElementById('s-success').textContent = succ;
  document.getElementById('s-fail').textContent = fail;
  document.getElementById('s-rate').textContent = total ? Math.round(succ / total * 100) + '%' : '0%';
  const log = document.getElementById('scroll-log');
  if (!scrollLog.length) {
    log.innerHTML = '<p style="color:var(--muted);font-size:13px;">No attempts logged yet.</p>';
    return;
  }
  log.innerHTML = scrollLog.map(s => `
    <div class="scroll-entry">
      <span>${s.item} — ${s.type}</span>
      <span style="color:${s.success ? 'var(--green)' : 'var(--red)'}">${s.success ? '✓ Success' : '✗ Failed'}</span>
      <span style="color:var(--muted);font-size:11px;">${s.time}</span>
    </div>
  `).join('');
}

function clearScrolls() {
  scrollLog = [];
  updateScrollStats();
}

// ══════════════════════════════════════════════
// MESO TRACKER
// ══════════════════════════════════════════════
let mesoLog = [];

function logMeso(income) {
  const amount = parseInt(document.getElementById('meso-amount').value) || 0;
  const source = document.getElementById('meso-source').value || 'Unknown';
  if (!amount) return;
  mesoLog.unshift({ amount, source, income, time: new Date().toLocaleTimeString() });
  updateMesoStats();
  document.getElementById('meso-amount').value = '';
  document.getElementById('meso-source').value = '';
}

function updateMesoStats() {
  const totalIn = mesoLog.filter(m => m.income).reduce((a, m) => a + m.amount, 0);
  const totalOut = mesoLog.filter(m => !m.income).reduce((a, m) => a + m.amount, 0);
  const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(0) + 'K' : n;
  document.getElementById('m-in').textContent = fmt(totalIn);
  document.getElementById('m-out').textContent = fmt(totalOut);
  document.getElementById('m-total').textContent = fmt(totalIn - totalOut);
  const log = document.getElementById('meso-log');
  if (!mesoLog.length) {
    log.innerHTML = '<p style="color:var(--muted);font-size:13px;">No entries yet.</p>';
    return;
  }
  log.innerHTML = mesoLog.map(m => `
    <div class="meso-entry">
      <span>${m.source}</span>
      <span class="${m.income ? 'meso-pos' : 'meso-neg'}">${m.income ? '+' : '-'}${m.amount.toLocaleString()}</span>
      <span style="color:var(--muted);font-size:11px;">${m.time}</span>
    </div>
  `).join('');
}

function clearMesos() {
  mesoLog = [];
  updateMesoStats();
}

// ══════════════════════════════════════════════
// CLASS QUIZ
// ══════════════════════════════════════════════
let quizAnswers = [];
let quizStep = 0;

function renderQuiz() {
  if (quizStep >= QUIZ_QUESTIONS.length) { showQuizResult(); return; }
  const q = QUIZ_QUESTIONS[quizStep];
  document.getElementById('quiz-container').innerHTML = `
    <div style="font-size:12px;color:var(--muted);margin-bottom:8px;">Question ${quizStep + 1} of ${QUIZ_QUESTIONS.length}</div>
    <h2 style="margin-bottom:16px;">${q.q}</h2>
    ${q.options.map((o, i) => `<div class="quiz-option" onclick="answerQuiz(${i})">${o.text}</div>`).join('')}
    ${quizStep > 0 ? `<button class="btn-ghost" onclick="quizBack()" style="margin-top:12px;font-size:12px;">← Back</button>` : ''}
  `;
}

function answerQuiz(i) {
  quizAnswers[quizStep] = QUIZ_QUESTIONS[quizStep].options[i].tags;
  quizStep++;
  renderQuiz();
}

function quizBack() {
  quizStep--;
  quizAnswers.pop();
  renderQuiz();
}

function showQuizResult() {
  const allTags = quizAnswers.flat();
  const scores = CLASS_RESULTS.map(c => ({ ...c, score: c.tags.filter(t => allTags.includes(t)).length }));
  const best = scores.sort((a, b) => b.score - a.score)[0];
  document.getElementById('quiz-container').innerHTML = '';
  document.getElementById('quiz-class').textContent = best.name;
  document.getElementById('quiz-why').textContent = best.why;
  document.getElementById('quiz-tags').innerHTML = best.badges.map(b => `<span class="tag">${b}</span>`).join('');
  const icon = document.getElementById('quiz-class-icon');
  if (icon) { icon.src = best.icon; icon.alt = best.name; }
  document.getElementById('quiz-result').classList.add('show');
}

function resetQuiz() {
  quizStep = 0;
  quizAnswers = [];
  document.getElementById('quiz-result').classList.remove('show');
  renderQuiz();
}

// ══════════════════════════════════════════════
// GEAR ROADMAP
// ══════════════════════════════════════════════
function renderGear() {
  document.getElementById('gear-timeline').innerHTML = GEAR_PHASES.map(p => `
    <div class="gear-phase">
      <div class="gear-phase-title">${p.title}</div>
      ${p.items.map(item => `
        <div class="gear-item">
          <span class="gear-priority ${item.priority}">${item.priority.toUpperCase()}</span>
          <div>
            <div style="font-weight:600;margin-bottom:2px;">${item.name}</div>
            <div style="font-size:13px;color:var(--muted);">${item.detail}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

// ══════════════════════════════════════════════
// JOB ADVANCEMENT
// ══════════════════════════════════════════════
let currentJob = 'warrior';

function filterJob(job, btn) {
  document.querySelectorAll('#page-jobadv .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentJob = job;
  renderJobAdv();
}

function renderJobAdv() {
  const d = JOB_DATA[currentJob];
  document.getElementById('job-container').innerHTML = `
    <p style="color:var(--muted);font-size:13px;margin-bottom:20px;">${d.class}</p>
    ${d.advancements.map(a => `
      <div class="card" style="margin-bottom:12px;">
        <div class="card-header">
          <h2>${a.job}</h2>
          <span class="badge badge-blue" style="font-size:10px;">${a.location}</span>
        </div>
        ${a.steps.map((s, i) => `
          <div class="job-step">
            <div class="job-step-num">${i + 1}</div>
            <div class="job-step-content">
              <div class="job-step-desc">${s}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;
}

// ══════════════════════════════════════════════
// PARTY BUILDER
// ══════════════════════════════════════════════
let partyMembers = [];

function renderPartySlots() {
  const grid = document.getElementById('party-slots');
  grid.innerHTML = Array(6).fill(0).map((_, i) => {
    const m = partyMembers[i];
    return `
      <div class="party-slot ${m ? 'filled' : ''}" onclick="${m ? `removeFromParty(${i})` : ''}">
        ${m
          ? `<div style="font-size:12px;font-weight:600;">${m}</div><div style="font-size:10px;color:var(--muted);">click to remove</div>`
          : `<div style="color:var(--muted);font-size:12px;">Empty</div>`
        }
      </div>
    `;
  }).join('');
  analyzeParty();
}

function addToParty() {
  const cls = document.getElementById('party-class-select').value;
  if (!cls || partyMembers.length >= 6) return;
  partyMembers.push(cls);
  renderPartySlots();
}

function removeFromParty(i) {
  partyMembers.splice(i, 1);
  renderPartySlots();
}

function clearParty() {
  partyMembers = [];
  renderPartySlots();
}

function analyzeParty() {
  const rec = document.getElementById('party-rec');
  if (!partyMembers.length) {
    rec.innerHTML = '<p style="color:var(--muted);font-size:13px;margin:0;">Add classes to get party analysis.</p>';
    return;
  }
  const hasBishop = partyMembers.includes('Bishop');
  const hasDK = partyMembers.includes('Dark Knight');
  const warnings = [];
  const goods = [];
  if (!hasBishop) warnings.push('⚠️ No Bishop — Holy Symbol and Heal missing. Bossing will be very difficult.');
  else goods.push('✓ Bishop present — Holy Symbol and Heal covered.');
  if (!hasDK) warnings.push('⚠️ No Dark Knight — Hyper Body missing. HP requirements double without it.');
  else goods.push('✓ Dark Knight present — Hyper Body active for full party.');
  if (partyMembers.includes('Bowmaster')) goods.push('✓ Bowmaster present — Sharp Eyes buffs party damage.');
  if (partyMembers.includes('Buccaneer')) goods.push('✓ Buccaneer present — Speed Infusion buffs party attack speed.');
  if (partyMembers.includes('Shadower')) goods.push('✓ Shadower present — Smokescreen available for 1-hit KO protection.');
  rec.innerHTML = `
    <div style="margin-bottom:8px;font-size:13px;font-weight:600;">Party Analysis (${partyMembers.length}/6)</div>
    ${goods.map(g => `<div style="font-size:13px;color:var(--green);margin-bottom:4px;">${g}</div>`).join('')}
    ${warnings.map(w => `<div style="font-size:13px;color:var(--yellow);margin-bottom:4px;">${w}</div>`).join('')}
  `;
}

// ══════════════════════════════════════════════
// INIT — runs on page load
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  renderTools();
  renderPQs();
  renderBosses('all');
  renderLevels();
  renderChecklist();
  renderGear();
  renderQuiz();
  renderJobAdv();
  renderPartySlots();
});
