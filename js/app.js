/**
 * VIENNAVARS - Open Research Data & Hexbin Visualization Engine
 * Language: English Only
 * Tile Service: basemap.at (Magistrat der Stadt Wien / geoland.at)
 * Spatial Excavation Plans: © Wien Museum
 */

// Embedded Fallback Data for Paper Insights and Publication Plates
const EMBEDDED_DATA = {
  "paper_insights": [
    {
      "id": "insight-bioarch",
      "tag": "Anthropology & Lifeworlds",
      "title": "Demography, Stature & Physiological Childhood Stress",
      "highlight_metric": "158.4 cm",
      "metric_label": "Mean female body height",
      "summary": "Bioarchaeological assessment of female skeletons reveals a mean stature of 158.4 cm reflecting distinct sexual dimorphism. Linear enamel hypoplasias (LEH) on permanent dentition indicate recurrent physiological stress episodes during early childhood (ages 2–4), with stabilization in adolescence.",
      "reference": "Kirchengast, Bühler & Hagmann (2026, Nature & Anthropology)"
    },
    {
      "id": "insight-status",
      "tag": "Material Culture & Social Stratification",
      "title": "Costume Jewelry & Crafts as Markers of Social Status",
      "highlight_metric": "68%",
      "metric_label": "Burials with jewelry offerings",
      "summary": "The association of gilded bronze and silver earrings (with polyhedral and grape pendants) with multi-strand imported glass bead necklaces demonstrates pronounced hierarchical differentiation. Spindle whorls in nearly one-third of female graves emphasize the socio-economic status of textile production.",
      "reference": "Bühler & Kirchengast (2022, Acta Archaeologica)"
    },
    {
      "id": "insight-spatial",
      "tag": "Spatial Organization & Hexbin Mapping",
      "title": "Horizontal Stratigraphy & Spatial Trajectories",
      "highlight_metric": "3m Hexbins",
      "metric_label": "Spatial resolution",
      "summary": "Hexagonal spatial binning (3-meter cell size) captures horizontal cemetery stratigraphy from the Early Avar period through the Middle Avar peak into the Late Avar period. Burial concentrations follow distinct linear ribbons, pointing to kin-group plots without disclosing individual coordinate points.",
      "reference": "Hagmann (2026, CAA International Conference)"
    }
  ],
  "plates": {
    "SP04": {
      "file": "assets/maps/SP04_Hex_Chronologie_Gesamt.png",
      "title": "SP04 · Overall Chronology in 3-Meter Hexagons (Gesamtbelegung)",
      "desc": "Spatial distribution of chronological phases across the entire cemetery using 3-meter hexagonal tessellation. Each cell represents the dominant dated phase among documented burials."
    },
    "SP03": {
      "file": "assets/maps/SP03_Hex_Chronologie_nach_Geschlecht.png",
      "title": "SP03 · Chronology in 3-Meter Hexagons by Sex (Male vs. Female)",
      "desc": "Comparative hexagonal binning of male and female spatial trajectories, illuminating gendered cemetery growth and shared burial plots over time."
    },
    "SP06": {
      "file": "assets/maps/SP06_Status_Chronologie_Female.png",
      "title": "SP06 · Female Lifeworlds: Social Status and Chronology (n=166 Females)",
      "desc": "Comprehensive cartographic synthesis of 166 adult female burials, cross-referencing grave good status categories with chronological horizon and spatial clusters."
    },
    "SP01": {
      "file": "assets/maps/SP01_Status_nach_Geschlecht.png",
      "title": "SP01 · Social Status by Sex Across the Adult Population (n=348 Adults)",
      "desc": "Comparative distribution of social status indicators across 348 adult individuals (166 females, 182 males) across the Csokorgasse burial ground."
    },
    "SP05": {
      "file": "assets/maps/SP05_Belegung_Vorhandene_Huellen.png",
      "title": "SP05 · Cemetery Extent & Chronological Convex Hulls",
      "desc": "Descriptive spatial enclosures and boundary sectors of the cemetery phases. Hulls serve as analytical cluster boundaries without disclosing trench boundaries."
    }
  }
};

