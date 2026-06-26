// Mob sprites via maplestory.io — { gms, id } verified against API mob names
const MOB_SPRITE_SKIP = new Set([
  'pq monsters', 'boss encounters', 'ludibrium mobs', 'crimsonwood mobs',
  'horned mushroom', 'horned mushrooms', 'green snail', 'green snails',
  'yakuza member', 'gangster', 'boss encounters',
]);

const MOB_SPRITE_ENTRIES = {
  snail: { gms: 62, id: 100100 },
  snails: { gms: 62, id: 100100 },
  'blue snail': { gms: 62, id: 100101 },
  'blue snails': { gms: 62, id: 100101 },
  slime: { gms: 62, id: 210100 },
  slimes: { gms: 62, id: 210100 },
  mushroom: { gms: 62, id: 1210102 },
  mushrooms: { gms: 62, id: 1210102 },
  'orange mushroom': { gms: 62, id: 1210102 },
  'orange mushrooms': { gms: 62, id: 1210102 },
  'green mushroom': { gms: 62, id: 1110100 },
  pig: { gms: 62, id: 1210100 },
  pigs: { gms: 62, id: 1210100 },
  'ribbon pig': { gms: 62, id: 1210101 },
  'ribbon pigs': { gms: 62, id: 1210101 },
  'zombie mushroom': { gms: 62, id: 2230101 },
  'zombie mushrooms': { gms: 62, id: 2230101 },
  'coolie zombie': { gms: 62, id: 5130107 },
  'coolie zombies': { gms: 62, id: 5130107 },
  'miner zombie': { gms: 83, id: 5130108 },
  'miner zombies': { gms: 83, id: 5130108 },
  gallopera: { gms: 83, id: 9420540 },
  'dual birk': { gms: 62, id: 8140111 },
  vikerola: { gms: 83, id: 9420539 },
  rodeo: { gms: 83, id: 9420533 },
  'jr. balrog': { gms: 62, id: 8130100 },
  'red wyvern': { gms: 62, id: 8150300 },
  'blue wyvern': { gms: 62, id: 8150301 },
  'dark wyvern': { gms: 62, id: 8150302 },
  skelegon: { gms: 62, id: 8190003 },
  skelosaurus: { gms: 62, id: 8190004 },
  horntail: { gms: 62, id: 8810018 },
  toad: { gms: 62, id: 9420000 },
  robo: { gms: 62, id: 4230111 },
  dunas: { gms: 83, id: 8220010 },
  'pink bean': { gms: 83, id: 8820001 },
  krexel: { gms: 92, id: 9420520 },
  'tick-tock': { gms: 62, id: 4230113 },
  pianus: { gms: 62, id: 8510000 },
  'papulatus clock': { gms: 62, id: 8500001 },
};

// Representative mob sprite per level band (chips + detail header)
const LEVEL_BAND_ICON_MOBS = {
  '1 – 10': 'Blue Snail',
  '10 – 20': 'Pig',
  '20 – 30': 'Zombie Mushroom',
  '30 – 50': 'Tick-Tock',
  '50 – 70': 'Coolie Zombie',
  '70 – 85': 'Gallopera',
  '85 – 100': 'Papulatus Clock',
  '100 – 120': 'Red Wyvern',
  '120 – 140': 'Horntail',
  '140 – 200': 'Pink Bean',
};

function normalizeMobSpriteKey(name) {
  return String(name).toLowerCase().replace(/\s+/g, ' ').trim();
}

function getMobSpriteUrl(name) {
  const key = normalizeMobSpriteKey(name);
  if (MOB_SPRITE_SKIP.has(key)) return null;
  const entry = MOB_SPRITE_ENTRIES[key];
  if (!entry) return null;
  return `https://maplestory.io/api/gms/${entry.gms}/mob/${entry.id}/render/stand`;
}

function collectMobSprites(mobNames) {
  const seen = new Set();
  const out = [];
  for (const raw of mobNames) {
    const key = normalizeMobSpriteKey(raw);
    if (seen.has(key) || MOB_SPRITE_SKIP.has(key)) continue;
    const url = getMobSpriteUrl(raw);
    if (!url) continue;
    seen.add(key);
    out.push({ name: raw, url });
  }
  return out;
}

function collectSpotsMobSprites(spots) {
  const names = [];
  for (const s of spots) {
    if (s.mobs?.length) names.push(...s.mobs);
  }
  return collectMobSprites(names);
}

function getLevelBandIconUrl(level) {
  const mob = level?.iconMob || LEVEL_BAND_ICON_MOBS[level?.range];
  if (!mob) return null;
  return getMobSpriteUrl(mob);
}

function renderLevelZoneIcon(level, { size = 28, className = 'level-band-icon' } = {}) {
  const url = getLevelBandIconUrl(level);
  if (!url) return `<span class="${className}">${level.icon || '🗺️'}</span>`;
  return `<img class="${className} level-zone-sprite" src="${url}" alt="" width="${size}" height="${size}" loading="lazy"
    onerror="this.outerHTML='<span class=&quot;${className}&quot;>${level.icon || '🗺️'}</span>'">`;
}
