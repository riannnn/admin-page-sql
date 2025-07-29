import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import db from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

await db.initDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  try {
    const produk = await db.getAllProduk();
    const pembelianList = await db.getAllPembelian();
    res.render("pages/index", { produk, pembelianList });
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan saat mengambil data");
  }
});

app.post("/beli", async (req, res) => {
  const { produk_id, jumlah } = req.body;
  try {
    const stok = await db.getStokProduk(produk_id);
    if (stok < jumlah) {
      return res.send("Stok tidak cukup untuk melakukan pembelian.");
    }
    await db.buatPembelian(produk_id, jumlah);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan saat proses pembelian.");
  }
});

app.post("/batal/:id", async (req, res) => {
  const pembelianId = req.params.id;
  try {
    await db.batalkanPembelian(pembelianId);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal membatalkan pembelian.");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
