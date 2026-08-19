# ⚡ QR Generator Pro

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0.0-emerald.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Platform](https://img.shields.io/badge/platform-Web%20App-purple.svg)

**Ứng dụng tạo mã QR đa năng, hiện đại, tùy biến chuyên sâu theo chuẩn thiết kế cao cấp.**  
Hỗ trợ tạo QR tức thì, đa dạng định dạng dữ liệu, đổi màu Gradient, chèn Logo, gắn Khung viền (Frames), lưu Lịch sử và xuất ảnh siêu nét HD 1000×1000px & Vector SVG.

🌐 **Trải nghiệm trực tuyến:** [https://qr.phongdang.io.vn](https://qr.phongdang.io.vn)  
🏛️ **Hệ sinh thái:** [https://phongdang.io.vn](https://phongdang.io.vn)  
📦 **Kho mã nguồn:** [https://github.com/dqphong0302/qrcode-generator](https://github.com/dqphong0302/qrcode-generator)

</div>

---

## 🌟 Tính Năng Nổi Bật

### 1. 🔀 Đa dạng Loại Nội Dung (6 Content Types)
* 🔗 **Link / Website:** Tự động nhận diện và cập nhật mã theo thời gian thực.
* 📶 **WiFi:** Tạo mã kết nối nhanh mạng WiFi (SSID, Mật khẩu, chuẩn bảo mật).
* 💳 **VietQR:** Định dạng chuyển khoản ngân hàng nhanh chuẩn Napas 247.
* 📞 **Số điện thoại:** Quét để gọi điện thoại tức thì (`tel:`).
* ✉️ **Email:** Quét để mở ứng dụng gửi thư điện tử (`mailto:`).
* 📝 **Văn bản thuần:** Hiển thị ghi chú, nội dung text tự do.

### 2. 🎨 Tùy Biến Giao Diện & Màu Sắc Chuyên Sâu
* **8 Bảng phối màu 1-Click:** Classic, Doanh nghiệp, VietQR, Tech Indigo, Emerald, Royal Gold, Rose Ruby, Ocean Cyan.
* **3 Chế độ tô màu:** Đơn sắc (Solid), Gradient Tuyến Tính (Linear), Gradient Tỏa Tròn (Radial).
* **Chi tiết từng vùng:** Độc lập chỉnh màu hạt QR (Dots), màu mắt góc (Corners) và màu nền (Background).
* **Nền trong suốt (Transparent):** Xuất mã QR không nền để dễ dàng ghép vào ấn phẩm đồ họa, banner, standee.

### 3. 🖼️ Khung Viền & Banner Tiếp Thị (Frames)
* Tùy chọn nhiều kiểu khung: **Không khung**, **Huy hiệu dưới (Bottom Badge)**, **Banner trên (Top Banner)**, **Khung viền Scan Me**.
* Tùy chỉnh thông điệp kêu gọi hành động (CTA) và màu sắc khung viền đồng bộ với thương hiệu.

### 4. 🌟 Chèn Logo & Nhận Diện Thương Hiệu
* Tải lên logo từ máy tính (`PNG`, `JPG`, `SVG`, `WebP`).
* Thanh trượt điều chỉnh kích cỡ logo (10% – 35%) và khoảng đệm (padding 0 – 20px) với tính năng tự động căn giữa tâm mã QR.
* Nút gỡ logo nhanh chóng 1-click.

### 5. ⚙️ Hình Dáng Hình Học (Shapes & Dots)
* **Kiểu hạt (Dots):** Vuông Chuẩn (Square), Hạt Tròn (Dots), Bo Góc Nhẹ (Rounded), Thanh Lịch (Classy), Thanh Lịch Bo (Classy Rounded), Bo Tròn Lớn (Extra Rounded).
* **Khung mắt góc (Corners):** Vuông (Square), Chấm Tròn (Dot), Bo Viền Tròn (Extra Rounded).

### 6. 💾 Lịch Sử Tạo Mã & Quản Lý Thông Minh
* Tự động lưu các mã QR đã tạo vào trình duyệt (`LocalStorage`).
* Xem lại danh sách, click để tải lại cấu hình hoặc xem nhanh thumbnail.
* Nút xóa toàn bộ lịch sử tiện lợi.

### 7. 🚀 Xuất File Chuẩn In Ấn & Sao Chép Nhanh
* ⬇️ **Tải PNG (HD):** Độ phân giải cao `1000 × 1000 px`, giữ nguyên chất lượng khi in ấn hoặc trình chiếu.
* ⬇️ **Tải SVG Vector:** Định dạng vector vô hạn độ phân giải, phù hợp in ấn quảng cáo khổ lớn.
* 📋 **Sao chép ảnh vào Clipboard:** Copy trực tiếp hình ảnh PNG để dán (Ctrl+V) vào Photoshop, Word, Canva, Zalo, Figma...
* 🔍 **Xem Fullscreen HD:** Nhấn vào ảnh QR để phóng to toàn màn hình xem trước chi tiết.

### 8. 🌓 Giao Diện & Trải Nghiệm Người Dùng
* Chế độ **Sáng / Tối (Light & Dark Theme)** với hiệu ứng chuyển động mượt mà.
* Thiết kế Glassmorphism hiện đại, responsive hoàn hảo trên Điện thoại, Máy tính bảng và Máy tính để bàn.
* Layout cố định chống giật khung hình (Zero Layout Shift) khi chuyển đổi giữa các tab.

---

## 🏗️ Cấu Trúc Dự Án (Modular JavaScript Architecture)

Dự án được tái cấu trúc theo mô hình module độc lập, dễ mở rộng và bảo trì:

```
qr/
├── index.html                  # Giao diện chính của ứng dụng
├── favicon.ico                 # Favicon chuẩn ICO
├── assets/
│   └── favicon.svg             # Logo vector
├── css/
│   └── style.css               # Hệ thống design tokens & stylesheet responsive
├── js/
│   ├── app.js                  # Điểm khởi tạo & lắng nghe sự kiện
│   ├── README.md               # Hướng dẫn kiến trúc JS module
│   └── modules/
│       ├── core.js             # State quản lý chung, cấu hình mặc định & DOM refs
│       ├── theme.js            # Quản lý Light/Dark theme & lưu trữ LocalStorage
│       ├── toast.js            # Hệ thống thông báo toast notification
│       ├── content-type.js     # Xử lý các định dạng dữ liệu (URL, WiFi, VietQR, Phone, Email, Text)
│       ├── palette.js          # Quản lý 8 bảng màu và chế độ gradient
│       ├── qr-engine.js        # Khởi tạo và cập nhật engine QR (qr-code-styling)
│       ├── frame.js            # Render và compositing khung viền canvas
│       ├── export.js           # Xử lý xuất file HD PNG, SVG, clipboard & modal
│       └── history.js          # Lưu trữ và hiển thị lịch sử tạo mã
└── README.md                   # Tài liệu hướng dẫn dự án
```

---

## 💻 Chạy Cục Bộ (Local Development)

Không cần cài đặt build tool phức tạp, bạn có thể chạy trực tiếp bằng bất kỳ static server nào:

### Cách 1: Sử dụng Python
```bash
# Python 3
python3 -m http.server 8080
```

### Cách 2: Sử dụng Node.js `npx serve`
```bash
npx -y serve . -p 8080
```

Truy cập trình duyệt: **`http://localhost:8080`**

---

## 🛠️ Công Nghệ Sử Dụng

- **Ngôn ngữ:** HTML5, Modern Vanilla JavaScript (ES6+ Modular Architecture), CSS3 (Custom Properties & Flexbox/Grid).
- **Thư viện sinh QR:** [qr-code-styling](https://github.com/koistya/qr-code-styling) (v1.9.0).
- **Phông chữ:** Inter & JetBrains Mono (Google Fonts CDN).
- **Đồ họa & Vector:** Canvas 2D Context Compositing & SVG Rendering.

---

## 📄 Bản Quyền & Giấy Phép

Phát triển và duy trì bởi **[Phong Đặng](https://phongdang.io.vn)** © 2025–2026.  
Phát hành theo giấy phép [MIT License](LICENSE).
