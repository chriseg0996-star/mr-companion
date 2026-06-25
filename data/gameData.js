// MapleRoyals Companion — Game Data
// Edit this file to add/update items, bosses, levels, etc.

const ITEM_DB = {
  // Boss drops
  'zakum helmet': { verdict: 'keep', reason: 'Best helmet until Pink Bean Hat. Run Zakum daily.', tags: ['boss drop', 'helmet', 'BiS mid-game'] },
  'horntail necklace': { verdict: 'keep', reason: 'Best necklace in the game. Never sell.', tags: ['boss drop', 'necklace', 'BiS'] },
  'horntail ring': { verdict: 'keep', reason: 'Best ring slot. Get 3 from Horntail runs.', tags: ['boss drop', 'ring', 'BiS'] },
  'papu pendant': { verdict: 'keep', reason: 'Best pendant before Horntail Necklace. Keep until HT drops.', tags: ['boss drop', 'pendant'] },
  'pink adventurer cape': { verdict: 'keep', reason: 'Best cape in the game. Extremely rare. Never sell.', tags: ['boss drop', 'cape', 'BiS'] },
  'pink bean hat': { verdict: 'keep', reason: 'Best helmet in the game. Never sell.', tags: ['boss drop', 'helmet', 'BiS'] },
  'pink bean suit': { verdict: 'keep', reason: 'Best overall armor. Never sell.', tags: ['boss drop', 'armor', 'BiS'] },
  // Gloves & scroll targets
  'work gloves': { verdict: 'fm', reason: 'Sell in FM if unscrolled or low ATT. Keep if 7+ ATT scrolled.', tags: ['level 40', 'gloves', 'scroll target'] },
  // Thief stars
  'balanced fury': { verdict: 'keep', reason: 'Best stars for Night Lord bossing. High FM value.', tags: ['stars', 'night lord', 'expensive'] },
  'steelies': { verdict: 'fm', reason: 'Good mid-game NL stars. Sell in FM if not playing NL.', tags: ['stars', 'thief'] },
  'steely': { verdict: 'fm', reason: 'Good mid-game NL stars. Sell in FM if not playing NL.', tags: ['stars', 'thief'] },
  'tobis': { verdict: 'fm', reason: 'Strong NL stars. Sell in FM at good price.', tags: ['stars', 'thief'] },
  'tobi': { verdict: 'fm', reason: 'Strong NL stars. Sell in FM at good price.', tags: ['stars', 'thief'] },
  'ilbi': { verdict: 'keep', reason: 'Endgame NL stars. Keep if playing Night Lord.', tags: ['stars', 'thief', 'endgame'] },
  // Consumables
  'onyx apple': { verdict: 'fm', reason: 'High demand consumable. Sell in FM unless bossing.', tags: ['consumable', 'pq drop'] },
  'power elixir': { verdict: 'keep', reason: 'Best potion for bossing. Stock before Zakum and Horntail.', tags: ['consumable', 'bossing'] },
  // Weapons
  'maple staff': { verdict: 'fm', reason: 'Good mage weapon. Sell in FM if not a mage.', tags: ['weapon', 'mage'] },
  'maple sword': { verdict: 'fm', reason: 'Solid mid-game weapon. Sell if not your class.', tags: ['weapon', 'warrior'] },
  // Scrolls — always keep
  'scroll for gloves': { verdict: 'keep', reason: 'All scrolls have value. Never vendor — use or sell in FM.', tags: ['scroll', 'gloves'] },
  'scroll for helmet': { verdict: 'keep', reason: 'All scrolls have value. Never vendor.', tags: ['scroll', 'helmet'] },
  'scroll for overall': { verdict: 'keep', reason: 'All scrolls have value. Never vendor.', tags: ['scroll', 'armor'] },
  'scroll for cape': { verdict: 'keep', reason: 'All scrolls have value. Never vendor.', tags: ['scroll', 'cape'] },
  'scroll for earrings': { verdict: 'keep', reason: 'All scrolls have value. Never vendor.', tags: ['scroll', 'earrings'] },
  'chaos scroll': { verdict: 'keep', reason: 'Rare and valuable. Never vendor.', tags: ['scroll', 'rare'] },
  'white scroll': { verdict: 'keep', reason: 'Protects equipment on failed scroll. Valuable for endgame.', tags: ['scroll', 'rare'] },
  // Ores & crafting
  'mithril': { verdict: 'vendor', reason: 'Common ore drop. Vendor to NPC for mesos.', tags: ['ore', 'mob drop'] },
  'orihalcon': { verdict: 'vendor', reason: 'Common ore drop. Vendor unless you need it for a quest.', tags: ['ore', 'mob drop'] },
  'adamantium': { verdict: 'vendor', reason: 'Common ore drop. Vendor to NPC.', tags: ['ore', 'mob drop'] },
  'silver ore': { verdict: 'vendor', reason: 'Low-value ore. Vendor to NPC.', tags: ['ore', 'mob drop'] },
  'gold ore': { verdict: 'vendor', reason: 'Low-value ore. Vendor to NPC.', tags: ['ore', 'mob drop'] },
  // Common mob drops
  'pan lid': { verdict: 'vendor', reason: 'Common drop with no stat value. Vendor.', tags: ['mob drop'] },
  'subi throwing stars': { verdict: 'vendor', reason: 'Starter throwing stars. Vendor once you upgrade.', tags: ['stars', 'starter'] },
  'wolbi throwing stars': { verdict: 'vendor', reason: 'Low-tier stars. Vendor after upgrading.', tags: ['stars', 'starter'] },
  // Equipment
  'sauna robe': { verdict: 'fm', reason: 'Popular mage armor. Sell in FM if not a mage.', tags: ['armor', 'mage'] },
  'brown overall': { verdict: 'vendor', reason: 'Basic equipment with no scroll value. Vendor.', tags: ['armor', 'starter'] },
  'red katana': { verdict: 'fm', reason: 'Decent thief weapon. Check FM price before vending.', tags: ['weapon', 'thief'] },
};

