# QR Studio — phongdang.io.vn

> **Trình tạo mã QR Code chuyên nghiệp, tùy biến không giới hạn, xuất đa định dạng (PNG 4K, SVG vector, WEBP, PDF) và lưu trữ lịch sử 100% Client-side.**

🌐 **Live Subdomain:** [https://qr.phongdang.io.vn](https://qr.phongdang.io.vn)  
🏛️ **Ecosystem Portal:** [https://phongdang.io.vn](https://phongdang.io.vn)

---

## ✨ Tính Năng Nổi Bật

1. 🚀 **Siêu Nhanh & Tương Thích Cloudflare Pages:**
   - 100% Pure Vanilla HTML5/CSS3/JavaScript (ES Modules).
   - Zero Backend, Zero Build Step, tải trang tức thì (< 50ms) trên Cloudflare Global Edge CDN.
   - PWA Ready (cài đặt ứng dụng trên Mobile/Desktop & hoạt động trơn tru cả khi offline).

2. 🎨 **Tùy Biến QR Code Đỉnh Cao:**
   - **Màu sắc & Gradient:** Đơn sắc, Gradient tuyến tính, Gradient tỏa tròn với góc xoay tùy chọn. Hỗ trợ nền trong suốt (Transparent).
   - **Kiểu dáng hạt (Dots):** Square, Dots, Rounded, Classy, Classy Rounded, Extra Rounded.
   - **Góc định vị:** Khung góc (Square, Dot, Extra-rounded) và Tâm góc riêng biệt.
   - **Khung viền & Nhãn CTA:** Top Banner, Bottom Badge, Scan Me với văn bản tùy chỉnh.
   - **Logo trung tâm:** Tải lên ảnh cá nhân (drag & drop) hoặc chọn icon hệ sinh thái có sẵn, hỗ trợ điều chỉnh kích thước và khoảng đệm.
   - **Presets có sẵn:** 8+ bảng màu chọn sẵn (Cyber Neon, PhongDang Blue, Minimal Mono, Emerald Tech, VietQR Napas, v.v.).

3. 📦 **Đa Dạng Loại Dữ Liệu:**
   - 🌐 **URL / Website** (Tự động chuẩn hóa)
   - 💳 **VietQR / Thanh toán ngân hàng** (Chuẩn NAPAS 247: Vietcombank, Techcombank, MBBank, BIDV, VPBank, ACB, Cake, Timo...)
   - 📶 **WiFi** (SSID, Mật khẩu, Chuẩn bảo mật WPA/WPA2/WPA3/WEP/Open, Mạng ẩn)
   - 📇 **vCard 3.0 / Danh thiếp điện tử** (Họ tên, SĐT, Email, Công ty, Chức danh, Địa chỉ, Website)
   - 📝 **Văn bản thuần / Ghi chú**
   - ✉️ **Email** (mailto: với tiêu đề và nội dung)
   - 📞 **Điện thoại** & 💬 **SMS**
   - 📍 **Vị trí bản đồ (Google Maps)**
   - 📅 **Lịch sự kiện (iCalendar)**

4. 💾 **Xuất Tệp Đa Định Dạng & Độ Phân Giải Cao:**
   - **PNG:** Xuất 512px, 1024px (HD), 2048px (2K), 4096px (4K Ultra HD cho in ấn).
   - **SVG:** Vector nguyên bản không vỡ nét cho Designer/Illustrator.
   - **WEBP:** Ảnh nén chất lượng cao tối ưu web.
   - **PDF:** Xuất file thẻ in A5/A4 hoàn chỉnh kèm tiêu đề và hướng dẫn quét.
   - **Copy to Clipboard:** 1-Click sao chép ảnh QR dán ngay vào Canva, Photoshop, Word, Zalo.

5. 🔒 **Lịch Sử LocalStorage & Quyền Riêng Tư:**
   - Tự động lưu mã đã tạo tại trình duyệt.
   - 1-Click khôi phục lại toàn bộ cấu hình mã cũ.
   - Đánh dấu sao yêu thích (⭐), Tìm kiếm thông minh, Xuất/Nhập file JSON sao lưu.
   - 100% dữ liệu xử lý tại máy người dùng, an toàn tuyệt đối.

---

## 🛠️ Cấu Trúc Thư Mục

```
qr/
├── index.html                    # Giao diện chính Single Page App
├── css/
│   ├── style.css                 # Design tokens, Dark/Light theme, responsive layout
│   ├── components.css            # Controls, inputs, presets, canvas preview, history
│   └── animations.css            # Hiệu ứng quét laser beam, micro-interactions
├── js/
│   ├── app.js                    # Bootstrap & ServiceWorker registration
│   ├── qr-engine.js              # Canvas & QRCodeStyling compositing engine
│   ├── content-builders.js       # Formatters cho URL, WiFi, VietQR, vCard, Email...
│   ├── storage.js                # Quản lý LocalStorage History & JSON backup
│   ├── exporter.js               # Multi-format downloaders (PNG, SVG, WEBP, PDF, Copy)
│   ├── presets.js                # Danh mục Presets phong cách
│   ├── ui-handlers.js            # Điều khiển tương tác DOM & cập nhật trực tiếp
│   └── vendor/
│       ├── qr-code-styling.js    # Vendored QR library (Offline ready)
│       └── jspdf.umd.min.js      # Vendored PDF generator (Offline ready)
├── assets/
│   ├── favicon.svg               # SVG Icon vector
│   └── manifest.json             # PWA Web App Manifest
├── sw.js                         # Service Worker caching cho Cloudflare Pages
└── README.md
```

---

## 🚀 Hướng Dẫn Triển Khai Lên Cloudflare Pages

### Cách 1: Triển khai qua GitHub (Khuyên dùng)
1. Đẩy repo lên GitHub: `dqphong0302/qrcode-generator`.
2. Đăng nhập [Cloudflare Dashboard](https://dash.cloudflare.com/) → Chọn **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Chọn repository `qrcode-generator`.
4. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(Để trống)*
   - **Build output directory:** `.` hoặc `/`
5. Bấm **Save and Deploy**.
6. Vào mục **Custom Domains** của project Cloudflare Pages → Thêm subdomain: `qr.phongdang.io.vn` (Cloudflare sẽ tự động trỏ DNS CNAME và cấp SSL trong 1 phút).

### Cách 2: Triển khai trực tiếp qua Cloudflare Wrangler CLI
```bash
npx wrangler pages deploy . --project-name=phongdang-qr
```

---

## 💻 Chạy Cục Bộ (Local Development)

Không cần cài đặt npm modules, chỉ cần khởi chạy bất kỳ static server nào:
```bash
# Sử dụng Python:
python3 -m http.server 8080

# Hoặc sử dụng npx serve:
npx serve .
```
Truy cập: `http://localhost:8080`

---

## 📄 Bản Quyền
Phát triển bởi **Phong Đặng** (phongdang.io.vn) © 2026. Mã nguồn mở MIT License.
