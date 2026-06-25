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
};

const PARTY_BOSS_RULES = {
  zakum: {
    label: 'Zakum',
    bishop: 'recommended',
    dk: 'recommended',
    notes: ['Flexible comp — Bishop and DK strongly recommended', 'Any 4 DPS works for early runs'],
  },
  papulatus: {
    label: 'Papulatus',
    bishop: 'recommended',
    dk: false,
    notes: ['Very flexible at 85+', 'Kill mini clocks in Phase 1'],
  },
  horntail: {
    label: 'Horntail',
    bishop: 'required',
    dk: 'required',
    nlMin: 1,
    bm: 'recommended',
    notes: ['Bishop + DK mandatory', '2 NLs or 1 NL + funded DPS common', '15k HP with HB'],
  },
  pinkbean: {
    label: 'Pink Bean',
    bishop: 'required',
    dk: 'required',
    nl: 'recommended',
    bm: 'recommended',
    shadower: 'recommended',
    notes: ['Hardest boss — full funding required', 'Smokescreen helps survive mechanics'],
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
