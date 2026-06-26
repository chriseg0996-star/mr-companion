// Mob sprite IDs (GMS 62) — icons via maplestory.io
const MOB_SPRITE_GMS = 62;
const MOB_SPRITE_API = `https://maplestory.io/api/gms/${MOB_SPRITE_GMS}/mob`;

const MOB_SPRITE_SKIP = new Set([
  'pq monsters', 'boss encounters', 'ludibrium mobs', 'crimsonwood mobs',
]);

const MOB_SPRITE_URL_OVERRIDES = {
  dunas: 'https://maplestory.io/api/gms/83/mob/8220010/render/stand',
  'pink bean': 'https://maplestory.io/api/gms/83/mob/8820001/render/stand',
  krexel: 'https://maplestory.io/api/gms/92/mob/9420520/render/stand',
};

const MOB_SPRITE_IDS = {
  snail: 100100, snails: 100100,
  'blue snail': 100101, 'blue snails': 100101,
  'green snail': 100130, 'green snails': 100130,
  mushroom: 2110200, mushrooms: 2110200,
  'orange mushroom': 2110200, 'orange mushrooms': 2110200,
  'green mushroom': 1110100,
  slime: 2100100, slimes: 2100100,
  pig: 1210100, pigs: 1210100,
  'ribbon pig': 1210101, 'ribbon pigs': 1210101,
  'zombie mushroom': 2230101, 'zombie mushrooms': 2230101,
  'horned mushroom': 2230100, 'horned mushrooms': 2230100,
  'coolie zombie': 5120500, 'coolie zombies': 5120500,
  'miner zombie': 5120501, 'miner zombies': 5120501,
  gallopera: 3230405,
  'dual birk': 8140111,
  'jr. balrog': 8130100,
  'red wyvern': 8150300,
  'blue wyvern': 8150301,
  'dark wyvern': 8150302,
  skelegon: 8190003,
  skelosaurus: 8190004,
  horntail: 8810018,
  toad: 9420000,
  robo: 4230111,
};

function normalizeMobSpriteKey(name) {
  return String(name).toLowerCase().replace(/\s+/g, ' ').trim();
}

function getMobSpriteUrl(name) {
  const key = normalizeMobSpriteKey(name);
  if (MOB_SPRITE_SKIP.has(key)) return null;
  if (MOB_SPRITE_URL_OVERRIDES[key]) return MOB_SPRITE_URL_OVERRIDES[key];
  const id = MOB_SPRITE_IDS[key];
  if (!id) return null;
  return `${MOB_SPRITE_API}/${id}/render/stand`;
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
