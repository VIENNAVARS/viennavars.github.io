# VIENNAVARS — Open Research Data & Visualization Portal

[![DOI](https://img.shields.io/badge/DOI-10.25365%2Fphaidra.537-orange.svg)](https://doi.org/10.25365/phaidra.537)
[![PHAIDRA](https://img.shields.io/badge/PHAIDRA-o%3A2091644-blueviolet.svg)](https://phaidra.univie.ac.at/detail/o:2091644)
[![Access: Restricted](https://img.shields.io/badge/Access-Controlled_Scientific_Access-yellow.svg)](https://phaidra.univie.ac.at/detail/o:2091644)
[![Rights: Wien Museum](https://img.shields.io/badge/Geometries-%C2%A9_Wien_Museum-red.svg)](https://www.wienmuseum.at)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages_Deployed-success.svg)](https://viennavars.github.io)

**VIENNAVARS** — *Visualization and Interpretation of the early medieval fEmale avar populatioN from Vienna/Austria (csokorgasse-buRialS)*  
*(dt.: Visualisierung und Interpretation weiblicher Lebenswelten in der Awarenzeit [7. – 8. Jhdt. n. Chr.] am Beispiel der Population des Gräberfeldes Csokorgasse, Wien 11)*

Dieses Repository enthält das progressive **Forschungsdaten- und Visualisierungsportal** für die GitHub-Page der Organisation [github.com/VIENNAVARS](https://github.com/VIENNAVARS).

---

## 🔗 Zentrale Links & Repositorien

* 🏛️ **Langzeitarchivierung (PHAIDRA):** [https://phaidra.univie.ac.at/detail/o:2091644](https://phaidra.univie.ac.at/detail/o:2091644)  
  *Persistent Identifier:* `o:2091644` | *DOI:* [10.25365/phaidra.537](https://doi.org/10.25365/phaidra.537)
* 🎓 **Offizielle Projektseite der Universität Wien (VIAS):** [https://vias.univie.ac.at/projekte/viennavars/](https://vias.univie.ac.at/projekte/viennavars/)
* 🐙 **GitHub Organisation:** [https://github.com/VIENNAVARS](https://github.com/VIENNAVARS)

---

## 🎯 Konzept: Visualisierung, Paper-Highlights & Datensparsamkeit

Das Gräberfeld **Wien 11 – Csokorgasse** (Kaiserebersdorf) ist mit über 700 Gräbern das größte frühmittelalterliche Gräberfeld im Wiener Stadtgebiet. 

Das Portal erfüllt drei zentrale Kernfunktionen:

### 1. Teaser & Highlights aus den Publikationen
* **Bioarchäologie & Demographie:** Körperhöhenmetriken (mittlere weibliche Körperhöhe: 158.4 cm), Geschlechtsdimorphismus und frühkindliche physiologische Stressmarker (lineare Schmelzhypoplasien).
* **Materielle Kultur & Sozialstatus:** Auswertung von Statussymbolen (vergoldete Polyeder-Ohrringe, Perlenkollieren) und Wirtschaftsindikatoren (Spinnwirtel in ~32% der Gräber).
* **Raum-zeitliche Chronologie:** Horizontale Stratigraphie und Belegungsdynamik über 3 Phasen (Früh-, Mittel- und Spätawarenzeit).

### 2. Progressive WMA (Web Map Application) mit Kartenauszügen
* **Sektorale Belegungsdichte:** Interaktive Rastermatrix (48 Planquadrate), die die Konzentration im Zentralbereich anzeigt, ohne sensible Vektorkoordinaten zu exponieren.
* **Chronologische Phasenkarte:** Visualisierung der horizontalen Stratigraphie.
* **Fundkonzentration:** Clusterdarstellung von Schmuck und Handwerksgeräten.
* **Fundplatz-Kontext:** Geographische Verortung in Wien 11.
* **Urheberrechtlicher Schutz:** *Die Primärgeometrien und Grabungspläne unterliegen dem Urheber- und Nutzungsrecht des Wien Museums (© Wien Museum) und werden daher nicht als rohe Vektordaten veröffentlicht.*

### 3. Datenpolitik & Kontrollierter Zugang via PHAIDRA
* Alle Primärdaten sind dauerhaft im universitären Repositorium **PHAIDRA** archiviert.
* Der Datenzugang zu Detailinventaren erfolgt kontrolliert auf begründete wissenschaftliche Anfrage nach Rücksprache mit der Projektleitung (Dr. Dominik Hagmann / VIAS).
* Auf GitHub werden strukturierte Metadaten, aggregierte Kennzahlen und das Datenwörterbuch zur Orientierung für Nachnutzungsanträge bereitgestellt.

---

## 📁 Repository-Struktur

```text
viennavars/
├── index.html                   # Progressive Portal-Hauptseite (zweisprachig DE/EN)
├── css/
│   └── styles.css               # Modernes, progressives Dark-Theme mit Glow-Akzenten
├── js/
│   └── app.js                   # Interaktive Raster-Matrix, Visualisierungs-Switcher & i18n
├── data/
│   ├── summary_statistics.json  # Aggregierte Kennzahlen, Paper-Insights & Visualisierungsdaten
│   ├── data_dictionary.json     # PHAIDRA Variablenkatalog für Nachnutzungsanträge
│   └── metadata.json            # Metadaten-Schema mit Datenpolitik & Wien Museum Rechtehinweis
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions Workflow für automatisches Deployment
├── .gitignore
└── README.md
```

---

## 🚀 GitHub Pages Bereitstellung (Deployment)

1. Repository auf GitHub pushen:
```bash
cd /Users/oeai_admin/.gemini/antigravity/scratch/viennavars

# Remote hinzufügen (z. B. für viennavars.github.io):
git remote add origin https://github.com/VIENNAVARS/viennavars.github.io.git

# Main Branch comitten & pushen:
git add .
git commit -m "feat: progressive research data portal with map excerpts and paper insights"
git push -u origin main
```

2. Auf GitHub unter **Settings** ➔ **Pages** unter *Source* **GitHub Actions** (oder *Deploy from a branch*) auswählen. Nach kurzer Zeit ist die Seite online.

---

## 👥 Beteiligte Forscher*innen & Kooperationen

* **Dr. Dominik Hagmann** (Projektleitung / Digitale Archäologie, VIAS – Universität Wien)
* **Univ.-Prof. Dr. Sylvia Kirchengast** (Bioarchäologie & Anthropologie, Department für Evolutionäre Anthropologie, Universität Wien)
* **Dr. Birgit Bühler** (Materielle Kultur & Archäometrie, VIAS – Universität Wien)
* **Kooperationspartner:** Wien Museum, Stadt Wien Kultur
* **Gefördert durch:** *Hochschuljubiläumsfonds der Stadt Wien* (Projekt H-448297/2023)

---

## 📜 Zitation

```bibtex
@dataset{viennavars_csokorgasse_2024,
  author    = {Hagmann, Dominik and Kirchengast, Sylvia and B{\"u}hler, Birgit},
  title     = {{VIENNAVARS : Visualization and Interpretation of the early medieval fEmale avar populatioN from Vienna/Austria (csokorgasse-buRialS)}},
  year      = {2024},
  publisher = {PHAIDRA - University of Vienna},
  doi       = {10.25365/phaidra.537},
  url       = {https://phaidra.univie.ac.at/detail/o:2091644}
}
```
