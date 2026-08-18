/**
 * QR Studio Engine
 * Orchestrates QRCodeStyling + Advanced Canvas Frame & Banner Compositor
 */

export class QREngine {
  constructor(containerElement) {
    this.container = containerElement;
    this.qrInstance = null;
    this.currentConfig = {};
    this.initInstance();
  }

  initInstance() {
    if (typeof QRCodeStyling === 'undefined') {
      console.warn('QRCodeStyling not yet loaded.');
      return;
    }

    this.qrInstance = new QRCodeStyling({
      width: 320,
      height: 320,
      type: 'canvas',
      data: 'https://qr.phongdang.io.vn',
      image: '',
      dotsOptions: {
        color: '#6366f1',
        type: 'extra-rounded'
      },
      backgroundOptions: {
        color: '#ffffff'
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 6,
        imageSize: 0.35,
        hideBackgroundDots: true
      },
      cornersSquareOptions: {
        color: '#6366f1',
        type: 'extra-rounded'
      },
      cornersDotOptions: {
        color: '#38bdf8',
        type: 'dot'
      },
      qrOptions: {
        errorCorrectionLevel: 'Q'
      }
    });

    if (this.container) {
      this.container.innerHTML = '';
      this.qrInstance.append(this.container);
    }
  }

  /**
   * Update QR styling and payload
   */
  async update(config) {
    this.currentConfig = { ...config };
    if (!this.qrInstance) {
      this.initInstance();
    }
    if (!this.qrInstance) return;

    // Prepare dots options
    const dotsOptions = {
      type: config.dotsType || 'extra-rounded'
    };

    if (config.dotsColorType === 'gradient-linear') {
      dotsOptions.gradient = {
        type: 'linear',
        rotation: (config.dotsGradientAngle || 135) * (Math.PI / 180),
        colorStops: [
          { offset: 0, color: config.dotsColor1 || '#38bdf8' },
          { offset: 1, color: config.dotsColor2 || '#6366f1' }
        ]
      };
    } else if (config.dotsColorType === 'gradient-radial') {
      dotsOptions.gradient = {
        type: 'radial',
        colorStops: [
          { offset: 0, color: config.dotsColor1 || '#38bdf8' },
          { offset: 1, color: config.dotsColor2 || '#6366f1' }
        ]
      };
    } else {
      dotsOptions.color = config.dotsColor1 || '#090d16';
    }

    // Background options
    const backgroundOptions = {
      color: config.bgTransparent ? 'transparent' : (config.bgColor || '#ffffff')
    };

    // Corners square options
    const cornersSquareOptions = {
      type: config.cornersSquareType || 'extra-rounded',
      color: config.cornersSquareColor || config.dotsColor1 || '#6366f1'
    };

    // Corners dot options
    const cornersDotOptions = {
      type: config.cornersDotType || 'dot',
      color: config.cornersDotColor || config.dotsColor2 || '#38bdf8'
    };

    // Image options
    const imageOptions = {
      crossOrigin: 'anonymous',
      margin: config.logoMargin ?? 6,
      imageSize: (config.logoSize ?? 30) / 100,
      hideBackgroundDots: config.logoHideDots !== false
    };

    // Error correction level
    const errorCorrectionLevel = config.logo ? 'H' : (config.errorCorrectionLevel || 'Q');

    const updatePayload = {
      data: config.data || 'https://qr.phongdang.io.vn',
      image: config.logo || '',
      width: 320,
      height: 320,
      dotsOptions,
      backgroundOptions,
      cornersSquareOptions,
      cornersDotOptions,
      imageOptions,
      qrOptions: {
        errorCorrectionLevel
      }
    };

    this.qrInstance.update(updatePayload);

    // If frame style is requested, apply frame overlay on preview
    if (config.frameStyle && config.frameStyle !== 'none') {
      setTimeout(() => this.applyFrameToContainer(config), 60);
    }
  }