const BOSSES = [
  {
    id: 'zakum',
    name: 'Zakum',
    tier: 'early',
    level: '50+ (70+ recommended)',
    respawn: '24 hours',
    party: 'Up to 6',
    hpReq: '7,000 HP',
    dmgReq: '2,000+ range',
    location: 'El Nath — Cave of Life',
    image: 'assets/images/bosses/zakum.png',
    drops: ['Zakum Helmet (BiS mid-game)', 'Various scrolls', 'Mesos'],
    prequest: 'Talk to Adobis in El Nath. Collect 30 Gold Teeth (Zombie Lupins), 30 Scorpion Tails, and 50 Lion King Certificates. Light all 5 torches in the cave.',
    tips: [
      'Bishop recommended for Heal',
      'Kill all 8 arms before body spawns',
      'Arms cast 1/1 — pot aggressively',
      'Stock Power Elixirs before entering',
      'Run daily — helmet is your biggest early upgrade'
    ],
    phases: ['Enter Cave of Life', 'Kill 8 arms', 'Kill Zakum body', 'Loot helmet'],
    mapTheme: 'cave',
  },
  {
    id: 'papulatus',
    name: 'Papulatus',
    tier: 'early',
    level: '85+',
    respawn: '24 hours',
    party: 'Up to 6',
    hpReq: '7,000 HP',
    dmgReq: '3,500+ range',
    location: 'Ludibrium — Clocktower Bottom',
    image: 'assets/images/bosses/papulatus.png',
    drops: ['Papu Pendant (BiS before HT)', 'Mid-tier scrolls', 'Mesos'],
    prequest: 'Talk to Tory in Ludibrium. Complete the Fixing the Clocktower questline. Collect parts from Ludibrium mobs. Talk to Grandpa Clock to receive entry pass.',
    tips: [
      'Kill mini clocks immediately — they heal Papulatus',
      'Save burst skills for Phase 2 core',
      'Phase 2 hits much harder — pot aggressively',
      'Papu pendant is a major upgrade — run daily',
      'Good practice run before Horntail'
    ],
    phases: ['Phase 1 — main body', 'Kill healing clocks', 'Phase 2 — core', 'Loot pendant'],
    mapTheme: 'clock',
  },
  {
    id: 'horntail',
    name: 'Horntail',
    tier: 'mid',
    level: '120+',
    respawn: '24 hours',
    party: 'Up to 6',
    hpReq: '15,000 HP (with HB)',
    dmgReq: '8,000+ range',
    location: 'Leafre — Cave of Life',
    image: 'assets/images/bosses/horntail.png',
    drops: ['Horntail Necklace (BiS)', 'Horntail Rings x3', 'High-tier scrolls'],
    prequest: 'Talk to Eurek the Alchemist in Leafre. Complete the Dragon Research questline. Collect items from Leafre mobs. Receive Necklace of Strength as entry ticket.',
    tips: [
      'Bishop is mandatory',
      'Dark Knight mandatory for Hyper Body',
      'Kill left and right heads before main body',
      'Seduce during main body is deadly — watch HP',
      'Complete prequest the day you hit 120',
      'Run daily — necklace and rings are massive upgrades'
    ],
    phases: ['Left head', 'Right head', 'Main body', 'Loot drops'],
    mapTheme: 'volcano',
  },
  {
    id: 'pinkbean',
    name: 'Pink Bean',
    tier: 'late',
    level: '140+',
    respawn: '24 hours',
    party: 'Up to 6',
    hpReq: '25,000 HP (with HB)',
    dmgReq: '20,000+ range',
    location: 'Temple of Time — Final Statue',
    image: 'assets/images/bosses/pinkbean.png',
    drops: ['Pink Bean Hat (BiS)', 'Pink Bean Suit (BiS)', 'Pink Adventurer Cape (BiS)', 'Massive meso drops'],
    prequest: 'Access via Dimensional Mirror in Leafre. Complete all Path of Time quests in order. Start the questline the day you hit 140.',
    tips: [
      'Hardest boss in the game',
      'Bishop and Dark Knight are mandatory',
      'Kill all 4 statues simultaneously — they revive if staggered',
      'Carry 300+ Power Elixirs minimum',
      'Dispel happens constantly — assign rebuffers',
      'Start Temple of Time questline at 140 immediately'
    ],
    phases: ['4 statues (simultaneous)', 'Pink Bean phase 1', 'Pink Bean phase 2', 'Loot BiS gear'],
    mapTheme: 'temple',
  },
];

