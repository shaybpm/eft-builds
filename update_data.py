"""EFT Builds - data updater.

Downloads the Escape from Tarkov PVE dataset from the tarkov.dev JSON API, computes three
recommended builds per weapon (meta / balanced / budget), picks ammo and an optic, and writes
data/eft-data.js, which the local page (index.html) loads with a plain <script> tag.

Usage:
    python update_data.py                 # download fresh data and rebuild
    python update_data.py --cache         # rebuild from the last download (offline)
    python update_data.py --if-older 6    # do nothing when the data is newer than 6 hours
"""

import argparse
import copy
import datetime
import json
import math
import os
import sys
import time
import traceback
from collections import Counter

import requests

APP_VERSION = "1.2.3"
BASE_URL = "https://json.tarkov.dev"
GAME_MODE = "pve"
ENDPOINTS = ["items", "items_en", "items_ru", "maps", "maps_en", "maps_ru", "traders", "traders_en",
             "traders_ru", "barters", "crafts", "hideout", "hideout_en", "hideout_ru"]

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE_DIR = os.path.join(HERE, "cache")
DATA_DIR = os.path.join(HERE, "data")
DATA_FILE = os.path.join(DATA_DIR, "eft-data.js")
STATUS_FILE = os.path.join(DATA_DIR, "status.js")
LOG_FILE = os.path.join(HERE, "update.log")

FENCE_ID = "579dc571d53a0658a154fbec"  # Fence stock is random, never counted as a source
GP_COIN_ID = "5d235b4d86f7742e017bc88a"

# Weapon classes shown in the app (tarkov.dev category name -> app class key)
CLASS_OF_CATEGORY = {
    "Assault rifle": "ar",
    "Assault carbine": "carbine",
    "SMG": "smg",
    "Shotgun": "shotgun",
    "Marksman rifle": "dmr",
    "Sniper rifle": "sniper",
    "Machinegun": "lmg",
    "Handgun": "pistol",
    "Revolver": "pistol",
}
# Individual fixes where the game category is misleading
CLASS_OVERRIDE = {
    "60db29ce99594040e04c4a27": "shotgun",  # MTs-255-12 is filed as a revolver
}
EXCLUDED_CALIBERS = {"Caliber26x75", "Caliber20x1mm", "Caliber725", "Caliber40x46"}  # flares, toy, launchers

# Slots the optimizer never fills on its own (optics are handled by a separate pass)
SKIP_SLOT_PREFIXES = ("mod_tactical", "mod_flashlight", "mod_nvg", "mod_equipment", "mod_launcher",
                      "mod_bipod", "camora", "cartridges", "mod_sight_front", "mod_sight_rear", "mod_scope")
OPTIC_SLOT_PREFIXES = ("mod_scope", "mod_mount")

# Scoring weights per profile: score = recoil% saved + we * ergonomics - cost * price
PROFILES = {
    "meta": {"we": 0.25, "cost": 1 / 150000},
    "balanced": {"we": 0.25, "cost": 1 / 12000},
    "budget": {"we": 0.25, "cost": 1 / 2500},
}
MIN_META_ERGO = 35  # a meta/balanced build (sight included) below this ergonomics is rebuilt with more weight on ergonomics
SUSTAINED_FIRE_S = 2.0  # a full-auto magazine should last at least this many seconds of continuous fire
# The rule above applies to every full-auto gun, whatever its class (the VSS and the automatic shotguns included),
# except battle-rifle calibers: they kill in fewer rounds, and a drum on them costs more ergonomics than it is worth.
HEAVY_CALIBERS = {"762x51", "68x51", "762x54R", "127x55", "86x70", "93x64", "127x99", "366TKM"}
# Semi-automatic marksman rifles and bolt-action rifles: the smallest magazine players run in that role
# (2026 outside builds: SVDS 20 rounds, M700 10). Used only when such a magazine exists for the gun.
MIN_MAG_BY_CLASS = {"dmr": 20, "sniper": 10}

# Optic preference lists by short name, best first
OPTIC_PREFS = {
    "red_dot": ["EXPS3-0", "XPS3-0", "HS401G5", "CompM4", "MRS", "PRO", "SRS-02", "UH-1", "XPS3-2", "T-1",
                "RMR", "ROMEO4", "ACRO P-1", "DP", "Krechet", "PK-AA", "OKP-7", "Ring Sight", "Mepro M21",
                "H-2", "PK-06"],
    "pistol": ["RMR", "ACRO P-1", "ROMEO4", "DP", "T-1", "FF3", "H-2", "PK-06", "SRO"],
    "lpvo": ["Razor HD Gen.2", "Vudu 1-6", "TANGO6T", "PM II 1-8", "March-F Shorty", "PS-320", "TAC30",
             "SpecterDR", "HAMR", "TA01NSN"],
    "sniper": ["3-24x42 FFP", "PM II 3-20", "Mark 4 LR", "FF 4-16", "TS-30A2", "PM II 5-25", "Mark 5HD 5-25",
               "ATACR 7-35", "PSO-1M2", "PU 3.5x", "Razor HD Gen.2"],
}
OPTIC_PLAN = {  # class -> (primary optic list, optional alternative list)
    "ar": ("red_dot", "lpvo"), "carbine": ("red_dot", "lpvo"), "lmg": ("red_dot", "lpvo"),
    "smg": ("red_dot", None), "shotgun": ("red_dot", None), "pistol": ("pistol", None),
    "dmr": ("lpvo", "sniper"), "sniper": ("sniper", "lpvo"),
}


