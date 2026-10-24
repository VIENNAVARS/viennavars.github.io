# VIENNAVARS — The Early Medieval Avar-Period Cemetery of Vienna 11 – Csokorgasse

[![DOI](https://img.shields.io/badge/DOI-10.25365%2Fphaidra.537-orange.svg)](https://doi.org/10.25365/phaidra.537)
[![PHAIDRA](https://img.shields.io/badge/PHAIDRA-o%3A2091644-blueviolet.svg)](https://phaidra.univie.ac.at/detail/o:2091644)
[![Base Maps](https://img.shields.io/badge/Base_Maps-basemap.at_%26_Dark_Canvas-teal.svg)](https://www.basemap.at)
[![Spatial Data](https://img.shields.io/badge/Geometries-%C2%A9_Wien_Museum-red.svg)](https://www.wienmuseum.at)
[![Platform](https://img.shields.io/badge/Vibe--Coded_with-Google_Antigravity-4285F4.svg)](https://github.com/VIENNAVARS)
[![License](https://img.shields.io/badge/Copyright-%C2%A9_VIENNAVARS-brightgreen.svg)](https://github.com/VIENNAVARS)

**VIENNAVARS** — *Visualization and Interpretation of the early medieval fEmale avar populatioN through archaeothaNAthology from Vienna/Austria (csokorgasse-buRialS)*  

Official open research data portal and interactive cemetery map for the early medieval Avar burial ground of **Vienna 11 – Csokorgasse** (7th–8th c. AD, 700+ graves). Built for the GitHub Organization [github.com/VIENNAVARS](https://github.com/VIENNAVARS). Vibe-coded with **Google Antigravity**.

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
* Direct rendering of authentic GIS spatial layers over official Austrian **`basemap.at`** WMTS tile layers (`bmapgrau` Gray, `bmaporthofoto30cm` 30cm Aerial Orthophoto, and `geolandbasemap` Standard).
* **3-Meter Hexagonal Spatial Tessellation:**
  * **All Burials (428 Hexbins):** Dominant chronological phase per cell (Early Avar [EAP], Middle Avar [MAP], Late Avar [LAP], Tie/Mixed).
  * **Female Burials (182 Hexbins):** Spatial trajectory of documented female graves.
  * **Male Burials (178 Hexbins):** Spatial trajectory of documented male graves.
  * **Cemetery Outer Enclosure (`friedhof_huelle`):** Vector boundary polygon.
* **Dynamic Hexbin Inspector:** Live inspection of cell coordinates, burial totals, dated vs. undated counts, and chronological phase breakdown upon hover and click.
* **Embedded Data Engine (`data/csokorgasse_data.js`):** Runs seamlessly offline (local `file://` double-click in Finder) without CORS restrictions, as well as on GitHub Pages.

> **Spatial Intellectual Property Notice:** Primary excavation plans, trench geometries, and raw survey coordinates are the property of the **Wien Museum (© Wien Museum)** and are aggregated into 3-meter bins to ensure ethical confidentiality.

### 2. Scientific Findings & Paper Teasers
* **Demography, Stature & Stress:** Bioarchaeological analysis of female stature (mean: 158.4 cm) and early childhood physiological stress indicators (linear enamel hypoplasias, LEH).
* **Material Culture & Social Stratification:** Status categories based on gilded bronze/silver earrings (polyhedral, grape pendants), multi-strand glass beads, and economic textile markers (spindle whorls in ~32% of female graves).
* **Horizontal Stratigraphy:** Chronological trajectories across the Early, Middle, and Late Avar periods.

### 3. Authentic Publication Figures
* High-resolution figures directly from peer-reviewed Csokorgasse publications:
  * **Fig. 1:** Stature as a Social Signal Graphical Abstract (*Nature & Anthropology* 2026).
  * **Fig. 2:** Equestrian Grave 650 with Horse & Dog (*Monographien des RGZM 143* / Propylaeum, Baron 2024, Abb. 198).
  * **Fig. 3:** Cemetery Excavation Plan with 700+ Burials (*Nature & Anthropology* 2026, Fig. 2 / Wien Museum).
  * **Fig. 4:** Geographic Topography in Upper Danube Basin (*Nature & Anthropology* 2026, Fig. 1).

### 4. Publications & Research Corpus
* 13 core publications directly covering the Vienna 11 – Csokorgasse cemetery and Avar population.
* Default display of first 3 articles with an interactive "Load More Publications" button.
* All registered DOIs are directly clickable (`https://doi.org/...`) on titles and action buttons.
* Real-time search by author, keyword, or year.

### 5. Data Governance & Single-Point PHAIDRA Access
* Datasets are permanently curated in the University of Vienna repository **PHAIDRA** under DOI `10.25365/phaidra.537`.
* Primary excavation geometries belong to **Wien Museum (© Wien Museum)**.
* Synthesis, visualizations, and project assets are **© 2024–2026 VIENNAVARS**.

---

## 📁 Repository Structure

```text
viennavars/
├── index.html                   # Avant-garde dark portal (English only, vibe-coded)
├── css/
│   └── styles.css               # Clean stylesheet (non-wrapping navbar, team avatars, Leaflet map)
├── js/
│   └── app.js                   # Interactive Leaflet engine with basemap.at, dark canvas & search
├── data/
│   ├── csokorgasse_data.js           # Embedded data engine (enables instant offline file:// execution)
│   ├── cemetery_boundary.geojson     # Cemetery perimeter boundary (friedhof_huelle)
│   ├── hex_chronology_all.geojson    # 428 spatial sectors with phase attributes
│   ├── hex_chronology_female.geojson # 182 female spatial sectors
│   ├── hex_chronology_male.geojson   # 178 male spatial sectors
│   ├── publications.json             # 13 core peer-reviewed publications with DOIs
│   ├── summary_statistics.json       # Aggregated metrics and paper insights
│   └── metadata.json                 # DataCite/Dublin Core metadata schema
├── assets/
│   ├── figures/                 # Authentic published figures extracted from Zotero
│   │   ├── csokorgasse_stature_social_signal.jpg
│   │   ├── csokorgasse_reitergrab_650.png
│   │   ├── csokorgasse_excavation_plan_700burials.png
│   │   └── csokorgasse_geographic_location.jpg
│   ├── logos/                   # High-fidelity SVG brand & partner logos
│   │   ├── google_antigravity.svg
│   │   ├── viennavars.svg
│   │   ├── univie.svg
│   │   ├── wien_museum.svg
│   │   └── stadt_wien.svg
│   └── team/                    # Project team portraits
│       ├── dominik_hagmann.jpg
│       ├── sylvia_kirchengast.jpg
│       └── birgit_buehler.svg
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

# Add remote to your organization repo:
git remote add origin https://github.com/VIENNAVARS/viennavars.github.io.git

# Push to main:
git add .
git commit -m "feat: streamlined portal with embedded data engine, authentic figures, and DOI links"
git push -u origin main
```

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