const WORLD_MAP = [
  { name: 'Maple Island', levels: '1–10', icon: '🏝️', theme: 'island', levelIndex: 0 },
  { name: 'Victoria Island', levels: '10–30', icon: '🌳', theme: 'victoria', levelIndex: 1 },
  { name: 'Ludibrium', levels: '30–50', icon: '🎠', theme: 'ludibrium', levelIndex: 3 },
  { name: 'Orbis / El Nath', levels: '50–85', icon: '☁️', theme: 'orbis', levelIndex: 4 },
  { name: 'Leafre', levels: '100–120', icon: '🐉', theme: 'leafre', levelIndex: 7 },
  { name: 'Neo Tokyo', levels: '120–160', icon: '🏙️', theme: 'neotokyo', levelIndex: 8 },
  { name: 'Endgame', levels: '160–200', icon: '👑', theme: 'endgame', levelIndex: 9 },
];

const LEVELS = [
  { range: '1 – 10', label: 'Maple Island', theme: 'island', icon: '🏝️', spots: [
    { name: 'Tutorial Quests', type: 'solo', mapStyle: 'beach', mobs: ['Snails', 'Blue Snails', 'Shrooms'], detail: 'Complete all tutorial quests on Maple Island. Enough EXP to hit 10 without grinding. Take the boat to Lith Harbor when done.' }
  ]},
  { range: '10 – 20', label: 'Henesys Area', theme: 'victoria', icon: '🌳', spots: [
    { name: 'Pig Beach', type: 'solo', mapStyle: 'field', mobs: ['Pigs', 'Ribbon Pigs'], detail: 'East of Henesys. Easy grind, good for beginners learning your class skills.' },
    { name: 'Slime Tree / Mushroom Town', type: 'solo', mapStyle: 'forest', mobs: ['Slimes', 'Green Snails', 'Orange Mushrooms'], detail: 'Safe solo maps. Sell drops to NPC for early mesos.' }
  ]},
  { range: '20 – 30', label: 'Kerning City', theme: 'victoria', icon: '🏙️', spots: [
    { name: 'Ant Tunnel I / II', type: 'solo', mapStyle: 'cave', mobs: ['Zombie Mushrooms', 'Horned Mushrooms'], detail: 'Classic solo grind under Kerning. Good if PQs are unavailable.' },
    { name: 'Kerning City PQ (KPQ)', type: 'party', mapStyle: 'pq', mobs: ['PQ monsters'], detail: 'Level 21+. Party of 4. Better EXP than solo — priority over grinding. See PQ Guide tab.' }
  ]},
  { range: '30 – 50', label: 'Ludibrium', theme: 'ludibrium', icon: '🎠', spots: [
    { name: 'Ludibrium PQ (LPQ)', type: 'party', mapStyle: 'pq', mobs: ['PQ monsters'], detail: 'Level 35–50. Party of 4. Best EXP and equipment rewards at this range. Run until 50.' },
    { name: 'Carnival PQ (CPQ)', type: 'party', mapStyle: 'pq', mobs: ['PQ monsters'], detail: 'Level 30–50. 2v2 competitive PQ. Good EXP, drops Onyx Apples.' },
    { name: 'Amoria PQ (APQ)', type: 'party', mapStyle: 'pq', mobs: ['PQ monsters'], detail: 'Level 40+. Requires in-game marriage. Best EXP per hour at 40–50 if you have a partner.' }
  ]},
  { range: '50 – 70', label: 'Orbis / El Nath', theme: 'orbis', icon: '☁️', spots: [
    { name: 'Orbis PQ (OPQ)', type: 'party', mapStyle: 'pq', mobs: ['PQ monsters'], detail: 'Level 51–70. Party of 4. Best EXP at this range. Run until 70.' },
    { name: 'Coolie Zombies', type: 'solo', mapStyle: 'graveyard', mapImage: 'assets/images/maps/coolie-zombies.png', mobs: ['Coolie Zombies', 'Miner Zombies'], detail: 'El Nath graveyard. Solid solo alternative if no PQ party available.' }
  ]},
  { range: '70 – 85', label: 'Orbis — Stairway', theme: 'orbis', icon: '🌤️', spots: [
    { name: 'Galloperas', type: 'solo', mapStyle: 'sky', mapImage: 'assets/images/maps/gallopera.png', mobs: ['Gallopera', 'Dual Birk'], detail: 'Orbis Stairway to the Sky. Best EXP and mesos at this range. Maps can be crowded.' },
    { name: 'Coolie Zombies', type: 'solo', mapStyle: 'graveyard', mapImage: 'assets/images/maps/coolie-zombies.png', mobs: ['Coolie Zombies'], detail: 'Slower but less contested than Galloperas.' }
  ]},
  { range: '85 – 100', label: 'Orbis / Pap Prequest', theme: 'ludibrium', icon: '🕐', spots: [
    { name: 'Galloperas (Stairway to the Sky)', type: 'solo', mapStyle: 'sky', mapImage: 'assets/images/maps/gallopera.png', mobs: ['Gallopera'], detail: 'Still top EXP here. Start Papulatus prequest in Ludibrium at 85.' },
    { name: 'Papulatus Prequest', type: 'solo', mapStyle: 'clock', mobs: ['Ludibrium mobs'], detail: 'Complete clocktower questline before your first Pap run. See Bosses tab.' }
  ]},
  { range: '100 – 120', label: 'Leafre', theme: 'leafre', icon: '🐉', spots: [
    { name: 'Petristation / Newts', type: 'solo', mapStyle: 'forest', mobs: ['Red Wyvern', 'Blue Wyvern', 'Dark Wyvern'], detail: 'Dragon Forest. Newts give top-tier solo EXP. Start Horntail prequest at 120.' },
    { name: 'Skelegons (Party)', type: 'party', mapStyle: 'cave', mobs: ['Skelegon', 'Skelosaurus'], detail: 'Best EXP per hour with a strong party. Requires good damage and a Bishop for HS.' }
  ]},
  { range: '120 – 140', label: 'Neo Tokyo + Horntail', theme: 'neotokyo', icon: '🏙️', spots: [
    { name: 'Neo Tokyo (after prequest)', type: 'solo', mapStyle: 'city', mobs: ['Yakuza Member', 'Gangster', 'Boss encounters'], detail: 'Start prequest in Kerning City. Best training in game at this range once unlocked.' },
    { name: 'Horntail (daily boss)', type: 'party', mapStyle: 'volcano', mobs: ['Horntail'], detail: 'Run daily for necklace and rings. Complete Leafre prequest the day you hit 120.' }
  ]},
  { range: '140 – 200', label: 'Neo Tokyo Deep + Pink Bean', theme: 'endgame', icon: '👑', spots: [
    { name: 'Neo Tokyo Deep Maps', type: 'solo', mapStyle: 'city', mobs: ['Dunas', 'Toad', 'Robo'], detail: 'Endgame training. Supplement with daily Horntail and Pink Bean runs.' },
    { name: 'Pink Bean (daily boss)', type: 'party', mapStyle: 'temple', mobs: ['Pink Bean'], detail: 'Start Temple of Time prequest at 140. Hardest boss — see Bosses tab.' }
  ]},
];

