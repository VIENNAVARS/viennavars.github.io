/**
 * VIENNAVARS - Open Research Data & Progressive WMA Portal
 * Language: English Only
 * Tile Service: basemap.at (Magistrat der Stadt Wien / geoland.at)
 * Spatial Excavation Plans: © Wien Museum
 */

// Embedded Fallback Paper Insights
const EMBEDDED_INSIGHTS = [
  {
    "id": "insight-bioarch",
    "tag": "Anthropology & Skeletal Health",
    "title": "Demography, Stature & Physiological Stress",
    "highlight_metric": "158.4 cm",
    "summary": "Bioarchaeological investigation of adult female skeletons demonstrates an average body height of 158.4 cm reflecting clear sexual dimorphism. Linear enamel hypoplasias (LEH) indicate recurrent systemic childhood stress between ages 2 and 4, followed by physiological recovery.",
    "reference": "Kirchengast, Bühler & Hagmann (2026, Nature & Anthropology)"
  },
  {
    "id": "insight-status",
    "tag": "Material Culture & Craft",
    "title": "Prestige Adornment & Socio-Economic Status",
    "highlight_metric": "68%",
    "summary": "High-prestige female burials are identified by gilded bronze and silver earrings (with polyhedral and grape pendants) paired with multi-strand imported bead necklaces. Spindle whorls in nearly one-third of female graves emphasize the prominent role of textile production.",
    "reference": "Bühler & Kirchengast (2022, Acta Archaeologica)"
  },
  {
    "id": "insight-spatial",
    "tag": "Spatial Dynamics & Stratigraphy",
    "title": "Horizontal Stratigraphy Across 3m Hexbins",
    "highlight_metric": "3m Hexagons",
    "summary": "Spatial binning into 3-meter cells captures the chronological progression from the Early Avar horizon (568–650) through the Middle Avar peak (650–700) to the Late Avar period (700–800), delineating kin-group cluster ribbons while respecting data privacy.",
    "reference": "VIENNAVARS Spatial Dynamics Series"
  }
];

// Global State
let publicationsList = [];
let pubSearchQuery = '';

// WMA State
let wmaMap = null;
let wmaBaseLayers = {};
let wmaGeoLayers = {};
let activeHexLayerName = 'all';
let showBoundary = true;
let currentBasemap = 'grau';

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initPublicationsData();
  renderPaperInsights();
  renderPublications();
  initPublicationSearch();
  initGisWma();
  initCitationCopy();
});

// Initialize Publications Data from Embedded Engine
function initPublicationsData() {
  if (window.CSOKORGASSE_DATA && window.CSOKORGASSE_DATA.publications) {
    publicationsList = window.CSOKORGASSE_DATA.publications;
  } else {
    // Robust local fallback if script tag failed
    publicationsList = [
      {
        "id": "kirchengast-2026a",
        "authors": "Kirchengast, Sylvia, Birgit Bühler, and Dominik Hagmann",
        "year": 2026,
        "title": "Sexual Dimorphism in the Association between Status Symbols and Body Height in the Early Medieval Avar Population from the Csokorgasse Burial Ground (Vienna, Austria)",
        "journal": "Nature & Anthropology",
        "volume": "4 (1): 10004",
        "doi": "10.70322/natanthropol.2026.10004",
        "url": "https://doi.org/10.70322/natanthropol.2026.10004",
        "open_access": true,
        "highlight": true
      },
      {
        "id": "kirchengast-2026b",
        "authors": "Kirchengast, Sylvia, Birgit Bühler, and Dominik Hagmann",
        "year": 2026,
        "title": "Social status and body are significantly related among males but not among females in an Early Medieval Avar population",
        "journal": "Anthropologiai Közlemények",
        "volume": "79",
        "doi": "10.20330/AnthropKozl.2026.67s.79",
        "url": "https://doi.org/10.20330/AnthropKozl.2026.67s.79",
        "open_access": true,
        "highlight": true
      },
      {
        "id": "baron-2018",
        "authors": "Baron, Henriette",
        "year": 2018,
        "title": "Quasi liber et pictura: Die Tierknochenfunde aus dem Gräberfeld an der Wiener Csokorgasse – eine anthrozoologische Studie zu den awarischen Bestattungssitten",
        "journal": "Monographien des RGZM 143 (Open-Access Propylaeum 2024)",
        "volume": "Mainz / Heidelberg",
        "doi": "10.11588/propylaeum.1393",
        "url": "https://doi.org/10.11588/propylaeum.1393",
        "open_access": true,
        "highlight": true
      }
    ];
  }
}

