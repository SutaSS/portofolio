# Portofolio Web

Sebuah situs portofolio web yang dibuat menggunakan Next.js.

## About

Proyek ini adalah situs portofolio pribadi saya yang dibuat menggunakan Next.js. Tujuannya adalah untuk menampilkan profil, proyek, dan keahlian penulis secara profesional, responsif, dan mudah diperbarui.

## 🎯 Features

* Halaman utama dengan ringkasan profil.
* Bagian proyek-portofolio yang menampilkan detail proyek (gambar, deskripsi, teknologi).
* Responsif, mobile‐friendly.
* Dibangun dengan Next.js, Tailwind CSS (atau sesuai konfigurasi) untuk kecepatan dan kemudahan styling.
* Mudah untuk dikustomisasi dan diperluas.

## 🚀 Getting Started

### Prerequisites

* Node.js (sebaiknya versi LTS)
* npm / yarn / pnpm (sesuai preferensi)

### Installation

```bash
git clone https://github.com/SutaSS/portofolio.git  
cd portofolio  
npm install   # atau yarn install / pnpm install  
```

### Running Locally

```bash
npm run dev  
```

Buka di browser: `http://localhost:3000` untuk melihat hasil.

## 🛠️ Tech Stack

* **Framework**: Next.js
* **Language**: TypeScript
* **Styling**: Tailwind CSS (atau sesuai konfigurasi `tailwind.config.ts`)
* **Linting / Formatting**: ESLint, Prettier
* **Others**: Konfigurasi Next.js (`next.config.ts`), PostCSS (`postcss.config.mjs`)

## 📂 Project Structure

```
/
├─ public/                # aset statis (gambar, favicon, dll)
├─ src/
│  ├─ app/                # aplikasi Next.js (rute, halaman)
│  ├─ components/         # komponen UI
│  ├─ styles/             # file styling global / utilitas
├─ .gitignore
├─ next.config.ts         # konfigurasi Next.js
├─ tailwind.config.ts     # konfigurasi Tailwind CSS
├─ tsconfig.json
├─ package.json
└─ README.md
```

## 👨‍💻 Usage

* Untuk menambahkan proyek baru: buat data proyek (gambar, deskripsi, link) di dalam `src/app` atau folder data yang sesuai, lalu buat komponen atau halaman yang menampilkan proyek tersebut.
* Untuk memperbarui gaya atau tema: edit `tailwind.config.ts` dan/atau ubah styling di komponen.
* Untuk deploy: ikuti panduan di bawah.

## 🔧 Deployment

Situs ini dapat dengan mudah dideploy ke platform seperti Vercel, karena Next.js mendukung deployment seamless.

1. Push ke GitHub.
2. Hubungkan repo ke Vercel.
3. Atur build command (`npm run build`) dan output directory (`.next` atau default).
4. Deploy, lalu situs akan live.