const PQS = [
  {
    id: 'kpq',
    name: 'Kerning City PQ',
    short: 'KPQ',
    level: '21 – 30',
    party: '4 players',
    location: 'Kerning City — click the portal near the construction site',
    priority: 'high',
    rewards: ['EXP', 'Equipment', 'Ores', 'Scrolls'],
    howTo: [
      'Form a party of 4 players all within level range',
      'Enter through the KPQ portal in Kerning City',
      'Kill all monsters in each stage and collect passes',
      'Stage 4: defeat the boss and loot before time runs out',
    ],
    tips: [
      'First PQ most players run — great way to learn party play',
      'Bring potions; stages get harder quickly',
      'Better EXP than solo grinding at 21–30',
    ],
    stages: ['Stage 1 — clear mobs', 'Stage 2 — collect passes', 'Stage 3 — more clears', 'Stage 4 — boss'],
    mapTheme: 'construction',
  },
  {
    id: 'lpq',
    name: 'Ludibrium PQ',
    short: 'LPQ',
    level: '35 – 50',
    party: '4 players',
    location: 'Ludibrium — clock tower area',
    priority: 'high',
    rewards: ['EXP', 'Equipment', 'Scrolls', 'Taru Spirit materials'],
    howTo: [
      'Party of 4, levels 35–50',
      'Clear waves of monsters across multiple floors',
      'Solve the clock puzzle stages as a team',
      'Defeat the boss on the final stage',
    ],
    tips: [
      'Best PQ for the 35–50 range — run this instead of solo grinding',
      'Popular on Royals — easy to find parties in channel',
      'Good equipment drops to fund your first real gear',
    ],
    stages: ['Floor 1 — clears', 'Clock puzzle room', 'Floor 3 — waves', 'Boss room'],
    mapTheme: 'clock',
  },
  {
    id: 'cpq',
    name: 'Carnival PQ',
    short: 'CPQ',
    level: '30 – 50',
    party: '2 vs 2 (competitive)',
    location: 'Ludibrium — Carnival portal',
    priority: 'medium',
    rewards: ['EXP', 'Onyx Apples', 'CPQ weapons'],
    howTo: [
      'Two parties of 2 compete against each other',
      'Kill monsters to earn CP (carnival points)',
      'Use CP to summon monsters on the enemy side',
      'Team with more points when time ends wins',
    ],
    tips: [
      'Drops Onyx Apples — always sell in FM',
      'More competitive and chaotic than LPQ',
      'Good if you want PvP-style PQ action',
    ],
    stages: ['Team A vs Team B', 'Earn CP from kills', 'Summon mobs on enemy', 'Winner by points'],
    mapTheme: 'carnival',
  },
  {
    id: 'opq',
    name: 'Orbis PQ',
    short: 'OPQ',
    level: '51 – 70',
    party: '4 players',
    location: 'Orbis — near the cloud platforms',
    priority: 'high',
    rewards: ['EXP', 'Equipment', 'Scrolls', 'Ores'],
    howTo: [
      'Party of 4, levels 51–70',
      'Navigate cloud platform stages',
      'Collect coupons dropped by monsters',
      'Clear all stages and defeat the boss',
    ],
    tips: [
      'Best EXP source from 51 to 70 — run until you outlevel it',
      'Stock potions for later stages',
      'Pairs well with Galloperas farming for mesos between runs',
    ],
    stages: ['Cloud platform 1', 'Coupon collection', 'Platform maze', 'Boss stage'],
    mapTheme: 'sky',
  },
  {
    id: 'apq',
    name: 'Amoria PQ',
    short: 'APQ',
    level: '40+',
    party: '6 players (married couples)',
    location: 'Amoria — Wedding Village',
    priority: 'optional',
    rewards: ['EXP (best at 40–50)', 'Rings', 'Equipment'],
    howTo: [
      'Requires in-game marriage between party members',
      'Enter through Amoria PQ portal',
      'Work through couple-themed puzzle stages',
      'Defeat bosses on final stages',
    ],
    tips: [
      'Highest EXP per hour at 40–50 if you have a partner',
      'Optional — LPQ is easier to access without marriage',
      'Popular for married couples on Royals',
    ],
    stages: ['Couple stage 1', 'Puzzle room', 'Wave clear', 'Final boss'],
    mapTheme: 'wedding',
  },
];

