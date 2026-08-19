(function (App) {
  const { DOM, State } = App;
  const KEY = "qr_history";
  const MAX = 12;

  const list = (() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
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
      el.innerHTML = `
        <img src="${item.thumb}" alt="QR lịch sử" loading="lazy">
        <div class="history-meta">
          <span class="history-time">${formatTime(item.ts)}</span>
          <span class="history-badge">${item.label}</span>
        </div>
        <div class="history-actions">
          <button type="button" class="history-btn" data-act="view" title="Xem phóng to">👁</button>
          <button type="button" class="history-btn" data-act="download" title="Tải lại PNG">⬇</button>
          <button type="button" class="history-btn danger" data-act="delete" title="Xóa">✕</button>
        </div>`;
      frag.appendChild(el);
    });
    DOM.historyGrid.appendChild(frag);
  }

  App.History = {
    list,
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