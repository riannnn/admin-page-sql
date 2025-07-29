const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dbDir = path.join(__dirname, "db");
const dbPath = path.join(dbDir, "database.db");

// Buat folder db jika belum ada
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

// Hapus database lama jika ada
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const db = new sqlite3.Database(dbPath);

// Eksekusi query
db.serialize(() => {
  // Buat tabel produk
  db.run(`
    CREATE TABLE produk (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT NOT NULL,
      harga INTEGER NOT NULL
    )
  `);

  // Insert 10 produk
  const produkStmt = db.prepare(
    "INSERT INTO produk (nama, harga) VALUES (?, ?)"
  );
  const produkData = [
    ["Kopi Hitam", 15000],
    ["Latte", 20000],
    ["Espresso", 18000],
    ["Americano", 17000],
    ["Cappuccino", 22000],
    ["Matcha", 21000],
    ["Lemon Tea", 12000],
    ["Thai Tea", 16000],
    ["Jus Mangga", 18000],
    ["Air Mineral", 5000],
  ];
  produkData.forEach(([nama, harga]) => {
    produkStmt.run(nama, harga);
  });
  produkStmt.finalize();

  // Buat tabel stok
  db.run(`
    CREATE TABLE stok (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produk_id INTEGER NOT NULL,
      jumlah INTEGER NOT NULL,
      FOREIGN KEY (produk_id) REFERENCES produk(id)
    )
  `);

  // Isi stok
  const stokStmt = db.prepare(
    "INSERT INTO stok (produk_id, jumlah) VALUES (?, ?)"
  );
  for (let i = 1; i <= 10; i++) {
    stokStmt.run(i, 20); // stok awal 20
  }
  stokStmt.finalize();

  // Buat tabel pembelian
  db.run(`
    CREATE TABLE pembelian (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produk_id INTEGER NOT NULL,
      jumlah INTEGER NOT NULL,
      tanggal TEXT NOT NULL,
      FOREIGN KEY (produk_id) REFERENCES produk(id)
    )
  `);
});

db.close(() => {
  console.log("✅ Database berhasil dibuat dan diisi data awal.");
});
