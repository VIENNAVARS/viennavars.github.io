/**
 * VIENNAVARS - Open Research Data & Cemetery Map Portal
 * Subtitle: Visualization and Interpretation of Female Lifeworlds in the Avar Period (7th–8th Centuries AD):
 *           The Population of the Csokorgasse Cemetery, Vienna 11
 * Base Map: basemap.at (70% default transparency / opacity 0.30) & Dark Canvas
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
let activeHexLayerName = 'all';        // 'all' | 'female' | 'male'
let showBoundary = true;
let currentBasemap = 'grau';           // 'none' | 'grau' | 'ortho' | 'standard'
let currentBasemapOpacity = 0.30;      // 0.30 = 70% transparency (so basemaps do not glare and archaeology stands out)
let currentThematicMode = 'chronology'; // 'chronology' | 'density'
let currentPhaseFilter = 'all';        // 'all' | 'EAP' | 'MAP' | 'LAP' | 'tie'
let currentDensityFilter = 'all';      // 'all' | 1 | 2 | 3 | 4
let selectedHexId = null;
let selectedHexLayer = null;
let activeTooltipLayer = null;

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initPublicationsData();
  renderPublications();
  initPublicationSearch();
  initBibliographyDownload();
  initGisWma();
  initCitationCopy();
  initScrollSpy();
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
          Load More Publications (${filtered.length - pubDisplayLimit} remaining) ↓
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
  let buttonLabel = pub.button_label;
  if (!buttonLabel) {
    if (hasDoi) {
      buttonLabel = `DOI: ${pub.doi} ↗`;
    } else if (pub.url && pub.url.includes('usearch.univie.ac.at')) {
      buttonLabel = 'Uni-Bib-Katalog (u:search) ↗';
    } else if (pub.url && pub.url.includes('bda.gv.at')) {
      buttonLabel = 'Bundesdenkmalamt (FÖ) ↗';
    } else if (pub.open_access) {
      buttonLabel = 'Open Access PDF ↗';
    } else {
      buttonLabel = 'View Publication ↗';
    }
  }

  return `
    <article class="pub-card ${pub.highlight ? 'pub-highlight' : ''}">
      <div style="display: flex; flex-direction: column; flex: 1;">
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

// Direct Bibliography Export (BibTeX, RIS, CSV, JSON) — Works both online & offline via Blob
function initBibliographyDownload() {
  const dlLinks = document.querySelectorAll('[data-bib-download]');
  dlLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (!publicationsList || publicationsList.length === 0) return;
      e.preventDefault();
      const format = link.getAttribute('data-bib-download');
      let content = '';
      let mime = 'text/plain;charset=utf-8';
      let filename = `viennavars_publications.${format}`;

      if (format === 'bib') {
        const header = [
          '% VIENNAVARS Project & Vienna 11 - Csokorgasse Research Bibliography',
          '% Portal: https://github.com/VIENNAVARS | PHAIDRA: https://phaidra.univie.ac.at/detail/o:2091644 (DOI: 10.25365/phaidra.537)',
          ''
        ];
        const entries = publicationsList.map(p => {
          const key = (p.id || 'pub').replace(/-/g, '_');
          const j = p.journal || '';
          let type = 'article';
          if (j.includes('Monographien')) type = 'book';
          else if (j.includes('In:')) type = 'incollection';
          else if (j.includes('Dissertation')) type = 'phdthesis';

          const lines = [
            `@${type}{${key},`,
            `  author    = {${p.authors}},`,
            `  title     = {{${p.title}}},`,
            `  year      = {${p.year}},`
          ];
          if (type === 'phdthesis') {
            lines.push(`  school    = {University of Vienna},`);
          } else if (type === 'incollection') {
            lines.push(`  booktitle = {${j.replace(/^In:\s*/, '')}},`);
          } else {
            lines.push(`  journal   = {${j}},`);
          }
          if (p.volume) lines.push(`  volume    = {${p.volume}},`);
          if (p.doi) lines.push(`  doi       = {${p.doi}},`);
          if (p.url) lines.push(`  url       = {${p.url}},`);
          lines.push(`  note      = {${p.open_access ? 'Open Access' : 'Print / Publisher Access'}}`);
          lines.push(`}`);
          return lines.join('\n');
        });
        content = header.concat(entries).join('\n\n') + '\n';
        mime = 'application/x-bibtex;charset=utf-8';
      } else if (format === 'ris') {
        content = publicationsList.map(p => {
          const j = p.journal || '';
          let ty = 'JOUR';
          if (j.includes('Monographien')) ty = 'BOOK';
          else if (j.includes('In:')) ty = 'CHAP';
          else if (j.includes('Dissertation')) ty = 'THES';
          const lines = [
            `TY  - ${ty}`,
            `ID  - ${p.id}`,
            `TI  - ${p.title}`,
            `AU  - ${p.authors}`,
            `PY  - ${p.year}`,
            `T2  - ${j}`
          ];
          if (p.volume) lines.push(`VL  - ${p.volume}`);
          if (p.doi) lines.push(`DO  - ${p.doi}`);
          if (p.url) lines.push(`UR  - ${p.url}`);
          lines.push('ER  - ');
          return lines.join('\n');
        }).join('\n\n') + '\n';
        mime = 'application/x-research-info-systems;charset=utf-8';
      } else if (format === 'csv') {
        const escCsv = val => `"${String(val == null ? '' : val).replace(/"/g, '""')}"`;
        const rows = [
          ['id', 'authors', 'year', 'title', 'journal_or_source', 'volume_pages', 'doi', 'url', 'open_access'].join(',')
        ];
        publicationsList.forEach(p => {
          rows.push([
            escCsv(p.id),
            escCsv(p.authors),
            escCsv(p.year),
            escCsv(p.title),
            escCsv(p.journal),
            escCsv(p.volume || ''),
            escCsv(p.doi || ''),
            escCsv(p.url || ''),
            escCsv(p.open_access ? 'Yes' : 'No')
          ].join(','));
        });
        content = '\uFEFF' + rows.join('\r\n') + '\r\n';
        mime = 'text/csv;charset=utf-8';
      } else if (format === 'json') {
        content = JSON.stringify(publicationsList, null, 2) + '\n';
        mime = 'application/json;charset=utf-8';
      }

      const blob = new Blob([content], { type: mime });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
    });
  });
}

