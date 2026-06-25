# MapleRoyals Companion

A companion web app for MapleRoyals (v83 private server) built for The Clinic Discord server.
Deploy on GitHub Pages and share the link with your friends.

## Project Structure

```
mr-companion/
├── index.html              ← main app, edit HTML structure here
├── css/
│   └── style.css           ← all styling, SONOCRITICO dark theme
├── js/
│   └── app.js              ← all app logic and render functions
├── data/
│   └── gameData.js         ← all game data (items, bosses, levels, etc.)
└── assets/
    └── images/
        ├── bosses/         ← drop boss images here (zakum.png, etc.)
        ├── classes/        ← drop class icons here (warrior.png, etc.)
        └── ui/             ← drop UI images here (banner.png, etc.)
```

## Features

1. Item Checker — keep / FM / vendor verdict
2. Boss Guides — Zakum, Pap, Horntail, Pink Bean
3. Leveling 1-200 — collapsible training spots
4. Daily Checklist — progress bar, reset
5. HP Wash Calculator — INT-based HP gain
6. Scroll Tracker — log attempts, track rate
7. Meso Tracker — income/expense log
8. Class Quiz — 4-question recommendation engine
9. Gear Roadmap — P1/P2/P3 priority by phase
10. Job Advancement — all 5 classes, all 4 jobs
11. Party Builder — 6-slot builder with analysis

## How to Add Data

All game data lives in `data/gameData.js`.
Edit that file to add items, bosses, levels, etc. without touching the logic.

### Add an item to the checker:
```js
// In data/gameData.js → ITEM_DB object
'item name here': {
  verdict: 'keep',        // 'keep', 'fm', or 'vendor'
  reason: 'Why to keep or sell this item.',
  tags: ['tag1', 'tag2']
},
```

### Add a boss:
```js
// In data/gameData.js → BOSSES array
{
  id: 'bossid',
  name: 'Boss Name',
  tier: 'early',          // 'early', 'mid', or 'late'
  level: '100+',
  respawn: '24 hours',
  party: 'Up to 6',
  hpReq: '10,000 HP',
  dmgReq: '5,000+ range',
  location: 'Location name',
  image: 'assets/images/bosses/bossid.png',
  drops: ['Drop 1', 'Drop 2'],
  prequest: 'Prequest description.',
  tips: ['Tip 1', 'Tip 2']
},
```

## How to Deploy on GitHub Pages

1. Create a new GitHub repo (e.g. `mr-companion`)
2. Upload the entire folder contents to the repo root
3. Go to Settings → Pages
4. Set Source: Deploy from branch → main → / (root)
5. Save — site will be live at `https://yourusername.github.io/mr-companion`
6. Share the link in your Discord

## Images Needed

Drop generated images into the correct folders.
Filenames must match exactly.

### Boss images (assets/images/bosses/)
- `zakum.png`
- `papulatus.png`
- `horntail.png`
- `pinkbean.png`

### Class icons (assets/images/classes/)
- `warrior.png`
- `thief.png`
- `archer.png`
- `mage.png`
- `pirate.png`

### UI (assets/images/ui/)
- `banner.png` (1200x300 hero banner)

---

## Image Generation Prompts

Use these in Gemini or ChatGPT image generation.

### Boss Portraits (512x512 each)

**Zakum:**
```
Pixel art boss portrait of Zakum from MapleStory v83.
Giant golden mummy with multiple arms, dark cave background.
Retro 2D MMORPG art style. 512x512. No text.
```

**Horntail:**
```
Pixel art boss portrait of Horntail from MapleStory v83.
Giant three-headed dragon, dark red cave background.
Retro 2D MMORPG art style. 512x512. No text.
```

**Papulatus:**
```
Pixel art boss portrait of a giant haunted clock boss
from a retro 2D MMORPG. Blue magical glow, clocktower background.
Pixel art style. 512x512. No text.
```

**Pink Bean:**
```
Pixel art boss portrait of Pink Bean from MapleStory v83.
Cute but menacing pink blob creature, Temple of Time background.
Retro 2D game art style. 512x512. No text.
```

### Class Icons (256x256 each, transparent background)

**Warrior:**
```
Pixel art icon of a dark knight warrior holding a long spear.
MapleStory v83 art style. Dark armor, red cape.
Transparent background. 256x256. No text.
```

**Thief:**
```
Pixel art icon of a night lord ninja throwing star.
MapleStory v83 art style. Dark outfit, crouching pose.
Transparent background. 256x256. No text.
```

**Archer:**
```
Pixel art icon of a bowmaster archer drawing a bow.
MapleStory v83 art style. Green outfit.
Transparent background. 256x256. No text.
```

**Mage:**
```
Pixel art icon of a bishop mage holding a glowing staff.
MapleStory v83 art style. White robes, holy light aura.
Transparent background. 256x256. No text.
```

**Pirate:**
```
Pixel art icon of a corsair pirate holding a gun.
MapleStory v83 art style. Classic pirate outfit.
Transparent background. 256x256. No text.
```

### Hero Banner (1200x300)

```
Wide pixel art landscape of Maple World from MapleStory v83.
Shows Henesys town with cherry blossom trees and blue sky.
Retro 2D MMORPG style. 1200x300. No characters. No text.
Warm nostalgic colors, peaceful atmosphere.
```

## Official Links

- Website: https://royals.ms
- Vote: https://royals.ms/vote
- Guides: https://royals.ms/forum/forums/guides.57/
- Class Guides: https://royals.ms/forum/forums/class-guides.109/
- Wiki: https://mime.royals.ms
- Item Library: https://royals-library.netlify.app
- Price Check: https://royals.ms/forum/forums/price-check.64/
