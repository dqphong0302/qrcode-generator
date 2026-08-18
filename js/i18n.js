/**
 * QR Generator Pro - Internationalization (i18n) Module
 * English and Vietnamese bilingual dictionary & reactive switcher
 */

export const translations = {
  vi: {
    appTitle: 'QR Generator Pro',
    appSubtitle: 'qr.phongdang.io.vn',
    badgePro: 'PRO',
    ecosystemLink: 'Hệ sinh thái phongdang.io.vn ↗',
    themeLight: 'Giao diện Sáng',
    themeDark: 'Giao diện Tối',
    langToggle: 'English',

    // Steps
    step1Title: '1. Chọn Loại Nội Dung & Dữ Liệu',
    step2Title: '2. Chọn Phong Cách Mã QR',
    step3Title: '3. Tùy Biến Chi Tiết Nâng Cao',
    step4Title: '4. Lịch Sử Đã Tạo (LocalStorage)',

    // Style Modes
    modeClassic: '⬛ Mẫu Thường (Classic)',
    modeCustom: '🎨 Tùy Biến Nâng Cao (Custom Pro)',
    quickPaletteTitle: 'Bảng Màu Phối Sẵn (Quick Palettes)',

    // Content Types
    typeUrl: 'URL / Web',
    typeVietqr: 'VietQR Ngân Hàng',
    typeWifi: 'Mạng WiFi',
    typeVcard: 'Danh Thiếp (vCard)',
    typeText: 'Văn Bản',
    typeEmail: 'Email',
    typePhone: 'Điện Thoại',
    typeSms: 'SMS',
    typeLocation: 'Vị Trí Bản Đồ',
    typeEvent: 'Sự Kiện',
    typeBatch: 'In Hàng Loạt (A4)',

    // Form labels
    urlLabel: 'Địa chỉ Website / Đường dẫn URL',
    urlHint: 'Tự động chuẩn hóa https:// nếu thiếu',
    bankLabel: 'Ngân hàng thụ hưởng',
    accountNoLabel: 'Số tài khoản *',
    accountNameLabel: 'Tên chủ tài khoản',
    amountLabel: 'Số tiền (VNĐ - Tùy chọn)',
    memoLabel: 'Nội dung chuyển khoản',
    wifiSsidLabel: 'Tên mạng WiFi (SSID) *',
    wifiPassLabel: 'Mật khẩu WiFi',
    wifiEncLabel: 'Chuẩn bảo mật',
    wifiHiddenLabel: 'Mạng ẩn (Hidden SSID)',
    fullNameLabel: 'Họ & Tên *',
    titleLabel: 'Chức danh',
    phoneLabel: 'Số điện thoại',
    emailLabel: 'Email',
    orgLabel: 'Tổ chức / Công ty',
    websiteLabel: 'Website',
    addressLabel: 'Địa chỉ',
    textLabel: 'Nội dung văn bản / Markdown',
    emailToLabel: 'Địa chỉ Email người nhận',
    emailSubjLabel: 'Tiêu đề Email',
    emailBodyLabel: 'Nội dung thư',
    phoneDirectLabel: 'Số điện thoại gọi trực tiếp',
    smsPhoneLabel: 'Số điện thoại nhận tin nhắn',
    smsMessageLabel: 'Nội dung tin nhắn SMS',
    locSearchLabel: 'Tìm kiếm địa điểm (Google Maps)',
    locLatLabel: 'Vĩ độ (Latitude)',
    locLngLabel: 'Kinh độ (Longitude)',
    eventTitleLabel: 'Tên sự kiện *',
    eventLocLabel: 'Địa điểm tổ chức',
    eventStartLabel: 'Bắt đầu',
    eventEndLabel: 'Kết thúc',
    eventDescLabel: 'Mô tả sự kiện',

    // Batch A4
    batchLabel: 'Danh sách tạo hàng loạt (Mỗi dòng 1 mã: Tên | Dữ liệu)',
    batchPlaceholder: 'Thiết bị 01 | https://phongdang.io.vn/item1\nThiết bị 02 | https://phongdang.io.vn/item2\nWiFi Khách | WIFI:S:Guest;T:WPA;P:12345678;;',
    batchBtn: '🖨️ Xem & In Khung A4 (25 mã/trang)',

    // Actions
    btnGenerate: '✨ Cập Nhật QR',
    btnClear: '🗑️ Xóa / Reset',

    // Accordions
    accColors: 'Màu Sắc & Gradient Điểm Mã',
    accShapes: 'Hình Dáng Hạt & Khung Góc',
    accLogo: 'Logo & Biểu Tượng Trung Tâm',
    accFrame: 'Khung Viền & Nhãn Kêu Gọi (CTA)',
    accTech: 'Mức Độ Phục Hồi Lỗi (Error Correction)',

    // Color options
    dotsColorTypeLabel: 'Kiểu tô màu hạt QR',
    colorSolid: 'Đơn Sắc (Solid Color)',
    colorLinear: 'Gradient Tuyến Tính (Linear)',
    colorRadial: 'Gradient Tỏa Tròn (Radial)',
    dotColor1Label: 'Màu chính / Bắt đầu',
    dotColor2Label: 'Màu thứ hai (Gradient)',
    bgColorLabel: 'Màu nền QR',
    bgTransparentLabel: 'Nền Trong Suốt (PNG/SVG)',
    contrastHigh: '🟢 Độ tương phản Rất Tốt (Dễ quét mã)',
    contrastMed: '🟡 Độ tương phản Trung Bình',
    contrastLow: '🔴 Cảnh báo: Độ tương phản thấp (Khó quét mã)',

    // Shape options
    dotsShapeLabel: 'Kiểu hạt dữ liệu (Dots Shape)',
    shapeExtraRounded: 'Bo Tròn Lớn',
    shapeRounded: 'Bo Tròn',
    shapeDots: 'Hạt Tròn',
    shapeClassyRounded: 'Thanh Lịch Bo',
    shapeClassy: 'Thanh Lịch',
    shapeSquare: 'Vuông Chuẩn (Mẫu Thường)',
    cornerSquareLabel: 'Khung viền góc (Corner Squares)',
    cornerDotLabel: 'Tâm điểm góc (Corner Dots)',
    cornerExtraRounded: 'Bo Viền Tròn',
    cornerDot: 'Tròn Hoàn Toàn',
    cornerSquare: 'Vuông Vắn',

    // Logo options
    logoUploadPrompt: 'Kéo & Thả hoặc Bấm chọn ảnh Logo',
    logoUploadHint: 'PNG, SVG, JPG (Tối đa 2MB)',
    logoPresetLabel: 'Chọn nhanh biểu tượng phổ biến',
    logoSizeLabel: 'Kích thước Logo:',
    logoMarginLabel: 'Khoảng đệm (Margin):',
    removeLogoBtn: '✕ Gỡ bỏ logo',

    // Frame options
    frameStyleLabel: 'Kiểu dáng khung viền',
    frameBottomBadge: 'Huy Hiệu Dưới',
    frameTopBanner: 'Banner Trên',
    frameScanMe: 'Scan Me',
    frameNone: 'Không Khung',
    frameTextLabel: 'Chữ hiển thị trên khung',
    frameColorLabel: 'Màu sắc khung',

    // Tech options
    eccLabel: 'Mức phục hồi mã (ECC Level)',
    eccHint: 'Tự động nâng lên cấp Cao khi có logo',

    // History
    historySearchPlaceholder: '🔍 Tìm kiếm trong lịch sử...',
    historyEmpty: 'Chưa có mã nào được lưu trong lịch sử.',
    historyEmptySearch: 'Không tìm thấy kết quả phù hợp.',
    exportJsonBtn: 'Xuất JSON',
    importJsonBtn: 'Nạp JSON',
    clearHistoryBtn: 'Dọn sạch',

    // Preview & Modal
    liveStatus: 'Trực Tiếp (Live Ready)',
    previewHint: '🔍 Nhấn vào ảnh QR để phóng to toàn màn hình',
    modalCloseBtn: 'Đóng ✕',
    modalDismissHint: 'Nhấn ra ngoài hoặc bấm ESC để đóng',
    resLabel: 'Độ phân giải xuất:',
    btnCopyImage: 'Sao Chép Ảnh Vào Clipboard',
    btnDownloadPng: 'Tải PNG (HD / 4K)',
    btnDownloadSvg: 'Tải SVG (Vector)',
    btnDownloadWebp: 'Tải WEBP',
    btnDownloadPdf: 'Xuất Thẻ PDF',

    // Footer
    footerPrivacy: 'Bảo mật 100% Client-Side (Không gửi dữ liệu lên máy chủ)',
    footerCopyright: '© 2026 QR Generator Pro — Một sản phẩm trong hệ sinh thái phongdang.io.vn.'
  },

  en: {
    appTitle: 'QR Generator Pro',
    appSubtitle: 'qr.phongdang.io.vn',
    badgePro: 'PRO',
    ecosystemLink: 'Ecosystem phongdang.io.vn ↗',
    themeLight: 'Light Theme',
    themeDark: 'Dark Theme',
    langToggle: 'Tiếng Việt',

    // Steps
    step1Title: '1. Select Content Type & Enter Data',
    step2Title: '2. Choose QR Code Style',
    step3Title: '3. Advanced Customization',
    step4Title: '4. Generation History (LocalStorage)',

    // Style Modes
    modeClassic: '⬛ Classic Standard QR',
    modeCustom: '🎨 Custom Pro Designer',
    quickPaletteTitle: 'Quick Color Palettes',

    // Content Types
    typeUrl: 'URL / Web',
    typeVietqr: 'VietQR / Banking',
    typeWifi: 'WiFi Network',
    typeVcard: 'Contact (vCard)',
    typeText: 'Plain Text',
    typeEmail: 'Email',
    typePhone: 'Phone Call',
    typeSms: 'SMS Message',
    typeLocation: 'Location (Map)',
    typeEvent: 'Event (Calendar)',
    typeBatch: 'Batch Print (A4)',

    // Form labels
    urlLabel: 'Website Address / URL',
    urlHint: 'Auto-appends https:// if missing',
    bankLabel: 'Beneficiary Bank',
    accountNoLabel: 'Account Number *',
    accountNameLabel: 'Account Holder Name',
    amountLabel: 'Amount (VND - Optional)',
    memoLabel: 'Transfer Reference / Memo',
    wifiSsidLabel: 'WiFi Name (SSID) *',
    wifiPassLabel: 'WiFi Password',
    wifiEncLabel: 'Security Type',
    wifiHiddenLabel: 'Hidden Network (SSID)',
    fullNameLabel: 'Full Name *',
    titleLabel: 'Job Title',
    phoneLabel: 'Phone Number',
    emailLabel: 'Email Address',
    orgLabel: 'Company / Organization',
    websiteLabel: 'Website',
    addressLabel: 'Address',
    textLabel: 'Text Content / Markdown',
    emailToLabel: 'Recipient Email Address',
    emailSubjLabel: 'Email Subject',
    emailBodyLabel: 'Email Message Body',
    phoneDirectLabel: 'Direct Dial Phone Number',
    smsPhoneLabel: 'Recipient Phone Number',
    smsMessageLabel: 'SMS Message Text',
    locSearchLabel: 'Search Location (Google Maps)',
    locLatLabel: 'Latitude',
    locLngLabel: 'Longitude',
    eventTitleLabel: 'Event Title *',
    eventLocLabel: 'Event Location',
    eventStartLabel: 'Start Time',
    eventEndLabel: 'End Time',
    eventDescLabel: 'Event Description',

    // Batch A4
    batchLabel: 'Batch QR List (One per line: Title | Payload)',
    batchPlaceholder: 'Device 01 | https://phongdang.io.vn/item1\nDevice 02 | https://phongdang.io.vn/item2\nGuest WiFi | WIFI:S:Guest;T:WPA;P:12345678;;',
    batchBtn: '🖨️ Generate & Print A4 Sheet (25 per page)',

    // Actions
    btnGenerate: '✨ Update QR',
    btnClear: '🗑️ Clear / Reset',

    // Accordions
    accColors: 'Colors & Gradient Dots',
    accShapes: 'Dot Shapes & Corner Eyes',
    accLogo: 'Center Logo & Icons',
    accFrame: 'Frames & Call-to-Action (CTA)',
    accTech: 'Error Correction (ECC Level)',

    // Color options
    dotsColorTypeLabel: 'Dot Color Fill Type',
    colorSolid: 'Solid Color',
    colorLinear: 'Linear Gradient',
    colorRadial: 'Radial Gradient',
    dotColor1Label: 'Primary / Start Color',
    dotColor2Label: 'Secondary (Gradient) Color',
    bgColorLabel: 'Background Color',
    bgTransparentLabel: 'Transparent Background (PNG/SVG)',
    contrastHigh: '🟢 Excellent Contrast (Easy to scan)',
    contrastMed: '🟡 Medium Contrast',
    contrastLow: '🔴 Warning: Low Contrast (Hard to scan)',

    // Shape options
    dotsShapeLabel: 'Data Dots Shape',
    shapeExtraRounded: 'Extra Rounded',
    shapeRounded: 'Rounded',
    shapeDots: 'Dots / Circles',
    shapeClassyRounded: 'Classy Rounded',
    shapeClassy: 'Classy',
    shapeSquare: 'Standard Square (Classic)',
    cornerSquareLabel: 'Corner Eye Frame',
    cornerDotLabel: 'Corner Eye Center',
    cornerExtraRounded: 'Rounded Frame',
    cornerDot: 'Circle Dot',
    cornerSquare: 'Square',

    // Logo options
    logoUploadPrompt: 'Drag & Drop or Click to Upload Logo',
    logoUploadHint: 'PNG, SVG, JPG (Max 2MB)',
    logoPresetLabel: 'Quick Preset Icons',
    logoSizeLabel: 'Logo Size:',
    logoMarginLabel: 'Margin Padding:',
    removeLogoBtn: '✕ Remove logo',

    // Frame options
    frameStyleLabel: 'Frame / Banner Style',
    frameBottomBadge: 'Bottom Badge',
    frameTopBanner: 'Top Banner',
    frameScanMe: 'Scan Me Box',
    frameNone: 'No Frame',
    frameTextLabel: 'Banner Text',
    frameColorLabel: 'Frame Color',

    // Tech options
    eccLabel: 'Error Correction Level (ECC)',
    eccHint: 'Auto-boosted to High when a logo is used',

    // History
    historySearchPlaceholder: '🔍 Search history...',
    historyEmpty: 'No QR codes saved in history yet.',
    historyEmptySearch: 'No matching items found.',
    exportJsonBtn: 'Export JSON',
    importJsonBtn: 'Import JSON',
    clearHistoryBtn: 'Clear',

    // Preview & Modal
    liveStatus: 'Live Ready',
    previewHint: '🔍 Click QR code to view fullscreen HD',
    modalCloseBtn: 'Close ✕',
    modalDismissHint: 'Click outside or press ESC to close',
    resLabel: 'Export Resolution:',
    btnCopyImage: 'Copy Image to Clipboard',
    btnDownloadPng: 'Download PNG (HD / 4K)',
    btnDownloadSvg: 'Download SVG (Vector)',
    btnDownloadWebp: 'Download WEBP',
    btnDownloadPdf: 'Export PDF Card',

    // Footer
    footerPrivacy: '100% Client-Side Privacy (Zero data sent to servers)',
    footerCopyright: '© 2026 QR Generator Pro — Part of the phongdang.io.vn ecosystem.'
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('phongdang_qr_lang') || 'vi';
  }

  get lang() {
    return this.currentLang;
  }

  setLang(lang) {
    if (translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('phongdang_qr_lang', lang);
      this.applyTranslations();
    }
  }

  toggleLang() {
    const nextLang = this.currentLang === 'vi' ? 'en' : 'vi';
    this.setLang(nextLang);
    return nextLang;
  }

  t(key) {
    return translations[this.currentLang]?.[key] || translations['vi']?.[key] || key;
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translated = this.t(key);
      if (translated) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.dataset.i18nPlaceholder) {
            el.placeholder = translated;
          } else {
            el.value = translated;
          }
        } else {
          el.textContent = translated;
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const translated = this.t(key);
      if (translated) {
        el.placeholder = translated;
      }
    });

    const langToggleBtn = document.getElementById('btnLangToggle');
    if (langToggleBtn) {
      langToggleBtn.innerHTML = this.currentLang === 'vi' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt';
    }
  }
}

export const i18n = new I18nManager();