// Escape HTML utility
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[m]);
}

// =========================================================================
// Interactive Cemetery Map (70% Basemap Transparency, Density & Phase Filters)
// =========================================================================

function initGisWma() {
  const mapContainer = document.getElementById('gis-wma-map');
  if (!mapContainer) return;

  const centerLat = 48.15269;
  const centerLng = 16.46775;

  // Integer zoom levels (zoomSnap: 1) prevent subpixel tile seams; L.svg({ padding: 1.0 }) prevents SVG viewport clipping
  wmaMap = L.map('gis-wma-map', {
    center: [centerLat, centerLng],
    zoom: 18,
    zoomSnap: 1,
    zoomDelta: 1,
    minZoom: 15,
    maxZoom: 19,
    scrollWheelZoom: true,
    renderer: L.svg({ padding: 1.0 })
  });

  // Ensure any container size change immediately updates Leaflet's internal viewport & SVG bounds
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
      if (wmaMap) {
        wmaMap.invalidateSize({ animate: false });
      }
    });
    ro.observe(mapContainer);
  }

  wmaMap.on('mouseout', () => {
    if (activeTooltipLayer) {
      activeTooltipLayer.closeTooltip();
      activeTooltipLayer = null;
    }
  });

  // basemap.at WMTS Tile Layers (native max zoom 19)
  wmaBaseLayers = {
    grau: L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png', {
      maxNativeZoom: 19,
      maxZoom: 19,
      opacity: currentBasemapOpacity,
      attribution: '&copy; <a href="https://www.basemap.at" target="_blank" rel="noopener">basemap.at</a>'
    }),
    ortho: L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg', {
      maxNativeZoom: 19,
      maxZoom: 19,
      opacity: currentBasemapOpacity,
      attribution: '&copy; <a href="https://www.basemap.at" target="_blank" rel="noopener">basemap.at</a>'
    }),
    standard: L.tileLayer('https://mapsneu.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png', {
      maxNativeZoom: 19,
      maxZoom: 19,
      opacity: currentBasemapOpacity,
      attribution: '&copy; <a href="https://www.basemap.at" target="_blank" rel="noopener">basemap.at</a>'
    })
  };

  // Add default base layer: Grau (Gray at 70% transparency)
  wmaBaseLayers.grau.addTo(wmaMap);

  // Wire controls & load layers
  wireMapControls();
  loadGisLayers();
}

