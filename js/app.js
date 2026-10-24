/**
 * VIENNAVARS - Open Research Data & Cemetery Map Portal
 * Language: English
 * Base Map: basemap.at (Magistrat der Stadt Wien / geoland.at) & Dark Canvas
 * Excavation Documentation: © Wien Museum
 * Copyright: © VIENNAVARS
 */

// Global State: Publications
let publicationsList = [];
let pubSearchQuery = '';
let pubDisplayLimit = 3;

// Global State: Web Map Application
let wmaMap = null;
let wmaBaseLayers = {};
let wmaGeoLayers = {};
let activeHexLayerName = 'all'; // 'all' | 'female' | 'male'
let showBoundary = true;
let currentBasemap = 'grau';    // 'none' | 'grau' | 'ortho' | 'standard'
let currentThematicMode = 'chronology'; // 'chronology' | 'density'
let currentPhaseFilter = 'all'; // 'all' | 'EAP' | 'MAP' | 'LAP' | 'tie'
let selectedHexId = null;
let selectedHexLayer = null;

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initPublicationsData();
  renderPublications();
  initPublicationSearch();
  initGisWma();
  initCitationCopy();
});

// Initialize Publications Data from Embedded Engine
function initPublicationsData() {
  if (window.CSOKORGASSE_DATA && window.CSOKORGASSE_DATA.publications) {
    publicationsList = window.CSOKORGASSE_DATA.publications;
  }
}

// Filter Publications
function getFilteredPublications() {
  const query = pubSearchQuery.trim().toLowerCase();
  return publicationsList.filter(item => {
    if (!query) return true;
    const matchAuthors = (item.authors || '').toLowerCase().includes(query);
    const matchTitle = (item.title || '').toLowerCase().includes(query);
    const matchJournal = (item.journal || '').toLowerCase().includes(query);
    const matchYear = String(item.year || '').includes(query);
    const matchDoi = (item.doi || '').toLowerCase().includes(query);
    return matchAuthors || matchTitle || matchJournal || matchYear || matchDoi;
  });
}

