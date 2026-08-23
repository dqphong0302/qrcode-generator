// QR Toast — thin adapter wrapping PDUI.Toast (vendored pdui.js).
// Old API: App.Toast.show(message, iconEmoji)
// PDUI API: PDUI.Toast.show(message, type, duration)
// This shim maps custom icon → PDUI 'info' type so the emoji still renders.
(function (App) {
  App.Toast = {
    show(message, icon = '✅') {
      window.PDUI.Toast.show(message, 'info');
      // Replace PDUI auto-icon with the custom emoji the caller intended.
      const toastIcon = document.querySelector('#pd-toast [data-pd-toast-icon]');
      if (toastIcon) toastIcon.textContent = icon;
    }
  };
})(window.QRApp);
