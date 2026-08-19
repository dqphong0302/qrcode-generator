(function (App) {
  const { DOM } = App;

  App.Palette = {
    set(dotColor, dot2Color, bgColor, type, cornerColor) {
      const fields = [
        [DOM.colorInput, DOM.colorHexLabel, dotColor],
        [DOM.color2Input, DOM.color2HexLabel, dot2Color],
        [DOM.bgColorInput, DOM.bgColorHexLabel, bgColor],
        [DOM.cornerColorInput, DOM.cornerColorHexLabel, cornerColor]
      ];
      fields.forEach(([input, label, value]) => {
        input.value = value;
        label.textContent = value.toUpperCase();
      });
      DOM.bgTransparentCheck.checked = false;
      DOM.colorTypeSelect.value = type;
      this.updateColorState();
      App.QREngine.generate();
    },
    updateColorState() {
      const isGradient = DOM.colorTypeSelect.value !== "solid";
      DOM.color2Input.disabled = !isGradient;
      DOM.color2Container.classList.toggle("is-dimmed", !isGradient);
    }
  };

  window.setPalette = (...args) => App.Palette.set(...args);
})(window.QRApp);
