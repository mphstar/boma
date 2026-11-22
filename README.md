<p align="center">
  <a href="https://boma.j-pims.com">
    <img src="public/og-image.jpg" alt="BOMA Gunung Pasang, kebun kopi dan air terjun di Jember" width="100%">
  </a>
</p>

<h1 align="center">BOMA Gunung Pasang</h1>

<p align="center">
  <strong>Kebun kopi, air terjun, dan udara gunung di Jember.</strong><br>
  Satu situs untuk membantu orang memilih tujuan.
</p>

<p align="center">
  <a href="https://boma.j-pims.com">
    <img src="https://img.shields.io/badge/Buka_Situs-boma.j--pims.com-1c3a2b?style=for-the-badge&amp;logo=googlechrome&amp;logoColor=f4efde" alt="Buka situs BOMA">
  </a>
  <img src="https://img.shields.io/badge/Jember-Indonesia-6f7d3c?style=for-the-badge&amp;logo=googlemaps&amp;logoColor=white" alt="Jember, Indonesia">
  <img src="https://img.shields.io/badge/14-Destinasi-2c4f38?style=for-the-badge" alt="14 destinasi">
</p>

BOMA Gunung Pasang adalah kawasan wisata di lereng Gunung Pasang. Di dalamnya ada kebun kopi dan karet, air terjun, goa, candi, sampai area camping. Empat belas destinasi itu kini punya satu tempat untuk dilihat, dibandingkan, dan dipilih.

Situs ini dibuat untuk pengunjung yang datang dengan waktu terbatas. Kalau bingung harus ke mana, jawab tiga pertanyaan singkat. BOMA akan menunjukkan tempat yang paling cocok, lengkap dengan alasan kenapa tempat itu dipilih.

> [!TIP]
> Baru pertama kali? Mulai dari [Beranda](https://boma.j-pims.com), atau langsung buka [katalog](https://boma.j-pims.com/#/katalog).

## 🌿 Yang bisa dilakukan

- 🧭 **Rekomendasi yang bisa dijelaskan.** Tiga pertanyaan tentang aktivitas, anggaran, dan teman perjalanan. Hasilnya daftar tempat beserta alasannya.
- 🗂️ **Katalog lengkap.** Empat belas destinasi, bisa disaring berdasarkan Minat Khusus, Alam, Buatan, atau Sosial Budaya.
- 🏞️ **Detail yang berguna.** Harga, durasi, tingkat aktivitas, dan destinasi lain yang mirip.
- 🎟️ **Tiket dan paket.** Tiap wisata punya pilihan tiket masuk dan paket pengalaman, dengan harga Rupiah dan tampilan pembayaran QRIS.
- ⌨️ **Bisa dipakai tanpa mouse.** Fokus keyboard terlihat, dan dialog bisa ditutup dengan Escape.
- 🌾 **Gerak yang sopan.** Animasi mengikuti pengaturan perangkat. Kalau gerak diminta dikurangi, BOMA ikut tenang.

> [!NOTE]
> QRIS di situs ini hanya tampilan. Tidak ada pembayaran yang diproses, tidak ada data pemesan yang dikirim, dan tidak ada tiket yang diterbitkan. Harga tiket juga masih contoh, jadi konfirmasi tarif ke pengelola sebelum datang.

## 🧭 Cara BOMA memilih

Pertanyaan pertama adalah seberapa aktif pengunjung ingin bergerak. Jawaban itu menentukan cabang berikutnya: anggaran atau teman perjalanan. Dari sana ada tujuh hasil yang mungkin, dan setiap hasil membawa daftar destinasi beserta alasannya.

Alasan itu ditulis terbuka. Pengunjung bisa melihat kenapa Jeep Adventure muncul untuk satu jawaban, dan kenapa Tracking Air Terjun Tancak muncul untuk jawaban lain. Rekomendasinya bukan kotak hitam.

Pilihan juga tidak dikunci. Katalog tetap bisa dibuka kapan saja, termasuk oleh orang yang belum ingin menjawab pertanyaan.

## 🎨 Rasa yang dibawa

Warna diambil dari kawasan: hijau tua, krem, dan pasir. Foto dipakai besar supaya orang bisa membayangkan tempatnya. Judul memakai Playfair Display, teks memakai Manrope.

Gerak dipakai untuk memberi arah, bukan mengisi ruang. Ada pergantian halaman, foto yang berganti pelan, dan dialog yang muncul setelah Beranda sempat bernapas.

<p align="center">
  <img src="public/images/opt/jeep-bg-960.webp" width="32%" alt="Jeep Adventure di jalur perkebunan">
  <img src="public/images/opt/kopi-bg-960.webp" width="32%" alt="Kebun kopi di Gunung Pasang">
  <img src="public/images/opt/event-bg-960.webp" width="32%" alt="Pertunjukan budaya di BOMA">
</p>

<p align="center"><em>Petualangan, kebun, dan budaya. Tiga sisi BOMA yang muncul di situs.</em></p>

## 🛠️ Di balik layar

Situs ini dibangun dengan React 19, TypeScript, dan Vite. Tidak ada UI kit dan tidak ada pustaka animasi tambahan. Foto disajikan dalam WebP dengan ukuran yang sesuai layar, dan foto latar di halaman awal hanya memuat foto yang sedang tampil.

Font Manrope dan Playfair Display disajikan dari situs sendiri, jadi tidak ada permintaan ke Google Fonts.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-20232A?style=flat-square&amp;logo=react&amp;logoColor=61DAFB" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-7-3178C6?style=flat-square&amp;logo=typescript&amp;logoColor=white" alt="TypeScript 7">
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&amp;logo=vite&amp;logoColor=white" alt="Vite 8">
  <img src="https://img.shields.io/badge/Node.js-20.19%2B-5FA04E?style=flat-square&amp;logo=nodedotjs&amp;logoColor=white" alt="Node.js 20.19 atau lebih baru">
</p>

## 🚀 Menjalankan

Butuh Node.js 20.19 atau lebih baru.

```bash
npm install
npm run dev
```

Untuk membuat versi produksi:

```bash
npm run build
npm run preview
```

Hasil build ada di folder `dist` dan bisa diunggah ke hosting statis. Semua tautan memakai hash, jadi tidak perlu aturan rewrite di server.

Di PowerShell yang memblokir `npm.ps1`, jalankan `npm.cmd` dengan perintah yang sama.

## 📷 Kredit foto

Foto katalog berasal dari Wikimedia Commons. Judul berkas, pembuat, dan lisensi tiap foto tercatat di [`public/images/credits.json`](public/images/credits.json), termasuk CC BY, CC BY-SA, dan public domain.

## 📄 Lisensi

Repositori ini belum menyertakan berkas lisensi. Hubungi pemilik proyek sebelum memakai ulang kode atau aset di luar situs BOMA.

## 👋 Tentang pembuat

<p>
  <a href="https://github.com/mphstar">
    <img src="https://img.shields.io/badge/GitHub-mphstar-181717?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="GitHub mphstar">
  </a>
</p>

Dirancang dan dibangun oleh **mphstar**. Proyek ini berangkat dari satu pertanyaan: bagaimana membuat orang lebih cepat memutuskan tempat wisata, tanpa kehilangan rasa tempatnya.

Kalau ada masukan soal alur rekomendasi atau tampilan, buka [issue](https://github.com/mphstar/boma/issues).
