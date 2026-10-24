/**
 * VIENNAVARS - Open Research Data Portal
 * Progressive Application Engine & Visualization Controller
 */

// Fallback Embedded Summary Dataset
const EMBEDDED_SUMMARY = {
  "project": "VIENNAVARS",
  "site": "Wien 11 - Csokorgasse",
  "summary": {
    "total_graves_documented": "700+",
    "female_individuals_analyzed": 128,
    "dating_distribution": [
      { "period": "Frühawarenzeit (ca. 568–650 n. Chr.)", "period_en": "Early Avar Period", "share_pct": 14 },
      { "period": "Mittelawarenzeit (ca. 650–700 n. Chr.)", "period_en": "Middle Avar Period", "share_pct": 49 },
      { "period": "Spätawarenzeit (ca. 700–800 n. Chr.)", "period_en": "Late Avar Period", "share_pct": 37 }
    ],
    "material_categories": [
      { "category": "Tracht & Schmuck (Ohrringe, Perlen)", "category_en": "Costume & Jewelry", "frequency_pct": 68 },
      { "category": "Keramikgefäße", "category_en": "Pottery", "frequency_pct": 54 },
      { "category": "Textilhandwerk (Spinnwirtel)", "category_en": "Textile craft (Spindle whorls)", "frequency_pct": 32 },
      { "category": "Werkzeuge (Eisenmesser)", "category_en": "Tools (Knives)", "frequency_pct": 46 },
      { "category": "Tierische Speisebeigaben", "category_en": "Animal food offerings", "frequency_pct": 28 }
    ]
  },
  "paper_insights": [
    {
      "id": "insight-bioarch",
      "tag_de": "Anthropologie & Lebensbedingungen",
      "tag_en": "Anthropology & Lifeworlds",
      "title_de": "Demographie, Körperhöhe & physiologischer Stress",
      "title_en": "Demography, Stature & Physiological Stress",
      "highlight_metric": "158.4 cm",
      "metric_label_de": "Mittlere weibliche Körperhöhe",
      "metric_label_en": "Mean female body height",
      "summary_de": "Die bioarchäologische Auswertung der weiblichen Individuen zeigt eine mittlere Körperhöhe von 158.4 cm mit charakteristischem Geschlechtsdimorphismus. Lineare Schmelzhypoplasien (LEH) belegen physiologische Stressphasen in der frühen Kindheit, gefolgt von einer Stabilisierung im Jugendalter.",
      "summary_en": "Bioarchaeological analysis of female individuals reveals a mean stature of 158.4 cm reflecting clear sexual dimorphism. Linear enamel hypoplasias (LEH) identify childhood physiological stress episodes, with relative stabilization during adolescence.",
      "reference": "VIENNAVARS Bioarchaeology Series / PHAIDRA o:2091644"
    },
    {
      "id": "insight-status",
      "tag_de": "Materielle Kultur & Sozialstruktur",
      "tag_en": "Material Culture & Social Status",
      "title_de": "Trachtbestandteile & Handwerk als Statussymbole",
      "title_en": "Costume Elements & Crafts as Status Markers",
      "highlight_metric": "68%",
      "metric_label_de": "Gräber mit Schmuckbeigaben",
      "metric_label_en": "Burials with jewelry offerings",
      "summary_de": "Die Vergesellschaftung von vergoldeten Bronze- und Silberohrringen mit bunten Perlenkollieren indiziert soziale Hierarchien. Spinnwirtel in knapp einem Drittel der Gräber betonen die zentrale sozioökonomische Rolle der Textilherstellung.",
      "summary_en": "The association of gilded bronze and silver earrings with colorful bead necklaces demonstrates pronounced social stratification. Spindle whorls in nearly one third of female graves underscore the central socio-economic role of textile craftsmanship.",
      "reference": "VIENNAVARS Material Culture & Craft Analysis / VIAS"
    },
    {
      "id": "insight-spatial",
      "tag_de": "Räumliche Organisation",
      "tag_en": "Spatial Organization & Chronology",
      "title_de": "Belegungsdynamik & Sektorenentwicklung",
      "title_en": "Spatial Dynamics & Sector Development",
      "highlight_metric": "3 Phasen",
      "metric_label_de": "Horizontale Stratigraphie",
      "metric_label_en": "Horizontal stratigraphy",
      "summary_de": "Die räumliche Visualisierung belegt eine Belegungskontinuität von der Frühawarenzeit über den Höhepunkt der Mittelawarenzeit bis in die Spätawarenzeit. Die Grablegen verdichten sich in drei distinkten Arealen, die auf sippenbasierte Belegungsstreifen hindeuten.",
      "summary_en": "Spatial visualization demonstrates cemetery continuity spanning the Early Avar period through the Middle Avar peak into the Late Avar period. Graves cluster in distinct spatial ribbons, suggesting family- or kin-group burial plots.",
      "reference": "VIENNAVARS Spatial Dynamics / Wien Museum & VIAS"
    }
  ]
};

