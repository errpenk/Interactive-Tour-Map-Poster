import { ITALY_CENTER, MIN_ZOOM, MAX_ZOOM, ITALY_BOUNDS, GEOJSON_URL, tourStops } from './data.js';

// --- MAP INIT ---
export const map = L.map('map', {
    center: ITALY_CENTER,
    zoom: MIN_ZOOM,
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    maxBounds: ITALY_BOUNDS,
    maxBoundsViscosity: 1.0,
    zoomControl: false, attributionControl: false, scrollWheelZoom: true
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 19, subdomains: 'abcd'
}).addTo(map);

// --- MAP DECORATIONS INJECTION ---
const decorSource = document.getElementById('map-decorations-source');
const mapContainer = document.getElementById('map');
const decorClone = decorSource.firstElementChild.cloneNode(true);
mapContainer.appendChild(decorClone);

// Export overlay element for UI to manipulate
export const mapOverlay = mapContainer.querySelector('.map-overlay-internal');

// Zoom Animation Logic for Decorations
map.on('zoomstart', () => {
    mapOverlay.classList.add('hidden');
});
map.on('zoomend', () => {
    mapOverlay.classList.remove('hidden');
});

// --- LOAD GEOJSON BOUNDARY ---
fetch(GEOJSON_URL)
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

// --- MARKER CREATION ---
const customIcon = L.divIcon({
    className: 'custom-icon', iconSize: [16, 16], iconAnchor: [8, 8], popupAnchor: [0, -10]
});

export const allMarkers = [];

tourStops.forEach(stop => {
    const marker = L.marker(stop.coords, { icon: customIcon }).addTo(map);
    allMarkers.push(marker);
    marker.bindPopup(`
        <div style="font-size: 0.8rem; font-weight:700; color:#666; margin-bottom:2px;">${stop.date}</div>
        <div style="color: #005ac0; font-size: 1rem;">${stop.city}</div>
        <div>${stop.venue}</div>
    `);
});

// Utility function for outside use
export function resetMarkerState() {
    allMarkers.forEach(m => {
        const iconEl = m.getElement();
        if (iconEl) { iconEl.classList.remove('selected'); iconEl.classList.remove('dimmed'); }
        m.closePopup();
    });
}