// Render Publications Grid (Default: 3 articles with Load More toggle)
function renderPublications() {
  const grid = document.getElementById('publications-grid');
  const countEl = document.getElementById('pub-count-status');
  const actionArea = document.getElementById('publications-action-area');
  if (!grid) return;

  const filtered = getFilteredPublications();
  const isSearching = Boolean(pubSearchQuery.trim());
  const effectiveLimit = isSearching ? filtered.length : pubDisplayLimit;
  const toDisplay = filtered.slice(0, effectiveLimit);

  if (countEl) {
    countEl.textContent = `Showing ${toDisplay.length} of ${filtered.length} publications`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); font-family: var(--font-mono);">
        No publication matched your search query: "<strong>${escapeHtml(pubSearchQuery)}</strong>". Try a different author or year.
      </div>
    `;
    if (actionArea) actionArea.innerHTML = '';
    return;
  }

  grid.innerHTML = toDisplay.map(renderPublicationCard).join('');

  // Handle Load More / Show Less action button
  if (actionArea) {
    if (isSearching || filtered.length <= 3) {
      actionArea.innerHTML = '';
    } else if (pubDisplayLimit < filtered.length) {
      actionArea.innerHTML = `
        <button id="btn-load-more-pubs" class="btn-prog btn-prog-secondary" style="margin: 2rem auto 0 auto; display: inline-flex; align-items: center; gap: 0.5rem;">
          📚 Load More Publications (${filtered.length - pubDisplayLimit} remaining)
        </button>
      `;
      const btn = document.getElementById('btn-load-more-pubs');
      if (btn) {
        btn.addEventListener('click', () => {
          pubDisplayLimit = filtered.length;
          renderPublications();
        });
      }
    } else {
      actionArea.innerHTML = `
        <button id="btn-show-less-pubs" class="btn-prog btn-prog-secondary" style="margin: 2rem auto 0 auto; display: inline-flex; align-items: center; gap: 0.5rem;">
          ▲ Show First 3 Publications
        </button>
      `;
      const btn = document.getElementById('btn-show-less-pubs');
      if (btn) {
        btn.addEventListener('click', () => {
          pubDisplayLimit = 3;
          renderPublications();
          const pubSection = document.getElementById('publications');
          if (pubSection) pubSection.scrollIntoView({ behavior: 'smooth' });
        });
      }
    }
  }
}

// Single Publication Card HTML
function renderPublicationCard(pub) {
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

// Escape HTML utility
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[m]);
}

// =========================================================================
// Interactive Cemetery Map (Optimized Rendering, Density & Phase Filters)
// =========================================================================

function initGisWma() {
  const mapContainer = document.getElementById('gis-wma-map');
  if (!mapContainer) return;

  const centerLat = 48.15269;
  const centerLng = 16.46775;

  // Fractional zoom snapping for seamless bounds fitting without clipping
  wmaMap = L.map('gis-wma-map', {
    center: [centerLat, centerLng],
    zoom: 18.25,
    zoomSnap: 0.1,
    zoomDelta: 0.5,
    minZoom: 15,
    maxZoom: 19.5,
    scrollWheelZoom: true
  });

  // basemap.at WMTS Tile Layers (TileMatrix: google3857)
  wmaBaseLayers = {
    grau: L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png', {
      maxZoom: 19.5,
      attribution: '&copy; <a href="https://www.basemap.at" target="_blank" rel="noopener">basemap.at</a>'
    }),
    ortho: L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg', {
      maxZoom: 19.5,
      attribution: '&copy; <a href="https://www.basemap.at" target="_blank" rel="noopener">basemap.at</a>'
    }),
    standard: L.tileLayer('https://mapsneu.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png', {
      maxZoom: 19.5,
      attribution: '&copy; <a href="https://www.basemap.at" target="_blank" rel="noopener">basemap.at</a>'
    })
  };

  // Add default base layer: Grau (Gray)
  wmaBaseLayers.grau.addTo(wmaMap);

  // Wire controls & load layers
  wireMapControls();
  loadGisLayers();
}

function loadGisLayers() {
  const data = window.CSOKORGASSE_DATA;
  if (!data || !data.boundary || !data.hex_all) return;

  // 1. Boundary Layer (friedhof_huelle)
  wmaGeoLayers.boundary = L.geoJSON(data.boundary, {
    style: {
      color: '#38bdf8',
      weight: 2,
      dashArray: '6, 6',
      opacity: 0.85,
      fillColor: '#38bdf8',
      fillOpacity: 0.03
    }
  }).addTo(wmaMap);

  // 2. All Chronological Phases (428 spatial units)
  wmaGeoLayers.all = L.geoJSON(data.hex_all, {
    style: getSectorStyle,
    onEachFeature: attachHexInteractions
  }).addTo(wmaMap);

  // 3. Female Burials (182 units)
  wmaGeoLayers.female = L.geoJSON(data.hex_female, {
    style: getSectorStyle,
    onEachFeature: attachHexInteractions
  });

  // 4. Male Burials (178 units)
  wmaGeoLayers.male = L.geoJSON(data.hex_male, {
    style: getSectorStyle,
    onEachFeature: attachHexInteractions
  });

  // Fit bounds precisely so the entire cemetery with all northern and southern sectors is visible
  fitCemeteryBounds(false);

  updateMapStatusPill();
  renderDynamicLegend();
}

// Fit cemetery bounds with generous padding so nothing is ever truncated
function fitCemeteryBounds(animated = false) {
  if (!wmaGeoLayers.boundary || !wmaMap) return;
  const bounds = wmaGeoLayers.boundary.getBounds();
  if (bounds && bounds.isValid()) {
    const opts = { padding: [35, 35], maxZoom: 18.6 };
    if (animated) {
      wmaMap.flyToBounds(bounds, opts);
    } else {
      wmaMap.fitBounds(bounds, opts);
    }
  }
}

// Styling for Spatial Units (Adaptive to Thematic Mode, Phase Filters, and Selection)
function getSectorStyle(feature) {
  const p = feature.properties;
  const isSelected = p.hex_id === selectedHexId;
  const dominant = p.dominant;
  const total = p.n_total || p.count || 1;

  let fillColor = '#94a3b8';

  if (currentThematicMode === 'density') {
    // Graduated density scale (1 to 5 burials per sector)
    if (total === 1) fillColor = '#38bdf8';      // 1: Sky Blue
    else if (total === 2) fillColor = '#2dd4bf'; // 2: Mint/Teal
    else if (total === 3) fillColor = '#fbbf24'; // 3: Amber
    else fillColor = '#f43f5e';                  // 4-5: Crimson Flame
  } else {
    // Chronology Mode: Early, Middle, Late, Tie
    if (dominant === 'EAP') fillColor = '#22d3ee';      // Early Avar Cyan
    else if (dominant === 'MAP') fillColor = '#ff4d29'; // Middle Avar Terracotta
    else if (dominant === 'LAP') fillColor = '#f8b838'; // Late Avar Gold
    else if (dominant === 'tie') fillColor = '#c084fc'; // Mixed Purple
  }

  // Check if matching current Phase Filter
  const matchesPhase = currentPhaseFilter === 'all' || dominant === currentPhaseFilter;

  // Selected State: Bright luminous accent outline
  if (isSelected) {
    return {
      fillColor: fillColor,
      fillOpacity: 1.0,
      color: '#ffffff',
      weight: 3,
      opacity: 1
    };
  }

  // Dimmed State: When a specific phase is isolated and this sector does not match
  if (!matchesPhase) {
    return {
      fillColor: fillColor,
      fillOpacity: 0.1,
      color: currentBasemap === 'none' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
      weight: 0.35,
      opacity: 0.25
    };
  }

  // Standard State: Clean, refined semi-transparent border avoiding visual clumping
  const strokeColor = currentBasemap === 'none' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(15, 23, 42, 0.4)';
  return {
    fillColor: fillColor,
    fillOpacity: 0.85,
    color: strokeColor,
    weight: 0.75,
    opacity: 0.95
  };
}

// Refresh all hexagon styles without reloading GeoJSON
function refreshAllHexStyles() {
  ['all', 'female', 'male'].forEach(layerName => {
    if (wmaGeoLayers[layerName]) {
      wmaGeoLayers[layerName].eachLayer(layer => {
        if (layer.feature) {
          layer.setStyle(getSectorStyle(layer.feature));
        }
      });
    }
  });
}

// Sector Hover & Click Interactions (High Performance, No bringToFront DOM Stutter)
function attachHexInteractions(feature, layer) {
  const p = feature.properties;
  const dominant = p.dominant;
  const phaseName = dominant === 'EAP' ? 'Early Avar (EAP)' : (dominant === 'MAP' ? 'Middle Avar (MAP)' : (dominant === 'LAP' ? 'Late Avar (LAP)' : 'Mixed / Tie'));
  const burialsCount = p.n_total || p.count || 1;

  // Lightweight cursor-tracking tooltip (No DOM reordering, zero flicker)
  layer.bindTooltip(`
    <div style="font-family: var(--font-sans); font-size: 0.8rem; line-height: 1.4;">
      <div style="font-family: var(--font-mono); font-weight: 700; color: #fff;">Sector ${p.hex_id}</div>
      <div style="color: #cbd5e1;">Burials: <strong>${burialsCount}</strong> · ${phaseName}</div>
    </div>
  `, {
    sticky: true,
    direction: 'top',
    offset: [0, -10],
    className: 'custom-leaflet-tooltip'
  });

  layer.on({
    mouseover: (e) => {
      const l = e.target;
      if (p.hex_id !== selectedHexId) {
        l.setStyle({ weight: 2.2, color: '#ffffff', fillOpacity: 0.96 });
      }
      updateHexInspector(p);
    },
    mouseout: (e) => {
      const l = e.target;
      if (p.hex_id !== selectedHexId) {
        l.setStyle(getSectorStyle(feature));
      }
    },
    click: (e) => {
      // Clear previous selection
      const prevSelectedLayer = selectedHexLayer;
      selectedHexId = p.hex_id;
      selectedHexLayer = layer;

      if (prevSelectedLayer && prevSelectedLayer.feature) {
        prevSelectedLayer.setStyle(getSectorStyle(prevSelectedLayer.feature));
      }

      layer.setStyle({ weight: 3, color: '#ffffff', fillOpacity: 1 });
      updateHexInspector(p);
    }
  });
}

// Update the Sector Inspector
function updateHexInspector(props) {
  const titleEl = document.getElementById('inspect-title');
  const descEl = document.getElementById('inspect-desc');
  const statsEl = document.getElementById('inspect-stats');

  if (!titleEl || !statsEl) return;

  const dom = props.dominant;
  let phaseText = 'Undetermined';
  let badgeColor = '#94a3b8';

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
    phaseText = 'Mixed Chronological Horizon';
    badgeColor = 'var(--accent-purple)';
  }

  const sharePercent = Math.round((props.dominant_share || 0) * 100);
  const total = props.n_total !== undefined ? props.n_total : (props.count || 0);
  const dated = props.n_dated !== undefined ? props.n_dated : total;
  const undated = props.n_undated || 0;
  const eap = props.n_eap || 0;
  const map = props.n_map || 0;
  const lap = props.n_lap || 0;

  titleEl.innerHTML = `
    Sector <span style="font-family: var(--font-mono); color: var(--accent-amber);">${props.hex_id}</span>
    <span style="display: block; font-size: 0.88rem; font-weight: 600; color: ${badgeColor}; margin-top: 0.2rem;">
      ● Dominant: ${phaseText} (${sharePercent}%)
    </span>
  `;

  if (descEl) {
    descEl.textContent = `Spatial sector covering ${total} burial(s) on the 3-meter aggregation grid (q=${props.q}, r=${props.r}).`;
  }

  statsEl.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1rem;">
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.75rem; border-radius: 6px;">
        <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; font-family: var(--font-mono);">Total Burials</span>
        <div style="font-size: 1.45rem; font-weight: 800; color: #fff;">${total}</div>
      </div>
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.75rem; border-radius: 6px;">
        <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; font-family: var(--font-mono);">Dated Graves</span>
        <div style="font-size: 1.45rem; font-weight: 800; color: var(--accent-cyan);">${dated}</div>
      </div>
    </div>

    <div style="font-family: var(--font-mono); font-size: 0.82rem; background: #03060c; border: 1px solid var(--border-subtle); padding: 0.85rem; border-radius: 6px; margin-bottom: 1rem;">
      <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; letter-spacing: 0.05em;">
        Chronological Breakdown
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
        <span style="color: var(--accent-cyan);">● Early Avar (EAP):</span>
        <strong style="color: #fff;">${eap}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
        <span style="color: var(--accent-ember);">● Middle Avar (MAP):</span>
        <strong style="color: #fff;">${map}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
        <span style="color: var(--accent-amber);">● Late Avar (LAP):</span>
        <strong style="color: #fff;">${lap}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; padding-top: 0.4rem; border-top: 1px solid rgba(255,255,255,0.08); color: var(--text-dim);">
        <span>Undated Burials:</span>
        <span>${undated}</span>
      </div>
    </div>

    <!-- Quick Isolation Action -->
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <button class="btn-prog btn-prog-secondary" onclick="window.filterMapByPhase('${dom}')" style="font-size: 0.75rem; padding: 0.4rem 0.75rem; width: 100%;">
        🎯 Highlight All ${dom} Sectors
      </button>
      <button class="btn-prog btn-prog-secondary" onclick="window.filterMapByPhase('all')" style="font-size: 0.75rem; padding: 0.4rem 0.75rem;">
        Reset
      </button>
    </div>

    <div style="font-size: 0.78rem; color: #94a3b8; line-height: 1.5;">
      Burials are aggregated into 3-meter spatial sectors to protect sensitive excavation record confidentiality (© Wien Museum).
    </div>
  `;
}

