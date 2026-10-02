/* EFT Builds - page logic.
   Renders window.EFT_DATA (written by update_data.py into data/eft-data.js) with the hand-written
   content (content.js + content.en.js + content.ru.js) and the interface strings (i18n.js).
   Works straight from disk (file://) and from a static web host, no server code. */
(function () {
  "use strict";

  var C = window.EFT_CONTENT || { CLASSES: [], MAPS: {}, GUNS: {}, SOURCES: [], TEXT: {} };
  var I18N = window.EFT_I18N || {};
  var LANGS = ["he", "en", "ru"];
  var WEB = /^https?:$/.test(location.protocol); // hosted copy: data refreshes on the server side
  var D = null;
  var state = { mode: "gun", cls: null, gun: null, profile: "meta", map: null }; // map: chosen map id, null = automatic
  var classStats = {};
  var lastBanner = null;

  // ------------------------------------------------------------------ language
  function hashParams() {
    var h = {};
    (location.hash || "").replace(/^#/, "").split("&").forEach(function (kv) {
      var p = kv.split("=");
      if (p[0]) h[p[0]] = decodeURIComponent(p[1] || "");
    });
    return h;
  }
  function pickLang() {
    var h = hashParams().l;
    if (LANGS.indexOf(h) >= 0) { try { localStorage.setItem("eftLang", h); } catch (e) {} return h; }
    try { var s = localStorage.getItem("eftLang"); if (LANGS.indexOf(s) >= 0) return s; } catch (e) {}
    var nav = (navigator.language || "").slice(0, 2).toLowerCase();
    return nav === "ru" ? "ru" : "he";
  }
  var lang = pickLang();
  function L() { return I18N[lang] || I18N.he || {}; }
  // t("key", a, b) looks up the interface string and fills {0}, {1}...
  function t(key) {
    var s = L()[key];
    if (s == null && I18N.en) s = I18N.en[key];
    if (s == null) return key;
    var args = arguments;
    return String(s).replace(/\{(\d)\}/g, function (m, i) { var v = args[+i + 1]; return v == null ? "" : v; });
  }
  // hand-written content in the current language, falling back to English, then Hebrew
  function textChain() { return [C.TEXT[lang], C.TEXT.en, C.TEXT.he].filter(Boolean); }
  function txt(section, key, field) {
    var chain = textChain();
    for (var i = 0; i < chain.length; i++) {
      var sec = chain[i][section];
      var v = sec && sec[key];
      if (field) v = v && v[field];
      if (v != null) return v;
    }
    return null;
  }
  function metaNote() { var ch = textChain(); for (var i = 0; i < ch.length; i++) if (ch[i].meta_note) return ch[i].meta_note; return ""; }
  function nm(o) { return o ? ((lang === "ru" && o.nr) ? o.nr : o.n) : ""; }
  function sn(o) { return o ? ((lang === "ru" && o.sr) ? o.sr : (o.s || o.n)) : ""; }

  // ------------------------------------------------------------------ helpers
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function bdi(s) { return "<bdi>" + esc(s) + "</bdi>"; }
  function rub(n) { return n == null ? t("notSold") : Math.round(n).toLocaleString("en-US") + " ₽"; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function fmtDate(d) {
    var sep = L().dateSep || "-";
    return pad(d.getDate()) + sep + pad(d.getMonth() + 1) + sep + d.getFullYear() + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }
  function slotName(nid) {
    var key = nid.replace(/^mod_/, "").replace(/_?\d+$/, "").replace(/_akms$|_axis$/, "");
    var slots = L().slots || {};
    for (var k in slots) if (key.indexOf(k) === 0) return slots[k];
    return key;
  }
  function modeName(m) { return (L().modes && L().modes[m]) || m; }
  function item(id) { return (D.items && D.items[id]) || { n: id, s: id }; }
  function traderName(id) { return nm(D.traders[id]) || id; }
  function stationName(id) {
    var s = D.stations && D.stations[id];
    if (!s) return "Hideout";
    return typeof s === "string" ? s : nm(s);
  }
  function sourceText(it) {
    if (it.p == null) return t("lootOnly");
    var s = "";
    if (it.k === "flea") s = t("srcFlea");
    else if (it.k === "trader") s = t("srcTrader", traderName(it.t), it.ll);
    else if (it.k === "barter") s = t("srcBarter", traderName(it.t), it.ll);
    else if (it.k === "craft") s = t("srcCraft", stationName(it.t), it.ll);
    if (it.q) s += t("srcQuest");
    return s;
  }
  function gunById(id) { for (var i = 0; i < D.guns.length; i++) if (D.guns[i].id === id) return D.guns[i]; return null; }
  function gunByNN(nn) { for (var i = 0; i < D.guns.length; i++) if (D.guns[i].nn === nn) return D.guns[i]; return null; }
  function build(g, p) { return g.builds[p] || g.builds.meta || g.builds.balanced || g.builds.budget; }
  function classInfo(id) { for (var i = 0; i < C.CLASSES.length; i++) if (C.CLASSES[i].id === id) return C.CLASSES[i]; return { id: id }; }
  function className(id) { return txt("classes", id, "n") || id; }
  function walk(node, depth, parent, slot, out) {
    out.push({ node: node, depth: depth, parent: parent, slot: slot });
    node.ch.forEach(function (c) { walk(c.n, depth + 1, node, c.s, out); });
    return out;
  }
  function pctRank(arr, x) { // share of values strictly below x (0 = best when lower is better)
    if (!arr.length) return 0.5;
    var below = 0;
    arr.forEach(function (v) { if (v < x) below++; });
    return below / arr.length;
  }
  function setHash() {
    var m = state.map ? "&m=" + state.map : "", h;
    if (state.mode === "map") h = "#v=map" + m + "&l=" + lang;
    else if (state.gun) h = "#g=" + state.gun.nn + "&p=" + state.profile + m + "&l=" + lang;
    else return;
    try { history.replaceState(null, "", h); } catch (e) {}
  }

  // ------------------------------------------------------------------ theme, font size, language (control bar)
  var root = document.documentElement, mq = window.matchMedia("(prefers-color-scheme: dark)");
  function effTheme() { var a = root.getAttribute("data-theme"); return a ? a : (mq.matches ? "dark" : "light"); }
  function paintTheme() { $("themeBtn").textContent = effTheme() === "dark" ? t("themeDark") : t("themeLight"); }
  (function controls() {
    $("themeBtn").onclick = function () {
      var th = effTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", th);
      try { localStorage.setItem("bpmTheme", th); } catch (e) {}
      paintTheme();
    };
    var saved = null; try { saved = localStorage.getItem("bpmTheme"); } catch (e) {}
    if (saved) root.setAttribute("data-theme", saved);
    var SIZES = [14, 16, 18, 20, 22, 24], DEF = 18;
    function apply(px, store) { root.style.fontSize = px + "px"; if (store !== false) { try { localStorage.setItem("bpmFontPx", String(px)); } catch (e) {} } }
    function cur() { var v = parseInt(root.style.fontSize, 10); return SIZES.indexOf(v) >= 0 ? v : DEF; }
    function step(d) { var i = SIZES.indexOf(cur()) + d; apply(SIZES[Math.max(0, Math.min(SIZES.length - 1, i))]); }
    var fs = NaN; try { fs = parseInt(localStorage.getItem("bpmFontPx"), 10); } catch (e) {}
    if (SIZES.indexOf(fs) >= 0 && fs !== DEF) apply(fs, false);
    $("fsPlus").onclick = function () { step(1); };
    $("fsDef").onclick = function () { apply(DEF); };
    $("fsMinus").onclick = function () { step(-1); };
    Array.prototype.forEach.call(document.querySelectorAll("#ctlBar .lang"), function (b) {
      b.onclick = function () { setLang(b.getAttribute("data-lang")); };
    });
  })();

  // Static page text and direction for the current language
  function applyStatic() {
    root.lang = lang;
    root.dir = L().dir || "rtl";
    document.title = t("title");
    $("h1Text").textContent = t("h1");
    $("step1Text").textContent = t("step1");
    $("step2Text").textContent = t("step2");
    $("stepMapText").textContent = t("stepMap");
    Array.prototype.forEach.call(document.querySelectorAll("#modeTabs button"), function (b) {
      b.textContent = t(b.getAttribute("data-mode") === "map" ? "modeMap" : "modeGun");
      b.classList.toggle("sel", b.getAttribute("data-mode") === state.mode);
    });
    $("modelSelect").setAttribute("aria-label", t("selectAria"));
    $("themeBtn").title = t("themeTitle");
    $("fsPlus").title = t("fsPlus");
    $("fsDef").title = t("fsDef");
    $("fsMinus").title = t("fsMinus");
    Array.prototype.forEach.call(document.querySelectorAll("#ctlBar .lang"), function (b) {
      b.classList.toggle("sel", b.getAttribute("data-lang") === lang);
      b.title = t("langTitle");
    });
    if (!D) $("dataInfo").textContent = t("loading");
    paintTheme();
  }
  function setLang(l) {
    if (LANGS.indexOf(l) < 0 || l === lang) return;
    lang = l;
    try { localStorage.setItem("eftLang", l); } catch (e) {}
    applyStatic();
    if (D) {
      renderInfo();
      renderFooter();
      if (state.cls) selectClass(state.cls, false);
      else renderClasses();
      if (state.gun) { $("modelSelect").value = state.gun.id; renderGun(); }
      if (state.mode === "map") { renderMapGrid(); renderMapView(); }
      setHash();
    }
    if (lastBanner) banner.apply(null, lastBanner);
  }

  // ------------------------------------------------------------------ analysis
  function bestAmmo(g, tag) {
    for (var i = 0; i < g.ammo.length; i++) if (g.ammo[i].tag === tag) return item(g.ammo[i].i);
    return null;
  }
  function metrics(g) {
    var b = build(g, "meta");
    var top = bestAmmo(g, "top"), buy = bestAmmo(g, "buy"), loot = bestAmmo(g, "loot");
    var bestPen = top ? top.pen : 0;
    var buyPen = buy ? buy.pen : (top && (top.k === "flea" || top.k === "trader") ? top.pen : 0);
    var mag = null;
    walk(b.tree, 0, null, null, []).forEach(function (r) { if (r.slot === "mod_magazine") mag = item(r.node.i); });
    var auto = g.modes.some(function (m) { return /auto|burst/i.test(m) && !/semi/i.test(m); });
    var gunPrice = g.price ? g.price.p : null;
    return {
      v: b.st.v, h: b.st.h, e: b.st.e, w: b.st.w,
      cost: b.st.cost + (gunPrice || 0), partsCost: b.st.cost, gunPrice: gunPrice,
      bestPen: bestPen, buyPen: buyPen, top: top, buy: buy, loot: loot,
      dmg: top ? top.dmg * (top.proj || 1) : 0, cap: mag ? mag.cap : null,
      auto: auto, bolt: !auto && (g.cls === "sniper") && (g.rof || 0) < 40
    };
  }
  // Recoil is compared within a cohort: same class, and for rifles the same caliber weight,
  // so a 7.62x51 rifle is not judged against 5.56 rifles.
  var HEAVY = ["762x51", "68x51", "762x54R", "127x55", "86x70", "93x64", "127x99", "366TKM"];
  function cohort(g) {
    if (["ar", "carbine", "lmg"].indexOf(g.cls) >= 0) return g.cls + "|" + (HEAVY.indexOf(g.cal) >= 0 ? "heavy" : "light");
    return g.cls;
  }
  function computeClassStats() {
    classStats = {};
    var allPen = [], coh = {};
    D.guns.forEach(function (g) {
      var m = metrics(g);
      g._m = m;
      allPen.push(m.bestPen);
      var cs = classStats[g.cls] || (classStats[g.cls] = { e: [], cost: [] });
      cs.e.push(m.e); cs.cost.push(m.cost);
      (coh[cohort(g)] = coh[cohort(g)] || []).push(m.v);
    });
    D.guns.forEach(function (g) {
      var cs = classStats[g.cls], m = g._m;
      m.vPct = pctRank(coh[cohort(g)], m.v);
      m.heavy = cohort(g).indexOf("heavy") > 0;
      m.ePct = pctRank(cs.e, m.e);
      m.costPct = pctRank(cs.cost, m.cost);
      m.penPct = pctRank(allPen, m.bestPen);
      m.score = Math.round(100 * (0.42 * (1 - m.vPct) + 0.2 * m.ePct + 0.28 * m.penPct + 0.1 * (1 - m.costPct)));
    });
  }

  function autoProsCons(g) {
    var m = g._m, pros = [], cons = [];
    var longGun = g.cls !== "pistol";
    var peers = m.heavy ? t("peersHeavy") : t("peersClass");
    if (m.vPct <= 0.25) pros.push(t("a_lowRecoil", peers, m.v));
    else if (m.vPct >= 0.75) cons.push(t("a_highRecoil", peers, m.v));
    if (m.e >= 75) pros.push(t("a_highErgo", m.e));
    else if (m.e < 45) cons.push(t("a_lowErgo", m.e));
    if (m.auto && g.rof >= 800) pros.push(t("a_highRof", g.rof));
    if (!m.auto && ["ar", "smg", "lmg", "carbine"].indexOf(g.cls) >= 0) cons.push(t("a_semiOnly"));
    if (m.bolt) cons.push(t("a_bolt"));
    if (m.bestPen >= 50) pros.push(t("a_penHeavy", m.bestPen, sn(m.top)));
    else if (m.bestPen >= 40) pros.push(t("a_penMid", m.bestPen, sn(m.top)));
    else if (m.bestPen < 30) cons.push(t("a_penWeak"));
    if (m.buyPen >= 40) pros.push(t("a_buyAmmo"));
    if (m.loot && m.loot.pen >= m.bestPen + 8) cons.push(t("a_lootAmmo", sn(m.loot)));
    if (m.dmg >= 70 && g.cls !== "shotgun") pros.push(t("a_highDmg", m.dmg));
    if (m.cap && m.cap >= 45 && longGun) pros.push(t("a_bigMag", m.cap));
    if (m.cap && m.cap <= 10 && ["ar", "smg", "lmg", "carbine"].indexOf(g.cls) >= 0) cons.push(t("a_smallMag", m.cap));
    if (m.costPct <= 0.25) pros.push(t("a_cheap"));
    else if (m.costPct >= 0.8) cons.push(t("a_pricey"));
    if (!g.price) cons.push(t("a_gunNotSold"));
    if (m.w >= 6 && longGun) cons.push(t("a_heavy", m.w));
    else if (m.w <= 3 && longGun && g.cls !== "smg") pros.push(t("a_light", m.w));
    return { pros: pros, cons: cons };
  }

  function roleWeights(g) {
    var base = { cqb: [1, 0.35, 0], mid: [0.55, 1, 0.45], long: [0.05, 0.55, 1] };
    var w = (base[classInfo(g.cls).role || "mid"] || base.mid).slice();
    if ((g.cls === "ar" || g.cls === "carbine") && g.dist && g.dist <= 200) w = [0.9, 0.85, 0.15];
    if (g._m.bolt) w = [0, 0.45, 1];
    return w;
  }
  // How well a gun fits a map: its range profile against the map's, armor, and the curated map list
  function mapFit(g, mp) {
    var w = roleWeights(g), pen = g._m.bestPen, cur = C.GUNS[g.nn] || {};
    var info = C.MAPS[mp.id] || {};
    var prof = info.prof || [0.5, 0.8, 0.5];
    var s = w[0] * prof[0] + w[1] * prof[1] + w[2] * prof[2];
    if (info.armor && pen < 35) s -= 0.35;
    if (info.armor && pen >= 50) s += 0.12;
    if (cur.maps && cur.maps.indexOf(mp.id) >= 0) s += 0.6;
    return s;
  }
  function mapPlan(g) {
    var rows = D.maps.map(function (mp) {
      var info = C.MAPS[mp.id] || {};
      return { mp: mp, info: info, s: mapFit(g, mp) };
    }).filter(function (r) { return !r.info.skip; });
    rows.sort(function (a, b) { return b.s - a.s; });
    return { good: rows.slice(0, 4), bad: rows.slice(-2).reverse() };
  }

  // ------------------------------------------------------------------ second weapon and map-first picks
  var TIER_BONUS = { S: 0.45, A: 0.3, B: 0.12, C: 0 };
  var FIT_BAD = 0.45; // a map fit below this means the gun is a poor choice for that map
  // How well a gun covers each range on its own: 1 fully, 0.5 partly, 0 not at all
  function cover(g) {
    var sub = g.cal === "9x39"; // subsonic 9x39: great up close, short reach
    var slow = !g._m.auto && (g.rof || 0) <= 50; // bolt actions and slow semi-autos
    if (g.cls === "sniper") return { long: 1, close: 0 };
    if (g.cls === "dmr") return sub ? { long: 0.5, close: 1 } : { long: 1, close: slow ? 0 : 0.5 };
    if (g.cls === "ar" || g.cls === "lmg") return { long: 0.5, close: 1 };
    if (g.cls === "carbine") return { long: sub ? 0 : 0.5, close: slow ? 0.5 : 1 };
    return { long: 0, close: 1 }; // smg, shotgun, pistol
  }
  function mapById(id) { for (var i = 0; i < D.maps.length; i++) if (D.maps[i].id === id) return D.maps[i]; return null; }
  function playableMaps() { return D.maps.filter(function (mp) { return !(C.MAPS[mp.id] || {}).skip; }); }
  function mapNeed(mp) { return (C.MAPS[mp.id] || {}).need || [1, 2]; } // [long-range, close-range], 0..3
  // What a gun still lacks on a map: the role to pair it with and how strongly (0..3)
  function kitGap(g, mp) {
    var need = mapNeed(mp), c = cover(g);
    var gapOf = function (lvl, cv) { return cv >= 1 ? 0 : Math.max(0, lvl - (cv > 0 ? 1 : 0)); };
    var gl = gapOf(need[0], c.long), gc = gapOf(need[1], c.close);
    return gl > gc ? { role: "long", lvl: gl } : { role: "close", lvl: gc };
  }
  function tierOf(g) { return (C.GUNS[g.nn] || {}).tier; }
  function mapScore(g, mp) { return mapFit(g, mp) + (TIER_BONUS[tierOf(g)] || 0) + 0.4 * g._m.score / 100; }
  // Score of a gun in one role (long or close) on one map; withGun is the gun it will be carried with
  function roleScore(g, mp, role, withGun) {
    var w = roleWeights(g), info = C.MAPS[mp.id] || {}, pen = g._m.bestPen, cur = C.GUNS[g.nn] || {};
    var s = role === "long" ? w[2] : w[0] + 0.3 * w[1];
    if (info.armor && pen < 35) s -= 0.35;
    if (info.armor && pen >= 50) s += 0.12;
    if (cur.maps && cur.maps.indexOf(mp.id) >= 0) s += 0.25;
    s += (TIER_BONUS[cur.tier] || 0) + 0.4 * g._m.score / 100;
    if (!g.price) s -= 0.2; // only from loot or barter: harder to bring along
    if (withGun && withGun.cal === g.cal) s += 0.1;
    return s;
  }
  function topUnique(guns, scoreFn, n) {
    var seen = {};
    return guns.map(function (g) { return { g: g, s: scoreFn(g) }; })
      .sort(function (a, b) { return b.s - a.s; })
      .filter(function (r) { var k = sn(r.g); if (seen[k]) return false; seen[k] = 1; return true; })
      .slice(0, n).map(function (r) { return r.g; });
  }
  function rolePicks(mp, role, withGun, n) {
    var guns = D.guns.filter(function (g) {
      if (g === withGun || g.cls === "pistol" || g.cls === "lmg") return false;
      return cover(g)[role] >= 1;
    });
    return topUnique(guns, function (g) { return roleScore(g, mp, role, withGun); }, n);
  }
  function mapTopPicks(mp, n) {
    var guns = D.guns.filter(function (g) { return g.cls !== "pistol"; });
    return topUnique(guns, function (g) { return mapScore(g, mp); }, n);
  }

  // ------------------------------------------------------------------ rendering
  function renderInfo() {
    $("dataInfo").textContent = t("dataInfo", fmtDate(new Date(D.generated)), C.PATCH || "?", D.guns.length, D.version);
  }

  function renderClasses() {
    var grid = $("classGrid");
    grid.innerHTML = "";
    C.CLASSES.forEach(function (c) {
      var guns = D.guns.filter(function (g) { return g.cls === c.id; });
      if (!guns.length) return;
      var icon = gunByNN(c.icon) || guns[0];
      var b = document.createElement("button");
      b.className = "class-card" + (state.cls === c.id ? " sel" : "");
      b.innerHTML = '<img loading="lazy" alt="" src="' + esc(icon.img) + '"><div class="cn">' + esc(className(c.id)) + '</div><div class="cc">' + esc(t("models", guns.length)) + "</div>";
      b.onclick = function () { selectClass(c.id, true); };
      grid.appendChild(b);
    });
  }

  function sortedGuns(cls) {
    var guns = D.guns.filter(function (g) { return g.cls === cls; });
    var tierRank = { S: 0, A: 1, B: 2, C: 3 };
    var tierOf = function (g) { return (C.GUNS[g.nn] || {}).tier; };
    var rec = guns.filter(function (g) { return tierOf(g) === "S" || tierOf(g) === "A"; });
    rec.sort(function (a, b) { return (tierRank[tierOf(a)] - tierRank[tierOf(b)]) || (b._m.score - a._m.score); });
    if (!rec.length) rec = guns.slice().sort(function (a, b) { return b._m.score - a._m.score; }).slice(0, 3);
    var rest = guns.filter(function (g) { return rec.indexOf(g) < 0; }).sort(function (a, b) { return nm(a).localeCompare(nm(b)); });
    return { rec: rec, rest: rest };
  }

  function selectClass(cls, pickFirst) {
    state.cls = cls;
    renderClasses();
    var sel = $("modelSelect"), lists = sortedGuns(cls);
    sel.innerHTML = "";
    function add(group, g) {
      var o = document.createElement("option");
      var tier = (C.GUNS[g.nn] || {}).tier;
      o.value = g.id;
      o.textContent = (tier ? "[" + tier + "] " : "") + nm(g);
      group.appendChild(o);
    }
    var g1 = document.createElement("optgroup"); g1.label = t("recGroup");
    lists.rec.forEach(function (g) { add(g1, g); });
    var g2 = document.createElement("optgroup"); g2.label = t("allGroup");
    lists.rest.forEach(function (g) { add(g2, g); });
    sel.appendChild(g1); sel.appendChild(g2);
    $("stepModel").hidden = false;
    $("modelHint").textContent = (txt("classes", cls, "hint") || "") + " · " + t("models", lists.rec.length + lists.rest.length);
    sel.onchange = function () { selectGun(sel.value); };
    if (pickFirst) {
      var first = lists.rec[0] || lists.rest[0];
      sel.value = first.id;
      selectGun(first.id);
    } else if (state.gun && state.gun.cls === cls) {
      sel.value = state.gun.id;
    }
  }

  function selectGun(id) {
    var g = gunById(id);
    if (!g) return;
    state.gun = g;
    if (!g.builds[state.profile]) state.profile = "meta";
    $("modelSelect").value = id;
    $("weaponView").hidden = false;
    renderGun();
    setHash();
  }

  function renderGun() {
    var g = state.gun;
    renderHero(g);
    renderProfiles(g);
    renderStats(g);
    renderParts(g);
    renderAmmo(g);
    renderVerdict(g);
    renderProsCons(g);
    renderMaps(g);
    renderKit(g);
  }

  function renderHero(g) {
    var tier = (C.GUNS[g.nn] || {}).tier;
    var facts = [];
    facts.push('<span class="chip">' + esc(className(g.cls)) + "</span>");
    facts.push('<span class="chip">' + bdi(g.cal) + "</span>");
    if (g.modes.length) facts.push('<span class="chip">' + esc(g.modes.map(modeName).join(" / ")) + "</span>");
    if (g.rof) facts.push('<span class="chip">' + esc(t("rof", g.rof)) + "</span>");
    if (g.dist) facts.push('<span class="chip">' + esc(t("dist", g.dist)) + "</span>");
    var price = g.price ? rub(g.price.p) + " · " + sourceText(g.price) : t("gunNotSold");
    $("hero").innerHTML =
      '<div><div class="hero-img"><img alt="" src="' + esc(g.img) + '"></div><div class="note img-note">' + esc(t("imgNote")) + "</div></div>" +
      "<div><h2>" + bdi(sn(g)) + (tier ? '<span class="tier ' + tier + '" title="' + esc(t("tierLine")) + '">' + tier + "</span>" : "") + "</h2>" +
      '<div class="full">' + bdi(nm(g)) + "</div>" +
      '<div class="facts">' + facts.join("") + "</div>" +
      '<div class="note">' + esc(t("basePrice", price)) + "</div>" +
      '<div class="note"><a href="' + esc(g.link) + '" target="_blank" rel="noopener">tarkov.dev</a> · <a href="' + esc(g.wiki) + '" target="_blank" rel="noopener">Wiki</a></div></div>';
  }

  function renderProfiles(g) {
    var box = $("profileTabs");
    box.innerHTML = "";
    ["meta", "balanced", "budget"].forEach(function (pid) {
      var b = g.builds[pid];
      if (!b) return;
      var btn = document.createElement("button");
      btn.className = "ptab" + (state.profile === pid ? " sel" : "");
      btn.innerHTML = '<div class="pt">' + esc(t(pid + "_t")) + '</div><div class="pd">' + esc(t(pid + "_d")) + '</div><div class="pc">' + esc(t("profileLine", b.st.v, b.st.e, rub(b.st.cost))) + "</div>";
      btn.onclick = function () { state.profile = pid; renderGun(); setHash(); };
      box.appendChild(btn);
    });
  }

  function statBox(label, val, ref, lowerBetter, max) {
    var diff = "";
    if (ref != null && ref !== 0 && val != null) {
      var pc = Math.round((val - ref) / ref * 100);
      var good = lowerBetter ? pc < 0 : pc > 0;
      if (pc !== 0) diff = t("vsStock", '<span style="color:var(--' + (good ? "good" : "bad") + ')">' + (pc > 0 ? "+" : "") + pc + "%</span>", ref);
      else diff = esc(t("sameStock"));
    }
    var width = max ? Math.max(3, Math.min(100, val / max * 100)) : 0;
    return '<div class="stat"><div class="sl">' + esc(label) + '</div><div class="sv">' + val + '</div><div class="sd">' + diff + "</div>" +
      (max ? '<div class="bar"><i style="width:' + width + '%"></i></div>' : "") + "</div>";
  }

  function renderStats(g) {
    var b = build(g, state.profile), st = b.st, def = g.def || {};
    var gunPrice = g.price ? g.price.p : null;
    var maxV = Math.max(g.base.v, def.v || 0), maxH = Math.max(g.base.h, def.h || 0);
    $("statsCard").innerHTML =
      "<h3>" + esc(t("statsTitle")) + "</h3>" +
      '<div class="stats">' +
      statBox(t("vRecoil"), st.v, def.v, true, maxV) +
      statBox(t("hRecoil"), st.h, def.h, true, maxH) +
      statBox(t("ergo"), st.e, def.e, false, 100) +
      statBox(t("weight"), st.w, null, true, 0) +
      "</div>" +
      '<div class="cost-row"><div>' + esc(t("baseGun")) + " <b>" + rub(gunPrice) + "</b></div><div>" + esc(t("partsLbl")) + " <b>" + rub(st.cost) + "</b> " + esc(t("partsCount", st.parts)) + "</div>" +
      '<div class="total">' + esc(t("total", rub(st.cost + (gunPrice || 0)))) + "</div></div>" +
      '<div class="note">' + esc(t("costNote") + (st.unknown ? t("unknownNote", st.unknown) : "")) + "</div>";
  }

  function fxChips(it) {
    var out = [];
    if (it.r) out.push('<span class="chip ' + (it.r < 0 ? "good" : "bad") + '">' + esc(t("chipRecoil", (it.r > 0 ? "+" : "") + it.r)) + "</span>");
    if (it.e) out.push('<span class="chip ' + (it.e > 0 ? "good" : "bad") + '">' + esc(t("chipErgo", (it.e > 0 ? "+" : "") + it.e)) + "</span>");
    if (it.cap) out.push('<span class="chip">' + esc(t("chipRounds", it.cap)) + "</span>");
    if (it.nf) out.push('<span class="chip warn">' + esc(t("chipNoFlea")) + "</span>");
    return out.join("");
  }

  function renderParts(g) {
    var b = build(g, state.profile);
    var rows = walk(b.tree, 0, null, null, []).slice(1);
    var html = '<div class="parts-head"><h3>' + esc(t("partsTitle")) + '</h3><span class="note">' + esc(t("partsHint")) + "</span></div>";
    // Outline numbers keep every row aligned and still show the tree: 3.1 mounts on part 3
    var counters = [];
    rows.forEach(function (r) {
      counters.length = r.depth;
      counters[r.depth - 1] = (counters[r.depth - 1] || 0) + 1;
      r.num = counters.join(".");
    });
    rows.forEach(function (r) {
      var it = item(r.node.i);
      var on = r.parent.i === g.id ? esc(t("gunBody")) : bdi(sn(item(r.parent.i)));
      var where = esc(t("slotLbl", slotName(r.slot))) + " · " + t("mountedOn", on);
      html += '<div class="part' + (r.node.o ? " optic" : "") + (r.depth > 1 ? " child" : "") + '">' +
        '<div class="idx">' + bdi(r.num) + "</div>" +
        '<div class="pimg">' + (it.img ? '<img loading="lazy" alt="" src="' + esc(it.img) + '">' : "") + "</div>" +
        '<div><div class="pn">' + bdi(nm(it)) + "</div>" +
        '<div class="pw">' + where + (r.node.o ? " · <b>" + esc(t("opticLbl")) + "</b>" : "") + "</div>" +
        '<div class="pfx">' + fxChips(it) + "</div></div>" +
        '<div class="pp"><div class="price">' + rub(it.p) + '</div><div class="src">' + esc(sourceText(it)) + "</div></div></div>";
    });
    var hasSuppressor = rows.some(function (r) { return item(r.node.i).c === "Silencer"; });
    var note = metaNote();
    if (note && !hasSuppressor) html += '<div class="note"><b>' + esc(t("whyNoSup")) + "</b> " + esc(note) + "</div>";
    if (b.alt && b.alt.length) {
      var alt = b.alt.map(function (id) { return bdi(nm(item(id))) + " (" + rub(item(id).p) + ")"; }).join(" + ");
      html += '<div class="alt-optic">' + t("altOptic", alt) + "</div>";
    }
    $("partsCard").innerHTML = html;
  }

  function renderAmmo(g) {
    var html = "<h3>" + esc(t("ammoTitle")) + "</h3>";
    if (!g.ammo.length) { $("ammoCard").innerHTML = html + '<div class="empty">' + esc(t("noAmmo")) + "</div>"; return; }
    html += '<div class="ammo-grid">';
    g.ammo.forEach(function (a) {
      var it = item(a.i);
      html += '<div class="ammo"><img loading="lazy" alt="" src="' + esc(it.img) + '"><div>' +
        '<div class="at">' + esc(t("tag_" + a.tag)) + "</div>" +
        '<div class="an">' + bdi(nm(it)) + "</div>" +
        '<div class="as">' + esc(t("ammoStats", it.pen, it.dmg + (it.proj ? "x" + it.proj : ""), it.adm)) + "</div>" +
        '<div class="as">' + esc((it.p != null ? t("perRound", rub(it.p)) + " · " : "") + sourceText(it)) + "</div></div></div>";
    });
    html += "</div>";
    html += '<div class="note">' + esc(t("ammoNote")) + "</div>";
    $("ammoCard").innerHTML = html;
  }

  function renderVerdict(g) {
    var tier = (C.GUNS[g.nn] || {}).tier;
    var html = "<h3>" + esc(t("verdictTitle")) + "</h3>";
    if (tier) html += '<div class="curated">' + esc(t("tierLine")) + ' <span class="tier ' + tier + '">' + tier + '</span></div><div class="note">' + esc(t("tierScale")) + "</div>";
    else html += '<div class="note">' + esc(t("noTier")) + "</div>";
    html += '<div class="curated">' + esc(txt("guns", g.nn, "summary") || txt("classes", g.cls, "role_text") || "") + "</div>";
    var tip = txt("guns", g.nn, "pve") || txt("classes", g.cls, "pve");
    if (tip) html += '<div class="pve-tip"><b>' + esc(t("pveTip")) + "</b> " + esc(tip) + "</div>";
    $("verdictCard").innerHTML = html;
  }

  function uniq(list) {
    var seen = {}, out = [];
    list.forEach(function (s) { if (!seen[s]) { seen[s] = 1; out.push(s); } });
    return out;
  }
  function renderProsCons(g) {
    var auto = autoProsCons(g);
    var pros = uniq((txt("guns", g.nn, "pros") || []).concat(auto.pros)).slice(0, 7);
    var cons = uniq((txt("guns", g.nn, "cons") || []).concat(auto.cons)).slice(0, 7);
    var li = function (arr, ic) {
      return arr.length ? arr.map(function (s) { return '<li><span class="ic">' + ic + "</span><span>" + esc(s) + "</span></li>"; }).join("")
        : '<li><span class="ic"></span><span class="note">' + esc(t("nothing")) + "</span></li>";
    };
    $("prosCard").innerHTML = "<h3>" + esc(t("pros")) + '</h3><ul class="pc pros">' + li(pros, "+") + "</ul>" +
      '<h3 style="margin-top:.9rem">' + esc(t("cons")) + '</h3><ul class="pc cons">' + li(cons, "-") + "</ul>";
  }

  function bossLine(mp) {
    if (!mp.b || !mp.b.length) return "";
    return t("bossLine", mp.b.slice(0, 5).map(function (x) { return nm(x) + " (" + Math.round(x.c * 100) + "%)"; }).join(", "));
  }
  function renderMaps(g) {
    var plan = mapPlan(g);
    var html = "<h3>" + esc(t("mapsTitle")) + "</h3>";
    var note = txt("guns", g.nn, "mapNote");
    if (note) html += '<div class="curated">' + esc(note) + "</div>";
    plan.good.forEach(function (r, i) {
      html += '<div class="map"><div class="mh"><span class="mn">' + bdi(nm(r.mp)) + '</span><span class="fit hi">' + esc(i === 0 ? t("fitBest") : t("fitGood")) + "</span></div>" +
        '<div class="mr">' + esc(txt("maps", r.mp.id) || "") + "</div>" +
        '<div class="mb">' + esc(bossLine(r.mp)) + (r.mp.dur ? " · " + esc(t("raidLen", r.mp.dur)) : "") + "</div></div>";
    });
    html += '<div class="subhead">' + esc(t("worseHead")) + "</div>";
    plan.bad.forEach(function (r) {
      html += '<div class="map avoid"><div class="mh"><span class="mn">' + bdi(nm(r.mp)) + '</span><span class="fit lo">' + esc(t("fitWorse")) + "</span></div>" +
        '<div class="mr">' + esc(txt("maps", r.mp.id) || "") + "</div></div>";
    });
    $("mapsCard").innerHTML = html;
  }

  // A clickable weapon tile that opens the weapon's builds
  function gunTile(g, withGun) {
    var tier = tierOf(g), chips = '<span class="chip">' + esc(className(g.cls)) + '</span><span class="chip">' + bdi(g.cal) + "</span>";
    if (withGun && withGun.cal === g.cal) chips += '<span class="chip good">' + esc(t("sameAmmo")) + "</span>";
    return '<button class="gtile" data-gun="' + esc(g.id) + '"><img loading="lazy" alt="" src="' + esc(g.img) + '">' +
      '<div><div class="gn">' + bdi(sn(g)) + (tier ? '<span class="tier ' + tier + '">' + tier + "</span>" : "") + "</div>" +
      '<div class="gm">' + chips + "</div></div></button>";
  }
  function wireTiles(box) {
    Array.prototype.forEach.call(box.querySelectorAll(".gtile"), function (b) {
      b.onclick = function () { openGun(b.getAttribute("data-gun")); };
    });
  }
  function lvlBadge(lvl) { return '<span class="lvl l' + lvl + '">' + esc(t("lvl" + lvl)) + "</span>"; }

  // Second weapon for the raid, for the map the user picks (default: the gun's best map)
  function renderKit(g) {
    var mp = (state.map && mapById(state.map)) || mapPlan(g).good[0].mp;
    var html = "<h3>" + esc(t("kitTitle")) + "</h3>" +
      '<div class="model-row"><label for="kitMap">' + esc(t("kitMapLbl")) + '</label><select id="kitMap">' +
      playableMaps().map(function (m) { return '<option value="' + esc(m.id) + '"' + (m.id === mp.id ? " selected" : "") + ">" + esc(nm(m)) + "</option>"; }).join("") +
      "</select></div>";
    if (mapFit(g, mp) < FIT_BAD) {
      html += '<div class="kit-warn">' + esc(t("badFit", nm(mp))) + ' <button class="linkbtn" id="kitSeeMap">' + esc(t("seeMapPicks", nm(mp))) + "</button></div>";
    }
    var gap = kitGap(g, mp);
    if (!gap.lvl) {
      html += '<div class="kit-need">' + lvlBadge(0) + " " + esc(t("kitNone", sn(g), nm(mp))) + "</div>";
    } else {
      var roleN = t(gap.role === "long" ? "roleLongN" : "roleCloseN");
      html += '<div class="kit-need">' + lvlBadge(gap.lvl) + " <b>" + esc(t("kitGap", roleN)) + "</b></div>" +
        '<div class="note">' + esc(t(gap.role === "long" ? "kitWhyLong" : "kitWhyClose")) + "</div>" +
        '<div class="subhead">' + esc(t("kitPicks")) + '</div><div class="gtiles">' +
        rolePicks(mp, gap.role, g, 3).map(function (x) { return gunTile(x, g); }).join("") + "</div>";
    }
    var tip = txt("kit", mp.id);
    if (tip) html += '<div class="pve-tip"><b>' + esc(t("inMap")) + "</b> " + esc(tip) + "</div>";
    var box = $("kitCard");
    box.innerHTML = html;
    wireTiles(box);
    $("kitMap").onchange = function () { state.map = this.value; renderKit(g); setHash(); };
    if ($("kitSeeMap")) $("kitSeeMap").onclick = function () { state.map = mp.id; setMode("map"); window.scrollTo(0, 0); };
  }

  function openGun(id) {
    var g = gunById(id);
    if (!g) return;
    setMode("gun", true);
    selectClass(g.cls, false);
    selectGun(id);
    $("weaponView").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ------------------------------------------------------------------ map-first view
  function setMode(mode, quiet) {
    state.mode = mode;
    $("gunMode").hidden = mode !== "gun";
    $("mapMode").hidden = mode !== "map";
    Array.prototype.forEach.call(document.querySelectorAll("#modeTabs button"), function (b) {
      b.classList.toggle("sel", b.getAttribute("data-mode") === mode);
    });
    if (mode === "map") { renderMapGrid(); renderMapView(); }
    if (!quiet) setHash();
  }
  function renderMapGrid() {
    var grid = $("mapGrid");
    grid.innerHTML = "";
    playableMaps().forEach(function (mp) {
      var need = mapNeed(mp), chips = "";
      if (need[0] >= 2) chips += '<span class="chip">' + esc(t("rangeLong")) + "</span>";
      if (need[1] >= 2) chips += '<span class="chip">' + esc(t("rangeClose")) + "</span>";
      var b = document.createElement("button");
      b.className = "class-card map-card" + (state.map === mp.id ? " sel" : "");
      b.innerHTML = '<div class="cn">' + bdi(nm(mp)) + '</div><div class="mc">' + chips + "</div>" +
        (mp.dur ? '<div class="cc">' + esc(t("raidLen", mp.dur)) + "</div>" : "");
      b.onclick = function () { state.map = mp.id; renderMapGrid(); renderMapView(); setHash(); };
      grid.appendChild(b);
    });
  }
  function renderMapView() {
    var mp = state.map && mapById(state.map);
    $("mapView").hidden = !mp;
    if (!mp) return;
    var need = mapNeed(mp);
    var info = "<h2>" + bdi(nm(mp)) + "</h2>" +
      '<div class="curated">' + esc(txt("maps", mp.id) || "") + "</div>" +
      '<div class="note">' + esc(bossLine(mp)) + (mp.dur ? " · " + esc(t("raidLen", mp.dur)) : "") + "</div>" +
      '<div class="subhead">' + esc(t("mapNeedTitle")) + "</div>" +
      '<div class="need-row"><span>' + esc(t("roleLong")) + "</span>" + lvlBadge(need[0]) + "</div>" +
      '<div class="need-row"><span>' + esc(t("roleClose")) + "</span>" + lvlBadge(need[1]) + "</div>";
    if (need[0] >= 2 && need[1] >= 2) info += '<div class="curated"><b>' + esc(t("twoGuns")) + "</b></div>";
    else if (!need[0] || !need[1]) info += '<div class="curated"><b>' + esc(t("oneGun")) + "</b></div>";
    var tip = txt("kit", mp.id);
    if (tip) info += '<div class="pve-tip">' + esc(tip) + "</div>";
    $("mapInfo").innerHTML = info;

    var combo = $("mapCombo");
    if (need[0] && need[1]) {
      // Main weapon = the role the map needs more; a tie goes to long range
      var order = need[1] > need[0] ? ["close", "long"] : ["long", "close"];
      combo.innerHTML = "<h3>" + esc(t("comboTitle")) + '</h3><div class="note">' + esc(t("comboHint")) + '</div><div class="combo">' +
        order.map(function (role, i) {
          return '<div class="combo-col"><div class="subhead">' + bdi(String(i + 1)) + ". " + esc(t(role === "long" ? "roleLong" : "roleClose")) + " " + lvlBadge(need[role === "long" ? 0 : 1]) + "</div>" +
            '<div class="gtiles col">' + rolePicks(mp, role, null, 3).map(function (x) { return gunTile(x); }).join("") + "</div></div>";
        }).join("") + "</div>";
      combo.hidden = false;
      wireTiles(combo);
    } else {
      combo.hidden = true;
    }

    var top = $("mapTop");
    top.innerHTML = "<h3>" + esc(t("mapTopTitle", nm(mp))) + '</h3><div class="note">' + esc(t("mapPickHint")) + '</div><div class="gtiles">' +
      mapTopPicks(mp, 8).map(function (x) { return gunTile(x); }).join("") + "</div>";
    wireTiles(top);
  }

  function renderFooter() {
    var labels = (textChain()[0] || {}).sources || (C.TEXT.he || {}).sources || [];
    var src = (C.SOURCES || []).map(function (s, i) { return '<a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(labels[i] || s.u) + "</a>"; }).join(" · ");
    $("footer").innerHTML =
      "<p>" + esc(t("f1") + " " + (WEB ? t("f1web") : t("f1local"))) + "</p>" +
      "<p>" + t("f2", src) + "</p>" +
      "<p>" + esc(t("f3")) + "</p>";
  }

  // ------------------------------------------------------------------ data freshness / live refresh
  var poll = { timer: null, until: 0 };
  function banner(key, args, err) {
    var b = $("banner");
    lastBanner = key ? [key, args, err] : null;
    if (!key) { b.hidden = true; return; }
    b.hidden = false;
    b.className = "banner" + (err ? " err" : "");
    b.textContent = t.apply(null, [key].concat(args || []));
  }
  function loadScript(src, cb) {
    var s = document.createElement("script");
    s.src = src + "?t=" + Date.now();
    s.onload = function () { s.remove(); cb(true); };
    s.onerror = function () { s.remove(); cb(false); };
    document.head.appendChild(s);
  }
  function stopPolling() { clearInterval(poll.timer); poll.timer = null; }
  function startPolling(minutes) {
    poll.until = Date.now() + minutes * 60000;
    if (poll.timer) return;
    poll.timer = setInterval(function () {
      if (Date.now() > poll.until) { stopPolling(); if (!D) banner("bNoData", [], true); return; }
      loadScript("data/status.js", function () {
        var st = window.EFT_STATUS;
        if (!st) return;
        if (st.state === "error") { banner("bFailed", [st.msg], true); stopPolling(); return; }
        if (st.state === "ok" && (!D || st.ts > D.generatedTs + 1)) {
          loadScript("data/eft-data.js", function () {
            if (!window.EFT_DATA) return;
            init(true);
            banner("bUpdated");
            setTimeout(function () { banner(null); }, 6000);
            stopPolling();
          });
        } else if (st.state === "running") {
          banner("bUpdating");
        }
      });
    }, 4000);
  }
  function freshness() {
    var st = window.EFT_STATUS;
    var ageH = D ? (Date.now() / 1000 - D.generatedTs) / 3600 : 0;
    if (WEB) { // hosted copy: the server refreshes the data, the page only reports when it is late
      if (!D) banner("bNoData", [], true);
      else if (ageH > 12) banner("bStaleWeb", [Math.round(ageH)]);
      return;
    }
    if (!D) { banner("bFirst"); startPolling(4); return; }
    if (st && st.state === "running" && st.ts > D.generatedTs) { banner("bUpdating"); startPolling(4); }
    else if (st && st.state === "error" && st.ts > D.generatedTs) banner("bLastFailed", [st.msg, fmtDate(new Date(D.generated))], true);
    else if (ageH > 6) { banner("bStale", [Math.round(ageH)]); startPolling(3); }
  }

  // ------------------------------------------------------------------ boot
  function init(keepSelection) {
    D = window.EFT_DATA;
    if (!D) { freshness(); renderFooter(); return; }
    computeClassStats();
    renderInfo();
    renderFooter();
    var h = hashParams();
    var keepGun = keepSelection && state.gun ? state.gun.nn : null;
    if (!keepSelection && h.p && ["meta", "balanced", "budget"].indexOf(h.p) >= 0) state.profile = h.p;
    if (!keepSelection && h.m && mapById(h.m)) state.map = h.m;
    var g = gunByNN(keepGun || h.g || "");
    if (g) { selectClass(g.cls, false); selectGun(g.id); }
    else renderClasses();
    if (!keepSelection && h.v === "map") state.mode = "map";
    setMode(state.mode, state.mode !== "map");
    if (!keepSelection) freshness();
  }
  Array.prototype.forEach.call(document.querySelectorAll("#modeTabs button"), function (b) {
    b.onclick = function () { if (D) setMode(b.getAttribute("data-mode")); };
  });
  applyStatic();
  init(false);
})();
