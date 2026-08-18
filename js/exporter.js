/**
 * QR Studio Exporter
 * Handles high-resolution multi-format downloads (PNG, SVG, WEBP, PDF) and Clipboard Copy
 */

export const Exporter = {
  /**
   * Download PNG with selected resolution
   */
  async downloadPNG(qrEngine, resolution = 1024, filename = 'qr-code.png') {
    const canvas = await qrEngine.renderHighResComposite(resolution);
    if (!canvas) throw new Error('Không thể tạo canvas');

    const dataUrl = canvas.toDataURL('image/png');
    this.triggerDownload(dataUrl, filename);
  },

  /**
   * Download WEBP format
   */
  async downloadWEBP(qrEngine, resolution = 1024, filename = 'qr-code.webp') {
    const canvas = await qrEngine.renderHighResComposite(resolution);
    if (!canvas) throw new Error('Không thể tạo canvas');

    const dataUrl = canvas.toDataURL('image/webp', 0.95);
    this.triggerDownload(dataUrl, filename);
  },

  /**
   * Download SVG format (vector)
   */
  async downloadSVG(qrEngine, filename = 'qr-code.svg') {
    if (!qrEngine.qrInstance) throw new Error('QR instance chưa sẵn sàng');
    
    // Create temporary SVG instance
    const svgQR = new QRCodeStyling({
      ...qrEngine.qrInstance._options,
      type: 'svg',
      width: 1024,
      height: 1024
    });

    const blob = await svgQR.getRawData('svg');
    const url = URL.createObjectURL(blob);
    this.triggerDownload(url, filename);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  },

  /**
   * Download PDF Printable Card via jsPDF
   */
  async downloadPDF(qrEngine, metadata = {}, filename = 'qr-code-card.pdf') {
    const canvas = await qrEngine.renderHighResComposite(1200);
    if (!canvas) throw new Error('Không thể tạo canvas cho PDF');

    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) {
      throw new Error('Thư viện jsPDF chưa được nạp');
    }

    // Create A5 or A4 Portrait PDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a5'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Background styling
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header Brand
    doc.setFillColor(99, 102, 241);
    doc.rect(0, 0, pageWidth, 18, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('QR STUDIO  |  qr.phongdang.io.vn', pageWidth / 2, 11, { align: 'center' });

    // Card Title
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const title = metadata.title || 'Mã QR Code';
    doc.text(title, pageWidth / 2, 34, { align: 'center' });

    // Subtitle / Type
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Loại: ${metadata.typeLabel || 'Liên kết'}   •   Ngày tạo: ${new Date().toLocaleDateString('vi-VN')}`, pageWidth / 2, 41, { align: 'center' });

    // Draw QR Code Image in Center
    const qrImgData = canvas.toDataURL('image/png');
    const qrBoxSize = 90; // mm
    const qrX = (pageWidth - qrBoxSize) / 2;
    const qrY = 48;

    // White Card behind QR
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(qrX - 4, qrY - 4, qrBoxSize + 8, qrBoxSize + 8, 4, 4, 'F');
    doc.addImage(qrImgData, 'PNG', qrX, qrY, qrBoxSize, qrBoxSize);

    // Payload Text / Instructions
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(9);
    doc.text('Sử dụng camera điện thoại hoặc ứng dụng quét mã để truy cập.', pageWidth / 2, qrY + qrBoxSize + 12, { align: 'center' });

    // Footer
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(8);
    doc.text('Tạo bởi QR Studio - Hệ sinh thái phongdang.io.vn', pageWidth / 2, pageHeight - 8, { align: 'center' });

    doc.save(filename);
  },

  /**
   * Copy QR Image direct to Clipboard
   */
  async copyToClipboard(qrEngine) {
    if (!navigator.clipboard || !window.ClipboardItem) {
      throw new Error('Trình duyệt không hỗ trợ sao chép ảnh trực tiếp');
    }

    const canvas = await qrEngine.renderHighResComposite(1024);
    if (!canvas) throw new Error('Không thể tạo canvas');

    return new Promise((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          reject(new Error('Lỗi chuyển đổi ảnh'));
          return;
        }
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          resolve(true);
        } catch (err) {
          reject(err);
        }
      }, 'image/png');
    });
  },

  /**
   * Helper to trigger browser download
   */
  triggerDownload(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};
