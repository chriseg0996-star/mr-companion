// Detailed boss fight walkthroughs — shown in Bosses → Fight tab.
const BOSS_FIGHT_GUIDES = {
  zakum: [
    { title: 'Party comp & prep', detail: 'Bishop is strongly recommended — arms cast 1/1 attacks that bypass normal HP. A Dark Knight with Hyper Body helps melee meet the ~7,000 HP requirement. Everyone should have ~2,000+ weapon range and a full inventory of Power Elixirs; you cannot leave mid-run to restock.' },
    { title: 'Summoning Zakum', detail: 'Complete the prequest and enter Cave of Life with your party. Light all five torches in the cave, then use the Eye of Fire on the altar. Zakum spawns with eight arms surrounding the body — the body is invulnerable until every arm is dead.' },
    { title: 'Phase 1 — Eight arms', detail: 'Assign each arm to a party member so kills happen in parallel. Arms hit extremely hard and can 1/1 — spread out, pot aggressively, and keep Bishop healing on cooldown. Do not touch the body yet; it will not take damage while any arm lives. Clear all eight before moving on.' },
    { title: 'Phase 2 — Zakum body', detail: 'Once arms are down, focus the body. Zakum still hits hard and can seduce — watch your HP bar and rebuff if dispelled. Melee stack on the body platform; ranged stay on safe ledges. The run ends when the body dies — loot the Zakum Helmet from the ground.' },
  ],
  papulatus: [
    { title: 'Party comp & prep', detail: 'Bring Bishop for sustain and a funded party (~3,500+ range, ~7,000 HP). Save burst skills (snipe, blast, etc.) for Phase 2. Power Elixirs are essential — Phase 2 hits much harder than Phase 1.' },
    { title: 'Phase 1 — Main body & mini clocks', detail: 'Papulatus spawns in the Clocktower arena. Mini clocks spawn throughout the fight and heal Papulatus if left alive — assign one fast DPS to kill clocks immediately while the rest DPS the boss. Phase 1 is manageable if clocks are controlled; letting them stack turns the fight into a heal check.' },
    { title: 'Phase 2 — The core', detail: 'When the outer body dies, the core appears in the center. This phase hits significantly harder — everyone pots on rhythm and Bishop keeps the party topped. Burn the core quickly with saved cooldowns. Standing on the bottom platform is common for melee; ranged use side platforms.' },
    { title: 'Loot', detail: 'Papu Pendant drops from the core — one of the best accessories before Horntail. Pick up scrolls and mesos before leaving via the NPC portal.' },
  ],
  horntail: [
    { title: 'Mandatory roles', detail: 'Bishop (Heal + dispel) and Dark Knight (Hyper Body) are effectively required for a clean run. Party of up to 6, ~15,000 HP with HB, ~8,000+ range. Stock hundreds of pots — seduce and 1/1 attacks are common on the main body.' },
    { title: 'Left & right heads first', detail: 'Horntail has three heads plus a main body. Kill the left and right heads before focusing the main body — they continue attacking and complicate the body phase if left alive. Assign dedicated DPS to each head so both die around the same time.' },
    { title: 'Main body — seduce & 1/1', detail: 'The main body is the hardest part. Seduce can drain your HP bar instantly if you are not watching — jump or use All Cure immediately. Arms and heads may still attack; keep Bishop healing and DK rebuffing HB. Pin the body on the left platform if your comp uses puppet/Bahamut.' },
    { title: 'Loot', detail: 'Horntail Necklace and up to three Horntail Rings drop — all BiS for mid-game. Grab scrolls before exiting through the portal.' },
  ],
  pinkbean: [
    { title: 'Endgame comp', detail: 'Hardest boss in v83 Royals. Bishop + Dark Knight mandatory. Full party ~25,000 HP with HB, ~20,000+ range. Bring 300+ Power Elixirs minimum. Assign rebuffers — dispel is constant in later phases.' },
    { title: 'Four statues — simultaneous kill', detail: 'Four statues spawn at the start. They must die at roughly the same time — if you kill them one by one, the survivors revive the dead ones. Split party 4-way or pair DPS so all four reach low HP together, then call a burst sync to finish them at once.' },
    { title: 'Pink Bean phase 1', detail: 'After statues, Pink Bean enters. High damage, knockback, and status effects — stay on known safe platforms. Bishop keeps heal up; DK maintains HB. Dispel hits often — have SE, MW, or Hyper Body rebuffers assigned.' },
    { title: 'Pink Bean phase 2 & loot', detail: 'Second form hits even harder with more AoE. Burn remaining pots and cooldowns. On clear, Pink Bean Hat, Suit, and Cape drop — all BiS endgame gear plus massive meso piles. Do not leave without looting.' },
  ],
  toad: [
    { title: 'Entry', detail: 'Complete Neo Tokyo prequest and Castellan questline. Party of exactly 3 talks to the NPC at Akihabara Clock Tower to enter. One attempt per day once unlocked.' },
    { title: 'The fight', detail: 'Castellan Toad is the easiest Neo Tokyo boss — straightforward HP burn with moderate touch damage (~8,000+ HP safe). Tight map but no complex mechanics. Bishop helps but is not mandatory for a funded trio.' },
    { title: 'Loot & progression', detail: 'Solid scroll and meso income while training in NT. Use this as your intro boss before Vergamot and Dunas — learn party coordination and daily NT routing here.' },
  ],
  vergamot: [
    { title: 'Entry', detail: 'Neo Tokyo prequest plus Ponicher expedition quests (130+). Party of 3 summons Vergamot at the Vergamot Core and enters. Repeatable daily once unlocked.' },
    { title: 'Boss room', detail: 'Vergamot hits harder than Toad with more AoE in a tight arena. Bishop strongly recommended for sustain. Funded party with ~12,000+ HP. Pin or kite depending on comp — no special phase mechanics, but damage ramps up below half HP.' },
    { title: 'Loot', detail: 'Equipment, scrolls, ores, and mesos — good income between Pink Bean farming and Dunas progression.' },
  ],
  dunas: [
    { title: 'Entry', detail: 'Complete Dunas expedition quests (start at 138+, 152 recommended). Party of 3 enters Akihabara Command Room. Hyper Body helps melee meet touch damage.' },
    { title: 'The fight', detail: 'Dunas is the hardest standard NT boss before Nibergen and Dunas v2. Expect high touch damage (~15,000+ HP with HB), seal attacks, and long HP bar. Bishop sustain is near-mandatory. Burn steadily — do not panic pot early or you will run dry.' },
    { title: 'After Dunas', detail: 'Progression continues to Nibergen (158) then Dunas v2 (164). Farm here for mesos and scrolls while building funding for the harder NT bosses.' },
  ],
  nibergen: [
    { title: 'Entry', detail: 'Complete Cradle to the Future questline (141+). Party of 3 summons Nibergen in Tokyo Skies. Strong EXP boss — stay within ~5 levels for full EXP.' },
    { title: 'Mechanics', detail: 'Weapon cancel and knockback in a tight sky map. Stand on stable platforms and avoid edges. Bishop for heal and Holy. ~11,000+ HP survives most hits. Kill adds if they block your platform.' },
    { title: 'Loot', detail: 'Excellent EXP plus equipment and scroll drops. Run after Dunas v1, before Nameless Magic Monster in the storyline order.' },
  ],
  'nameless-magic-monster': [
    { title: 'PQ entry', detail: 'Neo Tokyo storyline after Nibergen — Asia sends you to a short PQ. Party of 3 enters the arena. Destroy the crystal in the room to spawn the boss.' },
    { title: 'The fight', detail: 'Stationary boss like a mini Scarlion — minimal movement required. Lightning weakness means I/L mages excel. Safe platform on top avoids most damage; ~8,000 HP survives all hits (~7,500 magic / 8k touch). Simple burn phase.' },
    { title: 'Loot', detail: 'White Scroll Fragment A, Achilles 30, Chain Lightning 30, belt scrolls — valuable drops for endgame funding.' },
  ],
  'dunas-v2': [
    { title: 'Entry', detail: 'Finish I\'m Going to Stop It! questline. Party of 3 talks to Adult Dida in Shibuya — fight starts immediately with no separate summon step.' },
    { title: 'Two targets — ship unit first', detail: 'Dunas v2 fight has two parts: a ship unit and Dunas v2 body. The body is immune until the ship unit is destroyed. Focus the ship first while managing Imperial Guards — they respawn constantly. Pin guards with a mule or Bishop on one side of the map.' },
    { title: 'Dunas v2 body', detail: 'Dispel, stun, and darkness hit often — All Cures essential. High touch damage; HB and Bishop mandatory. White Scroll Fragment is the main valuable drop — do not miss loot on the ground.' },
  ],
  'auf-haven': [
    { title: 'Expedition overview', detail: 'Full multi-stage expedition after Dunas v2 storyline: Royal Guard → elevator JQ → Core Blaze → four monster waves → Cursed Auf Haven → Auf Haven boss. Party 1–6, fully funded endgame. One attempt per day.' },
    { title: 'Royal Guard & chandelier', detail: 'Drop the chandelier on Royal Guard for ~25m damage. Party must stand under the chandelier to aggro correctly. Do not skip positioning — this phase wipes underfunded groups.' },
    { title: 'Elevator JQ & Core Blaze', detail: 'Complete the elevator jump quest as a party. Core Blaze spawns Bishop Doom — avoid Maverick knockback into the boss (26k+ touch). Assign someone to handle dooms and rebuff.' },
    { title: 'Monster waves', detail: 'Four waves of adds between Core Blaze and the final boss. Clear efficiently without burning all pots — save resources for Auf Haven itself.' },
    { title: 'Auf Haven — pin & mini spawns', detail: 'Warrior MUST pin boss on the left — Rush no longer works on Royals. Summoned Auf Haven spawns at 70%, 50%, and 30% HP — kill each mini immediately; the third spawn zombifies if ignored. NLs with 19k+ HP can DPS from middle platforms safely.' },
  ],
  'von-leon': [
    { title: 'Comp planning', detail: 'Best EXP/HP ratio in the game — plan comp before entering. Up to 6 players, ~18,000+ HP, top-funded damage. No touch damage on VL himself, but mechanics can still 1HKO. Two runs per week (resets Monday server time).' },
    { title: 'Phase 1 — 1B HP burn', detail: 'Straightforward DPS phase. Duck under Vulture Shout when announced. Assign shot caller, res/TL/smoke order, and Aerial Prison roles before pull.' },
    { title: 'Phase 2 — Dispel & golems', detail: 'Dispel hits constantly — rebuffers assigned. Demon Gargoyles and Mini Castle Golems spawn; VL heals from live golems. Always clear adds before resuming boss DPS.' },
    { title: 'Phase 3 — Eye laser & golems', detail: 'Jump Eye Laser in phase 3 — standing in the beam is a 1HKO. Golems continue spawning; same rule — clear adds, then boss. Golem Drop from above is also 1HKO — watch the sky.' },
    { title: 'Bonus room & loot', detail: 'After clear, bonus room opens — chaos scrolls, white scrolls, Von Leon\'s Boots. Main drops: Belt, Medallion, Parchment, Hero\'s Will 10, royal forging manuals.' },
  ],
  'king-castle-golem': [
    { title: 'Daily quest', detail: 'Accept Daily Rose Garden quest (requires Von Leon prequest). Quick fight — best EXP/HP ratio in v83. Party 1–6, ~6,000+ HP, mid-funded damage.' },
    { title: 'The fight', detail: 'Holy weakness — Bishop and Paladin shine. Clear mini Garden Golems so they do not block movement. Straightforward burn on the King Castle Golem.' },
    { title: 'Bonus — Golden Bees', detail: 'Buy a Bug Catching Net (5m meso) before the run. Bonus stage spawns Golden Bees — catch them for Shiny Powder, sold to NPC for profit. Pairs well with Von Leon runs on LKC days.' },
  ],
  'the-boss': [
    { title: 'Starting the expedition', detail: 'Farm Female Boss\' Comb from Anego. At Ninja Castle Armory, drop the comb under the right window to start. Party 1–6, Bishop mules recommended for Bodyguard A.' },
    { title: 'Bodyguard A — fire weak', detail: 'First sub-boss. ~28,000 HP safe for melee — three Bishop Holy Shield mules are the standard strategy. Fire weakness helps FP/BM. Burn quickly before MP drain stacks.' },
    { title: 'Bodyguard B — ice weak', detail: 'Ice weak — I/L strong. ~13k touch on rocket attack; MP drain is dangerous. Pot through rockets and keep DPS uptime on safe platforms.' },
    { title: 'The Boss — fire weak, seal', detail: 'Final form: fire weak, seal attacks, purple rain and blue tornado (1/1). Highest damage phase — save pots and cooldowns. Strong EXP — third best full run behind Von Leon and Horntail.' },
  ],
  cwk: [
    { title: 'Expedition setup', detail: '10–30 player expedition. Leader needs 12 Crimson Hearts to register. Party needs at least 2 of each job branch for class trial stages. Assign roles before entering.' },
    { title: 'Class trial stages 1–5', detail: 'Each stage tests a different branch — warriors, mages, archers, thieves, pirates. Know your stage assignment before pull. Failure on a stage can stall the entire expedition.' },
    { title: 'Twisted Masters — melee floor', detail: 'Summon Twisted Masters on the bottom floor. Pin melee bosses bottom-left; ranged bosses on top platforms. Margana (mage boss) is weak to Holy — Paladins excel. Bishop dispels Weapon DEF Up on Margana.' },
    { title: 'Top floor & bonus armory', detail: 'Ranged bosses on upper platforms — assign dedicated platform DPS. After all bosses die, clear the bonus armory for mastery books, Naricain Demon Elixir, Mark of Naricain, and elemental gear.' },
  ],
  'capt-latanica': [
    { title: 'Summoning', detail: 'Complete Ralph questline in Boat Quay for White Essence. Enter Singapore Engine Room and drop essence at the middle door to summon. Unlimited attempts (essence is the gate).' },
    { title: 'The fight', detail: 'Holy weakness — Bishop/Paladin strong. Capt. Latanica heals and summons Selkie Jr. & Anchor — kill adds quickly or burst the boss through heals. ~3,800+ HP, mid-range party.' },
    { title: 'Why run', detail: 'Soul Lantern drop is required for Krexel prequest (tradable ~6–9m in FM if you skip the farm).' },
  ],
  krexel: [
    { title: 'Entry', detail: 'Bring Soul Lantern + Mallet from the long Boat Quay → Latanica → Ulu City questline. Party 1–6, two attempts per day. ~2,500+ HP.' },
    { title: 'The fight', detail: 'Clear adds in the tight boss room, then burn Krexel. Bishop for heal recommended. No complex phases — straightforward daily for scrolls and mesos between Pap and Horntail.' },
  ],
  shaolin: [
    { title: 'Entry', detail: 'Complete Shaolin Temple prequest (from 120, fight at 150). Party talks to Dharma Scroll on Floor 7 — fight starts immediately.' },
    { title: 'Clones', detail: 'Wu-Ling Yaoseng summons 3 clones at 25m HP each. Pin with Bishop Bahamut or doom, or ignore if warriors have Bullseye. Ice weakness — I/L mages strong. ~12,000+ HP.' },
    { title: 'Main boss & loot', detail: 'Kill the real Yaoseng after handling clones. Excellent EXP/HP daily. Drops 5k NX Card, mastery books, Holy Charge 20, Chain Lightning 20, Assassinate 20.' },
  ],
  scarlion: [
    { title: 'Entry', detail: 'Complete Lam questline in Kampung Village. Use Spirit of Fantasy Theme Park at Spooky World to summon. Party of exactly 3 to enter.' },
    { title: 'The fight', detail: 'Scarlion is a stationary boss — stand on the safe platform and burn. ~8,000+ HP. Share prequest with Targa; you can run both same day (2 attempts each).' },
    { title: 'Loot', detail: 'Scarlion Helmet is a strong upgrade before Horntail gear — check FM prices.' },
  ],
  targa: [
    { title: 'Entry', detail: 'Same Lam prequest as Scarlion. Use Spirit at Spooky World, party of 3 enters. Often run back-to-back with Scarlion.' },
    { title: 'The fight', detail: 'Similar to Scarlion — platform safety, funded DPS, ~8,000+ HP. Kill and loot Targa Helmet.' },
  ],
  'black-crow': [
    { title: 'Finding the boss', detail: 'Area boss in Mu Lung temple — no prequest. Sweep channels at Encounter with the Buddha until you find a live spawn. Magic attacks hit ~8.2k — less touch-focused than Bigfoot.' },
    { title: 'The fight', detail: 'Camp the spawn with a funded party. Kill before other hunters KS — use map ownership if contested. Straightforward burn once found.' },
  ],
  bigfoot: [
    { title: 'Finding the boss', detail: 'Area boss in Masteria Forgotten/Twisted Path. ~12k touch — Hyper Body or high funding required. Register map ownership (~mapowner) to protect your spawn. Highly contested.' },
    { title: 'The fight', detail: 'Once spawned, burn quickly — other parties will compete. Stand on platforms when possible. Record KS if needed per Royals T&C.' },
  ],
  chao: [
    { title: 'Entry', detail: 'Complete long Ellin Forest prequest (requires Pap, 110+). Party enters left portal at Rock Mountain Cave — fight starts immediately. Two attempts per day.' },
    { title: 'The fight', detail: 'Fire & Holy weakness — Bishop/Paladin excel. Super knockback — do not stand at map edges. Primitive Boars summon — clear adds or burst through. ~3,300+ HP.' },
    { title: 'Loot', detail: 'Chao\'s Tusk required for Ephenia prequest. Also drops Yellow Snow Shoes, Earring STR 30%, Ellin Crystal, NX Cards.' },
  ],
  ephenia: [
    { title: 'Entry', detail: 'Requires Pap + Chao prequests. Top-right portal at Fairy Forest 3. Party fight, two attempts per day. ~4,100+ HP.' },
    { title: 'The fight', detail: 'Fire & Holy weakness. Poison mist, zombify, confusion — bring All Cures. Ancient & Shining Fairies summon — clear strategically or ignore if on safe platform. Burn Ephenia and return to Perzen for Guardian Medal.' },
  ],
  anego: [
    { title: 'Finding the boss', detail: 'Area boss in Zipangu Parlor. Camp channels — highly contested. Lightning & Holy weakness. ~12k touch, ~18k on slap attack.' },
    { title: 'The fight', detail: 'Kill for Female Boss\' Comb — required for The Boss expedition daily. Bring pots and burst — other parties compete for the spawn.' },
  ],
  'kacchuu-musha': [
    { title: 'Finding the boss', detail: 'Spawns in Zipangu Castle Corridor (9). No prequest. ~10.9k touch and magic — Hyper Body helps ranged. Does not jump on Royals — use puppet pin or duo with DK.' },
    { title: 'The fight', detail: 'Kill for Samurai Knight Armor Piece / fragment needed for Castellan Toad access. Same Zipangu area as Anego — camp multiple bosses while sweeping channels.' },
  ],
  leviathan: [
    { title: 'Finding the boss', detail: 'Hidden street in Leafre — Leviathan\'s Canyon. Popular to camp because spawns return relatively quickly. Often contested in Leafre channels.' },
    { title: 'The fight', detail: '~8,000+ HP, funded party. Straightforward area boss burn. Pair with Dragon Forest training while waiting for spawns.' },
  ],
  pianus: [
    { title: 'Finding the boss', detail: 'Channel spawn in Aqua Road — Cave of Pianus. Left and Right Pianus are separate spawns with different timers. Sweep channels; one of the most camped bosses on Royals.' },
    { title: 'Avoiding the bomb', detail: 'Pianus bomb hits ~10k — stand on platforms when the bomb animation plays. Do not stand on the bottom floor during bomb phase.' },
    { title: 'Kill & loot', detail: 'Kill Left or Right depending on which spawned. Drops Miniature Pianus (Hero\'s Will / Ninja Ambush quests), mastery books 20/30, equipment, scrolls. Right Pianus drops valuable Mastery Book 30.' },
  ],
  'jr-balrog': [
    { title: 'Finding the boss', detail: 'Area boss in Victoria Cursed Sanctuary. Good intro to area bosses before Pianus. Check channels every few hours.' },
    { title: 'The fight', detail: 'Magic attacks hit ~2.7k — bring pots. Often soloable with decent funding at 80+. Straightforward burn once spawned.' },
  ],
};
