import mysql from "mysql2/promise";

// Koneksi pool ke database
export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // ganti sesuai setup-mu
  database: "admin_db",
});

// Fungsi inisialisasi jika perlu
export async function initDB() {
  // buat produk dummy jika kosong
}

// Ambil semua produk
export async function getAllProduk() {
  const [rows] = await pool.query("SELECT * FROM produk");
  return rows;
}

// Ambil stok produk
export async function getStokProduk(produk_id) {
  const [[result]] = await pool.query(
    "SELECT stok FROM stok_produk WHERE produk_id = ?",
    [produk_id]
  );
  return result ? result.stok : 0;
}

// Buat pembelian
export async function buatPembelian(produk_id, jumlah) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(
      "INSERT INTO pembelian (produk_id, jumlah) VALUES (?, ?)",
      [produk_id, jumlah]
    );
    await conn.query(
      "UPDATE stok_produk SET stok = stok - ? WHERE produk_id = ?",
      [jumlah, produk_id]
    );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

// ❗️ FUNGSI INI KAMU TARUH DI SINI
export async function getAllPembelian() {
  const [pembelianRows] = await pool.query(`
    SELECT pembelian.id, produk.nama, pembelian.jumlah, pembelian.tanggal
    FROM pembelian
    JOIN produk ON pembelian.produk_id = produk.id
    ORDER BY pembelian.tanggal DESC
  `);
  return pembelianRows;
}

// Batalkan pembelian
export async function batalkanPembelian(pembelianId) {
  // isi fungsi sesuai logika kamu
}