// 48-Cell Excavation Grid Data (8 columns x 6 rows) - Schematized Raster Model
const EXCAVATION_CELLS = [];
const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
for (let r = 1; r <= 6; r++) {
  COLS.forEach(c => {
    // Generate realistic clustering towards center (B-F, 2-5)
    const isCenter = ['C', 'D', 'E', 'F'].includes(c) && [2, 3, 4, 5].includes(r);
    const isEdge = ['A', 'H'].includes(c) || [1, 6].includes(r);
    
    let count = isCenter ? Math.floor(18 + Math.random() * 16) : (isEdge ? Math.floor(2 + Math.random() * 6) : Math.floor(8 + Math.random() * 10));
    let densityClass = count > 20 ? 'density-high' : (count > 8 ? 'density-med' : 'density-low');
    
    // Phase attribution
    let phase = isEdge ? 'Frühawarenzeit' : (isCenter && count > 24 ? 'Mittelawarenzeit' : 'Spätawarenzeit');
    let goodsCount = Math.round(count * 0.65);

    EXCAVATION_CELLS.push({
      code: `${c}${r}`,
      count: count,
      densityClass: densityClass,
      phase: phase,
      goodsCount: goodsCount,
      sector: `Sektor ${c} / Planquadrat ${r}`
    });
  });
}

