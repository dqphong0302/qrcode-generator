/**
 * QR Generator Pro - Color Palettes & Contrast Luminance Engine
 * Provides one-click color harmony swatches and live scanner readability score
 */

export const COLOR_PALETTES = [
  {
    id: 'classic-mono',
    name: 'Classic Black & White',
    nameVi: 'Mẫu Thường Đen Trắng',
    dot1: '#000000',
    dot2: '#000000',
    cornerSquare: '#000000',
    cornerDot: '#000000',
    bg: '#ffffff',
    frame: '#000000',
    frameText: '#ffffff'
  },
  {
    id: 'phongdang-royal',
    name: 'PhongDang Indigo',
    nameVi: 'Xanh Chàm Phong Đặng',
    dot1: '#38bdf8',
    dot2: '#6366f1',
    cornerSquare: '#6366f1',
    cornerDot: '#38bdf8',
    bg: '#ffffff',
    frame: '#6366f1',
    frameText: '#ffffff'
  },
  {
    id: 'cyber-neon',
    name: 'Cyberpunk Neon',
    nameVi: 'Neon Công Nghệ',
    dot1: '#06b6d4',
    dot2: '#a855f7',
    cornerSquare: '#06b6d4',
    cornerDot: '#a855f7',
    bg: '#090d16',
    frame: '#06b6d4',
    frameText: '#090d16'
  },
  {
    id: 'emerald-mint',
    name: 'Emerald Mint',
    nameVi: 'Ngọc Lục Bảo',
    dot1: '#10b981',
    dot2: '#047857',
    cornerSquare: '#047857',
    cornerDot: '#10b981',
    bg: '#ffffff',
    frame: '#10b981',
    frameText: '#ffffff'
  },
  {
    id: 'sunset-amber',
    name: 'Sunset Amber',
    nameVi: 'Hoàng Hôn Cam Hồng',
    dot1: '#f43f5e',
    dot2: '#f59e0b',
    cornerSquare: '#f43f5e',
    cornerDot: '#f59e0b',
    bg: '#ffffff',
    frame: '#f43f5e',
    frameText: '#ffffff'
  },
  {
    id: 'vietqr-banking',
    name: 'VietQR Banking',
    nameVi: 'Chuẩn VietQR',
    dot1: '#005baa',
    dot2: '#005baa',
    cornerSquare: '#e01e2b',
    cornerDot: '#005baa',
    bg: '#ffffff',
    frame: '#005baa',
    frameText: '#ffffff'
  },
  {
    id: 'coffee-mocha',
    name: 'Coffee Mocha',
    nameVi: 'Cà Phê Mocha',
    dot1: '#854d0e',
    dot2: '#451a03',
    cornerSquare: '#451a03',
    cornerDot: '#854d0e',
    bg: '#fefce8',
    frame: '#854d0e',
    frameText: '#ffffff'
  },
  {
    id: 'midnight-gold',
    name: 'Midnight Gold',
    nameVi: 'Vàng Hoàng Gia Tối',
    dot1: '#fbbf24',
    dot2: '#d97706',
    cornerSquare: '#fbbf24',
    cornerDot: '#f59e0b',
    bg: '#0f172a',
    frame: '#fbbf24',
    frameText: '#0f172a'
  }
];

/**
 * Calculate Relative Luminance of Hex color (W3C standard)
 */
function getLuminance(hex) {
  if (!hex || hex === 'transparent') return 1; // Default white equivalence for transparent on light
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  if (hex.length !== 6) return 0.5;

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculate Contrast Ratio between Foreground (Dots) and Background
 * Returns ratio (e.g. 15.4) and qualitative evaluation
 */
export function checkContrast(fgHex, bgHex, isTransparent = false) {
  if (isTransparent) {
    return {
      ratio: 10.0,
      score: 'good',
      labelVi: '🟢 Nền trong suốt (Đảm bảo dán lên nền tương phản)',
      labelEn: '🟢 Transparent background (Ensure high contrast placement)'
    };
  }

  const lum1 = getLuminance(fgHex);
  const lum2 = getLuminance(bgHex);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  const formattedRatio = ratio.toFixed(1);

  if (ratio >= 4.5) {
    return {
      ratio,
      score: 'good',
      labelVi: `🟢 Độ tương phản Rất Tốt: ${formattedRatio}:1 (Dễ quét mã)`,
      labelEn: `🟢 Excellent Contrast: ${formattedRatio}:1 (Easy to scan)`
    };
  } else if (ratio >= 3.0) {
    return {
      ratio,
      score: 'medium',
      labelVi: `🟡 Độ tương phản Trung Bình: ${formattedRatio}:1 (Nên tăng độ chênh màu)`,
      labelEn: `🟡 Medium Contrast: ${formattedRatio}:1 (Consider boosting difference)`
    };
  } else {
    return {
      ratio,
      score: 'poor',
      labelVi: `🔴 Cảnh báo: Độ tương phản thấp ${formattedRatio}:1 (Rất khó quét mã)`,
      labelEn: `🔴 Warning: Low Contrast ${formattedRatio}:1 (Very hard to scan)`
    };
  }
}
