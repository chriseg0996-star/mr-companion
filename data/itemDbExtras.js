// Additional item checker entries — merged into ITEM_DB at load

Object.assign(ITEM_DB, {
  // Area boss drops
  'miniature pianus': { verdict: 'keep', reason: 'Used for Hero\'s Will and Ninja Ambush quests. Buy 2–4 in FM if not farming Pianus.', tags: ['boss drop', 'quest', 'tradeable'] },
  'mastery book 20': { verdict: 'fm', reason: 'Skill book — check FM price. Value varies wildly by skill.', tags: ['mastery book', 'boss drop'] },
  'mastery book 30': { verdict: 'keep', reason: 'Rare 4th job books are valuable. Check Sylafia before selling.', tags: ['mastery book', 'boss drop', 'rare'] },
  // Common FM gear & scroll targets
  'bathrobe': { verdict: 'fm', reason: 'INT overall for washing. Buy clean or with INT for cheap.', tags: ['armor', 'mage', 'int gear'] },
  'rag cape': { verdict: 'fm', reason: 'Cheap INT cape for washing. Scroll or sell.', tags: ['cape', 'int gear'] },
  // VIP & endgame references
  'vip zakum helmet': { verdict: 'keep', reason: 'Endgame helm — never vendor. Check Sylafia FM price.', tags: ['helmet', 'endgame', 'vip'] },
  'vip horntail necklace': { verdict: 'keep', reason: 'BiS necklace variant. Never sell.', tags: ['necklace', 'endgame', 'vip'] },
  'vip horntail pendant': { verdict: 'keep', reason: 'Strong pendant. Keep for your main.', tags: ['pendant', 'endgame', 'vip'] },
  // PQ & event consumables
  'taru spirit': { verdict: 'fm', reason: 'LPQ material. Sell in FM or NPC.', tags: ['pq drop', 'material'] },
  'gelt chocolate': { verdict: 'fm', reason: 'CWKPQ / event consumable. Sells in FM.', tags: ['consumable', 'pq drop'] },
  'banana graham pie': { verdict: 'fm', reason: 'CWKPQ bonus drop. FM or use for buff.', tags: ['consumable', 'pq drop'] },
  // Ores & etc (more)
  'bronze ore': { verdict: 'vendor', reason: 'Low-value ore. Vendor to NPC.', tags: ['ore'] },
  'steel ore': { verdict: 'vendor', reason: 'Low-value ore. Vendor to NPC.', tags: ['ore'] },
  'power crystal': { verdict: 'vendor', reason: 'Common ore. Vendor unless crafting.', tags: ['ore', 'crystal'] },
  'black crystal': { verdict: 'fm', reason: 'Rarer crystal — check FM before vending.', tags: ['ore', 'crystal'] },
  // Stars (more tiers)
  'hwabi throwing stars': { verdict: 'keep', reason: 'High-tier NL stars. Keep if maining NL.', tags: ['stars', 'thief', 'endgame'] },
  'snowball': { verdict: 'vendor', reason: 'Low-tier stars. Vendor after upgrading.', tags: ['stars', 'starter'] },
  'mokbi throwing stars': { verdict: 'vendor', reason: 'Starter stars. Vendor once upgraded.', tags: ['stars', 'starter'] },
  // Skill unlock mats
  'documents': { verdict: 'keep', reason: 'Quest / skill unlock item. Do not vendor if questing.', tags: ['quest', 'etc'] },
  'squid ink': { verdict: 'vendor', reason: 'Common Aqua Road drop. Vendor unless questing.', tags: ['mob drop', 'etc'] },
  'pure water': { verdict: 'vendor', reason: 'Common etc drop. Vendor to NPC.', tags: ['mob drop', 'etc'] },
});

/** Merge Sylafia PRICE_DB entries not already in ITEM_DB with sensible defaults. */
function hydrateItemDbFromPrices() {
  if (typeof PRICE_DB === 'undefined') return;
  for (const [key, meta] of Object.entries(PRICE_DB)) {
    if (ITEM_DB[key]) continue;
    const cat = meta.category || '';
    let verdict = 'fm';
    let reason = 'Listed in Sylafia\'s FM guide — check price before vending.';
    let tags = [cat || 'fm'];
    if (cat === 'scroll' || /\bscroll\b/.test(key) || / for /.test(key)) {
      verdict = 'keep';
      reason = 'Scrolls are valuable — never vendor to NPC. Use, sell in FM, or white scroll.';
      tags = ['scroll'];
    } else if (cat === 'use-item' || /^(genesis|blizzard|hurricane|meteor|brandish|rush|snipe)/.test(key)) {
      verdict = 'keep';
      reason = 'Skill/mastery book — check FM value; many are expensive.';
      tags = ['mastery book', 'skill'];
    } else if (cat === 'gear') {
      verdict = 'fm';
      reason = 'Gear with FM listing — compare to your current equipment before selling.';
      tags = ['gear'];
    } else if (cat === 'consumable') {
      verdict = 'fm';
      reason = 'Consumable with FM demand — check Sylafia price.';
      tags = ['consumable'];
    } else if (cat === 'etc') {
      verdict = 'fm';
      reason = 'Etc item with FM value — check before vending.';
      tags = ['etc'];
    }
    ITEM_DB[key] = { verdict, reason, tags };
  }
}

if (typeof PRICE_DB !== 'undefined') hydrateItemDbFromPrices();
