/**
 * ============================================================================
 * QR Generator Pro - Application Logic (app.js)
 * Modular, clean, and easily customizable JavaScript architecture.
 * ============================================================================
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     1. Preset Data (Logos, Palettes)
     -------------------------------------------------------------------------- */
  const PRESET_LOGOS = {
    phongdang: "./assets/favicon.svg",
    vietqr: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%23005BAA'/><text x='50' y='64' font-family='sans-serif' font-size='38' font-weight='900' fill='white' text-anchor='middle'>VQR</text></svg>",
    wifi: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230284C7'><path d='M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.5c3.78 0 7.21 1.54 9.7 4.02L12 19.26 2.3 11.52C4.79 9.04 8.22 7.5 12 7.5z'/></svg>",
    facebook: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231877F2'><path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/></svg>",
    zalo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%230068FF'/><text x='50' y='68' font-family='sans-serif' font-size='48' font-weight='900' fill='white' text-anchor='middle'>Z</text></svg>",
    google: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23EA4335' d='M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z'/><path fill='%234285F4' d='M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z'/><path fill='%23FBBC05' d='M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z'/><path fill='%2334A853' d='M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z'/></svg>"
  };

  /* --------------------------------------------------------------------------
     2. DOM Element References
     -------------------------------------------------------------------------- */
  const DOM = {
    // Theme
    themeToggle: document.getElementById("themeToggle"),
    themeIcon: document.getElementById("themeIcon"),
    themeLabel: document.getElementById("themeLabel"),

    // Toast
    toast: document.getElementById("toast"),
    toastMsg: document.getElementById("toastMsg"),
    toastIcon: document.getElementById("toastIcon"),

    // Content Types
    typePills: document.querySelectorAll(".type-pill"),
    typeBlockUrl: document.getElementById("typeBlockUrl"),
    typeBlockWifi: document.getElementById("typeBlockWifi"),
    typeBlockPhone: document.getElementById("typeBlockPhone"),
    typeBlockEmail: document.getElementById("typeBlockEmail"),
    inputLabel: document.getElementById("inputLabel"),

    // Inputs
    urlInput: document.getElementById("urlInput"),
    urlWrap: document.getElementById("urlWrap"),
    clearUrlBtn: document.getElementById("clearUrlBtn"),
    wifiSsid: document.getElementById("wifiSsid"),
    wifiPass: document.getElementById("wifiPass"),
    phoneInput: document.getElementById("phoneInput"),
    emailInput: document.getElementById("emailInput"),

    // Customization Tabs
    navTabs: document.querySelectorAll(".nav-tab"),
    tabPanels: {
      colors: document.getElementById("tabPanelColors"),
      frame: document.getElementById("tabPanelFrame"),
      logo: document.getElementById("tabPanelLogo"),
      shapes: document.getElementById("tabPanelShapes")
    },

    // Colors
    colorTypeSelect: document.getElementById("colorTypeSelect"),
    colorInput: document.getElementById("colorInput"),
    colorHexLabel: document.getElementById("colorHexLabel"),
    color2Input: document.getElementById("color2Input"),
    color2HexLabel: document.getElementById("color2HexLabel"),
    color2Container: document.getElementById("color2Container"),
    cornerColorInput: document.getElementById("cornerColorInput"),
    cornerColorHexLabel: document.getElementById("cornerColorHexLabel"),
    bgColorInput: document.getElementById("bgColorInput"),
    bgColorHexLabel: document.getElementById("bgColorHexLabel"),
    bgTransparentCheck: document.getElementById("bgTransparentCheck"),

    // Frame
    frameStyleSelect: document.getElementById("frameStyleSelect"),
    frameTextInput: document.getElementById("frameTextInput"),
    frameColorInput: document.getElementById("frameColorInput"),
    frameColorHexLabel: document.getElementById("frameColorHexLabel"),
    qrFrameWrapper: document.getElementById("qrFrameWrapper"),
    topBannerBadge: document.getElementById("topBannerBadge"),
    bottomBannerBadge: document.getElementById("bottomBannerBadge"),

    // Logo
    logoInput: document.getElementById("logoInput"),
    logoSize: document.getElementById("logoSize"),
    logoSizeLabel: document.getElementById("logoSizeLabel"),
    logoMargin: document.getElementById("logoMargin"),
    logoMarginLabel: document.getElementById("logoMarginLabel"),
    removeLogoBtn: document.getElementById("removeLogoBtn"),

    // Shapes
    dotsStyle: document.getElementById("dotsStyle"),
    cornersStyle: document.getElementById("cornersStyle"),

    // Actions & Preview
    generateBtn: document.getElementById("generateBtn"),
    clearBtn: document.getElementById("clearBtn"),
    copyImageBtn: document.getElementById("copyImageBtn"),
    emptyState: document.getElementById("emptyState"),
    resultArea: document.getElementById("resultArea"),
    qrPreview: document.getElementById("qrPreview"),
    qrCard: document.getElementById("qrCard"),
    downloadPngBtn: document.getElementById("downloadPngBtn"),
    downloadSvgBtn: document.getElementById("downloadSvgBtn"),

    // Modal
    fullscreenModal: document.getElementById("fullscreenModal"),
    modalBackdrop: document.getElementById("modalBackdrop"),
    closeFullscreenBtn: document.getElementById("closeFullscreenBtn"),
    fullscreenImg: document.getElementById("fullscreenImg")
  };

  /* --------------------------------------------------------------------------
     3. State Management
     -------------------------------------------------------------------------- */
  const State = {
    contentType: "url",
    currentLogoData: null,
    qrCodePreview: null
  };

  /* --------------------------------------------------------------------------
     4. Theme Module
     -------------------------------------------------------------------------- */
  const Theme = {
    init() {
      const saved = localStorage.getItem("qr_theme") || "dark";
      this.apply(saved);
      DOM.themeToggle.addEventListener("click", () => {
        const isDark = document.documentElement.classList.contains("dark");
        this.apply(isDark ? "light" : "dark");
      });
    },

    apply(theme) {
      const isDark = theme === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.classList.toggle("light", !isDark);
      DOM.themeIcon.textContent = isDark ? "☀️" : "🌙";
      DOM.themeLabel.textContent = isDark ? "Light" : "Dark";
      localStorage.setItem("qr_theme", theme);
    }
  };

  /* --------------------------------------------------------------------------
     5. Toast Notification Module
     -------------------------------------------------------------------------- */
  const Toast = {
    timer: null,
    show(message = "Thành công!", icon = "✅") {
      if (this.timer) clearTimeout(this.timer);
      DOM.toastMsg.textContent = message;
      DOM.toastIcon.textContent = icon;
      DOM.toast.classList.add("show");
      this.timer = setTimeout(() => {
        DOM.toast.classList.remove("show");
      }, 2500);
    }
  };

  /* --------------------------------------------------------------------------
     6. Content Type Handler
     -------------------------------------------------------------------------- */
  const ContentType = {
    init() {
      DOM.typePills.forEach(pill => {
        pill.addEventListener("click", () => {
          DOM.typePills.forEach(p => p.classList.remove("active"));
          pill.classList.add("active");
          State.contentType = pill.dataset.type;
          this.updateUI();
          QREngine.generate();
        });
      });
    },

    updateUI() {
      // Hide all type blocks
      DOM.typeBlockUrl.classList.add("hidden");
      DOM.typeBlockWifi.classList.add("hidden");
      DOM.typeBlockPhone.classList.add("hidden");
      DOM.typeBlockEmail.classList.add("hidden");

      switch (State.contentType) {
        case "url":
          DOM.typeBlockUrl.classList.remove("hidden");
          DOM.inputLabel.textContent = "Đường dẫn Website (URL)";
          DOM.urlInput.placeholder = "https://phongdang.io.vn";
          break;
        case "wifi":
          DOM.typeBlockWifi.classList.remove("hidden");
          break;
        case "phone":
          DOM.typeBlockPhone.classList.remove("hidden");
          break;
        case "email":
          DOM.typeBlockEmail.classList.remove("hidden");
          break;
        case "text":
          DOM.typeBlockUrl.classList.remove("hidden");
          DOM.inputLabel.textContent = "Nội dung văn bản / Ghi chú";
          DOM.urlInput.placeholder = "Nhập nội dung văn bản bất kỳ...";
          break;
        case "vietqr":
          DOM.typeBlockUrl.classList.remove("hidden");
          DOM.inputLabel.textContent = "Đường dẫn VietQR / Thanh toán Napas";
          DOM.urlInput.placeholder = "https://img.vietqr.io/image/970415-123456789-compact.png";
          Palette.setPresetLogo("vietqr");
          break;
      }
    },

    getText() {
      switch (State.contentType) {
        case "wifi": {
          const ssid = (DOM.wifiSsid.value || "").trim();
          const pass = (DOM.wifiPass.value || "").trim();
          const type = pass ? "WPA" : "nopass";
          return `WIFI:S:${ssid};T:${type};P:${pass};;`;
        }
        case "phone": {
          const phone = (DOM.phoneInput.value || "").trim();
          return phone ? `tel:${phone}` : "tel:0901234567";
        }
        case "email": {
          const email = (DOM.emailInput.value || "").trim();
          return email ? `mailto:${email}` : "mailto:contact@phongdang.io.vn";
        }
        default:
          return (DOM.urlInput.value || "").trim() || "https://phongdang.io.vn";
      }
    }
  };

  /* --------------------------------------------------------------------------
     7. Palette & Presets Module
     -------------------------------------------------------------------------- */
  const Palette = {
    set(dotColor, dot2Color, bgColor, type, cornerColor) {
      DOM.colorInput.value = dotColor;
      DOM.colorHexLabel.textContent = dotColor.toUpperCase();

      DOM.color2Input.value = dot2Color;
      DOM.color2HexLabel.textContent = dot2Color.toUpperCase();

      DOM.bgColorInput.value = bgColor;
      DOM.bgColorHexLabel.textContent = bgColor.toUpperCase();
      DOM.bgTransparentCheck.checked = false;

      DOM.cornerColorInput.value = cornerColor;
      DOM.cornerColorHexLabel.textContent = cornerColor.toUpperCase();

      DOM.colorTypeSelect.value = type;
      this.updateColorState();
      QREngine.generate();
    },

    setPresetLogo(key) {
      if (PRESET_LOGOS[key]) {
        State.currentLogoData = PRESET_LOGOS[key];
        DOM.removeLogoBtn.classList.remove("hidden");
        QREngine.generate();
      }
    },

    updateColorState() {
      const isGradient = DOM.colorTypeSelect.value !== "solid";
      DOM.color2Input.disabled = !isGradient;
      DOM.color2Container.style.opacity = isGradient ? "1" : "0.5";
    }
  };

  // Expose palette helpers to window for inline onclicks
  window.setPalette = (d1, d2, bg, type, corner) => Palette.set(d1, d2, bg, type, corner);
  window.setPresetLogo = (key) => Palette.setPresetLogo(key);

  /* --------------------------------------------------------------------------
     8. QR Code Engine (Generation & Config)
     -------------------------------------------------------------------------- */
  const QREngine = {
    buildOptions(size, renderType = "canvas") {
      const text = ContentType.getText();
      const dotColor = DOM.colorInput.value || "#0284C7";
      const dot2Color = DOM.color2Input.value || "#4F46E5";
      const cornerColor = DOM.cornerColorInput.value || dotColor;
      const isTransparent = DOM.bgTransparentCheck.checked;
      const bgColor = isTransparent ? "transparent" : (DOM.bgColorInput.value || "#FFFFFF");
      const dotType = DOM.dotsStyle.value || "dots";
      const cornerType = DOM.cornersStyle.value || "extra-rounded";
      const colorType = DOM.colorTypeSelect.value;

      let dotsOptions = { type: dotType, color: dotColor };
      if (colorType === "linear" || colorType === "radial") {
        dotsOptions.gradient = {
          type: colorType,
          rotation: colorType === "linear" ? 45 : 0,
          colorStops: [
            { offset: 0, color: dotColor },
            { offset: 1, color: dot2Color }
          ]
        };
      }

      const logoPercent = Number(DOM.logoSize.value) || 22;
      const marginPx = Number(DOM.logoMargin.value) || 6;
      const imageSize = Math.max(0.10, Math.min(0.35, logoPercent / 100));

      const options = {
        width: size,
        height: size,
        type: renderType,
        data: text,
        margin: size >= 600 ? 16 : 8,
        qrOptions: { errorCorrectionLevel: State.currentLogoData ? "H" : "Q" },
        dotsOptions: dotsOptions,
        cornersSquareOptions: { type: cornerType, color: cornerColor },
        cornersDotOptions: { type: (cornerType === "square" ? "square" : "dot"), color: cornerColor },
        backgroundOptions: { color: bgColor }
      };

      if (State.currentLogoData) {
        options.image = State.currentLogoData;
        options.imageOptions = {
          crossOrigin: "anonymous",
          margin: size >= 600 ? Math.round(marginPx * 1.5) : marginPx,
          imageSize: imageSize,
          hideBackgroundDots: true
        };
      }

      return options;
    },

    async generate() {
      const text = ContentType.getText();
      if (!text) {
        DOM.urlInput.focus();
        DOM.urlWrap.classList.add("ring-2", "ring-rose-500/70");
        setTimeout(() => DOM.urlWrap.classList.remove("ring-2", "ring-rose-500/70"), 550);
        DOM.emptyState.classList.remove("hidden");
        DOM.resultArea.classList.add("hidden");
        return;
      }

      try {
        DOM.qrPreview.innerHTML = "";
        const opts = this.buildOptions(230, "canvas");
        State.qrCodePreview = new QRCodeStyling(opts);
        State.qrCodePreview.append(DOM.qrPreview);

        DOM.emptyState.classList.add("hidden");
        DOM.resultArea.classList.remove("hidden");
        Frame.updateUI();
      } catch (err) {
        console.error("Lỗi tạo mã QR:", err);
      }
    }
  };

  /* --------------------------------------------------------------------------
     9. Frame & CTA Compositor Module
     -------------------------------------------------------------------------- */
  const Frame = {
    updateUI() {
      const style = DOM.frameStyleSelect.value;
      const text = (DOM.frameTextInput.value || "SCAN ME").trim();
      const color = DOM.frameColorInput.value || "#0284C7";

      DOM.topBannerBadge.classList.add("hidden");
      DOM.bottomBannerBadge.classList.add("hidden");
      DOM.qrFrameWrapper.style.border = "none";
      DOM.qrFrameWrapper.style.backgroundColor = "transparent";

      if (style === "bottom-badge") {
        DOM.bottomBannerBadge.classList.remove("hidden");
        DOM.bottomBannerBadge.textContent = text;
        DOM.bottomBannerBadge.style.backgroundColor = color;
        DOM.qrFrameWrapper.style.border = `3px solid ${color}`;
        DOM.qrFrameWrapper.style.backgroundColor = DOM.bgTransparentCheck.checked ? "transparent" : DOM.bgColorInput.value;
      } else if (style === "top-banner") {
        DOM.topBannerBadge.classList.remove("hidden");
        DOM.topBannerBadge.textContent = text;
        DOM.topBannerBadge.style.backgroundColor = color;
        DOM.qrFrameWrapper.style.border = `3px solid ${color}`;
        DOM.qrFrameWrapper.style.backgroundColor = DOM.bgTransparentCheck.checked ? "transparent" : DOM.bgColorInput.value;
      } else if (style === "scan-me") {
        DOM.bottomBannerBadge.classList.remove("hidden");
        DOM.bottomBannerBadge.textContent = text;
        DOM.bottomBannerBadge.style.backgroundColor = color;
        DOM.qrFrameWrapper.style.border = `2px dashed ${color}`;
      }
    },

    async getCompositeCanvas(targetSize = 1000) {
      const qrStyling = new QRCodeStyling(QREngine.buildOptions(targetSize, "canvas"));
      const blob = await qrStyling.getRawData("png");
      const qrImg = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = URL.createObjectURL(blob);
      });

      const frameStyle = DOM.frameStyleSelect.value;
      if (frameStyle === "none") {
        const canvas = document.createElement("canvas");
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(qrImg, 0, 0);
        return canvas;
      }

      const frameText = (DOM.frameTextInput.value || "SCAN ME").trim().toUpperCase();
      const frameColor = DOM.frameColorInput.value || "#0284C7";
      const isTransparent = DOM.bgTransparentCheck.checked;
      const bgColor = isTransparent ? "transparent" : (DOM.bgColorInput.value || "#FFFFFF");

      const bannerHeight = Math.round(targetSize * 0.16);
      const totalWidth = targetSize + 40;
      const totalHeight = targetSize + bannerHeight + 40;

      const canvas = document.createElement("canvas");
      canvas.width = totalWidth;
      canvas.height = totalHeight;
      const ctx = canvas.getContext("2d");

      if (!isTransparent) {
        ctx.fillStyle = bgColor;
        ctx.roundRect(10, 10, totalWidth - 20, totalHeight - 20, 24);
        ctx.fill();
      }

      ctx.lineWidth = 14;
      ctx.strokeStyle = frameColor;
      ctx.stroke();

      if (frameStyle === "top-banner") {
        ctx.fillStyle = frameColor;
        ctx.beginPath();
        ctx.roundRect(10, 10, totalWidth - 20, bannerHeight, [24, 24, 0, 0]);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = `bold ${Math.round(bannerHeight * 0.42)}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(frameText, totalWidth / 2, 10 + bannerHeight / 2);

        ctx.drawImage(qrImg, 20, 20 + bannerHeight, targetSize, targetSize);
      } else {
        ctx.drawImage(qrImg, 20, 20, targetSize, targetSize);

        ctx.fillStyle = frameColor;
        ctx.beginPath();
        ctx.roundRect(10, totalHeight - bannerHeight - 10, totalWidth - 20, bannerHeight, [0, 0, 24, 24]);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = `bold ${Math.round(bannerHeight * 0.42)}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(frameText, totalWidth / 2, totalHeight - bannerHeight / 2 - 10);
      }

      return canvas;
    }
  };

  /* --------------------------------------------------------------------------
     10. Export & Utilities Module
     -------------------------------------------------------------------------- */
  const Export = {
    downloadBlob(blob, filename) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },

    async downloadPNG() {
      try {
        DOM.downloadPngBtn.disabled = true;
        const canvas = await Frame.getCompositeCanvas(1000);
        canvas.toBlob((blob) => {
          if (blob) {
            this.downloadBlob(blob, `qrcode-pro-${Date.now()}.png`);
            Toast.show("Đã tải ảnh PNG HD thành công!", "📥");
          }
        }, "image/png");
      } catch (err) {
        console.error("Lỗi xuất PNG:", err);
      } finally {
        DOM.downloadPngBtn.disabled = false;
      }
    },

    async downloadSVG() {
      try {
        DOM.downloadSvgBtn.disabled = true;
        const hd = new QRCodeStyling(QREngine.buildOptions(1000, "svg"));
        const blob = await hd.getRawData("svg");
        if (blob) {
          this.downloadBlob(blob, `qrcode-pro-${Date.now()}.svg`);
          Toast.show("Đã tải vector SVG thành công!", "📐");
        }
      } catch (err) {
        console.error("Lỗi xuất SVG:", err);
      } finally {
        DOM.downloadSvgBtn.disabled = false;
      }
    },

    async copyImage() {
      try {
        DOM.copyImageBtn.disabled = true;
        const canvas = await Frame.getCompositeCanvas(1000);
        canvas.toBlob(async (blob) => {
          if (blob && navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob })
            ]);
            Toast.show("Đã sao chép ảnh QR vào bộ nhớ tạm!", "📋");
          } else {
            Toast.show("Trình duyệt không hỗ trợ sao chép ảnh trực tiếp", "ℹ️");
          }
        }, "image/png");
      } catch (err) {
        console.error("Lỗi sao chép ảnh:", err);
        Toast.show("Không thể sao chép ảnh", "⚠️");
      } finally {
        DOM.copyImageBtn.disabled = false;
      }
    },

    async openFullscreen() {
      try {
        const canvas = await Frame.getCompositeCanvas(1000);
        DOM.fullscreenImg.src = canvas.toDataURL("image/png");
        DOM.fullscreenModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      } catch (err) {
        console.error("Lỗi mở fullscreen:", err);
      }
    },

    closeFullscreen() {
      DOM.fullscreenModal.classList.add("hidden");
      document.body.style.overflow = "";
      DOM.fullscreenImg.src = "";
    }
  };

  /* --------------------------------------------------------------------------
     11. Main App Initialization & Events
     -------------------------------------------------------------------------- */
  function initApp() {
    Theme.init();
    ContentType.init();

    // Tab Navigation
    DOM.navTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        DOM.navTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const tabKey = tab.dataset.tab;
        Object.keys(DOM.tabPanels).forEach(key => {
          if (key === tabKey) {
            DOM.tabPanels[key].classList.remove("hidden");
          } else {
            DOM.tabPanels[key].classList.add("hidden");
          }
        });
      });
    });

    // Color pickers & type
    DOM.colorTypeSelect.addEventListener("change", () => {
      Palette.updateColorState();
      QREngine.generate();
    });

    DOM.colorInput.addEventListener("input", (e) => {
      DOM.colorHexLabel.textContent = e.target.value.toUpperCase();
      QREngine.generate();
    });
    DOM.color2Input.addEventListener("input", (e) => {
      DOM.color2HexLabel.textContent = e.target.value.toUpperCase();
      QREngine.generate();
    });
    DOM.cornerColorInput.addEventListener("input", (e) => {
      DOM.cornerColorHexLabel.textContent = e.target.value.toUpperCase();
      QREngine.generate();
    });
    DOM.bgColorInput.addEventListener("input", (e) => {
      DOM.bgColorHexLabel.textContent = e.target.value.toUpperCase();
      QREngine.generate();
    });
    DOM.bgTransparentCheck.addEventListener("change", () => QREngine.generate());

    // Frame inputs
    DOM.frameStyleSelect.addEventListener("change", () => Frame.updateUI());
    DOM.frameTextInput.addEventListener("input", () => Frame.updateUI());
    DOM.frameColorInput.addEventListener("input", (e) => {
      DOM.frameColorHexLabel.textContent = e.target.value.toUpperCase();
      Frame.updateUI();
    });

    // Logo Upload & Sliders
    DOM.logoInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          State.currentLogoData = evt.target.result;
          DOM.removeLogoBtn.classList.remove("hidden");
          QREngine.generate();
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });

    DOM.removeLogoBtn.addEventListener("click", () => {
      State.currentLogoData = null;
      DOM.logoInput.value = "";
      DOM.removeLogoBtn.classList.add("hidden");
      QREngine.generate();
    });

    DOM.logoSize.addEventListener("input", (e) => {
      DOM.logoSizeLabel.textContent = `${e.target.value}%`;
      QREngine.generate();
    });

    DOM.logoMargin.addEventListener("input", (e) => {
      DOM.logoMarginLabel.textContent = `${e.target.value}px`;
      QREngine.generate();
    });

    // Shapes
    DOM.dotsStyle.addEventListener("change", () => QREngine.generate());
    DOM.cornersStyle.addEventListener("change", () => QREngine.generate());

    // Input text & Clear
    DOM.urlInput.addEventListener("input", () => QREngine.generate());
    DOM.urlInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") QREngine.generate();
    });

    if (DOM.clearUrlBtn) {
      DOM.clearUrlBtn.addEventListener("click", () => {
        DOM.urlInput.value = "";
        DOM.urlInput.focus();
        QREngine.generate();
      });
    }

    [DOM.wifiSsid, DOM.wifiPass, DOM.phoneInput, DOM.emailInput].forEach(inp => {
      if (inp) inp.addEventListener("input", () => QREngine.generate());
    });

    // Action Buttons
    DOM.generateBtn.addEventListener("click", () => QREngine.generate());
    DOM.clearBtn.addEventListener("click", () => {
      DOM.urlInput.value = "https://phongdang.io.vn";
      State.currentLogoData = null;
      DOM.logoInput.value = "";
      DOM.removeLogoBtn.classList.add("hidden");
      DOM.frameStyleSelect.value = "none";
      Palette.set('#0284C7', '#0369A1', '#FFFFFF', 'solid', '#0284C7');
      Toast.show("Đã đặt lại cấu hình mặc định", "🔄");
    });

    DOM.downloadPngBtn.addEventListener("click", () => Export.downloadPNG());
    DOM.downloadSvgBtn.addEventListener("click", () => Export.downloadSVG());
    DOM.copyImageBtn.addEventListener("click", () => Export.copyImage());

    // Modal Zoom
    DOM.qrCard.addEventListener("click", () => Export.openFullscreen());
    DOM.closeFullscreenBtn.addEventListener("click", (e) => { e.stopPropagation(); Export.closeFullscreen(); });
    DOM.modalBackdrop.addEventListener("click", (e) => { if (e.target === DOM.modalBackdrop) Export.closeFullscreen(); });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") Export.closeFullscreen(); });

    // Initial QR Render
    QREngine.generate();
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
