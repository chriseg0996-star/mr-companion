// Community forum guides — curated links with page cross-references

const FORUM_GUIDES = [
  {
    category: 'Leveling',
    guides: [
      {
        label: '2025 Leveling Guide',
        url: 'https://royals.ms/forum/threads/2025-leveling-guide.157840/',
        icon: '📈',
        desc: 'Solo grind path 1–200 with EXP notes — Becca GM',
        page: 'leveling',
      },
      {
        label: 'Leeching Guide (2022)',
        url: 'https://royals.ms/forum/threads/leeching-guide-updated-2022-goby-guide-included.145533/',
        icon: '💸',
        desc: 'Mob leech maps, goby method, boss leech — Jooon',
        page: 'leeching',
        companionPage: 'leeching',
      },
    ],
  },
  {
    category: 'Bosses',
    guides: [
      {
        label: "Zancks Bossing Guide",
        url: 'https://royals.ms/forum/threads/zancks-bossing-guide.196246/',
        icon: '💀',
        desc: 'HP, EXP, and mechanics for every boss',
        page: 'bosses',
      },
      {
        label: 'All Area Bosses',
        url: 'https://royals.ms/forum/threads/all-area-bosses-in-mapleroyals.380/',
        icon: '📍',
        desc: 'Pianus, Bigfoot, Anego — spawn times and channels',
        page: 'bosses',
      },
    ],
  },
  {
    category: 'Skills & Jobs',
    guides: [
      {
        label: "Zancks Mastery Book Guide",
        url: 'https://royals.ms/forum/threads/zancks-4th-job-skill-mastery-book-guide.16552/',
        icon: '📕',
        desc: '4th job skill unlocks and mastery book drops by class',
        page: 'jobadv',
      },
    ],
  },
  {
    category: 'Items',
    guides: [
      {
        label: 'Godly Items Explained',
        url: 'https://royals.ms/forum/threads/godly-items-explained.1312/',
        icon: '✨',
        desc: '1-in-20 bonus stats, color tiers — check before NPCing',
        page: 'items',
      },
    ],
  },
  {
    category: 'More',
    guides: [
      {
        label: 'Guide to Neo Tokyo',
        url: 'https://royals.ms/forum/threads/guide-to-neo-tokyo.146864/',
        icon: '🗼',
        desc: 'NT prequest, bosses, and expeditions',
        page: 'prequests',
      },
      {
        label: 'Von Leon Prequest',
        url: 'https://royals.ms/forum/threads/lhc-lkc-pre-quest-guide.207734/',
        icon: '🦁',
        desc: 'LHC/LKC chain through Is there any hope?',
        page: 'prequests',
      },
    ],
  },
];

const GODLY_ITEMS_SUMMARY = {
  url: 'https://royals.ms/forum/threads/godly-items-explained.1312/',
  chance: '1 in 20 on any equip drop, gachapon, or forge',
  bonus: '+0 to +5 per stat (equal chance each) — only positive',
  warning: 'Not always a blue glow. Compare stats to average before NPCing.',
  tiers: [
    { color: 'Grey', rule: 'Total stats −1 or below average' },
    { color: 'White', rule: 'Unscrolled, 0 to +5 above average' },
    { color: 'Orange', rule: 'Scrolled, 0 to +5 above average' },
    { color: 'Blue', rule: '+6 to +22 above average' },
    { color: 'Purple', rule: '+23 to +39 above average' },
    { color: 'Yellow', rule: '+40 or more above average' },
  ],
};
