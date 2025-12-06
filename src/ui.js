import { map, allMarkers, resetMarkerState } from './map.js';
import { ITALY_CENTER, MIN_ZOOM, MAX_ZOOM } from './data.js';

// --- UI ELEMENT SELECTION ---
const fillBar = document.getElementById('zoom-fill');
const zoomKnob = document.getElementById('zoom-knob');
const zoomText = document.getElementById('zoom-text');
const zoomTrack = document.getElementById('zoom-track');
const resetBtn = document.getElementById('reset-btn');

// --- ZOOM UI LOGIC ---
function updateUI() {
    const currentZoom = map.getZoom();
    const range = MAX_ZOOM - MIN_ZOOM;
    const val = currentZoom - MIN_ZOOM;
    const percent = (val / range) * 100;
    
    // Ensure percent is between 0 and 100
    const safePercent = Math.min(100, Math.max(0, percent));
    
    fillBar.style.width = `${safePercent}%`;
    zoomKnob.style.left = `${safePercent}%`;
    zoomText.innerText = `${val + 1}x`;
}

zoomTrack.addEventListener('click', function(e) {
    const rect = zoomTrack.getBoundingClientRect();
    const percent = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const newZoom = Math.round(MIN_ZOOM + ((MAX_ZOOM - MIN_ZOOM) * percent));
    map.setZoom(newZoom);
});

// --- MARKER INTERACTION LOGIC ---
allMarkers.forEach(marker => {
    marker.on('mouseover', function (e) { 
        this.openPopup(); 
    });
    
    marker.on('click', function (e) { 
        this.openPopup();
        e.originalEvent.stopPropagation(); 
        
        resetMarkerState(); // Reset all others first
        
        const iconEl = this.getElement();
        if (iconEl) { 
            iconEl.classList.add('selected'); 
            iconEl.classList.remove('dimmed'); 
        }
    });
});

// --- MAP EVENT HANDLERS ---
map.on('zoomend', updateUI);
map.on('click', () => { resetMarkerState(); });
resetBtn.addEventListener('click', () => { 
    map.setView(ITALY_CENTER, MIN_ZOOM); 
    resetMarkerState(); 
});

// --- INITIALIZE UI ---
updateUI();