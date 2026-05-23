const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 🔹 Tambah transaksi
router.post("/", (req, res) => {
  const { jenis, jumlah } = req.body;

  const sql = "INSERT INTO transaksi (jenis, jumlah) VALUES (?, ?)";
  db.query(sql, [jenis, jumlah], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Gagal tambah data" });
    }

    res.json({
      message: "Data berhasil ditambahkan",
      data: { jenis, jumlah }
    });
  });
});

// 🔹 Ambil semua transaksi
router.get("/", (req, res) => {
  const sql = "SELECT * FROM transaksi ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Gagal ambil data" });
    }

    res.json(results);
  });
});

// 🔹 Hapus transaksi
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM transaksi WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Gagal hapus data" });
    }

    res.json({ message: "Data berhasil dihapus" });
  });
});

module.exports = router;