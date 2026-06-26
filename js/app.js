// MapleRoyals Companion — Main App Logic

// ══════════════════════════════════════════════
// NAV
// ══════════════════════════════════════════════
const PAGE_TITLES = {
  home: 'Start Here', leveling: 'Leveling', pqs: 'Party Quests', bosses: 'Bosses',
  prequests: 'Prequests', items: 'Items', classes: 'Classes', jobadv: 'Jobs',
  quiz: 'Class Quiz', gear: 'Gear', checklist: 'Daily', tools: 'Tools',
  glossary: 'Mob Glossary',
  hpwash: 'HP Wash', scrolls: 'Scrolls', mesos: 'Mesos', party: 'Party',
};

const NAV_PRIMARY = ['home', 'leveling', 'bosses', 'items'];

const NAV_DRAWER_SECTIONS = [
  {
    label: 'Guides',
    items: [
      { id: 'home', icon: '🏠' }, { id: 'leveling', icon: '📈' }, { id: 'pqs', icon: '👥' },
      { id: 'bosses', icon: '💀' }, { id: 'prequests', icon: '📜' }, { id: 'items', icon: '🎒' },
      { id: 'classes', icon: '⚔️' }, { id: 'jobadv', icon: '🎖️' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { id: 'quiz', icon: '🎯' }, { id: 'gear', icon: '🛡️' }, { id: 'checklist', icon: '✅' },
      { id: 'tools', icon: '🧰' }, { id: 'glossary', icon: '👾' }, { id: 'hpwash', icon: '❤️' },
      { id: 'scrolls', icon: '📜' }, { id: 'mesos', icon: '💰' }, { id: 'party', icon: '👫' },
    ],
  },
];

const QUIZ_CLASS_IDS = {
  'Dark Knight': 'dark-knight', Hero: 'hero', Paladin: 'paladin',
  Bishop: 'bishop', 'Fire/Poison Arch Mage': 'fp-arch-mage', 'Ice/Lightning Arch Mage': 'il-arch-mage',
  'Night Lord': 'night-lord', Shadower: 'shadower',
  Bowmaster: 'bowmaster', Marksman: 'marksman',
  Buccaneer: 'buccaneer', Corsair: 'corsair',
};

function setRoute(page, sub) {
  const hash = sub ? `${page}/${encodeURIComponent(sub)}` : page;
  const next = `#${hash}`;
  if (location.hash !== next) history.replaceState(null, '', next);
}

function parseHash() {
  const h = location.hash.replace(/^#/, '').trim();
  if (!h) return null;
  const slash = h.indexOf('/');
  if (slash === -1) return { page: h, sub: null };
  return { page: h.slice(0, slash), sub: decodeURIComponent(h.slice(slash + 1)) };
}

function initRouteFromHash() {
  const r = parseHash();
  if (!r?.page || !document.getElementById('page-' + r.page)) return;
  showPage(r.page, null, true);
  if (!r.sub) return;
  const sub = r.sub.replace(/\+/g, ' ');
  if (r.page === 'bosses') showBoss(r.sub, true);
  else if (r.page === 'prequests') openPrequest(r.sub, true);
  else if (r.page === 'classes') openClassGuide(r.sub, true);
  else if (r.page === 'items') checkItem(sub);
  else if (r.page === 'pqs') openPQ(r.sub, true);
}

function showPage(id, btn, skipHash) {
  if (id !== 'bosses') closeBossDetail(true);
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  updateNavActive(id, btn);
  closeNavDrawer();
  closeNavDropdowns();
  document.title = (PAGE_TITLES[id] || 'Guide') + ' — MR Companion';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (!skipHash) setRoute(id);
}

function navGo(id) {
  showPage(id);
}

function updateNavActive(id, btn) {
  document.querySelectorAll('.nav-btn[data-page], .nav-dropdown-item[data-page], .nav-drawer-item[data-page]').forEach(b => {
    b.classList.toggle('active', b.dataset.page === id);
  });
  document.querySelectorAll('.nav-bottom-btn').forEach(b => {
    if (b.dataset.page === 'menu') {
      b.classList.toggle('active', !NAV_PRIMARY.includes(id));
    } else {
      b.classList.toggle('active', b.dataset.page === id);
    }
  });
  document.querySelectorAll('.nav-dropdown').forEach(dd => {
    const pages = (dd.dataset.navPages || '').split(',');
    dd.classList.toggle('is-active', pages.includes(id));
  });
  if (!btn) {
    btn = document.querySelector(`.nav-btn[data-page="${id}"]`)
      || document.querySelector(`.nav-bottom-btn[data-page="${id}"]`);
  }
}

function initNav() {
  renderNavDrawer();
  document.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const dd = toggle.closest('.nav-dropdown');
      const open = dd.classList.contains('open');
      closeNavDropdowns();
      if (!open) {
        dd.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
  document.addEventListener('click', closeNavDropdowns);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeBossDetail();
      closeNavDrawer();
      closeNavDropdowns();
    }
  });
  const initial = parseHash()?.page || 'home';
  updateNavActive(initial);
}

function renderNavDrawer() {
  const el = document.getElementById('nav-drawer-body');
  if (!el) return;
  el.innerHTML = NAV_DRAWER_SECTIONS.map(section => `
    <div class="nav-drawer-section">
      <div class="nav-drawer-label">${section.label}</div>
      ${section.items.map(item => `
        <button type="button" class="nav-drawer-item" data-page="${item.id}" onclick="navGo('${item.id}')">
          <span class="nav-drawer-icon">${item.icon}</span>
          <span>${PAGE_TITLES[item.id] || item.id}</span>
        </button>
      `).join('')}
    </div>
  `).join('');
}

function toggleNavDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const backdrop = document.getElementById('nav-backdrop');
  const menuBtn = document.querySelector('.nav-menu-btn');
  if (!drawer) return;
  const open = drawer.classList.toggle('open');
  drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  if (backdrop) backdrop.hidden = !open;
  if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.classList.toggle('nav-drawer-open', open);
}

function closeNavDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const backdrop = document.getElementById('nav-backdrop');
  const menuBtn = document.querySelector('.nav-menu-btn');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
  if (backdrop) backdrop.hidden = true;
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-drawer-open');
}

function closeNavDropdowns() {
  document.querySelectorAll('.nav-dropdown.open').forEach(dd => dd.classList.remove('open'));
  document.querySelectorAll('.nav-dropdown-toggle').forEach(t => t.setAttribute('aria-expanded', 'false'));
}

// ══════════════════════════════════════════════
// HOME + CHARACTER PROFILE
// ══════════════════════════════════════════════
const DEFAULT_CLASS_LINKS = [
  { label: 'Class Guides Forum', url: 'https://royals.ms/forum/forums/class-guides.109/' },
  { label: 'Royals Wiki', url: 'https://mime.royals.ms' },
];

function getServerDateString() {
  return new Date().toLocaleDateString('en-CA', { timeZone: SERVER_TIMEZONE || 'America/New_York' });
}

function getClassLinks(id) {
  const c = CLASS_GUIDES[id];
  const links = [];
  const thread = CLASS_FORUM_THREADS?.[id];
  if (thread) {
    links.push({ label: thread.label, url: thread.url, primary: true });
  } else {
    const q = CLASS_FORUM_SEARCH?.[id];
    if (q) {
      links.push({
        label: `${c?.name || 'Class'} — forum search`,
        url: `${CLASS_FORUM_URL}search/?q=${q}`,
      });
    }
  }
  const wikiSlug = CLASS_WIKI_SLUG?.[id];
  if (wikiSlug) {
    links.push({
      label: `${c?.name || 'Class'} — Wiki`,
      url: `${CLASS_WIKI_URL}/index.php/${wikiSlug}`,
    });
  }
  links.push({ label: 'All Class Guides', url: CLASS_FORUM_URL });
  (c?.links || []).forEach(l => {
    if (!links.some(x => x.url === l.url)) links.push(l);
  });
  if (!links.some(l => l.url === CLASS_WIKI_URL)) {
    links.push({ label: 'Royals Wiki', url: CLASS_WIKI_URL });
  }
  return links.length ? links : DEFAULT_CLASS_LINKS;
}

