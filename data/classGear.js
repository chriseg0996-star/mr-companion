// Per-class gear priorities — MapleRoyals v83

const CLASS_GEAR_NOTES = {
  'dark-knight': [
    { priority: 'p1', item: 'Spear or Polearm (ATT scrolled)', note: 'Main damage slot. Clean + 60% ATT is fine early.' },
    { priority: 'p1', item: 'Zakum Helmet', note: 'Huge upgrade at 70. Run daily after prequest.' },
    { priority: 'p2', item: 'Work Gloves (ATT)', note: 'Best meso-to-damage ratio in the game.' },
    { priority: 'p3', item: 'Sauna Robe / Warrior armor', note: 'DEF scrolls or clean — survivability helps Berserk uptime.' },
  ],
  bishop: [
    { priority: 'p1', item: 'Staff or Wand (MATK)', note: 'Low funding class — clean weapon is often enough until 70.' },
    { priority: 'p2', item: 'Zakum Helmet + Papu Pendant', note: 'Standard mid-game. Prioritize party utility over personal DPS.' },
    { priority: 'p2', item: 'INT earrings / cape', note: 'Any main-stat gear helps Genesis damage.' },
    { priority: 'p3', item: 'Horntail Necklace', note: 'Replace Papu when it drops — run HT daily.' },
  ],
  bowmaster: [
    { priority: 'p1', item: 'Bow (ATT scrolled)', note: 'Weapon funding matters — Hurricane scales hard.' },
    { priority: 'p1', item: 'Soul Arrow skill + arrows stocked', note: 'Not gear, but budget for arrows until Soul Arrow is maxed.' },
    { priority: 'p2', item: 'Work Gloves (ATT)', note: 'Core scroll slot for all archers.' },
    { priority: 'p2', item: 'Zakum Helmet → Papu Pendant', note: 'Standard mid-game progression.' },
  ],
  'night-lord': [
    { priority: 'p1', item: 'Claw (high ATT scrolls)', note: 'Most expensive slot — plan mesos before committing.' },
    { priority: 'p1', item: 'Ilbi / Hwabi stars (bulk)', note: 'Ongoing cost. Never run bossing without stars.' },
    { priority: 'p1', item: 'HP wash plan (15k+ for HT)', note: 'Budget for washing as much as weapon funding.' },
    { priority: 'p2', item: 'Work Gloves 8–10 ATT', note: 'Endgame gloves are a long-term goal.' },
  ],
  shadower: [
    { priority: 'p1', item: 'Dagger (ATT scrolled)', note: 'Cheaper than claw — still scroll well.' },
    { priority: 'p2', item: 'Zakum Helmet + Papu Pendant', note: 'Standard mid-game.' },
    { priority: 'p2', item: 'LUK earrings / cape', note: 'Main stat for damage.' },
    { priority: 'p3', item: 'Horntail rings x3', note: 'BiS ring slots — run HT daily.' },
  ],
  hero: [
    { priority: 'p1', item: 'Sword or Axe (ATT scrolled)', note: 'Weapon is your biggest investment.' },
    { priority: 'p2', item: 'Work Gloves (ATT)', note: 'Core damage upgrade.' },
    { priority: 'p2', item: 'Zakum Helmet', note: 'Run Zakum daily after unlock.' },
    { priority: 'p3', item: 'STR earrings', note: 'Any main-stat jewelry helps Enrage burst.' },
  ],
  paladin: [
    { priority: 'p1', item: 'Sword or Mace (ATT scrolled)', note: 'Blast scales with weapon ATT.' },
    { priority: 'p2', item: 'DEF-focused armor', note: 'Magic Guard + DEF gear = very tanky.' },
    { priority: 'p2', item: 'Zakum Helmet', note: 'Standard mid-game helmet.' },
    { priority: 'p3', item: 'Work Gloves (ATT or DEF)', note: 'ATT if DPS-focused, DEF if pure tank.' },
  ],
  'fp-arch-mage': [
    { priority: 'p1', item: 'Staff (MATK scrolled)', note: 'Meteor and Infinity scale with MATK.' },
    { priority: 'p2', item: 'MP recovery / INT gear', note: 'Poison Mist and Meteor are MP hungry.' },
    { priority: 'p2', item: 'Zakum Helmet + Papu Pendant', note: 'Standard mid-game.' },
    { priority: 'p3', item: 'Horntail Necklace', note: 'Replace Papu when dropped.' },
  ],
  'il-arch-mage': [
    { priority: 'p1', item: 'Staff (MATK scrolled)', note: 'Chain Lightning is your identity — fund the weapon.' },
    { priority: 'p2', item: 'INT earrings / cape', note: 'Main stat for all mage damage.' },
    { priority: 'p2', item: 'Zakum Helmet + Papu Pendant', note: 'Standard mid-game.' },
    { priority: 'p3', item: 'MP potion stock', note: 'Chain Lightning drains MP — budget for pots.' },
  ],
  marksman: [
    { priority: 'p1', item: 'Crossbow (ATT scrolled)', note: 'Snipe damage scales directly with weapon ATT.' },
    { priority: 'p2', item: 'Soul Arrow + bolts', note: 'Save mesos on ammunition.' },
    { priority: 'p2', item: 'Work Gloves (ATT)', note: 'Best scroll slot for archers.' },
    { priority: 'p3', item: 'DEX earrings', note: 'Main stat jewelry.' },
  ],
  buccaneer: [
    { priority: 'p1', item: 'Knuckle (ATT scrolled)', note: 'Core damage in and out of transform.' },
    { priority: 'p2', item: 'Zakum Helmet', note: 'Standard mid-game.' },
    { priority: 'p2', item: 'STR gear', note: 'Main stat for knuckle damage.' },
    { priority: 'p3', item: 'Horntail Necklace', note: 'BiS pendant upgrade.' },
  ],
  corsair: [
    { priority: 'p1', item: 'Gun (ATT scrolled)', note: 'Rapid Fire scales with weapon ATT.' },
    { priority: 'p2', item: 'Bullets in bulk', note: 'Ongoing ammo cost like archers.' },
    { priority: 'p2', item: 'DEX / STR hybrid gear', note: 'Check your main stat allocation.' },
    { priority: 'p3', item: 'Zakum Helmet + Papu Pendant', note: 'Standard mid-game progression.' },
  ],
};
