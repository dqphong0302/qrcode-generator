(function (App) {
  App.Toast = {
    timer: null,
    show(message = "Thành công!", icon = "✅") {
      if (this.timer) clearTimeout(this.timer);
      App.DOM.toastMsg.textContent = message;
      App.DOM.toastIcon.textContent = icon;
      App.DOM.toast.classList.add("show");
      this.timer = setTimeout(() => App.DOM.toast.classList.remove("show"), 2500);
    }
  };
})(window.QRApp);
