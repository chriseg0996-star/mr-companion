"""Parse Sylafia FM price guide CSVs into priceData.js"""
import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRICES_DIR = ROOT / "data" / "prices"
OUT = ROOT / "data" / "priceData.js"

PRICE_RE = re.compile(
    r"(\d[\d.,]*(?:\s*-\s*\d[\d.,]*)?\s*[kmb]|\d[\d.,]+\s*/\s*[\w\s]+)",
    re.I,
)

SKIP_NAMES = re.compile(
    r"^(read this|read this note|hello everybody|scrolls|weapon scrolls|helm scrolls|"
    r"cape scrolls|glove scrolls|overall scrolls|shoe scrolls|earring scrolls|"
    r"ring scrolls|belt scrolls|hp scrolls|eye scrolls|face scrolls|"
    r"bottom scrolls|shield scrolls|top scrolls|mastery books|crafting|"
    r"quest|ores|misc|leech prices|boss runs|other services|"
    r"popular stuff|cool stuff|pricing unfinished|awesome people|the pros|"
    r"donations are|woah you found|check out my|map|mw20|clean wa|scrolled wa|"
    r"wa \\|luk|wa \\| luk|red craven|more than you can|weapons|skill|lv20|lv30|"
    r"mage|pirate|warrior|archer|thief|goby|cpq|petri|skele|harps|low-lv|uwu|"
    r"capes|gloves|shoes|int gear|thief gear|warrior gear|archer gear|pirate gear)$",
    re.I,
)

SKIP_CONTAINS = (
    "http", "why would you", "click this cell", "mathemagic",
    "no sellers", "not in fm", "only 1 seller", "far too rare",
    "idk what", "rip orestore", "???", "guide on unfinished",
)


def is_price(text: str) -> bool:
    t = text.strip().lower()
    if not t or len(t) > 45:
        return False
    if any(s in t for s in SKIP_CONTAINS):
        return False
    if re.match(r"^\d+$", t):
        return False
    return bool(PRICE_RE.search(t))


def extract_price(text: str) -> str | None:
    m = PRICE_RE.search(text.strip())
    return m.group(0).strip() if m else None


def clean_name(text: str) -> str | None:
    t = text.strip()
    if not t or len(t) < 2 or len(t) > 70:
        return None
    if is_price(t):
        return None
    if SKIP_NAMES.match(t):
        return None
    if t.endswith(" Scrolls") or t.endswith(" Gear"):
        return None
    if re.match(r"^wa\s*\\", t, re.I):
        return None
    if re.match(r"^\d+\s*luk$", t, re.I):
        return None
    return t


def add_entry(db: dict, name: str, price: str, category: str):
    key = name.lower().strip()
    if not key or not price:
        return
    price = price.strip()
    if key in db:
        # keep shorter/simpler price or first seen
        if len(price) < len(db[key]["price"]):
            db[key] = {"price": price, "category": category}
    else:
        db[key] = {"price": price, "category": category}


def parse_use_items(rows: list, db: dict):
    for row in rows:
        if not row or not any(row):
            continue
        name = clean_name(row[0]) if row[0] else None
        if not name:
            continue
        # 60% scroll column (index 4) preferred for scrolls
        prices = []
        if len(row) > 4 and row[4] and is_price(row[4]):
            prices.append(extract_price(row[4]) or row[4].strip())
        for cell in row[1:]:
            if cell and is_price(cell):
                p = extract_price(cell) or cell.strip()
                if p not in prices:
                    prices.append(p)
        # consumables often in cols 9-11
        for i in range(9, min(len(row), 14)):
            n = clean_name(row[i]) if i < len(row) else None
            if n and i + 1 < len(row) and row[i + 1] and is_price(row[i + 1]):
                add_entry(db, n, extract_price(row[i + 1]) or row[i + 1], "consumable")
        if prices:
            cat = "scroll" if "scroll" in name or " for " in name else "use-item"
            add_entry(db, name, prices[0], cat)


def parse_etc_items(rows: list, db: dict):
    for row in rows:
        # paired columns: name, price, name, price...
        for i in range(0, len(row) - 1, 2):
            for offset in (0, 1):
                j = i + offset
                if j + 1 >= len(row):
                    break
                name = clean_name(row[j])
                if name and row[j + 1] and is_price(row[j + 1]):
                    add_entry(db, name, extract_price(row[j + 1]) or row[j + 1], "etc")
        # also col0 name col1 price
        if row[0]:
            n = clean_name(row[0])
            if n and len(row) > 1 and row[1] and is_price(row[1]):
                add_entry(db, n, extract_price(row[1]) or row[1], "etc")


