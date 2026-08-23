(function (App) {
  const { DOM, State } = App;
  const KEY = "qr_history";
  const MAX = 12;
  let recordTimer = null;
  const MAX_IMAGE_DATA_LENGTH = 3_000_000;
  const DOT_TYPES = new Set(["square", "dots", "rounded", "classy", "classy-rounded", "extra-rounded"]);
  const CORNER_TYPES = new Set(["square", "dot", "extra-rounded"]);
  const ERROR_LEVELS = new Set(["L", "M", "Q", "H"]);

  function color(value, fallback) {
    return typeof value === "string" && (/^#[0-9a-f]{6}$/i.test(value) || value === "transparent") ? value : fallback;
  }

  function sanitizeOptions(value) {
    if (!value || typeof value !== "object" || typeof value.data !== "string") return null;
    const dots = value.dotsOptions && typeof value.dotsOptions === "object" ? value.dotsOptions : {};
    const square = value.cornersSquareOptions && typeof value.cornersSquareOptions === "object" ? value.cornersSquareOptions : {};
    const cornerDot = value.cornersDotOptions && typeof value.cornersDotOptions === "object" ? value.cornersDotOptions : {};
    const background = value.backgroundOptions && typeof value.backgroundOptions === "object" ? value.backgroundOptions : {};
    const qr = value.qrOptions && typeof value.qrOptions === "object" ? value.qrOptions : {};
    const safe = {
      data: value.data.slice(0, 8192),
      margin: Math.max(0, Math.min(64, Number(value.margin) || 8)),
      qrOptions: { errorCorrectionLevel: ERROR_LEVELS.has(qr.errorCorrectionLevel) ? qr.errorCorrectionLevel : "Q" },
      dotsOptions: {
        type: DOT_TYPES.has(dots.type) ? dots.type : "dots",
        color: color(dots.color, "#1e40af")
      },
      cornersSquareOptions: {
        type: CORNER_TYPES.has(square.type) ? square.type : "extra-rounded",
        color: color(square.color, "#1e40af")
      },
      cornersDotOptions: {
        type: cornerDot.type === "square" ? "square" : "dot",
        color: color(cornerDot.color, "#1e40af")
      },
      backgroundOptions: { color: color(background.color, "#FFFFFF") }
    };
    if (dots.gradient && typeof dots.gradient === "object" && ["linear", "radial"].includes(dots.gradient.type)) {
      const stops = Array.isArray(dots.gradient.colorStops) ? dots.gradient.colorStops.slice(0, 2) : [];
      if (stops.length === 2) {
        safe.dotsOptions.gradient = {
          type: dots.gradient.type,
          rotation: Math.max(0, Math.min(360, Number(dots.gradient.rotation) || 0)),
          colorStops: stops.map((stop, index) => ({ offset: index, color: color(stop?.color, index ? "#4F46E5" : "#1e40af") }))
        };
      }
    }
    if (typeof value.image === "string" && /^data:image\/(?:png|jpeg|webp);base64,/i.test(value.image) && value.image.length <= MAX_IMAGE_DATA_LENGTH) {
      const imageOptions = value.imageOptions && typeof value.imageOptions === "object" ? value.imageOptions : {};
      safe.image = value.image;
      safe.imageOptions = {
        crossOrigin: "anonymous",
        margin: Math.max(0, Math.min(30, Number(imageOptions.margin) || 0)),
        imageSize: Math.max(0.1, Math.min(0.35, Number(imageOptions.imageSize) || 0.22)),
        hideBackgroundDots: imageOptions.hideBackgroundDots !== false
      };
    }
    return safe;
  }

  function sanitizeItem(item, index) {
    if (!item || typeof item !== "object") return null;
    const opts = sanitizeOptions(item.opts);
    if (!opts || typeof item.thumb !== "string" || !/^data:image\/png;base64,/i.test(item.thumb) || item.thumb.length > 500_000) return null;
    return {
      id: typeof item.id === "string" && /^[a-zA-Z0-9_-]{1,80}$/.test(item.id) ? item.id : `restored-${index}`,
      ts: Number.isFinite(Number(item.ts)) ? Number(item.ts) : Date.now(),
      data: JSON.stringify(opts),
      thumb: item.thumb,
      opts,
      label: ["WiFi", "SĐT", "Email", "Văn bản", "VietQR", "URL"].includes(item.label) ? item.label : "URL"
    };
  }

  const list = (() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(parsed) ? parsed.slice(0, MAX).map(sanitizeItem).filter(Boolean) : [];
    } catch {
      localStorage.removeItem(KEY);
      return [];
    }
  })();

  function persist() {
    while (list.length) {
      try { localStorage.setItem(KEY, JSON.stringify(list)); return; }
      catch (e) { list.pop(); }
    }
    localStorage.removeItem(KEY);
  }

  function formatTime(ts) {
    const d = new Date(ts);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  }

  function typeLabel() {
    switch (State.contentType) {
      case "wifi": return "WiFi";
      case "phone": return "SĐT";
      case "email": return "Email";
      case "text": return "Văn bản";
      case "vietqr": return "VietQR";
      default: return "URL";
    }
  }

  async function rebuild(item, size) {
    const qr = new QRCodeStyling({ ...item.opts, width: size, height: size });
    const blob = await qr.getRawData("png");
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  function render() {
    DOM.historyCount.textContent = list.length;
    DOM.historyGrid.replaceChildren();
    const isEmpty = !list.length;
    DOM.historyEmpty.classList.toggle("hidden", !isEmpty);
    DOM.clearHistoryBtn.classList.toggle("hidden", isEmpty);
    if (isEmpty) return;

    const frag = document.createDocumentFragment();
    list.forEach(item => {
      const el = document.createElement("div");
      el.className = "history-item";
      el.dataset.id = item.id;
      const image = document.createElement("img");
      image.src = item.thumb;
      image.alt = "QR lịch sử";
      image.loading = "lazy";
      const meta = document.createElement("div");
      meta.className = "history-meta";
      const time = document.createElement("span");
      time.className = "history-time";
      time.textContent = formatTime(item.ts);
      const badge = document.createElement("span");
      badge.className = "history-badge";
      badge.textContent = item.label;
      meta.append(time, badge);
      const actions = document.createElement("div");
      actions.className = "history-actions";
      [["view", "Xem phóng to", "👁", ""], ["download", "Tải lại PNG", "⬇", ""], ["delete", "Xóa", "✕", "danger"]]
        .forEach(([act, title, text, extraClass]) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = `history-btn ${extraClass}`.trim();
          button.dataset.act = act;
          button.title = title;
          button.textContent = text;
          actions.appendChild(button);
        });
      el.append(image, meta, actions);
      frag.appendChild(el);
    });
    DOM.historyGrid.appendChild(frag);
  }

  App.History = {
    list,
    scheduleRecord() {
      clearTimeout(recordTimer);
      recordTimer = setTimeout(() => {
        recordTimer = null;
        this.record();
      }, 500);
    },
    init() {
      render();
      DOM.historyGrid.addEventListener("click", async event => {
        const btn = event.target.closest(".history-btn");
        const itemEl = event.target.closest(".history-item");
        if (!btn || !itemEl) return;
        const item = list.find(i => i.id === itemEl.dataset.id);
        if (!item) return;
        const act = btn.dataset.act;
        if (act === "delete") {
          list.splice(list.indexOf(item), 1);
          persist();
          render();
        } else if (act === "download") {
          App.Export.run(btn, async () => {
            const dataUrl = await rebuild(item, 1000);
            const blob = await (await fetch(dataUrl)).blob();
            App.Export.downloadBlob(blob, `qrcode-lich-su-${Date.now()}.png`);
            App.Toast.show("Đã tải lại ảnh PNG HD!", "📥");
          });
        } else if (act === "view") {
          const dataUrl = await rebuild(item, 1000);
          DOM.fullscreenImg.src = dataUrl;
          DOM.fullscreenModal.classList.remove("hidden");
          document.body.style.overflow = "hidden";
        }
      });
      DOM.clearHistoryBtn.addEventListener("click", () => {
        clearTimeout(recordTimer);
        recordTimer = null;
        list.length = 0;
        persist();
        render();
        App.Toast.show("Đã xóa toàn bộ lịch sử", "🗑");
      });
    },
    record() {
      const canvas = DOM.qrPreview.querySelector("canvas");
      if (!canvas) return;
      const opts = App.QREngine.buildOptions(300, "canvas");
      const data = JSON.stringify(opts);
      if (list[0] && list[0].data === data) return;
      const thumb = canvas.toDataURL("image/png");
      if (!thumb || thumb.length < 100) return;
      list.unshift({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        ts: Date.now(),
        data,
        thumb,
        opts,
        label: typeLabel()
      });
      list.length = Math.min(list.length, MAX);
      persist();
      render();
    },
    render
  };
})(window.QRApp);