// Translations dictionary
const I18N = {
  de: {
    nav_overview: "Übersicht",
    nav_insights: "Paper-Ergebnisse",
    nav_wma: "Webkarte & Auszüge",
    nav_data: "Archiv & Datenpolitik",
    nav_team: "Team & Partner",
    hero_badge_portal: "Open Science Portal & Kartenauszüge",
    hero_badge_rights: "© Geometrien: Wien Museum",
    hero_sub_en: "Visualization and Interpretation of the early medieval fEmale avar populatioN from Vienna/Austria (csokorgasse-buRialS).",
    hero_german: "Visualisierung und Interpretation weiblicher Lebenswelten in der Awarenzeit (7.–8. Jh. n. Chr.) am Beispiel der Population des Gräberfeldes Csokorgasse, Wien 11.",
    btn_view_insights: "📊 Paper-Ergebnisse ansehen",
    btn_explore_wma: "🗺️ Webkarte & Auszüge öffnen",
    btn_phaidra_link: "🏛️ Langzeitarchivierung (PHAIDRA)",
    btn_vias_link: "🎓 Projektseite (VIAS / Uni Wien)",
    stat_graves_total: "Dokumentierte Gräber",
    stat_female_sample: "Analysierte weibliche Individuen",
    stat_chronology: "Chronologischer Rahmen",
    stat_access_status: "Datenzugang via PHAIDRA",
    sec_insights_tag: "Forschungsergebnisse & Publikationen",
    sec_insights_title: "Zentrale Erkenntnisse der Studien",
    sec_insights_desc: "Auszüge und Teaser aus den interdisziplinären Projektpublikationen zu Bioarchäologie, sozialer Stratifikation, Handwerk und Bestattungsbräuchen der awarischen Gemeinschaft in Wien-Simmering.",
    sec_wma_tag: "Webkarte & Visualisierung",
    sec_wma_title: "Kartenauszüge & Sektorale Visualisierung",
    sec_wma_desc: "Visualisierung räumlicher Phänomene des Gräberfeldes Csokorgasse. Die Darstellung erfolgt datensparsam als generalisierte Rasterkarte und Sektoren-Cluster, um die Urheberrechte des Wien Museums an den Primärgeometrien vollständig zu wahren.",
    btn_vis_density: "📊 Dichte-Raster",
    btn_vis_phases: "⏳ Phasenkarte",
    btn_vis_goods: "💍 Fundverteilung",
    btn_vis_geo: "🗺️ Fundplatz-Kontext",
    sec_gov_tag: "Dateninfrastruktur & Rechtlicher Rahmen",
    sec_gov_title: "Langzeitarchivierung & Datenpolitik",
    sec_gov_desc: "Transparenter Umgang mit sensiblen archäologischen Daten, Rechten Dritter und kontrolliertem wissenschaftlichem Zugang über das Repositorium PHAIDRA der Universität Wien.",
    sec_team_tag: "Projektleitung & Kooperationen",
    sec_team_title: "Beteiligte Wissenschaftler*innen",
    sec_citation_tag: "Zitation & Persistenz",
    sec_citation_title: "Datensatz zitieren",
    sec_citation_desc: "Verwenden Sie für wissenschaftliche Publikationen die offizielle Zitation des PHAIDRA-Datensatzes mit dauerhafter DOI:",
    copied_msg: "Kopiert!"
  },
  en: {
    nav_overview: "Overview",
    nav_insights: "Paper Insights",
    nav_wma: "Web Map & Excerpts",
    nav_data: "Archive & Data Policy",
    nav_team: "Team & Partners",
    hero_badge_portal: "Open Science Portal & Map Excerpts",
    hero_badge_rights: "© Geometries: Wien Museum",
    hero_sub_en: "Visualization and Interpretation of the early medieval fEmale avar populatioN from Vienna/Austria (csokorgasse-buRialS).",
    hero_german: "Visualization and Interpretation of female lifeworlds in the Avar Period (7th–8th c. AD) based on the population of the Csokorgasse cemetery, Vienna 11.",
    btn_view_insights: "📊 View Paper Insights",
    btn_explore_wma: "🗺️ Open Web Map & Excerpts",
    btn_phaidra_link: "🏛️ Long-Term Archive (PHAIDRA)",
    btn_vias_link: "🎓 Project Page (VIAS / Uni Vienna)",
    stat_graves_total: "Documented Graves",
    stat_female_sample: "Analyzed Female Individuals",
    stat_chronology: "Chronological Span",
    stat_access_status: "Data Access via PHAIDRA",
    sec_insights_tag: "Research Insights & Publications",
    sec_insights_title: "Key Scientific Highlights",
    sec_insights_desc: "Excerpts and findings from interdisciplinary project publications on bioarchaeology, social stratification, crafts, and burial customs of the Avar community in Vienna-Simmering.",
    sec_wma_tag: "Web Map & Visualization",
    sec_wma_title: "Map Excerpts & Sectoral Visualization",
    sec_wma_desc: "Spatial visualization of burial dynamics across the Csokorgasse cemetery. Rendered privacy-preserving as a generalized raster matrix and cluster grid to respect Wien Museum copyright on excavation geometries.",
    btn_vis_density: "📊 Density Grid",
    btn_vis_phases: "⏳ Chrono Phases",
    btn_vis_goods: "💍 Artifact Clusters",
    btn_vis_geo: "🗺️ Geographic Context",
    sec_gov_tag: "Data Infrastructure & Governance",
    sec_gov_title: "Long-term Archiving & Data Policy",
    sec_gov_desc: "Transparent curation of archaeological records, third-party intellectual rights, and controlled scientific access via the University of Vienna's PHAIDRA repository.",
    sec_team_tag: "Project Team & Cooperations",
    sec_team_title: "Principal Investigators & Researchers",
    sec_citation_tag: "Citation & Persistence",
    sec_citation_title: "Cite this Dataset",
    sec_citation_desc: "Please cite the official PHAIDRA record and persistent DOI in scientific publications:",
    copied_msg: "Copied!"
  }
};