// Global phase filter function (called from buttons or inspector)
window.filterMapByPhase = function(phase) {
  currentPhaseFilter = phase;

  // Update phase toggle buttons UI
  const phaseButtons = document.querySelectorAll('.phase-toggle');
  phaseButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-phase') === phase);
  });

  refreshAllHexStyles();
  updateMapStatusPill();
};

// Wire all Map Controls (Subsets, Thematic Mode, Phase Filter, Basemap, Recenter)
function wireMapControls() {
  // 1. Subset layer toggles (All, Female, Male, Boundary)
  const layerButtons = document.querySelectorAll('.btn-layer-chip[data-layer]');
  layerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const layerType = btn.getAttribute('data-layer');

      if (layerType === 'boundary') {
        showBoundary = !showBoundary;
        btn.classList.toggle('active', showBoundary);
        if (showBoundary) {
          wmaMap.addLayer(wmaGeoLayers.boundary);
        } else {
          wmaMap.removeLayer(wmaGeoLayers.boundary);
        }
        return;
      }

      if (layerType === activeHexLayerName) return;

      layerButtons.forEach(b => {
        if (b.getAttribute('data-layer') !== 'boundary') {
          b.classList.remove('active');
        }
      });
      btn.classList.add('active');

      if (wmaGeoLayers[activeHexLayerName]) {
        wmaMap.removeLayer(wmaGeoLayers[activeHexLayerName]);
      }

      if (wmaGeoLayers[layerType]) {
        wmaMap.addLayer(wmaGeoLayers[layerType]);
        activeHexLayerName = layerType;
      }

      updateMapStatusPill();
    });
  });

  // 2. Thematic Mode toggle (Chronology vs Density Heat)
  const themeButtons = document.querySelectorAll('.theme-toggle');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      if (mode === currentThematicMode) return;

      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentThematicMode = mode;

      refreshAllHexStyles();
      renderDynamicLegend();
      updateMapStatusPill();
    });
  });

  // 3. Phase Filter toggles (All, EAP, MAP, LAP)
  const phaseButtons = document.querySelectorAll('.phase-toggle');
  phaseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const phase = btn.getAttribute('data-phase');
      window.filterMapByPhase(phase);
    });
  });

  // 4. Base Map switcher buttons (including 'none' for Dark Canvas)
  const basemapButtons = document.querySelectorAll('.basemap-toggle');
  basemapButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetBmap = btn.getAttribute('data-bmap');
      if (targetBmap === currentBasemap) return;

      basemapButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (currentBasemap !== 'none' && wmaBaseLayers[currentBasemap]) {
        wmaMap.removeLayer(wmaBaseLayers[currentBasemap]);
      }

      if (targetBmap === 'none') {
        currentBasemap = 'none';
      } else if (wmaBaseLayers[targetBmap]) {
        wmaBaseLayers[targetBmap].addTo(wmaMap);
        currentBasemap = targetBmap;
      }

      refreshAllHexStyles();
      updateMapStatusPill();
    });
  });

  // 5. Recenter Button
  const recenterBtn = document.getElementById('btn-recenter-map');
  if (recenterBtn) {
    recenterBtn.addEventListener('click', () => {
      fitCemeteryBounds(true);
    });
  }
}

