// Party presets and boss composition rules — MapleRoyals v83

const SERVER_TIMEZONE = 'America/New_York';

const PARTY_PRESETS = {
  horntail: {
    label: 'Horntail',
    classes: ['Bishop', 'Dark Knight', 'Night Lord', 'Night Lord', 'Bowmaster', 'Hero'],
  },
  pinkbean: {
    label: 'Pink Bean',
    classes: ['Bishop', 'Dark Knight', 'Night Lord', 'Bowmaster', 'Hero', 'Shadower'],
  },
  zakum: {
    label: 'Zakum',
    classes: ['Bishop', 'Dark Knight', 'Bowmaster', 'Night Lord', 'Hero', 'Marksman'],
  },
  papulatus: {
    label: 'Papulatus',
    classes: ['Bishop', 'Dark Knight', 'Bowmaster', 'Night Lord', 'Hero', 'Corsair'],
  },
  toad: {
    label: 'NT — Toad',
    classes: ['Bishop', 'Night Lord', 'Hero'],
  },
  vergamot: {
    label: 'NT — Vergamot',
    classes: ['Bishop', 'Dark Knight', 'Night Lord'],
  },
  dunas: {
    label: 'NT — Dunas',
    classes: ['Bishop', 'Dark Knight', 'Bowmaster'],
  },
  nibergen: {
    label: 'NT — Nibergen',
    classes: ['Bishop', 'Dark Knight', 'Night Lord'],
  },
  'dunas-v2': {
    label: 'NT — Dunas v2',
    classes: ['Bishop', 'Dark Knight', 'Night Lord'],
  },
};

const PARTY_BOSS_RULES = {
  zakum: {
    label: 'Zakum',
    maxSlots: 6,
    bishop: 'recommended',
    dk: 'recommended',
    notes: ['Flexible comp — Bishop and DK strongly recommended', 'Any 4 DPS works for early runs'],
  },
  papulatus: {
    label: 'Papulatus',
    maxSlots: 6,
    bishop: 'recommended',
    dk: false,
    notes: ['Very flexible at 85+', 'Kill mini clocks in Phase 1'],
  },
  horntail: {
    label: 'Horntail',
    maxSlots: 6,
    bishop: 'required',
    dk: 'required',
    nlMin: 1,
    bm: 'recommended',
    notes: ['Bishop + DK mandatory', '2 NLs or 1 NL + funded DPS common', '15k HP with HB'],
  },
  pinkbean: {
    label: 'Pink Bean',
    maxSlots: 6,
    bishop: 'required',
    dk: 'required',
    nl: 'recommended',
    bm: 'recommended',
    shadower: 'recommended',
    notes: ['Hardest boss — full funding required', 'Smokescreen helps survive mechanics'],
  },
  toad: {
    label: 'Castellan Toad',
    maxSlots: 3,
    bishop: 'recommended',
    dk: false,
    notes: ['Party of 3 required to enter', 'Easiest NT boss — Bishop + 2 DPS', 'One run per day'],
  },
  vergamot: {
    label: 'Vergamot',
    maxSlots: 3,
    bishop: 'recommended',
    dk: 'recommended',
    notes: ['Party of 3 — Bishop heal + DK Hyper Body', 'Mid-tier NT daily boss'],
  },
  dunas: {
    label: 'Dunas v1',
    maxSlots: 3,
    bishop: 'recommended',
    dk: 'required',
    notes: ['Party of 3 — DK Hyper Body for 15k+ touch', 'Endgame-funded DPS required'],
  },
  nibergen: {
    label: 'Nibergen',
    maxSlots: 3,
    bishop: 'recommended',
    dk: 'recommended',
    nl: 'recommended',
    notes: ['Party of 3 — 11k+ HP recommended', 'Good EXP boss at 158'],
  },
  'dunas-v2': {
    label: 'Dunas v2',
    maxSlots: 3,
    bishop: 'required',
    dk: 'required',
    nl: 'recommended',
    notes: ['Party of 3 — 12k+ HP to tank body hits', 'Split ship + body; pin Imperial Guards', 'All Cures for dispel/stun/darkness'],
  },
};

const JOB_BRANCH_MAP = {
  Warrior: 'warrior',
  Mage: 'mage',
  Thief: 'thief',
  Archer: 'archer',
  Pirate: 'pirate',
};

const CLASS_WIKI_SLUG = {
  'dark-knight': 'Dark_Knight',
  bishop: 'Bishop',
  bowmaster: 'Bowmaster',
  'night-lord': 'Night_Lord',
  shadower: 'Shadower',
  hero: 'Hero',
  paladin: 'Paladin',
  'fp-arch-mage': 'Fire/Poison_Arch_Mage',
  'il-arch-mage': 'Ice/Lightning_Arch_Mage',
  marksman: 'Marksman',
  buccaneer: 'Buccaneer',
  corsair: 'Corsair',
};
