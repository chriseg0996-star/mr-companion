// Sylafia FM Price Guide — auto-generated from Google Sheets
// Source: https://docs.google.com/spreadsheets/d/1B3sxmpaW7RGrQAAxAyeR-xS4mdKCTTs_DzgV0qo2p_8
// Re-run scripts/build-prices.py to refresh

const PRICE_SOURCE = {
  name: "Sylafia's Price Guide",
  url: 'https://docs.google.com/spreadsheets/d/1B3sxmpaW7RGrQAAxAyeR-xS4mdKCTTs_DzgV0qo2p_8/edit',
};

const PRICE_DB = {
  "chaos scroll": {
    "price": "400-420m",
    "category": "scroll"
  },
  "white scroll": {
    "price": "400-420m",
    "category": "scroll"
  },
  "ap reset": {
    "price": "10.5m",
    "category": "etc"
  },
  "onyx apple": {
    "price": "7m",
    "category": "consumable"
  },
  "heartstopper": {
    "price": "370k",
    "category": "consumable"
  },
  "vip zak helm": {
    "price": "60m",
    "category": "gear"
  },
  "vip htp": {
    "price": "120-140m",
    "category": "gear"
  },
  "vip mon": {
    "price": "60-80m",
    "category": "gear"
  },
  "1h sword att": {
    "price": "600k",
    "category": "use-item"
  },
  "1h sword ma": {
    "price": "200k",
    "category": "use-item"
  },
  "1h axe att": {
    "price": "100-333k",
    "category": "use-item"
  },
  "1h blunt weapon att": {
    "price": "500k",
    "category": "use-item"
  },
  "2h sword att": {
    "price": "100k",
    "category": "use-item"
  },
  "2h axe att": {
    "price": "15-100k",
    "category": "use-item"
  },
  "2h blunt weapon att": {
    "price": "44k",
    "category": "use-item"
  },
  "spear att": {
    "price": "200k",
    "category": "use-item"
  },
  "polearm att": {
    "price": "300-450k",
    "category": "use-item"
  },
  "wand ma": {
    "price": "80k",
    "category": "use-item"
  },
  "staff ma": {
    "price": "650-800k",
    "category": "use-item"
  },
  "bow att": {
    "price": "800k",
    "category": "use-item"
  },
  "crossbow att": {
    "price": "50k",
    "category": "use-item"
  },
  "claw att": {
    "price": "2m",
    "category": "use-item"
  },
  "dagger att": {
    "price": "30-50k",
    "category": "use-item"
  },
  "knuckle attack": {
    "price": "40k",
    "category": "use-item"
  },
  "gun attack": {
    "price": "50k",
    "category": "use-item"
  },
  "helmet for dex": {
    "price": "1.3m",
    "category": "scroll"
  },
  "maple warrior": {
    "price": "1.468b",
    "category": "consumable"
  },
  "helmet for accuracy": {
    "price": "9-11m",
    "category": "scroll"
  },
  "hero's will 10": {
    "price": "1.3b",
    "category": "consumable"
  },
  "helmet for int": {
    "price": "5-6m",
    "category": "scroll"
  },
  "genesis": {
    "price": "230m",
    "category": "consumable"
  },
  "auf circlet for str": {
    "price": "20-30m",
    "category": "scroll"
  },
  "auf circlet for dex": {
    "price": "10m",
    "category": "scroll"
  },
  "auf circlet for int": {
    "price": "6m",
    "category": "scroll"
  },
  "infinity": {
    "price": "10m",
    "category": "consumable"
  },
  "auf circlet for luk": {
    "price": "3-10m",
    "category": "scroll"
  },
  "auf circlet miracle": {
    "price": "177m",
    "category": "use-item"
  },
  "cape for str": {
    "price": "50-70k",
    "category": "scroll"
  },
  "blizzard": {
    "price": "6m",
    "category": "consumable"
  },
  "cape for dex": {
    "price": "550k",
    "category": "scroll"
  },
  "chain lightning": {
    "price": "10-15m",
    "category": "consumable"
  },
  "cape for int": {
    "price": "1-1.5m",
    "category": "scroll"
  },
  "ice demon": {
    "price": "900k",
    "category": "consumable"
  },
  "cape for luk": {
    "price": "100-150k",
    "category": "scroll"
  },
  "meteor shower": {
    "price": "3-10m",
    "category": "consumable"
  },
  "topwear for str": {
    "price": "500k",
    "category": "scroll"
  },
  "fire demon": {
    "price": "10k",
    "category": "consumable"
  },
  "topwear for luk": {
    "price": "9-11m",
    "category": "scroll"
  },
  "elquines": {
    "price": "1-3m",
    "category": "consumable"
  },
  "topwear for luk (avoid)": {
    "price": "11-12m",
    "category": "scroll"
  },
  "gloves for wa": {
    "price": "200-450k",
    "category": "scroll"
  },
  "dragon strike": {
    "price": "9-10m",
    "category": "consumable"
  },
  "gloves for ma": {
    "price": "8m",
    "category": "scroll"
  },
  "barrage": {
    "price": "20-40m",
    "category": "consumable"
  },
  "gloves for dex": {
    "price": "100k",
    "category": "scroll"
  },
  "overall for str": {
    "price": "666k",
    "category": "scroll"
  },
  "super trans": {
    "price": "5m",
    "category": "consumable"
  },
  "overall armor for dex": {
    "price": "666k",
    "category": "scroll"
  },
  "demolition": {
    "price": "200k",
    "category": "consumable"
  },
  "overall armor for int": {
    "price": "3-3.8m",
    "category": "scroll"
  },
  "overall armor for luk": {
    "price": "40-50k",
    "category": "scroll"
  },
  "elemental boost": {
    "price": "1m",
    "category": "consumable"
  },
  "bottom for dex (speed)": {
    "price": "1.5-1.7m",
    "category": "scroll"
  },
  "wrath of octopi": {
    "price": "45m",
    "category": "consumable"
  },
  "bottom for dex (acc)": {
    "price": "1.5-2.2m",
    "category": "scroll"
  },
  "bullseye": {
    "price": "2-4m",
    "category": "consumable"
  },
  "shield for wa": {
    "price": "2.5-4.5m",
    "category": "scroll"
  },
  "battleship canon": {
    "price": "2-5m",
    "category": "consumable"
  },
  "shield for ma": {
    "price": "44-45m",
    "category": "scroll"
  },
  "shoes for speed": {
    "price": "100-700k",
    "category": "scroll"
  },
  "shoes for jump": {
    "price": "600-900k",
    "category": "scroll"
  },
  "earring for str": {
    "price": "1-1.5m",
    "category": "scroll"
  },
  "earring for dex": {
    "price": "1m",
    "category": "scroll"
  },
  "monster magnet": {
    "price": "1-5m",
    "category": "consumable"
  },
  "earring for int": {
    "price": "1m",
    "category": "scroll"
  },
  "rush": {
    "price": "4m",
    "category": "consumable"
  },
  "earring for luk": {
    "price": "350-750k",
    "category": "scroll"
  },
  "adv. combo atk": {
    "price": "1m",
    "category": "consumable"
  },
  "eye for str": {
    "price": "90m",
    "category": "scroll"
  },
  "brandish": {
    "price": "1-3m",
    "category": "consumable"
  },
  "eye for dex": {
    "price": "90m",
    "category": "scroll"
  },
  "enrage": {
    "price": "20m",
    "category": "consumable"
  },
  "eye for int": {
    "price": "5-15m",
    "category": "scroll"
  },
  "berserk": {
    "price": "4m",
    "category": "consumable"
  },
  "eye for luk": {
    "price": "39m",
    "category": "scroll"
  },
  "divine charge (bw)": {
    "price": "500k",
    "category": "consumable"
  },
  "face for str": {
    "price": "45-60m",
    "category": "scroll"
  },
  "holy charge (sword)": {
    "price": "1m",
    "category": "consumable"
  },
  "face for dex": {
    "price": "27m",
    "category": "scroll"
  },
  "heaven's hammer": {
    "price": "3-10m",
    "category": "consumable"
  },
  "face for int": {
    "price": "98m",
    "category": "scroll"
  },
  "face for luk": {
    "price": "122m",
    "category": "scroll"
  },
  "sharp eyes": {
    "price": "22-25m",
    "category": "consumable"
  },
  "rings for str": {
    "price": "20m",
    "category": "scroll"
  },
  "bow expert": {
    "price": "200k",
    "category": "consumable"
  },
  "rings for dex": {
    "price": "22-25m",
    "category": "scroll"
  },
  "rings for int": {
    "price": "19-20m",
    "category": "scroll"
  },
  "rings for luk": {
    "price": "3.5-7.5m",
    "category": "scroll"
  },
  "hurricane": {
    "price": "4.5-45m",
    "category": "consumable"
  },
  "belts for str": {
    "price": "8m",
    "category": "scroll"
  },
  "belts for dex": {
    "price": "9m",
    "category": "scroll"
  },
  "frostprey": {
    "price": "100k",
    "category": "consumable"
  },
  "belts for int": {
    "price": "2-3m",
    "category": "scroll"
  },
  "marksman boost": {
    "price": "1m",
    "category": "consumable"
  },
  "belts for luk": {
    "price": "4.3-5m",
    "category": "scroll"
  },
  "snipe": {
    "price": "20m",
    "category": "consumable"
  },
  "helm for hp": {
    "price": "500k",
    "category": "scroll"
  },
  "cape for hp": {
    "price": "200k",
    "category": "scroll"
  },
  "shadow shifter": {
    "price": "6-15m",
    "category": "consumable"
  },
  "topwear for hp": {
    "price": "1.5m",
    "category": "scroll"
  },
  "gloves for hp": {
    "price": "200k",
    "category": "scroll"
  },
  "taunt": {
    "price": "3m",
    "category": "consumable"
  },
  "bottom uwu for hp": {
    "price": "150k",
    "category": "scroll"
  },
  "venemous stab/star": {
    "price": "100k",
    "category": "consumable"
  },
  "shield for hp": {
    "price": "300k",
    "category": "scroll"
  },
  "assassinate": {
    "price": "2.5-8m",
    "category": "consumable"
  },
  "earring for hp": {
    "price": "150k",
    "category": "scroll"
  },
  "eye for hp": {
    "price": "100k",
    "category": "scroll"
  },
  "smokescreen": {
    "price": "5-10m",
    "category": "consumable"
  },
  "face for hp": {
    "price": "400k",
    "category": "scroll"
  },
  "ninja storm": {
    "price": "100k",
    "category": "consumable"
  },
  "pet equip for hp": {
    "price": "5m",
    "category": "scroll"
  },
  "triple throw": {
    "price": "5-15m",
    "category": "consumable"
  },
  "clean slate 1%": {
    "price": "10-20m",
    "category": "use-item"
  },
  "clean slate 3%": {
    "price": "30-35m",
    "category": "use-item"
  },
  "clean slate 5%": {
    "price": "65-90m",
    "category": "use-item"
  },
  "clean slate 20%": {
    "price": "180m",
    "category": "use-item"
  },
  "pet equip. for speed": {
    "price": "200-250k",
    "category": "scroll"
  },
  "pet equip. for jump": {
    "price": "10k",
    "category": "scroll"
  },
  "normal witch scroll": {
    "price": "7.2-8m",
    "category": "use-item"
  },
  "krex ring": {
    "price": "40m",
    "category": "service"
  },
  "krex leech": {
    "price": "60m",
    "category": "service"
  },
  "ring + leech": {
    "price": "100m",
    "category": "service"
  },
  "no": {
    "price": "80m",
    "category": "service"
  },
  "vip zhelm": {
    "price": "60m",
    "category": "service"
  },
  "el nath pq": {
    "price": "30m",
    "category": "service"
  },
  "yes": {
    "price": "80m",
    "category": "service"
  },
  "zakum skillbooks": {
    "price": "20m",
    "category": "service"
  },
  "horntail pq (for genesis)": {
    "price": "60m",
    "category": "service"
  },
  "fame": {
    "price": "1m",
    "category": "service"
  },
  "scar helms": {
    "price": "60-70m",
    "category": "service"
  },
  "targa helms": {
    "price": "80-100m",
    "category": "service"
  },
  "scarga helms": {
    "price": "130-160m",
    "category": "service"
  },
  "auf helms": {
    "price": "60m",
    "category": "service"
  },
  "shao leech": {
    "price": "30m",
    "category": "service"
  },
  "bigfoot toe": {
    "price": "10m",
    "category": "service"
  },
  "balrog shoulder": {
    "price": "60-80m",
    "category": "service"
  },
  "taru spirit cape": {
    "price": "380-500k",
    "category": "gear"
  },
  "blackfist cloak": {
    "price": "380-500k",
    "category": "gear"
  },
  "work gloves": {
    "price": "380-500k",
    "category": "gear"
  },
  "green mittens": {
    "price": "10-13m",
    "category": "gear"
  },
  "clean": {
    "price": "1m",
    "category": "mage-gear"
  },
  "stormcaster": {
    "price": "565m",
    "category": "gear"
  },
  "7/4 fs / 6/6 rs": {
    "price": "5.3-5.5b",
    "category": "gear"
  },
  "bwg": {
    "price": "325m",
    "category": "gear"
  },
  "wa": {
    "price": "222m",
    "category": "gear"
  },
  "price": {
    "price": "3m",
    "category": "mage-gear"
  },
  "10": {
    "price": "6b",
    "category": "gear"
  },
  "11": {
    "price": "8b",
    "category": "gear"
  },
  "12": {
    "price": "8m",
    "category": "archer-gear"
  },
  "13": {
    "price": "13b",
    "category": "gear"
  },
  "14": {
    "price": "17b",
    "category": "gear"
  },
  "15": {
    "price": "2b",
    "category": "gear"
  },
  "16": {
    "price": "31b",
    "category": "gear"
  },
  "17": {
    "price": "40b",
    "category": "gear"
  },
  "18": {
    "price": "50b",
    "category": "gear"
  },
  "19": {
    "price": "40b",
    "category": "gear"
  },
  "20": {
    "price": "92b",
    "category": "gear"
  },
  "21": {
    "price": "23b",
    "category": "gear"
  },
  "22": {
    "price": "28b",
    "category": "gear"
  },
  "23": {
    "price": "2b",
    "category": "mage-gear"
  },
  "24": {
    "price": "23 b",
    "category": "gear"
  },
  "25": {
    "price": "30m",
    "category": "archer-gear"
  },
  "26": {
    "price": "310b",
    "category": "gear"
  },
  "8/4 scg": {
    "price": "2b",
    "category": "gear"
  },
  "9/4 scg": {
    "price": "4.8b",
    "category": "gear"
  },
  "see int gear prices": {
    "price": "380m",
    "category": "gear"
  },
  "1/0 or 0/1": {
    "price": "60m",
    "category": "gear"
  },
  "2 (1/1, 2/0, 0/2)": {
    "price": "90m",
    "category": "gear"
  },
  "27": {
    "price": "2b",
    "category": "mage-gear"
  },
  "28": {
    "price": "95m",
    "category": "thief-gear"
  },
  "29": {
    "price": "600m",
    "category": "gear"
  },
  "30": {
    "price": "700m",
    "category": "gear"
  },
  "33": {
    "price": "1.3b",
    "category": "gear"
  },
  "35": {
    "price": "1b",
    "category": "mage-gear"
  },
  "37": {
    "price": "1.6b",
    "category": "gear"
  },
  "2/1/2/2": {
    "price": "1- 75m",
    "category": "gear"
  },
  "1/1/2/1/3": {
    "price": "2- 89m",
    "category": "gear"
  },
  "0/0/2/2/2": {
    "price": "95m",
    "category": "gear"
  },
  "2/2/1/1": {
    "price": "1-119m",
    "category": "gear"
  },
  "1/1/1/1/2/3": {
    "price": "3- 140m",
    "category": "gear"
  },
  "2/0/2/2/2": {
    "price": "2- 155m",
    "category": "gear"
  },
  "11 str": {
    "price": "14/0",
    "category": "gear"
  },
  "1/2/1/12": {
    "price": "14/0",
    "category": "gear"
  },
  "14 str": {
    "price": "15/2",
    "category": "gear"
  },
  "1/2/0/9": {
    "price": "13/1",
    "category": "gear"
  },
  "5/2/4/9": {
    "price": "13/1",
    "category": "gear"
  },
  "0/6/0/7": {
    "price": "13/1",
    "category": "gear"
  },
  "2/0/0/14": {
    "price": "15/1",
    "category": "gear"
  },
  "0/1/1/14": {
    "price": "15/1",
    "category": "gear"
  },
  "140": {
    "price": "22b",
    "category": "thief-gear"
  },
  "141": {
    "price": "1m",
    "category": "mage-gear"
  },
  "142": {
    "price": "1-10m",
    "category": "mage-gear"
  },
  "143": {
    "price": "1.1-1.5m",
    "category": "mage-gear"
  },
  "144": {
    "price": "50m",
    "category": "mage-gear"
  },
  "145": {
    "price": "1.5m",
    "category": "mage-gear"
  },
  "146": {
    "price": "35b",
    "category": "warrior-gear"
  },
  "147": {
    "price": "2.5m",
    "category": "mage-gear"
  },
  "148": {
    "price": "8m",
    "category": "mage-gear"
  },
  "149": {
    "price": "10m",
    "category": "mage-gear"
  },
  "150": {
    "price": "15m",
    "category": "mage-gear"
  },
  "151": {
    "price": "30m",
    "category": "mage-gear"
  },
  "152": {
    "price": "50m",
    "category": "mage-gear"
  },
  "153": {
    "price": "70m",
    "category": "mage-gear"
  },
  "154": {
    "price": "90m",
    "category": "mage-gear"
  },
  "155": {
    "price": "115m",
    "category": "mage-gear"
  },
  "156": {
    "price": "141m",
    "category": "mage-gear"
  },
  "157": {
    "price": "200m",
    "category": "mage-gear"
  },
  "158": {
    "price": "250m",
    "category": "mage-gear"
  },
  "159": {
    "price": "350m",
    "category": "mage-gear"
  },
  "160": {
    "price": "415m",
    "category": "mage-gear"
  },
  "161": {
    "price": "550m",
    "category": "mage-gear"
  },
  "162": {
    "price": "690m",
    "category": "mage-gear"
  },
  "163": {
    "price": "1b",
    "category": "mage-gear"
  },
  "scrolled tma": {
    "price": "277m",
    "category": "mage-gear"
  },
  "165": {
    "price": "25m",
    "category": "mage-gear"
  },
  "167": {
    "price": "30m",
    "category": "mage-gear"
  },
  "168": {
    "price": "1b",
    "category": "mage-gear"
  },
  "170": {
    "price": "170m",
    "category": "mage-gear"
  },
  "171": {
    "price": "200m",
    "category": "mage-gear"
  },
  "172": {
    "price": "500m",
    "category": "mage-gear"
  },
  "173": {
    "price": "250m",
    "category": "mage-gear"
  },
  "174": {
    "price": "888m",
    "category": "mage-gear"
  },
  "175": {
    "price": "300m",
    "category": "mage-gear"
  },
  "176": {
    "price": "400m",
    "category": "mage-gear"
  },
  "177": {
    "price": "450m",
    "category": "mage-gear"
  },
  "178": {
    "price": "690m",
    "category": "mage-gear"
  },
  "180": {
    "price": "800m",
    "category": "mage-gear"
  },
  "181": {
    "price": "900m",
    "category": "mage-gear"
  },
  "182": {
    "price": "1b",
    "category": "mage-gear"
  },
  "183": {
    "price": "1.1b",
    "category": "mage-gear"
  },
  "184": {
    "price": "1.1b",
    "category": "mage-gear"
  },
  "186": {
    "price": "2b",
    "category": "mage-gear"
  },
  "187": {
    "price": "1.3b",
    "category": "mage-gear"
  },
  "188": {
    "price": "1.8b",
    "category": "mage-gear"
  },
  "189": {
    "price": "1.5b",
    "category": "mage-gear"
  },
  "190": {
    "price": "2b",
    "category": "mage-gear"
  },
  "191": {
    "price": "2.1b",
    "category": "mage-gear"
  },
  "192": {
    "price": "2.15b",
    "category": "mage-gear"
  },
  "199": {
    "price": "400m",
    "category": "mage-gear"
  },
  "32": {
    "price": "530m",
    "category": "mage-gear"
  },
  "34": {
    "price": "555m",
    "category": "mage-gear"
  },
  "stats (scrolled)": {
    "price": "255m",
    "category": "mage-gear"
  },
  "8 tma 4 slot": {
    "price": "14m",
    "category": "mage-gear"
  },
  "16 tma 3 slot": {
    "price": "140m",
    "category": "mage-gear"
  },
  "24 tma 2 slot": {
    "price": "405-450m",
    "category": "mage-gear"
  },
  "32 tma 1 slot": {
    "price": "1.5b",
    "category": "mage-gear"
  },
  "31": {
    "price": "1.8b",
    "category": "mage-gear"
  },
  "36": {
    "price": "7.1b",
    "category": "thief-gear"
  },
  "40": {
    "price": "3.1b",
    "category": "mage-gear"
  },
  "tma (scrolled)": {
    "price": "10/x",
    "category": "mage-gear"
  },
  "86": {
    "price": "5m",
    "category": "warrior-gear"
  },
  "87": {
    "price": "13b",
    "category": "thief-gear"
  },
  "88": {
    "price": "10b",
    "category": "pirate-gear"
  },
  "89": {
    "price": "3m",
    "category": "warrior-gear"
  },
  "90": {
    "price": "11-15m",
    "category": "warrior-gear"
  },
  "91": {
    "price": "30m",
    "category": "warrior-gear"
  },
  "92": {
    "price": "16m",
    "category": "warrior-gear"
  },
  "93": {
    "price": "35m",
    "category": "warrior-gear"
  },
  "94": {
    "price": "33-40m",
    "category": "warrior-gear"
  },
  "95": {
    "price": "20m",
    "category": "pirate-gear"
  },
  "96": {
    "price": "32m",
    "category": "pirate-gear"
  },
  "97": {
    "price": "40m",
    "category": "pirate-gear"
  },
  "98": {
    "price": "1m",
    "category": "warrior-gear"
  },
  "99": {
    "price": "1.1m",
    "category": "warrior-gear"
  },
  "100": {
    "price": "2m",
    "category": "warrior-gear"
  },
  "101": {
    "price": "7m",
    "category": "warrior-gear"
  },
  "102": {
    "price": "14m",
    "category": "warrior-gear"
  },
  "103": {
    "price": "15m",
    "category": "warrior-gear"
  },
  "104": {
    "price": "29m",
    "category": "warrior-gear"
  },
  "105": {
    "price": "40m",
    "category": "warrior-gear"
  },
  "106": {
    "price": "60m",
    "category": "warrior-gear"
  },
  "107": {
    "price": "3m",
    "category": "warrior-gear"
  },
  "108": {
    "price": "5m",
    "category": "warrior-gear"
  },
  "109": {
    "price": "2b",
    "category": "thief-gear"
  },
  "110": {
    "price": "4b",
    "category": "pirate-gear"
  },
  "111": {
    "price": "1b",
    "category": "warrior-gear"
  },
  "112": {
    "price": "6m",
    "category": "warrior-gear"
  },
  "113": {
    "price": "1b",
    "category": "warrior-gear"
  },
  "114": {
    "price": "8m",
    "category": "warrior-gear"
  },
  "115": {
    "price": "888m",
    "category": "warrior-gear"
  },
  "116": {
    "price": "1b",
    "category": "warrior-gear"
  },
  "117": {
    "price": "10m",
    "category": "warrior-gear"
  },
  "118": {
    "price": "50m",
    "category": "warrior-gear"
  },
  "119": {
    "price": "60m",
    "category": "warrior-gear"
  },
  "120": {
    "price": "90m",
    "category": "warrior-gear"
  },
  "121": {
    "price": "2.7b",
    "category": "warrior-gear"
  },
  "122": {
    "price": "220m",
    "category": "warrior-gear"
  },
  "123": {
    "price": "50m",
    "category": "archer-gear"
  },
  "124": {
    "price": "355m",
    "category": "warrior-gear"
  },
  "125": {
    "price": "450m",
    "category": "warrior-gear"
  },
  "126": {
    "price": "400m",
    "category": "warrior-gear"
  },
  "127": {
    "price": "888m",
    "category": "warrior-gear"
  },
  "128": {
    "price": "1.1b",
    "category": "warrior-gear"
  },
  "129": {
    "price": "2.2b",
    "category": "thief-gear"
  },
  "130": {
    "price": "4b",
    "category": "thief-gear"
  },
  "131": {
    "price": "666m",
    "category": "archer-gear"
  },
  "132": {
    "price": "1.1b",
    "category": "warrior-gear"
  },
  "134": {
    "price": "9.6b",
    "category": "thief-gear"
  },
  "136": {
    "price": "5b",
    "category": "warrior-gear"
  },
  "137": {
    "price": "1.5b",
    "category": "warrior-gear"
  },
  "8 str": {
    "price": "4m",
    "category": "warrior-gear"
  },
  "18 str": {
    "price": "40m",
    "category": "warrior-gear"
  },
  "10 dex": {
    "price": "100m",
    "category": "warrior-gear"
  },
  "51 wa": {
    "price": "1m",
    "category": "thief-gear"
  },
  "52": {
    "price": "2m",
    "category": "thief-gear"
  },
  "53": {
    "price": "15m",
    "category": "thief-gear"
  },
  "54": {
    "price": "17.5m",
    "category": "thief-gear"
  },
  "55": {
    "price": "22m",
    "category": "thief-gear"
  },
  "56": {
    "price": "50m",
    "category": "thief-gear"
  },
  "69 wa": {
    "price": "40m",
    "category": "thief-gear"
  },
  "70": {
    "price": "77m",
    "category": "thief-gear"
  },
  "71": {
    "price": "111m",
    "category": "thief-gear"
  },
  "72": {
    "price": "300m",
    "category": "thief-gear"
  },
  "74": {
    "price": "410m",
    "category": "thief-gear"
  },
  "75": {
    "price": "655m",
    "category": "thief-gear"
  },
  "76": {
    "price": "790m",
    "category": "thief-gear"
  },
  "77": {
    "price": "1.2b",
    "category": "thief-gear"
  },
  "78": {
    "price": "900k",
    "category": "pirate-gear"
  },
  "79": {
    "price": "2m",
    "category": "pirate-gear"
  },
  "80": {
    "price": "20m",
    "category": "pirate-gear"
  },
  "85": {
    "price": "10b",
    "category": "thief-gear"
  },
  "14 wa": {
    "price": "3m",
    "category": "thief-gear"
  },
  "26 wa": {
    "price": "45m",
    "category": "thief-gear"
  },
  "38": {
    "price": "2b",
    "category": "pirate-gear"
  },
  "43": {
    "price": "3b",
    "category": "archer-gear"
  },
  "3 dex": {
    "price": "11m",
    "category": "thief-gear"
  },
  "15 dex": {
    "price": "45m",
    "category": "thief-gear"
  },
  "133": {
    "price": "1.22b",
    "category": "archer-gear"
  },
  "139": {
    "price": "16b",
    "category": "archer-gear"
  },
  "41": {
    "price": "1.9b",
    "category": "archer-gear"
  },
  "81": {
    "price": "50m",
    "category": "pirate-gear"
  },
  "82": {
    "price": "68m",
    "category": "pirate-gear"
  },
  "83": {
    "price": "120m",
    "category": "pirate-gear"
  },
  "84": {
    "price": "320m",
    "category": "pirate-gear"
  },
  "24 str": {
    "price": "30m",
    "category": "pirate-gear"
  },
  "39": {
    "price": "2b",
    "category": "pirate-gear"
  },
  "work glove": {
    "price": "380-500k",
    "category": "gear"
  }
};