// Global App State
let appData = EMBEDDED_DATA;
let publicationsList = [];
let activePubFilter = 'all';
let pubSearchQuery = '';

// WMA State
let wmaMap = null;
let wmaBaseLayers = {};
let wmaGeoLayers = {};
let activeHexLayerName = 'all';
let showBoundary = true;
let currentBasemap = 'grau';
let hoveredLayer = null;

// DOM Initialization
document.addEventListener('DOMContentLoaded', async () => {
  await loadSummaryData();
  await loadPublicationsData();
  renderPaperInsights();
  renderPublications();
  initPublicationSearchAndFilters();
  initGisWma();
  initPlateLightbox();
  initCitationCopy();
});

// Fetch summary_statistics.json with fallback
async function loadSummaryData() {
  try {
    const res = await fetch('data/summary_statistics.json');
    if (res.ok) {
      const json = await res.json();
      appData = { ...EMBEDDED_DATA, ...json };
    }
  } catch (err) {
    console.info("Using embedded summary fallback.");
  }
}

// Fetch publications.json with fallback
async function loadPublicationsData() {
  try {
    const res = await fetch('data/publications.json');
    if (res.ok) {
      publicationsList = await res.json();
      return;
    }
  } catch (err) {
    console.warn("Could not load publications.json, using fallback.");
  }

  // Fallback publication list if offline
  publicationsList = [
    {
      "id": "kirchengast-2026a",
      "category": "project_core",
      "authors": "Kirchengast, Sylvia, Birgit Bühler, and Dominik Hagmann",
      "year": 2026,
      "title": "Sexual Dimorphism in the Association between Status Symbols and Body Height in the Early Medieval Avar Population from the Csokorgasse Burial Ground (Vienna, Austria)",
      "journal": "Nature & Anthropology 4 (1): 10004",
      "doi": "10.70322/natanthropol.2026.10004",
      "url": "https://doi.org/10.70322/natanthropol.2026.10004",
      "open_access": true,
      "highlight": true
    },
    {
      "id": "kirchengast-2026b",
      "category": "project_core",
      "authors": "Kirchengast, Sylvia, Birgit Bühler, and Dominik Hagmann",
      "year": 2026,
      "title": "Social status and body are significantly related among males but not among females in an Early Medieval Avar population",
      "journal": "Anthropologiai Közlemények 79",
      "doi": "10.20330/AnthropKozl.2026.67s.79",
      "url": "https://doi.org/10.20330/AnthropKozl.2026.67s.79",
      "open_access": true,
      "highlight": true
    },
    {
      "id": "baron-2018",
      "category": "project_core",
      "authors": "Baron, Henriette",
      "year": 2018,
      "title": "Quasi liber et pictura: Die Tierknochenfunde aus dem Gräberfeld an der Wiener Csokorgasse – eine anthrozoologische Studie zu den awarischen Bestattungssitten",
      "journal": "Monographien des RGZM 143 (Open Access Propylaeum 2024)",
      "doi": "10.11588/propylaeum.1393",
      "url": "https://doi.org/10.11588/propylaeum.1393",
      "open_access": true,
      "highlight": true
    }
  ];
}

// Render Paper Insights in Section 01
function renderPaperInsights() {
  const container = document.getElementById('paper-insights-target') || document.getElementById('paper-insights-container');
  if (!container || !appData.paper_insights) return;

  container.innerHTML = appData.paper_insights.map(item => `
    <article class="insight-card">
      <div>
        <div class="insight-header">
          <span class="cyber-pill" style="font-size: 0.72rem; color: var(--accent-amber); border-color: rgba(248, 184, 56, 0.3);">
            ${item.tag}
          </span>
          <span class="insight-metric">
            ${item.highlight_metric}
          </span>
        </div>

        <h3 class="insight-title">${item.title}</h3>
        <p class="insight-body">${item.summary}</p>
      </div>

      <div class="insight-footer">
        <span>${item.reference}</span>
        <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.75rem;">Peer-Reviewed</span>
      </div>
    </article>
  `).join('');
}

