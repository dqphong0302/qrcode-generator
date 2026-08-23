(function (App) {
  // Khóa theme dùng chung PDUI (pd_theme); di trú từ khóa cũ "qr_theme" nếu có.
  const STORAGE_KEY = "pd_theme";
  const LEGACY_KEY = "qr_theme";

  App.Theme = {
    init() {
      let saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== "dark" && saved !== "light") {
        const legacy = localStorage.getItem(LEGACY_KEY);
        saved = (legacy === "dark" || legacy === "light") ? legacy : App.DEFAULTS.theme;
      }
      this.apply(saved);
      App.DOM.themeToggle.addEventListener("click", () => {
        const isDark = document.documentElement.classList.contains("dark");
        this.apply(isDark ? "light" : "dark");
      });
    },
    apply(theme) {
      const isDark = theme === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.classList.toggle("light", !isDark);
      App.DOM.themeIcon.textContent = isDark ? "☀️" : "🌙";
      App.DOM.themeLabel.textContent = isDark ? "Light" : "Dark";
      localStorage.setItem(STORAGE_KEY, theme);
    }
  };
})(window.QRApp);
