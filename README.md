# VIENNAVARS — Open Research Data & Hexbin Visualization Portal

[![DOI](https://img.shields.io/badge/DOI-10.25365%2Fphaidra.537-orange.svg)](https://doi.org/10.25365/phaidra.537)
[![PHAIDRA](https://img.shields.io/badge/PHAIDRA-o%3A2091644-blueviolet.svg)](https://phaidra.univie.ac.at/detail/o:2091644)
[![Spatial Data](https://img.shields.io/badge/Geometries-%C2%A9_Wien_Museum-red.svg)](https://www.wienmuseum.at)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages_Deployed-success.svg)](https://viennavars.github.io)

**VIENNAVARS** — *Visualization and Interpretation of the early medieval fEmale avar populatioN from Vienna/Austria (csokorgasse-buRialS)*  

Official research data and spatial visualization portal for the GitHub Organization [github.com/VIENNAVARS](https://github.com/VIENNAVARS).

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

### 1. Scientific Paper Insights
* **Demography, Stature & Stress:** Bioarchaeological analysis of female stature (mean: 158.4 cm) and early childhood physiological stress indicators (linear enamel hypoplasias, LEH).
* **Material Culture & Social Stratification:** Status categories based on gilded bronze/silver earrings (polyhedral, grape pendants), multi-strand glass beads, and economic textile markers (spindle whorls in ~32% of female graves).
* **Horizontal Stratigraphy:** Chronological trajectories across the Early, Middle, and Late Avar periods.

### 2. Interactive Hexbin Maps (3-Meter Spatial Tessellation)
To analyze cemetery dynamics without exposing sensitive individual coordinates, burials are aggregated into 3-meter hexagonal spatial bins:
* **SP04:** Chronology in 3-Meter Hexagons (Total Cemetery)
* **SP03:** Chronology in 3-Meter Hexagons by Sex (Female vs. Male trajectories)
* **SP06:** Female Lifeworlds: Social Status and Chronology (Main Map, n=166 females)
* **SP01:** Social Status by Sex Across the Adult Population (n=348 adults)
* **SP05:** Cemetery Layout & Descriptive Convex Hulls
* **Geographic Context:** OpenStreetMap / CartoDB dark site overview in Vienna 11.

> **Intellectual Property Notice:** Primary excavation plans, trench geometries, and raw survey coordinates are the property of the **Wien Museum (© Wien Museum)** and are not disseminated openly as raw vector points.

### 3. Data Governance & Single-Point PHAIDRA Access
* Datasets are permanently curated in the University of Vienna repository **PHAIDRA**.
* Access to full tabular osteological catalogs and excavation records is managed through controlled scientific requests.

---

## 📁 Repository Structure

```text
viennavars/
├── index.html                   # Modern scientific dark portal (English only)
├── css/
│   └── styles.css               # Progressive styling with glow meshes and glassmorphism
├── js/
│   └── app.js                   # Hexbin map switcher, lightbox zoom, and Leaflet map
├── assets/
│   └── maps/                    # High-resolution 300 dpi publication hexbin maps (SP01–SP06)
│       ├── SP04_Hex_Chronologie_Gesamt.png
│       ├── SP03_Hex_Chronologie_nach_Geschlecht.png
│       ├── SP06_Status_Chronologie_Female.png
│       ├── SP01_Status_nach_Geschlecht.png
│       └── SP05_Belegung_Vorhandene_Huellen.png
├── data/
│   ├── summary_statistics.json  # Aggregated metrics, paper insights, and map metadata
│   ├── data_dictionary.json     # Variable schema of curated PHAIDRA tables
│   └── metadata.json            # DataCite/Dublin Core metadata schema
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
git commit -m "feat: progressive hexbin maps portal in English with publication figures"
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