// Render Publications Grid in Section 04
function renderPublications() {
  const grid = document.getElementById('publications-grid');
  const countEl = document.getElementById('pub-count-status');
  if (!grid) return;

  const query = pubSearchQuery.trim().toLowerCase();

  const filtered = publicationsList.filter(item => {
    // Category match
    if (activePubFilter !== 'all' && item.category !== activePubFilter) {
      return false;
    }
    // Search query match
    if (query) {
      const matchAuthors = (item.authors || '').toLowerCase().includes(query);
      const matchTitle = (item.title || '').toLowerCase().includes(query);
      const matchJournal = (item.journal || '').toLowerCase().includes(query);
      const matchYear = String(item.year || '').includes(query);
      if (!matchAuthors && !matchTitle && !matchJournal && !matchYear) {
        return false;
      }
    }
    return true;
  });

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${publicationsList.length} articles`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); font-family: var(--font-mono);">
        No publication matched your filter criteria. Try searching for a different author or keyword.
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(pub => {
    const isCore = pub.category === 'project_core';
    const catLabel = isCore ? 'Csokorgasse Core' : 'Methods & AI';
    const linkUrl = pub.url || (pub.doi ? `https://doi.org/${pub.doi}` : '#');
    const hasDoi = Boolean(pub.doi);

    return `
      <article class="pub-card ${pub.highlight ? 'pub-highlight' : ''}">
        <div>
          <div class="pub-card-top">
            <span class="pub-badge-year">${pub.year}</span>
            <div style="display: flex; gap: 0.4rem; align-items: center;">
              <span class="pub-badge-cat">${catLabel}</span>
              ${pub.open_access ? '<span class="pub-badge-oa">Open Access</span>' : ''}
            </div>
          </div>

          <h3 class="pub-title">
            <a href="${linkUrl}" target="_blank" rel="noopener">${pub.title}</a>
          </h3>

          <div class="pub-authors">${pub.authors}</div>

          <div class="pub-journal">
            ${pub.journal}${pub.volume ? ` · ${pub.volume}` : ''}
          </div>
        </div>

        <div class="pub-bottom-actions">
          <div style="font-family: var(--font-mono); font-size: 0.73rem; color: var(--text-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
            ${pub.doi ? `DOI: ${pub.doi}` : (pub.volume || '')}
          </div>

          <a href="${linkUrl}" target="_blank" rel="noopener" class="pub-link-btn">
            ${hasDoi ? 'Direct DOI ↗' : 'Access Article ↗'}
          </a>
        </div>
      </article>
    `;
  }).join('');
}

// Publications Filters & Search Listeners
function initPublicationSearchAndFilters() {
  const filterBtns = document.querySelectorAll('.pub-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePubFilter = btn.getAttribute('data-filter');
      renderPublications();
    });
  });

  const searchInput = document.getElementById('pub-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      pubSearchQuery = e.target.value;
      renderPublications();
    });
  }
}

// =========================================================================
// Real Geospatial Web Map Application (WMA) on basemap.at
// =========================================================================

