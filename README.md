## Interaction Instructions

### A. Core Map Interaction
*   **Pan & Zoom**: Users can navigate by dragging the map (pan) and change the scale using the mouse wheel or trackpad (zoom).
*   **Limiting Boundaries**: The viewport is constrained by `maxBounds`, preventing users from panning outside the Italian region to maintain visual focus.
*   **Stylized Layers**: The map rendering includes a custom noise filter and multiply blending modes to simulate a printed, textured aesthetic.

### B. Tour Stop Markers
*   **Hover State**: Hovering over a marker reveals a popup containing the specific tour date, city name, and venue.
*   **Selection Mode**: Clicking a marker activates it. The selected point enlarges and turns solid blue to indicate depth, while other markers dim to highlight the current selection.

### C. UI Controls
*   **Zoom Track**: The custom progress bar is interactive—users can click anywhere on the track to jump directly to a specific zoom level.
*   **Reset Button**: Clicking **"REST. VIEW"** returns the map to its initial coordinates (Central Italy) and zoom factor, resetting all marker states.
*   **Status Indicator**: A decorative "breathing" green light in the panel header adds to the system's "live" interface aesthetic.

### D. Visual Feedback
*   **Dynamic Overlay**: To ensure visual clarity, decorative elements (grids, radar lines) automatically hide when a zoom action starts (`zoomstart`) and reappear once the movement settles (`zoomend`).
