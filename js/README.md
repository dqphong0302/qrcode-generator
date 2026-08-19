# JavaScript Structure

The application uses small browser modules under `js/modules/`. They share one
private-to-the-project namespace: `window.QRApp`.

## Module Order

Scripts are loaded in this order from `index.html`:

1. `modules/core.js` - shared DOM references, defaults, and state.
2. `modules/theme.js` - dark/light theme persistence.
3. `modules/toast.js` - notifications.
4. `modules/content-type.js` - URL, WiFi, phone, email, text, and VietQR data.
5. `modules/palette.js` - colors and palettes.
6. `modules/qr-engine.js` - QR options and preview generation.
7. `modules/frame.js` - frame composition and canvas rendering.
8. `modules/export.js` - PNG, SVG, clipboard, and fullscreen export.
9. `modules/history.js` - history thumbnails persisted in localStorage.
10. `app.js` - event binding and application startup only.

Keep feature logic in its module. Add new DOM references to `core.js`, then
bind its events in `app.js` only when the behavior spans multiple modules.
