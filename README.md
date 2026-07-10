<div align="center">
  <h1 align="center">✨ Mage And AI - Trợ lý Hình Ảnh ✨</h1>
  
  <p align="center">
    Nền tảng học tập và hướng dẫn tạo ảnh/video bằng Trí tuệ Nhân tạo (AI) chuyên nghiệp dành cho công tác Đoàn.
    <br />
    <a href="https://mage19vn.github.io/GenAI/"><strong>Khám phá Website ngay »</strong></a>
    <br />
    <br />
    <a href="#tính-năng-nổi-bật">Tính năng</a>
    ·
    <a href="#cài-đặt-và-chạy-cục-bộ">Cài đặt</a>
    ·
    <a href="#hướng-dẫn-sử-dụng">Hướng dẫn sử dụng</a>
  </p>
</div>

---

## 🌟 Giới thiệu

**Mage And AI** là một ứng dụng Web tương tác được xây dựng trên nền tảng **React & Vite**, mang đến trải nghiệm trực quan giúp người dùng (đặc biệt là các bạn Đoàn viên, Thanh niên) dễ dàng tiếp cận và ứng dụng Trí tuệ Nhân tạo trong việc thiết kế hình ảnh và sản xuất video phong trào.

## ✨ Tính năng nổi bật

- 🖼️ **Học Tạo Ảnh (Image Prompting):** Hướng dẫn từng bước từ việc lên ý tưởng, viết câu lệnh (prompt) chuẩn, sử dụng ảnh tham khảo đến việc tinh chỉnh chi tiết cục bộ bằng AI.
- 🎬 **Học Tạo Video (Video Prompting):** Quy trình chuẩn xác biến một bức ảnh tĩnh thành một thước phim điện ảnh sống động thông qua các công cụ AI.
- 📝 **Hệ thống Điểm danh (Attendance):** Tích hợp Firebase Realtime Database giúp giáo viên/người tổ chức điểm danh học sinh dễ dàng qua mã số và tự động lưu trữ trực tuyến.
- 📱 **Giao diện Tương thích & Hoạt ảnh:** Giao diện Dark-mode sang trọng, mượt mà với Tailwind CSS, tương thích hoàn hảo trên thiết bị di động. Hỗ trợ chế độ **Toàn màn hình (Fullscreen)** dùng như một slide thuyết trình thực thụ.

## 🚀 Công nghệ sử dụng

- **Frontend:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend & Database:** [Firebase](https://firebase.google.com/)
- **Deploy:** [GitHub Pages](https://pages.github.com/)

---

## 🛠️ Cài đặt và Chạy cục bộ (Local Development)

Để chạy dự án này trên máy tính của bạn, hãy làm theo các bước sau:

### 1. Yêu cầu hệ thống
- [Node.js](https://nodejs.org/) (khuyên dùng phiên bản LTS)
- Trình quản lý gói `npm` (hoặc `yarn`)

### 2. Cài đặt

Clone repository về máy:
```bash
git clone https://github.com/mage19vn/GenAI.git
cd GenAI
```

Cài đặt các thư viện phụ thuộc:
```bash
npm install
```

### 3. Cấu hình Firebase
Dự án yêu cầu kết nối với cơ sở dữ liệu Firebase cho tính năng Điểm danh. 
- Mở file `src/firebase.js` và đảm bảo cấu hình Firebase Config đã chính xác với dự án Firebase của bạn.

### 4. Chạy ứng dụng
```bash
npm run dev
```
Mở trình duyệt và truy cập vào `http://localhost:5173` để trải nghiệm dự án.

---

## 📖 Hướng dẫn sử dụng

### 1. Tính năng Trình chiếu Hướng dẫn
- Tại trang chủ, chọn các Tab **Tạo Ảnh** hoặc **Tạo Video**.
- Sử dụng các **nút mũi tên trái/phải (`<` / `>`)** hiển thị trên màn hình hoặc **phím mũi tên trên bàn phím** để chuyển đổi qua lại giữa các trang học liệu.
- Bấm vào nút 🔲 **Toàn màn hình** (góc trên bên phải khu vực nội dung) để vào chế độ thuyết trình (Presentation Mode). Rất thích hợp để giảng dạy qua máy chiếu.

### 2. Tính năng Điểm danh
- Nhấn vào biểu tượng 👤 **Điểm danh** (ở góc dưới bên phải màn hình hoặc ẩn trong giao diện tùy chế độ).
- Điền đầy đủ thông tin: `Họ và tên học sinh`, `Trường đang học`, và `Mã số điểm danh`.
- Bấm **Gửi Điểm Danh**. Dữ liệu sẽ lập tức được gửi mã hóa và lưu trữ an toàn trên Firebase.

---

## 🚢 Triển khai (Deploy lên GitHub Pages)

Ứng dụng được thiết lập sẵn quy trình tự động biên dịch và đẩy lên GitHub Pages. Khi có thay đổi mới, bạn chỉ cần chạy 1 lệnh duy nhất:

```bash
npm run deploy
```
*Lệnh này sẽ tự động build thư mục `dist` và đưa lên nhánh `gh-pages`, cập nhật trực tiếp giao diện trên website chính thức.*

---

<div align="center">
  <p>Được thiết kế và xây dựng với ❤️ phục vụ <strong>Công tác Đoàn & Phong trào Thanh thiếu nhi</strong>.</p>
</div>