// Render Paper Insights in Section 02
function renderPaperInsights() {
  const container = document.getElementById('paper-insights-target');
  if (!container) return;

  container.innerHTML = EMBEDDED_INSIGHTS.map(item => `
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
    if (!query) return true;
    const matchAuthors = (item.authors || '').toLowerCase().includes(query);
    const matchTitle = (item.title || '').toLowerCase().includes(query);
    const matchJournal = (item.journal || '').toLowerCase().includes(query);
    const matchYear = String(item.year || '').includes(query);
    const matchDoi = (item.doi || '').toLowerCase().includes(query);
    return matchAuthors || matchTitle || matchJournal || matchYear || matchDoi;
  });

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${publicationsList.length} articles`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); font-family: var(--font-mono);">
        No publication matched your search query. Try a different author, keyword, or year.
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(pub => {
    const hasDoi = Boolean(pub.doi);
    const primaryUrl = hasDoi ? `https://doi.org/${pub.doi}` : (pub.url || '#');
    const buttonLabel = hasDoi ? `DOI: ${pub.doi} ↗` : (pub.year < 2000 ? 'PHAIDRA Record ↗' : 'Open Access PDF ↗');

    return `
      <article class="pub-card ${pub.highlight ? 'pub-highlight' : ''}">
        <div>
          <div class="pub-card-top">
            <span class="pub-badge-year">${pub.year}</span>
            ${pub.open_access ? '<span class="pub-badge-oa">Open Access</span>' : ''}
          </div>

          <h3 class="pub-title">
            <a href="${primaryUrl}" target="_blank" rel="noopener">${pub.title}</a>
          </h3>

          <div class="pub-authors">${pub.authors}</div>

          <div class="pub-journal">
            ${pub.journal}${pub.volume ? ` · ${pub.volume}` : ''}
          </div>
        </div>

        <div class="pub-bottom-actions">
          <a href="${primaryUrl}" target="_blank" rel="noopener" class="pub-link-btn" title="Open scientific publication">
            ${buttonLabel}
          </a>
        </div>
      </article>
    `;
  }).join('');
}

// Live Search Listener
function initPublicationSearch() {
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

  // Load GIS Layers directly from embedded engine (instant, zero CORS)
  loadGisLayers();
}

function loadGisLayers() {
  const data = window.CSOKORGASSE_DATA;

  if (data && data.boundary && data.hex_all) {
    // 1. Boundary Layer (friedhof_huelle)
    wmaGeoLayers.boundary = L.geoJSON(data.boundary, {
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
    wmaGeoLayers.all = L.geoJSON(data.hex_all, {
      style: styleHexFeature,
      onEachFeature: attachHexInteractions
    }).addTo(wmaMap);

    // 3. Female Hexbins Layer (182 cells)
    wmaGeoLayers.female = L.geoJSON(data.hex_female, {
      style: styleHexFeature,
      onEachFeature: attachHexInteractions
    });

    // 4. Male Hexbins Layer (178 cells)
    wmaGeoLayers.male = L.geoJSON(data.hex_male, {
      style: styleHexFeature,
      onEachFeature: attachHexInteractions
    });

    // Fit map view tightly to cemetery boundary
    if (wmaGeoLayers.boundary.getBounds().isValid()) {
      wmaMap.fitBounds(wmaGeoLayers.boundary.getBounds(), {
        padding: [30, 30],
        maxZoom: 19
      });
    }

    updateMapStatusPill();
    wireLayerToggles();
  } else {
    // Attempt fallback via fetch if opened over HTTP
    fetchFallbackGisLayers();
  }
}

async function fetchFallbackGisLayers() {
  try {
    const [allRes, femaleRes, maleRes, boundaryRes] = await Promise.all([
      fetch('data/hex_chronology_all.geojson').then(r => r.json()),
      fetch('data/hex_chronology_female.geojson').then(r => r.json()),
      fetch('data/hex_chronology_male.geojson').then(r => r.json()),
      fetch('data/cemetery_boundary.geojson').then(r => r.json())
    ]);

    wmaGeoLayers.boundary = L.geoJSON(boundaryRes, {
      style: { color: '#e2e8f0', weight: 2, dashArray: '5, 5', opacity: 0.9, fillColor: '#38bdf8', fillOpacity: 0.04 }
    }).addTo(wmaMap);

    wmaGeoLayers.all = L.geoJSON(allRes, { style: styleHexFeature, onEachFeature: attachHexInteractions }).addTo(wmaMap);
    wmaGeoLayers.female = L.geoJSON(femaleRes, { style: styleHexFeature, onEachFeature: attachHexInteractions });
    wmaGeoLayers.male = L.geoJSON(maleRes, { style: styleHexFeature, onEachFeature: attachHexInteractions });

    if (wmaGeoLayers.boundary.getBounds().isValid()) {
      wmaMap.fitBounds(wmaGeoLayers.boundary.getBounds(), { padding: [30, 30], maxZoom: 19 });
    }

    updateMapStatusPill();
    wireLayerToggles();
  } catch (err) {
    console.error("GIS vector loading error:", err);
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
    fillOpacity: 0.72,
    color: '#05080f',
    weight: 1.2,
    opacity: 0.95
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

// Update the Active Hexbin Inspector
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
    phaseText = 'Mixed Horizon (Tie)';
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
        showBoundary = !showBoundary;
        if (showBoundary) {
          btn.classList.add('active');
          if (wmaGeoLayers.boundary) wmaGeoLayers.boundary.addTo(wmaMap);
        } else {
          btn.classList.remove('active');
          if (wmaGeoLayers.boundary) wmaMap.removeLayer(wmaGeoLayers.boundary);
        }
      } else {
        if (layerKey === activeHexLayerName) return;

        layerButtons.forEach(b => {
          if (b.getAttribute('data-layer') !== 'boundary') {
            b.classList.remove('active');
          }
        });
        btn.classList.add('active');

        if (wmaGeoLayers[activeHexLayerName]) {
          wmaMap.removeLayer(wmaGeoLayers[activeHexLayerName]);
        }

        activeHexLayerName = layerKey;
        if (wmaGeoLayers[activeHexLayerName]) {
          wmaGeoLayers[activeHexLayerName].addTo(wmaMap);
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