function initGisWma() {
  const mapContainer = document.getElementById('gis-wma-map');
  if (!mapContainer) return;

  // Center coordinate of Vienna 11 - Csokorgasse burial ground
  const centerLat = 48.15269;
  const centerLng = 16.46775;

  // Initialize Leaflet Map
  wmaMap = L.map('gis-wma-map', {
    center: [centerLat, centerLng],
    zoom: 18,
    minZoom: 14,
    maxZoom: 19,
    scrollWheelZoom: true
  });

  // basemap.at WMTS Tile Layers (TileMatrix: google3857, template: {z}/{y}/{x})
  wmaBaseLayers = {
    grau: L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.basemap.at" target="_blank" rel="noopener">basemap.at</a>'
    }),
    ortho: L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.basemap.at" target="_blank" rel="noopener">basemap.at</a>'
    }),
    standard: L.tileLayer('https://mapsneu.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.basemap.at" target="_blank" rel="noopener">basemap.at</a>'
    })
  };

  // Add default base layer: Grau (Gray)
  wmaBaseLayers.grau.addTo(wmaMap);

  // Wire basemap.at switch buttons
  const basemapButtons = document.querySelectorAll('.basemap-toggle');
  basemapButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetBmap = btn.getAttribute('data-bmap');
      if (targetBmap === currentBasemap) return;

      basemapButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (wmaBaseLayers[currentBasemap]) {
        wmaMap.removeLayer(wmaBaseLayers[currentBasemap]);
      }
      if (wmaBaseLayers[targetBmap]) {
        wmaBaseLayers[targetBmap].addTo(wmaMap);
        currentBasemap = targetBmap;
        updateMapStatusPill();
      }
    });
  });

  // Load GeoJSON Layers
  loadGisLayers();
}

async function loadGisLayers() {
  try {
    const [allRes, femaleRes, maleRes, boundaryRes] = await Promise.all([
      fetch('data/hex_chronology_all.geojson').then(r => r.json()),
      fetch('data/hex_chronology_female.geojson').then(r => r.json()),
      fetch('data/hex_chronology_male.geojson').then(r => r.json()),
      fetch('data/cemetery_boundary.geojson').then(r => r.json())
    ]);

    // 1. Boundary Layer (friedhof_huelle)
    wmaGeoLayers.boundary = L.geoJSON(boundaryRes, {
      style: {
        color: '#e2e8f0',
        weight: 2,
        dashArray: '5, 5',
        opacity: 0.9,
        fillColor: '#38bdf8',
        fillOpacity: 0.04
      }
    }).addTo(wmaMap);

    // 2. All Hexbins Layer (428 cells)
    wmaGeoLayers.all = L.geoJSON(allRes, {
      style: styleHexFeature,
      onEachFeature: attachHexInteractions
    }).addTo(wmaMap);

    // 3. Female Hexbins Layer (182 cells)
    wmaGeoLayers.female = L.geoJSON(femaleRes, {
      style: styleHexFeature,
      onEachFeature: attachHexInteractions
    });

    // 4. Male Hexbins Layer (178 cells)
    wmaGeoLayers.male = L.geoJSON(maleRes, {
      style: styleHexFeature,
      onEachFeature: attachHexInteractions
    });

    // Fit map view to cemetery boundary bounds with padding
    if (wmaGeoLayers.boundary.getBounds().isValid()) {
      wmaMap.fitBounds(wmaGeoLayers.boundary.getBounds(), {
        padding: [35, 35],
        maxZoom: 19
      });
    }

    updateMapStatusPill();
    wireLayerToggles();

  } catch (err) {
    console.error("Failed to load GIS GeoJSON layers:", err);
    const pill = document.getElementById('map-status-pill');
    if (pill) pill.textContent = "basemap.at Grau · Error loading vector layers";
  }
}

// Styling for 3m Hexbin Polygons
function styleHexFeature(feature) {
  const dominant = feature.properties.dominant;
  let fillColor = '#94a3b8';

  if (dominant === 'EAP') {
    fillColor = '#22d3ee'; // Early Avar: Cyan
  } else if (dominant === 'MAP') {
    fillColor = '#ff4d29'; // Middle Avar: Ember / Terracotta
  } else if (dominant === 'LAP') {
    fillColor = '#f8b838'; // Late Avar: Amber / Gold
  } else if (dominant === 'tie') {
    fillColor = '#c084fc'; // Mixed / Tie: Purple
  }

  return {
    fillColor: fillColor,
    fillOpacity: 0.7,
    color: '#05080f',
    weight: 1.2,
    opacity: 0.9
  };
}

