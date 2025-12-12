import { tourStops } from './tour-data.js';

// --- CONFIGURATION ---
const ITALY_CENTER = [42.50, 12.5];
const MIN_ZOOM = 5;
const MAX_ZOOM = 9;
const ITALY_BOUNDS = [[35.0, 5.5], [48.0, 19.0]];

// --- MAP INITIALIZATION ---
const map = L.map('map', {
    center: ITALY_CENTER,
    zoom: MIN_ZOOM,
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    maxBounds: ITALY_BOUNDS,
    maxBoundsViscosity: 1.0,
    zoomControl: false, 
    attributionControl: false, 
    scrollWheelZoom: true
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 19, subdomains: 'abcd'
}).addTo(map);

// --- DECORATIONS & GEOJSON ---
// Inject Decorations
const decorSource = document.getElementById('map-decorations-source');
const mapContainer = document.getElementById('map');
if (decorSource && mapContainer) {
    const decorClone = decorSource.firstElementChild.cloneNode(true);
    mapContainer.appendChild(decorClone);
    
    // Zoom Animation Logic
    const overlay = mapContainer.querySelector('.map-overlay-internal');
    map.on('zoomstart', () => overlay.classList.add('hidden'));
    map.on('zoomend', () => overlay.classList.remove('hidden'));
}

// Load Italy GeoJSON
fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/ITA.geo.json')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                return { color: '#005ac0', weight: 1, fillColor: '#005ac0', fillOpacity: 0.1 };
            },
            interactive: false 
        }).addTo(map);
    })
    .catch(err => console.error("Error loading Italy GeoJSON:", err));

// --- MARKERS LOGIC ---
const customIcon = L.divIcon({
    className: 'custom-icon', iconSize: [16, 16], iconAnchor: [8, 8], popupAnchor: [0, -10]
});

let allMarkers = [];

tourStops.forEach(stop => {
    const marker = L.marker(stop.coords, { icon: customIcon }).addTo(map);
    allMarkers.push(marker);
    
    marker.bindPopup(`
        <div style="font-size: 0.8rem; font-weight:700; color:#666; margin-bottom:2px;">${stop.date}</div>
        <div style="color: #005ac0; font-size: 1rem;">${stop.city}</div>
        <div>${stop.venue}</div>
    `);

    marker.on('mouseover', function () { this.openPopup(); });
    marker.on('click', function (e) { 
        this.openPopup();
        e.originalEvent.stopPropagation(); 
        
        allMarkers.forEach(m => {
            const iconEl = m.getElement();
            if(!iconEl) return;

            if (m === marker) {
                iconEl.classList.add('selected'); 
                iconEl.classList.remove('dimmed'); 
            } else {
                iconEl.classList.add('dimmed'); 
                iconEl.classList.remove('selected'); 
            }
        });
    });
});

// --- UI CONTROLS ---
const fillBar = document.getElementById('zoom-fill');
const zoomKnob = document.getElementById('zoom-knob');
const zoomText = document.getElementById('zoom-text');
const zoomTrack = document.getElementById('zoom-track');
const resetBtn = document.getElementById('reset-btn');

function updateUI() {
    const currentZoom = map.getZoom();
    const range = MAX_ZOOM - MIN_ZOOM;
    const val = currentZoom - MIN_ZOOM;
    const percent = (val / range) * 100;
    
    if(fillBar) fillBar.style.width = `${percent}%`;
    if(zoomKnob) zoomKnob.style.left = `${percent}%`;
    if(zoomText) zoomText.innerText = `${val + 1}x`;
}

function resetMarkerState() {
    allMarkers.forEach(m => {
        const iconEl = m.getElement();
        if (iconEl) { iconEl.classList.remove('selected'); iconEl.classList.remove('dimmed'); }
        m.closePopup();
    });
}

// Event Listeners
if(zoomTrack) {
    zoomTrack.addEventListener('click', function(e) {
        const rect = zoomTrack.getBoundingClientRect();
        const percent = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        const newZoom = Math.round(MIN_ZOOM + ((MAX_ZOOM - MIN_ZOOM) * percent));
        map.setZoom(newZoom);
    });
}

if(resetBtn) {
    resetBtn.addEventListener('click', () => { 
        map.setView(ITALY_CENTER, MIN_ZOOM); 
        resetMarkerState(); 
    });
}

map.on('zoomend', updateUI);
map.on('click', () => { resetMarkerState(); });

// Init
updateUI();
