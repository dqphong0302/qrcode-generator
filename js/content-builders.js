/**
 * QR Studio Content Builders
 * Standard-compliant generators for diverse QR payloads
 */

export const VIETNAM_BANKS = [
  { code: 'VCB', name: 'Vietcombank (Ngoại Thương)', bin: '970436' },
  { code: 'TCB', name: 'Techcombank (Kỹ Thương)', bin: '970407' },
  { code: 'MB', name: 'MBBank (Quân Đội)', bin: '970422' },
  { code: 'BIDV', name: 'BIDV (Đầu Tư & Phát Triển)', bin: '970418' },
  { code: 'ICB', name: 'VietinBank (Công Thương)', bin: '970415' },
  { code: 'VPB', name: 'VPBank (Việt Nam Thịnh Vượng)', bin: '970432' },
  { code: 'ACB', name: 'ACB (Á Châu)', bin: '970416' },
  { code: 'TPB', name: 'TPBank (Tiên Phong)', bin: '970423' },
  { code: 'STB', name: 'Sacombank (Sài Gòn Thương Tín)', bin: '970403' },
  { code: 'VIB', name: 'VIB (Quốc Tế)', bin: '970441' },
  { code: 'HDB', name: 'HDBank (Phát Triển TP.HCM)', bin: '970437' },
  { code: 'OCB', name: 'OCB (Phương Đông)', bin: '970448' },
  { code: 'MSB', name: 'MSB (Hàng Hải)', bin: '970426' },
  { code: 'SHB', name: 'SHB (Sài Gòn - Hà Nội)', bin: '970443' },
  { code: 'VBA', name: 'Agribank (Nông Nghiệp)', bin: '970405' },
  { code: 'CAKE', name: 'Cake by VPBank', bin: '546034' },
  { code: 'TIMO', name: 'Timo by BVBank', bin: '963388' },
  { code: 'VTLMONEY', name: 'Viettel Money', bin: '971005' },
  { code: 'VNPTMONEY', name: 'VNPT Money', bin: '971011' }
];

export const ContentBuilders = {
  /**
   * URL format
   */
  url(data) {
    let url = (data.url || '').trim();
    if (!url) return 'https://qr.phongdang.io.vn';
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    return url;
  },

  /**
   * Plain text format
   */
  text(data) {
    return (data.text || '').trim() || 'QR Studio - qr.phongdang.io.vn';
  },

  /**
   * WiFi standard format: WIFI:S:SSID;T:WPA;P:Password;H:false;;
   */
  wifi(data) {
    const ssid = (data.ssid || '').trim();
    const password = data.password || '';
    const encryption = data.encryption || 'WPA';
    const hidden = data.hidden ? 'true' : 'false';

    if (!ssid) return 'WIFI:S:FreeWiFi;T:nopass;;';
    if (encryption === 'nopass') {
      return `WIFI:S:${ssid};T:nopass;H:${hidden};;`;
    }
    return `WIFI:S:${ssid};T:${encryption};P:${password};H:${hidden};;`;
  },

  /**
   * VietQR format (Generates standard VietQR quick link / EMVCo payload)
   */
  vietqr(data) {
    const bankBin = (data.bankBin || '970422').trim(); // Default MBBank
    const accountNo = (data.accountNo || '').trim();
    const amount = (data.amount || '').toString().replace(/[^0-9]/g, '');
    const memo = encodeURIComponent((data.memo || '').trim());

    if (!accountNo) {
      return 'https://qr.phongdang.io.vn';
    }

    // Quick standard VietQR URL format widely recognized by all VN Banking apps
    let vietqrUrl = `https://img.vietqr.io/image/${bankBin}-${accountNo}-compact.png`;
    const params = [];
    if (amount && parseInt(amount, 10) > 0) params.push(`amount=${amount}`);
    if (memo) params.push(`addInfo=${memo}`);
    if (data.accountName) params.push(`accountName=${encodeURIComponent(data.accountName.trim())}`);

    if (params.length > 0) {
      vietqrUrl += `?${params.join('&')}`;
    }
    return vietqrUrl;
  },

  /**
   * vCard 3.0 standard format
   */
  vcard(data) {
    const fn = (data.fullName || '').trim() || 'Phong Dang';
    const org = (data.org || '').trim();
    const title = (data.title || '').trim();
    const phone = (data.phone || '').trim();
    const email = (data.email || '').trim();
    const url = (data.url || '').trim();
    const address = (data.address || '').trim();
    const note = (data.note || '').trim();

    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${fn}`,
      `N:;${fn};;;`
    ];

    if (org) lines.push(`ORG:${org}`);
    if (title) lines.push(`TITLE:${title}`);
    if (phone) lines.push(`TEL;TYPE=CELL:${phone}`);
    if (email) lines.push(`EMAIL;TYPE=INTERNET:${email}`);
    if (url) lines.push(`URL:${url.startsWith('http') ? url : 'https://' + url}`);
    if (address) lines.push(`ADR;TYPE=WORK:;;${address};;;;`);
    if (note) lines.push(`NOTE:${note}`);

    lines.push('END:VCARD');
    return lines.join('\n');
  },

  /**
   * Email mailto format
   */
  email(data) {
    const email = (data.email || '').trim();
    if (!email) return 'mailto:contact@phongdang.io.vn';
    const subject = encodeURIComponent(data.subject || '');
    const body = encodeURIComponent(data.body || '');
    let mailto = `mailto:${email}`;
    const params = [];
    if (subject) params.push(`subject=${subject}`);
    if (body) params.push(`body=${body}`);
    if (params.length > 0) {
      mailto += `?${params.join('&')}`;
    }
    return mailto;
  },

  /**
   * Phone call format
   */
  phone(data) {
    const phone = (data.phone || '').trim().replace(/[^0-9+]/g, '');
    return phone ? `tel:${phone}` : 'tel:+84900000000';
  },

  /**
   * SMS format
   */
  sms(data) {
    const phone = (data.phone || '').trim().replace(/[^0-9+]/g, '');
    const message = data.message || '';
    return phone ? `smsto:${phone}:${message}` : `smsto:+84900000000:${message}`;
  },

  /**
   * Geo Location format
   */
  location(data) {
    const lat = (data.lat || '10.7769').trim();
    const lng = (data.lng || '106.7009').trim();
    const query = data.query ? encodeURIComponent(data.query.trim()) : '';
    if (query) {
      return `https://www.google.com/maps/search/?api=1&query=${query}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  },

  /**
   * iCalendar Event format
   */
  event(data) {
    const title = (data.title || 'Sự kiện').trim();
    const location = (data.location || '').trim();
    const description = (data.description || '').trim();
    const start = (data.start || '').replace(/[-:]/g, '');
    const end = (data.end || '').replace(/[-:]/g, '');

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`
    ];
    if (location) lines.push(`LOCATION:${location}`);
    if (description) lines.push(`DESCRIPTION:${description}`);
    if (start) lines.push(`DTSTART:${start}T000000Z`);
    if (end) lines.push(`DTEND:${end}T000000Z`);
    lines.push('END:VEVENT', 'END:VCALENDAR');
    return lines.join('\n');
  }
};