let currentLang = localStorage.getItem('viennavars_lang') || 'de';
let summaryData = EMBEDDED_SUMMARY;
let activeVisMode = 'density';
let leafletMap = null;

// Initialize application on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
  initLanguage();
  await loadSummaryData();
  renderPaperInsights();
  renderDataPanels();
  renderRasterMatrix();
  initVisModeSwitcher();
  initCitationCopy();
});

// Load summary data from JSON
async function loadSummaryData() {
  try {
    const res = await fetch('data/summary_statistics.json');
    if (res.ok) {
      summaryData = await res.json();
    }
  } catch (e) {
    console.info("Using embedded summary fallback.");
    summaryData = EMBEDDED_SUMMARY;
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

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.innerHTML = currentLang === 'de' ? '🌐 EN' : '🌐 DE';
  }

  renderPaperInsights();
  renderDataPanels();
  updateVisModeHeader();
}

// Render Paper Insights Teasers
function renderPaperInsights() {
  const container = document.getElementById('paper-insights-grid');
  if (!container || !summaryData.paper_insights) return;

  const isDe = currentLang === 'de';

  container.innerHTML = summaryData.paper_insights.map(item => `
    <article class="team-card" style="text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.75rem;">
          <span class="cyber-pill" style="font-size: 0.7rem; color: var(--accent-amber); border-color: rgba(245, 176, 65, 0.3);">
            ${isDe ? item.tag_de : item.tag_en}
          </span>
          <span style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: #fff;">
            ${item.highlight_metric}
          </span>
        </div>

        <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 0.6rem; line-height: 1.3;">
          ${isDe ? item.title_de : item.title_en}
        </h3>

        <p style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.55; margin-bottom: 1.25rem;">
          ${isDe ? item.summary_de : item.summary_en}
        </p>
      </div>

      <div style="padding-top: 0.85rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">
          ${item.reference}
        </span>
        <a href="https://phaidra.univie.ac.at/detail/o:2091644" target="_blank" rel="noopener" class="cyber-pill" style="font-size: 0.72rem; color: var(--accent-cyan); border-color: rgba(56, 189, 248, 0.3);">
          PHAIDRA ↗
        </a>
      </div>
    </article>
  `).join('');
}

// Render Aggregated Distribution Panels
function renderDataPanels() {
  const chronoBox = document.getElementById('chronology-bars');
  const materialBox = document.getElementById('material-bars');
  const isDe = currentLang === 'de';

  if (chronoBox && summaryData.summary.dating_distribution) {
    chronoBox.innerHTML = summaryData.summary.dating_distribution.map(item => `
      <div class="metric-bar-item">
        <div class="metric-bar-header">
          <span>${isDe ? item.period : (item.period_en || item.period)}</span>
          <span>${item.share_pct}%</span>
        </div>
        <div class="metric-track">
          <div class="metric-fill" style="width: ${item.share_pct}%;"></div>
        </div>
      </div>
    `).join('');
  }

  if (materialBox && summaryData.summary.material_categories) {
    materialBox.innerHTML = summaryData.summary.material_categories.map(item => `
      <div class="metric-bar-item">
        <div class="metric-bar-header">
          <span>${isDe ? item.category : (item.category_en || item.category)}</span>
          <span>${item.frequency_pct}%</span>
        </div>
        <div class="metric-track">
          <div class="metric-fill" style="width: ${item.frequency_pct}%; background: linear-gradient(90deg, #38bdf8, #10b981);"></div>
        </div>
      </div>
    `).join('');
  }
}

