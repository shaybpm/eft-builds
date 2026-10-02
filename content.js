/* EFT Builds - hand-written content.
   Language-neutral judgement calls live here (tier, map fit, which maps suit a gun); the words live in
   TEXT.<lang>: Hebrew below, English in content.en.js, Russian in content.ru.js, all with the same shape.
   Data that changes with the game (stats, prices, parts, bosses per map) comes from data/eft-data.js.
   Based on research/meta-research-2026-10.md (patch 1.1.5).
   MAPS.prof = fit for [close, medium, long] range, 0 to 1. MAPS.need = how much the map calls for
   [a long-range weapon, a close-range weapon]: 0 not needed, 1 optional, 2 recommended, 3 must.
   GUNS keys = tarkov.dev normalizedName.
   Tier = combined judgement: 2026 community sources where they exist + game data where they do not. */
window.EFT_CONTENT = {
  "PATCH": "1.1.5",
  "CLASSES": [
    {
      "id": "ar",
      "icon": "colt-m4a1-556x45-assault-rifle",
      "role": "mid"
    },
    {
      "id": "carbine",
      "icon": "as-val-9x39-special-assault-rifle",
      "role": "mid"
    },
    {
      "id": "smg",
      "icon": "hk-mp7a1-46x30-submachine-gun",
      "role": "cqb"
    },
    {
      "id": "shotgun",
      "icon": "remington-model-870-12ga-pump-action-shotgun",
      "role": "cqb"
    },
    {
      "id": "dmr",
      "icon": "knights-armament-company-sr-25-762x51-marksman-rifle",
      "role": "long"
    },
    {
      "id": "sniper",
      "icon": "remington-model-700-762x51-bolt-action-sniper-rifle",
      "role": "long"
    },
    {
      "id": "lmg",
      "icon": "rpk-16-545x39-light-machine-gun",
      "role": "mid"
    },
    {
      "id": "pistol",
      "icon": "glock-17-9x19-pistol",
      "role": "cqb"
    }
  ],
  "MAPS": {
    "factory": {
      "prof": [
        1,
        0.2,
        0
      ],
      "need": [
        0,
        3
      ],
      "armor": true
    },
    "night-factory": {
      "prof": [
        1,
        0.15,
        0
      ],
      "need": [
        0,
        3
      ],
      "armor": true
    },
    "customs": {
      "prof": [
        0.55,
        1,
        0.5
      ],
      "need": [
        1,
        2
      ],
      "armor": false
    },
    "woods": {
      "prof": [
        0.1,
        0.6,
        1
      ],
      "need": [
        3,
        2
      ],
      "armor": false
    },
    "lighthouse": {
      "prof": [
        0.35,
        0.85,
        0.85
      ],
      "need": [
        2,
        3
      ],
      "armor": true
    },
    "shoreline": {
      "prof": [
        0.45,
        0.85,
        0.8
      ],
      "need": [
        2,
        2
      ],
      "armor": false
    },
    "reserve": {
      "prof": [
        0.75,
        0.9,
        0.35
      ],
      "need": [
        1,
        3
      ],
      "armor": true
    },
    "interchange": {
      "prof": [
        1,
        0.55,
        0.15
      ],
      "need": [
        0,
        3
      ],
      "armor": true
    },
    "streets-of-tarkov": {
      "prof": [
        0.7,
        0.9,
        0.5
      ],
      "need": [
        1,
        3
      ],
      "armor": true
    },
    "the-lab": {
      "prof": [
        1,
        0.45,
        0
      ],
      "need": [
        0,
        3
      ],
      "armor": true
    },
    "the-lab-dark": {
      "prof": [
        1,
        0.4,
        0
      ],
      "need": [
        0,
        3
      ],
      "armor": true
    },
    "ground-zero": {
      "prof": [
        0.65,
        0.9,
        0.3
      ],
      "need": [
        0,
        3
      ],
      "armor": false
    },
    "ground-zero-21": {
      "prof": [
        0.65,
        0.9,
        0.3
      ],
      "need": [
        0,
        3
      ],
      "armor": false
    },
    "terminal": {
      "prof": [
        0,
        0,
        0
      ],
      "armor": true,
      "skip": true
    },
    "the-labyrinth": {
      "prof": [
        1,
        0.15,
        0
      ],
      "need": [
        0,
        3
      ],
      "armor": true
    },
    "icebreaker": {
      "prof": [
        0.95,
        0.55,
        0.1
      ],
      "need": [
        0,
        3
      ],
      "armor": true
    }
  },
  "GUNS": {
    "desert-tech-mdr-762x51-assault-rifle": {
      "tier": "S",
      "maps": [
        "lighthouse",
        "reserve",
        "icebreaker",
        "streets-of-tarkov"
      ]
    },
    "sig-mcx-spear-68x51-assault-rifle": {
      "tier": "S",
      "maps": [
        "lighthouse",
        "streets-of-tarkov",
        "customs"
      ]
    },
    "custom-guns-nl545-di-545x39-assault-rifle": {
      "tier": "A",
      "maps": [
        "interchange",
        "reserve",
        "customs"
      ]
    },
    "custom-guns-nl545-gp-545x39-assault-rifle": {
      "tier": "A",
      "maps": [
        "interchange",
        "reserve",
        "customs"
      ]
    },
    "hk-416a5-556x45-assault-rifle": {
      "tier": "A",
      "maps": [
        "customs",
        "reserve",
        "interchange"
      ]
    },
    "hk-416a5-556x45-assault-rifle-ral-8000": {
      "tier": "A",
      "maps": [
        "customs",
        "reserve",
        "interchange"
      ]
    },
    "colt-m4a1-556x45-assault-rifle": {
      "tier": "A",
      "maps": [
        "customs",
        "reserve",
        "interchange"
      ]
    },
    "cmmg-mk47-mutant-762x39-assault-rifle": {
      "tier": "A",
      "maps": [
        "reserve",
        "interchange",
        "customs"
      ]
    },
    "rifle-dynamics-rd-704-762x39-assault-rifle": {
      "tier": "A",
      "maps": [
        "reserve",
        "customs",
        "interchange"
      ]
    },
    "sag-ak-545-545x39-carbine": {
      "tier": "A",
      "maps": [
        "interchange",
        "customs",
        "ground-zero"
      ]
    },
    "sag-ak-545-short-545x39-carbine": {
      "tier": "A",
      "maps": [
        "interchange",
        "factory",
        "the-lab"
      ]
    },
    "kalashnikov-ak-74m-545x39-assault-rifle": {
      "tier": "B",
      "maps": [
        "customs",
        "reserve",
        "ground-zero"
      ]
    },
    "kalashnikov-ak-74n-545x39-assault-rifle": {
      "tier": "B"
    },
    "kalashnikov-ak-105-545x39-assault-rifle": {
      "tier": "B"
    },
    "kalashnikov-ak-12-545x39-assault-rifle": {
      "tier": "B"
    },
    "kalashnikov-akm-762x39-assault-rifle": {
      "tier": "B"
    },
    "kalashnikov-akms-762x39-assault-rifle": {
      "tier": "B"
    },
    "steyr-aug-a3-556x45-assault-rifle": {
      "tier": "A"
    },
    "steyr-aug-a3-556x45-assault-rifle-black": {
      "tier": "A"
    },
    "steyr-aug-a1-556x45-assault-rifle": {
      "tier": "B"
    },
    "desert-tech-mdr-556x45-assault-rifle": {
      "tier": "A"
    },
    "fn-scar-h-x-17-762x51-assault-rifle": {
      "tier": "A",
      "maps": [
        "lighthouse",
        "reserve",
        "woods"
      ]
    },
    "fn-scar-h-762x51-assault-rifle": {
      "tier": "A",
      "maps": [
        "lighthouse",
        "reserve",
        "woods"
      ]
    },
    "fn-scar-l-556x45-assault-rifle": {
      "tier": "B"
    },
    "howa-type-20-556x45-assault-rifle": {
      "tier": "B"
    },
    "norinco-qbz-191-58x42-assault-rifle": {
      "tier": "B"
    },
    "kalashnikov-ak-308-762x51-assault-rifle": {
      "tier": "B"
    },
    "sig-mcx-300-blackout-assault-rifle": {
      "tier": "B"
    },
    "aklys-defense-velociraptor-300-blackout-assault-rifle": {
      "tier": "B"
    },
    "ash-12-127x55-assault-rifle": {
      "tier": "B"
    },
    "colt-m16a2-556x45-assault-rifle": {
      "tier": "C"
    },
    "colt-m16a1-556x45-assault-rifle": {
      "tier": "B"
    },
    "ds-arms-sa58-762x51-assault-rifle": {
      "tier": "C"
    },
    "as-val-9x39-special-assault-rifle": {
      "tier": "A",
      "maps": [
        "reserve",
        "interchange",
        "the-lab",
        "customs"
      ]
    },
    "as-val-mod4-9x39-special-assault-rifle": {
      "tier": "A",
      "maps": [
        "reserve",
        "interchange",
        "the-lab"
      ]
    },
    "sr-3m-9x39-compact-assault-rifle": {
      "tier": "A",
      "maps": [
        "interchange",
        "the-lab",
        "factory"
      ]
    },
    "kbp-9a-91-9x39-compact-assault-rifle": {
      "tier": "B"
    },
    "kbp-vsk-94-9x39-rifle": {
      "tier": "B"
    },
    "toz-simonov-sks-762x39-carbine": {
      "tier": "C"
    },
    "molot-arms-simonov-op-sks-762x39-carbine": {
      "tier": "C"
    },
    "tokarev-svt-40-762x54r-rifle": {
      "tier": "C"
    },
    "tokarev-avt-40-762x54r-automatic-rifle": {
      "tier": "C"
    },
    "hk-mp7a2-46x30-submachine-gun": {
      "tier": "S",
      "maps": [
        "factory",
        "the-lab",
        "interchange",
        "the-labyrinth"
      ]
    },
    "hk-mp7a1-46x30-submachine-gun": {
      "tier": "S",
      "maps": [
        "factory",
        "the-lab",
        "interchange"
      ]
    },
    "tdi-kriss-vector-gen2-9x19-submachine-gun": {
      "tier": "A",
      "maps": [
        "factory",
        "interchange",
        "the-lab"
      ]
    },
    "tdi-kriss-vector-gen2-45-acp-submachine-gun": {
      "tier": "A",
      "maps": [
        "factory",
        "interchange",
        "the-lab"
      ]
    },
    "sig-mpx-9x19-submachine-gun": {
      "tier": "A"
    },
    "hk-mp5-9x19-submachine-gun-navy-3-round-burst": {
      "tier": "B"
    },
    "fn-p90-57x28-submachine-gun": {
      "tier": "B"
    },
    "fn-p90-57x28-submachine-gun-scourge": {
      "tier": "B"
    },
    "hk-ump-45-acp-submachine-gun": {
      "tier": "B"
    },
    "sr-2m-veresk-9x21-submachine-gun": {
      "tier": "B"
    },
    "pp-19-01-vityaz-9x19-submachine-gun": {
      "tier": "B"
    },
    "soyuz-tm-stm-9-gen2-9x19-carbine": {
      "tier": "B"
    },
    "saiga-9-9x19-carbine": {
      "tier": "C"
    },
    "bt-mp9-9x19-submachine-gun": {
      "tier": "B"
    },
    "bt-mp9-n-9x19-submachine-gun": {
      "tier": "B"
    },
    "iwi-uzi-pro-smg-9x19-submachine-gun": {
      "tier": "B"
    },
    "ppsh-41-762x25-submachine-gun": {
      "tier": "C"
    },
    "saiga-12k-12ga-automatic-shotgun": {
      "tier": "A",
      "maps": [
        "factory",
        "the-labyrinth",
        "interchange"
      ]
    },
    "mps-auto-assault-12-gen-2-12ga-automatic-shotgun": {
      "tier": "A",
      "maps": [
        "factory",
        "the-labyrinth",
        "interchange"
      ]
    },
    "mps-auto-assault-12-gen-1-12ga-automatic-shotgun": {
      "tier": "B"
    },
    "saiga-12k-12ga-automatic-shotgun-redline": {
      "tier": "A"
    },
    "remington-model-870-12ga-pump-action-shotgun": {
      "tier": "B"
    },
    "mp-155-12ga-semi-automatic-shotgun": {
      "tier": "B"
    },
    "mp-153-12ga-semi-automatic-shotgun": {
      "tier": "B"
    },
    "mossberg-590a1-12ga-pump-action-shotgun": {
      "tier": "B"
    },
    "benelli-m3-super-90-12ga-dual-mode-shotgun": {
      "tier": "B"
    },
    "toz-ks-23m-23x75mm-pump-action-shotgun": {
      "tier": "C"
    },
    "knights-armament-company-sr-25-762x51-marksman-rifle": {
      "tier": "A",
      "maps": [
        "woods",
        "lighthouse",
        "shoreline",
        "customs"
      ]
    },
    "knights-armament-company-sr-25-762x51-marksman-rifle-taupe": {
      "tier": "A",
      "maps": [
        "woods",
        "lighthouse",
        "shoreline",
        "customs"
      ]
    },
    "remington-r11-rsass-762x51-marksman-rifle": {
      "tier": "A",
      "maps": [
        "woods",
        "lighthouse",
        "shoreline",
        "streets-of-tarkov"
      ]
    },
    "hk-g28-762x51-marksman-rifle": {
      "tier": "A",
      "maps": [
        "woods",
        "lighthouse",
        "shoreline"
      ]
    },
    "svds-762x54r-sniper-rifle": {
      "tier": "A",
      "maps": [
        "woods",
        "lighthouse",
        "shoreline",
        "customs"
      ]
    },
    "springfield-armory-m1a-762x51-rifle": {
      "tier": "B"
    },
    "kel-tec-rfb-762x51-rifle": {
      "tier": "B"
    },
    "vss-vintorez-9x39-special-sniper-rifle": {
      "tier": "A",
      "maps": [
        "reserve",
        "customs",
        "shoreline",
        "interchange"
      ]
    },
    "tkpd-93x64-carbine": {
      "tier": "B"
    },
    "sword-international-mk-18-338-lm-marksman-rifle": {
      "tier": "B"
    },
    "theakguy-ak-50-50-bmg-anti-materiel-rifle": {
      "tier": "C"
    },
    "lobaev-arms-dvl-10-762x51-bolt-action-sniper-rifle": {
      "tier": "A",
      "maps": [
        "woods",
        "lighthouse",
        "shoreline"
      ]
    },
    "remington-model-700-762x51-bolt-action-sniper-rifle": {
      "tier": "A",
      "maps": [
        "woods",
        "lighthouse",
        "shoreline"
      ]
    },
    "orsis-t-5000m-762x51-bolt-action-sniper-rifle": {
      "tier": "A",
      "maps": [
        "woods",
        "lighthouse",
        "shoreline"
      ]
    },
    "accuracy-international-axmc-338-lm-bolt-action-sniper-rifle": {
      "tier": "A",
      "maps": [
        "woods",
        "lighthouse",
        "shoreline"
      ]
    },
    "sv-98-762x54r-bolt-action-sniper-rifle": {
      "tier": "B"
    },
    "mosin-762x54r-bolt-action-rifle-sniper": {
      "tier": "B"
    },
    "mosin-762x54r-bolt-action-rifle-infantry": {
      "tier": "C"
    },
    "sako-trg-m10-338-lm-bolt-action-sniper-rifle": {
      "tier": "B"
    },
    "marlin-mxlr-308-me-lever-action-rifle": {
      "tier": "B"
    },
    "rpk-16-545x39-light-machine-gun": {
      "tier": "A",
      "maps": [
        "reserve",
        "customs",
        "interchange",
        "lighthouse"
      ]
    },
    "kalashnikov-pkm-762x54r-machine-gun": {
      "tier": "A",
      "maps": [
        "lighthouse",
        "reserve",
        "woods"
      ]
    },
    "kalashnikov-pkp-762x54r-infantry-machine-gun": {
      "tier": "A",
      "maps": [
        "lighthouse",
        "reserve",
        "woods"
      ]
    },
    "us-ordnance-m60e6-762x51-light-machine-gun": {
      "tier": "B"
    },
    "us-ordnance-m60e6-762x51-light-machine-gun-fde": {
      "tier": "B"
    },
    "us-ordnance-m60e4-762x51-light-machine-gun": {
      "tier": "B"
    },
    "degtyarev-rpd-762x39-machine-gun": {
      "tier": "B"
    },
    "degtyarev-rpdn-762x39-machine-gun": {
      "tier": "B"
    },
    "glock-18c-9x19-machine-pistol": {
      "tier": "A"
    },
    "fn-five-seven-mk2-57x28-pistol": {
      "tier": "A"
    },
    "fn-five-seven-mk2-57x28-pistol-fde": {
      "tier": "A"
    },
    "magnum-research-desert-eagle-l6-50-ae-pistol": {
      "tier": "B"
    },
    "magnum-research-desert-eagle-mk-xix-50-ae-pistol": {
      "tier": "B"
    },
    "serdyukov-sr-1mp-gyurza-9x21-pistol": {
      "tier": "B"
    },
    "stechkin-aps-9x18pm-machine-pistol": {
      "tier": "B"
    },
    "stechkin-apb-9x18pm-silenced-machine-pistol": {
      "tier": "B"
    },
    "glock-17-9x19-pistol": {
      "tier": "B"
    },
    "glock-19x-9x19-pistol": {
      "tier": "B"
    }
  },
  "SOURCES": [
    {
      "u": "https://tarkov.dev"
    },
    {
      "u": "https://insider-gaming.com/tarkov-latest-patch-notes-lighthouse-changes/"
    },
    {
      "u": "https://insider-gaming.com/escape-from-tarkov-patch-notes-meta-change/"
    },
    {
      "u": "https://patched.gg/games/escape-from-tarkov"
    },
    {
      "u": "https://allthings.how/escape-from-tarkov-1-1-0-0-what-the-kord-breach-season-changes/"
    },
    {
      "u": "https://www.shacknews.com/article/149310/what-is-the-icebreaker-location-in-escape-from-tarkov"
    },
    {
      "u": "https://games.gg/escape-from-tarkov/guides/escape-from-tarkov-weapon-tier-list/"
    }
  ],
  "TEXT": {}
};