function renderSkillTable(id) {
  const table = CLASS_SKILL_TABLES?.[id];
  if (!table?.length) return '';
  const priorityClass = p => {
    const u = (p || '').toUpperCase();
    if (u.includes('FIRST') || u === 'MAX') return 'skill-pri-max';
    if (u.includes('HIGH')) return 'skill-pri-high';
    if (u.includes('LOW')) return 'skill-pri-low';
    return 'skill-pri-med';
  };
  return `
    <div class="sep"></div>
    <h3>Skill Priority Table</h3>
    <p class="section-hint" style="margin:0 0 12px;">What to max first at each job advancement.</p>
    <div class="skill-table-wrap">
      <table class="skill-table">
        <thead><tr><th>Job</th><th>Skill</th><th>Priority</th><th>Notes</th></tr></thead>
        <tbody>
          ${table.map(row => row.skills.map((s, i) => `
            <tr>
              ${i === 0 ? `<td class="skill-table-job" rowspan="${row.skills.length}">${row.job}</td>` : ''}
              <td>${s.name}</td>
              <td><span class="skill-pri ${priorityClass(s.priority)}">${s.priority}</span></td>
              <td class="skill-table-note">${s.note}</td>
            </tr>
          `).join('')).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function initPWA() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
  initInstallPrompt();
}

let deferredInstallPrompt = null;

function initInstallPrompt() {
  const banner = document.getElementById('pwa-install-banner');
  if (!banner) return;
  if (localStorage.getItem('mr-pwa-dismissed') === '1') banner.classList.remove('show');
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (localStorage.getItem('mr-pwa-dismissed') !== '1') banner.classList.add('show');
  });
  window.addEventListener('appinstalled', () => {
    banner.classList.remove('show');
    deferredInstallPrompt = null;
  });
}

function installPWA() {
  const banner = document.getElementById('pwa-install-banner');
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.finally(() => {
    if (banner) banner.classList.remove('show');
    deferredInstallPrompt = null;
  });
}

function dismissPWA() {
  localStorage.setItem('mr-pwa-dismissed', '1');
  document.getElementById('pwa-install-banner')?.classList.remove('show');
}

function getProfile() {
  return {
    level: parseInt(localStorage.getItem('mr-level')) || 0,
    classId: localStorage.getItem('mr-class') || '',
  };
}

function setProfileLevel(v) {
  if (v) localStorage.setItem('mr-level', v);
  else localStorage.removeItem('mr-level');
  const lf = document.getElementById('level-filter');
  const pl = document.getElementById('profile-level');
  if (lf) lf.value = v || '';
  if (pl) pl.value = v || '';
  highlightLevel();
  renderHomeNextSteps();
  renderHomeProgress();
  renderHomeOnboarding();
}

function setProfileClass(id) {
  if (id) localStorage.setItem('mr-class', id);
  else localStorage.removeItem('mr-class');
  renderHomeNextSteps();
  renderHomeProgress();
  renderGear();
}

function prequestProgress(id) {
  const pq = PREQUESTS.find(p => p.id === id);
  if (!pq) return { done: 0, total: 0 };
  const done = pq.steps.filter(s => isStepDone(stepKey('pq', `${id}-${s.id}`))).length;
  return { done, total: pq.steps.length };
}

function renderHomeNextSteps() {
  const el = document.getElementById('home-next-steps');
  if (!el) return;
  const { level, classId } = getProfile();
  if (!level && !classId) { el.innerHTML = ''; return; }

  const steps = [];
  if (!classId && level < 30) {
    steps.push({ icon: '🎯', text: 'Not sure what to play?', action: () => showPage('quiz'), label: 'Take Class Quiz' });
  }
  if (classId && CLASS_GUIDES[classId]) {
    steps.push({ icon: '⚔️', text: `Playing ${CLASS_GUIDES[classId].name}`, action: () => openClassGuide(classId), label: 'Open class guide' });
  }
  if (level > 0 && level < 10) {
    steps.push({ icon: '🏝️', text: 'Finish Maple Island tutorials', action: () => { showPage('leveling'); jumpToZone(0); }, label: 'Leveling guide' });
  }
  if (level >= 8 && level < 30) {
    steps.push({ icon: '🎖️', text: 'Complete your next job advancement', action: () => showPage('jobadv'), label: 'Job guide' });
  }
  if (level >= 21 && level <= 30) {
    steps.push({ icon: '👥', text: 'KPQ is fastest EXP at your level', action: () => showPage('pqs'), label: 'PQ guide' });
  }
  if (level >= 35 && level <= 50) {
    steps.push({ icon: '👥', text: 'Run LPQ until level 50', action: () => showPage('pqs'), label: 'PQ guide' });
  }
  if (level >= 51 && level <= 70) {
    steps.push({ icon: '👥', text: 'OPQ is best EXP right now', action: () => showPage('pqs'), label: 'PQ guide' });
  }
  if (level >= 70 && level < 85) {
    steps.push({ icon: '🌤️', text: 'Train at Galloperas (Stairway to the Sky)', action: () => { showPage('leveling'); jumpToZone(4); }, label: 'Leveling' });
  }
  if (level >= 50) {
    const z = prequestProgress('zakum');
    if (z.done < z.total) steps.push({ icon: '💀', text: 'Zakum prequest in progress', action: () => openPrequest('zakum'), label: `${z.done}/${z.total} steps` });
  }
  if (level >= 70) {
    const kr = prequestProgress('krexel');
    if (kr.done < kr.total) steps.push({ icon: '🐙', text: 'Krexel prequest (Singapore)', action: () => openPrequest('krexel'), label: `${kr.done}/${kr.total} steps` });
  }
  if (level >= 85) {
    const p = prequestProgress('papulatus');
    if (p.done < p.total) steps.push({ icon: '🕐', text: 'Papulatus prequest', action: () => openPrequest('papulatus'), label: `${p.done}/${p.total} steps` });
    const st = prequestProgress('scar-targa');
    if (st.done < st.total) steps.push({ icon: '🎡', text: 'Scarlion/Targa prequest', action: () => openPrequest('scar-targa'), label: `${st.done}/${st.total} steps` });
  }
  if (level >= 90) {
    const cwk = prequestProgress('cwk');
    if (cwk.done < cwk.total) steps.push({ icon: '🏰', text: 'Crimsonwood Keystone prequest', action: () => openPrequest('cwk'), label: `${cwk.done}/${cwk.total} steps` });
  }
  if (level >= 120) {
    const ht = prequestProgress('horntail');
    if (ht.done < ht.total) steps.push({ icon: '🐉', text: 'Horntail prequest — do this first', action: () => openPrequest('horntail'), label: `${ht.done}/${ht.total} steps` });
    const nt = prequestProgress('neo-tokyo');
    if (nt.done < nt.total) steps.push({ icon: '🏙️', text: 'Neo Tokyo prequest for best EXP', action: () => openPrequest('neo-tokyo'), label: `${nt.done}/${nt.total} steps` });
  }
  if (level >= 140) {
    const pb = prequestProgress('pinkbean');
    if (pb.done < pb.total) steps.push({ icon: '👑', text: 'Pink Bean / Temple of Time', action: () => openPrequest('pinkbean'), label: `${pb.done}/${pb.total} steps` });
  }
  if (level >= 50) {
    steps.push({ icon: '✅', text: 'Daily: vote, Zakum, farm mesos', action: () => showPage('checklist'), label: 'Daily checklist' });
  }

  if (!steps.length) {
    el.innerHTML = '';
    window._homeActions = [];
    return;
  }
  window._homeActions = steps.map(s => s.action);
  el.innerHTML = `
    <h2 style="margin-bottom:12px;">Your Next Steps${level ? ` <span style="color:var(--muted);font-size:14px;font-weight:400;">· Lv ${level}</span>` : ''}</h2>
    <div class="next-steps-grid">
      ${steps.slice(0, 6).map((s, i) => `
        <button type="button" class="next-step-card" onclick="runHomeAction(${i})">
          <span class="next-step-icon">${s.icon}</span>
          <span class="next-step-text">${s.text}</span>
          <span class="next-step-cta">${s.label} →</span>
        </button>
      `).join('')}
    </div>
  `;
}

function runHomeAction(i) {
  if (window._homeActions && window._homeActions[i]) window._homeActions[i]();
}

function initProfile() {
  const levelInput = document.getElementById('profile-level');
  const classSelect = document.getElementById('profile-class');
  if (!levelInput || !classSelect) return;

  if (typeof CLASS_GUIDES !== 'undefined') {
    classSelect.innerHTML = '<option value="">Not sure yet</option>' +
      Object.entries(CLASS_GUIDES).map(([id, c]) => `<option value="${id}">${c.name}</option>`).join('');
  }

  const { level, classId } = getProfile();
  if (level) levelInput.value = level;
  if (classId) classSelect.value = classId;

  levelInput.addEventListener('input', () => setProfileLevel(levelInput.value));
  classSelect.addEventListener('change', () => setProfileClass(classSelect.value));
  renderHomeNextSteps();
  renderHomeProgress();
  renderHomeOnboarding();
}

function renderHome() {
  document.getElementById('guide-grid').innerHTML = GUIDE_SECTIONS.map(s => `
    <div class="guide-card" onclick="showPage('${s.id}')">
      <div class="guide-icon">${s.icon}</div>
      <div class="guide-title">${s.title}</div>
      <div class="guide-desc">${s.desc}</div>
    </div>
  `).join('');
  renderHomeNextSteps();
  renderHomeProgress();
  renderHomeOnboarding();
}

function renderHomeOnboarding() {
  const el = document.getElementById('home-onboarding');
  if (!el) return;
  const { level } = getProfile();
  if (level) { el.innerHTML = ''; return; }
  el.innerHTML = `
    <div class="card onboarding-card">
      <div class="card-header"><h2>New here?</h2><span class="badge badge-blue">Start in 30 sec</span></div>
      <div class="onboarding-steps">
        <button type="button" class="onboarding-step" onclick="showPage('quiz')"><span class="onboarding-num">1</span><span>Take the <strong>Class Quiz</strong></span></button>
        <button type="button" class="onboarding-step" onclick="showPage('leveling')"><span class="onboarding-num">2</span><span>Read the <strong>Leveling Guide</strong></span></button>
        <button type="button" class="onboarding-step" onclick="document.getElementById('profile-level').focus()"><span class="onboarding-num">3</span><span>Enter your <strong>level</strong> above for personalized tips</span></button>
      </div>
    </div>
  `;
}

function getProfileJobProgress() {
  const { classId } = getProfile();
  if (!classId || !CLASS_GUIDES[classId]) return null;
  const branch = JOB_BRANCH_MAP?.[CLASS_GUIDES[classId].branch];
  if (!branch || !JOB_PATHS[branch]) return null;
  return { branch, label: CLASS_GUIDES[classId].branch, ...getJobProgress(branch) };
}

function copyDeepLink(page, sub) {
  const url = location.href.split('#')[0] + '#' + (sub ? `${page}/${encodeURIComponent(sub)}` : page);
  const done = () => {
    const toast = document.getElementById('share-toast');
    if (toast) { toast.textContent = 'Link copied!'; setTimeout(() => { toast.textContent = ''; }, 2000); }
  };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(done);
  else {
    const ta = document.createElement('textarea');
    ta.value = url; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta); done();
  }
}

function getPrequestOverallProgress() {
  if (typeof PREQUESTS === 'undefined') return { done: 0, total: 0 };
  let done = 0, total = 0;
  PREQUESTS.forEach(pq => {
    const p = prequestProgress(pq.id);
    done += p.done;
    total += p.total;
  });
  return { done, total };
}

function formatBossRunTime(id) {
  const iso = localStorage.getItem(`mr-boss-run-${id}`);
  if (!iso) return '';
  const d = new Date(iso);
  const now = new Date();
  let timeNote = '';
  if (d.toDateString() === now.toDateString()) timeNote = ' · marked today';
  else {
    const days = Math.floor((now - d) / 86400000);
    if (days === 1) timeNote = ' · yesterday';
    else if (days < 7) timeNote = ` · ${days}d ago`;
    else timeNote = ` · ${d.toLocaleDateString()}`;
  }
  const respawn = getBossRespawnStatus(id);
  if (respawn) timeNote += respawn.ready ? ' · <span class="boss-ready">ready</span>' : ` · <span class="boss-cooldown">in ${respawn.label}</span>`;
  return timeNote;
}

function getBossRespawnStatus(checklistId) {
  const hours = BOSS_RESPAWN_HOURS?.[checklistId];
  if (!hours) return null;
  const iso = localStorage.getItem(`mr-boss-run-${checklistId}`);
  if (!iso) return { ready: true, label: '' };
  const remaining = hours * 3600000 - (Date.now() - new Date(iso).getTime());
  if (remaining <= 0) return { ready: true, label: '' };
  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  return { ready: false, label: h > 0 ? `${h}h ${m}m` : `${m}m` };
}

function maybeResetDailies() {
  const today = getServerDateString();
  const last = localStorage.getItem('mr-checklist-date');
  if (last === today) return;
  const state = loadCheckState();
  CHECKLIST.filter(i => i.cat === 'Daily').forEach(i => {
    delete state[i.id];
    if (i.boss) localStorage.removeItem(`mr-boss-run-${i.id}`);
  });
  localStorage.setItem('mr-checklist', JSON.stringify(state));
  localStorage.setItem('mr-checklist-date', today);
  checkState = state;
}

function renderHomeProgress() {
  const el = document.getElementById('home-progress');
  if (!el) return;
  const { level } = getProfile();
  if (!level) { el.innerHTML = ''; return; }

  const pq = getPrequestOverallProgress();
  const pqPct = pq.total ? Math.round((pq.done / pq.total) * 100) : 0;
  const dailyItems = CHECKLIST.filter(i => i.cat === 'Daily');
  const dailyDone = dailyItems.filter(i => checkState[i.id]).length;
  const bossRuns = CHECKLIST.filter(i => i.boss && checkState[i.id]).length;
  const bossTotal = CHECKLIST.filter(i => i.boss).length;
  const job = getProfileJobProgress();
  const jobPct = job?.total ? Math.round((job.done / job.total) * 100) : 0;

  el.innerHTML = `
    <div class="home-progress-grid">
      <div class="card home-progress-card">
        <div class="card-header"><h2>Prequests</h2><span class="badge badge-yellow">${pq.done}/${pq.total}</span></div>
        <div class="prequest-track-bar"><div style="width:${pqPct}%"></div></div>
        <button type="button" class="btn btn-sm btn-ghost" style="margin-top:10px;" onclick="showPage('prequests')">View all →</button>
      </div>
      <div class="card home-progress-card">
        <div class="card-header"><h2>Today's Dailies</h2><span class="badge badge-green">${dailyDone}/${dailyItems.length}</span></div>
        <p style="font-size:13px;color:var(--muted);margin:0;">Boss runs marked: ${bossRuns}/${bossTotal}</p>
        <button type="button" class="btn btn-sm btn-ghost" style="margin-top:10px;" onclick="showPage('checklist')">Open checklist →</button>
      </div>
      ${job ? `
      <div class="card home-progress-card">
        <div class="card-header"><h2>Job Steps</h2><span class="badge badge-blue">${job.done}/${job.total}</span></div>
        <p style="font-size:12px;color:var(--muted);margin:0 0 8px;">${job.label} path</p>
        <div class="prequest-track-bar"><div style="width:${jobPct}%"></div></div>
        <button type="button" class="btn btn-sm btn-ghost" style="margin-top:10px;" onclick="showPage('jobadv')">Job guide →</button>
      </div>
      ` : ''}
      <div class="card home-progress-card">
        <div class="card-header"><h2>Next Milestone</h2></div>
        ${renderNextMilestoneCard(level)}
      </div>
    </div>
  `;
}

function renderNextMilestoneCard(level) {
  if (typeof LEVEL_MILESTONES === 'undefined') return '<p style="color:var(--muted);font-size:13px;">—</p>';
  const next = LEVEL_MILESTONES.find(m => m.level > level);
  if (!next) return '<p style="font-size:13px;color:var(--muted);">You\'ve hit all major milestones — focus on daily bosses and gear.</p>';
  const action = next.prequest
    ? `openPrequest('${next.prequest}')`
    : next.boss
      ? `showPage('bosses');showBoss('${next.boss}')`
      : `showPage('${next.page}')`;
  return `
    <p style="font-size:14px;font-weight:600;margin:0 0 4px;">${next.icon} Lv ${next.level} — ${next.title}</p>
    <p style="font-size:13px;color:var(--muted);margin:0 0 10px;">${next.detail}</p>
    <button type="button" class="btn btn-sm" onclick="${action}">Go →</button>
  `;
}

function renderTools() {
  const tools = [
    { id: 'glossary', icon: '👾', title: 'Mob Glossary', desc: 'What are Galloperas, newts, and other mobs you will train on.' },
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
  renderExternalLinks('tools-external-links');
}

function renderExternalLinks(targetId) {
  const el = document.getElementById(targetId);
  if (!el || typeof EXTERNAL_LINKS === 'undefined') return;
  el.innerHTML = EXTERNAL_LINKS.map(l => `
    <a href="${l.url}" target="_blank" rel="noopener" class="external-link-card">
      <span class="external-link-icon">${l.icon}</span>
      <span class="external-link-body">
        <span class="external-link-label">${l.label}</span>
        <span class="external-link-desc">${l.desc}</span>
      </span>
      <span class="external-link-arrow">↗</span>
    </a>
  `).join('');
}

// ══════════════════════════════════════════════
// PQs
// ══════════════════════════════════════════════
function isPQInRange(pq, level) {
  if (!level) return false;
  const range = pq.level.match(/(\d+)\s*[–-]\s*(\d+)/);
  if (range) return level >= parseInt(range[1], 10) && level <= parseInt(range[2], 10);
  const minOnly = pq.level.match(/(\d+)\s*\+/);
  if (minOnly) return level >= parseInt(minOnly[1], 10);
  return false;
}

function openPQ(id, skipHash) {
  showPage('pqs', null, skipHash);
  if (!skipHash) setRoute('pqs', id);
  const el = document.getElementById('pq-' + id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('prequest-highlight');
    setTimeout(() => el.classList.remove('prequest-highlight'), 2000);
  }
}

function renderPQOverview() {
  const el = document.getElementById('pq-overview');
  if (!el || typeof PQS === 'undefined') return;
  const { level } = getProfile();
  const levelInput = parseInt(document.getElementById('level-filter')?.value) || level;
  el.innerHTML = `
    <div class="pq-track">
      ${PQS.map(pq => {
        const recommended = isPQInRange(pq, levelInput);
        return `
          <button type="button" class="pq-track-item${recommended ? ' recommended' : ''}" onclick="openPQ('${pq.id}')">
            <span class="pq-track-short">${pq.short}</span>
            <span class="pq-track-lv">Lv ${pq.level}</span>
            <span class="pq-track-party">${pq.party}</span>
            ${recommended ? '<span class="pq-track-badge">Best for you</span>' : ''}
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function renderPQs() {
  renderPQOverview();
  const priorityBadge = { high: 'badge-green', medium: 'badge-yellow', optional: 'badge-blue' };
  document.getElementById('pq-list').innerHTML = PQS.map(pq => `
    <div class="card pq-card" id="pq-${pq.id}">
      <div class="card-header">
        <h2>${pq.name} <span style="color:var(--muted);font-weight:400;font-size:13px;">(${pq.short})</span></h2>
        <span class="badge ${priorityBadge[pq.priority]}">${pq.priority}</span>
      </div>
      ${renderMapScene(pq.mapTheme || 'pq', [], pq.mapImage || null)}
      <h3>Stage Layout</h3>
      ${pq.stages ? renderFlow(pq.stages, 'pq') : ''}
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
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
        ${pq.prequestId ? `<button type="button" class="btn btn-sm btn-ghost" onclick="openPrequest('${pq.prequestId}')">Prequest guide →</button>` : ''}
        ${pq.bossId ? `<button type="button" class="btn btn-sm" onclick="showPage('bosses');showBoss('${pq.bossId}')">View Boss Guide →</button>` : ''}
        ${pq.forumGuide ? `<a href="${pq.forumGuide}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost">Forum guide ↗</a>` : ''}
      </div>
    </div>
  `).join('');
}

// ══════════════════════════════════════════════
// ITEM CHECKER + FM PRICES
// ══════════════════════════════════════════════
const POPULAR_PRICE_KEYS = [
  'onyx apple', 'work gloves', 'chaos scroll', 'white scroll',
  'ap reset', 'vip zak helm', 'vip htp', 'heartstopper', 'stormcaster', 'bwg',
];

const QUICK_KEEP_ITEMS = [
  'zakum helmet', 'work gloves', 'horntail necklace', 'horntail ring',
  'papu pendant', 'pink bean hat', 'onyx apple', 'chaos scroll', 'balanced fury', 'ilbi',
];

const ITEM_QUERY_PATTERNS = [
  [/zakum helmet/i, 'zakum helmet'],
  [/horntail necklace/i, 'horntail necklace'],
  [/horntail ring/i, 'horntail ring'],
  [/papu pendant/i, 'papu pendant'],
  [/pink bean hat/i, 'pink bean hat'],
  [/pink bean suit/i, 'pink bean suit'],
  [/pink adventurer cape/i, 'pink adventurer cape'],
  [/work glove/i, 'work gloves'],
  [/onyx apple/i, 'onyx apple'],
  [/chaos scroll/i, 'chaos scroll'],
  [/white scroll/i, 'white scroll'],
  [/balanced fury/i, 'balanced fury'],
  [/ilbi/i, 'ilbi'],
  [/steelies?/i, 'steelies'],
  [/tobis?/i, 'tobis'],
  [/power elixir/i, 'power elixir'],
  [/sauna robe/i, 'sauna robe'],
  [/gold teeth?/i, 'gold tooth'],
  [/scorpion stings?/i, 'scorpion sting'],
  [/lion king certificates?/i, 'lion king certificate'],
  [/eye of fire/i, 'eye of fire'],
  [/dragon stone/i, 'dragon stone'],
  [/crimson hearts?/i, 'crimson heart'],
  [/crimsonwood keystone/i, 'crimsonwood keystone'],
  [/mark of naricain/i, 'mark of naricain'],
  [/naricain demon elixir/i, 'naricain demon elixir'],
  [/green bandana/i, 'green bandana'],
  [/heartstopper/i, 'heartstopper'],
  [/zakum cape/i, 'zakum cape'],
  [/scarlion helmet/i, 'scarlion helmet'],
  [/targa helmet/i, 'targa helmet'],
  [/soul lantern/i, 'soul lantern'],
  [/spirit of fantasy/i, 'spirit of fantasy theme park'],
  [/stormcaster/i, 'stormcaster gloves'],
  [/dark scroll/i, 'dark scroll'],
  [/miniature pianus/i, 'miniature pianus'],
  [/mastery book/i, 'mastery book 30'],
  [/vip zak/i, 'vip zakum helmet'],
];

function resolveItemQuery(text) {
  if (!text) return null;
  const tl = text.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim();
  if (ITEM_DB[tl] || (typeof PRICE_DB !== 'undefined' && PRICE_DB[tl])) return tl;
  for (const [re, key] of ITEM_QUERY_PATTERNS) {
    if (re.test(text)) return key;
  }
  return lookupItem(tl)?.key || lookupPrice(tl)?.key || null;
}

function openItemCheck(q) {
  showPage('items', null, true);
  setRoute('items', q);
  setTimeout(() => checkItem(q), 50);
}

function itemLink(text, query) {
  const q = query || resolveItemQuery(text);
  if (!q) return text;
  const esc = q.replace(/'/g, "\\'");
  const price = lookupPrice(q);
  const priceBadge = price ? `<span class="item-link-price">${price.price}</span>` : '';
  return `<button type="button" class="item-link" onclick="event.stopPropagation();openItemCheck('${esc}')">${text}${priceBadge}</button>`;
}

function gearItemLabel(name, itemKey) {
  return itemLink(name, itemKey || resolveItemQuery(name));
}

function lookupItem(q) {
  const ql = q.trim().toLowerCase();
  const match = Object.keys(ITEM_DB).find(k => ql.includes(k) || k.includes(ql));
  return match ? { key: match, ...ITEM_DB[match] } : null;
}

function lookupPrice(q) {
  if (typeof PRICE_DB === 'undefined') return null;
  const ql = q.trim().toLowerCase();
  if (PRICE_DB[ql]) return { key: ql, ...PRICE_DB[ql] };
  const match = Object.keys(PRICE_DB).find(k => ql.includes(k) || k.includes(ql));
  return match ? { key: match, ...PRICE_DB[match] } : null;
}

function priceHtml(price) {
  if (!price) return '';
  const cat = price.category ? `<span class="price-cat">${price.category}</span>` : '';
  return `
    <div class="price-tag">
      <span class="price-label">FM Price</span>
      <span class="price-value">${price.price}</span>${cat}
    </div>`;
}

function priceCredit() {
  if (typeof PRICE_SOURCE === 'undefined') return '';
  return `<p class="price-credit">From <a href="${PRICE_SOURCE.url}" target="_blank" rel="noopener">${PRICE_SOURCE.name}</a> — double-check in FM before selling.</p>`;
}

function checkItem(prefill) {
  const input = document.getElementById('item-search');
  if (prefill) input.value = prefill;
  hideItemSuggestions();
  const q = input.value.trim().toLowerCase();
  const box = document.getElementById('item-result');
  if (!q) return;

  const item = lookupItem(q);
  const price = lookupPrice(q);

  if (item) {
    const colors = { keep: 'verdict-keep', fm: 'verdict-fm', vendor: 'verdict-vendor' };
    const labels = { keep: '✓ Keep', fm: '💰 Sell in FM', vendor: '✗ Vendor' };
    box.innerHTML = `
      <div class="item-result-header ${colors[item.verdict]}">${labels[item.verdict]}</div>
      <div class="item-result-name">${item.key}</div>
      ${priceHtml(price)}
      <p style="color:var(--muted);font-size:14px;margin-bottom:12px;">${item.reason}</p>
      <div>${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      ${price ? priceCredit() : ''}
    `;
  } else if (price) {
    box.innerHTML = `
      <div class="item-result-header verdict-fm">💰 FM Price Found</div>
      <div class="item-result-name">${price.key}</div>
      ${priceHtml(price)}
      <p style="color:var(--muted);font-size:14px;margin-bottom:12px;">Not in our keep/vendor guide — check max stats in the item library before selling.</p>
      <a href="https://royals-library.netlify.app" target="_blank" rel="noopener" style="color:var(--blue);font-size:14px;">🗃️ Open Item Library →</a>
      ${priceCredit()}
    `;
  } else {
    box.innerHTML = `
      <div style="font-size:15px;font-weight:600;margin-bottom:8px;color:var(--yellow);">Item not in database</div>
      <p style="color:var(--muted);font-size:14px;margin-bottom:12px;">Check the item library for max stats, then price check in FM before deciding.</p>
      <a href="https://royals-library.netlify.app" target="_blank" rel="noopener" style="color:var(--blue);font-size:14px;display:block;margin-bottom:6px;">🗃️ Open Item Library →</a>
      <a href="https://docs.google.com/spreadsheets/d/1B3sxmpaW7RGrQAAxAyeR-xS4mdKCTTs_DzgV0qo2p_8/edit" target="_blank" rel="noopener" style="color:var(--blue);font-size:14px;">📊 Sylafia Price Guide →</a>
    `;
  }
  box.classList.add('show');
  if (prefill) box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderPopularPrices() {
  const el = document.getElementById('popular-prices');
  if (!el || typeof PRICE_DB === 'undefined') return;
  el.innerHTML = POPULAR_PRICE_KEYS.filter(k => PRICE_DB[k]).map(k => {
    const p = PRICE_DB[k];
    return `<button type="button" class="price-card" onclick="checkItem('${k.replace(/'/g, "\\'")}')">
      <span class="price-card-name">${k}</span>
      <span class="price-card-value">${p.price}</span>
    </button>`;
  }).join('');
}

function renderScrollPrices() {
  const el = document.getElementById('scroll-prices');
  if (!el || typeof PRICE_DB === 'undefined') return;
  const keys = Object.keys(PRICE_DB)
    .filter(k => PRICE_DB[k].category === 'scroll')
    .sort((a, b) => a.localeCompare(b));
  el.innerHTML = keys.map(k => {
    const p = PRICE_DB[k];
    return `<button type="button" class="price-card price-card--scroll" onclick="checkItem('${k.replace(/'/g, "\\'")}')">
      <span class="price-card-name">${k}</span>
      <span class="price-card-value">${p.price}</span>
    </button>`;
  }).join('');
}

function updateItemsPageMeta() {
  const el = document.querySelector('#page-items .subtitle');
  if (!el || typeof ITEM_DB === 'undefined') return;
  const itemCount = Object.keys(ITEM_DB).length;
  const priceCount = typeof PRICE_DB !== 'undefined' ? Object.keys(PRICE_DB).length : 0;
  el.textContent = `Dropped something and not sure what to do? Search ${itemCount} items — keep, sell in FM, or vendor. ${priceCount} FM prices from Sylafia's guide.`;
}

function renderQuickRefChips() {
  const keep = document.getElementById('quick-keep-chips');
  if (keep) {
    keep.innerHTML = QUICK_KEEP_ITEMS.map(k => itemLink(k.replace(/\b\w/g, c => c.toUpperCase()), k)).join('');
  }
}

let itemSearchIndex = null;
let suggestionActive = -1;

function getItemSearchIndex() {
  if (itemSearchIndex) return itemSearchIndex;
  const map = new Map();
  for (const k of Object.keys(ITEM_DB)) {
    map.set(k, {
      key: k,
      verdict: ITEM_DB[k].verdict,
      price: typeof PRICE_DB !== 'undefined' ? PRICE_DB[k]?.price : null,
    });
  }
  if (typeof PRICE_DB !== 'undefined') {
    for (const k of Object.keys(PRICE_DB)) {
      if (!map.has(k)) {
        map.set(k, { key: k, verdict: null, price: PRICE_DB[k].price });
      } else if (!map.get(k).price) {
        map.get(k).price = PRICE_DB[k].price;
      }
    }
  }
  itemSearchIndex = [...map.values()];
  return itemSearchIndex;
}

function scoreItemMatch(name, q) {
  const n = name.toLowerCase();
  const ql = q.toLowerCase().trim();
  if (!ql) return -1;
  if (n === ql) return 100;
  if (n.startsWith(ql)) return 80;
  if (n.split(/\s+/).some(w => w.startsWith(ql))) return 60;
  if (n.includes(ql)) return 40;
  return -1;
}

function getItemSuggestions(q, limit = 8) {
  const ql = q.trim().toLowerCase();
  if (ql.length < 1) return [];
  return getItemSearchIndex()
    .map(entry => ({ ...entry, score: scoreItemMatch(entry.key, ql) }))
    .filter(e => e.score >= 0)
    .sort((a, b) => b.score - a.score || a.key.localeCompare(b.key))
    .slice(0, limit);
}

function suggestionMeta(entry) {
  if (entry.verdict) {
    const labels = { keep: 'Keep', fm: 'FM', vendor: 'Vendor' };
    return `<span class="suggest-badge suggest-${entry.verdict}">${labels[entry.verdict]}</span>`;
  }
  if (entry.price) return `<span class="suggest-price">${entry.price}</span>`;
  return '';
}

function hideItemSuggestions() {
  const list = document.getElementById('item-suggestions');
  const input = document.getElementById('item-search');
  if (!list) return;
  list.hidden = true;
  list.innerHTML = '';
  suggestionActive = -1;
  if (input) input.setAttribute('aria-expanded', 'false');
}

function renderItemSuggestions(q) {
  const list = document.getElementById('item-suggestions');
  const input = document.getElementById('item-search');
  if (!list || !input) return;

  const matches = getItemSuggestions(q);
  if (!matches.length) {
    hideItemSuggestions();
    return;
  }

  list.innerHTML = matches.map((entry, i) => `
    <li class="item-suggest-item${i === suggestionActive ? ' active' : ''}"
        role="option"
        data-key="${entry.key.replace(/"/g, '&quot;')}"
        onclick="selectItemSuggestion('${entry.key.replace(/'/g, "\\'")}')">
      <span class="suggest-name">${entry.key}</span>
      ${suggestionMeta(entry)}
    </li>
  `).join('');
  list.hidden = false;
  input.setAttribute('aria-expanded', 'true');
}

function selectItemSuggestion(key) {
  const input = document.getElementById('item-search');
  if (input) input.value = key;
  hideItemSuggestions();
  checkItem();
}

function setSuggestionActive(index) {
  const list = document.getElementById('item-suggestions');
  if (!list || list.hidden) return;
  const items = list.querySelectorAll('.item-suggest-item');
  if (!items.length) return;
  suggestionActive = Math.max(0, Math.min(index, items.length - 1));
  items.forEach((el, i) => el.classList.toggle('active', i === suggestionActive));
  items[suggestionActive].scrollIntoView({ block: 'nearest' });
}

function initItemAutocomplete() {
  const input = document.getElementById('item-search');
  const list = document.getElementById('item-suggestions');
  if (!input || !list) return;

  input.addEventListener('input', () => {
    suggestionActive = -1;
    renderItemSuggestions(input.value);
  });

  input.addEventListener('keydown', e => {
    const open = !list.hidden && list.children.length;
    if (e.key === 'ArrowDown' && open) {
      e.preventDefault();
      setSuggestionActive(suggestionActive + 1);
    } else if (e.key === 'ArrowUp' && open) {
      e.preventDefault();
      setSuggestionActive(suggestionActive <= 0 ? list.children.length - 1 : suggestionActive - 1);
    } else if (e.key === 'Enter') {
      if (open && suggestionActive >= 0) {
        e.preventDefault();
        selectItemSuggestion(list.children[suggestionActive].dataset.key);
      } else {
        checkItem();
      }
    } else if (e.key === 'Escape') {
      hideItemSuggestions();
    }
  });

  input.addEventListener('focus', () => {
    if (input.value.trim()) renderItemSuggestions(input.value);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.item-search-wrap')) hideItemSuggestions();
  });
}

function shareGuide() {
  const url = window.location.href.split('#')[0] + (location.hash || '');
  const toast = document.getElementById('share-toast');
  const done = () => { if (toast) { toast.textContent = 'Copied!'; setTimeout(() => { toast.textContent = ''; }, 2000); } };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(url).then(done);
  } else {
    const ta = document.createElement('textarea');
    ta.value = url; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta); done();
  }
}

