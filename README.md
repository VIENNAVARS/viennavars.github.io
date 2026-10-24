# VIENNAVARS — Open Research Data Portal

[![DOI](https://img.shields.io/badge/DOI-10.25365%2Fphaidra.537-blue.svg)](https://doi.org/10.25365/phaidra.537)
[![PHAIDRA](https://img.shields.io/badge/PHAIDRA-o%3A2091644-blueviolet.svg)](https://phaidra.univie.ac.at/detail/o:2091644)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages_Deployed-green.svg)](https://viennavars.github.io)

**VIENNAVARS** — *Visualization and Interpretation of the early medieval fEmale avar populatioN through archaeothaNAthology from Vienna/Austria (csokorgasse-buRialS)*  
*(German: Visualisierung und Interpretation weiblicher Lebenswelten in der Awarenzeit (7. – 8. Jhdt. n. Chr.) am Beispiel der Population des Gräberfeldes Csokorgasse, Wien 11)*

Dieses Repository enthält das offizielle **Forschungsdaten-Portal** und die **GitHub-Page** für das Forschungsprojekt **VIENNAVARS**.

---

## 🔗 Zentrale Projekt-Links

* 🏛️ **Langzeitarchivierung (PHAIDRA):** [https://phaidra.univie.ac.at/detail/o:2091644](https://phaidra.univie.ac.at/detail/o:2091644)  
  *Persistent Identifier:* `o:2091644` | *DOI:* [10.25365/phaidra.537](https://doi.org/10.25365/phaidra.537)
* 🎓 **Projektseite der Universität Wien (VIAS):** [https://vias.univie.ac.at/projekte/viennavars/](https://vias.univie.ac.at/projekte/viennavars/)
* 🐙 **GitHub Organisation:** [https://github.com/VIENNAVARS](https://github.com/VIENNAVARS)

---

## 🎯 Konzept: Die Seite für die Daten

Das Gräberfeld **Wien 11 – Csokorgasse** (Kaiserebersdorf) ist mit über 700 Gräbern das bisher größte bekannte frühmittelalterliche Gräberfeld im Wiener Stadtgebiet. 

Während die offizielle **Projektseite bei der Universität Wien (VIAS)** den institutionellen Rahmen und Forschungskontext darstellt und **PHAIDRA** die zitierfähige Langzeitarchivierung aller Quelldaten garantiert, dient diese GitHub-Page als **interaktives Open-Data-Portal**:

1. **Interaktiver Gräber- und Skelettkatalog:** Durchsuchbar nach Grabnummer, biologischem Geschlecht, Sterbealter, Trachtbeigaben und anthropologischen Pathologien.
2. **Archäothanatologische Befunde:** Detaillierte Dokumentation von Zerfallsräumen (Hohlraumzerfall im Holzsarg vs. Verfüllung), Gelenkartikulationen (labil vs. persistent) und Wandeffekten nach Henri Duday.
3. **GIS & Räumliche Verteilung:** Interaktive Leaflet-Karte mit genauer Verortung der Gräber und des Gräberfeldareals.
4. **FAIR Data & Direktdownload:** Alle Daten stehen als Open Access (CC-BY 4.0) im CSV-, JSON-, GeoJSON- und DataCite-JSON-LD-Format zur wissenschaftlichen Nachnutzung bereit.

---

## 📁 Repository-Struktur

```text
viennavars/
├── index.html                   # Hauptportal der GitHub Page (zweisprachig DE/EN)
├── css/
│   └── styles.css               # Modernes, akademisches Responsive-Design
├── js/
│   └── app.js                   # Interaktive Filter-, Map- & Modal-Logik
├── data/
│   ├── graves.json              # Vollständiger Befunddatensatz (JSON)
│   ├── graves.csv               # Tabellarische Rohdaten für Datenanalyse (CSV)
│   ├── viennavars.geojson       # GIS-Geodaten (Gräberfeld & Gräberkoordinaten)
│   └── metadata.json            # Dublin Core & DataCite konforme Metadaten
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automatisierter GitHub Actions Pages Deployment Workflow
└── README.md                    # Dokumentation & Bereitstellungsanleitung
```

---

## 🚀 GitHub Pages Bereitstellung (Deployment)

Um die Seite unter `https://viennavars.github.io` (oder `https://viennavars.github.io/<repo-name>`) zu veröffentlichen:

### 1. Repository auf GitHub erstellen & pushen
Erstellen Sie in der Organisation [VIENNAVARS](https://github.com/VIENNAVARS) ein neues Repository, z. B. `viennavars.github.io` (für die Hauptseite der Organisation) oder `data` / `viennavars`.

```bash
cd /Users/oeai_admin/.gemini/antigravity/scratch/viennavars

# Git Remote verbinden (Beispiel mit viennavars.github.io)
git remote add origin https://github.com/VIENNAVARS/viennavars.github.io.git

# Main Branch festlegen und committen
git branch -M main
git add .
git commit -m "feat: initial commit of VIENNAVARS open research data portal"

# Pushen
git push -u origin main
```

### 2. GitHub Pages aktivieren
1. Öffnen Sie das Repository auf GitHub: `https://github.com/VIENNAVARS/<repo-name>`
2. Gehen Sie auf **Settings** -> **Pages**.
3. Wählen Sie unter **Build and deployment**:
   - **Source:** *GitHub Actions* (empfohlen, nutzt `.github/workflows/deploy.yml`)  
     *oder:*
   - **Source:** *Deploy from a branch* -> Branch: `main` -> Ordner: `/ (root)`.
4. Nach ca. 1 Minute ist die Seite unter `https://viennavars.github.io` live erreichbar.

---

## 👥 Beteiligte Forscher*innen & Institutionen

* **Dr. Dominik Hagmann** (Projektleitung, Digitale Archäologie & Archäothanatologie, VIAS – Universität Wien)
* **Univ.-Prof. Dr. Sylvia Kirchengast** (Bioarchäologie & Humanosteologie, Department für Evolutionäre Anthropologie, Universität Wien)
* **Dr. Birgit Bühler** (Materielle Kultur & Archäometrie, VIAS – Universität Wien)

### Kooperation & Förderung
* **Vienna Institute for Archaeological Science (VIAS)**, Universität Wien
* **Department für Evolutionäre Anthropologie**, Universität Wien
* **Wien Museum**
* **Gefördert durch:** *Hochschuljubiläumsfonds der Stadt Wien* (Projekt H-448297/2023)

---

## 📜 Zitation

Wenn Sie Daten oder Inhalte dieses Portals nutzen, zitieren Sie bitte wie folgt:

```bibtex
@dataset{viennavars_csokorgasse_2024,
  author    = {Hagmann, Dominik and Kirchengast, Sylvia and B{\"u}hler, Birgit},
  title     = {{VIENNAVARS : Visualization and Interpretation of the early medieval fEmale avar populatioN through archaeothaNAthology from Vienna/Austria (csokorgasse-buRialS)}},
  year      = {2024},
  publisher = {PHAIDRA - University of Vienna},
  doi       = {10.25365/phaidra.537},
  url       = {https://phaidra.univie.ac.at/detail/o:2091644}
}
```

---

## 📄 Lizenz
Die Forschungsdaten und Web-Inhalte werden unter der [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) Lizenz zur freien wissenschaftlichen Nachnutzung bereitgestellt.