const GUIDE_SECTIONS = [
  { id: 'leveling', icon: '📈', title: 'Leveling Guide', desc: 'Where to train from level 1 to 200 — maps, mobs, and when to run PQs.' },
  { id: 'pqs', icon: '👥', title: 'Party Quests', desc: 'KPQ, LPQ, CPQ, OPQ explained — how to run them and what you get.' },
  { id: 'bosses', icon: '💀', title: 'Boss Guides', desc: 'Zakum, Papulatus, Horntail, Pink Bean — prequests, HP reqs, drops, and tips.' },
  { id: 'items', icon: '🎒', title: 'Item Guide', desc: 'What to keep, sell in FM, or vendor. Search any drop you are unsure about.' },
  { id: 'jobadv', icon: '⚔️', title: 'Job Advancements', desc: 'Every job change from level 10 to 120 — where to go and what to do.' },
  { id: 'quiz', icon: '🎯', title: 'Pick Your Class', desc: 'Not sure what to play? Short quiz recommends a class for your playstyle.' },
  { id: 'gear', icon: '🛡️', title: 'Gear Roadmap', desc: 'What gear to aim for at each stage of the game, in priority order.' },
];

const CHECKLIST = [
  { cat: 'Daily', label: 'Vote on all sites (royals.ms/vote)', id: 'vote' },
  { cat: 'Daily', label: 'Run Zakum', id: 'zakum' },
  { cat: 'Daily', label: 'Run Horntail (lv 120+)', id: 'ht' },
  { cat: 'Daily', label: 'Farm mesos at training spot', id: 'farm' },
  { cat: 'Daily', label: 'Check Free Market prices', id: 'fm' },
  { cat: 'Daily', label: 'Complete daily quests', id: 'daily-q' },
  { cat: 'Weekly', label: 'Run Pink Bean (lv 140+)', id: 'pb' },
  { cat: 'Weekly', label: 'Complete Monster Book collections', id: 'mb' },
  { cat: 'Weekly', label: 'Restock potions', id: 'pots' },
  { cat: 'Weekly', label: 'Check HP wash progress', id: 'hpw' },
  { cat: 'Weekly', label: 'Review gear upgrades available', id: 'gear-check' },
];

