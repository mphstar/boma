# BOMA Gunung Pasang

![BOMA Gunung Pasang](public/og-image.jpg)

Situs informasi dan rekomendasi wisata kawasan perkebunan kopi dan karet Gunung Pasang, Jember. Dibangun sebagai single-page app React dengan routing hash, jadi bisa disajikan sebagai berkas statis tanpa aturan rewrite di server.

Situs produksi: <https://boma.j-pims.com>

## Fitur

- Beranda dengan foto latar yang berganti otomatis setiap 7,5 detik, navigasi manual, tombol jeda, dan dukungan `prefers-reduced-motion`.
- Dialog personalisasi tiga pertanyaan: tingkat aktivitas, anggaran, dan teman perjalanan.
- Hasil rekomendasi dari pohon keputusan, lengkap dengan alasan pemilihan dan daftar destinasi yang cocok.
- Katalog 14 destinasi dengan filter kategori: Minat Khusus, Alam, Buatan, dan Sosial Budaya.
- Halaman detail destinasi dengan informasi harga, durasi, intensitas, dan destinasi serupa.
- Transisi antar halaman bertirai, layar muat awal, serta fokus dan Escape yang bekerja di dialog.
- Tata letak responsif, font self-host, dan foto WebP dengan `srcSet`.
- Meta SEO, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`, dan manifest PWA.

## Teknologi

- React 19 dan React DOM 19
- TypeScript 7
- Vite 8
- CSS biasa, tanpa UI kit
- Tanpa framer-motion. Animasi memakai CSS dan Web Animations API.

## Menjalankan

Butuh Node.js `^20.19.0` atau `>=22.12.0`.

```bash
npm install
npm run dev
```

Build produksi sekaligus type-check:

```bash
npm run build
npm run preview
```

Hasil build ada di `dist`. Di PowerShell yang memblokir `npm.ps1`, jalankan `npm.cmd` dengan perintah yang sama.

## Rute

| Hash | Halaman |
| --- | --- |
| `#/` | Beranda |
| `#/katalog` | Katalog wisata |
| `#/hasil` | Hasil rekomendasi |
| `#/wisata/jeep` | Detail destinasi, contoh untuk Jeep Adventure |

`#/hasil` hanya menampilkan rekomendasi yang sedang aktif. Kalau dibuka langsung tanpa rekomendasi, situs kembali ke Beranda dan membuka dialog personalisasi.

Karena memakai hash, tautan dalam (`#/katalog`, `#/wisata/jeep`) tetap bekerja di hosting statis tanpa konfigurasi fallback.

## Cara kerja rekomendasi

1. Pengunjung menjawab tiga pertanyaan di `src/data/options.ts`.
2. `src/utils/classify.ts` menelusuri pohon keputusan. Akar pohon adalah tingkat aktivitas, lalu bercabang ke anggaran atau jenis wisatawan.
3. Setiap daun memetakan ke kategori dan daftar `id` destinasi. Ada tujuh daun, dari `aktif-premium` sampai `santai-lain`.
4. Teks alasan tiap daun ada di `src/data/decisionTree.ts`.
5. Rekomendasi disimpan di React context selama sesi. Memuat ulang halaman mengosongkan pilihan.

## Struktur proyek

```text
public/
  assets/          Logo sumber dan mark BOMA
  fonts/           Manrope dan Playfair Display, subset latin
  icons/           Ikon PWA 192 dan 512
  images/          Foto asli
  images/opt/      Varian WebP untuk kartu dan latar
  og-image.jpg     Gambar pratinjau 1200x630
  robots.txt
  sitemap.xml
  site.webmanifest
src/
  components/      Hero, katalog, dialog, hasil, layout, UI
  context/         Rekomendasi dan toast
  data/            Destinasi, pertanyaan, pohon keputusan, foto
  helpers/         Reveal dan ripple
  hooks/           Routing hash dan reduced motion
  pages/           Beranda, katalog, hasil, detail
  styles/          CSS per bagian, termasuk font dan transisi
  utils/           Klasifikasi, router, format, scene, motion
  App.tsx
  main.tsx
index.html
```

## Aset dan performa

- Foto kartu tersedia dalam lebar 240, 480, 960, dan 1280 piksel.
- Foto latar tersedia dalam lebar 640, 960, dan 1280 piksel, dipotong tengah ke rasio 16:9.
- Hero hanya memasang foto yang sedang tampil dan foto yang sedang keluar. Foto lain tidak ikut diunduh.
- Gambar LCP di-preload dan memakai `fetchPriority="high"`. Gambar kartu memakai `loading="lazy"` dan `sizes` sesuai tata letak.
- Font Manrope dan Playfair Display disajikan dari `public/fonts`, bukan dari Google Fonts.
- Isi `public/images/opt` dihasilkan dari foto di `public/images`. Jangan mengeditnya manual. Kalau foto asal diganti, buat ulang semua varian dengan nama dan lebar yang sama supaya `srcSet` tetap valid.
- Foto asli tetap disimpan sebagai sumber dan ikut tersalin ke `dist` oleh Vite.

## Deployment

1. Jalankan `npm run build`.
2. Unggah isi `dist` ke hosting statis.
3. Sajikan situs dari akar domain, karena URL aset dimulai dengan `/`.
4. Kalau domain berubah, perbarui URL absolut di `index.html`, `public/robots.txt`, dan `public/sitemap.xml`.
5. Header keamanan seperti HSTS, CSP, COOP, dan X-Frame-Options diatur di hosting, bukan di kode React.

## Kredit foto

Foto katalog berasal dari Wikimedia Commons. Judul berkas, pembuat, dan lisensi tiap foto tercatat di [`public/images/credits.json`](public/images/credits.json), termasuk CC BY, CC BY-SA, dan public domain.

## Lisensi

Repositori ini belum menyertakan berkas lisensi. Hubungi pemilik proyek sebelum memakai ulang kode atau aset di luar situs BOMA.