def parse_services(rows: list, db: dict):
    for row in rows:
        for i in range(len(row) - 1):
            name = clean_name(row[i])
            if name and row[i + 1] and is_price(row[i + 1]):
                add_entry(db, name, extract_price(row[i + 1]) or row[i + 1], "service")


def parse_common_gear(rows: list, db: dict):
    for row in rows:
        if not row:
            continue
        # Row like: Work Gloves,380-500k
        for i, cell in enumerate(row):
            name = clean_name(cell)
            if not name:
                continue
            for j in range(i + 1, min(i + 4, len(row))):
                if row[j] and is_price(row[j]):
                    add_entry(db, name, extract_price(row[j]) or row[j], "gear")
                    break
        # Named gear in header rows
        for cell in row[:6]:
            n = clean_name(cell)
            if n and n in ("work gloves", "stormcaster", "bwg", "pink adv cape", "facestompers"):
                for j in range(1, len(row)):
                    if row[j] and is_price(row[j]):
                        add_entry(db, n, extract_price(row[j]) or row[j], "gear")
                        break


def parse_gear_tab(rows: list, db: dict, category: str):
    for row in rows:
        if not row or not row[0]:
            continue
        name = clean_name(row[0])
        if not name:
            continue
        prices = [extract_price(c) or c.strip() for c in row[1:8] if c and is_price(c)]
        if prices:
            add_entry(db, name, prices[0], category)


def load_csv(name: str) -> list:
    path = PRICES_DIR / name
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.reader(f))


def main():
    db = {}

    # Overview tab popular items (manual from gid=0)
    manual = {
        "chaos scroll": ("400-420m", "scroll"),
        "white scroll": ("400-420m", "scroll"),
        "ap reset": ("10.5m", "etc"),
        "onyx apple": ("7m", "consumable"),
        "heartstopper": ("370k", "consumable"),
        "vip zak helm": ("60m", "gear"),
        "vip htp": ("120-140m", "gear"),
        "vip mon": ("60-80m", "gear"),
    }
    for k, (p, c) in manual.items():
        add_entry(db, k, p, c)

    # Remove junk keys
    junk = [k for k in db if SKIP_NAMES.match(k) or len(k) < 3]
    for k in junk:
        del db[k]

    parse_use_items(load_csv("use-items.csv"), db)
    parse_etc_items(load_csv("etc-items.csv"), db)
    parse_services(load_csv("services.csv"), db)
    parse_common_gear(load_csv("common-gear.csv"), db)
    parse_gear_tab(load_csv("int-gear.csv"), db, "mage-gear")
    parse_gear_tab(load_csv("warrior-gear.csv"), db, "warrior-gear")
    parse_gear_tab(load_csv("thief-gear.csv"), db, "thief-gear")
    parse_gear_tab(load_csv("archer-gear.csv"), db, "archer-gear")
    parse_gear_tab(load_csv("pirate-gear.csv"), db, "pirate-gear")

    # Merge aliases for ITEM_DB keys
    aliases = {
        "work gloves": ["work glove"],
        "horntail necklace": ["ht necklace"],
        "zakum helmet": ["zhelm", "zak helm"],
        "papu pendant": ["papulatus pendant"],
        "power elixir": ["power elixirs"],
        "balanced fury": ["bal fury"],
    }
    for main, alts in aliases.items():
        if main in db:
            for a in alts:
                db.setdefault(a, db[main])

    junk = [k for k in db if SKIP_NAMES.match(k) or k in ("mage", "pirate", "warrior", "archer", "thief", "skill")]
    for k in junk:
        del db[k]

    lines = [
        "// Sylafia FM Price Guide — auto-generated from Google Sheets",
        "// Source: https://docs.google.com/spreadsheets/d/1B3sxmpaW7RGrQAAxAyeR-xS4mdKCTTs_DzgV0qo2p_8",
        "// Re-run scripts/build-prices.py to refresh",
        "",
        "const PRICE_SOURCE = {",
        "  name: \"Sylafia's Price Guide\",",
        "  url: 'https://docs.google.com/spreadsheets/d/1B3sxmpaW7RGrQAAxAyeR-xS4mdKCTTs_DzgV0qo2p_8/edit',",
        "};",
        "",
        "const PRICE_DB = " + json.dumps(db, indent=2, ensure_ascii=False) + ";",
        "",
    ]
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {len(db)} entries to {OUT}")


if __name__ == "__main__":
    main()