const GEAR_PHASES = [
  {
    title: 'Early Game — Level 1 to 70',
    items: [
      { priority: 'p1', name: 'Work Gloves (lv 40)', detail: 'Scroll with ATT 60% or 10%. Best damage upgrade per meso.' },
      { priority: 'p2', name: 'Clean weapon for your level', detail: 'Check Free Market for level-appropriate weapon. Don\'t overspend.' },
      { priority: 'p3', name: 'Stat earrings', detail: 'Any earrings with your main stat (STR/DEX/INT/LUK).' },
    ]
  },
  {
    title: 'Mid Game — Level 70 to 120',
    items: [
      { priority: 'p1', name: 'Zakum Helmet', detail: 'Run Zakum daily. Biggest single mid-game upgrade.' },
      { priority: 'p1', name: 'Papu Pendant', detail: 'Run Papulatus daily at 85+. Best pendant until Horntail Necklace.' },
      { priority: 'p2', name: 'Level 70-80 weapon', detail: 'Scrolled if budget allows. Each slot matters.' },
      { priority: 'p3', name: 'Sauna Robe / class armor', detail: 'Clean is fine. Scroll with DEF or stat scrolls.' },
    ]
  },
  {
    title: 'Late Game — Level 120+',
    items: [
      { priority: 'p1', name: 'Horntail Necklace', detail: 'Replace Papu Pendant immediately on drop.' },
      { priority: 'p1', name: 'Horntail Rings x3', detail: 'Run Horntail daily. All 3 ring slots.' },
      { priority: 'p1', name: 'Scrolled endgame weapon', detail: 'Your biggest investment. Biggest damage gain.' },
      { priority: 'p2', name: 'Pink Adventurer Cape', detail: 'Best cape in game. Scroll with stat scrolls.' },
      { priority: 'p3', name: 'Stat earrings (high roll)', detail: 'Aim for 10+ main stat.' },
    ]
  },
  {
    title: 'Endgame — Pink Bean Ready',
    items: [
      { priority: 'p1', name: 'Pink Bean Hat', detail: 'Best helmet in game. Replaces Zakum Helmet.' },
      { priority: 'p1', name: 'Pink Bean Suit', detail: 'Best overall armor.' },
      { priority: 'p2', name: 'Work Gloves 10 ATT', detail: 'Max possible ATT gloves.' },
      { priority: 'p3', name: 'Full stat optimization', detail: 'Chaos scroll upgrades, perfect earrings, etc.' },
    ]
  },
];

const QUIZ_QUESTIONS = [
  {
    q: 'What matters most to you?',
    options: [
      { text: 'Dealing the most damage', tags: ['dps'] },
      { text: 'Being useful to my party', tags: ['support'] },
      { text: 'Surviving everything', tags: ['tank'] },
      { text: 'Making the most mesos', tags: ['farm'] },
    ]
  },
  {
    q: 'How much do you want to spend on your character?',
    options: [
      { text: 'Minimal — effective without heavy funding', tags: ['budget'] },
      { text: 'Moderate — invest but not obsessively', tags: ['mid'] },
      { text: 'Heavy — the best regardless of cost', tags: ['funded'] },
    ]
  },
  {
    q: 'How important is being wanted in parties?',
    options: [
      { text: 'Very — I want to get invited easily', tags: ['support', 'tank'] },
      { text: 'Somewhat — I want to contribute', tags: ['mid'] },
      { text: 'Not much — I prefer solo play', tags: ['farm', 'dps'] },
    ]
  },
  {
    q: 'Do you want to deal with HP washing?',
    options: [
      { text: 'No — I want to skip or minimize it', tags: ['tank', 'budget'] },
      { text: 'Yes — I can plan for it', tags: ['dps', 'funded'] },
    ]
  },
];

