(function (App) {
  const { DOM, State, DEFAULTS } = App;

  App.ContentType = {
    init() {
      DOM.typePills.forEach(pill => pill.addEventListener("click", () => {
        DOM.typePills.forEach(item => item.classList.remove("active"));
        pill.classList.add("active");
        State.contentType = pill.dataset.type;
        this.updateUI();
        App.QREngine.generate();
      }));
    },
    updateUI() {
      [DOM.typeBlockUrl, DOM.typeBlockWifi, DOM.typeBlockPhone, DOM.typeBlockEmail]
        .forEach(block => block.classList.add("hidden"));

      const showUrl = (label, placeholder) => {
        DOM.typeBlockUrl.classList.remove("hidden");
        DOM.inputLabel.textContent = label;
        DOM.urlInput.placeholder = placeholder;
      };

      switch (State.contentType) {
        case "wifi": DOM.typeBlockWifi.classList.remove("hidden"); break;
        case "phone": DOM.typeBlockPhone.classList.remove("hidden"); break;
        case "email": DOM.typeBlockEmail.classList.remove("hidden"); break;
        case "text": showUrl("Nội dung văn bản / Ghi chú", "Nhập nội dung văn bản bất kỳ..."); break;
        case "vietqr": showUrl("Đường dẫn VietQR / Thanh toán Napas", "https://img.vietqr.io/image/970415-123456789-compact.png"); break;
        default: showUrl("Đường dẫn Website (URL)", DEFAULTS.url);
      }
    },
    getText() {
      switch (State.contentType) {
        case "wifi": {
          const ssid = DOM.wifiSsid.value.trim();
          const pass = DOM.wifiPass.value.trim();
          return `WIFI:S:${ssid};T:${pass ? "WPA" : "nopass"};P:${pass};;`;
        }
        case "phone": return DOM.phoneInput.value.trim() ? `tel:${DOM.phoneInput.value.trim()}` : "tel:0901234567";
        case "email": return DOM.emailInput.value.trim() ? `mailto:${DOM.emailInput.value.trim()}` : "mailto:contact@phongdang.io.vn";
        default: return DOM.urlInput.value.trim() || DEFAULTS.url;
      }
    }
  };
})(window.QRApp);
