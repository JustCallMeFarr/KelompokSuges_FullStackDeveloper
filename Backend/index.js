const express = require('express');
const db = require('./db'); // Ini yang memanggil koneksi database
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('API KIP-K Tracker Ready & Database Connected!');
});

// Tambahkan route test ini untuk bukti laporan
app.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS hasil', (err, rows) => {
        if (err) return res.status(500).send(err);
        res.send(`Hasil Query Database: ${rows[0].hasil} (Koneksi Berhasil!)`);
    });
});

app.listen(PORT, () => {
    console.log(`Server nyala di http://localhost:${PORT}`);
});