const CLASS_RESULTS = [
  { name: 'Dark Knight', icon: 'assets/images/classes/warrior.png', tags: ['tank', 'support', 'budget'], why: 'Best survivability, always wanted in parties for Hyper Body, minimal HP washing required. Perfect beginner class.', badges: ['Beginner Friendly', 'Party Essential', 'Low Cost'] },
  { name: 'Bishop', icon: 'assets/images/classes/mage.png', tags: ['support', 'budget', 'mid'], why: 'Always invited to every party. Holy Symbol, Heal, and Resurrection make you irreplaceable. Low gear requirements.', badges: ['Party Essential', 'Always Invited', 'Low Cost'] },
  { name: 'Night Lord', icon: 'assets/images/classes/thief.png', tags: ['dps', 'funded'], why: 'Highest DPS in the game. Extremely satisfying but expensive and requires heavy HP washing. Not for beginners.', badges: ['Max DPS', 'Expensive', 'HP Wash Heavy'] },
  { name: 'Bowmaster', icon: 'assets/images/classes/archer.png', tags: ['dps', 'mid', 'farm'], why: 'Arrow Rain is the best mobbing skill in the game. Great solo farmer, Sharp Eyes buffs the party, Hurricane for bossing.', badges: ['Great Farmer', 'Party Buff', 'Moderate Cost'] },
  { name: 'Shadower', icon: 'assets/images/classes/thief.png', tags: ['dps', 'mid', 'support'], why: 'Smokescreen is one of the most valuable bossing skills. More affordable than NL with unique Meso Explosion mechanic.', badges: ['Unique Mechanic', 'Party Utility', 'Moderate Cost'] },
  { name: 'Buccaneer', icon: 'assets/images/classes/pirate.png', tags: ['tank', 'mid', 'dps'], why: 'Speed Infusion buffs party attack speed. Super Transform is mechanically fun. Underrated but very capable.', badges: ['Fun Mechanic', 'Party Buff', 'Underrated'] },
];

