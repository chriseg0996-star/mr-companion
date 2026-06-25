// Boss drop reference — MapleRoyals v83 (rates are community estimates)

const BOSS_DROP_TABLES = {
  zakum: [
    { item: 'Zakum Helmet', itemKey: 'zakum helmet', rate: '1 per clear', note: 'BiS helmet until Pink Bean Hat' },
    { item: 'Zakum Cape', rate: 'Common', note: 'Decent cape — scroll or FM' },
    { item: 'ATT / DEF scrolls', rate: 'Common', note: 'Never vendor scrolls' },
    { item: 'Ores & etc drops', rate: 'Common', note: 'Vendor ores, keep scrolls' },
  ],
  papulatus: [
    { item: 'Papu Pendant', itemKey: 'papu pendant', rate: '1 per clear', note: 'BiS pendant until Horntail Necklace' },
    { item: 'Mid-tier scrolls', rate: 'Common', note: 'Glove, helm, cape scrolls' },
    { item: 'Equipment drops', rate: 'Uncommon', note: 'Check FM before vending' },
  ],
  horntail: [
    { item: 'Horntail Necklace', itemKey: 'horntail necklace', rate: '1 per clear', note: 'BiS necklace — never sell' },
    { item: 'Horntail Ring', itemKey: 'horntail ring', rate: 'Up to 3 per clear', note: 'Fill all 3 ring slots' },
    { item: 'Dragon Stone', rate: 'Rare', note: 'Valuable crafting material' },
    { item: 'High-tier scrolls', rate: 'Common', note: 'Chaos-eligible gear scrolls' },
  ],
  pinkbean: [
    { item: 'Pink Bean Hat', itemKey: 'pink bean hat', rate: 'Rare', note: 'BiS helmet in v83' },
    { item: 'Pink Bean Suit', itemKey: 'pink bean suit', rate: 'Rare', note: 'BiS armor' },
    { item: 'Pink Adventurer Cape', itemKey: 'pink adventurer cape', rate: 'Very rare', note: 'BiS cape — never sell' },
    { item: 'Mesos', rate: 'Guaranteed', note: 'Strong meso income per run' },
  ],
  cwk: [
    { item: 'Mark of Naricain', itemKey: 'mark of naricain', rate: '1 per boss', note: 'Crafting material — keep' },
    { item: 'Naricain Demon Elixir', itemKey: 'naricain demon elixir', rate: 'Boss / Bonus', note: 'Top attack potion' },
    { item: 'Mastery Books', rate: 'Bonus armory', note: 'Hurricane, Sharp Eyes, Demo, Blizzard, etc.' },
    { item: 'Elemental Wand / Staff', rate: 'Bonus armory', note: 'Wand 6–8, Staff 7 — check FM' },
    { item: 'CWK Cloaks & Goggles', rate: 'Bonus armory', note: 'Crimsonheart Cloak, Spectrum Goggles' },
  ],
};

const LEVEL_MILESTONES = [
  { level: 8, icon: '🎖️', title: '1st Job Advancement', detail: 'Warrior, Mage, Bowman, Thief, or Pirate — see Jobs tab.', page: 'jobadv' },
  { level: 10, icon: '🎖️', title: '2nd Job (Mage / Pirate)', detail: 'Mages and Pirates advance at 10. Others at 30.', page: 'jobadv' },
  { level: 21, icon: '👥', title: 'KPQ unlocked', detail: 'Best EXP at 21–30 — find a party in Kerning.', page: 'pqs' },
  { level: 30, icon: '🎖️', title: '2nd Job (most classes)', detail: 'Warrior, Bowman, Thief advance at 30.', page: 'jobadv' },
  { level: 35, icon: '👥', title: 'LPQ unlocked', detail: 'Run Ludibrium PQ until 50.', page: 'pqs' },
  { level: 50, icon: '💀', title: 'Zakum + 3rd job', detail: 'Start Zakum prequest. Third job advancement.', page: 'prequests', prequest: 'zakum' },
  { level: 51, icon: '👥', title: 'OPQ unlocked', detail: 'Best EXP from 51–70.', page: 'pqs' },
  { level: 70, icon: '🎖️', title: '4th Job', detail: 'Final advancement — read your class guide.', page: 'classes' },
  { level: 85, icon: '🕐', title: 'Papulatus', detail: 'Start clocktower prequest. Daily pendant upgrade.', page: 'prequests', prequest: 'papulatus' },
  { level: 90, icon: '🏰', title: 'Crimsonwood Keep', detail: 'Start keystone prequest. CWKPQ for mastery books.', page: 'prequests', prequest: 'cwk' },
  { level: 120, icon: '🐉', title: 'Horntail + Neo Tokyo', detail: 'HT prequest first, then NT for training.', page: 'prequests', prequest: 'horntail' },
  { level: 140, icon: '👑', title: 'Pink Bean', detail: 'Start Temple of Time prequest immediately.', page: 'prequests', prequest: 'pinkbean' },
];
