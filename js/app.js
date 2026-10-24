/**
 * VIENNAVARS - Open Research Data Portal
 * Visualization and Interpretation of the early medieval fEmale avar populatioN
 * through archaeothaNAthology from Vienna/Austria (csokorgasse-buRialS)
 */

// Embedded fallback dataset in case fetch fails in strict file:// protocol
const EMBEDDED_GRAVES = [
  {
    "grave_id": "Grab 315",
    "individual_id": "CSO-315-A",
    "sex": "weiblich",
    "sex_en": "female",
    "age_class": "Adultus",
    "age_years": "25–35 Jahre",
    "dating": "Mittelawarenzeit (ca. 650–700 n. Chr.)",
    "dating_en": "Middle Avar Period (c. 650–700 AD)",
    "burial_type": "Holzsarg (Kammergrab)",
    "burial_type_en": "Wooden coffin (Chamber burial)",
    "orientation": "W-O (West-Ost)",
    "depth_m": 1.85,
    "grave_goods": [
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Paar vergoldete Bronze-Ohrringe mit Polyeder-Anhängern", "material": "Bronze vergoldet" },
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Perlenkette aus 42 bunten Glas- und Melonenkernperlen", "material": "Glas, Paste" },
      { "category": "Handwerk / Textil", "category_en": "Craft / Textile", "name": "Zweikonischer Spinnwirtel aus gebranntem Ton", "material": "Keramik" },
      { "category": "Werkzeug", "category_en": "Tools", "name": "Eisernes Messer mit organischen Griffresten", "material": "Eisen, Holz" },
      { "category": "Gefäße", "category_en": "Pottery", "name": "Grautoniges Keramikgefäß mit Wellenbandverzierung", "material": "Ton" },
      { "category": "Nahrungsbeigabe", "category_en": "Food offering", "name": "Schaf-/Ziegenrippen im Fußbereich", "material": "Tierknochen" }
    ],
    "taphonomy": {
      "preservation": "Sehr gut",
      "empty_space_decay": true,
      "labile_joints": "Labile Gelenke (Halswirbel, Mittelfußknochen) weitgehend im anatomischen Verband",
      "persistent_joints": "Beckenschaufeln und Sakroiliakagelenke stabil in Originallage",
      "wall_effect": "Ausgeprägter Wandeffekt an beiden Humeri und Femora (Sargbretter)",
      "secondary_disturbance": "Keine Beraubungsspuren, ungestörte Primärgrablege",
      "archaeothanatology_summary": "Eindeutige Zerfallsindikatoren eines offenen Hohlraums (Holzsarg) mit seitlichem Wandeffekt und Erhaltung labiler Gelenkstrukturen vor Sedimenteinbruch."
    },
    "bioarchaeology": {
      "stature_cm": 159.5,
      "cranial_index": "Mesokran",
      "pathologies": ["Schmelzhypoplasien (Stressmarker in der Kindheit)", "Leichte Spondylosis deformans der Lendenwirbel"],
      "activity_markers": "Ausgeprägte Muskelansatzmarken an den Claviculae und Pectoralis major (Spinn- und Webtätigkeit)"
    },
    "coordinates": { "lat": 48.15682, "lng": 16.47125 },
    "has_3d_model": true,
    "featured": true,
    "phaidra_asset": "https://phaidra.univie.ac.at/detail/o:2091644"
  },
  {
    "grave_id": "Grab 244",
    "individual_id": "CSO-244-A",
    "sex": "weiblich",
    "sex_en": "female",
    "age_class": "Maturus",
    "age_years": "40–50 Jahre",
    "dating": "Spätawarenzeit I (ca. 700–750 n. Chr.)",
    "dating_en": "Late Avar Period I (c. 700–750 AD)",
    "burial_type": "Holzverschlag mit Steineinfassung",
    "burial_type_en": "Wooden lining with stone border",
    "orientation": "NW-SO",
    "depth_m": 1.60,
    "grave_goods": [
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Silberne Ohrringe mit Sternanhängern", "material": "Silber" },
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Kette aus Karneol- und Bergkristallperlen", "material": "Halbedelstein" },
      { "category": "Geräte", "category_en": "Tools", "name": "Bronzene Nähnadel in Knochenfutteral", "material": "Bronze, Knochen" },
      { "category": "Gefäße", "category_en": "Pottery", "name": "Polierte Henkelkanne (eingedreht)", "material": "Keramik" }
    ],
    "taphonomy": {
      "preservation": "Gut",
      "empty_space_decay": true,
      "labile_joints": "Dislozierte Fingerphalangen infolge Absinkens in Weichteilhohlraum",
      "persistent_joints": "Femur-Tibia-Gelenke in situ",
      "wall_effect": "Kompression der Schulterpartie durch enge Holzbegrenzung",
      "secondary_disturbance": "Partielle Verlagerung des Schädels durch Tiergänge",
      "archaeothanatology_summary": "Dekompression im Hohlraum; leichte Bioperturbation am Schädeldach durch Nageraktivität."
    },
    "bioarchaeology": {
      "stature_cm": 156.0,
      "cranial_index": "Dolichokran",
      "pathologies": ["Fortgeschrittene Attrition der Molaren", "Arthrose im rechten Ellenbogengelenk"],
      "activity_markers": "Robuste Unterarmmuskulatur, repetitive manuelle Belastung"
    },
    "coordinates": { "lat": 48.15695, "lng": 16.47140 },
    "has_3d_model": true,
    "featured": true,
    "phaidra_asset": "https://phaidra.univie.ac.at/detail/o:2091644"
  },
  {
    "grave_id": "Grab 182",
    "individual_id": "CSO-182-A",
    "sex": "weiblich",
    "sex_en": "female",
    "age_class": "Juvenis",
    "age_years": "16–19 Jahre",
    "dating": "Frühawarenzeit II (ca. 620–660 n. Chr.)",
    "dating_en": "Early Avar Period II (c. 620–660 AD)",
    "burial_type": "Einfaches Erdgrab mit organischer Abdeckung",
    "burial_type_en": "Simple pit burial with organic cover",
    "orientation": "W-O",
    "depth_m": 1.20,
    "grave_goods": [
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Einfache Bronzedraht-Ohrringe", "material": "Bronze" },
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Kleine Kette aus 12 opak-gelben Glasperlen", "material": "Glas" },
      { "category": "Werkzeug", "category_en": "Tools", "name": "Kleines Eisenmesser am Becken", "material": "Eisen" }
    ],
    "taphonomy": {
      "preservation": "Mittelmäßig bis gut",
      "empty_space_decay": false,
      "labile_joints": "Kein Ausweichen labiler Gelenke; rasche Sedimenteinbettung",
      "persistent_joints": "Vollständig in anatomischer Lage fixiert",
      "wall_effect": "Kein Wandeffekt nachweisbar",
      "secondary_disturbance": "Intakt",
      "archaeothanatology_summary": "Zerfall im verfüllten Raum (Sedimentverfüllung) ohne Anzeichen einer stabilen Sargkonstruktion."
    },
    "bioarchaeology": {
      "stature_cm": 154.2,
      "cranial_index": "Mesokran",
      "pathologies": ["Cribra orbitalia Grad 1 (Anämie- / Mangelindikator)", "Geringer Zahnsteinbefall"],
      "activity_markers": "Geringe degenerative Veränderungen, subadulte Skelettreifung"
    },
    "coordinates": { "lat": 48.15665, "lng": 16.47110 },
    "has_3d_model": false,
    "featured": false,
    "phaidra_asset": "https://phaidra.univie.ac.at/detail/o:2091644"
  },
  {
    "grave_id": "Grab 412",
    "individual_id": "CSO-412-A",
    "sex": "weiblich",
    "sex_en": "female",
    "age_class": "Senilis",
    "age_years": "60+ Jahre",
    "dating": "Spätawarenzeit II (ca. 750–800 n. Chr.)",
    "dating_en": "Late Avar Period II (c. 750–800 AD)",
    "burial_type": "Gezimmerter Holzsarg mit Eisennägeln",
    "burial_type_en": "Carpentered wooden coffin with iron nails",
    "orientation": "W-O",
    "depth_m": 1.95,
    "grave_goods": [
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Gegossene Bronzeohrringe mit Granulationsimitation", "material": "Bronze" },
      { "category": "Geräte", "category_en": "Tools", "name": "Knochenkamm (dreilagig mit Bronzenieten)", "material": "Geweih, Bronze" },
      { "category": "Handwerk / Textil", "category_en": "Craft / Textile", "name": "Dekorierter Spinnwirtel aus Serpentinit", "material": "Serpentinit" },
      { "category": "Gefäße", "category_en": "Pottery", "name": "Gelbtoniges Feinkeramikgefäß", "material": "Keramik" }
    ],
    "taphonomy": {
      "preservation": "Sehr gut",
      "empty_space_decay": true,
      "labile_joints": "Rippenkorb nach innen kollabiert (vollständiger Hohlraumzerfall)",
      "persistent_joints": "Beckenknochen nach lateral abgeklappt ('open pelvic basin')",
      "wall_effect": "Eindeutiger Wandeffekt an Armen und Füßen",
      "secondary_disturbance": "Ungestört",
      "archaeothanatology_summary": "Klassischer Befund eines geschlossenen Sargraumes: Aufklappen der Beckenflügel und laterales Absinken der Langknochen bis zur Begrenzung."
    },
    "bioarchaeology": {
      "stature_cm": 151.8,
      "cranial_index": "Brachykran",
      "pathologies": ["Intravitaler Verlust fast aller Molaren mit Alveolarkammresorption", "Schwere Osteoporose", "Heilungsspuren einer distalen Radiusfraktur"],
      "activity_markers": "Ausgeprägte degenerative Wirbelsäulenveränderungen (Osteophyten L3-L5)"
    },
    "coordinates": { "lat": 48.15670, "lng": 16.47155 },
    "has_3d_model": true,
    "featured": true,
    "phaidra_asset": "https://phaidra.univie.ac.at/detail/o:2091644"
  },
  {
    "grave_id": "Grab 508",
    "individual_id": "CSO-508-A",
    "sex": "weiblich",
    "sex_en": "female",
    "age_class": "Adultus",
    "age_years": "20–30 Jahre",
    "dating": "Mittelawarenzeit (ca. 660–710 n. Chr.)",
    "dating_en": "Middle Avar Period (c. 660–710 AD)",
    "burial_type": "Holzsarg",
    "burial_type_en": "Wooden coffin",
    "orientation": "W-O",
    "depth_m": 1.75,
    "grave_goods": [
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Feine Perlenstickerei am Halsausschnitt", "material": "Glasperlen" },
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Silberne Schleifenohrringe", "material": "Silber" },
      { "category": "Handwerk / Textil", "category_en": "Craft / Textile", "name": "Spinnwirtel aus grauem Ton", "material": "Ton" },
      { "category": "Nahrungsbeigabe", "category_en": "Food offering", "name": "Geflügelknochen (Huhn)", "material": "Tierknochen" }
    ],
    "taphonomy": {
      "preservation": "Hervorragend",
      "empty_space_decay": true,
      "labile_joints": "Cervicalwirbel in anatomischer Reihung erhalten",
      "persistent_joints": "Knie- und Sprunggelenke exakt in situ",
      "wall_effect": "Strikte parallele Lage der Beine durch Sargbreite diktiert",
      "secondary_disturbance": "Keine Beraubung",
      "archaeothanatology_summary": "Intakte Primärbestattung im Holzsarg mit erhaltener Holzmaserung als Bodenabdruck."
    },
    "bioarchaeology": {
      "stature_cm": 162.0,
      "cranial_index": "Mesokran",
      "pathologies": ["Keine pathologischen Veränderungen an den Extremitäten", "Geringe Karies"],
      "activity_markers": "Symmetrische Muskelmarken der oberen Extremitäten"
    },
    "coordinates": { "lat": 48.15688, "lng": 16.47162 },
    "has_3d_model": false,
    "featured": false,
    "phaidra_asset": "https://phaidra.univie.ac.at/detail/o:2091644"
  },
  {
    "grave_id": "Grab 87",
    "individual_id": "CSO-087-A",
    "sex": "weiblich",
    "sex_en": "female",
    "age_class": "Infans II",
    "age_years": "8–11 Jahre",
    "dating": "Mittel-/Spätawarenzeit (ca. 680–730 n. Chr.)",
    "dating_en": "Middle/Late Avar Period (c. 680–730 AD)",
    "burial_type": "Kleine Holzkiste",
    "burial_type_en": "Small wooden chest",
    "orientation": "W-O",
    "depth_m": 1.15,
    "grave_goods": [
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Kette aus kleinen blauen Millefioriperlen", "material": "Glas" },
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Kleine Bronzeglöckchen (Amulettbeigabe)", "material": "Bronze" },
      { "category": "Gefäße", "category_en": "Pottery", "name": "Miniaturtongefäß", "material": "Keramik" }
    ],
    "taphonomy": {
      "preservation": "Fragil (Kinderskelett)",
      "empty_space_decay": true,
      "labile_joints": "Teilweiser Zerfall unvollständig verknöcherter Epiphysen",
      "persistent_joints": "Rumpfskelett in Strecklage",
      "wall_effect": "Kleine Grabgrubendimensionierung",
      "secondary_disturbance": "Ungestört",
      "archaeothanatology_summary": "Zerfall in kleiner Kinderholzkiste mit Dislokation juveniler Zahnkeime nach Zersetzung der Alveolarwand."
    },
    "bioarchaeology": {
      "stature_cm": 128.0,
      "cranial_index": "Indeterminiert",
      "pathologies": ["Schmelzhypoplasien am ersten permanenten Molar", "Cribra orbitalia"],
      "activity_markers": "Kindliches Entwicklungsmuster ohne degenerative Veränderungen"
    },
    "coordinates": { "lat": 48.15658, "lng": 16.47132 },
    "has_3d_model": false,
    "featured": false,
    "phaidra_asset": "https://phaidra.univie.ac.at/detail/o:2091644"
  },
  {
    "grave_id": "Grab 619",
    "individual_id": "CSO-619-A",
    "sex": "weiblich",
    "sex_en": "female",
    "age_class": "Maturus",
    "age_years": "45–55 Jahre",
    "dating": "Spätawarenzeit II (ca. 760–800 n. Chr.)",
    "dating_en": "Late Avar Period II (c. 760–800 AD)",
    "burial_type": "Aufwendige Grabkammer mit Balkenkonstruktion",
    "burial_type_en": "Elaborate chamber grave with timber beams",
    "orientation": "W-O",
    "depth_m": 2.10,
    "grave_goods": [
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Paar massive Goldohrringe mit Filigrandekor", "material": "Gold" },
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Mehrreihige Halskette mit Bernstein- und Amethystperlen", "material": "Bernstein, Amethyst" },
      { "category": "Handwerk / Textil", "category_en": "Craft / Textile", "name": "Spinnwirtel mit feiner Ritzverzierung", "material": "Mergel" },
      { "category": "Geräte", "category_en": "Tools", "name": "Eiserne Schere und Klappmesser", "material": "Eisen" },
      { "category": "Nahrungsbeigabe", "category_en": "Food offering", "name": "Rinderrippe und Keramikbecher", "material": "Knochen, Ton" }
    ],
    "taphonomy": {
      "preservation": "Hervorragend",
      "empty_space_decay": true,
      "labile_joints": "Vollständig artikulierte Fußwurzelknochen",
      "persistent_joints": "Beckenpartie exakt im Verband",
      "wall_effect": "Großzügige Grabkammer, kein direkter Wanddruck auf die Langknochen",
      "secondary_disturbance": "Versuchte antike Beraubung im Oberkörperbereich abgewehrt/abgebrochen",
      "archaeothanatology_summary": "Geräumige Holzkammer ermöglichte freie Verlagerung von Weichteilen und Schmuckelementen innerhalb der Kleidung."
    },
    "bioarchaeology": {
      "stature_cm": 164.5,
      "cranial_index": "Dolichokran",
      "pathologies": ["Parodontitis an den Unterkieferzähnen", "Leichte Gonarthrose beidseits"],
      "activity_markers": "Geringe Abnützung der Wirbelkörper, Hinweis auf gehobenen sozialen Status"
    },
    "coordinates": { "lat": 48.15705, "lng": 16.47150 },
    "has_3d_model": true,
    "featured": true,
    "phaidra_asset": "https://phaidra.univie.ac.at/detail/o:2091644"
  },
  {
    "grave_id": "Grab 103",
    "individual_id": "CSO-103-A",
    "sex": "weiblich",
    "sex_en": "female",
    "age_class": "Adultus",
    "age_years": "22–28 Jahre",
    "dating": "Früh-/Mittelawarenzeit (ca. 630–670 n. Chr.)",
    "dating_en": "Early/Middle Avar Period (c. 630–670 AD)",
    "burial_type": "Holzsarg",
    "burial_type_en": "Wooden coffin",
    "orientation": "W-O",
    "depth_m": 1.70,
    "grave_goods": [
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Silberne Ohrringe mit Glasperlenanhänger", "material": "Silber, Glas" },
      { "category": "Handwerk / Textil", "category_en": "Craft / Textile", "name": "Spinnwirtel aus gebranntem Ton", "material": "Ton" },
      { "category": "Werkzeug", "category_en": "Tools", "name": "Eisenmesser in Lederscheide", "material": "Eisen, Leder" }
    ],
    "taphonomy": {
      "preservation": "Sehr gut",
      "empty_space_decay": true,
      "labile_joints": "Handgelenke auf dem Becken liegend fixiert",
      "persistent_joints": "Artikulation vollständig intakt",
      "wall_effect": "Sargbretter hinterließen dunkle Verfärbungslinien im Löss",
      "secondary_disturbance": "Keine Beraubung",
      "archaeothanatology_summary": "Ruhelage im Holzkasten, Arme angewinkelt über dem Abdomen gebettet."
    },
    "bioarchaeology": {
      "stature_cm": 158.0,
      "cranial_index": "Mesokran",
      "pathologies": ["Keine degenerativen Skelettbefunde", "Schmelzhypoplasien an den Eckzähnen"],
      "activity_markers": "Symmetrisches Belastungsmuster"
    },
    "coordinates": { "lat": 48.15678, "lng": 16.47118 },
    "has_3d_model": false,
    "featured": false,
    "phaidra_asset": "https://phaidra.univie.ac.at/detail/o:2091644"
  },
  {
    "grave_id": "Grab 156",
    "individual_id": "CSO-156-A",
    "sex": "männlich (Referenz)",
    "sex_en": "male (reference)",
    "age_class": "Adultus",
    "age_years": "30–40 Jahre",
    "dating": "Mittelawarenzeit (ca. 670–720 n. Chr.)",
    "dating_en": "Middle Avar Period (c. 670–720 AD)",
    "burial_type": "Kriegergrab mit Pferdebeigabe",
    "burial_type_en": "Warrior burial with horse offering",
    "orientation": "W-O",
    "depth_m": 2.25,
    "grave_goods": [
      { "category": "Waffen", "category_en": "Weapons", "name": "Eisernes einschneidiges Schwert (Saxe)", "material": "Eisen" },
      { "category": "Tracht", "category_en": "Costume", "name": "Gegossene Gürtelgarnitur mit Greifendarstellung", "material": "Bronze vergoldet" },
      { "category": "Reitzubehör", "category_en": "Equestrian", "name": "Trense, Steigbügel und Sattelbeschläge", "material": "Eisen, Holz" }
    ],
    "taphonomy": {
      "preservation": "Sehr gut",
      "empty_space_decay": true,
      "labile_joints": "Schädel durch Kollaps des Kammerdachs leicht rotiert",
      "persistent_joints": "Extremitäten stabil",
      "wall_effect": "Pferdeskelett parallel in separater Grabnische deponiert",
      "secondary_disturbance": "Partielle antike Beraubung am Gürtelbereich",
      "archaeothanatology_summary": "Komplexe Grabanlage mit partieller Störung während der Zersetzungsphase."
    },
    "bioarchaeology": {
      "stature_cm": 173.2,
      "cranial_index": "Dolichokran",
      "pathologies": ["Geheilte Hiebverletzung am linken Scheitelbein", "Reiterfacette an beiden Oberschenkelhälsen"],
      "activity_markers": "Extrem ausgeprägte Linea aspera, typischer 'Horse-riding syndrome'-Befund"
    },
    "coordinates": { "lat": 48.15712, "lng": 16.47135 },
    "has_3d_model": true,
    "featured": false,
    "phaidra_asset": "https://phaidra.univie.ac.at/detail/o:2091644"
  },
  {
    "grave_id": "Grab 289",
    "individual_id": "CSO-289-A",
    "sex": "weiblich",
    "sex_en": "female",
    "age_class": "Maturus",
    "age_years": "35–45 Jahre",
    "dating": "Spätawarenzeit I (ca. 710–760 n. Chr.)",
    "dating_en": "Late Avar Period I (c. 710–760 AD)",
    "burial_type": "Holzsarg",
    "burial_type_en": "Wooden coffin",
    "orientation": "W-O",
    "depth_m": 1.65,
    "grave_goods": [
      { "category": "Schmuck / Tracht", "category_en": "Jewelry", "name": "Bronzeohrringe mit Traubenanhänger", "material": "Bronze" },
      { "category": "Handwerk / Textil", "category_en": "Craft / Textile", "name": "Spinnwirtel aus feinem Sandstein", "material": "Sandstein" },
      { "category": "Geräte", "category_en": "Tools", "name": "Eisenmesser und bronzene Pinzette", "material": "Eisen, Bronze" }
    ],
    "taphonomy": {
      "preservation": "Gut",
      "empty_space_decay": true,
      "labile_joints": "Fingerknochen auf dem Brustkorb liegend eingesunken",
      "persistent_joints": "Gelenke in situ",
      "wall_effect": "Nachweisbar",
      "secondary_disturbance": "Ungestört",
      "archaeothanatology_summary": "Zersetzung in luftgefülltem Hohlraum mit Absinken der Handknochen zwischen die Rippen nach Organauflösung."
    },
    "bioarchaeology": {
      "stature_cm": 157.4,
      "cranial_index": "Mesokran",
      "pathologies": ["Moderate Arthrose in den Fingerendgelenken (Heberden-Knoten)", "Zahnkaries an 3 Molaren"],
      "activity_markers": "Belastungsmuster korrespondiert mit intensiver Feinarbeit/Textilherstellung"
    },
    "coordinates": { "lat": 48.15685, "lng": 16.47105 },
    "has_3d_model": false,
    "featured": false,
    "phaidra_asset": "https://phaidra.univie.ac.at/detail/o:2091644"
  }
];

