// MapleRoyals Companion — Game Data
// Edit this file to add/update items, bosses, levels, etc.

const ITEM_DB = {
  'zakum helmet': { verdict: 'keep', reason: 'Best helmet in the game until Pink Bean Hat. Always keep.', tags: ['boss drop', 'helmet', 'BiS mid-game'] },
  'work gloves': { verdict: 'fm', reason: 'Sell in FM if unscrolled or low ATT. Keep if 7+ ATT scrolled.', tags: ['level 40', 'gloves', 'scroll target'] },
  'horntail necklace': { verdict: 'keep', reason: 'Best necklace in the game. Never sell.', tags: ['boss drop', 'necklace', 'BiS'] },
  'balanced fury': { verdict: 'keep', reason: 'Best stars for Night Lord bossing. High FM value.', tags: ['stars', 'night lord', 'expensive'] },
  'steelies': { verdict: 'fm', reason: 'Good mid-game NL stars. Sell in FM if not playing NL.', tags: ['stars', 'thief'] },
  'tobis': { verdict: 'fm', reason: 'Strong NL stars. Sell in FM at good price.', tags: ['stars', 'thief'] },
  'onyx apple': { verdict: 'fm', reason: 'High demand consumable. Always sell in FM, never use unless bossing.', tags: ['consumable', 'fm'] },
  'pink adventurer cape': { verdict: 'keep', reason: 'Best cape in the game. Extremely rare. Never sell.', tags: ['boss drop', 'cape', 'BiS'] },
  'pink bean hat': { verdict: 'keep', reason: 'Best helmet in the game. Never sell.', tags: ['boss drop', 'helmet', 'BiS'] },
  'pink bean suit': { verdict: 'keep', reason: 'Best overall armor. Never sell.', tags: ['boss drop', 'armor', 'BiS'] },
  'maple staff': { verdict: 'fm', reason: 'Good mage weapon. Sell in FM if not a mage.', tags: ['weapon', 'mage'] },
  'papu pendant': { verdict: 'keep', reason: 'Best pendant before Horntail Necklace. Keep until HT drops.', tags: ['boss drop', 'pendant'] },
  'steely': { verdict: 'fm', reason: 'Good mid-game NL stars. Sell in FM if not playing NL.', tags: ['stars', 'thief'] },
  'tobi': { verdict: 'fm', reason: 'Strong NL stars. Sell in FM at good price.', tags: ['stars', 'thief'] },
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
    ]
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
    ]
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
    ]
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
    ]
  },
];

const LEVELS = [
  { range: '1 – 10', label: 'Maple Island', spots: [
    { name: 'Tutorial Quests', detail: 'Complete all tutorial quests. Enough EXP to hit 10 without grinding. Take boat to Victoria Island when done.' }
  ]},
  { range: '10 – 20', label: 'Henesys Area', spots: [
    { name: 'Pig Beach / Slime Tree', detail: 'Slimes, Green Snails, Pigs. Sell all drops to NPC for early mesos.' }
  ]},
  { range: '20 – 30', label: 'Kerning City', spots: [
    { name: 'Ant Tunnel I / II', detail: 'Zombie Mushrooms, Horned Mushrooms. Good solo grind.' },
    { name: 'Kerning City PQ (KPQ)', detail: 'Level 21+. Party of 4. Better EXP than solo grinding. Priority over grinding.' }
  ]},
  { range: '30 – 50', label: 'Ludibrium', spots: [
    { name: 'Ludibrium PQ (LPQ)', detail: 'Level 35-50. Party of 4. Best EXP and equipment rewards. Run until 50.' },
    { name: 'Carnival PQ (CPQ)', detail: 'Level 30-50. Competitive PQ. Good EXP, drops Onyx Apples.' },
    { name: 'Amoria PQ (APQ)', detail: 'Level 40+. Requires in-game marriage. Best EXP per hour at 40-50.' }
  ]},
  { range: '50 – 70', label: 'Orbis', spots: [
    { name: 'Orbis PQ (OPQ)', detail: 'Level 51-70. Party of 4. Best EXP at this range. Run until 70.' },
    { name: 'Coolie Zombies', detail: 'El Nath. Good solo alternative if no PQ available.' }
  ]},
  { range: '70 – 85', label: 'El Nath / Orbis', spots: [
    { name: 'Galloperas', detail: 'Orbis — Stairway to the Sky. Strong EXP, great drops. Best map at this range.' },
    { name: 'Coolie Zombies', detail: 'El Nath. Slower but less contested than Galloperas.' }
  ]},
  { range: '85 – 100', label: 'Orbis — Galloperas', spots: [
    { name: 'Galloperas (Stairway to the Sky)', detail: 'Best EXP and meso income at this range. High competition for maps.' }
  ]},
  { range: '100 – 120', label: 'Leafre', spots: [
    { name: 'Petris / Newts', detail: 'Dragon Forest. Newts give top-tier EXP. Good solo option.' },
    { name: 'Skeles (Party)', detail: 'Best EXP in game per hour with a strong party. Requires good damage.' }
  ]},
  { range: '120 – 160', label: 'Neo Tokyo', spots: [
    { name: 'Neo Tokyo Maps', detail: 'Complete prequest first in Kerning City. Best training in game at this range.' },
    { name: 'Skeles', detail: 'Still viable solo farm for strong characters.' }
  ]},
  { range: '160 – 200', label: 'Neo Tokyo Deep', spots: [
    { name: 'Neo Tokyo Deep Maps', detail: 'Toad, Dunas 2, Robo. Supplement with daily Horntail and Pink Bean runs.' }
  ]},
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
