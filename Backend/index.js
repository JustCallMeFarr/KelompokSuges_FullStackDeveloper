require("dotenv").config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./config/db'); // Pastikan db.js kamu sudah benar
const userRoutes = require('./routers/userRoutes');
const transactionRoutes = require("./routers/transactionRoutes");
const paymentRoutes = require("./routers/paymentRoutes");
const receiptRoutes = require("./routers/receiptRoutes");
const adminRoutes = require("./routers/adminRoutes");

const app = express();
const PORT = 3000;
const SECRET_KEY = 'KIPK_TRACKER_RAHASIA';


const upload = require("./config/upload");

// --- 2. MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api', userRoutes);
app.use("/api", transactionRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/receipt", receiptRoutes);
app.use("/api", adminRoutes);

// --- 3. ROUTES AUTH (REGISTER & LOGIN) ---

// REGISTER
app.post('/api/auth/register', async (req, res) => {
    const { nim, username, email, password, pin } = req.body;
    try {
        const [mahasiswa] = await db.promise().query("SELECT * FROM mahasiswa WHERE nim = ?", [nim]);
        if (mahasiswa.length === 0) return res.status(400).json({ message: "NIM tidak terdaftar di sistem mahasiswa!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const cardNumber = "4080" + Math.floor(100000000000 + Math.random() * 900000000000);
        const cardHolder = username;

        const [result] = await db.promise().query(
            "INSERT INTO users (nim, username, email, password, pin, balance, card_number, card_holder) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [nim, username, email, hashedPassword, pin, 0, cardNumber, cardHolder]
        );

        res.status(201).json({
            message: "User berhasil didaftarkan!",
            user: {
                id_user: result.insertId,
                username,
                email
            }
        });
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
        res.json({
            message: "Login Berhasil!",
            token,
            user: {
                id_user: users[0].id_user,
                username: users[0].username,
                email: users[0].email,
                display_name: users[0].display_name,
                pin: users[0].pin
            }
        });
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

app.put('/api/profile/setup', async (req, res) => {
    console.log("BODY:", req.body);

    const { displayName, pin, userId } = req.body;

    console.log("displayName:", displayName);
    console.log("pin:", pin);
    console.log("userId:", userId);

    try {
        const [result] = await db.promise().query(
            `
            UPDATE users
            SET display_name = ?, pin = ?
            WHERE id_user = ?
            `,
            [displayName, pin, userId]
        );

        console.log("UPDATE RESULT:", result);

        res.json({
            message: "Profile berhasil diperbarui"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// --- 5. CEK KONEKSI & TEST ---
app.get('/', (req, res) => res.send('API KIP-K Tracker Ready!'));
const connectSheet = require("./config/googleSheet");

// TEST GOOGLE SHEET (sementara)
async function testGoogleSheet() {
    try {
        const doc = await connectSheet();

        const sheet = doc.sheetsByIndex[0];

        await sheet.addRow({
            tanggal: new Date().toISOString(),
            tipe: "TRANSFER",
            jumlah: 100000,
            status: "SUCCESS",
            keterangan: "Test dari backend",
        });

        console.log("✅ BERHASIL MASUK GOOGLE SHEET");
    } catch (err) {
        console.log("❌ ERROR SHEET:", err.message);
    }
}

// jalankan sekali saat server start
testGoogleSheet();
app.listen(PORT, () => {
    console.log(`
✅ Server nyala di http://localhost:${PORT}
📂 Route Register: http://localhost:3000/api/auth/register
📂 Route Login:    http://localhost:3000/api/auth/login
📂 Route Upload:   http://localhost:3000/api/upload
    `);
});