// Dynamic Legend Rendering (Switches between Chronology & Density)
function renderDynamicLegend() {
  const legendContainer = document.getElementById('inspect-legend-target');
  if (!legendContainer) return;

  if (currentThematicMode === 'density') {
    legendContainer.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.6rem; letter-spacing: 0.05em;">
        Burial Density Legend (Burials per 3m Sector)
      </div>
      <div class="chronology-legend-grid">
        <div class="chrono-item">
          <span class="chrono-dot" style="background: #38bdf8;"></span>
          <div>
            <strong>1 Burial</strong>
            <span>260 sectors (60.7%)</span>
          </div>
        </div>
        <div class="chrono-item">
          <span class="chrono-dot" style="background: #2dd4bf;"></span>
          <div>
            <strong>2 Burials</strong>
            <span>121 sectors (28.3%)</span>
          </div>
        </div>
        <div class="chrono-item">
          <span class="chrono-dot" style="background: #fbbf24;"></span>
          <div>
            <strong>3 Burials</strong>
            <span>40 sectors (9.3%)</span>
          </div>
        </div>
        <div class="chrono-item">
          <span class="chrono-dot" style="background: #f43f5e;"></span>
          <div>
            <strong>4–5 Burials</strong>
            <span>7 sectors (1.6% cores)</span>
          </div>
        </div>
      </div>
    `;
  } else {
    legendContainer.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.6rem; letter-spacing: 0.05em;">
        Chronological Horizon Legend (Click to Isolate)
      </div>
      <div class="chronology-legend-grid">
        <div class="chrono-item" onclick="window.filterMapByPhase('EAP')" style="cursor: pointer;" title="Filter Early Avar">
          <span class="chrono-dot" style="background: #22d3ee;"></span>
          <div>
            <strong>Early Avar (EAP)</strong>
            <span>167 sectors (c. 568–650)</span>
          </div>
        </div>
        <div class="chrono-item" onclick="window.filterMapByPhase('MAP')" style="cursor: pointer;" title="Filter Middle Avar">
          <span class="chrono-dot" style="background: #ff4d29;"></span>
          <div>
            <strong>Middle Avar (MAP)</strong>
            <span>142 sectors (c. 650–700)</span>
          </div>
        </div>
        <div class="chrono-item" onclick="window.filterMapByPhase('LAP')" style="cursor: pointer;" title="Filter Late Avar">
          <span class="chrono-dot" style="background: #f8b838;"></span>
          <div>
            <strong>Late Avar (LAP)</strong>
            <span>112 sectors (c. 700–800)</span>
          </div>
        </div>
        <div class="chrono-item" onclick="window.filterMapByPhase('all')" style="cursor: pointer;" title="Reset filter">
          <span class="chrono-dot" style="background: #c084fc;"></span>
          <div>
            <strong>Mixed / All</strong>
            <span>7 ties · Reset All</span>
          </div>
        </div>
      </div>
    `;
  }
}

