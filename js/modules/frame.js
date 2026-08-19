(function (App) {
  const { DOM, DEFAULTS } = App;

  App.Frame = {
    updateUI() {
      const style = DOM.frameStyleSelect.value;
      const text = DOM.frameTextInput.value.trim();
      const color = DOM.frameColorInput.value || DEFAULTS.frameColor;
      DOM.topBannerBadge.classList.add("hidden");
      DOM.bottomBannerBadge.classList.add("hidden");
      DOM.qrFrameWrapper.style.border = "none";
      DOM.qrFrameWrapper.style.backgroundColor = "transparent";

      const setBadge = (badge) => {
        if (!text) return;
        badge.classList.remove("hidden");
        badge.textContent = text;
        badge.style.backgroundColor = color;
      };
      const setBorder = (border) => {
        DOM.qrFrameWrapper.style.border = border;
        DOM.qrFrameWrapper.style.backgroundColor = DOM.bgTransparentCheck.checked ? "transparent" : DOM.bgColorInput.value;
      };

      if (style === "bottom-badge") {
        setBadge(DOM.bottomBannerBadge);
        setBorder(`3px solid ${color}`);
      } else if (style === "top-banner") {
        setBadge(DOM.topBannerBadge);
        setBorder(`3px solid ${color}`);
      } else if (style === "scan-me") {
        setBadge(DOM.bottomBannerBadge);
        DOM.qrFrameWrapper.style.border = `2px dashed ${color}`;
      }
    },
    async getCompositeCanvas(targetSize = 1000) {
      const blob = await new QRCodeStyling(App.QREngine.buildOptions(targetSize, "canvas")).getRawData("png");
      const qrImg = await new Promise((resolve, reject) => {
        const image = new Image();
        const objectUrl = URL.createObjectURL(blob);
        image.onload = () => { URL.revokeObjectURL(objectUrl); resolve(image); };
        image.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("Không thể tải ảnh QR để xuất")); };
        image.src = objectUrl;
      });

      const frameStyle = DOM.frameStyleSelect.value;
      if (frameStyle === "none") {
        const canvas = document.createElement("canvas");
        canvas.width = targetSize;
        canvas.height = targetSize;
        canvas.getContext("2d").drawImage(qrImg, 0, 0);
        return canvas;
      }

      const frameText = DOM.frameTextInput.value.trim().toUpperCase();
      const frameColor = DOM.frameColorInput.value || DEFAULTS.frameColor;
      const transparent = DOM.bgTransparentCheck.checked;
      const bgColor = transparent ? "transparent" : (DOM.bgColorInput.value || DEFAULTS.bgColor);
      const bannerHeight = frameText ? Math.round(targetSize * 0.16) : 0;
      const canvas = document.createElement("canvas");
      canvas.width = targetSize + 40;
      canvas.height = targetSize + bannerHeight + 40;
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.roundRect(10, 10, canvas.width - 20, canvas.height - 20, 24);
      if (!transparent) { ctx.fillStyle = bgColor; ctx.fill(); }
      ctx.lineWidth = 14;
      ctx.strokeStyle = frameColor;
      ctx.stroke();

      const drawBanner = (y, radius) => {
        if (!frameText) return;
        ctx.fillStyle = frameColor;
        ctx.beginPath();
        ctx.roundRect(10, y, canvas.width - 20, bannerHeight, radius);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = `bold ${Math.round(bannerHeight * 0.42)}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(frameText, canvas.width / 2, y + bannerHeight / 2);
      };

      if (frameStyle === "top-banner") {
        drawBanner(10, [24, 24, 0, 0]);
        ctx.drawImage(qrImg, 20, 20 + bannerHeight, targetSize, targetSize);
      } else {
        ctx.drawImage(qrImg, 20, 20, targetSize, targetSize);
        drawBanner(canvas.height - bannerHeight - 10, [0, 0, 24, 24]);
      }
      return canvas;
    }
  };
})(window.QRApp);
