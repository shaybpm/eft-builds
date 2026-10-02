# EFT meta research for a PVE-only player (compiled 2026-10-02)

Scope: Escape from Tarkov patches 1.0 (Nov 2025) through 1.1.5 (Sep 2026), PVE ("PvE Zone") focus.
Reddit and the Fandom wiki were NOT used (blocked from this machine).

## How to read this file

Confidence tags on claims:

- **[HIGH]** official patch notes as relayed by 2+ reputable outlets, or primary game data (tarkov.dev, see below).
- **[MED]** one reputable outlet, or two outlets of mixed quality that agree.
- **[LOW]** single source, undated, contradicts other data, or the source looks AI-generated / SEO.

Source quality notes:

- **Primary data source: tarkov.dev JSON cache**, fetched 2026-10-02. The GraphQL API (`api.tarkov.dev/graphql`) returned "GraphQL server unavailable" all session, but the static cache worked:
  - `https://json.tarkov.dev/pve/maps` (PVE boss spawns, raid times, player counts, mob HP, mob loadout pools)
  - `https://json.tarkov.dev/pve/items` + `https://json.tarkov.dev/pve/items_en` (ammo ballistics, gun base stats, flea flags, flea settings)
  - `https://json.tarkov.dev/regular/maps` (PVP, used only for comparison)
  - Data is extracted from game files by the tarkov.dev project; item `updated` stamps run to 2026-10-02, goon reports to 2026-10-01. Treated as [HIGH] for numbers, but field semantics (e.g. `noFlea`) are interpreted by me.