function loadGisLayers() {
  const data = window.CSOKORGASSE_DATA;
  if (!data || !data.boundary || !data.hex_all) return;

  // 1. Boundary Layer (cemetery_boundary — non-interactive so it never intercepts hex hover/click)
  wmaGeoLayers.boundary = L.geoJSON(data.boundary, {
    interactive: false,
    style: {
      color: '#38bdf8',
      weight: 2,
      dashArray: '6, 6',
      opacity: 0.85,
      fillColor: '#38bdf8',
      fillOpacity: 0.02
    }
  }).addTo(wmaMap);

  // 2. All Chronological Phases (428 spatial sectors, 651 burials)
  wmaGeoLayers.all = L.geoJSON(data.hex_all, {
    style: getSectorStyle,
    onEachFeature: attachHexInteractions
  }).addTo(wmaMap);

  // 3. Female Burials (182 sectors, 194 burials)
  wmaGeoLayers.female = L.geoJSON(data.hex_female, {
    style: getSectorStyle,
    onEachFeature: attachHexInteractions
  });

  // 4. Male Burials (178 sectors, 191 burials)
  wmaGeoLayers.male = L.geoJSON(data.hex_male, {
    style: getSectorStyle,
    onEachFeature: attachHexInteractions
  });

  // Fit bounds precisely so the entire two-sector cemetery is visible at integer zoom 18
  fitCemeteryBounds(false);

  updatePhaseButtonCounts();
  updateMapStatusPill();
  renderDynamicLegend();
  renderDefaultInspector();
}

// Fit cemetery bounds cleanly at native integer zoom 18 so both NW and S sectors have comfortable margins
function fitCemeteryBounds(animated = false) {
  if (!wmaGeoLayers.boundary || !wmaMap) return;
  wmaMap.invalidateSize({ animate: false });
  const bounds = wmaGeoLayers.boundary.getBounds();
  if (bounds && bounds.isValid()) {
    wmaMap.fitBounds(bounds, {
      padding: [24, 24],
      maxZoom: 18,
      animate: animated
    });
  }
}

// Compute live statistics for the currently active subset ('all' | 'female' | 'male'), optionally filtered
function getActiveSubsetStats(applyActiveFilters = false) {
  const data = window.CSOKORGASSE_DATA;
  let geo = data ? data.hex_all : null;
  if (activeHexLayerName === 'female' && data && data.hex_female) geo = data.hex_female;
  else if (activeHexLayerName === 'male' && data && data.hex_male) geo = data.hex_male;

  const stats = {
    totalSectors: 0,
    totalBurials: 0,
    datedBurials: 0,
    undatedBurials: 0,
    burialsEAP: 0,
    burialsMAP: 0,
    burialsLAP: 0,
    EAP: 0,
    MAP: 0,
    LAP: 0,
    tie: 0,
    dens1: 0,
    dens2: 0,
    dens3: 0,
    dens4plus: 0
  };

  if (!geo || !geo.features) return stats;

  geo.features.forEach(ft => {
    const p = ft.properties || {};
    const n = p.n_total || p.count || 1;
    const dom = p.dominant;

    if (applyActiveFilters) {
      if (currentPhaseFilter !== 'all' && dom !== currentPhaseFilter) return;
      if (currentDensityFilter !== 'all') {
        if (currentDensityFilter === 4 && n < 4) return;
        if (currentDensityFilter < 4 && n !== currentDensityFilter) return;
      }
    }

    stats.totalSectors++;
    stats.totalBurials += n;
    stats.datedBurials += (p.n_dated !== undefined ? p.n_dated : n);
    stats.undatedBurials += (p.n_undated || 0);
    stats.burialsEAP += (p.n_eap || 0);
    stats.burialsMAP += (p.n_map || 0);
    stats.burialsLAP += (p.n_lap || 0);

    if (dom === 'EAP') stats.EAP++;
    else if (dom === 'MAP') stats.MAP++;
    else if (dom === 'LAP') stats.LAP++;
    else stats.tie++;

    if (n === 1) stats.dens1++;
    else if (n === 2) stats.dens2++;
    else if (n === 3) stats.dens3++;
    else stats.dens4plus++;
  });

  return stats;
}

// Update phase filter buttons with exact counts for active subset
function updatePhaseButtonCounts() {
  const s = getActiveSubsetStats(false);
  const btnAll = document.querySelector('.phase-toggle[data-phase="all"]');
  const btnEap = document.querySelector('.phase-toggle[data-phase="EAP"]');
  const btnMap = document.querySelector('.phase-toggle[data-phase="MAP"]');
  const btnLap = document.querySelector('.phase-toggle[data-phase="LAP"]');
  const btnTie = document.querySelector('.phase-toggle[data-phase="tie"]');

  if (btnAll) btnAll.textContent = `All (${s.totalSectors})`;
  if (btnEap) btnEap.textContent = `Early (${s.EAP})`;
  if (btnMap) btnMap.textContent = `Middle (${s.MAP})`;
  if (btnLap) btnLap.textContent = `Late (${s.LAP})`;
  if (btnTie) btnTie.textContent = `Mixed (${s.tie})`;
}

