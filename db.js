const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Kosongkan jika pakai XAMPP default
    database: 'kipk_tracker'
});

db.connect((err) => {
    if (err) {
        console.error('Gagal koneksi ke database:', err.message);
        return;
    }
    console.log('Terhubung ke database MySQL: kipk_tracker');
});

module.exports = db; 