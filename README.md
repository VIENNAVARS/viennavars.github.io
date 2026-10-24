# VIENNAVARS — Open Research Data & Geospatial WMA Portal

[![DOI](https://img.shields.io/badge/DOI-10.25365%2Fphaidra.537-orange.svg)](https://doi.org/10.25365/phaidra.537)
[![PHAIDRA](https://img.shields.io/badge/PHAIDRA-o%3A2091644-blueviolet.svg)](https://phaidra.univie.ac.at/detail/o:2091644)
[![Base Maps](https://img.shields.io/badge/Base_Maps-basemap.at-teal.svg)](https://www.basemap.at)
[![Spatial Data](https://img.shields.io/badge/Geometries-%C2%A9_Wien_Museum-red.svg)](https://www.wienmuseum.at)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages_Deployed-success.svg)](https://viennavars.github.io)

**VIENNAVARS** — *Visualization and Interpretation of the early medieval fEmale avar populatioN from Vienna/Austria (csokorgasse-buRialS)*  

Official open research data, interactive GIS Web Map Application (WMA), and scientific visualization portal for the GitHub Organization [github.com/VIENNAVARS](https://github.com/VIENNAVARS).

---

## 🔗 Key Project Resources

* 🏛️ **Institutional Long-Term Archive (PHAIDRA):** [https://phaidra.univie.ac.at/detail/o:2091644](https://phaidra.univie.ac.at/detail/o:2091644)  
  *Persistent Identifier:* `o:2091644` · *Registered DOI:* [10.25365/phaidra.537](https://doi.org/10.25365/phaidra.537)
* 🎓 **University of Vienna Project Page (VIAS):** [https://vias.univie.ac.at/projekte/viennavars/](https://vias.univie.ac.at/projekte/viennavars/)
* 🐙 **GitHub Organization:** [https://github.com/VIENNAVARS](https://github.com/VIENNAVARS)

---

## 🎯 Architecture & Visualizations

The cemetery of **Vienna 11 – Csokorgasse (Kaiserebersdorf)** is the largest early medieval burial site discovered in the Vienna metropolitan area, with over 700 burials (7th–8th centuries AD). 

This portal provides:

### 1. Interactive Geospatial Web Map Application (WMA) on `basemap.at`
* Direct rendering of authentic GIS spatial layers derived from the project's analytical QGIS/GeoPackage database.
* Powered by official Austrian **`basemap.at`** WMTS tile layers (`bmapgrau` Gray, `bmaporthofoto30cm` 30cm Aerial Orthophoto, and `geolandbasemap` Standard).
* **3-Meter Hexagonal Spatial Tessellation:**
  * **All Burials (428 Hexbins):** Dominant chronological phase per cell (Early Avar [EAP], Middle Avar [MAP], Late Avar [LAP], Tie/Mixed).
  * **Female Burials (182 Hexbins):** Horizontal trajectory of documented female graves.
  * **Male Burials (178 Hexbins):** Horizontal trajectory of documented male graves.
  * **Cemetery Outer Enclosure (`friedhof_huelle`):** Vector boundary polygon.
* **Dynamic Hexbin Inspector:** Live inspection of cell coordinates, burial totals, dated vs. undated counts, and chronological phase breakdown upon hover and click.
* **300 DPI Publication Plates Lightbox:** High-resolution plates (`SP01`–`SP06`) accessible via integrated fullscreen viewer.

> **Spatial Intellectual Property Notice:** Primary excavation plans, trench geometries, and raw survey coordinates are the property of the **Wien Museum (© Wien Museum)** and are aggregated into 3-meter bins to ensure ethical confidentiality.

### 2. Scientific Findings & Paper Teasers
* **Demography, Stature & Stress:** Bioarchaeological analysis of female stature (mean: 158.4 cm) and early childhood physiological stress indicators (linear enamel hypoplasias, LEH).
* **Material Culture & Social Stratification:** Status categories based on gilded bronze/silver earrings (polyhedral, grape pendants), multi-strand glass beads, and economic textile markers (spindle whorls in ~32% of female graves).
* **Horizontal Stratigraphy:** Chronological trajectories across the Early, Middle, and Late Avar periods.

### 3. Abstracted Photographic Stream
* Stylized, progressive duotone photographic documentation of prestige grave goods (filigree gold pendants), excavation ensembles (ceramic vessels, knives, spindle whorls), and Danube Limes environmental topography.

### 4. Comprehensive Scientific Corpus & Bibliography
* Structured searchable and filterable database of 20 publications and monographs directly covering the Csokorgasse site and associated machine learning/spatial methodology.
* Direct one-click links to registered DOIs, open-access editions, and institutional repositories.

### 5. Data Governance & Single-Point PHAIDRA Access
* Datasets are permanently curated in the University of Vienna repository **PHAIDRA**.
* Access to full tabular osteological catalogs and excavation records is managed through controlled scientific requests.

---

## 📁 Repository Structure

```text
viennavars/
├── index.html                   # Avant-garde dark portal (English only)
├── css/
│   └── styles.css               # Progressive stylesheet (cyber-terracotta, gold, Leaflet WMA, duotone)
├── js/
│   └── app.js                   # Interactive Leaflet engine with basemap.at, GeoJSON, search & lightbox
├── assets/
│   ├── maps/                    # High-resolution 300 dpi publication hexbin maps (SP01–SP06)
│   │   ├── SP04_Hex_Chronologie_Gesamt.png
│   │   ├── SP03_Hex_Chronologie_nach_Geschlecht.png
│   │   ├── SP06_Status_Chronologie_Female.png
│   │   ├── SP01_Status_nach_Geschlecht.png
│   │   └── SP05_Belegung_Vorhandene_Huellen.png
│   └── photos/                  # Abstracted duotone archaeological photography
│       ├── grave_gold_pendant.webp
│       ├── grave_finds_ensemble.jpg
│       └── viennavars_overview.jpg
├── data/
│   ├── cemetery_boundary.geojson     # Cemetery perimeter boundary (friedhof_huelle)
│   ├── hex_chronology_all.geojson    # 428 3m-hexbins with phase attributes
│   ├── hex_chronology_female.geojson # 182 female 3m-hexbins
│   ├── hex_chronology_male.geojson   # 178 male 3m-hexbins
│   ├── publications.json             # 20 peer-reviewed research papers and DOIs
│   ├── summary_statistics.json       # Aggregated metrics, paper insights, and map metadata
│   └── metadata.json                 # DataCite/Dublin Core metadata schema
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Actions Pages deployment
├── .gitignore
└── README.md
```

---

## 🚀 GitHub Pages Deployment

To publish this portal to GitHub Pages:

```bash
cd /Users/oeai_admin/.gemini/antigravity/scratch/viennavars

# Add remote to your organization repo (e.g. viennavars.github.io):
git remote add origin https://github.com/VIENNAVARS/viennavars.github.io.git

# Push to main:
git add .
git commit -m "feat: progressive GIS WMA on basemap.at with real hexbins and bibliography"
git push -u origin main
```

In GitHub Repository Settings -> **Pages**, ensure the Source is set to **GitHub Actions** (or Deploy from branch `main` / root).

---

## 👥 Principal Investigators & Cooperations

* **Dr. Dominik Hagmann** (Project Lead / Digital Archaeology, VIAS – University of Vienna)
* **Univ.-Prof. Dr. Sylvia Kirchengast** (Bioarchaeology & Anthropology, Department of Evolutionary Anthropology, University of Vienna)
* **Dr. Birgit Bühler** (Material Culture & Archaeometry, VIAS – University of Vienna)
* **Cooperation:** Wien Museum, City of Vienna Culture (Stadt Wien Kultur)
* **Funding:** Supported by the *Hochschuljubiläumsfonds der Stadt Wien* (Grant H-448297/2023)

---

## 📜 Citation

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
