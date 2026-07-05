const connectSheet = require("../config/googleSheet");
const db = require("../config/db");

exports.createTransaction = async (req, res) => {
    try {

        const {
            id_user,
            jenis_transaksi,
            jumlah,
            keterangan
        } = req.body;

        if (!id_user || !jenis_transaksi || !jumlah) {
            return res.status(400).json({
                message: "Data belum lengkap."
            });
        }

        await db.promise().query(

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
            (?, ?, ?, NOW(), ?, 'SUCCESS')
            `,

            [
                id_user,
                jenis_transaksi,
                jumlah,
                keterangan
            ]

        );

        res.status(201).json({

            success: true,
            message: "Transaksi berhasil disimpan"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            error: err.message

        });

    }

};
exports.getTransactions = async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] = await db.promise().query(

            `
            SELECT *
            FROM transaksi
            WHERE id_user = ?
            ORDER BY tanggal DESC
            `,

            [id]

        );

        res.json(rows);

    } catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

};
exports.transfer = async (req, res) => {

    const connection = db.promise();

    try {

        const {
            id_user,
            rekening_tujuan,
            jumlah,
            keterangan
        } = req.body;

        // Cari pengirim
        const [pengirim] = await connection.query(
            "SELECT * FROM users WHERE id_user = ?",
            [id_user]
        );

        if (pengirim.length === 0) {
            return res.status(404).json({
                message: "Pengirim tidak ditemukan"
            });
        }

        // Cari penerima
        const [tujuan] = await connection.query(
            "SELECT * FROM users WHERE card_number = ?",
            [rekening_tujuan]
        );

        if (tujuan.length === 0) {
            return res.status(404).json({
                message: "Rekening tujuan tidak ditemukan"
            });
        }

        // Tidak boleh transfer ke rekening sendiri
        if (pengirim[0].id_user === tujuan[0].id_user) {
            return res.status(400).json({
                message: "Tidak dapat transfer ke rekening sendiri"
            });
        }

        // Validasi jumlah
        if (Number(jumlah) <= 0) {
            return res.status(400).json({
                message: "Jumlah transfer tidak valid"
            });
        }

        // Cek saldo
        if (Number(pengirim[0].balance) < Number(jumlah)) {
            return res.status(400).json({
                message: "Saldo tidak cukup"
            });
        }

        // Kurangi saldo pengirim
        await connection.query(
            "UPDATE users SET balance = balance - ? WHERE id_user = ?",
            [jumlah, id_user]
        );

        // Tambah saldo penerima
        await connection.query(
            "UPDATE users SET balance = balance + ? WHERE id_user = ?",
            [jumlah, tujuan[0].id_user]
        );

        // Histori pengirim
        await connection.query(
            `
            INSERT INTO transaksi
            (id_user, jenis_transaksi, jumlah, tanggal, keterangan, status)
            VALUES (?, 'TRANSFER', ?, NOW(), ?, 'SUCCESS')
            `,
            [
                id_user,
                jumlah,
                keterangan
            ]
        );

        // Histori penerima
        await connection.query(
            `
            INSERT INTO transaksi
            (id_user, jenis_transaksi, jumlah, tanggal, keterangan, status)
            VALUES (?, 'TRANSFER', ?, NOW(), ?, 'SUCCESS')
            `,
            [
                tujuan[0].id_user,
                jumlah,
                "Transfer masuk dari " + pengirim[0].display_name
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
                pengirim: pengirim[0].display_name,
                penerima: tujuan[0].display_name,
                rekening_pengirim: pengirim[0].card_number,
                rekening_penerima: tujuan[0].card_number,
                jenis_transaksi: "TRANSFER",
                jumlah,
                keterangan,
                status: "SUCCESS"
            });

            console.log("✅ Berhasil kirim ke Google Sheet");

        } catch (sheetErr) {

            console.error("❌ Google Sheet Error:", sheetErr.message);

            // Tidak membatalkan transaksi database
        }

        res.json({
            success: true,
            message: "Transfer berhasil"
        });

    } catch (err) {

        console.error("TRANSFER ERROR:", err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};