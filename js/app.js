/* Application wiring. Feature behavior lives in js/modules/. */
(function (App) {
  const { DOM, State, DEFAULTS } = App;

  function bindColorPickers() {
    [
      [DOM.colorInput, DOM.colorHexLabel], [DOM.color2Input, DOM.color2HexLabel],
      [DOM.cornerColorInput, DOM.cornerColorHexLabel], [DOM.bgColorInput, DOM.bgColorHexLabel]
    ].forEach(([input, label]) => input.addEventListener("input", event => {
      label.textContent = event.target.value.toUpperCase();
      App.QREngine.schedule();
    }));
  }

  function bindTabs() {
    DOM.navTabs.forEach(tab => tab.addEventListener("click", () => {
      DOM.navTabs.forEach(item => item.classList.toggle("active", item === tab));
      Object.entries(DOM.tabPanels).forEach(([key, panel]) => panel.classList.toggle("hidden", key !== tab.dataset.tab));
    }));
  }

  function bindRightTabs() {
    DOM.rightTabs.forEach(tab => tab.addEventListener("click", () => {
      DOM.rightTabs.forEach(item => item.classList.toggle("active", item === tab));
      DOM.rpanelPreview.classList.toggle("hidden", tab.dataset.rpanel !== "preview");
      DOM.rpanelHistory.classList.toggle("hidden", tab.dataset.rpanel !== "history");
    }));
  }

  function reset() {
    clearTimeout(App.QREngine.pendingTimer);
    App.QREngine.pendingTimer = null;
    State.contentType = "url";
    DOM.typePills.forEach(pill => pill.classList.toggle("active", pill.dataset.type === "url"));
    App.ContentType.updateUI();

    [DOM.wifiSsid, DOM.wifiPass, DOM.phoneInput, DOM.emailInput].forEach(input => { input.value = ""; });
    DOM.urlInput.value = DEFAULTS.url;
    State.currentLogoData = null;
    DOM.logoInput.value = "";
    DOM.removeLogoBtn.classList.add("hidden");
    DOM.logoSize.value = DEFAULTS.logoSize;
    DOM.logoSizeLabel.textContent = `${DEFAULTS.logoSize}%`;
    DOM.logoMargin.value = DEFAULTS.logoMargin;
    DOM.logoMarginLabel.textContent = `${DEFAULTS.logoMargin}px`;
    DOM.frameStyleSelect.value = DEFAULTS.frameStyle;
    DOM.frameTextInput.value = "";
    DOM.frameColorInput.value = DEFAULTS.frameColor;
    DOM.frameColorHexLabel.textContent = DEFAULTS.frameColor;
    DOM.dotsStyle.value = DEFAULTS.dotsStyle;
    DOM.cornersStyle.value = DEFAULTS.cornersStyle;
    DOM.navTabs.forEach(tab => tab.classList.toggle("active", tab.dataset.tab === "colors"));
    Object.entries(DOM.tabPanels).forEach(([key, panel]) => panel.classList.toggle("hidden", key !== "colors"));
    App.Palette.set(DEFAULTS.dotColor, DEFAULTS.dot2Color, DEFAULTS.bgColor, DEFAULTS.colorType, DEFAULTS.cornerColor);
    App.Toast.show("Đã đặt lại cấu hình mặc định", "🔄");
  }

  function bindEvents() {
    App.Theme.init();
    App.ContentType.init();
    App.History.init();
    bindColorPickers();
    bindTabs();
    bindRightTabs();

    DOM.colorTypeSelect.addEventListener("change", () => { App.Palette.updateColorState(); App.QREngine.generate(); });
    DOM.bgTransparentCheck.addEventListener("change", () => App.QREngine.schedule());
    DOM.frameStyleSelect.addEventListener("change", App.Frame.updateUI.bind(App.Frame));
    DOM.frameTextInput.addEventListener("input", App.Frame.updateUI.bind(App.Frame));
    DOM.frameColorInput.addEventListener("input", event => {
      DOM.frameColorHexLabel.textContent = event.target.value.toUpperCase();
      App.Frame.updateUI();
    });

    DOM.logoInput.addEventListener("change", event => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = event => { State.currentLogoData = event.target.result; DOM.removeLogoBtn.classList.remove("hidden"); App.QREngine.generate(); };
      reader.readAsDataURL(file);
    });
    DOM.removeLogoBtn.addEventListener("click", () => { State.currentLogoData = null; DOM.logoInput.value = ""; DOM.removeLogoBtn.classList.add("hidden"); App.QREngine.generate(); });
    DOM.logoSize.addEventListener("input", event => { DOM.logoSizeLabel.textContent = `${event.target.value}%`; App.QREngine.schedule(); });
    DOM.logoMargin.addEventListener("input", event => { DOM.logoMarginLabel.textContent = `${event.target.value}px`; App.QREngine.schedule(); });
    DOM.dotsStyle.addEventListener("change", () => App.QREngine.generate());
    DOM.cornersStyle.addEventListener("change", () => App.QREngine.generate());
    DOM.urlInput.addEventListener("input", () => App.QREngine.schedule());
    DOM.urlInput.addEventListener("keydown", event => { if (event.key === "Enter") App.QREngine.generate(); });
    DOM.clearUrlBtn.addEventListener("click", () => { DOM.urlInput.value = ""; DOM.urlInput.focus(); App.QREngine.generate(); });
    [DOM.wifiSsid, DOM.wifiPass, DOM.phoneInput, DOM.emailInput].forEach(input => input.addEventListener("input", () => App.QREngine.schedule()));

    DOM.generateBtn.addEventListener("click", () => App.QREngine.generate());
    DOM.clearBtn.addEventListener("click", reset);
    DOM.downloadPngBtn.addEventListener("click", () => App.Export.downloadPNG());
    DOM.downloadSvgBtn.addEventListener("click", () => App.Export.downloadSVG());
    DOM.copyImageBtn.addEventListener("click", () => App.Export.copyImage());
    DOM.qrCard.addEventListener("click", () => App.Export.openFullscreen());
    DOM.closeFullscreenBtn.addEventListener("click", event => { event.stopPropagation(); App.Export.closeFullscreen(); });
    DOM.modalBackdrop.addEventListener("click", event => { if (event.target === DOM.modalBackdrop) App.Export.closeFullscreen(); });
    window.addEventListener("keydown", event => { if (event.key === "Escape") App.Export.closeFullscreen(); });
  }

  function init() {
    bindEvents();
    App.QREngine.generate();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(window.QRApp);
