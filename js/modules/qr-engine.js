(function (App) {
  const { DOM, State, DEFAULTS } = App;

  App.QREngine = {
    pendingTimer: null,
    schedule() {
      clearTimeout(this.pendingTimer);
      this.pendingTimer = setTimeout(() => this.generate(), 80);
    },
    buildOptions(size, renderType = "canvas") {
      const dotColor = DOM.colorInput.value || DEFAULTS.dotColor;
      const dot2Color = DOM.color2Input.value || DEFAULTS.dot2Color;
      const cornerColor = DOM.cornerColorInput.value || dotColor;
      const bgColor = DOM.bgTransparentCheck.checked ? "transparent" : (DOM.bgColorInput.value || DEFAULTS.bgColor);
      const colorType = DOM.colorTypeSelect.value;
      const dotsOptions = { type: DOM.dotsStyle.value || DEFAULTS.dotsStyle, color: dotColor };

      if (colorType === "linear" || colorType === "radial") {
        dotsOptions.gradient = {
          type: colorType,
          rotation: colorType === "linear" ? 45 : 0,
          colorStops: [{ offset: 0, color: dotColor }, { offset: 1, color: dot2Color }]
        };
      }

      const logoPercent = Number(DOM.logoSize.value) || DEFAULTS.logoSize;
      const marginPx = Number(DOM.logoMargin.value) || DEFAULTS.logoMargin;
      const options = {
        width: size,
        height: size,
        type: renderType,
        data: App.ContentType.getText(),
        margin: size >= 600 ? 16 : 8,
        qrOptions: { errorCorrectionLevel: State.currentLogoData ? "H" : "Q" },
        dotsOptions,
        cornersSquareOptions: { type: DOM.cornersStyle.value || DEFAULTS.cornersStyle, color: cornerColor },
        cornersDotOptions: { type: DOM.cornersStyle.value === "square" ? "square" : "dot", color: cornerColor },
        backgroundOptions: { color: bgColor }
      };

      if (State.currentLogoData) {
        options.image = State.currentLogoData;
        options.imageOptions = {
          crossOrigin: "anonymous",
          margin: size >= 600 ? Math.round(marginPx * 1.5) : marginPx,
          imageSize: Math.max(0.10, Math.min(0.35, logoPercent / 100)),
          hideBackgroundDots: true
        };
      }
      return options;
    },
    async generate() {
      clearTimeout(this.pendingTimer);
      this.pendingTimer = null;
      const text = App.ContentType.getText();
      if (!text) {
        DOM.urlInput.focus();
        DOM.emptyState.classList.remove("hidden");
        DOM.resultArea.classList.add("hidden");
        return;
      }
      try {
        DOM.qrPreview.replaceChildren();
        State.qrCodePreview = new QRCodeStyling(this.buildOptions(300, "canvas"));
        State.qrCodePreview.append(DOM.qrPreview);
        DOM.emptyState.classList.add("hidden");
        DOM.resultArea.classList.remove("hidden");
        App.Frame.updateUI();
        if (App.History) App.History.record();
      } catch (error) {
        console.error("Lỗi tạo mã QR:", error);
      }
    }
  };
})(window.QRApp);