- Good news outlets: insider-gaming.com, ixbt.games, shacknews.com, mp1st.com, patched.gg (patch-notes mirror), allthings.how, blast.tv, neonsect.com.
- **Treat with suspicion:** timesaver.gg (useful but some tables look generated; contradicts game data on boss maps), dtgre.com (reads AI-generated, e.g. calls the SPEAR's round ".277 Fury", calls the 416A5 "extremely high fire rate"), games.gg (dated Dec 2025, thin), grandavehousing.calpoly.edu / csr.hdsupply.com / *.wordpress.arktimes.com and similar (SEO spam, ignored).
- I found NO reliable 2026 article that ranks SMGs, shotguns, pistols or LMGs specifically. Those tiers below are partly my synthesis from base stats + older guides and are tagged accordingly.

---

## 1. Weapon / recoil / ergonomics / ammo / suppressor / AI / PVE changes, 1.0 to 1.1.5

### 1.1 Patch timeline (weapon-relevant items only)

**0.16.9.0 - 2025-08-20 (pre-1.0 context)** [HIGH]
- PvE progression synced one-way with EFT: Arena; PvE flea restored at level 35 (pre-1.0 rule; current value is lower, see 1.3).
- Source: https://www.shacknews.com/article/145588/escape-from-tarkov-patch-notes-01690 (2025-08-20)

**1.0.0.0 - 2025-11-15 (launch)** [HIGH for date/wipe, LOW for gun-balance specifics]
- Full PvP wipe; PvE players could opt into a voluntary wipe to access the story questline. [HIGH]
  - https://labs.invenglobal.com/articles/19896/escape-from-tarkov-sets-november-15-launch-date-as-servers-begin-24-hour-patch-downtime
- No traditional wipes after 1.0; PvP and PvE characters persist; seasons are opt-in PvP characters. [MED]
  - https://allthings.how/escape-from-tarkov-1-1-0-0-what-the-kord-breach-season-changes/ (2026-08-03)
- New guns at 1.0: NL545 DI/GP and M16A2 (added in build 1.0.0.0.41760 per IMFDB, seen only as a search snippet) [MED]; TKPD 9.3x64 DMR (X/You-tee post 2025-11-18 "new TKPD ... in Escape from Tarkov 1.0") [MED].
  - https://x.com/utPEWtin/status/1990715727737753980
- Claims of a 1.0 "recoil overhaul" / "vertical recoil -15%" come only from SEO pages; the -15% vertical recoil change is actually from **April 2023**. [LOW, likely wrong attribution]
  - https://www.gamepressure.com/S013-amp.asp?ID=21656 (2023-04-19)
- An epiccarry.com snippet lists Marlin 1895, Skorpion vz.61, Battle Arms Tanker as 1.0 additions; none of these exist in the current tarkov.dev gun list. [LOW, treat as false]

**1.0.1.0 - 2025-12-24** [HIGH]
- Added M110 SASS (7.62x51 semi-auto DMR) + mod set. Kolotun winter event in PvP and PvE. Headgear vs mask/headset compatibility restrictions. Fixed wrong headshot registration while leaning-seated.
- Note: tarkov.dev's current gun list has no separate "M110" entry (only two SR-25 variants, one "Taupe"); it may live as an SR-25 variant/preset. [LOW]
- https://ixbt.games/en/news/2025/12/24/v-escape-from-tarkov-nacalsia-kolotun-i-obvalilis-servery-vyslo-obnovlenie-1010-s-novym-kontentom.html (2025-12-24)
- https://respawn.media/gaming/9dmbc-v-escape-from-tarkov-vyshel-novyi-patch-1010

**Technical update - 2026-01-14** [MED]
- Group transit to Terminal; Zubr boat seats scale with PMC count (3 to 5).
- https://patched.gg/games/escape-from-tarkov/technical-update

**1.0.2.0 - 2026-02-10** [HIGH]
- 9x39 weapons (AS VAL, VSS, SR-3M, 9A-91, VSK-94): overheat buildup speed **-30%** (a buff; mp1st's headline calls it a "nerf", the text says reduced buildup).
- Bigger max stack sizes for ~20 calibers (9x19, 5.45, 5.56, 7.62x51, 12/70, ...).
- Fixed Tagilla's welding masks and CQCM mask armor zones ignoring "Head, Nape" (they now protect correctly).
- M855A1 packs added at Ref LL4; AR-10 50-rd drum limit at Mechanic 1 to 5.
- AI: better looting behavior; RUAF bots on Terminal aggression fix; fog now affects AI detection; PvE: Sniper Scav teleport on Customs fixed; Labyrinth XP for bots/bosses reduced.
- Flea: fixed inability to list ammo packs.
- https://patched.gg/games/escape-from-tarkov/patch-1020
- https://mp1st.com/title-updates-and-patches/escape-from-tarkov-update-1-0-2-servers-go-down-maintenance-february-10

**1.0.2.5 - 2026-03-05: weapon-mod rebalance, Stage 1** [HIGH]
- Flash hiders / muzzle brakes reduce recoil MORE.
- Suppressors and suppressor combos reduce recoil LESS, but their ergonomics penalty was reduced.
- Magazines moved to a consistent system (load/unload/check speed); high-capacity mag ergo penalty reduced; "only option" mags (MG boxes) much softer penalty.
- Pistol grips, foregrips, buttstocks: stat gap narrowed (budget parts more viable).
- Fixed: no damage penalty was applied for a blacked-out limb.
- Dev plan stated at the time: next stage = barrels + handguards, then base stats of all 7.62x39 AKs and 7.62x51 / 7.62x54R platforms, then re-pricing/unlock of all mods.
- https://patched.gg/games/escape-from-tarkov/patch-1025
- https://ixbt.games/en/news/2026/03/07/izmeneniia-modulei-escape-from-tarkov-tolko-nacalis-razrabotciki-anonsirovali-sleduiushhee-obnovlenie.html (2026-03-07)

**1.0.4.0 - 2026-03-27** [HIGH]
- Armor: built-in front/rear zones standardized on light vests/rigs; **heavy armor buffed** (reduced penalties + higher spawn chance): 6B43 Zabralo-Sh, FORT Redut-M, Redut-T5, IOTV variants. RBAV-AF lost groin protection; AVS and Stich Profi V2 zones moved from stomach/back to groin. Plate carriers without built-in armor much cheaper.
- 40mm VOG-25 arming distance reduced to 10 m.
- Medkit auto-heal priority: bleeding, then Head, then Thorax.
- PVE: solo Scav raids now run on a local client (shorter matchmaking); fixed some PMC bots not attacking player Scavs.
- The Lab: Raider count **+20%**. Locked/marked room loot increased.
- Flea: can no longer list incomplete ammo stacks.
- https://patched.gg/games/escape-from-tarkov/patch-1040

**1.0.4.5 - 2026-04-20: weapon-mod rebalance, Stage 2** [HIGH]
- Barrels: longer barrel = more recoil reduction AND higher ergo penalty.
- Handguards: **no longer reduce recoil**; they now offset the barrel's ergo penalty.
- Suppressors + compensator combos: less recoil reduction, bigger ergo penalty. BSG's stated goal: "further increase the popularity of unsuppressed weapon builds".
- Buttstocks re-tuned.
- Base recoil/ergonomics improved (patched.gg says "buffs"; Insider Gaming says "adjustments") for: all AK / AKM / AK-100 series, AUG A1/A3, G36, HK 416A5, SCAR-L/H, MCX-SPEAR and MCX .300, Mk47 Mutant, RD-704, Velociraptor, **all machine guns**, all bolt-action and marksman rifles in 7.62x51, 7.62x54R, .338 LM, .50 BMG.
- PVE: client-side disconnect protection (task progress reverts to raid start); player culling extended to Lighthouse, Shoreline, Woods, Ground Zero; fixed PMC bots vs Fence-rep 6+ player Scavs.
- Profile K/D now counts player kills only (AI excluded).
- https://patched.gg/games/escape-from-tarkov/patch-1045
- https://insider-gaming.com/escape-from-tarkov-patch-notes-meta-change/ (2026-04-20)
- Opinion piece: many suppressors now give little or no recoil reduction; suppressors still viable but no longer the default answer; bolt-actions benefit most. [MED, opinion]
  - https://vocal.media/gamers/tarkov-nerfed-suppressors-again-and-it-s-for-the-better (~May 2026, "5 months ago")

**1.0.5.0 - 2026-05-25: ICEBREAKER** [HIGH]
- New PvE-only location Icebreaker (1-3 players), new boss The Wedge + Black Division faction. Obdolbos 1 death chance raised to 33%. Saiga-12K (Redline) kills now count for "Silent Caliber" / "Punisher p.4".
- No weapon-balance changes listed.
- https://patched.gg/games/escape-from-tarkov/patch-1050
- https://insider-gaming.com/escape-from-tarkov-1-5-update-patch-notes-icebreaker/ (2026-05-25)

**1.0.6.0 - 2026-07-03** [HIGH]
- Fixed weapons overheating too fast on Streets in some cases; MSGL cylinder animation fix. No balance.
- https://patched.gg/games/escape-from-tarkov/patch-1060

**1.0.6.5 - 2026-07-14: "Blackout" event on The Lab** [MED]
- Lab goes dark ~10-15 s into the raid; Black Division + The Wedge and guards + Raiders; most extracts closed; event tasks reward thermals/NVG aids. Black Division / Wedge favor 7.62x51 (M62, M993) on Mk17, X-17, SA-58, MDR (per itemlevel.net snippet). [LOW for the ammo detail]
- tarkov.dev still lists a "the-lab-dark" (laboratory_dark) location: PVE Wedge(Labs) spawn 1.00 vs PVP 0.33. Whether the event is still running today: not verified.
- https://insider-gaming.com/tarkov-blackout-how-to-complete-labs-keycard/ (2026-07-14)

**1.1.0.0 - 2026-08-03: KORD BREACH season** [HIGH]
- New guns: **Norinco QBZ-191** (new caliber 5.8x42, rounds DBP191 / DBX95 / DVC12 / DVX12), **Howa Type 20** (5.56x45), HK 416A5 in RAL 8000.
- Economy changes apply to **PvP Season, PvP Zone AND PvE Zone**: trader buy prices +25% avg, trader buy-back -20% avg, flea fee 3% to 5%. Insurance stays ON in PvE Zone (off only in PvP Season).
- Several basic rounds moved to lower trader LL / cheaper (5.45 FMJ, 5.56 FMJ, 7.62x39 FMJ, 9x19 Green Tracer, .45 Lasermatch); 7.62x39 T-45M1 buyable from the start.
- Revolver / revolver-shotgun double-action accuracy penalty reduced; missing weapon sway while aiming restored (fix); armor ricochet recalibrated for vests, plate carriers, helmets.
- Seasonal characters are PvP-only; season 1 runs 2026-08-03 to 2026-12-07; PvE profile does not wipe.
- https://patched.gg/games/escape-from-tarkov/patch-1100
- https://allthings.how/escape-from-tarkov-1-1-0-0-what-the-kord-breach-season-changes/ (2026-08-03)
- https://neonsect.com/escape-from-tarkov/tarkov-1-1-0-0-patch-changes/ (2026-08-30; states 1.1.0.0 "does not touch weapon balance or recoil")

**1.1.5.0 - 2026-09-08: Lighthouse rework** [HIGH]
- Map changes: see section 3.3.
- Removed ammo from the magazines of some trader weapon presets (you must buy ammo separately).
- **Armor removed from six face-mask variants** (Glorious E, Shattered, DevTac Samurai Menpo, Death Shadow masks).
- XP reduced for killing The Wedge, Black Division operatives (Icebreaker), Shadow of Tagilla, Vengeful Killa, and Labyrinth Scavs.
- Fixed hit registration of bolt-action rifles mounted on bipods; fixed weapon presets disappearing after raids.
- https://insider-gaming.com/tarkov-latest-patch-notes-lighthouse-changes/ (2026-09-08)
- https://neonsect.com/escape-from-tarkov/tarkov-lightkeeper-access-rework-1-1-5-0/ (2026-09-13)

### 1.2 Net effect on builds (synthesis, 1.0.2.5 + 1.0.4.5)

- Recoil reduction now comes mainly from **muzzle brakes/compensators, barrels (longer = better recoil), and stocks**. Handguards = ergo only. [HIGH, from notes]
- Suppressors: quieter, but little/no recoil help and a real ergo cost (worse when stacked with a comp). Loud builds with a brake are the intended meta. [HIGH that this was BSG's goal; MED that the community actually shifted]
- For PVE specifically: AI does not "hear-hunt" like humans but does react to gunfire; a suppressor's value in PVE is mainly not pulling the whole map (Raiders/Rogues/boss guards) onto you. Trading suppressor for brake is generally fine in PVE. [LOW, my inference]
- 7.62x39 AKs, 7.62x51 platforms, MGs, bolt-actions got base buffs in 1.0.4.5, so they are better than their pre-April reputation. [HIGH for the buff, MED for magnitude]

### 1.3 PVE-specific rules and economy (current)

- **Separate PvE flea**, unlock at **level 15** (tarkov.dev `fleaMarket.minPlayerLevel = 15` for the PVE dataset), fee **5%** since 1.1.0, "thinner listing pool" than PvP. [HIGH for 15/5%]
  - https://timesaver.gg/blog/tarkov-pve-mode-roubles-progression-guide (2026-08-27)
- Additional per-category flea level gates exist on top of level 15 (high-tier ammo reportedly last, ~level 35-40). [LOW, single snippet; exact PvE values not verified]
- **Loose ammo cannot be traded on the flea**: every one of the 200 cartridge items is flagged `noFlea` in both PVE and PVP datasets; ammo *packs* can be listed (1.0.2.0 fix) but not incomplete stacks (1.0.4.0). Plan ammo supply around traders, barters and crafts. [MED, my reading of the flag]
- **Flea-banned guns (tarkov.dev `noFlea`, PVE)**: AS VAL MOD.4, SR-3M, VSS, MCX-SPEAR, MDR 7.62x51, Mk 17 (SCAR-H), TKPD, AK-50, Howa Type 20, QBZ-191, P90 Scourge, Saiga-12K FA Redline, KS-23M, PKP, RPDN, AVT-40, TRG M10, FN40GL, MSGL. Get these from traders, barters, quests or raids. [HIGH data]
- **Boss spawn chances are higher in PVE than PVP** (e.g. Reshala/Shturman/Sanitar/Killa/Kaban/Kollontay 75% vs 60%; Tagilla Factory 50% vs 35%). Full table in 3.1. [HIGH data]
- AI dial-back (detection slower on first contact and re-acquire, slower aim, narrower FOV, no default headshots if the bot has not seen you for 15 s, fix for seeing through solid objects). Applies to Scavs, sniper Scavs, Raiders, Rogues, PvE PMC bots, boss guards and most bosses. **Exceptions: Zryachiy and the Goons keep the old FOV/fast reactions.** [MED for content, LOW for timing: page dated 2025-12-17, updated 2026-03-17, text ties it to the run-up to 1.0]
  - https://finalboss.io/escape-from-tarkov-finally-dials-back-its-aimbot
- Older but still relevant: 0.16.2.0 (2025-03) gave all Scavs 30 HP head, AI PMCs see Scavs as hostile 80% of the time, AI PMCs single-fire at range and full-auto up close, PvE boss spawn chances raised. [HIGH, older]
  - https://insider-gaming.com/escape-from-tarkov-ai-upgrade-patch/ (2025-03-17)
- PVE disconnect protection (1.0.4.5), local solo Scav raids (1.0.4.0). [HIGH]
- Roadmap (2026-08-28): Oct 2026 patches 1.2.0 / 1.3.0 / 1.3.5 = **PvE Prestige**, bot spawn system improvements, AI behavior adjustments, Unity 6; Dec 2026 1.4.0 = Season 2. Announced additions: FAMAS, G3, boss "Povodyr", map "End of the Line", knockdown/ally-healing state. [MED, roadmap = subject to change]
  - https://insider-gaming.com/escape-from-tarkov-roadmap-boss-weapons-mechanics/ (2026-08-28)

---

## 2. Weapon meta / tier consensus for 2026

### 2.1 What the (weak) 2026 sources say

| Source | Date | Top picks |
|---|---|---|
| games.gg tier list [LOW-MED] | pub 2025-11-16, upd 2025-12-02 (pre-Stage 1/2) | S: Mk47 Mutant (BP), MCX-SPEAR (6.8 Hybrid), MDR 7.62x51 (M80/M61). A: HK 416A5 (M855A1), AS VAL (SP-6). Budget: AKM (PS/BP), UMP 45 (AP) |
| dtgre.com 2026 meta [LOW, AI-like] | 2026-05-18 (post 1.0.4.5) | S: NL545 ("extremely flat recoil", run it loud/light), MDR 7.62x51, MCX-SPEAR ("more recoil instability than before"). A: HK 416A5, MCX .300. B budget: AK-74N, AK-105 ("muzzle brakes outperform suppressors"), AUG A3 ("stable out of the box"). Thesis: "ammo choice is now more important than attachment stacking" |
| commonsensegamer endgame [MED, old] | 2025-02-23 (pre-1.0) | AS VAL (SPP), MPX (PBP), MP7A2 (FMJ SX), M4A1 (M856A1), MCX .300 (CBJ), MDR 7.62x51 (M80) |
| sportskeeda shotguns [LOW] | patch 0.16 era | Saiga-12K FA (450 rpm) and AA-12 Gen 2 (never malfunctions) top full-auto shotguns; AP-20 / flechette |
| gfinity tier list [LOW, old] | 2024-03 | SMG S: MP7, Vector; B: P90; D: MPX |

URLs:
- https://games.gg/escape-from-tarkov/guides/escape-from-tarkov-weapon-tier-list/
- https://www.dtgre.com/2026/05/escape-from-tarkov-best-weapons-2026-meta-guide.html
- https://commonsensegamer.com/escape-from-tarkov-best-endgame-weapons-ammo/
- https://sportskeeda.com/esports/5-best-shotguns-escape-tarkov
- https://www.gfinityesports.com/article/escape-from-tarkov-weapon-tier-list-guide-2024

### 2.2 Base receiver stats from game data (tarkov.dev PVE, 2026-10-02) [HIGH data]

Base gun item (no mods). Lower recV = less vertical recoil. Useful to rank "how good before money is spent".

| Gun | Caliber | Ergo | RecV | RecH | RPM | Flea |
|---|---|---|---|---|---|---|
| AUG A3 | 5.56 | 95 | 87 | 248 | 715 | yes |
| AUG A1 | 5.56 | 95 | 90 | 265 | 715 | yes |
| MDR 5.56 | 5.56 | 67 | 79 | 260 | 650 | yes |
| Mk 16 (SCAR-L) | 5.56 | 45 | 90 | 280 | 650 | yes |
| Howa Type 20 (new 1.1.0) | 5.56 | 50 | 97 | 270 | 700 | NO |
| TX-15 DML | 5.56 | 50 | 101 | 289 | 800 | yes |
| G36 | 5.56 | 60 | 106 | 298 | 750 | yes |
| Radian Model 1 | 5.56 | 51 | 112 | 335 | 800 | yes |
| M16A2 (new 1.0, single/burst only) | 5.56 | 48 | 117 | 338 | 800 | yes |
| M4A1 | 5.56 | 48 | 119 | 342 | 800 | yes |
| M16A1 (single/auto) | 5.56 | 48 | 121 | 346 | 800 | yes |
| HK 416A5 | 5.56 | 51 | 125 | 358 | 850 | yes |
| AKS-74 / AK-74M / AK-74N | 5.45 | 31-33 | 90-96 | 241-244 | 650 | yes |
| AK-545 / AK-545 Short | 5.45 | 50 / 53 | 91 / 93 | 263 / 270 | 650 | yes |
| AK-105 / AK-12 | 5.45 | 43 / 36 | 100 | 277 / 302 | 600 / 700 | yes |
| NL545 DI / GP (new 1.0) | 5.45 | 45 / 48 | 109 / 114 | 320 / 330 | 800 / 850 | yes |
| QBZ-191 (new 1.1.0) | 5.8x42 | 48 | 114 | 330 | 750 | NO |
| AKM / AK-103 / AK-104 | 7.62x39 | 28 / 35 / 43 | 121 / 118 / 120 | ~300 | 600 | yes |
| RD-704 / Mk47 | 7.62x39 | 50 / 38 | 135 / 136 | 314 / 338 | 600 / 650 | yes |
| Velociraptor / MCX | .300 BLK | 35 / 43 | 101 / 127 | 272 / 351 | 600 / 800 | yes |
| AS VAL / AS VAL MOD.4 / SR-3M | 9x39 | 43 / 46 / 45 | 80 / 70 / 74 | 255-270 | 900 | VAL yes, MOD.4 + SR-3M NO |
| MCX-SPEAR | 6.8x51 | 46 | 143 | 425 | 800 | NO |
| MDR 7.62x51 | 7.62x51 | 67 | 125 | 310 | 650 | NO |
| AK-308 | 7.62x51 | 33 | 152 | 325 | 700 | yes |
| Mk 17 / X-17 | 7.62x51 | 45 / 47 | 200 | 505 | 600 | Mk17 NO, X-17 yes |
| SA58 | 7.62x51 | 30 | 210 | 417 | 700 | yes |
| ASh-12 | 12.7x55 | 55 | 128 | 425 | 650 | yes |
| MP7A1/A2 | 4.6x30 | 65 | 50 | 178 | 950 | yes |
| P90 / P90 Scourge | 5.7x28 | 60 / 59 | 54 / 57 | 243 / 255 | 900 / 910 | P90 yes, Scourge NO |
| Vector 9x19 / .45 | 9x19 / .45 | 65 | 48 / 59 | 315 / 356 | 950 / 1100 | yes |
| UMP 45 | .45 | 62 | 72 | 240 | 600 | yes |
| MPX / MP5 / MP9-N | 9x19 | 40 / 50 / 75 | 51 / 56 / 51 | ~260 | 850 / 800 / 1100 | yes |
| SR-2M | 9x21 | 59 | 54 | 234 | 950 | yes |
| RPK-16 | 5.45 | 45 | 106 | 316 | 650 | yes |
| RPD / RPDN | 7.62x39 | 45 | 107 | 502 | 700 | RPD yes, RPDN NO |
| M60E6 / Mk 43 Mod 1 | 7.62x51 | 45 | 107 | 502 | 550 | yes |
| PKM / PKP | 7.62x54R | 55 | 138 | 515 | 650 | PKM yes, PKP NO |
| Saiga-12K FA / AA-12 Gen 2 | 12ga | 30 / 45 | 298 / 173 | 526 / 232 | 450 / 330 (as listed) | yes |
| SR-25 / RSASS / G28 / RFB / M1A | 7.62x51 | 47 / 50 / 48 / 80 / 28 | 155 / 145 / 146 / 148 / 214 | | semi | yes |
| SVDS | 7.62x54R | 47 | 220 | 647 | semi | yes |
| TKPD (new 1.0) | 9.3x64 | 40 | 493 | 1150 | semi | NO |
| Mk-18 Mjolnir | .338 | 34 | 577 | 1241 | semi | yes |
| DVL-10 / M700 / T-5000M | 7.62x51 | 55 / 49 / 35 | 111 / 199 / 141 | | bolt | yes |
| SV-98 / Mosin | 7.62x54R | 28 / 30 | 250 / 288 | | bolt | yes |
| AXMC / TRG M10 | .338 | 21 / 25 | 468 / 428 | | bolt | AXMC yes, TRG NO |

### 2.3 Consensus synthesis per category (for app pros/cons)

Tags: [S] = named top-tier by 2+ sources; [D] = my data-based inference.

**Assault rifles / carbines**
- MDR 7.62x51: S-tier in 2 of 2 meta lists [S, MED]. Pros: full-power .308 (M61/M993) in a bullpup with 67 base ergo; one of few ways to fire 60+ pen full-auto. Cons: flea-banned; 7.62x51 recoil.
- MCX-SPEAR 6.8x51: S-tier in 2 lists [S, MED], "more recoil instability than before" (dtgre) [LOW]. Pros: Hybrid round 47 pen / 72 dmg. Cons: flea-banned, highest base recoil of the 5.56-class rifles (143), only 2 cartridge types.
- NL545 DI/GP (5.45 AR-pattern, 1.0): ranked #1 by dtgre (post-1.0.4.5) [LOW, single AI-like source]. Data: recoil 109/114, 800-850 rpm, takes PPBS/BS. Reshala's loot pool carries the GP [HIGH data].
- HK 416A5: A-tier in both lists [S, MED]; got 1.0.4.5 base buff [HIGH]. Base recoil is high (125) so it needs good stock/barrel/brake [D].
- M4A1 / AR family: long-time reliable mid-range pick [MED, older]. Data: AUG A3 (95 ergo, 87 recV) and MDR 5.56 (67 ergo, 79 recV) are the best "cheap stock" 5.56 receivers [D].
- Mk47 Mutant: S-tier in games.gg (Dec 2025) [LOW-MED]. 7.62x39 BP/MAI AP. 7.62x39 AK family got base buffs in 1.0.4.5 [HIGH].
- AK-74N / AK-105 / AK-545: budget workhorses, "loud build with brake" (dtgre) [LOW]; 5.45 BS/PPBS are flea-free via traders only [D].
- AS VAL / VAL MOD.4 / SR-3M: classic CQB-mid suppressed pick [S, MED, older]; overheat buildup -30% in 1.0.2.0 [HIGH]; SP-6/BP ammo. MOD.4 has the best base recoil (70) but is flea-banned [HIGH data].
- QBZ-191 (1.1.0, 5.8x42): no community verdict found. Data: DVC12 52 pen / 46 dmg, DVX12 47/48 is roughly between 5.56 M995 and SSA AP; flea-banned; Black Division carry it [D, HIGH data].
- Howa Type 20 (1.1.0, 5.56): no community verdict found. Data: 97 recV, 50 ergo, 700 rpm = among the best base 5.56 receivers; flea-banned [D].
- M16A2 (1.0): burst/semi only (data `fireModes = single, burst`) [HIGH]; M16A1 is full-auto and a Raider loot-pool gun [HIGH data].
- AK-308 (7.62x51 AK): no reviews found; worst base recoil of the auto .308s except SA58 (152) but 1.0.4.5 AK + 7.62x51 base buffs apply [D].
- Velociraptor (.300, added 0.16.0 Dec 2024): low base recoil (101) for .300 BLK; 1.0.4.5 base buff [HIGH buff, D for rest].
- X-17 (SCAR-H variant, 0.16.0): same stats as Mk 17 but NOT flea-banned [HIGH data].

**SMGs** (no 2026 ranking found; [D] + older lists)
- MP7A1/A2: best base recoil (50) + 950 rpm; 4.6x30 AP SX 53 pen = only SMG round that beats class 5 [D + MED older].
- Vector 9x19 / .45: 1100 rpm (.45), very low vertical recoil; ammo pen weak (.45 AP 38, 9x19 PBP 39) [D].
- P90 / P90 Scourge (streamer variant, NOT on flea): SS190 only 37 pen [D].
- MPX / MP5 / MP9-N / SR-2M: good handling; 9x19 PBP 39 pen tops out at class 3-4 [D].
- UMP 45: budget recommendation in games.gg [LOW].

**Shotguns** (no 2026 ranking found)
- Saiga-12K FA (0.16.0) and AA-12 Gen 1/2: full-auto shotguns; AA-12 has far lower base recoil (173 vs 298) [D]; AP-20 slug (37 pen / 164 dmg) is the only 12ga round for armored targets [HIGH data]. Tagilla's loot pool carries Saiga-12K FA [HIGH data].
- Pump/semi (MP-153/155, M870, 590A1, M3 Super 90): budget/early CQB; flechette 31 pen per pellet [D].

**DMRs**
- SR-25 / RSASS / G28 / RFB (7.62x51): all got the 1.0.4.5 marksman base buff [HIGH]. RSASS historically a fan favorite [LOW, 2020 source]. RFB has 80 base ergo [D].
- SVDS (7.62x54R BS 70 pen): best-penetrating semi DMR round available widely [D].
- TKPD (9.3x64, 1.0): 7N33 56 pen / 108 dmg; flea-banned; used by Shturman and Zryachiy [HIGH data]. Heavy recoil (493) [D].
- Mk-18 Mjolnir (.338 AP 79 pen / 115 dmg) [D].
- VSS (9x39): integrally suppressed, flea-banned [HIGH data].
- M110 SASS (1.0.1.0) [HIGH added]; no verdict found.

**Sniper / bolt-action**
- DVL-10 (lowest base recoil, integral suppressor), M700, T-5000M; SV-98 / Mosin for 7.62x54R; AXMC / TRG M10 for .338. All got the 1.0.4.5 base buff; bipod hitreg fix in 1.1.5 [HIGH]. Suppressor nerfs matter least here (opinion) [MED].

**LMGs**
- "All machine guns" base-buffed in 1.0.4.5; MG box mags got much softer ergo penalties in 1.0.2.5 [HIGH].
- RPK-16 (5.45), RPD (7.62x39, 700 rpm), M60E6 / Mk 43 Mod 1 (7.62x51, 550 rpm), PKM/PKP (7.62x54R BS). No 2026 ranking found [D].

**Pistols**
- Glock 18C (full-auto 1200 rpm), APS/APB (full-auto 750), FN 5-7 (5.7 SS190 37 pen), SR-1MP Gyurza (9x21 7N42 38 pen; "best pistol" in a 2020 list [LOW]), Desert Eagle (.50 AE FMJ B 57 pen) [D].

### 2.4 New/recent weapons: when added and how regarded

| Weapon | Added | Regard |
|---|---|---|
| NL545 DI/GP | 1.0.0.0 (Nov 2025) [MED] | Top of the one post-1.0.4.5 list [LOW] |
| M16A1, M16A2 | 1.0 era [MED for A2, LOW for A1] | No verdict; A2 is burst-only |
| TKPD 9.3x64 | 1.0 (Nov 2025) [MED] | No verdict; boss weapon |
| M110 SASS | 1.0.1.0, 2025-12-24 [HIGH] | No verdict |
| Saiga-12K FA Redline | by 1.0.5 (task-credit fix 2026-05-25) [MED] | Variant of a 0.16.0 gun |
| QBZ-191, Howa Type 20 | 1.1.0.0, 2026-08-03 [HIGH] | No verdict yet |
| P90 Scourge | 2026, streamer/"featured streamer" variant [LOW] (data updated 2026-09-27) | No verdict |
| AS VAL MOD.4, AK-308, Radian Model 1 | pre-1.0, exact patch not verified [LOW] | MOD.4: Glukhar weapon |
| Saiga-12K FA, Velociraptor, X-17, TRG M10, RShG-2 | 0.16.0 (Dec 2024) [HIGH] | |
| M60E4/E6, Desert Eagles, UZI family, SR-3M | 0.15 (Aug 2024) [HIGH] | |
| MCX-SPEAR, RPD/RPDN, 9A-91, VSK-94 | 0.14.0 era (Dec 2023) [MED] | SPEAR S-tier in 2 lists |
| AA-12 | 0.15 per one snippet [LOW] | |
| Announced, not in game: FAMAS, G3 (roadmap Aug 2026); G11 (boostmatch May 2026) [MED/LOW] | | |

Sources: https://ggrecon.com/guides/escape-from-tarkov-new-weapons (2024-08-21), https://sportskeeda.com/esports/escape-tarkov-patch-notes-update-0-16-0-0-new-event-customs-rework-prestige-system, https://tarkovforge.com/weapons/fn-p90-57x28-submachine-gun-scourge, https://boostmatch.gg/blog/escape-from-tarkov/articles/escape-from-tarkov-2026-roadmap-icebreaker-seasons-guide (2026-05-13).

---

## 3. PVE maps, bosses, armor and engagement range

### 3.1 Map list with PVE boss spawn chances (tarkov.dev PVE data, 2026-10-02) [HIGH data]

PVP chance in parentheses where different. "Escorts" = max guards.

| Map (id) | Raid min | Players | Bosses / special AI (PVE chance) |
|---|---|---|---|
| Factory day | 20 | 7-8 | Tagilla 50% (35%) |
| Night Factory | 25 | 5-6 | Tagilla 75% (60%); Cultist Priest 12% (8%) + 3 cultists |
| Customs | 35 | 10-12 | Reshala 75% (60%) + 4 guards; Goons (Knight) 25% (20%) at Scav base; Partisan 15%; Cultists 30% (20%); sniper Scavs |
| Woods | 35 | 10-14 | Shturman 75% (60%) + 3 guards at sawmill; Goons 25% (20%); Partisan 15%; Cultists 30% (20%) |
| Lighthouse (reworked 1.1.5) | 40 | 10-12 | **Glukhar 100% + 3 guard types at water treatment plant** (zone "Zone_Hellicopter"); **Rogues at chalets** (spawn groups 100/90/50/50%) and rocks (70%); Zryachiy 100% on island; Goons 30% (20%) at chalet; Partisan 15% |
| Shoreline | 45 | 10-14 | Sanitar 75% (60%) + 3 guards (port / greenhouses); Goons 30% (20%) at weather station; Cultists 25% (17%) at resort/forest; "Sentry" AF gunners 100% at gate towers; Partisan 15% |
| Reserve | 40 | 9-11 | **No Glukhar any more** (moved to Lighthouse); Raiders 30-40% groups of up to 4 (rail storage, command bunker, lever-triggered) |
| Interchange | 40 | 11-15 | Killa 75% (60%); Tagilla 50% (35%) |
| Streets of Tarkov | 40 | 12-16 | Kaban 75% (60%) at car dealership + 4 guards + Basmach + Gus + 2 snipers; Kollontay 75% (60%) + 2 assault + 2 security guards (Klimov / MVD) |
| The Lab | 30 | 8-10 | Raiders only, many groups 35-60% (some switch-triggered); Raiders +20% since 1.0.4.0 |
| The Lab (Blackout / "lab-dark") | 35 PVE (30 PVP) | 8-10 | The Wedge (Labs) 100% (33% PVP) + 3 guards; Raiders 100%; Black Division |
| Ground Zero (lvl <21 / 21+) | 30 | 9-12 | No bosses; Cultists 2% on 21+ |
| Terminal | 50 | 1-5 | Black Division ambush squads 100%; RUAF ("AF") squads + rooftop sniper 100%; ONE boss slot at "Zone2ScavPort29" rolling Tagilla / Glukhar / Killa / Reshala / Sanitar at 20% each |
| The Labyrinth | 30 | 5 | Shadow of Tagilla 100% + Vengeful Killa as escort |
| Icebreaker | 50 | 1-3 | The Wedge 100% (multiple spawn variants, 3rd-4th deck rooms); Black Division "Reshala-type" squad leader + 2-3 guards (engine room / stern) 100%; Knight 100% + 2 Rogues; Rogue singles 50-100% |

Source: https://json.tarkov.dev/pve/maps and https://json.tarkov.dev/regular/maps (fetched 2026-10-02).

Disagreeing secondary sources (do NOT use for the app):
- timesaver.gg says Kord/"Black Division" boss lives on Terminal and Kollontay roams Ground Zero; game data shows neither. [LOW]
  - https://timesaver.gg/blog/tarkov-season-1-boss-spawn-locations (2026-09-09)
- timesaver.gg boss guide gives rounded spawn % (e.g. Glukhar ~50% on Reserve) that predate 1.1.5. [LOW] HP values there match game data.
  - https://timesaver.gg/blog/eft-bosses-guide (upd 2026-08-27)

### 3.2 Boss / special-AI HP and armor (tarkov.dev PVE mob data) [HIGH data, MED interpretation]

Armor = items in the mob's loot/loadout pool (what CAN spawn), class in brackets. A PMC has ~440 HP for comparison.

| Mob | Total HP | Head / Thorax | Body armor pool | Weapon pool (highlights) |
|---|---|---|---|---|
| Reshala (Customs, Terminal) | 752 | 62 / 145 | none (Bomber hat) | NL545 GP, AK-545 Short, Saiga-12K FA, Vector, Golden TT |
| Reshala guards | 630 | 50 / 140 | class 1-5 (Korund-VM, Redut-M, Gzhel-K, CPC MOD.1 = 5) | AKs, SR-2M |
| Shturman (Woods) | 812 | 62 / 180 | none | SVDS, TKPD, AK-105 |
| Sanitar (Shoreline, Terminal) | 1270 | 70 / 360 | none | VSS, SR-3M, OP-SKS |
| Sanitar guards | 1055 | 55 / 200 | class 3-5; helmets incl. Altyn [5] | AKM, Saiga-12K, VPO-136 |
| Killa (Interchange, Terminal) | 890 | 70 / 210 | 6B13 KE [5]; Maska-1SCh helmet [4] | RPK-16, AKMS |
| Tagilla (Factory, Interchange, Terminal) | 1220 | 100 / 320 | AVS TE [6] or Strandhogg [4]; welding masks | Saiga-12K FA, RPK-16, MP-155, sledgehammer |
| Glukhar (now Lighthouse WTP, Terminal) | 1010 | 70 / 220 | class 4 carriers (ANA, AVS, Strandhogg, MMAC...) | ASh-12, AS VAL MOD.4, SR-3M, M1A |
| Glukhar guards (assault/security/scout) | 580-806 | 40-45 / 140-180 | class 1-5 (Gladiator-S, Korund-VM = 5) | AKs, M4A1, RPD, RPK-16 |
| Kaban (Streets) | 1300 | 85 / 355 | none | PKP, M60E6, Mk 43, RPK-16 |
| Basmach / Gus (Kaban close guards) | 1030 | 70 / 255 | Rys-T helmet [5] | AS VAL, AKs, Saiga-12K |
| Kollontay (Streets) | 1055 | 65 / 300 | PSh-97 helmet [2] only | KS-23M, RPD, M60E6, baton |
| Knight (Goons) | 1120 | 80 / 220 | CPC GE [5] | MDR, Mk 17, X-17, MCX-SPEAR |
| Big Pipe | 910 | 70 / 220 | PlateFrame GE [5] | M60E6, MSGL/FN40GL, MCX, MP7A2 |
| Birdeye | 795 | 70 / 175 | THOR CRV [4] | MXLR, TRG M10, RSASS, SR-25, M4A1 |
| Zryachiy (Lighthouse island) | 1655 | 175 / 450 | none | SVDS, TKPD |
| Partisan | 950 | 80 / 220 | none | AKs, AVT-40, shotguns |
| Cultist Priest / warriors | 850 | 50 / 200-220 | warriors up to class 6 (Slick, THOR IC) | AS VAL, SVDS, Vector .45, MPX |
| Raider | 745 | 35 / 160 | class 1-5 (Gen4, TT MKIII = 5) | 416A5, M4A1, M16A1, MCX, SR-25, G36 |
| Rogue (Icebreaker/Lighthouse) | 775 | 35 / 180 | class 3-5 (JPC, TT MKIII = 5) | 416A5, Mk 16, X-17, MCX, M4A1 |
| Black Division (Terminal / Icebreaker / Blackout Lab) | 790 | 40 / 170 | **class 5-6** (FCPC V5, LV-119, Siege-R); helmets class 4 | 416A5, M4A1, Mk 16/17, MDR, MCX, RSASS, SR-25, Type 20, QBZ-191, P90 |
| The Wedge (Icebreaker; Labs variant) | 880 | 70 / 170 | FCPC V5 / LV-119 [5] | 416A5, Mk 16/17, X-17, SA58, MDR, MP7A1 |
| Shadow of Tagilla (Labyrinth) | 1305 | 105 / 360 | AVS TE [6]; ZABEY helmet; neck-protecting class-6 helmet per press | AK-12, Saiga-12K FA, axe |
| Vengeful Killa (Labyrinth) | 960 | 80 / 260 | 6B13 KE [5], Maska-1SCh KE [4] | RPK-16, AKMS |
| RUAF "AF" (Terminal, Shoreline towers) | 675-710 | 35-50 / 120-140 | 6B45 [5-6], 6B13 [4] | AKs, PKM, RPK-16, SVDS, SV-98, TKPD |

Source: https://json.tarkov.dev/pve/maps (`mobs.*.health`, `mobs.*.equipment`) + https://json.tarkov.dev/pve/items for armor class.
Extra: Black Division have only class-2 face protection and are reported as near-aimbot accurate, aim at your weakest plate; press advice = 7.62x51 M993/M61, aim head/eyes, fight from hard cover. [MED]
- https://timesaver.gg/blog/tarkov-black-division-guide (2026-07-22, upd 2026-08-05)
- https://www.shacknews.com/article/149310/what-is-the-icebreaker-location-in-escape-from-tarkov (2026-05-26): Icebreaker is PvE-only, no player PMCs or regular Scavs, Raiders + Knight + Black Division, Wedge and guards "just plain superhuman", insurance does not work there, 200k+ XP full clears.
- Shadow of Tagilla's helmet guards the neck (class 6). [MED] https://insider-gaming.com/?p=97950

### 3.3 Lighthouse rework (1.1.5.0, 2026-09-08) [HIGH unless tagged]

- Rogues moved OUT of the water treatment plant (WTP) into the upper/lower chalets and the switchback roads between them; they now shoot USEC on sight too (no more USEC truce).
- WTP: all mines and all stationary weapons covering the water crossing removed; **Glukhar + 5-6 guards now hold the WTP at 100%** (blast.tv, allthings.how, and tarkov.dev data agree).
- Goons spawn below the lower chalet. [MED]
- BTR patrols the main road, 8 stops Southern Road to Northern Checkpoint, ~5 min end to end. [MED for counts]
- New barricades/sandbags break up sightlines on the main road; underground passages under the cliffs link Side Tunnel to Southern Road; new central loot area; Rogue gear caches; Marked Room moved to WTP center. [MED]
- Icebreaker transit from Lighthouse docks; costs a "Sudak-tudak" marine repair kit, not roubles.
- Minefields near lake, main road, villa entrance removed. [MED]
- Sources:
  - https://insider-gaming.com/tarkov-latest-patch-notes-lighthouse-changes/ (2026-09-08)
  - https://allthings.how/?p=174397 (2026-09-11)
  - https://blast.tv/gaming/news/escape-from-tarkov-lighthouse-rework-and-new-tasks (2026-09-10)
  - https://neonsect.com/escape-from-tarkov/tarkov-lightkeeper-access-rework-1-1-5-0/ (2026-09-13)

### 3.4 Special locations

- **Terminal** (1.0 endgame): entered via Shoreline transition at night (22:00-04:00); a cutscene shows RUAF confiscating ALL your equipment, so your loadout does not matter there; you fight alongside RUAF (allied to BEAR, hostile to USEC) against Black Division and Scavs to reach the Zubr boat, the only exit; 3-min timer at the pier. [MED]
  - https://insider-gaming.com/escape-from-tarkov-terminal-map-entered/ ; https://www.gfinityesports.com/article/escape-from-tarkovs-terminal-has-finally-been-reached-heres-how
- **The Labyrinth**: Shoreline Resort basement door (Knossos LLC key), tripwires/poison/spike traps (bring multitool + antidote), 30 min, 5 players, 2 extracts. [MED]
  - https://tarkovforge.com/map-guide/labyrinth ; https://buzz.uni.edu/tarkovtips/?p=127 [LOW]
- **Icebreaker**: PvE-only ship, 1-3 players, 50 min; reached from Shoreline and (since 1.1.5) Lighthouse. [HIGH]

### 3.5 Typical engagement range per map [LOW-MED: long-standing community knowledge, no 2026 source quantifies it]

| Map | Range profile | Gun-type fit |
|---|---|---|
| Factory (day/night) | CQB, mostly under 30 m | SMG, shotgun, short AR; vs Tagilla: high pen + damage (7.62, AP-20) |
| The Lab / Blackout Lab | CQB-short (under 50 m); Blackout = darkness, NVG/thermal | SMG/AR with 50+ pen ammo; Raiders and Black Div wear class 4-6 |
| Labyrinth | CQB, corridors + traps | Short AR/shotgun with class-6-capable ammo (Shadow of Tagilla AVS TE 6) |
| Icebreaker | CQB, narrow multi-deck ship corridors | AR with 55+ pen (Black Division class 5-6), shotgun AP-20 risky |
| Interchange | CQB-mid inside the mall, mid-long in parking lots | AR, SMG; vs Killa class 5 armor |
| Reserve | Mixed: CQB in bunkers/buildings, mid in courtyards | AR; Raiders class 1-5 |
| Ground Zero | Short-mid urban | Any; low-armor AI |
| Streets of Tarkov | Mixed: CQB in buildings, mid-long down streets, many windows | AR or DMR; Kaban guard snipers |
| Customs | Mixed: CQB in dorms, mid around construction/Scav base, long across fields | AR with mid scope |
| Shoreline | Mid-long outdoors, CQB inside resort | DMR/AR; resort SMG/AR |
| Woods | Long (open fields), mid at sawmill | DMR, bolt-action, AR with magnified optic |
| Lighthouse (post-1.1.5) | Long along hills/coast; main road sightlines now shorter (barricades); mid uphill fights vs Rogues at chalets; CQB-mid inside WTP vs Glukhar squad | DMR + AR; 50+ pen for Rogue/Glukhar class 4-5 |
| Terminal | Not applicable to your loadout (gear confiscated) | n/a |

---

## 4. Best ammo per caliber (PVE game data, 2026-10-02)

Numbers: penetration / flesh damage (armor damage %). From https://json.tarkov.dev/pve/items [HIGH data]. Cross-check: lfcarry.com ammo chart (updated 2026-09-29, says "ballistics unchanged since 1.1.0.0") agrees on every value checked except 5.8x42 (see note). https://lfcarry.com/guides/tarkov-ammo-chart

Rule of thumb [MED, community heuristic]: to defeat armor class N reliably you want pen around 10 x N or higher (class 4 ~40, class 5 ~50, class 6 ~60). Bosses with no armor (Reshala, Shturman, Sanitar, Kaban, Kollontay body, Zryachiy, Partisan) reward high-damage rounds instead.

| Caliber | Top AP (vs class 5-6) | Balanced | Budget / flesh |
|---|---|---|---|
| 5.45x39 | PPBS 62/37 (59%); BS 54/45 (57%) | BP 45/48; 7N40 42/55 | BT 37/54; PS 28/56 |
| 5.56x45 | SSA AP 57/38 (58%); M995 53/42 (52%) | M855A1 44/49; M856A1 38/52 | M855 31/54; FMJ 23/57 |
| 5.8x42 (new 1.1.0) | DVC12 52/46 (60%); DVX12 47/48 | DBP191 39/53 | DBX95 33/57 (tracer) |
| 7.62x39 | MAI AP 58/53 (76%) | BP 47/58; PP 41/59 | PS 35/61; T-45M1 30/65 (now from start) |
| .300 BLK (7.62x35) | AP 48/51 (65%) | CBJ 43/58 | M62 36/54; Whisper 14/90 (unarmored only) |
| 9x39 | BP 54/58 (69%) | SP-6 48/60; PAB-9 43/62 | SPP 35/68; SP-5 28/71 |
| 7.62x51 | M993 65/70 (85%); M61 60/73 (79%) | M80A1 55/75 (74%) | M80 43/80; M62 42/82 |
| 6.8x51 | Hybrid 47/72 (58%) | - | FMJ 36/80 |
| 7.62x54R | BS 70/72 (88%); SNB 62/75 | BT 55/78 | PS 45/84; LPS 42/81 |
| 9.3x64 (TKPD) | 7N33 56/108 | FMJ 44/115 | SP 37/129 |
| .338 LM | AP 79/115 (89%) | FMJ 47/122 | UCW 32/142; TAC-X 18/196 |
| 12.7x55 (ASh-12, RSh-12) | PS12B 46/102 (57%) | PS12 28/115 | PS12A 10/165 |
| 12.7x99 (AK-50) | M903 115/160 | M33 56/190 | M21 45/220 |
| 9x19 | PBP 39/44 (55%) | AP 6.3 30/52 | Pst 20/54; RIP 2/102 (flesh) |
| 4.6x30 | AP SX 53/35 (46%) | FMJ SX 40/43 | JSP SX 32/46 |
| 5.7x28 | SS190 37/49 (43%) | L191 33/53 | SB193 27/59 (subsonic) |
| 9x21 | 7N42 38/49 | BT 32/52 | PS 22/59 |
| .45 ACP | AP 38/66 | FMJ 25/72 | RIP 3/130 (flesh) |
| 12ga | AP-20 slug 37/164 (65%) | Flechette 31/25x8; .50 BMG slug 26/197 | FTX 20/183; Magnum buck 2/50x8 |
| 7.62x25 TT | TT 995 37/32 | Pst 25/50 | - |
| 9x18 PM | PBM 28/40 | PstM 24/58 | - |

Notes:
- 5.8x42 discrepancy: lfcarry lists DVC12 at 49 pen and DBP191 at 32/56; tarkov.dev PVE data says DVC12 52/46 and DBP191 39/53. patched.gg/allthings.how name the 4th round "DBX12"; tarkov.dev names it "DVX12". Trust in-game check before hard-coding. [MED]
- Availability: loose rounds are not flea-tradeable (see 1.3), so "best" means best you can buy at your trader LL or craft. Several basic rounds were moved to lower LL in 1.1.0. [MED]
- PVE AI armor: game data above shows Raiders/Rogues up to class 5 and Black Division up to class 6, so 50-60+ pen rounds (M995/SSA AP, BS/PPBS, M61/M993, BS 54R, MAI AP, BP 9x39, DVC12) are what end those fights quickly. Boss guards on Customs/Streets/Reserve-era maps are mostly class 3-5. [HIGH data, MED interpretation]
- PvE AI PMC bot armor is not in the dataset (pmcUSEC/pmcBEAR have no loadout pool listed). [n/a]

---

## Sources list (dated where known)

- tarkov.dev cache: https://json.tarkov.dev/pve/maps , https://json.tarkov.dev/pve/items , https://json.tarkov.dev/pve/items_en , https://json.tarkov.dev/regular/maps (fetched 2026-10-02)
- patched.gg patch mirrors: https://patched.gg/games/escape-from-tarkov (1.0.2.0 2026-02-10, 1.0.2.5 2026-03-05, 1.0.4.0 2026-03-27, 1.0.4.5 2026-04-20, 1.0.5.0 2026-05-25, 1.0.6.0 2026-07-03, 1.1.0.0 2026-08-03)
- https://insider-gaming.com/tarkov-latest-patch-notes-lighthouse-changes/ (2026-09-08)
- https://insider-gaming.com/escape-from-tarkov-patch-notes-meta-change/ (2026-04-20)
- https://insider-gaming.com/escape-from-tarkov-1-5-update-patch-notes-icebreaker/ (2026-05-25)
- https://insider-gaming.com/escape-from-tarkov-roadmap-boss-weapons-mechanics/ (2026-08-28)
- https://insider-gaming.com/tarkov-blackout-how-to-complete-labs-keycard/ (2026-07-14)
- https://insider-gaming.com/tarkov-devs-confirm-spawn-changes-on-lighthouse/ (2026-05-01)
- https://insider-gaming.com/escape-from-tarkov-ai-upgrade-patch/ (2025-03-17)
- https://ixbt.games/en/news/2025/12/24/v-escape-from-tarkov-nacalsia-kolotun-i-obvalilis-servery-vyslo-obnovlenie-1010-s-novym-kontentom.html (2025-12-24)
- https://ixbt.games/en/news/2026/03/07/izmeneniia-modulei-escape-from-tarkov-tolko-nacalis-razrabotciki-anonsirovali-sleduiushhee-obnovlenie.html (2026-03-07)
- https://mp1st.com/title-updates-and-patches/escape-from-tarkov-update-1-0-2-servers-go-down-maintenance-february-10 (2026-02)
- https://www.shacknews.com/article/149310/what-is-the-icebreaker-location-in-escape-from-tarkov (2026-05-26)
- https://www.shacknews.com/article/145588/escape-from-tarkov-patch-notes-01690 (2025-08-20)
- https://allthings.how/escape-from-tarkov-1-1-0-0-what-the-kord-breach-season-changes/ (2026-08-03)
- https://allthings.how/?p=174397 (2026-09-11)
- https://blast.tv/gaming/news/escape-from-tarkov-lighthouse-rework-and-new-tasks (2026-09-10)
- https://neonsect.com/escape-from-tarkov/tarkov-1-1-0-0-patch-changes/ (2026-08-30)
- https://neonsect.com/escape-from-tarkov/tarkov-lightkeeper-access-rework-1-1-5-0/ (2026-09-13)
- https://lfcarry.com/guides/tarkov-ammo-chart (2026-09-29)
- https://finalboss.io/escape-from-tarkov-finally-dials-back-its-aimbot (2025-12-17, upd 2026-03-17) [timing LOW]
- https://timesaver.gg/blog/tarkov-black-division-guide (2026-07-22) [MED]; https://timesaver.gg/blog/tarkov-wedge-boss-guide (2026-07-21) [MED]; https://timesaver.gg/blog/tarkov-pve-mode-roubles-progression-guide (2026-08-27) [MED]
- https://www.dtgre.com/2026/05/escape-from-tarkov-best-weapons-2026-meta-guide.html (2026-05-18) [LOW]
- https://games.gg/escape-from-tarkov/guides/escape-from-tarkov-weapon-tier-list/ (2025-12-02) [LOW-MED]
- https://vocal.media/gamers/tarkov-nerfed-suppressors-again-and-it-s-for-the-better (~2026-05) [MED opinion]
- https://ggrecon.com/guides/escape-from-tarkov-new-weapons (2024-08-21)
