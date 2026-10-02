/* EFT Builds - English text for content.js (same shape as TEXT.he). */
window.EFT_CONTENT.TEXT.en = {
  meta_note: "Since patch 1.0.4.5 (April 2026), muzzle brakes and compensators reduce recoil more than suppressors, longer barrels reduce more recoil, and handguards no longer reduce recoil at all. That is why most builds here are \"loud\", without a suppressor, which is exactly the direction BSG wanted.",
  classes: {
    ar: { n: "Assault rifles", hint: "The most versatile weapons: good on almost any map",
      role_text: "Assault rifle: an all-round weapon for short and medium range that fits almost any map.",
      pve: "PvE AI reacts fast and hits accurately at medium range. Short bursts to the chest and head with penetrating ammo work best." },
    carbine: { n: "Carbines", hint: "Silent 9x39 rifles, carbines and classic semi-auto rifles",
      role_text: "Carbine: a compact weapon for short to medium range.",
      pve: "The silent 9x39 rifles are excellent in PvE: the AI struggles to locate the shooter, and SP-6 or BP drop even armored guards." },
    smg: { n: "SMGs", hint: "For close-quarters fights inside buildings",
      role_text: "SMG: high fire rate and low recoil for short range, mostly indoors.",
      pve: "In PvE an SMG with penetrating ammo handles most AI, but against bosses in Class 5-6 armor aim for the head or the legs." },
    shotgun: { n: "Shotguns", hint: "Huge power point-blank, weak at range",
      role_text: "Shotgun: lots of damage up close, nearly useless at medium range and beyond.",
      pve: "AP-20 (a single slug, penetration 37) is the only 12ga round that deals with armor. With buckshot, aim for the legs and the head." },
    dmr: { n: "Marksman rifles (DMR)", hint: "Accurate semi-autos for medium to long range",
      role_text: "Marksman rifle: an accurate, powerful shot for medium to long range at a semi-auto pace.",
      pve: "In PvE the DMR may be the most effective weapon: AI does not dodge like players, and two penetrating 7.62x51 shots drop almost anyone. They got a recoil buff in patch 1.0.4.5." },
    sniper: { n: "Sniper rifles", hint: "Bolt action and long range",
      role_text: "Sniper rifle: one powerful, accurate shot from long range, very slow up close.",
      pve: "The AI hears the shot and comes to check. Change position after shooting, and carry an SMG or a good pistol as a secondary for close range." },
    lmg: { n: "Machine guns", hint: "Lots of fire and huge magazines",
      role_text: "Machine gun: a big volume of fire and a huge magazine, heavy and less agile.",
      pve: "Excellent against groups of AI (Raiders, Rogues, Goons, Glukhar's guards). All machine guns got a recoil buff in patch 1.0.4.5." },
    pistol: { n: "Pistols", hint: "Secondary and backup weapon",
      role_text: "Pistol: a backup weapon for very short range.",
      pve: "In PvE a pistol is mainly a backup. If you use one, pick one with penetrating ammo or full auto." }
  },
  maps: {
    "factory": "A small, closed map: close fights in corridors and rooms. Tagilla roams with a sledgehammer and heavy armor (up to Class 6).",
    "night-factory": "Factory at night: the same close fighting in the dark, and Tagilla shows up more often. Bring a flashlight or night vision.",
    "customs": "A varied map: close fights in the dorms, medium range around construction and the Scav base, long range across the fields. Reshala and his guards (armor up to Class 5), sometimes the Goons.",
    "woods": "Open forest with long ranges and little cover. Shturman and his guards at the sawmill, sometimes the Goons.",
    "lighthouse": "Since patch 1.1.5: Glukhar and his guards hold the water treatment plant, and the Rogues moved to the chalets on the hill. The mines and mounted guns were removed. Medium to long ranges.",
    "shoreline": "A big map: long ranges outside and close fights inside the resort. Sanitar and his guards, the Goons near the weather station.",
    "reserve": "A military base with buildings and bunkers, short to medium fights. Glukhar is no longer here (he moved to Lighthouse), but armored Raiders come out of the bunkers.",
    "interchange": "A huge mall: fights inside buildings and long corridors, medium range in the parking lots. Killa (Class 5 armor and helmet) and Tagilla.",
    "streets-of-tarkov": "A ruined city: streets, buildings and windows, short to medium range. Kaban with guards and snipers, and Kollontay with his squad.",
    "the-lab": "An underground lab: CQB against many armored Raiders (up to Class 5). Requires a keycard.",
    "the-lab-dark": "The lab in the dark (Blackout): The Wedge, Raiders and Black Division in Class 5-6 armor. High penetration and night vision are a must.",
    "ground-zero": "The starter map: a business district, short to medium ranges and relatively easy enemies.",
    "ground-zero-21": "Ground Zero for level 21+ players: the same map with tougher enemies.",
    "terminal": "Your gear is confiscated on entry, so the build does not matter there.",
    "the-labyrinth": "An underground maze with traps: Shadow of Tagilla (Class 6 armor and helmet) and Vengeful Killa. Very short fights.",
    "icebreaker": "A ship with narrow corridors, PvE only: The Wedge, Knight with Rogues, and Black Division in Class 5-6 armor. You need penetration of 55 or more."
  },
  kit: {
    "factory": "Close fighting only: one automatic weapon with penetrating ammo is enough. A long-range gun just weighs you down.",
    "night-factory": "Close fighting in the dark: one automatic weapon with penetrating ammo and a flashlight is enough. A second gun does not help here.",
    "customs": "An automatic weapon for the dorms and the Scav base is the core. If you want to control the open fields you can add a DMR, but it is not required.",
    "woods": "Most fights happen across open fields at long range, so a sniper rifle or DMR is the core. At the sawmill, against Shturman's guards and in close surprises, a second automatic weapon saves the raid.",
    "lighthouse": "Two weapons: a long-range gun for the hills and the coast, and an automatic weapon with 50+ penetration for the water treatment plant (Glukhar and his guards) and the Rogue chalets.",
    "shoreline": "Long ranges outside and close fighting inside the resort, so a long-range gun plus an automatic weapon is the safest combination.",
    "reserve": "Most fights are short to medium inside buildings and bunkers, against armored Raiders. A strong automatic weapon is a must; a DMR on top only pays off in the open courtyards.",
    "interchange": "A closed mall: one automatic weapon with high penetration (for Killa) is enough. There are no long sightlines that justify a sniper rifle.",
    "streets-of-tarkov": "Most fights are inside buildings and on short streets, so an automatic weapon is the core. A DMR on top helps against Kaban's snipers down the long streets.",
    "the-lab": "CQB against armored Raiders: one automatic weapon with high penetration. A second gun only adds weight.",
    "the-lab-dark": "Darkness and close fighting: one automatic weapon with high penetration plus night vision. A second gun does not help here.",
    "ground-zero": "Short to medium ranges and easy enemies: any decent automatic weapon is enough on its own.",
    "ground-zero-21": "Tougher enemies, but still short to medium ranges: one automatic weapon with good ammo is enough.",
    "the-labyrinth": "Narrow corridors and traps: one short automatic weapon that can handle Class 6 armor. A long gun only gets in the way.",
    "icebreaker": "Narrow ship corridors: one automatic weapon with 55+ penetration. A sniper rifle has no use here."
  },
  guns: {
    "desert-tech-mdr-762x51-assault-rifle": {
      summary: "A 7.62x51 bullpup with high ergonomics: one of the few weapons that fires 60+ penetration ammo in full auto (M61 by barter from Ref, M993 from loot). Top of the 2026 meta lists.",
      pros: ["7.62x51 with M61 or M993 drops even Raiders and Black Division in a few rounds", "High base ergonomics (67) for its caliber"],
      cons: ["Flea-banned: get it from traders, barters or loot", "7.62x51 recoil is noticeable in full auto, short bursts are better"],
      pve: "The best weapon for raids on Rogues, Glukhar and Black Division. Single shots or 2-round bursts to the chest." },
    "sig-mcx-spear-68x51-assault-rifle": {
      summary: "A 6.8x51 rifle with Hybrid ammo (penetration 47, damage 72): lots of power in a flexible assault rifle.",
      pros: ["High damage per round with decent penetration"],
      cons: ["Flea-banned", "High base recoil and only two ammo types"] },
    "custom-guns-nl545-di-545x39-assault-rifle": {
      summary: "A 5.45 AR added in 1.0: 800 rpm and the strong 5.45 ammo. One 2026 source ranks it as the flattest weapon in the game.",
      pros: ["Uses 5.45: 7N40 is sold by Prapor and BP is craftable"],
      cons: ["The weapon itself is very expensive"] },
    "custom-guns-nl545-gp-545x39-assault-rifle": {
      summary: "The GP version of the NL545: 850 rpm and 5.45. Reshala sometimes carries it.",
      pros: ["Uses 5.45: 7N40 is sold by Prapor and BP is craftable"],
      cons: ["The weapon itself is very expensive"] },
    "hk-416a5-556x45-assault-rifle": {
      summary: "The German AR: reliable, 850 rpm, and its base recoil was improved in patch 1.0.4.5. Rated A in every meta list.",
      cons: ["High base recoil: without a good stock and barrel it is jumpy"] },
    "hk-416a5-556x45-assault-rifle-ral-8000": {
      summary: "The same HK 416A5 in RAL 8000 (added in 1.1.0). Exactly the same stats." },
    "colt-m4a1-556x45-assault-rifle": {
      summary: "The most flexible platform in the game: endless parts, fair prices and available 5.56 ammo. A safe pick at any stage.",
      pros: ["A huge number of parts, easy to build on any budget"],
      cons: ["The strong ammo (M995, SSA AP) is loot-only in PvE"] },
    "cmmg-mk47-mutant-762x39-assault-rifle": {
      summary: "A 7.62x39 AR: high damage and good penetration with BP and MAI AP. Rated S in late 2025 and got a recoil buff in 1.0.4.5.",
      pros: ["High damage per round with BP (penetration 47, damage 58)"] },
    "rifle-dynamics-rd-704-762x39-assault-rifle": {
      summary: "A modern 7.62x39 AK with excellent ergonomics when built. One of the best value picks for mid-wipe." },
    "sag-ak-545-545x39-carbine": {
      summary: "A 5.45 AK with very high ergonomics and a low price: great value for money." },
    "sag-ak-545-short-545x39-carbine": {
      summary: "The short version of the AK-545: even more agile, excellent indoors." },
    "kalashnikov-ak-74m-545x39-assault-rifle": {
      summary: "The classic 5.45 AK: cheap, parts everywhere, 7N40 from Prapor and BP by craft. An excellent workhorse, especially as a \"loud\" build with a muzzle brake." },
    "kalashnikov-ak-74n-545x39-assault-rifle": {
      summary: "An AK-74 with a scope rail. Cheap and reliable, a budget weapon recommended by 2026 sources." },
    "kalashnikov-ak-105-545x39-assault-rifle": {
      summary: "A short 5.45 AK with comfortable recoil. A build with a muzzle brake works better than a suppressor (2026 sources)." },
    "kalashnikov-ak-12-545x39-assault-rifle": {
      summary: "A modern 5.45 AK with built-in rails, 700 rpm." },
    "kalashnikov-akm-762x39-assault-rifle": {
      summary: "AKM in 7.62x39: cheap with high damage. Stronger recoil than 5.45, but it got a buff in 1.0.4.5." },
    "kalashnikov-akms-762x39-assault-rifle": {
      summary: "An AKM with a folding stock: cheap and high damage." },
    "steyr-aug-a3-556x45-assault-rifle": {
      summary: "A 5.56 bullpup with base ergonomics of 95 and low recoil straight out of the box. Few upgrade parts, but it does not need many.",
      pros: ["Good even without upgrades: cheap to run"] },
    "steyr-aug-a3-556x45-assault-rifle-black": {
      summary: "AUG A3 in black: the same excellent out-of-the-box stats." },
    "steyr-aug-a1-556x45-assault-rifle": {
      summary: "The veteran AUG: high ergonomics and low recoil, with a built-in scope." },
    "desert-tech-mdr-556x45-assault-rifle": {
      summary: "A 5.56 bullpup with the lowest base recoil among 5.56 rifles, and good ergonomics." },
    "fn-scar-h-x-17-762x51-assault-rifle": {
      summary: "SCAR-H in the X-17 version: full-auto 7.62x51 with the same stats as the Mk 17, but sold on the flea.",
      pros: ["Full-auto 7.62x51 you can buy on the flea"] },
    "fn-scar-h-762x51-assault-rifle": {
      summary: "SCAR-H: full-auto 7.62x51, the weapon of Knight from the Goons. Flea-banned (the X-17 is identical and sold)." },
    "fn-scar-l-556x45-assault-rifle": {
      summary: "SCAR-L in 5.56: low recoil and reliable, 650 rpm." },
    "howa-type-20-556x45-assault-rifle": {
      summary: "New in patch 1.1.0 (August 2026): among the lowest base recoil in 5.56. No community verdict yet. Flea-banned." },
    "norinco-qbz-191-58x42-assault-rifle": {
      summary: "New in patch 1.1.0 with a new 5.8x42 caliber. The strong ammo (DVC12, penetration 52) is rare. Flea-banned, Black Division carry it." },
    "kalashnikov-ak-308-762x51-assault-rifle": {
      summary: "A 7.62x51 AK: .308 power in an AK body, with heavy recoil." },
    "sig-mcx-300-blackout-assault-rifle": {
      summary: "MCX in .300 Blackout: compact, AP (penetration 48, craftable) is very good at short to medium range." },
    "aklys-defense-velociraptor-300-blackout-assault-rifle": {
      summary: "A .300 Blackout rifle with low base recoil for its caliber. Got a buff in 1.0.4.5." },
    "ash-12-127x55-assault-rifle": {
      summary: "12.7x55: huge damage per round (102 with PS12B). Excellent against unarmored bosses like Kaban and Sanitar." },
    "colt-m16a2-556x45-assault-rifle": {
      summary: "M16A2: single and burst fire only, no full auto.",
      cons: ["No full auto: single or 3-round burst"] },
    "colt-m16a1-556x45-assault-rifle": {
      summary: "The veteran M16A1 with full auto. Raiders carry it." },
    "ds-arms-sa58-762x51-assault-rifle": {
      summary: "An American FAL in 7.62x51: powerful, but with some of the worst recoil and ergonomics in its class." },
    "as-val-9x39-special-assault-rifle": {
      summary: "The classic silent weapon: 900 rpm of 9x39. SP-6 (penetration 48) is sold by a trader, and BP (penetration 54) from loot drops even Raiders.",
      pros: ["Built-in suppressor: the AI struggles to locate you", "SP-6 is sold by a trader and BP from loot penetrates even Class 5"],
      cons: ["The bullet is slow and drops fast: not for long range"] },
    "as-val-mod4-9x39-special-assault-rifle": {
      summary: "An improved VAL with the lowest base recoil in its class. Flea-banned, Glukhar carries it." },
    "sr-3m-9x39-compact-assault-rifle": {
      summary: "Compact 9x39: the same power as the VAL in a short body. Flea-banned." },
    "kbp-9a-91-9x39-compact-assault-rifle": {
      summary: "Cheap and compact 9x39: the cheap way into BP ammo." },
    "kbp-vsk-94-9x39-rifle": {
      summary: "9x39 with a stock: cheap and more accurate than the 9A-91." },
    "toz-simonov-sks-762x39-carbine": {
      summary: "A cheap 7.62x39 semi-auto: a good starter weapon." },
    "molot-arms-simonov-op-sks-762x39-carbine": {
      summary: "A civilian SKS: a cheap semi-auto for the early game." },
    "tokarev-svt-40-762x54r-rifle": {
      summary: "A World War II rifle in 7.62x54R: powerful but with poor ergonomics." },
    "tokarev-avt-40-762x54r-automatic-rifle": {
      summary: "An SVT with full auto: full-auto 7.62x54R, very hard to control." },
    "hk-mp7a2-46x30-submachine-gun": {
      summary: "The best SMG against armor: AP SX (penetration 53) beats Class 5, very low recoil and 950 rpm.",
      pros: ["AP SX is the only SMG ammo that handles Class 5"],
      cons: ["Low damage per round: needs many hits", "AP SX only by craft or from loot"] },
    "hk-mp7a1-46x30-submachine-gun": {
      summary: "The original MP7: the same penetrating 4.6x30, very low recoil.",
      pros: ["AP SX is the only SMG ammo that handles Class 5"],
      cons: ["Low damage per round: needs many hits"] },
    "tdi-kriss-vector-gen2-9x19-submachine-gun": {
      summary: "A crazy fire rate and very low vertical recoil. The ammo (PBP, penetration 39) is weak against Class 5-6." },
    "tdi-kriss-vector-gen2-45-acp-submachine-gun": {
      summary: "Vector in .45: 1100 rpm with high damage. .45 AP (penetration 38) is limited against heavy armor." },
    "sig-mpx-9x19-submachine-gun": {
      summary: "A very controllable 9x19 SMG with many parts. With PBP it is a good endgame pick." },
    "hk-mp5-9x19-submachine-gun-navy-3-round-burst": {
      summary: "The classic MP5: stable and accurate, 9x19." },
    "fn-p90-57x28-submachine-gun": {
      summary: "50 rounds in the magazine and low recoil. SS190 (penetration 37) is weak against heavy armor.",
      pros: ["A 50-round magazine without a drum mag"] },
    "fn-p90-57x28-submachine-gun-scourge": {
      summary: "The Scourge version of the P90 (2026). Flea-banned." },
    "hk-ump-45-acp-submachine-gun": {
      summary: "A cheap .45 SMG recommended on a budget: high damage, a slow and comfortable fire rate." },
    "sr-2m-veresk-9x21-submachine-gun": {
      summary: "Russian 9x21: 7N42 (penetration 38) and lots of damage per round." },
    "pp-19-01-vityaz-9x19-submachine-gun": {
      summary: "A cheap Russian SMG available early. A good budget weapon." },
    "soyuz-tm-stm-9-gen2-9x19-carbine": {
      summary: "A 9x19 carbine in an AR body: very low recoil when built." },
    "saiga-9-9x19-carbine": {
      summary: "A semi-auto 9x19 carbine. Single fire only." },
    "bt-mp9-9x19-submachine-gun": {
      summary: "MP9: very compact and agile, 9x19." },
    "bt-mp9-n-9x19-submachine-gun": {
      summary: "MP9-N: compact and agile, 9x19." },
    "iwi-uzi-pro-smg-9x19-submachine-gun": {
      summary: "UZI PRO: compact and agile in 9x19." },
    "ppsh-41-762x25-submachine-gun": {
      summary: "PPSh-41: 1000 rpm in 7.62x25, but poor ergonomics." },
    "saiga-12k-12ga-automatic-shotgun": {
      summary: "A full-auto shotgun: 450 rpm of buckshot. Wipes out anything within 15 meters. Tagilla carries it." },
    "mps-auto-assault-12-gen-2-12ga-automatic-shotgun": {
      summary: "AA-12: a full-auto shotgun with much lower recoil than the Saiga, and it does not jam." },
    "mps-auto-assault-12-gen-1-12ga-automatic-shotgun": {
      summary: "First-generation AA-12: full auto, fewer parts than the second generation." },
    "saiga-12k-12ga-automatic-shotgun-redline": {
      summary: "Full-auto Saiga-12K in the Redline version. Flea-banned." },
    "remington-model-870-12ga-pump-action-shotgun": {
      summary: "A cheap pump shotgun with many parts. Excellent for the early game on Factory." },
    "mp-155-12ga-semi-automatic-shotgun": {
      summary: "A cheap and reliable semi-auto shotgun." },
    "mp-153-12ga-semi-automatic-shotgun": {
      summary: "A cheap semi-auto shotgun with a long tube magazine." },
    "mossberg-590a1-12ga-pump-action-shotgun": {
      summary: "A pump shotgun with good ergonomics." },
    "benelli-m3-super-90-12ga-dual-mode-shotgun": {
      summary: "A dual-mode shotgun (pump or semi-auto)." },
    "toz-ks-23m-23x75mm-pump-action-shotgun": {
      summary: "23 mm: huge damage per round, but rare ammo and flea-banned. Kollontay carries it." },
    "knights-armament-company-sr-25-762x51-marksman-rifle": {
      summary: "The standard DMR: semi-auto 7.62x51, many parts, and M61 or M80A1 drop almost anything. Got a recoil buff in 1.0.4.5." },
    "knights-armament-company-sr-25-762x51-marksman-rifle-taupe": {
      summary: "SR-25 in Taupe: the same excellent DMR." },
    "remington-r11-rsass-762x51-marksman-rifle": {
      summary: "RSASS: a compact, accurate 7.62x51 DMR, a community favorite for years." },
    "hk-g28-762x51-marksman-rifle": {
      summary: "G28: an accurate, stable German DMR in 7.62x51." },
    "svds-762x54r-sniper-rifle": {
      summary: "SVDS: semi-auto in 7.62x54R. BT (penetration 55) from crafting works well, and BS (penetration 70) from loot beats any armor.",
      pros: ["7.62x54R: BT by craft, and BS from loot beats any armor"] },
    "springfield-armory-m1a-762x51-rifle": {
      summary: "M1A: semi-auto 7.62x51, relatively cheap. Low base ergonomics." },
    "kel-tec-rfb-762x51-rifle": {
      summary: "A 7.62x51 bullpup with base ergonomics of 80: easy to control." },
    "vss-vintorez-9x39-special-sniper-rifle": {
      summary: "The sniper version of the VAL: completely silent, 9x39 (SP-6 from a trader, BP from loot). Perfect for medium range. Flea-banned." },
    "tkpd-93x64-carbine": {
      summary: "9.3x64, new in 1.0: huge damage per round (FMJ is sold, the penetrating 7N33 from loot) but massive recoil. Flea-banned, Shturman and Zryachiy carry it." },
    "sword-international-mk-18-338-lm-marksman-rifle": {
      summary: "Semi-auto .338: FMJ (damage 122) is sold, AP (penetration 79) from loot beats any armor. Expensive, heavy, huge recoil." },
    "theakguy-ak-50-50-bmg-anti-materiel-rifle": {
      summary: ".50 BMG: drops anything, but massive recoil, heavy and flea-banned." },
    "lobaev-arms-dvl-10-762x51-bolt-action-sniper-rifle": {
      summary: "The bolt-action with the lowest base recoil and a built-in suppressor. M61 kills with one headshot or two body shots." },
    "remington-model-700-762x51-bolt-action-sniper-rifle": {
      summary: "M700: a 7.62x51 bolt-action with tons of parts. Cheap to start and improves a lot when built." },
    "orsis-t-5000m-762x51-bolt-action-sniper-rifle": {
      summary: "T-5000M: a very accurate 7.62x51 bolt-action." },
    "accuracy-international-axmc-338-lm-bolt-action-sniper-rifle": {
      summary: ".338 Lapua: one body shot drops almost any AI. FMJ (damage 122) is sold, and AP (penetration 79) from loot beats any armor. Expensive and heavy." },
    "sv-98-762x54r-bolt-action-sniper-rifle": {
      summary: "SV-98: a Russian 7.62x54R bolt-action (BT by craft, BS from loot)." },
    "mosin-762x54r-bolt-action-rifle-sniper": {
      summary: "The Mosin: very cheap and powerful, a classic budget long-range weapon." },
    "mosin-762x54r-bolt-action-rifle-infantry": {
      summary: "Infantry Mosin: cheap and powerful, without a scope mount by default." },
    "sako-trg-m10-338-lm-bolt-action-sniper-rifle": {
      summary: "TRG M10 in .338: huge power, flea-banned." },
    "marlin-mxlr-308-me-lever-action-rifle": {
      summary: "A lever-action rifle in .308 ME: faster between shots than a bolt-action." },
    "rpk-16-545x39-light-machine-gun": {
      summary: "RPK-16: a light, comfortable 5.45 machine gun with relatively low recoil and drum magazines. Killa and Tagilla carry it." },
    "kalashnikov-pkm-762x54r-machine-gun": {
      summary: "PKM: a 7.62x54R machine gun with 100-round belts (BT by craft, BS from loot). Erases groups of AI.",
      cons: ["The weapon's flea price is extremely high"] },
    "kalashnikov-pkp-762x54r-infantry-machine-gun": {
      summary: "PKP: a modern version of the PKM. Flea-banned, Kaban carries it." },
    "us-ordnance-m60e6-762x51-light-machine-gun": {
      summary: "M60E6: a 7.62x51 machine gun with a controllable 550 rpm." },
    "us-ordnance-m60e6-762x51-light-machine-gun-fde": {
      summary: "M60E6 in FDE: the same stats." },
    "us-ordnance-m60e4-762x51-light-machine-gun": {
      summary: "Mk 43 Mod 1: a compact 7.62x51 machine gun." },
    "degtyarev-rpd-762x39-machine-gun": {
      summary: "RPD: a 7.62x39 machine gun with a 100-round drum and 700 rpm." },
    "degtyarev-rpdn-762x39-machine-gun": {
      summary: "RPDN: an RPD with a rail. Flea-banned." },
    "glock-18c-9x19-machine-pistol": {
      summary: "A full-auto pistol at 1200 rpm: the closest a pistol gets to an SMG. With PBP and an extended magazine it is an excellent backup." },
    "fn-five-seven-mk2-57x28-pistol": {
      summary: "FN Five-seveN: SS190 (penetration 37) makes it the most penetrating common pistol, with 20 rounds per magazine." },
    "fn-five-seven-mk2-57x28-pistol-fde": {
      summary: "Five-seveN in FDE: the same stats." },
    "magnum-research-desert-eagle-l6-50-ae-pistol": {
      summary: "Desert Eagle in .50 AE: huge damage per round. FMJ (penetration 40) is sold, FMJ B (penetration 57) from loot. Strong recoil." },
    "magnum-research-desert-eagle-mk-xix-50-ae-pistol": {
      summary: "Desert Eagle Mk XIX: .50 AE with huge damage per round." },
    "serdyukov-sr-1mp-gyurza-9x21-pistol": {
      summary: "Gyurza: 9x21 with 7N42 (penetration 38). A powerful Russian pistol." },
    "stechkin-aps-9x18pm-machine-pistol": {
      summary: "APS: a cheap full-auto pistol in 9x18." },
    "stechkin-apb-9x18pm-silenced-machine-pistol": {
      summary: "APB: a full-auto pistol with a suppressor, 9x18." },
    "glock-17-9x19-pistol": {
      summary: "Glock 17: a reliable 9x19 pistol with many parts." },
    "glock-19x-9x19-pistol": {
      summary: "Glock 19X: a compact version of the Glock." }
  },
  sources: [
    "tarkov.dev (game data and PvE prices)",
    "Insider Gaming: patch 1.1.5 (Lighthouse)",
    "Insider Gaming: meta changes in 1.0.4.5",
    "patched.gg: 2026 patch archive",
    "allthings.how: patch 1.1.0",
    "Shacknews: Icebreaker",
    "games.gg: weapon tier list"
  ]
};
