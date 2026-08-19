/* Shared application context. Feature modules communicate through this object. */
window.QRApp = (() => {
  const $ = (id) => document.getElementById(id);

  const DEFAULTS = {
    theme: "dark",
    url: "https://phongdang.io.vn",
    dotColor: "#0284C7",
    dot2Color: "#4F46E5",
    cornerColor: "#0284C7",
    bgColor: "#FFFFFF",
    colorType: "solid",
    dotsStyle: "dots",
    cornersStyle: "extra-rounded",
    frameStyle: "none",
    frameColor: "#0284C7",
    logoSize: 22,
    logoMargin: 6
  };

  const DOM = {
    themeToggle: $("themeToggle"), themeIcon: $("themeIcon"), themeLabel: $("themeLabel"),
    toast: $("toast"), toastMsg: $("toastMsg"), toastIcon: $("toastIcon"),
    typePills: document.querySelectorAll(".type-pill"),
    typeBlockUrl: $("typeBlockUrl"), typeBlockWifi: $("typeBlockWifi"),
    typeBlockPhone: $("typeBlockPhone"), typeBlockEmail: $("typeBlockEmail"), inputLabel: $("inputLabel"),
    urlInput: $("urlInput"), urlWrap: $("urlWrap"), clearUrlBtn: $("clearUrlBtn"),
    wifiSsid: $("wifiSsid"), wifiPass: $("wifiPass"), phoneInput: $("phoneInput"), emailInput: $("emailInput"),
    navTabs: document.querySelectorAll(".tabs-nav .nav-tab"),
    tabPanels: { colors: $("tabPanelColors"), frame: $("tabPanelFrame"), logo: $("tabPanelLogo"), shapes: $("tabPanelShapes") },
    colorTypeSelect: $("colorTypeSelect"), colorInput: $("colorInput"), colorHexLabel: $("colorHexLabel"),
    color2Input: $("color2Input"), color2HexLabel: $("color2HexLabel"), color2Container: $("color2Container"),
    cornerColorInput: $("cornerColorInput"), cornerColorHexLabel: $("cornerColorHexLabel"),
    bgColorInput: $("bgColorInput"), bgColorHexLabel: $("bgColorHexLabel"), bgTransparentCheck: $("bgTransparentCheck"),
    frameStyleSelect: $("frameStyleSelect"), frameTextInput: $("frameTextInput"),
    frameColorInput: $("frameColorInput"), frameColorHexLabel: $("frameColorHexLabel"), qrFrameWrapper: $("qrFrameWrapper"),
    topBannerBadge: $("topBannerBadge"), bottomBannerBadge: $("bottomBannerBadge"),
    logoInput: $("logoInput"), logoSize: $("logoSize"), logoSizeLabel: $("logoSizeLabel"),
    logoMargin: $("logoMargin"), logoMarginLabel: $("logoMarginLabel"), removeLogoBtn: $("removeLogoBtn"),
    dotsStyle: $("dotsStyle"), cornersStyle: $("cornersStyle"),
    generateBtn: $("generateBtn"), clearBtn: $("clearBtn"), copyImageBtn: $("copyImageBtn"),
    emptyState: $("emptyState"), resultArea: $("resultArea"), qrPreview: $("qrPreview"), qrCard: $("qrCard"),
    downloadPngBtn: $("downloadPngBtn"), downloadSvgBtn: $("downloadSvgBtn"),
    fullscreenModal: $("fullscreenModal"), modalBackdrop: $("modalBackdrop"),
    closeFullscreenBtn: $("closeFullscreenBtn"), fullscreenImg: $("fullscreenImg"),
    rightTabs: document.querySelectorAll(".right-tab"),
    rpanelPreview: $("rpanelPreview"), rpanelHistory: $("rpanelHistory"),
    historyGrid: $("historyGrid"), historyEmpty: $("historyEmpty"),
    historyCount: $("historyCount"), clearHistoryBtn: $("clearHistoryBtn")
  };

  return {
    $,
    DEFAULTS,
    DOM,
    State: { contentType: "url", currentLogoData: null, qrCodePreview: null }
  };
})();
