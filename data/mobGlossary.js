// Common MapleRoyals mobs — quick reference for beginners

const MOB_GLOSSARY = [
  { name: 'Snail / Blue Snail', area: 'Maple Island', level: '1–5', category: 'training', tip: 'First mobs you fight. Tutorial quests give enough EXP to skip grinding here.', mapStyle: 'island' },
  { name: 'Slime / Orange Mushroom', area: 'Victoria Island', level: '8–15', category: 'training', tip: 'Slime Tree and Mushroom Town — safe early solo maps near Henesys.', mapImage: 'assets/images/maps/slime-tree.png' },
  { name: 'Pig / Ribbon Pig', area: 'Pig Beach', level: '10–20', category: 'training', tip: 'East of Henesys. Classic beginner grind — easy mobs, low risk.', mapImage: 'assets/images/maps/pig-beach.png' },
  { name: 'Zombie Mushroom', area: 'Ant Tunnel', level: '20–30', category: 'training', tip: 'Under Kerning City. Solo alternative when KPQ party is unavailable.', mapImage: 'assets/images/maps/ant-tunnel.png' },
  { name: 'Horned Mushroom', area: 'Ant Tunnel', level: '22–30', category: 'training', tip: 'Slightly tougher than zombie mushrooms in the same tunnel.', mapImage: 'assets/images/maps/ant-tunnel.png' },
  { name: 'Zombie Lupin', area: 'El Nath', level: '45–55', category: 'prequest', prequest: 'zakum', drops: 'Gold Teeth', tip: 'Farm for Zakum prequest while leveling in El Nath. Need 30 Gold Teeth.', mapImage: 'assets/images/maps/coolie-zombies.png' },
  { name: 'Scorpion', area: 'El Nath Desert', level: '45–55', category: 'prequest', prequest: 'zakum', drops: 'Scorpion Stings', tip: 'Drops Scorpion Stings for Zakum prequest. Need 30.', mapImage: 'assets/images/maps/coolie-zombies.png' },
  { name: 'Lioner', area: 'El Nath / Orbis', level: '50–60', category: 'prequest', prequest: 'zakum', drops: 'Lion King Certificate', tip: 'Longest Zakum prequest farm — need 50 certificates. Be patient.', mapImage: 'assets/images/maps/gallopera.png' },
  { name: 'Coolie Zombie', area: 'El Nath Graveyard', level: '50–70', category: 'training', tip: 'Solid solo EXP if OPQ party is hard to find. Slower than Galloperas.', mapImage: 'assets/images/maps/coolie-zombies.png' },
  { name: 'Miner Zombie', area: 'El Nath Graveyard', level: '52–72', category: 'training', tip: 'Often trained alongside Coolie Zombies in the graveyard maps.', mapImage: 'assets/images/maps/coolie-zombies.png' },
  { name: 'Gallopera', area: 'Orbis Stairway', level: '70–85', category: 'training', tip: 'Best EXP and mesos at this range. Maps can be crowded — compete for spots.', mapImage: 'assets/images/maps/gallopera.png' },
  { name: 'Dual Birk', area: 'Orbis Stairway', level: '72–85', category: 'training', tip: 'Trained with Galloperas on Stairway to the Sky platforms.', mapImage: 'assets/images/maps/gallopera.png' },
  { name: 'Ludibrium Clock Mobs', area: 'Ludibrium Clocktower', level: '85+', category: 'prequest', prequest: 'papulatus', tip: 'Farm clock parts during Papulatus prequest. Talk to Tory to start.', mapImage: 'assets/images/maps/papulatus-arena.png' },
  { name: 'Red / Blue / Dark Wyvern', area: 'Leafre — Dragon Forest', level: '100–120', category: 'training', tip: 'Newts area. Top solo EXP before Neo Tokyo. Start HT prequest at 120.', mapImage: 'assets/images/maps/leafre-newts.png' },
  { name: 'Skelegon / Skelosaurus', area: 'Leafre', level: '110–120', category: 'training', tip: 'Party training — best EXP/hour with Bishop HS and strong DPS.', mapImage: 'assets/images/maps/leafre-dragons.png' },
  { name: 'Leafre Dragon Mobs', area: 'Leafre — Dragon Forest', level: '100–120', category: 'prequest', prequest: 'horntail', tip: 'Horntail prequest drops come from Dragon Forest mobs. Start Eurek questline at 120.', mapImage: 'assets/images/maps/leafre-newts.png' },
  { name: 'Yakuza Member / Gangster', area: 'Neo Tokyo', level: '120+', category: 'training', prequest: 'neo-tokyo', tip: 'NT training mobs after prequest. Hit hard — bring potions.', mapImage: 'assets/images/maps/neo-tokyo.png' },
  { name: 'Temple of Time Mobs', area: 'Temple of Time', level: '140+', category: 'prequest', prequest: 'pinkbean', tip: 'Path of Time questline mobs. Long chain — start the day you hit 140.', mapImage: 'assets/images/maps/pink-bean-temple.png' },
  { name: 'Zakum Arms / Body', area: 'Cave of Life', level: '50+', category: 'boss', tip: 'Kill all 8 arms before the body spawns. First helmet drop is huge.', mapImage: 'assets/images/maps/zakum-arena.png' },
  { name: 'Papulatus', area: 'Ludibrium Clocktower', level: '85+', category: 'boss', tip: 'Kill mini clocks in Phase 1 — they heal the boss. Pendant is BiS until HT.', mapImage: 'assets/images/maps/papulatus-arena.png' },
  { name: 'Horntail', area: 'Leafre — Cave of Life', level: '120+', category: 'boss', tip: 'Left head → right head → body. Bishop + DK mandatory. Seduce on body.', mapImage: 'assets/images/maps/horntail-arena.png' },
  { name: 'Pink Bean', area: 'Temple of Time', level: '140+', category: 'boss', tip: 'Kill all 4 statues at once. Hardest boss — Hat and Suit are BiS.', mapImage: 'assets/images/maps/pink-bean-temple.png' },
  { name: 'Krexel', area: 'Singapore — Ulu City', level: '140', category: 'boss', prequest: 'krexel', tip: 'Two runs/day. Soul Lantern + Mallet required. Lantern is tradable.', mapImage: 'assets/images/maps/world-map.png' },
  { name: 'Scarlion / Targa', area: 'Malaysia — Fantasy Theme Park', level: '140', category: 'boss', prequest: 'scar-targa', drops: 'Scarlion/Targa Helmet', tip: 'Party of 3. Use Spirit of Fantasy Theme Park at Spooky World.', mapImage: 'assets/images/maps/gallopera.png' },
  { name: 'Captain Latanica', area: 'Singapore — Ghost Ship', level: '70+', category: 'prequest', prequest: 'krexel', drops: 'Soul Lantern', tip: 'Krexel prequest boss. Lantern tradable — buy in FM to skip.', mapImage: 'assets/images/maps/world-map.png' },
  { name: 'Pianus', area: 'Aqua Road — Cave of Pianus', level: '110', category: 'boss', tip: 'Channel spawn boss. 24h/36h respawn. Drops Miniature Pianus & mastery books.', mapImage: 'assets/images/maps/world-map.png' },
  { name: 'Jr. Balrog', area: 'Cursed Sanctuary', level: '80', category: 'boss', tip: 'Area boss — 3h respawn. Good practice before Pianus.', mapImage: 'assets/images/maps/coolie-zombies.png' },
  { name: 'Crimsonwood Mobs', area: 'Masteria — Crimsonwood', level: '90+', category: 'prequest', prequest: 'cwk', drops: 'Crimson Hearts', tip: 'Farm Crimson Hearts for expedition signup. Hearts are tradeable.', mapImage: 'assets/images/maps/world-map.png' },
];

const GLOSSARY_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'training', label: 'Training' },
  { id: 'prequest', label: 'Prequest' },
  { id: 'boss', label: 'Boss' },
];
