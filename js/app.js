/**
 * VIENNAVARS - Open Research Data & Hexbin Visualization Engine
 * Language: English Only
 */

// Embedded fallback summary data
const EMBEDDED_DATA = {
  "paper_insights": [
    {
      "id": "insight-bioarch",
      "tag": "Anthropology & Lifeworlds",
      "title": "Demography, Stature & Physiological Childhood Stress",
      "highlight_metric": "158.4 cm",
      "metric_label": "Mean female body height",
      "summary": "Bioarchaeological assessment of female skeletons reveals a mean stature of 158.4 cm reflecting distinct sexual dimorphism. Linear enamel hypoplasias (LEH) on permanent dentition indicate recurrent physiological stress episodes during early childhood (ages 2–4), with stabilization in adolescence.",
      "reference": "VIENNAVARS Bioarchaeology Series"
    },
    {
      "id": "insight-status",
      "tag": "Material Culture & Social Stratification",
      "title": "Costume Jewelry & Crafts as Markers of Social Status",
      "highlight_metric": "68%",
      "metric_label": "Burials with jewelry offerings",
      "summary": "The association of gilded bronze and silver earrings (with polyhedral and grape pendants) with multi-strand imported glass bead necklaces demonstrates pronounced hierarchical differentiation. Spindle whorls in nearly one-third of female graves emphasize the socio-economic status of textile production.",
      "reference": "VIENNAVARS Material Culture & Craft Analysis"
    },
    {
      "id": "insight-spatial",
      "tag": "Spatial Organization & Hexbin Mapping",
      "title": "Horizontal Stratigraphy & Spatial Trajectories",
      "highlight_metric": "3m Hexbins",
      "metric_label": "Spatial resolution",
      "summary": "Hexagonal spatial binning (3-meter cell size) captures horizontal cemetery stratigraphy from the Early Avar period through the Middle Avar peak into the Late Avar period. Burial concentrations follow distinct linear ribbons, pointing to kin-group plots without disclosing individual coordinate points.",
      "reference": "VIENNAVARS Spatial Dynamics / Statuspaper 2026"
    }
  ],
  "hexbin_maps": [
    {
      "id": "sp04",
      "title": "Chronology in 3-Meter Hexagons (Total Cemetery)",
      "file": "assets/maps/SP04_Hex_Chronologie_Gesamt.png",
      "badge": "SP04 · Overall Hexbin Map",
      "description": "Spatial distribution of chronological phases across the entire cemetery using 3-meter hexagonal tessellation. Each cell represents the dominant dated phase among documented burials.",
      "methodology": "3m inter-edge hexagon distance · Dominant chronological phase per bin · Open Sans typography · EPSG:31256 reference"
    },
    {
      "id": "sp03",
      "title": "Chronology in 3-Meter Hexagons by Sex",
      "file": "assets/maps/SP03_Hex_Chronologie_nach_Geschlecht.png",
      "badge": "SP03 · Sex-Stratified Hexbins",
      "description": "Comparative hexagonal binning of male and female spatial trajectories, illuminating gendered cemetery growth and shared burial plots over time.",
      "methodology": "Dual-panel comparative hexbin matrix · Subadults omitted from sex panels · 3m cell width"
    },
    {
      "id": "sp06",
      "title": "Female Lifeworlds: Social Status and Chronology",
      "file": "assets/maps/SP06_Status_Chronologie_Female.png",
      "badge": "SP06 · Female Main Map",
      "description": "Comprehensive cartographic synthesis of 166 adult female burials, cross-referencing grave good status categories with chronological horizon and spatial clusters.",
      "methodology": "Multi-tier status classification · Chronological horizon overlay · n = 166 adult females"
    },
    {
      "id": "sp01",
      "title": "Social Status by Sex Across the Adult Population",
      "file": "assets/maps/SP01_Status_nach_Geschlecht.png",
      "badge": "SP01 · Adult Status Map",
      "description": "Comparative distribution of social status indicators across 348 adult individuals (166 females, 182 males) across the Csokorgasse burial ground.",
      "methodology": "Costume elements, weaponry, and prestige goods · Disturbed/robbed graves indicated · n = 348"
    },
    {
      "id": "sp05",
      "title": "Cemetery Extent & Convex Hulls",
      "file": "assets/maps/SP05_Belegung_Vorhandene_Huellen.png",
      "badge": "SP05 · Convex Hulls",
      "description": "Descriptive spatial enclosures and boundary sectors of the cemetery phases. Hulls serve as analytical cluster boundaries.",
      "methodology": "Descriptive convex hulls per phase · Spatial core density zones · Excludes excavation trench limits"
    }
  ]
};