function initLevelProfile() {
  const input = document.getElementById('level-filter');
  if (!input) return;
  const saved = localStorage.getItem('mr-level');
  if (saved) { input.value = saved; highlightLevel(); }
  input.addEventListener('input', () => {
    const v = input.value;
    setProfileLevel(v);
    const pl = document.getElementById('profile-level');
    if (pl && pl.value !== v) pl.value = v;
  });
}

// ══════════════════════════════════════════════
// MAP VISUALS
// ══════════════════════════════════════════════
const MAP_PLATFORMS = {
  island:   [{ w: 75, l: 5,  b: 22 }, { w: 50, l: 35, b: 35 }, { w: 60, l: 65, b: 28 }],
  beach:    [{ w: 70, l: 8,  b: 18 }, { w: 45, l: 42, b: 32 }, { w: 55, l: 68, b: 22 }],
  field:    [{ w: 80, l: 5,  b: 20 }, { w: 50, l: 35, b: 38 }, { w: 60, l: 62, b: 28 }],
  forest:   [{ w: 65, l: 10, b: 25 }, { w: 40, l: 48, b: 42 }, { w: 55, l: 72, b: 30 }],
  cave:     [{ w: 75, l: 8,  b: 15 }, { w: 45, l: 38, b: 35 }, { w: 50, l: 65, b: 50 }],
  pq:       [{ w: 90, l: 5,  b: 20 }, { w: 35, l: 30, b: 40 }, { w: 35, l: 55, b: 40 }, { w: 90, l: 75, b: 20 }],
  graveyard:[{ w: 70, l: 10, b: 22 }, { w: 50, l: 45, b: 38 }],
  sky:      [{ w: 40, l: 8,  b: 55 }, { w: 35, l: 35, b: 40 }, { w: 40, l: 62, b: 25 }, { w: 30, l: 82, b: 45 }],
  clock:    [{ w: 60, l: 20, b: 30 }, { w: 60, l: 50, b: 30 }],
  city:     [{ w: 85, l: 5,  b: 18 }, { w: 40, l: 40, b: 35 }, { w: 55, l: 70, b: 22 }],
  volcano:  [{ w: 80, l: 10, b: 25 }, { w: 50, l: 50, b: 45 }],
  temple:   [{ w: 70, l: 15, b: 20 }, { w: 40, l: 42, b: 38 }, { w: 70, l: 68, b: 20 }],
};

