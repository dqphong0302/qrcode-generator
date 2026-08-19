(function (App) {
  const { DOM } = App;

  App.Export = {
    async run(button, task) {
      button.disabled = true;
      try { return await task(); }
      catch (error) { console.error(error); return null; }
      finally { button.disabled = false; }
    },
    downloadBlob(blob, filename) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
    },
    downloadPNG() {
      return this.run(DOM.downloadPngBtn, async () => {
        const canvas = await App.Frame.getCompositeCanvas();
        const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
        if (blob) {
          this.downloadBlob(blob, `qrcode-pro-${Date.now()}.png`);
          App.Toast.show("Đã tải ảnh PNG HD thành công!", "📥");
        }
      });
    },
    downloadSVG() {
      return this.run(DOM.downloadSvgBtn, async () => {
        const qr = new QRCodeStyling(App.QREngine.buildOptions(1000, "svg"));
        const blob = await qr.getRawData("svg");
        if (blob) {
          this.downloadBlob(blob, `qrcode-pro-${Date.now()}.svg`);
          App.Toast.show("Đã tải vector SVG thành công!", "📐");
        }
      });
    },
    copyImage() {
      return this.run(DOM.copyImageBtn, async () => {
        const canvas = await App.Frame.getCompositeCanvas();
        const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
        if (blob && navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          App.Toast.show("Đã sao chép ảnh QR vào bộ nhớ tạm!", "📋");
        } else {
          App.Toast.show("Trình duyệt không hỗ trợ sao chép ảnh trực tiếp", "ℹ️");
        }
      });
    },
    openFullscreen() {
      return App.Frame.getCompositeCanvas().then(canvas => {
        DOM.fullscreenImg.src = canvas.toDataURL("image/png");
        DOM.fullscreenModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }).catch(error => console.error("Lỗi mở fullscreen:", error));
    },
    closeFullscreen() {
      DOM.fullscreenModal.classList.add("hidden");
      document.body.style.overflow = "";
      DOM.fullscreenImg.src = "";
    }
  };
})(window.QRApp);
