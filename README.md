# admin-page-sql

Nama File	Fungsi
app.js	-- File utama untuk menjalankan server Express
package.json	-- Berisi dependencies dan script npm
.gitignore	-- Mengabaikan folder seperti node_modules/ saat push ke GitHub
routes/index.js	-- Menangani route GET/POST dari halaman admin
controllers/pembelianController.js	-- Mengelola logika pembelian dan pembatalan
models/db.js	-- Konfigurasi dan koneksi MySQL pool
views/dashboard.ejs	-- Tampilan daftar produk dan form pembelian
views/pembelian.ejs	-- Tampilan riwayat pembelian
views/partials/header.ejs	-- Bagian atas HTML (judul, menu, dll)
views/partials/footer.ejs	-- Footer HTML
public/css/style.css	-- Styling halaman agar modern dan responsive
sql/schema.sql	-- File SQL untuk membuat tabel awal di MySQL

Cara Menjalankan Proyek
Install dependencies
Buka terminal di folder project, lalu:

npm install
Atur koneksi database
Di file models/db.js, ubah konfigurasi sesuai kredensial MySQL kamu:


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'admin_pembelian'
});
Jalankan aplikasi

node app.js
atau jika kamu sudah pasang nodemon:

node app.js
Buka di browser
Kunjungi: http://localhost:3000
