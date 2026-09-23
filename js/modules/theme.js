// QR Theme — thin adapter wrapping PDUI.Theme (vendored pdui.js).
// PDUI.Theme handles: localStorage(pd_theme), html class, icon/label via
// data-pd-theme-icon/data-pd-theme-label attributes, and dispatches
// pdui:themechange. The button already has data-pd-theme-toggle.
// QR-specific: toggle also sets .light class and syncs DOM refs for
// backward-compat with modules that read App.DOM.themeIcon.
(function (App) {
  App.Theme = {
    init() {
      this.syncDOM();
      // pdui:themechange fires after PDUI.Theme flips the class — reliable order.
      document.addEventListener("pdui:themechange", () => this.syncDOM());
    },
    syncDOM() {
      const isDark = document.documentElement.classList.contains("dark");
      if (App.DOM.themeLabel) App.DOM.themeLabel.textContent = isDark ? "Light" : "Dark";
      // QR legacy: some modules check html.light
      document.documentElement.classList.toggle("light", !isDark);
    }
  };
})(window.QRApp);