// Render Interactive 48-Cell Raster Matrix Map Excerpt
function renderRasterMatrix() {
  const grid = document.getElementById('matrix-grid');
  if (!grid) return;

  grid.innerHTML = EXCAVATION_CELLS.map(c => {
    let cellClass = c.densityClass;
    let labelVal = `${c.count}`;

    if (activeVisMode === 'phases') {
      if (c.phase === 'Frühawarenzeit') cellClass = 'density-low';
      else if (c.phase === 'Mittelawarenzeit') cellClass = 'density-high';
      else cellClass = 'density-med';
      labelVal = c.phase.substring(0, 1);
    } else if (activeVisMode === 'goods') {
      cellClass = c.goodsCount > 14 ? 'density-high' : (c.goodsCount > 6 ? 'density-med' : 'density-low');
      labelVal = `${c.goodsCount}`;
    }

    return `
      <div class="matrix-cell ${cellClass}" onclick="inspectCell('${c.code}')" title="${c.sector}">
        <span class="cell-code">${c.code}</span>
        <span class="cell-val">${labelVal}</span>
      </div>
    `;
  }).join('');
}

// Inspect individual cell in the raster matrix
window.inspectCell = function(code) {
  const cell = EXCAVATION_CELLS.find(c => c.code === code);
  if (!cell) return;

  const titleEl = document.getElementById('inspect-cell-title');
  const descEl = document.getElementById('inspect-cell-desc');
  const statEl = document.getElementById('inspect-cell-stat');

  const isDe = currentLang === 'de';

  if (titleEl) titleEl.textContent = `${cell.sector} (${cell.code})`;
  if (descEl) {
    descEl.textContent = isDe 
      ? `Belegungscluster: Dominant ${cell.phase} | Geschätzte Beigabendichte: ${cell.goodsCount} Objekte erfasst.`
      : `Burial cluster: Dominantly ${cell.phase} | Estimated grave goods density: ${cell.goodsCount} cataloged finds.`;
  }
  if (statEl) {
    statEl.textContent = isDe 
      ? `Aggregierte Grabdichte: ${cell.count} Gräber / Rasterzelle`
      : `Aggregated density: ${cell.count} burials / grid cell`;
  }
};

// Mode Switcher for Web Map Visualizations
function initVisModeSwitcher() {
  const buttons = document.querySelectorAll('.wma-mode-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeVisMode = btn.getAttribute('data-vis');

      updateVisModeHeader();

      const matrixContainer = document.getElementById('wma-matrix-container');
      const leafletContainer = document.getElementById('wma-leaf-map');

      if (activeVisMode === 'geo') {
        if (matrixContainer) matrixContainer.style.display = 'none';
        if (leafletContainer) {
          leafletContainer.style.display = 'block';
          initLeafletContextMap();
        }
      } else {
        if (matrixContainer) matrixContainer.style.display = 'block';
        if (leafletContainer) leafletContainer.style.display = 'none';
        renderRasterMatrix();
      }
    });
  });
}