  /**
   * Composite frame onto a clean high-res canvas
   */
  async renderHighResComposite(targetResolution = 1024) {
    if (!this.qrInstance) return null;

    const config = this.currentConfig;
    const hasFrame = config.frameStyle && config.frameStyle !== 'none' && config.frameText;
    const qrSize = hasFrame ? Math.round(targetResolution * 0.78) : targetResolution;

    // Create a temporary QRCodeStyling with target QR size
    const exportQR = new QRCodeStyling({
      ...this.qrInstance._options,
      width: qrSize,
      height: qrSize
    });

    const qrBlob = await exportQR.getRawData('png');
    const qrImg = await this.blobToImage(qrBlob);

    if (!hasFrame) {
      // Just the QR code canvas
      const canvas = document.createElement('canvas');
      canvas.width = targetResolution;
      canvas.height = targetResolution;
      const ctx = canvas.getContext('2d');

      if (!config.bgTransparent) {
        ctx.fillStyle = config.bgColor || '#ffffff';
        ctx.fillRect(0, 0, targetResolution, targetResolution);
      }
      ctx.drawImage(qrImg, 0, 0, targetResolution, targetResolution);
      return canvas;
    }

    // Composite Frame layout
    const canvas = document.createElement('canvas');
    const framePadding = Math.round(targetResolution * 0.08);
    const headerHeight = config.frameStyle === 'top-banner' ? Math.round(targetResolution * 0.16) : 0;
    const footerHeight = (config.frameStyle === 'bottom-badge' || config.frameStyle === 'scan-me') ? Math.round(targetResolution * 0.18) : 0;

    canvas.width = targetResolution;
    canvas.height = targetResolution + headerHeight + footerHeight;
    const ctx = canvas.getContext('2d');

    const cardRadius = Math.round(targetResolution * 0.05);

    // Draw Card Background
    ctx.save();
    this.roundRect(ctx, 0, 0, canvas.width, canvas.height, cardRadius);
    ctx.fillStyle = config.bgColor === 'transparent' ? '#ffffff' : (config.bgColor || '#ffffff');
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 10;
    ctx.fill();
    ctx.restore();

    // Draw Banner Background if Top Banner
    const frameColor = config.frameColor || '#6366f1';
    const textColor = config.frameTextColor || '#ffffff';

    if (config.frameStyle === 'top-banner') {
      ctx.save();
      this.roundRectTop(ctx, 0, 0, canvas.width, headerHeight + framePadding, cardRadius);
      ctx.fillStyle = frameColor;
      ctx.fill();

      // Top Banner Text
      ctx.fillStyle = textColor;
      ctx.font = `bold ${Math.round(targetResolution * 0.052)}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(config.frameText, canvas.width / 2, (headerHeight + framePadding) / 2);
      ctx.restore();
    }

    // Draw QR Code in center
    const qrX = (canvas.width - qrSize) / 2;
    const qrY = headerHeight > 0 ? headerHeight + framePadding : framePadding;
    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

    // Draw Bottom Badge or Scan Me Frame
    if (config.frameStyle === 'bottom-badge' || config.frameStyle === 'scan-me') {
      const badgeHeight = Math.round(targetResolution * 0.11);
      const badgeWidth = Math.round(targetResolution * 0.72);
      const badgeX = (canvas.width - badgeWidth) / 2;
      const badgeY = qrY + qrSize + Math.round(targetResolution * 0.03);

      ctx.save();
      this.roundRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, badgeHeight / 2);
      ctx.fillStyle = frameColor;
      ctx.fill();

      // Text inside badge
      ctx.fillStyle = textColor;
      ctx.font = `bold ${Math.round(targetResolution * 0.046)}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(config.frameText, canvas.width / 2, badgeY + badgeHeight / 2);
      ctx.restore();
    }

    return canvas;
  }

  /**
   * Helper to convert Blob to HTMLImageElement
   */
  blobToImage(blob) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(blob);
    });
  }

  /**
   * Draw rounded rect utility
   */
  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  roundRectTop(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  applyFrameToContainer(config) {
    // Optional CSS decorative wrapper for live preview
  }
}