function renderMapScene(style, mobs = [], mapImage = null) {
  if (mapImage) {
    return `
      <div class="map-scene map-scene--photo">
        <img src="${mapImage}" alt="Map" class="map-scene-img" onerror="this.parentElement.classList.add('map-scene--fallback');this.remove()">
        ${mobs.length ? `<div class="map-mob-labels">${mobs.map(m => `<span class="mob-chip">${m}</span>`).join('')}</div>` : ''}
      </div>
    `;
  }
  const platforms = MAP_PLATFORMS[style] || MAP_PLATFORMS.field;
  const mobPositions = platforms.slice(0, Math.min(mobs.length, platforms.length));
  return `
    <div class="map-scene map-scene--${style}">
      <div class="map-scene-grid"></div>
      ${platforms.map(p => `<div class="map-platform" style="left:${p.l}%;width:${p.w}%;bottom:${p.b}%"></div>`).join('')}
      ${mobPositions.map((p, i) => `
        <div class="map-mob" style="left:${p.l + p.w / 2 - 2}%;bottom:${p.b + 6}%" title="${mobs[i] || ''}"></div>
      `).join('')}
      <div class="map-scene-label">${style}</div>
    </div>
  `;
}

function renderFlow(steps, type = 'phase') {
  return `
    <div class="flow-track flow-${type}">
      ${steps.map((s, i) => `
        <div class="flow-step">
          <div class="flow-dot">${i + 1}</div>
          <div class="flow-label">${s}</div>
        </div>
        ${i < steps.length - 1 ? '<div class="flow-line"></div>' : ''}
      `).join('')}
    </div>
  `;
}

function renderWorldMap() {
  const myLevel = parseInt(document.getElementById('level-filter')?.value) || 0;
  const hero = document.getElementById('world-map-hero');
  if (hero) {
    hero.innerHTML = `<img src="assets/images/maps/world-map.png" alt="MapleRoyals world map" class="world-map-img">`;
  }
  const el = document.getElementById('world-map');
  if (!el) return;
  el.innerHTML = WORLD_MAP.map((z, i) => {
    const parts = z.levels.match(/(\d+)[–-](\d+)/);
    const active = parts && myLevel >= parseInt(parts[1]) && myLevel <= parseInt(parts[2]);
    return `
      <div class="world-node world-node--${z.theme} ${active ? 'active' : ''}" onclick="jumpToZone(${z.levelIndex})">
        <div class="world-node-icon">${z.icon}</div>
        <div class="world-node-name">${z.name}</div>
        <div class="world-node-lv">Lv ${z.levels}</div>
      </div>
      ${i < WORLD_MAP.length - 1 ? '<div class="world-connector"></div>' : ''}
    `;
  }).join('');
}

function jumpToZone(i) {
  if (i < 0 || i >= LEVELS.length) return;
  const body = document.getElementById('level-' + i);
  const range = document.getElementById('level-range-' + i);
  if (body) {
    body.classList.add('open');
    range?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    range?.classList.add('level-highlight');
    setTimeout(() => range?.classList.remove('level-highlight'), 2000);
  }
}

function getBossPrequest(bossId) {
  const b = BOSSES.find(x => x.id === bossId);
  const pid = b?.prequestId || bossId;
  return PREQUESTS?.find(p => p.id === pid || p.bossId === bossId);
}