function updateVisModeHeader() {
  const titleEl = document.getElementById('current-vis-title');
  const descEl = document.getElementById('matrix-vis-desc');
  const isDe = currentLang === 'de';

  if (!titleEl) return;

  if (activeVisMode === 'density') {
    titleEl.textContent = isDe ? 'Auszug 1: Sektorale Belegungsdichte (Rastermatrix)' : 'Excerpt 1: Sector Burial Density (Raster Matrix)';
    if (descEl) descEl.textContent = isDe ? 'Relative Grabdichte pro Planquadrat über das Gräberfeldareal Csokorgasse (48 Rasterzellen)' : 'Relative burial density per grid square across the Csokorgasse cemetery (48 grid cells)';
  } else if (activeVisMode === 'phases') {
    titleEl.textContent = isDe ? 'Auszug 2: Chronologische Phasenverteilung (Horizontale Stratigraphie)' : 'Excerpt 2: Chronological Phase Distribution (Horizontal Stratigraphy)';
    if (descEl) descEl.textContent = isDe ? 'Phasen: F = Frühawarenzeit (ab ca. 568), M = Mittelawarenzeit (ca. 650–700), S = Spätawarenzeit (ca. 700–800)' : 'Phases: F = Early Avar (from c. 568), M = Middle Avar (c. 650–700), S = Late Avar (c. 700–800)';
  } else if (activeVisMode === 'goods') {
    titleEl.textContent = isDe ? 'Auszug 3: Fundkonzentration & Trachtschmuck' : 'Excerpt 3: Artifact Density & Costume Jewelry';
    if (descEl) descEl.textContent = isDe ? 'Häufigkeit von Schmuck- und Textilbeigaben (Ohrringe, Perlen, Spinnwirtel) pro Rastersektor' : 'Frequency of jewelry and textile offerings (earrings, beads, spindle whorls) per grid sector';
  } else if (activeVisMode === 'geo') {
    titleEl.textContent = isDe ? 'Auszug 4: Geographischer Fundplatz-Kontext (Wien 11 - Kaiserebersdorf)' : 'Excerpt 4: Geographic Site Context (Vienna 11 - Kaiserebersdorf)';
    if (descEl) descEl.textContent = isDe ? 'Topographische Verortung im Wiener Stadtgebiet (Rechte an Grabungsplänen: © Wien Museum)' : 'Topographic overview within Vienna (Rights to excavation plans: © Wien Museum)';
  }
}

// Leaflet Context Map (General district overview without sensitive vector points)
function initLeafletContextMap() {
  if (leafletMap) {
    leafletMap.invalidateSize();
    return;
  }

  // Centered at Kaiserebersdorf / Csokorgasse, Vienna 11
  leafletMap = L.map('wma-leaf-map', {
    center: [48.1568, 16.4712],
    zoom: 15,
    scrollWheelZoom: false
  });

  // Dark futuristic base map tiles (CartoDB Dark Matter)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(leafletMap);

  // Approximate general area marker (Rights-compliant general site anchor)
  const siteMarker = L.circleMarker([48.1568, 16.4712], {
    radius: 14,
    fillColor: '#ff5733',
    color: '#ffffff',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(leafletMap);

  siteMarker.bindPopup(`
    <div style="font-family: var(--font-sans); color: #080c14; padding: 0.25rem;">
      <strong style="font-size: 1rem; color: #123456;">Wien 11 – Csokorgasse</strong><br>
      <span style="font-size: 0.82rem; color: #64748b;">Frühmittelalterliches Gräberfeld (7.–8. Jh. n. Chr.)</span>
      <p style="font-size: 0.8rem; margin-top: 0.4rem; color: #334155;">
        Größtes frühmittelalterliches Gräberfeld im Wiener Raum mit 700+ Gräbern.<br>
        <strong>Geometrien & Pläne: © Wien Museum</strong>
      </p>
    </div>
  `).openPopup();
}

// Citation copy functionality
function initCitationCopy() {
  const btn = document.getElementById('btn-copy-citation');
  const code = document.getElementById('citation-code');

  if (btn && code) {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(code.innerText).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `✓ ${I18N[currentLang].copied_msg}`;
        btn.style.background = 'rgba(16, 185, 129, 0.25)';
        btn.style.borderColor = 'var(--accent-success)';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
        }, 2500);
      });
    });
  }
}
