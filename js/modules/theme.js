(function (App) {
  App.Theme = {
    init() {
      this.apply(localStorage.getItem("qr_theme") || App.DEFAULTS.theme);
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
      localStorage.setItem("qr_theme", theme);
    }
  };
})(window.QRApp);