// Update Map Status Pill
function updateMapStatusPill() {
  const pill = document.getElementById('map-status-pill');
  if (!pill) return;

  let bmapName = 'Dark Canvas';
  if (currentBasemap === 'grau') bmapName = 'basemap.at Grau';
  else if (currentBasemap === 'ortho') bmapName = 'basemap.at Orthofoto 30cm';
  else if (currentBasemap === 'standard') bmapName = 'basemap.at Standard';

  let subsetLabel = '428 Sectors';
  if (activeHexLayerName === 'female') subsetLabel = '182 Female Burials';
  else if (activeHexLayerName === 'male') subsetLabel = '178 Male Burials';

  let filterLabel = '';
  if (currentPhaseFilter !== 'all') {
    filterLabel = ` · Isolated: ${currentPhaseFilter}`;
  }

  const modeLabel = currentThematicMode === 'density' ? 'Density View' : 'Chronology View';

  pill.textContent = `${bmapName} · ${subsetLabel} (${modeLabel}${filterLabel})`;
}

// Citation Copy Utility
function initCitationCopy() {
  const btn = document.getElementById('btn-copy-citation');
  const code = document.getElementById('citation-code');

  if (btn && code) {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(code.innerText.trim()).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Copied to Clipboard!';
        btn.style.background = 'rgba(34, 211, 238, 0.2)';
        btn.style.borderColor = 'var(--accent-cyan)';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = 'rgba(255, 77, 41, 0.15)';
          btn.style.borderColor = 'var(--accent-ember)';
        }, 2200);
      });
    });
  }
}