// Translations dictionary
const I18N = {
  de: {
    nav_overview: "Übersicht",
    nav_data: "Daten & PHAIDRA",
    nav_catalog: "Gräberkatalog",
    nav_map: "GIS-Karte",
    nav_method: "Archäothanatologie",
    nav_team: "Team & Partner",
    hero_tag: "Forschungsdaten-Portal • Open Science & FAIR Data",
    hero_title: "VIENNAVARS Forschungsdaten",
    hero_subtitle: "Visualization and Interpretation of the early medieval fEmale avar populatioN through archaeothaNAthology from Vienna/Austria (csokorgasse-buRialS)",
    hero_german: "Visualisierung und Interpretation weiblicher Lebenswelten in der Awarenzeit (7.–8. Jh. n. Chr.) am Beispiel der Population des Gräberfeldes Csokorgasse, Wien 11",
    btn_explore: "Gräberkatalog erkunden",
    btn_phaidra_archive: "Langzeitarchivierung (PHAIDRA)",
    btn_vias_project: "Projektseite (VIAS / Uni Wien)",
    btn_github_org: "GitHub Organisation",
    stat_graves_total: "Gräber Gesamt",
    stat_chronology: "Chronologie",
    stat_methods: "Multi-Proxy Analyse",
    stat_license: "FAIR Data / Open Access",
    sec_archive_tag: "FAIR Data & Langzeitarchivierung",
    sec_archive_title: "Dauerhafte Bewahrung & Dateninfrastruktur",
    sec_archive_desc: "Alle Forschungsdaten, osteologischen Befundkataloge, 3D-Rekonstruktionen und Metadaten des Projekts VIENNAVARS sind über das Repositorium PHAIDRA der Universität Wien dauerhaft gesichert und frei zugänglich.",
    sec_catalog_tag: "Interaktiver Daten-Explorer",
    sec_catalog_title: "Katalog der Bestattungen & Befunde",
    sec_catalog_desc: "Durchsuchen und filtern Sie die Grabbefunde des Gräberfeldes Wien 11–Csokorgasse nach anthropologischen Merkmalen, Beigaben und archäothanatologischen Kriterien.",
    search_placeholder: "Suche nach Grabnummer, Beigabe, Pathologie oder Befund...",
    filter_all_sex: "Alle Geschlechter",
    filter_female: "Nur Weiblich",
    filter_male: "Nur Männlich (Referenz)",
    filter_all_age: "Alle Altersklassen",
    filter_3d_only: "Nur mit 3D-Modell",
    filter_empty_decay: "Nur Hohlraumzerfall",
    btn_reset_filter: "Filter zurücksetzen",
    btn_details: "Details & Archäothanatologie",
    btn_show_map: "Auf Karte zeigen",
    sec_map_tag: "Räumliche Verteilung",
    sec_map_title: "Topographie des Gräberfeldes Csokorgasse",
    sec_map_desc: "Interaktive Kartierung der Bestattungen im Areal Wien 11–Csokorgasse (Kaiserebersdorf) mit Grabkoordinaten und Belegungsdichte.",
    sec_method_tag: "Methodik & 3D-Visualisierung",
    sec_method_title: "Archäothanatologie & Digitale Rekonstruktion",
    sec_method_desc: "Rekonstruktion der ursprünglichen Grablege und Verwesungsprozesse im offenen Hohlraum (Holzsarg) im Vergleich zum verfüllten Erdgrab nach der Methodik von Henri Duday.",
    sec_team_tag: "Projektleitung & Kooperationen",
    sec_team_title: "Beteiligte Institutionen & Forscher*innen",
    sec_citation_tag: "Zitation & Open Access",
    sec_citation_title: "Forschungsdaten zitieren",
    btn_copy_citation: "Zitation kopieren",
    copied_msg: "In die Zwischenablage kopiert!"
  },
  en: {
    nav_overview: "Overview",
    nav_data: "Data & PHAIDRA",
    nav_catalog: "Burials Catalog",
    nav_map: "GIS Map",
    nav_method: "Archaeothanatology",
    nav_team: "Team & Partners",
    hero_tag: "Research Data Portal • Open Science & FAIR Data",
    hero_title: "VIENNAVARS Research Data",
    hero_subtitle: "Visualization and Interpretation of the early medieval fEmale avar populatioN through archaeothaNAthology from Vienna/Austria (csokorgasse-buRialS)",
    hero_german: "Visualization and Interpretation of female lifeworlds in the Avar Period (7th–8th c. AD) based on the population of the Csokorgasse cemetery, Vienna 11",
    btn_explore: "Explore Burials Catalog",
    btn_phaidra_archive: "Long-Term Archive (PHAIDRA)",
    btn_vias_project: "Project Page (VIAS / Uni Vienna)",
    btn_github_org: "GitHub Organization",
    stat_graves_total: "Total Graves",
    stat_chronology: "Chronology",
    stat_methods: "Multi-Proxy Analysis",
    stat_license: "FAIR Data / Open Access",
    sec_archive_tag: "FAIR Data & Digital Preservation",
    sec_archive_title: "Long-term Archiving & Data Infrastructure",
    sec_archive_desc: "All research datasets, osteological catalogs, 3D reconstructions, and metadata of the VIENNAVARS project are permanently preserved and openly accessible via PHAIDRA (University of Vienna).",
    sec_catalog_tag: "Interactive Data Explorer",
    sec_catalog_title: "Burial & Context Catalog",
    sec_catalog_desc: "Browse and filter the burials from Vienna 11–Csokorgasse by anthropological parameters, grave goods, and archaeothanatological observations.",
    search_placeholder: "Search by grave ID, artifact, pathology, or taphonomic note...",
    filter_all_sex: "All Sexes",
    filter_female: "Female Only",
    filter_male: "Male Only (Reference)",
    filter_all_age: "All Age Classes",
    filter_3d_only: "3D Model Only",
    filter_empty_decay: "Open Space Decay Only",
    btn_reset_filter: "Reset Filters",
    btn_details: "Details & Archaeothanatology",
    btn_show_map: "Show on Map",
    sec_map_tag: "Spatial Distribution",
    sec_map_title: "Topography of the Csokorgasse Cemetery",
    sec_map_desc: "Interactive spatial mapping of graves in Vienna 11–Csokorgasse (Kaiserebersdorf) with GIS coordinates and burial layout.",
    sec_method_tag: "Methodology & 3D Visualization",
    sec_method_title: "Archaeothanatology & Digital Reconstruction",
    sec_method_desc: "Reconstruction of original burial structures and taphonomic decay in void space (wooden coffin) vs. sediment fill following Henri Duday's methodology.",
    sec_team_tag: "Project Team & Cooperations",
    sec_team_title: "Participating Institutions & Researchers",
    sec_citation_tag: "Citation & Open Access",
    sec_citation_title: "Cite these Research Data",
    btn_copy_citation: "Copy Citation",
    copied_msg: "Copied to clipboard!"
  }
};

