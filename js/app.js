/**
 * VIENNAVARS - Open Research Data & Cemetery Map Portal
 * Language: English
 * Base Map: basemap.at (Magistrat der Stadt Wien / geoland.at) & Dark Canvas
 * Excavation Documentation: © Wien Museum
 * Copyright: © VIENNAVARS
 */

// Global State
let publicationsList = [];
let pubSearchQuery = '';
let pubDisplayLimit = 3;

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
// Interactive Cemetery Map (basemap.at & Dark Canvas)
// =========================================================================

function initGisWma() {
  const mapContainer = document.getElementById('gis-wma-map');
  if (!mapContainer) return;

  // Center coordinate of Vienna 11 - Csokorgasse burial ground
  const centerLat = 48.15269;
  const centerLng = 16.46775;

  // Initialize Leaflet Map (Default zoom 18 for high detail on cemetery)
  wmaMap = L.map('gis-wma-map', {
    center: [centerLat, centerLng],
    zoom: 18,
    minZoom: 15,
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

  // Wire Base Map switcher buttons (including 'none' for Dark Canvas)
  const basemapButtons = document.querySelectorAll('.basemap-toggle');
  basemapButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetBmap = btn.getAttribute('data-bmap');
      if (targetBmap === currentBasemap) return;

      basemapButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Remove existing tile layer if any
      if (currentBasemap !== 'none' && wmaBaseLayers[currentBasemap]) {
        wmaMap.removeLayer(wmaBaseLayers[currentBasemap]);
      }

      if (targetBmap === 'none') {
        currentBasemap = 'none';
      } else if (wmaBaseLayers[targetBmap]) {
        wmaBaseLayers[targetBmap].addTo(wmaMap);
        currentBasemap = targetBmap;
      }
      updateMapStatusPill();
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

    // 2. All Chronological Phases (428 spatial units)
    wmaGeoLayers.all = L.geoJSON(data.hex_all, {
      style: styleHexFeature,
      onEachFeature: attachHexInteractions
    }).addTo(wmaMap);

    // 3. Female Burials (182 units)
    wmaGeoLayers.female = L.geoJSON(data.hex_female, {
      style: styleHexFeature,
      onEachFeature: attachHexInteractions
    });

    // 4. Male Burials (178 units)
    wmaGeoLayers.male = L.geoJSON(data.hex_male, {
      style: styleHexFeature,
      onEachFeature: attachHexInteractions
    });

    // Center map view on cemetery at zoom 18
    wmaMap.setView([48.15269, 16.46775], 18);

    updateMapStatusPill();
    wireLayerToggles();
  }
}

// Styling for Spatial Units
function styleHexFeature(feature) {
  const dominant = feature.properties.dominant;
  let fillColor = '#94a3b8';

  if (dominant === 'EAP') {
    fillColor = '#22d3ee'; // Early Avar Cyan
  } else if (dominant === 'MAP') {
    fillColor = '#ff4d29'; // Middle Avar Terracotta
  } else if (dominant === 'LAP') {
    fillColor = '#f8b838'; // Late Avar Gold
  } else if (dominant === 'tie') {
    fillColor = '#c084fc'; // Mixed Purple
  }

  return {
    fillColor: fillColor,
    fillOpacity: 0.75,
    color: '#05080f',
    weight: 1.2,
    opacity: 0.95
  };
}

// Sector Hover & Click Interactions
function attachHexInteractions(feature, layer) {
  const p = feature.properties;

  layer.on({
    mouseover: (e) => {
      const l = e.target;
      l.setStyle({ weight: 3, color: '#ffffff', fillOpacity: 0.92 });
      l.bringToFront();
      updateHexInspector(p);
    },
    mouseout: (e) => {
      const l = e.target;
      l.setStyle(styleHexFeature(feature));
    },
    click: (e) => {
      updateHexInspector(p);

      const dominantBadgeColor = p.dominant === 'EAP' ? '#22d3ee' : (p.dominant === 'MAP' ? '#ff4d29' : (p.dominant === 'LAP' ? '#f8b838' : '#c084fc'));
      const dominantLabel = p.dominant === 'EAP' ? 'Early Avar (EAP)' : (p.dominant === 'MAP' ? 'Middle Avar (MAP)' : (p.dominant === 'LAP' ? 'Late Avar (LAP)' : 'Mixed / Tie'));

      const popupContent = `
        <div style="font-family: var(--font-sans); color: #0b1120; min-width: 180px;">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #64748b; text-transform: uppercase;">
            Sector: <strong>${p.hex_id}</strong>
          </div>
          <div style="margin: 0.4rem 0; font-size: 0.95rem; font-weight: 700; color: ${dominantBadgeColor};">
            ● ${dominantLabel}
          </div>
          <div style="font-size: 0.82rem; color: #334155; line-height: 1.4;">
            Burials in cell: <strong>${p.count}</strong><br>
            Chronological breakdown:<br>
            • Early (EAP): ${p.EAP || 0}<br>
            • Middle (MAP): ${p.MAP || 0}<br>
            • Late (LAP): ${p.LAP || 0}
          </div>
        </div>
      `;

      layer.bindPopup(popupContent, { offset: [0, -4] }).openPopup();
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

  titleEl.innerHTML = `
    Sector <span style="font-family: var(--font-mono); color: var(--accent-amber);">${props.hex_id}</span>
    <span style="display: block; font-size: 0.88rem; font-weight: 600; color: ${badgeColor}; margin-top: 0.2rem;">
      ● Dominant: ${phaseText} (${sharePercent}%)
    </span>
  `;

  if (descEl) {
    descEl.textContent = `Chronological evaluation of ${props.count} burial(s) clustered within this spatial sector.`;
  }

  statsEl.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1rem;">
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.75rem; border-radius: 6px;">
        <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; font-family: var(--font-mono);">Total Burials</span>
        <div style="font-size: 1.35rem; font-weight: 700; color: #fff;">${props.count}</div>
      </div>
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.75rem; border-radius: 6px;">
        <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; font-family: var(--font-mono);">Dated Graves</span>
        <div style="font-size: 1.35rem; font-weight: 700; color: var(--accent-cyan);">${props.dated_count || props.count}</div>
      </div>
    </div>

    <div style="font-family: var(--font-mono); font-size: 0.82rem; background: #03060c; border: 1px solid var(--border-subtle); padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
        <span style="color: var(--accent-cyan);">● Early Avar (EAP):</span>
        <strong style="color: #fff;">${props.EAP || 0}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
        <span style="color: var(--accent-ember);">● Middle Avar (MAP):</span>
        <strong style="color: #fff;">${props.MAP || 0}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
        <span style="color: var(--accent-amber);">● Late Avar (LAP):</span>
        <strong style="color: #fff;">${props.LAP || 0}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; padding-top: 0.35rem; border-top: 1px solid rgba(255,255,255,0.08); color: var(--text-dim);">
        <span>Undated Burials:</span>
        <span>${props.undated_count || 0}</span>
      </div>
    </div>
    <div style="font-size: 0.8rem; color: #94a3b8; line-height: 1.5;">
      Burials are aggregated into spatial units to protect excavation record confidentiality (© Wien Museum).
    </div>
  `;
}

// Wire Layer Toggles
function wireLayerToggles() {
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

      // Hex layer switches: all, female, male
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
}

// Update Map Status Pill
function updateMapStatusPill() {
  const pill = document.getElementById('map-status-pill');
  if (!pill) return;

  let bmapName = 'Dark Canvas';
  if (currentBasemap === 'grau') bmapName = 'basemap.at Grau';
  else if (currentBasemap === 'ortho') bmapName = 'basemap.at Orthofoto 30cm';
  else if (currentBasemap === 'standard') bmapName = 'basemap.at Standard';

  let layerCount = '428 Spatial Sectors';
  if (activeHexLayerName === 'female') layerCount = '182 Female Burials';
  else if (activeHexLayerName === 'male') layerCount = '178 Male Burials';

  pill.textContent = `${bmapName} · ${layerCount} Rendered`;
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
