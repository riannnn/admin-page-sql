const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "db", "database.db");
const db = new sqlite3.Database(dbPath);

db.all("SELECT * FROM produk", [], (err, rows) => {
  if (err) {
    console.error("❌ Error:", err.message);
  } else {
    console.log("✅ Data Produk:", rows.length ? rows : "Kosong");
  }
  db.close();
});
