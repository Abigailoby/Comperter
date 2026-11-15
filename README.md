# 🚀 Comperter - Modern Image to JPEG Converter & Compressor

**Comperter** adalah aplikasi web modern, cepat, dan 100% offline (Client-Side) untuk mengonversi berbagai format gambar (**JPG, JPEG, PNG, WEBP, BMP, GIF, hingga dokumen PDF**) menjadi format **JPEG/JPG** standar dengan fitur kompresi ukuran file canggih hingga hemat 90%.

---

## ✨ Fitur Utama

1. **Konversi Format Lengkap ke JPEG**:
   - Mendukung input: **JPG, JPEG, PNG, WEBP, BMP, GIF, SVG, dan PDF**.
   - Penanganan transparansi otomatis: Gambar PNG/WebP transparan otomatis diberi latar belakang putih bersih (`#FFFFFF`), menghindari masalah latar belakang hitam saat diubah ke JPEG.
   - Pilihan ekstensi output: `.jpeg`, `.jpg`, `.webp`, atau `.png`.

2. **Dua Mode Kompresi Cerdas**:
   - **Mode Kualitas (Quality %)**: Atur rasio kualitas visual dari 1% hingga 100% dengan slider interaktif atau preset cepat (💎 Maksimal 95%, ⚡ Disarankan 80%, ⚖️ Seimbang 60%, 📦 Terkecil 40%).
   - **Mode Target Ukuran File (Target Size - KB/MB)**:
     - Masukkan batas ukuran maksimal file yang Anda inginkan (misal **200 KB**).
     - Menggunakan algoritma optimasi **Binary Search** otomatis untuk menghasilkan file yang secara ketat berada di bawah batas target ukuran tanpa mengorbankan kualitas secara berlebihan!
     - Dilengkapi preset instan khusus portal registrasi Indonesia:
       - `Max 50 KB`
       - `Max 100 KB`
       - `★ 200 KB (Khusus CPNS / SSCASN / BKN / SNBP)`
       - `Max 500 KB`
       - `Max 1 MB`

3. **Ubah Dimensi & Preset Pas Foto Resmi**:
   - Skala persentase gambar (100%, 75%, 50%, 25%).
   - Input lebar dan tinggi kustom dengan pengunci rasio aspek (proporsional).
   - Preset standar pas foto resmi (300 DPI):
     - **2x3** (236 x 354 px)
     - **3x4** (354 x 472 px)
     - **4x6** (472 x 709 px)
     - **FHD** (1920 x 1080 px)

4. **Interactive Before & After Comparison**:
   - Slider interaktif belah layar (split slider): Geser garis pemisah ke kiri dan kanan untuk membandingkan ketajaman visual foto asli vs hasil kompresi secara real-time.
   - Ringkasan metrik: Ukuran asli vs baru, persentase penghematan ukuran, dan resolusi piksel.

5. **Batch Processing & Download All (ZIP)**:
   - Unggah puluhan file sekaligus dengan drag & drop.
   - Dukungan Clipboard Paste: Cukup tekan `Ctrl + V` untuk langsung menempelkan screenshot/gambar yang disalin.
   - Download satuan atau tombol **"Download Semua (ZIP)"** dalam satu klik.

6. **100% Aman & Menjaga Privasi (Client-Side Only)**:
   - Seluruh pemrosesan dilakukan langsung di browser Anda menggunakan HTML5 Canvas API dan Web Workers.
   - **Tidak ada foto yang dikirim ke server cloud mana pun**, aman untuk dokumen identitas, KTP, ijazah, atau foto pribadi.

---

## 🛠️ Cara Menjalankan

### Cara 1: Langsung Buka di Browser (Tanpa Instalasi)
Cukup buka file `index.html` dengan cara klik ganda (double click) atau klik kanan > *Open with* browser pilihan Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).

### Cara 2: Menjalankan via Local Server (Node.js)
Jika Anda memiliki Node.js terinstal di komputer:
```bash
# Buka folder project di terminal:
cd e:\Project\Comperter

# Jalankan server lokal:
npm start
# atau
npx serve . -l 3000
```
Lalu buka browser di `http://localhost:3000`.

### Cara 3: Menjalankan via Python HTTP Server
```bash
python -m http.server 3000
```
Buka browser di `http://localhost:3000`.

---

## 📁 Struktur File
```
Comperter/
├── index.html        # Halaman utama aplikasi web
├── css/
│   └── style.css     # Kustom styling, slider, dan animasi
├── js/
│   ├── converter.js  # Mesin utama konversi Canvas & algoritma Binary Search
│   ├── pdf-helper.js # Ekstraksi dokumen PDF ke halaman JPEG
│   └── app.js        # Controller UI, event listener, i18n, & ZIP export
├── package.json      # Konfigurasi npm script
└── README.md         # Dokumentasi lengkap
```
