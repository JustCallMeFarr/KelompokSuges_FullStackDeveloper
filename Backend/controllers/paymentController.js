const db = require("../config/db");
const connectSheet = require("../config/googleSheet");

exports.payment = async (req, res) => {
    const connection = db.promise();

    try {

        const {
            id_user,
            merchant,
            amount,
            description
        } = req.body;

        if (!id_user || !merchant || !amount) {
            return res.status(400).json({
                message: "Data belum lengkap"
            });
        }

        // Cari user
        const [user] = await connection.query(
            "SELECT * FROM users WHERE id_user = ?",
            [id_user]
        );

        if (user.length === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }

        const saldo = Number(user[0].balance);
        const nominal = Number(amount);

        // Cek saldo
        if (saldo < nominal) {
            return res.status(400).json({
                message: "Saldo tidak cukup"
            });
        }

        // Kurangi saldo
        await connection.query(
            "UPDATE users SET balance = balance - ? WHERE id_user = ?",
            [nominal, id_user]
        );

        // Simpan transaksi
        await connection.query(
            `
            INSERT INTO transaksi
            (
                id_user,
                jenis_transaksi,
                jumlah,
                tanggal,
                keterangan,
                status
            )
            VALUES
            (?, 'PAYMENT', ?, NOW(), ?, 'SUCCESS')
            `,
            [
                id_user,
                nominal,
                description || `Pembayaran ke ${merchant}`
            ]
        );

        // ==========================
        // GOOGLE SHEETS
        // ==========================
        try {

            const doc = await connectSheet();
            const sheet = doc.sheetsByIndex[0];

            await sheet.addRow({
                tanggal: new Date().toLocaleString("id-ID"),
                pengirim: user[0].display_name,
                penerima: merchant,
                rekening_pengirim: user[0].card_number,
                rekening_penerima: "-",
                jenis_transaksi: "PAYMENT",
                jumlah: nominal,
                keterangan: description || `Pembayaran ke ${merchant}`,
                status: "SUCCESS"
            });

            console.log("✅ Payment berhasil dikirim ke Google Sheet");

        } catch (sheetErr) {

            console.error("❌ Google Sheet Error:", sheetErr.message);

            // Tidak membatalkan transaksi database
        }

        res.json({
            success: true,
            message: "Pembayaran berhasil",
            balance: saldo - nominal
        });

    } catch (err) {

        console.error("PAYMENT ERROR:", err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }
};