function renderBossProgression() {
  const el = document.getElementById('boss-progression');
  if (!el) return;
  const main = BOSSES.filter(b => b.tier !== 'demi' && b.tier !== 'endgame');
  const endgame = BOSSES.filter(b => b.tier === 'endgame');
  const demi = BOSSES.filter(b => b.tier === 'demi');
  const renderTrack = (list, startIdx = 0) => list.map((b, i) => `
        <div class="flow-step boss-node" onclick="showBoss('${b.id}')">
          <div class="flow-dot boss-dot tier-${b.tier}">${startIdx + i + 1}</div>
          <div class="flow-label">${b.name}</div>
          <div class="flow-sublabel">Lv ${b.level.split('+')[0].replace(/[^\d]/g, '') || '?'}+</div>
        </div>
        ${i < list.length - 1 ? '<div class="flow-line"></div>' : ''}
      `).join('');
  el.innerHTML = `
    <div class="flow-track flow-bosses">${renderTrack(main)}</div>
    ${endgame.length ? `
      <p class="section-hint" style="margin:16px 0 8px;">Endgame — Auf Haven, The Boss, Von Leon & Rose Garden</p>
      <div class="flow-track flow-bosses flow-bosses--endgame">${renderTrack(endgame, main.length)}</div>
    ` : ''}
    ${demi.length ? `
      <p class="section-hint" style="margin:16px 0 8px;">Demi-bosses — optional gear, mesos & EPQ between Pap and Horntail</p>
      <div class="flow-track flow-bosses flow-bosses--demi">${renderTrack(demi, main.length + endgame.length)}</div>
    ` : ''}
  `;
}

let bossTierFilter = 'all';
let bossRegionFilter = 'all';

const BOSS_REGIONS = [
  { id: 'all', label: 'All regions' },
  { id: 'zipangu', label: 'Zipangu' },
  { id: 'ellin', label: 'Ellin' },
  { id: 'leafre', label: 'Leafre' },
  { id: 'mu-lung', label: 'Mu Lung' },
  { id: 'singapore', label: 'Singapore' },
  { id: 'masteria', label: 'Masteria' },
  { id: 'malaysia', label: 'Malaysia' },
  { id: 'aqua', label: 'Aqua Road' },
  { id: 'victoria', label: 'Victoria' },
  { id: 'ludibrium', label: 'Ludibrium' },
];

function getBossRegion(b) {
  const loc = (b.location || '').toLowerCase();
  if (loc.includes('zipangu') || loc.includes('neo tokyo')) return 'zipangu';
  if (loc.includes('ellin')) return 'ellin';
  if (loc.includes('leafre') || loc.includes('lion king')) return 'leafre';
  if (loc.includes('mu lung')) return 'mu-lung';
  if (loc.includes('singapore') || loc.includes('boat quay') || loc.includes('ulu')) return 'singapore';
  if (loc.includes('masteria') || loc.includes('crimsonwood')) return 'masteria';
  if (loc.includes('malaysia')) return 'malaysia';
  if (loc.includes('aqua')) return 'aqua';
  if (loc.includes('victoria') || loc.includes('cursed sanctuary')) return 'victoria';
  if (loc.includes('ludibrium') || loc.includes('clocktower') || loc.includes('temple of time')) return 'ludibrium';
  return 'other';
}

function initBossRegionFilters() {
  const sel = document.getElementById('boss-region-filters');
  if (!sel) return;
  sel.innerHTML = BOSS_REGIONS.map(r =>
    `<option value="${r.id}">${r.label}</option>`
  ).join('');
  sel.onchange = () => filterBossRegion(sel.value);
}

function renderBosses() {
  const grid = document.getElementById('boss-grid');
  const tierColors = { early: 'badge-green', mid: 'badge-yellow', late: 'badge-purple', demi: 'badge-blue', endgame: 'badge-red' };
  const filtered = BOSSES.filter(b => {
    if (bossTierFilter !== 'all' && b.tier !== bossTierFilter) return false;
    if (bossRegionFilter !== 'all' && getBossRegion(b) !== bossRegionFilter) return false;
    return true;
  });
  grid.innerHTML = filtered.map(b => `
    <div class="boss-card boss-card--${b.tier}" onclick="showBoss('${b.id}')">
      <img src="${b.image}" alt="" class="boss-img" onerror="this.style.display='none'">
      <div class="boss-card-body">
        <div class="boss-card-row">
          <h2>${b.name}</h2>
          <span class="badge ${tierColors[b.tier]}">${b.tier}</span>
        </div>
        <div class="boss-meta">Lv ${b.level} · ${b.hpReq} HP · ${b.location}</div>
      </div>
    </div>
  `).join('');
}

