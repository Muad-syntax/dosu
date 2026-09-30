# Dosu — Donat Susu

> **lembut, manis, penuh susu** · ミルクドーナツ

Website toko online donat susu **Dosu**. Pelanggan dapat melihat menu, memasukkan donat ke keranjang, lalu memesan langsung lewat WhatsApp penjual.

---

## ✨ Fitur

- 🛍️ **Katalog menu** — 4 varian donat dengan filter kategori & pencarian real-time
- 🔐 **Autentikasi** — Register & login berbasis username, password di-hash SHA-256 + salt via Web Crypto API
- 🛒 **Keranjang belanja** — Tambah, ubah jumlah, hapus, persistensi per akun di `localStorage`
- 💬 **Pesan via WhatsApp** — Satu klik langsung buka WA dengan pesan pesanan yang sudah terformat rapi
- 🎨 **Tema "Winter Milk"** — Desain soft, lembut, kawaii sesuai identitas logo Dosu
- ❄️ **Animasi** — Kepingan salju jatuh, donat mengambang, transisi halaman
- 📱 **Mobile-first** — Responsif penuh di HP, tablet, dan desktop

---

## 🛠️ Tech Stack

| Kebutuhan | Pilihan |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build tool | Vite |
| Routing | Vue Router 4 |
| State management | Pinia |
| Styling | CSS Variables (`:root`) |
| Persistensi | `localStorage` |
| Ikon | `lucide-vue-next` |
| Font | Google Fonts — Fredoka, Nunito, Zen Maru Gothic |

---

## 📁 Struktur Proyek

```
dosu-app/
├── public/
│   ├── logoDosu.png
│   └── logo_dosu_transparent.png
├── src/
│   ├── assets/
│   │   └── main.css          # Design system & CSS variables
│   ├── components/
│   │   ├── AppNavbar.vue
│   │   ├── AppFooter.vue
│   │   ├── ProductCard.vue
│   │   ├── CartItem.vue
│   │   ├── QuantityStepper.vue
│   │   ├── SnowDecor.vue
│   │   └── ToastMessage.vue
│   ├── data/
│   │   └── products.js       # Data menu statis
│   ├── stores/
│   │   ├── auth.js           # Pinia: user & sesi
│   │   └── cart.js           # Pinia: keranjang
│   ├── utils/
│   │   ├── storage.js        # Helper localStorage (try/catch)
│   │   ├── hash.js           # SHA-256 + salt hashing
│   │   └── whatsapp.js       # Pembuat pesan & URL WhatsApp
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── MenuView.vue
│   │   ├── CartView.vue
│   │   ├── LoginView.vue
│   │   ├── RegisterView.vue
│   │   └── NotFoundView.vue
│   ├── router/index.js
│   ├── App.vue
│   └── main.js
├── .env
├── index.html
└── vite.config.js
```

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js `^22.18.0` atau `>=24.12.0`
- npm

### Instalasi

```bash
# Clone / buka folder proyek
cd dosu-app

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka **http://localhost:5173** di browser.

### Build untuk produksi

```bash
npm run build
```

---

## ⚙️ Konfigurasi

Salin `.env` dan sesuaikan bila perlu:

```env
VITE_WA_NUMBER=62895414296707
```

Ganti dengan nomor WhatsApp penjual (format: kode negara tanpa `+`, tanpa spasi).

---

## 📋 Halaman & Route

| Path | Halaman | Akses |
|---|---|---|
| `/` | Beranda | Publik |
| `/menu` | Menu | Publik |
| `/keranjang` | Keranjang | Login |
| `/login` | Login | Tamu saja |
| `/register` | Register | Tamu saja |
| `/*` | 404 | Publik |

---

## 🔒 Catatan Keamanan

Password tidak disimpan sebagai teks biasa. Setiap password di-hash menggunakan **SHA-256 + salt** via Web Crypto API (`crypto.subtle.digest`) sebelum disimpan ke `localStorage`. Ini adalah perlindungan dasar — untuk produksi dengan data sensitif, gunakan backend sungguhan.

---

## 📦 Deploy

Website ini adalah **frontend-only** (tanpa backend). Bisa di-deploy ke:
- [Netlify](https://netlify.com)
- [Vercel](https://vercel.com)
- [GitHub Pages](https://pages.github.com)

---

*© 2026 Dosu · Dibuat dengan ❤️ untuk para pencinta donat susu*