// Feature Hover and Click Events
function attachHexInteractions(feature, layer) {
  layer.on({
    mouseover: (e) => {
      const target = e.target;
      target.setStyle({
        weight: 2.8,
        color: '#ffffff',
        fillOpacity: 0.95
      });
      target.bringToFront();
      updateHexInspector(target.feature.properties);
    },
    mouseout: (e) => {
      const target = e.target;
      target.setStyle(styleHexFeature(target.feature));
    },
    click: (e) => {
      const target = e.target;
      const p = target.feature.properties;
      updateHexInspector(p);

      const dominantBadgeColor = p.dominant === 'EAP' ? '#22d3ee' : (p.dominant === 'MAP' ? '#ff4d29' : (p.dominant === 'LAP' ? '#f8b838' : '#c084fc'));
      const dominantLabel = p.dominant === 'EAP' ? 'Early Avar (EAP)' : (p.dominant === 'MAP' ? 'Middle Avar (MAP)' : (p.dominant === 'LAP' ? 'Late Avar (LAP)' : 'Tie / Mixed'));

      const popupContent = `
        <div style="font-family: var(--font-sans); color: #0b1120; min-width: 180px;">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #64748b; text-transform: uppercase;">
            3m Hexagon Cell: <strong>${p.hex_id}</strong>
          </div>
          <div style="margin: 0.4rem 0; font-size: 0.95rem; font-weight: 700; color: ${dominantBadgeColor};">
            ● ${dominantLabel}
          </div>
          <div style="font-size: 0.82rem; color: #334155; line-height: 1.45;">
            Total Burials: <strong>${p.n_total}</strong><br>
            Dated: ${p.n_dated} | Undated: ${p.n_undated}<br>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #64748b;">
              EAP: ${p.n_eap} | MAP: ${p.n_map} | LAP: ${p.n_lap}
            </span>
          </div>
        </div>
      `;

      target.bindPopup(popupContent, { offset: [0, -4] }).openPopup();
    }
  });
}

// Update the active Hexbin Inspector in the sidebar
function updateHexInspector(props) {
  const titleEl = document.getElementById('inspect-title');
  const descEl = document.getElementById('inspect-desc');
  if (!titleEl || !descEl) return;

  const dom = props.dominant;
  let phaseText = 'Undated';
  let badgeColor = 'var(--text-muted)';

  if (dom === 'EAP') {
    phaseText = 'Early Avar Period (c. 568–650 AD)';
    badgeColor = 'var(--accent-cyan)';
  } else if (dom === 'MAP') {
    phaseText = 'Middle Avar Period (c. 650–700 AD)';
    badgeColor = 'var(--accent-ember)';
  } else if (dom === 'LAP') {
    phaseText = 'Late Avar Period (c. 700–800 AD)';
    badgeColor = 'var(--accent-amber)';
  } else if (dom === 'tie') {
    phaseText = 'Mixed Chronological Horizon (Tie)';
    badgeColor = 'var(--accent-purple)';
  }

  const sharePercent = Math.round((props.dominant_share || 0) * 100);

  titleEl.innerHTML = `
    Hexbin <span style="font-family: var(--font-mono); color: var(--accent-amber);">${props.hex_id}</span>
    <span style="display: block; font-size: 0.88rem; font-weight: 600; color: ${badgeColor}; margin-top: 0.2rem;">
      ● Dominant: ${phaseText} (${sharePercent}%)
    </span>
  `;

  descEl.innerHTML = `
    <div class="inspector-stat-grid">
      <div class="inspector-stat-box">
        <span>Total Burials</span>
        <span>${props.n_total}</span>
      </div>
      <div class="inspector-stat-box">
        <span>Dated Burials</span>
        <span>${props.n_dated}</span>
      </div>
      <div class="inspector-stat-box">
        <span>Early Avar (EAP)</span>
        <span style="color: var(--accent-cyan);">${props.n_eap}</span>
      </div>
      <div class="inspector-stat-box">
        <span>Middle Avar (MAP)</span>
        <span style="color: var(--accent-ember);">${props.n_map}</span>
      </div>
      <div class="inspector-stat-box">
        <span>Late Avar (LAP)</span>
        <span style="color: var(--accent-amber);">${props.n_lap}</span>
      </div>
      <div class="inspector-stat-box">
        <span>Undated</span>
        <span style="color: var(--text-dim);">${props.n_undated}</span>
      </div>
    </div>
    <div style="font-size: 0.8rem; color: #94a3b8; line-height: 1.5;">
      Grid indices: q = ${props.q}, r = ${props.r}. Spatial binning aggregates individual burial points to preserve excavation confidentiality (© Wien Museum).
    </div>
  `;
}