let currentLang = localStorage.getItem('viennavars_lang') || 'de';
let gravesData = EMBEDDED_GRAVES;
let filteredGraves = [...gravesData];
let cemeteryMap = null;
let mapMarkers = [];

// Initialize application on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
  initLanguage();
  await loadGravesData();
  initEventListeners();
  renderGraves(filteredGraves);
  initMap();
  updateStats();
});

// Load graves data from JSON file with fallback
async function loadGravesData() {
  try {
    const res = await fetch('data/graves.json');
    if (res.ok) {
      gravesData = await res.json();
      filteredGraves = [...gravesData];
    }
  } catch (err) {
    console.info("Using embedded dataset fallback.");
    gravesData = EMBEDDED_GRAVES;
    filteredGraves = [...gravesData];
  }
}

// Language Handling
function initLanguage() {
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'de' ? 'en' : 'de';
      localStorage.setItem('viennavars_lang', currentLang);
      applyLanguage();
    });
  }
  applyLanguage();
}

function applyLanguage() {
  const t = I18N[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput && t['search_placeholder']) {
    searchInput.placeholder = t['search_placeholder'];
  }

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.innerHTML = currentLang === 'de' ? '🌐 EN' : '🌐 DE';
  }

  renderGraves(filteredGraves);
}

// Render Graves Grid
function renderGraves(graves) {
  const grid = document.getElementById('graves-grid');
  const countEl = document.getElementById('visible-count');
  const totalEl = document.getElementById('total-count');

  if (countEl) countEl.textContent = graves.length;
  if (totalEl) totalEl.textContent = gravesData.length;

  if (!grid) return;

  if (graves.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">
          ${currentLang === 'de' ? 'Keine Gräber gefunden' : 'No burials found'}
        </p>
        <p style="font-size: 0.95rem;">
          ${currentLang === 'de' ? 'Bitte Suchbegriff oder Filter anpassen.' : 'Please adjust your search keywords or filters.'}
        </p>
      </div>
    `;
    return;
  }

  grid.innerHTML = graves.map(g => {
    const isFemale = g.sex === 'weiblich';
    const isMale = g.sex.includes('männlich');
    const badgeClass = isFemale ? 'female' : (isMale ? 'male' : 'subadult');
    const sexLabel = currentLang === 'de' ? g.sex : (g.sex_en || g.sex);
    const datingLabel = currentLang === 'de' ? g.dating : (g.dating_en || g.dating);
    const burialTypeLabel = currentLang === 'de' ? g.burial_type : (g.burial_type_en || g.burial_type);

    const goodsHtml = g.grave_goods.slice(0, 4).map(item => `
      <span class="good-tag" title="${item.material}">${item.name}</span>
    `).join('') + (g.grave_goods.length > 4 ? `<span class="good-tag" style="background:var(--color-gold-bg); font-weight:700;">+${g.grave_goods.length - 4}</span>` : '');

    return `
      <article class="grave-card ${g.featured ? 'featured' : ''}" data-grave-id="${g.grave_id}">
        <div class="grave-card-header">
          <h3 class="grave-id">${g.grave_id}</h3>
          <span class="grave-sex-badge ${badgeClass}">${sexLabel}</span>
          ${g.has_3d_model ? '<span class="code-pill" style="font-size:0.7rem; color:var(--color-accent); font-weight:700;">3D Mesh</span>' : ''}
        </div>

        <div class="grave-card-meta">
          <span class="meta-pill"><strong>Alter:</strong> ${g.age_class} (${g.age_years})</span>
          <span class="meta-pill"><strong>Tiefe:</strong> ${g.depth_m} m</span>
          <span class="meta-pill"><strong>Ausrichtung:</strong> ${g.orientation}</span>
        </div>

        <div class="grave-card-body">
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.4rem;">
            <strong>Konstruktion:</strong> ${burialTypeLabel}
          </p>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.4rem;">
            <strong>Datierung:</strong> ${datingLabel}
          </p>
          <div style="margin-top: 0.75rem;">
            <strong style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">
              ${currentLang === 'de' ? 'Beigaben' : 'Grave Goods'} (${g.grave_goods.length}):
            </strong>
            <div class="goods-tag-list">${goodsHtml}</div>
          </div>
        </div>

        <div class="grave-card-footer">
          <button class="btn-card-details" onclick="openGraveModal('${g.grave_id}')">
            ${currentLang === 'de' ? 'Details & Archäothanatologie' : 'Details & Archaeothanatology'}
          </button>
        </div>
      </article>
    `;
  }).join('');
}

// Filter and Search Logic
function filterGraves() {
  const query = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
  const sexFilter = document.getElementById('filter-sex')?.value || 'all';
  const ageFilter = document.getElementById('filter-age')?.value || 'all';
  const only3D = document.getElementById('filter-3d')?.checked || false;
  const onlyEmptySpace = document.getElementById('filter-empty-space')?.checked || false;

  filteredGraves = gravesData.filter(g => {
    // Search query match
    const searchCorpus = [
      g.grave_id,
      g.individual_id,
      g.sex,
      g.sex_en,
      g.age_class,
      g.dating,
      g.burial_type,
      g.taphonomy.archaeothanatology_summary,
      g.bioarchaeology.activity_markers,
      ...g.grave_goods.map(i => `${i.name} ${i.category} ${i.material}`),
      ...g.bioarchaeology.pathologies
    ].join(' ').toLowerCase();

    if (query && !searchCorpus.includes(query)) return false;

    // Sex Filter
    if (sexFilter === 'weiblich' && g.sex !== 'weiblich') return false;
    if (sexFilter === 'männlich' && !g.sex.includes('männlich')) return false;

    // Age Filter
    if (ageFilter !== 'all' && g.age_class !== ageFilter) return false;

    // 3D Filter
    if (only3D && !g.has_3d_model) return false;

    // Open Space Decay Filter
    if (onlyEmptySpace && !g.taphonomy.empty_space_decay) return false;

    return true;
  });

  renderGraves(filteredGraves);
  updateMapMarkers();
}

// Reset Filters
function resetFilters() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  const sexSel = document.getElementById('filter-sex');
  if (sexSel) sexSel.value = 'all';
  const ageSel = document.getElementById('filter-age');
  if (ageSel) ageSel.value = 'all';
  const filter3D = document.getElementById('filter-3d');
  if (filter3D) filter3D.checked = false;
  const filterEmpty = document.getElementById('filter-empty-space');
  if (filterEmpty) filterEmpty.checked = false;

  filteredGraves = [...gravesData];
  renderGraves(filteredGraves);
  updateMapMarkers();
}

// Modal Details Handler
window.openGraveModal = function(graveId) {
  const grave = gravesData.find(g => g.grave_id === graveId);
  if (!grave) return;

  const modal = document.getElementById('grave-modal');
  const modalContent = document.getElementById('modal-dynamic-content');
  if (!modal || !modalContent) return;

  const isDe = currentLang === 'de';

  modalContent.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
      <div>
        <h2 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-primary-dark);">${grave.grave_id} <span style="font-size: 1rem; font-family: var(--font-mono); color: var(--text-muted);">(${grave.individual_id})</span></h2>
        <p style="color: var(--color-accent); font-weight: 600;">${isDe ? grave.dating : grave.dating_en}</p>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <span class="code-pill">${grave.burial_type}</span>
        <a href="${grave.phaidra_asset}" target="_blank" rel="noopener" class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
          🏛️ PHAIDRA o:2091644
        </a>
      </div>
    </div>

    <!-- Taphonomy & Archaeothanatology (Core Focus) -->
    <div style="background: var(--bg-card-alt); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; border: 1px solid var(--border-light);">
      <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--color-primary-dark); margin-bottom: 0.5rem;">
        🔬 ${isDe ? 'Archäothanatologischer Befund (Taphonomie)' : 'Archaeothanatological Assessment (Taphonomy)'}
      </h4>
      <p style="font-size: 0.95rem; margin-bottom: 1rem; line-height: 1.5; color: var(--text-main);">
        <em>${grave.taphonomy.archaeothanatology_summary}</em>
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.88rem;">
        <div>
          <strong>${isDe ? 'Zerfallsraum:' : 'Decay Environment:'}</strong> 
          <span style="color: ${grave.taphonomy.empty_space_decay ? 'var(--color-accent)' : 'inherit'}; font-weight: 600;">
            ${grave.taphonomy.empty_space_decay ? (isDe ? 'Offener Hohlraum (Holzsarg)' : 'Void space (wooden coffin)') : (isDe ? 'Verfüllter Raum' : 'Sediment filled')}
          </span>
        </div>
        <div>
          <strong>${isDe ? 'Erhaltungszustand:' : 'Preservation:'}</strong> ${grave.taphonomy.preservation}
        </div>
        <div>
          <strong>${isDe ? 'Labile Gelenke:' : 'Labile Joints:'}</strong> ${grave.taphonomy.labile_joints}
        </div>
        <div>
          <strong>${isDe ? 'Persistente Gelenke:' : 'Persistent Joints:'}</strong> ${grave.taphonomy.persistent_joints}
        </div>
        <div>
          <strong>${isDe ? 'Wandeffekt (Begrenzung):' : 'Wall Effect:'}</strong> ${grave.taphonomy.wall_effect}
        </div>
        <div>
          <strong>${isDe ? 'Sekundärstörung:' : 'Disturbance:'}</strong> ${grave.taphonomy.secondary_disturbance}
        </div>
      </div>
    </div>

    <!-- Bioarchaeological Profile -->
    <h4 class="modal-section-title">💀 ${isDe ? 'Anthropologisches Skelettprofil' : 'Bioarchaeological Profile'}</h4>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem; font-size: 0.9rem;">
      <div class="meta-pill"><strong>${isDe ? 'Geschlecht:' : 'Sex:'}</strong> ${isDe ? grave.sex : grave.sex_en}</div>
      <div class="meta-pill"><strong>${isDe ? 'Sterbealter:' : 'Age:'}</strong> ${grave.age_class} (${grave.age_years})</div>
      <div class="meta-pill"><strong>${isDe ? 'Körperhöhe:' : 'Stature:'}</strong> ca. ${grave.bioarchaeology.stature_cm} cm</div>
    </div>
    <div style="font-size: 0.9rem; margin-bottom: 1.25rem;">
      <p style="margin-bottom: 0.4rem;"><strong>${isDe ? 'Pathologien / Stressmarker:' : 'Pathologies / Stress Markers:'}</strong></p>
      <ul style="padding-left: 1.25rem; color: var(--text-muted); margin-bottom: 0.75rem;">
        ${grave.bioarchaeology.pathologies.map(p => `<li>${p}</li>`).join('')}
      </ul>
      <p><strong>${isDe ? 'Muskelmarken / Aktivitätsmuster:' : 'Musculoskeletal Stress Markers:'}</strong> <span style="color: var(--text-muted);">${grave.bioarchaeology.activity_markers}</span></p>
    </div>

    <!-- Grave Goods Inventory -->
    <h4 class="modal-section-title">💎 ${isDe ? 'Materieller Beigabenkatalog' : 'Grave Goods Inventory'} (${grave.grave_goods.length})</h4>
    <table class="meta-table" style="font-size: 0.88rem;">
      <thead>
        <tr>
          <th style="width: 25%;">${isDe ? 'Kategorie' : 'Category'}</th>
          <th style="width: 50%;">${isDe ? 'Bezeichnung' : 'Artifact'}</th>
          <th style="width: 25%;">${isDe ? 'Material' : 'Material'}</th>
        </tr>
      </thead>
      <tbody>
        ${grave.grave_goods.map(item => `
          <tr>
            <td><span class="good-tag">${isDe ? item.category : item.category_en}</span></td>
            <td><strong>${item.name}</strong></td>
            <td>${item.material}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
      <button class="btn btn-outline-white" style="background:var(--color-primary); color:#fff;" onclick="document.getElementById('grave-modal').close()">
        ${isDe ? 'Schließen' : 'Close'}
      </button>
    </div>
  `;

  modal.showModal();
};

// Leaflet Map Initialization
function initMap() {
  const mapElement = document.getElementById('cemetery-map');
  if (!mapElement) return;

  // Center around Wien 11 - Csokorgasse
  cemeteryMap = L.map('cemetery-map', {
    center: [48.15685, 16.4713],
    zoom: 17,
    scrollWheelZoom: false
  });

  // Base Map Layer (CartoDB Positron for clean archaeological cartography)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(cemeteryMap);

  // Cemetery perimeter polygon (Csokorgasse)
  const perimeterCoords = [
    [48.1563, 16.4705],
    [48.1564, 16.4720],
    [48.1573, 16.4722],
    [48.1574, 16.4708]
  ];

  L.polygon(perimeterCoords, {
    color: '#123456',
    dashArray: '6, 6',
    weight: 2,
    fillColor: '#1f4e79',
    fillOpacity: 0.08
  }).bindTooltip(currentLang === 'de' ? "Gräberfeld Wien 11 - Csokorgasse (Areal)" : "Cemetery Vienna 11 - Csokorgasse (Area)").addTo(cemeteryMap);

  updateMapMarkers();
}

function updateMapMarkers() {
  if (!cemeteryMap) return;

  // Clear existing markers
  mapMarkers.forEach(m => cemeteryMap.removeLayer(m));
  mapMarkers = [];

  filteredGraves.forEach(g => {
    const isFemale = g.sex === 'weiblich';
    const isMale = g.sex.includes('männlich');
    const color = isFemale ? '#c2593f' : (isMale ? '#1f4e79' : '#d48b18');

    const marker = L.circleMarker([g.coordinates.lat, g.coordinates.lng], {
      radius: g.featured ? 9 : 7,
      fillColor: color,
      color: '#ffffff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9
    });

    const popupHtml = `
      <div style="font-family: var(--font-sans); padding: 0.2rem; min-width: 180px;">
        <h4 style="font-family: var(--font-serif); margin-bottom: 0.25rem; color: var(--color-primary-dark); font-size: 1.15rem;">
          ${g.grave_id}
        </h4>
        <p style="font-size: 0.85rem; margin-bottom: 0.25rem;">
          <strong>${currentLang === 'de' ? 'Geschlecht:' : 'Sex:'}</strong> ${currentLang === 'de' ? g.sex : g.sex_en}<br>
          <strong>${currentLang === 'de' ? 'Alter:' : 'Age:'}</strong> ${g.age_class}<br>
          <strong>${currentLang === 'de' ? 'Beigaben:' : 'Grave Goods:'}</strong> ${g.grave_goods.length}
        </p>
        <button onclick="openGraveModal('${g.grave_id}')" style="margin-top: 0.4rem; padding: 0.35rem 0.65rem; font-size: 0.78rem; background: var(--color-primary-dark); color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          ${currentLang === 'de' ? 'Details öffnen' : 'Open details'}
        </button>
      </div>
    `;

    marker.bindPopup(popupHtml);
    marker.addTo(cemeteryMap);
    mapMarkers.push(marker);
  });
}

// Stats counter animation
function updateStats() {
  // Can be expanded to dynamic calculation if needed
}

// Event Listeners setup
function initEventListeners() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', filterGraves);
  }

  const sexSel = document.getElementById('filter-sex');
  if (sexSel) sexSel.addEventListener('change', filterGraves);

  const ageSel = document.getElementById('filter-age');
  if (ageSel) ageSel.addEventListener('change', filterGraves);

  const filter3D = document.getElementById('filter-3d');
  if (filter3D) filter3D.addEventListener('change', filterGraves);

  const filterEmpty = document.getElementById('filter-empty-space');
  if (filterEmpty) filterEmpty.addEventListener('change', filterGraves);

  const btnReset = document.getElementById('btn-reset');
  if (btnReset) btnReset.addEventListener('click', resetFilters);

  // Copy citation button
  const copyBtn = document.getElementById('btn-copy-citation');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const citationText = document.getElementById('citation-code')?.innerText;
      if (citationText) {
        navigator.clipboard.writeText(citationText).then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = `✓ ${I18N[currentLang].copied_msg}`;
          setTimeout(() => { copyBtn.innerHTML = originalText; }, 2500);
        });
      }
    });
  }

  // Close modal dialog on backdrop click
  const modal = document.getElementById('grave-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }
}