let appData = EMBEDDED_DATA;
let activeMapId = 'sp04';
let leafletMap = null;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  renderPaperInsights();
  initHexbinTabs();
  initLightbox();
  initCitationCopy();
});

// Fetch summary_statistics.json with fallback
async function loadData() {
  try {
    const res = await fetch('data/summary_statistics.json');
    if (res.ok) {
      appData = await res.json();
    }
  } catch (err) {
    console.info("Using embedded data fallback.");
    appData = EMBEDDED_DATA;
  }
}

// Render Paper Insights
function renderPaperInsights() {
  const container = document.getElementById('paper-insights-container');
  if (!container || !appData.paper_insights) return;

  container.innerHTML = appData.paper_insights.map(item => `
    <article class="insight-card">
      <div>
        <div class="insight-header">
          <span class="cyber-pill" style="font-size: 0.72rem; color: var(--accent-amber); border-color: rgba(245, 176, 65, 0.3);">
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
        <span style="color: var(--accent-cyan);">Peer Review</span>
      </div>
    </article>
  `).join('');
}

// Hexbin Map Tabs & Visualizer Logic
function initHexbinTabs() {
  const tabs = document.querySelectorAll('.hexbin-tab-btn');
  const stage = document.getElementById('hexbin-stage-container');
  const contextMapEl = document.getElementById('wma-context-map');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mapId = tab.getAttribute('data-map');
      activeMapId = mapId;

      if (mapId === 'leaflet') {
        if (stage) stage.style.display = 'none';
        if (contextMapEl) {
          contextMapEl.style.display = 'block';
          initLeafletContextMap();
        }
      } else {
        if (stage) stage.style.display = 'grid';
        if (contextMapEl) contextMapEl.style.display = 'none';
        updateHexbinDisplay(mapId);
      }
    });
  });
}

function updateHexbinDisplay(mapId) {
  const mapObj = (appData.hexbin_maps || EMBEDDED_DATA.hexbin_maps).find(m => m.id === mapId);
  if (!mapObj) return;

  const imgEl = document.getElementById('hexbin-active-img');
  const badgeEl = document.getElementById('hexbin-active-badge');
  const titleEl = document.getElementById('hexbin-active-title');
  const descEl = document.getElementById('hexbin-active-desc');
  const methodEl = document.getElementById('hexbin-active-method');

  if (imgEl) {
    imgEl.src = mapObj.file;
    imgEl.alt = mapObj.title;
  }
  if (badgeEl) badgeEl.textContent = mapObj.badge;
  if (titleEl) titleEl.textContent = mapObj.title;
  if (descEl) descEl.textContent = mapObj.description;
  if (methodEl) methodEl.textContent = mapObj.methodology;
}

// Fullscreen Lightbox Modal
window.openLightbox = function() {
  const dialog = document.getElementById('lightbox-dialog');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const currentImg = document.getElementById('hexbin-active-img');
  const currentTitle = document.getElementById('hexbin-active-title');

  if (dialog && lightboxImg && currentImg) {
    lightboxImg.src = currentImg.src;
    lightboxImg.alt = currentImg.alt;
    if (lightboxTitle && currentTitle) {
      lightboxTitle.textContent = currentTitle.textContent;
    }
    dialog.showModal();
  }
};

function initLightbox() {
  const dialog = document.getElementById('lightbox-dialog');
  if (dialog) {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  }
}

// Leaflet Geographic Context Map
function initLeafletContextMap() {
  if (leafletMap) {
    leafletMap.invalidateSize();
    return;
  }

  // Centered at Kaiserebersdorf / Csokorgasse, Vienna 11
  leafletMap = L.map('wma-context-map', {
    center: [48.1568, 16.4712],
    zoom: 15,
    scrollWheelZoom: false
  });

  // Dark cyber tiles (CartoDB Dark Matter)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(leafletMap);

  // General Site Marker
  const marker = L.circleMarker([48.1568, 16.4712], {
    radius: 14,
    fillColor: '#ff5733',
    color: '#ffffff',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.85
  }).addTo(leafletMap);

  marker.bindPopup(`
    <div style="font-family: var(--font-sans); color: #070b12; padding: 0.25rem;">
      <strong style="font-size: 1rem; color: #123456;">Vienna 11 – Csokorgasse</strong><br>
      <span style="font-size: 0.82rem; color: #64748b;">Early Medieval Cemetery (7th–8th c. AD)</span>
      <p style="font-size: 0.8rem; margin-top: 0.4rem; color: #334155;">
        Largest known early medieval burial ground in Vienna with 700+ documented graves.<br>
        <strong>Spatial excavation plans: © Wien Museum</strong>
      </p>
    </div>
  `).openPopup();
}

// Citation Copy Button
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
