// Skill priority tables by 4th job — MapleRoyals v83

const CLASS_SKILL_TABLES = {
  'dark-knight': [
    { job: '1st — Spearman', skills: [
      { name: 'Slash Blast', priority: 'Max', note: 'Mobbing until 2nd job' },
      { name: 'Power Strike', priority: 'Med', note: 'Single target filler' },
    ]},
    { job: '2nd — Spearman', skills: [
      { name: 'Hyper Body', priority: 'Max FIRST', note: 'Non-negotiable — party essential' },
      { name: 'Iron Body', priority: 'Med', note: 'DEF for survivability' },
      { name: 'Spear Mastery', priority: 'Med', note: 'After HB' },
    ]},
    { job: '3rd — Dragon Knight', skills: [
      { name: 'Dragon Roar', priority: 'Max', note: 'Main mobbing skill' },
      { name: 'Power Stance', priority: 'High', note: 'Prevent knockback' },
      { name: 'Achilles', priority: 'Med', note: 'DEF %' },
    ]},
    { job: '4th — Dark Knight', skills: [
      { name: 'Berserk', priority: 'Max FIRST', note: 'Core damage — always active' },
      { name: 'Beholder', priority: 'High', note: 'Heal + buff' },
      { name: 'Maple Warrior', priority: 'High', note: 'Party stat buff' },
    ]},
  ],
  bishop: [
    { job: '1st — Cleric', skills: [
      { name: 'Magic Guard', priority: 'Max', note: 'Always keep active' },
      { name: 'Heal', priority: 'High', note: 'Self + party sustain' },
      { name: 'Teleport', priority: 'Med', note: 'QoL — max when you can' },
    ]},
    { job: '2nd — Priest', skills: [
      { name: 'Heal', priority: 'Max', note: 'Parties expect this' },
      { name: 'Holy Arrow', priority: 'High', note: 'Undead mobbing' },
      { name: 'Teleport', priority: 'Max', note: 'Saves massive time' },
    ]},
    { job: '3rd — Priest', skills: [
      { name: 'Holy Symbol', priority: 'Max FIRST', note: 'EXP buff — always up in parties' },
      { name: 'Shining Ray', priority: 'High', note: 'Mobbing' },
      { name: 'Dispel', priority: 'Med', note: 'Useful at bosses' },
    ]},
    { job: '4th — Bishop', skills: [
      { name: 'Genesis', priority: 'Max', note: 'Burst DPS windows' },
      { name: 'Bahamut', priority: 'High', note: 'Summon damage' },
      { name: 'Infinity', priority: 'High', note: 'Endgame scaling' },
      { name: 'Resurrection', priority: 'Med', note: 'Boss safety net' },
    ]},
  ],
  bowmaster: [
    { job: '2nd — Ranger', skills: [
      { name: 'Arrow Bomb', priority: 'Max', note: 'Early mobbing' },
      { name: 'Soul Arrow', priority: 'Max', note: 'Save mesos on arrows' },
      { name: 'Puppet', priority: 'Med', note: 'Level for 3rd job' },
    ]},
    { job: '3rd — Ranger', skills: [
      { name: 'Arrow Rain', priority: 'Max FIRST', note: 'Best farmer in game' },
      { name: 'Puppet', priority: 'High', note: 'Mob tank' },
      { name: 'Strafe', priority: 'Med', note: 'Boss filler' },
    ]},
    { job: '4th — Bowmaster', skills: [
      { name: 'Hurricane', priority: 'Max FIRST', note: 'Boss single target' },
      { name: 'Sharp Eyes', priority: 'Max', note: 'Party crit buff — always active' },
      { name: 'Bow Expert', priority: 'High', note: 'Passive damage' },
    ]},
  ],
  'night-lord': [
    { job: '1st — Assassin', skills: [
      { name: 'Lucky Seven', priority: 'Max', note: 'Bread and butter' },
      { name: 'Claw Mastery', priority: 'Med', note: 'After L7' },
    ]},
    { job: '2nd — Assassin', skills: [
      { name: 'Claw Mastery', priority: 'Max', note: 'Accuracy + damage' },
      { name: 'Booster', priority: 'Max', note: 'Attack speed' },
      { name: 'Critical Throw', priority: 'High', note: 'Crit rate' },
    ]},
    { job: '3rd — Hermit', skills: [
      { name: 'Shadow Partner', priority: 'Max', note: 'Huge DPS boost' },
      { name: 'Avenger', priority: 'Med', note: 'Mobbing option' },
    ]},
    { job: '4th — Night Lord', skills: [
      { name: 'Quadruple Throw', priority: 'Max FIRST', note: 'Main attack' },
      { name: 'Shadow Stars', priority: 'Max', note: 'Activate immediately' },
      { name: 'Three Snails', priority: 'Low', note: 'Optional burst' },
    ]},
  ],
  shadower: [
    { job: '2nd — Bandit', skills: [
      { name: 'Savage Blow', priority: 'Max', note: 'Main attack' },
      { name: 'Steal', priority: 'Med', note: 'Meso on hit' },
    ]},
    { job: '3rd — Chief Bandit', skills: [
      { name: 'Assassinate', priority: 'Max', note: 'Build toward 4th' },
      { name: 'Meso Guard', priority: 'High', note: 'Damage to mesos' },
    ]},
    { job: '4th — Shadower', skills: [
      { name: 'Assassinate', priority: 'Max FIRST', note: 'Core damage' },
      { name: 'Smokescreen', priority: 'Max', note: 'Boss essential — PB' },
      { name: 'Boomerang Step', priority: 'Med', note: 'Mobility' },
    ]},
  ],
  hero: [
    { job: '2nd — Fighter', skills: [
      { name: 'Rage', priority: 'Max', note: 'Damage boost' },
      { name: 'Slash Blast', priority: 'High', note: 'Mobbing' },
    ]},
    { job: '3rd — Crusader', skills: [
      { name: 'Combo Attack', priority: 'Max', note: 'Combo stacks' },
      { name: 'Panic', priority: 'High', note: 'AoE' },
    ]},
    { job: '4th — Hero', skills: [
      { name: 'Brandish', priority: 'Max FIRST', note: 'Main mobbing + boss' },
      { name: 'Enrage', priority: 'Max', note: 'Burst windows' },
      { name: 'Advanced Combo', priority: 'High', note: 'Passive damage' },
    ]},
  ],
  paladin: [
    { job: '2nd — Page', skills: [
      { name: 'Charge Blow', priority: 'Max', note: 'Stun + damage' },
      { name: 'Thunder Charge', priority: 'High', note: 'Elemental' },
    ]},
    { job: '4th — Paladin', skills: [
      { name: "Heaven's Hammer", priority: 'Max', note: 'Mobbing' },
      { name: 'Blast', priority: 'Max', note: 'Boss damage' },
      { name: 'Magic Guard', priority: 'High', note: 'Survivability' },
    ]},
  ],
  'fp-arch-mage': [
    { job: '2nd — F/P Mage', skills: [
      { name: 'Spell Mastery', priority: 'Max', note: 'M.Atk' },
      { name: 'Flame Arrow', priority: 'High', note: 'Mobbing' },
    ]},
    { job: '3rd', skills: [
      { name: 'Poison Mist', priority: 'Max', note: 'DoT mobbing' },
      { name: 'Element Amplification', priority: 'High', note: 'Damage %' },
    ]},
    { job: '4th — F/P Arch Mage', skills: [
      { name: 'Meteor Shower', priority: 'Max', note: 'Burst' },
      { name: 'Infinity', priority: 'Max', note: 'Endgame scaling' },
      { name: 'Paralyze', priority: 'Med', note: 'Boss utility' },
    ]},
  ],
  'il-arch-mage': [
    { job: '2nd — I/L Mage', skills: [
      { name: 'Thunderbolt', priority: 'Max', note: 'Carries early game' },
      { name: 'Spell Mastery', priority: 'High', note: 'M.Atk' },
    ]},
    { job: '3rd', skills: [
      { name: 'Ice Strike', priority: 'Max', note: 'Mobbing' },
      { name: 'Thunder Spear', priority: 'Med', note: 'Single target' },
    ]},
    { job: '4th — I/L Arch Mage', skills: [
      { name: 'Chain Lightning', priority: 'Max FIRST', note: 'Best mobber' },
      { name: 'Infinity', priority: 'Max', note: 'Endgame' },
      { name: 'Blizzard', priority: 'High', note: 'AoE burst' },
    ]},
  ],
  marksman: [
    { job: '2nd — Crossbowman', skills: [
      { name: 'Iron Arrow', priority: 'Max', note: 'Piercing mobbing' },
      { name: 'Soul Arrow', priority: 'Max', note: 'Save arrow costs' },
    ]},
    { job: '3rd — Sniper', skills: [
      { name: 'Blizzard', priority: 'Max', note: 'Mobbing' },
      { name: 'Strafe', priority: 'High', note: 'Movement attack' },
    ]},
    { job: '4th — Marksman', skills: [
      { name: 'Snipe', priority: 'Max FIRST', note: 'Insane single target' },
      { name: 'Dragon Breath', priority: 'High', note: 'AoE phases' },
    ]},
  ],
  buccaneer: [
    { job: '2nd — Brawler', skills: [
      { name: 'Knuckle Mastery', priority: 'Max', note: 'Accuracy' },
      { name: 'Booster', priority: 'Max', note: 'Speed' },
    ]},
    { job: '3rd — Marauder', skills: [
      { name: 'Energy Charge', priority: 'Max', note: 'Learn the mechanic' },
      { name: 'Corkscrew Blow', priority: 'High', note: 'Damage' },
    ]},
    { job: '4th — Buccaneer', skills: [
      { name: 'Super Transformation', priority: 'Max', note: 'Burst form' },
      { name: 'Speed Infusion', priority: 'Max', note: 'Party atk speed — always up' },
      { name: 'Demolition', priority: 'High', note: 'Main attack in transform' },
    ]},
  ],
  corsair: [
    { job: '2nd — Gunslinger', skills: [
      { name: 'Gun Mastery', priority: 'Max', note: 'Accuracy' },
      { name: 'Double Shot', priority: 'High', note: 'Early mobbing' },
    ]},
    { job: '3rd — Outlaw', skills: [
      { name: 'Battleship', priority: 'Max', note: 'Core mechanic' },
      { name: 'Wrath of Octopi', priority: 'High', note: 'Summon' },
    ]},
    { job: '4th — Corsair', skills: [
      { name: 'Rapid Fire', priority: 'Max FIRST', note: 'Sustained DPS' },
      { name: 'Battleship Torpedo', priority: 'High', note: 'Burst' },
    ]},
  ],
};

const CLASS_FORUM_URL = 'https://royals.ms/forum/forums/class-guides.109/';
const CLASS_WIKI_URL = 'https://mime.royals.ms';

const CLASS_FORUM_SEARCH = {
  'dark-knight': 'dark+knight',
  bishop: 'bishop',
  bowmaster: 'bowmaster',
  'night-lord': 'night+lord',
  shadower: 'shadower',
  hero: 'hero',
  paladin: 'paladin',
  'fp-arch-mage': 'fire+poison',
  'il-arch-mage': 'ice+lightning',
  marksman: 'marksman',
  buccaneer: 'buccaneer',
  corsair: 'corsair',
};
