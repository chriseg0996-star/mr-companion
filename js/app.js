// MapleRoyals Companion — Main App Logic

// ══════════════════════════════════════════════
// NAV
// ══════════════════════════════════════════════
const PAGE_TITLES = {
  home: 'MR Companion', leveling: 'Leveling', leeching: 'Leeching', pqs: 'Party Quests', bosses: 'Bosses',
  prequests: 'Prequests', items: 'Items', classes: 'Classes', jobadv: 'Jobs',
  quiz: 'Class Quiz', gear: 'Gear', checklist: 'Daily', tools: 'Tools & Library',
  glossary: 'Mob Glossary',
  hpwash: 'HP Wash', scrolls: 'Scrolls', mesos: 'Mesos', party: 'Party',
};

const NAV_PRIMARY = ['leveling', 'bosses', 'items'];

const NAV_DRAWER_SECTIONS = [
  {
    label: 'Guides',
    items: [
      { id: 'leveling', icon: '📈' }, { id: 'leeching', icon: '💸' }, { id: 'pqs', icon: '👥' },
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
  if (id !== 'prequests') closePrequestDetail(true);
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
  document.querySelector('.nav-logo')?.classList.toggle('active', id === 'home');
  document.querySelectorAll('.nav-bottom-btn').forEach(b => {
    if (b.dataset.page === 'menu') {
      b.classList.toggle('active', !NAV_PRIMARY.includes(id) && id !== 'home');
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
      || document.querySelector(`.nav-bottom-btn[data-page="${id}"]`)
      || (id === 'home' ? document.querySelector('.nav-logo') : null);
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
      closePrequestDetail();
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

function prequestProgress(id) {
  const pq = PREQUESTS.find(p => p.id === id);
  if (!pq) return { done: 0, total: 0 };
  const done = pq.steps.filter(s => isStepDone(stepKey('pq', `${id}-${s.id}`))).length;
  return { done, total: pq.steps.length };
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

function renderMinListItem({ id, title, desc, icon }) {
  const label = title || id;
  return `
    <button type="button" class="min-list-item" onclick="showPage('${id}')">
      ${icon ? `<span class="min-list-icon" aria-hidden="true">${icon}</span>` : ''}
      <span class="min-list-body">
        <span class="min-list-label">${label}</span>
        ${desc ? `<span class="min-list-desc">${desc}</span>` : ''}
      </span>
      <span class="min-list-arrow" aria-hidden="true">→</span>
    </button>
  `;
}

function renderHomeTile({ id, title, icon }) {
  return `
    <button type="button" class="home-tile" onclick="showPage('${id}')">
      <span class="home-tile-icon" aria-hidden="true">${icon}</span>
      <span class="home-tile-label">${title}</span>
    </button>
  `;
}

function renderHome() {
  const homeOrder = [
    'leveling', 'bosses', 'items', 'pqs',
    'prequests', 'leeching', 'classes', 'jobadv',
    'quiz', 'checklist', 'gear', 'tools',
  ];
  const grid = document.getElementById('home-grid');
  if (!grid || typeof GUIDE_SECTIONS === 'undefined') return;

  const byId = Object.fromEntries(GUIDE_SECTIONS.map(s => [s.id, s]));
  const extras = {
    checklist: { id: 'checklist', icon: '✅', title: 'Daily' },
    tools: { id: 'tools', icon: '🧰', title: 'Library' },
  };

  grid.innerHTML = homeOrder.map(id => {
    const s = byId[id] || extras[id];
    if (!s) return '';
    const title = (s.title || id)
      .replace(/ Guide$/, '')
      .replace(/^Pick Your Class$/, 'Class Quiz')
      .replace(/^Gear Roadmap$/, 'Gear')
      .replace(/^Job Advancements$/, 'Jobs');
    return renderHomeTile({ id: s.id, title, icon: s.icon });
  }).join('');
}

function renderTools() {
  const tools = [
    { id: 'glossary', icon: '👾', title: 'Mob Glossary', desc: 'Mobs you will see while leveling' },
    { id: 'hpwash', icon: '❤️', title: 'HP Wash Calculator', desc: 'HP gained per wash at your INT' },
    { id: 'scrolls', icon: '📜', title: 'Scroll Tracker', desc: 'Log scroll attempts and rates' },
    { id: 'mesos', icon: '💰', title: 'Meso Tracker', desc: 'Session income and expenses' },
    { id: 'party', icon: '⚔️', title: 'Party Builder', desc: 'Boss party and missing buffs' },
    { id: 'checklist', icon: '✅', title: 'Daily Checklist', desc: 'Daily and weekly tasks' },
  ];
  document.getElementById('tools-grid').innerHTML = tools
    .map(t => renderMinListItem({ id: t.id, title: t.title, desc: t.desc, icon: t.icon }))
    .join('');
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

function renderForumGuideCard(g) {
  return `
    <a href="${g.url}" target="_blank" rel="noopener" class="external-link-card forum-guide-card">
      <span class="external-link-icon">${g.icon}</span>
      <span class="external-link-body">
        <span class="external-link-label">${g.label}</span>
        <span class="external-link-desc">${g.desc}</span>
      </span>
      <span class="external-link-arrow">↗</span>
    </a>
  `;
}

function renderForumGuides() {
  if (typeof FORUM_GUIDES === 'undefined') return;

  const tools = document.getElementById('tools-forum-guides');
  if (tools) {
    tools.innerHTML = FORUM_GUIDES.map(section => `
      <div class="forum-guides-group">
        <div class="forum-guides-group-label">${section.category}</div>
        <div class="external-links-grid">${section.guides.map(renderForumGuideCard).join('')}</div>
      </div>
    `).join('');
  }

  renderGodlyItemsSummary();
}

function renderGodlyItemsSummary() {
  const el = document.getElementById('godly-items-summary');
  const g = typeof GODLY_ITEMS_SUMMARY !== 'undefined' ? GODLY_ITEMS_SUMMARY : null;
  if (!el || !g) return;
  el.innerHTML = `
    <p style="font-size:13px;color:var(--muted);margin-bottom:10px;">${g.chance}. ${g.bonus}</p>
    <p style="font-size:12px;color:var(--gold);margin-bottom:10px;">${g.warning}</p>
    <div class="godly-tier-grid">
      ${g.tiers.map(t => `
        <div class="godly-tier"><span class="godly-tier-color">${t.color}</span><span>${t.rule}</span></div>
      `).join('')}
    </div>
    <p style="margin-top:10px;"><a href="${g.url}" target="_blank" rel="noopener" style="color:var(--blue);font-size:13px;">Full forum guide ↗</a></p>
  `;
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
  const levelInput = getContextLevel();
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

function renderPriceRows(keys) {
  return keys.filter(k => PRICE_DB[k]).map(k => {
    const p = PRICE_DB[k];
    return `<button type="button" class="price-row" onclick="checkItem('${k.replace(/'/g, "\\'")}')">
      <span class="price-row-name">${k}</span>
      <span class="price-row-value">${p.price}</span>
    </button>`;
  }).join('');
}

let allScrollPriceKeys = [];

function renderPopularPrices() {
  const el = document.getElementById('popular-prices');
  if (!el || typeof PRICE_DB === 'undefined') return;
  el.innerHTML = renderPriceRows(POPULAR_PRICE_KEYS);
}

function renderScrollPrices() {
  if (typeof PRICE_DB === 'undefined') return;
  allScrollPriceKeys = Object.keys(PRICE_DB)
    .filter(k => PRICE_DB[k].category === 'scroll')
    .sort((a, b) => a.localeCompare(b));

  const top = document.getElementById('scroll-prices-top');
  if (top) {
    const keys = (typeof SCROLL_PRICE_KEYS !== 'undefined' ? SCROLL_PRICE_KEYS : allScrollPriceKeys.slice(0, 12));
    top.innerHTML = renderPriceRows(keys);
  }

  const summary = document.getElementById('scroll-prices-summary');
  if (summary) summary.textContent = `All scroll prices (${allScrollPriceKeys.length})`;

  const filter = document.getElementById('scroll-price-filter');
  filterScrollPrices(filter?.value || '');
}

function filterScrollPrices(query) {
  const el = document.getElementById('scroll-prices');
  if (!el || typeof PRICE_DB === 'undefined') return;
  const q = (query || '').trim().toLowerCase();
  const keys = q
    ? allScrollPriceKeys.filter(k => k.includes(q))
    : allScrollPriceKeys;
  el.innerHTML = keys.length
    ? renderPriceRows(keys)
    : '<p style="padding:8px 10px;font-size:13px;color:var(--muted);">No scrolls match.</p>';
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

function initLevelFilter() {}

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

function renderMapScene() {
  return '';
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
  renderLeveling();
}

function jumpToZone(i) {
  selectLevelBand(i);
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

  const renderGroup = (label, list) => {
    if (!list.length) return '';
    return `
      <div class="boss-progression-group">
        <div class="boss-progression-group-label">${label}</div>
        <ol class="boss-progression-list">
          ${list.map(b => `
            <li>
              <button type="button" class="boss-progression-row" onclick="showBoss('${b.id}')">
                <span class="boss-progression-tier tier-${b.tier}" aria-hidden="true"></span>
                <span class="boss-progression-name">${b.name}</span>
                <span class="boss-progression-lv">Lv ${b.level}</span>
              </button>
            </li>
          `).join('')}
        </ol>
      </div>
    `;
  };

  el.innerHTML = `
    ${renderGroup('Main bosses', main)}
    ${renderGroup('Endgame', endgame)}
    ${renderGroup('Demi-bosses', demi)}
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
  document.body.classList.remove('guide-modal-open');
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
  document.body.classList.add('guide-modal-open');
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
let selectedLevelIndex = 0;

function getBandLevelRange(l) {
  const rangeParts = l?.range?.match(/(\d+)\s*[–-]\s*(\d+)/);
  if (!rangeParts) return { start: 0, end: 200, mid: 0 };
  const start = parseInt(rangeParts[1], 10);
  const end = parseInt(rangeParts[2], 10);
  return { start, end, mid: Math.floor((start + end) / 2) };
}

function getContextLevel() {
  const leech = parseInt(document.getElementById('leech-level-filter')?.value, 10);
  if (leech) return leech;
  const l = LEVELS[getActiveLevelIndex()];
  return getBandLevelRange(l).mid;
}

function getVisibleLevelIndices() {
  return LEVELS.map((l, i) => {
    const spots = l.spots.filter(s => levelTypeFilter === 'all' || s.type === levelTypeFilter);
    return spots.length ? i : -1;
  }).filter(i => i >= 0);
}

function getActiveLevelIndex() {
  const visible = getVisibleLevelIndices();
  if (!visible.length) return 0;
  if (visible.includes(selectedLevelIndex)) return selectedLevelIndex;
  return visible[0];
}

function selectLevelBand(i) {
  if (i < 0 || i >= LEVELS.length) return;
  selectedLevelIndex = i;
  renderLeveling();
}

function levelUnlockAction(u) {
  if (u.prequest) return `openPrequest('${u.prequest}')`;
  if (u.boss) return `showPage('bosses');showBoss('${u.boss}')`;
  return `showPage('${u.page}')`;
}

function getPQsForBand(l) {
  if (typeof PQS === 'undefined') return [];
  const { mid } = getBandLevelRange(l);
  return PQS.filter(pq => isPQInRange(pq, mid));
}

function renderMobSpriteRail(mobs) {
  if (!mobs?.length) return '';
  return `<aside class="level-detail-mob-rail" aria-label="Farm mobs">
    ${mobs.map(m => `
      <figure class="level-mob-figure">
        <img class="level-mob-sprite" src="${m.url}" alt="" width="52" height="52" loading="lazy"
          onerror="this.closest('.level-mob-figure')?.remove()">
        <figcaption class="level-mob-caption">${m.name}</figcaption>
      </figure>
    `).join('')}
  </aside>`;
}

function renderLevelSpots(spots) {
  return spots.map(s => `
    <article class="level-spot ${s.recommended ? 'level-spot--recommended' : ''}">
      <div class="level-spot-head">
        <h3 class="level-spot-name">${s.name}</h3>
        ${s.recommended ? '<span class="level-spot-rec">★ Best</span>' : ''}
        <span class="badge ${s.type === 'party' ? 'badge-blue' : 'badge-green'}">${s.type}</span>
      </div>
      ${s.mobs?.length ? `<div class="level-spot-mob-grid">${s.mobs.map(m => `<span class="level-mob-pill">${m}</span>`).join('')}</div>` : ''}
      ${s.location || s.exp ? `
        <div class="level-spot-meta">
          ${s.location ? `<span class="level-spot-loc">📍 ${s.location}</span>` : ''}
          ${s.exp ? `<span class="level-spot-exp">⚡ ${s.exp}</span>` : ''}
        </div>
      ` : ''}
      ${s.tip ? `<p class="level-spot-tip">${s.tip}</p>` : ''}
      ${s.detail ? `<p class="level-spot-detail">${s.detail}</p>` : ''}
    </article>
  `).join('');
}

function renderLevelBands() {
  const el = document.getElementById('level-bands');
  if (!el) return;
  const active = getActiveLevelIndex();
  el.innerHTML = LEVELS.map((l, i) => {
    const spots = l.spots.filter(s => levelTypeFilter === 'all' || s.type === levelTypeFilter);
    if (!spots.length) return '';
    const shortRange = l.range.replace(/\s/g, '');
    return `
      <button type="button" class="level-band level-band--${l.theme || 'field'} ${i === active ? 'active' : ''}"
        role="tab" aria-selected="${i === active}" onclick="selectLevelBand(${i})">
        <span class="level-band-icon">${l.icon || '🗺️'}</span>
        <span class="level-band-range">${shortRange}</span>
        <span class="level-band-label">${l.label}</span>
      </button>
    `;
  }).join('');
}

function renderLevelDetail() {
  const el = document.getElementById('level-detail');
  if (!el) return;
  const i = getActiveLevelIndex();
  const l = LEVELS[i];
  if (!l) { el.innerHTML = ''; return; }

  const spots = l.spots.filter(s => levelTypeFilter === 'all' || s.type === levelTypeFilter);
  if (!spots.length) {
    el.innerHTML = `<p class="level-detail-empty">No ${levelTypeFilter} spots in this range — try another filter.</p>`;
    return;
  }

  const pqs = getPQsForBand(l);
  const { end } = getBandLevelRange(l);
  const nextMilestone = typeof LEVEL_MILESTONES !== 'undefined'
    ? LEVEL_MILESTONES.find(m => m.level > end)
    : null;
  const priorityLabel = { quests: 'Quests first', party: 'Party / PQ', solo: 'Solo grind' }[l.priority] || 'Train here';
  const bandMobs = typeof collectSpotsMobSprites === 'function' ? collectSpotsMobSprites(spots) : [];

  el.innerHTML = `
    <div class="level-detail-panel level-detail-panel--${l.theme || 'field'}">
      <header class="level-detail-header">
        <span class="level-detail-icon" aria-hidden="true">${l.icon || '🗺️'}</span>
        <div class="level-detail-titles">
          <div class="level-detail-range">Lv ${l.range}</div>
          <div class="level-detail-label">${l.label}</div>
        </div>
        <span class="level-detail-priority badge badge-yellow">${priorityLabel}</span>
      </header>

      ${l.goal ? `<p class="level-detail-goal">${l.goal}</p>` : ''}

      ${l.unlocks?.length ? `
        <section class="level-detail-section level-detail-section--unlocks">
          <div class="level-unlock-row">
            ${l.unlocks.map(u => `
              <button type="button" class="level-unlock-chip" onclick="${levelUnlockAction(u)}">
                <span class="level-unlock-lv">Lv ${u.lv}</span>
                <span class="level-unlock-icon">${u.icon}</span>
                <span class="level-unlock-text">${u.title}</span>
              </button>
            `).join('')}
          </div>
        </section>
      ` : ''}

      ${nextMilestone ? `
        <button type="button" class="level-next-milestone" onclick="${levelUnlockAction(nextMilestone)}">
          <span class="level-next-label">Up next · Lv ${nextMilestone.level}</span>
          <span class="level-next-text">${nextMilestone.icon} ${nextMilestone.title}</span>
          <span class="level-next-arrow">→</span>
        </button>
      ` : ''}

      <div class="level-detail-body${bandMobs.length ? '' : ' level-detail-body--no-rail'}">
        <div class="level-detail-main">
          <section class="level-detail-section level-detail-section--spots">
            <div class="level-spots">${renderLevelSpots(spots)}</div>
          </section>

          ${pqs.length ? `
            <section class="level-detail-section level-detail-section--pqs">
              <div class="level-pq-row">
                ${pqs.map(pq => `
                  <button type="button" class="level-pq-chip" onclick="openPQ('${pq.id}')">
                    <span class="level-pq-short">${pq.short}</span>
                    <span class="level-pq-lv">Lv ${pq.level}</span>
                    <span class="level-pq-party">${pq.party}</span>
                  </button>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${l.tips?.length ? `
            <section class="level-detail-section level-detail-section--tips">
              <h3 class="level-section-title">Tips</h3>
              <ul class="level-tips-list">${l.tips.map(t => `<li>${t}</li>`).join('')}</ul>
            </section>
          ` : ''}
        </div>
        ${renderMobSpriteRail(bandMobs)}
      </div>
    </div>
  `;
}

function renderLeveling() {
  renderLevelBands();
  renderLevelDetail();
}

function renderLevels() {
  renderLeveling();
}

function highlightLevel() {
  renderLeveling();
  renderLeeching();
  renderPQOverview();
}

function renderLevelMilestones() {
  /* milestones integrated into level detail panel */
}

function parseLevelRange(levelStr) {
  const range = levelStr.match(/(\d+)\s*[–-]\s*(\d+)/);
  if (range) return { start: parseInt(range[1], 10), end: parseInt(range[2], 10) };
  const plus = levelStr.match(/(\d+)\s*\+/);
  if (plus) return { start: parseInt(plus[1], 10), end: 200 };
  return { start: 0, end: 0 };
}

function isLevelInRange(levelStr, myLevel) {
  if (!myLevel) return false;
  const { start, end } = parseLevelRange(levelStr);
  if (levelStr.includes('+') && !levelStr.includes('–') && !levelStr.includes('-')) return myLevel >= start;
  return myLevel >= start && myLevel <= end;
}

function highlightLeechLevel() {
  renderLeeching();
  renderPQOverview();
}

function renderLeeching() {
  const g = typeof LEECHING_GUIDE !== 'undefined' ? LEECHING_GUIDE : null;
  if (!g) return;

  const myLevel = parseInt(document.getElementById('leech-level-filter')?.value, 10) || 0;

  const methods = document.getElementById('leech-methods');
  if (methods) {
    methods.innerHTML = g.methods.map(m => `
      <div class="leech-method">
        <span class="leech-method-icon" aria-hidden="true">${m.icon}</span>
        <div>
          <div class="leech-method-label">${m.label}</div>
          <div class="leech-method-detail">${m.detail}</div>
        </div>
      </div>
    `).join('');
  }

  const gobyEl = document.getElementById('leech-goby');
  if (gobyEl && g.goby) {
    const gb = g.goby;
    gobyEl.innerHTML = `
      <div class="card-header">
        <h2>${gb.title}</h2>
        <span class="badge badge-yellow">Premium</span>
      </div>
      <p style="font-size:13px;color:var(--muted);margin-bottom:8px;"><strong>${gb.map}</strong> · ${gb.mobs.join(', ')}</p>
      <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">${gb.summary}</p>
      <h3>Seller setup</h3>
      <ul class="drop-list">${gb.requirements.map(r => `<li>${r}</li>`).join('')}</ul>
      <h3>As the buyer</h3>
      <ul class="drop-list">${gb.buyerNotes.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
  }

  const list = document.getElementById('leech-list');
  if (list) {
    list.innerHTML = g.ranges.map((r, i) => {
      const isCurrent = isLevelInRange(r.level, myLevel);
      const spot = r.spots[0];
      if (!spot) return '';
      return `
        <div class="leech-range ${isCurrent ? 'leech-range--current' : ''}" id="leech-range-${i}">
          <div class="leech-range-row">
            <span class="leech-range-lv">Lv ${r.level}</span>
            <span class="leech-range-mobs">${spot.mobs}</span>
            <span class="leech-range-map">${spot.map}</span>
            ${isCurrent ? '<span class="badge badge-green leech-range-badge">You</span>' : ''}
          </div>
          ${spot.notes ? `<div class="leech-range-note">${spot.notes}</div>` : ''}
        </div>
      `;
    }).join('');
  }

  const bosses = document.getElementById('leech-bosses');
  if (bosses) {
    bosses.innerHTML = `
      <div class="leech-boss-group">
        <div class="boss-progression-group-label">Area bosses</div>
        <div class="leech-boss-list">
          ${g.areaBosses.map(b => `
            <div class="leech-range">
              <div class="leech-boss-row">
                <span class="leech-range-lv">${b.level}</span>
                <span class="leech-boss-name">${b.name}</span>
                <span class="leech-range-map">${b.map}</span>
              </div>
              ${b.notes ? `<div class="leech-range-note">${b.notes}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="leech-boss-group">
        <div class="boss-progression-group-label">Boss expeditions</div>
        <div class="leech-boss-list">
          ${g.bossLeech.map(b => `
            <div class="leech-boss-row">
              <span class="leech-range-lv">${b.level}</span>
              <span class="leech-boss-name">${b.name}</span>
              ${b.notes ? `<span class="leech-range-map">${b.notes}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  const tips = document.getElementById('leech-tips');
  if (tips) {
    tips.innerHTML = `
      <div class="card-header"><h2>Tips</h2></div>
      <ul class="drop-list">${g.tips.map(t => `<li>${t}</li>`).join('')}</ul>
    `;
  }

  const credit = document.getElementById('leech-credit');
  if (credit) {
    credit.innerHTML = `Source: <a href="${g.forumUrl}" target="_blank" rel="noopener">${g.credit}</a>`;
  }
}

function filterLevelType(type, btn) {
  levelTypeFilter = type;
  document.querySelectorAll('#page-leveling .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLeveling();
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
  const resultEl = document.getElementById('quiz-result');
  let actions = resultEl.querySelector('.quiz-actions');
  if (!actions) {
    actions = document.createElement('div');
    actions.className = 'quiz-actions';
    resultEl.appendChild(actions);
  }
  actions.innerHTML = `${guideBtn}<button class="btn-ghost" onclick="resetQuiz()">Retake Quiz</button>`;
  const icon = document.getElementById('quiz-class-icon');
  if (icon) icon.style.display = 'none';
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
  document.getElementById('gear-timeline').innerHTML = `
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
  if (rerender === 'job') renderJobAdv();
  else if (rerender === 'prequest') {
    renderPrequests();
    renderPrequestOverview();
    refreshOpenPrequestDetail();
  }
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
let openPrequestId = null;

function closePrequestDetail(skipHash) {
  const overlay = document.getElementById('prequest-detail-overlay');
  if (!overlay || overlay.hidden) return;
  overlay.hidden = true;
  openPrequestId = null;
  document.body.classList.remove('guide-modal-open');
  if (!skipHash) setRoute('prequests');
}

function renderPrequestDetailHtml(pq) {
  const done = pq.steps.filter(s => isStepDone(stepKey('pq', `${pq.id}-${s.id}`))).length;
  const total = pq.steps.length;
  return `
    <div class="guide-detail-top">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;width:100%;">
        <div style="min-width:0;">
          <h2>${pq.name}</h2>
          <div style="font-size:13px;color:var(--muted);">${pq.location}</div>
        </div>
        <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;">
          <button type="button" class="btn-ghost" onclick="event.stopPropagation();copyDeepLink('prequests','${pq.id}')" title="Copy share link" style="font-size:12px;padding:5px 10px;">⎘</button>
          <button type="button" class="btn-ghost" onclick="closePrequestDetail()" style="font-size:12px;padding:5px 12px;">Close</button>
        </div>
      </div>
    </div>
    <p style="font-size:13px;color:var(--muted);margin:12px 0;">${pq.summary}</p>
    <div class="info-grid" style="margin-bottom:14px;">
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
      ${pq.bossId ? `<button class="btn btn-sm" onclick="showBoss('${pq.bossId}')">View Boss Guide →</button>` : ''}
      ${pq.forumGuide ? `<a href="${pq.forumGuide}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost">Forum guide ↗</a>` : ''}
    </div>
  `;
}

function refreshOpenPrequestDetail() {
  if (!openPrequestId) return;
  const pq = PREQUESTS?.find(p => p.id === openPrequestId);
  const detail = document.getElementById('prequest-detail');
  if (!pq || !detail) return;
  const scroll = detail.scrollTop;
  detail.innerHTML = renderPrequestDetailHtml(pq);
  detail.scrollTop = scroll;
}

function openPrequest(id, skipHash) {
  const pq = PREQUESTS?.find(p => p.id === id);
  if (!pq) return;
  if (!skipHash) {
    showPage('prequests', null, true);
    setRoute('prequests', id);
  }
  openPrequestId = id;
  const detail = document.getElementById('prequest-detail');
  const overlay = document.getElementById('prequest-detail-overlay');
  detail.innerHTML = renderPrequestDetailHtml(pq);
  detail.scrollTop = 0;
  overlay.hidden = false;
  document.body.classList.add('guide-modal-open');
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
    partyMembers = [];
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
  if (typeof FORUM_GUIDES !== 'undefined') {
    FORUM_GUIDES.forEach(section => {
      section.guides.forEach(g => {
        items.push({
          type: 'Forum',
          label: g.label,
          sub: g.desc,
          action: () => { if (g.companionPage) showPage(g.companionPage); else window.open(g.url, '_blank', 'noopener'); },
        });
      });
    });
  }
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
  const verEl = document.getElementById('site-version');
  if (verEl && typeof APP_VERSION !== 'undefined') verEl.textContent = `v${APP_VERSION}`;
  initNav();
  renderHome();
  initPWA();
  initGlobalSearch();
  renderTools();
  renderForumGuides();
  renderPQs();
  renderBossProgression();
  initBossRegionFilters();
  renderBosses();
  renderLevels();
  renderLeeching();
  renderLevelMilestones();
  renderChecklist();
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
  initLevelFilter();
  initItemAutocomplete();
  initRouteFromHash();
});

window.addEventListener('hashchange', () => initRouteFromHash());