// Wire Layer Toggles (All / Female / Male & Boundary)
function wireLayerToggles() {
  const layerButtons = document.querySelectorAll('.btn-layer-chip[data-layer]');
  layerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const layerKey = btn.getAttribute('data-layer');

      if (layerKey === 'boundary') {
        // Toggle Boundary
        showBoundary = !showBoundary;
        if (showBoundary) {
          btn.classList.add('active');
          if (wmaGeoLayers.boundary) wmaGeoLayers.boundary.addTo(wmaMap);
        } else {
          btn.classList.remove('active');
          if (wmaGeoLayers.boundary) wmaMap.removeLayer(wmaGeoLayers.boundary);
        }
      } else {
        // Radio switch among hexbin layers ('all', 'female', 'male')
        if (layerKey === activeHexLayerName) return;

        // Remove active class from hexbin buttons
        layerButtons.forEach(b => {
          if (b.getAttribute('data-layer') !== 'boundary') {
            b.classList.remove('active');
          }
        });
        btn.classList.add('active');

        // Remove previous hexbin layer
        if (wmaGeoLayers[activeHexLayerName]) {
          wmaMap.removeLayer(wmaGeoLayers[activeHexLayerName]);
        }

        // Add new hexbin layer
        activeHexLayerName = layerKey;
        if (wmaGeoLayers[activeHexLayerName]) {
          wmaGeoLayers[activeHexLayerName].addTo(wmaMap);
          // Bring boundary to front if present
          if (showBoundary && wmaGeoLayers.boundary) {
            wmaGeoLayers.boundary.bringToFront();
          }
        }

        updateMapStatusPill();
      }
    });
  });
}

function updateMapStatusPill() {
  const pill = document.getElementById('map-status-pill');
  if (!pill) return;

  const bmapName = currentBasemap === 'grau' ? 'basemap.at Grau' : (currentBasemap === 'ortho' ? 'basemap.at Orthofoto 30cm' : 'basemap.at Standard');
  let layerCount = '428 Hexbins';
  if (activeHexLayerName === 'female') layerCount = '182 Female Hexbins';
  else if (activeHexLayerName === 'male') layerCount = '178 Male Hexbins';

  pill.textContent = `${bmapName} · ${layerCount} Rendered`;
}

// =========================================================================
// Lightbox Modal for 300 DPI Publication Plates
// =========================================================================

window.openPlateLightbox = function(plateKey) {
  const dialog = document.getElementById('plate-lightbox-dialog');
  const imgEl = document.getElementById('lightbox-plate-img');
  const titleEl = document.getElementById('lightbox-plate-title');

  const plateObj = EMBEDDED_DATA.plates[plateKey];
  if (!plateObj || !dialog || !imgEl) return;

  imgEl.src = plateObj.file;
  imgEl.alt = plateObj.title;
  if (titleEl) {
    titleEl.textContent = plateObj.title;
  }

  dialog.showModal();
};

function initPlateLightbox() {
  const dialog = document.getElementById('plate-lightbox-dialog');
  if (dialog) {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  }
}

// =========================================================================
// Citation Copy Terminal
// =========================================================================

function initCitationCopy() {
  const btn = document.getElementById('btn-copy-citation');
  const code = document.getElementById('citation-code');

  if (btn && code) {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(code.innerText).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `✓ Copied!`;
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