const JOB_DATA = {
  warrior: {
    class: 'Warrior → Spearman / Fighter / Page → Dark Knight / Hero / Paladin',
    advancements: [
      { job: '1st Job — Level 10', location: 'Perion — Warriors\' Sanctuary', steps: ['Talk to Dances with Balrog in Perion', 'No test required', 'Choose weapon path: Sword, Spear, or Blunt Weapon', 'Allocate SP into Power Strike and Slash Blast first'] },
      { job: '2nd Job — Level 30', location: 'Perion — Job Instructor', steps: ['Talk to the job instructor in Perion', 'Complete quest: collect 30 Dark Marbles', 'Choose: Fighter (sword/axe), Page (sword/blunt), or Spearman (spear/polearm)', 'Max Hyper Body first if choosing Spearman'] },
      { job: '3rd Job — Level 70', location: 'El Nath — Holy Ground', steps: ['Travel to El Nath', 'Talk to your job instructor', 'Enter the Holy Ground portal', 'Defeat the Demon solo — bring potions', 'Return to receive 3rd job advancement'] },
      { job: '4th Job — Level 120', location: 'Leafre — Dragon Master', steps: ['Travel to Leafre', 'Talk to Harmonia the Dragon Master', 'No quest required — straightforward advancement', 'Dark Knight: max Berserk first', 'Hero: max Brandish first', 'Paladin: max Heaven\'s Hammer first'] },
    ]
  },
  thief: {
    class: 'Rogue → Assassin / Bandit → Night Lord / Shadower',
    advancements: [
      { job: '1st Job — Level 10', location: 'Kerning City — Fusion Bar', steps: ['Talk to Dark Lord in Kerning City', 'No test required', 'Choose: Assassin (claw) or Bandit (dagger)', 'Assassin: max Lucky Seven first'] },
      { job: '2nd Job — Level 30', location: 'Kerning City — Job Instructor', steps: ['Talk to the job instructor', 'Collect 30 Dark Marbles from assigned mob', 'Assassin: max Claw Mastery and Booster first', 'Bandit: max Savage Blow first'] },
      { job: '3rd Job — Level 70', location: 'El Nath — Holy Ground', steps: ['Travel to El Nath', 'Talk to your job instructor', 'Enter the Holy Ground portal and defeat the Demon solo', 'Assassin → Hermit, Bandit → Chief Bandit'] },
      { job: '4th Job — Level 120', location: 'Leafre', steps: ['Talk to your 4th job instructor in Leafre', 'Hermit → Night Lord: max Quadruple Throw first', 'Chief Bandit → Shadower: max Assassinate first', 'NL: activate Shadow Stars immediately'] },
    ]
  },
  archer: {
    class: 'Hunter / Crossbowman → Ranger / Sniper → Bowmaster / Marksman',
    advancements: [
      { job: '1st Job — Level 10', location: 'Henesys — Bowman Instructional School', steps: ['Talk to Athena Pierce in Henesys', 'No test required', 'Choose: Hunter (bow) or Crossbowman (crossbow)', 'Max The Eye of Amazon and Focus first'] },
      { job: '2nd Job — Level 30', location: 'Henesys — Job Instructor', steps: ['Collect 30 Dark Marbles', 'Hunter → Ranger: max Arrow Bomb and Booster', 'Crossbowman → Sniper: max Iron Arrow and Booster'] },
      { job: '3rd Job — Level 70', location: 'El Nath — Holy Ground', steps: ['Travel to El Nath and defeat the Demon solo', 'Ranger: max Arrow Rain first', 'Sniper: max Blizzard first', 'Puppet is mandatory — level it early'] },
      { job: '4th Job — Level 120', location: 'Leafre', steps: ['Talk to 4th job instructor in Leafre', 'Ranger → Bowmaster: max Hurricane first', 'Sniper → Marksman: max Snipe first', 'Sharp Eyes buffs entire party — always active'] },
    ]
  },
  mage: {
    class: 'Wizard → Mage → Bishop / Ice-Lightning / Fire-Poison',
    advancements: [
      { job: '1st Job — Level 8', location: 'Ellinia — Magic Library', steps: ['Talk to Grendel the Really Old in Ellinia', 'Mages advance at level 8, not 10', 'Choose: Fire/Poison, Ice/Lightning, or Cleric path', 'Max Magic Bolt and Magic Guard first'] },
      { job: '2nd Job — Level 30', location: 'Ellinia — Job Instructor', steps: ['Collect 30 Dark Marbles', 'Cleric → Priest: max Teleport, Heal, and Holy Arrow', 'F/P: max Spell Mastery and MP Eater', 'I/L: max Spell Mastery and Thunderbolt'] },
      { job: '3rd Job — Level 70', location: 'El Nath — Holy Ground', steps: ['Travel to El Nath and defeat the Demon solo (mages have low HP — stock potions)', 'Priest → Bishop: max Holy Symbol immediately', 'F/P Mage: max Poison Mist', 'I/L Mage: max Ice Strike'] },
      { job: '4th Job — Level 120', location: 'Leafre', steps: ['Talk to 4th job instructor in Leafre', 'Bishop: max Genesis and Bahamut, then Infinity', 'I/L: max Chain Lightning and Infinity', 'F/P: max Meteor Shower and Infinity', 'Infinity is a game-changer — prioritize it'] },
    ]
  },
  pirate: {
    class: 'Pirate → Brawler / Gunslinger → Buccaneer / Corsair',
    advancements: [
      { job: '1st Job — Level 10', location: 'Nautilus Harbor', steps: ['Talk to Kyrin on the Nautilus', 'Choose: Brawler (knuckle) or Gunslinger (gun)', 'Brawler: max Flash Fist and Dash', 'Gunslinger: max Double Shot and Dash'] },
      { job: '2nd Job — Level 30', location: 'Nautilus Harbor — Job Instructor', steps: ['Return to Nautilus Harbor', 'Collect 30 Dark Marbles', 'Brawler → Marauder: max Knuckle Mastery and Booster', 'Gunslinger → Outlaw: max Gun Mastery and Booster'] },
      { job: '3rd Job — Level 70', location: 'El Nath — Holy Ground', steps: ['Travel to El Nath and defeat the Demon solo', 'Marauder → Buccaneer: max Energy Charge mechanic', 'Outlaw → Corsair: max Wrath of Octopi and Battleship'] },
      { job: '4th Job — Level 120', location: 'Leafre', steps: ['Talk to 4th job instructor in Leafre', 'Buccaneer: max Super Transformation first, then Demolition', 'Corsair: max Rapid Fire first, then Battleship Torpedo', 'Buccaneer: Speed Infusion buffs party — always active'] },
    ]
  }
};
