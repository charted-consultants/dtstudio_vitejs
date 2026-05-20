# CLAUDE.md — bluemoon_vitejs

> File này được Claude Code tự đọc khi mở dự án. Cập nhật khi có thay đổi lớn.

---

## Dự án

- **Tên:** bluemoon_vitejs
- **Loại:** Website studio nhiếp ảnh (single-page)
- **Stack:** Vite 6 · Tailwind CSS 3 · Vanilla JS (ES Module) · Lucide icons
- **Git remote:** `git@github.com:charted-consultants/Aurastudio_HTML.git`
- **Dev server:** `npm run dev` → http://localhost:3000 (hoặc port tiếp theo nếu bị chiếm)

---

## Cấu trúc thư mục

```
bluemoon_vitejs/
├── index.html                  ← entry point duy nhất của Vite
├── vite.config.js              ← port 3000, auto open
├── tailwind.config.js          ← custom colors: aura / aura-light / aura-dark
├── postcss.config.js
├── package.json
├── src/
│   ├── main.js                 ← toàn bộ JS logic (import CSS + lucide ở đây)
│   └── style.css               ← CSS custom + @tailwind directives
└── public/
    ├── album-anh-studio/       ← 15 ảnh WebP mẫu (photo_01.webp → photo_15.webp)
    └── albums/
        └── blue-moon/          ← 8 album BLUE MOON, giữ tên thư mục gốc
            ├── 05 - Couple Ao dai hong den - Co dien/
            ├── 13 - Ho ly 9 duoi/
            ├── 15 - Tiec sinh nhat - Cute Candy/
            ├── 16 - Vay cuoi trang - Studio xanh/
            ├── 17 - Couple Ao dai trang - Xe dap retro/
            ├── 19 - Den do Valentine/
            ├── 23 - Hanfu hong - Dan ty ba/
            └── 24 - Ao dai trang - Ho sen Tre/
```

---

## Quy tắc quan trọng

### JS
- Tất cả JS nằm trong `src/main.js` — đây là ES Module
- Các hàm gọi từ HTML `onclick` phải expose qua `window.*` ở cuối file
- Lucide icons: import named export, gọi `createIcons()` cuối file

### CSS
- CSS custom nằm trong `src/style.css` — **không dùng inline `<style>`**
- Tailwind utility classes dùng trực tiếp trong HTML
- CSS variables: `--bg`, `--dark`, `--gold`, `--gold2`, `--muted`, `--border`, `--serif`, `--sans`

### HTML
- Không có CDN script nào trong `index.html`
- i18n qua `data-i18n` và `data-i18n-html` attributes — ngôn ngữ mặc định: `vi`
- Ảnh tham chiếu bằng đường dẫn root: `/album-anh-studio/photo_01.webp`

### Ảnh
- Tất cả ảnh phải là **WebP**, nén bằng `cwebp -q 85` trước khi đưa vào
- Album AURA: ảnh nằm trong `public/` trực tiếp theo đường dẫn gốc (tham chiếu relative path)
- Album BLUE MOON: đặt trong `public/albums/blue-moon/{tên-thư-mục}/`, tham chiếu bằng `/albums/blue-moon/...`
- Tên file giữ nguyên theo gốc (không cần đổi tên)

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
5. **Services** — grid 3 cột, click mở album lightbox
6. **About** — 2 cột ảnh + text
7. **USP** — 3 điểm khác biệt, nền dark
8. **Collections** — alternating layout, click mở album
9. **Pricing** — 3 gói, card giữa highlight
10. **Feedback** — reviews khách hàng, Tailwind grid
11. **Process** — 7 bước quy trình
12. **FAQ** — accordion
13. **CTA Banner** — dark bg, phone + buttons
14. **Footer** — 4 cột
15. **Album Lightbox** — modal full-screen, grid + single view, swipe + keyboard

---

## Albums hiện có (trong JS)

### AURA (path relative, không có leading slash)

| Key | Folder | Số ảnh |
|-----|--------|--------|
| aura01 | Ao dai vang nghe - Pho co | 6 |
| aura02 | Tet - Cheongsam do den | 21 |
| aura03 | Nu than Vang - Gold Goddess | 9 |
| aura06 | Hai co gai Ao dai - Pho co retro | 9 |
| aura07 | Vay dam hong - Salon Victorian | 14 |
| aura09 | Vay cuoi trang - Vuon hoa | 4 |
| aura14 | Dam hoi - Ao dai trang Do | 6 |
| aura18 | Hanfu hong - Tuyet roi Hoa sen | 7 |
| aura20 | Ao dai kem - Biet thu Phap | 7 |

### BLUE MOON (`public/albums/blue-moon/`, path bắt đầu bằng `/albums/blue-moon/`)

| Key | Folder | Số ảnh |
|-----|--------|--------|
| bm05 | 05 - Couple Ao dai hong den - Co dien | 4 |
| bm13 | 13 - Ho ly 9 duoi | 5 |
| bm15 | 15 - Tiec sinh nhat - Cute Candy | 7 |
| bm16 | 16 - Vay cuoi trang - Studio xanh | 5 |
| bm17 | 17 - Couple Ao dai trang - Xe dap retro | 5 |
| bm19 | 19 - Den do Valentine | 4 |
| bm23 | 23 - Hanfu hong - Dan ty ba | 4 |
| bm24 | 24 - Ao dai trang - Ho sen Tre | 4 |

---

## Cách thêm album mới

**Album BLUE MOON:**
1. Copy thư mục ảnh WebP vào `public/albums/blue-moon/{tên-thư-mục}/`
2. Trong `src/main.js` → `ALBUMS`: thêm `{ path: '/albums/blue-moon/{tên-url-encoded}/', files: [...] }`
3. Trong `src/main.js` → `ALBUM_TITLES`: thêm tên EN + VI
4. Thêm `.col-card` HTML vào section `#collections` trong `index.html`

**Album AURA (đường dẫn cũ):**
1. Thêm ảnh vào `public/No logo - WebP/AURA/{tên-thư-mục}/`
2. Tương tự bước 2–4 nhưng path không có leading slash

---

## TODO / cần cập nhật

- [x] Đổi tên project trong `package.json` từ `aurastudio` → `bluemoon`
- [ ] Cập nhật git remote nếu tạo repo mới cho bluemoon
- [ ] Thay ảnh hero và services bằng ảnh BLUE MOON
- [ ] Cập nhật nội dung text (tên studio, địa chỉ, SĐT) cho bluemoon
- [ ] Copy ảnh AURA vào `public/` để hero + services section hoạt động trong Vite

---

*Cập nhật lần cuối: 2026-05-21*