function renderBossDropTable(bossId) {
  const table = BOSS_DROP_TABLES?.[bossId];
  if (!table?.length) return '';
  return `
    <h3>Drop Table</h3>
    <p class="section-hint" style="margin:0 0 12px;">Tap an item to check keep/vendor advice and FM price.</p>
    <div class="drop-table-wrap">
      <table class="drop-table">
        <thead><tr><th>Drop</th><th>Rate</th><th>Notes</th></tr></thead>
        <tbody>
          ${table.map(row => `
            <tr>
              <td>${gearItemLabel(row.item, row.itemKey)}</td>
              <td><span class="drop-rate">${row.rate}</span></td>
              <td class="drop-table-note">${row.note}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderBossRespawnBanner(bossId) {
  const b = BOSSES.find(x => x.id === bossId);
  const cid = b?.checklistId || { zakum: 'zakum', papulatus: 'pap', horntail: 'ht', pinkbean: 'pb' }[bossId];
  if (!cid) return '';
  const status = getBossRespawnStatus(cid);
  if (!status) return '';
  const weekly = bossId === 'von-leon';
  return status.ready
    ? `<p class="boss-respawn-banner ready">✓ Off cooldown — ready to run${weekly ? ' (weekly)' : ''}</p>`
    : `<p class="boss-respawn-banner cooldown">⏳ Respawn in <strong>${status.label}</strong>${weekly ? ' (resets Monday server time)' : ''}</p>`;
}

function renderBossPrequestProgress(bossId) {
  const pq = getBossPrequest(bossId);
  if (!pq) return '';
  const { done, total } = prequestProgress(pq.id);
  const pct = total ? Math.round((done / total) * 100) : 0;
  const complete = total > 0 && done === total;
  return `
    <div class="boss-pq-progress card" style="margin-bottom:16px;padding:14px 16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="font-size:13px;font-weight:600;">${pq.short} prequest</span>
        <span class="badge ${complete ? 'badge-green' : 'badge-yellow'}">${done}/${total}${complete ? ' ✓' : ''}</span>
      </div>
      <div class="prequest-track-bar"><div style="width:${pct}%"></div></div>
      <button type="button" class="btn btn-sm" style="margin-top:10px;" onclick="openPrequest('${pq.id}')">${complete ? 'Review prequest' : 'Continue prequest'} →</button>
    </div>
  `;
}

function closeBossDetail(skipHash) {
  const overlay = document.getElementById('boss-detail-overlay');
  if (!overlay || overlay.hidden) return;
  overlay.hidden = true;
  document.body.classList.remove('boss-detail-open');
  if (!skipHash) setRoute('bosses');
}

function showBoss(id, skipHash) {
  if (!skipHash) {
    showPage('bosses', null, true);
    setRoute('bosses', id);
  }
  const b = BOSSES.find(x => x.id === id);
  if (!b) return;
  const detail = document.getElementById('boss-detail');
  const overlay = document.getElementById('boss-detail-overlay');
  const pq = getBossPrequest(id);
  const prequestId = pq?.id || b.prequestId || id;
  detail.innerHTML = `
    <div class="boss-detail-top">
      <img src="${b.image}" alt="${b.name}" class="boss-detail-img" onerror="this.style.display='none'">
      <div class="boss-detail-head">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
          <div>
            <h2>${b.name}</h2>
            <div style="font-size:13px;color:var(--muted);">${b.location}</div>
          </div>
          <button class="btn-ghost" onclick="closeBossDetail()" style="font-size:12px;padding:5px 12px;flex-shrink:0;">Close</button>
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
    ${renderBossRespawnBanner(b.id)}
    <div class="sep"></div>
    <h3>Boss Flow</h3>
    ${b.phases ? renderFlow(b.phases, 'phase') : ''}
    <div class="sep"></div>
    <h3>Arena Map</h3>
    ${renderMapScene(b.mapTheme || 'cave', b.phases || [b.name], b.mapImage || null)}
    <div class="sep"></div>
    ${pq ? renderBossPrequestProgress(b.id) : ''}
    ${pq ? `
    <h3>Prequest Walkthrough</h3>
    <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">
      <a href="#" onclick="openPrequest('${prequestId}');return false;" style="color:var(--blue);">Open full step-by-step prequest guide →</a>
    </p>
    <div class="sep"></div>
    ` : ''}
    <h3>${pq ? 'Prequest Summary' : 'How to Access'}</h3>
    <p style="font-size:13px;color:var(--muted);margin-bottom:16px;">${b.prequest}</p>
    <h3>Drops</h3>
    <ul class="drop-list">${b.drops.map(d => `<li>${itemLink(d)}</li>`).join('')}</ul>
    ${renderBossDropTable(b.id)}
    <div class="sep"></div>
    <h3>Tips</h3>
    <ul class="drop-list">${b.tips.map(t => `<li>${t}</li>`).join('')}</ul>
    ${b.forumGuide ? `<p style="margin-top:12px;"><a href="${b.forumGuide}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost">Forum guide ↗</a></p>` : ''}
  `;
  detail.scrollTop = 0;
  overlay.hidden = false;
  document.body.classList.add('boss-detail-open');
}

function filterBoss(tier, btn) {
  document.querySelectorAll('#boss-tier-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  bossTierFilter = tier;
  closeBossDetail(true);
  renderBosses();
  renderBossProgression();
}

function filterBossRegion(region) {
  bossRegionFilter = region;
  const sel = document.getElementById('boss-region-filters');
  if (sel) sel.value = region;
  closeBossDetail(true);
  renderBosses();
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
    <div class="level-range level-range--${l.theme || 'field'} ${isCurrent ? 'level-current' : ''}" id="level-range-${i}">
      <div class="level-zone-banner level-zone--${l.theme || 'field'}">
        <span class="level-zone-icon">${l.icon || '🗺️'}</span>
        <span class="level-zone-name">${l.label}</span>
      </div>
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
          <div class="spot spot-card">
            ${renderMapScene(s.mapStyle || 'field', s.mobs || [], s.mapImage || null)}
            <div class="spot-name">${s.name} <span class="badge ${s.type === 'party' ? 'badge-blue' : 'badge-green'}" style="font-size:10px;margin-left:6px;">${s.type}</span></div>
            ${s.mobs ? `<div class="spot-mobs">${s.mobs.map(m => `<span class="mob-chip">${m}</span>`).join('')}</div>` : ''}
            <div class="spot-detail">${s.detail}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `}).join('');
}

function highlightLevel() {
  const lf = document.getElementById('level-filter');
  const pl = document.getElementById('profile-level');
  if (lf && pl && lf.value !== pl.value) setProfileLevel(lf.value);
  renderLevels();
  renderWorldMap();
  renderLevelMilestones();
  renderPQOverview();
}

function renderLevelMilestones() {
  const el = document.getElementById('level-milestones');
  if (!el || typeof LEVEL_MILESTONES === 'undefined') return;
  const myLevel = parseInt(document.getElementById('level-filter')?.value) || getProfile().level || 0;
  if (!myLevel) { el.innerHTML = ''; return; }

  const completed = LEVEL_MILESTONES.filter(m => m.level <= myLevel);
  const upcoming = LEVEL_MILESTONES.filter(m => m.level > myLevel).slice(0, 3);
  const current = completed[completed.length - 1];

  el.innerHTML = `
    <div class="milestone-panel card">
      <div class="card-header">
        <h2>Level Milestones</h2>
        <span class="badge badge-blue">Lv ${myLevel}</span>
      </div>
      ${current ? `<p style="font-size:13px;color:var(--muted);margin:0 0 12px;">Latest: <strong>${current.icon} Lv ${current.level} — ${current.title}</strong></p>` : ''}
      <div class="milestone-list">
        ${upcoming.length ? upcoming.map(m => {
          const action = m.prequest
            ? `openPrequest('${m.prequest}')`
            : m.boss
              ? `showPage('bosses');showBoss('${m.boss}')`
              : `showPage('${m.page}')`;
          return `
            <button type="button" class="milestone-item" onclick="${action}">
              <span class="milestone-lv">Lv ${m.level}</span>
              <span class="milestone-icon">${m.icon}</span>
              <span class="milestone-body">
                <span class="milestone-title">${m.title}</span>
                <span class="milestone-detail">${m.detail}</span>
              </span>
              <span class="milestone-arrow">→</span>
            </button>
          `;
        }).join('') : '<p style="font-size:13px;color:var(--muted);margin:0;">All major milestones complete — endgame grind time.</p>'}
      </div>
    </div>
  `;
}

function filterLevelType(type, btn) {
  levelTypeFilter = type;
  document.querySelectorAll('#page-leveling .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLevels();
  renderWorldMap();
}

function toggleLevel(i) {
  document.getElementById('level-' + i).classList.toggle('open');
}

// ══════════════════════════════════════════════
// CHECKLIST
// ══════════════════════════════════════════════
function loadCheckState() {
  try {
    const raw = localStorage.getItem('mr-checklist');
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveCheckState() {
  localStorage.setItem('mr-checklist', JSON.stringify(checkState));
}

let checkState = loadCheckState();

function checklistSubcatSlug(subcat) {
  return subcat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function loadChecklistCollapsed() {
  try {
    const stored = localStorage.getItem('mr-checklist-collapsed');
    if (stored) return JSON.parse(stored);
    return { 'neo-tokyo-bosses-lv-130': true, 'ellin-bosses-lv-120': true };
  } catch { return {}; }
}

let checklistCollapsed = loadChecklistCollapsed();

function toggleChecklistSubcat(subcat) {
  const key = checklistSubcatSlug(subcat);
  checklistCollapsed[key] = !checklistCollapsed[key];
  localStorage.setItem('mr-checklist-collapsed', JSON.stringify(checklistCollapsed));
  renderChecklist();
}

function buildChecklistGroups() {
  const groups = [];
  for (const item of CHECKLIST) {
    const last = groups[groups.length - 1];
    if (item.subcat) {
      if (last?.type === 'subcat' && last.key === item.subcat) {
        last.items.push(item);
        if (item.subcatCollapsible) last.collapsible = true;
      } else {
        groups.push({
          type: 'subcat',
          key: item.subcat,
          collapsible: !!item.subcatCollapsible,
          items: [item],
        });
      }
    } else {
      groups.push({ type: 'item', items: [item] });
    }
  }
  return groups;
}

function renderChecklistItem(item) {
  const done = checkState[item.id];
  const bossNote = item.boss ? formatBossRunTime(item.id) : '';
  return `
    <div class="check-item ${done ? 'done' : ''}" onclick="toggleCheck('${item.id}')">
      <div class="check-box">${done ? '✓' : ''}</div>
      <span class="check-label">${item.label}${bossNote ? `<span class="check-boss-time">${bossNote}</span>` : ''}</span>
      ${item.bossId ? `<button type="button" class="check-boss-link" title="Open boss guide" onclick="event.stopPropagation();showPage('bosses');showBoss('${item.bossId}')">→</button>` : ''}
    </div>
  `;
}

function renderChecklist() {
  maybeResetDailies();
  checklistCollapsed = loadChecklistCollapsed();
  const container = document.getElementById('checklist-container');
  let lastCat = '';
  let html = '';
  for (const group of buildChecklistGroups()) {
    const cat = group.items[0].cat;
    if (cat !== lastCat) {
      html += `<div class="check-category">${cat}</div>`;
      lastCat = cat;
    }
    if (group.type === 'subcat') {
      const slug = checklistSubcatSlug(group.key);
      const collapsed = group.collapsible && checklistCollapsed[slug];
      const doneCount = group.items.filter(i => checkState[i.id]).length;
      if (group.collapsible) {
        html += `
          <button type="button" class="check-subcat-header" onclick="toggleChecklistSubcat('${group.key.replace(/'/g, "\\'")}')">
            <span>${collapsed ? '▸' : '▾'} ${group.key}</span>
            <span class="check-subcat-meta">${doneCount}/${group.items.length}</span>
          </button>
          <div class="check-subcat-body${collapsed ? ' collapsed' : ''}">
            ${group.items.map(renderChecklistItem).join('')}
          </div>
        `;
      } else {
        html += `<div class="check-subcategory">${group.key}</div>`;
        html += group.items.map(renderChecklistItem).join('');
      }
    } else {
      html += group.items.map(renderChecklistItem).join('');
    }
  }
  container.innerHTML = html;
  const done = Object.values(checkState).filter(Boolean).length;
  const total = CHECKLIST.length;
  document.getElementById('check-bar').style.width = (done / total * 100) + '%';
  document.getElementById('check-count').textContent = `${done} / ${total} complete`;
  renderHomeProgress();
}

function toggleCheck(id) {
  checkState[id] = !checkState[id];
  const item = CHECKLIST.find(i => i.id === id);
  if (item?.boss) {
    if (checkState[id]) localStorage.setItem(`mr-boss-run-${id}`, new Date().toISOString());
    else localStorage.removeItem(`mr-boss-run-${id}`);
  }
  saveCheckState();
  renderChecklist();
}

function resetDailyChecklist() {
  CHECKLIST.filter(i => i.cat === 'Daily').forEach(i => {
    delete checkState[i.id];
    if (i.boss) localStorage.removeItem(`mr-boss-run-${i.id}`);
  });
  localStorage.setItem('mr-checklist-date', getServerDateString());
  saveCheckState();
  renderChecklist();
}

function resetChecklist() {
  checkState = {};
  CHECKLIST.filter(i => i.boss).forEach(i => localStorage.removeItem(`mr-boss-run-${i.id}`));
  saveCheckState();
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
function loadScrollLog() {
  try { return JSON.parse(localStorage.getItem('mr-scroll-log') || '[]'); }
  catch { return []; }
}

function saveScrollLog() {
  localStorage.setItem('mr-scroll-log', JSON.stringify(scrollLog.slice(0, 100)));
}

let scrollLog = loadScrollLog();

function logScroll(success) {
  const item = document.getElementById('scroll-item').value || 'Unknown item';
  const type = document.getElementById('scroll-type').value;
  scrollLog.unshift({ item, type, success, time: new Date().toLocaleTimeString() });
  saveScrollLog();
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
  saveScrollLog();
  updateScrollStats();
}

// ══════════════════════════════════════════════
// MESO TRACKER
// ══════════════════════════════════════════════
function loadMesoLog() {
  try { return JSON.parse(localStorage.getItem('mr-meso-log') || '[]'); }
  catch { return []; }
}

function saveMesoLog() {
  localStorage.setItem('mr-meso-log', JSON.stringify(mesoLog.slice(0, 100)));
}

let mesoLog = loadMesoLog();

function logMeso(income) {
  const amount = parseInt(document.getElementById('meso-amount').value) || 0;
  const source = document.getElementById('meso-source').value || 'Unknown';
  if (!amount) return;
  mesoLog.unshift({ amount, source, income, time: new Date().toLocaleTimeString() });
  saveMesoLog();
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
  saveMesoLog();
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
  const classId = QUIZ_CLASS_IDS[best.name];
  const guideBtn = classId
    ? `<button class="btn" style="margin-right:8px;" onclick="openClassGuide('${classId}')">Read ${best.name} Guide →</button>`
    : '';
  const profileBtn = classId
    ? `<button class="btn btn-ghost" style="margin-right:8px;" onclick="setProfileClass('${classId}');document.getElementById('profile-class').value='${classId}';showPage('home');">Set as my class</button>`
    : '';
  const resultEl = document.getElementById('quiz-result');
  let actions = resultEl.querySelector('.quiz-actions');
  if (!actions) {
    actions = document.createElement('div');
    actions.className = 'quiz-actions';
    resultEl.appendChild(actions);
  }
  actions.innerHTML = `${guideBtn}${profileBtn}<button class="btn-ghost" onclick="resetQuiz()">Retake Quiz</button>`;
  const icon = document.getElementById('quiz-class-icon');
  if (icon) { icon.src = best.icon; icon.alt = best.name; icon.style.display = ''; }
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
  const { classId } = getProfile();
  const classGear = classId && CLASS_GEAR_NOTES?.[classId]
    ? renderClassGearBlock(classId, `${CLASS_GUIDES[classId]?.name || 'Your class'} — gear priorities`)
    : '';
  document.getElementById('gear-timeline').innerHTML = `
    ${classGear}
    ${GEAR_PHASES.map(p => `
    <div class="gear-phase">
      <div class="gear-phase-title">${p.title}</div>
      ${p.items.map(item => `
          <div class="gear-item">
          <span class="gear-priority ${item.priority}">${item.priority.toUpperCase()}</span>
          <div>
            <div style="font-weight:600;margin-bottom:2px;">${gearItemLabel(item.name, item.itemKey)}</div>
            <div style="font-size:13px;color:var(--muted);">${item.detail}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('')}`;
}

function renderClassGearBlock(classId, title) {
  const items = CLASS_GEAR_NOTES?.[classId];
  if (!items?.length) return '';
  return `
    <div class="card class-gear-card" style="margin-bottom:20px;">
      <div class="card-header"><h2>${title}</h2><span class="badge badge-yellow">Class-specific</span></div>
      ${items.map(item => `
        <div class="gear-item">
          <span class="gear-priority ${item.priority}">${item.priority.toUpperCase()}</span>
          <div>
            <div style="font-weight:600;margin-bottom:2px;">${gearItemLabel(item.item, item.itemKey)}</div>
            <div style="font-size:13px;color:var(--muted);">${item.note}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ══════════════════════════════════════════════
// PROGRESS TRACKING (jobs + prequests)
// ══════════════════════════════════════════════
function stepKey(prefix, id) { return `mr-${prefix}-${id}`; }

function isStepDone(key) {
  return localStorage.getItem(key) === '1';
}

function toggleStep(key, rerender) {
  localStorage.setItem(key, isStepDone(key) ? '0' : '1');
  if (rerender === 'job') { renderJobAdv(); renderHomeProgress(); }
  else if (rerender === 'prequest') { renderPrequests(); renderPrequestOverview(); renderHomeNextSteps(); renderHomeProgress(); }
}

function renderCheckableSteps(steps, prefix, rerender) {
  return steps.map((s, i) => {
    const key = stepKey(prefix, s.id);
    const done = isStepDone(key);
    const mobs = s.farmMobs || (s.drops ? [s.drops] : []);
    return `
      <div class="quest-step ${done ? 'done' : ''}" onclick="toggleStep('${key}', '${rerender}')">
        <div class="quest-step-check">${done ? '✓' : i + 1}</div>
        <div class="quest-step-body">
          <div class="quest-step-text">${s.text}</div>
          ${s.npc ? `<div class="quest-step-npc">🧭 <strong>${s.npc}</strong>${s.locationHint ? ` · ${s.locationHint}` : ''}</div>` : ''}
          ${s.farmMobs?.length ? `<div class="quest-step-mobs">Farm: ${s.farmMobs.join(', ')}</div>` : ''}
          ${s.drops ? `<div class="quest-step-drops">Item: ${itemLink(s.drops, resolveItemQuery(s.drops))}</div>` : ''}
          ${s.detail ? `<div class="quest-step-detail">${s.detail}</div>` : ''}
          ${s.mapImage ? `<div class="quest-step-map" onclick="event.stopPropagation()">${renderMapScene('field', mobs, s.mapImage)}</div>` : ''}
        </div>
      </div>`;
  }).join('');
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

function getJobProgress(pathKey) {
  const path = JOB_PATHS[pathKey];
  if (!path) return { done: 0, total: 0 };
  let done = 0, total = 0;
  path.advancements.forEach(a => {
    a.steps.forEach(s => {
      total++;
      if (isStepDone(stepKey('job', s.id))) done++;
    });
  });
  return { done, total };
}

function renderJobAdv() {
  const path = JOB_PATHS[currentJob];
  const { done, total } = getJobProgress(currentJob);
  const pct = total ? Math.round((done / total) * 100) : 0;
  const bar = document.getElementById('job-progress-bar');
  const label = document.getElementById('job-progress-label');
  if (bar) bar.style.width = pct + '%';
  if (label) label.textContent = total ? `${done} / ${total} steps complete (${pct}%)` : '';

  document.getElementById('job-container').innerHTML = `
    <p class="job-tree-label">${path.tree}</p>
    <div class="job-timeline">
      ${path.advancements.map((a, ai) => `
        <div class="job-timeline-item">
          <div class="job-timeline-marker">Lv ${a.level}</div>
          <div class="card quest-card">
            <div class="card-header">
              <h2>${a.title}</h2>
              <span class="badge badge-blue">${a.location}</span>
            </div>
            <p class="quest-npc"><strong>NPC:</strong> ${a.npc}</p>
            ${renderCheckableSteps(a.steps, 'job', 'job')}
            ${a.skillPriority ? `
              <div class="quest-extras">
                <strong>Skill priority:</strong>
                ${a.skillPriority.map(s => `<span class="tag">${s}</span>`).join('')}
              </div>` : ''}
            ${a.tips ? `<ul class="drop-list quest-tips">${a.tips.map(t => `<li>${t}</li>`).join('')}</ul>` : ''}
            ${a.classLink ? `<p class="quest-link-hint">At 4th job, read your <a href="#" onclick="showPage('classes');return false;" style="color:var(--blue);">class guide</a>.</p>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ══════════════════════════════════════════════
// PREQUESTS
// ══════════════════════════════════════════════
function openPrequest(id, skipHash) {
  showPage('prequests', null, skipHash);
  if (!skipHash) setRoute('prequests', id);
  const el = document.getElementById('prequest-' + id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('prequest-highlight');
    setTimeout(() => el.classList.remove('prequest-highlight'), 2000);
  }
}

function renderPrequestOverview() {
  const el = document.getElementById('prequest-overview');
  if (!el || typeof PREQUESTS === 'undefined') return;
  el.innerHTML = `
    <div class="prequest-track">
      ${PREQUESTS.map(pq => {
        const { done, total } = prequestProgress(pq.id);
        const pct = total ? Math.round((done / total) * 100) : 0;
        const complete = total > 0 && done === total;
        return `
          <button type="button" class="prequest-track-item${complete ? ' complete' : ''}" onclick="openPrequest('${pq.id}')">
            <div class="prequest-track-top">
              <span class="prequest-track-name">${pq.short}</span>
              <span class="prequest-track-lv">Lv ${pq.startLevel}+</span>
            </div>
            <div class="prequest-track-bar"><div style="width:${pct}%"></div></div>
            <div class="prequest-track-stats">${done}/${total} steps${complete ? ' ✓' : ''}</div>
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function renderPrequests() {
  renderPrequestOverview();
  const el = document.getElementById('prequest-list');
  if (!el || typeof PREQUESTS === 'undefined') return;
  el.innerHTML = PREQUESTS.map(pq => {
    const done = pq.steps.filter(s => isStepDone(stepKey('pq', `${pq.id}-${s.id}`))).length;
    const total = pq.steps.length;
    return `
      <div class="card quest-card prequest-card" id="prequest-${pq.id}">
        <div class="card-header">
          <h2>${pq.name}</h2>
          <div style="display:flex;gap:6px;align-items:center;">
            <button type="button" class="btn-ghost btn-sm" onclick="event.stopPropagation();copyDeepLink('prequests','${pq.id}')" title="Copy share link">⎘</button>
            <span class="badge badge-yellow">Start Lv ${pq.startLevel}+</span>
          </div>
        </div>
        ${pq.mapImage ? renderMapScene('field', [], pq.mapImage) : ''}
        <p style="font-size:14px;color:var(--muted);margin-bottom:12px;">${pq.summary}</p>
        <div class="info-grid" style="margin-bottom:16px;">
          <div class="info-item"><div class="label">Recommend</div><div class="value" style="font-size:12px;">${pq.recommendLevel}</div></div>
          <div class="info-item"><div class="label">Duration</div><div class="value">${pq.duration}</div></div>
          <div class="info-item"><div class="label">Location</div><div class="value" style="font-size:12px;">${pq.location}</div></div>
          <div class="info-item"><div class="label">Progress</div><div class="value">${done}/${total}</div></div>
        </div>
        <h3>Requirements</h3>
        <ul class="drop-list">${pq.requirements.map(r => `<li>${r}</li>`).join('')}</ul>
        <h3>Steps</h3>
        ${renderCheckableSteps(pq.steps.map(s => ({ ...s, id: `${pq.id}-${s.id}` })), 'pq', 'prequest')}
        <h3>Tips</h3>
        <ul class="drop-list">${pq.tips.map(t => `<li>${t}</li>`).join('')}</ul>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
          ${pq.bossId ? `<button class="btn btn-sm" onclick="showPage('bosses');showBoss('${pq.bossId}')">View Boss Guide →</button>` : ''}
          ${pq.forumGuide ? `<a href="${pq.forumGuide}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost">Forum guide ↗</a>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// ══════════════════════════════════════════════
// CLASS GUIDES
// ══════════════════════════════════════════════
let currentClassBranch = 'all';
let currentClassId = null;

function openClassGuide(id, skipHash) {
  showPage('classes', null, skipHash);
  if (!skipHash) setRoute('classes', id);
  showClass(id, true);
}

function filterClassBranch(branch, btn) {
  document.querySelectorAll('#class-branch-filters .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  currentClassBranch = branch;
  currentClassId = null;
  document.getElementById('class-detail').innerHTML = '';
  document.getElementById('class-detail').classList.remove('show');
  renderClassGrid();
}

function renderClassBranchFilters() {
  const el = document.getElementById('class-branch-filters');
  if (!el) return;
  el.innerHTML = `
    <button class="filter-btn active" onclick="filterClassBranch('all', this)">All</button>
    ${CLASS_BRANCHES.map(b => `
      <button class="filter-btn" onclick="filterClassBranch('${b.id}', this)">${b.label}</button>
    `).join('')}
  `;
}

function renderClassGrid() {
  const el = document.getElementById('class-grid');
  if (!el || typeof CLASS_GUIDES === 'undefined') return;
  const ids = currentClassBranch === 'all'
    ? CLASS_BRANCHES.flatMap(b => b.classes)
    : (CLASS_BRANCHES.find(b => b.id === currentClassBranch)?.classes || []);
  el.innerHTML = ids.map(id => {
    const c = CLASS_GUIDES[id];
    if (!c) return '';
    const diffColor = c.difficulty.includes('Beginner') ? 'badge-green' : c.difficulty.includes('Hard') ? 'badge-red' : 'badge-yellow';
    return `
      <div class="class-card ${currentClassId === id ? 'active' : ''}" onclick="showClass('${id}')">
        <img src="${c.icon}" alt="" class="class-card-icon" onerror="this.style.display='none'">
        <div class="class-card-name">${c.name}</div>
        <div class="class-card-role">${c.role}</div>
        <span class="badge ${diffColor}" style="font-size:10px;margin-top:6px;">${c.difficulty}</span>
      </div>
    `;
  }).join('');
}

function showClass(id, skipRoute) {
  currentClassId = id;
  if (!skipRoute) setRoute('classes', id);
  const c = CLASS_GUIDES[id];
  const detail = document.getElementById('class-detail');
  if (!c || !detail) return;
  renderClassGrid();
  detail.innerHTML = `
    <div class="class-detail-top">
      <img src="${c.icon}" alt="" class="class-detail-icon" onerror="this.style.display='none'">
      <div>
        <h2>${c.name}</h2>
        <p style="font-size:13px;color:var(--muted);margin:4px 0;">${c.path}</p>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
          ${(c.badges || []).map(b => `<span class="tag">${b}</span>`).join('')}
        </div>
      </div>
      <button class="btn-ghost" onclick="document.getElementById('class-detail').classList.remove('show')" style="font-size:12px;padding:5px 12px;margin-left:auto;flex-shrink:0;">Close</button>
    </div>
    <div class="info-grid">
      <div class="info-item"><div class="label">Role</div><div class="value" style="font-size:12px;">${c.role}</div></div>
      <div class="info-item"><div class="label">Difficulty</div><div class="value">${c.difficulty}</div></div>
      <div class="info-item"><div class="label">Cost</div><div class="value">${c.cost}</div></div>
      <div class="info-item"><div class="label">HP Wash</div><div class="value" style="font-size:12px;">${c.hpWash}</div></div>
    </div>
    <div class="sep"></div>
    <h3>Overview</h3>
    <p style="font-size:14px;color:var(--muted);">${c.overview}</p>
    <div class="grid2" style="margin-top:16px;">
      <div class="card">
        <div class="card-header"><h2>Pros</h2><span class="badge badge-green">+</span></div>
        <ul class="drop-list">${c.pros.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>
      <div class="card">
        <div class="card-header"><h2>Cons</h2><span class="badge badge-red">−</span></div>
        <ul class="drop-list">${c.cons.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>
    </div>
    <div class="sep"></div>
    <h3>Skill Build</h3>
    <div class="skill-build-grid">
      ${Object.entries(c.skills).map(([phase, skills]) => `
        <div class="skill-phase">
          <div class="skill-phase-label">${phase}</div>
          ${skills.map(s => `<span class="tag">${s}</span>`).join('')}
        </div>
      `).join('')}
    </div>
    ${renderSkillTable(id)}
    <div class="sep"></div>
    <h3>Leveling</h3>
    <p style="font-size:13px;color:var(--muted);">${c.leveling}</p>
    <h3 style="margin-top:16px;">Bossing</h3>
    <p style="font-size:13px;color:var(--muted);">${c.bossing}</p>
    <h3 style="margin-top:16px;">Party Value</h3>
    <p style="font-size:13px;color:var(--muted);">${c.partyValue}</p>
    <h3 style="margin-top:16px;">Common Mistakes</h3>
    <ul class="drop-list">${c.mistakes.map(m => `<li>${m}</li>`).join('')}</ul>
    ${CLASS_GEAR_NOTES?.[id] ? `
    <div class="sep"></div>
    <h3>Gear Priorities</h3>
    ${renderClassGearBlock(id, 'What to fund first')}
    ` : ''}
    <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-sm" onclick="showPage('jobadv')">Job Advancements →</button>
      <button class="btn btn-sm btn-ghost" onclick="showPage('gear')">Gear Roadmap →</button>
    </div>
    <div class="sep"></div>
    <h3>Official Resources</h3>
    <div class="class-resources">
      ${(() => {
        const links = getClassLinks(id);
        const primary = links.find(l => l.primary);
        const rest = links.filter(l => !l.primary);
        return `
          ${primary ? `<a href="${primary.url}" target="_blank" rel="noopener" class="btn btn-sm class-guide-btn">📖 ${primary.label}</a>` : ''}
          <div class="class-resource-links">
            ${rest.map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label} →</a>`).join('')}
          </div>
        `;
      })()}
    </div>
  `;
  detail.classList.add('show');
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderClasses() {
  renderClassBranchFilters();
  renderClassGrid();
}

// ══════════════════════════════════════════════
// PARTY BUILDER
// ══════════════════════════════════════════════
let partyMembers = [];
let partyBossTarget = 'horntail';

function loadPartyMembers() {
  try { return JSON.parse(localStorage.getItem('mr-party') || '[]'); }
  catch { return []; }
}

function savePartyMembers() {
  localStorage.setItem('mr-party', JSON.stringify(partyMembers));
}

partyMembers = loadPartyMembers();

function getPartyMaxSlots() {
  return PARTY_BOSS_RULES?.[partyBossTarget]?.maxSlots || 6;
}

function initPartyBuilder() {
  partyMembers = loadPartyMembers();
  const sel = document.getElementById('party-boss-target');
  if (sel && typeof PARTY_BOSS_RULES !== 'undefined') {
    sel.innerHTML = Object.entries(PARTY_BOSS_RULES).map(([id, r]) =>
      `<option value="${id}">${r.label}</option>`
    ).join('');
    partyBossTarget = localStorage.getItem('mr-party-boss') || 'horntail';
    if (!PARTY_BOSS_RULES[partyBossTarget]) partyBossTarget = 'horntail';
    sel.value = partyBossTarget;
    sel.addEventListener('change', () => {
      partyBossTarget = sel.value;
      localStorage.setItem('mr-party-boss', partyBossTarget);
      const max = getPartyMaxSlots();
      if (partyMembers.length > max) {
        partyMembers = partyMembers.slice(0, max);
        savePartyMembers();
      }
      renderPartySlots();
    });
  }
  if (!partyMembers.length) {
    const { classId } = getProfile();
    if (classId && CLASS_GUIDES[classId]) {
      const name = CLASS_GUIDES[classId].name;
      const map = { 'Fire/Poison Arch Mage': 'Fire/Poison Mage', 'Ice/Lightning Arch Mage': 'Ice/Lightning Mage' };
      partyMembers = [map[name] || name];
      savePartyMembers();
    }
  }
  renderPartyPresets();
  renderPartySlots();
}

function renderPartyPresets() {
  const el = document.getElementById('party-presets');
  if (!el || typeof PARTY_PRESETS === 'undefined') return;
  el.innerHTML = Object.entries(PARTY_PRESETS).map(([id, p]) => `
    <button type="button" class="party-preset-btn" onclick="loadPartyPreset('${id}')">${p.label}</button>
  `).join('');
}

function loadPartyPreset(id) {
  const preset = PARTY_PRESETS[id];
  if (!preset) return;
  partyMembers = [...preset.classes];
  partyBossTarget = id;
  const sel = document.getElementById('party-boss-target');
  if (sel) sel.value = id;
  localStorage.setItem('mr-party-boss', id);
  savePartyMembers();
  renderPartySlots();
}

function renderPartySlots() {
  const max = getPartyMaxSlots();
  if (partyMembers.length > max) {
    partyMembers = partyMembers.slice(0, max);
    savePartyMembers();
  }
  const grid = document.getElementById('party-slots');
  grid.innerHTML = Array(max).fill(0).map((_, i) => {
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
  const max = getPartyMaxSlots();
  if (!cls || partyMembers.length >= max) return;
  partyMembers.push(cls);
  savePartyMembers();
  renderPartySlots();
}

function removeFromParty(i) {
  partyMembers.splice(i, 1);
  savePartyMembers();
  renderPartySlots();
}

function clearParty() {
  partyMembers = [];
  savePartyMembers();
  renderPartySlots();
}

function analyzeParty() {
  const rec = document.getElementById('party-rec');
  if (!partyMembers.length) {
    rec.innerHTML = '<p style="color:var(--muted);font-size:13px;margin:0;">Add classes or load a preset to analyze your party.</p>';
    return;
  }
  const rules = PARTY_BOSS_RULES?.[partyBossTarget];
  const hasBishop = partyMembers.includes('Bishop');
  const hasDK = partyMembers.includes('Dark Knight');
  const nlCount = partyMembers.filter(c => c === 'Night Lord').length;
  const hasBM = partyMembers.includes('Bowmaster');
  const hasShadower = partyMembers.includes('Shadower');
  const warnings = [];
  const goods = [];

  if (rules) {
    if (rules.bishop === 'required' && !hasBishop) warnings.push('⚠️ Bishop required for ' + rules.label);
    else if (rules.bishop === 'recommended' && !hasBishop) warnings.push('⚠️ Bishop recommended for ' + rules.label);
    else if (hasBishop) goods.push('✓ Bishop — Holy Symbol + Heal');

    if (rules.dk === 'required' && !hasDK) warnings.push('⚠️ Dark Knight required for ' + rules.label);
    else if (rules.dk === 'recommended' && !hasDK) warnings.push('⚠️ Dark Knight recommended for ' + rules.label);
    else if (hasDK) goods.push('✓ Dark Knight — Hyper Body');

    if (rules.nlMin && nlCount < rules.nlMin) warnings.push(`⚠️ Need at least ${rules.nlMin} Night Lord(s) for ${rules.label}`);
    if (rules.nl === 'recommended' && !nlCount) warnings.push('⚠️ Night Lord recommended for boss DPS');
    if (nlCount) goods.push(`✓ ${nlCount} Night Lord${nlCount > 1 ? 's' : ''} — burst DPS`);

    if (rules.bm === 'recommended' && !hasBM) warnings.push('⚠️ Bowmaster recommended — Sharp Eyes');
    else if (hasBM) goods.push('✓ Bowmaster — Sharp Eyes');

    if (rules.shadower === 'recommended' && !hasShadower) warnings.push('⚠️ Shadower recommended — Smokescreen');
    else if (hasShadower) goods.push('✓ Shadower — Smokescreen');

    if (partyMembers.includes('Buccaneer')) goods.push('✓ Buccaneer — Speed Infusion');
  } else {
    if (!hasBishop) warnings.push('⚠️ No Bishop — Holy Symbol and Heal missing.');
    else goods.push('✓ Bishop present');
    if (!hasDK) warnings.push('⚠️ No Dark Knight — Hyper Body missing.');
    else goods.push('✓ Dark Knight present');
  }

  if (partyMembers.length < getPartyMaxSlots()) {
    const max = getPartyMaxSlots();
    warnings.push(`ℹ️ ${max - partyMembers.length} empty slot(s) — add more DPS`);
  }

  const maxSlots = getPartyMaxSlots();
  rec.innerHTML = `
    <div style="margin-bottom:8px;font-size:13px;font-weight:600;">${rules?.label || 'Party'} Analysis (${partyMembers.length}/${maxSlots})</div>
    ${goods.map(g => `<div style="font-size:13px;color:var(--green);margin-bottom:4px;">${g}</div>`).join('')}
    ${warnings.map(w => `<div style="font-size:13px;color:var(--yellow);margin-bottom:4px;">${w}</div>`).join('')}
    ${rules?.notes ? `<ul class="drop-list" style="margin-top:10px;font-size:12px;">${rules.notes.map(n => `<li>${n}</li>`).join('')}</ul>` : ''}
  `;
}

// ══════════════════════════════════════════════
// MOB GLOSSARY
// ══════════════════════════════════════════════
let glossaryCategory = 'all';

function initGlossaryFilters() {
  const el = document.getElementById('glossary-filters');
  if (!el || typeof GLOSSARY_CATEGORIES === 'undefined') return;
  el.innerHTML = GLOSSARY_CATEGORIES.map(c => `
    <button class="filter-btn${glossaryCategory === c.id ? ' active' : ''}" onclick="filterGlossary('${c.id}', this)">${c.label}</button>
  `).join('');
}

function filterGlossary(cat, btn) {
  glossaryCategory = cat;
  document.querySelectorAll('#glossary-filters .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderGlossary();
}

function renderGlossary() {
  const el = document.getElementById('glossary-list');
  const q = (document.getElementById('glossary-search')?.value || '').trim().toLowerCase();
  if (!el || typeof MOB_GLOSSARY === 'undefined') return;
  if (!document.getElementById('glossary-filters')?.innerHTML) initGlossaryFilters();
  const mobs = MOB_GLOSSARY.filter(m => {
    if (glossaryCategory !== 'all' && m.category !== glossaryCategory) return false;
    return !q || m.name.toLowerCase().includes(q) || m.area.toLowerCase().includes(q) || m.tip.toLowerCase().includes(q) || (m.drops || '').toLowerCase().includes(q);
  });
  el.innerHTML = mobs.map(m => `
    <div class="card glossary-card">
      <div class="card-header">
        <h2>${m.name}</h2>
        <span class="badge badge-blue">Lv ${m.level}</span>
      </div>
      ${m.mapImage || m.mapStyle ? `<div class="glossary-map">${renderMapScene(m.mapStyle || 'field', m.drops ? [m.drops] : [], m.mapImage || null)}</div>` : ''}
      <p style="font-size:13px;color:var(--muted);margin-bottom:8px;">📍 ${m.area}${m.drops ? ` · <span style="color:var(--gold);">Drops: ${m.drops}</span>` : ''}</p>
      <p style="font-size:14px;">${m.tip}</p>
      ${m.prequest ? `<button class="btn btn-sm btn-ghost" style="margin-top:10px;" onclick="openPrequest('${m.prequest}')">Open ${(PREQUESTS?.find(p => p.id === m.prequest)?.short || m.prequest)} prequest →</button>` : ''}
    </div>
  `).join('') || `<p style="color:var(--muted);">No mobs match your filters.</p>`;
}

// ══════════════════════════════════════════════
// GLOBAL SEARCH (Ctrl+K)
// ══════════════════════════════════════════════
let searchIndex = null;
let searchActive = -1;

function buildSearchIndex() {
  if (searchIndex) return searchIndex;
  const items = [];
  GUIDE_SECTIONS.forEach(s => items.push({ type: 'Guide', label: s.title, sub: s.desc, action: () => showPage(s.id) }));
  if (typeof CLASS_GUIDES !== 'undefined') {
    Object.entries(CLASS_GUIDES).forEach(([id, c]) => {
      items.push({ type: 'Class', label: c.name, sub: c.role, action: () => openClassGuide(id) });
    });
  }
  if (typeof PREQUESTS !== 'undefined') {
    PREQUESTS.forEach(p => items.push({ type: 'Prequest', label: p.name, sub: `Start Lv ${p.startLevel}+`, action: () => openPrequest(p.id) }));
  }
  BOSSES.forEach(b => items.push({ type: 'Boss', label: b.name, sub: b.location, action: () => { showPage('bosses'); showBoss(b.id); } }));
  Object.keys(ITEM_DB).forEach(k => items.push({ type: 'Item', label: k, sub: ITEM_DB[k].verdict, action: () => { showPage('items'); checkItem(k); } }));
  if (typeof MOB_GLOSSARY !== 'undefined') {
    MOB_GLOSSARY.forEach(m => items.push({ type: 'Mob', label: m.name, sub: m.area, action: () => { showPage('glossary'); setTimeout(renderGlossary, 50); } }));
  }
  LEVELS.forEach(l => l.spots.forEach(s => {
    items.push({ type: 'Training', label: s.name, sub: `Lv ${l.range}`, action: () => showPage('leveling') });
  }));
  searchIndex = items;
  return items;
}

function openSearch() {
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('global-search-input');
  if (!overlay || !input) return;
  overlay.hidden = false;
  input.value = '';
  searchActive = -1;
  renderSearchResults('');
  input.focus();
}

function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) overlay.hidden = true;
  searchActive = -1;
}

function renderSearchResults(q) {
  const list = document.getElementById('global-search-results');
  if (!list) return;
  const ql = q.trim().toLowerCase();
  const matches = !ql ? [] : buildSearchIndex()
    .map(item => {
      let score = scoreItemMatch(item.label, ql);
      if (score < 0 && item.sub) score = scoreItemMatch(item.sub, ql);
      if (item.sub && item.sub.toLowerCase().includes(ql)) score = Math.max(score, 35);
      return { item, score };
    })
    .filter(x => x.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
  window._searchActions = matches.map(m => m.item.action);
  list.innerHTML = matches.length ? matches.map((m, idx) => `
    <li class="search-result-item${idx === searchActive ? ' active' : ''}" role="option" onclick="runSearchAction(${idx})">
      <span class="search-result-type">${m.item.type}</span>
      <span class="search-result-label">${m.item.label}</span>
      <span class="search-result-sub">${m.item.sub || ''}</span>
    </li>
  `).join('') : `<li class="search-empty">${ql ? 'No results' : 'Type to search guides, classes, items, bosses...'}</li>`;
}

function runSearchAction(idx) {
  closeSearch();
  if (window._searchActions && window._searchActions[idx]) window._searchActions[idx]();
}

function initGlobalSearch() {
  const input = document.getElementById('global-search-input');
  if (!input) return;
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const tag = document.activeElement?.tagName;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
        e.preventDefault();
        openSearch();
      }
    }
    if (e.key === 'Escape') closeSearch();
  });
  input.addEventListener('input', () => { searchActive = -1; renderSearchResults(input.value); });
  input.addEventListener('keydown', e => {
    const list = document.getElementById('global-search-results');
    const count = list?.querySelectorAll('.search-result-item').length || 0;
    if (e.key === 'ArrowDown' && count) {
      e.preventDefault();
      searchActive = Math.min(searchActive + 1, count - 1);
      renderSearchResults(input.value);
    } else if (e.key === 'ArrowUp' && count) {
      e.preventDefault();
      searchActive = searchActive <= 0 ? count - 1 : searchActive - 1;
      renderSearchResults(input.value);
    } else if (e.key === 'Enter' && searchActive >= 0) {
      e.preventDefault();
      runSearchAction(searchActive);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  renderHome();
  initProfile();
  initPWA();
  initGlobalSearch();
  renderTools();
  renderPQs();
  renderBossProgression();
  initBossRegionFilters();
  renderBosses();
  renderLevels();
  renderWorldMap();
  renderLevelMilestones();
  renderChecklist();
  renderExternalLinks('checklist-external-links');
  updateScrollStats();
  updateMesoStats();
  renderGear();
  renderQuiz();
  renderJobAdv();
  renderPrequests();
  renderClasses();
  renderGlossary();
  initPartyBuilder();
  renderPopularPrices();
  renderScrollPrices();
  updateItemsPageMeta();
  renderQuickRefChips();
  initLevelProfile();
  initItemAutocomplete();
  initRouteFromHash();
});

window.addEventListener('hashchange', () => initRouteFromHash());
