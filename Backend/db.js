const mysql = require('mysql2');

// Konfigurasi koneksi
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Default XAMPP biasanya root
  password: '',      // Default XAMPP biasanya kosong
  database: 'db_kipk_tracker' // Nama database yang kamu buat di Workbench tadi
});

// Cek koneksi
connection.connect((err) => {
  if (err) {
    console.error('Gagal koneksi ke database: ' + err.stack);
    return;
  }
  console.log('Database terhubung dengan ID ' + connection.threadId);
});

module.exports = connection;