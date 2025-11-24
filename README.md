# Interactive-Tour-Map-Poster

A. Core Map Interaction
1. Pan & Zoom:
   Users can drag the map (pan).
   Users can zoom using the mouse wheel or trackpad.

2. Limiting Boundaries:
   The code sets `maxBounds` to prevent dragging outside of Italy, maintaining visual focus.

3. Stylized Layers:
   The map is overlaid with a noise filter and a multiply blending mode.

B. Tour Stop Markers
1. Hover / Mouseover:
   When the mouse hovers over a blue dot, a popup appears displaying the date, city, and venue.

2. Click / Selection Mode:
  "Spotlight" Effect: When you click on a station:
      2.1. Current station: Enlarges and becomes solid blue, moving to the top of the map hierarchy.
      2.2. Other stations: Shrinks and becomes grayish-transparent, creating a sense of depth and highlighting the currently selected city.


C. UI Controls
1. Zoom Track:
  Click Control: Users can directly click anywhere on the progress bar to smoothly zoom the map to the corresponding level.

2. Reset Button:
   Clicking this button returns the map to its initial center point (central Italy) and initial zoom level, resetting all selected states.

3. Status Indicator:
   A green breathing light animation is present in the upper right corner of the panel.


D. Visual Feedback
1. Hide Decorations During Zooming:
   When you start zooming (zoomstart), the map's decorative layer disappears to avoid visual interference during the zooming process.