/* Hebrew text (the source the other languages are translated from) */
window.EFT_CONTENT.TEXT.he = {
  "meta_note": "מאז עדכון 1.0.4.5 (אפריל 2026) מעצורי לוע ומשתקי רתע מורידים רתע יותר ממשתיקים, קנה ארוך מוריד יותר רתע, ומגני ידיים כבר לא מורידים רתע בכלל. לכן רוב הבילדים כאן \"רועשים\", בלי משתיק, וזה בדיוק הכיוון ש-BSG רצו.",
  "classes": {
    "ar": {
      "n": "רובי סער",
      "hint": "הנשק הכי גמיש: טוב כמעט לכל מפה",
      "role_text": "רובה סער: נשק כללי לטווח קצר ובינוני שמתאים כמעט לכל מפה.",
      "pve": "ה-AI ב-PVE מגיב מהר ופוגע מדויק בטווח בינוני. צרורות קצרים לחזה ולראש עם תחמושת חודרת עובדים הכי טוב."
    },
    "carbine": {
      "n": "קרבינים",
      "hint": "רובי 9x39 שקטים, קרבינים ורובים חצי-אוטומטיים קלאסיים",
      "role_text": "קרבין: נשק קומפקטי לטווח קצר-בינוני.",
      "pve": "רובי ה-9x39 השקטים מצוינים ב-PVE: ה-AI מתקשה לאתר מאיפה יורים, ו-SP-6 או BP מפילות גם שומרים משוריינים."
    },
    "smg": {
      "n": "תת-מקלעים",
      "hint": "לקרבות צמודים בתוך מבנים",
      "role_text": "תת-מקלע: קצב אש גבוה ורתע נמוך לטווח קצר, בעיקר בתוך מבנים.",
      "pve": "ב-PVE תת-מקלע עם תחמושת חודרת מספיק מול רוב ה-AI, אבל מול בוסים עם שריון Class 5-6 כדאי לכוון לראש או לרגליים."
    },
    "shotgun": {
      "n": "רובי ציד (שוטגאנים)",
      "hint": "עוצמה מטורפת מטווח אפס, חלש בטווח",
      "role_text": "שוטגאן: הרבה נזק מקרוב, כמעט חסר תועלת בטווח בינוני ומעלה.",
      "pve": "AP-20 (קליע יחיד, חדירה 37) הוא התחמושת היחידה של 12ga שמתמודדת עם שריון. עם כדוריות כוון לרגליים ולראש."
    },
    "dmr": {
      "n": "רובי קלע (DMR)",
      "hint": "חצי-אוטומטיים מדויקים לטווח בינוני-ארוך",
      "role_text": "רובה קלע: ירייה מדויקת וחזקה לטווח בינוני-ארוך, בקצב חצי-אוטומטי.",
      "pve": "ב-PVE ה-DMR הוא אולי הנשק הכי יעיל: ה-AI לא מתחמק כמו שחקנים, ושתי יריות 7.62x51 חודרות מפילות כמעט כל אחד. קיבלו שיפור רתע בעדכון 1.0.4.5."
    },
    "sniper": {
      "n": "רובי צלפים",
      "hint": "בריח וטווח ארוך",
      "role_text": "רובה צלפים: ירייה אחת חזקה ומדויקת מטווח ארוך, איטי מאוד בקרב צמוד.",
      "pve": "ה-AI שומע את הירייה ומגיע לבדוק. אחרי ירייה החלף עמדה, וקח תת-מקלע או אקדח טוב כנשק שני לקרב קרוב."
    },
    "lmg": {
      "n": "מקלעים",
      "hint": "הרבה אש ומחסניות ענק",
      "role_text": "מקלע: נפח אש גדול ומחסנית ענקית, כבד ופחות זריז.",
      "pve": "מצוין מול קבוצות AI (Raiders, Rogues, Goons, השומרים של Glukhar). כל המקלעים קיבלו שיפור רתע בעדכון 1.0.4.5."
    },
    "pistol": {
      "n": "אקדחים",
      "hint": "נשק משני וגיבוי",
      "role_text": "אקדח: נשק גיבוי לטווח קצר מאוד.",
      "pve": "ב-PVE אקדח הוא בעיקר גיבוי. אם כבר, עדיף אחד עם תחמושת חודרת או ירי אוטומטי."
    }
  },
  "maps": {
    "factory": "מפה קטנה וסגורה: קרבות צמודים במסדרונות ובחדרים. Tagilla מסתובב עם פטיש ושריון כבד (עד Class 6).",
    "night-factory": "Factory בלילה: אותו קרב צמוד בחושך, ו-Tagilla מופיע בסיכוי גבוה יותר. כדאי פנס או ראיית לילה.",
    "customs": "מפה מגוונת: קרב צמוד בדורמים, בינוני סביב אתר הבנייה ובסיס הסקאבים, ארוך מעל השדות. Reshala ושומריו (שריון עד Class 5) והגונז לפעמים.",
    "woods": "יער פתוח עם טווחים ארוכים ומעט מחסה. Shturman ושומריו במנסרה, לפעמים הגונז.",
    "lighthouse": "מאז עדכון 1.1.5: Glukhar ושומריו מחזיקים את מתקן טיהור המים, וה-Rogues עברו לבקתות על ההר. המכרות והמקלעים הנייחים הוסרו. טווחים בינוניים-ארוכים.",
    "shoreline": "מפה גדולה: טווחים ארוכים בחוץ וקרב צמוד בתוך הריזורט. Sanitar ושומריו, הגונז ליד תחנת מזג האוויר.",
    "reserve": "בסיס צבאי עם בניינים ובונקרים, קרבות קצרים-בינוניים. Glukhar כבר לא כאן (עבר ל-Lighthouse), אבל Raiders משוריינים יוצאים מהבונקרים.",
    "interchange": "קניון ענק: קרבות בתוך מבנים ובמסדרונות ארוכים, טווח בינוני בחניונים. Killa (שריון Class 5 וקסדה) ו-Tagilla.",
    "streets-of-tarkov": "עיר הרוסה: רחובות, בניינים וחלונות, טווח קצר עד בינוני. Kaban עם שומרים וצלפים, ו-Kollontay עם החוליה שלו.",
    "the-lab": "מעבדה תת-קרקעית: CQB מול הרבה Raiders משוריינים (עד Class 5). צריך כרטיס כניסה.",
    "the-lab-dark": "המעבדה בחושך (Blackout): The Wedge, Raiders ו-Black Division עם שריון Class 5-6. חדירה גבוהה וראיית לילה הן חובה.",
    "ground-zero": "מפת המתחילים: רובע עסקים, טווחים קצרים-בינוניים ואויבים קלים יחסית.",
    "ground-zero-21": "Ground Zero לשחקנים מרמה 21: אותה מפה עם אויבים קשים יותר.",
    "terminal": "הציוד שלך מוחרם בכניסה, אז הבילד לא רלוונטי שם.",
    "the-labyrinth": "מבוך תת-קרקעי עם מלכודות: Shadow of Tagilla (שריון וקסדה Class 6) ו-Vengeful Killa. קרבות קצרים מאוד.",
    "icebreaker": "ספינה עם מסדרונות צרים, PVE בלבד: The Wedge, Knight עם Rogues ו-Black Division עם שריון Class 5-6. צריך חדירה של 55 ומעלה."
  },
  "kit": {
    "factory": "קרב צמוד בלבד: נשק אוטומטי אחד עם תחמושת חודרת מספיק. נשק ארוך-טווח רק יכביד.",
    "night-factory": "קרב צמוד בחושך: נשק אוטומטי אחד עם תחמושת חודרת ופנס מספיק. נשק נוסף לא עוזר כאן.",
    "customs": "נשק אוטומטי לדורמים ולבסיס הסקאבים הוא העיקר. מי שרוצה לשלוט בשדות הפתוחים יכול להוסיף DMR, אבל זה לא הכרחי.",
    "woods": "רוב הקרבות בשדות פתוחים ומטווח ארוך, אז נשק צלפים או DMR הוא העיקר. במנסרה, מול השומרים של Shturman ובהפתעות מקרוב, נשק אוטומטי שני מציל את הריד.",
    "lighthouse": "שני נשקים: נשק ארוך-טווח לגבעות ולחוף, ונשק אוטומטי עם חדירה של 50 ומעלה למתקן טיהור המים (Glukhar והשומרים שלו) ולבקתות של ה-Rogues.",
    "shoreline": "בחוץ הטווחים ארוכים ובתוך הריזורט הקרב צמוד, אז שילוב של נשק ארוך-טווח ונשק אוטומטי הוא הכי בטוח.",
    "reserve": "רוב הקרבות קצרים-בינוניים בבניינים ובבונקרים, מול Raiders משוריינים. נשק אוטומטי חזק הוא חובה, ו-DMR נוסף שימושי רק לחצרות הפתוחות.",
    "interchange": "קניון סגור: נשק אוטומטי אחד עם חדירה גבוהה (מול Killa) מספיק. אין קווי ראייה ארוכים שמצדיקים נשק צלפים.",
    "streets-of-tarkov": "רוב הקרבות בבניינים וברחובות קצרים, אז נשק אוטומטי הוא העיקר. DMR נוסף עוזר מול הצלפים של Kaban ברחובות הארוכים.",
    "the-lab": "CQB מול Raiders משוריינים: נשק אוטומטי אחד עם חדירה גבוהה. נשק נוסף רק מוסיף משקל.",
    "the-lab-dark": "חושך וקרב צמוד: נשק אוטומטי אחד עם חדירה גבוהה וראיית לילה. נשק נוסף לא עוזר כאן.",
    "ground-zero": "טווחים קצרים-בינוניים ואויבים קלים: כל נשק אוטומטי סביר מספיק לבד.",
    "ground-zero-21": "אויבים קשים יותר, אבל עדיין טווחים קצרים-בינוניים: נשק אוטומטי אחד עם תחמושת טובה מספיק.",
    "the-labyrinth": "מסדרונות צרים ומלכודות: נשק אוטומטי קצר אחד שמתמודד עם שריון Class 6. נשק ארוך רק מפריע.",
    "icebreaker": "מסדרונות צרים בספינה: נשק אוטומטי אחד עם חדירה של 55 ומעלה. אין שימוש לנשק צלפים."
  },
  "guns": {
    "desert-tech-mdr-762x51-assault-rifle": {
      "summary": "בולפאפ 7.62x51 עם ארגונומיה גבוהה: אחד הנשקים היחידים שיורים אוטומטי תחמושת של 60+ חדירה (M61 בבארטר אצל Ref, M993 משלל). בראש רשימות המטא של 2026.",
      "pros": [
        "7.62x51 עם M61 או M993 מפיל גם Raiders ו-Black Division בכמה כדורים",
        "ארגונומיה בסיסית גבוהה (67) יחסית לקליבר"
      ],
      "cons": [
        "חסום בפליי: משיגים מסוחרים, בארטר או משלל",
        "רתע 7.62x51 מורגש בירי אוטומטי, עדיף צרורות קצרים"
      ],
      "pve": "הנשק הכי טוב לריידים על Rogues, Glukhar ו-Black Division. ירי בודד או צרורות של 2 לחזה."
    },
    "sig-mcx-spear-68x51-assault-rifle": {
      "summary": "רובה 6.8x51 עם תחמושת Hybrid (חדירה 47, נזק 72): הרבה עוצמה ברובה סער גמיש.",
      "pros": [
        "נזק גבוה לכל כדור עם חדירה סבירה"
      ],
      "cons": [
        "חסום בפליי",
        "רתע בסיסי גבוה ושני סוגי תחמושת בלבד"
      ]
    },
    "custom-guns-nl545-di-545x39-assault-rifle": {
      "summary": "AR בקליבר 5.45 שנוסף ב-1.0: קצב אש 800 ותחמושת 5.45 החזקה. מקור אחד ב-2026 מדרג אותו כנשק הכי שטוח במשחק.",
      "pros": [
        "משתמש ב-5.45: 7N40 נמכרת אצל Prapor ו-BP בקראפט"
      ],
      "cons": [
        "גוף הנשק יקר מאוד"
      ]
    },
    "custom-guns-nl545-gp-545x39-assault-rifle": {
      "summary": "גרסת ה-GP של NL545: קצב אש 850 ו-5.45. Reshala לפעמים נושא אותו.",
      "pros": [
        "משתמש ב-5.45: 7N40 נמכרת אצל Prapor ו-BP בקראפט"
      ],
      "cons": [
        "גוף הנשק יקר מאוד"
      ]
    },
    "hk-416a5-556x45-assault-rifle": {
      "summary": "ה-AR הגרמני: אמין, קצב אש 850, וקיבל שיפור ברתע הבסיסי בעדכון 1.0.4.5. דורג A בכל רשימות המטא.",
      "cons": [
        "רתע בסיסי גבוה: בלי קת וקנה טובים הוא קופצני"
      ]
    },
    "hk-416a5-556x45-assault-rifle-ral-8000": {
      "summary": "אותו HK 416A5 בצבע RAL 8000 (נוסף ב-1.1.0). אותם נתונים בדיוק."
    },
    "colt-m4a1-556x45-assault-rifle": {
      "summary": "הפלטפורמה הכי גמישה במשחק: אינסוף חלקים, מחירים סבירים ותחמושת 5.56 זמינה. בחירה בטוחה לכל שלב.",
      "pros": [
        "כמות חלקים עצומה, קל לבנות בכל תקציב"
      ],
      "cons": [
        "התחמושת החזקה (M995, SSA AP) רק משלל ב-PVE"
      ]
    },
    "cmmg-mk47-mutant-762x39-assault-rifle": {
      "summary": "AR בקליבר 7.62x39: נזק גבוה וחדירה טובה עם BP ו-MAI AP. דורג S בסוף 2025 וקיבל שיפור רתע ב-1.0.4.5.",
      "pros": [
        "נזק גבוה לכל כדור עם BP (חדירה 47, נזק 58)"
      ]
    },
    "rifle-dynamics-rd-704-762x39-assault-rifle": {
      "summary": "AK מודרני ב-7.62x39 עם ארגונומיה מצוינת בבילד. מהמשתלמים ביותר לאמצע הדרך."
    },
    "sag-ak-545-545x39-carbine": {
      "summary": "AK בקליבר 5.45 עם ארגונומיה גבוהה מאוד ומחיר נמוך: תמורה מעולה לכסף."
    },
    "sag-ak-545-short-545x39-carbine": {
      "summary": "הגרסה הקצרה של AK-545: עוד יותר זריז, מצוין בתוך מבנים."
    },
    "kalashnikov-ak-74m-545x39-assault-rifle": {
      "summary": "ה-AK הקלאסי ב-5.45: זול, חלקים בכל מקום, 7N40 אצל Prapor ו-BP בקראפט. נשק עבודה מצוין, במיוחד בבילד \"רועש\" עם מעצור לוע."
    },
    "kalashnikov-ak-74n-545x39-assault-rifle": {
      "summary": "AK-74 עם מסילה לכוונת. זול ואמין, נשק תקציבי מומלץ במקורות 2026."
    },
    "kalashnikov-ak-105-545x39-assault-rifle": {
      "summary": "AK קצר ב-5.45 עם רתע נוח. בילד עם מעצור לוע עובד טוב יותר ממשתיק (מקורות 2026)."
    },
    "kalashnikov-ak-12-545x39-assault-rifle": {
      "summary": "AK מודרני ב-5.45 עם מסילות מובנות, קצב אש 700."
    },
    "kalashnikov-akm-762x39-assault-rifle": {
      "summary": "AKM ב-7.62x39: זול עם נזק גבוה. רתע חזק יותר מ-5.45, אבל קיבל שיפור ב-1.0.4.5."
    },
    "kalashnikov-akms-762x39-assault-rifle": {
      "summary": "AKM עם קת מתקפלת: זול ונזק גבוה."
    },
    "steyr-aug-a3-556x45-assault-rifle": {
      "summary": "בולפאפ 5.56 עם ארגונומיה בסיסית 95 ורתע נמוך כבר מהקופסה. מעט חלקים לשדרוג, אבל לא צריך הרבה.",
      "pros": [
        "טוב כבר בלי שדרוגים: זול להפעלה"
      ]
    },
    "steyr-aug-a3-556x45-assault-rifle-black": {
      "summary": "AUG A3 בשחור: אותם נתונים מצוינים מהקופסה."
    },
    "steyr-aug-a1-556x45-assault-rifle": {
      "summary": "AUG הוותיק: ארגונומיה גבוהה ורתע נמוך, עם כוונת מובנית."
    },
    "desert-tech-mdr-556x45-assault-rifle": {
      "summary": "בולפאפ 5.56 עם הרתע הבסיסי הנמוך ביותר ברובי ה-5.56, וארגונומיה טובה."
    },
    "fn-scar-h-x-17-762x51-assault-rifle": {
      "summary": "SCAR-H בגרסת X-17: 7.62x51 אוטומטי עם אותם נתונים כמו Mk 17, אבל נמכר בפליי.",
      "pros": [
        "7.62x51 אוטומטי שאפשר לקנות בפליי"
      ]
    },
    "fn-scar-h-762x51-assault-rifle": {
      "summary": "SCAR-H: 7.62x51 אוטומטי, הנשק של Knight מהגונז. חסום בפליי (ה-X-17 זהה ונמכר)."
    },
    "fn-scar-l-556x45-assault-rifle": {
      "summary": "SCAR-L ב-5.56: רתע נמוך ואמין, קצב אש 650."
    },
    "howa-type-20-556x45-assault-rifle": {
      "summary": "חדש מעדכון 1.1.0 (אוגוסט 2026): מהרתע הבסיסי הנמוך ב-5.56. עדיין אין עליו הכרעת קהילה. חסום בפליי."
    },
    "norinco-qbz-191-58x42-assault-rifle": {
      "summary": "חדש מעדכון 1.1.0 עם קליבר חדש 5.8x42. התחמושת החזקה (DVC12, חדירה 52) נדירה. חסום בפליי, Black Division נושאים אותו."
    },
    "kalashnikov-ak-308-762x51-assault-rifle": {
      "summary": "AK בקליבר 7.62x51: עוצמה של .308 בגוף AK, עם רתע כבד."
    },
    "sig-mcx-300-blackout-assault-rifle": {
      "summary": "MCX ב-.300 Blackout: קומפקטי, AP (חדירה 48, בקראפט) טובה מאוד לטווח קצר-בינוני."
    },
    "aklys-defense-velociraptor-300-blackout-assault-rifle": {
      "summary": "רובה .300 Blackout עם רתע בסיסי נמוך לקליבר. קיבל שיפור ב-1.0.4.5."
    },
    "ash-12-127x55-assault-rifle": {
      "summary": "12.7x55: נזק עצום לכל כדור (102 עם PS12B). מעולה מול בוסים לא משוריינים כמו Kaban ו-Sanitar."
    },
    "colt-m16a2-556x45-assault-rifle": {
      "summary": "M16A2: ירי בודד וצרורות בלבד, בלי אוטומטי.",
      "cons": [
        "אין ירי אוטומטי: בודד או צרור של 3"
      ]
    },
    "colt-m16a1-556x45-assault-rifle": {
      "summary": "M16A1 הוותיק עם ירי אוטומטי. Raiders נושאים אותו."
    },
    "ds-arms-sa58-762x51-assault-rifle": {
      "summary": "FAL אמריקאי ב-7.62x51: חזק אבל עם רתע וארגונומיה מהגרועים בקטגוריה."
    },
    "as-val-9x39-special-assault-rifle": {
      "summary": "הנשק השקט הקלאסי: 900 כדורים לדקה של 9x39. SP-6 (חדירה 48) נמכרת אצל סוחר, ו-BP (חדירה 54) משלל מפילה גם Raiders.",
      "pros": [
        "משתיק מובנה: ה-AI מתקשה לאתר אותך",
        "SP-6 נמכרת אצל סוחר ו-BP משלל חודרת גם Class 5"
      ],
      "cons": [
        "הכדור איטי ונופל מהר: לא לטווח ארוך"
      ]
    },
    "as-val-mod4-9x39-special-assault-rifle": {
      "summary": "VAL משופר עם הרתע הבסיסי הנמוך ביותר בקטגוריה. חסום בפליי, Glukhar נושא אותו."
    },
    "sr-3m-9x39-compact-assault-rifle": {
      "summary": "קומפקטי ב-9x39: אותה עוצמה של VAL בגוף קצר. חסום בפליי."
    },
    "kbp-9a-91-9x39-compact-assault-rifle": {
      "summary": "9x39 זול וקומפקטי: הדרך הזולה לתחמושת BP."
    },
    "kbp-vsk-94-9x39-rifle": {
      "summary": "9x39 עם קת: זול ומדויק יותר מה-9A-91."
    },
    "toz-simonov-sks-762x39-carbine": {
      "summary": "חצי-אוטומטי זול ב-7.62x39: נשק התחלה טוב."
    },
    "molot-arms-simonov-op-sks-762x39-carbine": {
      "summary": "SKS אזרחי: חצי-אוטומטי זול לתחילת הדרך."
    },
    "tokarev-svt-40-762x54r-rifle": {
      "summary": "רובה מלחמת העולם השנייה ב-7.62x54R: חזק אבל ארגונומיה גרועה."
    },
    "tokarev-avt-40-762x54r-automatic-rifle": {
      "summary": "SVT עם ירי אוטומטי: 7.62x54R אוטומטי, קשה מאוד לשליטה."
    },
    "hk-mp7a2-46x30-submachine-gun": {
      "summary": "תת-המקלע הכי טוב נגד שריון: AP SX (חדירה 53) עובר Class 5, רתע נמוך מאוד ו-950 כדורים לדקה.",
      "pros": [
        "AP SX היא תחמושת התת-מקלע היחידה שמתמודדת עם Class 5"
      ],
      "cons": [
        "נזק לכדור נמוך: צריך הרבה פגיעות",
        "AP SX רק בקראפט או משלל"
      ]
    },
    "hk-mp7a1-46x30-submachine-gun": {
      "summary": "MP7 המקורי: אותו 4.6x30 החודר, רתע נמוך מאוד.",
      "pros": [
        "AP SX היא תחמושת התת-מקלע היחידה שמתמודדת עם Class 5"
      ],
      "cons": [
        "נזק לכדור נמוך: צריך הרבה פגיעות"
      ]
    },
    "tdi-kriss-vector-gen2-9x19-submachine-gun": {
      "summary": "קצב אש מטורף ורתע אנכי נמוך מאוד. התחמושת (PBP, חדירה 39) חלשה מול Class 5-6."
    },
    "tdi-kriss-vector-gen2-45-acp-submachine-gun": {
      "summary": "Vector ב-.45: 1100 כדורים לדקה עם נזק גבוה. AP של .45 (חדירה 38) מוגבלת מול שריון כבד."
    },
    "sig-mpx-9x19-submachine-gun": {
      "summary": "תת-מקלע 9x19 נוח מאוד לשליטה, עם הרבה חלקים. עם PBP הוא בחירה טובה לסוף-משחק."
    },
    "hk-mp5-9x19-submachine-gun-navy-3-round-burst": {
      "summary": "MP5 הקלאסי: יציב ומדויק, 9x19."
    },
    "fn-p90-57x28-submachine-gun": {
      "summary": "50 כדורים במחסנית ורתע נמוך. SS190 (חדירה 37) חלשה מול שריון כבד.",
      "pros": [
        "מחסנית של 50 כדורים בלי מחסנית תוף"
      ]
    },
    "fn-p90-57x28-submachine-gun-scourge": {
      "summary": "גרסת Scourge של P90 (2026). חסומה בפליי."
    },
    "hk-ump-45-acp-submachine-gun": {
      "summary": "תת-מקלע .45 זול ומומלץ בתקציב: נזק גבוה, קצב אש איטי ונוח."
    },
    "sr-2m-veresk-9x21-submachine-gun": {
      "summary": "9x21 רוסי: 7N42 (חדירה 38) והרבה נזק לכדור."
    },
    "pp-19-01-vityaz-9x19-submachine-gun": {
      "summary": "תת-מקלע רוסי זול וזמין מוקדם. נשק תקציבי טוב."
    },
    "soyuz-tm-stm-9-gen2-9x19-carbine": {
      "summary": "קרבין 9x19 בגוף AR: רתע נמוך מאוד בבילד."
    },
    "saiga-9-9x19-carbine": {
      "summary": "קרבין 9x19 חצי-אוטומטי. רק ירי בודד."
    },
    "bt-mp9-9x19-submachine-gun": {
      "summary": "MP9: קומפקטי מאוד וזריז, 9x19."
    },
    "bt-mp9-n-9x19-submachine-gun": {
      "summary": "MP9-N: קומפקטי וזריז, 9x19."
    },
    "iwi-uzi-pro-smg-9x19-submachine-gun": {
      "summary": "UZI PRO: קומפקטי וזריז ב-9x19."
    },
    "ppsh-41-762x25-submachine-gun": {
      "summary": "PPSh-41: קצב אש של 1000 כדורים לדקה ב-7.62x25, אבל ארגונומיה גרועה."
    },
    "saiga-12k-12ga-automatic-shotgun": {
      "summary": "שוטגאן אוטומטי: 450 כדורים לדקה של כדוריות. מחסל כל דבר בטווח 15 מטר. Tagilla נושא אותו."
    },
    "mps-auto-assault-12-gen-2-12ga-automatic-shotgun": {
      "summary": "AA-12: שוטגאן אוטומטי עם רתע נמוך בהרבה מ-Saiga, ולא נתקע."
    },
    "mps-auto-assault-12-gen-1-12ga-automatic-shotgun": {
      "summary": "AA-12 דור ראשון: אוטומטי, פחות חלקים מהדור השני."
    },
    "saiga-12k-12ga-automatic-shotgun-redline": {
      "summary": "Saiga-12K אוטומטי בגרסת Redline. חסום בפליי."
    },
    "remington-model-870-12ga-pump-action-shotgun": {
      "summary": "שוטגאן משאבה זול עם הרבה חלקים. מצוין לתחילת הדרך ב-Factory."
    },
    "mp-155-12ga-semi-automatic-shotgun": {
      "summary": "שוטגאן חצי-אוטומטי זול ואמין."
    },
    "mp-153-12ga-semi-automatic-shotgun": {
      "summary": "שוטגאן חצי-אוטומטי זול עם מחסנית ארוכה."
    },
    "mossberg-590a1-12ga-pump-action-shotgun": {
      "summary": "שוטגאן משאבה עם ארגונומיה טובה."
    },
    "benelli-m3-super-90-12ga-dual-mode-shotgun": {
      "summary": "שוטגאן דו-מצבי (משאבה או חצי-אוטומטי)."
    },
    "toz-ks-23m-23x75mm-pump-action-shotgun": {
      "summary": "23 מ\"מ: נזק עצום לכדור אבל תחמושת נדירה וחסום בפליי. Kollontay נושא אותו."
    },
    "knights-armament-company-sr-25-762x51-marksman-rifle": {
      "summary": "ה-DMR הסטנדרטי: 7.62x51 חצי-אוטומטי, הרבה חלקים, ו-M61 או M80A1 מפילות כמעט הכל. קיבל שיפור רתע ב-1.0.4.5."
    },
    "knights-armament-company-sr-25-762x51-marksman-rifle-taupe": {
      "summary": "SR-25 בצבע Taupe: אותו DMR מצוין."
    },
    "remington-r11-rsass-762x51-marksman-rifle": {
      "summary": "RSASS: DMR קומפקטי ומדויק ב-7.62x51, אהוב על הקהילה כבר שנים."
    },
    "hk-g28-762x51-marksman-rifle": {
      "summary": "G28: DMR גרמני מדויק ויציב ב-7.62x51."
    },
    "svds-762x54r-sniper-rifle": {
      "summary": "SVDS: חצי-אוטומטי ב-7.62x54R. BT (חדירה 55) מקראפט עובדת טוב, ו-BS (חדירה 70) משלל עוברת כל שריון.",
      "pros": [
        "7.62x54R: BT מקראפט, ו-BS משלל עוברת כל שריון"
      ]
    },
    "springfield-armory-m1a-762x51-rifle": {
      "summary": "M1A: 7.62x51 חצי-אוטומטי, זול יחסית. ארגונומיה בסיסית נמוכה."
    },
    "kel-tec-rfb-762x51-rifle": {
      "summary": "בולפאפ 7.62x51 עם ארגונומיה בסיסית 80: קל לשלוט בו."
    },
    "vss-vintorez-9x39-special-sniper-rifle": {
      "summary": "גרסת הצלפים של ה-VAL: שקט לגמרי, 9x39 (SP-6 מסוחר, BP משלל). מושלם לטווח בינוני. חסום בפליי."
    },
    "tkpd-93x64-carbine": {
      "summary": "9.3x64 חדש מ-1.0: נזק ענק לכדור (FMJ נמכרת, 7N33 החודרת משלל) אבל רתע עצום. חסום בפליי, Shturman ו-Zryachiy נושאים אותו."
    },
    "sword-international-mk-18-338-lm-marksman-rifle": {
      "summary": ".338 חצי-אוטומטי: FMJ (נזק 122) נמכרת, AP (חדירה 79) משלל עוברת כל שריון. יקר, כבד ורתע ענק."
    },
    "theakguy-ak-50-50-bmg-anti-materiel-rifle": {
      "summary": ".50 BMG: מפיל כל דבר אבל רתע עצום, כבד וחסום בפליי."
    },
    "lobaev-arms-dvl-10-762x51-bolt-action-sniper-rifle": {
      "summary": "רובה הבריח עם הרתע הבסיסי הנמוך ביותר ומשתיק מובנה. M61 מפילה בירייה לראש או בשתיים לגוף."
    },
    "remington-model-700-762x51-bolt-action-sniper-rifle": {
      "summary": "M700: רובה בריח 7.62x51 עם המון חלקים. זול להתחלה ומשתפר מאוד בבילד."
    },
    "orsis-t-5000m-762x51-bolt-action-sniper-rifle": {
      "summary": "T-5000M: רובה בריח מדויק מאוד ב-7.62x51."
    },
    "accuracy-international-axmc-338-lm-bolt-action-sniper-rifle": {
      "summary": ".338 Lapua: ירייה אחת לגוף מפילה כמעט כל AI. FMJ (נזק 122) נמכרת, ו-AP (חדירה 79) משלל עוברת כל שריון. יקר וכבד."
    },
    "sv-98-762x54r-bolt-action-sniper-rifle": {
      "summary": "SV-98: רובה בריח רוסי ב-7.62x54R (BT מקראפט, BS משלל)."
    },
    "mosin-762x54r-bolt-action-rifle-sniper": {
      "summary": "המוסין: זול מאוד וחזק, נשק תקציבי קלאסי לטווח ארוך."
    },
    "mosin-762x54r-bolt-action-rifle-infantry": {
      "summary": "מוסין חי\"ר: זול וחזק, בלי כוונת טלסקופית בסיסית."
    },
    "sako-trg-m10-338-lm-bolt-action-sniper-rifle": {
      "summary": "TRG M10 ב-.338: עוצמה ענקית, חסום בפליי."
    },
    "marlin-mxlr-308-me-lever-action-rifle": {
      "summary": "רובה מנוף (lever-action) עם .308 ME: מהיר יותר בין יריות מבריח."
    },
    "rpk-16-545x39-light-machine-gun": {
      "summary": "RPK-16: מקלע 5.45 קל ונוח עם רתע נמוך יחסית ומחסניות תוף. Killa ו-Tagilla נושאים אותו."
    },
    "kalashnikov-pkm-762x54r-machine-gun": {
      "summary": "PKM: מקלע 7.62x54R עם רצועות של 100 (BT מקראפט, BS משלל). מוחק קבוצות AI.",
      "cons": [
        "מחיר הנשק בפליי חריג מאוד"
      ]
    },
    "kalashnikov-pkp-762x54r-infantry-machine-gun": {
      "summary": "PKP: גרסה מודרנית של PKM. חסום בפליי, Kaban נושא אותו."
    },
    "us-ordnance-m60e6-762x51-light-machine-gun": {
      "summary": "M60E6: מקלע 7.62x51 עם קצב אש 550 נוח לשליטה."
    },
    "us-ordnance-m60e6-762x51-light-machine-gun-fde": {
      "summary": "M60E6 בצבע FDE: אותם נתונים."
    },
    "us-ordnance-m60e4-762x51-light-machine-gun": {
      "summary": "Mk 43 Mod 1: מקלע 7.62x51 קומפקטי."
    },
    "degtyarev-rpd-762x39-machine-gun": {
      "summary": "RPD: מקלע 7.62x39 עם תוף של 100 וקצב 700."
    },
    "degtyarev-rpdn-762x39-machine-gun": {
      "summary": "RPDN: RPD עם מסילה. חסום בפליי."
    },
    "glock-18c-9x19-machine-pistol": {
      "summary": "אקדח אוטומטי של 1200 כדורים לדקה: הכי קרוב לתת-מקלע באקדח. עם PBP ומחסנית ארוכה הוא גיבוי מצוין."
    },
    "fn-five-seven-mk2-57x28-pistol": {
      "summary": "FN Five-seveN: SS190 (חדירה 37) הופכת אותו לאקדח החודר ביותר בשימוש נפוץ, עם 20 כדורים במחסנית."
    },
    "fn-five-seven-mk2-57x28-pistol-fde": {
      "summary": "Five-seveN בצבע FDE: אותם נתונים."
    },
    "magnum-research-desert-eagle-l6-50-ae-pistol": {
      "summary": "Desert Eagle ב-.50 AE: נזק ענק לכדור. FMJ (חדירה 40) נמכרת, FMJ B (חדירה 57) משלל. רתע חזק."
    },
    "magnum-research-desert-eagle-mk-xix-50-ae-pistol": {
      "summary": "Desert Eagle Mk XIX: .50 AE עם נזק ענק לכדור."
    },
    "serdyukov-sr-1mp-gyurza-9x21-pistol": {
      "summary": "Gyurza: 9x21 עם 7N42 (חדירה 38). אקדח רוסי חזק."
    },
    "stechkin-aps-9x18pm-machine-pistol": {
      "summary": "APS: אקדח אוטומטי זול ב-9x18."
    },
    "stechkin-apb-9x18pm-silenced-machine-pistol": {
      "summary": "APB: אקדח אוטומטי עם משתיק, 9x18."
    },
    "glock-17-9x19-pistol": {
      "summary": "Glock 17: אקדח 9x19 אמין עם הרבה חלקים."
    },
    "glock-19x-9x19-pistol": {
      "summary": "Glock 19X: גרסה קומפקטית של Glock."
    }
  },
  "sources": [
    "tarkov.dev (נתוני משחק ומחירי PVE)",
    "Insider Gaming: עדכון 1.1.5 (Lighthouse)",
    "Insider Gaming: שינויי המטא ב-1.0.4.5",
    "patched.gg: ארכיון פאצ'ים 2026",
    "allthings.how: עדכון 1.1.0",
    "Shacknews: Icebreaker",
    "games.gg: טבלת דירוג נשקים"
  ]
};