// Styling for Spatial Units (Adaptive to Thematic Mode, Phase & Density Filters, and Selection)
function getSectorStyle(feature) {
  const p = feature.properties;
  const isSelected = p.hex_id === selectedHexId;
  const dominant = p.dominant;
  const total = p.n_total || p.count || 1;

  let fillColor = '#94a3b8';

  if (currentThematicMode === 'density') {
    if (total === 1) fillColor = '#38bdf8';      // 1: Sky Blue
    else if (total === 2) fillColor = '#2dd4bf'; // 2: Mint/Teal
    else if (total === 3) fillColor = '#fbbf24'; // 3: Amber
    else fillColor = '#f43f5e';                  // 4-5: Crimson Flame
  } else {
    if (dominant === 'EAP') fillColor = '#22d3ee';      // Early Avar Cyan
    else if (dominant === 'MAP') fillColor = '#ff4d29'; // Middle Avar Terracotta
    else if (dominant === 'LAP') fillColor = '#f8b838'; // Late Avar Gold
    else if (dominant === 'tie') fillColor = '#c084fc'; // Mixed Purple
  }

  const matchesPhase = currentPhaseFilter === 'all' || dominant === currentPhaseFilter;
  const matchesDensity = currentDensityFilter === 'all' ||
    (currentDensityFilter === 4 ? total >= 4 : total === currentDensityFilter);

  if (isSelected) {
    return {
      fillColor: fillColor,
      fillOpacity: 1.0,
      color: '#ffffff',
      weight: 3,
      opacity: 1
    };
  }

  if (!matchesPhase || !matchesDensity) {
    return {
      fillColor: fillColor,
      fillOpacity: 0.10,
      color: 'rgba(255, 255, 255, 0.06)',
      weight: 0.35,
      opacity: 0.2
    };
  }

  // Crisp contrast over 70%-transparent muted basemap
  return {
    fillColor: fillColor,
    fillOpacity: 0.88,
    color: 'rgba(5, 8, 15, 0.65)',
    weight: 0.85,
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

// Sector Hover & Click Interactions
function attachHexInteractions(feature, layer) {
  const p = feature.properties;
  const dominant = p.dominant;
  const phaseName = dominant === 'EAP' ? 'Early Avar (EAP)' : (dominant === 'MAP' ? 'Middle Avar (MAP)' : (dominant === 'LAP' ? 'Late Avar (LAP)' : 'Mixed / Tie'));
  const burialsCount = p.n_total || p.count || 1;

  layer.bindTooltip(`
    <div style="font-family: var(--font-sans); font-size: 0.8rem; line-height: 1.4;">
      <div style="font-family: var(--font-mono); font-weight: 700; color: #fff;">Sector ${p.hex_id}</div>
      <div style="color: #cbd5e1;">Burials: <strong>${burialsCount}</strong> · ${phaseName}</div>
    </div>
  `, {
    sticky: false,
    direction: 'top',
    offset: [0, -8],
    className: 'custom-leaflet-tooltip'
  });

  layer.on({
    mouseover: (e) => {
      const l = e.target;
      if (activeTooltipLayer && activeTooltipLayer !== l) {
        activeTooltipLayer.closeTooltip();
      }
      activeTooltipLayer = l;
      if (p.hex_id !== selectedHexId) {
        l.setStyle({ weight: 2.2, color: '#ffffff', fillOpacity: 0.98 });
      }
      updateHexInspector(p);
    },
    mouseout: (e) => {
      const l = e.target;
      l.closeTooltip();
      if (activeTooltipLayer === l) {
        activeTooltipLayer = null;
      }
      if (p.hex_id !== selectedHexId) {
        l.setStyle(getSectorStyle(feature));
      }
      if (selectedHexLayer && selectedHexLayer.feature) {
        updateHexInspector(selectedHexLayer.feature.properties);
      } else {
        renderDefaultInspector();
      }
    },
    click: (e) => {
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

// Render Default Cemetery / Active Query Overview in the Sector Inspector (identical DOM structure & height)
function renderDefaultInspector() {
  const titleEl = document.getElementById('inspect-title');
  const descEl = document.getElementById('inspect-desc');
  const statsEl = document.getElementById('inspect-stats');
  if (!titleEl || !statsEl) return;

  const isFiltered = currentPhaseFilter !== 'all' || currentDensityFilter !== 'all';
  const s = getActiveSubsetStats(isFiltered);

  let subsetTitle = 'All Hexbins';
  if (activeHexLayerName === 'female') subsetTitle = 'Female Subset';
  else if (activeHexLayerName === 'male') subsetTitle = 'Male Subset';

  let headerMain = subsetTitle;
  let subLine = '● Hover or click any hexbin or legend button to query';
  let subColor = 'var(--accent-cyan)';
  let descText = `Cemetery-wide overview covering ${s.totalBurials} burials across ${s.totalSectors} 3 m hexbins.`;
  let nextIsolatePhase = 'EAP';
  let nextIsolateLabel = 'Isolate EAP Hexbins';

  if (currentPhaseFilter !== 'all') {
    if (currentPhaseFilter === 'EAP') {
      headerMain = 'Early Avar (EAP)';
      subLine = '● Queried Horizon: Early Avar Period (c. 568–650 AD)';
      subColor = 'var(--accent-cyan)';
      nextIsolatePhase = 'MAP';
      nextIsolateLabel = 'Isolate MAP Hexbins';
    } else if (currentPhaseFilter === 'MAP') {
      headerMain = 'Middle Avar (MAP)';
      subLine = '● Queried Horizon: Middle Avar Period (c. 650–700 AD)';
      subColor = 'var(--accent-ember)';
      nextIsolatePhase = 'LAP';
      nextIsolateLabel = 'Isolate LAP Hexbins';
    } else if (currentPhaseFilter === 'LAP') {
      headerMain = 'Late Avar (LAP)';
      subLine = '● Queried Horizon: Late Avar Period (c. 700–800 AD)';
      subColor = 'var(--accent-amber)';
      nextIsolatePhase = 'EAP';
      nextIsolateLabel = 'Isolate EAP Hexbins';
    } else if (currentPhaseFilter === 'tie') {
      headerMain = 'Mixed Horizon (Tie)';
      subLine = '● Queried Horizon: Equal Chronological Share';
      subColor = 'var(--accent-purple)';
      nextIsolatePhase = 'EAP';
      nextIsolateLabel = 'Isolate EAP Hexbins';
    }
    descText = `Filtered query: ${s.totalBurials} burials across ${s.totalSectors} 3 m hexbins (${subsetTitle}).`;
  } else if (currentDensityFilter !== 'all') {
    const densLabel = currentDensityFilter === 1 ? '1 Burial / Hexbin' : (currentDensityFilter === 4 ? '4–5 Burials / Hexbin' : `${currentDensityFilter} Burials / Hexbin`);
    headerMain = `Density: ${densLabel}`;
    subLine = `● Queried Burial Density Class (${subsetTitle})`;
    subColor = '#38bdf8';
    descText = `Filtered density query: ${s.totalBurials} burials across ${s.totalSectors} 3 m hexbins.`;
  }

  titleEl.innerHTML = `
    ${headerMain} <span style="font-family: var(--font-mono); color: var(--accent-amber);">${s.totalSectors} Units</span>
    <span style="display: block; font-size: 0.85rem; font-weight: 600; color: ${subColor}; margin-top: 0.2rem;">
      ${subLine}
    </span>
  `;

  if (descEl) {
    descEl.textContent = descText;
  }

  statsEl.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem; margin-bottom: 0.85rem;">
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.65rem 0.75rem; border-radius: 6px;">
        <span style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-family: var(--font-mono);">Total Burials</span>
        <div style="font-size: 1.35rem; font-weight: 800; color: #fff;">${s.totalBurials}</div>
      </div>
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.65rem 0.75rem; border-radius: 6px;">
        <span style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-family: var(--font-mono);">Dated Graves</span>
        <div style="font-size: 1.35rem; font-weight: 800; color: var(--accent-cyan);">${s.datedBurials}</div>
      </div>
    </div>

    <div style="font-family: var(--font-mono); font-size: 0.8rem; background: #03060c; border: 1px solid var(--border-subtle); padding: 0.75rem 0.85rem; border-radius: 6px; margin-bottom: 0.85rem;">
      <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.45rem; letter-spacing: 0.05em;">
        Chronological Breakdown
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
        <span style="color: var(--accent-cyan);">● Early Avar (EAP):</span>
        <strong style="color: #fff;">${s.burialsEAP}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
        <span style="color: var(--accent-ember);">● Middle Avar (MAP):</span>
        <strong style="color: #fff;">${s.burialsMAP}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
        <span style="color: var(--accent-amber);">● Late Avar (LAP):</span>
        <strong style="color: #fff;">${s.burialsLAP}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; padding-top: 0.35rem; border-top: 1px solid rgba(255,255,255,0.08); color: var(--text-dim);">
        <span>Undated Burials:</span>
        <span>${s.undatedBurials}</span>
      </div>
    </div>

    <div style="display: flex; gap: 0.5rem;">
      <button class="btn-prog btn-prog-secondary" onclick="window.filterMapByPhase('${nextIsolatePhase}')" style="font-size: 0.74rem; padding: 0.42rem 0.75rem; width: 100%;">
        ${nextIsolateLabel}
      </button>
      <button class="btn-prog btn-prog-secondary" onclick="window.resetMapInspector()" style="font-size: 0.74rem; padding: 0.42rem 0.75rem;">
        Reset
      </button>
    </div>
  `;
}

// Reset selected sector, phase filter, and density filter
window.resetMapInspector = function() {
  selectedHexId = null;
  selectedHexLayer = null;
  currentPhaseFilter = 'all';
  currentDensityFilter = 'all';

  const phaseButtons = document.querySelectorAll('.phase-toggle');
  phaseButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-phase') === 'all');
  });

  refreshAllHexStyles();
  renderDynamicLegend();
  renderDefaultInspector();
  updateMapStatusPill();
};

// Update the Sector Inspector (Note: #inspect-legend-target is a sibling outside #inspect-stats, so it is never overwritten)
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
    <span style="display: block; font-size: 0.85rem; font-weight: 600; color: ${badgeColor}; margin-top: 0.2rem;">
      ● Dominant: ${phaseText} (${sharePercent}%)
    </span>
  `;

  if (descEl) {
    descEl.textContent = `3 m hexbin covering ${total} burial(s) (grid coordinates q=${props.q}, r=${props.r}).`;
  }

  statsEl.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem; margin-bottom: 0.85rem;">
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.65rem 0.75rem; border-radius: 6px;">
        <span style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-family: var(--font-mono);">Total Burials</span>
        <div style="font-size: 1.35rem; font-weight: 800; color: #fff;">${total}</div>
      </div>
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.65rem 0.75rem; border-radius: 6px;">
        <span style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-family: var(--font-mono);">Dated Graves</span>
        <div style="font-size: 1.35rem; font-weight: 800; color: var(--accent-cyan);">${dated}</div>
      </div>
    </div>

    <div style="font-family: var(--font-mono); font-size: 0.8rem; background: #03060c; border: 1px solid var(--border-subtle); padding: 0.75rem 0.85rem; border-radius: 6px; margin-bottom: 0.85rem;">
      <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.45rem; letter-spacing: 0.05em;">
        Chronological Breakdown
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
        <span style="color: var(--accent-cyan);">● Early Avar (EAP):</span>
        <strong style="color: #fff;">${eap}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
        <span style="color: var(--accent-ember);">● Middle Avar (MAP):</span>
        <strong style="color: #fff;">${map}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
        <span style="color: var(--accent-amber);">● Late Avar (LAP):</span>
        <strong style="color: #fff;">${lap}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; padding-top: 0.35rem; border-top: 1px solid rgba(255,255,255,0.08); color: var(--text-dim);">
        <span>Undated Burials:</span>
        <span>${undated}</span>
      </div>
    </div>

    <div style="display: flex; gap: 0.5rem;">
      <button class="btn-prog btn-prog-secondary" onclick="window.filterMapByPhase('${dom}')" style="font-size: 0.74rem; padding: 0.42rem 0.75rem; width: 100%;">
        Isolate ${dom} Sectors
      </button>
      <button class="btn-prog btn-prog-secondary" onclick="window.resetMapInspector()" style="font-size: 0.74rem; padding: 0.42rem 0.75rem;">
        Reset
      </button>
    </div>
  `;
}

// Global phase filter & query function (supports toggle-off when clicking active legend button)
window.filterMapByPhase = function(phase, toggleIfSame = false) {
  if (toggleIfSame && currentPhaseFilter === phase && phase !== 'all') {
    currentPhaseFilter = 'all';
  } else {
    currentPhaseFilter = phase;
  }
  currentDensityFilter = 'all';
  selectedHexId = null;
  selectedHexLayer = null;

  const phaseButtons = document.querySelectorAll('.phase-toggle');
  phaseButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-phase') === currentPhaseFilter);
  });

  refreshAllHexStyles();
  renderDynamicLegend();
  renderDefaultInspector();
  updateMapStatusPill();
};

// Global burial density filter & query function (for Density Legend buttons)
window.filterMapByDensity = function(bin, toggleIfSame = false) {
  if (toggleIfSame && currentDensityFilter === bin && bin !== 'all') {
    currentDensityFilter = 'all';
  } else {
    currentDensityFilter = bin;
  }
  currentPhaseFilter = 'all';
  selectedHexId = null;
  selectedHexLayer = null;

  const phaseButtons = document.querySelectorAll('.phase-toggle');
  phaseButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-phase') === 'all');
  });

  refreshAllHexStyles();
  renderDynamicLegend();
  renderDefaultInspector();
  updateMapStatusPill();
};

// Wire all Map Controls
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
          if (typeof wmaGeoLayers.boundary.bringToBack === 'function') {
            wmaGeoLayers.boundary.bringToBack();
          }
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

      selectedHexId = null;
      selectedHexLayer = null;
      updatePhaseButtonCounts();
      renderDynamicLegend();
      renderDefaultInspector();
      updateMapStatusPill();
    });
  });

  // 2. Thematic Mode toggle (Chronology vs Density)
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
      renderDefaultInspector();
      updateMapStatusPill();
    });
  });

  // 3. Phase Filter toggles (All, EAP, MAP, LAP, tie)
  const phaseButtons = document.querySelectorAll('.phase-toggle');
  phaseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const phase = btn.getAttribute('data-phase');
      window.filterMapByPhase(phase, phase !== 'all');
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
        wmaBaseLayers[targetBmap].setOpacity(currentBasemapOpacity);
        wmaBaseLayers[targetBmap].addTo(wmaMap);
        currentBasemap = targetBmap;
      }

      refreshAllHexStyles();
      updateMapStatusPill();
    });
  });

  // 5. Basemap Transparency Slider (Default: 70% transparency = 30% opacity)
  const transpSlider = document.getElementById('basemap-transp-slider');
  const transpValEl = document.getElementById('basemap-transp-val');
  if (transpSlider) {
    transpSlider.addEventListener('input', (e) => {
      const transpPct = Number(e.target.value); // e.g. 70 means 70% transparent -> opacity 0.30
      currentBasemapOpacity = Math.max(0, Math.min(1, (100 - transpPct) / 100));
      if (transpValEl) {
        transpValEl.textContent = `${transpPct}%`;
      }
      Object.values(wmaBaseLayers).forEach(layer => {
        if (layer && typeof layer.setOpacity === 'function') {
          layer.setOpacity(currentBasemapOpacity);
        }
      });
      updateMapStatusPill();
    });
  }

  // 6. Recenter Button
  const recenterBtn = document.getElementById('btn-recenter-map');
  if (recenterBtn) {
    recenterBtn.addEventListener('click', () => {
      fitCemeteryBounds(true);
    });
  }
}

// Dynamic Legend Rendering (Interactive query buttons in both Chronology & Density modes)
function renderDynamicLegend() {
  const legendContainer = document.getElementById('inspect-legend-target');
  if (!legendContainer) return;

  const s = getActiveSubsetStats(false);
  const total = s.totalSectors || 1;
  const pct = (n) => `${Math.round((n / total) * 100)}%`;

  if (currentThematicMode === 'density') {
    const isFiltered = currentDensityFilter !== 'all';
    legendContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.55rem;">
        <span style="font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.05em;">
          Burial Density Query (Click to Isolate)
        </span>
        ${isFiltered ? `<button type="button" onclick="window.resetMapInspector()" class="legend-reset-mini">Show All (${s.totalSectors})</button>` : ''}
      </div>
      <div class="chronology-legend-grid">
        <button type="button" class="chrono-item ${currentDensityFilter === 1 ? 'active' : ''}" onclick="window.filterMapByDensity(1, true)" title="Query hexbins with 1 burial">
          <span class="chrono-dot" style="background: #38bdf8;"></span>
          <div>
            <strong>1 Burial</strong>
            <span>${s.dens1} hexbins (${pct(s.dens1)})</span>
          </div>
        </button>
        <button type="button" class="chrono-item ${currentDensityFilter === 2 ? 'active' : ''}" onclick="window.filterMapByDensity(2, true)" title="Query hexbins with 2 burials">
          <span class="chrono-dot" style="background: #2dd4bf;"></span>
          <div>
            <strong>2 Burials</strong>
            <span>${s.dens2} hexbins (${pct(s.dens2)})</span>
          </div>
        </button>
        <button type="button" class="chrono-item ${currentDensityFilter === 3 ? 'active' : ''}" onclick="window.filterMapByDensity(3, true)" title="Query hexbins with 3 burials">
          <span class="chrono-dot" style="background: #fbbf24;"></span>
          <div>
            <strong>3 Burials</strong>
            <span>${s.dens3} hexbins (${pct(s.dens3)})</span>
          </div>
        </button>
        <button type="button" class="chrono-item ${currentDensityFilter === 4 ? 'active' : ''}" onclick="window.filterMapByDensity(4, true)" title="Query hexbins with 4–5 burials">
          <span class="chrono-dot" style="background: #f43f5e;"></span>
          <div>
            <strong>4–5 Burials</strong>
            <span>${s.dens4plus} hexbins (${pct(s.dens4plus)})</span>
          </div>
        </button>
      </div>
    `;
  } else {
    const isFiltered = currentPhaseFilter !== 'all';
    legendContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.55rem;">
        <span style="font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.05em;">
          Chronological Horizon Query (Click to Isolate)
        </span>
        ${isFiltered ? `<button type="button" onclick="window.resetMapInspector()" class="legend-reset-mini">Show All (${s.totalSectors})</button>` : ''}
      </div>
      <div class="chronology-legend-grid">
        <button type="button" class="chrono-item ${currentPhaseFilter === 'EAP' ? 'active' : ''}" onclick="window.filterMapByPhase('EAP', true)" title="Query & isolate Early Avar Period hexbins">
          <span class="chrono-dot" style="background: #22d3ee;"></span>
          <div>
            <strong>Early Avar (EAP)</strong>
            <span>${s.EAP} hexbins (c. 568–650)</span>
          </div>
        </button>
        <button type="button" class="chrono-item ${currentPhaseFilter === 'MAP' ? 'active' : ''}" onclick="window.filterMapByPhase('MAP', true)" title="Query & isolate Middle Avar Period hexbins">
          <span class="chrono-dot" style="background: #ff4d29;"></span>
          <div>
            <strong>Middle Avar (MAP)</strong>
            <span>${s.MAP} hexbins (c. 650–700)</span>
          </div>
        </button>
        <button type="button" class="chrono-item ${currentPhaseFilter === 'LAP' ? 'active' : ''}" onclick="window.filterMapByPhase('LAP', true)" title="Query & isolate Late Avar Period hexbins">
          <span class="chrono-dot" style="background: #f8b838;"></span>
          <div>
            <strong>Late Avar (LAP)</strong>
            <span>${s.LAP} hexbins (c. 700–800)</span>
          </div>
        </button>
        <button type="button" class="chrono-item ${currentPhaseFilter === 'tie' ? 'active' : ''}" onclick="window.filterMapByPhase('tie', true)" title="Query & isolate Mixed / Tie hexbins">
          <span class="chrono-dot" style="background: #c084fc;"></span>
          <div>
            <strong>Mixed / Tie</strong>
            <span>${s.tie} hexbins (equal share)</span>
          </div>
        </button>
      </div>
    `;
  }
}

// Update Map Status Pill
function updateMapStatusPill() {
  const pill = document.getElementById('map-status-pill');
  if (!pill) return;

  const transpPct = Math.round((1 - currentBasemapOpacity) * 100);
  let bmapName = 'Dark Canvas';
  if (currentBasemap === 'grau') bmapName = `basemap.at Grau (${transpPct}% transp.)`;
  else if (currentBasemap === 'ortho') bmapName = `basemap.at Orthofoto (${transpPct}% transp.)`;
  else if (currentBasemap === 'standard') bmapName = `basemap.at Standard (${transpPct}% transp.)`;

  let subsetLabel = '428 Hexbins (651 Burials)';
  if (activeHexLayerName === 'female') subsetLabel = '182 Female Hexbins (194 Burials)';
  else if (activeHexLayerName === 'male') subsetLabel = '178 Male Hexbins (191 Burials)';

  let filterLabel = '';
  if (currentPhaseFilter !== 'all') {
    filterLabel = ` · Isolated: ${currentPhaseFilter}`;
  } else if (currentDensityFilter !== 'all') {
    filterLabel = ` · Isolated: ${currentDensityFilter === 4 ? '4–5' : currentDensityFilter} Burial(s)`;
  }

  const modeLabel = currentThematicMode === 'density' ? 'Density View' : 'Chronology View';

  pill.textContent = `${bmapName} · ${subsetLabel} · ${modeLabel}${filterLabel}`;
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

// Scroll-Spy for Sticky Navbar Section Highlighting
function initScrollSpy() {
  const navLinks = Array.from(document.querySelectorAll('.nav-menu .nav-link[data-section]'));
  if (navLinks.length === 0) return;

  const sectionIds = navLinks.map(link => link.getAttribute('data-section'));
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  function updateActiveNav() {
    const scrollY = window.scrollY || window.pageYOffset;
    const triggerLine = scrollY + 190; // 70px navbar + 120px lookahead

    let currentId = null;
    for (const sec of sections) {
      if (sec.offsetTop <= triggerLine) {
        currentId = sec.id;
      }
    }

    // If scrolled near the very bottom of the page, highlight the last tracked section
    if ((window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 60) && sections.length > 0) {
      currentId = sections[sections.length - 1].id;
    }

    navLinks.forEach(link => {
      const isMatch = link.getAttribute('data-section') === currentId;
      link.classList.toggle('active', isMatch);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav, { passive: true });
  updateActiveNav();
}
