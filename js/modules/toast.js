// QR Toast — thin adapter wrapping PDUI.Toast (vendored pdui.js).
// Old API: App.Toast.show(message, iconEmoji)
// PDUI API: PDUI.Toast.show(message, type, duration)
// PDUI v2 bỏ emoji trong toast: icon cũ chỉ còn dùng để chọn loại (chấm màu).
(function (App) {
  App.Toast = {
    show(message, icon = '✅') {
      window.PDUI.Toast.show(message, icon.startsWith('⚠') ? 'warning' : 'success');
    }
  };
})(window.QRApp);
