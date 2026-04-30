# IDEA REALITY. — High-End Digital Agency Platform

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Shared-47A248?style=for-the-badge&logo=mongodb)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v5_Beta-000000?style=for-the-badge)

**IDEA REALITY.** (Project Architect) adalah platform agensi digital modern yang dibangun dengan fokus pada estetika **Dark Luxury**, performa tinggi, dan pengalaman pengguna yang imersif. Platform ini dirancang untuk mengubah visi kreatif menjadi karya digital yang nyata.

<img width="1920" height="1152" alt="ARCHITECT-Creative-Digital-Agency" src="https://github.com/user-attachments/assets/4cbc4078-f967-4fb6-83e6-c211c7ffd596" />
<br><br>
<img width="1920" height="1712" alt="ARCHITECT-Creative-Digital-Agency(1)" src="https://github.com/user-attachments/assets/63c8e0c8-b6b3-44c7-b106-a1d5232d441c" />


---

## ✨ Fitur Utama

- 🏛️ **Arsitektur Modern**: Menggunakan Next.js 14 App Router dengan pola desain yang bersih dan skalabel.
- 💎 **Estetika Luxury**: UI berbasis Tailwind CSS murni dengan sistem variabel CSS, mendukung _smooth animations_ dan _glassmorphism_.
- 📝 **Sistem Blog Dinamis**: CRUD penuh untuk artikel/case studies dengan optimasi SEO (Slug-based routing).
- 🔐 **Autentikasi Aman**: Didukung oleh NextAuth.js v5 (Beta) dengan sistem peran (Role-based access control).
- 📊 **Admin Control Center**: Dashboard khusus untuk manajemen user, konten blog, dan pesan masuk (inquiries).
- 📩 **Inquiry Tracking**: Sistem pelacakan ide/proyek bagi klien dengan sinkronisasi akun real-time.
- ☁️ **Cloud Image Storage**: Integrasi Cloudinary untuk manajemen aset visual yang cepat dan efisien.

---

## 🚀 Teknologi yang Digunakan

- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion (Reveal system).
- **Backend**: Next.js Server Actions, Route Handlers.
- **Database**: MongoDB dengan Mongoose ODM.
- **Auth**: NextAuth.js v5.
- **Validation**: Zod (Schema validation).
- **Media**: Cloudinary API.

---

## 🛠️ Instalasi Lokal

1. **Clone Repository**:

   ```bash
   git clone https://github.com/Silaenn/nextJs.git
   cd nextJs
   ```

2. **Install Dependency**:

   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable**:
   Buat file `.env` di root direktori dan isi dengan:

   ```env
   MONGO=your_mongodb_connection_string
   AUTH_SECRET=your_auth_secret
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

   # Cloudinary (Opsional untuk fitur upload)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

---

## 🌐 Deployment (Vercel)

Aplikasi ini dioptimalkan untuk dideploy di **Vercel**:

1. Hubungkan repository GitHub ke Vercel.
2. Masukkan semua variabel dari file `.env` ke bagian **Environment Variables** di dashboard Vercel.
3. Untuk MongoDB, pastikan IP Vercel di-whitelist (atau gunakan `0.0.0.0/0` di MongoDB Atlas).
4. Klik **Deploy**.

---

## 🎨 Konvensi Desain

Proyek ini menggunakan sistem desain terpadu:

- **Spacing**: Grid berbasis 4px/8px.
- **Typography**: `Syne` untuk Heading dan `Plus Jakarta Sans` untuk Body.
- **Colors**: Variabel CSS di `globals.css` (`--bg`, `--accent`, `--surface`).
- **Components**: Utilitas khusus seperti `.input-luxury` untuk konsistensi form.

---

## 📜 Lisensi

Proyek ini dibuat untuk tujuan pengembangan personal dan showcase agensi.

---

_“Transforming visionary concepts into digital masterworks.”_ — **IDEA REALITY.**
