// Leeching guide — based on Jooon's MapleRoyals forum guide (2022)
// https://royals.ms/forum/threads/leeching-guide-updated-2022-goby-guide-included.145533/

const LEECHING_GUIDE = {
  forumUrl: 'https://royals.ms/forum/threads/leeching-guide-updated-2022-goby-guide-included.145533/',
  credit: "Jooon's Leeching Guide (Updated 2022) · EXP data from Geyforlife",
  intro: 'Leeching means a seller kills mobs (or bosses) while you stay in party range for EXP. CPQ leech is efficient but rare; mob leech is the standard path to 108+; boss leech covers 135–200.',
  methods: [
    { icon: '👥', label: 'Mob leech', detail: 'Seller grinds a map; buyer stays nearby. Main route from ~10 to 108+.' },
    { icon: '🎪', label: 'CPQ leech', detail: 'Very fast 30–108+ but few sellers — hard to book.' },
    { icon: '💀', label: 'Boss leech', detail: 'Daily bosses and expeditions from ~135 to 200.' },
  ],
  goby: {
    title: 'Goby leech (Lv 30–70)',
    map: 'Aqua Road — Deep Sea Gorge II',
    mobs: ['Goby'],
    summary: 'Premium mob leech. Expensive but extremely fast if you can afford it — can skip most maps below until FTP.',
    requirements: [
      '2 clients: Bishop + Brawler/Warrior seller',
      'Buyer must be within 5 levels below the seller to gain EXP',
      'Seller ACC ~315 at Lv 35, ~252 at Lv 50 to hit gobies',
      'Bishop breaks Bombing Fish House to spawn gobies, lures to melee',
      'Seller may need Maple Pop, SI, MW20, Stopper, Echo, or apples',
    ],
    buyerNotes: [
      'Cannot fully AFK — gobies hit hard; recast Magic Guard and feed pet',
      'Bonefish and Bombing Fish House can one-shot you',
      'Flat per-level pricing is common in FM',
    ],
  },
  ranges: [
    { level: '8–10', label: 'Tutorial', spots: [
      { mobs: 'Tutorial quests', map: 'Maple Island', notes: 'Complete job quests before leeching.' },
    ]},
    { level: '10–20', label: 'Early Victoria', spots: [
      { mobs: 'Bubbling', map: 'Kerning City Subway: Line 1', notes: 'Classic early leech spot.' },
    ]},
    { level: '20–25', label: 'Victoria', spots: [
      { mobs: 'Wild Boar', map: 'Hidden Street: The Land of Wild Boar I', notes: '' },
    ]},
    { level: '25–30', label: 'Ludibrium', spots: [
      { mobs: 'Pink Teddy, Brown Teddy', map: 'Ludibrium: Terrace Hall', notes: '' },
    ]},
    { level: '30–36', label: 'Kerning', spots: [
      { mobs: 'Jr. Wraith', map: 'Kerning City Subway: Line 1 Area 2', notes: 'Alternative to goby if on a budget.' },
    ]},
    { level: '36–41', label: 'Ludibrium', spots: [
      { mobs: 'Platoon Chronos', map: 'Ludibrium: The Path of Time <1>', notes: '' },
    ]},
    { level: '41–43', label: 'Ludibrium', spots: [
      { mobs: 'Master Chronos', map: 'Ludibrium: The Path of Time <4>', notes: '' },
    ]},
    { level: '43–51', label: 'Kerning', spots: [
      { mobs: 'Wraith', map: 'Kerning City Subway: Line 1', notes: '' },
    ]},
    { level: '51–53', label: 'Malaysia', spots: [
      { mobs: 'Oly Oly, Dark Fission', map: 'Malaysia: Muddy Banks 1', notes: '' },
    ]},
    { level: '53–56', label: 'Magatia', spots: [
      { mobs: 'Neo Huroid', map: 'Alcadno Research Institute: Lab — Area C-3', notes: '' },
    ]},
    { level: '56–65', label: 'Malaysia', spots: [
      { mobs: 'Rodeo', map: 'Malaysia: Muddy Banks 2', notes: 'Long stretch — start early.' },
    ]},
    { level: '65–67', label: 'Crimsonwood', spots: [
      { mobs: 'Windraider', map: 'Crimsonwood Keep: Tornado Corridor', notes: '' },
    ]},
    { level: '67–75', label: 'Malaysia', spots: [
      { mobs: 'Froscola, Jester, Scarlion', map: 'Malaysia: Fantasy Theme Park 1', notes: '' },
    ]},
    { level: '75–78', label: 'Crimsonwood', spots: [
      { mobs: 'Stormbreaker', map: 'Crimsonwood Keep: Stormhall', notes: 'Compact map — better EXP/h than Wolf Spider per guide author.' },
    ]},
    { level: '78–85', label: 'Leafre', spots: [
      { mobs: 'Harp, Blood Harp', map: 'Leafre: Sky Nest II', notes: 'Buyer needs Lv 78+ to leech here.' },
    ]},
    { level: '85–90', label: 'Singapore', spots: [
      { mobs: 'Berserkie, Veetron', map: 'Singapore: Ulu Estate I', notes: 'Bring pots — mobs hit ~1.7k. Priest door helps after deaths.' },
    ]},
    { level: '90–105', label: 'Singapore', spots: [
      { mobs: 'Veetron, Slygie', map: 'Singapore: Ulu Estate II', notes: 'Genesis 30 ~1190 MATK to 1-hit; Meteor/Blizzard 30 ~919.' },
    ]},
    { level: '105–108', label: 'Singapore', spots: [
      { mobs: 'Petrifighter', map: 'Singapore: Ulu City Center', notes: 'Meteor/Blizzard 30 ~1260 MATK to 1-hit.' },
    ]},
    { level: '108+', label: 'Leafre', spots: [
      { mobs: 'Skelegon, Skelosaurus', map: 'Leafre: The Dragon Nest Left Behind', notes: 'Genesis 30 ~1300 MATK. End of standard mob leech.' },
    ]},
  ],
  areaBosses: [
    { level: '105+', name: 'Bigfoot', map: 'Masteria — Phantom Forest (multiple twisted path maps)', notes: 'Area boss leech — camp channels.' },
    { level: '115+', name: 'Kacchuu Musha', map: 'Zipangu: Castle Corridor [9]', notes: '' },
    { level: '125+', name: 'Anego (Female Boss)', map: 'Zipangu: Parlor', notes: 'Drops comb for The Boss expedition.' },
  ],
  bossLeech: [
    { level: '135+', name: 'Zakum', notes: '' },
    { level: '135+', name: 'Krexel', notes: '2 runs/day after prequest.' },
    { level: '140+', name: 'Vergamot', notes: 'Neo Tokyo expedition.' },
    { level: '147+', name: 'Dunas', notes: '' },
    { level: '155+', name: 'Horntail', notes: '' },
    { level: '155+', name: 'Royal Guard', notes: '' },
    { level: '165+', name: 'Core Blaze', notes: '' },
    { level: '170+', name: 'The Boss', notes: '' },
    { level: '175+', name: 'Castellan Toad', notes: '' },
    { level: '175+', name: 'Auf Haven', notes: '' },
  ],
  tips: [
    'Leeching 2 characters at once with a Bishop gives each ~7–8% of solo leech EXP — still more total EXP/h for the seller.',
    'Buyer must stay in range and alive — feed pet, pot, and recast buffs.',
    'Neo Tokyo maps are strong 150–200 training if you can afford NT leech sellers.',
    'Always confirm seller level vs. yours — you must be within 5 levels below for EXP.',
    'Check FM for per-level flat rates before booking long leech sessions.',
  ],
};
