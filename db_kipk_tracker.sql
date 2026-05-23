CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_lengkap VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nomor_kipk VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    tanggal DATE NOT NULL,
    nominal DECIMAL(12, 2) NOT NULL,
    kategori ENUM('Makanan', 'Transportasi', 'Pendidikan', 'Kost', 'Lainnya') NOT NULL,
    keterangan TEXT,
    tipe ENUM('Masuk', 'Keluar') DEFAULT 'Keluar',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);