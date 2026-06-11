const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// LOGIK REGISTER

function generateCardNumber() {
    return "4080" + Math.floor(100000000000 + Math.random() * 900000000000);
}

exports.register = async (req, res) => {
    const { nim, username, password, pin } = req.body;

    try {
        // Cek dulu apakah NIM ada di tabel mahasiswa
        const [mahasiswa] = await db.promise().query("SELECT * FROM mahasiswa WHERE nim = ?", [nim]);

        if (mahasiswa.length === 0) {
            return res.status(400).json({ message: "NIM tidak terdaftar di sistem mahasiswa!" });
        }

        if (!/^\d{6}$/.test(pin)) {
            return res.status(400).json({ message: "PIN harus 6 digit angka!" });
        }

        // Hash password supaya aman (tidak kelihatan teks asli di DB)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const cardNumber = generateCardNumber();
        const cardHolder = username;

        console.log("CARD NUMBER:", cardNumber);
        console.log("CARD HOLDER:", cardHolder);


        // Simpan ke tabel users
        await db.promise().query(
            "INSERT INTO users (nim, username, password, pin, balance, card_number, card_holder) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [nim, username, hashedPassword, pin, 0, cardNumber, cardHolder]
        );

        res.status(201).json({ message: "User berhasil didaftarkan!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIK LOGIN
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);

        if (users.length === 0) {
            return res.status(400).json({ message: "Username tidak ditemukan!" });
        }

        // Bandingkan password yang diketik dengan yang di DB
        const isMatch = await bcrypt.compare(password, users[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password salah!" });
        }

        // Buat token (ini yang nanti dipakai untuk akses fitur lain)
        const token = jwt.sign({ id: users[0].id_user }, 'KODE_RAHASIA_BEBAS', { expiresIn: '1h' });

        res.json({
            message: "Login Berhasil!",
            token: token,
            user: { username: users[0].username, nim: users[0].nim }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};