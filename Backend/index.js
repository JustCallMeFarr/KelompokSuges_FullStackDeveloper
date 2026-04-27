const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./config/db'); // Pastikan db.js kamu sudah benar

const app = express();
const PORT = 3000;
const SECRET_KEY = 'KIPK_TRACKER_RAHASIA';

// --- 1. KONFIGURASI PENYIMPANAN FILE (MULTER) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pastikan folder 'uploads' sudah dibuat manual di project
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- 2. MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// --- 3. ROUTES AUTH (REGISTER & LOGIN) ---

// REGISTER
app.post('/api/auth/register', async (req, res) => {
    const { nim, username, password, pin } = req.body;
    try {
        const [mahasiswa] = await db.promise().query("SELECT * FROM mahasiswa WHERE nim = ?", [nim]);
        if (mahasiswa.length === 0) return res.status(400).json({ message: "NIM tidak terdaftar di sistem mahasiswa!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.promise().query(
            "INSERT INTO users (nim, username, password, pin) VALUES (?, ?, ?, ?)",
            [nim, username, hashedPassword, pin]
        );
        res.status(201).json({ message: "User berhasil didaftarkan!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [users] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);
        if (users.length === 0) return res.status(400).json({ message: "Username tidak ditemukan!" });

        const isMatch = await bcrypt.compare(password, users[0].password);
        if (!isMatch) return res.status(400).json({ message: "Password salah!" });

        const token = jwt.sign({ id: users[0].id_user }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: "Login Berhasil!", token, user: users[0].username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 4. ROUTE UPLOAD FILE ---
app.post('/api/upload', upload.single('berkas'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Pilih file terlebih dahulu!" });
    res.json({
        message: "File berhasil diupload!",
        fileDetail: req.file
    });
});

// --- 5. CEK KONEKSI & TEST ---
app.get('/', (req, res) => res.send('API KIP-K Tracker Ready!'));

app.listen(PORT, () => {
    console.log(`
✅ Server nyala di http://localhost:${PORT}
📂 Route Register: http://localhost:3000/api/auth/register
📂 Route Login:    http://localhost:3000/api/auth/login
📂 Route Upload:   http://localhost:3000/api/upload
    `);
});