def log(msg):
    """Append a timestamped line to update.log (the updater normally runs hidden)."""
    line = f"{datetime.datetime.now():%Y-%m-%d %H:%M:%S} {msg}"
    print(line)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def write_js(path, var_name, payload):
    """Write a JS file that assigns payload to window.<var_name>; atomic replace."""
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(f"window.{var_name} = ")
        json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    os.replace(tmp, path)


def write_status(state, msg=""):
    """status.js lets the open page notice that a refresh is running or has finished."""
    write_js(STATUS_FILE, "EFT_STATUS", {"state": state, "msg": msg, "ts": time.time()})


# ---------------------------------------------------------------- download

def fetch_all(use_cache):
    """Download every endpoint (or read the cached copy) and return {endpoint: json}."""
    os.makedirs(CACHE_DIR, exist_ok=True)
    raw = {}
    for ep in ENDPOINTS:
        path = os.path.join(CACHE_DIR, f"{GAME_MODE}_{ep}.json")
        if use_cache:
            with open(path, encoding="utf-8") as f:
                raw[ep] = json.load(f)
            continue
        url = f"{BASE_URL}/{GAME_MODE}/{ep}"
        for attempt in range(3):
            try:
                resp = requests.get(url, timeout=180, headers={"Accept": "application/json",
                                                               "User-Agent": f"eft-builds-local/{APP_VERSION}"})
                resp.raise_for_status()
                raw[ep] = resp.json()
                break
            except Exception as exc:  # network hiccup: retry twice, then give up
                if attempt == 2:
                    raise
                log(f"retry {ep}: {exc}")
                time.sleep(5)
        tmp = path + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(raw[ep], f)
        os.replace(tmp, path)
    return raw


# ---------------------------------------------------------------- model

class Game:
    """Lookup helpers over the raw dataset: names, prices, sources."""

    def __init__(self, raw):
        self.items = raw["items"]["data"]["items"]
        self.cats = raw["items"]["data"]["itemCategories"]
        self.tr_items = raw["items_en"]["data"]
        self.tr_maps = raw["maps_en"]["data"]
        self.tr_traders = raw["traders_en"]["data"]
        # Russian names from the game's own localization (the app shows them in Russian mode)
        self.ru_items = raw["items_ru"]["data"]
        self.ru_maps = raw["maps_ru"]["data"]
        self.ru_traders = raw["traders_ru"]["data"]
        self.maps = raw["maps"]["data"]["maps"]
        self.mobs = raw["maps"]["data"]["mobs"]
        self.traders = raw["traders"]["data"]
        self.barters_for = {}
        for b in raw["barters"]["data"]:
            if b["trader"] == FENCE_ID:
                continue
            self.barters_for.setdefault(b["offeredItem"]["item"], []).append(b)
        self.crafts_for = {}
        for c in raw["crafts"]["data"]:
            self.crafts_for.setdefault(c["productItem"]["item"], []).append(c)
        self.stations = {sid: {"n": raw["hideout_en"]["data"].get(st["name"], st["name"]),
                               "nr": raw["hideout_ru"]["data"].get(st["name"], st["name"])}
                         for sid, st in raw["hideout"]["data"].items()}
        self.gp_value = raw["items"]["data"].get("settings", {}).get("gpCoinValue") or 0
        self.conf = {}
        for iid, it in self.items.items():
            for other in it.get("conflictingItems") or []:
                self.conf.setdefault(iid, set()).add(other)
                self.conf.setdefault(other, set()).add(iid)
        self._cash = {}
        self._acq = {}

    def t(self, key):
        return self.tr_items.get(key, key)

    def clash(self, ids_a, ids_b):
        """True when any item of ids_a conflicts with any item of ids_b."""
        for x in ids_a:
            c = self.conf.get(x)
            if c and not c.isdisjoint(ids_b):
                return True
        return False

    def name(self, iid):
        return self.t(self.items[iid]["name"])

    def short(self, iid):
        return self.t(self.items[iid]["shortName"])

    def name_ru(self, iid):
        return self.ru_items.get(self.items[iid]["name"])

    def short_ru(self, iid):
        return self.ru_items.get(self.items[iid]["shortName"])

    def cat_names(self, iid):
        return [self.t(self.cats[c]["name"]) for c in self.items[iid]["categories"] if c in self.cats]

    def props(self, iid):
        return self.items[iid].get("properties") or {}

    def cash(self, iid):
        """Cheapest cash purchase: flea (avg 24h) or a trader. None if not sold for money."""
        if iid in self._cash:
            return self._cash[iid]
        it = self.items[iid]
        best = None
        if "noFlea" not in it["types"]:
            p = it.get("avg24hPrice") or it.get("lastLowPrice")
            if p:
                best = {"k": "flea", "p": int(p)}
        for b in it.get("buyFromTrader", []):
            if b["trader"] == FENCE_ID:
                continue
            if best is None or b["priceRUB"] < best["p"]:
                best = {"k": "trader", "p": int(b["priceRUB"]), "t": b["trader"], "ll": b["minTraderLevel"],
                        "q": bool(b.get("taskUnlock"))}
        self._cash[iid] = best
        return best

    def input_value(self, iid):
        """Ruble value of a barter/craft input: its cash price, or the GP-coin rate for GP coins."""
        if iid not in self.items:
            return None
        c = self.cash(iid)
        if c:
            return c["p"]
        if iid == GP_COIN_ID and self.gp_value:
            return self.gp_value
        return None

    def acquire(self, iid):
        """Cheapest way to get the item: cash, a trader barter or a hideout craft (valued at input prices)."""
        if iid in self._acq:
            return self._acq[iid]
        best = self.cash(iid)
        for b in self.barters_for.get(iid, []):
            total = 0
            for req in b["requiredItems"]:
                v = self.input_value(req["item"])
                if v is None:
                    total = None
                    break
                total += v * req["count"]
            if total is None:
                continue
            total = int(total / max(1, b["offeredItem"]["count"]))
            if best is None or total < best["p"]:
                best = {"k": "barter", "p": total, "t": b["trader"], "ll": b["minTraderLevel"],
                        "q": bool(b.get("taskUnlock"))}
        for c in self.crafts_for.get(iid, []):
            total = 0
            for req in c["requiredItems"]:
                if (req.get("attributes") or {}).get("tool"):
                    continue  # tools are not consumed
                v = self.input_value(req["item"])
                if v is None:
                    total = None
                    break
                total += v * req["count"]
            if total is None:
                continue
            total = int(total / max(1, c["productItem"]["count"]))
            if best is None or total < best["p"]:
                best = {"k": "craft", "p": total, "t": c["station"], "ll": c["level"],
                        "q": bool(c.get("taskUnlock"))}
        self._acq[iid] = best
        return best


