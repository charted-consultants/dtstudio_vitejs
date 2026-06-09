# CLAUDE.md — dtstudio_vitejs

> File này được Claude Code tự đọc khi mở dự án. Cập nhật khi có thay đổi lớn.

---

## Dự án

- **Tên:** dtstudio_vitejs
- **Loại:** Portfolio nhiếp ảnh phóng sự tài liệu (single-page) — Nhiếp ảnh gia Trần Đình Triệu, Hà Nội
- **Stack:** Vite 6 · Tailwind CSS 3 · Vanilla JS (ES Module) · Lucide icons
- **Git remote:** `git@github.com:charted-consultants/dtstudio_vitejs.git`
- **VPS deploy:** `root@143.110.167.193` → `/var/www/dtstudio`
- **Dev server:** `npm run dev` → http://localhost:3000 (hoặc port tiếp theo nếu bị chiếm)
- **Entry point:** `index.html`

---

## Cấu trúc thư mục

```
dtstudio_vitejs/
├── index.html                  ← entry point duy nhất của Vite
├── vite.config.js              ← port 3000, auto open
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── src/
│   ├── main.js                 ← toàn bộ JS logic (import CSS + lucide ở đây)
│   ├── i18n.js                 ← tất cả text EN + VI
│   └── style.css               ← CSS custom + @tailwind directives
└── public/
    ├── albums/
    │   └── dt/                 ← 8 album DT, mỗi album có file photo_01.webp, photo_02.webp...
    │       ├── 01 - Tay Bac - Mua Hoa/
    │       ├── 02 - Toc Nguoi Vung Cao/
    │       ├── 03 - Dong Que - Ruong Bac Thang/
    │       ├── 04 - Ky Uc Tuoi Tho/
    │       ├── 05 - Ngu Dan - Nhin Tu Tren Cao/
    │       ├── 06 - Cho Bien - Ben Canh/
    │       ├── 07 - Nghe Bien/
    │       └── 08 - Lang Nghe Truyen Thong/
    └── awards/                 ← ảnh giải thưởng
        ├── award-color.webp
        ├── award-bw.webp
        ├── award-ceremony.webp
        ├── award-ref-letter.webp
        └── award-news.webp
```

---

## Quy tắc quan trọng

### JS
- Tất cả JS nằm trong `src/main.js` — đây là ES Module
- Text nội dung nằm trong `src/i18n.js` — export `T` object với `en` và `vi`
- Các hàm gọi từ HTML `onclick` phải expose qua `window.*` ở cuối file
- Lucide icons: import named export, gọi `createIcons()` cuối file

### CSS
- CSS custom nằm trong `src/style.css` — **không dùng inline `<style>`**
- Tailwind utility classes dùng trực tiếp trong HTML

### HTML
- Không có CDN script nào trong `index.html`
- i18n qua `data-i18n` và `data-i18n-html` attributes — ngôn ngữ mặc định: `en`
- Ảnh tham chiếu bằng đường dẫn root: `/albums/dt/01%20-...`

### Ảnh
- Tất cả ảnh phải là **WebP**, nén bằng `cwebp -q 85` trước khi đưa vào
- Album DT: đặt trong `public/albums/dt/{tên-thư-mục}/`, đặt tên `photo_01.webp`, `photo_02.webp`...
- Awards: đặt trong `public/awards/`

---

## Scripts

```bash
npm run dev      # chạy dev server
npm run build    # build production → dist/
npm run preview  # preview bản build
```

---

## Sections trong trang (theo thứ tự)

1. **Float** — nút Zalo + Phone cố định góc phải
2. **Nav** — fixed, solid background, language toggle EN/VI
3. **Hero** — full-height, ảnh nền + overlay
4. **Ticker** — marquee text loop
5. **Services** — grid 6 card, click mở album lightbox
6. **About** — 2 cột ảnh + text
7. **USP** — 3 nguyên tắc, nền dark
8. **Collections** — grid 8 item, click mở album
9. **Pricing** — 3 gói (nếu áp dụng)
10. **Feedback** — reviews khách hàng
11. **Awards** — split layout, giải thưởng + thư xác nhận + báo chí
12. **Process** — 8 bước quy trình
13. **FAQ** — accordion
14. **CTA Banner** — dark bg, phone + buttons
15. **Footer** — 4 cột
16. **Album Lightbox** — modal full-screen, grid + single view, swipe + keyboard

---

## Albums trong `src/main.js`

### DT (`public/albums/dt/`, path bắt đầu bằng `/albums/dt/`)

| Key | Folder | Số ảnh |
|-----|--------|--------|
| dt01 | 01 - Tay Bac - Mua Hoa | 6 |
| dt02 | 02 - Toc Nguoi Vung Cao | 5 |
| dt03 | 03 - Dong Que - Ruong Bac Thang | 4 |
| dt04 | 04 - Ky Uc Tuoi Tho | 4 |
| dt05 | 05 - Ngu Dan - Nhin Tu Tren Cao | 5 |
| dt06 | 06 - Cho Bien - Ben Canh | 3 |
| dt07 | 07 - Nghe Bien | 4 |
| dt08 | 08 - Lang Nghe Truyen Thong | 4 |

---

## Cách thêm album mới

1. Copy thư mục ảnh WebP vào `public/albums/dt/{tên-thư-mục}/`, đặt tên `photo_01.webp`...
2. Trong `src/main.js` → `ALBUMS`: thêm key mới với path URL-encoded
3. Trong `src/main.js` → `ALBUM_TITLES`: thêm tên EN + VI
4. Trong `src/i18n.js`: thêm `colXX.title`, `colXX.tagline`, `colXX.desc`
5. Thêm `.col-group-item` vào section `#collections` trong `index.html`

---

## TODO

- [ ] Thêm ảnh thật của nhiếp ảnh gia vào `/about-main.webp`
- [ ] Cập nhật SĐT và email khi có thông tin chính thức
- [ ] Cập nhật git remote nếu tạo repo mới cho DT Studio

---

*Cập nhật lần cuối: 2026-06-05*