# ---------------------------------------------------------------- build optimizer

class Builder:
    """Picks the best part for every slot of a weapon by tree DP over an additive score.

    Each item's best sub-build is memoized. At every parent the slots are filled jointly: the top
    few options per slot are combined best-first until no two chosen sub-builds conflict, so parts
    that cannot coexist (e.g. a mini-stock next to a full stock) are never picked together.
    """

    TOP_K = 8          # options kept per slot
    MAX_NODES = 30000  # branch-and-bound node budget per parent

    def __init__(self, game, profile, banned, cls):
        self.g = game
        self.we = profile["we"]
        self.wc = profile["cost"]
        self.banned = banned
        self.cls = cls
        self.memo = {}
        self.in_progress = set()
        self.default_parts = []
        self.free = frozenset()  # factory-preset parts that come with the gun on this purchase route
        self.gun = {}  # properties of the weapon being built (fire rate, fire modes)

    def own_score(self, iid):
        p = self.g.props(iid)
        r = p.get("recoilModifier") or 0
        e = p.get("ergonomics") or 0
        acq = self.g.acquire(iid)
        price = 0 if iid in self.free else (acq["p"] if acq else 0)
        return -r * 100 + self.we * e - self.wc * price

    def candidates(self, slot, required):
        allowed = [i for i in slot["filters"]["allowedItems"] if i in self.g.items and i not in self.banned]
        allowed = [i for i in allowed if "gun" not in self.g.items[i]["types"]]
        ok = [i for i in allowed if self.g.acquire(i) or i in self.free]
        if ok or not required:
            return ok
        return allowed  # required slot with nothing obtainable: fall back to anything that fits

    def slot_options(self, slot, depth):
        """Ranked (score, node, ids) options for one slot; [] when the slot should stay empty.

        Every candidate is offered twice: fully built, and "lite" (only its required slots filled),
        so a parent can still use it when one of its best sub-parts conflicts with a sibling.
        """
        nid = slot["nameId"]
        required = slot.get("required", False)
        if nid.startswith(SKIP_SLOT_PREFIXES) and not required:
            return []
        if nid == "mod_magazine":
            return self.magazine_options(slot)
        full, lite_opts = [], []
        for cid in self.candidates(slot, required):
            res = self.best_item(cid, depth, False)
            if res:
                full.append(res)
            res_lite = self.best_item(cid, depth, True)
            if res_lite and (not res or res_lite[2] != res[2]):
                lite_opts.append(res_lite)
        out = self.top_distinct(full, required) + self.top_distinct(lite_opts, required)
        out.sort(key=lambda r: -r[0])
        return out

    def top_distinct(self, found, required):
        """Best TOP_K options with distinct short names (colour variants share stats)."""
        found.sort(key=lambda r: -r[0])
        out, seen = [], set()
        for res in found:
            short = self.g.short(res[1]["i"])
            if short in seen:
                continue
            seen.add(short)
            if not required and res[0] <= 0:
                break
            out.append(res)
            if len(out) >= self.TOP_K:
                break
        return out

    def best_item(self, iid, depth, lite=False):
        """Return (score, node, ids) for installing iid with its best legal sub-parts.

        lite=True fills only the slots the item cannot work without (required ones and magazines).
        """
        key = (iid, lite)
        if key in self.memo:
            return self.memo[key]
        if iid in self.in_progress or depth > 8:
            return None
        self.in_progress.add(iid)
        slot_lists = []
        for slot in self.g.props(iid).get("slots") or []:
            if lite and not (slot.get("required", False) or slot["nameId"] == "mod_magazine"):
                continue
            opts = [o for o in self.slot_options(slot, depth + 1) if not self.g.clash({iid}, o[2])]
            must = slot.get("required", False) or slot["nameId"] == "mod_magazine"
            if not opts:
                if slot.get("required", False) and depth > 0:
                    self.in_progress.discard(iid)
                    self.memo[key] = None  # a part whose required slot cannot be filled is unusable
                    return None
                continue
            slot_lists.append((slot["nameId"], opts if must else opts + [None]))
        picked_score, picked = self.combine(slot_lists)
        node = {"i": iid, "ch": []}
        ids = {iid}
        for (nid, _), opt in zip(slot_lists, picked):
            if opt:
                node["ch"].append({"s": nid, "n": opt[1]})
                ids |= opt[2]
        self.in_progress.discard(iid)
        self.memo[key] = (self.own_score(iid) + picked_score, node, frozenset(ids))
        return self.memo[key]

    def combine(self, slot_lists):
        """Branch-and-bound over the per-slot options: the best total with no conflicting picks.

        Options are sorted best-first, so the first complete path is the greedy one; afterwards a
        branch is cut as soon as it cannot beat the best legal combination found so far.
        """
        if not slot_lists:
            return 0.0, []
        lists = [opts for _, opts in slot_lists]
        n = len(lists)
        rest = [0.0] * (n + 1)
        for i in range(n - 1, -1, -1):
            rest[i] = rest[i + 1] + max((o[0] if o else 0.0) for o in lists[i])
        best = {"score": None, "pick": None}
        chosen = [None] * n
        budget = [self.MAX_NODES]

        def dfs(i, score, ids):
            if budget[0] <= 0:
                return
            budget[0] -= 1
            if best["score"] is not None and score + rest[i] <= best["score"] + 1e-9:
                return
            if i == n:
                best["score"], best["pick"] = score, list(chosen)
                return
            for o in lists[i]:
                if o is None:
                    chosen[i] = None
                    dfs(i + 1, score, ids)
                elif not self.g.clash(ids, o[2]):
                    chosen[i] = o
                    dfs(i + 1, score + o[0], ids | o[2])
            chosen[i] = None

        dfs(0, 0.0, frozenset())
        if best["pick"] is not None:
            return best["score"], best["pick"]
        # no fully legal combination: keep the best option per slot that does not clash
        picks, ids, score = [], set(), 0.0
        for opts in lists:
            pick = next((o for o in opts if o is None or not self.g.clash(ids, o[2])), None)
            picks.append(pick)
            if pick:
                ids |= pick[2]
                score += pick[0]
        return score, picks

    def legal(self, chosen):
        present = [c for c in chosen if c]
        for a in range(len(present)):
            for b in range(a + 1, len(present)):
                if self.g.clash(present[a][2], present[b][2]):
                    return False
        return True

    def magazine_options(self, slot):
        """Magazines are chosen by policy: standard capacity, then best ergonomics/price."""
        mags = [(i, self.g.props(i).get("capacity") or 0) for i in self.candidates(slot, True)]
        mags = [m for m in mags if m[1] > 0]
        if not mags:
            return []
        target = self.default_capacity(slot, mags)
        good = [m for m in mags if target <= m[1] <= max(target * 1.5, target + 10)]
        if not good:  # nothing in range: the smallest that reaches the target, else the biggest there is
            big = [m for m in mags if m[1] >= target]
            cap = min(m[1] for m in big) if big else max(m[1] for m in mags)
            good = [m for m in mags if m[1] == cap]
        good.sort(key=lambda m: -(self.own_score(m[0]) + 0.02 * m[1]))
        top = good[:self.TOP_K]
        # tiny descending scores keep the ranking without letting magazines change the build score
        return [(1e-6 * (len(top) - n), {"i": m[0], "ch": []}, frozenset([m[0]])) for n, m in enumerate(top)]

    def default_capacity(self, slot, mags):
        """Smallest capacity the build should carry: the factory magazine's, raised to the sustained-fire need
        of full-auto guns and to the role minimum of marksman and bolt-action rifles."""
        floor = max(self.sustained_capacity(), MIN_MAG_BY_CLASS.get(self.cls, 0))
        allowed = set(slot["filters"]["allowedItems"])
        for c in self.default_parts:
            if c in allowed:
                cap = self.g.props(c).get("capacity")
                if cap:
                    return max(cap, floor)
        caps = sorted(m[1] for m in mags)
        return max(caps[len(caps) // 2], floor)

    def sustained_capacity(self):
        """Rounds a full-auto gun fires in SUSTAINED_FIRE_S seconds: fast guns (MP7, Vector, VSS, AA-12) need
        a bigger magazine than their factory one, or a short burst empties it."""
        if "fullauto" not in (self.gun.get("fireModes") or []):
            return 0
        if (self.gun.get("caliber") or "").replace("Caliber", "") in HEAVY_CALIBERS:
            return 0
        return math.ceil((self.gun.get("fireRate") or 0) * SUSTAINED_FIRE_S / 60)


def flatten(node, out=None):
    out = out if out is not None else []
    out.append(node["i"])
    for ch in node["ch"]:
        flatten(ch["n"], out)
    return out


def find_conflict(game, ids):
    present = set(ids)
    for x in ids:
        for y in game.conf.get(x, ()):
            if y in present and y != x:
                return x, y
    return None


def run_dp(game, gun_id, profile, banned, cls, default_parts, free=frozenset()):
    b = Builder(game, profile, banned, cls)
    b.default_parts = default_parts
    b.free = free
    b.gun = game.props(gun_id)
    res = b.best_item(gun_id, 0)
    return (res[0], res[1]) if res else None


def optimize(game, gun_id, profile, cls, default_parts, free=frozenset(), beam=6, rounds=30):
    """DP plus conflict repair by beam search.

    When the best DP pick contains two parts that cannot coexist, branch by banning either one and
    re-running the DP. The DP score with conflicts is an upper bound for every conflict-free build
    reachable by more bans, so a branch that cannot beat the best clean build is pruned.
    """
    first = run_dp(game, gun_id, profile, frozenset(), cls, default_parts, free)
    if not first:
        return None
    frontier = [(first[0], frozenset(), first)]
    seen = {frozenset()}
    best_clean = None
    for _ in range(rounds):
        nxt = []
        for score, banned, res in frontier:
            if best_clean and score <= best_clean[0]:
                continue
            conflict = find_conflict(game, flatten(res[1]))
            if not conflict:
                best_clean = res
                continue
            for victim in conflict:
                if victim == gun_id:
                    continue
                nb = banned | {victim}
                if nb in seen:
                    continue
                seen.add(nb)
                alt = run_dp(game, gun_id, profile, nb, cls, default_parts, free)
                if alt:
                    nxt.append((alt[0], nb, alt))
        nxt.sort(key=lambda t: -t[0])
        frontier = [f for f in nxt if not best_clean or f[0] > best_clean[0]][:beam]
        if not frontier:
            break
    if best_clean:
        return best_clean
    # beam exhausted without a clean build: greedily ban until the build is legal
    banned = set()
    res = first
    for _ in range(60):
        conflict = find_conflict(game, flatten(res[1]))
        if not conflict:
            return res
        banned.add(conflict[1] if conflict[1] != gun_id else conflict[0])
        res = run_dp(game, gun_id, profile, frozenset(banned), cls, default_parts, free)
        if not res:
            return None
    return None


def attach_optic(game, tree, pref_key, extra_banned=None):
    """Find the most preferred optic (plus any mounts it needs) that fits an empty scope/mount slot.

    Returns (path_ids, parent_node, slot_nameId) or None.
    """
    prefs = OPTIC_PREFS[pref_key]
    rank = {}
    for iid, it in game.items.items():
        if (it.get("properties") or {}).get("propertiesType") == "ItemPropertiesScope":
            s = game.short(iid)
            if s in prefs and game.acquire(iid):
                rank[iid] = prefs.index(s)
    chosen = set(flatten(tree))
    banned = extra_banned or set()

    def conflicts(iid):
        return game.clash({iid}, chosen)

    memo = {}

    def search(slot, d):
        key = (id(slot), d)
        if key in memo:
            return memo[key]
        best = None
        for cid in slot["filters"]["allowedItems"]:
            if cid not in game.items or cid in banned or not game.acquire(cid) or conflicts(cid):
                continue
            ergo = game.props(cid).get("ergonomics") or 0
            if cid in rank:
                cand = (rank[cid], d, -ergo, [(cid, None)])
            elif "Mount" in game.cat_names(cid) and d < 3:
                sub_best = None
                for s2 in game.props(cid).get("slots") or []:
                    if s2["nameId"].startswith(OPTIC_SLOT_PREFIXES):
                        sub = search(s2, d + 1)
                        if sub and (sub_best is None or sub[:3] < sub_best[:3]):
                            sub_best = sub[:3] + (sub[3], s2["nameId"])
                if not sub_best:
                    continue
                cand = (sub_best[0], sub_best[1], sub_best[2] - ergo, [(cid, sub_best[4])] + sub_best[3])
            else:
                continue
            if best is None or cand[:3] < best[:3]:
                best = cand
        memo[key] = best
        return best

    # empty optic-capable slots, shallow parts first (top rail before handguard rails)
    empties = []

    def walk(node, depth):
        filled = {c["s"] for c in node["ch"]}
        for slot in game.props(node["i"]).get("slots") or []:
            if slot["nameId"] in filled:
                continue
            if slot["nameId"].startswith(OPTIC_SLOT_PREFIXES):
                empties.append((depth, 0 if slot["nameId"].startswith("mod_scope") else 1, node, slot))
            elif slot["nameId"].startswith("mod_sight_rear"):  # pistol slides take their red-dot mount here (FN 5-7)
                empties.append((depth, 2, node, slot))
        for c in node["ch"]:
            walk(c["n"], depth + 1)

    walk(tree, 0)
    empties.sort(key=lambda e: (e[0], e[1]))
    best = None
    for depth, kind, node, slot in empties:
        res = search(slot, 0)
        if res and (best is None or (res[0], res[1], depth) < (best[0][0], best[0][1], best[3])):
            best = (res, node, slot, depth)
    if not best:
        return None
    # turn the chain into tree nodes; mounts also get their other required parts (e.g. a ring top cap)
    chain = best[0][3]
    used = set(chosen)
    node = None
    for cid, via in reversed(chain):
        children = [{"s": via, "n": node}] if node else []
        for slot in game.props(cid).get("slots") or []:
            if slot.get("required") and slot["nameId"] != via:
                fill = [f for f in slot["filters"]["allowedItems"]
                        if f in game.items and game.acquire(f) and not game.clash({f}, used)]
                if fill:
                    f = min(fill, key=lambda x: game.acquire(x)["p"])
                    used.add(f)
                    children.append({"s": slot["nameId"], "n": {"i": f, "ch": [], "o": 1}})
        used.add(cid)
        node = {"i": cid, "ch": children, "o": 1}
    return node, best[1], best[2]["nameId"]


def build_stats(game, gun_id, tree, gun_price=None, route=None):
    """Recoil, ergonomics, weight and cost of a finished tree. Parts marked "f" came with the factory preset
    (route "preset"), so they cost nothing extra; gun_price is what the gun itself costs on that route."""
    p = game.props(gun_id)
    nodes = []

    def walk(n):
        nodes.append(n)
        for c in n["ch"]:
            walk(c["n"])

    walk(tree)
    parts = nodes[1:]
    rsum = sum(game.props(n["i"]).get("recoilModifier") or 0 for n in parts)
    esum = sum(game.props(n["i"]).get("ergonomics") or 0 for n in parts)
    weight = sum(game.items[n["i"]].get("weight") or 0 for n in nodes)
    cost = 0
    unknown = 0
    included = 0
    for n in parts:
        if n.get("f"):
            included += 1
            continue
        acq = game.acquire(n["i"])
        if acq:
            cost += acq["p"]
        else:
            unknown += 1
    st = {
        "v": round(p["recoilVertical"] * (1 + rsum)),
        "h": round(p["recoilHorizontal"] * (1 + rsum)),
        "e": round(max(0, min(100, p["ergonomics"] + esum)), 1),
        "w": round(weight, 2),
        "cost": int(cost),
        "unknown": unknown,
        "parts": len(parts),
    }
    if gun_price is not None:
        st["gp"] = int(gun_price)
        st["route"] = route
        st["inc"] = included
    return st


def with_optic(game, tree, cls):
    """Copy of the tree with the primary sight attached: what the finished build will weigh in at."""
    t = copy.deepcopy(tree)
    optic = attach_optic(game, t, OPTIC_PLAN[cls][0])
    if optic:
        node, parent, slot_nid = optic
        parent["ch"].append({"s": slot_nid, "n": node})
    return t


def route_score(game, tree, weights, free, gun_price):
    """The profile score of a tree when the gun is bought on a given route: factory parts it reuses are free
    (once each), everything else and the gun itself are paid for."""
    left = Counter(free)
    s = -weights["cost"] * (gun_price or 0)
    for iid in flatten(tree)[1:]:
        p = game.props(iid)
        if left[iid] > 0:
            left[iid] -= 1
            price = 0
        else:
            acq = game.acquire(iid)
            price = acq["p"] if acq else 0
        s += -(p.get("recoilModifier") or 0) * 100 + weights["we"] * (p.get("ergonomics") or 0) - weights["cost"] * price
    return s


def mark_factory(tree, free):
    """Flag the nodes whose part comes with the factory preset (each preset part counts once)."""
    left = Counter(free)

    def walk(n, top):
        if not top and left[n["i"]] > 0:
            left[n["i"]] -= 1
            n["f"] = 1
        for c in n["ch"]:
            walk(c["n"], False)

    walk(tree, True)


def ergo_floor(game, gun_id, profile_key, cls, default_parts, free, res, max_we=0.8, steps=7):
    """Raise ergonomics to MIN_META_ERGO (sight included) at the smallest possible cost in recoil.

    More weight on ergonomics makes the optimum jump: one big step can swap half the build. So the weight is
    found by bisection - the lightest one whose build reaches the floor. If even max_we cannot reach it, the
    most ergonomic build found is kept."""
    def ergo(r):
        return build_stats(game, gun_id, with_optic(game, r[1], cls))["e"]

    if ergo(res) >= MIN_META_ERGO:
        return res
    profile = dict(PROFILES[profile_key])
    lo, hi = profile["we"], max_we
    profile["we"] = hi
    best = optimize(game, gun_id, profile, cls, default_parts, free) or res
    if ergo(best) < MIN_META_ERGO:
        return best
    for _ in range(steps):
        profile["we"] = (lo + hi) / 2
        r = optimize(game, gun_id, profile, cls, default_parts, free)
        if r and ergo(r) >= MIN_META_ERGO:
            hi, best = profile["we"], r
        else:
            lo = profile["we"]
    return best


def make_build(game, gun_id, profile_key, cls, default_parts, routes):
    """routes = ways to buy the gun: [(name, gun price, factory parts that come with it)]. Every route is optimised
    and the one with the best total score wins, so a preset whose parts the build keeps is not charged twice."""
    best = None
    for route, gun_price, factory in routes:
        free = frozenset(factory)
        res = optimize(game, gun_id, dict(PROFILES[profile_key]), cls, default_parts, free)
        if profile_key in ("meta", "balanced") and res:  # keep the finished build, sight included, usable
            res = ergo_floor(game, gun_id, profile_key, cls, default_parts, free, res)
        if not res:
            continue
        score = route_score(game, res[1], PROFILES[profile_key], factory, gun_price)
        if best is None or score > best[0] + 1e-9:
            best = (score, res, route, gun_price, factory)
    if not best:
        return None
    _, res, route, gun_price, factory = best
    tree = res[1]
    primary, alternative = OPTIC_PLAN[cls]
    alt_ids = None
    if alternative:  # the optional magnified optic is searched before the primary takes the top rail
        alt = attach_optic(game, tree, alternative)
        if alt:
            alt_ids = flatten(alt[0])
    optic = attach_optic(game, tree, primary)
    if optic:
        node, parent, slot_nid = optic
        parent["ch"].append({"s": slot_nid, "n": node})
    if route == "preset":
        mark_factory(tree, factory)
    stats = build_stats(game, gun_id, tree, gun_price, route)
    return {"tree": tree, "stats": stats, "alt": alt_ids}


# ---------------------------------------------------------------- ammo, maps, packaging

def ammo_picks(game, gun_id):
    """Up to three ammo suggestions: strongest obtainable, best you can buy for cash, loot-only top."""
    rows = []
    allowed = game.props(gun_id).get("allowedAmmo") or []
    if not allowed:  # some guns list their ammo only on the magazine: fall back to the caliber
        cal = game.props(gun_id).get("caliber")
        allowed = [i for i, it in game.items.items() if "ammo" in it["types"] and "ammoBox" not in it["types"]
                   and (it.get("properties") or {}).get("caliber") == cal]
    for aid in allowed:
        if aid not in game.items:
            continue
        it = game.items[aid]
        if it.get("penetrationPower") is None:
            continue
        rows.append({"i": aid, "pen": it.get("penetrationPower") or 0, "dmg": it.get("damage") or 0,
                     "proj": it.get("projectileCount") or 1, "acq": game.acquire(aid), "cash": game.cash(aid)})
    if not rows:
        return []
    picks = []
    obtainable = [r for r in rows if r["acq"]]
    if obtainable:
        top = max(obtainable, key=lambda r: (r["pen"], r["dmg"]))
        picks.append({"i": top["i"], "tag": "top"})
    cash_rows = [r for r in rows if r["cash"]]
    if cash_rows:
        buy = max(cash_rows, key=lambda r: (r["pen"], r["dmg"]))
        if not picks or buy["i"] != picks[0]["i"]:
            picks.append({"i": buy["i"], "tag": "buy"})
    best_all = max(rows, key=lambda r: (r["pen"], r["dmg"]))
    if not best_all["acq"]:
        picks.append({"i": best_all["i"], "tag": "loot"})
    return picks


def pack_item(game, iid):
    it = game.items[iid]
    p = it.get("properties") or {}
    acq = game.acquire(iid)
    out = {
        "n": game.name(iid),
        "s": game.short(iid),
        "nr": game.name_ru(iid),
        "sr": game.short_ru(iid),
        "img": it.get("gridImageLink") or it.get("iconLink"),
        "c": (game.cat_names(iid) or [""])[0],
        "w": it.get("weight") or 0,
    }
    if p.get("propertiesType") != "ItemPropertiesWeapon":
        if p.get("ergonomics"):
            out["e"] = p["ergonomics"]
        if p.get("recoilModifier"):
            out["r"] = round(p["recoilModifier"] * 100, 1)
        if p.get("capacity"):
            out["cap"] = p["capacity"]
    if "penetrationPower" in it and it.get("penetrationPower") is not None:
        out["pen"] = it.get("penetrationPower")
        out["dmg"] = it.get("damage")
        out["adm"] = it.get("armorDamage")
        if (it.get("projectileCount") or 1) > 1:
            out["proj"] = it["projectileCount"]
    if acq:
        out["p"] = acq["p"]
        out["k"] = acq["k"]
        if acq.get("t"):
            out["t"] = acq["t"]
            out["ll"] = acq["ll"]
        if acq.get("q"):
            out["q"] = 1
    if "noFlea" in it["types"]:
        out["nf"] = 1
    out["link"] = it.get("link")
    return out


def pack_maps(game):
    skip_mobs = {"USEC", "BEAR", "Scav", "Sniper"}
    out = []
    for m in game.maps.values():
        if m["normalizedName"] == "ground-zero-tutorial":
            continue
        bosses, ru_names = {}, {}
        for b in m.get("bosses", []):
            mob = game.mobs.get(b.get("mob"), {})
            nm = game.tr_maps.get(mob.get("name", ""), mob.get("name", ""))
            if not nm or nm in skip_mobs:
                continue
            ru_names[nm] = game.ru_maps.get(mob.get("name", ""), nm)
            bosses[nm] = max(bosses.get(nm, 0), b.get("spawnChance") or 0)
        out.append({
            "id": m["normalizedName"],
            "n": game.tr_maps.get(m["name"], m["name"]),
            "nr": game.ru_maps.get(m["name"], m["name"]),
            "dur": m.get("raidDuration"),
            "pl": m.get("players"),
            "b": [{"n": k, "nr": ru_names.get(k, k), "c": round(v, 2)}
                  for k, v in sorted(bosses.items(), key=lambda kv: -kv[1])],
        })
    return out


def gun_class(game, gid):
    if gid in CLASS_OVERRIDE:
        return CLASS_OVERRIDE[gid]
    for c in game.cat_names(gid):
        if c in CLASS_OF_CATEGORY:
            return CLASS_OF_CATEGORY[c]
    return None


def build_dataset(raw):
    game = Game(raw)
    used_items = set()
    guns = []
    for gid, it in game.items.items():
        if "gun" not in it["types"]:
            continue
        p = it.get("properties") or {}
        cls = gun_class(game, gid)
        if not cls or p.get("caliber") in EXCLUDED_CALIBERS or not p.get("slots"):
            continue
        preset = game.items.get(p.get("defaultPreset") or "", {})
        default_parts = [c["item"] for c in preset.get("containsItems", []) if c["item"] in game.items]
        # Two ways to buy the gun: the bare weapon plus every part, or the factory preset, whose parts come with it
        bare, packed = game.acquire(gid), (game.acquire(preset["id"]) if preset else None)
        factory = []
        for c in preset.get("containsItems", []):
            if c["item"] in game.items and c["item"] != gid and "ammo" not in game.items[c["item"]]["types"]:
                factory += [c["item"]] * max(1, int(c.get("count") or 1))
        routes = []
        if bare or not packed:
            routes.append(("bare", bare["p"] if bare else None, []))
        if packed:
            routes.append(("preset", packed["p"], factory))
        builds = {}
        for key in PROFILES:
            try:
                b = make_build(game, gid, key, cls, default_parts, routes)
            except RecursionError:
                b = None
            if b:
                builds[key] = {"tree": b["tree"], "st": b["stats"], "alt": b["alt"]}
                used_items.update(flatten(b["tree"]))
                used_items.update(b["alt"] or [])
        if not builds:
            continue
        ammo = ammo_picks(game, gid)
        used_items.update(a["i"] for a in ammo)
        price = game.acquire(gid) or (game.acquire(preset["id"]) if preset else None)
        guns.append({
            "id": gid,
            "nn": it["normalizedName"],
            "n": game.name(gid),
            "s": game.short(gid),
            "nr": game.name_ru(gid),
            "sr": game.short_ru(gid),
            "cls": cls,
            "cal": (p.get("caliber") or "").replace("Caliber", ""),
            "img": preset.get("image512pxLink") or it.get("image512pxLink"),
            "img2": it.get("baseImageLink"),
            "modes": [game.t(m) for m in p.get("fireModes") or []],
            "rof": p.get("fireRate"),
            "dist": p.get("effectiveDistance"),
            "base": {"v": p["recoilVertical"], "h": p["recoilHorizontal"], "e": p["ergonomics"]},
            "def": {"v": (preset.get("properties") or {}).get("recoilVertical"),
                    "h": (preset.get("properties") or {}).get("recoilHorizontal"),
                    "e": (preset.get("properties") or {}).get("ergonomics")},
            "price": price,
            "nf": 1 if "noFlea" in it["types"] else 0,
            "builds": builds,
            "ammo": ammo,
            "link": it.get("link"),
            "wiki": it.get("wikiLink"),
        })
    used_items.update(g["id"] for g in guns)
    traders = {tid: {"n": game.tr_traders.get(t["name"], t["name"]),
                     "nr": game.ru_traders.get(t["name"], t["name"]), "img": t.get("imageLink")}
               for tid, t in game.traders.items()}
    return {
        "version": APP_VERSION,
        "generated": datetime.datetime.now().astimezone().isoformat(timespec="seconds"),
        "generatedTs": time.time(),
        "source": f"tarkov.dev JSON API ({GAME_MODE})",
        "guns": sorted(guns, key=lambda g: g["n"]),
        "items": {iid: pack_item(game, iid) for iid in sorted(used_items)},
        "traders": traders,
        "maps": pack_maps(game),
        "stations": game.stations,
    }


def data_age_hours():
    if not os.path.exists(DATA_FILE):
        return None
    return (time.time() - os.path.getmtime(DATA_FILE)) / 3600


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--cache", action="store_true", help="rebuild from cached downloads (no network)")
    ap.add_argument("--if-older", type=float, default=None, metavar="HOURS",
                    help="skip when data/eft-data.js is newer than HOURS")
    args = ap.parse_args()
    os.makedirs(DATA_DIR, exist_ok=True)
    age = data_age_hours()
    if args.if_older is not None and age is not None and age < args.if_older:
        log(f"data is {age:.1f}h old, newer than {args.if_older}h - skipping")
        return 0
    started = time.time()
    write_status("running", "updating from tarkov.dev")
    try:
        raw = fetch_all(args.cache)
        dataset = build_dataset(raw)
        write_js(DATA_FILE, "EFT_DATA", dataset)
        write_status("ok", f"{len(dataset['guns'])} weapons")
        log(f"ok: {len(dataset['guns'])} guns, {len(dataset['items'])} items, {time.time() - started:.1f}s")
        return 0
    except Exception as exc:
        write_status("error", str(exc)[:300])
        log("ERROR " + traceback.format_exc())
        return 1


if __name__ == "__main__":
    sys.setrecursionlimit(5000)
    sys.exit(main())
